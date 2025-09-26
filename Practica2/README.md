# Sistema de Venta de Productos

## Titulo del Proyecto
Sistema de Venta de Productos - Plataforma backend completa para gestion de usuarios, clientes y emprendedores en un entorno de comercio electronico desarrollado en TypeScript con arquitectura hexagonal.

## Integrantes y Contribuciones
- Integrante 1: [Diego Velez] - Desarrollo de entidades y arquitectura hexagonal
- Integrante 2: [Wendy Moreira] - Implementacion de repositorios y patrones asincronos  
- Integrante 3: [Nibia Rodriguez] - Servicios de aplicacion y documentacion

Nota: Completar con los nombres reales de los integrantes del equipo

## Arquiectura del Sistema

### Patron Arquitectonico: Hexagonal (Ports and Adapters)
El sistema implementa una arquitectura hexagonal que garantiza:
- Separacion de responsabilidades entre dominio, aplicacion e infraestructura
- Independencia de frameworks y tecnologias externas
- Testabilidad y mantenibilidad del codigo
- Principios SOLID aplicados en toda la estructura

### Estructura de Capas:
```
src/
├── domain/           # Capa de Dominio
│   ├── usuario/      # Entidad Usuario con value objects
│   ├── cliente/      # Entidad Cliente con validaciones
│   └── emprendedor/  # Entidad Emprendedor con negocio
├── application/      # Capa de Aplicacion
│   └── services/     # Servicios que orquestan el dominio
├── infrastructure/   # Capa de Infraestrucutra
│   └── repositories/ # Implementaciones de persistencia
├── shared/          # Recursos Compartidos
│   └── types.ts        # Tipos e interfaces globales
└── main.ts          # Punto de entrada principal
```

### Entidades del Dominio:
- Usuario: Gestion de usuarios con autenticacion y roles
- Cliente: Administracion de clientes con categorizacion automatica  
- Emprendedor: Manejo de emprendedores con especialidades y calificacines

## Instrucciones de Instalacion

### Prerrequisitos
- Node.js: version 18 o superior
- npm: version 8 o superior
- TypeScript: version 5.0 o superior

### Pasos de Instalacion

1. Clonar o descargar el projecto
```bash
cd servidorweb
```

2. Instalar dependencias
```bash
npm install
```

3. Verificar instalacion
```bash
npm run build
```

### Dependencias Princiaples
- typescript: ^5.0.0 - Lenguaje principal
- @types/node: ^18.0.0 - Tipos de Node.js
- uuid: ^9.0.0 - Generacion de IDs unicos
- chalk: ^5.0.0 - Colorizacion de consola
- ts-node: ^10.0.0 - Ejecucion directa de TypeScript

## Instrucciones de Ejecucion

### Modo Produccion (Recomendado)
```bash
# 1. Compilar el projecto
npm run build

# 2. Ejecutar el sistema compilado
npm start
# O alternativamente:
node dist/main.js
```

### Modo Desarrollo
```bash
# Ejecutar directamente con ts-node
npm run dev
```

### Scripts Disponbles
- npm run build - Compila TypeScript a JavaScript
- npm start - Ejecuta el projecto compilado
- npm run dev - Ejecuta en modo desarrollo

## Documentacion de APIs

### API Usuario

#### Crear Usuario (Callbacks)
```typescript
usuarioService.crear(nuevoUsuario, (error, resultado) => {
    if (error) console.error('Error:', error);
    else console.log('Usuario creado:', resultado.data);
});
```

#### Consultar Usuario (Async/Await)
```typescript
const usuario = await usuarioService.obtenerPorId(id);
const usuarios = await usuarioService.obtenerTodos();
```

#### Actualizar Usuario (Promises)
```typescript
usuarioService.actualizar(id, datosActualizados)
    .then(resultado => console.log('Actualizado:', resultado))
    .catch(error => console.error('Error:', error));
```

#### Eliminar Usuario (Async/Await)
```typescript
const eliminado = await usuarioService.eliminar(id);
```

### API Cliente

#### Crear Cliente (Callbacks)
```typescript
clienteService.crear(nuevoCliente, (error, resultado) => {
    if (error) console.error('Error:', error);
    else console.log('Cliente creado:', resultado.data);
});
```

