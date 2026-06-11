namespace $.$$ {

	const bases = [ 'slate', 'stone', 'zinc', 'gray' ] as const
	const themes = [ 'sky', 'rose', 'violet', 'emerald', 'amber' ] as const
	const fonts = [ 'inter', 'manrope', 'dm-sans', 'eb-garamond' ] as const
	const radii = [ 'none', 'small', 'medium', 'large' ] as const
	const lights_list = [ 'dark', 'light' ] as const

	const titleize = ( s: string ) =>
		s.split( '-' ).map( w => w[ 0 ].toUpperCase() + w.slice( 1 ) ).join( ' ' )

	const cycle = < T extends readonly string[] >( list: T, current: T[ number ] ): T[ number ] => {
		const i = list.indexOf( current )
		return list[ ( i + 1 ) % list.length ]
	}

	export class $builderui_studio extends $.$builderui_studio {

		base_cycle() { this.base( cycle( bases, this.base() as typeof bases[ number ] ) ) }
		theme_cycle() { this.theme( cycle( themes, this.theme() as typeof themes[ number ] ) ) }
		font_head_cycle() { this.font_head( cycle( fonts, this.font_head() as typeof fonts[ number ] ) ) }
		font_body_cycle() { this.font_body( cycle( fonts, this.font_body() as typeof fonts[ number ] ) ) }
		radius_cycle() { this.radius( cycle( radii, this.radius() as typeof radii[ number ] ) ) }
		lights_cycle() { this.lights( cycle( lights_list, this.lights() as typeof lights_list[ number ] ) ) }

		base_label() { return titleize( this.base() ) }
		theme_label() { return titleize( this.theme() ) }
		font_head_label() { return titleize( this.font_head() ) }
		font_body_label() { return titleize( this.font_body() ) }
		radius_label() { return titleize( this.radius() ) }
		lights_label() { return titleize( this.lights() ) }

	}
}
