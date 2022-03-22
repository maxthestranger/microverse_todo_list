// create a blueprint for a task
export const appendTask = ({ description, index, completed }) => {
  const li = document.createElement('li');
  li.setAttribute('data-id', index);
  li.innerHTML = `
        <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''} />
        <div class="text-content" contenteditable="true">
          <span class="${completed ? 'line' : ''}">${description}</span>
         <span class="delete" contenteditable="false">
          <i class='bx bx-trash'></i>
        </span>
        </div>
        <span class="drag">
          <i class='bx bx-dots-vertical-rounded'></i>
        </span>
        `;
  return li;
};

// update the ul with updated task list
export const renderTasks = (tasksList) => {
  // query ul
  const ul = document.querySelector('.todo');

  //   empty ul
  ul.innerHTML = '';

  //   append li to ul with task data
  tasksList.forEach((task) => {
    ul.appendChild(appendTask(task));
  });
};
