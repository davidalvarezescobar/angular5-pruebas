import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';
import { IContratoCuentas, ICuentaIBAN, IDetallePagoInfo } from '../interfaces';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { InternalRoutes } from '../../services/constants';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'pst-seleccion-cuenta-cargo',
  templateUrl: './seleccion-cuenta-cargo.component.html',
  styleUrls: ['./seleccion-cuenta-cargo.component.less']
})
export class SeleccionCuentaCargoComponent implements OnInit {
  subtitle = 'Vas a emitir un pago con los siguientes datos';
  datosPago$: Observable<IDetallePagoInfo>;
  cuentasAsociadas;
  selectedCuenta;

  constructor(
    private pagesService: PagesService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.cuentasAsociadas = this.convertToDropdownOptions( this.pagesService.getSelectedContrato() ); // datos del combo cuentas
    if (this.cuentasAsociadas) {
      this.datosPago$ = this.pagesService.getDatosPago(); // datos de la página
      this.selectedCuenta = this.pagesService.getSelectedCuenta(); // cuenta seleccionada en el combo
    }
  }

  cancelar() {
    this.pagesService.setSelectedCuenta(null);
    this.router.navigateByUrl(InternalRoutes.buscadorContratos);
  }

  continuar() {
    this.pagesService.setDetallePago(this.selectedCuenta);
    this.router.navigateByUrl(InternalRoutes.detalleRecibo);
  }

  buscarCuentas() {
    if (this.selectedCuenta) {
      this.pagesService.setSelectedCuenta(this.selectedCuenta);
    }
    this.router.navigateByUrl(InternalRoutes.buscadorCuentas);
  }

  convertToDropdownOptions(contrato) {
    if (contrato) {
      const cuentaIban = contrato.cuentaIBAN;
      return cuentaIban.map(cuenta => {
        return {label: cuenta.numCuentaIBAN, value: cuenta.titularCuenta};
      });
    } else {
      this.router.navigateByUrl(InternalRoutes.buscadorContratos);
    }
  }

}
