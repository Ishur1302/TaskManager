// Load tasks from LocalStorage
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") return;

    let taskList = document.getElementById("taskList");

    // Create list item
    let li = document.createElement("li");
    li.innerHTML = `${taskText} 
        <button onclick="removeTask(this)">❌</button>`;
    
    // Add click event to mark as completed
    li.addEventListener("click", function() {
        this.classList.toggle("completed");
        saveTasks();
    });

    taskList.appendChild(li);

    saveTasks();
    taskInput.value = ""; // Clear input field
}

function removeTask(button) {
    let li = button.parentElement;
    li.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({ text: li.textContent.replace("❌", "").trim(), completed: li.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `${task.text} 
            <button onclick="removeTask(this)">❌</button>`;
        
        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", function() {
            this.classList.toggle("completed");
            saveTasks();
        });

        taskList.appendChild(li);
    });
}