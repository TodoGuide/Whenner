import { useState, useEffect } from "react";
import useTasks from "./useTasks";
import { supertasksOf, Task } from "../../models/Task";
import useTask from "./useTask";

export default function useTaskSupertasks(taskId: number) {
  const task = useTask(taskId);
  const tasks = useTasks() || [];
  const [supertasks, setSupertasks] = useState<Task[]>();

  useEffect(() => {
    task &&
      tasks &&
      tasks.length > 0 &&
      setSupertasks(supertasksOf(task, tasks));
  }, [task, taskId, tasks]);

  return supertasks;
}
