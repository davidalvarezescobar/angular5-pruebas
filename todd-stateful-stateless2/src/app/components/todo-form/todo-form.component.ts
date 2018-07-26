import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.less']
})
export class TodoFormComponent implements OnInit {
  @Output() onAdd = new EventEmitter();
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      tarea: ['', Validators.required]
    });
  }

  onSubmit() {
    this.form['formSubmitAttempt'] = true;  // apaño para poder pasar un booleano hasta el componente pizza-name, 
    // en donde se aplica la validación de datos obligatorios
    if(this.form.valid) {
      this.onAdd.emit(this.form.value);
      this.form['formSubmitAttempt'] = false;
      this.form.reset();
    }
  }

}
