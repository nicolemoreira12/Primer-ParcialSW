import { IEntity } from '../../shared/types.js';
import { Email, Username, Password } from './value-objects.js';

/**
 * Estados posibles del usuario
 */
export enum EstadoUsuario {
    ACTIVO = 'ACTIVO',
    INACTIVO = 'INACTIVO',
    SUSPENDIDO = 'SUSPENDIDO'
}

/**
 * Roles del sistema  
 */
export enum RolUsuario {
    ADMINISTRADOR = 'ADMINISTRADOR',
    EMPRENDEDOR = 'EMPRENDEDOR',
    CLIENTE = 'CLIENTE'
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
export class Usuario implements IEntity {
    public readonly id: string;
    public readonly createdAt: Date;
    public updatedAt: Date;

    private _username: Username;
    private _email: Email;
    private _password: Password;
    private _nombre: string;
    private _apellido: string;
    private _telefono?: string;
    private _rol: RolUsuario;
    private _estado: EstadoUsuario;

    constructor(
        id: string,
        username: Username,
        email: Email,
        password: Password,
        nombre: string,
        apellido: string,
        rol: RolUsuario,
        telefono?: string,
        estado: EstadoUsuario = EstadoUsuario.ACTIVO,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this.id = id;
        this._username = username;
        this._email = email;
        this._password = password;
        this._nombre = nombre;
        this._apellido = apellido;
        this._telefono = telefono;
        this._rol = rol;
        this._estado = estado;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters
    public get username(): Username {
        return this._username;
    }

    public get email(): Email {
        return this._email;
    }

    public get nombre(): string {
        return this._nombre;
    }

    public get apellido(): string {
        return this._apellido;
    }

    public get nombreCompleto(): string {
        return `${this._nombre} ${this._apellido}`;
    }

    public get telefono(): string | undefined {
        return this._telefono;
    }

    public get rol(): RolUsuario {
        return this._rol;
    }

    public get estado(): EstadoUsuario {
        return this._estado;
    }

    // Métodos de negocio
    public actualizarInformacion(datos: ActualizarUsuarioDTO): void {
        if (datos.nombre) {
            this._nombre = datos.nombre;
        }
        if (datos.apellido) {
            this._apellido = datos.apellido;
        }
        if (datos.telefono !== undefined) {
            this._telefono = datos.telefono;
        }
        if (datos.estado) {
            this._estado = datos.estado;
        }
        this.updatedAt = new Date();
    }

    public verificarPassword(password: string): boolean {
        return this._password.verify(password);
    }

    public cambiarPassword(nuevaPassword: string): void {
        this._password = new Password(nuevaPassword);
        this.updatedAt = new Date();
    }

    public activar(): void {
        this._estado = EstadoUsuario.ACTIVO;
        this.updatedAt = new Date();
    }

    public desactivar(): void {
        this._estado = EstadoUsuario.INACTIVO;
        this.updatedAt = new Date();
    }

    public suspender(): void {
        this._estado = EstadoUsuario.SUSPENDIDO;
        this.updatedAt = new Date();
    }

    public estaActivo(): boolean {
        return this._estado === EstadoUsuario.ACTIVO;
    }

    // Serialización para persistencia
    public toJSON(): any {
        return {
            id: this.id,
            username: this._username.toString(),
            email: this._email.toString(),
            nombre: this._nombre,
            apellido: this._apellido,
            telefono: this._telefono,
            rol: this._rol,
            estado: this._estado,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}