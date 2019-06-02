import React, { SFC } from "react";
import Todo from "./Todo";
import { ITodo } from "../models/Todo";
import { WhennerState } from "../redux/state";
import { updateTodo, createTodo } from "../redux/actions";
import { connect } from "react-redux";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { WhennerStore } from "../redux/store";

const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
const Calendar = withDragAndDrop(BigCalendar);

interface TodoListProps {
  todos: ITodo[];
  onTodoClick: (todo: ITodo) => void;  
}

const TodoList: SFC<TodoListProps> = ({ todos, onTodoClick }) => (
  <div>
    <ul>
      {todos.map((todo, index) => (
        <Todo key={index} {...todo} onClick={() => onTodoClick(todo)} />
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
        WhennerStore.instance.dispatch(updateTodo(event));
      }}
      onEventDrop={({ event, start }) => {
        console.log("Event moved", { from: event.start, to: start });
        event.start = start as Date;
        WhennerStore.instance.dispatch(updateTodo(event));
      }}
      onSelectSlot={({start, end}) => {
        console.log("Creatomg new todo", { start, end });
        WhennerStore.instance.dispatch(createTodo({
          id: Date.now(),
          title: "New todo",
          description: "Do stuff",
          estimate: moment.duration(moment(end).diff(moment(start))).asMinutes(),
          start: start as Date,
          done: false
        }));
      }}
    />
  </div>
);

const mapStateToProps = (state: WhennerState) => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onTodoClick: (todo: ITodo) => {
      dispatch(updateTodo(todo));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
