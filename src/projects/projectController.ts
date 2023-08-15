import { toDoFactory } from "../todos/toDoController";

function projectFactory(name: string) {
  const todoList: todo[] = [];

  function addTodo(
    description: string,
    dueDate: number,
    priority: priority,
    title: string
  ) {
    todoList.push(toDoFactory(description, dueDate, priority, title));
  }

  return { addTodo, name, todoList };
}

export { projectFactory };
