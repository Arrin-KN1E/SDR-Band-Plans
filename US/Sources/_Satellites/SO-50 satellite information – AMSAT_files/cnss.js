jQuery(document).ready(function($) {
	jQuery('ul.cnss-social-icon li img').on('mouseenter', function() {
		jQuery(this).animate({
			opacity: 0.5
		}, {
			duration: 200,
			queue: false
		});
	});
	jQuery('ul.cnss-social-icon li img').on('mouseleave', function() {
		jQuery(this).animate({
			opacity: 1
		}, {
			duration: 200,
			queue: false
		});
	});
});
