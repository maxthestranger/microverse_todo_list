/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-loop-func */

import { TaskShell } from './tasks.js';
import { tasksList } from './queries.js';
import { renderTasks } from './displayTasks.js';

// update the list index after delete
const updateAfterDrop = () => {
  const ul = document.querySelector('.todo');
  const updatedTaskList = [];

  Array.from(ul.children).forEach((li, index) => {
    const description = li.querySelector('.text-content span').textContent;
    const completed = li.querySelector('.checkbox').checked;

    const taskObj = new TaskShell(description, index + 1, completed);
    updatedTaskList.push(taskObj);
  });

  tasksList.settasksList(updatedTaskList);

  renderTasks(updatedTaskList);
};

export default function handleDragDrop(target) {
  // (A) GET ALL LIST ITEMS
  const items = target.getElementsByTagName('li');
  let current = null;

  // (B) MAKE ITEMS DRAGGABLE + SORTABLE
  for (const i of items) {
    // (B1) ATTACH DRAGGABLE
    i.draggable = true;

    // (B2) DRAG START - YELLOW HIGHLIGHT DROPZONES
    i.ondragstart = () => {
      current = i;
      for (const it of items) {
        if (it != current) {
          it.classList.add('hint');
        }
      }
    };

    // (B3) DRAG ENTER - RED HIGHLIGHT DROPZONE
    i.ondragenter = () => {
      if (i != current) {
        i.classList.add('active');
      }
    };

    // (B4) DRAG LEAVE - REMOVE RED HIGHLIGHT
    i.ondragleave = () => {
      i.classList.remove('active');
    };

    // (B5) DRAG END - REMOVE ALL HIGHLIGHTS
    i.ondragend = () => {
      for (const it of items) {
        it.classList.remove('hint');
        it.classList.remove('active');
      }
    };

    // (B6) DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
    i.ondragover = (evt) => {
      evt.preventDefault();
    };

    // (B7) ON DROP - DO SOMETHING
    i.ondrop = (evt) => {
      evt.preventDefault();
      if (i != current) {
        let currentpos = 0;
        let droppedpos = 0;
        // eslint-disable-next-line no-plusplus
        for (let it = 0; it < items.length; it++) {
          if (current == items[it]) {
            currentpos = it;
          }
          if (i == items[it]) {
            droppedpos = it;
          }
        }
        if (currentpos < droppedpos) {
          i.parentNode.insertBefore(current, i.nextSibling);
        } else {
          i.parentNode.insertBefore(current, i);
        }
      }

      updateAfterDrop();
    };
  }
}
