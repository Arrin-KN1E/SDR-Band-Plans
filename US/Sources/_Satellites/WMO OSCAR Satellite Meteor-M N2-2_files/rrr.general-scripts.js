/**
 * Description: JS file includes all the basic OSCAR non-specific functions
 * which are are / can be used in multiple modules
 * Also containing all search related js code
 *
 */
// ***************************************
var Oscar = function() {
	var self = this;

	var init = function() {
		// get URL of current javascript file as per http://stackoverflow.com/a/2255727/426224
		var scripts = document.getElementsByTagName("script"),
			i;

		// default pageroot = root of current domain
		self.pageroot = "/";

		for (i=0; i<scripts.length; i++) {
			if (scripts[i].src.indexOf('min-js')>-1) {
				var minjs_path = scripts[i].src;

				if (minjs_path.indexOf('?')>-1) {
					minjs_path = minjs_path.substr(0, minjs_path.indexOf('?'));
				}

				self.pageroot = minjs_path.substr(0, minjs_path.lastIndexOf('/')+1);
				return;
			}
		}

		for (i=0; i<scripts.length; i++) {
			if (scripts[i].src.indexOf('/js/')>-1) {
				// development mode - using unminified javascript
				var path = scripts[i].src;
				self.pageroot = path.substr(0, path.indexOf('/js/') + 1);
				return;
			}
		}
	};

	init();
};

var pageroot = (new Oscar()).pageroot;

function inherit(o) { // see http://stackoverflow.com/a/7533593/426224
	function F() {}
	F.prototype = o;
	return new F();
}


/**
 * Basic events functionality
 * @constructor
 */
function Events() {
	this.events = {};
}
Events.prototype.on = function(event, callback) {
	if (event.indexOf(',')>-1) {
		var self = this;
		event.split(',').map(function(e) { self.on(e, callback); });
	} else {
		event = event.trim();
		if (!this.events[event]) {
			this.events[event] = [];
		}
		this.events[event].push(callback);
	}
	return this;
};
Events.prototype.fire = function(event) {
	if (this.events[event]) {
		for (var i=0; i<this.events[event].length; i++) {
			this.events[event][i]();
		}
	}
	return this;
};

// ****************************************

/**
 *
 * Document Ready JQuery
 *
 */
$(document)
		.ready(
				function() {

					/**
					 * **** fade out flash 'success, error, etc' messages *****
					 */
					$('#flashMessage').not('.no-fade,.no-hide').delay(3500).slideToggle("fast");

					/**
					 * ****Show /Hide Elements in Forms and on Help Page*********
					 */
					$(".hint").click(function() {
						$(this).parent().next().slideToggle("slow");
					});
					$(".closehint").click(function() {
						$(this).parent().slideToggle("slow");
					});

					$(".faqhint").click(function() {
						$(this).next().slideToggle("slow");
					});

					// Using the jquery Easy Tooltip plugin to convert abbr to
					// dynamic Tooltip divs
					$("abbr").tooltip({
  						tooltipClass: "tooltip"
					});


					/* Close fixed layer on instrumenttypes admin page */

					$("#pinbox").click(function() {
						var box = $(this).parent().parent().parent();
						if (box.hasClass('fixedbox')) {
							$(this).text('Pin Box');
							box.removeClass('fixedbox');
						} else {
							box.addClass('fixedbox');
							$(this).text('Unpin Box');
						}

					});

					/*---------------------------------------------------------*/
					// General Filter functions
					// Open close filter instructions (jquery ui widget)
					$('#filter-instructions').dialog({
						autoOpen : false
					}, {
						title : "Filter Instructions"
					}, {
						width : 460
					});
					$('#filter-help').click(function() {
						$('#filter-instructions').dialog('open');
					});

					/**
					 * Show and hide the filter -jquery UI
					 */
					

					$('#filter_head-1').click(function() {
						$('#filter_body-1').toggle();

					});
					// Close Filter

					$('#close-filter-1').click(function() {
						$('#filter_body-1').hide();
					});

					$('#filter_head-2').click(function() {
						$('#filter_body-2').toggle();

					});
					// Close Filter
					$('#close-filter-2').click(function() {
						$('#filter_body-2').hide();
					});

					$('#filter_head-3').click(function() {
						$('#filter_body-3').toggle();

					});
					// Close Filter
					$('#close-filter-3').click(function() {
						$('#filter_body-3').hide();
					});

					/**
					 *  Section for the different search fields
					 * could be moved to the more specific js files
					 *
					 */

					var quicksearch_req = $('#quicksearch_req');
					var quicksearch_cap = $('#quicksearch_cap');
					var satellitesearch = $('#satellitesearch');
					var spaceagencysearch = $('#filter-agencies');

					// Defining a placeholder text for the search boxes:
					quicksearch_req.defaultText('Quick Search...');
					quicksearch_cap.defaultText('Quick Search...');
					satellitesearch.defaultText = 'Click and start typing...';
					// spaceagencysearch.defaultText =
					// instrumentsearch.defaultText;

					/**
					 * Using jQuery UI's autocomplete widget: all possible
					 * options mentioned for source, absolute URL (from root) is
					 * required in order to make it work on different pages
					 *
					 */
					quicksearch_req.autocomplete({
						minLength : 2,
						source : pageroot + 'observingrequirements/search',
						delay : 200,
						position : {
							my : "right top",
							at : "right bottom"
						},
						select : function(event, ui) {
							window.location = pageroot + ui.item.url;

						}
					});

					// The quicksearch for the Capabilities part point to a
					// different method
					// used in Layouts/capability_layout
					quicksearch_cap.autocomplete({
						minLength : 2,
						source : pageroot + 'spacecapabilities/search',
						delay : 300,
						position : {
							my : "right top",
							at : "right bottom"
						},
						select : function(event, ui) {
							var url = window.location.origin;

							window.location = url + ui.item.url; // ui.item.url set in controller

						}
					});

				    quicksearch_cap.on("keypress", function(e){
				        if(e.which == 13){
				            var inputVal = $(this).val();
				            if (inputVal != '') {
				            	window.location.href = pageroot + 'spacecapabilities/search?term='+inputVal;
				            }
				        }

				    });

					// This autocomplete is used to ease the process of adding
					// existing instruments to a satellite
					$(document).on('keyup.autocomplete', '.instrumentsearch', function() {
						var hidden = $(this).closest('td').find('input.instrument_id');
						$(this).autocomplete({
							minLength: 2,
							source: pageroot + '/instruments/instrumentsearch',
							delay: 100,
							position: {
								my: "right top",
								at: "right bottom"
							},
							select: function (event, ui) {
								hidden.val(ui.item.id);
							},
							change: function(event, ui) {
								if (!ui.item) {
									hidden.val("");
								}
							}
						});
					});

					// This autocomplete is used to ease the process of adding
					// existing SATELLTIES to a Instrument
					// Used on Capabilities/satellites/edit
					// Populates a list of instrument, selecting one triggers an
					// ajax call to satellite/addInstrument
					satellitesearch.autocomplete({
						minLength : 2,
						source : pageroot + '/satellites/satellitesearch',
						delay : 200,
						position : {
							my : "right top",
							at : "right bottom"
						},
						select : function(event, ui) {
							console.log(ui);
							$.ajax({
								type : "GET",
								url : pageroot
										+ '/instruments/add_satellite_ajax/'
										+ ui.item.id,
								// data: ui.item.id,
								success : function(data, textStatus) {

									$("#satellitelist").html(data);
									// alert(textStatus);
									satellitesearch.val('');

								}

							});	
						}
					});

					/**
					 *  Autocomplete Space Agency names for filter pages
					 *  adds acronyms to the input field
					 */
					spaceagencysearch.autocomplete({
						source : function(request, response) {
							$.getJSON(pageroot+"/spaceagencies/spaceagencysearch", {term : (request.term).split(/,\s*/).pop()}, response);
						},
						// search is called before request is started
						search : function(event, ui) {
							// custom minLength == 3
							var term = (this.value).split(/,\s*/).pop();
							if (term.length < 3) {
								return false; // do not continue
							}

						},
						focus : function() {
							// prevent value inserted on focus
							return false;
						},
						delay : 300,
						position : {
							my : "right top",
							at : "right bottom"
						},
						// Triggered when selecting an item from the list
						select : function(event, ui) {
							var terms = this.value.split(/,\s*/);
							// remove the current input
							terms.pop();
							// add the selected item
							terms.push(ui.item.value);
							// add placeholder to get the
							// comma-and-space at the end
							terms.push("");
							this.value = terms.join(", ");
							return false;
						}

					});

				}); /* End Document ready function */

