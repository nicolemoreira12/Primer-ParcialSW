import { Cliente, CrearClienteDTO, ActualizarClienteDTO, EstadoCliente, CategoriaCliente } from '../../domain/cliente/cliente.entity.js';
import { IClienteRepository } from '../../domain/cliente/cliente.repository.js';
import { Email } from '../../domain/usuario/value-objects.js';
import { NumeroDocumento, TipoDocumento, Direccion } from '../../domain/cliente/value-objects.js';
import { AsyncCallback, OperationResult, IdGenerator } from '../../shared/types.js';

/**
 * Implementación en memoria del repositorio de Cliente
 * Aplica los paradigmas asíncronos requeridos:
 * - CREATE: Callbacks
 * - READ: Async/Await
 * - UPDATE: Promises  
 * - DELETE: Async/Await
 */
export class ClienteMemoryRepository implements IClienteRepository {
    private clientes: Map<string, Cliente> = new Map();
    private readonly LATENCIA_RED = 120; // Simular latencia de red

    constructor() {
        this.inicializarDatosPrueba();
    }

    /**
     * CREATE - Implementado con CALLBACKS
     */
    crear(clienteData: CrearClienteDTO, callback: AsyncCallback<Cliente>): void {
        // Simular latencia de red
        setTimeout(() => {
            try {
                // Validaciones de negocio
                if (this.existeEmailSync(clienteData.email)) {
                    const error = new Error(`Email '${clienteData.email}' ya existe`);
                    return callback(error);
                }

                if (this.existeDocumentoSync(clienteData.tipoDocumento, clienteData.numeroDocumento)) {
                    const error = new Error(`Documento ${clienteData.tipoDocumento} '${clienteData.numeroDocumento}' ya existe`);
                    return callback(error);
                }

                // Validar edad mínima
                const edad = this.calcularEdad(clienteData.fechaNacimiento);
                if (edad < 18) {
                    const error = new Error('El cliente debe ser mayor de edad (18 años)');
                    return callback(error);
                }

                // Crear value objects
                const email = new Email(clienteData.email);
                const numeroDocumento = new NumeroDocumento(clienteData.numeroDocumento, clienteData.tipoDocumento);
                const direccion = new Direccion(
                    clienteData.direccion.calle,
                    clienteData.direccion.ciudad,
                    clienteData.direccion.departamento,
                    clienteData.direccion.codigoPostal
                );

                // Crear entidad
                const cliente = new Cliente(
                    IdGenerator.generate(),
                    clienteData.nombre,
                    clienteData.apellido,
                    email,
                    clienteData.telefono,
                    clienteData.tipoDocumento,
                    numeroDocumento,
                    clienteData.fechaNacimiento,
                    direccion,
                    clienteData.usuarioId
                );

                // Persistir
                this.clientes.set(cliente.id, cliente);

                // Callback de éxito
                callback(null, cliente);
            } catch (error) {
                callback(error as Error);
            }
        }, this.LATENCIA_RED);
    }

    /**
     * READ - Implementado con ASYNC/AWAIT
     */
    async obtenerPorId(id: string): Promise<Cliente | null> {
        await this.simularLatencia();
        return this.clientes.get(id) || null;
    }

    async obtenerPorEmail(email: string): Promise<Cliente | null> {
        await this.simularLatencia();

        for (const cliente of this.clientes.values()) {
            if (cliente.email.toString() === email.toLowerCase()) {
                return cliente;
            }
        }
        return null;
    }

    async obtenerPorDocumento(tipoDocumento: TipoDocumento, numeroDocumento: string): Promise<Cliente | null> {
        await this.simularLatencia();

        const numeroLimpio = numeroDocumento.replace(/\D/g, '');
        for (const cliente of this.clientes.values()) {
            if (cliente.tipoDocumento === tipoDocumento &&
                cliente.numeroDocumento.toString() === numeroLimpio) {
                return cliente;
            }
        }
        return null;
    }

    async obtenerTodos(): Promise<Cliente[]> {
        await this.simularLatencia();
        return Array.from(this.clientes.values());
    }

    async obtenerPorEstado(estado: EstadoCliente): Promise<Cliente[]> {
        await this.simularLatencia();

        return Array.from(this.clientes.values())
            .filter(cliente => cliente.estado === estado);
    }

    async obtenerPorCategoria(categoria: CategoriaCliente): Promise<Cliente[]> {
        await this.simularLatencia();

        return Array.from(this.clientes.values())
            .filter(cliente => cliente.categoria === categoria);
    }

    async obtenerPorUsuarioId(usuarioId: string): Promise<Cliente | null> {
        await this.simularLatencia();

        for (const cliente of this.clientes.values()) {
            if (cliente.usuarioId === usuarioId) {
                return cliente;
            }
        }
        return null;
    }

    /**
     * UPDATE - Implementado con PROMISES
     */
    actualizar(id: string, datos: ActualizarClienteDTO): Promise<OperationResult<Cliente>> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const cliente = this.clientes.get(id);

                    if (!cliente) {
                        resolve({
                            success: false,
                            error: `Cliente con ID '${id}' no encontrado`,
                            message: 'Cliente no existe'
                        });
                        return;
                    }

                    // Aplicar actualizaciones
                    cliente.actualizarInformacion(datos);

