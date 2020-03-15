import { useState, useEffect } from "react";
import useTasks from "./useTasks";
import { Task, predecessorsOf } from "../../models/Task";
import useTask from "./useTask";

export default function useTaskPredecessors(taskId?: number) {
  const task = useTask(taskId);
  const [tasks] = useTasks() || [];
  const [predecessors, setPredecessors] = useState<Task[]>();

  useEffect(() => {
    task &&
      tasks &&
      tasks.length > 0 &&
      setPredecessors(predecessorsOf(task, tasks));
  }, [task, taskId, tasks]);

  return predecessors;
}
