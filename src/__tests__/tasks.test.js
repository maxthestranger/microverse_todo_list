/**
 * @jest-environment jsdom
 */
import { pushTask, updateStorage } from '../tasks.js';
import { checkComplete } from '../checks.js';

const tasks = ['task 1', 'task 2', 'task 3', 'task 4'];
const focusIn = (e) => {
  if (e.className.includes('text-content')) {
    e.parentNode.classList.add('edit');
  }
};

document.body.innerHTML = `
    <div>
        <input type="text" class="input" value="task 1" />
        <ul class="todo"></ul>
    </div>
    `;
const ul = document.querySelector('.todo');

describe('adding task to local storage and the DOM', () => {
  // test if tasks are added to the UI
  test('list length to be tasks length', () => {
    for (let i = 0; i < tasks.length; i += 1) {
      pushTask(tasks[i], i, false, ul);
    }
    const list = document.querySelectorAll('.todo li');
    expect(list).toHaveLength(tasks.length);
  });

  test('remove from the ul', () => {
    let list = document.querySelectorAll('.todo li');
    list = Array.from(list);
    const target = list[0].querySelector('.delete');

    updateStorage(target, ul);

    list = document.querySelectorAll('.todo li');
    expect(list).toHaveLength(3);
  });

  test('edit description when text content changes', () => {
    expect(() => {
      ul.querySelectorAll('.todo li').forEach((li) => {
        focusIn(li);
      });
    }).not.toThrow(TypeError);
  });

  test('Clear all completed', () => {
    let list = document.querySelectorAll('.todo li');
    list = Array.from(list);
    list[0].checkComplete = true;
    const target = list[0].querySelector('.checkbox');
    checkComplete(target);
    expect(list).toHaveLength(3);
  });
});
