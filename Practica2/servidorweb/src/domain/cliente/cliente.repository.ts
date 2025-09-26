import { Cliente, CrearClienteDTO, ActualizarClienteDTO, CategoriaCliente, EstadoCliente } from './cliente.entity.js';
import { AsyncCallback, OperationResult } from '../../shared/types.js';
import { TipoDocumento } from './value-objects.js';

/**
 * Interfaz del repositorio de Cliente siguiendo el patrón Repository
 */
export interface IClienteRepository {
    // CREATE - Usando Callbacks
    crear(clienteData: CrearClienteDTO, callback: AsyncCallback<Cliente>): void;

    // READ - Usando Async/Await
    obtenerPorId(id: string): Promise<Cliente | null>;
    obtenerPorEmail(email: string): Promise<Cliente | null>;
    obtenerPorDocumento(tipoDocumento: TipoDocumento, numeroDocumento: string): Promise<Cliente | null>;
    obtenerTodos(): Promise<Cliente[]>;
    obtenerPorEstado(estado: EstadoCliente): Promise<Cliente[]>;
    obtenerPorCategoria(categoria: CategoriaCliente): Promise<Cliente[]>;
    obtenerPorUsuarioId(usuarioId: string): Promise<Cliente | null>;

    // UPDATE - Usando Promises
    actualizar(id: string, datos: ActualizarClienteDTO): Promise<OperationResult<Cliente>>;

    // DELETE - Usando Async/Await
    eliminar(id: string): Promise<boolean>;

    // Métodos auxiliares
    existeEmail(email: string): Promise<boolean>;
    existeDocumento(tipoDocumento: TipoDocumento, numeroDocumento: string): Promise<boolean>;
    contarPorCategoria(categoria: CategoriaCliente): Promise<number>;
}