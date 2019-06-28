import React, { FunctionComponent } from "react";
import Todo from "./Todo";
import { ITodo } from "../models/Todo";
import { State } from "../redux/State";
import { connect } from "react-redux";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import * as todoActions from "../redux/actions/todoActions";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { WhennerAction } from "../redux/actions/WhennerAction";
import { Dispatch, bindActionCreators, AnyAction } from "redux";
import { TodoActionDispatch } from "../redux/actions/TodoAction";
import { TodosResultActionThunk } from "../redux/actions/TodosAction";

const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
const Calendar = withDragAndDrop(BigCalendar);

interface TodoListStateProps {
  todos: ITodo[];
}

interface TodoListDispatchProps {
  actions: {
    upsertTodo: TodoActionDispatch;
    loadTodos: TodosResultActionThunk;
  };
}

// type TodoListOwnProps = {
//   // Other props that component expects from parent
// };

type TodoListProps = TodoListStateProps & TodoListDispatchProps; // & TodoListOwnProps;

class TodoList extends React.Component<TodoListProps, TodoListStateProps> {
  constructor(props: TodoListProps) {
    super(props);
    this.state = { ...props };
  }

  componentDidMount() {
    this.props.actions.loadTodos();
  }

  render() {
    // const { todos } = this.state;
    const { actions, todos } = this.props;
    console.log("Rendering todos list", todos);
    return (
      <div>
        <ul>
          {todos.map(todo => (
            <li key={new Date(todo.start).getTime()}>
              <Todo todo={todo} />
            </li>
          ))}
        </ul>
        <Calendar
          defaultDate={new Date()}
          defaultView="week"
          events={todos}
          localizer={localizer}
          step={15}
          selectable
          resizable
          onEventResize={({ event, start, end }) => {
            console.log("Event resized", event);
            actions.upsertTodo({
              ...event,
              estimate: moment
                .duration(moment(end).diff(moment(start)))
                .asMinutes()
            });
          }}
          onEventDrop={({ event, start }) => {
            console.log("Event moved", { from: event.start, to: start });
            actions.upsertTodo({ ...event, start: start as Date });
          }}
          onSelectSlot={({ start, end }) => {
            console.log("Creating new todo", { start, end });
            actions.upsertTodo({
              id: Date.now(),
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
      </div>
    );
  }
}

// Map application State to component props
const mapStateToProps = ({ todos }: State): TodoListStateProps => {
  return {
    todos
  };
};

// Map component events to props
const mapDispatchToProps = (
  dispatch: Dispatch<WhennerAction>
): TodoListDispatchProps => {
  return {
    actions: bindActionCreators(todoActions, dispatch)
  };
};

// react-redux magic
export default connect<TodoListStateProps, TodoListDispatchProps, {}, State>(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
