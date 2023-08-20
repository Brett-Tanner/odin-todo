import { format } from "date-fns";
import { modal } from "../sharedComponents";
import { sortByDueDate, toDoFactory } from "./toDoController";
import { tr } from "date-fns/locale";

function buttonRow(todo: todo, target: HTMLDivElement) {
  const buttons: HTMLButtonElement[] = [];
  const buttonContainer = document.createElement("div");

  const descriptionButton = document.createElement("button");
  descriptionButton.innerHTML = "<i class='bi bi-card-text'></i>";
  descriptionButton.addEventListener("click", (e) => {
    e.preventDefault();
    showDescription(todo, target);
  });
  buttons.push(descriptionButton);

  const notesButton = document.createElement("button");
  notesButton.innerHTML = "<i class='bi bi-journal'></i>";
  notesButton.addEventListener("click", (e) => {
    e.preventDefault();
    showNotes(todo, target);
  });
  buttons.push(notesButton);

  const checklistButton = document.createElement("button");
  checklistButton.innerHTML = "<i class='bi bi-card-checklist'></i>";
  checklistButton.addEventListener("click", (e) => {
    e.preventDefault();
    showChecklist(todo, target);
  });
  buttons.push(checklistButton);

  const editButton = document.createElement("button");
  editButton.innerHTML = "<i class='bi bi-pen'></i>";
  editButton.addEventListener("click", (e) => {
    e.preventDefault();
    showEditModal(todo);
  });
  buttons.push(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    removeFromList(todo);
  });
  deleteButton.innerHTML = "<i class='bi bi-trash3'></i>";
  buttons.push(deleteButton);

  buttons.forEach((button) => {
    button.classList.add(
      "hover:scale-110",
      "hover:font-extrabold",
      "transition-transform"
    );
    buttonContainer.appendChild(button);
  });

  buttonContainer.classList.add(
    "flex",
    "justify-between",
    "gap-3",
    "font-semibold"
  );

  return buttonContainer;
}

function card(todo: todo) {
  const todoCard = document.createElement("div");

  const title = document.createElement("h5");
  title.innerText = todo.title;
  title.classList.add("font-semibold", "text-lg", "truncate");
  todoCard.appendChild(title);

  const dueDate = document.createElement("p");
  dueDate.innerText = `Due: ${format(todo.dueDate, "MM/dd/yyyy")}`;
  dueDate.classList.add("text-xs");
  todoCard.appendChild(dueDate);

  const description = document.createElement("p");
  description.innerText = todo.description;
  description.classList.add("grow");
  todoCard.appendChild(description);

  todoCard.appendChild(buttonRow(todo, description));

  switch (todo.priority) {
    case "Immediate":
      todoCard.classList.add("bg-yellow-300");
      break;
    case "Urgent":
      todoCard.classList.add("bg-red-300");
      break;
    case "Moderate":
      todoCard.classList.add("bg-orange-300");
      break;
    case "Low":
      todoCard.classList.add("bg-blue-300");
      break;
    default:
      break;
  }
  todoCard.classList.add(
    "flex",
    "flex-col",
    "gap-3",
    "p-3",
    "rounded-lg",
    "w-full",
    "h-full",
    "transition-transform",
    "hover:scale-105"
  );

  return todoCard;
}

function getMain() {
  const existingMain = document.getElementById("content");
  if (existingMain) {
    return existingMain;
  } else {
    const main = document.createElement("main");
    main.id = "content";
    return main;
  }
}

// TODO: implement this
function checklistForm(todo: todo) {
  const form = document.createElement("form");

  return form;
}

