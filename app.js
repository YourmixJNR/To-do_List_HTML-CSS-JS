const getTaskInput = document.getElementById("taskInput");
const pushBtn = document.getElementById("push");
const taskLists = document.getElementById("tasks");

// Load existing tasks from local storage, or initialize as an empty array
let tasks = JSON.parse(localStorage.getItem('todos')) || [];

// Function to render tasks
function renderTasks() {
    taskLists.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <span class="taskname">${task}</span>
            <button class="delete">
                <i class="far fa-trash-alt"></i>
            </button>
        `;
        taskLists.appendChild(taskElement);

        // Add event listener for marking as completed and deleting
        taskElement.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete')) {
                // Delete task
                tasks.splice(index, 1);
                localStorage.setItem('todos', JSON.stringify(tasks));
                renderTasks(); // Re-render tasks after deletion
            } else {
                // Mark as completed (toggle class, update local storage)
                taskElement.querySelector('.taskname').classList.toggle('completed');
                tasks[index] = taskElement.querySelector('.taskname').textContent;
                localStorage.setItem('todos', JSON.stringify(tasks));
            }
        });
    });
}

// Initial rendering of tasks
renderTasks();

// Event listener for adding a new task
pushBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const inputValue = getTaskInput.value;

    if (inputValue.length == 0) {
        alert('Comrade Please Input Something');
    } else {
        // Add the new task to the list
        tasks.push(inputValue);
        localStorage.setItem('todos', JSON.stringify(tasks));
        renderTasks(); // Re-render tasks after adding
    }

    getTaskInput.value = '';
});
