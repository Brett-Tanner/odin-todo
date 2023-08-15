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

  const summary = document.createElement("div");
  const description = document.createElement("p");
  description.innerText = todo.description;
  summary.appendChild(description);
  const dueDate = document.createElement("p");
  dueDate.innerText = `Due: ${todo.dueDate}`;
  summary.appendChild(dueDate);

  card.appendChild(summary);
  card.classList.add("flex", "flex-col");
  return card;
}

export { listTodos };
