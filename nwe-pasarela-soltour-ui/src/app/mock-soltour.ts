import { IContratoCuentas, IDetallePagoInfo, ICuentaIBAN } from './pages/interfaces';


export const CONTRATOS: [IContratoCuentas] = [
    {
        contrato: {numContrato: '00490004111234567890'},
        cuentaIBAN: [
            {numCuentaIBAN: 'ES2900490004110000000001', titularCuenta: 'Paco Porras Izquierdo'},
            {numCuentaIBAN: 'ES2900490004110000000002', titularCuenta: 'Andres Arconada Quijano'}
        ]
    },
    {
        contrato: {numContrato: '00490004122234567890'},
        cuentaIBAN: [
            {numCuentaIBAN: 'ES2900490004220000000001', titularCuenta: 'Paco Porras Izquierdo'},
            {numCuentaIBAN: 'ES2900490004220000000002', titularCuenta: 'Andres Arconada Quijano'}
        ]
    },
    {
        contrato: {numContrato: '00490004331234567890'},
        cuentaIBAN: [
            {numCuentaIBAN: 'ES2900490004330000000001', titularCuenta: 'Paco Porras Izquierdo'},
            {numCuentaIBAN: 'ES2900490004330000000002', titularCuenta: 'Andres Arconada Quijano'}
        ]
    }
];

export const PAGO: IDetallePagoInfo = {
  emisor: 'Soltour',
  emailEmisor: 'soltour@gmail.com',
  importe: '12.345,00',
  moneda: 'EUR',
  numeroFactura: '111222',
  fechaFactura: '12/12/2018'
};

export const CUENTAS_ADICIONALES: [ICuentaIBAN] = [
    {numCuentaIBAN: 'ES2900490004440000000011', titularCuenta: 'Francisco Gomez Lopez'},
    {numCuentaIBAN: 'ES2900490004440000000022', titularCuenta: 'Antonio Ruiperez Falconeti'}
];
