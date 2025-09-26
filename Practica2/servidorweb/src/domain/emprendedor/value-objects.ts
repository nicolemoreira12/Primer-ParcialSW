import { ValueObject } from '../../shared/types.js';

/**
 * Value Object para Especialidad del Emprendedor
 */
export class Especialidad extends ValueObject<string> {
    constructor(especialidad: string) {
        if (!Especialidad.isValid(especialidad)) {
            throw new Error('Especialidad debe tener entre 3 y 50 caracteres');
        }
        super(especialidad.trim());
    }

    private static isValid(especialidad: string): boolean {
        return especialidad.trim().length >= 3 && especialidad.trim().length <= 50;
    }

    public toString(): string {
        return this._value;
    }
}

/**
 * Value Object para Biografía
 */
export class Biografia extends ValueObject<string> {
    constructor(biografia: string) {
        if (!Biografia.isValid(biografia)) {
            throw new Error('Biografía debe tener entre 10 y 500 caracteres');
        }
        super(biografia.trim());
    }

    private static isValid(biografia: string): boolean {
        const longitud = biografia.trim().length;
        return longitud >= 10 && longitud <= 500;
    }

    public toString(): string {
        return this._value;
    }

    public get resumen(): string {
        return this._value.length > 100 ? this._value.substring(0, 100) + '...' : this._value;
    }
}

/**
 * Value Object para Red Social
 */
export class RedSocial extends ValueObject<{
    plataforma: PlataformaRedSocial;
    url: string;
    nombreUsuario: string;
}> {
    constructor(plataforma: PlataformaRedSocial, url: string, nombreUsuario: string) {
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

    private static isValidUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    private static isValidUsername(username: string): boolean {
        return username.trim().length >= 1 && username.trim().length <= 30;
    }

    public get plataforma(): PlataformaRedSocial {
        return this._value.plataforma;
    }

    public get url(): string {
        return this._value.url;
    }

    public get nombreUsuario(): string {
        return this._value.nombreUsuario;
    }
}

/**
 * Plataformas de redes sociales soportadas
 */
export enum PlataformaRedSocial {
    INSTAGRAM = 'INSTAGRAM',
    FACEBOOK = 'FACEBOOK',
    TWITTER = 'TWITTER',
    LINKEDIN = 'LINKEDIN',
    YOUTUBE = 'YOUTUBE',
    TIKTOK = 'TIKTOK',
    WHATSAPP = 'WHATSAPP'
}