import { modal } from "../sharedComponents";
import { projects } from "..";
import { projectFactory } from "./projectController";
import { sortByDueDate, toDoFactory } from "../todos/toDoController";
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
    modal("New ToDo", todoForm(project));
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
    modal("New Project", projectForm());
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

function todoForm(project: project) {
  const form = document.createElement("form");
  form.method = "dialog";
  const fieldArray: HTMLElement[] = [];

  const titleField = document.createElement("div");
  const titleLabel = document.createElement("label");
  titleLabel.innerText = "Title";
  const titleInput = document.createElement("input");
  titleInput.autofocus = true;
  titleField.append(titleLabel, titleInput);
  fieldArray.push(titleField);

  const descriptionField = document.createElement("div");
  const descriptionLabel = document.createElement("label");
  descriptionLabel.innerText = "Description";
  const descriptionInput = document.createElement("textarea");
  descriptionField.append(descriptionLabel, descriptionInput);
  fieldArray.push(descriptionField);

  const priorityField = document.createElement("div");
  const priorityLabel = document.createElement("label");
  priorityLabel.innerText = "Priority";
  const priorityInput = document.createElement("select");
  const priorities: priority[] = ["Immediate", "Urgent", "Moderate", "Low"];
  priorities.forEach((priority) => {
    const option = document.createElement("option");
    option.innerText = priority;
    option.value = priority;
    priorityInput.appendChild(option);
  });
  priorityField.append(priorityLabel, priorityInput);
  fieldArray.push(priorityField);

  const dueDateField = document.createElement("div");
  const dueDateLabel = document.createElement("label");
  dueDateLabel.innerText = "Due Date";
  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateField.append(dueDateLabel, dueDateInput);
  fieldArray.push(dueDateField);

  fieldArray.forEach((field) => {
    field.classList.add("flex", "flex-col", "gap-2");
    form.appendChild(field);
  });
  const submitButton = document.createElement("button");
  submitButton.innerText = "Submit ToDo";
  submitButton.classList.add("btn-primary", "border", "border-slate-400");
  submitButton.addEventListener("click", () => {
    const description = descriptionInput.value;
    const dueDate = Date.parse(dueDateInput.value);
    const priority = priorityInput.value as priority;
    const title = titleInput.value;

    console.log(
      title,
      description,
      priority,
      dueDate,
      project,
      project.todoList
    );
    project.todoList.push(
      toDoFactory(description, dueDate, priority, project, title)
    );
    todoComponents.list(project.todoList, `${project.name} ToDos`);
  });
  form.appendChild(submitButton);

  form.classList.add("flex", "flex-col", "gap-4");
  return form;
}

export { list };
