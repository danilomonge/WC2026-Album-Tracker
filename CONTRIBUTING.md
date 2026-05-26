# Contributing

Gracias por ayudar a mejorar WC2026 Collector.

## Antes De Empezar

- Para errores reproducibles, abra un bug report con navegador, pasos y resultado esperado.
- Para mejoras grandes, abra primero una propuesta para acordar alcance y experiencia de usuario.
- Para vulnerabilidades, no cree issues publicos: siga [SECURITY.md](SECURITY.md).
- Sea respetuoso y siga [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Preparar El Entorno

```bash
git clone https://github.com/danilomonge/WC2026-Album-Tracker.git
cd WC2026-Album-Tracker
npm ci
npm test
node serve.mjs
```

La aplicacion local se abre en `http://localhost:5500`. Para probar autenticacion con un fork, configure su propio proyecto Supabase mediante [supabase/schema.sql](supabase/schema.sql) y actualice la clave publica en `app.js`.

## Flujo De Trabajo

1. Cree una rama desde `main`: `feature/descripcion`, `fix/descripcion` o `docs/descripcion`.
2. Mantenga el cambio pequeno y enfocado.
3. Modifique tests cuando cambie la logica.
4. Si cambia utilidades Tailwind, ejecute `npm run build:css` y versionee `tailwind.css`.
5. Ejecute todas las verificaciones:

```bash
npm run build:css
npm test
git diff --check
```

6. Abra un pull request describiendo problema, solucion y pruebas.

## Areas De Contribucion

- Correcciones de comportamiento o accesibilidad.
- Nuevas pruebas para auth, sincronizacion y catalogo.
- Traducciones y claridad de textos.
- Rendimiento de renderizado en mobile.
- Documentacion y facilidad de despliegue.
- Actualizaciones de seguridad de dependencias cargadas mediante ESM.

## Reglas Tecnicas

- Mantenga la aplicacion estatica y sin secretos de servidor en el frontend.
- La publishable key de Supabase puede estar en el cliente; nunca agregue `service_role`, JWT secrets, SMTP secrets ni credenciales OAuth.
- Preserve RLS y las restricciones de integridad del esquema.
- No acepte IDs de stickers fuera del catalogo de `data.js`.
- Use `textContent` o `escapeHtml()` al mostrar datos en plantillas.
- No relaje la CSP sin justificar la nueva fuente o conexion.
- Para nuevas dependencias runtime, fije versiones y compruebe advisories conocidos.

## Cambios En El Catalogo

`data.js` representa la edicion Alemania: 992 stickers, incluidos `FWC0`-`FWC19` y `CC1`-`CC12`. Un cambio de catalogo debe:

- Citar la fuente del cambio en el pull request.
- Actualizar restricciones en `supabase/schema.sql` si cambian IDs aceptados.
- Actualizar pruebas y documentacion.

## Criterios De Revision

Un pull request debe mantener:

- Inicio de sesion, recuperacion de contrasena y recarga sin bloqueos.
- Sincronizacion aislada por usuario.
- Modo lectura sin cuenta.
- Generacion PDF funcional.
- `npm test` aprobado y consola del navegador sin errores nuevos.
