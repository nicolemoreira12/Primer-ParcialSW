import chalk from 'chalk';
import { UsuarioMemoryRepository } from './infrastructure/repositories/usuario-memory.repository.js';
import { ClienteMemoryRepository } from './infrastructure/repositories/cliente-memory.repository.js';
import { EmprendedorMemoryRepository } from './infrastructure/repositories/emprendedor-memory.repository.js';
import { UsuarioService } from './application/services/usuario.service.js';
import { ClienteService } from './application/services/cliente.service.js';
import { EmprendedorService } from './application/services/emprendedor.service.js';
import { RolUsuario, EstadoUsuario } from './domain/usuario/usuario.entity.js';
import { EstadoCliente, CategoriaCliente } from './domain/cliente/cliente.entity.js';
import { TipoDocumento } from './domain/cliente/value-objects.js';
import { SectorEmprendimiento, NivelExperiencia, EstadoEmprendedor } from './domain/emprendedor/emprendedor.entity.js';
import { PlataformaRedSocial } from './domain/emprendedor/value-objects.js';

/**
 * Archivo Main Centralizado para Pruebas Funcionales
 * 
 * Demuestra el uso de todos los paradigmas asíncronos:
 * - CREATE: Callbacks
 * - READ: Async/Await  
 * - UPDATE: Promises
 * - DELETE: Async/Await
 * 
 * Arquitectura aplicada:
 * - Patrón Repository
 * - Inyección de Dependencias
 * - Principios SOLID
 * - Domain-Driven Design
 */

class EmprendimientoTestRunner {
    private usuarioService: UsuarioService;
    private clienteService: ClienteService;
    private emprendedorService: EmprendedorService;

    constructor() {
        console.log(chalk.blue.bold('\n🚀 INICIALIZANDO SISTEMA DE EMPRENDIMIENTO'));
        console.log(chalk.gray('Arquitectura Hexagonal • Paradigmas Asíncronos • TypeScript'));
        console.log(chalk.gray('='.repeat(60)));

        // Inyección de dependencias
        const usuarioRepo = new UsuarioMemoryRepository();
        const clienteRepo = new ClienteMemoryRepository();
        const emprendedorRepo = new EmprendedorMemoryRepository();

        this.usuarioService = new UsuarioService(usuarioRepo);
        this.clienteService = new ClienteService(clienteRepo);
        this.emprendedorService = new EmprendedorService(emprendedorRepo);
    }

    /**
     * Ejecutar todas las pruebas
     */
    async ejecutarPruebas(): Promise<void> {
        try {
            console.log(chalk.yellow.bold('\n📋 INICIANDO PRUEBAS FUNCIONALES\n'));

            // Mostrar datos iniciales
            await this.mostrarEstadisticasIniciales();

            // Pruebas de Usuario
            await this.probarUsuarios();

            // Pruebas de Cliente  
            await this.probarClientes();

            // Pruebas de Emprendedor
            await this.probarEmprendedores();

            // Estadísticas finales
            await this.mostrarEstadisticasFinales();

            console.log(chalk.green.bold('\n✅ TODAS LAS PRUEBAS COMPLETADAS EXITOSAMENTE'));

        } catch (error) {
            console.error(chalk.red.bold('\n❌ ERROR EN LAS PRUEBAS:'), error);
        }
    }

    /**
     * Mostrar estadísticas iniciales del sistema
     */
    private async mostrarEstadisticasIniciales(): Promise<void> {
        console.log(chalk.cyan.bold('\n📊 ESTADÍSTICAS INICIALES DEL SISTEMA'));
        console.log(chalk.cyan('-'.repeat(40)));

        const statsUsuarios = await this.usuarioService.obtenerEstadisticas();
        const statsClientes = await this.clienteService.obtenerEstadisticas();
        const statsEmprendedores = await this.emprendedorService.obtenerEstadisticas();

        console.log(chalk.white(`👥 Usuarios: ${statsUsuarios.total} (Activos: ${statsUsuarios.activos})`));
        console.log(chalk.white(`🏪 Clientes: ${statsClientes.total} (Edad promedio: ${statsClientes.edadPromedio} años)`));
        console.log(chalk.white(`🚀 Emprendedores: ${statsEmprendedores.total} (Verificados: ${statsEmprendedores.verificados})`));
    }