#### Consultar Clientes (Async/Await)
```typescript
const cliente = await clienteService.obtenerPorId(id);
const clientesVIP = await clienteService.obtenerClientesVIP();
const estadisticas = await clienteService.obtenerEstadisticas();
```

#### Actualizar Cliente (Promises)
```typescript
clienteService.actualizar(id, datosActualizados)
    .then(resultado => console.log('Cliente actualizado'))
    .catch(error => console.error('Error:', error));
```

### API Emprendedor

#### Crear Emprendedor (Callbacks)
```typescript
emprendedorService.crear(nuevoEmprendedor, (error, resultado) => {
    if (error) console.error('Error:', error);
    else console.log('Emprendedor creado:', resultado.data);
});
```

#### Consultar Emprendedores (Async/Await)
```typescript
const emprendedor = await emprendedorService.obtenerPorId(id);
const porSector = await emprendedorService.obtenerPorSector(SectorEmprendimiento.TECNOLOGIA);
const verificados = await emprendedorService.obtenerVerificados();
```

#### Gestion de Puntuaciones (Async/Await)
```typescript
await emprendedorService.actualizarPuntuacion(id, 4.5);
const promedio = await emprendedorService.obtenerPromedioPuntuaciones();
```

## Paradigmas Implementados

### 1. CREATE - Patron Callbacks
```typescript
// Implementacion en repositorios
crear(entidad: T, callback: (error: Error | null, resultado: OperationResult<T>) => void): void {
    setTimeout(() => {
        try {
            // Logica de creacion con validaciones
            const nuevaEntidad = { ...entidad, id: uuidv4() };
            this.datos.set(nuevaEntidad.id, nuevaEntidad);
            callback(null, { success: true, data: nuevaEntidad });
        } catch (error) {
            callback(error as Error, { success: false, error: error.message });
        }
    }, 100); // Simulacion de latencia de red
}
```

Caracteristicas:
- Manejo de errores en primer parametro
- Resultado en segundo parametro
- Simulacion de operaciones asincronas
- Validaciones de integridad

### 2. UPDATE - Patron Promises
```typescript
// Implementacion en repositorios
actualizar(id: string, datosActualizacion: Partial<T>): Promise<OperationResult<T>> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const entidadExistente = this.datos.get(id);
                if (!entidadExistente) {
                    resolve({ success: false, error: 'Entidad no encontrada' });
                    return;
                }
                
                const entidadActualizada = { ...entidadExistente, ...datosActualizacion };
                this.datos.set(id, entidadActualizada);
                resolve({ success: true, data: entidadActualizada });
            } catch (error) {
                reject(error);
            }
        }, 120);
    });
}
```

Caracteristicas:
- Uso de Promise constructor
- Resolucion con resolve() y reject()
- Validacion de existencia previa
- Manejo de errores con try/catch

### 3. READ - Patron Async/Await
```typescript
// Implementacion en repositorios
async obtenerPorId(id: string): Promise<T | null> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const entidad = this.datos.get(id);
            resolve(entidad || null);
        }, 80);
    });
}

async obtenerTodos(): Promise<T[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(Array.from(this.datos.values()));
        }, 100);
    });
}
```

Caracteristicas:
- Funciones marcadas como async
- Uso de await para operaciones asincronas
- Manejo limpio con try/catch
- Retorno directo de valores

### 4. DELETE - Patron Async/Await
```typescript
// Implementacion en repositorios
async eliminar(id: string): Promise<boolean> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const existia = this.datos.has(id);
            if (existia) {
                this.datos.delete(id);
            }
            resolve(existia);
        }, 90);
    });
}
```

Caracteristicas:
- Retorno de boolean indicando exito
- Validacion de existencia previa
- Operacion atomica de eliminacion
- Consistencia en el manejo temporal

## Evidencias de Funcionamiento

