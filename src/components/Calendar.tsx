// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import React from "react";
import moment from "moment";
import {
  Calendar as BigCalendar,
  Event as BCEvent,
  momentLocalizer,
  stringOrDate,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import Time from "../models/time";
import { WhennerState } from "../redux";
import { WhennerAction } from "../redux/common/actions";
import { startOfDayFor, endOfDayFor } from "../models/Chronotype";
import Toast from "react-bootstrap/Toast";
import EventModal from "./todo/EventModal";
import { schedule, Schedule } from "../models/Schedule";
import {
  dateValueOf,
  earliestOf,
  latestOf,
  timeValueOf,
} from "../models/time/utils";
import { Event } from "../models/Event";
import {
  EventActionThunk,
  EventsResultActionThunk,
} from "../redux/events/actions";
import { upsertEvent } from "../redux/events/actions/upsertEvent";
import { loadEvents } from "../redux/events/actions/loadEvents";
import { Task } from "../models/Task";
import { minutesIn } from "../models/time/period";
import { defaultEvents } from "../services/EventsService";
import {
  isClosed,
  Closable,
  isNotOpened,
  Statusable,
} from "../models/statuses";

moment.locale(navigator.language, {
  week: {
    // Always start the week "yesterday"
    dow: Time.yesterday().getDay(),
    doy: 1,
  },
});

const localizer = momentLocalizer(moment); // or globalizeLocalizer
const DnDCalendar = withDragAndDrop(BigCalendar as any);

/**
 * The internal state of the Calendar component
 */
interface CalendarOwnState {
  selectedEvent?: Event;
}

/**
 * The state of the Calendar component initialized by props
 */
interface CalendarStateProps {
  schedule: Schedule;
  loading: boolean;
  minTime: Date;
  maxTime: Date;
}

type CalendarState = CalendarOwnState & CalendarStateProps;

// interface CalendarOwnProps = {
//   // Other props that component expects from parent
// };

/**
 * Properties of the Calendar component that dispatch Redux actions
 */
interface CalendarDispatchProps {
  upsertEvent: EventActionThunk;
  loadEvents: EventsResultActionThunk;
}

type CalendarProps = CalendarStateProps & CalendarDispatchProps; // & TodoListOwnProps;

class Calendar extends React.Component<CalendarProps, CalendarState> {
  constructor(props: CalendarProps) {
    super(props);
    this.state = { ...props };
  }

  componentDidMount() {
    const events = this.props.schedule.events;
    if (
      events.length === defaultEvents.length &&
      events.every((value, index) => value.id === defaultEvents[index].id)
    ) {
      // Only load if tasks contains defaults
      this.props.loadEvents();
    }
  }

  eventStyle = (
    event: BCEvent,
    start: stringOrDate,
    end: stringOrDate,
    isSelected: boolean
  ): React.HTMLAttributes<HTMLDivElement> =>
    isNotOpened(event as Statusable)
      ? { style: { backgroundColor: "grey" } }
      : { style: {} };

  handleEventShowSelected = (event: BCEvent) =>
    this.setState({ ...this.state, selectedEvent: event as Event });

  handleEventHideSelected = () =>
    this.setState({ ...this.state, selectedEvent: undefined });

  handleEventSave = (event: Event | undefined = this.state.selectedEvent) => {
    if (!event) {
      throw Error("No todo was specified to save in the handleEventSave event");
    }
    console.log("handleEventSave event", event);
    this.props.upsertEvent(event);
    this.setState({ ...this.state, selectedEvent: undefined });
  };

  render() {
    // const { todos } = this.state;
    const { schedule: scheduleProp, minTime, maxTime, loading } = this.props;
    const events = schedule(
      scheduleProp.events,
      scheduleProp.chronotype
    ).events;
    console.log("Calendar.render", events);
    return (
      <div>
        {loading ? (
          <Toast
            show={loading}
            transition={false}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <Toast.Header>
              <strong className="mr-auto">Working...</strong>
              <small>⏱</small>
            </Toast.Header>
            <Toast.Body>
              <p>Scheduling your todo list...</p>
            </Toast.Body>
          </Toast>
        ) : null}
        <DnDCalendar
          defaultDate={Time.current()}
          defaultView="week"
          events={events}
          localizer={localizer}
          selectable
          resizable
          min={minTime}
          max={maxTime}
          step={15}
          showMultiDayTimes={true}
          getNow={Time.current}
          eventPropGetter={this.eventStyle}
          onEventResize={({ event, start, end }) => {
            this.handleEventSave({
              ...(event as Event),
              priority: timeValueOf(start) || Time.now(),
              estimate: moment
                .duration(moment(end).diff(moment(start)))
                .asMinutes(),
              end: dateValueOf(end),
            });
          }}
          onEventDrop={({ event, start, end }) => {
            this.handleEventSave({
              ...(event as Event),
              start: new Date(start),
              priority: new Date(start).getTime(),
              estimate: (event as Task).estimate,
              end: dateValueOf(end),
            });
          }}
          onSelectSlot={({ start, end }) => {
            start = new Date(start);
            const event = {
              id: Time.now(),
              title: "",
              description: "",
              priority: start.getTime(),
              estimate: minutesIn({
                start,
                end: new Date(end),
              }),
            };
            this.handleEventShowSelected(event);
          }}
          onDoubleClickEvent={this.handleEventShowSelected}
        />
        {this.state.selectedEvent ? (
          <EventModal
            show={!!this.state.selectedEvent}
            event={this.state.selectedEvent}
            onSaveEvent={this.handleEventSave}
            onHide={this.handleEventHideSelected}
          />
        ) : null}
      </div>
    );
  }
}

// Map application State to component props
const mapStateToProps = ({
  schedule,
  loadsInProgress,
}: WhennerState): CalendarStateProps => {
  // console.log("Calendar mapStateToProps schedule", schedule);
  return {
    schedule,
    minTime: earliestOf(
      startOfDayFor(Time.current(), schedule.chronotype),
      Time.current()
    ),
    maxTime: latestOf(
      endOfDayFor(Time.current(), schedule.chronotype),
      Time.current()
    ),
    loading: loadsInProgress > 0,
  };
};

// Map component events to props
const mapDispatchToProps = (
  dispatch: Dispatch<WhennerAction>
): CalendarDispatchProps => {
  return {
    upsertEvent: bindActionCreators(upsertEvent, dispatch),
    loadEvents: bindActionCreators(loadEvents, dispatch),
  };
};

// react-redux magic
export default connect<
  CalendarStateProps,
  CalendarDispatchProps,
  {},
  WhennerState
>(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
