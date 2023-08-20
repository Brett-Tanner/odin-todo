import { modal } from "../sharedComponents";
import { checklistItemFactory } from "./checkListController";

function form(todo: todo, target: HTMLDivElement) {
  const form = document.createElement("form");
  form.method = "dialog";
  form.appendChild(stepField(true));

  const newStepButton = document.createElement("button");
  newStepButton.classList.add("btn-primary");
  newStepButton.innerText = "Add a Step";
  newStepButton.addEventListener("click", (e) => {
    e.preventDefault();
    newStepButton.before(stepField(false));
  });
  form.appendChild(newStepButton);

  const submitButton = document.createElement("button");
  submitButton.classList.add("btn-primary");
  submitButton.innerText = "Create Checklist";
  submitButton.addEventListener("click", () => {
    const steps = document.querySelectorAll(".step");
    steps.forEach((step) => {
      if (step instanceof HTMLInputElement) {
        todo.checklist.push(checklistItemFactory(step.value));
      }
    });
    showChecklist(todo, target);
  });
  form.appendChild(submitButton);

  form.classList.add("flex", "flex-col", "gap-4");
  return form;
}

function showChecklist(todo: todo, target: HTMLDivElement) {
  target.innerHTML = "";
  const addChecklistButton = document.createElement("button");
  addChecklistButton.classList.add("btn-primary");
  addChecklistButton.innerText = "➕ Checklist";
  addChecklistButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal(`New checklist for ${todo.title}`, form(todo, target));
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
    const list = document.createElement("ol");
    todo.checklist.forEach((step) => {
      const listItem = document.createElement("li");
      const statusCheck = document.createElement("input");
      statusCheck.type = "checkbox";
      if (step.complete) statusCheck.checked = true;
      // TODO: Need an event listener on the checkbox to toggle complete
      listItem.innerText = step.description;
      listItem.prepend(statusCheck);
      // TODO: style
      list.appendChild(listItem);
    });
    // TODO: style
    target.appendChild(list);
  }
}

function stepField(first: boolean) {
  const stepField = document.createElement("div");
  const stepLabel = document.createElement("label");
  stepLabel.innerText = "Step";
  const stepInput = document.createElement("input");
  stepInput.classList.add("step");
  if (first) stepInput.autofocus = true;
  stepField.append(stepLabel, stepInput);
  stepField.classList.add("flex", "flex-col", "gap-2");

  return stepField;
}

export { form, showChecklist };
