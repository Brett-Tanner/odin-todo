import { modal } from "../sharedComponents";
import { projects } from "..";
import { projectFactory } from "./projectController";

function createListContainer() {
  const listContainer = document.createElement("nav");
  listContainer.id = "projectNav";
  return listContainer;
}

function list(projects: project[]) {
  const existingContainer = document.getElementById("projectNav");
  const listContainer =
    existingContainer !== null ? existingContainer : createListContainer();
  listContainer.innerHTML = "";

  projects.forEach((project) => {
    listContainer.appendChild(card(project));
  });
  const newProjectButton = document.createElement("button");
  newProjectButton.innerText = "➕ Project";
  newProjectButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal("New Project", projectForm());
  });
  newProjectButton.classList.add(
    "btn-primary",
    "m-2",
    "hover:scale-110",
    "transition-transform"
  );
  listContainer.appendChild(newProjectButton);
  listContainer.classList.add(
    "sticky",
    "top-2",
    "col-start-9",
    "col-span-2",
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
    modal("New ToDo", todoForm());
  });
  card.appendChild(newTodoButton);

  card.classList.add(
    "flex",
    "flex-wrap",
    "justify-center",
    "items-center",
    "p-2",
    "hover:bg-violet-500",
    "transition-transform"
  );

  return card;
}

function projectForm() {
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

function todoForm() {
  const form = document.createElement("form");
  form.method = "dialog";
  const fieldArray: HTMLElement[] = [];

  fieldArray.forEach((field) => {
    field.classList.add("flex", "flex-col", "gap-2");
    form.appendChild(field);
  });
  const submitButton = document.createElement("button");
  submitButton.innerText = "Submit ToDo";
  submitButton.classList.add("btn-primary", "border", "border-slate-400");
  // TODO: create the new todo here
  submitButton.addEventListener("click", () => {});
  fieldArray.push(submitButton);

  form.classList.add("flex", "flex-col", "gap-4");
  return form;
}

export { list };
