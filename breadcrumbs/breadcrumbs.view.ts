namespace $.$$ {

	export class $bog_builderui_breadcrumbs_item extends $.$bog_builderui_breadcrumbs_item {

		@ $mol_mem
		override current() {
			const base = this.$.$mol_state_arg.href()
			const here = new URL( base ).pathname
			const my = new URL( this.path(), base ).pathname
			return here === my
		}

	}

}
