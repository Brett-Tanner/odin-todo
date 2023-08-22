import "./styles.css";
import { projectFactory } from "./projects/projectController";
import * as projectComponents from "./projects/projectComponents";
import { toDoFactory } from "./todos/toDoController";
import * as todoComponents from "./todos/toDoComponents";

const projects: project[] = [];

const storedString = localStorage.getItem("projects");
if (typeof storedString === "string") {
  const storedObjects: project[] = JSON.parse(storedString);
  storedObjects.forEach((object) => {
    const loadedProject = projectFactory(object["name"]);
    if (typeof object.todoList === "object") {
      object.todoList.forEach((storedTodo) => {
        const loadedTodo = toDoFactory(
          storedTodo.description,
          storedTodo.dueDate,
          storedTodo.priority,
          loadedProject,
          storedTodo.title
        );
        loadedProject.todoList.push(loadedTodo);
      });
    }
    projects.push(loadedProject);
  });
}

const allTodos = projects.reduce((array: todo[], project) => {
  project.todoList.forEach((toDo) => {
    array.push(toDo);
  });
  return array;
}, []);

if (projects.length === 0) {
  projects.push(projectFactory("Misc"));
}

projectComponents.list(projects);
todoComponents.list(allTodos, "All ToDos");

export { projects };
