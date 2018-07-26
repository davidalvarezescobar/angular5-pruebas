import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Subscription } from 'rxjs/Subscription';
import { publishLast, refCount, share, take, tap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, OnDestroy {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    // const heroesCache = this.heroService.getHeroesCache().pipe(
    //   take(1)
    // );
    // heroesCache.subscribe(
    //   next => {
    //     console.log('getHeroes ok');
    //     this.heroes = next;
    //   },
    //   error => {
    //     console.log('getHeroes ko: ', error);
    //   }
    // );

    this.getData();
  }

  ngOnDestroy() { }

  getData() {
    this.heroService.getHeroesCache().subscribe(h => this.heroes = h);
  }

  add(name) {
    if(name.trim()) {
      // sólo disponemos del name; el id se genera en el servicio in-memory-data.service
      this.heroService.addHero({name} as Hero).subscribe(hero => this.heroes = [...this.heroes, hero])
    }
  }

  delete(hero) {
    // en el servicio hero.service se localizará al correspondiente hero mediante el id
    this.heroService.deleteHero(hero.id).subscribe(
      next => {
        console.log('deleteHero ok');
        this.heroes = this.heroes.filter(h => h !== hero); // filter crea un nuevo array
        this.selectedHero = undefined;
      }
    );
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

}
