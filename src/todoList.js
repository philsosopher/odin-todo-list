import { Project } from "./Project.js";
import { Task } from "./Task.js";
import { PROJECT_STORAGE_KEY, TASK_STORAGE_KEY } from "./constants.js";
import { loadFromStorage } from "./storage.js";

class TodoList {
    #taskList = [];
    #projectList = [];

    constructor() {
        this.#taskList = loadFromStorage(TASK_STORAGE_KEY) || [];
        this.#projectList = loadFromStorage(PROJECT_STORAGE_KEY) || [];
    }

    get taskList() {
        return this.#taskList; // Or [...this.#taskList] for defensive copy
    }

    get projectList() {
        return this.#projectList; // Or [...this.#projectList] for defensive copy
    }

    addProject(name, description) {
        const project = new Project(name, description);
        this.#projectList.push(project);

        // TODO: update localStorage

        // TODO: refresh UI

        // TODO: should I just return project id ?
        return project;
    }

    removeProject(projectId) {
        // remove project from #projectList
        this.#projectList = this.#projectList.filter(project => project.id !== projectId);
        
        // remove associated tasks
        this.#taskList = this.#taskList.filter(task => task.projectId !== projectId);

        // TODO: update localStorage

        // TODO: refresh UI
    }

    addTask(title, description, status, dueDate, priority, projectId) {
        const task = new Task(title, description, status, dueDate, priority, projectId);
        this.#taskList.push(task);

        // TODO: update localStorage

        // TODO: refresh UI
    }

    updateTask(taskId, title, description, status, dueDate, priority, projectId) {
        const task = this.#taskList.find(t => t.id === taskId);
        if(task) {
            task.title = title;
            task.description = description;
            task.status = status;
            task.dueDate = dueDate;
            task.priority = priority;
            task.projectId = projectId
        } else {
            throw new Error("Task not found");
        }

        // TODO: update localStorage

        // TODO: refresh UI
    }

    removeTask(taskId) {
        this.#taskList = this.#taskList.filter(t => t.id !== taskId);
    }
}

export const todoList = new TodoList();