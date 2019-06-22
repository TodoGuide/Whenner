import React, { Dispatch, FormEvent, ChangeEvent } from "react";
import { ITodo, Todo as TodoModel } from "../models/Todo";
import { connect, MapStateToProps } from "react-redux";
import { State } from "../redux/State";
import { WhennerAction } from "../redux/actions/WhennerAction";
import { upsertTodo } from "../redux/actions/upsertTodo";
import { TodoAction } from "../redux/actions/TodoAction";

interface TodoStateProps {
  todo: ITodo;
}

interface TodoDispatchProps {
  upsertTodo: { (todo: ITodo): void };
}

// interface TodoOwnProps extends TodoStateProps {}

type TodoProps = TodoStateProps & TodoDispatchProps; // & TodoOwnProps;

class Todo extends React.Component<TodoProps, TodoStateProps> {
  constructor(props: TodoProps) {
    super(props);
    this.state = { ...props };
  }

  handleChange = (event: any) => {
    // const todo = { ...this.state };
    // this.setState(todo);
  };

  handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.upsertTodo(this.state.todo);
  };

  render() {
    const { todo } = this.state;
    return (
      <form onSubmit={this.handleSave}>
        <div>
          <input
            type="checkbox"
            id={"todo-" + todo.id + "-done"}
            checked={todo.done}
          />
          <input
            id={"todo-" + todo.id + "-title"}
            type="text"
            value={todo.title}
            placeholder="This, that, and the other..."
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            onChange={(event: FormEvent<HTMLInputElement>) => {
              const state = {
                ...this.state,
                todo: {
                  ...this.state.todo,
                  title: event.currentTarget.value || ""
                }
              };
              // alert(event.target.)
              this.setState(state);
            }}
          />
        </div>

        <div>
          <label htmlFor={"todo-" + todo.id + "-estimate"}>Estimate:</label>
          <input
            type="text"
            id={"todo-" + todo.id + "-estimate"}
            value={todo.estimate}
            readOnly
          />
        </div>

        <div>
          <textarea
            id={"todo-" + todo.id + "-description"}
            value={todo.description}
            readOnly
          />
        </div>
        <input type="submit" value="Save" />
      </form>
    );
  }
}

// Map application State to component props
const mapStateToProps = (
  state: State,
  ownProps: TodoStateProps
): TodoStateProps => {
  return {
    todo:
      state.todos.find(todo => todo.id === ownProps.todo.id) || new TodoModel()
  };
};

// Map component events to props
const mapDispatchToProps = (
  dispatch: Dispatch<WhennerAction>
): TodoDispatchProps => {
  return { upsertTodo: (todo: ITodo) => dispatch(upsertTodo(todo)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);
