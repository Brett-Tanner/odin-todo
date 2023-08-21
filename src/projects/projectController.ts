import { projects } from "..";
import { toDoFactory } from "../todos/toDoController";
import { list } from "./projectComponents";

function projectFactory(name: string) {
  const todoList: todo[] = [];

  function addTodo(
    this: project,
    description: string,
    dueDate: number,
    priority: priority,
    title: string
  ) {
    const newTodo = toDoFactory(description, dueDate, priority, this, title);
    todoList.push(newTodo);
    return newTodo;
  }

  function deleteProject(this: project) {
    const index = projects.indexOf(this);
    projects.splice(index, 1);
    list(projects);

    return this;
  }

  return { addTodo, deleteProject, name, todoList };
}

export { projectFactory };
