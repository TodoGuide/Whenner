import { useState, useRef, useEffect } from "react";
import { tasksService } from "../../services/services";
import { Task } from "../../models/Task";

export default function useTask(id: number) {
  const [task, setTask] = useState<Task | undefined>(undefined);
  const cancel = useRef(false);

  useEffect(() => {
    !cancel.current &&
      tasksService.find(id).then(foundTask => {
        !cancel.current && setTask(foundTask);
      });

    return () => {
      cancel.current = true;
    };
  }, [id]);

  return task;
}
