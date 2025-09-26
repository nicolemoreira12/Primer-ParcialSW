import { Emprendedor, CrearEmprendedorDTO, ActualizarEmprendedorDTO, EstadoEmprendedor, NivelExperiencia, SectorEmprendimiento } from '../../domain/emprendedor/emprendedor.entity.js';
import { IEmprendedorRepository } from '../../domain/emprendedor/emprendedor.repository.js';
import { PlataformaRedSocial } from '../../domain/emprendedor/value-objects.js';
import { AsyncCallback, OperationResult } from '../../shared/types.js';

/**
 * Servicio de aplicación para Emprendedor
 * Orquesta las operaciones del dominio y aplica reglas de negocio
 */
export class EmprendedorService {
    constructor(private readonly emprendedorRepository: IEmprendedorRepository) { }

    /**
     * Crear nuevo emprendedor - Usando Callbacks
     */
    crearEmprendedor(emprendedorData: CrearEmprendedorDTO, callback: AsyncCallback<Emprendedor>): void {
        // Validaciones adicionales de negocio
        if (!this.validarDatosCreacion(emprendedorData)) {
            const error = new Error('Datos de emprendedor inválidos');
            return callback(error);
        }

        this.emprendedorRepository.crear(emprendedorData, (error, emprendedor) => {
            if (error) {
                return callback(error);
            }

            console.log(`✅ Emprendedor creado: ${emprendedor?.nombreCompleto} - ${emprendedor?.especialidad.toString()} (${emprendedor?.sector})`);
            callback(null, emprendedor);
        });
    }

    /**
     * Obtener emprendedor por ID - Usando Async/Await
     */
    async obtenerEmprendedorPorId(id: string): Promise<Emprendedor | null> {
        if (!id || id.trim().length === 0) {
            throw new Error('ID de emprendedor requerido');
        }

        const emprendedor = await this.emprendedorRepository.obtenerPorId(id);

        if (emprendedor) {
            console.log(`📋 Emprendedor encontrado: ${emprendedor.nombreCompleto} (${emprendedor.especialidad.toString()})`);
        } else {
            console.log(`❌ Emprendedor con ID '${id}' no encontrado`);
        }

        return emprendedor;
    }

    /**
     * Obtener emprendedor por email - Usando Async/Await
     */
    async obtenerEmprendedorPorEmail(email: string): Promise<Emprendedor | null> {
        if (!email || email.trim().length === 0) {
            throw new Error('Email requerido');
        }

        return await this.emprendedorRepository.obtenerPorEmail(email);
    }

    /**
     * Obtener emprendedor por usuario - Usando Async/Await
     */
    async obtenerEmprendedorPorUsuarioId(usuarioId: string): Promise<Emprendedor | null> {
        if (!usuarioId || usuarioId.trim().length === 0) {
            throw new Error('ID de usuario requerido');
        }

        return await this.emprendedorRepository.obtenerPorUsuarioId(usuarioId);
    }

    /**
     * Listar todos los emprendedores - Usando Async/Await
     */
    async listarEmprendedores(): Promise<Emprendedor[]> {
        const emprendedores = await this.emprendedorRepository.obtenerTodos();
        console.log(`📋 Total emprendedores encontrados: ${emprendedores.length}`);
        return emprendedores;
    }

    /**
     * Obtener emprendedores por estado - Usando Async/Await
     */
    async obtenerEmprendedoresPorEstado(estado: EstadoEmprendedor): Promise<Emprendedor[]> {
        const emprendedores = await this.emprendedorRepository.obtenerPorEstado(estado);
        console.log(`📋 Emprendedores con estado ${estado}: ${emprendedores.length}`);
        return emprendedores;
    }

    /**
     * Obtener emprendedores por sector - Usando Async/Await
     */
    async obtenerEmprendedoresPorSector(sector: SectorEmprendimiento): Promise<Emprendedor[]> {
        const emprendedores = await this.emprendedorRepository.obtenerPorSector(sector);
        console.log(`📋 Emprendedores del sector ${sector}: ${emprendedores.length}`);
        return emprendedores;
    }