    /**
     * PRUEBAS DE USUARIO
     */
    private async probarUsuarios(): Promise<void> {
        console.log(chalk.magenta.bold('\n👥 PROBANDO OPERACIONES DE USUARIO'));
        console.log(chalk.magenta('='.repeat(40)));

        // CREATE - Usando Callbacks ⚡
        console.log(chalk.yellow('\n📝 CREATE (Callbacks) - Creando nuevo usuario...'));
        await this.crearUsuarioConCallback();

        // READ - Usando Async/Await ⚡
        console.log(chalk.yellow('\n📋 READ (Async/Await) - Consultando usuarios...'));
        await this.consultarUsuarios();

        // UPDATE - Usando Promises ⚡
        console.log(chalk.yellow('\n✏️ UPDATE (Promises) - Actualizando usuario...'));
        await this.actualizarUsuarioConPromise();

        // DELETE - Usando Async/Await ⚡
        console.log(chalk.yellow('\n🗑️ DELETE (Async/Await) - Eliminando usuario...'));
        await this.eliminarUsuario();
    }

    /**
     * PRUEBAS DE CLIENTE
     */
    private async probarClientes(): Promise<void> {
        console.log(chalk.blue.bold('\n🏪 PROBANDO OPERACIONES DE CLIENTE'));
        console.log(chalk.blue('='.repeat(40)));

        // CREATE - Usando Callbacks ⚡
        console.log(chalk.yellow('\n📝 CREATE (Callbacks) - Creando nuevo cliente...'));
        await this.crearClienteConCallback();

        // READ - Usando Async/Await ⚡
        console.log(chalk.yellow('\n📋 READ (Async/Await) - Consultando clientes...'));
        await this.consultarClientes();

        // UPDATE - Usando Promises ⚡
        console.log(chalk.yellow('\n✏️ UPDATE (Promises) - Actualizando cliente...'));
        await this.actualizarClienteConPromise();

        // DELETE - Usando Async/Await ⚡
        console.log(chalk.yellow('\n🗑️ DELETE (Async/Await) - Eliminando cliente...'));
        await this.eliminarCliente();
    }

    /**
     * PRUEBAS DE EMPRENDEDOR
     */
    private async probarEmprendedores(): Promise<void> {
        console.log(chalk.green.bold('\n🚀 PROBANDO OPERACIONES DE EMPRENDEDOR'));
        console.log(chalk.green('='.repeat(40)));

        // CREATE - Usando Callbacks ⚡
        console.log(chalk.yellow('\n📝 CREATE (Callbacks) - Creando nuevo emprendedor...'));
        await this.crearEmprendedorConCallback();

        // READ - Usando Async/Await ⚡
        console.log(chalk.yellow('\n📋 READ (Async/Await) - Consultando emprendedores...'));
        await this.consultarEmprendedores();

        // UPDATE - Usando Promises ⚡
        console.log(chalk.yellow('\n✏️ UPDATE (Promises) - Actualizando emprendedor...'));
        await this.actualizarEmprendedorConPromise();

        // DELETE - Usando Async/Await ⚡
        console.log(chalk.yellow('\n🗑️ DELETE (Async/Await) - Eliminando emprendedor...'));
        await this.eliminarEmprendedor();
    }

    // =================== USUARIO OPERATIONS ===================

    /**
     * CREATE Usuario - Implementado con CALLBACKS
     */
    private async crearUsuarioConCallback(): Promise<string> {
        return new Promise((resolve, reject) => {
            const nuevoUsuario = {
                username: 'nuevousuario2024',
                email: 'nuevo@usuario.com',
                password: 'MiPassword123$',
                nombre: 'Roberto',
                apellido: 'Silva',
                telefono: '+57-300-9876543',
                rol: RolUsuario.CLIENTE
            };

            this.usuarioService.crearUsuario(nuevoUsuario, (error, usuario) => {
                if (error) {
                    console.log(chalk.red(`  ❌ Error: ${error.message}`));
                    reject(error);
                } else if (usuario) {
                    console.log(chalk.green(`  ✅ Usuario creado: ${usuario.nombreCompleto} - ID: ${usuario.id}`));
                    resolve(usuario.id);
                }
            });
        });
    }

