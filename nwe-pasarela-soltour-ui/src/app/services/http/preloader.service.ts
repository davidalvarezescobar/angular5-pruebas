import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PreloaderService {
  private subject = new BehaviorSubject<boolean>(false);
  public observable$ = this.subject.asObservable();
  private numRequest = 0;

  constructor() { }

  showLoader() {
    if (!this.numRequest) {
      this.subject.next(true);
    }
    this.numRequest++;
  }

  hideLoader() {
    this.numRequest--;
    if (!this.numRequest) {
      this.subject.next(false);
    }
  }
}
