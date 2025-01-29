document.addEventListener('DOMContentLoaded', function() {
  const todoForm = document.querySelector('.todo-form');
  const todoList = document.querySelector('.todo-list');
  const todoSubmit = document.querySelector('.todo-submit');
  const todoInput = document.querySelector('.todo-input');

  let editMode = false;
  let editItem = null;

  todoForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const inputText = todoInput.value.trim();
    if(inputText !== "") {
      if(editMode) {
        editTodo({ inputText });
      } else {
        addTodo({ inputText });
      }

      todoInput.value = "";
    } else {
      alert("Please enter a valid task");
    }
  });

  const handleEdit = (todoItem) => {
    editMode = true;
    editItem = todoItem;
    todoSubmit.innerText = 'Edit Todo';
    todoInput.value = todoItem.parentNode.firstChild.textContent;
    todoInput.focus();
  }

  const handleRemove = (todoItem) => {
    todoItem.parentNode.remove();
    todoInput.focus();
  }

  // Event delegation for edit and remove buttons
  todoList.addEventListener("click", function(event) {
    const todoItem = event.target;
    if(todoItem.tagName === 'BUTTON') {
      if(todoItem.innerText === '✏️') {
        handleEdit(todoItem);
      } else if(todoItem.innerText === '❌') {
        handleRemove(todoItem);
      }
    }
  });

  // Editing an existing todo item
  const editTodo = ({ inputText }) => {
    editItem.parentNode.firstChild.textContent = inputText;
    todoSubmit.innerText = 'Add Todo';
    editMode = false;
    editItem = null;
  }

  // Adding a new todo item
  const addTodo = ({ inputText }) => {
    const todoItem = document.createElement('li');
    const editButton = document.createElement('button');
    const removeButton = document.createElement('button');

    todoItem.innerHTML = `<span>${inputText}</span>`;
    editButton.innerText = '✏️';
    removeButton.innerText = '❌';

    todoItem.appendChild(editButton);
    todoItem.appendChild(removeButton);
    todoList.appendChild(todoItem);
  }
});