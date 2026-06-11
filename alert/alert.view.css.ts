/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $bog_builderui_alert, {
		border: {
			color: $bog_builderui_tokens.focus,
		},
		gap: '0.25rem',
		flex: {
			grow: 0,
			shrink: 0,
		},
		align: {
			self: 'stretch',
		},
		maxHeight: '140px',
		Alert_title: {
			font: {
				family: $bog_builderui_tokens.font_head,
				weight: 600,
				size: '0.95rem',
			},
			color: $bog_builderui_tokens.text,
		},
		Alert_text: {
			font: {
				family: $bog_builderui_tokens.font_body,
				size: '0.85rem',
			},
			color: $bog_builderui_tokens.shade,
		},
	} )
}
