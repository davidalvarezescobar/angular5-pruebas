export interface IContrato {
    numContrato: string;
    entidad?: number;
    sucursal?: number;
    dc?: number;
    numCuenta?: number;
}

export interface ICuentaIBAN {
    numCuentaIBAN: string;
    titularCuenta: string;
    codPais?: string;
    entidad?: number;
    sucursal?: number;
    dc?: number;
    numCuenta?: number;
}

export interface IContratoCuentas {
    contrato: IContrato;
    cuentaIBAN: [ICuentaIBAN];
}

export interface IDetallePagoInfo {
  cuenta?: string;
  titular?: string;
  emisor: string;
  emailEmisor: string;
  importe: string;
  moneda: string;
  numeroFactura: string;
  fechaFactura: string;
}

export interface IOption {
    label: string;
    value: string;
}

export interface IResultadoFirma {
  headerTitle: string;
  resultadoFirma: string;
}
