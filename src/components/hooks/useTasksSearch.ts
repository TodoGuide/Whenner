import { useState, useRef, useEffect } from "react";
import { tasksService } from "../../services/services";
import { defaultTasks } from "../../models/TaskEvent";

export default function useTasksSearch(
  search: string,
  excludeIds: number[] = []
) {
  const [tasks, setTasks] = useState(defaultTasks);
  const cancel = useRef(false);

  search = search.toLowerCase();

  console.log("Cancel value", cancel);

  useEffect(() => {
    console.log("Cancel value in useEffect", cancel);
    // !cancel.current &&
    tasksService.read().then(allTasks => {
      // !cancel.current &&
      setTasks(
        allTasks
          .filter(t => !excludeIds.includes(t.id))
          .filter(t => {
            const result =
              t.description.toLowerCase().includes(search) ||
              t.title.toLowerCase().includes(search) ||
              t.id.toString().includes(search);
            console.log(`Search result of "${search}"`, result);
            return result;
          })
      );
    });

    return () => {
      console.log("Cancel useTasksSearch");
      cancel.current = true;
    };
  }, [search]);

  // console.log("Search results for " + search, tasks);

  return tasks;
}
