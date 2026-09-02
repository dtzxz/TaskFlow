const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCounter = document.getElementById("task-counter");
const emptyMessage = document.getElementById("empty-message");

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    const text = document.createElement("span");
    text.classList.add("task-text");
    text.textContent = taskText;

    taskItem.appendChild(text);
    taskList.appendChild(taskItem);

    taskInput.value = "";
    taskInput.focus();

    updateTaskCounter();
});

function updateTaskCounter() {
    const totalTasks = taskList.children.length;

    if (totalTasks === 1) {
        taskCounter.textContent = "1 tarefa";
    } else {
        taskCounter.textContent = `${totalTasks} tarefas`;
    }

    if (totalTasks === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}

updateTaskCounter();