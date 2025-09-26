import { Emprendedor, CrearEmprendedorDTO, ActualizarEmprendedorDTO, EstadoEmprendedor, NivelExperiencia, SectorEmprendimiento } from '../../domain/emprendedor/emprendedor.entity.js';
import { IEmprendedorRepository } from '../../domain/emprendedor/emprendedor.repository.js';
import { AsyncCallback, OperationResult } from '../../shared/types.js';
/**
 * Implementación en memoria del repositorio de Emprendedor
 * Aplica los paradigmas asíncronos requeridos:
 * - CREATE: Callbacks
 * - READ: Async/Await
 * - UPDATE: Promises
 * - DELETE: Async/Await
 */
export declare class EmprendedorMemoryRepository implements IEmprendedorRepository {
    private emprendedores;
    private readonly LATENCIA_RED;
    constructor();
    /**
     * CREATE - Implementado con CALLBACKS
     */
    crear(emprendedorData: CrearEmprendedorDTO, callback: AsyncCallback<Emprendedor>): void;
    /**
     * READ - Implementado con ASYNC/AWAIT
     */
    obtenerPorId(id: string): Promise<Emprendedor | null>;
    obtenerPorEmail(email: string): Promise<Emprendedor | null>;
    obtenerPorUsuarioId(usuarioId: string): Promise<Emprendedor | null>;
    obtenerTodos(): Promise<Emprendedor[]>;
    obtenerPorEstado(estado: EstadoEmprendedor): Promise<Emprendedor[]>;
    obtenerPorSector(sector: SectorEmprendimiento): Promise<Emprendedor[]>;
    obtenerPorExperiencia(experiencia: NivelExperiencia): Promise<Emprendedor[]>;
    obtenerVerificados(): Promise<Emprendedor[]>;
    obtenerMejorPuntuados(limite?: number): Promise<Emprendedor[]>;
    /**
     * UPDATE - Implementado con PROMISES
     */
    actualizar(id: string, datos: ActualizarEmprendedorDTO): Promise<OperationResult<Emprendedor>>;
    /**
     * DELETE - Implementado con ASYNC/AWAIT
     */
    eliminar(id: string): Promise<boolean>;
    existeEmail(email: string): Promise<boolean>;
    contarPorSector(sector: SectorEmprendimiento): Promise<number>;
    contarVerificados(): Promise<number>;
    obtenerPuntuacionPromedio(): Promise<number>;
    private existeEmailSync;
    private simularLatencia;
    /**
     * Inicializar datos de prueba optimizados
     */
    private inicializarDatosPrueba;
    obtenerEstadisticas(): {
        total: number;
        porEstado: Record<string, number>;
        porSector: Record<string, number>;
        porExperiencia: Record<string, number>;
        puntuacionPromedio: number;
        verificados: number;
    };
}
