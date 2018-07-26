import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { publishLast, refCount, share, take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    // const heroesCache = this.heroService.getHeroesCache().pipe(
    //   take(1)
    // );
    // heroesCache.subscribe(this.setHeroes());
    // // podemos ejecutar la función this.setHeroes() porque lo que retorna ésta función es
    // // la función que se utilizaría como callback del 'suscribe'

    this.getData();
  }

  ngOnDestroy() { }

  getData() {
    this.heroService.getHeroesCache().subscribe(h => this.heroes = h);
  }

  private setHeroes() {
    return (heroes) => {
      console.log('getHeroes ok');
      this.heroes = heroes;
    }
  }

  trackByFn(index, item) {
    return index; // or item.id
  }
  
}
