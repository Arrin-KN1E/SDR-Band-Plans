jQuery(document).ready(function () {

	jQuery("#edit-button-generate-product-type").click(function() {
		screenLoadSatellite();
		setInterval(animationSatelliteLoad,3100);
	});
	
	jQuery(".dropbutton_generate").click(function() {
		screenLoadSatellite();
		setInterval(animationSatelliteLoad,3100);
	});
	
	jQuery("#edit-update-access").click(function() {
		screenLoadSatellite();
		setInterval(animationSatelliteLoad,4100);
	});
	
	
	
	
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
	
	//Checkboxes deactivated with the product in an error state
	jQuery('#edit-products-table > tbody  > tr').each(function(){
		
		if(jQuery(this).find('td').eq(5).text() == "Error"){
			jQuery(this).find('td').eq(0).find('div > input.form-checkbox').attr("disabled", true);
		}else if(jQuery(this).find('td').eq(5).text() == "Approved"){
			 jQuery(this).find('td').eq(0).find('div > input.form-checkbox').hide();
		}
		
	});

});