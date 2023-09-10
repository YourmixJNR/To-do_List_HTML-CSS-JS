// Global Variables
const getTaskInput = document.getElementById("taskInput").value;
const pushBtn = document.getElementById("push");
const taskLists = document.getElementById("tasks");

pushBtn.addEventListener('click', () => {
    if(getTaskInput.length == 0) {
        alert('Comrade Please Input Something');
    } else {
        taskLists.innerHTML = `<p>${getTaskInput}</p>`;
    }
})