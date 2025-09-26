import { Emprendedor, EstadoEmprendedor, NivelExperiencia, SectorEmprendimiento } from '../../domain/emprendedor/emprendedor.entity.js';
import { Email } from '../../domain/usuario/value-objects.js';
import { Especialidad, Biografia, RedSocial, PlataformaRedSocial } from '../../domain/emprendedor/value-objects.js';
import { IdGenerator } from '../../shared/types.js';
/**
 * Implementación en memoria del repositorio de Emprendedor
 * Aplica los paradigmas asíncronos requeridos:
 * - CREATE: Callbacks
 * - READ: Async/Await
 * - UPDATE: Promises
 * - DELETE: Async/Await
 */
export class EmprendedorMemoryRepository {
    emprendedores = new Map();
    LATENCIA_RED = 150; // Simular latencia de red
    constructor() {
        this.inicializarDatosPrueba();
    }
    /**
     * CREATE - Implementado con CALLBACKS
     */
    crear(emprendedorData, callback) {
        // Simular latencia de red
        setTimeout(() => {
            try {
                // Validaciones de negocio
                if (this.existeEmailSync(emprendedorData.email)) {
                    const error = new Error(`Email '${emprendedorData.email}' ya existe`);
                    return callback(error);
                }
                // Crear value objects
                const email = new Email(emprendedorData.email);
                const especialidad = new Especialidad(emprendedorData.especialidad);
                const biografia = new Biografia(emprendedorData.biografia);
                const redesSociales = [];
                if (emprendedorData.redesSociales) {
                    for (const rs of emprendedorData.redesSociales) {
                        redesSociales.push(new RedSocial(rs.plataforma, rs.url, rs.nombreUsuario));
                    }
                }
                // Crear entidad
                const emprendedor = new Emprendedor(IdGenerator.generate(), emprendedorData.nombre, emprendedorData.apellido, email, emprendedorData.telefono, especialidad, biografia, emprendedorData.sector, emprendedorData.experiencia, emprendedorData.usuarioId, redesSociales);
                // Persistir
                this.emprendedores.set(emprendedor.id, emprendedor);
                // Callback de éxito
                callback(null, emprendedor);
            }
            catch (error) {
                callback(error);
            }
        }, this.LATENCIA_RED);
    }
    /**
     * READ - Implementado con ASYNC/AWAIT
     */
    async obtenerPorId(id) {
        await this.simularLatencia();
        return this.emprendedores.get(id) || null;
    }
    async obtenerPorEmail(email) {
        await this.simularLatencia();
        for (const emprendedor of this.emprendedores.values()) {
            if (emprendedor.email.toString() === email.toLowerCase()) {
                return emprendedor;
            }
        }
        return null;
    }
    async obtenerPorUsuarioId(usuarioId) {
        await this.simularLatencia();
        for (const emprendedor of this.emprendedores.values()) {
            if (emprendedor.usuarioId === usuarioId) {
                return emprendedor;
            }
        }
        return null;
    }
    async obtenerTodos() {
        await this.simularLatencia();
        return Array.from(this.emprendedores.values());
    }
    async obtenerPorEstado(estado) {
        await this.simularLatencia();
        return Array.from(this.emprendedores.values())
            .filter(emprendedor => emprendedor.estado === estado);
    }
    async obtenerPorSector(sector) {
        await this.simularLatencia();
        return Array.from(this.emprendedores.values())
            .filter(emprendedor => emprendedor.sector === sector);
    }
    async obtenerPorExperiencia(experiencia) {
        await this.simularLatencia();
        return Array.from(this.emprendedores.values())
            .filter(emprendedor => emprendedor.experiencia === experiencia);
    }
    async obtenerVerificados() {
        await this.simularLatencia();
        return Array.from(this.emprendedores.values())
            .filter(emprendedor => emprendedor.estaVerificado());
    }
    async obtenerMejorPuntuados(limite = 10) {
        await this.simularLatencia();
        return Array.from(this.emprendedores.values())
            .sort((a, b) => b.puntuacion - a.puntuacion)
            .slice(0, limite);
    }
    /**
     * UPDATE - Implementado con PROMISES
     */
    actualizar(id, datos) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const emprendedor = this.emprendedores.get(id);
                    if (!emprendedor) {
                        resolve({
                            success: false,
                            error: `Emprendedor con ID '${id}' no encontrado`,
                            message: 'Emprendedor no existe'
                        });
                        return;
                    }
                    // Aplicar actualizaciones
                    emprendedor.actualizarInformacion(datos);
                    // Persistir cambios
                    this.emprendedores.set(id, emprendedor);
                    resolve({
                        success: true,
                        data: emprendedor,
                        message: 'Emprendedor actualizado exitosamente'
                    });
                }
                catch (error) {
                    reject(error);
                }
            }, this.LATENCIA_RED);
        });
    }
    /**
     * DELETE - Implementado con ASYNC/AWAIT
     */
    async eliminar(id) {
        await this.simularLatencia();
        const existia = this.emprendedores.has(id);
        if (existia) {
            this.emprendedores.delete(id);
        }
        return existia;
    }
    // Métodos auxiliares
    async existeEmail(email) {
        await this.simularLatencia();
        return this.existeEmailSync(email);
    }
    async contarPorSector(sector) {
        await this.simularLatencia();
        return Array.from(this.emprendedores.values())
            .filter(emprendedor => emprendedor.sector === sector)
            .length;
    }
    async contarVerificados() {
        await this.simularLatencia();
        return Array.from(this.emprendedores.values())
            .filter(emprendedor => emprendedor.estaVerificado())
            .length;
    }
    async obtenerPuntuacionPromedio() {
        await this.simularLatencia();
        const emprendedores = Array.from(this.emprendedores.values());
        if (emprendedores.length === 0)
            return 0;
        const suma = emprendedores.reduce((acc, emp) => acc + emp.puntuacion, 0);
        return Number((suma / emprendedores.length).toFixed(2));
    }
    // Métodos síncronos para validaciones internas
    existeEmailSync(email) {
        for (const emprendedor of this.emprendedores.values()) {
            if (emprendedor.email.toString() === email.toLowerCase()) {
                return true;
            }
        }
        return false;
    }
    async simularLatencia() {
        return new Promise(resolve => setTimeout(resolve, this.LATENCIA_RED));
    }
    /**
     * Inicializar datos de prueba optimizados
     */
    inicializarDatosPrueba() {
        try {
            // Emprendedor Tecnológico Verificado
            const empTech = new Emprendedor('emp-001', 'Laura', 'Martínez', new Email('laura.martinez@techstartup.com'), '+57-315-7894561', new Especialidad('Desarrollo de Software'), new Biografia('Desarrolladora Full Stack con 8 años de experiencia en crear soluciones tecnológicas innovadoras para startups. Especializada en React, Node.js y arquitecturas cloud. Fundadora de 3 empresas exitosas en el sector fintech.'), SectorEmprendimiento.TECNOLOGIA, NivelExperiencia.EXPERTO, 'emp-001', // usuarioId
            [
                new RedSocial(PlataformaRedSocial.LINKEDIN, 'https://linkedin.com/in/laura-martinez-dev', 'laura-martinez-dev'),
                new RedSocial(PlataformaRedSocial.TWITTER, 'https://twitter.com/laura_codes', 'laura_codes')
            ], EstadoEmprendedor.VERIFICADO, 4.8);
            // Emprendedor de Alimentación
            const empFood = new Emprendedor('emp-002', 'Diego', 'Ramírez', new Email('diego.ramirez@foodie.com'), '+57-300-1122334', new Especialidad('Chef y Creación de Productos Alimenticios'), new Biografia('Chef profesional con experiencia en restaurantes de alta cocina. Especializado en comida saludable y sostenible, con certificaciones internacionales en nutrición y manejo de alimentos orgánicos.'), SectorEmprendimiento.ALIMENTACION, NivelExperiencia.AVANZADO, undefined, // Sin usuario del sistema
            [
                new RedSocial(PlataformaRedSocial.INSTAGRAM, 'https://instagram.com/chef_diego_gourmet', 'chef_diego_gourmet'),
                new RedSocial(PlataformaRedSocial.YOUTUBE, 'https://youtube.com/c/DiegoGourmetChannel', 'DiegoGourmetChannel')
            ], EstadoEmprendedor.ACTIVO, 4.5);
            // Emprendedor de Moda Emergente
            const empFashion = new Emprendedor('emp-003', 'Camila', 'Torres', new Email('camila.torres@fashiondesign.com'), '+57-310-5566778', new Especialidad('Diseño de Moda Sostenible'), new Biografia('Diseñadora de modas enfocada en crear piezas únicas utilizando materiales reciclados y técnicas artesanales tradicionales colombianas. Graduada de diseño con especialización en sostenibilidad.'), SectorEmprendimiento.MODA, NivelExperiencia.INTERMEDIO, 'emp-003', // usuarioId
            [
                new RedSocial(PlataformaRedSocial.INSTAGRAM, 'https://instagram.com/camila_eco_fashion', 'camila_eco_fashion'),
                new RedSocial(PlataformaRedSocial.FACEBOOK, 'https://facebook.com/CamilaEcoFashion', 'CamilaEcoFashion')
            ], EstadoEmprendedor.PENDIENTE_VERIFICACION, 4.2);
            // Actualizar fechas de verificación
            empTech.verificar();
            this.emprendedores.set(empTech.id, empTech);
            this.emprendedores.set(empFood.id, empFood);
            this.emprendedores.set(empFashion.id, empFashion);
            console.log('✅ Datos de prueba de Emprendedor inicializados');
        }
        catch (error) {
            console.error('❌ Error inicializando datos de Emprendedor:', error);
        }
    }
    // Método para obtener estadísticas
    obtenerEstadisticas() {
        const emprendedores = Array.from(this.emprendedores.values());
        const porEstado = {};
        const porSector = {};
        const porExperiencia = {};
        let sumaPuntuaciones = 0;
        let verificados = 0;
        emprendedores.forEach(emprendedor => {
            // Estadísticas por estado
            const estado = emprendedor.estado;
            porEstado[estado] = (porEstado[estado] || 0) + 1;
            // Estadísticas por sector
            const sector = emprendedor.sector;
            porSector[sector] = (porSector[sector] || 0) + 1;
            // Estadísticas por experiencia
            const experiencia = emprendedor.experiencia;
            porExperiencia[experiencia] = (porExperiencia[experiencia] || 0) + 1;
            // Puntuaciones y verificados
            sumaPuntuaciones += emprendedor.puntuacion;
            if (emprendedor.estaVerificado()) {
                verificados++;
            }
        });
        return {
            total: emprendedores.length,
            porEstado,
            porSector,
            porExperiencia,
            puntuacionPromedio: emprendedores.length > 0 ?
                Number((sumaPuntuaciones / emprendedores.length).toFixed(2)) : 0,
            verificados
        };
    }
}
