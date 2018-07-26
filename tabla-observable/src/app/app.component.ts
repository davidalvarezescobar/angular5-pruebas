import { Component, ChangeDetectionStrategy, Pipe } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  users$: Observable<any>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users$ = this.userService.getObservable(); // nos suscribimos
    this.userService.getUsers(); // obtenemos la info
  }

  createUser(user) {
    this.userService.createUser(user);
  }

  approveAll() {
    this.userService.aproveAll();
  }
}
