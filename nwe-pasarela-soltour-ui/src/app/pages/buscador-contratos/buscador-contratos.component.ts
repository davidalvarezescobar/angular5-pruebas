import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PagesService } from '../pages.service';
import { IContratoCuentas } from '../interfaces';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { InternalRoutes } from '../../services/constants';

@Component({
  selector: 'pst-buscador-contratos',
  templateUrl: './buscador-contratos.component.html',
  styleUrls: ['./buscador-contratos.component.less']
})
export class BuscadorContratosComponent implements OnInit {
  subtitle = 'Selecciona uno de los siguientes contratos:';
  contratos$: Observable<IContratoCuentas[]>;
  selectedContrato: IContratoCuentas;

  constructor(
    private location: Location,
    private pagesService: PagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.contratos$ = this.pagesService.getContratos();
  }

  cancelar() {
    this.location.back();
  }

  continuar() {
    this.pagesService.setSelectedContrato(this.selectedContrato);
    this.router.navigateByUrl(InternalRoutes.seleccionCuentaCargo);
  }

}