/**
 * Customization for the autocomplete function if a "category" is defined as
 * part of the return arrary, category headings are added in the result list
 */

$.widget("custom.autocomplete", $.ui.autocomplete, {
	_renderMenu : function(ul, items) {
		var self = this, currentCategory = "";

		$.each(items, function(index, item) {
			if (item.category) {
				if (item.category != currentCategory) {
					ul.append("<li class='search-category'>" + item.category
							+ "</li>");
					currentCategory = item.category;
				}
				self._renderItemData(ul, item);
			}
		});
	}
});

// A custom jQuery method for placeholder text:
$.fn.defaultText = function(value) {

	var element = this.eq(0);
	element.data('defaultText', value);

	element.focus(function() {
		if (element.val() == value) {
			element.val('').removeClass('defaultText');
		}
	}).blur(function() {
		if (element.val() == '' || element.val() == value) {
			element.addClass('defaultText').val(value);
		}
	});

	return element.blur();

};

/*
 * Little Plugin to get Text without descendants used for comparing current with
 * draft requirement values
 *
 */
jQuery.fn.justtext = function() {

	return $(this).clone().children().remove().end().text();
};

function deleteFrequency(url)
{

	$.ajax({
		url: url,
		type: 'GET',
		error: function() {
		$('#info').html('<p>An error has occurred</p>');
		},
		success: function(data) {
				$('#satellitefrequencywrapper').html(data);
		}
	});
}
function deleteInstrument(url)
{
	$.ajax({
		url:        url,
		method:     'get',
		async:      true,
		success:    function(data, textStatus) {
			window.location.reload();
		}
	});
	return false;
}

function loadSubdomain(thisObj, url)
{
	var formData = $(thisObj).closest('form').serialize();
	$.ajax({
		url:        url,
		method:     'get',
		data: formData,
		async:      true,
		success:    function(data, textStatus) {
			$('#GapanalysisVariableId').html(data);
		}
	});
	return false;
}
// End Plugin

function removeSatellite(thisobj,url)
{
	$.ajax({
		url:        url,
		method:     'get',
		async:      true,
		success:    function(data, textStatus) {
			//$(this).closest('li').remove();
			$("#satellitelist").html(data);
		}
	});
	return false;
}

function toggleGapSelection(element)
{
	$('.sub-filters').hide();
	$('#filter-analysis').hide();
	if (!($(element).val()) || $(element).val() == 1) {
		$('#filter-analysis').show();

	}

	if ($(element).val()) {
		$('#right-header').hide();
	} else {
		$('#right-header').show();
	}
	//$('#filter').hide();
	$('#select-'+$(element).val()).show();
}
