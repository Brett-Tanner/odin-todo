interface checklistItem {
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
  checklist: checklistItem[];
  addNote(note: string): string;
  deleteTodo(this: todo): todo;
  modifyChecklist(steps: string[]): checklistItem[];
}
