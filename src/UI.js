import { ADD_TASK, ALL, COMPLETED, CREATE, INBOX, PENDING, PROJECT, PROJECT_STORAGE_KEY, TASK_STORAGE_KEY, TODAY, UPCOMING, UPDATE, UPDATE_TASK } from "./constants.js";
import { saveToLocalStorage } from "./storage.js";
import { todoList } from "./todoList.js";

class UI {

    // DOM elements
    createTaskButton;
    createProjectButton;
    allButton;
    inboxButton;
    todayButton;
    upcomingButton;
    taskForm;
    projectForm;
    taskCreateDialog;
    projectCreateDialog;
    taskDialogCloseButton;
    projectDialogCloseButton;

    inboxProject;           // inbox project object
    currentSelectedProject; // currently selected project
    currentSelectedTab;     // currently selected TAB - all, today, inbox, project

    constructor() {
        this.createTaskButton = document.querySelector("button.create-new-task");
        this.createProjectButton = document.querySelector("button.create-project");
        this.allButton = document.querySelector(".all");
        this.inboxButton = document.querySelector(".inbox");
        this.todayButton = document.querySelector(".today");
        this.upcomingButton = document.querySelector(".upcoming");
        this.taskForm = document.querySelector("form.task-form");
        this.projectForm = document.querySelector("form.project-form");
        this.taskCreateDialog = document.querySelector(".task-form-dialog");
        this.projectCreateDialog = document.querySelector(".project-form-dialog");
        this.taskDialogCloseButton = document.querySelector(".task-form button.close");
        this.projectDialogCloseButton = document.querySelector(".project-form button.close");

        // create default project - inbox
        this.inboxProject = todoList.addProject("Inbox", "Default project for tasks.");
        this.currentSelectedProject = null;

        this.setupDomEvents();

        // init projects
        this.renderProjectList();

        // init tasks - render "All" task section by default
        this.allButton.click();

    }

    // Function to register all DOM listen events
    setupDomEvents() {
        this.createTaskButton.addEventListener("click", () => {
            // update project list in dropdown
            this.updateProjectDropDown();

            // set submit button to "Add Task"
            const submitButton = this.taskForm.querySelector(".task-submit");
            submitButton.innerText = ADD_TASK;
            submitButton.dataset.operation = CREATE;

            this.taskCreateDialog.showModal();
        });

        this.createProjectButton.addEventListener("click", () => {
            this.projectCreateDialog.showModal();
        });

        this.allButton.addEventListener("click", () => {
            console.log(todoList.taskList);
            this.currentSelectedTab = ALL;
            this.currentSelectedProject = null;
            this.renderTaskList(this.filterTaskList());
        });

        this.inboxButton.addEventListener("click", () => {
            this.currentSelectedTab = INBOX;
            this.currentSelectedProject = this.inboxProject;
            this.renderTaskList(this.filterTaskList());
        });

        this.todayButton.addEventListener("click", () => {
            this.currentSelectedTab = TODAY;
            this.currentSelectedProject = null;
            this.renderTaskList(this.filterTaskList());
        });

        this.upcomingButton.addEventListener("click", () => {
            this.currentSelectedTab = UPCOMING;
            this.currentSelectedProject = null;
            this.renderTaskList(this.filterTaskList());
        });

        this.taskForm.addEventListener("submit", this.handleTaskCreation.bind(this));

        this.projectForm.addEventListener("submit", this.handleProjectCreation.bind(this));

        this.taskDialogCloseButton.addEventListener("click", () => {
            this.taskForm.reset();
            this.taskCreateDialog.close();
        });

        this.projectDialogCloseButton.addEventListener("click", () => {
            this.projectForm.reset();
            this.projectCreateDialog.close();
        });
    }

    initProjects() {

    }

