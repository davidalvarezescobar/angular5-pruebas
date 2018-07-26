import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppService, Pizza, Topping } from './app.service';
import { Observable } from 'rxjs/Observable';
import { PreloaderService } from './preloader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  pizzas$: Observable<Pizza[]>;
  toppings$: Observable<Topping[]>;
  selectedToppings$: Observable<Topping[]>;
  
  constructor(
    public appSrv: AppService,
    private preloaderSrv: PreloaderService
  ) {}

  ngOnInit() {
    this.pizzas$ = this.appSrv.getPizzas();
    this.toppings$ = this.appSrv.getToppings();
    this.selectedToppings$ = this.appSrv.getSelectedToppings();
    
    this.preloaderSrv.observable$.subscribe(x => console.log(x));
  }
}
