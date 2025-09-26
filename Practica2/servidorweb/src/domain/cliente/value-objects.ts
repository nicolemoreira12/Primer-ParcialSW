import { ValueObject } from '../../shared/types.js';

/**
 * Value Object para Número de Documento
 */
export class NumeroDocumento extends ValueObject<string> {
    constructor(numero: string, tipo: TipoDocumento) {
        const numeroLimpio = numero.replace(/\D/g, ''); // Solo números

        if (!NumeroDocumento.isValid(numeroLimpio, tipo)) {
            throw new Error(`Número de documento ${tipo} inválido`);
        }
        super(numeroLimpio);
    }

    private static isValid(numero: string, tipo: TipoDocumento): boolean {
        switch (tipo) {
            case TipoDocumento.CEDULA:
                return numero.length >= 6 && numero.length <= 10;
            case TipoDocumento.PASSPORT:
                return numero.length >= 6 && numero.length <= 15;
            case TipoDocumento.EXTRANJERIA:
                return numero.length >= 6 && numero.length <= 12;
            default:
                return false;
        }
    }

    public toString(): string {
        return this._value;
    }
}

/**
 * Tipos de documento
 */
export enum TipoDocumento {
    CEDULA = 'CEDULA',
    PASSPORT = 'PASSPORT',
    EXTRANJERIA = 'EXTRANJERIA'
}

/**
 * Value Object para Dirección
 */
export class Direccion extends ValueObject<{
    calle: string;
    ciudad: string;
    departamento: string;
    codigoPostal?: string;
}> {
    constructor(calle: string, ciudad: string, departamento: string, codigoPostal?: string) {
        if (!calle.trim() || !ciudad.trim() || !departamento.trim()) {
            throw new Error('Calle, ciudad y departamento son obligatorios');
        }

        super({
            calle: calle.trim(),
            ciudad: ciudad.trim(),
            departamento: departamento.trim(),
            codigoPostal: codigoPostal?.trim()
        });
    }

    public get calle(): string {
        return this._value.calle;
    }

    public get ciudad(): string {
        return this._value.ciudad;
    }

    public get departamento(): string {
        return this._value.departamento;
    }

    public get codigoPostal(): string | undefined {
        return this._value.codigoPostal;
    }

    public toString(): string {
        const codigo = this._value.codigoPostal ? ` (${this._value.codigoPostal})` : '';
        return `${this._value.calle}, ${this._value.ciudad}, ${this._value.departamento}${codigo}`;
    }
}