import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Topping } from '../../app.service';

@Component({
  selector: 'app-pizza-form',
  templateUrl: './pizza-form.component.html',
  styleUrls: ['./pizza-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaFormComponent implements OnInit {
  @Input() toppings: Topping[];
  @Input() selectedToppings: Topping[] = [];
  @Output() onUpdateToppings = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  isActive(topping) {
    return !!~this.selectedToppings.indexOf(topping);
  }
}
