import { ITodo } from "../../models/Todo";
import { TodoAction, TodoActionThunk } from "./TodoAction";
import { WhennerActionType } from "./WhennerActionType";
import { Dispatch } from "redux";
import { TodosAction, TodosResultActionThunk } from "./TodosAction";
import { todosService } from "../../services/services";

export function loadTodosSuccess(todos: ITodo[]): TodosAction {
  return {
    type: WhennerActionType.LoadTodosSuccess,
    todos
  };
}

export function insertTodoSuccess(
  todo: ITodo
): TodoAction {
  return {
    type: WhennerActionType.InsertTodoSuccess,
    todo
  };
}

export function updateTodoSuccess(
  todo: ITodo
): TodoAction {
  return {
    type: WhennerActionType.UpdateTodoSuccess,
    todo
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

export const upsertTodo: TodoActionThunk = (todo: ITodo) => {
  return function(dispatch: Dispatch) {
    const result = todosService
      .upsert(todo)
      .then(upsertedTodo =>
        upsertedTodo.id === todo.id
          ? dispatch(updateTodoSuccess(upsertedTodo))
          : dispatch(insertTodoSuccess(upsertedTodo))
      )
      .catch(e => {
        console.log("upsertTodo error", e);
        throw e;
      });
      result.then(x => loadTodos()(dispatch));
    return result;
  };
};