    /**
     * Obtener emprendedores por experiencia - Usando Async/Await
     */
    async obtenerEmprendedoresPorExperiencia(experiencia: NivelExperiencia): Promise<Emprendedor[]> {
        const emprendedores = await this.emprendedorRepository.obtenerPorExperiencia(experiencia);
        console.log(`📋 Emprendedores con experiencia ${experiencia}: ${emprendedores.length}`);
        return emprendedores;
    }

    /**
     * Obtener emprendedores verificados - Usando Async/Await
     */
    async obtenerEmprendedoresVerificados(): Promise<Emprendedor[]> {
        const emprendedores = await this.emprendedorRepository.obtenerVerificados();
        console.log(`📋 Emprendedores verificados: ${emprendedores.length}`);
        return emprendedores;
    }

    /**
     * Obtener mejor puntuados - Usando Async/Await
     */
    async obtenerMejorPuntuados(limite: number = 10): Promise<Emprendedor[]> {
        const emprendedores = await this.emprendedorRepository.obtenerMejorPuntuados(limite);
        console.log(`📋 Top ${limite} emprendedores mejor puntuados obtenidos`);
        return emprendedores;
    }

    /**
     * Actualizar emprendedor - Usando Promises
     */
    async actualizarEmprendedor(id: string, datos: ActualizarEmprendedorDTO): Promise<OperationResult<Emprendedor>> {
        if (!id || id.trim().length === 0) {
            return {
                success: false,
                error: 'ID de emprendedor requerido',
                message: 'Parámetros inválidos'
            };
        }

        try {
            const resultado = await this.emprendedorRepository.actualizar(id, datos);

            if (resultado.success && resultado.data) {
                console.log(`✏️ Emprendedor actualizado: ${resultado.data.nombreCompleto}`);
            }

            return resultado;
        } catch (error) {
            return {
                success: false,
                error: (error as Error).message,
                message: 'Error actualizando emprendedor'
            };
        }
    }

    /**
     * Eliminar emprendedor - Usando Async/Await
     */
    async eliminarEmprendedor(id: string): Promise<boolean> {
        if (!id || id.trim().length === 0) {
            throw new Error('ID de emprendedor requerido');
        }

        // Verificar que el emprendedor existe antes de eliminar
        const emprendedor = await this.emprendedorRepository.obtenerPorId(id);
        if (!emprendedor) {
            console.log(`❌ Emprendedor con ID '${id}' no encontrado para eliminar`);
            return false;
        }

        const eliminado = await this.emprendedorRepository.eliminar(id);

        if (eliminado) {
            console.log(`🗑️ Emprendedor eliminado: ${emprendedor.nombreCompleto}`);
        }

        return eliminado;
    }

    /**
     * Verificar emprendedor
     */
    async verificarEmprendedor(id: string): Promise<OperationResult<Emprendedor>> {
        const emprendedor = await this.emprendedorRepository.obtenerPorId(id);

        if (!emprendedor) {
            return {
                success: false,
                error: `Emprendedor con ID '${id}' no encontrado`,
                message: 'Emprendedor no existe'
            };
        }

        if (emprendedor.estaVerificado()) {
            return {
                success: false,
                error: 'Emprendedor ya está verificado',
                message: 'Estado actual es verificado'
            };
        }

        emprendedor.verificar();

        // Actualizar en repositorio
        return await this.actualizarEmprendedor(id, { estado: emprendedor.estado });
    }

    /**
     * Cambiar estado del emprendedor
     */
    async cambiarEstadoEmprendedor(id: string, nuevoEstado: EstadoEmprendedor): Promise<OperationResult<Emprendedor>> {
        return await this.actualizarEmprendedor(id, { estado: nuevoEstado });
    }

    /**
     * Actualizar puntuación del emprendedor
     */
    async actualizarPuntuacion(id: string, nuevaPuntuacion: number): Promise<OperationResult<Emprendedor>> {
        if (nuevaPuntuacion < 0 || nuevaPuntuacion > 5) {
            return {
                success: false,
                error: 'Puntuación debe estar entre 0 y 5',
                message: 'Puntuación inválida'
            };
        }

        const emprendedor = await this.emprendedorRepository.obtenerPorId(id);

        if (!emprendedor) {
            return {
                success: false,
                error: `Emprendedor con ID '${id}' no encontrado`,
                message: 'Emprendedor no existe'
            };
        }

        emprendedor.actualizarPuntuacion(nuevaPuntuacion);

        // Actualizar en repositorio - no hay campo directo, usar actualización general
        const resultado = await this.emprendedorRepository.actualizar(id, {});

        if (resultado.success) {
            console.log(`⭐ Puntuación actualizada para ${emprendedor.nombreCompleto}: ${nuevaPuntuacion}/5`);
        }

        return resultado;
    }

