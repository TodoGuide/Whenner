import { oneHourTask, twoHourTask, threeHourTask } from "../test/data/tasks";
import {
  predecessorsOf,
  successorsOf,
  supertaskOf,
  subtasksOf,
  supertasksOf
} from "./Task";

// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

describe("The Tasks module", () => {
  describe("Given a task with a predecessor", () => {
    const predecessor = { ...oneHourTask, predecessorIds: [] };
    const successor = { ...twoHourTask, predecessorIds: [predecessor.id] };
    const allTasks = [predecessor, successor];

    describe("When predecessors() is called with the successor", () => {
      const actual = predecessorsOf(successor, allTasks);

      it("Returns the predecessor", () => {
        expect(actual).toEqual([predecessor]);
      });
    });

    describe("When predecessors() is called with the predecessor", () => {
      const actual = predecessorsOf(predecessor, allTasks);

      it("Returns an empty result", () => {
        expect(actual).toBeFalsy();
      });
    });

    describe("When successors() is called with the successor", () => {
      const actual = successorsOf(successor, allTasks);

      it("Returns an empty list", () => {
        expect(actual).toBeFalsy();
      });
    });

    describe("When successors() is called with the predecessor", () => {
      const actual = successorsOf(predecessor, allTasks);

      it("Returns the successor", () => {
        expect(actual).toEqual([successor]);
      });
    });
  });

  describe("Given tasks with supertasks", () => {
    const supertask = { ...oneHourTask };
    const subtaskA = { ...twoHourTask, supertaskId: supertask.id };
    const subtaskB = { ...threeHourTask, supertaskId: supertask.id };
    const subSubtask = { ...oneHourTask, id: 1000, supertaskId: subtaskB.id };
    const allTasks = [supertask, subtaskA, subtaskB, subSubtask];

    describe("When supertaskOf() is called with the supertask", () => {
      const actual = supertaskOf(supertask, allTasks);

      it("Returns a falsy result", () => {
        expect(actual).toBeFalsy();
      });
    });

    describe("When supertaskOf() is called with a subtask or sub-subtask", () => {
      const supertaskOfSubtaskA = supertaskOf(subtaskA, allTasks);
      const supertaskOfSubtaskB = supertaskOf(subtaskB, allTasks);
      const supertaskOfSubSubtask = supertaskOf(subSubtask, allTasks);

      it("Returns the supertask", () => {
        expect(supertaskOfSubtaskA).toBe(supertask);
        expect(supertaskOfSubtaskB).toBe(supertask);
        expect(supertaskOfSubSubtask).toBe(subtaskB);
      });
    });

    describe("When supertasksOf() is called with a subtask or sub-subtask", () => {
      const supertasksOfSubtaskA = supertasksOf(subtaskA, allTasks);
      const supertasksOfSubtaskB = supertasksOf(subtaskB, allTasks);
      const supertasksOfSubSubtask = supertasksOf(subSubtask, allTasks);

      it("Returns the supertasks, ordered from nearest to farthest", () => {
        expect(supertasksOfSubtaskA).toEqual([supertask]);
        expect(supertasksOfSubtaskB).toEqual([supertask]);
        expect(supertasksOfSubSubtask).toEqual([subtaskB, supertask]);
      });
    });

    describe("When subtasksOf() is called with the supertask", () => {
      const actual = subtasksOf(supertask.id, allTasks);

      it("Returns the subtasks in priority order", () => {
        expect(actual).toEqual([subtaskA, subtaskB]);
      });
    });

    describe("When subtasksOf() is called with a subtask", () => {
      const actual = subtasksOf(subtaskA.id, allTasks);

      it("Returns and empty list", () => {
        expect(actual).toBeFalsy();
      });
    });
  });

  describe("Given a task with a recursive supertask", () => {
    const taskA = { ...oneHourTask };
    const taskB = { ...twoHourTask, supertaskId: taskA.id };
    taskA.supertaskId = taskB.id;
    const allTasks = [taskA, taskB];

    describe("When supertaskOf() is called", () => {
      const supertasksOfA = supertasksOf(taskA, allTasks);
      const supertasksOfB = supertasksOf(taskB, allTasks);

      it("Ignores the recursion so that there is no infinite loop", () => {
        expect(supertasksOfA).toEqual([taskB]);
        expect(supertasksOfB).toEqual([taskA]);
      });
    });
  });
});
