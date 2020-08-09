import { useEffect } from "react";
import { tasksService } from "../services/services";
import useTasksState from "./useTasksState";

export default function useTasksSearch(
  search: string,
  excludeIds: number[] = []
) {
  const [tasks, setTasks] = useTasksState();
  search = search.toLowerCase();

  useEffect(() => {
    let cancel = false;
    !cancel &&
      tasksService.read().then((allTasks) => {
        !cancel &&
          setTasks(
            allTasks
              .filter((t) => !excludeIds.includes(t.id))
              .filter(
                (t) =>
                  t.description.toLowerCase().includes(search) ||
                  t.title.toLowerCase().includes(search) ||
                  t.id.toString().includes(search)
              )
          );
      });

    return () => {
      cancel = true;
    };
  }, [search, excludeIds, setTasks]);

  return tasks;
}
