import { Emprendedor, CrearEmprendedorDTO, ActualizarEmprendedorDTO, EstadoEmprendedor, NivelExperiencia, SectorEmprendimiento } from '../../domain/emprendedor/emprendedor.entity.js';
import { IEmprendedorRepository } from '../../domain/emprendedor/emprendedor.repository.js';
import { AsyncCallback, OperationResult } from '../../shared/types.js';
/**
 * Servicio de aplicación para Emprendedor
 * Orquesta las operaciones del dominio y aplica reglas de negocio
 */
export declare class EmprendedorService {
    private readonly emprendedorRepository;
    constructor(emprendedorRepository: IEmprendedorRepository);
    /**
     * Crear nuevo emprendedor - Usando Callbacks
     */
    crearEmprendedor(emprendedorData: CrearEmprendedorDTO, callback: AsyncCallback<Emprendedor>): void;
    /**
     * Obtener emprendedor por ID - Usando Async/Await
     */
    obtenerEmprendedorPorId(id: string): Promise<Emprendedor | null>;
    /**
     * Obtener emprendedor por email - Usando Async/Await
     */
    obtenerEmprendedorPorEmail(email: string): Promise<Emprendedor | null>;
    /**
     * Obtener emprendedor por usuario - Usando Async/Await
     */
    obtenerEmprendedorPorUsuarioId(usuarioId: string): Promise<Emprendedor | null>;
    /**
     * Listar todos los emprendedores - Usando Async/Await
     */
    listarEmprendedores(): Promise<Emprendedor[]>;
    /**
     * Obtener emprendedores por estado - Usando Async/Await
     */
    obtenerEmprendedoresPorEstado(estado: EstadoEmprendedor): Promise<Emprendedor[]>;
    /**
     * Obtener emprendedores por sector - Usando Async/Await
     */
    obtenerEmprendedoresPorSector(sector: SectorEmprendimiento): Promise<Emprendedor[]>;
    /**
     * Obtener emprendedores por experiencia - Usando Async/Await
     */
    obtenerEmprendedoresPorExperiencia(experiencia: NivelExperiencia): Promise<Emprendedor[]>;
    /**
     * Obtener emprendedores verificados - Usando Async/Await
     */
    obtenerEmprendedoresVerificados(): Promise<Emprendedor[]>;
    /**
     * Obtener mejor puntuados - Usando Async/Await
     */
    obtenerMejorPuntuados(limite?: number): Promise<Emprendedor[]>;
    /**
     * Actualizar emprendedor - Usando Promises
     */
    actualizarEmprendedor(id: string, datos: ActualizarEmprendedorDTO): Promise<OperationResult<Emprendedor>>;
    /**
     * Eliminar emprendedor - Usando Async/Await
     */
    eliminarEmprendedor(id: string): Promise<boolean>;
    /**
     * Verificar emprendedor
     */
    verificarEmprendedor(id: string): Promise<OperationResult<Emprendedor>>;
    /**
     * Cambiar estado del emprendedor
     */
    cambiarEstadoEmprendedor(id: string, nuevoEstado: EstadoEmprendedor): Promise<OperationResult<Emprendedor>>;
    /**
     * Actualizar puntuación del emprendedor
     */
    actualizarPuntuacion(id: string, nuevaPuntuacion: number): Promise<OperationResult<Emprendedor>>;
    /**
     * Verificar disponibilidad de email
     */
    verificarDisponibilidadEmail(email: string): Promise<boolean>;
    /**
     * Obtener emprendedores de alta puntuación (>= 4.0)
     */
    obtenerEmprendedoresAltaPuntuacion(): Promise<Emprendedor[]>;
    /**
     * Buscar emprendedores por especialidad
     */
    buscarPorEspecialidad(especialidadBuscada: string): Promise<Emprendedor[]>;
    private validarDatosCreacion;
    /**
     * Obtener estadísticas de emprendedores
     */
    obtenerEstadisticas(): Promise<{
        total: number;
        porEstado: Record<string, number>;
        porSector: Record<string, number>;
        porExperiencia: Record<string, number>;
        puntuacionPromedio: number;
        verificados: number;
        altaPuntuacion: number;
    }>;
}
