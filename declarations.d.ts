interface checkListItem {
  complete: boolean;
  step: string;
}

type priority = "Immediate" | "Urgent" | "Moderate" | "Low";

interface project {
  name: string;
  todoList: todo[];
}

interface todo {
  description: string;
  dueDate: number;
  notes?: string[];
  priority: priority;
  title: string;
  checkList?: checkListItem[];
}
