jQuery(document).ready(function() {
/* normalize.css is Drupal native CSS normalization file that conflicts with our CSS, therefore we are removing it */
jQuery('link[rel=stylesheet][href*="normalize.css"]').remove();

/* Breadcrumbs */
var main_menu_active_links = document.querySelectorAll("#block-navcenmainmenu-3 .active");
if (main_menu_active_links) {
	for (var i=0;i<main_menu_active_links.length;i++) {
		var x = document.createElement("li");
		if (i == main_menu_active_links.length-1) {
			var clone_text = main_menu_active_links[i].innerText;
			var clone = document.createElement("SPAN");
			clone.textContent = clone_text;
		}
		else {
			var clone = main_menu_active_links[i].cloneNode(true);
		}
		x.appendChild(clone);
		document.querySelector("#breadcrumbs ul").appendChild(x);
	}
}
var y = document.querySelectorAll("#breadcrumbs li a");
for (var i=0; i<y.length; i++) {
	y[i].removeAttribute("class");
}
/* END of Breadcrumbs */

/* Main Category Landing Page */
var main_category_landing_page_check = document.getElementById("main_category_landing_page");
if (main_category_landing_page_check) {
	var main_cat_active_links = document.querySelectorAll("#block-navcenmainmenu .is-active");
	var selected_links = main_cat_active_links[0].parentElement.querySelectorAll("ul li");
	for (var i=0;i<selected_links.length;i++) {
		var clone = selected_links[i].cloneNode(true);
		document.querySelector("#main_category_landing_page ul").appendChild(clone);
	}
}
var y = document.querySelectorAll("#main_category_landing_page li");
for (var i=0; i<y.length; i++) {
	y[i].removeAttribute("class");
	y[i].classList.add('btn');
	y[i].classList.add('btn-primary');
	y[i].classList.add('btn-lg');
	y[i].classList.add('btn-block');
}
var z = document.querySelectorAll("#main_category_landing_page li a");
for (var i=0; i<z.length; i++) {
	z[i].removeAttribute("class");
}
/* END Main Category Landing Page */

/* Mobile Optimization */
// Move Main Menu to Modal Body
var main_menu_modal_body = document.getElementById("main_menu_modal_body");
var main_menu_mobile = document.getElementById("block-navcenmainmenu-3");
var main_menu_pancake = document.getElementById("main_menu_pancake");
if (main_menu_mobile && main_menu_modal_body && (window.getComputedStyle(main_menu_pancake).display != "none")) {
    main_menu_modal_body.appendChild(main_menu_mobile);
}
// Remove Sidebar First on specific pages
var page_check = window.location.href;
if (page_check.includes("ais-vessel-information-verification-service") || page_check.includes("gps-problem-report-status")) {
	document.getElementsByClassName("region-sidebar-first")[0].parentNode.nextElementSibling.classList.remove("col-lg-9");
	document.getElementsByClassName("region-sidebar-first")[0].parentElement.style.display = 'none';
}
/* END of Mobile Optimization */

/* Homepage Only JS */ 
	var is_homepage = document.getElementById('homepage_image');
	if (is_homepage) {
		/* Build the compass menu items on the Homepage */
		var homepagemainlinksmenu = document.getElementById("block-homepagemainlinksmenu");
		if (homepagemainlinksmenu) {
			jQuery('#block-homepagemainlinksmenu li a').each(function(){
				jQuery(this).prepend('<img width="30%" src="/sites/default/files/images/compass_logo_n1.png"/><br><br>');
			});
		}
	}
	else {
		// if not homepage and in mobile mode
		if (window.getComputedStyle(main_menu_pancake).display != "none") {
		//	var navbar = document.getElementById("block-homepagemainmenu").style.display = 'none';
		}
		// if not homepage and in desktop mode, remove home and search links because they are redundant
		else {
			var mainmenu = document.getElementById("block-navcenmainmenu");
			if (mainmenu) {
				var links = mainmenu.querySelectorAll("li.nav-item");
				links[0].remove();
				links[1].remove();
			}
		}
	}
/* END Homepage Only JS */

/* Archives */
/*var archives_main_container = document.getElementById("archives_main_container");
var archives_render_form = document.getElementById("archives-render-form");
if (archives_main_container) {
	var archives_main_container_parent = archives_main_container.parentElement;
	var archives_main_container_parent_parent = archives_main_container.parentElement.parentElement;
	archives_main_container_parent_parent.appendChild(archives_main_container);
	archives_main_container_parent.remove();
}*/
/* END of Archives */
 
/* Dynamically display the category drop-downs for the Contact Us and GPS forms when specific subjects are selected. */
/* First, let's hide all of the sub-categories that will only display upon specific selections */
var aton = document.querySelector("#edit-field-category-aton-wrapper");
if (aton) {aton.style.display = "none";}

var ais = document.querySelector("#edit-field-category-ais-wrapper");
if (ais) {ais.style.display = "none";}

var navigation = document.querySelector("#edit-field-category-navigation-wrapper");
if (navigation) {navigation.style.display = "none";}

var iip = document.querySelector("#edit-field-category-iip-wrapper");
if (iip) {iip.style.display = "none";}

var gps_other_install = document.querySelector("#edit-field-other-gps-install-wrapper");
if (gps_other_install) {gps_other_install.style.display = "none";}

/* Next, let's show the sub-categories when those specific selections are made */
var contact_us_subject = document.getElementById('edit-field-subject');
if (contact_us_subject) {
	contact_us_subject.onchange = function() {
	  if (this.value != "ATON" || this.value != "Navigation Rules" || this.value != "AIS" || this.value != "IIP") {
		aton.style.display = "none";
		ais.style.display = "none";
		navigation.style.display = "none";
		iip.style.display = "none";
	  }
	  if (this.value == "ATON") {
		aton.style.display = "block";
		ais.style.display = "none";
		navigation.style.display = "none";
		iip.style.display = "none";
	  }
	  if (this.value == "AIS") {
		aton.style.display = "none";
		ais.style.display = "block";
		navigation.style.display = "none";
		iip.style.display = "none";
	  }
	  if (this.value == "Navigation Rules") {
		aton.style.display = "none";
		ais.style.display = "none";
		navigation.style.display = "block";
		iip.style.display = "none";
	  }
	  if (this.value == "IIP") {
		aton.style.display = "none";
		ais.style.display = "none";
		navigation.style.display = "none";
		iip.style.display = "block";
	  }
	}
}

var gps_install_type = document.getElementById('edit-field-gps-installation-type');
if (gps_install_type) {
	gps_install_type.onchange = function() {
	  if (this.value != "Other") {
		gps_other_install.style.display = "none";
	  }
	  else {
		gps_other_install.style.display = "block";
	  }
	}
}
/* END Form Category Drop-downs */

/* Bootstrap4 bug fix - Drupal native page titles don't appear on forms or view pages */
/* We have enabled the Bootstrap4 Page Title Block and this code standardizes its H1 code to an H2 title on forms and views */
var old_title_text = jQuery("h1.page-title").text();
var new_title_text = "<h2>"+old_title_text+"</h2>";
jQuery("h1").replaceWith(new_title_text);
/* END of Bootstrap4 bug fix */

/* Long Forms - AIS Historical Data Form */
var form_ais_hdr = document.getElementById('contact-message-historical-request-form-form');
if (form_ais_hdr) {
	
	// Set two date fields to HTML input readonly
	document.getElementById("edit-field-date-0-value-date").setAttribute("readonly", "");
	document.getElementById("edit-field-anticipated-delivery-date-0-value-date").setAttribute("readonly", "");
	
	// Build paginated form
	var pageinated_form = '<div class="form_window"><div id="pages"></div>';
	var form_exp_elements = document.querySelectorAll("#contact-message-historical-request-form-form [class^=field--type]");
	var page_number = 1;
	pageinated_form += '<div class="form_page" id="page_'+page_number+'">';
	for (i = 0; i < 9; i++) {
		pageinated_form += form_exp_elements[i].innerHTML;
	}
	page_number++;
	pageinated_form += '</div><div class="form_page" id="page_'+page_number+'">';
	for (i = 9; i < 14; i++) {
		pageinated_form += form_exp_elements[i].innerHTML;
	}
	page_number++;
	pageinated_form += '</div><div class="form_page" id="page_'+page_number+'">';
	for (i = 14; i < 24; i++) {
		pageinated_form += form_exp_elements[i].innerHTML;
	}
	page_number++;
	pageinated_form += '</div><div class="form_page" id="page_'+page_number+'">';
	for (i = 24; i < 30; i++) {
		pageinated_form += form_exp_elements[i].innerHTML;
	}
	page_number++;
	pageinated_form += '</div><div class="form_page" id="page_'+page_number+'">';
	for (i = 30; i < 35; i++) {
		pageinated_form += form_exp_elements[i].innerHTML;
	}
	page_number++;
	pageinated_form += '</div><div class="form_page" id="page_'+page_number+'">';
	for (i = 35; i < 38; i++) {
		pageinated_form += form_exp_elements[i].innerHTML;
	}
	pageinated_form += '</div></div>';
	pageinated_form += '<div class="long_form_buttons"><button id="page_move_back" class="button button--primary btn btn-primary">Previous Page</button><button id="page_move_next" class="button button--primary btn btn-primary">Next Page</button><div class="long_form_help_text">Please use the Next and Back buttons to move through the form.<br>When you are finished, click the Send message button.</div></div>';
	var actions = document.getElementById('edit-actions');
	var d = document.createElement("div");
	d.innerHTML = pageinated_form;
	form_exp_elements.forEach(e => e.remove());
	actions.before(d);

// Add dynamic show for specific fields
jQuery("#edit-field-grid-cell-size-in-degrees---wrapper").hide();
var heat_map = document.querySelector("#edit-field-heat-map-value");
if (heat_map) {
	heat_map.onchange = function() {
		if (heat_map.checked == true) {
			jQuery("#edit-field-grid-cell-size-in-degrees---wrapper").show();
		}
		else {
			jQuery("#edit-field-grid-cell-size-in-degrees---wrapper").hide();
		}
	};
}
jQuery("#edit-field-graphics-format--wrapper").hide();
var graphics_format = document.querySelector("#edit-field-standard-graphic-format-value");
if (graphics_format) {
	graphics_format.onchange = function() {
		if (graphics_format.checked == true) {
			jQuery("#edit-field-graphics-format--wrapper").show();
		}
		else {
			jQuery("#edit-field-graphics-format--wrapper").hide();
		}
	};
}
// Show the form pages using next and back buttons
jQuery(".form_page").hide();
jQuery("#page_1").show();
jQuery("#page_move_back").css("visibility","hidden");
var current_page = 1;
var next_page;
var prev_page;
jQuery("#pages").html();
jQuery("#pages").html("<h4>Page "+current_page+" of 6</h4>");
jQuery("#page_move_next").click(function() {
	event.preventDefault();
	jQuery("#block-privacyactstatement").hide();
	jQuery("#block-aishistoricaldatarequest").hide();
	jQuery("#page_move_back").css("visibility","visible");
	next_page = current_page + 1;
	jQuery("#page_"+current_page).fadeOut(1,function() {
		jQuery("#page_"+next_page).fadeIn();
		window.scrollTo(0, 180);
	});
	current_page = next_page;
	jQuery("#pages").html();
	jQuery("#pages").html("<h4>Page "+current_page+" of 6</h4>");
	if (current_page == 6) {
		jQuery("#page_move_next").css("visibility","hidden");
	}
	else {
		jQuery("#page_move_next").css("visibility","visible");
	}
});

jQuery("#page_move_back").click(function() {
	event.preventDefault();
	prev_page = current_page - 1;
	jQuery("#page_"+current_page).fadeOut(1,function() {
		jQuery("#page_"+prev_page).fadeIn();
		window.scrollTo(0, 180);
	});
	current_page = prev_page;
	jQuery("#pages").html();
	jQuery("#pages").html("<h4>Page "+current_page+" of 6</h4>");
	if (current_page == 1) {
		jQuery("#page_move_back").css("visibility","hidden");
		jQuery("#page_move_next").css("visibility","visible");
		jQuery("#block-privacyactstatement").show();
		jQuery("#block-aishistoricaldatarequest").show();
	}
	else {
		jQuery("#page_move_prev").css("visibility","visible");
		jQuery("#page_move_next").css("visibility","visible");
		jQuery("#block-privacyactstatement").hide();
		jQuery("#block-aishistoricaldatarequest").hide();
	}
});
}
/* END AIS Historical Data Form*/

/* Long Forms - AIS Data Feed Form */
var form_ais_data_feed = document.getElementById('contact-message-ais-data-feed-request-form');
if (form_ais_data_feed) {
	
	// Set two date fields to HTML input readonly
	document.getElementById("edit-field-date-0-value-date").setAttribute("readonly", "");
	document.getElementById("edit-field-contract-end-date-0-value-date").setAttribute("readonly", "");
	
	// Build paginated form
	var pageinated_form = '<div class="form_window"><div id="pages"></div>';
	var form_exp_elements = document.querySelectorAll("#contact-message-ais-data-feed-request-form [class^=field--type]");
	var page_number = 1;
	pageinated_form += '<div class="form_page" id="page_'+page_number+'">';
	for (i = 0; i < 9; i++) {
		pageinated_form += form_exp_elements[i].innerHTML;
	}
	page_number++;
	pageinated_form += '</div><div class="form_page" id="page_'+page_number+'">';
	for (i = 9; i < 24; i++) {
		pageinated_form += form_exp_elements[i].innerHTML;
	}
	page_number++;
	pageinated_form += '</div><div class="form_page" id="page_'+page_number+'">';
	for (i = 24; i < form_exp_elements.length; i++) {
		pageinated_form += form_exp_elements[i].innerHTML;
	}
	pageinated_form += '</div></div>';
	pageinated_form += '<div class="long_form_buttons"><button id="page_move_back" class="button button--primary btn btn-primary">Previous Page</button><button id="page_move_next" class="button button--primary btn btn-primary">Next Page</button><div class="long_form_help_text">Please use the Next and Back buttons to move through the form.<br>When you are finished, click the Send message button.</div></div>';
	var actions = document.getElementById('edit-actions');
	var d = document.createElement("div");
	d.innerHTML = pageinated_form;
	form_exp_elements.forEach(e => e.remove());
	actions.before(d);

// Show the form pages using next and back buttons
jQuery(".form_page").hide();
jQuery("#page_1").show();
jQuery("#page_move_back").css("visibility","hidden");
var current_page = 1;
var next_page;
var prev_page;
jQuery("#pages").html();
jQuery("#pages").html("<h4>Page "+current_page+" of 3</h4>");
jQuery("#page_move_next").click(function() {
	event.preventDefault();
	jQuery("#block-privacyactstatement").hide();
	jQuery("#block-aisdatafeedrequest").hide();
	jQuery("#page_move_back").css("visibility","visible");
	next_page = current_page + 1;
	jQuery("#page_"+current_page).fadeOut(1,function() {
		jQuery("#page_"+next_page).fadeIn();
		window.scrollTo(0, 180);
	});
	current_page = next_page;
	jQuery("#pages").html();
	jQuery("#pages").html("<h4>Page "+current_page+" of 3</h4>");
	if (current_page == 3) {
		jQuery("#page_move_next").css("visibility","hidden");
	}
	else {
		jQuery("#page_move_next").css("visibility","visible");
	}
});

jQuery("#page_move_back").click(function() {
	event.preventDefault();
	prev_page = current_page - 1;
	jQuery("#page_"+current_page).fadeOut(1,function() {
		jQuery("#page_"+prev_page).fadeIn();
		window.scrollTo(0, 180);
	});
	current_page = prev_page;
	jQuery("#pages").html();
	jQuery("#pages").html("<h4>Page "+current_page+" of 3</h4>");
	if (current_page == 1) {
		jQuery("#page_move_back").css("visibility","hidden");
		jQuery("#page_move_next").css("visibility","visible");
		jQuery("#block-privacyactstatement").show();
		jQuery("#block-aisdatafeedrequest").show();
	}
	else {
		jQuery("#page_move_prev").css("visibility","visible");
		jQuery("#page_move_next").css("visibility","visible");
		jQuery("#block-privacyactstatement").hide();
		jQuery("#block-aisdatafeedrequest").hide();
	}
});
}
/* END AIS Data Feed Form*/
/* Update Weekly Light Lists page with LNM Week */
var is_llwweek = document.querySelector("#block-views-block-aton-weekly-week-block-1");
if (is_llwweek) {
	var views_content = document.querySelectorAll("#block-views-block-aton-weekly-week-block-1 .view-content div");
	for (var i = 0; i < views_content.length; i++) {
		var views_content_data = views_content[i].innerHTML;
		views_content_data = views_content_data.split(",");
		var views_content_data_volume = parseInt(views_content_data[0]);
		var views_content_data_week = parseInt(views_content_data[1]);
		var links_to_update = document.querySelectorAll(".volume_"+views_content_data_volume);
		if (links_to_update) {
			links_to_update.forEach(function(element){
				if (element.className.includes(views_content_data_volume)) {
					element.innerHTML = views_content_data_week;
				}
			});
		}
	}
	document.querySelector("#block-views-block-aton-weekly-week-block-1").style.display = "none";
}
/* END of Update Weekly Light Lists page with LNM Week */
/* Display of Subdistrict on LNM's, PNB's, and Light List Summary of Corrections pages */
var title_subdistrict = document.getElementsByClassName('title_subdistrict');
if (title_subdistrict) {
	for (i=0;i<title_subdistrict.length;i++) {
		var title_subdistrict_text = title_subdistrict[i].innerText;
		if (title_subdistrict_text.includes("g")) {
			title_subdistrict[i].innerText = " (Gulf of Mexico)";
		}
		if (title_subdistrict_text.includes("r")) {
			title_subdistrict[i].innerText = " (Western Rivers)";
		}
		if (title_subdistrict_text.includes("n")) {
			title_subdistrict[i].innerText = "";
		}
	}
}
/* END Display of Subdistrict on LNM's and PNB's */

/* Display of formatted week and year on LNM's pages */
var week_lnm_format = document.getElementsByClassName('week_lnm_format');
if (week_lnm_format) {
	for (i=0;i<week_lnm_format.length;i++) {
		var week_lnm_format_text = week_lnm_format[i].innerText;
		if (week_lnm_format_text.length < 2) {
			week_lnm_format[i].innerText = "0"+week_lnm_format_text;
		}
	}
}
var year_lnm_format = document.getElementsByClassName('year_lnm_format');
if (year_lnm_format) {
	for (i=0;i<year_lnm_format.length;i++) {
		var year_lnm_format_text = year_lnm_format[i].innerText;
		if (year_lnm_format_text) {
			year_lnm_format[i].innerText = year_lnm_format_text.substring(2);
		}
	}
}
/* END Display of formatted week and year on LNM's pages */
/* Rewrite of Volume numerals */
var is_llsc_volume = document.querySelectorAll(".llsc_volume");
if (is_llsc_volume) {
	for(i=0;i<is_llsc_volume.length;++i){
		switch (is_llsc_volume[i].innerHTML) {
			case "1":
				is_llsc_volume[i].innerHTML = "I";
				break;
			case "2":
				is_llsc_volume[i].innerHTML = "II";
				break;
			case "3":
				is_llsc_volume[i].innerHTML = "III";
				break;
			case "4":
				is_llsc_volume[i].innerHTML = "IV";
				break;
			case "5":
				is_llsc_volume[i].innerHTML = "V";
				break;
			case "6":
				is_llsc_volume[i].innerHTML = "VI";
				break;
			case "7":
				is_llsc_volume[i].innerHTML = "VII";
				break;
		}
	}
}
/* END Rewrite */
/* Add NEW to most recent LNM */
var all_weeks = document.querySelectorAll(".week_lnm_format");
if (all_weeks) {
	var check_array = [];
	for (var x=0;x<all_weeks.length;x++) {
		check_array.push((all_weeks[x].innerText));
	}
	check_array.sort();
	var array_length = check_array.length-1;
	var newest_week = check_array[array_length];
	var h = document.createElement("span");
	h.style.color = "red";
	h.style.fontWeight = "bold";              
	var t = document.createTextNode(" New!");     
	h.appendChild(t);
	for (var x=0;x<all_weeks.length;x++) {
		if (all_weeks[x].innerText.includes(newest_week)) {
			all_weeks[x].parentElement.appendChild(h);
		}
	}
}
/* End of add NEW*/
/* Update link to current NAIS Iceberg Chart Image */
var is_naisproducts = document.querySelector("#block-views-block-nais-iceberg-chart-image-block-1");
if (is_naisproducts) {
	var views_content = document.querySelector("#block-views-block-nais-iceberg-chart-image-block-1 .view-content div").innerHTML;
	var link_to_update = document.querySelector("#iceberg_chart");
	if (link_to_update) {
		link_to_update.href = views_content;
	};
	document.querySelector("#block-views-block-nais-iceberg-chart-image-block-1").style.display = "none";
}
/* END update link */

/* BNM Message App */
/* Search Page */
var is_bnm_search = document.querySelector("#block-views-block-broadcast-notices-to-mariners-search-block-1");
if (is_bnm_search) {
	// place district map in the correct location
	var views_content_map = document.querySelectorAll("#block-views-block-broadcast-notices-to-mariners-search-block-2 .view-content div");
	if (views_content_map) {
		for(i=0;i<views_content_map.length;++i){
			views_content_data_map = views_content_map[i];
			document.getElementById("district_map_placement").replaceWith(views_content_data_map);	
		}
	}
	// create the district and sector checkboxes on the form
	var views_content = document.querySelectorAll("#block-views-block-broadcast-notices-to-mariners-search-block-1 .view-content div");
	if (views_content) {
		for(i=0;i<views_content.length;++i){
			views_content_data = views_content[i].innerHTML.split(",");
			var district = views_content_data[0];
			var sector_id = views_content_data[1];
			var sector_name = views_content_data[2];
			var x = document.createElement("INPUT");
			x.setAttribute("type", "checkbox");
			x.setAttribute("name", "sector_"+sector_id);
			x.setAttribute("id", "sector_"+sector_id);
			x.setAttribute("value", sector_id);
			x.setAttribute("class", "bnm_search_form_checkbox");
			var l = document.createElement("LABEL");
			var t = document.createTextNode(sector_name);
			l.setAttribute("for", "sector_"+sector_id);
			l.setAttribute("class", "bnm_search_form_label");
			l.appendChild(t);
			document.getElementById("bnm_search_sector").append(x);
			document.getElementById("bnm_search_sector").append(l);
			var linebreak = document.createElement("br");
			document.getElementById("bnm_search_sector").append(linebreak);
		}
		var d = document.createElement("INPUT");
		d.setAttribute("type", "checkbox");
		d.setAttribute("name", "district_"+district);
		d.setAttribute("id", "district_"+district);
		d.setAttribute("value", district);
		d.setAttribute("class", "bnm_search_form_checkbox");
		var dl = document.createElement("LABEL");
		var dt = document.createTextNode("D"+district);
		dl.setAttribute("for", "district_"+district);
		dl.setAttribute("class", "bnm_search_form_label");
		dl.appendChild(dt);
		document.getElementById("bnm_search_district").append(d);
		document.getElementById("bnm_search_district").append(dl);
		// update page title with district id
		var old_title = document.querySelectorAll("h2 span.field--name-title");
		if (old_title[0].innerHTML.includes("Broadcast Notice to Mariners Search")) {
			var new_title = "D"+district+" "+old_title[0].innerHTML;
			old_title[0].innerHTML = new_title;
		}
	}
	
	if (typeof district === 'undefined'){
		// a user has entered an invalid district
		document.getElementById("bnm_search_page_container").style.display = "none";
		old_title[0].innerHTML = "<h3>You have entered invalid data.<br>Please click <a href='/broadcast-notice-to-mariners'>here</a> to return to the start page.";
	}
	
	// initialize flatpickr on date field
	flatpickr("#datepick1", {mode: "range", minDate: "2019-05",maxDate:"today",dateFormat: "m-d-Y"});
	
	// select checkbox for sector when sector area on map is clicked
	var sector_areas = document.getElementsByClassName("svg_sector_anchor");
	if (sector_areas) {
		for(i=0;i<sector_areas.length;++i){
			sector_areas[i].onclick = function(event) {
				event.preventDefault();
				if (this.id == "0") {
					var target_checkbox = document.querySelector("#bnm_search_district input.bnm_search_form_checkbox");
					if (target_checkbox.checked === true) {
						target_checkbox.checked = false;
					}
					else {
						target_checkbox.checked = true;
					}
				}
				else {
					var target_checkbox = document.getElementById("sector_"+this.id);
					if (target_checkbox.checked === true) {
						target_checkbox.checked = false;
					}
					else {
						target_checkbox.checked = true;
					}
				}
			}
		}
	}
	
	// generate url and open search-results page when form is submitted
	document.getElementById("bnm_search_submit").onclick = function(event) {
		bnm_search_form_submit(event);
	}
	
	function bnm_search_form_submit(event) {
		event.preventDefault();
		var sector_ids = "";
		var district_id = document.querySelector("#bnm_search_district input").value; // get the district regardless of it being checked
		var district_selected = document.querySelector("#bnm_search_district input").checked;
		if (district_selected === true) {
			sector_ids += "0+";
		}
		var sectors_selected = document.querySelectorAll("#bnm_search_sector input");
		for(i=0;i<sectors_selected.length;++i){
			if(sectors_selected[i].checked) {
				sector_ids += sectors_selected[i].value+"+";
			}
		}
		sector_ids = sector_ids.substring(0, sector_ids.length - 1);
		var dates = document.querySelector("#datepick1").value;
		if (dates) {
			dates = dates.split(" to ");
			start_date = dates[0];
			if (dates[1]) {
				end_date = dates[1];
			}
			else {
				end_date = start_date;
			}
			start_date = start_date.split("-");
			end_date = end_date.split("-");
			start_date = start_date[2]+"-"+start_date[0]+"-"+start_date[1];
			end_date = end_date[2]+"-"+end_date[0]+"-"+end_date[1];
			var date_range = start_date+"--"+end_date;
		}
		else {
			var date_range = "1 month ago--today";
		}
		
		if (sector_ids != "") {
			var search_url = window.location.protocol+"//"+window.location.hostname+"/broadcast-notice-to-mariners-search-results?district="+district_id+"&sector="+sector_ids+"&date-range="+date_range;
			window.open(search_url,'_self');
		}
		else {
			alert("Please select at least one District and/or Sector.");
		}
		
	}
	
	// hide view blocks after processing
	document.querySelector("#block-views-block-broadcast-notices-to-mariners-search-block-1").style.display = "none";
	document.querySelector("#block-views-block-broadcast-notices-to-mariners-search-block-2").style.display = "none";
}

/* Search Results Page */
function bnm_search_results() {
	var target_form = document.getElementById("views-exposed-form-broadcast-notices-to-mariners-page-1");
	if (target_form) {
		// remove classes from item selector form for proper rendering
		target_form.removeAttribute("class");
		var target_form_children = target_form.querySelectorAll("*");
		for (var i = 1; i < target_form_children.length - 1; i++) {
		   target_form_children[i].removeAttribute("class");
		}
		var target_input = target_form.querySelector("input");
		target_input.removeAttribute("class");
		
		// insert select all checkbox button
		var bnm_search_results_select_all = document.querySelector("#msg_select");
		if (bnm_search_results_select_all) {
			var c = document.createElement("BUTTON");
			c.setAttribute("type", "button");
			c.setAttribute("id", "bnm_messages_select_all");
			c.setAttribute("class", "btn btn-primary");
			c.innerHTML = "Select All";
			var bnm_checked_status = false;
			c.onclick = function() {
				var bnm_message_checkboxes = document.querySelectorAll("input.bnm_message_checkbox");
				if (bnm_checked_status == false) {
					for(i=0;i<bnm_message_checkboxes.length;++i) {
						bnm_message_checkboxes[i].checked = true;
						c.innerHTML = "Deselect All";
						bnm_checked_status = true;
					}
				}
				else {
					for(i=0;i<bnm_message_checkboxes.length;++i) {
						bnm_message_checkboxes[i].checked = false;
						c.innerHTML = "Select All";
						bnm_checked_status = false;
					}
				}
			};
			bnm_search_results_select_all.innerHTML='';
			bnm_search_results_select_all.append(c);
		}
		// if there are no search results, hide components and display a message with a link to search page
		var empty_table = document.querySelectorAll(".views-empty");
		if (empty_table[0]) {
			target_form.style.display = "none";
			document.getElementsByTagName("thead")[0].style.display = "none";
			document.getElementById("block-views-block-broadcast-notices-to-mariners-search-block-3").style.display = "none";
			empty_table[0].innerHTML = "<center><strong>There are no results for your selected criteria.<br><a href='/broadcast-notice-to-mariners'>Please click here to start a new search.</a></strong></center>";
		}
	
		// replace sector id's with names
		var selected_criteria_district = document.querySelector("#selected_criteria_district");
		var selected_criteria_sector = document.querySelector("#selected_criteria_sector");
		if (selected_criteria_district && selected_criteria_sector) {
			if ((selected_criteria_sector.innerHTML.includes("0")) || (selected_criteria_sector.innerHTML.includes("D"))) {
				var originator_names = "D"+selected_criteria_district.innerHTML+"<br>";
			}
			else {
				var originator_names = "";
			}
		}
		var views_content = document.querySelectorAll("#block-views-block-broadcast-notices-to-mariners-search-block-3 .view-content div");
		if (views_content) {
			for(i=0;i<views_content.length;++i){
				originator_names += views_content[i].innerHTML+"<br>";
			}
		}
		if (selected_criteria_sector) {
			var new_element = document.createElement("td");
			new_element.innerHTML = originator_names;
			new_element.id = "selected_criteria_sector";
			selected_criteria_sector.replaceWith(new_element);
			document.querySelector("#block-views-block-broadcast-notices-to-mariners-search-block-3").style.visibility = "hidden";
		}
		// change double dashes in date range
		var date_dashes = document.getElementById("selected_criteria_date_range");
		if (date_dashes) {
			date_dashes = date_dashes.innerHTML;
			date_dashes = date_dashes.replace("--"," to ");
			document.getElementById("selected_criteria_date_range").innerHTML=date_dashes;
		}
		// create and insert checkboxes for each message
		var checkbox_content = document.querySelectorAll(".bnm_message");
		if (checkbox_content) {
			for(i=0;i<checkbox_content.length;++i){
				var checkbox_content_id = checkbox_content[i].id;
				var x = document.createElement("INPUT");
				x.setAttribute("type", "checkbox");
				x.setAttribute("name", "msg_"+checkbox_content_id);
				x.setAttribute("id", "msg_"+checkbox_content_id);
				x.setAttribute("value", checkbox_content_id);
				x.setAttribute("class", "bnm_message_checkbox");
				document.getElementById(checkbox_content_id).innerHTML='';
				document.getElementById(checkbox_content_id).append(x);
			}
		}
		// create and insert buttons in header
		var print_button_content = document.querySelector("#view_print");
		var csv_button_content = document.querySelector("#export_csv");
		var xml_button_content = document.querySelector("#export_xml");
		if (print_button_content) {
			var x = document.createElement("BUTTON");
			x.setAttribute("type", "button");
			x.setAttribute("id", "view_print_button");
			x.setAttribute("class", "btn btn-success");
			x.onclick = function() {
				var bnm_message_checked = document.querySelectorAll("input.bnm_message_checkbox");
				var guid_list = "";
				for(i=0;i<bnm_message_checked.length;++i) {
					if (bnm_message_checked[i].checked) {
						guid_list += bnm_message_checked[i].value+"+";
					}
				}
				var lastChar = guid_list[guid_list.length -1];
				if(lastChar) {
					if(lastChar.includes("+")) {
						guid_list = guid_list.slice(0,-1);
					}
				}
				if (guid_list != "") {
					var message_url = window.location.protocol+"//"+window.location.hostname+"/broadcast-notice-to-mariners-message?guid="+guid_list;
					window.open(message_url,'_blank');
				}
				else {
					alert("Please select at least one message.");
				}
			};
			x.innerHTML = "View/Print Checked Messages";
			print_button_content.innerHTML='';
			print_button_content.appendChild(x);
		}
		if (csv_button_content) {
			var y = document.createElement("BUTTON");
			y.setAttribute("type", "button");
			y.setAttribute("id", "export_csv_button");
			y.setAttribute("class", "btn btn-success");
			y.onclick = function() {
				var bnm_message_checked = document.querySelectorAll("input.bnm_message_checkbox");
				var guid_list = "";
				for(i=0;i<bnm_message_checked.length;++i) {
					if (bnm_message_checked[i].checked) {
						guid_list += bnm_message_checked[i].value+"+";
					}
				}
				var lastChar = guid_list[guid_list.length -1];
				if(lastChar) {
					if(lastChar.includes("+")) {
						guid_list = guid_list.slice(0,-1);
					}
				}
				if (guid_list != "") {
					var message_url = window.location.protocol+"//"+window.location.hostname+"/broadcast-notice-to-mariners-message-export-csv?guid="+guid_list+"&format=csv";
					window.open(message_url,'_blank');
				}
				else {
					alert("Please select at least one message.");
				}
			};
			y.innerHTML = "Export Checked as CSV";
			csv_button_content.innerHTML='';
			csv_button_content.appendChild(y);
		}
		if (xml_button_content) {
			var z = document.createElement("BUTTON");
			z.setAttribute("type", "button");
			z.setAttribute("id", "export_xml_button");
			z.setAttribute("class", "btn btn-success");
			z.onclick = function() {
				var bnm_message_checked = document.querySelectorAll("input.bnm_message_checkbox");
				var guid_list = "";
				for(i=0;i<bnm_message_checked.length;++i) {
					if (bnm_message_checked[i].checked) {
						guid_list += bnm_message_checked[i].value+"+";
					}
				}
				var lastChar = guid_list[guid_list.length -1];
				if(lastChar) {
					if(lastChar.includes("+")) {
						guid_list = guid_list.slice(0,-1);
					}
				}
				if (guid_list != "") {
					var message_url = window.location.protocol+"//"+window.location.hostname+"/broadcast-notice-to-mariners-message-export-xml?guid="+guid_list+"&format=xml";
					window.open(message_url,'_blank');
				}
				else {
					alert("Please select at least one message.");
				}
			};
			z.innerHTML = "Export Checked as XML";
			xml_button_content.innerHTML='';
			xml_button_content.appendChild(z);
		}
		
		// create and insert buttons in the footer
		var back_district_search = document.createElement("BUTTON");
		back_district_search.setAttribute("type", "button");
		back_district_search.setAttribute("id", "back_district_search");
		back_district_search.setAttribute("class", "btn btn-primary text-center");
		back_district_search.innerHTML = "Back to District Search";
		var footer_button1_area = document.getElementById("footer_button1");
		if (footer_button1_area) {
			footer_button1_area.innerHTML='';
			footer_button1_area.appendChild(back_district_search);
		}
		var back_main_search = document.createElement("BUTTON");
		back_main_search.setAttribute("type", "button");
		back_main_search.setAttribute("id", "back_main_search");
		back_main_search.setAttribute("class", "btn btn-primary text-center");
		back_main_search.innerHTML = "New Search";
		var footer_button2_area = document.getElementById("footer_button2");
		if (footer_button2_area) {
			footer_button2_area.innerHTML='';
			footer_button2_area.appendChild(back_main_search);
		}
		document.getElementsByClassName("view-content")[1].classList.add("table-responsive");
	}
}
// check if bnm search results page and run code
var is_bnm_search_results = document.querySelector("#block-views-block-broadcast-notices-to-mariners-search-block-3");
if (is_bnm_search_results) {
	// run the function on initial load
	bnm_search_results();
	// run the function every time ajax is used to refresh the page - i.e. new item amount selection
	jQuery( document ).ajaxComplete(function(){
		bnm_search_results();
	});
}
// check if bnm message page, and create and insert print button
var is_bnm_message_page = document.getElementById("bnm_message_print_div");
if (is_bnm_message_page) {
	var bnm_messages_count = document.querySelectorAll(".bnm_message_render");
	if (bnm_messages_count.length == 1) {
		var print_button_text = "Print Message";
	}
	else {
		var print_button_text = "Print Messages";
	}
	var bnm_message_page_print = document.createElement("BUTTON");
	bnm_message_page_print.setAttribute("type", "button");
	bnm_message_page_print.setAttribute("id", "bnm_message_print");
	bnm_message_page_print.setAttribute("class", "btn btn-primary");
	bnm_message_page_print.innerHTML = print_button_text;
	bnm_message_page_print.onclick = function () {
		//window.print();
		var bnm_message_div_content = document.querySelectorAll(".bnm_message_render");
		var bnm_message_div_content_text = "";
		if (bnm_message_div_content) {
			for(i=0;i<bnm_message_div_content.length;++i){
				bnm_message_div_content_text += bnm_message_div_content[i].innerHTML;
			}
		}
		var a = window.open('','',);
		a.document.write('<html>');
		a.document.write('<body>');
		a.document.write(bnm_message_div_content_text);
		a.document.write('</body></html>');
		a.document.close();
		a.print();        
	}
	is_bnm_message_page.innerHTML='';
	is_bnm_message_page.appendChild(bnm_message_page_print);
}
/* End of BNM Message App */

/* LNM XML page - insert uploaded date of LNM.xml file*/
var daily_lnm_xml_page = document.getElementById("lnm_xml_date");
if (daily_lnm_xml_page) {
	fetch('/sites/default/files/xml/lnms/lnm.xml').then(function(response) {
		var lnm_xml_date = response.headers.get('Last-Modified');
		var lnm_xml_date_status = response.status;
		if (lnm_xml_date_status == 200) {
			daily_lnm_xml_page.innerHTML = lnm_xml_date;
		}
	});
}
/* End of LNM XML page*/

/* Constellation Table - modifications */
/* Hide all inactive NANUS and make yellow any row with an associated active NANU */
var nanu_active_check = document.querySelectorAll("td.nanu-active-check");
if (nanu_active_check[0]) {
	for (var x=0;x<nanu_active_check.length;x++) {
		nanu_active_status = parseInt(nanu_active_check[x].innerText);
		if (nanu_active_status == 0) {
			nanu_active_check[x].previousElementSibling.innerText=" ";
			nanu_active_check[x].previousElementSibling.previousElementSibling.innerText=" ";
			nanu_active_check[x].previousElementSibling.previousElementSibling.previousElementSibling.innerText=" ";
			nanu_active_check[x].innerText=" ";
		}
		else if (nanu_active_status == 1) {
			nanu_active_check[x].parentNode.style.backgroundColor = "#FFFF8F";
			nanu_active_check[x].innerText=" ";
		}
	}
}
/* Page date display */
var gps_con_date = document.getElementById('gps_con_date');
if (gps_con_date) {
	var todays_date = new Date();
	gps_con_date.innerHTML = todays_date.toDateString();
	// Make all tables responsive
	var constellation_tables = document.getElementsByClassName("view-content");
	for (i=0;i<constellation_tables.length;i++) {
		constellation_tables[i].classList.add("table-responsive");
	}
}
/* END of Constellation table*/

/* NANU page return button */
var is_nanu_page = document.querySelectorAll(".field.field--name-field-nanu-message-body");
if (is_nanu_page[0]) {
	var nanu_return_button_div = document.createElement("DIV");
	var nanu_return_button = document.createElement("BUTTON");
	nanu_return_button.setAttribute("type", "button");
	nanu_return_button.setAttribute("class", "btn btn-primary mt-3");
	nanu_return_button.innerHTML = "Return";
	nanu_return_button.onclick = function () {
		history.back();
	}
	nanu_return_button_div.appendChild(nanu_return_button);
	is_nanu_page[0].appendChild(nanu_return_button_div);
}
/* END NANU button */

/* AIS VIVS Application*/
var ais_vivs_main_container = document.getElementById("ais_vivs_main_container");
var ais_vivs_search_form 	= document.getElementById("vivs-render-form");
if (ais_vivs_search_form) {
	// set page title
	var h = document.createElement("H2");
	var t = document.createTextNode("Vessel Information Verification Service (VIVS)");
	h.setAttribute("class", "text-center");
	h.appendChild(t);
	document.querySelectorAll(".region")[0].appendChild(h);
	// check state of form and render page as appropriate
	if (ais_vivs_main_container) {
		// form has been submitted and table returned
	}
	else {
		// form has not been submitted
		document.getElementById("vivs-render-form").style.display = "block";
		document.getElementById("ais_vivs_inst").style.display = "block";
	}
}
/* END of AIS VIVS Application*/

/* GPS Problem Reporting */
var x = document.getElementById('gps_pr_record_counter');
if (x) {
	var y = document.getElementById('gps_pr_main_container');
	y.insertBefore(x, y.childNodes[0]);
}
var gps_pr_table = document.getElementById("gps_pr_table");
var gps_pr_table_filter = document.getElementById("gps_pr_table_filter");
if (gps_pr_table) {
	gps_pr_table_filter.addEventListener("input", (event) => myFunction());
	function myFunction() {
		var input, filter, table, tr, td, i, txtValue;
		var r_ctr = 0;
		filter = gps_pr_table_filter.value.toUpperCase();
		table = gps_pr_table;
		tr = table.getElementsByTagName("tr");
		// Loop through all table rows, and hide those who don't match the search query
		for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[0];
			if (td) {
				txtValue = td.textContent || td.innerText;
				txtValue = txtValue.substring(0,10);
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
					tr[i].style.display = "";
					r_ctr++;
				}
				else {
					tr[i].style.display = "none";
				}
			}
		}
		document.getElementById("gps_pr_record_counter").innerText = "Total Number of Reports: "+r_ctr;
	}
}
/* End of GPS Problem Reporting */

