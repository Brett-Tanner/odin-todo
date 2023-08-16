import { toDoFactory } from "../todos/toDoController";

function projectFactory(name: string) {
  const todoList: todo[] = [];

  function addTodo(
    description: string,
    dueDate: number,
    priority: priority,
    title: string
  ) {
    const newTodo = toDoFactory(description, dueDate, priority, title);
    todoList.push(newTodo);
    return newTodo;
  }

  return { addTodo, name, todoList };
}

export { projectFactory };
