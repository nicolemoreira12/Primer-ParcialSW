import { ValueObject } from '../../shared/types.js';
/**
 * Value Object para Especialidad del Emprendedor
 */
export class Especialidad extends ValueObject {
    constructor(especialidad) {
        if (!Especialidad.isValid(especialidad)) {
            throw new Error('Especialidad debe tener entre 3 y 50 caracteres');
        }
        super(especialidad.trim());
    }
    static isValid(especialidad) {
        return especialidad.trim().length >= 3 && especialidad.trim().length <= 50;
    }
    toString() {
        return this._value;
    }
}
/**
 * Value Object para Biografía
 */
export class Biografia extends ValueObject {
    constructor(biografia) {
        if (!Biografia.isValid(biografia)) {
            throw new Error('Biografía debe tener entre 10 y 500 caracteres');
        }
        super(biografia.trim());
    }
    static isValid(biografia) {
        const longitud = biografia.trim().length;
        return longitud >= 10 && longitud <= 500;
    }
    toString() {
        return this._value;
    }
    get resumen() {
        return this._value.length > 100 ? this._value.substring(0, 100) + '...' : this._value;
    }
}
/**
 * Value Object para Red Social
 */
export class RedSocial extends ValueObject {
    constructor(plataforma, url, nombreUsuario) {
        if (!RedSocial.isValidUrl(url)) {
            throw new Error('URL de red social inválida');
        }
        if (!RedSocial.isValidUsername(nombreUsuario)) {
            throw new Error('Nombre de usuario de red social inválido');
        }
        super({
            plataforma,
            url: url.toLowerCase().trim(),
            nombreUsuario: nombreUsuario.trim()
        });
    }
    static isValidUrl(url) {
        try {
            new URL(url);
            return true;
        }
        catch {
            return false;
        }
    }
    static isValidUsername(username) {
        return username.trim().length >= 1 && username.trim().length <= 30;
    }
    get plataforma() {
        return this._value.plataforma;
    }
    get url() {
        return this._value.url;
    }
    get nombreUsuario() {
        return this._value.nombreUsuario;
    }
}
/**
 * Plataformas de redes sociales soportadas
 */
export var PlataformaRedSocial;
(function (PlataformaRedSocial) {
    PlataformaRedSocial["INSTAGRAM"] = "INSTAGRAM";
    PlataformaRedSocial["FACEBOOK"] = "FACEBOOK";
    PlataformaRedSocial["TWITTER"] = "TWITTER";
    PlataformaRedSocial["LINKEDIN"] = "LINKEDIN";
    PlataformaRedSocial["YOUTUBE"] = "YOUTUBE";
    PlataformaRedSocial["TIKTOK"] = "TIKTOK";
    PlataformaRedSocial["WHATSAPP"] = "WHATSAPP";
})(PlataformaRedSocial || (PlataformaRedSocial = {}));
