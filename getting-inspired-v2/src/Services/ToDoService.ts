export interface IToDo{
    id:number;
    description:string;
    completed:boolean;

}

class ToDoService {
  _todos: IToDo[] = [];
  constructor(){
    this.getTodos();
  }

  async getTodos(){
    var todos = window.localStorage.getItem("getting-inspired-todos") ?? null;
    if(todos == null){
      this._todos = []
    }else{
      this._todos = JSON.parse(todos);
    }
    return this._todos;
  }

  async saveTodos(){
    window.localStorage.setItem("getting-inspired-todos", JSON.stringify(this._todos))
  }

  async updateTodo(taskId:number){
    var taskIndex = this._todos.findIndex(task => task.id == taskId);
    if(taskIndex == -1){
      console.log("Error:", "Failed To Find Todo")
      return;
    }else{
    var task = this._todos[taskIndex];
    task.completed = !task.completed;
    this._todos.splice(taskIndex, 1, task);
    this.saveTodos();
    return this.getTodos();
    }
  }

  async delTask(taskId:number) {
    var taskIndex = this._todos.findIndex(t => t.id == taskId);
    if(taskIndex == -1){
      console.log("Error: ", "Failed to find Task");
      return;
    }else {
      var todos = this._todos.filter(t => t.id !== taskId);
      this._todos = todos;
      this.saveTodos();
    }
    return this.getTodos();
  }


  async addTodo(formData:IToDo) {
    this._todos.push(formData);
    this.saveTodos();
    return this.getTodos();
  }

}

export const toDoService = new ToDoService()