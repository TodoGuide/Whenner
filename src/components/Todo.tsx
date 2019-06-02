import React from "react";
import { ITodo } from "../models/Todo";
import { SFC } from "react-dom/node_modules/@types/react";

interface TodoProps extends ITodo {
  onClick: () => void;
}

const Todo: SFC<TodoProps> = ({
  onClick,
  id,
  title,
  description,
  estimate,
  start,
  done
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: done ? "line-through" : "none"
    }}
  >
    {JSON.stringify({id, title, description, estimate, start, done})}
    
  </li>
);

export default Todo;
