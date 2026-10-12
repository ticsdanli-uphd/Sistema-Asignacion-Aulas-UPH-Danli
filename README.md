# Sistema web de asignación de aulas — UPH Danlí

Aplicación estática compatible con GitHub Pages. No utiliza Supabase ni ninguna plataforma externa para almacenar la información.

## Base de datos local

- Los datos se guardan con IndexedDB dentro del navegador del equipo.
- Se pueden descargar y restaurar respaldos JSON.
- Los datos son independientes en cada navegador o computadora; use el respaldo para trasladarlos.

## AULA TELEDOCENCIA

- El sistema intenta primero asignar un aula física automática disponible y con capacidad suficiente.
- Si no queda ninguna aula física válida, deja la asignatura pendiente y muestra una alerta con dos decisiones: `Aceptar Teledocencia` o `Cambiar o asignar aula`.
- Teledocencia permite varias clases y varios docentes en el mismo día y hora, por lo que no genera choques de aula.
- También puede seleccionarse manualmente.
- AULA 7 y los laboratorios continúan siendo de asignación manual.

## Clases fusionadas

- Se reconocen automáticamente cuando tienen el mismo docente, el mismo día y exactamente las mismas horas.
- Las asignaturas fusionadas se procesan como un solo grupo y reciben la misma aula.
- Si el grupo no tiene aula disponible, se genera una sola alerta para todo el grupo.

## Prioridad de aulas

La asignación automática utiliza este orden tanto para clases con alumnos de otras sedes como para las clases únicamente de Danlí:

1. AULA 9
2. AULA 10
3. AULA 8
4. AULA 4
5. AULA 6
6. AULA 5 - JUICIOS ORALES

El orden se aplica únicamente entre aulas disponibles y con capacidad suficiente. Si ninguna de las prioritarias puede recibir el grupo, el sistema continúa con las demás aulas automáticas.

