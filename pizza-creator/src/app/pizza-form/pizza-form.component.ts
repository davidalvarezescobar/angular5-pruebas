import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Topping } from '../pizza.interface';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pizza-form',
  templateUrl: './pizza-form.component.html',
  styleUrls: ['./pizza-form.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaFormComponent implements OnInit {
  @Input() toppings: Topping[];
  @Output() add = new EventEmitter();
  form: FormGroup;
  private _selectedToppings: FormArray;

  constructor(
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this._fb.group({
      name: ['', Validators.required],
      toppings: this._fb.array([], Validators.required)
    });
    this._selectedToppings = this.form.get('toppings') as FormArray;
  }

  selectTopping(topping) {
    let index = this._selectedToppings.value.indexOf(topping); // dentro de un objeto 'formArray', los datos van en la propiedad 'value'
    // let index = this._selectedToppings.indexOf(topping);

    if (!!~index) { // si es true, o sea, si existe: lo quitamos
      this._selectedToppings.removeAt(index);
      // this._selectedToppings = this._selectedToppings.filter(t => t !== topping);

    } else { // si es false, o sea, si no existe: lo añadimos
      this._selectedToppings.push(new FormControl(topping));
      // this._selectedToppings = [...this._selectedToppings, topping];
    }
  }

  get selectedToppings() {
    return this._selectedToppings.value;
  }

  removeTopping(index) {
    this._selectedToppings.removeAt(index);
  }

  onSubmit() {
    console.log('gggg',this.form);
    this.form['formSubmitAttempt'] = true;  // apaño para poder pasar un booleano hasta el componente pizza-name, 
                                            // en donde se aplica la validación de datos obligatorios
    console.log(`FORMULARIO CORRECTO: ${this.form.valid}, DATOS: `, this.form.value);

    if(this.form.valid) {
      this.add.emit(this.form.value);
      this.form['formSubmitAttempt'] = false;
      // Borramos el todo el contenido del formArray.
      // Con 'this.form.reset()' vaciaríamos cada uno de los formControl que hubiera en el array,
      // pero éste seguiría teniendo el mismo número de elementos.
      const tamToppingsArray = this._selectedToppings.length;
      for(let index=tamToppingsArray-1; index >= 0; index-- ) {
        this._selectedToppings.removeAt(index);
      }
      // borramos el contenido del formControl 'name'
      this.form.reset();
    }
  }
}
