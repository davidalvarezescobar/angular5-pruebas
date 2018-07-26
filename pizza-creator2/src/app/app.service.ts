import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs';
import { timer } from 'rxjs/observable/timer';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export type Topping = string; // S?LO ES UN DATO, POR ESO EST? COMO type EN LUGAR DE interface
export interface Pizza {
  name: string,
  toppings: string[]
}


const endPoint = {
  pizzas: '../assets/mock/pizzas.json',
  toppings: '../assets/mock/toppings.json'
};


@Injectable()
export class AppService {
  private pizzas: Pizza[] = [];
  private selectedToppings: Topping[] = [];
  private updatedPizzas = new Subject<Pizza[]>();
  private updatedSelectedToppings = new BehaviorSubject<Topping[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  getPizzas(): Observable<Pizza[]> {
    this.simulateHttpGet<Pizza[]>(endPoint.pizzas).subscribe(pizzas => {
      this.pizzas = pizzas;
      this.refreshPizzas();
    });
    return this.updatedPizzas.asObservable();
  }
  
  refreshPizzas() {
    this.updatedPizzas.next(this.pizzas);
  }
  
  getToppings(): Observable<Topping[]> {
    return this.simulateHttpGet<Topping[]>(endPoint.toppings);
  }
  
  updateToppings(topping) {
    const index = this.selectedToppings.indexOf(topping);
    if (!!~index) { // si es true, o sea, si existe: lo quitamos
      this.selectedToppings.splice(index, 1);
      // this._selectedToppings = this._selectedToppings.filter(t => t !== topping);

    } else { // si es false, o sea, si no existe: lo añadimos
      this.selectedToppings.push(topping);
      // this._selectedToppings = [...this._selectedToppings, topping];
    }
    this.refreshSelectedToppings();
  }

  getSelectedToppings(): Observable<Topping[]> {
    return this.updatedSelectedToppings.asObservable();
  }

  refreshSelectedToppings() {
    this.updatedSelectedToppings.next(this.selectedToppings);
  }


  simulateHttpGet<T>(endPoint):Observable<T> {
    const delayed$ = timer(Math.random()*4000).pipe(
      switchMap(x => {
        return this.http.get<T>(endPoint);
      })
    );
    return delayed$;
  }

}
