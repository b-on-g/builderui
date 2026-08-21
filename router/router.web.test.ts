namespace $ {

	/**
	 * The one-line opt-out an app writes when a link should mean exactly what it
	 * says. Declared as a real subclass so these cases exercise the seam itself
	 * rather than a copy of the algorithm.
	 *
	 * Deliberately a plain local name, with no dollar prefix and no entry in the
	 * global namespace. MAM's dependor scans doc comments for dollar-prefixed
	 * tokens and resolves each one to a folder, so a name in this module's own
	 * namespace would send the build looking for a directory that is not there.
	 *
	 * The same applies to this very paragraph, which is why it describes the rule
	 * in words instead of spelling out an example: the first draft named one, and
	 * the build went hunting for a package called after it.
	 *
	 * Typed as the base class on purpose. The opt-out an app writes takes only the
	 * argument it uses, which narrows the static's signature on the subclass and
	 * would make the two-argument calls below fail to compile. Widening it back
	 * here keeps the override in the exact shape an app writes it, and the calls
	 * in the shape the router itself makes them.
	 */
	const Literal: typeof $bog_builderui_router = class extends $bog_builderui_router {
		static override route_target( anchor_path: string ) { return anchor_path }
	}

	$mol_test({

		// --- значения со слэшем внутри ------------------------------------------

		'значение со слэшем переживает круг через pathname'( $ ) {

			// `make_link` кодирует `/` в `%2F`, а `dict` раньше декодировал путь
			// целиком до разбиения на сегменты — слэш оживал и резал значение.
			// В песочнице это ломало любой view.tree: `sub /` есть в каждом.
			const Mounted: typeof $bog_builderui_router = class extends $bog_builderui_router {
				static override mount = '/app/'
				static override href( next?: string ) { return next ?? 'https://example.com/app/' }
			}

			const code = 'a\n\tsub /\n\t\tb'
			const link = Mounted.make_link({ code, tab: 'tree' })

			$mol_assert_equal( link.includes( '%2F' ), true )

			const Read: typeof $bog_builderui_router = class extends Mounted {
				static override href( next?: string ) { return link }
			}

			$mol_assert_equal( Read.dict().code, code )
			$mol_assert_equal( Read.dict().tab, 'tree' )
		},

		// --- default: the merge, pinned as it stands ---------------------------
		//
		// These four cases describe behaviour, not an ideal. The merge was switched
		// to href-following once and reverted the same day, because journal, sample,
		// forge and studio all navigate through it. Anyone changing the default has
		// to change these expectations first, deliberately, and re-check those apps.

		'a key the link never mentions is carried over'( $ ) {
			// `lesson` belongs to the course screen and no link in the top bar names
			// it, so leaving the course drags it into the next address.
			$mol_assert_equal(
				$bog_builderui_router.route_target( 'section=docs/page=views', 'section=course/lesson=hello' ),
				'lesson=hello/section=docs/page=views',
			)
		},

		'the compared pair is carried over the same way'( $ ) {
			$mol_assert_equal(
				$bog_builderui_router.route_target( 'section=docs/page=views', 'section=versus/a=mol/b=react' ),
				'a=mol/b=react/section=docs/page=views',
			)
		},

		'the value in the link wins for a key both name'( $ ) {
			$mol_assert_equal(
				$bog_builderui_router.route_target( 'section=docs/page=views', 'section=docs/page=state' ),
				'section=docs/page=views',
			)
		},

		'a key with an empty value is a bare segment and counts as positional'( $ ) {
			// `arg * page \` is an empty string, which make_link writes as `page`
			// with no `=`. The merge reads a segment without `=` as positional, so it
			// replaces the current positional part and lands ahead of every key.
			$mol_assert_equal(
				$bog_builderui_router.route_target( 'section=versus/page', 'section=versus/a=mol/b=react' ),
				'page/a=mol/b=react/section=versus',
			)
		},

		// --- default: positional segments --------------------------------------

		'positional segments in the link replace the current ones'( $ ) {
			$mol_assert_equal(
				$bog_builderui_router.route_target( 'users/42', 'users/7/section=docs' ),
				'users/42/section=docs',
			)
		},

		'current positional segments survive a link made only of keys'( $ ) {
			$mol_assert_equal(
				$bog_builderui_router.route_target( 'section=docs', 'users/7' ),
				'users/7/section=docs',
			)
		},

		// --- overridden: the link is the whole target ---------------------------

		'overridden, a link leads exactly where it points'( $ ) {
			$mol_assert_equal(
				Literal.route_target( 'section=docs/page=views', 'section=course/lesson=hello' ),
				'section=docs/page=views',
			)
			$mol_assert_equal(
				Literal.route_target( 'section=docs/page=views', 'section=versus/a=mol/b=react' ),
				'section=docs/page=views',
			)
			$mol_assert_equal(
				Literal.route_target( 'section=versus/a=mol/b=react', 'section=docs/page=views' ),
				'section=versus/a=mol/b=react',
			)
		},

	})

}
