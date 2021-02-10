const list = document.querySelectorAll('.list');
const totalTodo = document.querySelector('#totalTodo');
const totalDone = document.querySelector('#totalDone');
const total = document.querySelector('#total');


function updateCounters(){
    //update totalTodo//
    let totalTodoCounter = 0;
    for (let i =0; i < list.length; i++){
        if(list[i].hasAttribute('checked')){
            totalTodoCounter++;
        }
    }
    totalTodo.innerHTML = `${totalTodoCounter}`;

    //update totalDone//
    let totalDoneCounter = 0;
    for (let i =0; i < list.length; i++){
        if(!list[i].hasAttribute('checked')){
            totalDoneCounter++;
        }
    }
    totalDone.innerHTML = `${totalDoneCounter}`
    
    //update totalTodo
    total.innerHTML = `${totalTodoCounter + totalDoneCounter}`
}

updateCounters();