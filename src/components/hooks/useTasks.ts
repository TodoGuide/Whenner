import { useState, useEffect } from "react";
import { tasksService } from "../../services/services";
import { defaultTasks } from "../../models/TaskEvent";

export default function useTasks() {
  const [tasks, setTasks] = useState(defaultTasks);

  useEffect(() => {
    let cancel = false;
    tasksService.read().then(tasks => {
      !cancel && setTasks(tasks);
    });

    return () => {
      cancel = true;
    };
  }, []);

  return tasks;
}
