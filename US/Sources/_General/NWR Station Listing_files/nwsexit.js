$(function () {
	var html,
	    width = 600;
	if (!$('#nwsexit-warning-dialog').length) {
		html = '<div id="nwsexit-warning-dialog" style="display: none; position: fixed; top: 0; bottom: 0; right: 0; left: 0; z-index: 999999">'
			 +   '<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #000; opacity: 0.7; filter: alpha(opacity=70);"></div>'
		     +   '<div style="position: relative; width: ' + width + 'px; margin: 10% auto; padding: 20px; border-radius: 5px; background: white">'
		     +     '<p>Thank you for visiting a National Oceanic and Atmospheric Administration (NOAA) website. The link you have selected will take you to a non-U.S. Government website for additional information.</p>'
		     +     '<p>NOAA is not responsible for the content of any linked website not operated by NOAA. This link is provided solely for your information and convenience, and does not imply any endorsement by NOAA or the U.S. Department of Commerce of the linked website or any information, products, or services contained therein.</p>'
		     +     '<p>You will be redirected to: <span class="nwsexit-link"></span></p>' 
		     +     '<p style="margin-top:20px;">'
		     +       '<a href="#" class="nwsexit-url" style="padding:8px 16px; font-size:18px; text-decoration:none; font-weight:bold; margin-right:20px; border-radius: 5px; background:#ED7A08; color:#fff;">Continue</a>'
		     +       '<a href="#" class="nwsexit-url nwsexit-hide" style="padding:8px 16px; font-size:18px; text-decoration:none; font-weight:bold; margin-right:20px; border-radius: 5px; background:#ED7A08; color:#fff;" target="_blank">New Window</a>'
		     +       '<a href="#" class="nwsexit-cancel" style="padding:8px 16px; font-size:18px; text-decoration:none; font-weight:normal; margin-right:20px; border-radius: 5px; background:#aaa; color:#fff;">Cancel</a>'
		     +	   '</p>'
		     +   '</div>'
		     + '</div>';
		$(html).appendTo('body');
	}

	$(document).on('click', 'a:not(#nwsexit-warning-dialog a, [onclick], .no-exit-dlg, .no-exit-dlg a)', function () {
		var hostname = this.hostname,
		    out_link, out_url, out_url_display, m;
		if (!hostname) { // e.g. likely JavaScript href or onlick script overrides href click
			return;
		}
		if (hostname.match(/\.gov$/) && this.pathname.match(/(^|\/)nwsexit\.(php|pl)$/)) {
			m = this.search.match(/url=(.*)/);
			out_url = m[1];
		} else if (!hostname.match(/\.gov$/)) {
			out_url = this.href;
		}
		if (out_url) {
			$('#nwsexit-warning-dialog .nwsexit-link').text(out_url);
			if (out_url.search(/(http:)?\/\//i) == -1) {
				out_url = '//' + out_url;
			}
			$('#nwsexit-warning-dialog .nwsexit-url').attr('href', out_url);
			$('#nwsexit-warning-dialog').fadeIn(300);
			return false;
		}
		return;
	});

	$('#nwsexit-warning-dialog .nwsexit-cancel').click(function () {
		$('#nwsexit-warning-dialog').hide();
		return false;
	});
	$('#nwsexit-warning-dialog .nwsexit-hide').click(function () {
		$('#nwsexit-warning-dialog').hide();
		return true;
	});
});
