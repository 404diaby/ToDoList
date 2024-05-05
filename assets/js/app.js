const todoForm = document.getElementById('todo-form');

const todoInput = document.getElementById('todo-input');

const todoList = document.getElementById('todo-list');

todoForm.addEventListener('submit', function(even) {
    even.preventDefault(); 
    const newTask = todoInput.value;
    if (newTask === '') {
        alert('Please enter a task!');
        return;
    } 
    todoInput.value = '';
    addTask(newTask, null , null);
    saveTasksToLocalStorage();
});


function addTask(task,completed, delay) {
        const listItem = document.createElement('li');
        listItem.classList.add('scale-in-tl');
        listItem.style.animationDelay = `${delay}ms`;
        listItem.classList.add('poppins-regular');

        const taskText = document.createElement('span');
        taskText.classList.add("textarea");
        taskText.setAttribute('role','textbox');
        taskText.contentEditable = false;
        taskText.innerHTML = `${task}`;


        createCheckBox(listItem,taskText,completed);

        listItem.appendChild(taskText);

        todoList.appendChild(listItem);
        
        createDeleteButton(listItem);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('poppins-regular');
        listItem.appendChild(editButton);
        editButton.addEventListener('click', function(){
          toggleTaskEditState(taskText, listItem, editButton);
        });
} 


function createCheckBox(listItem,taskText,completed){
    
        checkBox = document.createElement('input');
        checkBox.setAttribute('type','checkbox');

       if(completed){
        checkBox.checked = true;
        taskText.style.textDecoration= 'line-through';
        listItem.classList.add('completed');
       }
    
        checkBox.addEventListener('change', function() {
            if(this.checked){
                taskText.style.textDecoration= 'line-through';
                listItem.classList.add('completed');
            } else{
            taskText.style.textDecoration= 'none';
            listItem.classList.remove('completed');
            }
            saveTasksToLocalStorage();
        }); 
        listItem.appendChild(checkBox);
      
}

function createDeleteButton(listItem){
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent ='Delete';
    deleteButton.classList.add('poppins-regular');

    listItem.appendChild(deleteButton);

    deleteButton.addEventListener('click', ()=>{
        if (window.confirm("you are deleting a task !!! ")) {
            listItem.classList.remove('scale-in-tl');
            listItem.classList.add('scale-out-tl');
            setTimeout( () => { 
                todoList.removeChild(listItem); 
                saveTasksToLocalStorage();
            }, 1000);
           
           
          }
    });
}

function toggleTaskEditState(taskText, listItem, editButton){

    const isEditing = listItem.classList.contains('editing');
    
    if(listItem.classList.contains('completed') == false)
        
        {
        if(isEditing){

            editButton.textContent = 'Edit';
            taskText.contentEditable = false;
            listItem.classList.remove('editing');
            taskText.classList.remove('toto');
            saveTasksToLocalStorage();

        }else{
       taskText.contentEditable = true;
        listItem.classList.add('editing');
        taskText.classList.add('toto');
        editButton.textContent = 'Save';
        }
    }else{
        alert('This task is completed');
    }
    
}


function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(task => {
        const taskText = task.querySelector('span').innerText;
        console.log(task.querySelector('span').innerText);
        const isCompleted = task.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        const delay = 100 + ( savedTasks.indexOf(task)*1) *100;
        addTask(task.text,task.completed, delay);
    });
  });

  /*
  *
 Inspired by this tutorial
  https://hackr.io/blog/how-to-create-a-javascript-to-do-list#step-7-saving-to-local-storage-optional

  mettre commentaire fonction ,etc
  *
  */