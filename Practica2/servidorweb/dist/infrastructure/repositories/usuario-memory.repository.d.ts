import { Usuario, CrearUsuarioDTO, ActualizarUsuarioDTO } from '../../domain/usuario/usuario.entity.js';
import { IUsuarioRepository } from '../../domain/usuario/usuario.repository.js';
import { AsyncCallback, OperationResult } from '../../shared/types.js';
/**
 * Implementación en memoria del repositorio de Usuario
 * Aplica los paradigmas asíncronos requeridos:
 * - CREATE: Callbacks
 * - READ: Async/Await
 * - UPDATE: Promises
 * - DELETE: Async/Await
 */
export declare class UsuarioMemoryRepository implements IUsuarioRepository {
    private usuarios;
    private readonly LATENCIA_RED;
    constructor();
    /**
     * CREATE - Implementado con CALLBACKS
     */
    crear(usuarioData: CrearUsuarioDTO, callback: AsyncCallback<Usuario>): void;
    /**
     * READ - Implementado con ASYNC/AWAIT
     */
    obtenerPorId(id: string): Promise<Usuario | null>;
    obtenerPorUsername(username: string): Promise<Usuario | null>;
    obtenerPorEmail(email: string): Promise<Usuario | null>;
    obtenerTodos(): Promise<Usuario[]>;
    /**
     * UPDATE - Implementado con PROMISES
     */
    actualizar(id: string, datos: ActualizarUsuarioDTO): Promise<OperationResult<Usuario>>;
    /**
     * DELETE - Implementado con ASYNC/AWAIT
     */
    eliminar(id: string): Promise<boolean>;
    existeUsername(username: string): Promise<boolean>;
    existeEmail(email: string): Promise<boolean>;
    private existeUsernameSync;
    private existeEmailSync;
    private simularLatencia;
    /**
     * Inicializar datos de prueba optimizados
     */
    private inicializarDatosPrueba;
    obtenerEstadisticas(): {
        total: number;
        porRol: Record<string, number>;
    };
}
