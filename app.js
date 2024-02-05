// app.js
const API_URL = 'https://todo-api-eh0i.onrender.com/api';

// Function to create a new item
async function createItem(item) {
    try {
        const response = await fetch(`${API_URL}/task-create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Create failed:', error);
    }
}

// Function to read all items
async function getItems() {
    try {
        const response = await fetch(`${API_URL}/task-list/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Get items failed:', error);
    }
}

// Function to update an item
async function updateItem(id, updatedItem) {
    try {
        const response = await fetch(`${API_URL}/task-update/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedItem)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Update failed:', error);
    }
}

// Function to delete an item
async function deleteItem(id) {
    try {
        const response = await fetch(`${API_URL}/task-delete/${id}/`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return true; // Indicate success
    } catch (error) {
        console.error('Delete failed:', error);
    }
}

// Get references to DOM elements
const getTaskInput = document.getElementById("taskInput");
const pushBtn = document.getElementById("push");
const taskLists = document.getElementById("tasks");

// Load existing tasks from the API, or initialize as an empty array
let tasks = [];

// Load tasks from the API when the page loads
window.addEventListener('load', async () => {
    tasks = await getItems();
    renderTasks();
});

// Event listener for adding a new task
pushBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const inputValue = getTaskInput.value;

    if (inputValue.length === 0) {
        alert('Please input something');
    } else {
        // Create a new task object with the input value
        const newTask = { title: inputValue }; // Adjust the property name based on the API's expected format

        // Call the createItem function to add the new task to the API
        try {
            const response = await createItem(newTask);
            console.log('New task created:', response);
            // Update the tasks array and re-render tasks
            tasks.push(response); // Assuming the response contains the full task object
            renderTasks();
        } catch (error) {
            console.error('Failed to create new task:', error);
        }
    }

    // Clear the input field
    getTaskInput.value = '';
});

// Function to render tasks
function renderTasks() {
    taskLists.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <span>
                <input type="checkbox" class="check" name="check" id="${task.id}" ${task.completed ? 'checked' : ''}>
            </span>
            <span class="taskname" style="${task.completed ? 'text-decoration: line-through;' : ''}">
                ${task.title}
            </span>
            <button class="delete">
                <i class="far fa-trash-alt"></i>
            </button>
        `;
        taskLists.appendChild(taskElement);

        // Add event listener for marking as completed and deleting
        taskElement.addEventListener('click', async (e) => {
            const deleteButton = taskElement.querySelector('.delete');
            const checkbox = taskElement.querySelector('.check');
            if (e.target === deleteButton || deleteButton.contains(e.target)) {
                // Delete task
                deleteItem(task.id).then(() => {
                    tasks.splice(index, 1);
                    renderTasks(); // Re-render tasks after deletion
                });
            } else if (e.target === checkbox) {
                // Toggle completion status and update the task
                task.completed = !task.completed;
                checkbox.checked = task.completed;
                await updateItem(task.id, task).then(() => {
                    renderTasks(); // Re-render tasks after updating
                    console.log(task)
                });
            }
        });
    });
}

// Initial rendering of tasks
renderTasks();