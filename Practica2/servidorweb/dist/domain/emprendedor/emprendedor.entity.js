import { Especialidad, Biografia, RedSocial } from './value-objects.js';
/**
 * Estados del emprendedor
 */
export var EstadoEmprendedor;
(function (EstadoEmprendedor) {
    EstadoEmprendedor["ACTIVO"] = "ACTIVO";
    EstadoEmprendedor["INACTIVO"] = "INACTIVO";
    EstadoEmprendedor["PENDIENTE_VERIFICACION"] = "PENDIENTE_VERIFICACION";
    EstadoEmprendedor["VERIFICADO"] = "VERIFICADO";
    EstadoEmprendedor["SUSPENDIDO"] = "SUSPENDIDO";
})(EstadoEmprendedor || (EstadoEmprendedor = {}));
/**
 * Niveles de experiencia
 */
export var NivelExperiencia;
(function (NivelExperiencia) {
    NivelExperiencia["PRINCIPIANTE"] = "PRINCIPIANTE";
    NivelExperiencia["INTERMEDIO"] = "INTERMEDIO";
    NivelExperiencia["AVANZADO"] = "AVANZADO";
    NivelExperiencia["EXPERTO"] = "EXPERTO";
})(NivelExperiencia || (NivelExperiencia = {}));
/**
 * Sectores de emprendimiento
 */
export var SectorEmprendimiento;
(function (SectorEmprendimiento) {
    SectorEmprendimiento["TECNOLOGIA"] = "TECNOLOGIA";
    SectorEmprendimiento["ALIMENTACION"] = "ALIMENTACION";
    SectorEmprendimiento["MODA"] = "MODA";
    SectorEmprendimiento["SALUD"] = "SALUD";
    SectorEmprendimiento["EDUCACION"] = "EDUCACION";
    SectorEmprendimiento["SERVICIOS"] = "SERVICIOS";
    SectorEmprendimiento["COMERCIO"] = "COMERCIO";
    SectorEmprendimiento["TURISMO"] = "TURISMO";
    SectorEmprendimiento["ARTE"] = "ARTE";
    SectorEmprendimiento["DEPORTES"] = "DEPORTES";
})(SectorEmprendimiento || (SectorEmprendimiento = {}));
/**
 * Entidad Emprendedor del dominio
 */
export class Emprendedor {
    id;
    createdAt;
    updatedAt;
    _nombre;
    _apellido;
    _email;
    _telefono;
    _especialidad;
    _biografia;
    _sector;
    _experiencia;
    _estado;
    _usuarioId;
    _redesSociales;
    _fechaVerificacion;
    _puntuacion;
    constructor(id, nombre, apellido, email, telefono, especialidad, biografia, sector, experiencia, usuarioId, redesSociales = [], estado = EstadoEmprendedor.PENDIENTE_VERIFICACION, puntuacion = 0, createdAt = new Date(), updatedAt = new Date()) {
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
    get nombre() {
        return this._nombre;
    }
    get apellido() {
        return this._apellido;
    }
    get nombreCompleto() {
        return `${this._nombre} ${this._apellido}`;
    }
    get email() {
        return this._email;
    }
    get telefono() {
        return this._telefono;
    }
    get especialidad() {
        return this._especialidad;
    }
    get biografia() {
        return this._biografia;
    }
    get sector() {
        return this._sector;
    }
    get experiencia() {
        return this._experiencia;
    }
    get estado() {
        return this._estado;
    }
    get usuarioId() {
        return this._usuarioId;
    }
    get redesSociales() {
        return [...this._redesSociales]; // Copia defensiva
    }
    get fechaVerificacion() {
        return this._fechaVerificacion;
    }
    get puntuacion() {
        return this._puntuacion;
    }
    // Métodos de negocio
    actualizarInformacion(datos) {
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
            this._redesSociales = datos.redesSociales.map(rs => new RedSocial(rs.plataforma, rs.url, rs.nombreUsuario));
        }
        this.updatedAt = new Date();
    }
    verificar() {
        this._estado = EstadoEmprendedor.VERIFICADO;
        this._fechaVerificacion = new Date();
        this.updatedAt = new Date();
    }
    suspender() {
        this._estado = EstadoEmprendedor.SUSPENDIDO;
        this.updatedAt = new Date();
    }
    activar() {
        this._estado = EstadoEmprendedor.ACTIVO;
        this.updatedAt = new Date();
    }
    desactivar() {
        this._estado = EstadoEmprendedor.INACTIVO;
        this.updatedAt = new Date();
    }
    agregarRedSocial(redSocial) {
        // Verificar que no exista ya esa plataforma
        const existente = this._redesSociales.find(rs => rs.plataforma === redSocial.plataforma);
        if (existente) {
            throw new Error(`Ya existe una cuenta de ${redSocial.plataforma}`);
        }
        this._redesSociales.push(redSocial);
        this.updatedAt = new Date();
    }
    removerRedSocial(plataforma) {
        const indice = this._redesSociales.findIndex(rs => rs.plataforma === plataforma);
        if (indice > -1) {
            this._redesSociales.splice(indice, 1);
            this.updatedAt = new Date();
            return true;
        }
        return false;
    }
    actualizarPuntuacion(nuevaPuntuacion) {
        this._puntuacion = Math.max(0, Math.min(5, nuevaPuntuacion));
        this.updatedAt = new Date();
    }
    estaVerificado() {
        return this._estado === EstadoEmprendedor.VERIFICADO;
    }
    estaActivo() {
        return this._estado === EstadoEmprendedor.ACTIVO || this._estado === EstadoEmprendedor.VERIFICADO;
    }
    tieneBuenaPuntuacion() {
        return this._puntuacion >= 4.0;
    }
    // Serialización
    toJSON() {
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
