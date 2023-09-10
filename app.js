// Global Variables
const getTaskInput = document.getElementById("taskInput");
const pushBtn = document.getElementById("push");
const taskLists = document.getElementById("tasks");

pushBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const inputValue = getTaskInput.value;

    if(inputValue.length == 0) {
        alert('Comrade Please Input Something');
    } else {
        taskLists.innerHTML += `
        <div class="task">
            <span id="taskname" class="taskname">
                ${inputValue}
            </span>
            <button class="delete">
                <i class="far fa-trash-alt"></i>
            </button>
        </div>`
        ;

        // Use event delegation to handle both completion and deletion
        taskLists.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('task')) {
                // Toggle the 'completed' class on the task
                target.classList.toggle('completed');
            } else if (target.classList.contains('delete')) {
                // Remove the parent task element when the delete button is clicked
                target.parentNode.remove();
            }
        });
        
    };

    getTaskInput.value = '';

})