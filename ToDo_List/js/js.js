var todo = ['Hacer laboratorio de web',
            'Ejercicio',
            'Ir al super',
            'Tomar 2 litros de agua'];

var done = ['Preparar de cenar'];

var todoList = document.querySelector('#tasks')
todoList.innerHTML = '<ul>' + todo.map((task) => {
    return (
        '<li>' + 
            '<input type="checkbox" name="todo" value="task">' +
            '<span>' + task + '</span>' +
        '</li>'
    )
}).join('') + '</ul>';

var doneList = document.querySelector('#finished')
doneList.innerHTML = '<ul>' + done.map((task) => {
    return (
        '<li>' + 
            '<input type="checkbox" name="todo" value="task" checked>' +
            '<span class="done">' + task + '</span>' +
        '</li>'
    )
})

var inputField = document.getElementById("newitem");

inputField.addEventListener('keyup', e => {
    if(e.keyCode == 13 ){
        todo = [...todo, inputField.value];
        list = document.querySelector('#tasks');
        list.innerHTML = '<ul>' + todo.map((task) => {
            return(
                '<li>' +
                    '<input type="checkbox" name="todo" value="task">' +
                    '<span>' + task + '</span>' +
                '</li>'
            )
        }).join('') + '</ul>';
        inputField.value = '';
    }
})


var testHTML = document.querySelector('#test');
console.log("test results:", testHTML.innerHTML);

/*
todo:
    - when clicking on checkbox:
        1.- grab element with clicked checkbox
        2.- done.concat(element of step 1);
        3.- todo.filter(() => val === val elem 1);
        4.- keyboard event listener
        5.- validar input no vacio
        6.- clear input text
 */