# Sistema de Gestión de Turnos y Servicios Veterinaria Huellas — React, React Router & Firebase

## Descripción del Proyecto

Esta aplicación es una plataforma web interactiva desarrollada para Veterinaria Huellas utilizando React, Vite, Firebase (Firestore & Auth) y Sass Modules. El objetivo principal del proyecto es proveer un sistema integral para la gestión de turnos médicos y catálogo de servicios veterinarios, permitiendo tanto a los clientes reservar y consultar turnos, como al equipo administrador administrar los registros mediante un CRUD completo en tiempo real respaldado por Firestore.

El proyecto fue desarrollado para la entrega académica final del curso de React, aplicando arquitecturas limpias, separación de responsabilidades y las mejores prácticas del desarrollo Frontend:

* **Arquitectura de Navegación Completa:** Configuración de rutas públicas, dinámicas, protegidas por rol (ProtectedRoute y AdminRoute) y manejo de errores 404 (*) con React Router DOM.

* **Base de Datos en Tiempo Real & Auth:** Integración con Firebase Firestore para la persistencia del CRUD de turnos y servicios, y Firebase Authentication para el control de acceso y estados de sesión mediante AuthContext.

* **Hooks Avanzados de React:** Uso estratégico de useState, useEffect, useMemo y useRef para optimizar renderizados, enfocar formularios y memorizar búsquedas.

* **Aislamiento de Lógica (Services & Modularization):** Separación total de las peticiones a la base de datos en módulos independientes (/services), validaciones desacopladas (/utils) y estilos encapsulados con CSS Modules (Sass).

---

## Mapeo de Requisitos de la Consigna vs. Implementación

A continuación se detalla cómo cada punto de la consigna obligatoria fue abordado en el proyecto:

### 1. React & Hooks Requeridos
* `useState`: Utilizado para la gestión local de estados en componentes (datos de formularios, errores, estado de modales y términos de búsqueda).
* `useEffect`: Utilizado para la suscripción y obtención de datos asíncronos desde Firestore y el foco automático de inputs.
* `useMemo`: Implementado en la vista de `/servicios` para memorizar la lista filtrada de servicios según el término ingresado por el usuario, evitando cómputos innecesarios en re-renders.
* `useRef`: Aplicado en el campo de búsqueda de `/servicios` para otorgar el foco automático (`focus()`) al cargar la interfaz, y en formularios para manipulación de referencias del DOM.

### 2. React Router & Navegación
* **Ruta Principal:** `/` (`Inicio.jsx`) y `/servicios` (`Servicios.jsx`).
* **Ruta de Login:** `/login` (`Login.jsx`) con soporte para registro/autenticación y autocompletado para entorno Demo.
* **Ruta Dinámica de Detalle:** `/servicios/:id/:slug?` (`ItemServiceDetail.jsx`) para consultar la información detallada de cada servicio usando `useParams`.
* **Ruta 404 (Página de Error):** `*` (`PaginaError.jsx`) dentro de `MainLayout` para mantener navegación (Header/Footer) y que el usuario no quede encerrado.
* **Rutas Protegidas:** `/mis-turnos` (`ProtectedRoute`) y `/admin` (`AdminRoute`).

### 3. Firebase Firestore & CRUD Completo
La aplicación gestiona la colección de `turnos` en Firestore cumpliendo el ciclo CRUD completo:
* **Create (Crear):** Formulario en `/pedir-turno` para agendar citas médicas.
* **Read (Leer):** Visualización general de turnos en el panel `/admin` y en `/mis-turnos` según login.
* **Update (Editar):** Edición completa de los datos de un turno existente.
* **Delete (Eliminar):** Eliminación de registros con modal de confirmación previa.
* **Operación de Estado Booleano:** Cambio del estado `isCompleted` (Completado / Pendiente) mediante un botón de alternancia rápida en la lista de turnos en Administración.

### 4. Capa de Servicios (`/services`)
La lógica de consumo y gestión de datos se encuentra desacoplada de la interfaz de usuario mediante hooks personalizados:
* `src/hooks/useServices.jsx`: Custom hook centralizado encargado de gestionar el estado, la carga y la provisión del catálogo de servicios de la veterinaria a toda la aplicación.

### 5. Variables de Entorno
La configuración de Firebase utiliza variables de entorno mediante Vite (`import.meta.env`) en `src/config/firebaseConfig.js`, protegiendo credenciales sensibles:
* `VITE_FIREBASE_API_KEY`
* `VITE_FIREBASE_AUTH_DOMAIN`
* `VITE_FIREBASE_PROJECT_ID`
* `VITE_FIREBASE_STORAGE_BUCKET`
* `VITE_FIREBASE_MESSAGING_SENDER_ID`
* `VITE_FIREBASE_APP_ID`

