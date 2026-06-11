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
		Sidebar: {
			minWidth: '320px',
			maxWidth: '320px',
			padding: {
				top: '1.5rem',
				bottom: '1.5rem',
				left: '1rem',
				right: '1rem',
			},
			gap: '0.5rem',
			background: {
				color: '#0a0a0a',
			},
			border: {
				right: {
					width: '1px',
					style: 'solid',
					color: '#262626',
				},
			},
			flex: {
				direction: 'column',
			},
		},
		Title: {
			font: {
				weight: 700,
				size: '1.25rem',
			},
			color: '#fafafa',
			padding: {
				top: '0.25rem',
				bottom: '0.75rem',
				left: '0.25rem',
				right: '0.25rem',
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
