namespace $ {

	/**
	 * The one-line opt-out an app writes when a link should mean exactly what it
	 * says. Declared as a real subclass so these cases exercise the seam itself
	 * rather than a copy of the algorithm.
	 *
	 * Not `$`-prefixed on purpose: MAM's dependor reads `$name` tokens as module
	 * paths, and `$bog_builderui_router_literal` would send it looking for a
	 * folder that does not exist.
	 */
	const Literal = class extends $bog_builderui_router {
		static override route_target( anchor_path: string ) { return anchor_path }
	}

	$mol_test({

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
