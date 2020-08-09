import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { tasksService } from "../services/services";
import { Task } from "../models/Task";
import { Time } from "../models/time";

export default function useTask(
  taskId: number | string = -1
): [Task | undefined, Dispatch<SetStateAction<Task | undefined>>] {
  let [task, setTask] = useState<Task | undefined>(undefined);

  if (taskId === "new" && !task) {
    task = {
      id: Time.now(),
      title: "",
      description: "",
      priority: Time.now(),
      estimate: 0,
    };
  }

  useEffect(() => {
    let cancel = taskId === "new";
    if (!cancel) {
      tasksService.find(parseInt(taskId.toString())).then((foundTask) => {
        !cancel && setTask(foundTask);
      });
    }

    return () => {
      cancel = true;
    };
  }, [taskId]);

  return [task, setTask];
}
