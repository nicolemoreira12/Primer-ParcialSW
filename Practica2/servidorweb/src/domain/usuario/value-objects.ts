import { ValueObject } from '../../shared/types.js';

/**
 * Value Object para Email
 */
export class Email extends ValueObject<string> {
    constructor(email: string) {
        if (!Email.isValid(email)) {
            throw new Error('Email inválido');
        }
        super(email.toLowerCase().trim());
    }

    private static isValid(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    public toString(): string {
        return this._value;
    }
}

/**
 * Value Object para Nombre de Usuario
 */
export class Username extends ValueObject<string> {
    constructor(username: string) {
        if (!Username.isValid(username)) {
            throw new Error('Username debe tener entre 3 y 20 caracteres alfanuméricos');
        }
        super(username.trim());
    }

    private static isValid(username: string): boolean {
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        return usernameRegex.test(username);
    }

    public toString(): string {
        return this._value;
    }
}

/**
 * Value Object para Contraseña
 */
export class Password extends ValueObject<string> {
    constructor(password: string) {
        if (!Password.isValid(password)) {
            throw new Error('Contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');
        }
        super(password);
    }

    private static isValid(password: string): boolean {
        // Al menos 8 caracteres, una mayúscula, una minúscula y un número
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    // No exponer el valor de la contraseña directamente por seguridad
    public verify(password: string): boolean {
        return this._value === password;
    }
}