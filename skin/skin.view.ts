namespace $.$$ {
	export class $bog_builderui_skin extends $.$bog_builderui_skin {

		static ios_zoom_fixed = new WeakSet< object >()

		ios_zoom_fix() {
			const context = this.$.$mol_dom_context
			const doc = context.document
			if( !doc || $bog_builderui_skin.ios_zoom_fixed.has( doc ) ) return
			$bog_builderui_skin.ios_zoom_fixed.add( doc )
			const nav = context.navigator
			const ios = /iPad|iPhone|iPod/.test( nav?.userAgent ?? '' ) || ( nav?.platform === 'MacIntel' && nav.maxTouchPoints > 1 )
			if( !ios ) return
			const meta = doc.querySelector( 'meta[name="viewport"]' )
			if( !meta ) return
			const content = meta.getAttribute( 'content' ) ?? ''
			if( content.includes( 'maximum-scale' ) ) return
			meta.setAttribute( 'content', content + ', maximum-scale=1' )
		}

		override auto() {
			this.ios_zoom_fix()
			return super.auto()
		}

	}
}
