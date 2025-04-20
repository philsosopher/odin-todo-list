class Task {
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

    set id(value) {
        throw new Error("ID is read-only and cannot be modified");
    }

    // Getter for title
    get title() {
        return this.#title;
    }

    // Setter for title
    set title(value) {
        this.#title = value;
    }

    // Getter for description
    get description() {
        return this.#description;
    }

    // Setter for description
    set description(value) {
        this.#description = value;
    }

    // Getter for status
    get status() {
        return this.#status;
    }

    // Setter for status
    set status(value) {
        this.#status = value;
    }

    // Getter for dueDate
    get dueDate() {
        return this.#dueDate;
    }

    // Setter for dueDate
    set dueDate(value) {
        this.#dueDate = value;
    }

    // Getter for priority
    get priority() {
        return this.#priority;
    }

    // Setter for priority
    set priority(value) {
        this.#priority = value;
    }

    // Getter for projectId
    get projectId() {
        return this.#projectId;
    }

    // Setter for projectId
    set projectId(value) {
        this.#projectId = value;
    }
}