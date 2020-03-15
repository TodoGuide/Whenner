import { useState, useEffect } from "react";
import useTasks from "./useTasks";
import { Task, successorsOf } from "../../models/Task";
import useTask from "./useTask";

export default function useTaskSuccessors(taskId?: number) {
  const task = useTask(taskId);
  const [tasks] = useTasks() || [];
  const [successors, setSuccessors] = useState<Task[]>();

  useEffect(() => {
    task &&
      tasks &&
      tasks.length > 0 &&
      setSuccessors(successorsOf(task, tasks));
  }, [task, taskId, tasks]);

  return successors;
}
