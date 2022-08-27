/**
 * Description: This file holds all scripts which are specific to the OSCAR Requiremets module
 * i.e. Datatables functions for the Variables, Requirements tables
 *
 *
 */

//***************************************
// This variable points to the root folder of the application
var pageroot = (new Oscar()).pageroot;

//****************************************

$(document).ready(function() {


/*Used in the user requirements section, hide all original values that have not been changed in the draft*/
$('.originalvalue').each(function() {

	if (trim($(this).parent().justtext()) == trim($(this).text())){
		$(this).hide();
	}

});

/**
 * Function used in the user area, toggle between  new values for draftrequirements and original values
 */


/* Function used on Search (Variables) and Variable Table pages: */
vartable = $('#variablestable').dataTable( {
		processing: true, // SHow
        serverSide: true, // sorting is done on the server
        paging: true,
        lengthChange: false,
        searching: true,
        ordering: true,
        order: [  // Initial sort on id
            [1, 'asc']
        ],
        info: true,
        autoWidth: false,

        //stateSave: false,
        //pagingType: "scrolling",
        scroller: {
            displayBuffer: 3
        },
        //renderer: "bootstrap",
        jQueryUI: true,
        pageLength: 30,
        scrollCollapse: false,
        scrollY: "800px",
        deferRender: false,
        dom: '<lr>t<"F"i>', // see http://datatables.net/ref
        ajax: function (data, callback, settings) {
            $.ajax(
                {
                    url: pageroot+"variables",
                    type: "GET",
                    data: {
                        "subdomains" :   getSubdomains(),
	            		"applicationareas" :  getApplicationareas(),
					    "layers" :   getLayers(),
					    "themes" :   getThemes(),
                        "iDisplayStart": (data.start),
                        "iDisplayLength" : 50,
                        "iSortCol_0": data.order[0].column,
                        "sSortDir_0": data.order[0].dir,
                        'draw': data.draw
                    },
                    dataType: "json"
                }).done(function(response) {
                  callback(
                      {
                          draw: response.draw,
                          data: response.aaData,
                          recordsTotal: response.iTotalRecords,
                          recordsFiltered: response.iTotalDisplayRecords
                      }
                  );
                })
            },

		columns: [ null,null,null,null,{sortable : false},{sortable : false},{ width: "180px"},null ],
		language: {
            zeroRecords : "No matching records found ",
            infoPostFix :"" ,
            processing : "<img src='"+pageroot+"img/ajax-loader.gif'/>",
            infoEmpty : "No matching records found ",
            infoFiltered : " - filtered from _MAX_ records"
        },
	} );


/**
 * Main requirements table
 * Ajax pagination is used
 * Attention: Strange IE BUG - var must not be the same as the ID !
 */
reqtable = $('#requirementstable').dataTable( {
		processing: true, // SHow
        serverSide: true,
        paging: true,
        lengthChange: false,
        searching: true,
        ordering: true,
        order: [
            [1, 'asc']
        ], // Initial
        // sort
        // on
        // acronym
        info: true,
        autoWidth: false,
        scroller: {
            displayBuffer: 5
        },
        jQueryUI: true,
        pageLength: 50,
        scrollCollapse: false,
        scrollY: "600px",
        scrollX: "100%", /*Enable Horizontal scrolling */
        deferRender: false,
    	dom: '<lr>t<"F"i>',  // to inject various elements to the dom
        ajax: function (data, callback, settings) {
            $.ajax({
                url: pageroot+"requirements",
                type: "GET",
                data: {
                    "themes" : getThemes(),
        		  	"applicationareas" : getApplicationareas(),
			       	"layers" : getLayers(),
        		 	"requirementcoverages" : getRequirementcoverages(),
                    "iDisplayStart": (data.start),
                    "iDisplayLength" : 50,
                    "iSortCol_0": data.order[0].column,
                    "sSortDir_0": data.order[0].dir,
                    'draw': data.draw - 1
                },
                dataType: "json"
            }).done(function(response) {
              callback(
                  {
                      draw: response.draw,
                      data: response.aaData,
                      recordsTotal: response.iTotalRecords,
                      recordsFiltered: response.iTotalDisplayRecords
                  }
              );
            })
        },

		columns: [ null, null, {"bSortable" : false},null,
	       {"bSortable" : false},  {"bSortable" : false}, {"bSortable" : false},
	       {"bSortable" : false},  {"bSortable" : false}, {"bSortable" : false}, {"bSortable" : false},
	        null, null,null,{"bSortable" : false}
        ],
		language: {
	            zeroRecords: "No matching records found ",
	            infoPostFix:"" ,
                processing: "<img src='"+pageroot+"img/ajax-loader.gif'/>",
	            infoEmpty: "No matching records found ",
	            infoFiltered: " - filtered from _MAX_ records"
        }
} );


/**
 *  requirements tables in user area (additional column)
 *  Static, no ajax
 *
 */
$('.userrequirements').dataTable( {

   "bJQueryUI": true, /* Use jQuery Theme Roller framework*/
   "sScrollX": "100%", /*Enable Horizontal scrolling if necessary */
	"bScrollCollapse": false,
	"bPaginate": false,
	"bLengthChange": false,
	"bFilter": false,
	"bSort": true,
	"bInfo": true,
	"bAutoWidth": true,
	"bStateSave": false, // saves sort and filter options
	"sDom": '<r>t<"F"i>'  // to inject various elements to the dom

});


/**
 * Static requirements table, used in applicationarea and variable views
 *
 *
 */
$('.staticrequirements').dataTable( {

	/*Very Important -  the number of columns defined here must EXACTLY match the table columns - carful / admin etc. */
	"aoColumns": [ null, null, null, null,
	               { "bSortable": false},{ "bSortable": false},{ "bSortable": false},{ "bSortable": false},{ "bSortable": false}, { "bSortable": false},
	               null, null, null, null],

	               "bJQueryUI": true, /* Use jQuery Theme Roller framework*/
		"bPaginate": false,
		"bLengthChange": false,
		"bFilter": false,
		"bSort": true,
		"bInfo": false,
		"bAutoWidth": false,
		"bStateSave": false,

		"sDom": '<r>t<"F"i>'  // to inject various elements to the dom



	});

/*---------------------------------------------------------*/
//Specific Filter Functions for REQUIREMENTS index page

//Confirming changes in the requirements filter
$('#update-requirements').click(function(){

		var msg = "<strong>Active Filter: "+
					"</i><strong>Themes: </strong><i>"+
					getThemeNames()+
					"</i><strong>  |  Application area(s): </strong><i> "+
					getApplicationareaNames()+
					"</i><strong>  |  Coverage(s):</strong><i> "+
					getRequirementCoverageNames()+
					"</i>"+
					"</i><strong>  | Layer(s):</strong><i> "+
					getLayerNames()+
					"</i>";

		// Update Filter text span on index page
		$('.filter_message ').html(msg);
		// Filters are updated in the export form on the index page
		$('#ExportThemes').val(getThemes());
		$('#ExportApplicationareas').val(getApplicationareas());
		$('#ExportLayers').val(getLayers());
		$('#ExportRequirementcoverages').val(getRequirementcoverages());
		//$('#ExportMessage').val(msg); // not currently used

		$('.filter_body').hide(); // close filter
		$('.filter_message ').parent().removeClass('hide'); // set filter message
		reqtable.fnDraw(); // redraw table

});

//Specific Filter Functions for VARIABLES index page

//Confirming changes in the satellite filter
$('#update-variables').click(function(){

		var msg = "<strong>Active Filter: "+
					"</i><strong>Themes: </strong><i>"+
					getThemeNames()+
					"</i><strong> | Domains: </strong><i>"+
					getSubdomainNames()+
					"</i><strong> | Application areas: </strong><i>"+
					getApplicationareaNames()+
					"</i><strong>  | Layers:</strong><i>"+
					getLayerNames()+
					"</i>"
					;

		$('.filter_message ').html(msg);
		$('#ExportThemes').val(getThemes());
		$('#ExportSubdomains').val(getSubdomains());
		$('#ExportApplicationareas').val(getApplicationareas());
		$('#ExportLayers').val(getLayers());
		//$('#ExportMessage').val(msg); // Not currently used in generating the Excel file

		$('.filter_body').hide(); // close filter
		$('.filter_message ').parent().removeClass('hide');
		vartable.fnDraw();
});


} ); /*End Document ready function*/



