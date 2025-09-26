import { Emprendedor, CrearEmprendedorDTO, ActualizarEmprendedorDTO, EstadoEmprendedor, NivelExperiencia, SectorEmprendimiento } from './emprendedor.entity.js';
import { AsyncCallback, OperationResult } from '../../shared/types.js';
/**
 * Interfaz del repositorio de Emprendedor siguiendo el patrón Repository
 */
export interface IEmprendedorRepository {
    crear(emprendedorData: CrearEmprendedorDTO, callback: AsyncCallback<Emprendedor>): void;
    obtenerPorId(id: string): Promise<Emprendedor | null>;
    obtenerPorEmail(email: string): Promise<Emprendedor | null>;
    obtenerPorUsuarioId(usuarioId: string): Promise<Emprendedor | null>;
    obtenerTodos(): Promise<Emprendedor[]>;
    obtenerPorEstado(estado: EstadoEmprendedor): Promise<Emprendedor[]>;
    obtenerPorSector(sector: SectorEmprendimiento): Promise<Emprendedor[]>;
    obtenerPorExperiencia(experiencia: NivelExperiencia): Promise<Emprendedor[]>;
    obtenerVerificados(): Promise<Emprendedor[]>;
    obtenerMejorPuntuados(limite?: number): Promise<Emprendedor[]>;
    actualizar(id: string, datos: ActualizarEmprendedorDTO): Promise<OperationResult<Emprendedor>>;
    eliminar(id: string): Promise<boolean>;
    existeEmail(email: string): Promise<boolean>;
    contarPorSector(sector: SectorEmprendimiento): Promise<number>;
    contarVerificados(): Promise<number>;
    obtenerPuntuacionPromedio(): Promise<number>;
}
