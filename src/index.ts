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
const todos: todo[] = [];
for (let i = 0; i < 50; i++) {
  const todo = toDoFactory("test", 1, "Moderate", "Test Title");
  todos.push(todo);
}

projectComponents.listProjects(projects);
todoComponents.listTodos(todos, "All ToDos");
