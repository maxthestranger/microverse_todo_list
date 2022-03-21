const input = document.querySelector('.input');
const ul = document.querySelector('.todo');
const err = document.querySelector('.error');

class TaskShell {
  constructor(description, index, completed) {
    this.description = description;
    this.index = index;
    this.completed = completed || false;
  }
}

let taskList = JSON.parse(localStorage.getItem('task_list')) || [];

const setLocalStorage = (tasks) => {
  localStorage.setItem('task_list', JSON.stringify(tasks));
};

const appendTask = ({ description, index }) => {
  const ul = document.querySelector('.todo');
  const li = document.createElement('li');
  li.setAttribute('data-id', index);
  li.innerHTML = `
    <input type="checkbox" class="checkbox" />
    <div class="text-content" contenteditable="true">
      ${description}
     <span class="delete" contenteditable="false">
      <i class='bx bx-trash'></i>
    </span>
    </div>
    <span class="drag">
      <i class='bx bx-dots-vertical-rounded'></i>
    </span>
    `;
  ul.appendChild(li);
};

// const updateId = (items) => {
//   const newUl = document.querySelector('.todo');
//   let counter = 1;
//   Array.from(newUl.children).forEach((li) => {
//     li.dataset.id = counter;
//     counter += 1;
//   });
// };

export const addTask = () => {
  input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();

      if (/^\s*$/.test(e.target.value)) {
        err.innerText = 'Task cannot be empty';
      } else {
        err.innerText = '';
        const taskObj = new TaskShell(
          e.target.value,
          taskList.length + 1,
          false
        );
        taskList.push(taskObj);

        setLocalStorage(taskList);
        appendTask(taskObj);
        e.target.value = '';
      }
    }
  });
};

export const removeTask = () => {
  ul.addEventListener('click', (e) => {
    const { target } = e;
    if (target.className.includes('delete')) {
      const parent = target.parentNode.parentNode;
      taskList = taskList
        .filter((item) => Number(parent.dataset.id) !== item.index)
        .map((item, i) => ({ ...item, index: i + 1 }));
      setLocalStorage(taskList);
      parent.remove();
      // updateId(taskList);
    }
  });
};

export const editTask = () => {
  ul.addEventListener('focusin', (e) => {
    e.target.parentNode.classList.add('edit');
  });

  ul.addEventListener('focusout', (e) => {
    e.target.parentNode.classList.remove('edit');
    const newText = e.target.innerText;
    const { id } = e.target.parentNode.dataset;

    taskList.forEach((task) => {
      if (Number(id) === task.index) {
        task.description = newText;
      }
    });

    setLocalStorage(taskList);
  });
};
