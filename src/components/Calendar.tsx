import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import React from "react";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { ITodo } from "../models/Todo";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import {
  TodosResultActionThunk,
  TodoActionThunk
} from "../redux/todos/actions";
import { defaultTodos } from "../services/TodosService";
import { Time } from "../models/time";
import { loadTodos } from "../redux/todos/actions/loadTodos";
import { upsertTodo } from "../redux/todos/actions/upsertTodo";
import { WhennerState } from "../redux";
import { WhennerAction } from "../redux/common/actions";
import { Chronotype } from "../models/Chronotype";
import Spinner from "react-bootstrap/Spinner";

moment.locale(navigator.language, {
  week: {
    // Always start the week "today"
    dow: Time.current().getDay(),
    doy: 1
  }
});

const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
const DnDCalendar = withDragAndDrop(BigCalendar);

interface CalendarStateProps {
  todos: ITodo[];
  loading: boolean;
  minTime: Date;
  maxTime: Date;
}

interface CalendarDispatchProps {
  upsertTodo: TodoActionThunk;
  loadTodos: TodosResultActionThunk;
}

// type TodoListOwnProps = {
//   // Other props that component expects from parent
// };

type TodoListProps = CalendarStateProps & CalendarDispatchProps; // & TodoListOwnProps;

class Calendar extends React.Component<TodoListProps, CalendarStateProps> {
  constructor(props: TodoListProps) {
    super(props);
    this.state = { ...props };
  }

  componentDidMount() {
    const { todos } = this.props;
    if (
      todos.length === defaultTodos.length &&
      todos.every((value, index) => value.id === defaultTodos[index].id)
    ) {
      // Only load if todos todos contains defaults
      this.props.loadTodos();
    }
  }

  render() {
    // const { todos } = this.state;
    const { upsertTodo, todos, minTime, maxTime, loading } = this.props;
    return (
      <div>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
            <DnDCalendar
              defaultDate={Time.current()}
              defaultView="week"
              events={todos}
              localizer={localizer}
              step={15}
              selectable
              resizable
              min={minTime}
              max={maxTime}
              showMultiDayTimes={true}
              // views={{month: true, week:Week, agenda: true, day: true} as any}
              getNow={() => Time.current()}
              onEventResize={({ event, start, end }) => {
                upsertTodo({
                  ...event,
                  estimate: moment
                    .duration(moment(end).diff(moment(start)))
                    .asMinutes()
                });
              }}
              onEventDrop={({ event, start }) => {
                upsertTodo({ ...event, start: start as Date });
              }}
              onSelectSlot={({ start, end }) => {
                upsertTodo({
                  id: Time.now(),
                  title: "New todo",
                  description: "Do stuff",
                  estimate: moment
                    .duration(moment(end).diff(moment(start)))
                    .asMinutes(),
                  start: start as Date,
                  done: false
                });
              }}
            />
        )}
      </div>
    );
  }
}

// Map application State to component props
const mapStateToProps = ({
  todos,
  loadsInProgress,
  settings: { chronotype }
}: WhennerState): CalendarStateProps => {
  return {
    todos,
    minTime: Chronotype.getStartOf(Time.current(), chronotype),
    maxTime: Chronotype.getEndOf(Time.current(), chronotype),
    loading: loadsInProgress > 0
  };
};

// Map component events to props
const mapDispatchToProps = (
  dispatch: Dispatch<WhennerAction>
): CalendarDispatchProps => {
  return {
    upsertTodo: bindActionCreators(upsertTodo, dispatch),
    loadTodos: bindActionCreators(loadTodos, dispatch)
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
