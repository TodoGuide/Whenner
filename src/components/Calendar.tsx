import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import React from "react";
import moment from "moment";
import BigCalendar, { stringOrDate } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { ITodo, Todo as TodoModel } from "../models/Todo";
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
import { Spinner } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import TodoModal from "./todo/TodoModal";

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
  selectedTodo?: ITodo;
}

/**
 * The state of the Calendar component initialized by props
 */
interface CalendarStateProps {
  todos: ITodo[];
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
  upsertTodo: TodoActionThunk;
  loadTodos: TodosResultActionThunk;
}

type CalendarProps = CalendarStateProps & CalendarDispatchProps; // & TodoListOwnProps;

class Calendar extends React.Component<CalendarProps, CalendarState> {
  constructor(props: CalendarProps) {
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

  getEventStyle(
    event: ITodo,
    start: stringOrDate,
    end: stringOrDate,
    isSelected: boolean
  ) {
    // const backgroundColor = 'blue';
    const result: { backgroundColor?: string } = {};
    if (event.done) {
      result.backgroundColor = "grey";
    }
    return {
      style: result
    };
  }

  handleTodoShowSelected = (event: ITodo) => {
    this.setState({ ...this.state, selectedTodo: event });
  };

  handleTodoHideSelected = () => {
    this.setState({ ...this.state, selectedTodo: undefined });
  };

  handleTodoSave = (event: ITodo | undefined = this.state.selectedTodo) => {
    if (!event) {
      throw Error("No todo was specified to save in the handleTodoSave event");
    }
    this.props.upsertTodo(event);
    this.setState({ ...this.state, selectedTodo: undefined });
  };

  render() {
    // const { todos } = this.state;
    const { todos, minTime, maxTime, loading } = this.props;
    console.log("Calendar.render", todos);
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
          events={todos}
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
            this.handleTodoSave({
              ...event,
              estimate: moment
                .duration(moment(end).diff(moment(start)))
                .asMinutes()
            });
          }}
          onEventDrop={({ event, start }) => {
            this.handleTodoSave({ ...event, start: start as Date });
          }}
          onSelectSlot={({ start, end }) => {
            start = new Date(start);
            const todo = new TodoModel({
              id: Time.now(),
              title: "",
              description: "",
              start,
              estimate: TodoModel.periodToEstimate({
                start,
                end: new Date(end)
              })
            });
            this.handleTodoShowSelected(todo);
          }}
          onDoubleClickEvent={this.handleTodoShowSelected}
        />
        {this.state.selectedTodo ? (
          <TodoModal
            show={!!this.state.selectedTodo}
            todo={this.state.selectedTodo}
            onSaveTodo={this.handleTodoSave}
            onHide={this.handleTodoHideSelected}
          />
        ) : null}
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
