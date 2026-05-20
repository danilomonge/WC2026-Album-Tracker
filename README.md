# WC2026 Collector · Edición Alemania

Aplicación web estática para gestionar un álbum Panini FIFA World Cup 2026 inspirada en los prototipos de Stitch y adaptada a la **edición Alemania**:

- grupos `A-L`
- estructura por selección y página del álbum
- especiales generales `FWC`
- solo **12 stickers Coca-Cola Alemania**
- modo lectura sin cuenta
- guardado y sincronización multi-dispositivo con **Supabase**

## Archivos principales

- [index.html](./index.html): shell principal de la SPA y modales de cuenta/configuración
- [styles.css](./styles.css): diseño responsive inspirado en Stitch
- [app.js](./app.js): lógica de UI, autenticación, sincronización, filtros, estadísticas y PDFs
- [data.js](./data.js): catálogo congelado de la edición Alemania
- [package.json](./package.json): script simple de pruebas
- [tests/app.test.js](./tests/app.test.js): pruebas de lógica del álbum

## Cómo abrirla localmente

### Opción directa

1. Abre `index.html` en tu navegador.
2. La app funcionará en modo lectura aunque todavía no hayas configurado Supabase.
3. Si quieres login y sincronización con Supabase, usa mejor `http://localhost` o GitHub Pages. El modo `file://` queda limitado a lectura por seguridad y compatibilidad con Auth.

### Opción recomendada

1. Desde la carpeta del proyecto, levanta un servidor estático:

```bash
python3 -m http.server 8000
```

2. Abre:

```text
http://localhost:8000
```

## Supabase: configuración exacta

La app no usa backend propio. Todo el guardado del progreso se hace desde el navegador contra Supabase con `supabase-js` y RLS.

### 1. Crear proyecto

1. Ve a [Supabase](https://supabase.com/).
2. Crea un proyecto nuevo.
3. Copia:
   - `Project URL`
   - `anon/public key`

### 2. Configurar Auth

En `Authentication`:

1. Activa `Email`.
2. Permite `Email + password`.
3. Si quieres confirmación por email, déjala activa.
4. Añade estas redirect URLs:
   - `http://localhost:8000`
   - `http://127.0.0.1:8000`
   - tu URL final de GitHub Pages, por ejemplo:
     - `https://TU-USUARIO.github.io/TU-REPO/`

### 3. Crear tablas y políticas

Ejecuta este SQL en el SQL Editor de Supabase:

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
  unique (user_id, sticker_id)
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists touch_user_sticker_progress_updated_at on public.user_sticker_progress;
create trigger touch_user_sticker_progress_updated_at
before update on public.user_sticker_progress
for each row execute procedure public.touch_updated_at();

alter table public.profiles enable row level security;
alter table public.user_sticker_progress enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "progress_select_own" on public.user_sticker_progress;
create policy "progress_select_own"
on public.user_sticker_progress
for select
using (auth.uid() = user_id);

drop policy if exists "progress_insert_own" on public.user_sticker_progress;
create policy "progress_insert_own"
on public.user_sticker_progress
for insert
with check (auth.uid() = user_id);

drop policy if exists "progress_update_own" on public.user_sticker_progress;
create policy "progress_update_own"
on public.user_sticker_progress
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "progress_delete_own" on public.user_sticker_progress;
create policy "progress_delete_own"
on public.user_sticker_progress
for delete
using (auth.uid() = user_id);
```

### 4. Conectar la app

1. Abre la app.
2. Pulsa `Configurar Supabase`.
3. Pega:
   - `Project URL`
   - `anon/public key`
4. Guarda.
5. Luego usa `Iniciar sesión / registro`.

## Cómo funciona

### Sin cuenta

- Puedes navegar por:
  - grupos
  - selecciones
  - páginas del álbum
  - especiales
  - Coca-Cola
- Puedes buscar y filtrar.
- No puedes guardar progreso ni exportar PDFs personalizados.

### Con cuenta

- 1 clic: marca el sticker como obtenido
- 2º clic: suma 1 repetido
- clics siguientes: siguen sumando repetidos
- botón `−`: corrige repetidos y luego devuelve a faltante
- los cambios se guardan en Supabase y se sincronizan entre dispositivos

## Dataset de esta versión

La implementación actual usa:

- `20` stickers especiales `FWC`
- `48 selecciones × 20 stickers = 960`
- `12` stickers `Coca-Cola Germany`

Total del dataset cargado:

- `992 stickers`

Rango total de páginas cubiertas por el dataset:

- selecciones: `8-105`
- álbum completo con especiales y Coca-Cola: `1-107`

## GitHub Pages: instrucciones exactas

### 1. Crear repositorio

1. Crea un repositorio nuevo en GitHub.
2. Puedes llamarlo, por ejemplo:

```text
panini-sticker-checklist
```

### 2. Subir archivos

1. Sube estos archivos al repositorio:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `data.js`
   - `README.md`
   - opcionalmente `package.json` y `tests/`

### 3. Activar GitHub Pages

1. Ve a `Settings`.
2. Abre `Pages`.
3. En `Build and deployment`, elige:
   - `Source: Deploy from a branch`

### 4. Elegir branch correcta

1. En `Branch`, selecciona:
   - `main`
2. Carpeta:
   - `/ (root)`
3. Guarda.

### 5. Obtener la URL final publicada

GitHub Pages te mostrará una URL similar a:

```text
https://TU-USUARIO.github.io/TU-REPO/
```

Esa URL también debes añadirla en las redirect URLs de Supabase Auth.

## GitHub Actions opcional para deploy automático

El repo ya puede incluir un workflow estático para Pages. Si GitHub Pages está habilitado en el repositorio, el despliegue se publicará automáticamente desde GitHub Actions.

## Pruebas

Ejecuta:

```bash
npm test
```

Las pruebas cubren:

- edición Alemania
- total Coca-Cola = 12
- páginas de selecciones del screenshot
- reglas de clic y corrección
- merge del progreso remoto
- filtros Coca-Cola/repetidos/faltantes
- estadísticas globales y especiales
