import { Injectable } from '@angular/core';
import { CONTRATOS, PAGO, CUENTAS_ADICIONALES } from '../mock-soltour';
import { of } from 'rxjs/observable/of';
import { IContratoCuentas, IDetallePagoInfo, ICuentaIBAN, IOption, IResultadoFirma, ITipOperacion } from './interfaces';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/operators';

@Injectable()
export class PagesService {
  contratos: IContratoCuentas[];
  datosPago: IDetallePagoInfo;
  detallePago: IDetallePagoInfo;
  selectedContrato: IContratoCuentas;
  selectedCuenta: IOption;
  resultadoFirma: IResultadoFirma;
  selectedOperacion: string;
  showFirmar: false;

  constructor() { }

  // CONTRATO, CON SUS CUENTAS DE CARGO ASOCIADAS
  getSelectedContrato(): IContratoCuentas {
    return this.selectedContrato;
  }
  setSelectedContrato(contrato: IContratoCuentas) {
    this.selectedContrato = contrato;
  }
  getContratos(): Observable<IContratoCuentas[]> {
    if (!this.contratos) {
      this.contratos = CONTRATOS;
      return of(CONTRATOS).pipe(
        delay(1000)
      );
    }
    return of(CONTRATOS);
  }


  // CUENTA DE CARGO SELECCIONADA
  getSelectedCuenta() {
    return this.selectedCuenta;
  }
  setSelectedCuenta(cuenta: IOption) {
    this.selectedCuenta = cuenta;
  }


  // DATOS DE UN PAGO, SIN LA CUENTA DE CARGO
  getDatosPago(): Observable<IDetallePagoInfo> {
    if (!this.datosPago) {
      this.datosPago = PAGO;
      return of(PAGO).pipe(
        delay(1000)
      );
    }
    return of(this.datosPago);
  }


  // DATOS DE UNA PAGO, CON LA CUENTA DE CARGO Y SU TITULAR
  getDetallePago(): IDetallePagoInfo {
    return this.detallePago;
  }
  setDetallePago(cuenta) {
    this.setSelectedCuenta(cuenta);
    this.detallePago = Object.assign({}, this.datosPago, {cuenta: cuenta.label, titular: cuenta.value});
  }

  getResultadoFirma(): IResultadoFirma {
    return this.resultadoFirma;
  }
  setResultadoFirma(dataResultado) {
    this.resultadoFirma = dataResultado;
  }


  // CUENTAS DE CARGO ADICIONALES ASOCIADAS A UN CONTRATO
  getCuentasAdicionales(): Observable<ICuentaIBAN[]> {
    return of(CUENTAS_ADICIONALES).pipe(
      delay(1000)
    );
  }
  setSelectedCuentaAdicional(cuenta: ICuentaIBAN) {
    const arrayCuentas = this.selectedContrato.cuentaIBAN;
    // tslint:disable-next-line:no-bitwise
    if ( !~arrayCuentas.indexOf(cuenta) ) {
      arrayCuentas.push(cuenta);
    }
    this.selectedCuenta = {label: cuenta.numCuentaIBAN, value: cuenta.titularCuenta};
  }


  // SELECCIONAR EL TIPO DE OPERACIÓN (DETALLE, FIRMA, ANULACIÓN)
  setOperacion(operacion) {
    this.selectedOperacion = operacion;
  }
  getOperacion() {
    return this.selectedOperacion;
  }



  setFirmarDetalle(show) {
    this.showFirmar = show;
  }
  getFirmarDetalle() {
    return this.showFirmar;
  }

}
