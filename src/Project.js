import { getRandomColor } from "./colors.js";

export class Project {
    #id;
    #name;
    #description;
    #color;

    constructor(name, description) {
        this.#id = crypto.randomUUID();
        this.#name = name;
        this.#description = description;
        this.#color = getRandomColor();
    }

    // Getter for id
    get id() {
        return this.#id;
    }

    // Setter for id
    set id(value) {
        throw new Error("ID is read-only and cannot be modified");
    }

    // Getter for name
    get name() {
        return this.#name;
    }

    // Setter for name
    set name(value) {
        if (typeof value !== "string" || value.trim() === "") {
            throw new Error("Name must be a non-empty string");
        }
        this.#name = value;
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

    // Getter for color
    get color() {
        return this.#color;
    }

    // Setter for color
    set color(value) {
        this.#color = value;
    }
}