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
        let change = document.getElementsByTagName("li")[index].children[1];
        console.log("change");
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
        let codeObject = document.createElement("td");
        let nameObject = document.createElement("td");
        let progressionObject = document.createElement("td");
        let syllabusObject = document.createElement("td");
        let option = document.createElement("option");

        //assign value
        codeObject.innerHTML = content[index].task;
        nameObject.innerHTML = content[index].completed.toString();
        progressionObject.innerHTML = content[index].priority.toString();
        syllabusObject.innerHTML = content[index].date.toString();
        option.innerHTML = content[index].task;

        //appends
        container.append(codeObject);
        container.append(nameObject);
        container.append(progressionObject);
        container.append(syllabusObject);
        table.append(container);
        select.append(option);
    }
}
