import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { tasksService } from "../../services/services";
import { Task } from "../../models/Task";

export default function useTasksState(
  tasksState?: Task[]
): [Task[], Dispatch<SetStateAction<Task[]>>] {
  const [tasks, setTasks] = useState(tasksState || []);

  useEffect(() => {
    let cancel = false;
    if (!tasksState || tasksState.length === 0) {
      tasksService.read().then(readTasks => {
        console.log("useTasksState effect", { cancel, tasks: readTasks });
        !cancel && setTasks(readTasks);
      });
    }

    return () => {
      cancel = true;
    };
  }, [tasksState]);

  // console.log("useTasksState exit", { tasksState, tasks });

  return [tasks || [], setTasks];
}
