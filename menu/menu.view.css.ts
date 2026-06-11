/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $bog_builderui_menu, {
		padding: {
			top: '0.375rem',
			bottom: '0.375rem',
			left: '0.375rem',
			right: '0.375rem',
		},
		gap: '0.125rem',
		flex: {
			direction: 'column',
			grow: 0,
			shrink: 0,
		},
		align: {
			self: 'stretch',
		},
		minWidth: 0,
		maxWidth: 'none',
		box: {
			shadow: [ {
				x: 0,
				y: 0,
				blur: 0,
				spread: 0,
				color: 'transparent',
			} ],
		},
	} )

	$mol_style_define( $bog_builderui_menu_item, {
		justify: {
			content: 'flex-start',
		},
		padding: {
			top: '0.5rem',
			bottom: '0.5rem',
			left: '0.75rem',
			right: '0.75rem',
		},
		border: {
			radius: $bog_builderui_tokens.radius,
			width: 0,
		},
		background: {
			color: 'transparent',
		},
		color: $bog_builderui_tokens.text,
		font: {
			family: $bog_builderui_tokens.font_body,
			size: '0.9rem',
		},
		flex: {
			grow: 0,
			shrink: 0,
		},
	} )
}
