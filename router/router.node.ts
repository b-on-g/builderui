namespace $ {

	/** Node-side stub. Real impl in `router.web.ts`. */
	export class $bog_builderui_router extends $mol_state_arg {

		static mount = '/'

		static at( mount: string ): typeof $bog_builderui_router {
			const base = this
			return class extends base {
				static override mount = mount
			}
		}

		static activate( mount?: string ): typeof $bog_builderui_router {
			return this
		}

		/**
		 * Same merge as `router.web.ts`, kept in step by hand.
		 *
		 * Nothing on the node side dispatches a click, so this is never called
		 * here — but an app that overrides the seam compiles for both targets, and
		 * without the member `override` fails the node build. `activate()` is a
		 * no-op stub because it needs a DOM; this one is pure string work, so a
		 * degenerate version would only be a lie waiting to be discovered.
		 *
		 * The web file is the source of truth, and `router.web.test.ts` pins the
		 * behaviour. Change one, change the other.
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

	}

}
