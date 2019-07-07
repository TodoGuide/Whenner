import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import React from "react";
import Todo from "./Todo";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { ITodo } from "../models/Todo";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { TodosResultActionThunk, TodoActionThunk } from "../redux/todos/actions";
import { defaultTodos } from "../services/TodosService";
import { Time } from "../models/time";
import { loadTodos } from "../redux/todos/actions/loadTodos";
import { upsertTodo } from "../redux/todos/actions/upsertTodo";
import { WhennerState } from "../redux";
import { WhennerAction } from "../redux/common/actions";

const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
const Calendar = withDragAndDrop(BigCalendar);

interface TodoListStateProps {
  todos: ITodo[];
}

interface TodoListDispatchProps {
  upsertTodo: TodoActionThunk;
  loadTodos: TodosResultActionThunk;
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
    const { upsertTodo, todos } = this.props;
    return (
      <div>
        <ul>
          {todos.map(todo => (
            <li key={`${todo.id}${todo.start}`}>
              <Todo todo={todo} onSaveTodo={upsertTodo} />
            </li>
          ))}
        </ul>
        <Calendar
          defaultDate={Time.current()}
          defaultView="week"
          events={todos}
          localizer={localizer}
          step={15}
          selectable
          resizable
          onEventResize={({ event, start, end }) => {
            upsertTodo(
              {
                ...event,
                estimate: moment
                  .duration(moment(end).diff(moment(start)))
                  .asMinutes()
              }
            );
          }}
          onEventDrop={({ event, start }) => {
            upsertTodo({ ...event, start: start as Date });
          }}
          onSelectSlot={({ start, end }) => {
            upsertTodo(
              {
                id: Time.now(),
                title: "New todo",
                description: "Do stuff",
                estimate: moment
                  .duration(moment(end).diff(moment(start)))
                  .asMinutes(),
                start: start as Date,
                done: false
              }
            );
          }} 
        />
      </div>
    );
  }
}

// Map application State to component props
const mapStateToProps = ({ todos }: WhennerState): TodoListStateProps => {
  return {
    todos
  };
};

// Map component events to props
const mapDispatchToProps = (
  dispatch: Dispatch<WhennerAction>
): TodoListDispatchProps => {
  return {
    upsertTodo: bindActionCreators(upsertTodo, dispatch),
    loadTodos: bindActionCreators(loadTodos, dispatch),
  };
};

// react-redux magic
export default connect<TodoListStateProps, TodoListDispatchProps, {}, WhennerState>(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
