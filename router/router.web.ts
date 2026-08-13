namespace $ {

	/**
	 * Path-based router for BuilderUI apps.
	 *
	 * URL shape: `<origin><mount>k=v/k=v?search` — segments live directly in
	 * `pathname`, no `#!` fallback. Drop-in for `$mol_state_arg` once installed
	 * via `.activate()`. Subclass per mount with `.at('/admin/')` to host
	 * several routers in one bundle (nested mounts, preview frames).
	 *
	 * Server contract: any unknown path under `mount` must fall back to the
	 * app's `index.html` (Caddy `try_files`, nginx fallback, GH Pages 404.html,
	 * etc). Without that, deep-links 404 on first hit.
	 */
	export class $bog_builderui_router extends $mol_state_arg {

		/** Mount prefix. Must start AND end with `/`. Override per subclass via `.at()`. */
		static mount = '/'

		/** Factory: subclass anchored at the given pathname mount. */
		static at( mount: string ): typeof $bog_builderui_router {
			if( !mount.startsWith( '/' ) ) mount = '/' + mount
			if( !mount.endsWith( '/' ) ) mount = mount + '/'
			const base = this
			const sub = class extends base {
				static override mount = mount
			}
			Object.defineProperty( sub, 'name', {
				value: `${ base.name }_${ mount.replace( /\W+/g, '_' ).replace( /^_|_$/g, '' ) || 'root' }`,
			} )
			return sub
		}

		@ $mol_mem
		static override href( next?: string ): string {

			if( next === undefined ) return $mol_dom.location.href

			if( !/^about:srcdoc/.test( next ) ) {
				new $mol_after_frame( () => {
					const target = this.href()
					const current = $mol_dom.location.href
					if( target === current ) return
					const h = $mol_dom.history
					h.replaceState( h.state, $mol_dom.document.title, target )
				} )
			}

			return next
		}

		@ $mol_mem
		static override dict( next?: { [ key: string ]: string | null } ) {

			const href = this.href( next && this.make_link( next ) )
			const url = new URL( href )
			const path = decodeURIComponent( url.pathname )
			const segment = path.startsWith( this.mount ) ? path.slice( this.mount.length ) : ''

			const params: { [ key: string ]: string } = {}
			for( const chunk of segment.split( this.separator ) ) {
				if( !chunk ) continue
				const vals = chunk.split( '=' ).map( decodeURIComponent )
				params[ vals.shift()! ] = vals.join( '=' )
			}
			return params as Readonly<typeof params>
		}

		@ $mol_mem_key
		static override make_link( next: { [ key: string ]: string | null } ) {
			const chunks: string[] = []
			for( const key in next ) {
				if( null == next[ key ] ) continue
				const val = next[ key ]
				chunks.push( [ key ].concat( val ? [ val ] : [] ).map( this.encode ).join( '=' ) )
			}
			const segment = chunks.join( this.separator )
			return $mol_dom.location.origin + this.mount + segment + $mol_dom.location.search
		}

		@ $mol_action
		static override go( next: Record<string, string | null> ) {
			const link = this.link( next )
			if( typeof window === 'undefined' ) return
			$mol_dom.history.pushState( null, '', link )
			this.href( link )
		}

		/**
		 * Install as the global `$mol_state_arg`, mount `<base>`, intercept
		 * in-app clicks and `popstate`.
		 *
		 * With no arg — auto-detects `mount` from the `web.js` script src,
		 * which works both for mam dev (`/.../-/web.js` → contains `/-/` →
		 * guard skips activation) and for prod deploys (`/myapp/web.js` →
		 * mount = `/myapp/`).
		 *
		 * With explicit `mount` arg — equivalent to `.at(mount).activate()`.
		 *
		 * No-op when: no `window`/`document`, current pathname doesn't start
		 * with `mount`, pathname looks like a $mol dev artifact (`.html` or
		 * `/-/`), or already installed. Idempotent.
		 */
		static activate( mount?: string ): typeof $bog_builderui_router {

			if( typeof window === 'undefined' ) return this
			if( typeof document === 'undefined' ) return this

			// Dev-server guard: $mol dev artifacts (`/-/…/test.html`) are served by a
			// plain file server with no SPA fallback, so pathname routing would 404 on
			// navigation. Stay on the hash router there — no-op regardless of `mount`.
			const here = decodeURIComponent( $mol_dom.location.pathname )
			if( /\/-\/|\.html$/.test( here ) ) return this

			if( mount ) return this.at( mount ).activate()

			if( this.mount === '/' ) {
				const script = $mol_dom.document.querySelector( 'script[src$="web.js"]' ) as HTMLScriptElement | null
				const detected = script && script.src
					? new URL( script.src ).pathname.replace( /web\.js$/, '' )
					: decodeURIComponent( $mol_dom.location.pathname ).replace( /[^/]*$/, '' )
				if( detected !== '/' ) return this.at( detected ).activate()
			}

			const path = decodeURIComponent( $mol_dom.location.pathname )
			if( !path.startsWith( this.mount ) ) return this

			if( ( $ as any ).$mol_state_arg === this ) return this
			;( $ as any ).$mol_state_arg = this

			const doc = $mol_dom.document
			let base_el = doc.querySelector( 'base' ) as HTMLBaseElement | null
			if( !base_el ) {
				base_el = doc.createElement( 'base' )
				doc.head.insertBefore( base_el, doc.head.firstChild )
			}
			base_el.setAttribute( 'href', this.mount )

			// GH Pages SPA fallback: 404.html redirects `/mount/k=v/foo` →
			// `/mount/?/k=v/foo`. Convert back to the real path on cold load.
			const s = $mol_dom.location.search
			if( s.length > 1 && s.charAt( 1 ) === '/' ) {
				const decoded = s.slice( 2 ).split( '&' ).map( p => p.replace( /~and~/g, '&' ) ).join( '?' )
				const parts = decoded.split( '?' )
				const segment = parts[ 0 ] || ''
				const query = parts[ 1 ] ? '?' + parts[ 1 ] : ''
				$mol_dom.history.replaceState( null, '', this.mount + segment + query + $mol_dom.location.hash )
				this.href( $mol_dom.location.href )
			}

			// Migrate legacy `#!k=v/k=v` bookmarks to clean pathname.
			const hash = $mol_dom.location.hash
			if( hash.startsWith( '#!' ) ) {
				$mol_dom.history.replaceState( null, '', this.mount + hash.slice( 2 ) + $mol_dom.location.search )
				this.href( $mol_dom.location.href )
			}

			self.addEventListener( 'popstate', () => {
				this.href( $mol_dom.location.href )
			} )

			self.addEventListener( 'click', this.on_click.bind( this ), true )

			return this
		}

		/**
		 * Path below `mount` that a click on `anchor_path` navigates to, given the
		 * current `current_path`. Both arrive decoded and already stripped of the
		 * mount prefix. Pure — no DOM, no state — so an app can override it and a
		 * test can call it directly.
		 *
		 * Default: anchor segments merge into the current ones. Positional segments
		 * (no `=`) replace the current positional ones, `k=v` segments override the
		 * current value of the same key, and a current `k=v` whose key the anchor
		 * never mentions is kept.
		 *
		 * That last rule is why a key set by one screen follows you into the next.
		 * Leaving `section=course/lesson=hello` through a link to
		 * `section=docs/page=views` lands on `lesson=hello/section=docs/page=views`,
		 * because no link in the top bar mentions `lesson`. An app that wants a link
		 * to mean exactly what it says overrides this in one line:
		 *
		 *     static override route_target( anchor_path: string ) { return anchor_path }
		 *
		 * Do not flip the default here. It was switched to href-following once
		 * (`2e4a474`) and reverted the same day (`73eb0d4`): four other apps ride on
		 * the merge, and the revert message spells out the rule — a shared module is
		 * not changed for the sake of one consumer. Anyone reopening that decision
		 * has to re-check journal, sample, forge and studio, not just their own app.
		 */
		static route_target( anchor_path: string, current_path: string ): string {

			const a_segments = anchor_path.split( '/' ).filter( Boolean )
			const a_positional = a_segments.filter( s => !s.includes( '=' ) )
			const a_kv = a_segments.filter( s => s.includes( '=' ) )

			const cur_segments = current_path.split( '/' ).filter( Boolean )
			const cur_positional = cur_segments.filter( s => !s.includes( '=' ) )
			const cur_kv = cur_segments.filter( s => s.includes( '=' ) )

			const a_kv_keys = new Set( a_kv.map( s => s.split( '=' )[ 0 ] ) )
			const kept_kv = cur_kv.filter( s => !a_kv_keys.has( s.split( '=' )[ 0 ] ) )

			const new_positional = a_positional.length > 0 ? a_positional : cur_positional

			return [ ...new_positional, ...kept_kv, ...a_kv ].join( '/' )
		}

		protected static on_click( e: MouseEvent ): void {

			if( e.defaultPrevented ) return
			if( e.button !== 0 ) return
			if( e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ) return

			let el = e.target as HTMLElement | null
			while( el && el.tagName !== 'A' ) el = el.parentElement
			if( !el ) return

			const a = el as HTMLAnchorElement
			if( a.hasAttribute( 'download' ) ) return
			if( a.target && a.target !== '' && a.target !== '_self' ) return
			if( a.origin !== $mol_dom.location.origin ) return
			if( !decodeURIComponent( a.pathname ).startsWith( this.mount ) ) return

			const new_path = this.route_target(
				decodeURIComponent( a.pathname ).slice( this.mount.length ),
				decodeURIComponent( $mol_dom.location.pathname ).slice( this.mount.length ),
			)

			const target = $mol_dom.location.origin + this.mount + new_path + ( a.search || $mol_dom.location.search )
			const current = $mol_dom.location.href
			if( target === current ) return

			e.preventDefault()
			$mol_dom.history.pushState( null, '', target )

			// Новый адрес пишем туда, откуда его читает приложение.
			//
			// `at()` заводит подкласс под каждый mount, и кеш `href` у каждого
			// свой. Запись отсюда попадала в кеш не того класса: в браузере
			// было видно, как `location` уже сменился, установленный
			// `$mol_state_arg` держит прежний адрес, а соседний класс — новый.
			// Снаружи это выглядит как «ссылка меняет адрес, но не страницу»,
			// причём стрелки браузера работают: popstate идёт другим путём.
			//
			// Склейку ключей это не трогает — только адресата записи.
			//
			// ВНИМАНИЕ: починен только клик. Тот же промах по классу живёт в
			// `go()`, в слушателе `popstate` и в обеих миграциях адреса на
			// холодной загрузке — там адрес пишется в `this`, а не в активный
			// роутер. Правка, которая закрывала все четыре места разом
			// (`30bbd7a`), попала под общий откат `73eb0d4` и обратно не
			// вернулась. Пока приложение поднимает один роутер, `this` и
			// активный класс совпадают, поэтому баг не виден; он выстрелит на
			// нескольких маунтах через `at()` — ровно тем же «адрес меняется,
			// страница нет».
			const installed = ( $ as any ).$mol_state_arg
			const router = typeof installed?.href === 'function' ? installed : this
			router.href( target )
		}

	}

}
