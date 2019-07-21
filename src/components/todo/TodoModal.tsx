import React, { FormEvent, ChangeEvent } from "react";
import {
  Form,
  FormControlProps,
  InputGroup,
  ModalProps,
  Modal,
  Button
} from "react-bootstrap";
import { Time } from "../../models/time";
import { Task, ITask } from "../../models/Task";
import { TaskOrAppointment } from "../../models/Schedule";

interface TaskModalProps extends ModalProps {
  taskOrAppointment?: TaskOrAppointment;
  onSaveTodo: (task: ITask) => void;
}

type TodoModalState = {
  taskOrAppointment: TaskOrAppointment;
};

export default class TodoModal extends React.Component<
  TaskModalProps,
  TodoModalState
> {
  constructor(props: TaskModalProps) {
    super(props);
    this.state = { taskOrAppointment: new Task(props.taskOrAppointment) };
  }

  readInput({
    id,
    value,
    checked
  }: {
    id?: string;
    value?: string;
    checked?: boolean;
  }) {
    const { propType } = this.propInfoFromTarget({ id });
    return propType === "bool"
      ? checked || false
      : propType === "int"
      ? parseInt(value || "")
      : value;
  }

  propInfoFromTarget({ id }: { id?: string }) {
    const [, , propName, propType] = (id || "").split("-");
    if (!propName || !propType) {
      throw new Error("Could not extract propName and propType from ID " + id);
    }
    return { propName, propType };
  }

  handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | FormEvent<FormControlProps>
  ) => {
    const { propName } = this.propInfoFromTarget(event.currentTarget);
    if (propName === "done") {
      const todo = new Task(this.state.taskOrAppointment);
      todo.completed = this.readInput(event.currentTarget)
        ? Time.current()
        : undefined;
      this.setState({
        ...this.state,
        taskOrAppointment: todo
      });
    } else {
      this.setState({
        ...this.state,
        taskOrAppointment: {
          ...this.state.taskOrAppointment,
          [propName]: this.readInput(event.currentTarget)
        }
      });
    }
  };

  handleSubmit = () => {
    this.props.onSaveTodo(this.state.taskOrAppointment as ITask);
  }

  render() {
    const { taskOrAppointment: todo } = this.state;
    const { onSaveTodo, ...modalProps } = { ...this.props };
    return (
      <Modal {...modalProps}>
        <Modal.Header closeButton>
          <Modal.Title>
            {todo.title || "What do you want to get done?"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit} id={"todo-" + todo.id + "-form"}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                id={"todo-" + todo.id + "-title-string"}
                size="lg"
                type="text"
                placeholder="What do you want to get done?"
                value={todo.title}
                onChange={this.handleInputChange}
                autoFocus
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Estimate</Form.Label>
              <InputGroup>
                <Form.Control
                  id={"todo-" + todo.id + "-estimate-int"}
                  type="text"
                  placeholder="How long will it take?"
                  // value={(todo.estimate || "0").toString()}
                  onChange={this.handleInputChange}
                />
                <InputGroup.Append>
                  <InputGroup.Text>Minutes</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                id={"todo-" + todo.id + "-description-string"}
                type="text"
                as="textarea"
                placeholder="More details!"
                value={todo.description}
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Check
              id={"todo-" + todo.id + "-done-bool"}
              checked={!!todo.completed}
              onChange={this.handleInputChange}
              label="Done"
              type="checkbox"
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
