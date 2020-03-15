// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { Task as TaskModel } from "../../models/Task";
import TaskAccordion from "./TaskAccordion";
import { itemKey } from "../utils";
import useTaskSubtasks from "../hooks/useTaskSubtasks";
import useTaskPredecessors from "../hooks/useTaskPredecessors";
import useTaskSuccessors from "../hooks/useTaskSuccessors";

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
  const fetchTaskId = currentDepth <= maxDepth ? task.id : undefined;
  const subtasks = useTaskSubtasks(fetchTaskId);
  const predecessors = useTaskPredecessors(fetchTaskId);
  const successors = useTaskSuccessors(fetchTaskId);
  const nextDepth = currentDepth + 1;

  return (
    <div id={id}>
      <Tabs
        defaultActiveKey={`${(subtasks && "Subtasks") ||
          (predecessors && "Predecessors") ||
          (successors && "Successors") ||
          "Subtasks"}`}
        id={`${id}-tabs`}
      >
        {(predecessors || currentDepth < maxDepth) && (
          <Tab eventKey="Predecessors" title="Predecessors" className="border">
            <small className="text-muted">
              These tasks must be completed before this task can start
            </small>
            <TaskAccordion
              tasks={predecessors || []}
              currentDepth={nextDepth}
              maxDepth={maxDepth}
              id={itemKey(`${id}-predecessors`, task, nextDepth)}
            />
          </Tab>
        )}
        {(subtasks || currentDepth < maxDepth) && (
          <Tab eventKey="Subtasks" title="Subtasks" className="border">
            <small className="text-muted">
              These tasks must be completed before the supertask can be marked
              complete
            </small>
            <TaskAccordion
              tasks={subtasks || []}
              currentDepth={nextDepth}
              maxDepth={maxDepth}
              id={itemKey(`${id}-subtasks`, task, nextDepth)}
            />
          </Tab>
        )}
        {(successors || currentDepth < maxDepth) && (
          <Tab eventKey="Successors" title="Successors" className="border">
            <small className="text-muted">
              These tasks can't be started until this task is complete
            </small>
            <TaskAccordion
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
