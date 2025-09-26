import { Cliente, CrearClienteDTO, ActualizarClienteDTO, EstadoCliente, CategoriaCliente } from '../../domain/cliente/cliente.entity.js';
import { IClienteRepository } from '../../domain/cliente/cliente.repository.js';
import { TipoDocumento } from '../../domain/cliente/value-objects.js';
import { AsyncCallback, OperationResult } from '../../shared/types.js';
/**
 * Implementación en memoria del repositorio de Cliente
 * Aplica los paradigmas asíncronos requeridos:
 * - CREATE: Callbacks
 * - READ: Async/Await
 * - UPDATE: Promises
 * - DELETE: Async/Await
 */
export declare class ClienteMemoryRepository implements IClienteRepository {
    private clientes;
    private readonly LATENCIA_RED;
    constructor();
    /**
     * CREATE - Implementado con CALLBACKS
     */
    crear(clienteData: CrearClienteDTO, callback: AsyncCallback<Cliente>): void;
    /**
     * READ - Implementado con ASYNC/AWAIT
     */
    obtenerPorId(id: string): Promise<Cliente | null>;
    obtenerPorEmail(email: string): Promise<Cliente | null>;
    obtenerPorDocumento(tipoDocumento: TipoDocumento, numeroDocumento: string): Promise<Cliente | null>;
    obtenerTodos(): Promise<Cliente[]>;
    obtenerPorEstado(estado: EstadoCliente): Promise<Cliente[]>;
    obtenerPorCategoria(categoria: CategoriaCliente): Promise<Cliente[]>;
    obtenerPorUsuarioId(usuarioId: string): Promise<Cliente | null>;
    /**
     * UPDATE - Implementado con PROMISES
     */
    actualizar(id: string, datos: ActualizarClienteDTO): Promise<OperationResult<Cliente>>;
    /**
     * DELETE - Implementado con ASYNC/AWAIT
     */
    eliminar(id: string): Promise<boolean>;
    existeEmail(email: string): Promise<boolean>;
    existeDocumento(tipoDocumento: TipoDocumento, numeroDocumento: string): Promise<boolean>;
    contarPorCategoria(categoria: CategoriaCliente): Promise<number>;
    private existeEmailSync;
    private existeDocumentoSync;
    private calcularEdad;
    private simularLatencia;
    /**
     * Inicializar datos de prueba optimizados
     */
    private inicializarDatosPrueba;
    obtenerEstadisticas(): {
        total: number;
        porEstado: Record<string, number>;
        porCategoria: Record<string, number>;
        edadPromedio: number;
    };
}
