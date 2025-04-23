# odin-todo-list


## Next Steps
- Task form UI
- Project form UI
- Create Task button
- details view
- UI.js class
    - constructor to init all ui elements
    - add event click listeners to all buttons
        - permanent buttons
        - dynimic buttons -> projects 
    - generateTasks(project) :done:
    - generateProjectList() :done"
    - function to add project 
    - function to delete Projects
    - funciton to add / update / delete Tasks
    - functions to generate today and upcoming tasks
- fix the date stuff in tasks - use proper formats

- better UI
    - icons all, inbox, today, upcoming
    - better task buttons icons
    - colors
    - header icon
    - task
        checkbox
    - form
        prirotity radio buttons
    - project color

- webpack dev and prod setup

### Immediate next steps
<!-- -> render Task list -> handle project, today, upcoming, all -->
<!-- -> better way to export and improt so many constants :done: -->
<!-- -> method to create Task DOM and attach onclick listeners -->
<!-- -> methods to delete tasks and projects -->
-> **onclick listener definitions for task buttons**
    -> edit button
        <!-- -> html - dialog and form -->
        <!-- -> read task and update form -->
        <!-- -> eventListener to update button -->
    -> details button
        -> html - dialog and form (make it uneditable)
        -> edit button to allow editing ?
        -> event listerns
<!-- -> fix date stuff
    -> how does date work in javascript
    -> make task date setter and getter work with that
    -> check where are we using dates -->
<!-- -> function to generate today and upcoming tasks -->
-> delete project mechanism
    -> UI
    -> methods
<!-- -> task create form and other forms should have project list proper -->
-> try all functionality one by one and figure out what's missing
-> UI of clicking on aside tabs
    -> feedback on click
    -> show selected tab

-> Fix project list load on aside
<!-- continue the edit button listener -->
debug issue with double edit