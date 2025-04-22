import { ALL, INBOX, PENDING, PROJECT_KEY, TASK_KEY, TODAY, UPCOMING } from "./constants.js";
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

        // create default project - inbox
        this.inboxProject = todoList.addProject("inbox", "Default project for tasks.");
        this.currentSelectedProject = null;

        this.setupDomEvents();

        // render "All" task section by default
        this.allButton.click();
        
    }

    setupDomEvents() {
        this.createTaskButton.addEventListener("click", () => {
            this.taskCreateDialog.showModal();
        });

        this.createProjectButton.addEventListener("click", () => {
            this.projectCreateDialog.showModal();
        });

        this.allButton.addEventListener("click", () => {
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
            this.renderTaskList(todoList.taskList.filter(t => {
                this.currentSelectedTab = TODAY;
                this.currentSelectedProject = null;
                this.renderTaskList(this.filterTaskList())
            }));
        });

        this.upcomingButton.addEventListener("click", () => {
            this.renderTaskList(todoList.taskList.filter(t => {
                this.currentSelectedTab = UPCOMING;
                this.currentSelectedProject = null;
                this.renderTaskList(this.filterTaskList())
            }));
        });

        this.taskForm.addEventListener("submit", handleTaskCreation);

        this.projectForm.addEventListener("submit", handleProjectCreation);
    }

    // returns filtered task list based on current selected tab and project
    filterTaskList() {
        if (this.currentSelectedTab === ALL) {
            return todoList.taskList;
        } else if (this.currentSelectedTab === PROJECT || this.currentSelectedTab === INBOX) {
            return todoList.taskList.filter(t => t.projectId === this.currentSelectedProject.id);
        } else if (this.currentSelectedTab === TODAY) {
                // TODO: filter based on today's date
                // t.dueDate === Today
        } else if (this.currentSelectedTab === UPCOMING) {
                // TODO: filter based on today's date and week
                // t.dueDate > Today && t.dueDate <= Today + 7
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

        // style according to properties

        // attach click event listeners to buttons
    }

    // clears and renders the Project List
    renderProjectList() {
        const projectListContainer = document.querySelector(".projects.project-list");

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
    handleTaskCreation(event) {
        event.preventDefault(); // prevent default action of form sending data to server

        // collect data from Form
        const title = form.querySelector('#title').value.trim();
        const description = form.querySelector('#task-description').value.trim();
        const priority = form.querySelector('input[name="low"]:checked')?.value || 
                        form.querySelector('input[name="medium"]:checked')?.value || 
                        form.querySelector('input[name="high"]:checked')?.value || '';
        const dueDate = form.querySelector('#due-date').value;
        const projectId = form.querySelector('#task-project-select').value;

        // add task to task list
        todoList.addTask(title, description, PENDING, dueDate, priority, projectId);

        // update local storage
        saveToLocalStorage(TASK_KEY, todoList.taskList);

        // render task list again
        this.renderTaskList(this.filterTaskList());
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
        saveToLocalStorage(PROJECT_KEY, todoList.taskList);

        // render Project List again
        this.renderProjectList();
    }
}