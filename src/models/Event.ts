import { IAppointment } from './Appointment';
import { ITask } from './Task';


export interface Event extends ITask, IAppointment {

}