import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'pst-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() subtitle: string;

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  volver() {
    this.location.back();
  }
}
