// app.js

// select elements
const input = document.getElementById("input");
const priority = document.getElementById("priority");
const addBtn = document.getElementById("addBtn");
const listsContainer = document.getElementById("lists-container");
const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value

// add event listener to the add button
addBtn.addEventListener("click", function() {
    const task = input.value;
    const taskPriority = priority.value;

    if (task.trim() === "") {
        return;
    }

    const taskItem = document.createElement("li");
    const taskText = document.createElement("span");
    taskText.classList.add("task-text")
    const checkbox = document.createElement("input");
    checkbox.classList.add("form-check-input")
    checkbox.type = "checkbox";
    taskText.textContent = task;
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);

    const taskList = document.getElementById("list-" + taskPriority);
    taskList.appendChild(taskItem);

    input.value = "";
});

// add event listener to the task lists
listsContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
        const taskId = e.target.id
        fetch('/todo/delete_task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({taskId: taskId})
        })
        .catch(error => {
            console.error('Error:', error);
        });
        const listItem = e.target.parentNode;
        const taskList = listItem.parentNode;
        taskList.removeChild(listItem);
    }
});
