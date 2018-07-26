import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  pHolder = 'hola';
  icons = ['lock', 'music'];
  value;

  constructor() { }

  ngOnInit() {
  }

  add(txt) {
    this.pHolder = 'adios'; // cambio los pholder de todos los componentes
    this.icons.push('envelope');
  }

}
