import 'boxicons/css/boxicons.min.css';
import './style.css';

import { addTask, editTask, removeTask } from './tasks.js';

const ul = document.querySelector('.todo');

const tasks = JSON.parse(localStorage.getItem('task_list')) || [];

function displayTask() {
  tasks.forEach(({ description, index }) => {
    const li = document.createElement('li');
    li.setAttribute('data-id', index);
    li.innerHTML = `
    <input type="checkbox" class="checkbox" />
    <div class="text-content" contenteditable="true">
      <span>${description}</span>
     <span class="delete" contenteditable="false">
      <i class='bx bx-trash'></i>
    </span>
    </div>
    <span class="drag">
      <i class='bx bx-dots-vertical-rounded'></i>
    </span>
    `;
    ul.appendChild(li);
  });
}

window.onload = () => {
  displayTask();

  addTask();
  editTask();
  removeTask();
};
