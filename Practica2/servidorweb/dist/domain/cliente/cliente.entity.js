import { Direccion } from './value-objects.js';
/**
 * Estados del cliente
 */
export var EstadoCliente;
(function (EstadoCliente) {
    EstadoCliente["ACTIVO"] = "ACTIVO";
    EstadoCliente["INACTIVO"] = "INACTIVO";
    EstadoCliente["BLOQUEADO"] = "BLOQUEADO";
})(EstadoCliente || (EstadoCliente = {}));
/**
 * Categorías de cliente
 */
export var CategoriaCliente;
(function (CategoriaCliente) {
    CategoriaCliente["BRONCE"] = "BRONCE";
    CategoriaCliente["PLATA"] = "PLATA";
    CategoriaCliente["ORO"] = "ORO";
    CategoriaCliente["PLATINO"] = "PLATINO";
})(CategoriaCliente || (CategoriaCliente = {}));
/**
 * Entidad Cliente del dominio
 */
export class Cliente {
    id;
    createdAt;
    updatedAt;
    _nombre;
    _apellido;
    _email;
    _telefono;
    _tipoDocumento;
    _numeroDocumento;
    _fechaNacimiento;
    _direccion;
    _estado;
    _categoria;
    _usuarioId;
    constructor(id, nombre, apellido, email, telefono, tipoDocumento, numeroDocumento, fechaNacimiento, direccion, usuarioId, estado = EstadoCliente.ACTIVO, categoria = CategoriaCliente.BRONCE, createdAt = new Date(), updatedAt = new Date()) {
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
    get tipoDocumento() {
        return this._tipoDocumento;
    }
    get numeroDocumento() {
        return this._numeroDocumento;
    }
    get fechaNacimiento() {
        return this._fechaNacimiento;
    }
    get direccion() {
        return this._direccion;
    }
    get estado() {
        return this._estado;
    }
    get categoria() {
        return this._categoria;
    }
    get usuarioId() {
        return this._usuarioId;
    }
    // Métodos de negocio
    get edad() {
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
        if (datos.direccion) {
            this._direccion = new Direccion(datos.direccion.calle, datos.direccion.ciudad, datos.direccion.departamento, datos.direccion.codigoPostal);
        }
        if (datos.estado) {
            this._estado = datos.estado;
        }
        if (datos.categoria) {
            this._categoria = datos.categoria;
        }
        this.updatedAt = new Date();
    }
    activar() {
        this._estado = EstadoCliente.ACTIVO;
        this.updatedAt = new Date();
    }
    desactivar() {
        this._estado = EstadoCliente.INACTIVO;
        this.updatedAt = new Date();
    }
    bloquear() {
        this._estado = EstadoCliente.BLOQUEADO;
        this.updatedAt = new Date();
    }
    ascenderCategoria() {
        const categorias = Object.values(CategoriaCliente);
        const indiceActual = categorias.indexOf(this._categoria);
        if (indiceActual < categorias.length - 1) {
            this._categoria = categorias[indiceActual + 1];
            this.updatedAt = new Date();
            return true;
        }
        return false;
    }
    estaActivo() {
        return this._estado === EstadoCliente.ACTIVO;
    }
    esMayorDeEdad() {
        return this.edad >= 18;
    }
    // Serialización
    toJSON() {
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
