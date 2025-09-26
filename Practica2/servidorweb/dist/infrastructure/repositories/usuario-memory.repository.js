import { Usuario, RolUsuario } from '../../domain/usuario/usuario.entity.js';
import { Email, Username, Password } from '../../domain/usuario/value-objects.js';
import { IdGenerator } from '../../shared/types.js';
/**
 * Implementación en memoria del repositorio de Usuario
 * Aplica los paradigmas asíncronos requeridos:
 * - CREATE: Callbacks
 * - READ: Async/Await
 * - UPDATE: Promises
 * - DELETE: Async/Await
 */
export class UsuarioMemoryRepository {
    usuarios = new Map();
    LATENCIA_RED = 100; // Simular latencia de red
    constructor() {
        this.inicializarDatosPrueba();
    }
    /**
     * CREATE - Implementado con CALLBACKS
     */
    crear(usuarioData, callback) {
        // Simular latencia de red
        setTimeout(() => {
            try {
                // Validaciones de negocio
                if (this.existeUsernameSync(usuarioData.username)) {
                    const error = new Error(`Username '${usuarioData.username}' ya existe`);
                    return callback(error);
                }
                if (this.existeEmailSync(usuarioData.email)) {
                    const error = new Error(`Email '${usuarioData.email}' ya existe`);
                    return callback(error);
                }
                // Crear value objects
                const username = new Username(usuarioData.username);
                const email = new Email(usuarioData.email);
                const password = new Password(usuarioData.password);
                // Crear entidad
                const usuario = new Usuario(IdGenerator.generate(), username, email, password, usuarioData.nombre, usuarioData.apellido, usuarioData.rol, usuarioData.telefono);
                // Persistir
                this.usuarios.set(usuario.id, usuario);
                // Callback de éxito
                callback(null, usuario);
            }
            catch (error) {
                callback(error);
            }
        }, this.LATENCIA_RED);
    }
    /**
     * READ - Implementado con ASYNC/AWAIT
     */
    async obtenerPorId(id) {
        // Simular operación asíncrona
        await this.simularLatencia();
        return this.usuarios.get(id) || null;
    }
    async obtenerPorUsername(username) {
        await this.simularLatencia();
        for (const usuario of this.usuarios.values()) {
            if (usuario.username.toString() === username) {
                return usuario;
            }
        }
        return null;
    }
    async obtenerPorEmail(email) {
        await this.simularLatencia();
        for (const usuario of this.usuarios.values()) {
            if (usuario.email.toString() === email.toLowerCase()) {
                return usuario;
            }
        }
        return null;
    }
    async obtenerTodos() {
        await this.simularLatencia();
        return Array.from(this.usuarios.values());
    }
    /**
     * UPDATE - Implementado con PROMISES
     */
    actualizar(id, datos) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const usuario = this.usuarios.get(id);
                    if (!usuario) {
                        resolve({
                            success: false,
                            error: `Usuario con ID '${id}' no encontrado`,
                            message: 'Usuario no existe'
                        });
                        return;
                    }
                    // Aplicar actualizaciones
                    usuario.actualizarInformacion(datos);
                    // Persistir cambios
                    this.usuarios.set(id, usuario);
                    resolve({
                        success: true,
                        data: usuario,
                        message: 'Usuario actualizado exitosamente'
                    });
                }
                catch (error) {
                    reject(error);
                }
            }, this.LATENCIA_RED);
        });
    }
    /**
     * DELETE - Implementado con ASYNC/AWAIT
     */
    async eliminar(id) {
        await this.simularLatencia();
        const existia = this.usuarios.has(id);
        if (existia) {
            this.usuarios.delete(id);
        }
        return existia;
    }
    // Métodos auxiliares
    async existeUsername(username) {
        await this.simularLatencia();
        return this.existeUsernameSync(username);
    }
    async existeEmail(email) {
        await this.simularLatencia();
        return this.existeEmailSync(email);
    }
    // Métodos síncronos para validaciones internas
    existeUsernameSync(username) {
        for (const usuario of this.usuarios.values()) {
            if (usuario.username.toString() === username) {
                return true;
            }
        }
        return false;
    }
    existeEmailSync(email) {
        for (const usuario of this.usuarios.values()) {
            if (usuario.email.toString() === email.toLowerCase()) {
                return true;
            }
        }
        return false;
    }
    async simularLatencia() {
        return new Promise(resolve => setTimeout(resolve, this.LATENCIA_RED));
    }
    /**
     * Inicializar datos de prueba optimizados
     */
    inicializarDatosPrueba() {
        try {
            // Usuario Administrador
            const admin = new Usuario('admin-001', new Username('admin'), new Email('admin@emprendimiento.com'), new Password('Admin123$'), 'Carlos', 'Administrador', RolUsuario.ADMINISTRADOR, '+57-300-1234567');
            // Usuario Emprendedor
            const emprendedor = new Usuario('emp-001', new Username('maria_tech'), new Email('maria@techstartup.com'), new Password('Emprendedor123$'), 'María', 'González', RolUsuario.EMPRENDEDOR, '+57-310-9876543');
            // Usuario Cliente
            const cliente = new Usuario('cli-001', new Username('juan_cliente'), new Email('juan@email.com'), new Password('Cliente123$'), 'Juan', 'Pérez', RolUsuario.CLIENTE, '+57-320-5555555');
            this.usuarios.set(admin.id, admin);
            this.usuarios.set(emprendedor.id, emprendedor);
            this.usuarios.set(cliente.id, cliente);
            console.log('✅ Datos de prueba de Usuario inicializados');
        }
        catch (error) {
            console.error('❌ Error inicializando datos de Usuario:', error);
        }
    }
    // Método para obtener estadísticas (útil para pruebas)
    obtenerEstadisticas() {
        const usuarios = Array.from(this.usuarios.values());
        const porRol = {};
        usuarios.forEach(usuario => {
            const rol = usuario.rol;
            porRol[rol] = (porRol[rol] || 0) + 1;
        });
        return {
            total: usuarios.length,
            porRol
        };
    }
}
