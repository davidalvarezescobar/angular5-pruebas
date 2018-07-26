import { Injectable } from '@angular/core';
import { Pizza, Topping } from './pizza.interface';
import { BehaviorSubject } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

interface State {
  pizzas: Pizza[],
  toppings: Topping[]
}

const state: State = {
  pizzas: [
    { name: 'New Yorker', toppings: ['Bacon', 'Pepperoni', 'Ham', 'Mushrooms'] },
    { name: 'Hot & Spicy', toppings: ['Jalapenos', 'Herbs', 'Pepperoni', 'Chicken'] },
    { name: 'Hawaiian', toppings: ['Ham', 'Pineapple', 'Sweetcorn'] }
  ],
  toppings: [
    'Bacon', 'Pepperoni', 'Mushrooms', 'Herbs',
    'Chicken', 'Pineapple', 'Ham', 'Jalapenos'
  ]
};


@Injectable()
export class PizzaService {
  private subject = new BehaviorSubject(state);

  // con un único método 'select' podemos obtener:
  // 1) un observable que retorne 'pizzas'
  // 2) otro observable que retorn 'toppings'
  select<T>(name): Observable<T> {
    return this.subject.asObservable().pipe(
      pluck(name) // pluck: Select properties to emit
    );
  }

  addPizza(pizza) {
    console.log('Valores del SUBJECT', this.subject.value);
    const state = this.subject.value;
    this.subject.next( {...state, pizzas: [...state.pizzas, pizza]} );
  }

  constructor() { }

}
