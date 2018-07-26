import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styles: []
})
export class TodoComponent implements OnInit {
  @Input() todo;
  @Output() done = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onDone(){
    console.log('todo: ', this.todo);
    this.done.emit({todo: this.todo});
  }

  onDelete(){
    this.delete.emit({todo: this.todo});
  }

}
