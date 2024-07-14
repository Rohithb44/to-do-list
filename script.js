// script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Retrieve tasks from local storage or initialize an empty array
    const getTasks = () => JSON.parse(localStorage.getItem('tasks')) || [];

    // Save tasks to local storage
    const saveTasks = (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks));

    // Render tasks on the page
    const renderTasks = () => {
        taskList.innerHTML = ''; // Clear the task list
        const tasks = getTasks(); // Get tasks from local storage

        // Iterate over each task and create HTML elements for each task
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskItem.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="task-buttons">
                    <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);

            // Event listener for the complete button
            const completeBtn = taskItem.querySelector('.complete-btn');
            completeBtn.addEventListener('click', () => {
                task.completed = !task.completed;
                saveTasks(tasks);
                renderTasks();
            });

            // Event listener for the edit button
            const editBtn = taskItem.querySelector('.edit-btn');
            editBtn.addEventListener('click', () => {
                const newText = prompt('Edit your task:', task.text);
                if (newText !== null && newText.trim() !== '') {
                    task.text = newText.trim();
                    saveTasks(tasks);
                    renderTasks();
                }
            });

            // Event listener for the delete button
            const deleteBtn = taskItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks(tasks);
                renderTasks();
            });
        });
    };

    // Event listener for the add task button
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const tasks = getTasks();
            tasks.push({ text: taskText, completed: false });
            saveTasks(tasks);
            renderTasks();
            taskInput.value = ''; // Clear the input field
        }
    });

    // Event listener for adding task with Enter key
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    // Initial rendering of tasks
    renderTasks();
});
