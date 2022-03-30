const {editTask,createTask,removeTask,pushTask} =  require('./tasks');
import { tasksList } from './queries.js';

const updatedTaskList = tasksList.gettasksList();
describe ('AddingDescriptions',()=>{
    let tasks=[];
    for(let i=0;i<4;i++){
        tasks = pushTask("Wash dish",updatedTaskList.length + 1, false);
    }

});