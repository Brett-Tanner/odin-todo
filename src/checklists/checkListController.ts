function checklistItemFactory(description: string) {
  let complete = false;

  function toggleComplete() {
    complete = !complete;
  }

  return { complete, description, toggleComplete };
}

export { checklistItemFactory };