    /**
     * returns filtered task list based on current selected tab and project
     */
    filterTaskList() {
        if (this.currentSelectedTab === ALL) {
            return todoList.taskList;
        } else if (this.currentSelectedTab === PROJECT || this.currentSelectedTab === INBOX) {
            return todoList.taskList.filter(t => t.projectId === this.currentSelectedProject.id);
        } else if (this.currentSelectedTab === TODAY) {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize to midnight - like floor()
            console.log(today);
            return todoList.taskList.filter(t => {
                const dueDateCopy = new Date(t.dueDate);
                dueDateCopy.setHours(0, 0, 0, 0);
                console.log(dueDateCopy);

                return dueDateCopy.getTime() === today.getTime();
            });
        } else if (this.currentSelectedTab === UPCOMING) {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize to midnight - like floor()
            const seventhDay = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            return todoList.taskList.filter(t => {
                const dueDateCopy = new Date(t.dueDate);
                dueDateCopy.setHours(0, 0, 0, 0);

                return dueDateCopy.getTime() > today.getTime() && dueDateCopy.getTime() <= seventhDay.getTime();
            });
        } else {
            console.log(`currentSelectedTab not set : ${this.currentSelectedTab}`);
        }
        return todoList.taskList;
    }

    // renders tasks from a list in the task-list-container
    renderTaskList(taskList) {
        const taskListContainer = document.querySelector("main.task-list");

        // clear container
        taskListContainer.innerHTML = "";

        // add each task DOM to the list
        taskList.forEach(t => {
            const taskDom = this.createTaskDom(t);
            taskListContainer.appendChild(taskDom);
        });
    }

    // returns task DOM given a task object
    createTaskDom(task) {
        // create task dom

        // Create the main task-container div
        const taskContainer = document.createElement('div');
        taskContainer.className = 'task-container';
        taskContainer.dataset.taskId = task.id; // Store task ID for reference ****

        // Create the checkbox input
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'status';
        checkbox.id = `status-${task.id}`; // Unique ID for each task
        checkbox.checked = task.status === COMPLETED; // Check if status is Completed

        // Create the title div
        const titleDiv = document.createElement('div');
        titleDiv.className = 'title';
        titleDiv.textContent = task.title || 'Untitled'; // Fallback if title is empty

        // Create the task-buttons div
        const taskButtons = document.createElement('div');
        taskButtons.className = 'task-buttons';

        // Create the Details button
        const detailsButton = document.createElement('button');
        detailsButton.className = 'details';
        detailsButton.textContent = 'Details';

        // Create the Edit button
        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Edit';

        // Create the Delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';

        // Append buttons to task-buttons div
        taskButtons.appendChild(detailsButton);
        taskButtons.appendChild(editButton);
        taskButtons.appendChild(deleteButton);

        // Append all elements to task-container
        taskContainer.appendChild(checkbox);
        taskContainer.appendChild(titleDiv);
        taskContainer.appendChild(taskButtons);

        // attach click event listeners to buttons
        detailsButton.addEventListener("click", (event) => {
            const taskContainer = event.target.closest(".task-container");
            const taskId = taskContainer.dataset.taskId;
            this.showTaskDetails(taskId);
        });

        editButton.addEventListener("click", (event) => {
            const taskContainer = event.target.closest(".task-container");
            const taskId = taskContainer.dataset.taskId;
            this.showEditTaskDialog(taskId);
        });

        deleteButton.addEventListener("click", (event) => {
            const taskContainer = event.target.closest(".task-container");
            const taskId = taskContainer.dataset.taskId;
            this.handleTaskDeletion(taskId);
        });


        return taskContainer;
    }

    // clears and renders the Project List
    renderProjectList() {
        const projectListContainer = document.querySelector(".projects .project-list");

        // clear container
        projectListContainer.innerHTML = "";

        // add each Project DOM to the container
        todoList.projectList.forEach(p => {
            // create dom
            const projectDom = document.createElement("div");
            projectDom.innerText = p.name;
            projectDom.id = p.id;
            projectDom.addEventListener("click", () => {
                this.currentSelectedTab = PROJECT;
                this.currentSelectedProject = p; // correct due to closures.
                this.renderTaskList(this.filterTaskList());
            });

            // append dom
            projectListContainer.appendChild(projectDom);
        });
    }

