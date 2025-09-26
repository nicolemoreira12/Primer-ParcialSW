import { RolUsuario } from '../../domain/usuario/usuario.entity.js';
/**
 * Servicio de aplicación para Usuario
 * Orquesta las operaciones del dominio y aplica reglas de negocio
 * Implementa inyección de dependencias siguiendo principios SOLID
 */
export class UsuarioService {
    usuarioRepository;
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    /**
     * Crear nuevo usuario - Usando Callbacks
     */
    crearUsuario(usuarioData, callback) {
        // Validaciones adicionales de negocio
        if (!this.validarDatosCreacion(usuarioData)) {
            const error = new Error('Datos de usuario inválidos');
            return callback(error);
        }
        this.usuarioRepository.crear(usuarioData, (error, usuario) => {
            if (error) {
                return callback(error);
            }
            console.log(`✅ Usuario creado: ${usuario?.nombreCompleto} (${usuario?.rol})`);
            callback(null, usuario);
        });
    }
    /**
     * Obtener usuario por ID - Usando Async/Await
     */
    async obtenerUsuarioPorId(id) {
        if (!id || id.trim().length === 0) {
            throw new Error('ID de usuario requerido');
        }
        const usuario = await this.usuarioRepository.obtenerPorId(id);
        if (usuario) {
            console.log(`📋 Usuario encontrado: ${usuario.nombreCompleto}`);
        }
        else {
            console.log(`❌ Usuario con ID '${id}' no encontrado`);
        }
        return usuario;
    }
    /**
     * Obtener usuario por username - Usando Async/Await
     */
    async obtenerUsuarioPorUsername(username) {
        if (!username || username.trim().length === 0) {
            throw new Error('Username requerido');
        }
        return await this.usuarioRepository.obtenerPorUsername(username);
    }
    /**
     * Obtener usuario por email - Usando Async/Await
     */
    async obtenerUsuarioPorEmail(email) {
        if (!email || email.trim().length === 0) {
            throw new Error('Email requerido');
        }
        return await this.usuarioRepository.obtenerPorEmail(email);
    }
    /**
     * Listar todos los usuarios - Usando Async/Await
     */
    async listarUsuarios() {
        const usuarios = await this.usuarioRepository.obtenerTodos();
        console.log(`📋 Total usuarios encontrados: ${usuarios.length}`);
        return usuarios;
    }
    /**
     * Actualizar usuario - Usando Promises
     */
    async actualizarUsuario(id, datos) {
        if (!id || id.trim().length === 0) {
            return {
                success: false,
                error: 'ID de usuario requerido',
                message: 'Parámetros inválidos'
            };
        }
        try {
            const resultado = await this.usuarioRepository.actualizar(id, datos);
            if (resultado.success && resultado.data) {
                console.log(`✏️ Usuario actualizado: ${resultado.data.nombreCompleto}`);
            }
            return resultado;
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Error actualizando usuario'
            };
        }
    }
    /**
     * Eliminar usuario - Usando Async/Await
     */
    async eliminarUsuario(id) {
        if (!id || id.trim().length === 0) {
            throw new Error('ID de usuario requerido');
        }
        // Verificar que el usuario existe antes de eliminar
        const usuario = await this.usuarioRepository.obtenerPorId(id);
        if (!usuario) {
            console.log(`❌ Usuario con ID '${id}' no encontrado para eliminar`);
            return false;
        }
        const eliminado = await this.usuarioRepository.eliminar(id);
        if (eliminado) {
            console.log(`🗑️ Usuario eliminado: ${usuario.nombreCompleto}`);
        }
        return eliminado;
    }
    /**
     * Autenticar usuario
     */
    async autenticarUsuario(username, password) {
        const usuario = await this.usuarioRepository.obtenerPorUsername(username);
        if (!usuario) {
            console.log(`❌ Usuario '${username}' no encontrado`);
            return null;
        }
        if (!usuario.estaActivo()) {
            console.log(`❌ Usuario '${username}' no está activo`);
            return null;
        }
        if (!usuario.verificarPassword(password)) {
            console.log(`❌ Contraseña incorrecta para usuario '${username}'`);
            return null;
        }
        console.log(`✅ Usuario autenticado: ${usuario.nombreCompleto}`);
        return usuario;
    }
    /**
     * Cambiar estado del usuario
     */
    async cambiarEstadoUsuario(id, nuevoEstado) {
        return await this.actualizarUsuario(id, { estado: nuevoEstado });
    }
    /**
     * Verificar disponibilidad de username
     */
    async verificarDisponibilidadUsername(username) {
        const existe = await this.usuarioRepository.existeUsername(username);
        return !existe;
    }
    /**
     * Verificar disponibilidad de email
     */
    async verificarDisponibilidadEmail(email) {
        const existe = await this.usuarioRepository.existeEmail(email);
        return !existe;
    }
    /**
     * Obtener usuarios por rol
     */
    async obtenerUsuariosPorRol(rol) {
        const todosUsuarios = await this.usuarioRepository.obtenerTodos();
        return todosUsuarios.filter(usuario => usuario.rol === rol);
    }
    // Métodos privados de validación
    validarDatosCreacion(datos) {
        // Validaciones básicas
        if (!datos.nombre || datos.nombre.trim().length < 2) {
            console.log('❌ Nombre debe tener al menos 2 caracteres');
            return false;
        }
        if (!datos.apellido || datos.apellido.trim().length < 2) {
            console.log('❌ Apellido debe tener al menos 2 caracteres');
            return false;
        }
        if (!Object.values(RolUsuario).includes(datos.rol)) {
            console.log('❌ Rol de usuario inválido');
            return false;
        }
        return true;
    }
    /**
     * Obtener estadísticas de usuarios
     */
    async obtenerEstadisticas() {
        const usuarios = await this.usuarioRepository.obtenerTodos();
        const estadisticas = {
            total: usuarios.length,
            porRol: {},
            activos: 0,
            inactivos: 0
        };
        usuarios.forEach(usuario => {
            // Contar por rol
            const rol = usuario.rol;
            estadisticas.porRol[rol] = (estadisticas.porRol[rol] || 0) + 1;
            // Contar por estado
            if (usuario.estaActivo()) {
                estadisticas.activos++;
            }
            else {
                estadisticas.inactivos++;
            }
        });
        return estadisticas;
    }
}
