import { TodoAction, WhennerActionType } from './actions';
import { whennerStore } from './store';

it('The Store Works', () => {
  whennerStore.dispatch({
    type: WhennerActionType.CreateTodo,
    todo: {
      id: Date.now(),
      title: "Test",
      description: "Test",
      estimate: 5,
      start: new Date(),
      done: false
    }
  })
  expect(whennerStore.getState().todos.length).toEqual(1);
  expect(whennerStore.getState().todos[0].title).toEqual("Test");
  
});