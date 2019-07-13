import React, { FormEvent, ChangeEvent } from "react";
import { ITodo, Todo as TodoModel } from "../../models/Todo";
import {
  Form,
  FormControlProps,
  InputGroup,
  ModalProps,
  Modal,
  Button
} from "react-bootstrap";

interface TodoModalProps extends ModalProps {
  todo?: ITodo;
  onSaveTodo: (todo: ITodo) => void;
}

type TodoModalState = {
  todo: ITodo;
};

export default class TodoModal extends React.Component<
  TodoModalProps,
  TodoModalState
> {
  constructor(props: TodoModalProps) {
    super(props);
    console.log("TodoModal constructor", props.todo);
    const todo = new TodoModel(props.todo);
    this.state = { todo };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value, checked } = event.currentTarget;
    const [, , propName, propType] = id.split("-");
    const state = {
      ...this.state,
      todo: {
        ...this.state.todo,
        [propName]:
          propType === "bool"
            ? checked
            : propType === "int"
            ? parseInt(value)
            : value
      }
    };
    this.setState(state);
  };

  handleFormControlChange = (event: FormEvent<FormControlProps>) => {
    const { id, value } = event.currentTarget;
    if (!id) {
      throw new Error("Event was triggered on form control without an ID");
    }
    const [, , propName, propType] = id.split("-");
    const state = {
      ...this.state,
      todo: {
        ...this.state.todo,
        [propName]: propType === "int" ? parseInt(value || "") : value
      }
    };
    this.setState(state);
  };

  render() {
    const { todo } = this.state;
    const { onSaveTodo } = this.props;
    return (
      <Modal {...this.props}>
        <Modal.Header closeButton>
          <Modal.Title>{todo.title || "What do you want to get done?"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                id={"todo-" + todo.id + "-title-string"}
                size="lg"
                type="text"
                placeholder="What do you want to get done?"
                value={todo.title}
                onChange={this.handleFormControlChange}
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
                  onChange={this.handleFormControlChange}
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
                onChange={this.handleFormControlChange}
              />
            </Form.Group>

            <Form.Check
              id={"todo-" + todo.id + "-done-bool"}
              checked={!!todo.done}
              onChange={this.handleChange}
              label="Done"
              type="checkbox"
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" 
          onClick={this.props.onHide}
          >
            Close
          </Button>
          <Button variant="primary" onClick={() => onSaveTodo(this.state.todo)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
