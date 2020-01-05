import { useState, useRef, useEffect } from "react";
import { tasksService } from "../../services/services";
import { Task } from "../../models/Task";
import { Time } from "../../models/time";

export default function useTask(id?: number | string): Task | undefined {
  let [task, setTask] = useState<Task | undefined>(undefined);
  const cancel = useRef(false);

  if (id === "new") {
    id = Time.now();
    task = {
      id,
      title: "",
      description: "",
      priority: Time.now(),
      estimate: 0
    };
  }

  const effectiveId = parseInt((id || "-1").toString());

  useEffect(() => {
    !cancel.current &&
      tasksService.find(effectiveId).then(foundTask => {
        !cancel.current && setTask(foundTask);
      });

    return () => {
      cancel.current = true;
    };
  }, [id, effectiveId]);

  return task;
}
