// Get HTML elements
const addButton = document.getElementById('add-button');
const input = document.getElementById('add-item');
const deleteButton = document.getElementById('clear-button');
const listItem = document.querySelectorAll('.item');

// Get the items from the local storage
let ItemsArray = JSON.parse(localStorage.getItem('tasks')) || [];

// Render the items
let insideItem = '';
ItemsArray.forEach((singleItemContents, i) => {
  // Update the index of the item in the array
  ItemsArray[i].index = i + 1;
  insideItem
  += `
    <li class="item">
        <input value="${singleItemContents.index}" name="item" type="checkbox" data-index="${singleItemContents.index}" id="${singleItemContents.index}">
        <label for="0${singleItemContents.index}">${singleItemContents.description}</label>
        <button type="button" class="btn" aria-label="Delete" id="${singleItemContents.index}" data-index="${singleItemContents.index}"></button>
    </li>
    `;
});
const section = document.querySelector('.list');
section.innerHTML = insideItem;

// Change the completed status on the array items
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

//To edit the task
const labels = document.querySelectorAll('label');
labels.forEach((label) => {
  label.addEventListener('dblclick', (event) => {
    // Get the current label's text content and store it in a variable
    const currentIndex = event.target.previousElementSibling.value;
    const currentDescription = event.target.textContent;

    // Replace the label's HTML with an input element
    event.target.innerHTML = `<input type="text" class="edit" value="${currentDescription}" />`;

    // Get the input element inside the label and focus on it
    const input = event.target.querySelector('input');
    input.focus();

    // Update the task's description when the user clicks outside the input element
    input.addEventListener('blur', () => {
      const newDescription = input.value;

      // Get the task's index
      const index = parseInt(input.parentElement.previousElementSibling.value, 10);

      // Update the task's description on the ItemsArray
      const task = ItemsArray.find((task) => task.index === index);
      task.description = newDescription;
      localStorage.setItem('tasks', JSON.stringify(ItemsArray));

      // Replace the input element with the updated label
      event.target.innerHTML = newDescription;
    });
  });
});

// Change button class to a trash can icon when the user hovers over a task
const taskItems = document.querySelectorAll('.item');
taskItems.forEach((item, index) => {
  const button = item.querySelector('.btn');
  item.addEventListener('mouseover', () => {
    button.classList.remove('btn');
    button.classList.add('delete');
    button.classList.add('red');
  });
  item.addEventListener('mouseout', () => {
    button.classList.remove('delete');
    button.classList.remove('red');
    button.classList.add('btn');
  });
  
});
// /////////////////////////////////////////////////////

/*
item.addEventListener('click', () => {
  //const realIndex = index + 1;
  removeTask(index);
}); 
*/

// Remove a book from the collection
  const removeTask = (index) => {
    let itemToRemove = ItemsArray[index];
    console.log(itemToRemove);
    const newItemsArray = ItemsArray.filter(item => item !== itemToRemove);
    console.log(newItemsArray);
    ItemsArray = newItemsArray;
    // Guardar el array actualizado en el localStorage
    localStorage.setItem('tasks', JSON.stringify(ItemsArray));
    window.location.reload();
};


/*
// Filter out completed items
const newItemsArray = ItemsArray.filter((item) => !item.completed);

// Update local storage
ItemsArray = newItemsArray;
localStorage.setItem('tasks', JSON.stringify(ItemsArray));
window.location.reload();
*/


/*
window.addEventListener('load', () => {
  if (localStorage.getItem('tasks')) {
    ItemsArray = JSON.parse(localStorage.getItem('tasks'));
  } else {
    ItemsArray = [];
  }
});
*/

/*
// Change button class to a trash can icon when the user hovers over a task
const taskItems = document.querySelectorAll('.item');
taskItems.forEach((item) => {
  const button = item.querySelector('.btn');
  console.log(button);
  item.addEventListener('mouseover', () => {
    button.classList.remove('btn');
    button.classList.add('delete');
  });
  item.addEventListener('mouseout', () => {
    button.classList.remove('delete');
    button.classList.add('btn');
  });
});

*/


/*
// Delete the task
function removeTask(event) {
  // Get the index of the task
  const index = parseInt(event.target.id, 10);

  // Find the task in the array
  const taskIndex = ItemsArray.findIndex((task) => task.index === index);

  // Remove the task from the array
  ItemsArray.splice(taskIndex, 1);

  // Update the index of the remaining tasks
  ItemsArray.forEach((task, i) => {
    task.index = i + 1;
  });

  // Save the updated ItemsArray to the localStorage
  localStorage.setItem('tasks', JSON.stringify(ItemsArray));

  // Reload the page to reflect the changes
  window.location.reload();
}
*/

/*
// Remove a task from the array
const removeTask = (index) => {
  // Delete the task from the array
  ItemsArray.splice(index, 1);
  // Guardar el array actualizado en el localStorage
  localStorage.setItem('tasks', JSON.stringify(ItemsArray));
  window.location.reload();
};

listItem.addEventListener('mouseenter', () => {
  dotsIcon.innerHTML = '<i class="bi bi-trash3"></i>';
});
listItem.addEventListener('mouseleave', () => {
  dotsIcon.innerHTML = '<i class="bi bi-three-dots-vertical"></i>';
});

// Delete a task from the array
deleteButton.addEventListener('click', (event) => {
  // Prevents the form from being sent
  event.preventDefault();
  removeTask()
});
*/