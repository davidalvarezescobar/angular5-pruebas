import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { HttpRequest } from '@angular/common/http';

@Injectable()
export class PreloaderService {
  private subject = new BehaviorSubject<boolean>(true);
  public observable$ = this.subject.asObservable();
  private requests: HttpRequest<any>[] = [];

  constructor() { }

  showLoader(request: HttpRequest<any>) {
    this.requests.push(request);
    this.subject.next(true);
  }

  hideLoader(request: HttpRequest<any>) {
    let index = this.requests.indexOf(request);
    if (index !== -1) {
      this.requests.splice(index, 1);
    }
    this.subject.next(false);
  }
}
