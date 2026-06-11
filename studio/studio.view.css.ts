/** @see $bog_builderui_tokens */
namespace $ {

	const card_title = {
		font: {
			family: $bog_builderui_tokens.font_head,
			weight: 600,
			size: '1rem',
		},
		color: $bog_builderui_tokens.text,
	} as const

	$mol_style_define( $bog_builderui_studio, {
		minHeight: '100vh',
		background: {
			color: $bog_builderui_tokens.back,
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
		Spacer: {
			flex: {
				grow: 1,
			},
		},
		Actions_row: {
			flex: {
				direction: 'row',
			},
			gap: '0.5rem',
		},
		Shuffle: {
			flex: {
				grow: 1,
			},
			justify: {
				content: 'center',
			},
			padding: {
				top: '0.625rem',
				bottom: '0.625rem',
				left: '1rem',
				right: '1rem',
			},
			border: {
				radius: '0.625rem',
				width: '1px',
				style: 'solid',
				color: '#262626',
			},
			background: {
				color: 'transparent',
			},
			color: '#fafafa',
			font: {
				family: $bog_builderui_tokens.font_body,
				weight: 500,
				size: '0.9rem',
			},
		},
		Share: {
			flex: {
				grow: 1,
			},
			justify: {
				content: 'center',
			},
			padding: {
				top: '0.625rem',
				bottom: '0.625rem',
				left: '1rem',
				right: '1rem',
			},
			border: {
				radius: '0.625rem',
				width: '1px',
				style: 'solid',
				color: '#262626',
			},
			background: {
				color: 'transparent',
			},
			color: '#fafafa',
			font: {
				family: $bog_builderui_tokens.font_body,
				weight: 500,
				size: '0.9rem',
			},
		},
		Get_code: {
			justify: {
				content: 'center',
			},
			padding: {
				top: '0.75rem',
				bottom: '0.75rem',
				left: '1rem',
				right: '1rem',
			},
			border: {
				radius: '0.625rem',
				width: 0,
			},
			background: {
				color: '#fafafa',
			},
			color: '#0a0a0a',
			font: {
				family: $bog_builderui_tokens.font_body,
				weight: 600,
				size: '0.95rem',
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
		Badges_row: {
			flex: {
				direction: 'row',
			},
			gap: '0.5rem',
		},
		Buttons_title: card_title,
		Badges_title: card_title,
		Card_title: card_title,
		Field_title: card_title,
		Menu_title: card_title,
		Chart_title: card_title,
		Tabs_title: card_title,
		Select_title: card_title,
		Form_title: {
			font: {
				family: $bog_builderui_tokens.font_head,
				weight: 600,
				size: '1.125rem',
			},
			color: $bog_builderui_tokens.text,
		},
		Form_subtitle: {
			color: $bog_builderui_tokens.shade,
			font: {
				size: '0.875rem',
			},
			padding: {
				bottom: '0.5rem',
			},
		},
		Form_email_block: {
			flex: {
				direction: 'column',
			},
			gap: '0.375rem',
		},
		Form_password_block: {
			flex: {
				direction: 'column',
			},
			gap: '0.375rem',
		},
		Form_email_label: {
			font: {
				family: $bog_builderui_tokens.font_body,
				weight: 500,
				size: '0.85rem',
			},
			color: $bog_builderui_tokens.text,
		},
		Form_password_label: {
			font: {
				family: $bog_builderui_tokens.font_body,
				weight: 500,
				size: '0.85rem',
			},
			color: $bog_builderui_tokens.text,
		},
		Form_email_help: {
			font: {
				size: '0.75rem',
			},
			color: $bog_builderui_tokens.shade,
		},
		Form_actions: {
			flex: {
				direction: 'row',
			},
			gap: '0.5rem',
			padding: {
				top: '0.25rem',
			},
		},
		Form_secondary: {
			background: {
				color: 'transparent',
			},
			color: $bog_builderui_tokens.text,
			border: {
				width: '1px',
				style: 'solid',
				color: $bog_builderui_tokens.line,
			},
		},
		Card_text: {
			color: $bog_builderui_tokens.shade,
		},
		Chart_card: {
			minHeight: '320px',
		},
		Chart_demo: {
			minHeight: '240px',
			flex: {
				grow: 1,
			},
		},
	} )
}