    /**
     * Verificar disponibilidad de email
     */
    async verificarDisponibilidadEmail(email: string): Promise<boolean> {
        const existe = await this.emprendedorRepository.existeEmail(email);
        return !existe;
    }

    /**
     * Obtener emprendedores de alta puntuación (>= 4.0)
     */
    async obtenerEmprendedoresAltaPuntuacion(): Promise<Emprendedor[]> {
        const todosEmprendedores = await this.emprendedorRepository.obtenerTodos();
        return todosEmprendedores.filter(emprendedor => emprendedor.tieneBuenaPuntuacion());
    }

    /**
     * Buscar emprendedores por especialidad
     */
    async buscarPorEspecialidad(especialidadBuscada: string): Promise<Emprendedor[]> {
        const todosEmprendedores = await this.emprendedorRepository.obtenerTodos();
        return todosEmprendedores.filter(emprendedor =>
            emprendedor.especialidad.toString().toLowerCase()
                .includes(especialidadBuscada.toLowerCase())
        );
    }

    // Métodos privados de validación
    private validarDatosCreacion(datos: CrearEmprendedorDTO): boolean {
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

        if (!Object.values(SectorEmprendimiento).includes(datos.sector)) {
            console.log('❌ Sector de emprendimiento inválido');
            return false;
        }

        if (!Object.values(NivelExperiencia).includes(datos.experiencia)) {
            console.log('❌ Nivel de experiencia inválido');
            return false;
        }

        // Validar redes sociales si se proporcionan
        if (datos.redesSociales) {
            for (const redSocial of datos.redesSociales) {
                if (!Object.values(PlataformaRedSocial).includes(redSocial.plataforma)) {
                    console.log(`❌ Plataforma de red social inválida: ${redSocial.plataforma}`);
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Obtener estadísticas de emprendedores
     */
    async obtenerEstadisticas(): Promise<{
        total: number;
        porEstado: Record<string, number>;
        porSector: Record<string, number>;
        porExperiencia: Record<string, number>;
        puntuacionPromedio: number;
        verificados: number;
        altaPuntuacion: number;
    }> {
        const emprendedores = await this.emprendedorRepository.obtenerTodos();

        const estadisticas = {
            total: emprendedores.length,
            porEstado: {} as Record<string, number>,
            porSector: {} as Record<string, number>,
            porExperiencia: {} as Record<string, number>,
            puntuacionPromedio: 0,
            verificados: 0,
            altaPuntuacion: 0
        };

        let sumaPuntuaciones = 0;

        emprendedores.forEach(emprendedor => {
            // Contar por estado
            const estado = emprendedor.estado;
            estadisticas.porEstado[estado] = (estadisticas.porEstado[estado] || 0) + 1;

            // Contar por sector
            const sector = emprendedor.sector;
            estadisticas.porSector[sector] = (estadisticas.porSector[sector] || 0) + 1;

            // Contar por experiencia
            const experiencia = emprendedor.experiencia;
            estadisticas.porExperiencia[experiencia] = (estadisticas.porExperiencia[experiencia] || 0) + 1;

            // Calcular puntuación promedio
            sumaPuntuaciones += emprendedor.puntuacion;

            // Contar verificados
            if (emprendedor.estaVerificado()) {
                estadisticas.verificados++;
            }

            // Contar alta puntuación
            if (emprendedor.tieneBuenaPuntuacion()) {
                estadisticas.altaPuntuacion++;
            }
        });

        estadisticas.puntuacionPromedio = emprendedores.length > 0 ?
            Number((sumaPuntuaciones / emprendedores.length).toFixed(2)) : 0;

        return estadisticas;
    }
}