    /**
     * READ Usuario - Implementado con ASYNC/AWAIT
     */
    private async consultarUsuarios(): Promise<void> {
        try {
            // Obtener todos los usuarios
            const usuarios = await this.usuarioService.listarUsuarios();
            console.log(chalk.green(`  ✅ Usuarios encontrados: ${usuarios.length}`));

            // Obtener por ID específico
            if (usuarios.length > 0) {
                const usuario = await this.usuarioService.obtenerUsuarioPorId(usuarios[0].id);
                if (usuario) {
                    console.log(chalk.green(`  ✅ Usuario por ID: ${usuario.nombreCompleto}`));
                }
            }

            // Obtener por username
            const usuarioPorUsername = await this.usuarioService.obtenerUsuarioPorUsername('admin');
            if (usuarioPorUsername) {
                console.log(chalk.green(`  ✅ Usuario por username: ${usuarioPorUsername.nombre}`));
            }

        } catch (error) {
            console.log(chalk.red(`  ❌ Error consultando usuarios: ${(error as Error).message}`));
        }
    }

    /**
     * UPDATE Usuario - Implementado con PROMISES
     */
    private async actualizarUsuarioConPromise(): Promise<void> {
        try {
            const usuarios = await this.usuarioService.listarUsuarios();

            if (usuarios.length > 0) {
                const usuarioId = usuarios[usuarios.length - 1].id; // Último usuario

                const datosActualizacion = {
                    nombre: 'Roberto Carlos',
                    telefono: '+57-310-1234567',
                    estado: EstadoUsuario.ACTIVO
                };

                // Usar .then() y .catch() para demostrar Promises
                this.usuarioService.actualizarUsuario(usuarioId, datosActualizacion)
                    .then(resultado => {
                        if (resultado.success && resultado.data) {
                            console.log(chalk.green(`  ✅ Usuario actualizado: ${resultado.data.nombreCompleto}`));
                        } else {
                            console.log(chalk.red(`  ❌ Error: ${resultado.error}`));
                        }
                    })
                    .catch(error => {
                        console.log(chalk.red(`  ❌ Error actualizando usuario: ${error.message}`));
                    });
            }
        } catch (error) {
            console.log(chalk.red(`  ❌ Error en actualización: ${(error as Error).message}`));
        }
    }

    /**
     * DELETE Usuario - Implementado con ASYNC/AWAIT
     */
    private async eliminarUsuario(): Promise<void> {
        try {
            const usuarios = await this.usuarioService.listarUsuarios();

            if (usuarios.length > 3) { // Mantener algunos usuarios
                const usuarioId = usuarios[usuarios.length - 1].id;
                const eliminado = await this.usuarioService.eliminarUsuario(usuarioId);

                if (eliminado) {
                    console.log(chalk.green(`  ✅ Usuario eliminado exitosamente`));
                } else {
                    console.log(chalk.red(`  ❌ No se pudo eliminar el usuario`));
                }
            } else {
                console.log(chalk.yellow(`  ⚠️ Manteniendo usuarios para otras pruebas`));
            }
        } catch (error) {
            console.log(chalk.red(`  ❌ Error eliminando usuario: ${(error as Error).message}`));
        }
    }

    // =================== CLIENTE OPERATIONS ===================

    /**
     * CREATE Cliente - Implementado con CALLBACKS
     */
    private async crearClienteConCallback(): Promise<string> {
        return new Promise((resolve, reject) => {
            const nuevoCliente = {
                nombre: 'Elena',
                apellido: 'Morales',
                email: 'elena.morales@email.com',
                telefono: '+57-315-9876543',
                tipoDocumento: TipoDocumento.CEDULA,
                numeroDocumento: '98765432',
                fechaNacimiento: new Date('1988-03-15'),
                direccion: {
                    calle: 'Avenida 68 #123-45',
                    ciudad: 'Cali',
                    departamento: 'Valle del Cauca',
                    codigoPostal: '760001'
                }
            };

            this.clienteService.crearCliente(nuevoCliente, (error, cliente) => {
                if (error) {
                    console.log(chalk.red(`  ❌ Error: ${error.message}`));
                    reject(error);
                } else if (cliente) {
                    console.log(chalk.green(`  ✅ Cliente creado: ${cliente.nombreCompleto} - Edad: ${cliente.edad} años`));
                    resolve(cliente.id);
                }
            });
        });
    }

