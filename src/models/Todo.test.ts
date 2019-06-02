import { Todo } from "./Todo";


describe("A Todo", () => {
  it("Converts to ITodo", () => {
    const todo = new Todo({
      id: 1,
      title: "Test",
      description: "Test",
      estimate: 5,
      start: new Date(2019, 6, 2, 15, 9, 8, 7),
      done: false
    })

    
  });
});