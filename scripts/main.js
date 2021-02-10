
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

    if(checkbox.checked){
        label.style.textDecoration = 'line-through';
        list.classList.remove('todo');
        list.classList.add('todoCompleted');
    } else {
        label.style.textDecoration = 'none';
        list.classList.remove('todoCompleted');
        list.classList.add('todo');
    }

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
    
    let inputField = document.getElementById('textInput');
    let textInput = inputField.value;
    createTodo(textInput);

    inputField.value = null;

    updateCounters();
    
  });

function createTodo(textInput){
    let label = document.createElement('label');

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    label.appendChild(checkbox);
    checkbox.addEventListener('change', toggleDone);

    let text = document.createTextNode(textInput);
    label.appendChild(text);

    let newTodoList = document.createElement('li');
    newTodoList.classList.add('todo');
    newTodoList.appendChild(label);

    ul.appendChild(newTodoList);
}

function cleanUpDoneTodos(){
    const wholeLists = document.querySelectorAll('li');
    for (let i = 0; i < wholeLists.length ; i++){
        if (wholeLists[i].classList.contains('todoCompleted')){
            wholeLists[i].remove();
        }
    }
    updateCounters();
}

const cleanUpBtn = document.querySelector('a');
cleanUpBtn.addEventListener('click',cleanUpDoneTodos);