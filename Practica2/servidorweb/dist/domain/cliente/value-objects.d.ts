import { ValueObject } from '../../shared/types.js';
/**
 * Value Object para Número de Documento
 */
export declare class NumeroDocumento extends ValueObject<string> {
    constructor(numero: string, tipo: TipoDocumento);
    private static isValid;
    toString(): string;
}
/**
 * Tipos de documento
 */
export declare enum TipoDocumento {
    CEDULA = "CEDULA",
    PASSPORT = "PASSPORT",
    EXTRANJERIA = "EXTRANJERIA"
}
/**
 * Value Object para Dirección
 */
export declare class Direccion extends ValueObject<{
    calle: string;
    ciudad: string;
    departamento: string;
    codigoPostal?: string;
}> {
    constructor(calle: string, ciudad: string, departamento: string, codigoPostal?: string);
    get calle(): string;
    get ciudad(): string;
    get departamento(): string;
    get codigoPostal(): string | undefined;
    toString(): string;
}
