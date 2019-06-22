import React, { FunctionComponent } from "react";
import Todo from "./Todo";
import { ITodo } from "../models/Todo";
import { State } from "../redux/State";
import { connect } from "react-redux";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Store } from "../redux/Store";
import { upsertTodo } from "../redux/actions/upsertTodo";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { WhennerAction } from "../redux/actions/WhennerAction";
import { Dispatch } from "redux";

const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
const Calendar = withDragAndDrop(BigCalendar);

interface TodoListStateProps {
  todos: ITodo[];
}

interface TodoListDispatchProps {
  upsertTodo: { (todo: ITodo): void };
}

type TodoListOwnProps = {
  // Other props that component expects from parent
};

type TodoListProps = TodoListStateProps &
  TodoListDispatchProps &
  TodoListOwnProps;

const TodoList: FunctionComponent<TodoListProps> = ({ todos, upsertTodo }) => (
  <div>
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
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
        event.estimate = moment
          .duration(moment(end).diff(moment(start)))
          .asMinutes();
        console.log("Event resized", event);
        upsertTodo(event);
      }}
      onEventDrop={({ event, start }) => {
        console.log("Event moved", { from: event.start, to: start });
        event.start = start as Date;
        upsertTodo(event);
      }}
      onSelectSlot={({ start, end }) => {
        console.log("Creating new todo", { start, end });
        upsertTodo({
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

// Map application State to component props
const mapStateToProps = (state: State): TodoListStateProps => {
  return {
    todos: state.todos
  };
};

// Map component events to props
const mapDispatchToProps = (
  dispatch: Dispatch<WhennerAction>
): TodoListDispatchProps => {
  return {
    upsertTodo: (todo: ITodo) => dispatch(upsertTodo(todo))
  };
};

// react-redux magic
export default connect<TodoListStateProps, TodoListDispatchProps, {}, State>(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
