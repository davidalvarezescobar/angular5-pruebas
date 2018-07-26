import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.less']
})
export class TodosComponent implements OnInit {
  todos = [];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(t => this.todos=t);
  }

  addTodo(todo) {
    this.todoService.addTodo(todo);
  }

  deleteTodo(id) {
    this.todoService.deleteTodo(id);
  }

  completeTodo(id) {
    this.todoService.completeTodo(id);
  }

}
