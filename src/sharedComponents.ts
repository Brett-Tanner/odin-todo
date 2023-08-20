function modal(title: string, content: HTMLFormElement) {
  const modal = document.createElement("dialog");
  modal.id = "modal";

  const heading = document.createElement("h2");
  heading.innerText = title;
  heading.classList.add("mb-4", "font-bold", "text-xl", "px-11");
  modal.appendChild(heading);

  const closeButton = document.createElement("button");
  closeButton.innerText = "✕";
  closeButton.value = "cancel";
  closeButton.classList.add(
    "btn-primary",
    "border",
    "border-slate-400",
    "absolute",
    "top-4",
    "right-4"
  );
  closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal.close();
  });
  modal.appendChild(closeButton);

  modal.appendChild(content);

  modal.classList.add(
    "fixed",
    "inset-0",
    "bg-violet-400",
    "rounded-xl",
    "p-6",
    "text-center"
  );
  document.body.appendChild(modal);
  modal.showModal();
}

export { modal };
