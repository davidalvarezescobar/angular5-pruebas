import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../../app.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() users: IUser[];

  constructor() { }

  ngOnInit() {
  }

}
