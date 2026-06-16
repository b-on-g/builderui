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
            $bog_builderui_router.at( '/myapp/' ).activate()
        }
        // ... дальше как обычно, $mol_state_arg.value() уже идёт через нас
    }
}
```

`activate()` идемпотентен и no-op в трёх случаях:
- нет `window` / `document` (SSR, prerender)
- текущий `pathname` не начинается с `mount`
- `pathname` похож на $mol-dev-артефакт (`.html` или `/-/`) — `npx mam`-режим остаётся на стандартном хеш-роутере

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
- **GitHub Pages**: `404.html` с SPA-редиректом ([rafrex/spa-github-pages](https://github.com/rafgraph/spa-github-pages))
- **Tauri**: уже работает из коробки

## Не путать с `bog/ui/router/path`

Старый `$bog_ui_router_path` оставлен как есть. Новый написан под прод: pure pathname без synthetic `#!`, инстанс-фабрика через `at()`, dev-guard вместо `is_local` regex.
