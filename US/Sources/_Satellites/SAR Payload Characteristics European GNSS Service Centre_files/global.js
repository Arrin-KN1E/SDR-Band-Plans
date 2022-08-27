/**
 * @file
 * Global utilities.
 *
 */
(function($, Drupal) {

    'use strict';

    Drupal.behaviors.helpdesk_2020 = {
        attach: function(context, settings) {}
    };

/*	if(jQuery("#search-block-form .button.js-form-submit.form-submit.btn.btn-primary").length){
		jQuery("#search-block-form .button.js-form-submit.form-submit.btn.btn-primary").html('<i class="fa fa-search magnifying-glass" aria-hidden="true"></i>');
	}*/

    jQuery(".magnifying-glass").click(function() {
        jQuery("header .block-search-form-block").slideToggle("slow");
        jQuery(".form-search.form-control").attr("placeholder", "Search");
    });

    //Clean dropdown class from footer main-menu
    jQuery(".region-footer-second").children().children('.magnifying-glass').hide();
    jQuery(".region-footer-second").children().children('.clearfix.nav').children().each(function(i, secondary) {
        jQuery(secondary).parent('.clearfix.nav').removeClass('navbar-nav');
        jQuery(secondary).removeClass('expanded-submenu dropdown');
        jQuery(secondary).children().each(function(i, terceary) {
            jQuery(terceary).removeClass('dropdown-toggle dropdown-menu');
            jQuery(terceary).addClass('menu');
            jQuery(terceary).children().each(function(i, fourty) {
                jQuery(fourty).removeClass('dropdown-item');
            });
        });
    });

/*

    //clean dropdown class from side-bar main-menu
    jQuery("#sidebar_first").children().children().children('.magnifying-glass').hide();

    //Control main-menu side-bar
    jQuery(".nav-item.menu-item--expanded.expanded-submenu.dropdown").click(function() {

        //Control main-menu side-bar dropdown event onclick
        if (!jQuery(this).parent().parent().parent().parent().hasClass('sidebar'))
            return true;

        jQuery(this).addClass("show");
        jQuery(this).children().each(function(i, val) {
            jQuery(this).addClass("show");
            jQuery(this).attr("aria-expanded", "true");
        });
    });*/

 

//****************************************/
//Start check width screem
//****************************************/
var $window = jQuery(window);

	function checkWidth() {
		
        var windowsize = $window.width();
		/*remove style show when have click in other link*/
		jQuery("span.dropdown-toggle").click(function(){
			if(jQuery("ul.show")){
				jQuery("ul.show").removeClass("show");
			}
		});
			
		jQuery("#magnifying-mobile").click(function(){
			if(!jQuery("#CollapsingNavbar").hasClass("show")){
				jQuery("#CollapsingNavbar").addClass("show")
			}
		});
		
		/*****************/ 
        if (windowsize < 992) {
			//Screen Mobile
							
           if(jQuery("#block-helpdesk-2020-main-menu .is-active")){
                  jQuery("#block-helpdesk-2020-main-menu .is-active").attr('style', 'color: #333952 !important');
                 if(typeof jQuery("#block-helpdesk-2020-main-menu .is-active").next().next()[0] !== "undefined"){
                      jQuery("#block-helpdesk-2020-main-menu .is-active").next().next()[0].style.setProperty('position', 'relative', 'important');
                  }
            }

			    let screenObj = window.screen;

				jQuery('.gsa-sub-menu').prev("a").click(function(event) {

						if(!jQuery(this).next().next().hasClass("show")){
							event.preventDefault();
							//jQuery(this).parent().parent().next().show();
							jQuery(this).next().next().addClass("show");
							jQuery("#block-helpdesk-2020-main-menu .is-active").attr('style', 'color: #333952 !important');
							jQuery(this).next().next()[0].style.setProperty('position', 'relative', 'important');
							jQuery(this).next().next()[0].style.setProperty('z-index', '999999', 'important');
							event.stopPropagation();
						}
	
			    });

			 jQuery(".nav-item.menu-item--expanded.expanded-submenu.dropdown").click(function() {
					jQuery("#block-helpdesk-2020-main-menu .is-active").attr('style', 'color: #333952 !important');
		     });
			
			    jQuery('#magnifying-mobile').click(function() {
			
			        if (!jQuery('#CollapsingNavbar').hasClass('show')) {
			
			            if (!jQuery('#CollapsingNavbar').hasClass('open-search')) {
			                jQuery('#block-helpdesk-2020-main-menu').hide();
			                jQuery('#block-headermenu').hide();
			
			                jQuery('#CollapsingNavbar').show();
			                jQuery('#CollapsingNavbar').addClass('open-search');
			            } else {
			                jQuery('#block-helpdesk-2020-main-menu').removeAttr('style');
			                jQuery('#block-headermenu').removeAttr('style');
			                jQuery('#CollapsingNavbar').removeAttr('style');
			                jQuery('#CollapsingNavbar').removeClass('open-search');
			            }
			        }
			
			    });
			
			    //Control footer menu
			    jQuery(".clearfix.nav.navbar-nav.first.nav-link.menu").click(function() {
			
			        if (jQuery(this).attr('data-toggle') == 'dropdown') {
			
			            jQuery('ul.menu').hide();
			            jQuery('.menu-active-gss').removeClass('menu-active-gss');
			            jQuery(this).parent().addClass('menu-active-gss');
			            jQuery(this).parent().children('ul').show();
			        }
			    });

        }else{
			//Screen Web
			jQuery(".is-active").removeAttr( 'style' );
			jQuery(".is-active").next().next().removeAttr( 'style' );
			jQuery(".is-active").next().next().removeClass("show");
			jQuery(".gsa-sub-menu").next().removeAttr( 'style' );
			jQuery(".gsa-sub-menu").next().removeClass("show");
			
			if(jQuery("#block-helpdesk-2020-main-menu .active")){
				jQuery("#block-helpdesk-2020-main-menu .active").removeClass("active");	
		    }

			if(jQuery("#block-helpdesk-2020-main-menu .is-active")){
				jQuery("#block-helpdesk-2020-main-menu .is-active").removeClass("is-active");
		    }

			jQuery("#block-mainmenu-2 a span.nav-link").click(function(e){
				e.preventDefault();
				var href_parent = jQuery(this).parent().attr("href");
				location.href = href_parent;
			});

    	}

}//End funtion

	// Execute on load
    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);


//****************************************/
//End check width screem
//****************************************/




    

   // jQuery('#block-helpdesk-2020-page-title').children().children().each(function(i, val) {

        //if (jQuery(this).html() == 'Page not found' || jQuery(this).html() == 'Access denied') {
          //  jQuery('#sidebar_first').hide();
       // }
    //});



})(jQuery, Drupal);