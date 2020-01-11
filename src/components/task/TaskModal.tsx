import React from "react";
import { Modal } from "react-bootstrap";
import Task, { TaskProps } from "./Task";

const TaskModal: React.FC<TaskProps> = ({
  id,
  task,
  currentDepth = 1,
  maxDepth = 3,
  onSave,
  onClose,
  ...modalProps
}: TaskProps) => {
  return (
    <Modal id={id} onChange={() => {}} {...modalProps}>
      <Modal.Header closeButton>
        <Modal.Title>
          {task.title || "What do you want to get done?"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Task
          id={`${id}-modal-body`}
          {...{ task, currentDepth, maxDepth, onSave, onClose }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default TaskModal;
