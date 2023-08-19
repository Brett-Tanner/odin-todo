import "./styles.css";
import { projectFactory } from "./projects/projectController";
import * as projectComponents from "./projects/projectComponents";
import { toDoFactory } from "./todos/toDoController";
import * as todoComponents from "./todos/toDoComponents";

// Temp stuff for testing
const projects: project[] = [
  projectFactory("Misc"),
  projectFactory("Work"),
  projectFactory("Odin Project"),
  projectFactory("Gardening"),
];

const priorities: priority[] = ["Immediate", "Urgent", "Moderate", "Low"];
for (let i = 0; i < 11; i++) {
  const todo = toDoFactory(
    "A long string of content to test the description property of the todo object",
    Date.now() + Math.random() * 1000000000,
    priorities[Math.floor(Math.random() * priorities.length)],
    "Test Title"
  );
  projects[0].todoList.push(todo);
}

// Real stuff, might not be here though

const allTodos = projects.reduce((array: todo[], project) => {
  project.todoList.forEach((toDo) => {
    array.push(toDo);
  });
  return array;
}, []);

projectComponents.list(projects);
todoComponents.list(allTodos, "All ToDos");

export { projects };
