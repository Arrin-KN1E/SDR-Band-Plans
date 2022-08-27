jQuery(document).ready(function () {
	
jQuery('#edit-pass-backup').attr("type","password");
 
jQuery(".viewPublicKey").click(function () {
	
        var publicKey = jQuery('input[name="hidePublicKey"').val()
        jQuery("#dialogKey").empty();
        jQuery("#dialogKey").append(publicKey);
        jQuery("#dialogKey").dialog('open');
    });

    jQuery("#viewKey").click(function(e){
        e.preventDefault();
        var publicKey = jQuery('input[name="hidePublicKey"').val()
        jQuery("#publicKeyDialog").empty();
					if(publicKey != ""){
							jQuery("#publicKeyDialog").append(publicKey);
				 	}else{
							jQuery("#publicKeyDialog").append("There is no public key generated");
				 	}
        jQuery("#publicKeyDialog").dialog('open');
    });

    jQuery("#dialogKey").dialog({
        modal: true,
        autoOpen: false,
        // for aligning block in center
        my: "center",
        at: "center",
        of: window,
        width: "1000px",
        title:"Public Key",
        // effects to show the popup
        show: {
            effect: 'fadeIn',
            duration: 500
        },
        hide: {
            effect: 'fadeOut',
            duration: 500
        }
    });

    jQuery("#publicKeyDialog").dialog({
        modal: true,
        autoOpen: false,
        // for aligning block in center
        my: "center",
        at: "center",
        of: window,
        width: "1000px",
        title:"Public Key",
        // effects to show the popup
        show: {
            effect: 'fadeIn',
            duration: 500
        },
        hide: {
            effect: 'fadeOut',
            duration: 500
        }
    });


//Confirm dialog
  jQuery(".delete-sar-user  a").on('click',function() {
	if(!confirm("Do you really want to eliminate the user ?")){return false;}
  });

//Load satellite, with save configuration sar

  function screenLoadSatellite(){
		jQuery('html').append('<div class="screen_load_satellite" id="screen_load"><div class="image_load_satellite"></div></div>');
		jQuery(window).scrollTop(0);
		var scrollPosition = [
		  self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
		  self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
		];
		var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
				html.data('scroll-position', scrollPosition);
				html.data('previous-overflow', html.css('overflow'));
				html.css('overflow', 'hidden');
				window.scrollTo(scrollPosition[0], scrollPosition[1]);
		jQuery("#screen_load").css("display", "block");
	}
	
   function animationSatelliteLoad(){
		jQuery(".image_load_satellite").animate({ top: "43%" },2000);
		
		setTimeout(function(){
			jQuery(".image_load_satellite").animate({ top: "53%" },2000);
			
		},4000)
	}
	
  jQuery("#edit-sar-server-actions").click(function() {
		screenLoadSatellite();
		setInterval(animationSatelliteLoad,4100);
  });

//Autocomplete field SAR Validity with 4 decimal values

	Drupal.behaviors.gscSarBehavior = {
	    attach: function (context, settings) {
		
		     jQuery( "#TableValidity .autocomplete-validity" ).focusout(function() {
			
			    var validity = jQuery(this).val().split(".")
				
					if(validity[1] == null){
						jQuery(this).val(jQuery(this).val() + ".0000")
					}else{
							var missing = (4 - validity[1].length);
							if(missing > 0 ){
								var addZero = "0".repeat(missing);
								jQuery(this).val(validity[0] + "." + validity[1] + addZero);
							}else{
								jQuery(this).val(validity[0] + "." + validity[1].substr(0, 4));
							}					
					}
			});
			
	    }
	};

});