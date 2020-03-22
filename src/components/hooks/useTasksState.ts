import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { tasksService } from "../../services/services";
import { Task } from "../../models/Task";

export default function useTasksState(
  tasksState?: Task[]
): [Task[], Dispatch<SetStateAction<Task[]>>] {
  const [tasks, setTasks] = useState(tasksState || []);

  useEffect(() => {
    let cancel = false;
    if (!tasksState) {
      tasksService.read().then(tasks => {
        console.log("Read tasks", { cancel, tasks });
        !cancel && setTasks(tasks);
      });
    }

    return () => {
      cancel = true;
    };
  }, [tasksState]);

  return [tasks, setTasks];
}
