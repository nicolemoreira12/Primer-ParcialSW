import { Cliente, CrearClienteDTO, ActualizarClienteDTO, EstadoCliente, CategoriaCliente } from '../../domain/cliente/cliente.entity.js';
import { IClienteRepository } from '../../domain/cliente/cliente.repository.js';
import { TipoDocumento } from '../../domain/cliente/value-objects.js';
import { AsyncCallback, OperationResult } from '../../shared/types.js';

/**
 * Servicio de aplicación para Cliente
 * Orquesta las operaciones del dominio y aplica reglas de negocio
 */
export class ClienteService {
    constructor(private readonly clienteRepository: IClienteRepository) { }

    /**
     * Crear nuevo cliente - Usando Callbacks
     */
    crearCliente(clienteData: CrearClienteDTO, callback: AsyncCallback<Cliente>): void {
        // Validaciones adicionales de negocio
        if (!this.validarDatosCreacion(clienteData)) {
            const error = new Error('Datos de cliente inválidos');
            return callback(error);
        }

        this.clienteRepository.crear(clienteData, (error, cliente) => {
            if (error) {
                return callback(error);
            }

            console.log(`✅ Cliente creado: ${cliente?.nombreCompleto} (${cliente?.tipoDocumento}: ${cliente?.numeroDocumento.toString()})`);
            callback(null, cliente);
        });
    }

    /**
     * Obtener cliente por ID - Usando Async/Await  
     */
    async obtenerClientePorId(id: string): Promise<Cliente | null> {
        if (!id || id.trim().length === 0) {
            throw new Error('ID de cliente requerido');
        }

        const cliente = await this.clienteRepository.obtenerPorId(id);

        if (cliente) {
            console.log(`📋 Cliente encontrado: ${cliente.nombreCompleto} (${cliente.edad} años)`);
        } else {
            console.log(`❌ Cliente con ID '${id}' no encontrado`);
        }

        return cliente;
    }

    /**
     * Obtener cliente por email - Usando Async/Await
     */
    async obtenerClientePorEmail(email: string): Promise<Cliente | null> {
        if (!email || email.trim().length === 0) {
            throw new Error('Email requerido');
        }

        return await this.clienteRepository.obtenerPorEmail(email);
    }

    /**
     * Obtener cliente por documento - Usando Async/Await
     */
    async obtenerClientePorDocumento(tipoDocumento: TipoDocumento, numeroDocumento: string): Promise<Cliente | null> {
        if (!numeroDocumento || numeroDocumento.trim().length === 0) {
            throw new Error('Número de documento requerido');
        }

        return await this.clienteRepository.obtenerPorDocumento(tipoDocumento, numeroDocumento);
    }

    /**
     * Listar todos los clientes - Usando Async/Await
     */
    async listarClientes(): Promise<Cliente[]> {
        const clientes = await this.clienteRepository.obtenerTodos();
        console.log(`📋 Total clientes encontrados: ${clientes.length}`);
        return clientes;
    }

    /**
     * Obtener clientes por estado - Usando Async/Await
     */
    async obtenerClientesPorEstado(estado: EstadoCliente): Promise<Cliente[]> {
        const clientes = await this.clienteRepository.obtenerPorEstado(estado);
        console.log(`📋 Clientes con estado ${estado}: ${clientes.length}`);
        return clientes;
    }

    /**
     * Obtener clientes por categoría - Usando Async/Await
     */
    async obtenerClientesPorCategoria(categoria: CategoriaCliente): Promise<Cliente[]> {
        const clientes = await this.clienteRepository.obtenerPorCategoria(categoria);
        console.log(`📋 Clientes categoría ${categoria}: ${clientes.length}`);
        return clientes;
    }

    /**
     * Actualizar cliente - Usando Promises
     */
    async actualizarCliente(id: string, datos: ActualizarClienteDTO): Promise<OperationResult<Cliente>> {
        if (!id || id.trim().length === 0) {
            return {
                success: false,
                error: 'ID de cliente requerido',
                message: 'Parámetros inválidos'
            };
        }

        try {
            const resultado = await this.clienteRepository.actualizar(id, datos);

            if (resultado.success && resultado.data) {
                console.log(`✏️ Cliente actualizado: ${resultado.data.nombreCompleto}`);
            }

            return resultado;
        } catch (error) {
            return {
                success: false,
                error: (error as Error).message,
                message: 'Error actualizando cliente'
            };
        }
    }

    /**
     * Eliminar cliente - Usando Async/Await
     */
    async eliminarCliente(id: string): Promise<boolean> {
        if (!id || id.trim().length === 0) {
            throw new Error('ID de cliente requerido');
        }

        // Verificar que el cliente existe antes de eliminar
        const cliente = await this.clienteRepository.obtenerPorId(id);
        if (!cliente) {
            console.log(`❌ Cliente con ID '${id}' no encontrado para eliminar`);
            return false;
        }

        const eliminado = await this.clienteRepository.eliminar(id);

        if (eliminado) {
            console.log(`🗑️ Cliente eliminado: ${cliente.nombreCompleto}`);
        }

        return eliminado;
    }

