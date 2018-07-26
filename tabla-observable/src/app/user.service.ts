import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

export interface IUser {
  name: string;
  registration: string;
  email: string;
  isPremium: boolean;
}

const DUMMY_DATA: IUser[] = [
  {
    name: 'John Lilki',
    registration: 'September 14, 2013',
    email: 'jhlilk22@yahoo.com',
    isPremium: true
  },
  {
    name: 'Jamie Harington',
    registration: 'January 11, 2014',
    email: 'jamieharingonton@yahoo.com',
    isPremium: false
  },
  {
    name: 'Jill Lewis',
    registration: 'May 11, 2014',
    email: 'jilsewris22@yahoo.com',
    isPremium: true
  }
];


@Injectable()
export class UserService {
// Si al principio ya disponemos de la info, podemos setearla en un BehaviorSubject, según lo estamos creando:
  // public usersSubject = new BehaviorSubject('la_info_va_aquí');
// Si al principio no tenemos la info, usaremos un Subject y cuando la obtengamos, la setearemos con 'next'
  private usersSubject = new Subject();
  private users: IUser[];

  constructor() {
  }

  getObservable() {
    return this.usersSubject.asObservable();
  }

  getUsers() {
    this.simulateHttp(DUMMY_DATA, 2000).subscribe(data => {
      this.users = data;
      this.refresh();
    });
  }

  refresh() {
    this.usersSubject.next(this.users);
  }

  createUser(user) {
    this.users = [...this.users, user];
    this.refresh();
  }

  aproveAll() {
    // con map recorremos cada uno de los objetos del array
    this.users = this.users.map(user => {
    // return Object.assign({}, user, {isPremium: true} );
      return {...user, isPremium: true}; // me gusta más con el operador spread
    });
    this.refresh();
  }

  simulateHttp<Observable>(val: any, time:number) {
    return of(val).pipe(
		  delay(time)
	  );
  }

}
