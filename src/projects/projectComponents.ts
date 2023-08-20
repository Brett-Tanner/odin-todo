import { modal } from "../sharedComponents";
import { projects } from "..";
import { projectFactory } from "./projectController";
import * as todoComponents from "../todos/toDoComponents";

function card(project: project) {
  const card = document.createElement("div");

  const projectLink = document.createElement("a");
  projectLink.href = "";
  projectLink.innerText = project.name;
  projectLink.classList.add(
    "font-semibold",
    "grow",
    "hover:scale-110",
    "transition-transform"
  );
  projectLink.addEventListener("click", (e) => {
    e.preventDefault();
    todoComponents.list(project.todoList, `${project.name} ToDos`);
  });
  card.appendChild(projectLink);

  const newTodoButton = document.createElement("button");
  newTodoButton.innerText = "➕ ToDo";
  newTodoButton.classList.add(
    "btn-primary",
    "hover:scale-110",
    "transition-transform"
  );
  newTodoButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal("New ToDo", todoComponents.form(project));
  });
  card.appendChild(newTodoButton);

  card.classList.add(
    "flex",
    "flex-wrap",
    "justify-center",
    "items-center",
    "gap-2",
    "p-2",
    "hover:bg-violet-500",
    "transition-transform"
  );

  return card;
}

function getListContainer() {
  const existingContainer = document.getElementById("projectNav");
  if (existingContainer) {
    return existingContainer;
  } else {
    const listContainer = document.createElement("nav");
    listContainer.id = "projectNav";
    return listContainer;
  }
}

function list(projects: project[]) {
  const listContainer = getListContainer();
  listContainer.innerHTML = "";
  projects.forEach((project) => {
    listContainer.appendChild(card(project));
  });

  const newProjectButton = document.createElement("button");
  newProjectButton.innerText = "➕ Project";
  newProjectButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal("New Project", form());
  });
  newProjectButton.classList.add(
    "btn-primary",
    "m-2",
    "hover:scale-110",
    "transition-transform"
  );
  listContainer.appendChild(newProjectButton);

  const allTodosButton = document.createElement("button");
  allTodosButton.innerText = "All ToDos";
  allTodosButton.addEventListener("click", (e) => {
    e.preventDefault();
    const allTodos = projects.reduce((array: todo[], project) => {
      project.todoList.forEach((toDo) => {
        array.push(toDo);
      });
      return array;
    }, []);
    todoComponents.list(allTodos, "All ToDos");
  });
  allTodosButton.classList.add(
    "btn-primary",
    "m-2",
    "hover:scale-110",
    "transition-transform"
  );
  listContainer.appendChild(allTodosButton);

  listContainer.classList.add(
    "order-1",
    "mx-4",
    "md:order-2",
    "md:sticky",
    "md:top-2",
    "md:col-start-9",
    "md:col-span-2",
    "md:ml-0",
    "md:mr-4",
    "rounded-xl",
    "border",
    "border-violet-400",
    "bg-violet-600",
    "shadow-lg",
    "flex",
    "flex-col",
    "p-2",
    "text-center"
  );

  document.body.appendChild(listContainer);
}

function form() {
  const form = document.createElement("form");
  form.method = "dialog";

  const nameField = document.createElement("div");
  const nameLabel = document.createElement("label");
  nameLabel.innerText = "Project Name";
  const nameInput = document.createElement("input");
  nameInput.autofocus = true;
  nameField.append(nameLabel, nameInput);
  nameField.classList.add("flex", "flex-col", "gap-2");
  form.appendChild(nameField);

  const submitButton = document.createElement("button");
  submitButton.classList.add("btn-primary");
  submitButton.innerText = "Submit Project";
  submitButton.addEventListener("click", () => {
    projects.push(projectFactory(nameInput.value));
    list(projects);
  });
  form.appendChild(submitButton);

  form.classList.add("flex", "flex-col", "gap-4");
  return form;
}

export { list };