/* Nav Rule Flash Cards*/
var get_new_question = document.getElementById('get_new_question');
if (get_new_question) {
	function show_new_question() {
		// we want an odd number between 3 and 159
		var card_question = Math.floor(Math.random() * 156) + 3;
		if (card_question % 2 == 0) {
			card_question++;
		}
		// next set the page/card number with correct amount of zeros
		var card_question_string = card_question.toString();
		var card_question_string_length = card_question_string.length;
		switch(card_question_string_length) {
			case 1:
				card_question_string = '<img class="img-fluid" src="/sites/default/files/images/flashCards/NavRulesFlashCards/page000'+card_question_string+'.jpg" />';
				break;
			case 2:
				card_question_string = '<img class="img-fluid" src="/sites/default/files/images/flashCards/NavRulesFlashCards/page00'+card_question_string+'.jpg" />';
				break;
			case 3:
				card_question_string = '<img class="img-fluid" src="/sites/default/files/images/flashCards/NavRulesFlashCards/page0'+card_question_string+'.jpg" />';
				break;
			default:
				card_question_string = '<img class="img-fluid" src="/sites/default/files/images/flashCards/NavRulesFlashCards/page0003.jpg" />';
		}
		var card_answer = card_question + 1;
		var card_answer_string = card_answer.toString();
		var card_answer_string_length = card_answer_string.length;
		switch(card_answer_string_length) {
			case 1:
				card_answer_string = '<img class="img-fluid d-block mx-auto" src="/sites/default/files/images/flashCards/NavRulesFlashCards/page000'+card_answer_string+'.jpg" />';
				break;
			case 2:
				card_answer_string = '<img class="img-fluid d-block mx-auto" src="/sites/default/files/images/flashCards/NavRulesFlashCards/page00'+card_answer_string+'.jpg" />';
				break;
			case 3:
				card_answer_string = '<img class="img-fluid d-block mx-auto" src="/sites/default/files/images/flashCards/NavRulesFlashCards/page0'+card_answer_string+'.jpg" />';
				break;
			default:
				card_answer_string = '<img class="img-fluid d-block mx-auto" src="/sites/default/files/images/flashCards/NavRulesFlashCards/page0004.jpg" />';
		}
		document.getElementById("card_question_string").innerHTML = card_question_string;
		document.getElementById("card_answer_string").innerHTML = card_answer_string;
	}
	get_new_question.addEventListener("click", show_new_question);
	show_new_question();
}
/* END of Nav Rule Flash Cards*/

