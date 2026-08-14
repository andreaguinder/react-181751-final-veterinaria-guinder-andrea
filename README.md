# Mini Dashboard y Sistema de Enrutamiento en React

## Descripción del Proyecto

Esta aplicación es una tienda/mini dashboard interactivo desarrollado con React, Vite y Sass Modules. El objetivo principal del proyecto es implementar un sistema completo de navegación y control de acceso utilizando **React Router DOM**, abarcando desde rutas públicas estáticas hasta rutas dinámicas, una vista de inicio de sesión dedicada (`/login`), una **ruta protegida** (`/checkout`) mediante componentes guardianes (`ProtectedRoute`), y un sistema de autenticación global con `AuthContext`.

Este proyecto fue desarrollado para la **Unidad 3 del Módulo 2**, poniendo en práctica:

* **Configuración del Enrutador:** Uso de `BrowserRouter`, `Routes` y `Route` como arquitectura base de navegación.
* **Layouts y Rutas Anidadas:** Estructuración de páginas hijas mediante `<Outlet />` dentro de un layout principal con navegación fija (`Header` y `Footer`).
* **Navegación Declarativa e Imperativa:** Uso de componentes `<Link>` para la barra de navegación y el hook `useNavigate` para navegación programática.
* **Rutas Dinámicas:** Captura y lectura de parámetros de URL mediante `useParams` para mostrar la vista detallada de productos (`/producto/:id`).
* **Rutas Protegidas y Redirección Post-Login:** Uso de `<Navigate />` y `useLocation` dentro de un componente `ProtectedRoute` para restringir el acceso a la vista `/checkout`, preservando la ubicación de origen para redirigir automáticamente al usuario tras autenticarse con éxito.
* **Gestión de Autenticación y Context:** Implementación de `AuthContext` para compartir el estado de inicio de sesión (`isLoggedIn`) en toda la aplicación.

---

## Funcionalidades Implementadas

* **Layout Anidado (`MainLayout`):** Mantiene una estructura visual persistente con `Header` y `Footer` mientras el contenido dinámico cambia en el `<Outlet />`.
* **Navegación por Páginas:** Rutas funcionales para `Inicio`, `Nosotros`, `Contacto` y `Login`.
* **Detalle de Producto Dinámico (`/producto/:id`):** Mapeo de parámetros en la URL utilizando `useParams` para renderizar la información de productos específicos.
* **Formulario de Contacto Validado:** Manejo nativo de validación con HTML5 (`required`) a través del evento `onSubmit` del formulario y modal de confirmación de envío.
* **Protección de Rutas (`ProtectedRoute`):** 
  * Si un usuario no autenticado intenta ingresar a la ruta privada `/checkout` (ya sea por URL o desde la acción de compra/carrito), la aplicación lo intercepta con `<Navigate />` y lo redirige a `/login`.
  * La página de `/login` detecta la ubicación previa mediante el estado del hook `useLocation` y, una vez iniciada la sesión, lo reenvía automáticamente a la pantalla de `/checkout`.
* **Comportamiento Condicional de Usuario:**
  * El `Header` cambia dinámicamente sus acciones mostrando "Iniciar Sesión" (link a `/login`) o el botón de "Cerrar Sesión".
  * Los usuarios logueados pueden acceder libremente a la vista protegida de `/checkout` y confirmar sus compras.

---

## Estructura de Archivos Principal

La arquitectura modular del proyecto se organiza de la siguiente manera:

* `src/context/`:
    * `AuthContext.jsx`: Proveedor del estado global de autenticación (`isLoggedIn`, `login`, `logout`).
* `src/components/`: 
    * `Header/`: Navegación principal con enlaces condicionales según el estado de sesión.
    * `Footer/`: Pie de página estático.
    * `MainLayout/`: Contenedor principal con `<Outlet />`.
    * `ProtectedRoute/`: Componente guardián que evalúa la autenticación para proteger rutas privadas.
    * `SuccessModal/`: Modal de confirmación para agregados al carrito con opción de navegación al checkout.
    * `SuccessModalForm/`: Modal de confirmación para el envío del formulario de contacto.
    * `ProductCard/`: Tarjeta visual para renderizar cada producto individual.
    * `ProductDetail/`: Componente con la información detallada del producto y lógica de navegación.
    * `Loader/`: Indicador visual de estado de carga.
* `src/pages/`:
    * `Inicio.jsx`: Vista principal con catálogo de productos.
    * `Nosotros.jsx`: Información institucional.
    * `Contacto.jsx`: Vista de contacto con formulario y validación nativa.
    * `Producto.jsx`: Vista dinámica (`/producto/:id`) que renderiza el `ProductDetail`.
    * `Login.jsx`: Página de inicio de sesión pública con redirección inteligente post-login.
    * `Checkout.jsx`: Vista protegida privada a la que solo se accede estando autenticado.
* `src/styles/`: Módulos Sass (`Pages.module.scss`) y estilos globales para el encapsulamiento de diseño.

---

## Alcance del Proyecto (Fuera de la Consigna)

Con el fin de mantener el foco exclusivo en los objetivos académicos de la unidad (**Enrutamiento, navegación y rutas protegidas en React Router**), la aplicación **no incluye**:

* **Vista de Carrito de Compras Extensa (`/cart`):** Se priorizó el flujo directo hacia la vista protegida de confirmación/checkout (`/checkout`).
* **Pasarela de Pagos Real o Backend:** La autenticación y el estado de compra son simulaciones cliente-side soportadas por React Router DOM y React Context.

> **Nota:** La implementación de un flujo complejo de persistencia en base de datos o pasarelas de pago reales responde a funcionalidades que exceden el alcance de la tarea actual y se abordarán en instancias más avanzadas del cursado.

---

## Instrucciones para Ejecutar el Proyecto Localmente

Para clonar, instalar las dependencias y ejecutar este proyecto en tu entorno local, seguí estos pasos desde tu terminal:

1. **Clonar el repositorio:**
   ```bash
   git clone <https://github.com/andreaguinder/react-181751-modulo-2-unidad-3-enrutamiento-tarea-guinder-andrea.git>

2. **Ingresar a la carpeta del proyecto**
Luego moverse del directorio que se creó con el nombre del proyecto:
    ```bash
    cd react-181751-modulo-2-unidad-3-enrutamiento-tarea-guinder-andrea

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

##  Capturas de pantalla

En /src/proyecto adjunto capturas de pantalla de mobile y desktop de como se visualiza el proyecto en el navegador y también el pdf de la tarea.

---

##  Créditos del Autor

Estudiante: Andrea Guinder

Curso: React (Comisión 181751)

Módulo 2 - Unidad 3: Enrutamiento - Tarea N° 3

Institución: Universidad Tecnológica Nacional

---

##  Fuentes y Referencias

* Material teórico proporcionado por la Universidad Tecnológica Nacional (UTN).

* Material teórico y práctico de CoderHouse de curso de React.js

* Material teórico de curso profesional de React.js de CodigoFacilito.

* Asistencia de IA: Soporte técnico y resolución de dudas mediante Gemini.
