import { ValueObject } from '../../shared/types.js';
/**
 * Value Object para Especialidad del Emprendedor
 */
export declare class Especialidad extends ValueObject<string> {
    constructor(especialidad: string);
    private static isValid;
    toString(): string;
}
/**
 * Value Object para Biografía
 */
export declare class Biografia extends ValueObject<string> {
    constructor(biografia: string);
    private static isValid;
    toString(): string;
    get resumen(): string;
}
/**
 * Value Object para Red Social
 */
export declare class RedSocial extends ValueObject<{
    plataforma: PlataformaRedSocial;
    url: string;
    nombreUsuario: string;
}> {
    constructor(plataforma: PlataformaRedSocial, url: string, nombreUsuario: string);
    private static isValidUrl;
    private static isValidUsername;
    get plataforma(): PlataformaRedSocial;
    get url(): string;
    get nombreUsuario(): string;
}
/**
 * Plataformas de redes sociales soportadas
 */
export declare enum PlataformaRedSocial {
    INSTAGRAM = "INSTAGRAM",
    FACEBOOK = "FACEBOOK",
    TWITTER = "TWITTER",
    LINKEDIN = "LINKEDIN",
    YOUTUBE = "YOUTUBE",
    TIKTOK = "TIKTOK",
    WHATSAPP = "WHATSAPP"
}
