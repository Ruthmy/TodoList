// Get HTML elements
const addButton = document.getElementById('add-button');

// Get the items from the local storage
const ItemsArray = JSON.parse(localStorage.getItem("tasks")) || [];

let insideItem = '';

ItemsArray.forEach((singleItemContents) => {
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
  const index = ItemsArray.length;
  const completed = false;
  // Create teh object
  const newItem = { index, description, completed };
  console.log(newItem);
  // Save the book
  ItemsArray.push(newItem);
  // Save on local storage
  localStorage.setItem('tasks', JSON.stringify(ItemsArray));
  // Reset form values
  document.getElementById('add-form').reset();
  window.location.reload();

  // To update the listed tasks
  const taskList = document.getElementById('library');
  
}

// Add book when form is submitted
addButton.addEventListener('click', (event) => {
  // Prevents the form from being sent
  event.preventDefault();
  // Get the title and author value
  addTask()
  // To display the book
  //displayBooks();
});










export default section;