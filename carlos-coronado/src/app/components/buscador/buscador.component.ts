import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, mergeMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { timer } from 'rxjs/observable/timer';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  faIcon = 'search';
  private subject = new Subject();
  // combined;
  @Output() onSearchData = this.subject.pipe( debounceTime(400), distinctUntilChanged() );


  constructor(private appService: AppService) { }

  ngOnInit() {
    // const outer = timer(0, 4000); // por cada uno de los datos del stream outer...
    // const inner = interval(1000); // ... se ejecutará un stream inner
    // this.combined = outer.pipe(
    //   switchMap(x => inner) // switchMap cancelará el stream inner, cuando llegue un nuevo stream outer
    // );
    // this.combined.subscribe(val => console.log(val));

    // const outer = this.subject.asObservable(); // subject recoje el stream con el texto introducido en el inputText del buscador
    // const combined = outer.pipe(
    //   debounceTime(400),
    //   distinctUntilChanged(),
    //   switchMap(txt => this.appService.getListadoEventosByDesc(txt))
    // );
    // combined.subscribe(val => console.log(val));
  }

  buscar(txt) {
    this.subject.next(txt);
  }

}
