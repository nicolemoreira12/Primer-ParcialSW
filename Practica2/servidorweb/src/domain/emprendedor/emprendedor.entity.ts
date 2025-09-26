import { IEntity } from '../../shared/types.js';
import { Email } from '../usuario/value-objects.js';
import { Especialidad, Biografia, RedSocial, PlataformaRedSocial } from './value-objects.js';

/**
 * Estados del emprendedor
 */
export enum EstadoEmprendedor {
    ACTIVO = 'ACTIVO',
    INACTIVO = 'INACTIVO',
    PENDIENTE_VERIFICACION = 'PENDIENTE_VERIFICACION',
    VERIFICADO = 'VERIFICADO',
    SUSPENDIDO = 'SUSPENDIDO'
}

/**
 * Niveles de experiencia
 */
export enum NivelExperiencia {
    PRINCIPIANTE = 'PRINCIPIANTE',
    INTERMEDIO = 'INTERMEDIO',
    AVANZADO = 'AVANZADO',
    EXPERTO = 'EXPERTO'
}

/**
 * Sectores de emprendimiento
 */
export enum SectorEmprendimiento {
    TECNOLOGIA = 'TECNOLOGIA',
    ALIMENTACION = 'ALIMENTACION',
    MODA = 'MODA',
    SALUD = 'SALUD',
    EDUCACION = 'EDUCACION',
    SERVICIOS = 'SERVICIOS',
    COMERCIO = 'COMERCIO',
    TURISMO = 'TURISMO',
    ARTE = 'ARTE',
    DEPORTES = 'DEPORTES'
}

/**
 * DTO para crear emprendedor
 */
export interface CrearEmprendedorDTO {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    especialidad: string;
    biografia: string;
    sector: SectorEmprendimiento;
    experiencia: NivelExperiencia;
    usuarioId?: string;
    redesSociales?: Array<{
        plataforma: PlataformaRedSocial;
        url: string;
        nombreUsuario: string;
    }>;
}

/**
 * DTO para actualizar emprendedor
 */
export interface ActualizarEmprendedorDTO {
    nombre?: string;
    apellido?: string;
    telefono?: string;
    especialidad?: string;
    biografia?: string;
    sector?: SectorEmprendimiento;
    experiencia?: NivelExperiencia;
    estado?: EstadoEmprendedor;
    redesSociales?: Array<{
        plataforma: PlataformaRedSocial;
        url: string;
        nombreUsuario: string;
    }>;
}

/**
 * Entidad Emprendedor del dominio
 */
export class Emprendedor implements IEntity {
    public readonly id: string;
    public readonly createdAt: Date;
    public updatedAt: Date;

    private _nombre: string;
    private _apellido: string;
    private _email: Email;
    private _telefono: string;
    private _especialidad: Especialidad;
    private _biografia: Biografia;
    private _sector: SectorEmprendimiento;
    private _experiencia: NivelExperiencia;
    private _estado: EstadoEmprendedor;
    private _usuarioId?: string;
    private _redesSociales: RedSocial[];
    private _fechaVerificacion?: Date;
    private _puntuacion: number;

