const ItemsArray = [
  {
    index: 0,
    description: 'Go grocery shopping',
    completed: false,
  },
  {
    index: 1,
    description: 'Walk the dog',
    completed: false,
  },
  {
    index: 2,
    description: 'Do laundry',
    completed: false,
  },
  {
    index: 3,
    description: 'Do teh dishes',
    completed: false,
  },
  {
    index: 4,
    description: 'Call mom',
    completed: false,
  },
];

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

export default section;