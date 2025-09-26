import { Usuario, CrearUsuarioDTO, ActualizarUsuarioDTO } from './usuario.entity.js';
import { AsyncCallback, OperationResult } from '../../shared/types.js';
/**
 * Interfaz del repositorio de Usuario siguiendo el patrón Repository
 * Abstrae el acceso a datos del dominio
 */
export interface IUsuarioRepository {
    crear(usuarioData: CrearUsuarioDTO, callback: AsyncCallback<Usuario>): void;
    obtenerPorId(id: string): Promise<Usuario | null>;
    obtenerPorUsername(username: string): Promise<Usuario | null>;
    obtenerPorEmail(email: string): Promise<Usuario | null>;
    obtenerTodos(): Promise<Usuario[]>;
    actualizar(id: string, datos: ActualizarUsuarioDTO): Promise<OperationResult<Usuario>>;
    eliminar(id: string): Promise<boolean>;
    existeUsername(username: string): Promise<boolean>;
    existeEmail(email: string): Promise<boolean>;
}
