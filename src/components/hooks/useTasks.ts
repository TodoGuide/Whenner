import { useState, useRef, useEffect } from "react";
import { tasksService } from "../../services/services";
import { defaultTasks } from "../../models/TaskEvent";

export default function useTasks() {
  const [tasks, setTasks] = useState(defaultTasks);

  const cancel = useRef(false);
  useEffect(() => {
    !cancel.current &&
      tasksService.read().then(tasks => {
        !cancel.current && setTasks(tasks);
      });

    return () => {
      cancel.current = true;
    };
  }, []);

  return tasks;
}
