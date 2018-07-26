import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'todo-form',
  templateUrl: './todo-form.component.html'
})
export class TodoFormComponent{
  @Output() onAdd = new EventEmitter();
  label = "hola";

  submit(){
    console.log('todo-form: ',this.label);
    this.onAdd.emit({label: this.label});
    this.label = '';
  }
}
