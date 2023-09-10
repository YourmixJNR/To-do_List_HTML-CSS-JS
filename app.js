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
            <span id="taskname">
                ${inputValue}
            </span>
            <button class="delete">
                <i class="far fa-trash-alt"></i>
            </button>
        </div>`
        ;

        
    }

    getTaskInput.value = '';
})