import { Component } from '@angular/core';
import { AppService, IUser } from './app.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users$: Observable<IUser[]>;
  showModal = false;
  
  constructor(
    private service: AppService
  ) {}

  ngOnInit() {
    this.users$ = this.service.getUsers();
  }

  updateUser(user) {
    this.service.updatePremium(user);
  }

  addUser(user) {
    this.service.addUser(user);
  }

  aproveAll() {

  }
}
