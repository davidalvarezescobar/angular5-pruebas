import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'pst-operaciones-pendiente-firma',
  templateUrl: './operaciones-pendiente-firma.component.html',
  styleUrls: ['./operaciones-pendiente-firma.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class OperacionesPendienteFirmaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToPasarela() {
    this.router.navigateByUrl('ordenes-pendientes-firma');
  }

}
