import { TaskAction, TaskActionThunk } from ".";
import { Dispatch } from "redux";
import { tasksService } from "../../../services/services";
import { WhennerActionType } from "../../common/actions";
import { Task } from "../../../models/Task";

// Action Creators

function insertTaskSuccess(
  task: Task
): TaskAction {
  return {
    type: WhennerActionType.InsertTaskSuccess,
    task
  };
}

function updateTaskSuccess(
  task: Task
): TaskAction {
  return {
    type: WhennerActionType.UpdateTaskSuccess,
    task
  };
}

// Action Thunks //

export const upsertTask: TaskActionThunk = (task: Task) => {
  return function(dispatch: Dispatch) {
    const result = tasksService
      .upsert(task)
      .then(upsertedTask =>
        upsertedTask.id === task.id
          ? dispatch(updateTaskSuccess(upsertedTask))
          : dispatch(insertTaskSuccess(upsertedTask))
      )
      .catch(e => {
        throw e;
      });
    return result;
  };
};