/**
 * @jest-environment jsdom
 */
import { pushTask,updateStorage } from '../tasks.js';
const tasks = ['task 1', 'task 2', 'task 3', 'task 4'];
document.body.innerHTML = `
    <div>
        <input type="text" class="input" value="task 1" />
        <ul class="todo"></ul>
    </div>
    `;
    const ul = document.querySelector('.todo');
describe('AddingDescriptions', () => {
  // test if it adds to the UI
  test('list length to be 1', () => {
    for (let i = 0; i < tasks.length; i += 1) {
      pushTask(tasks[i], i, false, ul);
    }
    const list = document.querySelectorAll('.todo li');
    expect(list).toHaveLength(tasks.length);
  });

  // TODO: test if it adds to localStorage

  test ('Removing one task from List',()=>{
    updateStorage(ul,tasks,"1");
    expect(list).toHaveLength(tasks.length-1);
  });
  // TODO: test if it can remove tasks
});
