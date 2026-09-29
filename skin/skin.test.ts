namespace $.$$ {
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

		'skin stops input zoom on ios only'( $ ) {

			const zoom_after = ( agent: string )=> {
				const meta = { content: 'width=device-width, initial-scale=1', getAttribute: ()=> meta.content, setAttribute: ( _: string, val: string )=> { meta.content = val } }
				const document = { querySelector: ()=> meta }
				const context = { ... $.$mol_dom_context, document, navigator: { userAgent: agent, platform: '', maxTouchPoints: 0 } }
				const skin = $bog_builderui_skin.make({ $: $.$mol_ambient({ $mol_dom_context: context as any }) })
				skin.ios_zoom_fix()
				skin.ios_zoom_fix()
				return meta.content
			}

			$mol_assert_equal( zoom_after( 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)' ), 'width=device-width, initial-scale=1, maximum-scale=1' )
			$mol_assert_equal( zoom_after( 'Mozilla/5.0 (Linux; Android 14)' ), 'width=device-width, initial-scale=1' )

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
