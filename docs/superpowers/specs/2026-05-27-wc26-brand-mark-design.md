# WC26 Brand Mark Design

## Objetivo

Sustituir el balon fotografico actual por un emblema propio de WC2026 que
funcione como favicon y como icono del encabezado. La marca debe ser primero
un balon inconfundible, con acabado premium y futurista, manteniendo la
legibilidad en tamanos de `16px`, `22px` y `30px`.

## Direccion Visual

La marca sera un balon de partido tecnologico con tres elementos:

- Paneles hexagonales y pentagonales blancos/grafito, reconocibles de inmediato.
- Volumen pulido con luces frias y sombra azul, sin ruido fotografico.
- Una orbita/acento cian contenida que introduce movimiento y lenguaje 2026.

El resultado evita numeros interiores y detalles demasiado pequenos que se
pierden en una pestana. La asociacion con 2026 surge del acabado tecnologico y
de la palabra `WC2026` que ya acompana al icono en el encabezado.

## Implementacion

`wc26-mark.svg` sera el activo maestro. Se usara directamente en el header y
como favicon moderno, mientras que `favicon-32x32.png`, `favicon.ico` y
`apple-touch-icon.png` se renderizaran desde el mismo SVG como fallbacks.

El header conservara sus dimensiones actuales: el icono seguira ocupando
`22px` en celular y `30px` en escritorio. Solamente cambia el arte interno.

## Compatibilidad Y Pruebas

Las pruebas comprobaran que:

- El documento ofrece el SVG versionado y mantiene fallbacks raster.
- El header reutiliza el mismo activo SVG que la pestana.
- Los PNG conservan dimensiones, transparencia y derivacion coherente.
- El favicon no vuelve a depender del emoji ni del balon fotografico anterior.

La validacion final incluira render visual en GitHub Pages a escala movil y
escritorio, ademas de una previsualizacion de la pestana sobre fondo oscuro.
