import { IEntity } from '../../shared/types.js';
import { Email } from '../usuario/value-objects.js';
import { NumeroDocumento, TipoDocumento, Direccion } from './value-objects.js';

/**
 * Estados del cliente
 */
export enum EstadoCliente {
    ACTIVO = 'ACTIVO',
    INACTIVO = 'INACTIVO',
    BLOQUEADO = 'BLOQUEADO'
}

/**
 * Categorías de cliente
 */
export enum CategoriaCliente {
    BRONCE = 'BRONCE',
    PLATA = 'PLATA',
    ORO = 'ORO',
    PLATINO = 'PLATINO'
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
    usuarioId?: string; // Referencia opcional al usuario del sistema
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
export class Cliente implements IEntity {
    public readonly id: string;
    public readonly createdAt: Date;
    public updatedAt: Date;

    private _nombre: string;
    private _apellido: string;
    private _email: Email;
    private _telefono: string;
    private _tipoDocumento: TipoDocumento;
    private _numeroDocumento: NumeroDocumento;
    private _fechaNacimiento: Date;
    private _direccion: Direccion;
    private _estado: EstadoCliente;
    private _categoria: CategoriaCliente;
    private _usuarioId?: string;

    constructor(
        id: string,
        nombre: string,
        apellido: string,
        email: Email,
        telefono: string,
        tipoDocumento: TipoDocumento,
        numeroDocumento: NumeroDocumento,
        fechaNacimiento: Date,
        direccion: Direccion,
        usuarioId?: string,
        estado: EstadoCliente = EstadoCliente.ACTIVO,
        categoria: CategoriaCliente = CategoriaCliente.BRONCE,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this.id = id;
        this._nombre = nombre;
        this._apellido = apellido;
        this._email = email;
        this._telefono = telefono;
        this._tipoDocumento = tipoDocumento;
        this._numeroDocumento = numeroDocumento;
        this._fechaNacimiento = fechaNacimiento;
        this._direccion = direccion;
        this._usuarioId = usuarioId;
        this._estado = estado;
        this._categoria = categoria;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters
    public get nombre(): string {
        return this._nombre;
    }

    public get apellido(): string {
        return this._apellido;
    }

    public get nombreCompleto(): string {
        return `${this._nombre} ${this._apellido}`;
    }

    public get email(): Email {
        return this._email;
    }

    public get telefono(): string {
        return this._telefono;
    }

    public get tipoDocumento(): TipoDocumento {
        return this._tipoDocumento;
    }

    public get numeroDocumento(): NumeroDocumento {
        return this._numeroDocumento;
    }

    public get fechaNacimiento(): Date {
        return this._fechaNacimiento;
    }

    public get direccion(): Direccion {
        return this._direccion;
    }

    public get estado(): EstadoCliente {
        return this._estado;
    }

    public get categoria(): CategoriaCliente {
        return this._categoria;
    }

    public get usuarioId(): string | undefined {
        return this._usuarioId;
    }

    // Métodos de negocio
    public get edad(): number {
        const hoy = new Date();
        const edad = hoy.getFullYear() - this._fechaNacimiento.getFullYear();
        const mesActual = hoy.getMonth();
        const diaActual = hoy.getDate();
        const mesNacimiento = this._fechaNacimiento.getMonth();
        const diaNacimiento = this._fechaNacimiento.getDate();

        if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
            return edad - 1;
        }
        return edad;
    }

    public actualizarInformacion(datos: ActualizarClienteDTO): void {
        if (datos.nombre) {
            this._nombre = datos.nombre;
        }
        if (datos.apellido) {
            this._apellido = datos.apellido;
        }
        if (datos.telefono) {
            this._telefono = datos.telefono;
        }
        if (datos.direccion) {
            this._direccion = new Direccion(
                datos.direccion.calle,
                datos.direccion.ciudad,
                datos.direccion.departamento,
                datos.direccion.codigoPostal
            );
        }
        if (datos.estado) {
            this._estado = datos.estado;
        }
        if (datos.categoria) {
            this._categoria = datos.categoria;
        }
        this.updatedAt = new Date();
    }

    public activar(): void {
        this._estado = EstadoCliente.ACTIVO;
        this.updatedAt = new Date();
    }

    public desactivar(): void {
        this._estado = EstadoCliente.INACTIVO;
        this.updatedAt = new Date();
    }

    public bloquear(): void {
        this._estado = EstadoCliente.BLOQUEADO;
        this.updatedAt = new Date();
    }

    public ascenderCategoria(): boolean {
        const categorias = Object.values(CategoriaCliente);
        const indiceActual = categorias.indexOf(this._categoria);

        if (indiceActual < categorias.length - 1) {
            this._categoria = categorias[indiceActual + 1];
            this.updatedAt = new Date();
            return true;
        }
        return false;
    }

    public estaActivo(): boolean {
        return this._estado === EstadoCliente.ACTIVO;
    }

    public esMayorDeEdad(): boolean {
        return this.edad >= 18;
    }

    // Serialización
    public toJSON(): any {
        return {
            id: this.id,
            nombre: this._nombre,
            apellido: this._apellido,
            email: this._email.toString(),
            telefono: this._telefono,
            tipoDocumento: this._tipoDocumento,
            numeroDocumento: this._numeroDocumento.toString(),
            fechaNacimiento: this._fechaNacimiento,
            direccion: {
                calle: this._direccion.calle,
                ciudad: this._direccion.ciudad,
                departamento: this._direccion.departamento,
                codigoPostal: this._direccion.codigoPostal
            },
            estado: this._estado,
            categoria: this._categoria,
            usuarioId: this._usuarioId,
            edad: this.edad,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}