/** @see $builderui */
namespace $ {
	$mol_style_define( $builderui_studio, {
		minHeight: '100vh',
		background: {
			color: $builderui.back,
		},
		flex: {
			direction: 'row',
		},
		Panel: {
			minWidth: '280px',
			maxWidth: '320px',
			padding: {
				top: '1.5rem',
				bottom: '1.5rem',
				left: '1.5rem',
				right: '1.5rem',
			},
			gap: '1rem',
			background: {
				color: $builderui.card,
			},
			border: {
				right: {
					width: '1px',
					style: 'solid',
					color: $builderui.line,
				},
			},
			flex: {
				direction: 'column',
			},
		},
		Title: {
			font: {
				family: $builderui.font_head,
				weight: 700,
				size: '1.125rem',
			},
			color: $builderui.text,
			padding: {
				bottom: '0.5rem',
			},
		},
		Preview: {
			flex: {
				grow: 1,
			},
		},
		Stack: {
			flex: {
				direction: 'column',
				grow: 1,
			},
			padding: {
				top: '2rem',
				bottom: '2rem',
				left: '2rem',
				right: '2rem',
			},
			gap: '1rem',
			maxWidth: '720px',
		},
		Btns_row: {
			flex: {
				direction: 'row',
			},
			gap: '0.5rem',
		},
		Buttons_title: {
			font: {
				family: $builderui.font_head,
				weight: 600,
				size: '1rem',
			},
			color: $builderui.shade,
		},
		Card_title: {
			font: {
				family: $builderui.font_head,
				weight: 600,
				size: '1rem',
			},
			color: $builderui.text,
		},
		Card_text: {
			color: $builderui.shade,
		},
		Field_title: {
			font: {
				family: $builderui.font_head,
				weight: 600,
				size: '1rem',
			},
			color: $builderui.text,
		},
	} )
}
