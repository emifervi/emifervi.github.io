function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function addClickTasks(li) { 
    li.addEventListener('click', _ => {
        if (li.firstElementChild.checked) {
            li.childNodes[1].classList.add('done');
            document.getElementById('doneList').appendChild(li);
        } else {
            li.childNodes[1].classList.remove('done');
            document.getElementById('todoList').appendChild(li);
        }
    });
}

function addClickDone(li) {
    li.addEventListener('click', _ => {
        if (!li.firstElementChild.checked){
            li.childNodes[1].classList.remove('done');
            document.getElementById('todoList').appendChild(li);
        } else {
            li.childNodes[1].classList.add('done');
            document.getElementById('doneList').appendChild(li);
        }
    })
}

let inputField = document.getElementById('newitem');
inputField.addEventListener('keyup', e => {
  if(e.keyCode === 13 && !isBlank(inputField.value)) {
    let li = document.createElement('li'),
        checkbox = document.createElement('input'),
        wrapper = document.createElement('span'),
        text = document.createTextNode(inputField.value);
    
    // add text to span
    wrapper.appendChild(text);

    // set up checkbox atributes
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "todo");

    // put everything together
    li.appendChild(checkbox);
    li.appendChild(wrapper);

    // add onClick, add to list and put everything together
    addClickTasks(li);
    document.getElementById('todoList').appendChild(li);
    inputField.value = '';
  }
});

let tasks = document.getElementById('todoList')
                    .childNodes.forEach(li => addClickTasks(li));
let done = document.getElementById('doneList')
                    .childNodes.forEach(li => addClickDone(li));