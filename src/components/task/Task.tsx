// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019 James Tharpe

import { useActor } from "@xstate/react";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { isCanceled, isClosed, isOpened } from "../../models/statuses";
import { TaskRecord } from "../../models/Task";
import EstimateInputFormGroup from "../EstimateInputFormGroup";
import TaskBreadcrumb from "./TaskBreadcrumb";

interface TaskProps {
  id: string;
  taskId: number;
  tasks: Array<TaskRecord>;
  currentDepth?: number;
  maxDepth?: number;
}

const Task: React.FC<TaskProps> = ({
  id,
  taskId,
  tasks,
  currentDepth = 1,
}: TaskProps) => {
  const taskRef = tasks.find((t) => t.id === taskId)?.ref;
  if (!taskRef) throw new Error(`Task with ID ${taskId} not found in tasks`);

  const [state, send] = useActor(taskRef);
  const { record: task } = state.context;

  console.log("<Task>", {
    id,
    taskId,
    tasks,
    taskRef,
    currentDepth,
    state: state.toStrings(),
    events: state.nextEvents,
  });

  return (
    <div id={id}>
      <Form>
        <TaskBreadcrumb tasks={tasks} taskId={task.id} />
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
        <Form.Group
          id={id}
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target)
            // send({
            //   type: "CHANGE",
            //   record: { ...task, title: e.target.value },
            // })
          }
        >
          <Form.Check
            id={`${id}-incomplete-${task.id}`}
            checked={isOpened(task)}
            name="status"
            label="Incomplete"
            type="radio"
            readOnly
          />
          <Form.Check
            id={`${id}-complete-${task.id}`}
            checked={isClosed(task)}
            name="status"
            label="Complete [yyyy-MM-dd]"
            type="radio"
            readOnly
          />
          <Form.Check
            id={`${id}-canceled-${task.id}`}
            checked={isCanceled(task)}
            name="status"
            label="Canceled [yyyy-MM-dd]"
            type="radio"
            readOnly
          />
        </Form.Group>
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
