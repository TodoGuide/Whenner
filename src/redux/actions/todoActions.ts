import { ITodo } from "../../models/Todo";
import { TodoAction, TodoActionThunk } from "./TodoAction";
import { WhennerActionType } from "./WhennerActionType";
import { Dispatch } from "redux";
import { todosService } from "../../services/TodosService";
import { TodosAction, TodosActionThunk } from "./TodosAction";

export function loadTodosSuccess(todos: ITodo[]): TodosAction {
  return {
    type: WhennerActionType.LoadTodosSuccess,
    todos
  };
}

export function upsertTodoSuccess(todo: ITodo): TodoAction {
  return {
    type: WhennerActionType.UpsertTodoSuccess,
    todo
  };
}

// Thunks //

export function loadTodos(): TodosActionThunk {
  return function(dispatch: Dispatch) {
    return todosService
      .all()
      .then(todos => dispatch(loadTodosSuccess(todos)))
      .catch(e => {
        console.log("loadTodos error", e);
        throw e;
      });
  };
}

export function upsertTodo(todo: ITodo): TodoActionThunk {
  return function(dispatch: Dispatch) {
    return todosService
      .upsert(todo)
      .then(todo => dispatch(upsertTodoSuccess(todo)))
      .catch(e => {
        console.log("upsertTodo error", e);
        throw e;
      });
  };
}