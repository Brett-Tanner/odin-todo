function modal(title: string, content: HTMLFormElement) {
  const modal = document.createElement("dialog");

  const heading = document.createElement("h2");
  heading.innerText = title;
  heading.classList.add("mb-4");
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

function form(fields: HTMLElement[]) {
  const form = document.createElement("form");
  form.method = "dialog";

  fields.forEach((field) => {
    form.appendChild(field);
  });

  form.classList.add("flex", "flex-col", "gap-4");
  return form;
}

export { form, modal };
