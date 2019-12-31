import { oneHourTask, twoHourTask, threeHourTask } from "../test/data";
import {
  predecessorsOf,
  successorsOf,
  parentOf,
  childrenOf,
  parentsOf
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

  describe("Given tasks with parents", () => {
    const parent = { ...oneHourTask };
    const childA = { ...twoHourTask, parentId: parent.id };
    const childB = { ...threeHourTask, parentId: parent.id };
    const grandChild = { ...oneHourTask, parentId: childB.id };
    const allTasks = [parent, childA, childB, grandChild];

    describe("When parent() is called with the parent", () => {
      const actual = parentOf(parent, allTasks);

      it("Returns a falsy result", () => {
        expect(actual).toBeFalsy();
      });
    });

    describe("When parent() is called with a child or grandchild", () => {
      const parentOfChildA = parentOf(childA, allTasks);
      const parentOfChildB = parentOf(childB, allTasks);
      const parentOfGrandChild = parentOf(grandChild, allTasks);

      it("Returns the parent", () => {
        expect(parentOfChildA).toBe(parent);
        expect(parentOfChildB).toBe(parent);
        expect(parentOfGrandChild).toBe(childB);
      });
    });

    describe("When parents() is called with a child or grandchild", () => {
      const parentsOfChildA = parentsOf(childA, allTasks);
      const parentsOfChildB = parentsOf(childB, allTasks);
      const parentsOfGrandChild = parentsOf(grandChild, allTasks);

      it("Returns the parents, ordered from nearest to farthest", () => {
        expect(parentsOfChildA).toEqual([parent]);
        expect(parentsOfChildB).toEqual([parent]);
        expect(parentsOfGrandChild).toEqual([childB, parent]);
      });
    });

    describe("When childrenOf() is called with the parent", () => {
      const actual = childrenOf(parent, allTasks);

      it("Returns the children in priority order", () => {
        expect(actual).toEqual([childA, childB]);
      });
    });

    describe("When childrenOf() is called with a child", () => {
      const actual = childrenOf(childA, allTasks);

      it("Returns and empty list", () => {
        expect(actual).toBeFalsy();
      });
    });
  });
});
