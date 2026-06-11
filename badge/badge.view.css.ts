/** @see $bog_builderui */
namespace $ {
	$mol_style_define( $bog_builderui_badge, {
		display: 'inline-flex',
		flex: {
			direction: 'row',
			grow: 0,
		},
		align: {
			self: 'flex-start',
			items: 'center',
		},
		padding: {
			top: '0.125rem',
			bottom: '0.125rem',
			left: '0.625rem',
			right: '0.625rem',
		},
		border: {
			radius: '9999px',
			width: 0,
		},
		background: {
			color: $bog_builderui.control,
		},
		color: $bog_builderui.back,
		font: {
			family: $bog_builderui.font_body,
			weight: 500,
			size: '0.75rem',
		},
	} )
}
