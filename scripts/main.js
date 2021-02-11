let todoListArray = [];

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
        todolists.forEach(function (item){
            if (item.id == list.getAttribute('id')){
                item.completed = true;
            }
        })
    } else if (!checkbox.checked) {
        label.style.textDecoration = 'none';
        todolists.forEach(function (item){
            if (item.id == list.getAttribute('id')){
                item.completed = false;
            }
        })
        list.classList.remove('todoCompleted');
        list.classList.add('todo');
    }

    addToLocalStorage(todolists)

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

    //localStorage
    const todo = {
        id: Date.now(),
        task: textInput,
        color: colorInput,
        due: dueDateInput,
        completed: false,
        cleanedup: false,
    }
    todoListArray.push(todo);
    addToLocalStorage(todoListArray);

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
    const wholeLists = document.querySelectorAll('li');
    for (let i = 0; i < wholeLists.length ; i++){
        if (wholeLists[i].classList.contains('todoCompleted')){
            //delete from objects
            let attribute = wholeLists[i].getAttribute('id');
            todoListArray.forEach(function (item){
                if (attribute == item.id){
                    item.cleanedup = true;
                }
                if (item.cleanedup && attribute == todolists[i].id){
                    localStorage.removeItem(item);
                }
            })
            wholeLists[i].remove();
        }
    }
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

function addToLocalStorage(todoListArray){
     localStorage.setItem('todolists', JSON.stringify(todoListArray));
}

function getFromLocalStorage(){
    const reference = localStorage.getItem('todolists');
    
    if (reference){
        todolists = JSON.parse(reference);
        
        for (let i = 0; i < todolists.length; i++){
            createTodo(todolists[i].task, todolists[i].color, todolists[i].due, todolists[i].id);
            const wholeLists = document.querySelectorAll('li');
            for(let i = 0; i < wholeLists.length; i++){
                let attribute = wholeLists[i].getAttribute('id');
                console.log(attribute);
                if (todolists[i].completed && attribute == todolists[i].id){
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