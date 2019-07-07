import { TodosResultAction, TodosResultActionThunk } from ".";
import { ITodo } from "../../../models/Todo";
import { Dispatch } from "redux";
import { todosService } from "../../../services/services";
import { WhennerActionType } from "../../common/actions";

function loadTodosSuccess(todos: ITodo[]): TodosResultAction {
  return {
    type: WhennerActionType.LoadTodosSuccess,
    todos
  };
}


/**
 * A thunk to load todo items
 */
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