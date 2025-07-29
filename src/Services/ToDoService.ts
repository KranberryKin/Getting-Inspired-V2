import { DoStringsMatch } from "../Utils/DoStringsMatch.ts";
import { generateId } from "../Utils/generateId.ts";

export interface IToDo{
    id: string;
    description: string;
    isCompleted: boolean;
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

  async updateTodo(taskId:string){
    var taskIndex = this._todos.findIndex(t => DoStringsMatch(taskId, t.id));
    if(taskIndex == -1){
      console.log("Error:", "Failed To Find Todo")
      return this.getTodos();
    }else{
    var task = this._todos[taskIndex];
    task.isCompleted = !task.isCompleted;
    this._todos.splice(taskIndex, 1, task);
    this.saveTodos();
    return this.getTodos();
    }
  }

  async delTask(taskId:string) {
    var taskIndex = this._todos.findIndex(t => DoStringsMatch(taskId, t.id));
    if(taskIndex == -1){
      console.log("Error: ", "Failed to find Task");
      return  this.getTodos();
    }else {
      var todos = this._todos.filter(t => !DoStringsMatch(taskId, t.id));
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

  async doesIdExsist(taskId:string){
    var taskIndex = this._todos.findIndex(t => DoStringsMatch(taskId, t.id));
    return taskIndex >= 0 ? true : false;
  }

  async getNewId(){
    var doesidExsist = true;
    var newId = "";
    while (doesidExsist){
      newId = generateId();
      doesidExsist =  await this.doesIdExsist(newId)
    }
    return newId;
  }

}

export const toDoService = new ToDoService()