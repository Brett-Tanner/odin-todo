import "./styles.css";
import { projectFactory } from "./projects/projectController";
import * as projectComponents from "./projects/projectComponents";
import { toDoFactory } from "./todos/toDoController";
import * as todoComponents from "./todos/toDoComponents";

// Temp stuff for testing
// const projects: project[] = [
//   projectFactory("Misc"),
//   projectFactory("Work"),
//   projectFactory("Odin Project"),
//   projectFactory("Gardening"),
// ];

// const priorities: priority[] = ["Immediate", "Urgent", "Moderate", "Low"];
// for (let i = 0; i < 11; i++) {
//   const todo = toDoFactory(
//     "A long string of content to test the description property of the todo object",
//     Date.now() + Math.random() * 1000000000,
//     priorities[Math.floor(Math.random() * priorities.length)],
//     projects[0],
//     "Test Title"
//   );
//   projects[0].todoList.push(todo);
// }

// Real stuff, might not be here though

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

projectComponents.list(projects);
todoComponents.list(allTodos, "All ToDos");

export { projects };
