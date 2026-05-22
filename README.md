# ⚽ WC2026 Collector — Edición Alemania

> Gestiona tu álbum Panini **FIFA World Cup 2026™** — edición exclusiva Alemania — desde el navegador, con sincronización en la nube y exportación de PDFs.

**WC2026 Collector** es una aplicación web estática que te permite marcar los cromos que tienes, llevar la cuenta de los repetidos, ver tu progreso por grupo y selección, y exportar listas de faltantes o repetidos en PDF. Funciona sin instalación: basta con abrir el archivo en un navegador o visitar la URL de GitHub Pages.

---

## Índice

1. [¿Para qué edición es?](#para-qué-edición-es)
2. [Características](#características)
3. [Estructura del catálogo](#estructura-del-catálogo)
4. [Funcionalidades en detalle](#funcionalidades-en-detalle)
5. [Uso sin cuenta](#uso-sin-cuenta)
6. [Uso con cuenta — marcado y sincronización](#uso-con-cuenta--marcado-y-sincronización)
7. [Cómo abrirla localmente](#cómo-abrirla-localmente)
8. [Despliegue en GitHub Pages](#despliegue-en-github-pages)
9. [Configuración de Supabase](#configuración-de-supabase)
10. [Archivos del proyecto](#archivos-del-proyecto)
11. [Pruebas](#pruebas)

---

## ¿Para qué edición es?

Este coleccionador está construido específicamente para la **edición alemana del álbum Panini FIFA World Cup 2026™**.

La edición alemana se diferencia de otras en un punto concreto: incluye **12 stickers exclusivos Coca-Cola Germany** que no aparecen en el álbum internacional estándar. El catálogo de la app refleja exactamente este formato:

| Categoría | Cantidad |
|---|---|
| Selecciones (48 × 20 cromos) | 960 |
| Especiales FWC | 20 |
| Coca-Cola Germany | 12 |
| **Total** | **992** |

> Si tienes la edición internacional (sin los 12 Coca-Cola Germany), simplemente ignora esa sección; el resto del álbum es idéntico.

---

## Características

- **Catálogo completo** de los 992 cromos de la edición alemana
- **Marcado interactivo** — 1 clic para obtener, más clics para repetidos, botón `−` para corregir
- **Sincronización en la nube** con Supabase — tu progreso se guarda y está disponible en cualquier dispositivo
- **Modo lectura** sin cuenta — navega y busca sin registrarte
- **Búsqueda global** — por nombre de jugador, país o número de sticker
- **Filtros por tipo** — Todos, Obtenidos, Repetidos, Faltantes, Especiales, Coca-Cola, Escudos, Fotos de equipo, FWC
- **Agrupación flexible** — por Grupo, Selección, Página o sin agrupar
- **Filtros adicionales** — por grupo (A–L), selección y página del álbum
- **Vista Home** — resumen de tu álbum, los 12 grupos, formato del torneo, estructura del álbum
- **Estadísticas detalladas** — panorama general, progreso por categoría, selecciones con más avance, grupos, pendientes prioritarios y más
- **Exportación PDF** — lista de faltantes y lista de repetidos con nombre de usuario y fecha
- **Bilingüe** — interfaz completa en español e inglés con toggle de idioma
- **Diseño oscuro** — tema navy oscuro con acentos azul acero, totalmente responsive
- **Sin backend propio** — SPA 100 % estática + Supabase como BaaS

---

## Estructura del catálogo

### Selecciones

48 selecciones organizadas en 12 grupos (A–L), 4 equipos por grupo. Cada selección ocupa 2 páginas del álbum con 20 cromos:

- 1 escudo
- 1 foto de equipo
- 18 cromos de jugadores

### Especiales FWC (páginas 1–7 y 106–109)

20 cromos especiales del torneo:

| ID | Descripción |
|---|---|
| FWC0 | Panini Logo |
| FWC1–FWC2 | Official Emblem |
| FWC3 | Official Mascots |
| FWC4 | Official Slogan |
| FWC5 | Official Ball |
| FWC6–FWC11 | Países sede (Canadá, México, USA ×3) |
| FWC12–FWC19 | Especiales adicionales (FIFA Museums, Legends…) |

### Coca-Cola Germany (páginas 106–109)

12 cromos exclusivos de la edición alemana, identificados como CC1–CC12.

---

## Funcionalidades en detalle

### Marcado de cromos

| Acción | Resultado |
|---|---|
| 1.er clic | Cromo marcado como **obtenido** |
| 2.º clic | +1 **repetido** |
| Clics siguientes | +1 repetido cada vez |
| Clic en `−` | −1 repetido; al llegar a 0 pasa a **faltante** |

### Búsqueda

La barra de búsqueda superior filtra en tiempo real por nombre de jugador o sticker, código de selección (p. ej., `MEX`, `ARG`) y número de sticker (p. ej., `42`, `FWC3`, `CC7`). Al escribir, la app navega automáticamente a la vista Álbum y aplica el filtro.

### Filtros de tipo

Disponibles en la barra de chips debajo del encabezado:

- **Todos** — todos los cromos visibles según el contexto
- **Obtenidos** — solo los que ya tienes
- **Repetidos** — solo los que tienes en exceso
- **Faltantes** — los que aún no tienes
- **Especiales** — todos los cromos de tipo especial (escudos, fotos, FWC, Coca-Cola…)
- **Coca-Cola** — los 12 exclusivos alemanes
- **Escudos** — solo escudos de selecciones
- **Fotos de equipo** — solo fotos de equipo
- **FWC** — los 20 especiales del torneo (FWC0–FWC19)

> En las secciones **Repetidos** y **Faltantes** los chips Obtenidos, Repetidos y Faltantes se ocultan automáticamente porque son redundantes.

### Agrupación y filtros secundarios

- **Agrupar por**: Grupo · Selección · Página · Sin agrupar
- **Filtro de grupo**: de A a L, o todos
- **Filtro de selección**: país concreto, o todas
- **Filtro de página**: página exacta del álbum, o todas

Cada cabecera de selección muestra las páginas del álbum que le corresponden (p. ej., `· Pág. 8, 9`).

### Secciones principales

| Sección | Descripción |
|---|---|
| **Inicio** | Dashboard con progreso de tu álbum, resumen de los 12 grupos, formato del torneo (fases, sedes) y estructura del álbum |
| **Álbum** | Los 992 cromos con filtros y agrupación completos |
| **Repetidos** | Solo los cromos con al menos 1 repetido |
| **Faltan** | Solo los cromos que aún no tienes |
| **Especiales** | Vista filtrada a todos los cromos especiales |
| **Coca-Cola** | Los 12 exclusivos de la edición alemana |
| **Stats** | Estadísticas completas del álbum |

### Estadísticas

La pestaña Stats muestra:

- **Panorama general** — % completado, conteo de obtenidos / faltantes / repetidos / Coca-Cola, desglose por categoría
- **Selecciones con más progreso** — ranking de países con barra de progreso y scroll
- **Progreso por grupo** — avance porcentual de cada grupo A–L
- **Pendientes prioritarios** — selecciones con menos cromos restantes (más cerca de completar)
- **Selecciones al 100 %** — países completamente llenos
- **Grupos al 100 %** — grupos completamente llenos
- **Especiales pendientes** — FWC aún sin obtener
- **Coca-Cola pendientes** — exclusivos alemanes sin obtener
- **Selecciones más rezagadas** — países con menos progreso

### Exportación PDF

Desde el panel lateral (escritorio):

- **PDF de faltantes** — lista de todos los cromos que aún no tienes, con ID, nombre y página
- **PDF de repetidos** — lista de todos los cromos con más de 1 copia, con cantidad

Ambos PDFs incluyen tu nombre de usuario y la fecha de generación.

### Idioma

El toggle de idioma (🇪🇸 / 🇬🇧) en el panel lateral cambia toda la interfaz entre **español** e **inglés**, incluyendo etiquetas, filtros, mensajes y estadísticas. La preferencia se guarda entre sesiones.

---

## Uso sin cuenta

Sin registrarte puedes:

- Navegar por todos los grupos, selecciones, páginas y especiales
- Usar todos los filtros y la búsqueda
- Ver la vista Home y explorar la estructura del álbum

No puedes: marcar cromos, guardar progreso ni exportar PDFs personalizados.

---

## Uso con cuenta — marcado y sincronización

1. Pulsa **Iniciar sesión / registro** en el panel lateral.
2. Crea una cuenta con email y contraseña, o inicia sesión si ya tienes una.
3. Marca tus cromos haciendo clic sobre ellos.
4. El progreso se guarda automáticamente en Supabase y se sincroniza entre todos tus dispositivos.
5. Para reiniciar el álbum, usa el botón **Reiniciar progreso** (requiere confirmación).

> El login y la sincronización requieren abrir la app desde `http://localhost` o una URL HTTPS (como GitHub Pages). No funcionan en `file://` por restricciones de seguridad del navegador.

---

## Cómo abrirla localmente

### Opción recomendada — servidor Node incluido

```bash
node serve.mjs
```

Abre `http://localhost:5500` en tu navegador.

### Alternativa — Python

```bash
python3 -m http.server 8000
```

Abre `http://localhost:8000`.

### Solo lectura — sin servidor

Abre `index.html` directamente en el navegador. Funciona en modo lectura (sin login ni sincronización).

---

## Despliegue en GitHub Pages

1. Crea un repositorio en GitHub y sube: `index.html`, `styles.css`, `app.js`, `data.js` (y opcionalmente `README.md`, `package.json`, `tests/`).
2. Ve a **Settings → Pages**.
3. En *Build and deployment*, elige `Deploy from a branch`.
4. Selecciona `main` / `/ (root)` y guarda.
5. Tu app estará disponible en:
   ```
   https://TU-USUARIO.github.io/TU-REPO/
   ```
6. Añade esa URL a las redirect URLs de tu proyecto Supabase.

---

## Configuración de Supabase

La app no tiene backend propio. El progreso se almacena en **Supabase** con Row Level Security (cada usuario solo ve y edita sus propios datos).

### 1. Crear proyecto Supabase

1. Ve a [supabase.com](https://supabase.com) y crea un proyecto.
2. Copia el **Project URL** y la **anon/public key** desde *Settings → API*.

### 2. Configurar autenticación

En *Authentication → URL Configuration*, añade las redirect URLs:

```
http://localhost:5500
http://localhost:8000
http://127.0.0.1:5500
https://TU-USUARIO.github.io/TU-REPO/
```

Activa *Email + Password* en *Authentication → Providers*.

### 3. Crear tablas y políticas RLS

Ejecuta este SQL en el *SQL Editor* de Supabase:

```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.user_sticker_progress (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  sticker_id text not null,
  obtained boolean not null default false,
  duplicates integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint user_sticker_progress_duplicates_non_negative check (duplicates >= 0),
  constraint user_sticker_progress_valid_sticker_id check (
    sticker_id ~ '^(FWC([0-9]|1[0-9]|20)|CC([1-9]|1[0-2])|[A-Z]{3}([1-9]|1[0-9]|20))$'
  ),
  unique (user_id, sticker_id)
);

-- Trigger: crear perfil al registrarse
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Trigger: actualizar updated_at
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists touch_user_sticker_progress_updated_at on public.user_sticker_progress;
create trigger touch_user_sticker_progress_updated_at
before update on public.user_sticker_progress
for each row execute procedure public.touch_updated_at();

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.user_sticker_progress enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "progress_select_own" on public.user_sticker_progress for select using (auth.uid() = user_id);
create policy "progress_insert_own" on public.user_sticker_progress for insert with check (auth.uid() = user_id);
create policy "progress_update_own" on public.user_sticker_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "progress_delete_own" on public.user_sticker_progress for delete using (auth.uid() = user_id);
```

### 4. Conectar la app

Las credenciales de Supabase ya están preconfiguradas en `app.js`. Si quieres usar tu propio proyecto, edita las constantes `url` y `anonKey` en `DEFAULT_SUPABASE_CONFIG` al principio de `app.js`.

---

## Archivos del proyecto

| Archivo | Descripción |
|---|---|
| `index.html` | Shell de la SPA: estructura HTML, nav, modales de autenticación, toast |
| `app.js` | Toda la lógica: UI, autenticación Supabase, sincronización, filtros, búsqueda, estadísticas, exportación PDF, i18n |
| `styles.css` | Diseño visual completo: tema oscuro navy, gradientes, componentes (chips, cards, headers, stats), responsive |
| `data.js` | Catálogo congelado de los 992 cromos de la edición Alemania: stickers, grupos, selecciones, colores de equipo, emojis de bandera |
| `serve.mjs` | Servidor de desarrollo Node.js para `localhost:5500` |
| `tests/app.test.js` | Suite de pruebas unitarias del catálogo y la lógica de negocio |
| `package.json` | Dependencias de desarrollo y script `npm test` |

---

## Pruebas

```bash
npm test
```

La suite cubre:

- Integridad del catálogo (edición Alemania, total 992 stickers, 12 Coca-Cola, 20 FWC)
- Páginas correctas por selección
- Lógica de clic: obtener → repetidos → corrección con `−`
- Merge del progreso remoto con estado local
- Filtros: Coca-Cola, repetidos, faltantes, especiales
- Cálculo de estadísticas globales y por categoría
