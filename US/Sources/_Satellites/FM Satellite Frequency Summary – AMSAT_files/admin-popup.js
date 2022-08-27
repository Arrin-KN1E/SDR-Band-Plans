
( function($) {
        
        $( function() {
                
                
                function ajaxContentAdded() {
                        $('.mfp-wrap').prepend( $('.mfp-close').get(0) );
                        $(window).trigger( 'onPopupWindowLoaded', ['ajax', this.content] );
                }
                
                
                function destroy_editors( content ) {
                        if( !content ) {
                                return;
                        }
                        content.find('.wp-editor-wrap').each( function() {
                                var editor_id = $(this).attr('id').slice( 3, -5 );
                                if( tinyMCE.get( editor_id ) ) {
                                        tinyMCE.get( editor_id ).destroy();
                                }
                        });
                }
                
                function open() {
                        
                        $('.mfp-wrap').prepend( $('.mfp-close').get(0) );
                        
                        if( 'inline' === this.currItem.type ) {
                                $(window).trigger( 'onPopupWindowLoaded', [ 'inline', this.content ] );
                        }
                        
                }
                
                function close() {
                        destroy_editors( this.content );
                }
                
                Window.destroy_editors = destroy_editors;
                
                // Fix select2 with magnificPopup
                $.magnificPopup.instance._onFocusIn = function(e) {
                        // Do nothing if target element is select2 input
                        if( $(e.target).hasClass('select2-search__field') ) {
                          return true;
                        } 
                        // Else call parent method
                        $.magnificPopup.proto._onFocusIn.call(this,e);
                };
                
                /**
                 * Trigger once close button is pressed from poopup
                 */               
                $('body').on('click', '.wpas_win_close_btn', function() {
                        $.magnificPopup.close();
                });
                /**
                 * Trigger once open window button is pressed
                 */
                //$('body').delegate( '.mfp_window, .wpas_win_link ', 'click', function( e) {
                $('body').on( 'click', '.mfp_window, .wpas_win_link ', function( e) {
                        e.preventDefault();
                        
                        
                        var type = $(this).data('win_type') || 'inline';
                        var src = $(this).data('win_src') || $(this).attr('href');
                        
                        var mainClass = $(this).data('window_class');
                        
                        if( !( type && src ) ) {
                                return;
                        }
                                
                        var settings = {
                                items : { type : type, src : src },
                                closeOnBgClick : false,
                                callbacks: {
                                        parseAjax: function(mfpResponse) {
                                                mfpResponse.data = $(mfpResponse.data).removeClass('mfp-hide')
                                        },

                                        ajaxContentAdded: ajaxContentAdded,
                                        open: open,
                                        close : close
                                }
                        };

                        if( 'ajax' === type ) {

                                settings.items.src = ajaxurl;
                                
                                var ajax_data = $(this).data('ajax_params');

                                settings.ajax = {};
                                settings.ajax.settings = {
                                        method : 'POST',
                                        data : ajax_data
                                }
                        }
                        
                        settings.mainClass = mainClass;

                        $.magnificPopup.open( settings );

                        $('.mfp-content .wpas_mfp_window_wrapper .wpas_msg').hide();
                        
                });
        })
        
        
})( jQuery );