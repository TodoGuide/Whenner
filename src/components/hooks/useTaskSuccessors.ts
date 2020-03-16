import { useState, useEffect } from "react";
import useTasksState from "./useTasksState";
import { Task, successorsOf } from "../../models/Task";
import useTask from "./useTask";

export default function useTaskSuccessors(taskId: number = -1) {
  const [task] = useTask(taskId);
  const [tasks] = useTasksState() || [];
  const [successors, setSuccessors] = useState<Task[]>();

  useEffect(() => {
    task &&
      tasks &&
      tasks.length > 0 &&
      setSuccessors(successorsOf(task, tasks));
  }, [task, taskId, tasks]);

  return successors;
}
