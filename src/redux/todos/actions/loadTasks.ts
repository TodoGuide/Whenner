import { TasksResultAction, TasksResultActionThunk } from ".";
import { Dispatch } from "redux";
import { tasksService } from "../../../services/services";
import { WhennerActionType } from "../../common/actions";
import { ITask } from "../../../models/Task";

function loadTasksSuccess(tasks: ITask[]): TasksResultAction {
  return {
    type: WhennerActionType.LoadTasksSuccess,
    tasks: tasks
  };
}


/**
 * A thunk to load todo items
 */
export const loadTasks: TasksResultActionThunk = () => {
  return function(dispatch: Dispatch) {
    return tasksService
      .all()
      .then(tasks => dispatch(loadTasksSuccess(tasks)))
      .catch(e => {
        console.log("loadTasks error", e);
        throw e;
      });
  };
};