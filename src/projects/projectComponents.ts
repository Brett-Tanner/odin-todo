function listProjects(projects: project[]) {
  const listContainer = document.createElement("nav");
  projects.forEach((project) => {
    listContainer.appendChild(projectCard(project));
  });
  const newProjectButton = document.createElement("button");
  newProjectButton.innerText = "➕ Project";
  newProjectButton.classList.add(
    "rounded-xl",
    "border-solid",
    "border-1",
    "bg-slate-300",
    "p-2",
    "m-2",
    "hover:bg-slate-400",
    "focus:ring-slate-500",
    "focus:ring-2"
  );
  listContainer.appendChild(newProjectButton);
  listContainer.classList.add(
    "sticky",
    "top-2",
    "col-start-9",
    "col-span-2",
    "rounded-xl",
    "border-solid",
    "border-slate-300",
    "border",
    "shadow-lg",
    "flex",
    "flex-col",
    "p-2",
    "divide-y-2",
    "text-center"
  );

  document.body.appendChild(listContainer);
}

function projectCard(project: project) {
  const card = document.createElement("div");

  const projectLink = document.createElement("a");
  projectLink.href = "";
  projectLink.innerText = project.name;
  projectLink.classList.add("font-semibold", "grow");
  projectLink.addEventListener("click", (e) => {
    e.preventDefault();
  });
  card.appendChild(projectLink);

  const newTodoButton = document.createElement("button");
  newTodoButton.innerText = "➕ ToDo";
  newTodoButton.classList.add(
    "rounded-xl",
    "border-solid",
    "border-1",
    "bg-slate-300",
    "p-2",
    "hover:bg-slate-400",
    "focus:ring-slate-500",
    "focus:ring-2"
  );
  card.appendChild(newTodoButton);

  card.classList.add(
    "flex",
    "flex-wrap",
    "justify-center",
    "items-center",
    "rounded",
    "p-2",
    "hover:bg-slate-100",
    "hover:scale-105",
    "transition-transform"
  );

  return card;
}

export { listProjects };
