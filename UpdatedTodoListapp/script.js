const input = document.getElementById("input");
const ul = document.getElementById("list");
const addButton = document.getElementById("add");

function createTask() {
    if (input.value === "") {
        alert("EMPTY");
    } else {
        // create task element
        let newTask = document.createElement("li");
        newTask.setAttribute("class", "list");

        // create task text
        let newTaskText = document.createElement("span");
        newTaskText.innerText = input.value;

        // create delete button
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "delete");
        deleteButton.innerHTML = "\u00D7";

        // create check button
        let checkButton = document.createElement("button");
        checkButton.setAttribute("class", "check");
        checkButton.innerHTML = "";

        // create edit button
        let editButton = document.createElement("button");
        editButton.setAttribute("class", "edit");

        // append objects
        newTask.appendChild(newTaskText);
        newTask.appendChild(deleteButton);
        newTask.appendChild(checkButton);
        newTask.appendChild(editButton);
        ul.appendChild(newTask);

        // delete task event handler
        deleteButton.addEventListener('click', deleteTask);

        // check task event handler
        checkButton.addEventListener('click', checkTask);

        // edit task event handler
        editButton.addEventListener('click', editTask);
    }
};

// delete Task
function deleteTask(event) {
    event.target.parentNode.remove();
};

// check Task
function checkTask(event) {
    const task = event.target.parentNode;
    task.classList.toggle("checked");
    event.target.innerHTML = "";
    if (task.classList.contains("checked")) {
        event.target.innerHTML = "\u2714"; // Checkmark symbol
    }
};

// edit Task
function editTask(event) {
    const task = event.target.parentNode;
    const taskText = task.querySelector("span");

    const newInput = document.createElement("input");
    newInput.setAttribute("class", "editText");
    newInput.type = "text";
    newInput.value = taskText.innerText;
    task.replaceChild(newInput, taskText);

    newInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            const updatedText = document.createElement("span");
            updatedText.innerText = newInput.value;
            task.replaceChild(updatedText, newInput);
        }
    });

    // Optionally, blur event to update text when focus is lost
    newInput.addEventListener("blur", function() {
        const updatedText = document.createElement("span");
        updatedText.innerText = newInput.value;
        task.replaceChild(updatedText, newInput);
    });

    newInput.focus();
}

// create task with key
input.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        createTask();
    }
});

// event handler
addButton.addEventListener("click", createTask);