    /**
     * READ Cliente - Implementado con ASYNC/AWAIT
     */
    private async consultarClientes(): Promise<void> {
        try {
            // Obtener todos los clientes
            const clientes = await this.clienteService.listarClientes();
            console.log(chalk.green(`  ✅ Clientes encontrados: ${clientes.length}`));

            // Obtener clientes VIP
            const clientesVIP = await this.clienteService.obtenerClientesVIP();
            console.log(chalk.green(`  ✅ Clientes VIP: ${clientesVIP.length}`));

            // Obtener por categoría
            const clientesOro = await this.clienteService.obtenerClientesPorCategoria(CategoriaCliente.ORO);
            console.log(chalk.green(`  ✅ Clientes categoría ORO: ${clientesOro.length}`));

            // Obtener por estado
            const clientesActivos = await this.clienteService.obtenerClientesPorEstado(EstadoCliente.ACTIVO);
            console.log(chalk.green(`  ✅ Clientes activos: ${clientesActivos.length}`));

        } catch (error) {
            console.log(chalk.red(`  ❌ Error consultando clientes: ${(error as Error).message}`));
        }
    }

    /**
     * UPDATE Cliente - Implementado con PROMISES
     */
    private async actualizarClienteConPromise(): Promise<void> {
        try {
            const clientes = await this.clienteService.listarClientes();

            if (clientes.length > 0) {
                const clienteId = clientes[clientes.length - 1].id; // Último cliente

                const datosActualizacion = {
                    telefono: '+57-320-7777777',
                    categoria: CategoriaCliente.PLATA,
                    estado: EstadoCliente.ACTIVO
                };

                // Usar .then() y .catch() para demostrar Promises
                this.clienteService.actualizarCliente(clienteId, datosActualizacion)
                    .then(resultado => {
                        if (resultado.success && resultado.data) {
                            console.log(chalk.green(`  ✅ Cliente actualizado: ${resultado.data.nombreCompleto} - Categoría: ${resultado.data.categoria}`));
                        } else {
                            console.log(chalk.red(`  ❌ Error: ${resultado.error}`));
                        }
                    })
                    .catch(error => {
                        console.log(chalk.red(`  ❌ Error actualizando cliente: ${error.message}`));
                    });
            }
        } catch (error) {
            console.log(chalk.red(`  ❌ Error en actualización: ${(error as Error).message}`));
        }
    }

    /**
     * DELETE Cliente - Implementado con ASYNC/AWAIT
     */
    private async eliminarCliente(): Promise<void> {
        try {
            const clientes = await this.clienteService.listarClientes();

            if (clientes.length > 3) { // Mantener algunos clientes
                const clienteId = clientes[clientes.length - 1].id;
                const eliminado = await this.clienteService.eliminarCliente(clienteId);

                if (eliminado) {
                    console.log(chalk.green(`  ✅ Cliente eliminado exitosamente`));
                } else {
                    console.log(chalk.red(`  ❌ No se pudo eliminar el cliente`));
                }
            } else {
                console.log(chalk.yellow(`  ⚠️ Manteniendo clientes para otras pruebas`));
            }
        } catch (error) {
            console.log(chalk.red(`  ❌ Error eliminando cliente: ${(error as Error).message}`));
        }
    }

    // =================== EMPRENDEDOR OPERATIONS ===================

