import { AnyAction } from "redux";

export const ACTION_SUCCESS_SUFFIX = ".Success"
export const APPOINTMENT_ACTION_PREFIX = "Appointment.";
export const TASK_ACTION_PREFIX = "Task.";

export enum WhennerActionType {
  // Common Actions
  BeginLoad = "BeginLoad",
  // Appointment Actions
  InsertAppointmentSuccess = "Appointment.Insert.Success",
  UpdateAppointmentSuccess = "Appointment.Upsert.Success",
  LoadAppointmentsSuccess = "Appointment.Load.Success",
  // Todo Actions
  InsertTaskSuccess = "Task.Insert.Success",
  UpdateTaskSuccess = "Task.Upsert.Success",
  LoadTasksSuccess = "Task.Load.Success"
}

export interface WhennerAction extends AnyAction {
  type: WhennerActionType;
}