                    // Persistir cambios
                    this.clientes.set(id, cliente);

                    resolve({
                        success: true,
                        data: cliente,
                        message: 'Cliente actualizado exitosamente'
                    });
                } catch (error) {
                    reject(error);
                }
            }, this.LATENCIA_RED);
        });
    }

    /**
     * DELETE - Implementado con ASYNC/AWAIT
     */
    async eliminar(id: string): Promise<boolean> {
        await this.simularLatencia();

        const existia = this.clientes.has(id);
        if (existia) {
            this.clientes.delete(id);
        }

        return existia;
    }

    // Métodos auxiliares
    async existeEmail(email: string): Promise<boolean> {
        await this.simularLatencia();
        return this.existeEmailSync(email);
    }

    async existeDocumento(tipoDocumento: TipoDocumento, numeroDocumento: string): Promise<boolean> {
        await this.simularLatencia();
        return this.existeDocumentoSync(tipoDocumento, numeroDocumento);
    }

    async contarPorCategoria(categoria: CategoriaCliente): Promise<number> {
        await this.simularLatencia();

        return Array.from(this.clientes.values())
            .filter(cliente => cliente.categoria === categoria)
            .length;
    }

    // Métodos síncronos para validaciones internas
    private existeEmailSync(email: string): boolean {
        for (const cliente of this.clientes.values()) {
            if (cliente.email.toString() === email.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    private existeDocumentoSync(tipoDocumento: TipoDocumento, numeroDocumento: string): boolean {
        const numeroLimpio = numeroDocumento.replace(/\D/g, '');
        for (const cliente of this.clientes.values()) {
            if (cliente.tipoDocumento === tipoDocumento &&
                cliente.numeroDocumento.toString() === numeroLimpio) {
                return true;
            }
        }
        return false;
    }

    private calcularEdad(fechaNacimiento: Date): number {
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mesActual = hoy.getMonth();
        const diaActual = hoy.getDate();
        const mesNacimiento = fechaNacimiento.getMonth();
        const diaNacimiento = fechaNacimiento.getDate();

        if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
            edad--;
        }
        return edad;
    }

    private async simularLatencia(): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, this.LATENCIA_RED));
    }

    /**
     * Inicializar datos de prueba optimizados
     */
    private inicializarDatosPrueba(): void {
        try {
            // Cliente Premium
            const clientePremium = new Cliente(
                'cli-001',
                'Ana',
                'Rodríguez',
                new Email('ana.rodriguez@email.com'),
                '+57-311-2468135',
                TipoDocumento.CEDULA,
                new NumeroDocumento('12345678', TipoDocumento.CEDULA),
                new Date('1990-05-15'),
                new Direccion('Calle 123 #45-67', 'Bogotá', 'Cundinamarca', '110111'),
                'cli-001', // usuarioId
                EstadoCliente.ACTIVO,
                CategoriaCliente.ORO
            );

            // Cliente Regular
            const clienteRegular = new Cliente(
                'cli-002',
                'Carlos',
                'Méndez',
                new Email('carlos.mendez@gmail.com'),
                '+57-320-9753186',
                TipoDocumento.CEDULA,
                new NumeroDocumento('87654321', TipoDocumento.CEDULA),
                new Date('1985-12-03'),
                new Direccion('Carrera 50 #30-25', 'Medellín', 'Antioquia', '050001'),
                undefined, // Sin usuario del sistema
                EstadoCliente.ACTIVO,
                CategoriaCliente.PLATA
            );

            // Cliente Internacional
            const clienteIntl = new Cliente(
                'cli-003',
                'Sophia',
                'Johnson',
                new Email('sophia.johnson@international.com'),
                '+1-555-0123456',
                TipoDocumento.PASSPORT,
                new NumeroDocumento('AB1234567', TipoDocumento.PASSPORT),
                new Date('1992-08-20'),
                new Direccion('International Street 456', 'Cartagena', 'Bolívar'),
                undefined,
                EstadoCliente.ACTIVO,
                CategoriaCliente.PLATINO
            );

            this.clientes.set(clientePremium.id, clientePremium);
            this.clientes.set(clienteRegular.id, clienteRegular);
            this.clientes.set(clienteIntl.id, clienteIntl);

            console.log('✅ Datos de prueba de Cliente inicializados');
        } catch (error) {
            console.error('❌ Error inicializando datos de Cliente:', error);
        }
    }

    // Método para obtener estadísticas
    obtenerEstadisticas(): {
        total: number;
        porEstado: Record<string, number>;
        porCategoria: Record<string, number>;
        edadPromedio: number;
    } {
        const clientes = Array.from(this.clientes.values());
        const porEstado: Record<string, number> = {};
        const porCategoria: Record<string, number> = {};

        let sumaEdades = 0;

        clientes.forEach(cliente => {
            // Estadísticas por estado
            const estado = cliente.estado;
            porEstado[estado] = (porEstado[estado] || 0) + 1;

            // Estadísticas por categoría
            const categoria = cliente.categoria;
            porCategoria[categoria] = (porCategoria[categoria] || 0) + 1;

            // Suma de edades
            sumaEdades += cliente.edad;
        });

        return {
            total: clientes.length,
            porEstado,
            porCategoria,
            edadPromedio: clientes.length > 0 ? Math.round(sumaEdades / clientes.length) : 0
        };
    }
}