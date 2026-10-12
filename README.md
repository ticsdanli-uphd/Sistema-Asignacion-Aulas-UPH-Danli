# Sistema web de asignación de aulas — UPH Danlí

Aplicación estática compatible con GitHub Pages. No utiliza Supabase ni ninguna plataforma externa para almacenar la información.

## Base de datos local

- Los datos se guardan con IndexedDB dentro del navegador del equipo.
- Cada cambio también crea una segunda copia automática en localStorage. Si IndexedDB aparece vacío, el sistema recupera esa copia al volver a abrirse.
- La sección Configuración muestra la fecha y hora del último guardado interno.
- Se pueden descargar y restaurar respaldos JSON.
- El sitio controla automáticamente su versión, invalida archivos antiguos y limpia las cachés administradas por el propio sistema sin borrar la base local.
- La interfaz es responsiva para computadoras, tabletas y celulares; en pantallas pequeñas adapta botones, formularios, navegación y tablas desplazables.
- Los datos son independientes en cada navegador o computadora; use el respaldo para trasladarlos.
- El botón `Vaciado completo`, ubicado en Asignaturas, elimina toda la información local después de dos confirmaciones y restaura las aulas predeterminadas.
- El botón `Asignar automáticamente` también está disponible directamente en el bloque de Asignaturas.

## AULA TELEDOCENCIA

- El sistema intenta primero asignar un aula física automática disponible y con capacidad suficiente.
- Si no queda ninguna aula física válida, deja la asignatura pendiente y muestra una alerta con dos decisiones: `Aceptar Teledocencia` o `Cambiar o asignar aula`.
- Teledocencia permite varias clases y varios docentes en el mismo día y hora, por lo que no genera choques de aula.
- También puede seleccionarse manualmente.
- AULA 7 y los laboratorios continúan siendo de asignación manual.

## Clases fusionadas

- Se reconocen automáticamente cuando tienen el mismo docente, el mismo día y exactamente las mismas horas.
- Las asignaturas fusionadas se procesan como un solo grupo y reciben la misma aula.
- En Asignaturas, Horarios y la impresión aparecen consecutivas dentro de un bloque resaltado con la etiqueta `FUSIONADA`.
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

### Ajuste por matrícula y continuidad docente

- Entre las aulas disponibles, el sistema selecciona la capacidad más cercana a la matrícula total del grupo.
- Nunca asigna un grupo a un aula cuya capacidad sea menor que la matrícula.
- Evita ocupar un aula grande con una matrícula pequeña cuando existe otra aula adecuada.
- Si un docente tiene varias clases durante el mismo día, intenta conservar su aula anterior cuando está disponible, tiene capacidad y no desperdicia más de cinco espacios respecto de la mejor alternativa.
- El orden de aulas prioritarias se utiliza entre opciones que estén dentro del mismo rango de ajuste de cinco espacios.

## Consulta para docentes desde celular

1. Termine la asignación de aulas en el equipo administrador.
2. En Configuración, pulse `Descargar horarios para docentes`.
3. Reemplace el archivo `data/horarios-publicos.json` del proyecto de GitHub con el archivo descargado.
4. Los docentes pueden abrir la opción `Consulta docente` desde el celular y buscar su nombre o correo institucional.

También puede compartir el enlace directo agregando `?vista=docente` al final de la dirección de GitHub Pages. Esta solución no utiliza una base de datos externa: los horarios públicos se leen desde un archivo JSON incluido dentro del mismo sitio.

## Intercambio de aulas

- En Asignaturas, pulse `Cambiar aula` junto a la clase que desea modificar.
- Seleccione otra asignatura con aula y confirme el intercambio.
- Antes de guardar, el sistema valida la capacidad de ambas aulas y los choques en ambos horarios.
- Si una o ambas clases están fusionadas, el intercambio se aplica a todas las asignaturas de cada grupo.
- También se permite intercambiar con AULA TELEDOCENCIA respetando sus reglas especiales.

## Impresión completa

- `Imprimir día seleccionado` ajusta automáticamente el tamaño de la tabla para colocar todas las filas y columnas del día activo en una sola hoja física horizontal.
- En la impresión del día seleccionado, cada grupo fusionado aparece en una sola fila. Sus códigos y nombres se combinan, mientras docente, día, horas y aula se muestran una sola vez.
- `Imprimir horario completo` genera una sola tabla con todas las asignaturas de lunes a domingo.
- El horario completo se ordena por día, hora y grupo fusionado e incluye código, asignatura, docente, día, hora y aula.
- La impresión utiliza orientación horizontal y un formato compacto para aprovechar la hoja completa. Si la cantidad de clases excede físicamente una página, el navegador continuará automáticamente en páginas adicionales sin omitir filas.

