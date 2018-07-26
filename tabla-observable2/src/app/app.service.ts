import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


export interface IUser {
  name: string;
  registration: string;
  email: string;
  isPremium: boolean;
}


@Injectable()
export class AppService {
  private users: IUser[];
  private subject = new Subject<IUser[]>();

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<IUser[]> {
    this.simulateHttpGet<IUser[]>('../assets/mock/users.json').subscribe(users => {
      this.users=users;
      this.refresh();
    });
    return this.subject.asObservable();
  }

  refresh() {
    this.subject.next(this.users);
  }

  updatePremium(user: IUser) {
    this.users.find(u => u.name===user.name).isPremium = !user.isPremium;
    this.refresh();
  }

  addUser(user: IUser) {
    this.users.push(user);
    this.refresh();
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
