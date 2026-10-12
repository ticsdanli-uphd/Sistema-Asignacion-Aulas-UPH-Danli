# Sistema web de asignación de aulas — UPH Danlí

Aplicación estática compatible con GitHub Pages. No utiliza Supabase ni ninguna plataforma externa para almacenar la información.

## Base de datos local

- Los datos se guardan con IndexedDB dentro del navegador del equipo.
- Se pueden descargar y restaurar respaldos JSON.
- Los datos son independientes en cada navegador o computadora; use el respaldo para trasladarlos.

## AULA TELEDOCENCIA

- El sistema intenta primero asignar un aula física automática disponible y con capacidad suficiente.
- Si no queda ninguna aula física válida, asigna `AULA TELEDOCENCIA` como respaldo.
- Teledocencia permite varias clases y varios docentes en el mismo día y hora, por lo que no genera choques de aula.
- También puede seleccionarse manualmente.
- AULA 7 y los laboratorios continúan siendo de asignación manual.

