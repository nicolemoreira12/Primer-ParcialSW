import { ValueObject } from '../../shared/types.js';
/**
 * Value Object para Email
 */
export class Email extends ValueObject {
    constructor(email) {
        if (!Email.isValid(email)) {
            throw new Error('Email inválido');
        }
        super(email.toLowerCase().trim());
    }
    static isValid(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    toString() {
        return this._value;
    }
}
/**
 * Value Object para Nombre de Usuario
 */
export class Username extends ValueObject {
    constructor(username) {
        if (!Username.isValid(username)) {
            throw new Error('Username debe tener entre 3 y 20 caracteres alfanuméricos');
        }
        super(username.trim());
    }
    static isValid(username) {
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        return usernameRegex.test(username);
    }
    toString() {
        return this._value;
    }
}
/**
 * Value Object para Contraseña
 */
export class Password extends ValueObject {
    constructor(password) {
        if (!Password.isValid(password)) {
            throw new Error('Contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');
        }
        super(password);
    }
    static isValid(password) {
        // Al menos 8 caracteres, una mayúscula, una minúscula y un número
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }
    // No exponer el valor de la contraseña directamente por seguridad
    verify(password) {
        return this._value === password;
    }
}
