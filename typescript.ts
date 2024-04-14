interface todo {
    task: string,
    completed: boolean,
    priority: 1|2|3,
    date: Date
}

class todoList {
    public todos: todo[];
    constructor() {
        this.loadFromLocalStorage();
    }
    
    //adds task
    addTodo(task: string, completed: boolean, priority: 1|2|3):boolean {
        let currentDate = new Date();
        try {
            let newTodo : todo = {task: task, completed: completed, priority: priority, date: currentDate};
            this.todos.push(newTodo);
            this.saveToLocalStorage;
            this.constructor;
            return true
        } catch (error) { 
            window.alert("felinmatning utav värden: " + error);
            return false
        }
    }

    //changes box to checkmark
    markTodoCompleted(index:number):void {
        if (this.todos[index].completed) {
            this.todos[index].completed == false;    
        }
        else {
            this.todos[index].completed == true;   
        }
        this.saveToLocalStorage;
    }

    //returnerar alla todos
    getTodos():todo[] {
        return this.todos;
    }

    //save command
    saveToLocalStorage():void {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    //load command
    loadFromLocalStorage():void {
        this.todos = JSON.parse(localStorage.getItem("todos") as string);
        console.log(this.todos);
    }
 
}

let list = new todoList;
let content = list.getTodos();
populate();

//creates new elements and populates table
function populate() : void {

    if (content == null) {
        return;
    }

    let table = document.getElementsByTagName("table")[0];
    let select = document.getElementsByTagName("select")[0];

    //removes all old tables to stop duplicate
    while (table.children[1]) {
        table.removeChild(table.lastChild as HTMLElement);
    }

    for (let index = 0; index < content.length; index++) {
        //create elements
        let container = document.createElement("tr");
        let taskObject = document.createElement("td");

        //checkbox logic
        let completedContainer = document.createElement("td");
        let completed = document.createElement("input");
        completed.setAttribute("type", "checkbox");
        completed.addEventListener("onchange", function(){
            list.markTodoCompleted(this);
        });

        let progressionObject = document.createElement("td");
        let syllabusObject = document.createElement("td");
        let option = document.createElement("option");

        //assign value
        taskObject.innerHTML = content[index].task;
        completed.checked = content[index].completed;
        progressionObject.innerHTML = content[index].priority.toString();
        syllabusObject.innerHTML = content[index].date.toString();
        option.innerHTML = content[index].task;

        //appends
        container.append(taskObject);
        completedContainer.append(completed);
        container.append(completedContainer);
        container.append(progressionObject);
        container.append(syllabusObject);
        table.append(container);
        select.append(option);
    }
}