/*-------------------------------Private Helper functions---------------------------------------*/

/**
 * Function to get all selected applicationarea ids for the requirements and variables index page
 * Used by datatable
 *
 */
function getApplicationareas(){
	var selected = [];
	$('#selectedapplicationareas input[type="checkbox"]:checked').each(function() {
			selected.push(this.value);
	});
	return(selected.join(','));
};


/**
 * Function to get all selected applicationarea names to display as a filter message
 */
function getApplicationareaNames(){
	var selected = [];
	$('#selectedapplicationareas input[type="checkbox"]:checked').each(function() {
		var ele = $(this).parent();
		selected.push(" "+ele[0].innerText);
	});
	if (selected.length === 0)
	return 'all';
	else
	return(selected);
};


/*
* Function to get all selected theme ids for the requirements and variables index page
* Used by datatable
*
* */
function getThemes(){
	var selected = [];
	$('#selectedthemes input[type="checkbox"]:checked').each(function() {
			selected.push(this.value);
	});
	return(selected.join(','));
};

/*
* Modified function to get all selected theme names to display as a filter message
*
*
* */
function getThemeNames(){
	var selected = [];
	$('#selectedthemes input[type="checkbox"]:checked').each(function() {
		var ele = $(this).parent();
		selected.push(" "+ele[0].innerText);
	});
	if (selected.length === 0)
	return 'all';
	else
	return(selected);
};