### Salida de Consola Exitosa
```
=== SISTEMA DE VENTA DE PRODUCTOS ===

PRUEBAS DE USUARIOS
Creando usuarios...
Usuario creado: admin-user (ADMINISTRADOR)
Usuario creado: maria-gonzalez-emp (EMPRENDEDOR)  
Usuario creado: juan-perez-cli (CLIENTE)

Consultando usuarios...
Total usuarios: 3

Actualizando usuarios...
Usuario admin-user actualizado correctamente
Usuario maria-gonzalez-emp actualizado correctamente

Eliminando usuario de prueba...
Usuario eliminado correctamente

PRUEBAS DE CLIENTES
Creando clientes...
Cliente creado: Ana Rodriguez (Categoria: ORO)
Cliente creado: Carlos Mendez (Categoria: PLATA)
Cliente creado: Sophia Johnson (Categoria: PLATINO)

Consultando clientes VIP...
Clientes VIP encontrados: 2

Estadisticas de clientes:
- Total: 3 clientes
- Edad promedio: 31.67 años
- Distribucion por categoria: ORO(1), PLATA(1), PLATINO(1)

PRUEBAS DE EMPRENDEDORES
Creando emprendedores...
Emprendedor creado: Laura Martinez (TECNOLOGIA)
Emprendedor creado: Diego Ramirez (ALIMENTACION)
Emprendedor creado: Camila Torres (MODA)

Consultando emprendedores verificados...
Emprendedores verificados: 1

Promedio de puntuaciones: 4.50 estrellas

=== TODAS LAS PRUEBAS COMPLETADAS EXITOSAMENTE ===
```

### Verificacion de Patrones Asincronos
- Callbacks: Creacion de usuarios, clientes y emprendedores
- Promises: Actualizacion de todas las entidades
- Async/Await: Consultas y eliminaciones
- Manejo de Errores: En todos los paradigmas

### Validaciones Funcionales
- Usuarios unicos: Por username y email
- Clientes mayor de edad: Validacion automatica
- Emprendedores especializados: Con sectores validos
- Value Objects: Email, direcciones, documentos validos

### Performance y Simulacion
- Latencia simulada: 80-150ms por operacion
- Operaciones concurrentes: Multiples entidades simultaneas
- Memoria eficiente: Uso de Map para storage
- Colorizacion: Output visual organizado

## Conclusiones Individuales

### Sobre la Arquitectura Hexagonal
La implementacion de la arquitectura hexagonal demostro ser efectiva para:
- Separar responsabilidades claramente entre capas
- Facilitar testing mediante interfaces bien definidas
- Permitir extensibilidad sin modificar codigo existente
- Garantizar mantenibilidad a largo plazo

### Sobre los Paradigmas Asincronos
La aplicacion de diferentes paradigmas asincronos proporciono:
- Callbacks: Control fino sobre errores y timing
- Promises: Composicion elegante de operaciones
- Async/Await: Codigo mas legible y mantenible
- Manejo consistente: De errores en todos los paradigmas

### Sobre los Principios SOLID
La aplicacion de principios SOLID resulto en:
- Single Responsibility: Cada clase con proposito especifico
- Open/Closed: Extensible sin modificar codigo base
- Liskov Substitution: Interfaces intercambiables
- Interface Segregation: Contratos especificos por dominio
- Dependency Inversion: Bajo acoplamiento entre capas

### Sobre el Dominio de Negocio
El modelado del dominio de venta de productos logro:
- Entidades ricas: Con logica de negocio encapsulada
- Value Objects: Validaciones robustas y reutilizables
- Reglas de negocio: Implementadas en el dominio
- Casos de uso reales: Simulacion de escenarios comerciales

### Aprendizajes Tecnicos
- TypeScript: Beneficios del tipado estatico en proyectos grandes
- Patrones de diseño: Repository, Service Layer, Value Object
- Programacion asincrona: Comprension profunda de diferentes paradigmas
- Arquitectura de software: Importacia de la separacion de responsabilidades

### Recomendaciones para Produccion
Para llevar este sistema a produccion se recomienda:
- Base de datos real: Migrar de repositorios en memoria
- Autenticacion JWT: Sistema de tokens para seguridad
- API REST: Exposicion de endpoints HTTP
- Testing automatizado: Unit tests e integration tests
- Monitoreo: Logs estructurados y metricas
- Documentacion API: Swagger/OpenAPI specification

---

## Tecnologias Utilizadas

- Node.js 18+: Runtime JavaScript
- TypeScript 5.0+: Superset tipado de JavaScript
- UUID: Generacion de identificadores unicos
- Chalk: Colorizacion de output en consola
- ES Modules: Sistema de modulos moderno

## Soporte

Para dudas o soporte tecnico:
- Email: [email del equipo]
- Teams: [canal del equipo]
- Repositorio: [enlace al repositorio]

---

Sistema desarrollado como practica academica aplicando principios de ingenieria de software y patrones de diseño modernos.