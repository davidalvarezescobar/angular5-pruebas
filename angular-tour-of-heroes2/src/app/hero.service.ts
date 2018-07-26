import { Injectable, enableProdMode } from '@angular/core';
import { Hero } from './hero';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap, take, takeUntil, merge, skip, distinctUntilChanged, filter, share, publishReplay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { shareReplay, switchMap, mergeMap } from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';
import { interval } from 'rxjs/observable/interval';
import { Subject } from 'rxjs/Subject';
import { mapTo } from 'rxjs/operators/mapTo';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable()
export class HeroService {
  // como utilizamos InMemoryDataService, la url siempre se forma con "url + / + nombre_mock"
  private heroesUrl = 'api/heroes'; // 'heroes' es el nombre del mock que devuelve el servicio 'in-memory-data.service'

  private heroesCache$: Observable<Hero[]>;
  public onDestroy$ = new Subject();

  public update$ = new Subject<void>();
  public showNotifications$: Observable<boolean>

  private numHeroes = 0;

  
  constructor(
    private http: HttpClient
  ) { }

  forceReload() {
    // al utilizar 'shareReplay', no funciona hacer sólo un 'unsubscribe' del observable y,
    // hay que hacer este apaño para detenerlo
    console.log(this.onDestroy$.observers);
    this.onDestroy$.next();
    // Setting the cache to null will create a new cache the next time 'getHeroesCache()' is called
    this.heroesCache$ = null;
    console.log(this.onDestroy$.observers);
  }

  getHeroesCache() {
    if(!this.heroesCache$) {
      // // // inicio un proceso para introducir automaticamente heroes cada x segundos:
      timer(0, 25000).pipe(
        switchMap(x => this.addHero({name:'Automatic'+x} as Hero) )
      ).subscribe();
      // // //

      // (Parece que shareReplay siempre debe ir en último lugar, en el último observable)

      // // CACHÉ CON REFRESCO AUTOMÁTICO:
      // const timer$ = timer(0, 9000); // timer$ hace las veces de 'frecuencia portadora'  
      // this.heroesCache$ = timer$.pipe(
      //   takeUntil(this.onDestroy$),
      //   // Cada 9 segundos se ejecuta el contenido del pipe
      //   tap(x => console.log(x)), // x --> [0, 1, 2, 3, 4...]
      //   // con shareReplay mantendremos una caché con un único timer
      //   // sin shareReplay, por cada nueva suscripción se crearía un nuevo timer, y nos juntaríamos con varios timers en paralelo
      //   // shareReplay(1),
      //   switchMap(value => { // map a observables => usar “switchMap”;  map a objectos, arrays, etc => usar “map”
      //     return this.getHeroes();
      //   }),
      //   shareReplay(1)
      // );      

      // // CACHÉ SIN REFRESCO:
      // this.heroesCache$ = this.getHeroes().pipe(
      //   tap(x => console.log(x)),
      //   // nuevos suscriptores no obtendrán los datos de nuevas llamadas http, si no del último resultado cacheado
      //   shareReplay(1)
      // );

      // // CACHÉ CON REFRESCO MEDIANTE TIMER:
      // const refresco$ = timer(0, 10000); // outer
      // const heroes$ = this.getHeroes().pipe( // inner
      //   tap(inner => console.log('INNER:', inner))
      // );
      // const combined$ = refresco$.pipe( // combined
      //   tap(outer => console.log('OUTER:', outer)),
      //   switchMap(outer => heroes$),
      //   shareReplay(1) // el resultado es cacheado, hasta que se actualice el stream outer
      // );
      // this.heroesCache$ = combined$;

      // // CACHÉ CON REFRESCO MANUAL:
      // const refresco$ = this.update$; // outer
      // const heroes$ = this.getHeroes().pipe( // inner
      //   tap(inner => console.log('INNER:', inner))
      // );
      // const combined$ = refresco$.pipe( // combined
      //   tap(outer => console.log('OUTER:', outer)),
      //   switchMap(outer => heroes$)
      // );
      // this.heroesCache$ = heroes$.pipe(
      //   merge(combined$),
      //   shareReplay(1) // el resultado es cacheado, hasta que se actualice el stream outer
      // );

      // CACHÉ COMPLETO
      const heroesAuto$ = this.getHeroesAuto(); // realizamos una http request cada x segundos
      const heroesAutoShared$ = heroesAuto$.pipe(shareReplay(1));

      const clicks$ = this.update$; // OUTER (clicks)
      const takeOne$ = this.getHeroesTakeOne(heroesAutoShared$); // INNER (nos quedamos con una sola http response)
      const manualUpdate$ = clicks$.pipe( // combined
        mergeMap(x => takeOne$) // obtendremos los heroes mediante sucesivos clicks en el botón UPDATE
      );

      // El observable al que nos suscribiremos consta de un merge entre 2 observables:
      // 1- takeOne$, observable que muestra un único resultado y se autocancela
      // 2- manualUpdate$, observable que muestra las sucesivas actualizaciones
      this.heroesCache$ = takeOne$.pipe( // combined
        merge(manualUpdate$),
        tap(h => this.numHeroes=h.length ),
        shareReplay(1) // el resultado final es el que cacheamos
      );

      // Control de notificaciones
      const notifications$ = this.getHeroesTakeRest(heroesAutoShared$); // omitimos la primera http response y nos quedamos con las demás
      const show$ = notifications$.pipe( mapTo(true) ); // TRUE: por cada http response
      const hide$ = this.update$.pipe( mapTo(false) ); // FALSE: por cada click en el botón update
      // como mergeamos los observables show$ y hide$, el observable resultante showNotifications$ se verá actualizado:
      // 1- cada vez que nos llegue una http response
      // 2- cada vez que hagamos click en el botón update
      this.showNotifications$ = show$.pipe( 
        merge(hide$),
        tap(x => console.log(x))
      );
    }

    return this.heroesCache$;
  }

