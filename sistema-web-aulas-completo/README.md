# Sistema web de asignación de aulas — UPH Danlí

Aplicación estática compatible con GitHub Pages. La base de datos funciona con IndexedDB y permanece en el navegador del equipo. Incluye respaldo/restauración JSON.

## Funciones

- Registro, edición, eliminación e importación Excel/CSV de asignaturas.
- Administración de aulas, capacidades, conexión y asignación automática/manual.
- Detección de choques por aula, día y bloques horarios.
- Fusión automática: registros con el mismo docente, día y horas reciben la misma aula.
- Prioridad de Aulas 8, 9, 10, 4 y 6 para clases con estudiantes de otras sedes.
- AULA 7 y laboratorios configurados exclusivamente para selección manual.
- Advertencias por capacidad, choque y asignaturas pendientes.
- Horarios completos de lunes a domingo e impresión de una hoja por día.
- Impresión directa desde el sistema en formato A4 horizontal, con código, asignatura, docente, día, hora y aula asignada.
- Encabezado institucional, período, fecha de generación, total de clases y advertencia de registros pendientes.
- Correos iniciales y de actualización mediante Google Apps Script.

## Publicar en GitHub Pages

1. Cree un repositorio nuevo en GitHub.
2. Suba el contenido de esta carpeta a la rama `main`.
3. Abra **Settings → Pages**.
4. Seleccione **Deploy from a branch**, rama `main`, carpeta `/root` y guarde.
5. GitHub mostrará la dirección pública del sistema.

## Activar correos desde tics.danli@uph.edu.hn

1. Inicie sesión en Google con `tics.danli@uph.edu.hn` y cree un proyecto en Apps Script.
2. Copie `apps-script/Code.gs` y el contenido de `apps-script/appsscript.json`.
3. Implemente como **Aplicación web**, ejecutar como **yo**, acceso según la política institucional.
4. Autorice Gmail y copie la URL terminada en `/exec`.
5. En el sistema abra **Configuración**, pegue la URL y guarde.

El botón **Enviar avisos** solo envía mensajes a registros con correo, aula asignada y cuya aula aún no se haya notificado. Si el aula cambia, envía un correo de actualización.

## Imprimir el horario de un día

1. Abra **Horarios**.
2. Seleccione Lunes, Martes, Miércoles, Jueves, Viernes, Sábado o Domingo.
3. Revise el total de clases, asignaciones y pendientes.
4. Pulse **Imprimir día seleccionado**.
5. En la ventana del navegador puede elegir una impresora o **Guardar como PDF**.

Si existen clases sin aula, el sistema muestra una advertencia antes de imprimirlas como `PENDIENTE`.

## Importación

En **Asignaturas** use el botón **Descargar plantilla**. Complete el archivo sin cambiar los encabezados y luego pulse **Importar archivo**.

La plantilla oficial utiliza: `Período`, `Campus`, `Código`, `Asignatura`, `Modalidad`, `Sección`, `Días`, `Horas`, `Catedrático`, `Correo Institucional` y `Campus Catedrático`.

- Acepta archivos `.xlsx`, `.xls` y `.csv`.
- Reconoce encabezados con o sin tilde y también nombres anteriores como `Docente`, `Correo` y `Sede Docente`.
- Si una asignatura tiene varios días separados por coma, espacio, diagonal o punto y coma, crea el registro correspondiente para cada día.
- Al volver a importar el mismo código, período, campus, sección, día y horario, actualiza el registro existente en lugar de duplicarlo.
- La matrícula es opcional en esta plantilla; si se agrega una columna `Matrícula`, el sistema la usa para validar capacidad.

## Seguridad y respaldo

GitHub Pages no aloja la base de datos. Cada navegador conserva su propia copia. Descargue respaldos JSON regularmente y restáurelos cuando cambie de computadora. No almacene contraseñas en los archivos del proyecto.
