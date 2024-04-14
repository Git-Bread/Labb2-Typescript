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
    }
 
}

let start = new todoList;