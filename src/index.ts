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
const todos: todo[] = [];
for (let i = 0; i < 50; i++) {
  const todo = toDoFactory(
    "A long string of content to test the description property of the todo object",
    Date.now() + Math.random() * 1000000000,
    priorities[Math.floor(Math.random() * priorities.length)],
    "Test Title"
  );
  todos.push(todo);
}

// Real stuff, might not be here though

function sortByDueDate(a: todo, b: todo) {
  const dateA = a.dueDate;
  const dateB = b.dueDate;
  if (dateA < dateB) return -1;
  if (dateB < dateA) return 1;
  return 0;
}

todos.sort(sortByDueDate);

projectComponents.listProjects(projects);
todoComponents.listTodos(todos, "All ToDos");
