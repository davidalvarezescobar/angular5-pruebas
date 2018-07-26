import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IUser } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() users;
  @Output() onCreateUser = new EventEmitter();
  @Output() onApproveAll = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  createUser() {
    let user: IUser = {
      name: 'prueba',
      email: 'prueba@prueba.es',
      registration: 'hoy',
      isPremium: false
    };
    this.onCreateUser.emit(user);
  }

  approveAll() {
    this.onApproveAll.emit();
  }
}
