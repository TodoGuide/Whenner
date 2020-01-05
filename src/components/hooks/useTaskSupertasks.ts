import { useState, useRef, useEffect } from "react";
import useTasks from "./useTasks";
import { supertasksOf, Task } from "../../models/Task";
import useTask from "./useTask";

export default function useTaskSupertasks(taskId: number) {
  const task = useTask(taskId);
  const tasks = useTasks() || [];
  const [supertasks, setSupertasks] = useState<Task[]>();
  const cancel = useRef(false);

  useEffect(() => {
    !cancel.current &&
      task &&
      tasks &&
      tasks.length > 0 &&
      setSupertasks(supertasksOf(task, tasks));

    return () => {
      // cancel.current = true;
    };
  }, [task, taskId, tasks]);

  return supertasks;
}
