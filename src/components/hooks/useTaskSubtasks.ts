import { useState, useEffect } from "react";
import useTasksState from "./useTasksState";
import { subtasksOf, Task } from "../../models/Task";

/**
 * Loads subtasks of the specified task into state
 *
 * @export
 * @param {number} [taskId=-1]
 * @returns
 */
export default function useTaskSubtasks(taskId: number = -1) {
  const [tasks] = useTasksState() || [];
  const [subtasks, setSubtasks] = useState<Task[]>();

  console.log("useTaskSubtasks enter", { taskId, subtasks });

  useEffect(() => {
    console.log("useTaskSubtasks effect enter", { taskId });
    if (taskId !== -1 && tasks && tasks.length > 0) {
      const foundSubtasks = subtasksOf(taskId, tasks);
      setSubtasks(foundSubtasks);
      console.log("useTaskSubtasks effect", { taskId, foundSubtasks });
    } else {
      console.log("useTaskSubtasks effect found nothing", {
        taskId,
        tasks
      });
    }
  }, [taskId, tasks]);

  console.log("useTaskSubtasks exit", { taskId, subtasks });
  return subtasks;
}
