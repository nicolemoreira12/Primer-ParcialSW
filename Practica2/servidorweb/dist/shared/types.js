import { v4 as uuidv4 } from 'uuid';
/**
 * Clase base abstracta para Value Objects
 */
export class ValueObject {
    _value;
    constructor(value) {
        this._value = Object.freeze(value);
    }
    get value() {
        return this._value;
    }
    equals(other) {
        return JSON.stringify(this._value) === JSON.stringify(other._value);
    }
}
/**
 * Generador de IDs únicos
 */
export class IdGenerator {
    static generate() {
        return uuidv4();
    }
}
