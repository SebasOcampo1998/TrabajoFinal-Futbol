
# ⚽ Dashboard de Jugadores de Fútbol

## Descripción

Aplicación web desarrollada con React y Vite que permite consultar, buscar y organizar información de jugadores de fútbol.

El proyecto incorpora funcionalidades interactivas mediante hooks de React, almacenamiento local y componentes reutilizables.

Fue desarrollado como trabajo final académico para demostrar el uso de React, JavaScript, CSS, Git y GitHub.

## Integrantes

- Sebastian Ocampo
- Esteban

## Tecnologías utilizadas

- React
- JavaScript (JSX)
- Vite
- HTML5
- CSS3
- Git y GitHub
- localStorage

## Funcionalidades

### 1. Búsqueda de jugadores

Permite buscar futbolistas por nombre.

Se implementó un debounce de 300 milisegundos para evitar actualizar los resultados después de cada pulsación.

Incluye un botón para limpiar el campo de búsqueda y un contador de resultados.

### 2. Tabla de jugadores

Muestra información como:

- Número
- Nombre
- Equipo
- Posición
- País
- Edad
- Goles
- Asistencias

Contiene 30 jugadores con datos de ejemplo.

### 3. Ordenamiento

Permite ordenar los registros por diferentes columnas.

El ordenamiento alterna entre ascendente, descendente y sin ordenar.

### 4. Coloreo de filas

Incluye controles para:

- Pintar filas pares.
- Pintar filas impares.
- Restablecer los colores originales.

### 5. Paginación

Permite visualizar 5, 10 o 20 jugadores por página.

Incluye navegación entre páginas y contador de registros.

### 6. Estadísticas

Presenta indicadores calculados con useMemo:

- Cantidad de jugadores filtrados.
- Edad promedio.
- Máximo goleador.
- Distribución por posiciones.

### 7. Modal de detalles

Al seleccionar un jugador se abre una ventana con su información.

El modal se puede cerrar utilizando el botón correspondiente, haciendo clic fuera de la ventana o presionando Escape.

### 8. Favoritos

Permite marcar y desmarcar jugadores favoritos.

Incluye un filtro para mostrar únicamente favoritos y almacenamiento persistente mediante localStorage.

### 9. Historial de búsquedas

Conserva las últimas cinco búsquedas realizadas.

Permite reutilizar búsquedas anteriores y limpiar el historial.

### 10. Modo oscuro y claro

Permite alternar entre dos temas visuales.

La selección se conserva mediante localStorage incluso después de actualizar la página.

### 11. Diseño responsive

La interfaz se adapta a diferentes tamaños de pantalla, incluyendo computadores, tabletas y dispositivos móviles.

## Instalación

### Requisitos

- Node.js
- npm
- Visual Studio Code u otro editor de código

### Clonar el repositorio

```bash
git clone https://github.com/SebasOcampo1998/TrabajoFinal-Futbol.git
```

### Ingresar a la carpeta

```bash
cd TrabajoFinal-Futbol
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar el proyecto

```bash
npm run dev
```

En Windows PowerShell también se puede utilizar:

```powershell
npm.cmd run dev
```

Después se debe abrir en el navegador la dirección local indicada por Vite, normalmente:

http://localhost:5173/

## Estructura del proyecto

```text
src/
├── components/
│   ├── Header.jsx
│   ├── SearchBar.jsx
│   ├── SearchHistory.jsx
│   ├── StatsPanel.jsx
│   ├── PlayerTable.jsx
│   ├── PlayerRow.jsx
│   ├── Pagination.jsx
│   ├── Modal.jsx
│   └── ThemeToggle.jsx
├── data/
│   └── players.js
├── styles/
│   └── Archivos CSS de los componentes
├── App.jsx
├── App.css
└── main.jsx
```

## Hooks implementados

### useState

Gestiona los estados de búsqueda, favoritos, ordenamiento, paginación, modal y tema visual.

### useEffect

Permite gestionar el debounce y sincronizar información con localStorage.

### useMemo

Optimiza los cálculos de filtrado, ordenamiento, estadísticas y paginación.

## Trabajo colaborativo

El desarrollo se realizó utilizando GitHub y ramas independientes.

- main: rama principal del proyecto.
- dev-sebastian: desarrollo de funcionalidades e integración.
- dev-esteban: desarrollo de componentes asignados.

Los cambios se integraron mediante commits y pull requests.

## Uso de inteligencia artificial

Durante el desarrollo se utilizó ChatGPT como herramienta de apoyo para comprender conceptos, organizar componentes, resolver errores y documentar el proyecto.

El código se integró y se sometió a pruebas funcionales durante el desarrollo.

## Validaciones

Se realizaron pruebas de:

- Búsqueda y debounce.
- Ordenamiento.
- Paginación.
- Favoritos.
- Modal.
- Historial de búsquedas.
- Coloreo de filas.
- Persistencia del tema visual.
- Diseño responsive.
- ESLint.

## Repositorio

https://github.com/SebasOcampo1998/TrabajoFinal-Futbol

## Documentación adicional

Consultar APRENDIZAJE.md para conocer los conceptos aprendidos durante el desarrollo.

## Estado del proyecto

Funcionalidades principales implementadas y probadas. Pendiente la publicación y validación final de entrega.