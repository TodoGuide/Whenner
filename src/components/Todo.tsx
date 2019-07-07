import React, { FormEvent, ChangeEvent } from "react";
import { ITodo } from "../models/Todo";

type TodoProps = {
  todo: ITodo;
  onSaveTodo: (todo: ITodo) => void;
};

type TodoState = {
  todo: ITodo;
};

export default class Todo extends React.Component<TodoProps, TodoState> {
  constructor(props: TodoProps) {
    super(props);
    this.state = { ...props };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value, checked } = event.currentTarget;
    const [, , propName, propType] = id.split("-");
    const state = {
      ...this.state,
      todo: {
        ...this.state.todo,
        [propName]:
          propType === "bool"
            ? checked
            : propType === "int"
            ? parseInt(value)
            : value
      }
    };
    this.setState(state);
  };

  handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSaveTodo(this.state.todo);
  };

  render() {
    const { todo } = this.state;
    return (
      <form onSubmit={this.handleSave}>
        <div>
          <input
            type="checkbox"
            id={"todo-" + todo.id + "-done-bool"}
            checked={todo.done}
            onChange={this.handleChange}
          />
          
          <input
            id={"todo-" + todo.id + "-title-string"}
            type="text"
            value={todo.title}
            placeholder="This, that, and the other..."
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor={"todo-" + todo.id + "-estimate"}>Estimate:</label>
          <input
            type="text"
            id={"todo-" + todo.id + "-estimate-int"}
            value={todo.estimate}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            id={"todo-" + todo.id + "-description-string"}
            value={todo.description}
            onChange={this.handleChange}
          />
        </div>

        {JSON.stringify(this.state.todo.start)}
        <input type="submit" value="Save" />
      </form>
    );
  }
}
