# WC2026 Collector - Germany Edition

<p align="center">
  <img src="./wc26-mark.svg" width="112" alt="Emblema WC26 Collector" />
</p>

Aplicacion web estatica para gestionar el album **Panini FIFA World Cup 2026 - Germany Edition**: coleccion, repetidos, faltantes, progreso y exportaciones PDF, con sincronizacion privada mediante Supabase.

[Aplicacion publicada](https://danilomonge.github.io/WC2026-Album-Tracker/) | [Reportar un error](https://github.com/danilomonge/WC2026-Album-Tracker/issues/new/choose) | [Contribuir](CONTRIBUTING.md) | [Seguridad](SECURITY.md)

## Estado Del Proyecto

- Catalogo implementado: **992 stickers** de la edicion alemana.
- Frontend: SPA estatica en HTML, CSS y JavaScript ES modules.
- Persistencia: Supabase Auth + Postgres con Row Level Security (RLS).
- Proveedores activos en la instancia publicada al 26 de mayo de 2026: **email/password**. Google OAuth esta implementado como opcion y solo aparece si el proveedor se habilita en Supabase.
- Publicacion: GitHub Pages desde `main` y `/ (root)`.
- Licencia del codigo: [MIT](LICENSE).

Este proyecto no esta afiliado, patrocinado ni respaldado por Panini o FIFA. Los nombres y marcas pertenecen a sus respectivos titulares.

## Funcionalidad Implementada

- Navegacion en modo lectura sin cuenta.
- Registro, inicio de sesion y cierre de sesion con email/password.
- Recuperacion de contrasena desde el correo de Supabase, incluyendo links `token_hash` y flujos implicitos.
- Google OAuth condicional: el boton se oculta si Supabase informa que Google esta deshabilitado.
- Marcado de stickers, repetidos y correccion con sincronizacion remota.
- Busqueda, filtros por tipo, agrupacion por grupo/seleccion/pagina y vistas de faltantes, repetidos, especiales, Coca-Cola y estadisticas.
- Interfaz completa en espanol e ingles.
- Exportacion PDF de faltantes y repetidos con `jsPDF`.
- Primer render inmediato y carga progresiva para mantener fluidez con el catalogo completo.
- CSS de Tailwind precompilado; la aplicacion publicada no depende del runtime CDN de Tailwind.

## Catalogo

| Categoria | IDs | Cantidad |
| --- | --- | ---: |
| Selecciones (48 x 20) | `MEX1`-`PAN20`, segun seleccion | 960 |
| Especiales FWC | `FWC0`-`FWC19` | 20 |
| Coca-Cola Germany | `CC1`-`CC12` | 12 |
| **Total** |  | **992** |

- Los especiales FWC estan en las paginas 0-3 y 106-109.
- Los stickers Coca-Cola Germany estan en las paginas 112-113.
- Cada seleccion incluye escudo, foto de equipo y 18 jugadores.

## Uso

### Sin cuenta

Se puede navegar, buscar, filtrar y consultar el catalogo. No se puede guardar progreso ni generar PDFs personalizados.

### Con cuenta

1. Abra la aplicacion desde HTTPS o un servidor local HTTP. La autenticacion no esta disponible al abrir `index.html` por `file://`.
2. Inicie sesion o registre una cuenta con email/password.
3. Pulse un sticker: el primer click lo marca como obtenido; los siguientes agregan repetidos.
4. Use el boton de correccion para restar repetidos o devolver el sticker a faltante.
5. El progreso se sincroniza en Supabase y se restaura al recargar.

### Recuperacion De Contrasena

1. En el modal de acceso, seleccione **Olvide mi contrasena**.
2. Indique el email; Supabase envia el enlace de recuperacion.
3. Abra el enlace en la aplicacion publicada o en una URL local autorizada en Supabase.
4. La aplicacion detecta la sesion de recuperacion y solicita la nueva contrasena y su confirmacion.

La interfaz actual valida un minimo de 6 caracteres. Para forks orientados a produccion se recomienda configurar una politica mas fuerte en Supabase y alinear el minimo mostrado en la interfaz.

## Arquitectura

```text
index.html
  -> tailwind.css + styles.css
  -> app.js
       -> data.js (catalogo estatico)
       -> @supabase/supabase-js@2.50.0 (esm.sh)
       -> jspdf@4.2.1 (esm.sh, solo al exportar)
       -> Supabase Auth + public.user_sticker_progress
```

### Seguridad Aplicada

- Content Security Policy en `index.html` restringe scripts, conexiones, imagenes, formularios y objetos.
- Solo se incorpora una clave publica/publishable de Supabase en el frontend; no se usan claves `service_role`.
- RLS aisla el progreso por `auth.uid()`.
- La base de datos rechaza IDs no pertenecientes al catalogo.
- La base de datos limita `duplicates` a `0..99` y exige `obtained = true` cuando hay repetidos.
- Los textos procedentes del catalogo se escapan antes de insertarse en plantillas HTML.
- Las Actions incluidas estan fijadas a revisiones SHA inmutables.

Nota de auditoria de la instancia hospedada, 26 de mayo de 2026: Supabase Security Advisor informa que **Leaked Password Protection** esta deshabilitada. Es una configuracion de Auth del propietario del despliegue; debe activarse cuando el plan lo permita. Consulte [SECURITY.md](SECURITY.md).

## Desarrollo Local

Requisitos: Node.js 20 o superior y npm.

```bash
git clone https://github.com/danilomonge/WC2026-Album-Tracker.git
cd WC2026-Album-Tracker
npm ci
npm run build:css
npm test
node serve.mjs
```

Abra [http://localhost:5500](http://localhost:5500).

### Scripts

| Comando | Funcion |
| --- | --- |
| `npm run build:css` | Compila `tailwind.input.css` a `tailwind.css`. |
| `npm test` | Ejecuta las 17 pruebas unitarias con `node:test`. |
| `node serve.mjs` | Sirve la SPA localmente en el puerto 5500. |

Cuando se cambien clases Tailwind en `index.html` o `app.js`, incluya el `tailwind.css` regenerado en el commit.

## Configurar Un Fork Con Supabase

La instancia publicada usa un proyecto Supabase existente. Para desplegar su propio fork:

1. Cree un proyecto Supabase.
2. Ejecute [supabase/schema.sql](supabase/schema.sql) en SQL Editor.
3. Active Email en **Authentication > Providers**.
4. Configure las Redirect URLs:

```text
http://localhost:5500
http://127.0.0.1:5500
https://SU-USUARIO.github.io/SU-REPOSITORIO/
```

5. Sustituya `DEFAULT_SUPABASE_CONFIG.url` y `DEFAULT_SUPABASE_CONFIG.anonKey` en `app.js` por su Project URL y su **publishable key**.
6. Para Google OAuth, habilite Google en Supabase y configure su OAuth client. La UI muestra el boton automaticamente solo cuando el proveedor esta habilitado.

### Esquema Desplegado

La aplicacion usa exactamente una tabla publica:

| Tabla | Uso | Proteccion |
| --- | --- | --- |
| `public.user_sticker_progress` | Estado por usuario y sticker | RLS; PK `(user_id, sticker_id)`; FK a `auth.users`; checks de IDs y repetidos |

No utiliza una tabla `profiles`, triggers ni funciones RPC.

Las cuatro politicas permiten `SELECT`, `INSERT`, `UPDATE` y `DELETE` exclusivamente cuando `(select auth.uid()) = user_id`. El SQL reproducible se encuentra en [supabase/schema.sql](supabase/schema.sql).

### Recomendaciones De Produccion

- Active confirmacion de email.
- Active proteccion contra contrasenas filtradas y refuerce requisitos de contrasena si su plan lo permite.
- Considere CAPTCHA para registro, acceso y reset si el proyecto sera expuesto a trafico abierto.
- Configure SMTP propio para entregabilidad y reputacion del correo.
- Revise periodicamente Security Advisor y Performance Advisor.

Referencias oficiales:

- [Supabase: Securing your API](https://supabase.com/docs/guides/api/securing-your-api)
- [Supabase: Password security](https://supabase.com/docs/guides/auth/password-security)
- [Supabase: CAPTCHA protection](https://supabase.com/docs/guides/auth/auth-captcha)

## Despliegue

La configuracion actual de GitHub Pages publica el contenido estatico de `main` desde `/ (root)`. Los archivos necesarios son:

```text
index.html
app.js
data.js
styles.css
tailwind.css
wc26-mark.svg
favicon-32x32.png
favicon.ico
apple-touch-icon.png
github-social-preview.png
.nojekyll
```

Al fusionar un cambio en `main`, GitHub Pages reconstruye el sitio. El workflow de CI verifica tests y que el CSS generado este actualizado; no administra el despliegue.

La identidad visual del repositorio usa `wc26-mark.svg`. GitHub no tiene una
foto de perfil independiente para cada repositorio; para la tarjeta visual al
compartir el enlace, suba `github-social-preview.png` desde **Settings >
General > Social preview**.

## Estructura Del Repositorio

| Ruta | Descripcion |
| --- | --- |
| `index.html` | Shell de la SPA, modal de autenticacion y CSP. |
| `app.js` | Estado, UI, i18n, autenticacion, sincronizacion, estadisticas y exportacion PDF. |
| `data.js` | Catalogo fijo de 992 stickers y metadatos del album. |
| `tailwind.input.css`, `tailwind.config.cjs`, `tailwind.css` | Fuente y build CSS de Tailwind. |
| `styles.css` | Componentes y estilos visuales propios. |
| `serve.mjs` | Servidor local minimo con proteccion contra path traversal. |
| `tests/app.test.js` | 17 pruebas unitarias de catalogo, seguridad y auth recovery. |
| `supabase/schema.sql` | Esquema y RLS requeridos para nuevos despliegues. |
| `.github/workflows/ci.yml` | Comprobaciones automatizadas para contribuciones. |
| `CONTRIBUTING.md` | Flujo de contribucion y criterios de aceptacion. |
| `SECURITY.md` | Reporte responsable y hardening recomendado. |

## Contribuir

Se aceptan reportes y pull requests. Antes de contribuir lea:

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [SECURITY.md](SECURITY.md) para vulnerabilidades, que no deben abrirse como issues publicos.

## Licencia Y Marcas

El codigo de este repositorio se publica bajo la [licencia MIT](LICENSE).

Panini, FIFA, FIFA World Cup y Coca-Cola son marcas de sus respectivos propietarios. Este proyecto es una herramienta independiente para coleccionistas y no distribuye imagenes oficiales de stickers.
