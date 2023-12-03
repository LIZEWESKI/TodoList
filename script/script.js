// Declaring variables
const nameInput = document.querySelector('#todoInput');
const addBtn = document.querySelector('.add_btn');
const outputParent = document.querySelector('article');
const itemsCount = document.querySelector('.left_side');
const clearCompleted = document.querySelector('#clearCompleted');
let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
let itemscounter = todoList.length;
let checkboxElem;
// Functions for each element
nameInput.addEventListener('keydown', onkeydown);
addBtn.addEventListener('click', addTodo);
clearCompleted.addEventListener('click', clearCompletedTodos);
itemsCount.innerHTML = `${itemscounter} items left`;
renderTodo();
// Getting To do Value
function addTodo() {
  const name = nameInput.value;
  todoList.push(name);
  itemscounter++;
  renderTodo();
  nameInput.value = '';
  updateLocalStorage();
}
// Displaying To do
function renderTodo() {
  // Clear the container
  outputParent.innerHTML = '';
  // Generating HTML Elements using for Loop
  for (let i = 0; i < todoList.length; i++) {
    let name = todoList[i];
    // Creating HTML Elements
    const jsoutputParent = document.createElement('div');
    const checkboxContainer = document.createElement('div');
    checkboxElem = document.createElement('input');
    const cbLabel = document.createElement('label');
    const labelElem = document.createElement('label');
    const deleteBtn = document.createElement('button');
    // Giving them a Class
    jsoutputParent.classList.add('outputContainer');
    checkboxContainer.classList.add('checkbox-container');
    labelElem.classList.add('labelElem');
    // Type and ID for CB Input & its labels
    checkboxElem.type = 'checkbox';
    checkboxElem.id = 'selectIndex' + i;
    cbLabel.htmlFor = 'selectIndex' + i;
    labelElem.htmlFor = 'selectIndex' + i;
    // Make them a happy family for styling purposes :)
    checkboxContainer.append(checkboxElem, cbLabel);
    jsoutputParent.append(checkboxContainer, labelElem, deleteBtn);
    outputParent.appendChild(jsoutputParent);
    // Elements inner Content
    deleteBtn.textContent = 'Remove';
    labelElem.textContent = name;
    checkboxElem.addEventListener('click', function () {
      !labelElem.classList.contains('checked')? 
      labelElem.classList.add('checked'): 
      labelElem.classList.remove('checked');
    });
    deleteBtn.addEventListener('click', () => deleteTodo(i));
  }
  itemsCount.innerHTML = `${itemscounter} items left`;
}
// Key Enter instead of Add button
function onkeydown(event) {
  event.key === 'Enter' ? addTodo() : '';
}
//Function to update local storage
function updateLocalStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}
// Deleting a To do
function deleteTodo(i) {
  itemscounter--;
  todoList.splice(i, 1);
  renderTodo();
  updateLocalStorage();
}
// Clearing completed to-do items
function clearCompletedTodos() {
  // Filter out completed items and update the to-do list
    const activeTodos = todoList.filter((todo, i) => {
    const checkbox = document.querySelector('#selectIndex' + i);
    return checkbox && !checkbox.checked;
  });
  // Update the to-do list with active todos
  todoList = activeTodos;
  itemscounter = todoList.length;
  renderTodo();
  updateLocalStorage();
}
