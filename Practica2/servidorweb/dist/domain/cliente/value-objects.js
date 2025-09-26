import { ValueObject } from '../../shared/types.js';
/**
 * Value Object para Número de Documento
 */
export class NumeroDocumento extends ValueObject {
    constructor(numero, tipo) {
        const numeroLimpio = numero.replace(/\D/g, ''); // Solo números
        if (!NumeroDocumento.isValid(numeroLimpio, tipo)) {
            throw new Error(`Número de documento ${tipo} inválido`);
        }
        super(numeroLimpio);
    }
    static isValid(numero, tipo) {
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
    toString() {
        return this._value;
    }
}
/**
 * Tipos de documento
 */
export var TipoDocumento;
(function (TipoDocumento) {
    TipoDocumento["CEDULA"] = "CEDULA";
    TipoDocumento["PASSPORT"] = "PASSPORT";
    TipoDocumento["EXTRANJERIA"] = "EXTRANJERIA";
})(TipoDocumento || (TipoDocumento = {}));
/**
 * Value Object para Dirección
 */
export class Direccion extends ValueObject {
    constructor(calle, ciudad, departamento, codigoPostal) {
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
    get calle() {
        return this._value.calle;
    }
    get ciudad() {
        return this._value.ciudad;
    }
    get departamento() {
        return this._value.departamento;
    }
    get codigoPostal() {
        return this._value.codigoPostal;
    }
    toString() {
        const codigo = this._value.codigoPostal ? ` (${this._value.codigoPostal})` : '';
        return `${this._value.calle}, ${this._value.ciudad}, ${this._value.departamento}${codigo}`;
    }
}
