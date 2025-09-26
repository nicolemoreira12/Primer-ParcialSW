import { Usuario, CrearUsuarioDTO, ActualizarUsuarioDTO, RolUsuario, EstadoUsuario } from '../../domain/usuario/usuario.entity.js';
import { IUsuarioRepository } from '../../domain/usuario/usuario.repository.js';
import { AsyncCallback, OperationResult } from '../../shared/types.js';

/**
 * Servicio de aplicación para Usuario
 * Orquesta las operaciones del dominio y aplica reglas de negocio
 * Implementa inyección de dependencias siguiendo principios SOLID
 */
export class UsuarioService {
    constructor(private readonly usuarioRepository: IUsuarioRepository) { }

    /**
     * Crear nuevo usuario - Usando Callbacks
     */
    crearUsuario(usuarioData: CrearUsuarioDTO, callback: AsyncCallback<Usuario>): void {
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
    async obtenerUsuarioPorId(id: string): Promise<Usuario | null> {
        if (!id || id.trim().length === 0) {
            throw new Error('ID de usuario requerido');
        }

        const usuario = await this.usuarioRepository.obtenerPorId(id);

        if (usuario) {
            console.log(`📋 Usuario encontrado: ${usuario.nombreCompleto}`);
        } else {
            console.log(`❌ Usuario con ID '${id}' no encontrado`);
        }

        return usuario;
    }

    /**
     * Obtener usuario por username - Usando Async/Await
     */
    async obtenerUsuarioPorUsername(username: string): Promise<Usuario | null> {
        if (!username || username.trim().length === 0) {
            throw new Error('Username requerido');
        }

        return await this.usuarioRepository.obtenerPorUsername(username);
    }

    /**
     * Obtener usuario por email - Usando Async/Await
     */
    async obtenerUsuarioPorEmail(email: string): Promise<Usuario | null> {
        if (!email || email.trim().length === 0) {
            throw new Error('Email requerido');
        }

        return await this.usuarioRepository.obtenerPorEmail(email);
    }

    /**
     * Listar todos los usuarios - Usando Async/Await
     */
    async listarUsuarios(): Promise<Usuario[]> {
        const usuarios = await this.usuarioRepository.obtenerTodos();
        console.log(`📋 Total usuarios encontrados: ${usuarios.length}`);
        return usuarios;
    }

    /**
     * Actualizar usuario - Usando Promises
     */
    async actualizarUsuario(id: string, datos: ActualizarUsuarioDTO): Promise<OperationResult<Usuario>> {
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
        } catch (error) {
            return {
                success: false,
                error: (error as Error).message,
                message: 'Error actualizando usuario'
            };
        }
    }

    /**
     * Eliminar usuario - Usando Async/Await
     */
    async eliminarUsuario(id: string): Promise<boolean> {
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
    async autenticarUsuario(username: string, password: string): Promise<Usuario | null> {
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
    async cambiarEstadoUsuario(id: string, nuevoEstado: EstadoUsuario): Promise<OperationResult<Usuario>> {
        return await this.actualizarUsuario(id, { estado: nuevoEstado });
    }

    /**
     * Verificar disponibilidad de username
     */
    async verificarDisponibilidadUsername(username: string): Promise<boolean> {
        const existe = await this.usuarioRepository.existeUsername(username);
        return !existe;
    }

    /**
     * Verificar disponibilidad de email
     */
    async verificarDisponibilidadEmail(email: string): Promise<boolean> {
        const existe = await this.usuarioRepository.existeEmail(email);
        return !existe;
    }

    /**
     * Obtener usuarios por rol
     */
    async obtenerUsuariosPorRol(rol: RolUsuario): Promise<Usuario[]> {
        const todosUsuarios = await this.usuarioRepository.obtenerTodos();
        return todosUsuarios.filter(usuario => usuario.rol === rol);
    }

    // Métodos privados de validación
    private validarDatosCreacion(datos: CrearUsuarioDTO): boolean {
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
    async obtenerEstadisticas(): Promise<{
        total: number;
        porRol: Record<string, number>;
        activos: number;
        inactivos: number;
    }> {
        const usuarios = await this.usuarioRepository.obtenerTodos();

        const estadisticas = {
            total: usuarios.length,
            porRol: {} as Record<string, number>,
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
            } else {
                estadisticas.inactivos++;
            }
        });

        return estadisticas;
    }
}