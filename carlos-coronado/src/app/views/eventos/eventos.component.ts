import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { switchMap, distinctUntilChanged, debounceTime, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  eventos$;
  columna;
  ordenAsc;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.eventos$ = this.appService.getListadoEventos();
  }

  sort(columna) {
    this.ordenAsc = !this.ordenAsc;
    this.columna = columna;
  }

  searchData(term){
    this.eventos$ = this.appService.getListadoEventosByDesc(term);
  }
}
