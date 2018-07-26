import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ICuentaIBAN } from '../interfaces';
import { Observable } from 'rxjs/Observable';
import { PagesService } from '../pages.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InternalRoutes } from '../../services/constants';

@Component({
  selector: 'pst-buscador-cuentas',
  templateUrl: './buscador-cuentas.component.html',
  styleUrls: ['./buscador-cuentas.component.less']
})
export class BuscadorCuentasComponent implements OnInit {
  subtitle = 'Rellena el siguiente formulario para obtener cuentas adicionales';
  cuentas$: Observable<ICuentaIBAN[]>;
  selectedCuenta;
  form: FormGroup = this.fb.group({});

  constructor(
    private location: Location,
    private pagesService: PagesService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
  }

  cancelar() {
    this.location.back();
  }

  continuar() {
    this.pagesService.setSelectedCuentaAdicional(this.selectedCuenta);
    this.router.navigateByUrl(InternalRoutes.seleccionCuentaCargo);
  }

  aplicarFiltros() {
    this.cuentas$ = this.pagesService.getCuentasAdicionales();
  }

}
