# Security Policy

## Version Soportada

La rama `main` y la aplicacion desplegada desde ella reciben correcciones de seguridad.

## Reportar Una Vulnerabilidad

No publique vulnerabilidades en GitHub Issues.

Utilice el reporte privado de vulnerabilidades de GitHub, si esta disponible en la pestana **Security** del repositorio. Si no esta habilitado, contacte al mantenedor por un canal privado asociado a su perfil de GitHub e incluya:

- Descripcion del riesgo e impacto.
- Pasos minimos para reproducirlo.
- Navegador/entorno afectado.
- Prueba de concepto que no exponga datos de usuarios.
- Propuesta de correccion, si existe.

Se intentara confirmar la recepcion y coordinar una publicacion responsable antes de divulgar detalles.

## Modelo De Seguridad

- Esta es una SPA publica; todo JavaScript, catalogo y publishable key de Supabase son visibles para los visitantes.
- La proteccion de datos depende de RLS en `public.user_sticker_progress`, no de ocultar la clave publica.
- No deben almacenarse claves `service_role`, JWT secrets, SMTP credentials ni OAuth client secrets en este repositorio.
- La aplicacion solo necesita acceso autenticado al progreso del usuario actual.

## Controles Implementados

- RLS por `auth.uid()` para leer y modificar exclusivamente filas propias.
- Restriccion de IDs del catalogo y limites de repetidos en Postgres.
- CSP para reducir superficies XSS y conexiones no previstas.
- Escapado de valores en plantillas HTML.
- SDK Supabase y generador PDF fijados a versiones auditadas.
- CI y GitHub Actions fijadas mediante SHA.

## Hardening Recomendado Para Despliegues

- Active proteccion contra contrasenas filtradas en Supabase Auth cuando el plan lo permita.
- Establezca un minimo de contrasena de 8 o mas caracteres y alinee la validacion UI.
- Active confirmacion de email, CAPTCHA y SMTP propio para instalaciones abiertas.
- Restrinja redirect URLs a sus dominios reales.
- Revise Supabase Security Advisor y Performance Advisor despues de cambios de esquema.

La instancia hospedada fue auditada el 26 de mayo de 2026: RLS y las restricciones de integridad estan habilitadas; Supabase aun informa que la proteccion contra contrasenas filtradas esta desactivada.
