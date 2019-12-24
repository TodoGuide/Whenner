// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Form, InputGroup, ModalProps, Modal, Button } from "react-bootstrap";
import { Time } from "../../models/time";
import { TaskEvent } from "../../models/TaskEvent";
import { Event } from "../../models/Event";

interface EventModalProps extends ModalProps {
  event?: Event;
  onSaveTodo: (event: Event) => void;
}

type EventModalState = {
  event: Event;
};

export default class EventModal extends React.Component<
  EventModalProps,
  EventModalState
> {
  constructor(props: EventModalProps) {
    super(props);
    this.state = { event: new TaskEvent(props.event) };
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

  handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { propName } = this.propInfoFromTarget(event.currentTarget);
    if (propName === "done") {
      const todo = new TaskEvent(this.state.event);
      todo.completed = this.readInput(event.currentTarget)
        ? Time.current()
        : undefined;
      this.setState({
        ...this.state,
        event: todo
      });
    } else {
      this.setState({
        ...this.state,
        event: {
          ...this.state.event,
          [propName]: this.readInput(event.currentTarget)
        }
      });
    }
  };

  handleSubmit = () => {
    this.props.onSaveTodo(this.state.event);
  };

  render() {
    const { event: todo } = this.state;
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
                  value={(todo.estimate || "0").toString()}
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
