import { PROJECT_KEY, TASK_KEY } from "./constants.js";
import { Project } from "./Project.js";
import { Task } from "./Task.js";

// fn from MDN website - returns true when localStorage is both supported and available
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}

export function saveToLocalStorage(key, data) {
    if (!storageAvailable("localStorage")) {
        throw new Error("Local storage not available");
    }

    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error(`Failed to save ${key} to localStorage:`, e);
    }
}

export function loadFromStorage(key) {
    try {
        const json = localStorage.getItem(key);
        const objList = JSON.parse(json);

        if (key === TASK_KEY) {
            const taskList = objList.map(t => 
                new Task(t.title, t.description, t.status, new Date(t.dueDate), t.priority, t.projectId)
            );
            return taskList;
        } else if (key === PROJECT_KEY) {
            const projectList = objList.map(p =>
                new Project(p._name, p._description)
            );
        } else {
            return null;
        }
    } catch (e) {
        console.error(`Failed to load ${key} from localStorage:`, e);
        return null;
    }
}