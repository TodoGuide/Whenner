import { useState, useEffect } from "react";
import { tasksService } from "../../services/services";
import { defaultTasks } from "../../models/TaskEvent";

export default function useTasksSearch(
  search: string,
  excludeIds: number[] = []
) {
  const [tasks, setTasks] = useState(defaultTasks);
  search = search.toLowerCase();

  useEffect(() => {
    let cancel = false;
    !cancel &&
      tasksService.read().then(allTasks => {
        !cancel &&
          setTasks(
            allTasks
              .filter(t => !excludeIds.includes(t.id))
              .filter(
                t =>
                  t.description.toLowerCase().includes(search) ||
                  t.title.toLowerCase().includes(search) ||
                  t.id.toString().includes(search)
              )
          );
      });

    return () => {
      cancel = true;
    };
  }, [search, excludeIds]);

  return tasks;
}
