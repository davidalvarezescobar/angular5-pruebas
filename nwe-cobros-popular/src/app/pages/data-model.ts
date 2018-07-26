export interface IDeudor {
    fechaEmision?: string;
    eBank?: string;
    estado?: string;
    nombre: string;
    referencia: string;
    concepto: string;
    entidad: string;
    sucursal: string;
    digito: string;
    cuenta: string;
    contrato_iban: string;
    codigoDevolucion: string;
    importe: number;
    moneda: string;
}

export interface IRecibo {
    tipFechaEmision?: string;
    fechaOperacion?: string;
    contrato: string;
    cuentaVinculada: string;
    concepto: string;
    referencia: string;
    fechaEmision: string;
    periodica: IPeriodica;
    deudores: IDeudor[];
    importeTotal: number;
    moneda: string;
}

export interface IPeriodica {
    periodicidad: string;
    fechaDesde: string;
    duracion: string;
    fechaHasta: string;
}
