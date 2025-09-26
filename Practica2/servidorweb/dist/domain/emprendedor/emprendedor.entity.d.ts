import { IEntity } from '../../shared/types.js';
import { Email } from '../usuario/value-objects.js';
import { Especialidad, Biografia, RedSocial, PlataformaRedSocial } from './value-objects.js';
/**
 * Estados del emprendedor
 */
export declare enum EstadoEmprendedor {
    ACTIVO = "ACTIVO",
    INACTIVO = "INACTIVO",
    PENDIENTE_VERIFICACION = "PENDIENTE_VERIFICACION",
    VERIFICADO = "VERIFICADO",
    SUSPENDIDO = "SUSPENDIDO"
}
/**
 * Niveles de experiencia
 */
export declare enum NivelExperiencia {
    PRINCIPIANTE = "PRINCIPIANTE",
    INTERMEDIO = "INTERMEDIO",
    AVANZADO = "AVANZADO",
    EXPERTO = "EXPERTO"
}
/**
 * Sectores de emprendimiento
 */
export declare enum SectorEmprendimiento {
    TECNOLOGIA = "TECNOLOGIA",
    ALIMENTACION = "ALIMENTACION",
    MODA = "MODA",
    SALUD = "SALUD",
    EDUCACION = "EDUCACION",
    SERVICIOS = "SERVICIOS",
    COMERCIO = "COMERCIO",
    TURISMO = "TURISMO",
    ARTE = "ARTE",
    DEPORTES = "DEPORTES"
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
export declare class Emprendedor implements IEntity {
    readonly id: string;
    readonly createdAt: Date;
    updatedAt: Date;
    private _nombre;
    private _apellido;
    private _email;
    private _telefono;
    private _especialidad;
    private _biografia;
    private _sector;
    private _experiencia;
    private _estado;
    private _usuarioId?;
    private _redesSociales;
    private _fechaVerificacion?;
    private _puntuacion;
    constructor(id: string, nombre: string, apellido: string, email: Email, telefono: string, especialidad: Especialidad, biografia: Biografia, sector: SectorEmprendimiento, experiencia: NivelExperiencia, usuarioId?: string, redesSociales?: RedSocial[], estado?: EstadoEmprendedor, puntuacion?: number, createdAt?: Date, updatedAt?: Date);
    get nombre(): string;
    get apellido(): string;
    get nombreCompleto(): string;
    get email(): Email;
    get telefono(): string;
    get especialidad(): Especialidad;
    get biografia(): Biografia;
    get sector(): SectorEmprendimiento;
    get experiencia(): NivelExperiencia;
    get estado(): EstadoEmprendedor;
    get usuarioId(): string | undefined;
    get redesSociales(): RedSocial[];
    get fechaVerificacion(): Date | undefined;
    get puntuacion(): number;
    actualizarInformacion(datos: ActualizarEmprendedorDTO): void;
    verificar(): void;
    suspender(): void;
    activar(): void;
    desactivar(): void;
    agregarRedSocial(redSocial: RedSocial): void;
    removerRedSocial(plataforma: PlataformaRedSocial): boolean;
    actualizarPuntuacion(nuevaPuntuacion: number): void;
    estaVerificado(): boolean;
    estaActivo(): boolean;
    tieneBuenaPuntuacion(): boolean;
    toJSON(): any;
}