    /**
     * CREATE Emprendedor - Implementado con CALLBACKS
     */
    private async crearEmprendedorConCallback(): Promise<string> {
        return new Promise((resolve, reject) => {
            const nuevoEmprendedor = {
                nombre: 'Andrés',
                apellido: 'Vásquez',
                email: 'andres.vasquez@startup.com',
                telefono: '+57-318-5555555',
                especialidad: 'Marketing Digital y E-commerce',
                biografia: 'Especialista en marketing digital con 6 años de experiencia ayudando a pequeñas empresas a crecer en línea. Experto en SEO, SEM, redes sociales y estrategias de e-commerce. Fundador de una agencia exitosa.',
                sector: SectorEmprendimiento.SERVICIOS,
                experiencia: NivelExperiencia.AVANZADO,
                redesSociales: [
                    {
                        plataforma: PlataformaRedSocial.LINKEDIN,
                        url: 'https://linkedin.com/in/andres-vasquez-marketing',
                        nombreUsuario: 'andres-vasquez-marketing'
                    },
                    {
                        plataforma: PlataformaRedSocial.INSTAGRAM,
                        url: 'https://instagram.com/andres_marketing_digital',
                        nombreUsuario: 'andres_marketing_digital'
                    }
                ]
            };

            this.emprendedorService.crearEmprendedor(nuevoEmprendedor, (error, emprendedor) => {
                if (error) {
                    console.log(chalk.red(`  ❌ Error: ${error.message}`));
                    reject(error);
                } else if (emprendedor) {
                    console.log(chalk.green(`  ✅ Emprendedor creado: ${emprendedor.nombreCompleto} - ${emprendedor.sector}`));
                    console.log(chalk.gray(`    📱 Redes sociales: ${emprendedor.redesSociales.length}`));
                    resolve(emprendedor.id);
                }
            });
        });
    }

    /**
     * READ Emprendedor - Implementado con ASYNC/AWAIT
     */
    private async consultarEmprendedores(): Promise<void> {
        try {
            // Obtener todos los emprendedores
            const emprendedores = await this.emprendedorService.listarEmprendedores();
            console.log(chalk.green(`  ✅ Emprendedores encontrados: ${emprendedores.length}`));

            // Obtener verificados
            const verificados = await this.emprendedorService.obtenerEmprendedoresVerificados();
            console.log(chalk.green(`  ✅ Emprendedores verificados: ${verificados.length}`));

            // Obtener por sector
            const techEmprendedores = await this.emprendedorService.obtenerEmprendedoresPorSector(SectorEmprendimiento.TECNOLOGIA);
            console.log(chalk.green(`  ✅ Emprendedores de tecnología: ${techEmprendedores.length}`));

            // Obtener mejor puntuados
            const mejorPuntuados = await this.emprendedorService.obtenerMejorPuntuados(3);
            console.log(chalk.green(`  ✅ Top 3 mejor puntuados obtenidos`));

            // Obtener por experiencia
            const expertos = await this.emprendedorService.obtenerEmprendedoresPorExperiencia(NivelExperiencia.EXPERTO);
            console.log(chalk.green(`  ✅ Emprendedores expertos: ${expertos.length}`));

        } catch (error) {
            console.log(chalk.red(`  ❌ Error consultando emprendedores: ${(error as Error).message}`));
        }
    }

    /**
     * UPDATE Emprendedor - Implementado con PROMISES
     */
    private async actualizarEmprendedorConPromise(): Promise<void> {
        try {
            const emprendedores = await this.emprendedorService.listarEmprendedores();

            if (emprendedores.length > 0) {
                const emprendedorId = emprendedores[emprendedores.length - 1].id; // Último emprendedor

                const datosActualizacion = {
                    biografia: 'Especialista en marketing digital actualizado con 7 años de experiencia. Certificado en Google Ads y Facebook Business. Ha ayudado a más de 200 empresas a incrementar sus ventas online.',
                    experiencia: NivelExperiencia.EXPERTO,
                    estado: EstadoEmprendedor.VERIFICADO
                };

                // Usar .then() y .catch() para demostrar Promises
                this.emprendedorService.actualizarEmprendedor(emprendedorId, datosActualizacion)
                    .then(resultado => {
                        if (resultado.success && resultado.data) {
                            console.log(chalk.green(`  ✅ Emprendedor actualizado: ${resultado.data.nombreCompleto}`));
                            console.log(chalk.gray(`    🎯 Experiencia: ${resultado.data.experiencia}`));
                            console.log(chalk.gray(`    ✅ Estado: ${resultado.data.estado}`));
                        } else {
                            console.log(chalk.red(`  ❌ Error: ${resultado.error}`));
                        }
                    })
                    .catch(error => {
                        console.log(chalk.red(`  ❌ Error actualizando emprendedor: ${error.message}`));
                    });
            }
        } catch (error) {
            console.log(chalk.red(`  ❌ Error en actualización: ${(error as Error).message}`));
        }
    }

