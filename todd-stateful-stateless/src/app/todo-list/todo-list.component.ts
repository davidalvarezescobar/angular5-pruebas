import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styles: []
})
export class TodoListComponent implements OnInit {
  @Input() todos;
  @Output() done = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onDone(e){
    this.done.emit(e);
  }

  onDelete(e){
    this.delete.emit(e);
  }
}
