interface todo {
    task: string,
    completed: boolean,
    priority: number,
    date: string
}

class todoList {
    todos: todo[] = [];
    constructor() {
        this.loadFromLocalStorage();
    }
    
    //adds task
    addTodo(task: string, completed: boolean, priority: number):boolean {
        let currentDate = new Date().toISOString().split('T')[0];;
        
        try {
            let newTodo : todo = {task: task, completed: completed, priority: priority, date: currentDate};

            if (priority > 3) {
                throw ("fel prioritet får vara mellan 1-3");
            }
            //checks for duplicate
            for (let index = 0; index < this.todos.length; index++) {
                if (this.todos[index].task == task) {
                throw ("finns redan en med detta namn");
            }
    }

            this.todos.push(newTodo);
            this.saveToLocalStorage();
            this.constructor;
            return true
        } catch (error) { 
            console.log(error)
            window.alert("felinmatning utav värden: " + error);
            return false
        }
    }

    //removes todo
    removeTodo(name:string):void {
        console.log(name)
        for (let index = 0; index < this.todos.length; index++) {
            if(this.todos[index].task.match(name)) {
                this.todos.splice(index, 1);
            }
        }
        this.saveToLocalStorage();
    }

    //changes box to checkmark
    markTodoCompleted(index:number):void {
        if (this.todos[index].completed) {
            this.todos[index].completed = false;
        }
        else {
            this.todos[index].completed = true;   
        }
        console.log(this.todos[index]);
        this.saveToLocalStorage();
    }

    //returnerar alla todos
    getTodos():todo[] {
        return this.todos;
    }

    //save command
    saveToLocalStorage():void {
        localStorage.setItem("todos", JSON.stringify(this.todos));
        console.log("saved");
    }

    //load command
    loadFromLocalStorage():void {
        this.todos = JSON.parse(localStorage.getItem("todos") as string);
        console.log(this.todos);
        if (this.todos == null) {
            this.todos = [];
        }
    }
 
}

let list = new todoList;
startup();

//startup logic
function startup() : void {
    const submit1 = document.getElementById("add");
    const submit2 = document.getElementById("change");
    const clear1 = document.getElementById("resetAdd");
    clear1?.addEventListener("click", function(){clear(this)});
    submit1?.addEventListener("click", function(){add(this)});
    submit2?.addEventListener("click", function(){remove()});
    if (list.getTodos() != null) {
        populate();
    }
}

//emties fields by calling reset
function clear(object : HTMLElement) : void {
    let parent = object.parentElement?.parentElement as HTMLFormElement;
    parent.reset();
}

//creates new elements and populates table
function populate() : void {

    let content = list.getTodos();
    let table = document.getElementsByTagName("table")[0];
    let select = document.getElementsByTagName("select")[0];

    //removes all old tables to stop duplicate
    while (table.children[1]) {
        table.removeChild(table.lastChild as HTMLElement);
    }

    while (select.children[1]) {
        select.removeChild(select.lastChild as HTMLElement);
    }

    for (let index = 0; index < content.length; index++) {
        //create elements
        let container = document.createElement("tr");
        let taskObject = document.createElement("td");

        //checkbox logic
        let completedContainer = document.createElement("td");
        let completed = document.createElement("input");
        completed.setAttribute("type", "checkbox");
        completed.addEventListener("change", function(){
            list.markTodoCompleted(index);
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

//adds new entry to course array
function add(object : HTMLElement) : void {
    let form = object.parentElement?.parentElement;

    //checks so that information is not empty
    if (form?.getElementsByTagName("input")[0].value == "" || 
    form?.getElementsByTagName("input")[1].value == "") {
        window.alert("alla fält behöver information");
        return;
    }

    //threw errors when it was defined with number, not sure how to elegantly solve it but since its restricted to numbers anyways ill add a any
    list.addTodo(form?.getElementsByTagName("input")[0].value as string, false, form?.getElementsByTagName("input")[1].value as any)

    clear(object);
    populate();
}
    
function remove() : void {
    list.removeTodo(document.getElementsByTagName("select")[0].value);
    populate();
}