// Get HTML elements
const addButton = document.getElementById('add-button');
const input = document.getElementById('add-item');

// Tasks on the local storage
let ItemsArray = JSON.parse(localStorage.getItem('tasks')) || [];

function displayTasks() {
  // Get the ul element
  const list = document.querySelector('#list');
  list.innerHTML = '';

  // Loop through the items and add them to the ul
  ItemsArray.forEach((task) => {
    // Create the li element
    const li = document.createElement('li');
    li.classList.add('item');

    // Create the <input> element
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('name', 'item');
    checkbox.setAttribute('id', `item-${task.index}`);
    checkbox.setAttribute('data-index', task.index);
    checkbox.checked = task.completed;
    li.appendChild(checkbox);

    // Create the <label> element
    const label = document.createElement('label');
    label.setAttribute('for', `item-${task.index}`);
    label.textContent = task.description;
    li.appendChild(label);

    // Create the edit button
    const editButton = document.createElement('button');
    editButton.classList.add('btn');
    li.appendChild(editButton);

    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn-delete');
    li.appendChild(deleteButton);

    // Add the li to the ul
    list.appendChild(li);

    // Add event listeners for editing and deleting
    label.addEventListener('dblclick', () => {
      // Replace the label with an input field
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('class', 'edit');
      input.value = task.description;
      li.replaceChild(input, label);

      // Change the edit button to a save button
      editButton.classList.replace('btn', 'delete');

      // Set focus on the input field
      input.focus();

      // Add event listener to save changes on enter or blur
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.keyCode === 13 || event.type === 'blur') {
          event.preventDefault();

          // Update the task description in the array
          task.description = input.value;
          localStorage.setItem('tasks', JSON.stringify(ItemsArray));

          // Replace the input field with the label
          li.replaceChild(label, input);

          // Change the save button back to an edit button
          editButton.classList.replace('btn', 'delete');
          displayTasks();
        }
      });

      deleteButton.addEventListener('click', () => {
        ItemsArray.splice(task.index - 1, 1);

        // Update the index property of the remaining tasks
        ItemsArray.forEach((task, index) => {
          task.index = index + 1;
        });
        localStorage.setItem('tasks', JSON.stringify(ItemsArray));
        window.location.reload();
      });
    });

    checkbox.addEventListener('change', (event) => {
      const index = event.target.dataset.index - 1;
      ItemsArray[index].completed = event.target.checked;
      localStorage.setItem('tasks', JSON.stringify(ItemsArray));
    });
  });
}

// Add functionality
function addTask() {
  const input = document.getElementById('add-item');
  const description = input.value;
  const index = ItemsArray.length + 1;
  const completed = false;
  const newItem = { index, description, completed };
  ItemsArray.push(newItem);
  localStorage.setItem('tasks', JSON.stringify(ItemsArray));
  document.getElementById('add-form').reset();
  window.location.reload();
}

// Add a new task when user hit the add button
addButton.addEventListener('click', (event) => {
  event.preventDefault();
  addTask();
});

// Add a new task when user hit enter key
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Delete the completed tasks
function deleteCompletedTasks() {
  ItemsArray = ItemsArray.filter((task) => !task.completed);

  // Update the index property of remaining tasks
  ItemsArray.forEach((task, index) => {
    task.index = index + 1;
  });
  localStorage.setItem('tasks', JSON.stringify(ItemsArray));
  displayTasks();
}

const clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', () => {
  deleteCompletedTasks();
});

displayTasks();