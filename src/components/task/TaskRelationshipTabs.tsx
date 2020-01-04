// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import {
  Task as TaskModel,
  subtasksOf,
  successorsOf,
  predecessorsOf
} from "../../models/Task";
import { allTestDataTasks } from "../../test/data";
import TaskList from "./TaskList";
import { itemKey } from "../utils";

interface TaskRelationshipTabsProps {
  id: string;
  task: TaskModel;
  currentDepth?: number;
  maxDepth?: number;
}

const TaskRelationshipTabs: React.FC<TaskRelationshipTabsProps> = ({
  id,
  task,
  currentDepth = 1,
  maxDepth = 3
}: TaskRelationshipTabsProps) => {
  const subtasks =
    currentDepth <= maxDepth && subtasksOf(task, allTestDataTasks);
  const predecessors =
    currentDepth <= maxDepth && predecessorsOf(task, allTestDataTasks);
  const successors =
    currentDepth <= maxDepth && successorsOf(task, allTestDataTasks);
  const nextDepth = currentDepth + 1;

  return (
    <div id={id}>
      <Tabs
        defaultActiveKey={`${(subtasks && "Subtasks") ||
          (predecessors && "Predecessors") ||
          (successors && "Successors") ||
          "Subtasks"}`}
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
              currentDepth={nextDepth}
              maxDepth={maxDepth}
              id={itemKey(`${id}-predecessors`, task, nextDepth)}
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
              id={itemKey(`${id}-subtasks`, task, nextDepth)}
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
              id={itemKey(`${id}-successors`, task, nextDepth)}
            />
          </Tab>
        )}
      </Tabs>
      <hr />
    </div>
  );
};

export default TaskRelationshipTabs;
