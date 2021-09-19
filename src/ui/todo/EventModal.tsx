// Licensed under GPL v3: https://www.gnu.org/licenses/gpl-3.0.txt
// Copyright (C) 2019  James Tharpe

import React from "react";
import { Form, InputGroup, ModalProps, Modal, Button } from "react-bootstrap";
import Time from "../../models/time";
import Event from "../../models/event";
import Task from "../../models/task";

interface EventModalProps extends ModalProps {
  event?: Event;
  onSaveEvent: (event: Event) => void;
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
    this.state = { event: props.event as Event };
  }

  readInput({
    id,
    value,
    checked,
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

  handleInputChange = (inputEvent: React.FormEvent<HTMLInputElement>) => {
    const { propName } = this.propInfoFromTarget(inputEvent.currentTarget);
    if (propName === "done") {
      const event = {
        ...this.state.event,
        completed: this.readInput(inputEvent.currentTarget)
          ? Time.current()
          : null,
      };
      this.setState({
        ...this.state,
        event,
      });
    } else {
      this.setState({
        ...this.state,
        event: {
          ...this.state.event,
          [propName]: this.readInput(inputEvent.currentTarget),
        },
      });
    }
  };

  handleSubmit = () => {
    this.props.onSaveEvent(this.state.event);
  };

  render() {
    const { event } = this.state;
    const { onSaveEvent: onSaveTodo, ...modalProps } = { ...this.props };
    return (
      <Modal {...modalProps}>
        <Modal.Header closeButton>
          <Modal.Title>
            {event.title || "What do you want to get done?"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit} id={"todo-" + event.id + "-form"}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                id={"todo-" + event.id + "-title-string"}
                size="lg"
                type="text"
                placeholder="What do you want to get done?"
                value={event.title}
                onChange={this.handleInputChange}
                autoFocus
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Estimate</Form.Label>
              <InputGroup>
                <Form.Control
                  id={"todo-" + event.id + "-estimate-int"}
                  type="text"
                  placeholder="How long will it take?"
                  value={((event as Task).estimate || "0").toString()}
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
                id={"todo-" + event.id + "-description-string"}
                type="text"
                as="textarea"
                placeholder="More details!"
                value={event.description}
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Check
              id={"todo-" + event.id + "-done-bool"}
              checked={!!(event as Task).completed}
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
