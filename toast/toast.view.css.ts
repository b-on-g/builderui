/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $bog_builderui_toast, {
		flex: {
			direction: 'row',
			grow: 0,
		},
		align: {
			items: 'flex-start',
		},
		gap: '0.75rem',
		padding: {
			top: '0.875rem',
			bottom: '0.875rem',
			left: '1rem',
			right: '1rem',
		},
		border: {
			radius: $bog_builderui_tokens.radius,
			width: '1px',
			style: 'solid',
			color: $bog_builderui_tokens.line,
		},
		background: {
			color: $bog_builderui_tokens.card,
		},
		Dot: {
			minWidth: '8px',
			width: '8px',
			height: '8px',
			border: {
				radius: '50%',
				width: 0,
			},
			margin: {
				top: '0.4rem',
			},
		},
		Texts: {
			flex: {
				direction: 'column',
				grow: 1,
				shrink: 1,
			},
			minWidth: 0,
			gap: '0.125rem',
		},
		Title: {
			font: {
				family: $bog_builderui_tokens.font_head,
				weight: 600,
				size: '0.9rem',
			},
			color: $bog_builderui_tokens.text,
		},
		Text: {
			color: $bog_builderui_tokens.shade,
			font: {
				size: '0.85rem',
			},
			whiteSpace: 'normal',
			overflowWrap: 'anywhere',
		},
	} )
}
