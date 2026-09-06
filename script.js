const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCounter = document.getElementById("task-counter");
const emptyMessage = document.getElementById("empty-message");
const filterButtons = document.querySelectorAll(".filter-button");

let currentFilter = "all";

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    createTask(taskText);

    taskInput.value = "";
    taskInput.focus();

    updateTaskCounter();
    filterTasks();
});

function createTask(taskText) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");

    const text = document.createElement("span");
    text.classList.add("task-text");
    text.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Excluir";

    checkbox.addEventListener("change", function () {
        taskItem.classList.toggle("completed");
        filterTasks();
    });

    deleteButton.addEventListener("click", function () {
        taskItem.remove();
        updateTaskCounter();
        filterTasks();
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(text);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
}

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (otherButton) {
            otherButton.classList.remove("active");
        });

        button.classList.add("active");
        currentFilter = button.dataset.filter;

        filterTasks();
    });
});

function filterTasks() {
    const tasks = taskList.querySelectorAll(".task-item");
    let visibleTasks = 0;

    tasks.forEach(function (task) {
        const isCompleted = task.classList.contains("completed");
        let shouldShow = false;

        if (currentFilter === "all") {
            shouldShow = true;
        } else if (currentFilter === "pending" && !isCompleted) {
            shouldShow = true;
        } else if (currentFilter === "completed" && isCompleted) {
            shouldShow = true;
        }

        if (shouldShow) {
            task.style.display = "flex";
            visibleTasks++;
        } else {
            task.style.display = "none";
        }
    });

    updateEmptyMessage(tasks.length, visibleTasks);
}

function updateTaskCounter() {
    const totalTasks = taskList.children.length;

    if (totalTasks === 1) {
        taskCounter.textContent = "1 tarefa";
    } else {
        taskCounter.textContent = `${totalTasks} tarefas`;
    }
}

function updateEmptyMessage(totalTasks, visibleTasks) {
    if (totalTasks === 0) {
        emptyMessage.textContent =
            "Você ainda não adicionou nenhuma tarefa.";

        emptyMessage.style.display = "block";
    } else if (visibleTasks === 0) {
        if (currentFilter === "pending") {
            emptyMessage.textContent =
                "Nenhuma tarefa pendente.";
        } else {
            emptyMessage.textContent =
                "Nenhuma tarefa concluída.";
        }

        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}

updateTaskCounter();
filterTasks();