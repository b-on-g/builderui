namespace $.$$ {
	export class $bog_builderui_gallery extends $.$bog_builderui_gallery {

		columns_count(): number {
			const n = this.items().length
			if( n <= 3 ) return 1
			if( n <= 6 ) return 2
			if( n <= 12 ) return 3
			return 4
		}

		@ $mol_mem
		sub(): readonly $mol_view[] {
			const items = this.items()
			const cols = this.columns_count()
			if( cols <= 1 ) return items
			const sides: $mol_view[] = []
			for( let i = 0; i < cols; ++ i ) sides.push( this.Side( i ) )
			return sides
		}

		@ $mol_mem_key
		side_items( id: number ): readonly $mol_view[] {
			const items = this.items()
			const cols = this.columns_count()
			const per = Math.ceil( items.length / cols )
			return items.slice( id * per, ( id + 1 ) * per )
		}

		side_size( id: number ): string {
			return String( this.side_items( id ).length )
		}

	}
}
