import { PENDING, TASK_KEY } from "./constants.js";
import { saveToLocalStorage } from "./storage.js";
import { todoList } from "./todoList.js";

class UI {
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
    inboxProject;
    currentSelectedProject;

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

        // render "All" task section
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
            this.currentSelectedProject = null;
            this.renderTaskList(todoList.taskList);
        });

        this.inboxButton.addEventListener("click", () => {
            this.currentSelectedProject = this.inboxProject;
            this.renderTaskList(this.currentProjectTaskList());
        });

        this.todayButton.addEventListener("click", () => {
            this.renderTaskList(todoList.taskList.filter(t => {
                // TODO: filter based on today's date
                // t.dueDate === Today
            }));
        });

        this.upcomingButton.addEventListener("click", () => {
            this.renderTaskList(todoList.taskList.filter(t => {
                // TODO: filter based on today's date and week
                // t.dueDate > Today && t.dueDate <= Today + 7
            }));
        });

        this.taskForm.addEventListener("submit", handleTaskCreation);
    }

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

    createTaskDom(task) {
        // create task dom

        // style according to properties

        // attach click event listeners to buttons
    }

    currentProjectTaskList() {
        return todoList.taskList.filter(t => t.projectId === this.currentSelectedProject.id);
    }
    
    handleTaskCreation(event) {
        event.preventDefault(); // prevent default action of form sending data to server

        // collect data from form
        const title = form.querySelector('#title').value.trim();
        const description = form.querySelector('#task-description').value.trim();
        const priority = form.querySelector('input[name="low"]:checked')?.value || 
                        form.querySelector('input[name="medium"]:checked')?.value || 
                        form.querySelector('input[name="high"]:checked')?.value || '';
        const dueDate = form.querySelector('#due-date').value;
        const projectId = form.querySelector('#task-project-select').value;

        // TODOadd task to task list
        todoList.addTask(title, description, PENDING, dueDate, priority, projectId);

        // update storage
        saveToLocalStorage(TASK_KEY, todoList.taskList);

        // render task list again
        if (this.currentSelectedProject === null) {
            this.allButton.click();
        } else {
            this.renderTaskList(this.currentProjectTaskList());
        }
    }
}