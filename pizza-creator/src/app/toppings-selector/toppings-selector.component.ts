import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Topping } from '../pizza.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-toppings-selector',
  templateUrl: './toppings-selector.component.html',
  styleUrls: ['./toppings-selector.component.less']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToppingsSelectorComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() toppings: Topping[];
  @Input() selected: Topping[];
  @Output() select = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelect(topping) {
    this.select.emit(topping);
  }

  isActive(topping) {
    return !!~this.selected.indexOf(topping);
  }
}
