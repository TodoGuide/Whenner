import React, { FormEvent } from "react";
import { ITodo, Todo as TodoModel } from "../models/Todo";
import { connect } from "react-redux";
import { State } from "../redux/State";
import { WhennerAction } from "../redux/actions/WhennerAction";
import * as todoActions from "../redux/actions/todoActions";
import { TodoActionDispatch } from "../redux/actions/TodoAction";
import { bindActionCreators, Dispatch } from "redux";

interface TodoStateProps {
  todo: ITodo;
}

interface TodoDispatchProps {
  actions: { upsertTodo: TodoActionDispatch };
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
    this.props.actions.upsertTodo(this.state.todo);
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
            readOnly
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
  return {
    actions: bindActionCreators(todoActions, dispatch)
    // upsertTodo: (todo: ITodo) => dispatch(todoActions.upsertTodo(todo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);
