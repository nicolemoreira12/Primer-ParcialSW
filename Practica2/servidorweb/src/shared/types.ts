import { v4 as uuidv4 } from 'uuid';

/**
 * Interfaz base para todas las entidades del dominio
 */
export interface IEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Clase base abstracta para Value Objects
 */
export abstract class ValueObject<T> {
    protected readonly _value: T;

    constructor(value: T) {
        this._value = Object.freeze(value);
    }

    public get value(): T {
        return this._value;
    }

    public equals(other: ValueObject<T>): boolean {
        return JSON.stringify(this._value) === JSON.stringify(other._value);
    }
}

/**
 * Generador de IDs únicos
 */
export class IdGenerator {
    static generate(): string {
        return uuidv4();
    }
}

/**
 * Tipos de callback para operaciones asíncronas
 */
export type AsyncCallback<T> = (error: Error | null, result?: T) => void;

/**
 * Resultado de operaciones CRUD
 */
export interface OperationResult<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}