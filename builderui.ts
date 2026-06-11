namespace $ {

	/**
	 * BuilderUI design tokens — CSS variables in --builderui_*.
	 * Used in .view.css.ts via $builderui.text, $builderui.back, etc.
	 */
	export const $builderui = $mol_style_prop(
		'builderui',
		[
			'back',
			'card',
			'field',
			'hover',
			'text',
			'shade',
			'line',
			'focus',
			'control',
			'current',
			'special',
			'font_body',
			'font_head',
			'radius',
		] as const
	)

}
