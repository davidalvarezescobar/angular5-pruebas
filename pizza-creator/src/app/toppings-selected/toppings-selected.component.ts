import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Topping } from '../pizza.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-toppings-selected',
  templateUrl: './toppings-selected.component.html',
  styleUrls: ['./toppings-selected.component.less']
})
export class ToppingsSelectedComponent implements OnInit {
  @Input() selected: Topping[];
  @Input() parent: FormGroup;
  @Output() remove = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
