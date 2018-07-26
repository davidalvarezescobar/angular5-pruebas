import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PizzaService } from '../pizza.service';
import { Pizza, Topping } from '../pizza.interface';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-pizza-creator',
  templateUrl: './pizza-creator.component.html',
  styleUrls: ['./pizza-creator.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaCreatorComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;
  toppings$: Observable<Topping[]>;

  constructor(private pizzaService: PizzaService) { }

  ngOnInit() {
    this.pizzas$ = this.pizzaService.select<Pizza[]>('pizzas');
    this.toppings$ = this.pizzaService.select<Topping[]>('toppings');
  }

  addPizza(pizza) {
    this.pizzaService.addPizza(pizza);
  }

}
