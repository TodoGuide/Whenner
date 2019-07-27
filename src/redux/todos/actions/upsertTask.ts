import { TaskAction, TaskActionThunk } from ".";
import { Dispatch } from "redux";
import { tasksService } from "../../../services/services";
import { WhennerActionType } from "../../common/actions";
import { ITask } from "../../../models/Task";

// Action Creators

function insertTaskSuccess(
  task: ITask
): TaskAction {
  return {
    type: WhennerActionType.InsertTaskSuccess,
    task
  };
}

function updateTaskSuccess(
  task: ITask
): TaskAction {
  return {
    type: WhennerActionType.UpdateTaskSuccess,
    task
  };
}

// Action Thunks //

export const upsertTask: TaskActionThunk = (task: ITask) => {
  return function(dispatch: Dispatch) {
    const result = tasksService
      .upsert(task)
      .then(upsertedTodo =>
        upsertedTodo.id === task.id
          ? dispatch(updateTaskSuccess(upsertedTodo))
          : dispatch(insertTaskSuccess(upsertedTodo))
      )
      .catch(e => {
        console.log("upsertTodo error", e);
        throw e;
      });
    return result;
  };
};