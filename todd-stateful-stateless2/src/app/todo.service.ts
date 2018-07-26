import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Todo {
  id:number,
  tarea:string,
  completed:boolean
}

let todos:Todo[] = [];

@Injectable()
export class TodoService {
  private subject = new BehaviorSubject(todos);

  constructor() { }

  getTodos() {
    return this.subject.asObservable();
  }

  addTodo(todo) { // en un array de objetos, añadimos uno nuevo
    const id = new Date().getTime().toString();
    const t:Todo = {...todo, id, completed:false};
    todos = [...todos, t];
    this.subject.next(todos);
  }

  deleteTodo(id) { // en un array de objetos, excluimos uno de ellos
    todos = todos.filter(t => t.id !== id);
    this.subject.next(todos);
  }

  completeTodo(id) { // en un array de objetos, cambiamos la propiedad de un objeto
    todos = todos.map(t => t.id === id ? {...t, completed:true} : t);
    this.subject.next(todos);
  }

}
