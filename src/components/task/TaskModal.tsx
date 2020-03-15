import React from "react";
import { Modal } from "react-bootstrap";
import Task from "./Task";
import { useParams, Link } from "react-router-dom";
import useTask from "../hooks/useTask";

const TaskModal: React.FC = (modalProps: any) => {
  const { id } = useParams();
  const task = useTask(id);

  return (
    (task && (
      <Modal id={id} onChange={() => {}} {...modalProps}>
        <Modal.Header closeButton>
          <Modal.Title>
            {task.title || "What do you want to get done?"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Task
            id={`${id}-modal-body`}
            // {...{ task, currentDepth, maxDepth, onSave, onClose }}
            {...{ task }}
          />
        </Modal.Body>
      </Modal>
    )) || (
      <div>
        <h1>Task not found</h1>
        <Link to="/tasks">View all tasks</Link>
      </div>
    )
  );
};

export default TaskModal;
