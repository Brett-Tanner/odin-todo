function checkListItemFactory(step: string) {
  let complete = false;

  function toggleComplete() {
    complete = !complete;
  }

  return { complete, step, toggleComplete };
}

export { checkListItemFactory };
