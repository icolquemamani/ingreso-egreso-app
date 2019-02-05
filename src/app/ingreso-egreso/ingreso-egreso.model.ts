export class IngresoEgreso {
    descripcion: string;
    monto: number;
    tipo: string;
    uid?: string;

    constructor( dataIngresoEgreso: DataIngresoEgreso ) {
        this.descripcion = dataIngresoEgreso ? dataIngresoEgreso.descripcion : null;
        this.monto       = dataIngresoEgreso ? dataIngresoEgreso.monto : null;
        this.tipo        = dataIngresoEgreso ? dataIngresoEgreso.tipo : null;
        // this.uid         = dataIngresoEgreso ? dataIngresoEgreso.uid : null;
    }
}

interface DataIngresoEgreso {
    descripcion: string;
    monto: number;
    tipo: string;
    uid?: string;
}