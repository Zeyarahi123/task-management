


function handleSelection() {
    const action = document.getElementById("action").value;
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = ""; // Clear previous content

    if (action === "Add-Task") {
        contentDiv.innerHTML = `
            <h2>Add a New Task</h2>
            <form id="taskForm">
                <label for="description">Description:</label>
                <input type="text" id="description" required><br><br>

                <label for="deadline">Deadline:</label>
                <input type="date" id="deadline"><br><br>

                <label for="status">Status:</label>
                <select id="status">
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select><br><br>

                <button type="button" onclick="submitTask()">Submit</button>
            </form>
        `;
    } 
    else if (action === "Update-Task") {
        contentDiv.innerHTML = `
            <h2>Update Task</h2>
            <form id="updateTaskForm">
                <label for="taskId">Task ID:</label>
                <input type="number" id="taskId" required><br><br>

                <label for="updateStatus">Status:</label>
                <select id="updateStatus">
                    <option value="pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select><br><br>

                <button type="button" onclick="updateTask()">Update Task</button>
            </form>
        `;
    }
    else if (action === "View-Task") {
        contentDiv.innerHTML = `
            <h2>View Tasks</h2>
            <button type="button" onclick="viewTasks()">Fetch Tasks</button>
            <div id="taskList"></div>
        `;
    }
    else if (action === "View-Completed-Task") {
        contentDiv.innerHTML = `
            <h2>View completed Tasks</h2>
            <button type="button" onclick="viewCompletedTasks()">Fetch completed Tasks</button>
            <div id="taskLists"></div>
        `;
    }

    else if (action === "Delete-Task") {
        contentDiv.innerHTML = `
            <h2>View completed Tasks</h2>
            <button type="button" onclick="viewTasksForDeletion()">Delete Tasks</button>
            <div id="taskList"></div>
        `;
    }

    else if (action === "Exit") {
        contentDiv.innerHTML = `
            <h2>Exit</h2>
            <button type="button" onclick="confirmExit()">Exit</button>
        `;
    }
}

function submitTask() {
    const description = document.getElementById("description").value;
    const deadline = document.getElementById("deadline").value;
    const status = document.getElementById("status").value;
    const messageDiv = document.getElementById("message");

    if (!description) {
        messageDiv.innerHTML = "Description is required!";
        return;
    }

    const taskData = {
        description: description,
        deadline: deadline || null, // If no deadline, send null
        status: status
    };

    fetch("http://0.0.0.0:8080/task/add_task_details", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(data => {
        messageDiv.innerHTML = "Task added successfully!";
    })
    .catch(error => {
        messageDiv.innerHTML = "Error adding task!";
        console.error("Error:", error);
    });
}

function updateTask() {
    const taskId = document.getElementById("taskId").value;
    const status = document.getElementById("updateStatus").value;
    const messageDiv = document.getElementById("message");

    if (!taskId) {
        messageDiv.innerHTML = "Task ID is required!";
        return;
    }

    const taskData = {
        status: status
    };

    fetch(`http://0.0.0.0:8080/task/update_task_details?id=${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(taskData)
    })
    .then(response => response.json())
    .then(data => {
        messageDiv.innerHTML = "Task updated successfully!";
    })
    .catch(error => {
        messageDiv.innerHTML = "Error updating task!";
        console.error("Error:", error);
    });
}




function viewTasks() {
    const taskListDiv = document.getElementById("taskList");
    taskListDiv.innerHTML = "Fetching tasks...";

    fetch("http://0.0.0.0:8080/task/get_task_details", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            taskListDiv.innerHTML = "<p>No tasks available.</p>";
            return;
        }

        let tableHTML = `
            <table style="width: 100%; border-collapse: collapse; text-align: left;" border="1">
                <thead>
                    <tr style="background-color: #f2f2f2;">
                        <th style="padding: 10px; border: 1px solid #ddd;">ID</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Description</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">DeadLine</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Status</th>
                    </tr>
                </thead>
                <tbody>
        `;

        data.forEach(task => {
            tableHTML += `
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">${task.id}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${task.description}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${task.deadline}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${task.status}</td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        taskListDiv.innerHTML = tableHTML;
    })
    .catch(error => {
        taskListDiv.innerHTML = "<p>Error fetching tasks!</p>";
        console.error("Error:", error);
    });
}




function viewCompletedTasks() {
    const taskListDiv = document.getElementById("taskLists");
    taskListDiv.innerHTML = "Fetching completed tasks...";

    fetch("http://0.0.0.0:8080/task/get_task_details?status=Completed", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            taskListDiv.innerHTML = "<p>No Complete task available.</p>";
            return;
        }

        let tableHTML = `
            <table style="width: 100%; border-collapse: collapse; text-align: left;" border="1">
                <thead>
                    <tr style="background-color: #f2f2f2;">
                        <th style="padding: 10px; border: 1px solid #ddd;">ID</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Description</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">DeadLine</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Status</th>
                    </tr>
                </thead>
                <tbody>
        `;

        data.forEach(task => {
            tableHTML += `
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">${task.id}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${task.description}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${task.deadline}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${task.status}</td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        taskListDiv.innerHTML = tableHTML;
    })
    .catch(error => {
        taskListDiv.innerHTML = "<p>Error fetching tasks!</p>";
        console.error("Error:", error);
    });
}


function viewTasksForDeletion() {
    const taskListDiv = document.getElementById("taskList");
    taskListDiv.innerHTML = "Fetching tasks...";

    fetch("http://0.0.0.0:8080/task/get_task_details", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            taskListDiv.innerHTML = "<p>No tasks available.</p>";
            return;
        }

        let tableHTML = `
            <h3>Select a Task to Delete:</h3>
            <table style="width: 100%; border-collapse: collapse; text-align: left;" border="1">
                <thead>
                    <tr style="background-color: #f2f2f2;">
                        <th style="padding: 10px; border: 1px solid #ddd;">Select</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">ID</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Description</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Status</th>
                    </tr>
                </thead>
                <tbody>
        `;

        data.forEach(task => {
            tableHTML += `
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">
                        <input type="radio" name="taskToDelete" value="${task.id}">
                    </td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${task.id}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${task.description}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${task.status}</td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
            <br>
            <button onclick="deleteTask()" style="padding: 8px 15px; background-color: red; color: white; border: none; cursor: pointer;">Delete Selected Task</button>
        `;

        taskListDiv.innerHTML = tableHTML;
    })
    .catch(error => {
        taskListDiv.innerHTML = "<p>Error fetching tasks!</p>";
        console.error("Error:", error);
    });
}

function deleteTask() {
    const selectedTask = document.querySelector('input[name="taskToDelete"]:checked');

    if (!selectedTask) {
        alert("Please select a task to delete.");
        return;
    }

    const taskId = selectedTask.value;

    if (!confirm(`Are you sure you want to delete task ID ${taskId}?`)) {
        return;
    }

    fetch(`http://0.0.0.0:8080/task/delete_task_details?id=${taskId}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        alert("Task deleted successfully!");
        viewTasksForDeletion(); 
    })
    .catch(error => {
        alert("Error deleting task!");
        console.error("Error:", error);
    });
}

function confirmExit() {
    if (confirm("Are you sure you want to exit?")) {
        window.close();
    }
}
