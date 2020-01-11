import { useState, useEffect } from "react";
import { tasksService } from "../../services/services";
import { Task } from "../../models/Task";
import { Time } from "../../models/time";

export default function useTask(taskId?: number | string): Task | undefined {
  let [task, setTask] = useState<Task | undefined>(undefined);

  if (taskId === "new") {
    taskId = Time.now();
    task = {
      id: taskId,
      title: "",
      description: "",
      priority: Time.now(),
      estimate: 0
    };
  }

  const effectiveId = parseInt((taskId || "-1").toString());

  useEffect(() => {
    let cancel = false;
    tasksService.find(effectiveId).then(foundTask => {
      !cancel && setTask(foundTask);
    });

    return () => {
      cancel = true;
    };
  }, [taskId, effectiveId]);

  return task;
}
