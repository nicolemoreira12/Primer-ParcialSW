import { Emprendedor, CrearEmprendedorDTO, ActualizarEmprendedorDTO, EstadoEmprendedor, NivelExperiencia, SectorEmprendimiento } from './emprendedor.entity.js';
import { AsyncCallback, OperationResult } from '../../shared/types.js';
import { PlataformaRedSocial } from './value-objects.js';

/**
 * Interfaz del repositorio de Emprendedor siguiendo el patrón Repository
 */
export interface IEmprendedorRepository {
    // CREATE - Usando Callbacks
    crear(emprendedorData: CrearEmprendedorDTO, callback: AsyncCallback<Emprendedor>): void;

    // READ - Usando Async/Await
    obtenerPorId(id: string): Promise<Emprendedor | null>;
    obtenerPorEmail(email: string): Promise<Emprendedor | null>;
    obtenerPorUsuarioId(usuarioId: string): Promise<Emprendedor | null>;
    obtenerTodos(): Promise<Emprendedor[]>;
    obtenerPorEstado(estado: EstadoEmprendedor): Promise<Emprendedor[]>;
    obtenerPorSector(sector: SectorEmprendimiento): Promise<Emprendedor[]>;
    obtenerPorExperiencia(experiencia: NivelExperiencia): Promise<Emprendedor[]>;
    obtenerVerificados(): Promise<Emprendedor[]>;
    obtenerMejorPuntuados(limite?: number): Promise<Emprendedor[]>;

    // UPDATE - Usando Promises
    actualizar(id: string, datos: ActualizarEmprendedorDTO): Promise<OperationResult<Emprendedor>>;

    // DELETE - Usando Async/Await
    eliminar(id: string): Promise<boolean>;

    // Métodos auxiliares
    existeEmail(email: string): Promise<boolean>;
    contarPorSector(sector: SectorEmprendimiento): Promise<number>;
    contarVerificados(): Promise<number>;
    obtenerPuntuacionPromedio(): Promise<number>;
}