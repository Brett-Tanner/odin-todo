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

function saveProjects() {
  const dereferencedProjects = projects.map((project) => {
    const dereferencedToDos = project.todoList.map((todo) => {
      const dereferencedToDo = {
        description: todo.description,
        dueDate: todo.dueDate,
        notes: todo.notes,
        priority: todo.priority,
        title: todo.title,
        checklist: todo.checklist,
      };

      return dereferencedToDo;
    });
    const dereferencedProject = {
      name: project.name,
      todoList: dereferencedToDos,
    };

    return dereferencedProject;
  });

  localStorage.setItem("projects", JSON.stringify(dereferencedProjects));
}

export { projectFactory, saveProjects };