### 6 y 7. Formulario Controlado, `useRef` & Módulo de Validación
* **Formulario Controlado:** Los formularios de login y gestión de turnos se sincronizan mediante estado (`useState`).
* **Foco con `useRef`:** Auto-foco configurado al renderizar el campo de búsqueda o entrada principal.
* **Validaciones Independientes:** Ubicadas en `src/utils/validations.js`. La función `validarTurno` y `validarLogin` verifican campos requeridos, cadenas vacías y formato de email antes de procesar envíos a Firebase.

### 8. Búsqueda y Filtrado (`useMemo`)
En la sección `/servicios`, la barra de búsqueda procesa dinámicamente el catálogo con `useMemo`, permitiendo filtrar por nombre del servicio en tiempo real.

### 9 y 10. Edición y Eliminación con Feedback
* **Edición:** Todos los turnos creados tienen la opción de ser editados, actualizandolos y/o de ser borrados.
* **Eliminación Segura:** Se solicita confirmación explícita mediante modal antes de la supresión definitiva en Firestore.

### 11. Vista de Detalle (`/servicios/:id`)
El componente `ItemServiceDetail` lee el parámetro de la URL mediante `useParams`, ejecuta la petición a Firestore mediante `getServiceById` y renderiza el desglose completo del servicio elegido.

### 12. Estados de Carga y Manejo de Errores
* **Carga (Loading):** Implementación del componente `<Loader/>` durante las peticiones asíncronas a Firebase.
* **Feedback de Errores:** Mensajes informativos dinámicos si las credenciales fallan o si ocurre una interrupción de red con Firestore.

---

## Funcionalidades Destacadas de la Aplicación

* **Persistencia de Turno Pendiente (Guest Flow):** Si un usuario no autenticado intenta reservar un turno, la información se almacena temporalmente en `sessionStorage`. Al iniciar sesión o registrarse en `/login`, el turno se guarda automáticamente en Firestore y el usuario es redirigido a `/mis-turnos`.
* **Credenciales de Prueba (Demo Admin):** La pantalla de login incluye una descripción con las credenciales para acceder con el rol de Administrador y evaluar el panel interactivo.
* **Layout Responsive & Sass:** Diseño adaptativo pensado desde *Mobile First* con breakpoints claros para Escritorio (`min-width: 768px y/o min-width: 1024px`) y CSS Modules para encapsulamiento de clases.

---

## Oportunidad de Uso en el Mundo Real & Escalabilidad

Aunque nació como un proyecto académico, esta plataforma fue concebida bajo estándares profesionales, lo que le otorga un **alto potencial de despliegue en un entorno de producción real** con muy pocos ajustes:

* **Conversión a PWA (Progressive Web App):** La aplicación fue configurada e implementada como una PWA. Esto significa que es totalmente instalable/descargable directamente en el celular o la computadora del cliente como si fuera una app nativa (sin pasar por tiendas de aplicaciones), ofreciendo tiempos de carga ultrarrápidos, interfaz ágil y capacidades de funcionamiento offline o en conexiones lentas.
* **Diseño 100% Responsive:** Adaptabilidad total en dispositivos móviles, tablets y monitores de escritorio para garantizar una experiencia fluida a cualquier usuario.
* **Gestión Dinámica de Servicios:** La arquitectura permite que la veterinaria reemplace los datos de prueba y cargue su catálogo real de servicios, precios y especificaciones en Firestore sin necesidad de modificar el código fuente.
* **Integración con Google Calendar:** El sistema de reserva de turnos está diseñado modularmente para que, en un siguiente nivel de desarrollo, la creación de un turno (`createTurno`) se conecte mediante una API/Webhook con el Google Calendar de la veterinaria, agendando la cita de forma automática en la agenda del profesional.
* **Seguridad de Producción:** Para dar el salto a un comercio real, solo bastaría cambiar las credenciales de acceso administrador por un email/contraseña con hash seguro y ajustar las reglas de seguridad de Firestore para restringir la escritura exclusiva al rol autenticado.

---

## Estructura del proyecto

