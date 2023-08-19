import * as checkListController from "../checklists/checkListController";

function toDoFactory(
  description: string,
  dueDate: number,
  priority: priority,
  project: project,
  title: string
) {
  const checkList: checkListItem[] = [];
  const notes: string[] = [];

  function addNote(note: string) {
    notes.push(note);
    return note;
  }

  function deleteTodo(this: todo) {
    const index = project.todoList.indexOf(this);
    project.todoList.splice(index, 1);
    return this;
  }

  function modifyCheckList(steps: string[]) {
    checkList.length = 0;
    steps.forEach((step) => {
      checkList.push(checkListController.checkListItemFactory(step));
    });
    return checkList;
  }

  return {
    addNote,
    checkList,
    deleteTodo,
    description,
    dueDate,
    modifyCheckList,
    notes,
    priority,
    project,
    title,
  };
}

function sortByDueDate(a: todo, b: todo) {
  const dateA = a.dueDate;
  const dateB = b.dueDate;
  if (dateA < dateB) return -1;
  if (dateB < dateA) return 1;
  return 0;
}

export { sortByDueDate, toDoFactory };
