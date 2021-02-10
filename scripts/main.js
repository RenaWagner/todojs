const todoList = document.querySelector('.todoList');

function updateCounters(){   
    const todo = document.querySelectorAll('.todo');
    const todoCompleted = document.querySelectorAll('.todoCompleted');

    let todoCounter = todo.length;
    const totalTodo = document.querySelector('#totalTodo');
    totalTodo.innerHTML = `${todoCounter}`;

    let todoCompletedCounter = todoCompleted.length;
    const totalDone = document.querySelector('#totalDone');
    totalDone.innerHTML = `${todoCompletedCounter}`;
   
    const total = document.querySelector('#total');
    total.innerHTML = `${todoCounter + todoCompletedCounter}`;
}

updateCounters();

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

todoList.addEventListener('change', toggleDone);