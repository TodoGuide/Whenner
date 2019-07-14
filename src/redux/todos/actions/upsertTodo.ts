import { ITodo } from "../../../models/Todo";
import { TodoAction, TodoActionThunk } from ".";
import { Dispatch } from "redux";
import { todosService } from "../../../services/services";
import { WhennerActionType } from "../../common/actions";

// Action Creators

function insertTodoSuccess(
  todo: ITodo
): TodoAction {
  return {
    type: WhennerActionType.InsertTodoSuccess,
    todo
  };
}

function updateTodoSuccess(
  todo: ITodo
): TodoAction {
  return {
    type: WhennerActionType.UpdateTodoSuccess,
    todo
  };
}

// Action Thunks //

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
    return result;
  };
};