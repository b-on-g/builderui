/** @see $bog_builderui_tokens */
namespace $ {

	$mol_style_define( $bog_builderui_breadcrumbs, {
		display: 'flex',
		flex: {
			direction: 'row',
			wrap: 'wrap',
			grow: 0,
			shrink: 0,
		},
		align: {
			items: 'center',
		},
		gap: '0.5rem',
		font: {
			family: $bog_builderui_tokens.font_body,
			size: '0.875rem',
		},
		color: $bog_builderui_tokens.shade,
	} )

	$mol_style_define( $bog_builderui_breadcrumbs_item, {
		padding: {
			top: '0.125rem',
			bottom: '0.125rem',
			left: '0.25rem',
			right: '0.25rem',
		},
		color: $bog_builderui_tokens.shade,
		background: {
			color: 'transparent',
		},
		border: {
			width: 0,
			radius: $bog_builderui_tokens.radius,
		},
		font: {
			family: $bog_builderui_tokens.font_body,
			size: '0.875rem',
			weight: 500,
		},
		textDecoration: 'none',
		minWidth: 0,
		whiteSpace: 'nowrap',
		flex: {
			grow: 0,
			shrink: 0,
		},
		':hover': {
			color: $bog_builderui_tokens.text,
		},
		'@': {
			bog_builderui_breadcrumbs_current: {
				true: {
					color: $bog_builderui_tokens.text,
					pointerEvents: 'none',
					font: {
						weight: 600,
					},
				},
			},
		},
	} )

}