    constructor(
        id: string,
        nombre: string,
        apellido: string,
        email: Email,
        telefono: string,
        especialidad: Especialidad,
        biografia: Biografia,
        sector: SectorEmprendimiento,
        experiencia: NivelExperiencia,
        usuarioId?: string,
        redesSociales: RedSocial[] = [],
        estado: EstadoEmprendedor = EstadoEmprendedor.PENDIENTE_VERIFICACION,
        puntuacion: number = 0,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this.id = id;
        this._nombre = nombre;
        this._apellido = apellido;
        this._email = email;
        this._telefono = telefono;
        this._especialidad = especialidad;
        this._biografia = biografia;
        this._sector = sector;
        this._experiencia = experiencia;
        this._usuarioId = usuarioId;
        this._redesSociales = redesSociales;
        this._estado = estado;
        this._puntuacion = Math.max(0, Math.min(5, puntuacion)); // Entre 0 y 5
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

    public get especialidad(): Especialidad {
        return this._especialidad;
    }

    public get biografia(): Biografia {
        return this._biografia;
    }

    public get sector(): SectorEmprendimiento {
        return this._sector;
    }

    public get experiencia(): NivelExperiencia {
        return this._experiencia;
    }

    public get estado(): EstadoEmprendedor {
        return this._estado;
    }

    public get usuarioId(): string | undefined {
        return this._usuarioId;
    }

    public get redesSociales(): RedSocial[] {
        return [...this._redesSociales]; // Copia defensiva
    }

    public get fechaVerificacion(): Date | undefined {
        return this._fechaVerificacion;
    }

    public get puntuacion(): number {
        return this._puntuacion;
    }

    // Métodos de negocio
    public actualizarInformacion(datos: ActualizarEmprendedorDTO): void {
        if (datos.nombre) {
            this._nombre = datos.nombre;
        }
        if (datos.apellido) {
            this._apellido = datos.apellido;
        }
        if (datos.telefono) {
            this._telefono = datos.telefono;
        }
        if (datos.especialidad) {
            this._especialidad = new Especialidad(datos.especialidad);
        }
        if (datos.biografia) {
            this._biografia = new Biografia(datos.biografia);
        }
        if (datos.sector) {
            this._sector = datos.sector;
        }
        if (datos.experiencia) {
            this._experiencia = datos.experiencia;
        }
        if (datos.estado) {
            this._estado = datos.estado;
        }
        if (datos.redesSociales) {
            this._redesSociales = datos.redesSociales.map(rs =>
                new RedSocial(rs.plataforma, rs.url, rs.nombreUsuario)
            );
        }
        this.updatedAt = new Date();
    }

    public verificar(): void {
        this._estado = EstadoEmprendedor.VERIFICADO;
        this._fechaVerificacion = new Date();
        this.updatedAt = new Date();
    }

    public suspender(): void {
        this._estado = EstadoEmprendedor.SUSPENDIDO;
        this.updatedAt = new Date();
    }

    public activar(): void {
        this._estado = EstadoEmprendedor.ACTIVO;
        this.updatedAt = new Date();
    }

    public desactivar(): void {
        this._estado = EstadoEmprendedor.INACTIVO;
        this.updatedAt = new Date();
    }

    public agregarRedSocial(redSocial: RedSocial): void {
        // Verificar que no exista ya esa plataforma
        const existente = this._redesSociales.find(rs => rs.plataforma === redSocial.plataforma);
        if (existente) {
            throw new Error(`Ya existe una cuenta de ${redSocial.plataforma}`);
        }

        this._redesSociales.push(redSocial);
        this.updatedAt = new Date();
    }

    public removerRedSocial(plataforma: PlataformaRedSocial): boolean {
        const indice = this._redesSociales.findIndex(rs => rs.plataforma === plataforma);
        if (indice > -1) {
            this._redesSociales.splice(indice, 1);
            this.updatedAt = new Date();
            return true;
        }
        return false;
    }

    public actualizarPuntuacion(nuevaPuntuacion: number): void {
        this._puntuacion = Math.max(0, Math.min(5, nuevaPuntuacion));
        this.updatedAt = new Date();
    }

    public estaVerificado(): boolean {
        return this._estado === EstadoEmprendedor.VERIFICADO;
    }

    public estaActivo(): boolean {
        return this._estado === EstadoEmprendedor.ACTIVO || this._estado === EstadoEmprendedor.VERIFICADO;
    }

    public tieneBuenaPuntuacion(): boolean {
        return this._puntuacion >= 4.0;
    }

    // Serialización
    public toJSON(): any {
        return {
            id: this.id,
            nombre: this._nombre,
            apellido: this._apellido,
            email: this._email.toString(),
            telefono: this._telefono,
            especialidad: this._especialidad.toString(),
            biografia: this._biografia.toString(),
            sector: this._sector,
            experiencia: this._experiencia,
            estado: this._estado,
            usuarioId: this._usuarioId,
            redesSociales: this._redesSociales.map(rs => ({
                plataforma: rs.plataforma,
                url: rs.url,
                nombreUsuario: rs.nombreUsuario
            })),
            fechaVerificacion: this._fechaVerificacion,
            puntuacion: this._puntuacion,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}