  getHeroesTakeOne(auto) {
    const outer$ = auto;
    const getOne$ = outer$.pipe(
      tap(x => console.log('TAKEONE: ---|')),
      take(1), // take obtiene el primer resultado del observable principal y, cancela la suscripción
      tap(x => console.log('TAKEONE:    |--->'))
    );
    return getOne$;
  }

  getHeroesTakeRest(auto) {
    const outer$ = auto;
    const getRest$ = outer$.pipe( // skip omite el primer resultado del observable principal
      tap(x => console.log('TAKEREST: ---|') ),
      skip(1),
      tap(x => console.log('TAKEREST:    |--->') ),
      filter(h => h.length > this.numHeroes)
    );
    return getRest$;
  }

  getHeroesAuto() {
    const outer$ = timer(0, 10000); // OUTER
    const inner$ = this.getHeroes(); // INNER
    const combined$ = outer$.pipe( // combined
      switchMap(outer => inner$) // Éste sería el observable principal: cada 10 segundos realizamos una petición para obtener los heroes
    );
    return combined$;
  }

  getHeroes():Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(inner => console.log('HEROES:', inner)),
        catchError( this.handleError<Hero[]>('getHeroes', []) )
      );
  }

  getHero(id:number): Observable<Hero> { // buscamos por id
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        catchError( this.handleError<Hero>(`getHero id=${id}`) )
      );
  }
  
  addHero(hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        catchError( this.handleError<Hero>(`addHero id=${hero.name}`, hero) )
      );
  }

  deleteHero(id) {
    return this.http.delete(`${this.heroesUrl}/${id}`, httpOptions)
      .pipe(
        catchError( this.handleError(`deleteHero id=${id}`) )
      );
  }

  updateHero(hero){
    return this.http.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        catchError( this.handleError<Hero>(`updateHero id=${hero.id}`, hero) )
      );
  }


  searchHeroes(name): Observable<Hero[]> {
    if(!name.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${name}`)
      .pipe( // buscamos por name
        catchError( this.handleError<Hero[]>(`searchHeroes name=${name}`) )
      );
  }
  
  
  handleError<T>(msj, retorno?: T) {
    console.log(msj);
    return function(err, caught){ // ésta es la 'function selector' (ver más abajo)
      console.log(`ERROR en ${msj}`, caught);
      let newHero = retorno['id'] = 1;
      return of(retorno); // este return, será interpretado con un OK por el ".subscribe()"
  // return new ErrorObservable('algo ha salido mal'); // este return, será interpretado como un KO por el ".subscribe()"
    }
  }
}


// catchError =>
// @param {function} selector, a function that takes as arguments `err`, which is the error, and `caught`, which
//   is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
//   is returned by the `selector` will be used to continue the observable chain.
// @return {Observable} An observable that originates from either the source or the observable returned by the
//   catch `selector` function.