import { Password } from './value-objects.js';
/**
 * Estados posibles del usuario
 */
export var EstadoUsuario;
(function (EstadoUsuario) {
    EstadoUsuario["ACTIVO"] = "ACTIVO";
    EstadoUsuario["INACTIVO"] = "INACTIVO";
    EstadoUsuario["SUSPENDIDO"] = "SUSPENDIDO";
})(EstadoUsuario || (EstadoUsuario = {}));
/**
 * Roles del sistema
 */
export var RolUsuario;
(function (RolUsuario) {
    RolUsuario["ADMINISTRADOR"] = "ADMINISTRADOR";
    RolUsuario["EMPRENDEDOR"] = "EMPRENDEDOR";
    RolUsuario["CLIENTE"] = "CLIENTE";
})(RolUsuario || (RolUsuario = {}));
/**
 * Entidad Usuario del dominio
 */
export class Usuario {
    id;
    createdAt;
    updatedAt;
    _username;
    _email;
    _password;
    _nombre;
    _apellido;
    _telefono;
    _rol;
    _estado;
    constructor(id, username, email, password, nombre, apellido, rol, telefono, estado = EstadoUsuario.ACTIVO, createdAt = new Date(), updatedAt = new Date()) {
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
    get username() {
        return this._username;
    }
    get email() {
        return this._email;
    }
    get nombre() {
        return this._nombre;
    }
    get apellido() {
        return this._apellido;
    }
    get nombreCompleto() {
        return `${this._nombre} ${this._apellido}`;
    }
    get telefono() {
        return this._telefono;
    }
    get rol() {
        return this._rol;
    }
    get estado() {
        return this._estado;
    }
    // Métodos de negocio
    actualizarInformacion(datos) {
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
    verificarPassword(password) {
        return this._password.verify(password);
    }
    cambiarPassword(nuevaPassword) {
        this._password = new Password(nuevaPassword);
        this.updatedAt = new Date();
    }
    activar() {
        this._estado = EstadoUsuario.ACTIVO;
        this.updatedAt = new Date();
    }
    desactivar() {
        this._estado = EstadoUsuario.INACTIVO;
        this.updatedAt = new Date();
    }
    suspender() {
        this._estado = EstadoUsuario.SUSPENDIDO;
        this.updatedAt = new Date();
    }
    estaActivo() {
        return this._estado === EstadoUsuario.ACTIVO;
    }
    // Serialización para persistencia
    toJSON() {
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