// print current page
var printer_friendly_button = document.getElementById("printer_friendly_button");
var block_bootstrap4_content = document.getElementById("block-bootstrap4-content");
if (block_bootstrap4_content) {
	if (printer_friendly_button) {
		printer_friendly_button.onclick = function() {
			var printer_friendly_section = document.getElementById('printer_friendly_section');
			if (printer_friendly_section) {
				printer_friendly_section.innerHTML = "";
			}
			else {
				var printer_friendly_section = document.createElement("div");
				printer_friendly_section.id = "printer_friendly_section";
				document.body.appendChild(printer_friendly_section);
			}
			var domClone = block_bootstrap4_content.cloneNode(true);
			printer_friendly_section.appendChild(domClone);
			window.print();
			//location.reload();
		}
	}
}
else {
	printer_friendly_button.style.display="none";
}

// Add additional missing field visibility on HDR form
var form_check_hdr = window.location.href;
if (form_check_hdr.includes("/contact/ais-historical-request")) {
	var input_validation = document.querySelectorAll('input');
	for (var x = 0; x<input_validation.length;x++) {
		input_validation[x].addEventListener('invalid', function (event) {
			if ( ! event.target.validity.valid ) {
				var missed_field = document.querySelector("label[for=" + event.target.id + "]").innerHTML;
				alert("Please fill out the "+missed_field+" field.");
			}
		})
	}

	var texatarea_validation = document.querySelectorAll('textarea');
	for (var x = 0; x<texatarea_validation.length;x++) {
		texatarea_validation[x].addEventListener('invalid', function (event) {
			if ( ! event.target.validity.valid ) {
				var missed_field = document.querySelector("label[for=" + event.target.id + "]").innerHTML;
				alert("Please fill out the "+missed_field+" field.");
			}
		})
	}
}

