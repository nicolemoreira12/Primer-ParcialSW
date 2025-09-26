import { ValueObject } from '../../shared/types.js';
/**
 * Value Object para Email
 */
export declare class Email extends ValueObject<string> {
    constructor(email: string);
    private static isValid;
    toString(): string;
}
/**
 * Value Object para Nombre de Usuario
 */
export declare class Username extends ValueObject<string> {
    constructor(username: string);
    private static isValid;
    toString(): string;
}
/**
 * Value Object para Contraseña
 */
export declare class Password extends ValueObject<string> {
    constructor(password: string);
    private static isValid;
    verify(password: string): boolean;
}
