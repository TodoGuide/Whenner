// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React, { useState } from "react";
import { Card, Modal, Button, Form } from "react-bootstrap";
import { Task as TaskModel } from "../../models/Task";
import useTasksSearch from "../../hooks/useTasksSearch";

type TaskSearchModalProps = {
  id: string;
  title?: string;
  onSave?: { (task: TaskModel): void };
  onHide?: { (): void };
  show: boolean;
  excludeIds?: number[];
};

const TaskSearchModal: React.FC<TaskSearchModalProps> = ({
  id,
  title = "Search Tasks",
  excludeIds = [],
  show,
  onSave,
  onHide,
}: TaskSearchModalProps) => {
  const [search, setSearch] = useState("");
  const tasks = useTasksSearch(search, excludeIds);

  return (
    <Modal id={id} show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search..."
              onChange={({
                currentTarget: { value },
              }: React.ChangeEvent<HTMLInputElement>) => setSearch(value)}
            />
            <Form.Text className="text-muted">
              What can't be completed unless this task is finished?
            </Form.Text>
          </Form.Group>
        </Form>
        <div>
          {tasks.map((task) => (
            <Card key={`${id}-${task.id}`} className="mb-3">
              <Card.Header>
                <Card.Title>{task.title}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>{task.description || "(no description}"}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="primary"
                  onClick={() => onSave && onSave(task)}
                >
                  Select
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TaskSearchModal;