function form(project: project, todo?: todo) {
  const form = document.createElement("form");
  form.method = "dialog";
  const fieldArray: HTMLElement[] = [];

  const titleField = document.createElement("div");
  const titleLabel = document.createElement("label");
  titleLabel.innerText = "Title";
  const titleInput = document.createElement("input");
  titleInput.autofocus = true;
  if (todo) titleInput.value = todo.title;
  titleField.append(titleLabel, titleInput);
  fieldArray.push(titleField);

  const descriptionField = document.createElement("div");
  const descriptionLabel = document.createElement("label");
  descriptionLabel.innerText = "Description";
  const descriptionInput = document.createElement("textarea");
  if (todo) descriptionInput.value = todo.description;
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
    if (todo && todo.priority === priority) option.selected = true;
    priorityInput.appendChild(option);
  });
  priorityField.append(priorityLabel, priorityInput);
  fieldArray.push(priorityField);

  const dueDateField = document.createElement("div");
  const dueDateLabel = document.createElement("label");
  dueDateLabel.innerText = "Due Date";
  const dueDateInput = document.createElement("input");
  if (todo) dueDateInput.value = format(new Date(todo.dueDate), "yyyy-MM-dd");
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

    if (todo) {
      todo.description = description;
      todo.dueDate = dueDate;
      todo.priority = priority;
      todo.title = title;
    } else {
      project.todoList.push(
        toDoFactory(description, dueDate, priority, project, title)
      );
    }
    list(project.todoList, `${project.name} ToDos`);
  });
  form.appendChild(submitButton);

  form.classList.add("flex", "flex-col", "gap-4");
  return form;
}

function list(todos: todo[], title: string) {
  const mainHeading = document.getElementById("mainHeading");
  if (mainHeading) {
    mainHeading.innerText = title;
  } else {
    throw new Error("Main heading is missing");
  }
  const main = getMain();
  main.innerHTML = "";
  todos.sort(sortByDueDate);
  todos.forEach((todo) => {
    const todoCard = card(todo);
    main?.appendChild(todoCard);
  });
}

function noteForm(todo: todo, target: HTMLDivElement) {
  const form = document.createElement("form");
  form.method = "dialog";

  const noteField = document.createElement("div");
  const noteLabel = document.createElement("label");
  noteLabel.innerText = "Add your note here";
  const noteInput = document.createElement("textarea");
  noteInput.autofocus = true;
  noteField.append(noteLabel, noteInput);
  noteField.classList.add("flex", "flex-col", "gap-2");
  form.appendChild(noteField);

  const submitButton = document.createElement("button");
  submitButton.classList.add("btn-primary");
  submitButton.innerText = "Add Note";
  submitButton.addEventListener("click", () => {
    todo.notes.push(noteInput.value);
    showNotes(todo, target);
  });
  form.appendChild(submitButton);

  form.classList.add("flex", "flex-col", "gap-4");
  return form;
}

function removeFromList(todo: todo) {
  const project = todo.project;
  todo.deleteTodo();
  list(project.todoList, `${project.name} ToDos`);
}

function showDescription(todo: todo, target: HTMLDivElement) {
  target.innerText = todo.description;
}

function showChecklist(todo: todo, target: HTMLDivElement) {
  target.innerHTML = "";
  const addChecklistButton = document.createElement("button");
  addChecklistButton.classList.add("btn-primary");
  addChecklistButton.innerText = "➕ Checklist";
  addChecklistButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal(`New checklist for ${todo.title}`, checklistForm(todo));
  });
  if (todo.checklist.length === 0) {
    const p = document.createElement("p");
    p.innerText = "No checklist yet";
    target.append(p, addChecklistButton);
    target.classList.add(
      "flex",
      "flex-col",
      "gap-3",
      "justify-center",
      "items-center"
    );
  } else {
    throw new Error("Haven't implement checklist display yet");
  }
}

function showEditModal(todo: todo) {
  modal("Edit ToDo", form(todo.project, todo));
}

function showNotes(todo: todo, target: HTMLDivElement) {
  target.innerHTML = "";
  const emptyMessage = "No notes yet";
  const addNoteButton = document.createElement("button");
  addNoteButton.classList.add("btn-primary");
  addNoteButton.innerText = "➕ Note";
  addNoteButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal(`New note for ${todo.title}`, noteForm(todo, target));
  });
  const notes: string[] | string =
    todo.notes.length === 0 ? emptyMessage : todo.notes;

  if (notes instanceof Array) {
    notes.forEach((note) => {
      const p = document.createElement("p");
      p.innerText = note;
      target.appendChild(p);
    });
    target.appendChild(addNoteButton);
  } else {
    const p = document.createElement("p");
    p.innerText = emptyMessage;
    target.append(p, addNoteButton);
    target.classList.add(
      "flex",
      "flex-col",
      "gap-3",
      "justify-center",
      "items-center"
    );
  }
}

export { list, form };
