import React from "react";
import { ITodo } from "../models/Todo";

interface TodoProps extends ITodo {
  onClick: () => void;
}

const Todo = ({
  onClick,
  id,
  title,
  description,
  estimate,
  start,
  done
}: TodoProps) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: done ? "line-through" : "none"
    }}
  >
    id: {id}
    title: {title}
    description: {description}
    estimate: {estimate} minutes start: {start}
    done: {done}
  </li>
);

export default Todo;
