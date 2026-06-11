/** @see $builderui */
namespace $ {
	$mol_style_define( $builderui_card, {
		background: {
			color: $builderui.card,
		},
		color: $builderui.text,
		border: {
			radius: $builderui.radius,
			width: '1px',
			style: 'solid',
			color: $builderui.line,
		},
		padding: {
			top: '1rem',
			bottom: '1rem',
			left: '1.25rem',
			right: '1.25rem',
		},
		box: {
			shadow: [ {
				x: 0,
				y: '1px',
				blur: '3px',
				spread: 0,
				color: '#0000001a',
			} ],
		},
		gap: '0.75rem',
	} )
}
