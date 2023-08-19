import { format } from "date-fns";
import { sortByDueDate } from "./toDoController";

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

  const checkListButton = document.createElement("button");
  checkListButton.innerHTML = "<i class='bi bi-card-checklist'></i>";
  buttons.push(checkListButton);

  const editButton = document.createElement("button");
  editButton.innerHTML = "<i class='bi bi-pen'></i>";
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
  title.classList.add("font-semibold", "text-lg");
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

function removeFromList(todo: todo) {
  const project = todo.project;
  todo.deleteTodo();
  list(project.todoList, `${project.name} ToDos`);
}

function showDescription(todo: todo, target: HTMLDivElement) {
  target.innerText = todo.description;
}

function showNotes(todo: todo, target: HTMLDivElement) {
  target.innerHTML = "";
  const emptyMessage = "No notes yet!";
  const p = document.createElement("p");
  const notes: string[] | string =
    todo.notes.length === 0 ? emptyMessage : todo.notes;

  if (notes instanceof Array) {
    notes.forEach((note) => {
      p.innerText = note;
      target.appendChild(p);
    });
  } else {
    p.innerText = emptyMessage;
    target.appendChild(p);
    target.classList.add("flex", "justify-center", "items-center");
  }
}

export { list };
