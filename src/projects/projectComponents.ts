import { modal, form } from "../sharedComponents";
import { projects } from "..";

function list(projects: project[]) {
  const listContainer = document.createElement("nav");
  projects.forEach((project) => {
    listContainer.appendChild(card(project));
  });
  const newProjectButton = document.createElement("button");
  newProjectButton.innerText = "➕ Project";
  newProjectButton.classList.add("btn-primary", "m-2", "hover:scale-110");
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
  projectLink.classList.add("font-semibold", "grow", "hover:scale-110");
  projectLink.addEventListener("click", (e) => {
    e.preventDefault();
  });
  card.appendChild(projectLink);

  const newTodoButton = document.createElement("button");
  newTodoButton.innerText = "➕ ToDo";
  newTodoButton.classList.add("btn-primary", "hover:scale-110");
  newTodoButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal("New ToDo", form(todoFields()));
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

function todoFields() {
  const fieldArray: HTMLElement[] = [];

  const submitButton = document.createElement("button");
  submitButton.innerText = "Submit";
  submitButton.classList.add("btn-primary", "border", "border-slate-400");
  // TODO: create the new todo here
  submitButton.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  fieldArray.push(submitButton);

  fieldArray.forEach((field) => {
    field.classList.add("flex", "flex-col", "gap-2");
  });

  return fieldArray;
}

export { list };
