# $bog_builderui_router

Path-based router для BuilderUI-приложений. Drop-in замена `$mol_state_arg`.

URL пишется в `pathname` напрямую:

```
https://example.com/myapp/base=stone/theme=amber?ref=tw
```

Никаких `#!fragment`, никакого `?/path` GH-Pages-костыля, никакого специального поведения на localhost.

## Использование

```ts
namespace $.$$ {
    export class $my_app extends $.$my_app {
        static {
            $bog_builderui_router.activate()                 // auto-detect mount
            // or:
            // $bog_builderui_router.activate( '/myapp/' )    // explicit mount
        }
        // ... дальше как обычно, $mol_state_arg.value() уже идёт через нас
    }
}
```

Без аргумента `activate()` тащит mount из `<script src="web.js">`. Это работает и в mam-dev (`/.../-/web.js` → mount содержит `/-/` → guard скипает), и на проде (`/myapp/web.js` → mount `/myapp/`).

`activate()` идемпотентен и no-op в четырёх случаях:
- нет `window` / `document` (SSR, prerender)
- текущий `pathname` не начинается с `mount`
- `pathname` похож на $mol-dev-артефакт (`.html` или `/-/`) — `npx mam`-режим остаётся на стандартном хеш-роутере
- класс уже установлен

На холодном запуске активация автоматически:
- мигрирует legacy `#!k=v/k=v` ссылки в чистый pathname
- разворачивает GH-Pages `?/path` SPA-редирект из `404.html`

## Ссылка — это цель целиком

Клик по внутренней ссылке ведёт ровно туда, что написано в её `href`. Ничего из
текущего адреса не подмешивается, поэтому:

- `arg * key null` реально убирает ключ — это единственный способ уйти с экрана,
  который включается по наличию ключа;
- ссылка значит одно и то же, кликнули по ней или открыли в новой вкладке.

Ключи, которые надо сохранить, попадают в ссылку сами: `link()` собирает её из
полного текущего состояния плюс то, что передали. Своими руками писать в разметке
`<a href="k=v">` в расчёте на то, что остальные ключи доедут, нельзя — не доедут.
Ссылки надо строить через `$mol_link` с `arg`, как и в обычном `$mol_state_arg`.

До августа 2026 клик склеивал ключи ссылки с ключами адреса и сохранял всё, чего
в ссылке нет. Это ломало ровно то, ради чего пишут `null`, и разводило поведение
клика с холодной загрузкой.

## Несколько роутеров в одном bundle

`at(mount)` — фабрика подкласса. Каждый со своим маунтом:

```ts
const Studio  = $bog_builderui_router.at( '/studio/' )
const Preview = $bog_builderui_router.at( '/studio/preview/' )
```

Активен глобально только один (тот, чей `mount` совпал с текущим путём). Остальные доступны как чистые `$mol_state_arg`-классы — для построения ссылок (`Preview.link({...})`) и чтения dict без побочных эффектов.

## Деплой

Сервер обязан отдавать `index.html` на любой неизвестный путь под `mount`. Иначе deep-links 404-ят на холодной загрузке.

- **Caddy**: `try_files {path} /index.html`
- **nginx**: `try_files $uri $uri/ /index.html;`
- **GitHub Pages**: положи `404.html` с rafgraph-redirect'ом ([spa-github-pages](https://github.com/rafgraph/spa-github-pages)) рядом с `index.html` — пример в `bog/builderui/studio/404.html`. Не забудь `pathSegmentsToKeep` (обычно `1` для project-pages `username.github.io/repo/`).
- **Tauri**: уже работает из коробки

## Не путать с `bog/ui/router/path`

Старый `$bog_ui_router_path` оставлен как есть. Новый написан под прод: pure pathname без synthetic `#!`, инстанс-фабрика через `at()`, dev-guard вместо `is_local` regex.
