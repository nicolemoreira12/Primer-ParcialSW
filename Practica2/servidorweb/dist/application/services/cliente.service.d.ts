import { Cliente, CrearClienteDTO, ActualizarClienteDTO, EstadoCliente, CategoriaCliente } from '../../domain/cliente/cliente.entity.js';
import { IClienteRepository } from '../../domain/cliente/cliente.repository.js';
import { TipoDocumento } from '../../domain/cliente/value-objects.js';
import { AsyncCallback, OperationResult } from '../../shared/types.js';
/**
 * Servicio de aplicación para Cliente
 * Orquesta las operaciones del dominio y aplica reglas de negocio
 */
export declare class ClienteService {
    private readonly clienteRepository;
    constructor(clienteRepository: IClienteRepository);
    /**
     * Crear nuevo cliente - Usando Callbacks
     */
    crearCliente(clienteData: CrearClienteDTO, callback: AsyncCallback<Cliente>): void;
    /**
     * Obtener cliente por ID - Usando Async/Await
     */
    obtenerClientePorId(id: string): Promise<Cliente | null>;
    /**
     * Obtener cliente por email - Usando Async/Await
     */
    obtenerClientePorEmail(email: string): Promise<Cliente | null>;
    /**
     * Obtener cliente por documento - Usando Async/Await
     */
    obtenerClientePorDocumento(tipoDocumento: TipoDocumento, numeroDocumento: string): Promise<Cliente | null>;
    /**
     * Listar todos los clientes - Usando Async/Await
     */
    listarClientes(): Promise<Cliente[]>;
    /**
     * Obtener clientes por estado - Usando Async/Await
     */
    obtenerClientesPorEstado(estado: EstadoCliente): Promise<Cliente[]>;
    /**
     * Obtener clientes por categoría - Usando Async/Await
     */
    obtenerClientesPorCategoria(categoria: CategoriaCliente): Promise<Cliente[]>;
    /**
     * Actualizar cliente - Usando Promises
     */
    actualizarCliente(id: string, datos: ActualizarClienteDTO): Promise<OperationResult<Cliente>>;
    /**
     * Eliminar cliente - Usando Async/Await
     */
    eliminarCliente(id: string): Promise<boolean>;
    /**
     * Cambiar estado del cliente
     */
    cambiarEstadoCliente(id: string, nuevoEstado: EstadoCliente): Promise<OperationResult<Cliente>>;
    /**
     * Ascender categoría del cliente
     */
    ascenderCategoriaCliente(id: string): Promise<OperationResult<Cliente>>;
    /**
     * Verificar disponibilidad de email
     */
    verificarDisponibilidadEmail(email: string): Promise<boolean>;
    /**
     * Verificar disponibilidad de documento
     */
    verificarDisponibilidadDocumento(tipoDocumento: TipoDocumento, numeroDocumento: string): Promise<boolean>;
    /**
     * Obtener clientes mayores de edad
     */
    obtenerClientesMayoresDeEdad(): Promise<Cliente[]>;
    /**
     * Obtener clientes VIP (categoría ORO y PLATINO)
     */
    obtenerClientesVIP(): Promise<Cliente[]>;
    private validarDatosCreacion;
    /**
     * Obtener estadísticas de clientes
     */
    obtenerEstadisticas(): Promise<{
        total: number;
        porEstado: Record<string, number>;
        porCategoria: Record<string, number>;
        edadPromedio: number;
        mayoresDeEdad: number;
        vip: number;
    }>;
}
