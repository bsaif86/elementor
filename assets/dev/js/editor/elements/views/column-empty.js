module.exports = Marionette.ItemView.extend( {
	template: '#tmpl-elementor-empty-preview',

	className: 'elementor-empty-view',

	events: {
		click: 'onClickAdd',
	},

	behaviors: function() {
		return {
			contextMenu: {
				behaviorClass: require( 'elementor-behaviors/context-menu' ),
				groups: this.getContextMenuGroups(),
			},
		};
	},

	getContextMenuGroups: function() {
		return [
			{
				name: 'general',
				actions: [
					{
						name: 'paste',
						title: elementor.translate( 'paste' ),
						isEnabled: this.isPasteEnabled.bind( this ),
						callback: () => $e.run( 'elements/paste', {
							element: this._parent,
						} ),
					},
				],
			},
		];
	},

	isPasteEnabled: function() {
		var transferData = elementorCommon.storage.get( 'transfer' );

		if ( ! transferData ) {
			return false;
		}

		if ( 'section' === transferData.elementsType ) {
			return transferData.elements[ 0 ].isInner && ! this._parent.isInner();
		}

		return 'widget' === transferData.elementsType;
	},

	onClickAdd: function() {
		$e.route( 'panel/elements/categories' );
	},
} );
