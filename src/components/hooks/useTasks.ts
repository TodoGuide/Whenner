import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { tasksService } from "../../services/services";
import { defaultTasks } from "../../models/TaskEvent";
import { Task } from "../../models/Task";

export default function useTasks(): [Task[], Dispatch<SetStateAction<Task[]>>] {
  const [tasks, setTasks] = useState(defaultTasks);

  useEffect(() => {
    let cancel = false;
    tasksService.read().then(tasks => {
      console.log("Read tasks", { cancel, tasks });
      !cancel && setTasks(tasks);
    });

    return () => {
      cancel = true;
    };
  }, []);

  return [tasks, setTasks];
}
