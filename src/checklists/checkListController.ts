function checklistItemFactory(description: string) {
  let complete = false;

  function toggleComplete(this: checklistItem) {
    this.complete = this.complete ? false : true;

    return this.complete;
  }

  return { complete, description, toggleComplete };
}

export { checklistItemFactory };
