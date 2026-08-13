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

## Куда ведёт клик по ссылке

По умолчанию клик **склеивает** адреса: сегменты ссылки накладываются на текущие, а те ключи текущего адреса, которых в ссылке нет, сохраняются. Это удобно, когда экраны делят общие ключи, и на этом живут `journal`, `sample`, `forge` и `studio`.

Обратная сторона — ключ, заведённый одним экраном, едет за вами дальше. Уход с `section=course/lesson=hello` по ссылке на `section=docs/page=views` даёт `lesson=hello/section=docs/page=views`, потому что `lesson` не упомянут ни в одной ссылке шапки.

Приложению, где каждый экран владеет своими ключами, это только мешает. Такое поведение переключается одной строкой в своём подклассе:

```ts
export class $my_router extends $bog_builderui_router {
    static override route_target( anchor_path: string ) { return anchor_path }
}
```

Терять при этом нечего: ссылка уже несёт полную цель, `$mol_state_arg.link()` складывает текущий адрес через `dict_cut()` ещё на этапе сборки href.

`route_target( anchor_path, current_path )` — чистая функция, оба аргумента приходят декодированными и без префикса `mount`. Поведение обеих веток закреплено в `router.web.test.ts`.

**Дефолт не переключать.** Один раз его уже меняли на «идти по href» (`2e4a474`) и в тот же день откатили (`73eb0d4`): общий модуль правился ради одного приложения. Пересматривать это решение можно только с проверкой всех четырёх потребителей.

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
