import { Dispatch } from "redux";
import { WhennerAction } from "../../common/actions";
import { Task } from "../../../models/Task";


// TODO: Update redux-thunk when new NPM package is available: https://github.com/reduxjs/redux-thunk/pull/224
//   This will allow bindActionCreators to return the proper signature/type.

export interface TaskAction extends WhennerAction {
  readonly task: Task;
}

export interface TaskActionThunk {
  (task: Task): { (dispatch: Dispatch): Promise<TaskAction> }
}

export interface TasksResultAction extends WhennerAction {
  readonly tasks: Task[];
}

export interface TasksResultActionThunk {
  (): { (dispatch: Dispatch): Promise<TasksResultAction> }
}