// Get HTML elements
const addButton = document.getElementById('add-button');
const input = document.getElementById('add-item');
const deleteButton = document.getElementById('clear-button');

// Get the items from the local storage
let ItemsArray = JSON.parse(localStorage.getItem("tasks")) || [];

// Render the items
let insideItem = '';
ItemsArray.forEach((singleItemContents, i) => {
  //Update the index of the item in the array
  ItemsArray[i].index = i+1;
  insideItem
  += `
    <li class="item">
        <input value="${singleItemContents.index}" name="item" type="checkbox" data-index="${singleItemContents.index}" id="${singleItemContents.index}">
        <label for="0${singleItemContents.index}">${singleItemContents.description}</label>
        <button type="button" class="btn"></button>
    </li>
    `;
});
const section = document.querySelector('.list');
section.innerHTML = insideItem;

console.log(ItemsArray);

// This function is to change the completed status on the array items
const checkboxes = document.querySelectorAll("input[type='checkbox']");

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', (event) => {
    const index = parseInt(event.target.value, 10);
    const task = ItemsArray.find((task) => task.index === index);

    if (event.target.checked) {
      task.completed = true;
    } else {
      task.completed = false;
    }
  });
});

// Add functionality
function addTask() {
  // Get the task from the input element
  const input = document.getElementById('add-item');
  const description = input.value;
  // Set and index base on the actual array
  const index = ItemsArray.length + 1;
  const completed = false;
  // Create teh object
  const newItem = { index, description, completed };
  console.log(newItem);
  // Save the task
  ItemsArray.push(newItem);
  // Save on local storage
  localStorage.setItem('tasks', JSON.stringify(ItemsArray));
  // Reset form values
  document.getElementById('add-form').reset();
  window.location.reload();

  // To update the listed tasks
  const taskList = document.getElementById('library');  
}

// Add a new task when user hit the add button
addButton.addEventListener('click', (event) => {
  // Prevents the form from being sent
  event.preventDefault();
  addTask()
});

// Add a new task when user hit enter key
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Delete the completed tasks
function clearCompleted() {
  // Filter out completed items
  const newItemsArray = ItemsArray.filter((item) => !item.completed);

  // Update local storage
  ItemsArray = newItemsArray;
  localStorage.setItem('tasks', JSON.stringify(ItemsArray));
  window.location.reload();
}

const clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', clearCompleted);

// Remove a task from the array
const removeTask = (index) => {
  // Delete the task from the array
  ItemsArray.splice(index, 1);
  // Guardar el array actualizado en el localStorage
  localStorage.setItem('tasks', JSON.stringify(ItemsArray));
  window.location.reload();
};

/*
// Delete a task from the array
deleteButton.addEventListener('click', (event) => {
  // Prevents the form from being sent
  event.preventDefault();
  removeTask()
});
*/