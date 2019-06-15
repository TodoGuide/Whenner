import React from "react";
import { ITodo } from "../models/Todo";
import { SFC } from "react-dom/node_modules/@types/react";

interface TodoProps extends ITodo {
  // onClick: () => void;
}

const Todo: SFC<TodoProps> = ({
  // onClick,
  id,
  title,
  description,
  estimate,
  start,
  done
}) => (
  <div>
    <div>
      <input
        type="checkbox"
        id={"todo-" + id + "-done"}
        checked={done}
        readOnly
      />
      <input
        id={"todo-" + id + "-title"}
        type="text"
        value={title}
        placeholder="This, that, and the other..."
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        readOnly
      />
    </div>

    <div>
      <label htmlFor={"todo-" + id + "-estimate"}>Estimate:</label>
      <input
        type="text"
        id={"todo-" + id + "-estimate"}
        value={estimate}
        readOnly
      />
    </div>

    <div>
      <textarea
        id={"todo-" + id + "-description"}
        value={description}
        readOnly
      />
    </div>
    {JSON.stringify({ id, start })}
  </div>
);

export default Todo;
