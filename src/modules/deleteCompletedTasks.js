// deleteTasks.js
function deleteCompletedTasks(ItemsArray) {
  ItemsArray = ItemsArray.filter((task) => !task.completed);

  // Update the index property of remaining tasks
  ItemsArray.forEach((task, index) => {
    task.index = index + 1;
  });

  localStorage.setItem('tasks', JSON.stringify(ItemsArray));
  return ItemsArray;
}

export default deleteCompletedTasks;