import { Usuario, CrearUsuarioDTO, ActualizarUsuarioDTO, RolUsuario, EstadoUsuario } from '../../domain/usuario/usuario.entity.js';
import { IUsuarioRepository } from '../../domain/usuario/usuario.repository.js';
import { AsyncCallback, OperationResult } from '../../shared/types.js';
/**
 * Servicio de aplicación para Usuario
 * Orquesta las operaciones del dominio y aplica reglas de negocio
 * Implementa inyección de dependencias siguiendo principios SOLID
 */
export declare class UsuarioService {
    private readonly usuarioRepository;
    constructor(usuarioRepository: IUsuarioRepository);
    /**
     * Crear nuevo usuario - Usando Callbacks
     */
    crearUsuario(usuarioData: CrearUsuarioDTO, callback: AsyncCallback<Usuario>): void;
    /**
     * Obtener usuario por ID - Usando Async/Await
     */
    obtenerUsuarioPorId(id: string): Promise<Usuario | null>;
    /**
     * Obtener usuario por username - Usando Async/Await
     */
    obtenerUsuarioPorUsername(username: string): Promise<Usuario | null>;
    /**
     * Obtener usuario por email - Usando Async/Await
     */
    obtenerUsuarioPorEmail(email: string): Promise<Usuario | null>;
    /**
     * Listar todos los usuarios - Usando Async/Await
     */
    listarUsuarios(): Promise<Usuario[]>;
    /**
     * Actualizar usuario - Usando Promises
     */
    actualizarUsuario(id: string, datos: ActualizarUsuarioDTO): Promise<OperationResult<Usuario>>;
    /**
     * Eliminar usuario - Usando Async/Await
     */
    eliminarUsuario(id: string): Promise<boolean>;
    /**
     * Autenticar usuario
     */
    autenticarUsuario(username: string, password: string): Promise<Usuario | null>;
    /**
     * Cambiar estado del usuario
     */
    cambiarEstadoUsuario(id: string, nuevoEstado: EstadoUsuario): Promise<OperationResult<Usuario>>;
    /**
     * Verificar disponibilidad de username
     */
    verificarDisponibilidadUsername(username: string): Promise<boolean>;
    /**
     * Verificar disponibilidad de email
     */
    verificarDisponibilidadEmail(email: string): Promise<boolean>;
    /**
     * Obtener usuarios por rol
     */
    obtenerUsuariosPorRol(rol: RolUsuario): Promise<Usuario[]>;
    private validarDatosCreacion;
    /**
     * Obtener estadísticas de usuarios
     */
    obtenerEstadisticas(): Promise<{
        total: number;
        porRol: Record<string, number>;
        activos: number;
        inactivos: number;
    }>;
}