var bnm_search_form = document.getElementById("bnm_search");
if (bnm_search_form) {
	if (document.getElementById("district_17")) {
		document.getElementById("district_17").setAttribute("disabled", "true"); 
	}
	if (document.getElementById("district_14")) {
		document.getElementById("district_14").setAttribute("disabled", "true"); 
	}
	if (document.getElementById("district_13")) {
		document.getElementById("district_13").setAttribute("disabled", "true"); 
	}
	if (document.getElementById("district_11")) {
		document.getElementById("district_11").setAttribute("disabled", "true"); 
	}
	if (document.getElementById("district_9")) {
		document.getElementById("district_9").setAttribute("disabled", "true"); 
	}
	if (document.getElementById("district_7")) {
		document.getElementById("district_7").setAttribute("disabled", "true"); 
	}
	if (document.getElementById("sector_30")) {
		document.getElementById("sector_30").setAttribute("disabled", "true"); 
	}
	if (document.getElementById("sector_34")) {
		document.getElementById("sector_34").setAttribute("disabled", "true"); 
	}
	if (document.getElementById("sector_35")) {
		document.getElementById("sector_35").setAttribute("disabled", "true"); 
	}
	if (document.getElementById("sector_36")) {
		document.getElementById("sector_36").setAttribute("disabled", "true"); 
	}
	if (document.getElementById("sector_25")) {
		document.getElementById("sector_25").setAttribute("disabled", "true"); 
	}
	if (document.getElementById("sector_29")) {
		document.getElementById("sector_29").setAttribute("disabled", "true"); 
	}
	if (document.getElementById("sector_17")) {
		document.getElementById("sector_17").setAttribute("disabled", "true"); 
	}
	if (document.getElementById("sector_18")) {
		document.getElementById("sector_18").setAttribute("disabled", "true"); 
	}
	if (document.getElementById("sector_20")) {
		document.getElementById("sector_20").setAttribute("disabled", "true"); 
	}
	if (document.getElementById("sector_21")) {
		document.getElementById("sector_21").setAttribute("disabled", "true"); 
	}
	if (document.getElementById("sector_22")) {
		document.getElementById("sector_22").setAttribute("disabled", "true"); 
	}
	if (document.getElementById("sector_13")) {
		document.getElementById("sector_13").setAttribute("disabled", "true"); 
	}
	if (document.getElementById("sector_15")) {
		document.getElementById("sector_15").setAttribute("disabled", "true"); 
	}
	if (document.getElementById("sector_16")) {
		document.getElementById("sector_16").setAttribute("disabled", "true"); 
	}
}

});