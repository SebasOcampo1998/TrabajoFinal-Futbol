
# Aprendizaje del proyecto

## 1. Introducción

Este documento presenta los conocimientos adquiridos durante el desarrollo de un Dashboard de Jugadores de Fútbol utilizando React y Vite.

El proyecto fue desarrollado como trabajo académico de Programación, aplicando componentes reutilizables, hooks y administración de estados.

## 2. ¿Qué aprendimos de React?

React permite construir interfaces de usuario mediante componentes independientes y reutilizables.

Aprendimos a separar las responsabilidades de la aplicación en componentes como:

- Header
- SearchBar
- SearchHistory
- StatsPanel
- PlayerTable
- PlayerRow
- Pagination
- Modal
- ThemeToggle

Esta separación facilita el mantenimiento, la comprensión y la reutilización del código.

## 3. Hook useState

Utilizamos useState para administrar información que cambia durante la interacción del usuario.

Ejemplos:

- Texto introducido en el buscador.
- Página seleccionada.
- Jugadores favoritos.
- Apertura y cierre del modal.
- Modo oscuro y claro.
- Ordenamiento de la tabla.

Cuando se modifica un estado, React actualiza la interfaz para reflejar el nuevo valor.

## 4. Hook useEffect

Aprendimos que useEffect permite sincronizar componentes con sistemas externos y administrar efectos secundarios.

Lo utilizamos para:

- Implementar el debounce de 300 milisegundos.
- Guardar favoritos en localStorage.
- Guardar el historial de búsquedas.
- Conservar el modo oscuro y claro.

También comprendimos la importancia de limpiar temporizadores para evitar efectos innecesarios.

## 5. Hook useMemo

Utilizamos useMemo para memorizar cálculos y evitar repetirlos cuando sus dependencias no han cambiado.

En nuestro proyecto se aplica para:

- Filtrar jugadores.
- Ordenar jugadores.
- Calcular estadísticas.
- Obtener jugadores de la página actual.

Aprendimos que la optimización debe aplicarse cuando existe una razón clara para utilizarla.

## 6. Debounce

El debounce permite esperar un intervalo antes de ejecutar una acción.

En nuestro buscador utilizamos 300 milisegundos para evitar actualizar los resultados inmediatamente después de cada pulsación.

Si el usuario continúa escribiendo, el temporizador anterior se cancela.

## 7. localStorage

Aprendimos a utilizar localStorage para conservar información en el navegador incluso cuando se actualiza la página.

Guardamos:

- Jugadores favoritos.
- Historial de búsquedas.
- Tema oscuro o claro.

También utilizamos JSON.stringify y JSON.parse para guardar y recuperar los datos.

## 8. Componentes y props

Las props permiten transmitir información y funciones desde un componente padre hacia sus componentes hijos.

Por ejemplo, App administra los estados y entrega datos a PlayerTable, Pagination y ThemeToggle.

Comprendimos que separar responsabilidades ayuda a mantener el proyecto organizado.

## 9. Ordenamiento, filtrado y paginación

Implementamos funciones para organizar los jugadores por diferentes columnas, aplicar filtros y distribuir los resultados entre páginas.

Aprendimos a trabajar con métodos de JavaScript como:

- filter()
- map()
- reduce()
- sort()
- slice()

## 10. Metodología BEM y diseño responsive

Utilizamos la metodología BEM para organizar los nombres de las clases CSS.

También aplicamos media queries para adaptar la aplicación a celulares, tabletas y computadores.

## 11. Git y GitHub

Aprendimos a trabajar colaborativamente con ramas independientes:

- dev-sebastian
- dev-esteban
- main

Utilizamos commits, push, pull requests y fusiones para integrar el trabajo de ambos integrantes.

## 12. Uso de inteligencia artificial

Durante el desarrollo utilizamos ChatGPT como herramienta de apoyo académico.

La inteligencia artificial nos ayudó a:

- Comprender conceptos de React y JavaScript.
- Estructurar componentes reutilizables.
- Identificar y corregir errores.
- Comprender el funcionamiento de los hooks.
- Revisar comandos de Git y GitHub.
- Organizar la documentación.

El código fue integrado y probado durante el desarrollo del proyecto. La herramienta se utilizó como apoyo al aprendizaje y a la resolución de problemas.

## 13. Conclusión

El proyecto permitió fortalecer nuestros conocimientos sobre React, JavaScript, CSS, hooks y trabajo colaborativo con GitHub.

Comprendimos que desarrollar una aplicación no consiste solamente en escribir código, sino también en organizarlo, probarlo, documentarlo y comprender cómo funciona.
