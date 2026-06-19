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

		static activate(): typeof $bog_builderui_router {
			return this
		}

	}

}
