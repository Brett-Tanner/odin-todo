import { format } from "date-fns";

function cardButtons() {
  const buttons: HTMLButtonElement[] = [];
  const buttonContainer = document.createElement("div");

  const descriptionButton = document.createElement("button");
  descriptionButton.innerHTML = "<i class='bi bi-card-text'></i>";
  buttons.push(descriptionButton);

  const notesButton = document.createElement("button");
  notesButton.innerHTML = "<i class='bi bi-journal'></i>";
  buttons.push(notesButton);

  const checkListButton = document.createElement("button");
  checkListButton.innerHTML = "<i class='bi bi-card-checklist'></i>";
  buttons.push(checkListButton);

  const editButton = document.createElement("button");
  editButton.innerHTML = "<i class='bi bi-pen'></i>";
  buttons.push(editButton);

  const deleteButton = document.createElement("button");
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

function listTodos(todos: todo[], title: string) {
  const mainHeading = document.getElementById("mainHeading");
  if (mainHeading) {
    mainHeading.innerText = title;
  } else {
    throw new Error("Main heading is missing");
  }
  const main = document.getElementById("content");
  todos.forEach((todo) => {
    const card = todoCard(todo);
    main?.appendChild(card);
  });
}

function todoCard(todo: todo) {
  const card = document.createElement("div");

  const title = document.createElement("h5");
  title.innerText = todo.title;
  title.classList.add("font-semibold", "text-lg");
  card.appendChild(title);

  const dueDate = document.createElement("p");
  dueDate.innerText = `Due: ${format(todo.dueDate, "MM/dd/yyyy")}`;
  dueDate.classList.add("text-xs");
  card.appendChild(dueDate);

  const description = document.createElement("p");
  description.innerText = todo.description;
  card.appendChild(description);

  card.appendChild(cardButtons());

  switch (todo.priority) {
    case "Immediate":
      card.classList.add("bg-yellow-200");
      break;
    case "Urgent":
      card.classList.add("bg-red-200");
      break;
    case "Moderate":
      card.classList.add("bg-orange-200");
      break;
    case "Low":
      card.classList.add("bg-blue-200");
      break;
    default:
      break;
  }
  card.classList.add(
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

  return card;
}

export { listTodos };
