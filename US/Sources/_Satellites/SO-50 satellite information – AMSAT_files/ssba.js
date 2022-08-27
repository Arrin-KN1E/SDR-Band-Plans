/**
 * Main.
 *
 * @package SimpleShareButtonsAdder
 */

/* exported Main */
var Main = ( function( $, FB ) {
	'use strict';

	return {
		/**
		 * Holds data.
		 */
		data: {},

		/**
		 * Boot plugin.
		 *
		 * @param data
		 */
		boot: function( data ) {
			this.data = data;

			$( document ).ready(
				function() {
					this.init();
				}.bind( this )
			);
		},

		/**
		 * Initialize plugin.
		 */
		init: function() {
			this.listen();
			this.removeP();
		},

		/**
		 * Listener event.
		 */
		listen: function() {
			var self = this;

			// Upon clicking a share button.
			$( 'body' ).on(
				'click',
				'.ssbp-wrap a',
				function( event ) {

					// Don't go the the href yet.
					event.preventDefault();
					self.engageShareButton( this );
				}
			);
		},

		/**
		 * Share button popup
		 *
		 * @param event
		 */
		engageShareButton: function( event ) {

			// If it's facebook mobile.
			if ( 'mobile' === $( event ).data( 'facebook' ) ) {
				FB.ui(
					{
						method: 'share',
						mobile_iframe: true,
						href: $( event ).data( 'href' )
					},
					function( response ) {}
				);
			} else {

				// These share options don't need to have a popup.
				if ( 'email' === $( event ).data( 'site' ) || 'print' === $( event ).data( 'site' ) || 'pinterest' === $( event ).data( 'site' ) ) {

					// Just redirect.
					window.location.href = $( event ).attr( 'href' );
				} else {

					// Prepare popup window.
					var width  = 575,
						height = 520,
						left   = ( $( window ).width() - width ) / 2,
						top    = ( $( window ).height() - height ) / 2,
						opts   = 'status=1' +
								',width=' + width +
								',height=' + height +
								',top=' + top +
								',left=' + left;

					// Open the share url in a smaller window.
					window.open( $( event ).attr( 'href' ), 'share', opts );
				}
			}
		},

		/**
		 * Remove generated p tag from facebook save button.
		 */
		removeP: function() {
		}
	};
} )( window.jQuery, window.FB );
