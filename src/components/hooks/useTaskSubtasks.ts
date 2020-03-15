import { useState, useEffect } from "react";
import useTasks from "./useTasks";
import { subtasksOf, Task } from "../../models/Task";
import useTask from "./useTask";

export default function useTaskSubtasks(taskId?: number) {
  const task = useTask(taskId);
  const [tasks] = useTasks() || [];
  const [subtasks, setSubtasks] = useState<Task[]>();

  useEffect(() => {
    task && tasks && tasks.length > 0 && setSubtasks(subtasksOf(task, tasks));
  }, [task, taskId, tasks]);

  return subtasks;
}
