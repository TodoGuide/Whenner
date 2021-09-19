// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright © 2021 James Tharpe

import React from "react";
import { Accordion, Card } from "react-bootstrap";
import { prioritizer, sortByPriority } from "../../attribs/prioritizable";
import { TaskRecord } from "../../task";
import Task from "./Task";
import TaskRelationshipTabs from "./TaskRelationshipTabs";

type TaskListProps = {
  id: string;
  tasks: Array<TaskRecord>;
  taskId?: number;
  currentDepth?: number;
  maxDepth?: number;
};

const TaskList: React.FC<TaskListProps> = ({
  id,
  tasks,
  taskId,
  currentDepth = 1,
  maxDepth = 3,
}: TaskListProps) => {
  console.log("<TaskList>", { id, tasks, currentDepth, maxDepth });
  tasks = sortByPriority(prioritizer, ...tasks);
  return (
    <Accordion
      id={id}
      defaultActiveKey={`${id}-list-${currentDepth}-${taskId}`}
    >
      {tasks.map((task) => {
        const key = `${id}-list-${currentDepth}-${task.id}`;
        // console.log("TaskList, rendering task", { key, ref: task.ref });
        return (
          <Card key={key}>
            <Card.Header>
              <Accordion.Toggle as={Card.Header} eventKey={key}>
                <strong>{task.title}</strong> {task?.description}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={key}>
              <Card.Body>
                <Task
                  id={`${key}-task`}
                  tasks={tasks}
                  taskId={task.id}
                  currentDepth={currentDepth}
                  maxDepth={maxDepth}
                />
                <TaskRelationshipTabs
                  id={`${id}-relationships-${task.id}-${currentDepth}`}
                  tasks={tasks}
                  taskId={task.id}
                  currentDepth={currentDepth}
                  maxDepth={maxDepth}
                />
                <hr />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        );
      })}
    </Accordion>
  );
};

export default TaskList;
