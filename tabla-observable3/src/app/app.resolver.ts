import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppService } from './app.service';
import { IUser } from '../../../tabla-observable2/src/app/app.service';
import { take } from 'rxjs/operators';

@Injectable()
export class HnResolver implements Resolve<any> {

  constructor(
    private service: AppService
  ) {}

  resolve(): Observable<IUser[]> {
    // En resolve pongo lo que en el proyecto "tabla-observable2", estaba en el ngOnInit del app.component:
    return this.service.getUsers().pipe(
      take(1)
      // Si no pongo take(1) o first(), no funciona el resolve; explicación aquí:
      // https://stackoverflow.com/questions/39066604/angular-2-router-resolve-with-observable
      // https://hackernoon.com/angular-ngrx-resolving-route-data-53f88e0b8a5d
    );
  }
}