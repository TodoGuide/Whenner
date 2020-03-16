import { useState, useEffect } from "react";
import useTasksState from "./useTasksState";
import { subtasksOf, Task } from "../../models/Task";
import useTask from "./useTask";

export default function useTaskSubtasks(taskId: number = -1) {
  const [task] = useTask(taskId);
  const [tasks] = useTasksState() || [];
  const [subtasks, setSubtasks] = useState<Task[]>();

  useEffect(() => {
    task && tasks && tasks.length > 0 && setSubtasks(subtasksOf(task, tasks));
  }, [task, taskId, tasks]);

  return subtasks;
}
