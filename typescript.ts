interface todo {
    task: string,
    completed: boolean,
    priority: 1|2|3
}

class todoList {
    public todos: todo[];
    constructor() {
        this.loadFromLocalStorage();
    }
    
    //adds task
    addTodo(task: string, completed: boolean, priority: 1|2|3):boolean {
        try {
            let newTodo : todo = {task: task, completed: completed, priority: priority};
            this.todos.push(newTodo);
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