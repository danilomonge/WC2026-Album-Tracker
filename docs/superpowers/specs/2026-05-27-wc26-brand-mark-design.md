# WC26 Brand Mark Design

## Objetivo

Sustituir el arte previo por un balon propio de WC2026 que funcione como
favicon y como icono del encabezado. La marca debe ser un balon inconfundible,
realista, simetrico y premium, manteniendo la legibilidad en tamanos de
`16px`, `22px` y `30px`.

## Direccion Visual

La marca sera un balon de partido premium con tres elementos:

- Paneles simetricos blanco perla y azul marino con costuras realistas.
- Trazos curvos azul marino, sobrios y simetricos, sobre los paneles blancos.
- Un `26` frontal muy grande, limpio y centrado opticamente dentro del panel
  blanco principal, como impresion oficial del balon.

El resultado evita orbitas externas y composiciones asimetricas. La reduccion
conserva una silueta de balon clara y el centrado visual del `26`.

## Implementacion

`wc26-ball-premium.png` sera el activo maestro transparente de `512x512`. Se usara en el
header, mientras que `favicon-32x32.png`, `favicon.ico` y
`apple-touch-icon.png` se derivaran del mismo raster de alta calidad.

El header conservara sus dimensiones actuales: el icono seguira ocupando
`22px` en celular y `30px` en escritorio. Solamente cambia el arte interno.

## Compatibilidad Y Pruebas

Las pruebas comprobaran que:

- El documento ofrece el favicon PNG versionado y mantiene fallback ICO.
- El header reutiliza el mismo arte premium del favicon.
- Los PNG conservan dimensiones, transparencia y derivacion coherente.
- El favicon no vuelve a depender del emoji ni del emblema SVG rechazado.

La validacion final incluira render visual en GitHub Pages a escala movil y
escritorio, ademas de una previsualizacion de la pestana sobre fondo oscuro.
