/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $bog_builderui_dialog, {
		position: 'fixed',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		zIndex: 100,
		display: 'none',
		justify: {
			content: 'center',
		},
		align: {
			items: 'center',
		},
		'@': {
			'bog_builderui_dialog_showed': {
				true: {
					display: 'flex',
				},
			},
		},
		Backdrop: {
			position: 'absolute',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			background: {
				color: '#0000008c',
			},
		},
		Surface: {
			position: 'relative',
			zIndex: 1,
			maxWidth: '420px',
			width: '90%',
			gap: '0.5rem',
		},
		Surface_title: {
			font: {
				family: $bog_builderui_tokens.font_head,
				weight: 600,
				size: '1.125rem',
			},
			color: $bog_builderui_tokens.text,
		},
		Surface_text: {
			color: $bog_builderui_tokens.shade,
			font: {
				size: '0.9rem',
			},
		},
		Surface_actions: {
			flex: {
				direction: 'row',
			},
			gap: '0.5rem',
			justify: {
				content: 'flex-end',
			},
			padding: {
				top: '0.5rem',
			},
		},
		Cancel: {
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
	} )
}