/*
* Function to get all selected subdomain ids for the variables and requirements index page
* Used by datatables
*
* */
function getSubdomains(){
	var selected = [];
	$('#selectedsubdomains input[type="checkbox"]:checked').each(function() {
		selected.push(this.value);
	});
	return(selected.join(','));
};

/*
* Modified function to get all selected subdomain names to display as a filter message
*
*
**/
function getSubdomainNames(){
	var selected = [];
	$('#selectedsubdomains input[type="checkbox"]:checked').each(function() {
		var ele = $(this).parent();
		selected.push(" "+ele[0].innerText);
	});
	if (selected.length === 0)
	return 'all';
	else
	return(selected);
};




/*
* Function to get all selected layer ids for the variables and requirements index page
* Used by datatables
*
* */
function getLayers(){
	var selected = [];
	$('#selectedlayers input[type="checkbox"]:checked').each(function() {
		selected.push($(this).attr('id').replace("Layers","") );
	});
	return(selected.join(','));
};

/*
* Modified function to get all selected layer names to display as a filter message
*
*
**/
function getLayerNames(){
	var selected = [];
	$('#selectedlayers input[type="checkbox"]:checked').each(function() {
		var ele = $(this).parent();
		selected.push(" "+ele[0].innerText);
	});
	if (selected.length === 0)
	return 'all';
	else
	return(selected);
};


/*
* Function to get all selected requirementcoverage ids fo requirements index page
* Used by datatable
*
* */
function getRequirementcoverages(){
	var selected = [];
	$('#selectedrequirementcoverages input[type="checkbox"]:checked').each(function() {
			selected.push(this.value);
	});
	return(selected.join(','));
};

/*
* Modified function to get all selected requirementcoverage names to display as a filter message
*
*
**/
function getRequirementCoverageNames(){
	var selected = [];
	$('#selectedrequirementcoverages input[type="checkbox"]:checked').each(function() {
		var ele = $(this).parent();
		selected.push(" "+ele[0].innerText);
	});
	if (selected.length === 0)
	return 'all';
	else
	return(selected);
};