```text

public/                      # Archivos estáticos, datos iniciales y assets PWA
├── apple-touch-icon.png
├── favicon-32x32.png
├── logo-huella.png
├── og-image.png
├── pwa-192x192.png
├── pwa-512x512.png
└── servicesData.json
src/
├── components/              # Componentes UI reutilizables
│   ├── AdminRoute/          # Guardián de ruta exclusivo para administradores
│   ├── CardTurno/           # Tarjeta de turno para cliente
│   ├── CardTurnoAdmin/      # Tarjeta de turno para panel de administración
│   ├── Footer/              # Pie de página con aviso de proyecto académico
│   ├── Header/              # Barra de navegación principal condicional
│   ├── Loader/              # Indicador visual de estados de carga
│   ├── MainLayout/          # Layout envolvente con <Outlet/>
│   ├── ProtectedRoute/      # Guardián de ruta para usuarios autenticados
│   ├── ServiceCard/         # Tarjeta de presentación de servicio
│   ├── ServiceDetail/       # Componente con la vista detallada del servicio
│   └── SuccessModalForm/    # Modal de confirmación para el envío de formularios
├── config/
│   └── firebaseConfig.js    # Inicialización de Firebase con variables de entorno
├── context/
│   └── AuthContext.jsx      # Contexto global para sesión de usuario y roles
├── hooks/
│   └── useServices.jsx      # Custom hook para gestión y consumo de servicios
├── pages/                   # Vistas principales de la aplicación (Rutas)
│   ├── Admin.jsx            # Panel de control CRUD para la veterinaria
│   ├── Inicio.jsx           # Home principal de la veterinaria
│   ├── ItemServiceDetail.jsx# Vista dinámica de detalle (/servicios/:id)
│   ├── Login.jsx            # Vista de autenticación / registro
│   ├── MisTurnos.jsx        # Dashboard personal del usuario
│   ├── PaginaError.jsx      # Vista 404 personalizada con layout persistente
│   ├── PedirTurno.jsx       # Formulario para agendar cita
│   └── Servicios.jsx        # Catálogo filtrable con useMemo
├── proyecto/                # PDF del proyecto
├── styles/                  # Estilos SCSS encapsulados
│   └── Pages.module.scss
├── utils/
│   └── validations.js       # Funciones independientes de validación de datos
├── App.jsx                  # Configuración de rutas y arquitectura principal
├── index.scss               # Estilos globales de la aplicación
└── main.jsx                 # Punto de entrada de React / Vite

```

---

## Credenciales de Prueba para Evaluación (Acceso Demo)

Para facilitar la revisión y prueba de las rutas protegidas y del panel de administración sin necesidad de crear registros manuales:

Rol Administrador (Acceso a /admin y CRUD completo):

Email: admin@gmail.com

Contraseña: admin1234


## Instrucciones para Ejecutar el Proyecto Localmente

Para clonar, instalar las dependencias y ejecutar este proyecto en tu entorno local, seguí estos pasos desde tu terminal:

1. **Clonar el repositorio:**
   ```bash
   git clone <https://github.com/andreaguinder/react-181751-final-veterinaria-guinder-andrea.git>

2. **Ingresar a la carpeta del proyecto**
Luego moverse del directorio que se creó con el nombre del proyecto:
    ```bash
    react-181751-final-veterinaria-guinder-andrea

3. **Configurar variables de entorno**
Crea un archivo .env en la raíz del proyecto basándote en la siguiente estructura:

VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id

3. **Instalar las dependencias**
Instalar todos los paquetes necesarios especificados en el package.json (incluyendo React y las herramientas de desarrollo como SASS):
    ```bash
    npm install

4. **Ejecutar el servidor de desarrollo**
Iniciar el entorno de desarrollo local para ver la aplicación en el navegador:
    ```bash
    npm run dev

5. Abrir en el navegador
Una vez que la terminal te indique que el servidor está corriendo, abre tu navegador e ingresa la dirección que te figure ejemplo:

http://localhost:5173

---

##  Disclaimer / Aviso Académico

Este sitio web es un proyecto académico realizado únicamente con fines educativos. La veterinaria "Huellas", los servicios, precios, turnos y datos presentados en la plataforma son completamente ficticios.

---

## Despliegue del proyecto

El proyecto fue desplegado en Vercel, se puede acceder directamente a él desde:

* **Veterinaria Huellas:** [https://veterinaria-huellas.vercel.app/](https://veterinaria-huellas.vercel.app/)

También se puede compartir por redes sociales y se verá su configuración de PWA con imágenes acordes a las mismas, y de entrar desde un dispositivo móvil podrá instalarse en él.

---

##  Créditos del Autor

Estudiante: Andrea Belén Guinder Vichich

Curso: React (Comisión 181751)

Proyecto Final: Veterinaria Huellas — Sistema de Gestión de Turnos y Servicios

Institución: Universidad Tecnológica Nacional

---

##  Fuentes y Referencias

* Material teórico y práctico proporcionado por la Universidad Tecnológica Nacional (UTN).

* Material teórico y práctico de CoderHouse de curso de React.js

* Material teórico de curso profesional de React.js de CodigoFacilito.

* Asistencia de IA: Soporte técnico y resolución de dudas mediante Gemini.

---

## ¿Te gustaría colaborar o tenés un desafío laboral?

¡Me encantaría conectar con vos! Estoy abierta a nuevas oportunidades, proyectos desafiantes o simplemente charlar sobre tecnología.

* **Email:** [andreabelen.guinder@gmail.com](mailto:andreabelen.guinder@gmail.com)
* **LinkedIn:** [https://www.linkedin.com/in/andrea-guinder/](https://www.linkedin.com/in/andrea-guinder/)
* **Portfolio:** [https://andreaguinder.com/](https://andreaguinder.com/)