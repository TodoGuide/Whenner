// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Form, Button } from "react-bootstrap";
import EstimateInputFormGroup from "../EstimateInputFormGroup";
import TaskStatusFormGroup from "./TaskStatusFormGroup";
import TaskBreadcrumb from "./TaskBreadcrumb";
import { useActor } from "@xstate/react";
import { TaskActorRef } from "../../models/Task";

interface TaskProps {
  id: string;
  taskRef: TaskActorRef;
  currentDepth?: number;
  maxDepth?: number;
}

const Task: React.FC<TaskProps> = ({
  id,
  taskRef,
  currentDepth = 1,
}: TaskProps) => {
  const [state, send] = useActor(taskRef);
  const { record: task, error } = state.context;
  console.log("<Task>", {
    id,
    taskRef,
    currentDepth,
    state: state.toStrings(),
    events: state.nextEvents,
  });
  return (
    <div id={id}>
      <Form>
        <TaskBreadcrumb task={task} />
        <Form.Group id={`${id}-title-group-${task.id}-${currentDepth}`}>
          <Form.Control
            id={`${id}-title-${task.id}-${currentDepth}`}
            type="text"
            placeholder="What do you want to get done?"
            value={task.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              send({
                type: "CHANGE",
                record: { ...task, title: e.target.value },
              })
            }
          />
        </Form.Group>
        <Form.Group id={`${id}-description-group-${task.id}-${currentDepth}`}>
          <Form.Control
            id={`${id}-description-${task.id}-${currentDepth}`}
            as="textarea"
            rows="3"
            value={task.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              send({
                type: "CHANGE",
                record: { ...task, description: e.target.value },
              })
            }
          />
        </Form.Group>
        <EstimateInputFormGroup estimatedItem={task} />
        <TaskStatusFormGroup
          task={task}
          id={`${id}-state-${task.id}-${currentDepth}`}
        />
        <Form.Group controlId="actions" className="text-right">
          {state.nextEvents.includes("CANCEL") && (
            <Button
              variant="secondary"
              className="m-2"
              onClick={() => send({ type: "CANCEL", record: task })}
            >
              Cancel
            </Button>
          )}
          {state.nextEvents.includes("SAVE") && (
            <Button
              variant="primary"
              className="m-2"
              onClick={() => send({ type: "SAVE", record: task })}
            >
              Save Changes
            </Button>
          )}
        </Form.Group>
      </Form>
    </div>
  );
};

export default Task;
