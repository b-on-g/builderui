/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $bog_builderui_tabs, {
		display: 'inline-flex',
		flex: {
			direction: 'row',
			grow: 0,
		},
		gap: '0.25rem',
		padding: {
			top: '0.25rem',
			bottom: '0.25rem',
			left: '0.25rem',
			right: '0.25rem',
		},
		background: {
			color: $bog_builderui_tokens.field,
		},
		border: {
			radius: $bog_builderui_tokens.radius,
			width: '1px',
			style: 'solid',
			color: $bog_builderui_tokens.line,
		},
	} )
}
