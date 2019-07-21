import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import React from "react";
import moment from "moment";
import BigCalendar, { stringOrDate } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import {
  TasksResultActionThunk,
  TaskActionThunk
} from "../redux/todos/actions";
import { Time } from "../models/time";
import { loadTasks } from "../redux/todos/actions/loadTasks";
import { upsertTask } from "../redux/todos/actions/upsertTask";
import { WhennerState } from "../redux";
import { WhennerAction } from "../redux/common/actions";
import { Chronotype } from "../models/Chronotype";
import Toast from "react-bootstrap/Toast";
import TaskModal from "./todo/TaskModal";
import { Task, ITask, defaultTasks } from "../models/Task";
import { IAppointment } from "../models/Appointment";

moment.locale(navigator.language, {
  week: {
    // Always start the week "today"
    dow: Time.current().getDay(),
    doy: 1
  }
});

const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
const DnDCalendar = withDragAndDrop(BigCalendar);

/**
 * The internal state of the Calendar component
 */
interface CalendarOwnState {
  selectedTask?: ITask;
}

/**
 * The state of the Calendar component initialized by props
 */
interface CalendarStateProps {
  tasks: ITask[];
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
  upsertTodo: TaskActionThunk;
  loadTasks: TasksResultActionThunk;
}

type CalendarProps = CalendarStateProps & CalendarDispatchProps; // & TodoListOwnProps;

class Calendar extends React.Component<CalendarProps, CalendarState> {
  constructor(props: CalendarProps) {
    super(props);
    this.state = { ...props };
  }

  componentDidMount() {
    const { tasks } = this.props;
    if (
      tasks.length === defaultTasks.length &&
      tasks.every((value, index) => value.id === defaultTasks[index].id)
    ) {
      // Only load if tasks contains defaults
      this.props.loadTasks();
    }
  }

  getEventStyle(
    event: ITask,
    start: stringOrDate,
    end: stringOrDate,
    isSelected: boolean
  ) {
    // const backgroundColor = 'blue';
    const style: { backgroundColor?: string } = {};
    if (event.completed) {
      style.backgroundColor = "grey";
    }
    return {
      style
    };
  }

  handleTaskShowSelected = (event: ITask) => {
    this.setState({ ...this.state, selectedTask: event });
  };

  handleTaskHideSelected = () => {
    this.setState({ ...this.state, selectedTask: undefined });
  };

  handleTaskSave = (event: ITask | undefined = this.state.selectedTask) => {
    if (!event) {
      throw Error("No todo was specified to save in the handleTaskSave event");
    }
    this.props.upsertTodo(event);
    this.setState({ ...this.state, selectedTask: undefined });
  };

  render() {
    // const { todos } = this.state;
    const { tasks, minTime, maxTime, loading } = this.props;
    console.log("Calendar.render", tasks);
    return (
      <div>
        {loading ? (
          <Toast
            show={loading}
            transition={false}
            style={{
              position: "absolute",
              top: 0,
              right: 0
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
          events={tasks}
          localizer={localizer}
          step={15}
          selectable
          resizable
          min={minTime}
          max={maxTime}
          showMultiDayTimes={true}
          getNow={() => Time.current()}
          eventPropGetter={this.getEventStyle}
          onEventResize={({ event, start, end }) => {
            this.handleTaskSave({
              ...event,
              estimate: moment
                .duration(moment(end).diff(moment(start)))
                .asMinutes()
            });
          }}
          onEventDrop={({ event, start }) => {
            this.handleTaskSave({ ...event, start: start as Date });
          }}
          onSelectSlot={({ start, end }) => {
            start = new Date(start);
            const task = new Task({
              id: Time.now(),
              title: "",
              description: "",
              priority: start.getTime(),
              estimate: Task.periodToEstimate({
                start,
                end: new Date(end)
              })
            });
            this.handleTaskShowSelected(task);
          }}
          onDoubleClickEvent={this.handleTaskShowSelected}
        />
        {this.state.selectedTask ? (
          <TaskModal
            show={!!this.state.selectedTask}
            task={this.state.selectedTask}
            onSaveTodo={this.handleTaskSave}
            onHide={this.handleTaskHideSelected}
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
  settings: { chronotype }
}: WhennerState): CalendarStateProps => {
  return {
    tasks: schedule.tasks,
    minTime: Time.earliest(
      Chronotype.getStartOf(Time.current(), chronotype),
      Time.current()
    ),
    maxTime: Time.latest(
      Chronotype.getEndOf(Time.current(), chronotype),
      Time.current()
    ),
    loading: loadsInProgress > 0
  };
};

// Map component events to props
const mapDispatchToProps = (
  dispatch: Dispatch<WhennerAction>
): CalendarDispatchProps => {
  return {
    upsertTodo: bindActionCreators(upsertTask, dispatch),
    loadTasks: bindActionCreators(loadTasks, dispatch)
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
