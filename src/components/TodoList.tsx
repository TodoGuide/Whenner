import React from 'react'
import Todo from './Todo'
import { ITodo } from '../models/Todo';
import { WhennerState } from '../redux/state';
import { updateTodo } from '../redux/actions';
import { connect } from 'react-redux';

interface TodoListProps {
  todos: ITodo[]
  onTodoClick: (todo: ITodo) => void;
}

const TodoList = ({ todos, onTodoClick }: TodoListProps) => (
  <ul>
    {todos.map((todo, index) => (
      <Todo key={index} {...todo} onClick={() => onTodoClick(todo)} />
    ))}
  </ul>
)

const mapStateToProps = (state: WhennerState) => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onTodoClick: (todo: ITodo) => {
      dispatch(updateTodo(todo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)