    /**
     * Cambiar estado del cliente
     */
    async cambiarEstadoCliente(id: string, nuevoEstado: EstadoCliente): Promise<OperationResult<Cliente>> {
        return await this.actualizarCliente(id, { estado: nuevoEstado });
    }

    /**
     * Ascender categoría del cliente
     */
    async ascenderCategoriaCliente(id: string): Promise<OperationResult<Cliente>> {
        const cliente = await this.clienteRepository.obtenerPorId(id);

        if (!cliente) {
            return {
                success: false,
                error: `Cliente con ID '${id}' no encontrado`,
                message: 'Cliente no existe'
            };
        }

        const ascendio = cliente.ascenderCategoria();

        if (!ascendio) {
            return {
                success: false,
                error: 'Cliente ya está en la categoría más alta',
                message: 'No se puede ascender más'
            };
        }

        // Actualizar en repositorio
        return await this.actualizarCliente(id, { categoria: cliente.categoria });
    }

    /**
     * Verificar disponibilidad de email
     */
    async verificarDisponibilidadEmail(email: string): Promise<boolean> {
        const existe = await this.clienteRepository.existeEmail(email);
        return !existe;
    }

    /**
     * Verificar disponibilidad de documento
     */
    async verificarDisponibilidadDocumento(tipoDocumento: TipoDocumento, numeroDocumento: string): Promise<boolean> {
        const existe = await this.clienteRepository.existeDocumento(tipoDocumento, numeroDocumento);
        return !existe;
    }

    /**
     * Obtener clientes mayores de edad
     */
    async obtenerClientesMayoresDeEdad(): Promise<Cliente[]> {
        const todosClientes = await this.clienteRepository.obtenerTodos();
        return todosClientes.filter(cliente => cliente.esMayorDeEdad());
    }

    /**
     * Obtener clientes VIP (categoría ORO y PLATINO)
     */
    async obtenerClientesVIP(): Promise<Cliente[]> {
        const todosClientes = await this.clienteRepository.obtenerTodos();
        return todosClientes.filter(cliente =>
            cliente.categoria === CategoriaCliente.ORO ||
            cliente.categoria === CategoriaCliente.PLATINO
        );
    }

    // Métodos privados de validación
    private validarDatosCreacion(datos: CrearClienteDTO): boolean {
        // Validaciones básicas
        if (!datos.nombre || datos.nombre.trim().length < 2) {
            console.log('❌ Nombre debe tener al menos 2 caracteres');
            return false;
        }

        if (!datos.apellido || datos.apellido.trim().length < 2) {
            console.log('❌ Apellido debe tener al menos 2 caracteres');
            return false;
        }

        if (!datos.telefono || datos.telefono.trim().length < 10) {
            console.log('❌ Teléfono debe tener al menos 10 caracteres');
            return false;
        }

        if (!Object.values(TipoDocumento).includes(datos.tipoDocumento)) {
            console.log('❌ Tipo de documento inválido');
            return false;
        }

        // Validar dirección
        if (!datos.direccion.calle || !datos.direccion.ciudad || !datos.direccion.departamento) {
            console.log('❌ Dirección incompleta');
            return false;
        }

        return true;
    }

    /**
     * Obtener estadísticas de clientes
     */
    async obtenerEstadisticas(): Promise<{
        total: number;
        porEstado: Record<string, number>;
        porCategoria: Record<string, number>;
        edadPromedio: number;
        mayoresDeEdad: number;
        vip: number;
    }> {
        const clientes = await this.clienteRepository.obtenerTodos();

        const estadisticas = {
            total: clientes.length,
            porEstado: {} as Record<string, number>,
            porCategoria: {} as Record<string, number>,
            edadPromedio: 0,
            mayoresDeEdad: 0,
            vip: 0
        };

        let sumaEdades = 0;

        clientes.forEach(cliente => {
            // Contar por estado
            const estado = cliente.estado;
            estadisticas.porEstado[estado] = (estadisticas.porEstado[estado] || 0) + 1;

            // Contar por categoría
            const categoria = cliente.categoria;
            estadisticas.porCategoria[categoria] = (estadisticas.porCategoria[categoria] || 0) + 1;

            // Calcular edad promedio
            sumaEdades += cliente.edad;

            // Contar mayores de edad
            if (cliente.esMayorDeEdad()) {
                estadisticas.mayoresDeEdad++;
            }

            // Contar VIP
            if (categoria === CategoriaCliente.ORO || categoria === CategoriaCliente.PLATINO) {
                estadisticas.vip++;
            }
        });

        estadisticas.edadPromedio = clientes.length > 0 ?
            Math.round(sumaEdades / clientes.length) : 0;

        return estadisticas;
    }
}