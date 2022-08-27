$(document).ready(function() {
				function megaHoverOver(){
					$(this).find(".sub").css('opacity', '1').show();
			
				//Calculate width of all ul's
				(function($) { 
					jQuery.fn.calcSubWidth = function() {						
						rowWidth = 0;
						//Calculate row
						$(this).find("ul").each(function() {					
							rowWidth += $(this).width(); 
						});	
					};
				})(jQuery); 
		
				if ( $(this).find(".row").length > 0 ) { 
					//If row exists...
					var biggestRow = 0;	
					//Calculate each row
					$(this).find(".row").each(function() {							   
						$(this).calcSubWidth();
						//Find biggest row
						if(rowWidth > biggestRow) {
							biggestRow = rowWidth;
						}
					});
			
					//Set width
					$(this).find(".sub").css({'width' :biggestRow});
					$(this).find(".row:last").css({'margin':'0'});
				} 
				else { 
					//If row does not exist...
					$(this).calcSubWidth();
			
					//Set Width
					$(this).find(".sub").css({'width' : rowWidth});
				}
			}
	
			function megaHoverOut(){ 			
				$(this).find(".sub").css('opacity','0').hide();				
			}
			
	
		

		var config = {    
		 	sensitivity: 1, // number = sensitivity threshold (must be 1 or higher)    
		 	interval: 100, // number = milliseconds for onMouseOver polling interval    
		 	over: megaHoverOver, // function = onMouseOver callback (REQUIRED)    
		 	timeout: 100, // number = milliseconds delay before onMouseOut    
		 	out: megaHoverOut // function = onMouseOut callback (REQUIRED)    
		};

		$("ul#topnav li .sub").css({'opacity':'0'});
		$("ul#topnav li").hoverIntent(config);
		$("ul#subMenuNav li").hoverIntent(config);


		});