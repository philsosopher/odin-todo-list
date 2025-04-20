export class Task {
    #id;
    #title;
    #description;
    #status;
    #dueDate;
    #priority;
    #projectId;

    constructor(title, description, status, dueDate, priority, projectId) {
        this.#id = crypto.randomUUID();
        this.#title = title;
        this.#description = description;
        this.#status = status;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#projectId = projectId;
    }

    // Getter for id
    get id() {
        return this.#id;
    }

    // Setter for id
    set id(value) {
        throw new Error("ID is read-only and cannot be modified");
    }

    // Getter for title
    get title() {
        return this.#title;
    }

    // Setter for title
    set title(value) {
        if (typeof value !== "string" || value.trim() === "") {
            throw new Error("Title must be a non-empty string");
        }
        this.#title = value;
    }

    // Getter for description
    get description() {
        return this.#description;
    }

    // Setter for description
    set description(value) {
        if (typeof value !== "string") {
            throw new Error("Description must be a string");
        }
        this.#description = value;
    }

    // Getter for status
    get status() {
        return this.#status;
    }

    // Setter for status
    set status(value) {
        if (!["Pending", "Completed"].includes(value)) {
            throw new Error("Status must be Pending or Completed");
        }
        this.#status = value;
    }

    // Getter for dueDate
    get dueDate() {
        return this.#dueDate;
    }

    // Setter for dueDate
    set dueDate(value) {
        if (!(value instanceof Date) || isNaN(value)) {
            throw new Error("Invalid date");
        }
        this.#dueDate = value;
    }

    // Getter for priority
    get priority() {
        return this.#priority;
    }

    // Setter for priority
    set priority(value) {
        if (!Number.isInteger(value) || value < 1 || value > 5) {
            throw new Error("Priority must be an integer between 1 and 5");
        }
        this.#priority = value;
    }

    // Getter for projectId
    get projectId() {
        return this.#projectId;
    }

    // Setter for projectId
    set projectId(value) {
        // Validation requires projectList from todoApp; handle there
        this.#projectId = value;
    }
}