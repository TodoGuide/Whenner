// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import {
  subtasksOf,
  predecessorsOf,
  successorsOf,
  TaskRecord,
} from "../../models/task";
import TaskList from "./TaskList";

interface TaskRelationshipTabsProps {
  id: string;
  tasks: Array<TaskRecord>;
  taskId: number;
  currentDepth?: number;
  maxDepth?: number;
}

const TaskRelationshipTabs: React.FC<TaskRelationshipTabsProps> = ({
  id,
  tasks,
  taskId,
  currentDepth = 1,
  maxDepth = 3,
}: TaskRelationshipTabsProps) => {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) throw new Error(`Task with ID ${taskId} not found in props`);

  const subtasks = currentDepth <= maxDepth && subtasksOf(task, tasks);
  const predecessors = currentDepth <= maxDepth && predecessorsOf(task, tasks);
  const successors = currentDepth <= maxDepth && successorsOf(task, tasks);
  const nextDepth = currentDepth + 1;

  return (
    <div id={id}>
      <Tabs
        defaultActiveKey={`${
          (subtasks && "Subtasks") ||
          (predecessors && "Predecessors") ||
          (successors && "Successors") ||
          "Subtasks"
        }`}
        id="uncontrolled-tab-example"
        variant="pills"
      >
        {(predecessors || currentDepth < 6) && (
          <Tab eventKey="Predecessors" title="Predecessors">
            <small className="text-muted">
              These tasks must be completed before this task can start
            </small>
            <TaskList
              tasks={predecessors || []}
              taskId={0}
              currentDepth={nextDepth}
              maxDepth={maxDepth}
              id={`${id}-predecessors-${task.id}-${nextDepth}`}
            />
          </Tab>
        )}
        {(subtasks || currentDepth < 6) && (
          <Tab eventKey="Subtasks" title="Subtasks">
            <small className="text-muted">
              These tasks must be completed before the supertask can be marked
              complete
            </small>
            <TaskList
              tasks={subtasks || []}
              currentDepth={nextDepth}
              maxDepth={maxDepth}
              id={`${id}-subtasks-${task.id}-${nextDepth}`}
            />
          </Tab>
        )}
        {(successors || currentDepth < 6) && (
          <Tab eventKey="Successors" title="Successors">
            <small className="text-muted">
              These tasks can't be started until this task is complete
            </small>
            <TaskList
              tasks={successors || []}
              currentDepth={nextDepth}
              maxDepth={maxDepth}
              id={`${id}-successors-${task.id}-${nextDepth}`}
            />
          </Tab>
        )}
      </Tabs>
      <hr />
    </div>
  );
};

export default TaskRelationshipTabs;
