import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable()
export class PreloaderService {
  private subject = new BehaviorSubject(false);
  public observable$ = this.subject.asObservable();

  constructor() { }

  showLoader() {
    this.subject.next(true);
  }

  hideLoader() {
    this.subject.next(false);
  }
}
