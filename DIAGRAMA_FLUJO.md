# Diagrama de Flujo - Centro de Formación

## Arquitectura General

```mermaid
flowchart TD
    subgraph Frontend
        UI[React + Vite + shadcn/ui]
        Auth[Auth Context]
        Routes[React Router]
    end
    
    subgraph Backend
        API[Express API]
        DB[(MongoDB)]
    end
    
    Users{Usuarios}
    
    Users -->|Estudiante| UI
    Users -->|Docente| UI
    Users -->|Empresa| UI
    Users -->|SuperAdmin| UI
    
    UI -->|HTTP| API
    API -->|CRUD| DB
    
    subgraph Roles
        Est[Estudiante]
        Doc[Docente]
        Emp[Empresa]
        SA[SuperAdmin]
    end
    
    Est -->|Ver cursos| UI
    Est -->|Tomar contenido| UI
    Est -->|Evaluar| UI
    Est -->|Certificado| UI
    
    Doc -->|Crear sala| UI
    Doc -->|Subir contenido| UI
    Doc -->|Calificar| UI
    
    Emp -->|Gestionar empleados| UI
    Emp -->|Ver reportes| UI
    
    SA -->|Gestionar empresas| UI
    SA -->|Configurar sistema| UI
```

## Flujo de Autenticación

```mermaid
flowchart LR
    A[Login] --> B{Validar credenciales}
    B -->|Incorrectas| C[Mostrar error]
    B -->|Correctas| D[Generar token]
    D --> E[Guardar en context]
    E --> F[Redirigir según rol]
    
    F -->|Estudiante| G[Dashboard Estudiante]
    F -->|Docente| H[Dashboard Docente]
    F -->|Empresa| I[Dashboard Empresa]
    F -->|SuperAdmin| J[Dashboard SuperAdmin]
```

## Flujo de Inscripción a Sala

```mermaid
flowchart TD
    A[Estudiante busca sala] --> B[Sala disponible?]
    B -->|No| C[Mostrar mensaje]
    B -->|Sí| D[Inscribirse]
    D --> E[Crear inscripción]
    E --> F[Mostrar contenido]
    F --> G[Progreso += contenido]
    G --> H{Contenido completado?}
    H -->|No| F
    H -->|Sí| I{Evaluación?}
    I -->|Sí| J[Presentar evaluación]
    I -->|No| K[Certificado]
    J --> L{Aprobado?}
    L -->|No| J
    L -->|Sí| K
    K --> M[Emitir certificado]
```

## Modelos de Datos

```mermaid
erDiagram
    USUARIO ||--o| DOCENTE : "es"
    USUARIO ||--o| ESTUDIANTE : "es"
    USUARIO ||--o| EMPRESA : "gestiona"
    
    USUARIO {
        string email PK
        string password
        string rol
        string nombre
        string apellido
        boolean activo
    }
    
    EMPRESA {
        string nombre
        string email
        string estado
    }
    
    SALA {
        string nombre
        string descripcion
        string docenteId FK
        string empresaId FK
        date fechaInicio
        date fechaFin
        string estado
    }
    
    CONTENIDO {
        string salaId FK
        string titulo
        string tipo
        string url
        int orden
    }
    
    INSCRIPCION {
        string estudianteId FK
        string salaId FK
        int progreso
        string estado
    }
    
    EVALUACION {
        string contenidoId FK
        string estudianteId FK
        int nota
        string estado
    }
    
    CERTIFICADO {
        string estudianteId FK
        string salaId FK
        string hash
    }
    
    SALA ||--o{ CONTENIDO : "tiene"
    SALA ||--o{ INSCRIPCION : "tiene"
    CONTENIDO ||--o{ EVALUACION : "tiene"
    INSCRIPCION ||--o| CERTIFICADO : "genera"
