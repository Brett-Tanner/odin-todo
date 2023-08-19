interface checkListItem {
  complete: boolean;
  step: string;
}

type priority = "Immediate" | "Urgent" | "Moderate" | "Low";

interface project {
  name: string;
  todoList: todo[];
  addTodo(
    description: string,
    dueDate: number,
    priority: priority,
    title: string
  ): todo;
}

interface todo {
  description: string;
  dueDate: number;
  notes: string[];
  priority: priority;
  project: project;
  title: string;
  checkList: checkListItem[];
  addNote(note: string): string;
  deleteTodo(this: todo): todo;
  modifyCheckList(steps: string[]): checkListItem[];
}
