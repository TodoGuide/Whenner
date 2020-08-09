import { useState, useEffect } from "react";
import useTasksState from "./useTasksState";
import { Task, predecessorsOf } from "../models/Task";
import useTask from "./useTask";

export default function useTaskPredecessors(taskId: number = -1) {
  const [task] = useTask(taskId);
  const [tasks] = useTasksState() || [];
  const [predecessors, setPredecessors] = useState<Task[]>();

  useEffect(() => {
    task &&
      tasks &&
      tasks.length > 0 &&
      setPredecessors(predecessorsOf(task, tasks));
  }, [task, taskId, tasks]);

  return predecessors;
}
