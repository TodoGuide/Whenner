import { ITodo } from "../../models/Todo";
import { TodoAction, TodoActionThunk } from "./TodoAction";
import { WhennerActionType } from "./WhennerActionType";
import { Dispatch } from "redux";
import { TodosAction, TodosResultActionThunk } from "./TodosAction";
import { Chronotype } from "../../models/Chronotype";
import { todosService } from "../../services/services";

export function loadTodosSuccess(todos: ITodo[]): TodosAction {
  return {
    type: WhennerActionType.LoadTodosSuccess,
    todos
  };
}

export function insertTodoSuccess(
  todo: ITodo,
  chronotype: Chronotype
): TodoAction {
  return {
    type: WhennerActionType.InsertTodoSuccess,
    todo,
    chronotype
  };
}

export function updateTodoSuccess(
  todo: ITodo,
  chronotype: Chronotype
): TodoAction {
  return {
    type: WhennerActionType.UpdateTodoSuccess,
    todo,
    chronotype
  };
}

// Thunks //

export const loadTodos: TodosResultActionThunk = () => {
  return function(dispatch: Dispatch) {
    return todosService
      .all()
      .then(todos => dispatch(loadTodosSuccess(todos)))
      .catch(e => {
        console.log("loadTodos error", e);
        throw e;
      });
  };
};

export const upsertTodo: TodoActionThunk = (todo: ITodo, chronotype: Chronotype) => {
  return function(dispatch: Dispatch) {
    return todosService
      .upsert(todo)
      .then(upsertedTodo =>
        upsertedTodo.id === todo.id
          ? dispatch(updateTodoSuccess(upsertedTodo, chronotype))
          : dispatch(insertTodoSuccess(upsertedTodo, chronotype))
      )
      .catch(e => {
        console.log("upsertTodo error", e);
        throw e;
      });
  };
};
