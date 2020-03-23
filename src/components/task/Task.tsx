// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import EstimateInputFormGroup from "./EstimateInputFormGroup";
import { Task as TaskModel } from "../../models/Task";
import TaskStatusFormGroup from "./TaskStatusFormGroup";
import TaskBreadcrumb from "./TaskBreadcrumb";
import TaskRelationshipTabs from "./TaskRelationshipTabs";
import TaskSearchModal from "./TaskSearchModal";

export interface TaskProps {
  id: string;
  task: TaskModel;
  currentDepth?: number;
  maxDepth?: number;
  onTaskModify?: { (task: TaskModel): void };
  onTaskSave?: { (task: TaskModel): void };
  onClose?: { (): void };
}

const Task: React.FC<TaskProps> = ({
  id,
  task,
  currentDepth = 1,
  maxDepth = 3,
  onTaskModify,
  onTaskSave,
  onClose
}: TaskProps) => {
  const [modified, setModified] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showSelectSupertask, setShowSelectSupertask] = useState(false);

  console.log("Task", { id, task, currentDepth, maxDepth });

  const handleTaskModify = (modifiedTask: TaskModel) => {
    setModified(true);
    setSaved(false);
    console.log("handleTaskModify", modifiedTask);
    onTaskModify && onTaskModify(modifiedTask);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onTaskSave && onTaskSave(task);
    setModified(false);
    setSaved(true);
    console.log("Save task", task);
  };

  return (
    <div id={id}>
      <Form onSubmit={handleFormSubmit}>
        <TaskBreadcrumb
          task={task}
          id={`${id}-breadcrumb`}
          onSetSupertaskClick={() => setShowSelectSupertask(true)}
        />
        <Form.Group id={`${id}-title-group`}>
          <Form.Control
            id={`${id}-title`}
            type="text"
            placeholder="What do you want to get done?"
            value={task.title}
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              handleTaskModify({ ...task, title: event.currentTarget.value })
            }
          />
        </Form.Group>
        <Form.Group id={`${id}-description-group`}>
          <Form.Control
            id={`${id}-description`}
            as="textarea"
            rows="3"
            value={task.description}
            onChange={(event: React.FormEvent<HTMLInputElement>) =>
              handleTaskModify({
                ...task,
                description: event.currentTarget.value
              })
            }
          />
        </Form.Group>
        <EstimateInputFormGroup
          estimatedItem={task}
          onModify={task => handleTaskModify(task as TaskModel)}
        />
        <TaskStatusFormGroup
          task={task}
          id={`${id}-state`}
          onModify={handleTaskModify}
        />
        <Form.Group controlId="actions" className="text-right">
          <Button
            variant="secondary"
            className="m-2"
            onClick={() => {
              handleTaskModify(task);
              onClose && onClose();
            }}
          >
            Close
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="m-2"
            disabled={!modified}
          >
            {saved ? "Saved" : "Save Changes"}
          </Button>
        </Form.Group>
      </Form>
      <TaskRelationshipTabs
        id={`${id}-relationships`}
        task={task}
        currentDepth={currentDepth + 1}
        maxDepth={maxDepth}
      />
      {showSelectSupertask && (
        <TaskSearchModal
          id={`${id}-supertask-modal`}
          title="Select Supertask"
          excludeIds={[task.id]}
          show={showSelectSupertask}
          onHide={() => setShowSelectSupertask(false)}
          onSave={newSuper => {
            handleTaskModify({ ...task, supertaskId: newSuper.id });
            setShowSelectSupertask(false);
            console.log("New super", newSuper);
          }}
        />
      )}
      <hr />
    </div>
  );
};

export default Task;
