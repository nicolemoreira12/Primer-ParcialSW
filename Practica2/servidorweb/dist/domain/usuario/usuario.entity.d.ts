import { IEntity } from '../../shared/types.js';
import { Email, Username, Password } from './value-objects.js';
/**
 * Estados posibles del usuario
 */
export declare enum EstadoUsuario {
    ACTIVO = "ACTIVO",
    INACTIVO = "INACTIVO",
    SUSPENDIDO = "SUSPENDIDO"
}
/**
 * Roles del sistema
 */
export declare enum RolUsuario {
    ADMINISTRADOR = "ADMINISTRADOR",
    EMPRENDEDOR = "EMPRENDEDOR",
    CLIENTE = "CLIENTE"
}
/**
 * Interfaz para crear un nuevo usuario
 */
export interface CrearUsuarioDTO {
    username: string;
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    telefono?: string;
    rol: RolUsuario;
}
/**
 * Interfaz para actualizar usuario
 */
export interface ActualizarUsuarioDTO {
    nombre?: string;
    apellido?: string;
    telefono?: string;
    estado?: EstadoUsuario;
}
/**
 * Entidad Usuario del dominio
 */
export declare class Usuario implements IEntity {
    readonly id: string;
    readonly createdAt: Date;
    updatedAt: Date;
    private _username;
    private _email;
    private _password;
    private _nombre;
    private _apellido;
    private _telefono?;
    private _rol;
    private _estado;
    constructor(id: string, username: Username, email: Email, password: Password, nombre: string, apellido: string, rol: RolUsuario, telefono?: string, estado?: EstadoUsuario, createdAt?: Date, updatedAt?: Date);
    get username(): Username;
    get email(): Email;
    get nombre(): string;
    get apellido(): string;
    get nombreCompleto(): string;
    get telefono(): string | undefined;
    get rol(): RolUsuario;
    get estado(): EstadoUsuario;
    actualizarInformacion(datos: ActualizarUsuarioDTO): void;
    verificarPassword(password: string): boolean;
    cambiarPassword(nuevaPassword: string): void;
    activar(): void;
    desactivar(): void;
    suspender(): void;
    estaActivo(): boolean;
    toJSON(): any;
}