    /**
     * DELETE Emprendedor - Implementado con ASYNC/AWAIT
     */
    private async eliminarEmprendedor(): Promise<void> {
        try {
            const emprendedores = await this.emprendedorService.listarEmprendedores();

            if (emprendedores.length > 3) { // Mantener algunos emprendedores
                const emprendedorId = emprendedores[emprendedores.length - 1].id;
                const eliminado = await this.emprendedorService.eliminarEmprendedor(emprendedorId);

                if (eliminado) {
                    console.log(chalk.green(`  ✅ Emprendedor eliminado exitosamente`));
                } else {
                    console.log(chalk.red(`  ❌ No se pudo eliminar el emprendedor`));
                }
            } else {
                console.log(chalk.yellow(`  ⚠️ Manteniendo emprendedores para otras pruebas`));
            }
        } catch (error) {
            console.log(chalk.red(`  ❌ Error eliminando emprendedor: ${(error as Error).message}`));
        }
    }

    /**
     * Mostrar estadísticas finales del sistema
     */
    private async mostrarEstadisticasFinales(): Promise<void> {
        console.log(chalk.cyan.bold('\n📊 ESTADÍSTICAS FINALES DEL SISTEMA'));
        console.log(chalk.cyan('-'.repeat(40)));

        const statsUsuarios = await this.usuarioService.obtenerEstadisticas();
        const statsClientes = await this.clienteService.obtenerEstadisticas();
        const statsEmprendedores = await this.emprendedorService.obtenerEstadisticas();

        // Estadísticas de Usuarios
        console.log(chalk.white.bold('\n👥 USUARIOS:'));
        console.log(chalk.white(`  • Total: ${statsUsuarios.total}`));
        console.log(chalk.white(`  • Activos: ${statsUsuarios.activos}`));
        console.log(chalk.white(`  • Por rol: ${JSON.stringify(statsUsuarios.porRol, null, 2).replace(/[{}\"]/g, '').trim()}`));

        // Estadísticas de Clientes
        console.log(chalk.white.bold('\n🏪 CLIENTES:'));
        console.log(chalk.white(`  • Total: ${statsClientes.total}`));
        console.log(chalk.white(`  • Edad promedio: ${statsClientes.edadPromedio} años`));
        console.log(chalk.white(`  • VIP: ${statsClientes.vip}`));
        console.log(chalk.white(`  • Por categoría: ${JSON.stringify(statsClientes.porCategoria, null, 2).replace(/[{}\"]/g, '').trim()}`));

        // Estadísticas de Emprendedores
        console.log(chalk.white.bold('\n🚀 EMPRENDEDORES:'));
        console.log(chalk.white(`  • Total: ${statsEmprendedores.total}`));
        console.log(chalk.white(`  • Verificados: ${statsEmprendedores.verificados}`));
        console.log(chalk.white(`  • Puntuación promedio: ${statsEmprendedores.puntuacionPromedio}/5`));
        console.log(chalk.white(`  • Alta puntuación (>=4.0): ${statsEmprendedores.altaPuntuacion}`));
        console.log(chalk.white(`  • Por sector: ${JSON.stringify(statsEmprendedores.porSector, null, 2).replace(/[{}\"]/g, '').trim()}`));
    }
}

/**
 * PUNTO DE ENTRADA PRINCIPAL
 */
async function main(): Promise<void> {
    console.log(chalk.cyan.bold('🌟 SISTEMA DE EMPRENDIMIENTO - PRUEBAS FUNCIONALES 🌟'));

    const testRunner = new EmprendimientoTestRunner();
    await testRunner.ejecutarPruebas();

    console.log(chalk.green.bold('\n🎉 PROYECTO COMPLETADO EXITOSAMENTE'));
    console.log(chalk.gray('Arquitectura hexagonal implementada con paradigmas asíncronos'));
    console.log(chalk.gray('TypeScript • SOLID • DDD • Clean Architecture'));
}

// Ejecutar aplicación
main().catch(error => {
    console.error(chalk.red.bold('💥 ERROR FATAL:'), error);
});