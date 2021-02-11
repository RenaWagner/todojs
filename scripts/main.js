let todoListObject= {};
let todolistsLocalStorage = {};
let taskArray = [];

// Update the counters in the footer
function updateCounters(){   
    const classTodo = document.querySelectorAll('.todo'); //specify the name of variables
    const classTodoCompleted = document.querySelectorAll('.todoCompleted');

    let todoCounter = classTodo.length;
    const idTotalTodo = document.querySelector('#totalTodo');
    idTotalTodo.innerHTML = `${todoCounter}`;

    let todoCompletedCounter = classTodoCompleted.length;
    const idTotalDone = document.querySelector('#totalDone');
    idTotalDone.innerHTML = `${todoCompletedCounter}`;
   
    const idTotal = document.querySelector('#total');
    idTotal.innerHTML = `${todoCounter + todoCompletedCounter}`;
}

updateCounters();

// Strikethrough the todos that are completed
function toggleDone(event){
    let checkbox = event.target;
    let label = checkbox.parentNode;
    let list = label.parentNode;
    console.log(todolistsLocalStorage)
    taskArray = Object.keys(todolistsLocalStorage);

    if(checkbox.checked){
        label.style.textDecoration = 'line-through';
        list.classList.remove('todo');
        list.classList.add('todoCompleted');
        
        console.log(taskArray);
        for (let i = 0; i < taskArray.length; i++){
            if (todolistsLocalStorage[taskArray[i]].id == list.getAttribute('id')){
                todolistsLocalStorage[taskArray[i]].completed = true;
            }
        }

    } else if (!checkbox.checked) {
        label.style.textDecoration = 'none';

        for (let i = 0; i < taskArray.length; i++){
            if (todolistsLocalStorage[taskArray[i]].id == list.getAttribute('id')){
                todolistsLocalStorage[taskArray[i]].completed = false;
            }
        }

        list.classList.remove('todoCompleted');
        list.classList.add('todo');
    }

    addToLocalStorage(todolistsLocalStorage);
    updateCounters();
}

const checkboxes = document.querySelectorAll('.todoList input');
for (let i = 0; i < checkboxes.length; i++){
    checkboxes[i].addEventListener('change', toggleDone);
}

// creating new todo list after hitting enter
const ul = document.querySelector('ul');

document.querySelector("form").addEventListener("submit", function addNewTodo(event) {
    event.preventDefault();
    
    const inputField = document.getElementById('textInput');
    let textInput = inputField.value;

    const colorInputField = document.getElementById('favcolor');
    let colorInput = colorInputField.value;

    const dueDateInputField = document.getElementById('dueDate');
    let dueDateInput = dueDateInputField.value;

    let task = textInput;
    //localStorage
    const todo = {
            id: Date.now(),
            task: textInput,
            color: colorInput,
            due: dueDateInput,
            completed: false,
            cleanedup: false,
    }
    todoListObject[task] = todo;
    console.log('todoListObject',todoListObject);
    addToLocalStorage(todoListObject);

    createTodo(textInput, colorInput, dueDateInput, todo.id);

    inputField.value = null;

    checkDueDate();
    updateCounters();
  });

function createTodo(textInput, colorInput, dueDateInput, id){
    let label = document.createElement('label');

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    label.appendChild(checkbox);
    checkbox.addEventListener('change', toggleDone);

    let text = document.createTextNode(textInput);
    label.appendChild(text);

    //adding due date//
    let dueDateSpan = document.createElement('span');
    dueDateSpan.setAttribute('class', 'dueDate');
    label.appendChild(dueDateSpan);
    let dueDateText = document.createTextNode(dueDateInput);
    dueDateSpan.appendChild(dueDateText);

    let newTodoList = document.createElement('li');
    newTodoList.classList.add('todo');
    newTodoList.setAttribute('id', id);
    //Adding color//
    newTodoList.style.color = colorInput;
    newTodoList.appendChild(label);
    ul.appendChild(newTodoList);
}

function cleanUpDoneTodos(){
    let wholeLists = document.querySelectorAll('li');
    for (let i = 0; i < wholeLists.length ; i++){
        if (wholeLists[i].classList.contains('todoCompleted')){
            //delete from objects
            let id = wholeLists[i].getAttribute('id');
            
            for (let i = 0; i < taskArray.length; i++){
                if (todolistsLocalStorage[taskArray[i]].id == id){
                    todolistsLocalStorage[taskArray[i]].cleanedup = true;
                }
            }        
            wholeLists[i].remove();
        }
    }

    for (let i = 0; i < taskArray.length; i++){
        if (todolistsLocalStorage[taskArray[i]].cleanedup){
            console.log(todolistsLocalStorage[taskArray[i]]);
            delete todolistsLocalStorage[taskArray[i]];
        }
    }
    console.log('clicked delete');
    addToLocalStorage(todolistsLocalStorage);
    updateCounters();
}

const cleanUpBtn = document.querySelector('a');
cleanUpBtn.addEventListener('click',cleanUpDoneTodos);

function checkDueDate() {
    const dueDateSpan = document.querySelectorAll('.dueDate');

    for (let i = 0; i < dueDateSpan.length ; i++){
        let today = new Date();
        let todayYear = today.getFullYear();
        let todayMonth = today.getMonth() + 1;
        let todayDate = today.getDate();

        if (todayMonth < 10){
            todayMonth = `0${todayMonth}`;
        }
        if (todayDate < 10){
            todayDate = `0${todayDate}`;
        }
        let todaysDate = `${todayYear}-${todayMonth}-${todayDate}`;

        let dueDate = dueDateSpan[i].textContent;
        let array = dueDate.split('-')
        let dueDateYear = array[0];
        let dueDateMonth = array[1];
        let dueDateDate = array[2];

        if(todaysDate == dueDateSpan[i].textContent){
            dueDateSpan[i].parentNode.style.backgroundColor = 'orange';
        }
        else if (dueDateYear < todayYear || dueDateMonth < todayMonth || dueDateDate < todayDate){
            dueDateSpan[i]　.parentNode.style.backgroundColor = 'red';
        }
    }
}

function addToLocalStorage(todoListObject){
    let JSONstring = JSON.stringify(todoListObject);
    localStorage.setItem('todosStorage', JSONstring);
}

function getFromLocalStorage(){
    const reference = localStorage.getItem('todosStorage');
    
    if (reference){
        todolistsLocalStorage = JSON.parse(reference);
        taskArray = Object.keys(todolistsLocalStorage);

        for (let i = 0; i < taskArray.length; i++){
            createTodo(taskArray[i], todolistsLocalStorage[taskArray[i]].color, todolistsLocalStorage[taskArray[i]].due, todolistsLocalStorage[taskArray[i]].id);
            const wholeLists = document.querySelectorAll('li');
            for(let i = 0; i < wholeLists.length; i++){
                let attribute = wholeLists[i].getAttribute('id');
                if (todolistsLocalStorage[taskArray[i]].completed && attribute == todolistsLocalStorage[taskArray[i]].id){
                    wholeLists[i].style.textDecoration = 'line-through';
                    wholeLists[i].classList.remove('todo');
                    wholeLists[i].classList.add('todoCompleted');

                    //checkbox checked
                    let label = wholeLists[i].childNodes;
                    let input = label[0].childNodes;
                    console.log(input[0]);
                    input[0].checked = true;
                }

            }
            updateCounters();
        }
        updateCounters();
        checkDueDate();
    }
}

getFromLocalStorage();