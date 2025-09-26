import { IEntity } from '../../shared/types.js';
import { Email } from '../usuario/value-objects.js';
import { NumeroDocumento, TipoDocumento, Direccion } from './value-objects.js';
/**
 * Estados del cliente
 */
export declare enum EstadoCliente {
    ACTIVO = "ACTIVO",
    INACTIVO = "INACTIVO",
    BLOQUEADO = "BLOQUEADO"
}
/**
 * Categorías de cliente
 */
export declare enum CategoriaCliente {
    BRONCE = "BRONCE",
    PLATA = "PLATA",
    ORO = "ORO",
    PLATINO = "PLATINO"
}
/**
 * DTO para crear cliente
 */
export interface CrearClienteDTO {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    tipoDocumento: TipoDocumento;
    numeroDocumento: string;
    fechaNacimiento: Date;
    direccion: {
        calle: string;
        ciudad: string;
        departamento: string;
        codigoPostal?: string;
    };
    usuarioId?: string;
}
/**
 * DTO para actualizar cliente
 */
export interface ActualizarClienteDTO {
    nombre?: string;
    apellido?: string;
    telefono?: string;
    direccion?: {
        calle: string;
        ciudad: string;
        departamento: string;
        codigoPostal?: string;
    };
    estado?: EstadoCliente;
    categoria?: CategoriaCliente;
}
/**
 * Entidad Cliente del dominio
 */
export declare class Cliente implements IEntity {
    readonly id: string;
    readonly createdAt: Date;
    updatedAt: Date;
    private _nombre;
    private _apellido;
    private _email;
    private _telefono;
    private _tipoDocumento;
    private _numeroDocumento;
    private _fechaNacimiento;
    private _direccion;
    private _estado;
    private _categoria;
    private _usuarioId?;
    constructor(id: string, nombre: string, apellido: string, email: Email, telefono: string, tipoDocumento: TipoDocumento, numeroDocumento: NumeroDocumento, fechaNacimiento: Date, direccion: Direccion, usuarioId?: string, estado?: EstadoCliente, categoria?: CategoriaCliente, createdAt?: Date, updatedAt?: Date);
    get nombre(): string;
    get apellido(): string;
    get nombreCompleto(): string;
    get email(): Email;
    get telefono(): string;
    get tipoDocumento(): TipoDocumento;
    get numeroDocumento(): NumeroDocumento;
    get fechaNacimiento(): Date;
    get direccion(): Direccion;
    get estado(): EstadoCliente;
    get categoria(): CategoriaCliente;
    get usuarioId(): string | undefined;
    get edad(): number;
    actualizarInformacion(datos: ActualizarClienteDTO): void;
    activar(): void;
    desactivar(): void;
    bloquear(): void;
    ascenderCategoria(): boolean;
    estaActivo(): boolean;
    esMayorDeEdad(): boolean;
    toJSON(): any;
}
