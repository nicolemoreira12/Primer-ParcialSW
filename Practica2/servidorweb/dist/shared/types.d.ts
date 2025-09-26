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
export declare abstract class ValueObject<T> {
    protected readonly _value: T;
    constructor(value: T);
    get value(): T;
    equals(other: ValueObject<T>): boolean;
}
/**
 * Generador de IDs únicos
 */
export declare class IdGenerator {
    static generate(): string;
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
