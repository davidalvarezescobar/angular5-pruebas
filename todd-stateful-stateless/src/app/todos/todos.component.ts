import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styles: []
})
export class TodosComponent implements OnInit {
  todos = [];
  // todos

  ngOnInit() {
    // this.todos = [];
  }

  addTodo({label}){
    this.todos = [...this.todos, {label, id: this.todos.length+1}];
    console.log(this.todos);
  }

  onDone({todo}){
    this.todos = this.todos.map(
      item => item.id===todo.id ? Object.assign({}, item, {complete:true}) : item
    );
    console.log(this.todos);
  }

  onDelete({todo}){
    this.todos = this.todos.filter(({id}) => id !== todo.id);
  }
}
