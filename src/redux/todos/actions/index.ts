import { Dispatch } from "redux";
import { WhennerAction } from "../../common/actions";
import { ITask } from "../../../models/Task";


// TODO: Update redux-thunk when new NPM package is available: https://github.com/reduxjs/redux-thunk/pull/224
//   This will allow bindActionCreators to return the proper signature/type.

export interface TaskAction extends WhennerAction {
  readonly task: ITask;
}

export interface TaskActionThunk {
  (task: ITask): { (dispatch: Dispatch): Promise<TaskAction> }
}

export interface TasksResultAction extends WhennerAction {
  readonly tasks: ITask[];
}

export interface TasksResultActionThunk {
  (): { (dispatch: Dispatch): Promise<TasksResultAction> }
}