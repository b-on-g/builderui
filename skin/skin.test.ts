namespace $ {
	$mol_test({

		'skin puts presets on the host node'( $ ) {

			class Host extends $mol_view {
				@ $mol_mem
				Skin() {
					return $bog_builderui_skin.make({ $: this.$, base: ()=> 'stone' })
				}
				override plugins() {
					return [ this.Skin() ]
				}
			}

			const host = Host.make({ $ })
			host.dom_tree()
			const node = host.dom_node()

			$mol_assert_equal( node.getAttribute( 'bog_builderui_base' ), 'stone' )
			$mol_assert_equal( node.getAttribute( 'bog_builderui_lights' ), 'system' )
			$mol_assert_equal( node.getAttribute( 'bog_builderui_theme' ), 'sky' )
			$mol_assert_equal( node.getAttribute( 'bog_builderui_radius' ), 'medium' )
			$mol_assert_equal( node.getAttribute( 'mol_theme' ), null )

			host.destructor()
		},

		'skin follows the host'( $ ) {

			class Host extends $mol_view {
				@ $mol_mem
				lights( next?: string ) {
					return next ?? 'dark'
				}
				@ $mol_mem
				Skin() {
					return $bog_builderui_skin.make({ $: this.$, lights: ()=> this.lights() })
				}
				override plugins() {
					return [ this.Skin() ]
				}
			}

			const host = Host.make({ $ })
			host.dom_tree()
			$mol_assert_equal( host.dom_node().getAttribute( 'bog_builderui_lights' ), 'dark' )

			host.lights( 'light' )
			host.dom_tree()
			$mol_assert_equal( host.dom_node().getAttribute( 'bog_builderui_lights' ), 'light' )

			host.destructor()
		},

	})
}
