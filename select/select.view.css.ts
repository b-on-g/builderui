/** @see $bog_builderui_tokens */
namespace $ {
	$mol_style_define( $bog_builderui_select, {
		font: {
			family: $bog_builderui_tokens.font_body,
		},
		color: $bog_builderui_tokens.text,
		background: {
			color: $bog_builderui_tokens.field,
		},
		border: {
			radius: $bog_builderui_tokens.radius,
			width: '1px',
			style: 'solid',
			color: $bog_builderui_tokens.line,
		},
		padding: {
			left: '0.75rem',
			right: '0.75rem',
		},
		cursor: 'pointer',
		transition: 'background-color 120ms, border-color 120ms',

		':hover': {
			background: {
				color: $bog_builderui_tokens.hover,
			},
			border: {
				color: $bog_builderui_tokens.focus,
			},
		},

		$mol_check: {
			background: { color: 'transparent' },
			boxShadow: 'none',
			outline: 'none',
			color: 'inherit',
			':hover': {
				background: { color: 'transparent' },
				boxShadow: 'none',
			},
			':focus': {
				background: { color: 'transparent' },
				boxShadow: 'none',
				outline: 'none',
			},
			':focus-visible': {
				background: { color: 'transparent' },
				boxShadow: 'none',
				outline: 'none',
			},
		},

		$mol_pop_bubble: {
			background: {
				color: $bog_builderui_tokens.card,
			},
			color: $bog_builderui_tokens.text,
			border: {
				width: '1px',
				style: 'solid',
				color: $bog_builderui_tokens.line,
				radius: $bog_builderui_tokens.radius,
			},
			padding: {
				top: '0.25rem',
				right: '0.25rem',
				bottom: '0.25rem',
				left: '0.25rem',
			},
			box: {
				shadow: [ { x: 0, y: '4px', blur: '12px', spread: 0, color: '#00000026' } ],
			},
			overflow: 'hidden',

			$mol_scroll: {
				background: { color: 'transparent' },
				border: { radius: $bog_builderui_tokens.radius },
			},

			$mol_button_minor: {
				border: { radius: $bog_builderui_tokens.radius },
				color: $bog_builderui_tokens.text,
				background: { color: 'transparent' },
				boxShadow: 'none',
				':hover': {
					background: { color: $bog_builderui_tokens.hover },
					boxShadow: 'none',
				},
				':focus': {
					background: { color: 'transparent' },
					boxShadow: 'none',
				},
				':focus-visible': {
					background: { color: 'transparent' },
					boxShadow: 'none',
				},
			},
		},
	} )
}