    // handles creation of Task when user creates a new task using the task form
    // also handles updation of task - Edit task
    handleTaskCreation(event) {
        event.preventDefault(); // prevent default action of form sending data to server

        // collect data from Form
        const title = document.querySelector('#title').value.trim();
        const description = document.querySelector('#task-description').value.trim();
        const priority = document.querySelector('input[name="low"]:checked')?.value ||
            document.querySelector('input[name="medium"]:checked')?.value ||
            document.querySelector('input[name="high"]:checked')?.value || '';
        const dueDate = document.querySelector('#due-date').value;
        const projectId = document.querySelector('#task-project-select').value;

        // determine if it is create or update call
        const submitButton = this.taskForm.querySelector(".task-submit");
        const operation = submitButton.dataset.operation;

        if (operation === CREATE) {
            // add task to task list
            todoList.addTask(title, description, PENDING, dueDate, priority, projectId);
        } else if (operation === UPDATE) {
            const taskIndex = todoList.taskList.findIndex(t => t.id === submitButton.dataset.taskId);
            todoList.taskList[taskIndex] = {
                ...todoList.taskList[taskIndex],
                title,
                description,
                dueDate,
                priority,
                projectId
            };
        }

        // update local storage
        saveToLocalStorage(TASK_STORAGE_KEY, todoList.taskList);

        // render task list again
        this.renderTaskList(this.filterTaskList());

        this.taskForm.reset();
        this.taskCreateDialog.close();
    }

    // handles deletion of task 
    handleTaskDeletion(taskId) {
        // TODO
        // delete task from tasklist
        todoList.removeTask(taskId);

        // update storage
        saveToLocalStorage(TASK_STORAGE_KEY, todoList.taskList);

        // update UI
        this.renderProjectList(this.filterTaskList());
    }

    // handles creation of new project
    handleProjectCreation(event) {
        event.preventDefault();

        // collect data from Form
        const name = document.querySelector("#name").value.trim();
        const description = document.querySelector("#project-description").value.trim();

        // add project to Project List
        todoList.addProject(name, description);

        // update local storage
        saveToLocalStorage(PROJECT_STORAGE_KEY, todoList.projectList);

        // render Project List again
        this.renderProjectList(this.filterTaskList());

        this.projectForm.reset();
        this.projectCreateDialog.close();
    }



    // given task.id, it fetches and displays task details
    showTaskDetails(taskId) {
        // TODO
    }

    // given task.id, displays edit dialog for that task
    showEditTaskDialog(taskId) {

        // get the task
        const task = todoList.taskList.find(t => t.id === taskId);

        // prepare the form

        // update project list in dropdown
        this.updateProjectDropDown();

        // set submit button to "Update Task"
        const submitButton = this.taskForm.querySelector(".task-submit");
        submitButton.innerText = UPDATE_TASK;
        submitButton.dataset.operation = UPDATE;
        submitButton.dataset.taskId = taskId;

        // Populate form fields with task data
        document.querySelector('#title').value = task.title;
        document.querySelector('#task-description').value = task.description;

        // Select the option in the dropdown where value matches task.projectId
        document.querySelector('#task-project-select').value = task.projectId;

        // Format dueDate (Date object) to YYYY-MM-DD for date input - toISOString() gives something like "2025-04-22T13:00:00.000Z"
        document.querySelector('#due-date').value = task.dueDate.toISOString().split('T')[0];

        // Set priority radio button (low, medium, high)
        const priorityRadio = document.querySelector(`input[name="priority"][value="${task.priority.toLowerCase()}"]`);
        priorityRadio.checked = true;

        this.taskCreateDialog.showModal();
    }

    // updates the task form Project Drop Down with latest projects
    updateProjectDropDown() {
        // add latest project options to the project drop down
        const projectDropDown = document.querySelector('#task-project-select');
        projectDropDown.innerHTML = "";
        todoList.projectList.forEach(p => {
            const projectOption = document.createElement("option");
            projectOption.innerText = p.name;
            projectOption.value = p.id;
            projectDropDown.appendChild(projectOption);
        });
    }
}


// Singleton UI instance
export const ui = new UI();