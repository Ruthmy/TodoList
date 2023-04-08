//Get HTML elements
const tasksList = document.getElementById('list');
const addButton = document.getElementById('add-button');
const input = document.getElementById('add-item');
const deleteButton = document.getElementById('clear-button');
const listItem = document.querySelectorAll('.item');

// Tasks on the local storage
let ItemsArray = JSON.parse(localStorage.getItem('tasks')) || [];

function displayTasks() {
  // Get the <ul> element
  const list = document.querySelector('#list');

  // Remove any existing <li> elements
  list.innerHTML = '';

  // Loop through the items and add them to the <ul>
  ItemsArray.forEach((task) => {
    // Create the <li> element
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
    editButton.setAttribute('aria-label', 'Edit');
    editButton.innerHTML = '&#9998;';
    li.appendChild(editButton);

    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn');
    deleteButton.setAttribute('aria-label', 'Delete');
    deleteButton.innerHTML = '&#128465;';
    li.appendChild(deleteButton);

    // Add the <li> to the <ul>
    list.appendChild(li);

    // Add event listeners for editing and deleting
    label.addEventListener('dblclick', () => {
      // Replace the label with an input field
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.value = task.description;
      li.replaceChild(input, label);

      // Change the edit button to a save button
      editButton.innerHTML = '&#128190;';

      // Set focus on the input field
      input.focus();

      // Add event listener to save changes on enter or blur
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.keyCode === 13 || event.type === 'blur') {
          event.preventDefault();

          // Update the task description in the array
          task.description = input.value;

          // Save the updated array to localStorage
          localStorage.setItem('tasks', JSON.stringify(ItemsArray));

          // Replace the input field with the label
          li.replaceChild(label, input);

          // Change the save button back to an edit button
          editButton.innerHTML = '&#9998;';

          // Redisplay the list of tasks
          displayTasks();
        }
      });
      
      deleteButton.addEventListener('click', () => {
        // Remove the task from the array
        ItemsArray.splice(task.index - 1, 1);
  
        // Update the index property of the remaining tasks
        ItemsArray.forEach((task, index) => {
          task.index = index + 1;
        });
        
        // Save the updated ItemsArray to the localStorage
      localStorage.setItem('tasks', JSON.stringify(ItemsArray));

      // Reload the page to reflect the changes
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
  // Get the task from the input element
  const input = document.getElementById('add-item');
  const description = input.value;
  const index = ItemsArray.length + 1;
  const completed = false;
  const newItem = { index, description, completed };
  ItemsArray.push(newItem);
  localStorage.setItem('tasks', JSON.stringify(ItemsArray));
  // Reset form values
  document.getElementById('add-form').reset();
  window.location.reload();
}

// Add a new task when user hit the add button
addButton.addEventListener('click', (event) => {
  // Prevents the form from being sent
  event.preventDefault();
  addTask();
});

// Add a new task when user hit enter key
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

function deleteCompletedTasks() {
  // Remove completed tasks from array
  ItemsArray = ItemsArray.filter(task => !task.completed);

  // Update the index property of remaining tasks
  ItemsArray.forEach((task, index) => {
    task.index = index + 1;
  });

  // Save updated array to localStorage
  localStorage.setItem('tasks', JSON.stringify(ItemsArray));

  // Redisplay the list of tasks
  displayTasks();
}

const clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', function() {
  deleteCompletedTasks();
});

displayTasks();