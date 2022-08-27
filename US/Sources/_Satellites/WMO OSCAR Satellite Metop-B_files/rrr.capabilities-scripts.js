/**
 * This is a collection of javascript methods, mostly Datatables related that
 * are exclusively used within OSCAR/Space
 *
 * More general js is declared in rrr.general-scripts
 *
 */
// ***************************************

// This variable points to the root folder of the application
var pageroot = (new Oscar()).pageroot;

// ****************************************

$(document)
    .ready(
        function () {

            /* Satellite Programme Table */
            /*
             * Attention: Strange IE BUG - var must not be the same as
             * the ID !
             */
            progtable = $('#satelliteprogrammestable')
                .dataTable({
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
                        displayBuffer: 6
                    },
                    jQueryUI: true,
                    pageLength: 50,
                    scrollCollapse: false,
                    scrollY: "550px",
                    deferRender: false,
                    ajax: function (data, callback, settings) {
                    $.ajax(
                        {
                            url: pageroot + "satelliteprogrammes",
                            type: "GET",
                            data: {
                                "launch" : getLaunchDate(),
                                "eol" : getEolDate(),
                                "spaceagencies" : getSpaceAgencies(),
                                "showcurrent" : $(
                                    '#current')
                                    .is(
                                        ':checked'),
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
                    columns: [null, null, null, {
                            "bSortable": true
                        },
                        null, {
                            "bSortable": true
                        }, {
                            "bSortable": true
                        }
                    ],

                    language: {
                        zeroRecords: "No matching records found ",
                        infoPostFix: " (scroll for more results)",
                        processing: "<img src='" + pageroot + "img/ajax-loader.gif'/>",
                        infoEmpty: "No matching records found ",

                        infoFiltered: " - filtered from _MAX_ records"
                    },

                    dom: '<r>t<"F"i>', // to inject
                    // various
                    // elements to
                    // the dom

                    // saves sort and filter options

                });

            /* Satellites Table - AJAX scroll pagination */
            /*
             * Attention: Strange IE BUG - var must not be the same as
             * the ID !
             */
             sattable = $('#satellitestable').dataTable({
                processing: true, // SHow
                serverSide: true,
                paging: true,
                lengthChange: false,
                searching: true,
                ordering: true,
                order: [
                    [1, 'asc']
                ],
                info: true,
                autoWidth: false, // needs to be true to respect sWidth
                pagingType: "scrolling",
                scroller: {
                    displayBuffer: 9
                },
                jQueryUI: true,
                pageLength: 50,
                scrollCollapse: false,
                scrollY: "550px",
                deferRender: false,
                dom: '<lr>t<"F"i>',

                language: {
                        "zeroRecords": "No matching records found ",
                        "infoPostFix": " (scroll for more results)",

                        "processing": "<img src='" + pageroot + "img/ajax-loader.gif'/>",
                        "infoEmpty": "No matching records found ",
                        // "sInfo": "<div
                        // id='dateslider'>Dateslider</div>",
                        "infoFiltered": " - filtered from a total of<strong> _MAX_ </strong>records"
                },
                scroller: {
                        displayBuffer: 6
                },
                ajax: function (data, callback, settings) {
                    $.ajax(
                        {
                        url: pageroot + "satellites",
                        type: "GET",
                        data: {
                            "launch" : getLaunchDate(),
                            "eol" : getEolDate(),
                            "orbits" : getOrbits(),
                            "spaceagencies" : getSpaceAgencies(),
                            "showcurrent" : $('#current').is(':checked'),
                            "iDisplayStart": (data.start),
                            "iDisplayLength" : 50,
                            "iSortCol_0": data.order[0].column,
                            "sSortDir_0": data.order[0].dir,
                            'draw': data.draw
                        },
                        dataType: "json"
                    }).done(function(response) {
                        console.log(response.aaData);
                        setTimeout( function () {
                             callback(
                              {
                                  draw: response.draw,
                                  data: response.aaData,
                                  recordsTotal: response.iTotalRecords,
                                  recordsFiltered: response.iTotalDisplayRecords
                              }
                          );
                         }, 100);
                    })
                },
                columns: [
                        null, // id
                        null, // acronym
                        null, // launch
                        null, // EOL
                        null, // programme
                        null, // agency
                        null, // orbit
                        null, // altitude
                        {     // longitude
                            "sType": "numeric"
                        },
                        null, // ECT
                        null, // Status
                        null, // payload
                        {
                            "bSortable": true,
                            "sWidth": "200px"
                        }

                    ]
            });

            /* Frequency table - AJAX */
            frequtable1 = $('#satellitefrequencytable-1')
                .dataTable({
                    processing: true, // SHow
                    serverSide: true, // sorting is done on the server
                    paging: true,
                    lengthChange: false,
                    searching: false,
                    ordering: true,
                    responsive: true,
                    order: [  // Initial sort on id
                        [1, 'asc']
                    ],
                    info: true,
                    autoWidth: false,
                    //stateSave: false,

                    pagingType: "scrolling",
                    scroller: {
                        displayBuffer: 3
                    },
                    //renderer: "bootstrap",
                    jQueryUI: true,
                    pageLength: 50,
                    scrollCollapse: false,
                    scrollY: "550px",
                    deferRender: false,
                    dom: '<lf<t>i>', // see http://datatables.net/ref
                    ajax: function (data, callback, settings) {
                    $.ajax(
                        {
                            url: pageroot + "satellitefrequencies",
                            type: "GET",
                            data: {
                                "launch" : getLaunchDate(1),
                                "eol" : getEolDate(1),
                                "spaceagencies" : $('#Agency-1 option:selected').text(),
                                "service" : $("#Service-1 option:selected").text(),
                                "minfrequency" : getMinFrequency(1),
                                "maxfrequency"   : getMaxFrequency(1),
                                "direction" : getDirectionNames(1),
                                "showcurrent" : $('#current').is(':checked'),
                                "iDisplayStart": (data.start),
                                "iDisplayLength" : 50,
                                "iSortCol_0": data.order[0].column,
                                "sSortDir_0": data.order[0].dir,
                                'draw': data.draw,
                                'frequencytype_id' : 1
                            },
                            dataType: "json"
                        }).done(function(response) {
                            console.log(response);
                        //$('.dataTables_paginate').hide();
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
                    columns: [
                        {"width":65},  // id
                        null,           // satellite
                        null,           // main agency
                        {"width":75},           // launch
                        {"width":75},           // EOL
                        null,           // Service
                        {"width":60},           // Direction or sensing mode
                        null,           // Frequency
                        {"type": "title"},  // Emission designator
                        {"type": "natural"}, // Bandwidth
                        {"type": "natural" , "class" : "center" }, // Polarisation
                        {"type": "natural"}, // D/A
                        {"type": "natural"}, // Data rate or base band
                        {"type": "natural"}  // Comments
                    ],
                    language: {
                        zeroRecords: "No matching records found ",
                        // "sInfoPostFix":" (scroll for more results)" ,
                        processing: "<img src='" + pageroot + "img/ajax-loader.gif'/>",
                        infoEmpty: "No matching records found ",
                        infoFiltered: " - filtered from _MAX_ records"
                    }
                });

            // Frequency 2
            frequtable2 = $('#satellitefrequencytable-2')
                .dataTable({
                    processing: true, // SHow
                    serverSide: true, // sorting is done on the server
                    paging: true,
                    lengthChange: false,
                    searching: false,
                    ordering: true,
                    order: [  // Initial sort on id
                        [1, 'asc']
                    ],
                    responsive: true,
                    info: true,
                    autoWidth: false,
                    //stateSave: false,

                    pagingType: "scrolling",
                    scroller: {
                        displayBuffer: 3
                    },
                    //renderer: "bootstrap",
                    jQueryUI: true,
                    pageLength: 50,
                    scrollCollapse: false,
                    scrollY: "550px",
                    deferRender: false,
                    dom: '<lf<t>i>', // see http://datatables.net/ref
                    ajax: function (data, callback, settings) {
                    $.ajax(
                        {
                            url: pageroot + "satellitefrequencies",
                            type: "GET",
                            data: {
                                "launch" : getLaunchDate(2),
                                "eol" : getEolDate(2),
                                "spaceagencies" : $('#Agency-2 option:selected').text(),
                                "service" : $("#Service-2 option:selected").text(),
                                "minfrequency" : getMinFrequency(2),
                                "maxfrequency" : getMaxFrequency(2),
                                "direction" : getDirectionNames(2),
                                "showcurrent" : $('#current').is(':checked'),
                                "iDisplayStart": (data.start),
                                "iDisplayLength" : 50,
                                "iSortCol_0": data.order[0].column,
                                "sSortDir_0": data.order[0].dir,
                                'draw': data.draw,
                                'frequencytype_id' : 2
                            },
                            dataType: "json"
                        }).done(function(response) {
                        //$('.dataTables_paginate').hide();
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
                    columns: [
                        {"width":65},  // id
                        null,           // satellite
                        null,           // main agency
                        {"width":75},           // launch
                        {"width":75},           // EOL
                        null,           // Service
                        null,           // Direction or sensing mode
                        null,           // Frequency
                         //{"type": "title"},  // Emission designator
                        {"type": "natural"}, // Bandwidth
                        {"type": "natural" , "class" : "center" }, // Polarisation
                        //{"type": "natural"}, // D/A
                        //{"type": "natural"}, // Data rate or base band
                        {"type": "natural", "width" : 200}  // Comments
                    ],
                    language: {
                        zeroRecords: "No matching records found ",
                        // "sInfoPostFix":" (scroll for more results)" ,
                        processing: "<img src='" + pageroot + "img/ajax-loader.gif'/>",
                        infoEmpty: "No matching records found ",
                        infoFiltered: " - filtered from _MAX_ records"
                    }
                });

            // Frequency 3
            frequtable3 = $('#satellitefrequencytable-3')
                .dataTable({
                    processing: true, // SHow
                    serverSide: true, // sorting is done on the server
                    paging: true,
                    lengthChange: false,
                    searching: false,
                    ordering: true,
                    order: [  // Initial sort on id
                        [1, 'asc']
                    ],
                    info: true,
                    autoWidth: false,
                    //stateSave: false,

                    pagingType: "scrolling",
                    scroller: {
                        displayBuffer: 3
                    },
                    //renderer: "bootstrap",
                    responsive: true,
                    jQueryUI: true,
                    pageLength: 50,
                    scrollCollapse: false,
                    scrollY: "550px",
                    deferRender: false,
                    dom: '<lf<t>i>', // see http://datatables.net/ref
                    ajax: function (data, callback, settings) {
                    $.ajax(
                        {
                            url: pageroot + "satellitefrequencies",
                            type: "GET",
                            data: {
                                "launch" : getLaunchDate(3),
                                "eol" : getEolDate(3),
                                "spaceagencies" : $('#Agency-3 option:selected').text(),
                                "service" : $("#Service-3 option:selected").text(),
                                "minfrequency" : getMinFrequency(3),
                                "maxfrequency" : getMaxFrequency(3),
                                "direction" : getDirectionNames(3),
                                "showcurrent" : $('#current').is(':checked'),
                                "iDisplayStart": (data.start),
                                "iDisplayLength" : 50,
                                "iSortCol_0": data.order[0].column,
                                "sSortDir_0": data.order[0].dir,
                                'draw': data.draw,
                                'frequencytype_id' : 3
                            },
                            dataType: "json"
                        }).done(function(response) {
                            console.log(response);
                        //$('.dataTables_paginate').hide();
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
                    columns: [
                        {"width":65},  // id
                        null,           // satellite
                        null,           // main agency
                        {"width":75},           // launch
                        {"width":75},           // EOL
                        null,           // Service
                        null,           // Direction or sensing mode
                        null,           // Frequency
                         //{"type": "title"},  // Emission designator
                        {"type": "natural"}, // Bandwidth
                        {"type": "natural" , "class" : "center" }, // Polarisation
                        {"type": "natural"}, // D/A
                        {"type": "natural"}, // Data rate or base band
                        {"type": "natural"}  // Comments
                    ],
                    language: {
                        zeroRecords: "No matching records found ",
                        // "sInfoPostFix":" (scroll for more results)" ,
                        processing: "<img src='" + pageroot + "img/ajax-loader.gif'/>",
                        infoEmpty: "No matching records found ",
                        infoFiltered: " - filtered from _MAX_ records"
                    }
                });

            /* Agency Table - NO AJAX */
            /*
             * Attention: Strange IE BUG - var must not be the same as
             * the ID !
             */
            agtable = $('#spaceagenciestable').dataTable({
                processing: false, // SHow
                serverSide: false, // sorting is done on the server
                paging: false,
                lengthChange: false,
                searching: true,
                ordering: true,
                order: [  // Initial sort on id
                    [1, 'asc']
                ],
                info: true,
                autoWidth: false,
                jQueryUI: true,
                pageLength: 30,
                scrollCollapse: false,
                scrollY: "550px",
                deferRender: false,
                 "dom": '<lrf>t<"F"i>', // see http://datatables.net/ref

                columns: [null, null, null, null, null, {
                    "bSortable": false
                }],

                language: {
                    zeroRecords: "No matching records found ",
                    search: "Generic Filter on all data",

                    infoEmpty: "No matching records found ",
                    // "sInfo": "<div id='dateslider'>Dateslider</div>",
                    infoFiltered: " - filtered from _MAX_ records"
                },

            });

            /*
             * Gap Analysis Table - used on Capability review pages
             *
             * The Variable-Gapanalysis has its own initalization, as it
             * need to be loaded via ajax
             *
             */

            gapanalysistable = $('#missions-gapanalysisas')
                .dataTable({
                    "bJQueryUI": false,
                    //"bPaginate": false,
                    // "sPaginationType": "full_numbers",
                    // hide the second (CGMS) column; it contains the progclassification id
                    "aoColumns": [null, {
                            "bVisible": false
                        },
                        null, null, null, {
                            "sType": "title"
                        },

                        null, null, null, null, null, null,
                        null, null, null, null, null,
                        null, null, null, null, null,
                        null, null, null, null, null

                    ],

                    "iDisplayLength": 600,
                    "oLanguage": {
                        "sZeroRecords": "No matching records found ",
                        "sSearch": "<acronym style='vertical-align:middle;' title='Filter table by satellite programme, or by space agency'>Filter:</acronym>",

                        "sInfoEmpty": "No matching records found ",
                        // "sInfo": "<div

                        "sInfoFiltered": " - filtered from _MAX_ records"
                    },

                    "sDom": 't', // to inject various
                    // elements to the
                    // dom
                    "bFilter": true,
                    "bSort": true,
                    "bInfo": false,
                    "aaSorting": [
                        [5, "asc"]
                    ], // Initial sort on orbit
                     "bStateSave": false
                });


            /*---------------------------------------------------------------------*/
            // Specific filter functions for the Programmes table

            // Confirming changes in the satellite filter
            $('#update-satelliteprogrammes')
                .click(
                    function () {

                        // Update Filter text span on index page
                        var msg = "<strong>Active Filter: " + "Date range: </strong><i>" + getDateRange() + "</i><strong>  | Space Agencies:</strong><i>" + getSpaceAgencyNames() + "</i>";

                        $('.filter_message').html(msg);

                        $('#ExportLaunch').val(
                            $('#min-year').text());
                        $('#ExportEol').val(
                            $('#max-year').text());
                        $('#ExportShowcurrent').val(
                            $('#current').is(':checked'));
                        $('#ExportAgencies').val(
                            getSpaceAgencies());

                        $('#ExportMessage').val(msg);

                        $('.filter_body').hide(); // close filter
                        $('.filter_message ').parent()
                            .removeClass('hide');

                        //progtable.destroy();
                        progtable.fnDraw();
                    });

            /*---------------------------------------------------------*/
            // Specific Filter Functions for SATELLITE index page
            // Confirming changes in the satellite filter
            $('#update-satellites')
                .click(
                    function () {

                        // Update Filter text span on index page
                        var msg = "<strong>Active Filter: " + "Date range: </strong><i>" + getDateRange() + "</i><strong> | Orbits: </strong><i>" + getOrbitNames() + "</i><strong>  | Space Agencies:</strong><i>" + getSpaceAgencyNames() + "</i>";

                        $('.filter_message ').html(msg);
                        $('#exportlaunch').val(getLaunchDate());
                        $('#exporteol').val(getEolDate());
                        $('#exportshowcurrent').val(
                            $('#current').is(':checked'));
                        $('#exportspaceagencies').val(
                            getSpaceAgencies());
                        $('#exportorbits').val(getOrbits());

                        $('#exportmessage').val(msg);

                        $('.filter_body').hide(); // close filter
                        $('.filter_message ').parent()
                            .removeClass('hide');

                        sattable.fnDraw();
                    });


            /*---------------------------------------------------------*/
            // Specific Filter Functions for FREQUENCIES index page
            // Confirming changes in the satellite filter

            function updateFrequencies() {
                alert('a')
            }

            $('#update-frequencies-3')
                .click(
                    function () {
                        var category = 3
                        if (!validateMinMaxFrequency(category)) {
                            return false;
                        }
                        // Update Filter text on index page
                        var parts = [];
                        parts.push(["Date range", getDateRange(category)]);
                        parts.push(["Frequency range", getMinFrequency(category) + " MHz - " + (getMaxFrequency(category)<Number.MAX_VALUE?getMaxFrequency(category) + " MHz":"")]);
                        parts.push(["Direction(s)", getDirectionNames(category)]);
                        parts.push(["Space agency", $.trim($('#Agency-'+category+' option:selected').text())]);
                        parts.push(["Service", $("#Service-"+category+" option:selected").text()]);
                        parts.push(["frequencytype_id", category]);

                        var filter = [];
                        for (var i=0; i<parts.length; i++) {
                            var label = parts[i][0];
                            var text = parts[i][1];
                            if (text.length>0) {
                                filter.push("<strong>" + label + ": </strong><i>" + text + "</i>");
                            }
                        }

                        $('#filter_message-'+category).html(filter.join(" | "));

                        // Population the form fields of the export button
                        $('#exportlaunch-'+category).val(getLaunchDate(category));
                        $('#exporteol-'+category).val(getEolDate(category));
                        $('#exportminfrequency-'+category).val(getMinFrequency(category));
                        $('#exportmaxfrequency-'+category).val(getMaxFrequency(category));
                        $('#exportdirection-'+category).val(getDirectionNames(category));
                        $('#exportshowcurrent+'+category).val($('#current-'+category).is(':checked'));
                        $('#exportspaceagencies-'+category).val($('#Agency-'+category+' option:selected').text());

                        // $('#ExportMessage').val(msg);

                        $('#filter_body-'+category).hide(); // close filter
                        $('#filter_message-'+category).parent().removeClass('hide');
                        frequtable3.fnDraw();
                    });

            $('#update-frequencies-2')
                .click(
                    function () {
                        var category = 2
                        if (!validateMinMaxFrequency(category)) {
                            return false;
                        }
                        // Update Filter text on index page
                        var parts = [];
                        parts.push(["Date range", getDateRange(category)]);
                        parts.push(["Frequency range", getMinFrequency(category) + " MHz - " + (getMaxFrequency(category)<Number.MAX_VALUE?getMaxFrequency(category) + " MHz":"")]);
                        parts.push(["Direction(s)", getDirectionNames(category)]);
                        parts.push(["Space agency", $.trim($('#Agency-'+category+' option:selected').text())]);
                        parts.push(["Service", $("#Service-"+category+" option:selected").text()]);
                        parts.push(["frequencytype_id", category]);

                        var filter = [];
                        for (var i=0; i<parts.length; i++) {
                            var label = parts[i][0];
                            var text = parts[i][1];
                            if (text.length>0) {
                                filter.push("<strong>" + label + ": </strong><i>" + text + "</i>");
                            }
                        }

                        $('#filter_message-'+category).html(filter.join(" | "));

                        // Population the form fields of the export button
                        $('#exportlaunch-'+category).val(getLaunchDate(category));
                        $('#exporteol-'+category).val(getEolDate(category));
                        $('#exportminfrequency-'+category).val(getMinFrequency(category));
                        $('#exportmaxfrequency-'+category).val(getMaxFrequency(category));
                        $('#exportdirection-'+category).val(getDirectionNames(category));
                        $('#exportshowcurrent+'+category).val($('#current-'+category).is(':checked'));
                        $('#exportspaceagencies-'+category).val($('#Agency-'+category+' option:selected').text());

                        // $('#ExportMessage').val(msg);

                        $('#filter_body-'+category).hide(); // close filter
                        $('#filter_message-'+category).parent().removeClass('hide');
                        if (category == 1) {
                            frequtable1.fnDraw()
                        } else if (category == 2) {
                            frequtable2.fnDraw()
                        }
    //frequtable.clear().draw(); // Here we refresh the datatable
                    });
            $('#update-frequencies-1')
                .click(
                    function () {
                        var category = 1
                        if (!validateMinMaxFrequency(category)) {
                            return false;
                        }
                        // Update Filter text on index page
                        var parts = [];
                        parts.push(["Date range", getDateRange(1)]);
                        parts.push(["Frequency range", getMinFrequency(1) + " MHz - " + (getMaxFrequency()<Number.MAX_VALUE?getMaxFrequency() + " MHz":"")]);
                        parts.push(["Direction(s)", getDirectionNames(1)]);
                        parts.push(["Space agency", $.trim($('#Agency-1 option:selected').text())]);
                        parts.push(["Service", $("#Service-1 option:selected").text()]);
                        parts.push(["frequencytype_id", 1]);

                        var filter = [];
                        for (var i=0; i<parts.length; i++) {
                            var label = parts[i][0];
                            var text = parts[i][1];
                            if (text.length>0) {
                                filter.push("<strong>" + label + ": </strong><i>" + text + "</i>");
                            }
                        }

                        $('#filter_message-'+1).html(filter.join(" | "));

                        // Population the form fields of the export button
                        $('#exportlaunch-'+category).val(getLaunchDate(1));
                        $('#exporteol-'+category).val(getEolDate(1));
                        $('#exportminfrequency-'+category).val(getMinFrequency(1));
                        $('#exportmaxfrequency-'+category).val(getMaxFrequency(1));
                        $('#exportdirection-'+category).val(getDirectionNames(1));
                        $('#exportshowcurrent+'+category).val($('#current-1').is(':checked'));
                        $('#exportspaceagencies-'+category).val($('#Agency-1 option:selected').text());

                        // $('#ExportMessage').val(msg);

                        $('#filter_body-'+category).hide(); // close filter
                        $('#filter_message-'+category).parent().removeClass('hide');
                        frequtable1.fnDraw()
                        //frequtable.clear().draw(); // Here we refresh the datatable
                    });

            /* General methods used on multiple pages */

            // Toggle dateslider when only current sat/prog/insts are
            // selected
            $("#current-1").change(function () {

                if ($("#current-1").is(':checked')) {
                    $("#dateslider-box-1").hide();
                } else {
                    $("#dateslider-box-1").show();
                }
            });

            $("#current-2").change(function () {

                if ($("#current-2").is(':checked')) {
                    $("#dateslider-box-2").hide();
                } else {
                    $("#dateslider-box-2").show();
                }
            });

            $("#current-3").change(function () {

                if ($("#current-3").is(':checked')) {
                    $("#dateslider-box-3").hide();
                } else {
                    $("#dateslider-box-3").show();
                }
            });

            $("#dateslider-1").slider({
                range: true,
                min:1960,
                max: 2080,
                values: [1960, 2060],
                slide: function( event, ui ) {
                    $("#min-year-1").text(ui.values[0]);
                    $("#max-year-1").text(ui.values[1]);
                }

            });

            $("#dateslider-2").slider({
                range: true,
                min:1960,
                max: 2080,
                values: [1960, 2060],
                slide: function( event, ui ) {
                    $("#min-year-2").text(ui.values[0]);
                    $("#max-year-2").text(ui.values[1]);
                }

            });

            $("#dateslider-3").slider({
                range: true,
                min:1960,
                max: 2080,
                values: [1960, 2060],
                slide: function( event, ui ) {
                    $("#min-year-3").text(ui.values[0]);
                    $("#max-year-3").text(ui.values[1]);
                }

            });

            $("#current").change(function () {

                if ($("#current").is(':checked')) {
                    $("#dateslider-box").hide();
                } else {
                    $("#dateslider-box").show();
                }
            });

            /* Dateslider is used on Prog/Sat/Inst tables */
            $("#dateslider").slider({
                range: true,
                min:1960,
                max: 2080,
                values: [1960, 2060],
                slide: function( event, ui ) {
                    $("#min-year").text(ui.values[0]);
                    $("#max-year").text(ui.values[1]);
                }

            });

            /*
             * Frequencyslider is used on Satellitefrequency table Type:
             * Range Slider
             */
           function calculateFreq(x)
           {
                // the displayed value is determined based on Jerome's formula
                    // Y(x) = A + (p * (B-A) * x)/N + (1-p) * (B-A) * (Power(10,k*x/N)-1)/(Power(10,k)-1)
                    //
                    // where
                    // N: number of steps (e.g. bounds.max from above)
                    // A: start value
                    // B: end value
                    // p: linearity factor (0<p<=1, where 0 = exponential curve, 1 = linear curve)
                    // k: exponential factor  (preferably between 3 and 10)
                    //
                    // additionally we have
                    // r: resolution  (round the result to the nearest multiple of r)
                    var N = 360; // make sure that this is equal to bounds.max above
                    var A = 0;
                    var B = 1000000;
                    var p = 0.03;
                    var k = 2.6;
                    var r = 5;

                    var result = A;
                    result += (p * (B - A) * x)/N;
                    result += (1-p) * (B - A) * (Math.pow(10, k*x/N)-1) / (Math.pow(10, k)-1);

                    // round result to r Mhz
                    result = r * Math.round(result / r);

                    if (result == B) {
                        return "No upper bound";
                    }

                    return result + " MHz";
           }
           function calculateFreqNew(x)
           {
                if (x < 1000) {
                    console.log((x*1000));
                    return (x*1000) + " Mhz";
                } else {
                    console.log(((x-999) *1000000));
                    var y = ((x-999) *1000000)
                    return y + " Mhz";
                }
           }
           function calculateAndShowFreqNew(mode,x,category)
           {
            
            var category = (category != undefined) ? '-'+category : '';

                var value = '';
                var unit = '';
                if (x < 1000) {
                    value = (x*1000);
                    unit = "Mhz";
                } else {
                    var y = ((x-999) *1000000)
                    value = (x-999);
                    unit = "Thz";
                }
                if (mode == 'min') {
                    $("#min-freq-box"+category).val(value);
                    $("#show-min-freq"+category).text(unit);
                } else {
                    $("#max-freq-box"+category).val(value);
                    $("#show-max-freq"+category).text(unit);
                }
           }
           function setFrequecySlider(mode, value,category)
           {
                var category = (category != undefined) ? '-'+category : '';
                var minValue = 0;
                var maxValue = 0;

                if ($("#show-min-freq"+category).text() == 'Thz') {
                    minValue = (parseInt($('#min-freq-box'+category).val()) + 999);
                } else {
                    minValue = $('#min-freq-box'+category).val();
                    if (minValue > 1000000) {
                        minValue = minValue-1000;
                        $('#min-freq-box'+category).val(minValue/1000);
                    }
                    minValue = $('#min-freq-box'+category).val()/1000;
                }

                if ($('#max-freq-box'+category).val() == 0) {
                    maxValue = 2000;
                    $('#max-freq-box'+category).val(1000);
                    $("#show-max-freq"+category).text('Thz'); 
                }

                if ($("#show-max-freq").text() == 'Thz') {
                    maxValue = (parseInt($('#max-freq-box'+category).val()) + 999);
                } else {
                    maxValue = $('#max-freq-box'+category).val();
                    if (maxValue > 1000000) {
                        maxValue = maxValue-1000;
                        $('#min-freq-box'+category).val(maxValue/1000);
                    }
                    maxValue = $('#max-freq-box'+category).val()/1000;
                }

                $("#min-freq"+category).text(calculateFreqNew(minValue));
                $("#max-freq"+category).text(calculateFreqNew(maxValue));
                $("#frequencyslider"+category).slider('values',[minValue,maxValue]);
           }

           $("#frequencyslider-1").slider({
                range: true,
                min: 0,
                max: 1999,
                values: [0, 1999],
                slide: function( event, ui ) {

                    $("#min-freq-1").text(calculateFreqNew(ui.values[0]));
                    $("#max-freq-1").text(calculateFreqNew(ui.values[1]));
                    calculateAndShowFreqNew('min',ui.values[0],1);
                    calculateAndShowFreqNew('max',ui.values[1],1);
                    /*$("#show-min-freq").text(calculateAndShowFreqNew('min',ui.values[0]));
                    $("#show-max-freq").text(calculateAndShowFreqNew('max',ui.values[1]));*/
                }
            });

           $("#frequencyslider-2").slider({
                range: true,
                min: 0,
                max: 1999,
                values: [0, 1999],
                slide: function( event, ui ) {

                    $("#min-freq-2").text(calculateFreqNew(ui.values[0]));
                    $("#max-freq-2").text(calculateFreqNew(ui.values[1]));
                    calculateAndShowFreqNew('min',ui.values[0],2);
                    calculateAndShowFreqNew('max',ui.values[1],2);
                    /*$("#show-min-freq").text(calculateAndShowFreqNew('min',ui.values[0]));
                    $("#show-max-freq").text(calculateAndShowFreqNew('max',ui.values[1]));*/
                }
            });
            $("#frequencyslider-3").slider({
                range: true,
                min: 0,
                max: 1999,
                values: [0, 1999],
                slide: function( event, ui ) {

                    $("#min-freq-3").text(calculateFreqNew(ui.values[0]));
                    $("#max-freq-3").text(calculateFreqNew(ui.values[1]));
                    calculateAndShowFreqNew('min',ui.values[0],3);
                    calculateAndShowFreqNew('max',ui.values[1],3);
                    /*$("#show-min-freq").text(calculateAndShowFreqNew('min',ui.values[0]));
                    $("#show-max-freq").text(calculateAndShowFreqNew('max',ui.values[1]));*/
                }
            });

            $("#frequencyslider").slider({
                range: true,
                min: 0,
                max: 1999,
                values: [0, 1999],
                slide: function( event, ui ) {

                    $("#min-freq").text(calculateFreqNew(ui.values[0]));
                    $("#max-freq").text(calculateFreqNew(ui.values[1]));
                    calculateAndShowFreqNew('min',ui.values[0]);
                    calculateAndShowFreqNew('max',ui.values[1]);
                    /*$("#show-min-freq").text(calculateAndShowFreqNew('min',ui.values[0]));
                    $("#show-max-freq").text(calculateAndShowFreqNew('max',ui.values[1]));*/
                }
            });
            function validateMinMaxFrequency(category)
            {
                var notError = true;
                var category = (category != undefined) ? '-'+category : '';

                if ($('#min-freq-box'+category).val() < 0 || $('#max-freq-box'+category).val() < 0) {
                
                    notError = false;
                    $('#frequencyMsg'+category).text('Please enter positive values only');
                } else if (isNaN($('#min-freq-box'+category).val()) || isNaN($('#max-freq-box'+category).val())) {
                    notError = false;
                    $('#frequencyMsg'+category).text('Please enter positive numeric values only');
                } else {
                    $('#frequencyMsg'+category).text('');
                }
                return notError;
            }
            $('#max-freq-box-1').on('blur',function() {

                if (!validateMinMaxFrequency()) {
                    return false;
                }
                var currentValue = $(this).val();
                if(!currentValue) {
                    $(this).val(0);
                    return false;
                }
                if ($('#show-max-freq-1').text() != 'Thz' && currentValue >= 1000000) {
                    
                    $('#show-max-freq-1').text("Thz");
                    $(this).val(Math.round(currentValue/1000000));
                    
                }
                if ($('#show-max-freq-1').text() == 'Thz' && currentValue == 0) {
                    currentValue = 2000;
                    $(this).val('1000');
                }
               setFrequecySlider('max', currentValue, 1); 
            });
            
            $('#min-freq-box-1').on('blur',function() {
                if (!validateMinMaxFrequency()) {
                    return false;
                }
                var currentValue = $(this).val();
                if(!currentValue) {
                    $(this).val(0);
                    return false;
                }

                if ($('#show-min-freq-1').text() == 'Mhz' && currentValue >= 1000000) {
                    $('#show-min-freq-1').text("Thz");
                    $(this).val(Math.round(currentValue/1000000));
                    
                }
                if ($('#show-min-freq-1').text() == 'Thz' && currentValue == 0) {
                    $('#show-min-freq-1').text('Mhz');
                    $(this).val('0');
                }

               setFrequecySlider('min',currentValue, 1); 
            });

        }); // End document ready function

/*--------------------------------------------------------------------------------------*/
// Oder private Helper functions

/**
 * Get YYYY digits from timeslider and convert to full date YYYY-MM-DD If no
 * value available == initial load of datatable
 */

function getLaunchDate(category) {
    var category = (category != undefined) ? '-'+category : '';
    if ($('#min-year'+category).text() != "")
        return $('#min-year'+category).text() + '-01-01';
    else
        return "";
}

/**
 * Get YYYY digits from timeslider and convert to full date YYYY-MM-DD If no
 * value available == initial load of datatable
 */

function getEolDate(category) {
    var category = (category != undefined) ? '-'+category : '';
    if ($('#max-year'+category).text() != "")
        return $('#max-year'+category).text() + '-12-31';
    else
        return "";
}

/**
 * Convenience function to return the correct text for display in the filter
 * message
 */

function getDateRange(category) {
    var category = (category != undefined) ? '-'+category : '';
    if ($('#current'+category).is(':checked')) {
        return ('Only currently operational');
    } else
        return ($('#min-year'+category).text() + "-" + $('#max-year'+category).text());
}

/**
 * Get numerical format of min frequenc
 *
 */

function getMinFrequency(category) {
    var category = (category != undefined) ? '-'+category : '';
    var freq = $('#min-freq'+category).text();
    return freq.substr(0, freq.length - 4); // trim Mhz
}

/**
 * Get numerical format of max frequency
 *
 */

function getMaxFrequency(category) {
    var category = (category != undefined) ? '-'+category : '';
    var freq = $('#max-freq'+category).text();
    if (freq.match("[0-9]+.*") || freq.length == 0) {
        return freq.substr(0, freq.length - 4); // trim Mhz
    }
    return Number.MAX_VALUE;
}

/**
 * Function to get all selected orbit ids for the satellite index page Used by
 * datatable
 *
 */

function getOrbits() {
    var selected = [];
    $('#selectedorbits input[type="checkbox"]:checked').each(function () {
        selected.push(this.value);
    });
    return (selected.join(','));
}

/**
 * Modified function to get all selected orbit names to display as a filter
 * message
 *
 *
 */

function getOrbitNames() {
    var selected = [];
    $('#selectedorbits input[type="checkbox"]:checked').each(function () {
        selected.push(" " + $(this).next().text());
    });
    if (selected.length === 0)
        return 'all';
    else
        return (selected);
}


/**
 * Get spaceagency names as entered in the getSpaceAgencyNames
 *
 */

function getSpaceAgencyNames() {
    var str = $('#filter-agencies').val();
    if (str) {
        // bit complicated procedure to sanitize output as there is no native
        // htmlspecialchars or similar
        return $('<span>').text(str).html();
    } else
        return "all";
}

/**
 * Get Spaceagencies as string, remove last comma if necessary
 *
 */

function getSpaceAgencies() {
    var data = ($('#filter-agencies').val());
    if (data) {
        data = trim(data);
        // Removing trailing comma, as this would cause an error
        if ((data.substring(data.length - 1)) == ',') {
            return data.substring(0, data.length - 1);
        }
        return data;
    } else
        return "";
}

/**
 * Get the directions on the Satellitefrequency page e.g. S-E, E-S, S-S
 */

function getDirectionNames(category) {
    var category = (category != undefined) ? '-'+category : '';
    var selected = [];
    $('#selecteddirections'+category+' input[type="checkbox"]:checked').each(function () {
        selected.push($(this).val());
    });
    return (selected.join(','));

}

/**
 * Function to apply data latency in all 
 * satellite payload in satellite edit page
 */
function applyDataLatency(thisObj)
{
    $.each($('.data-latency'), function (key, field) {
        var value = $(thisObj).val(); 
        var isnum = /^\d+$/.test(value);
        if (isnum && !isNaN($(thisObj).val()) && $(thisObj).val() >= 0 && $(thisObj).val() % 1 == 0 && $(thisObj).val() <= 999) {
            $(field).val($(thisObj).val());
        }

        // Set black for empty value
        if (!value) {
            $(field).val('')
        }
    });
}

function toggleBox(num) {
    
    $('#box-'+num).toggleClass('show hide');
    $('#right-'+num).toggleClass('show hide');
    $('#left-'+num).toggleClass('show hide');
    $('#icon-'+num).toggleClass('ui-icon-triangle-1-e ui-icon-triangle-1-s');
    if ($('#box-'+num).hasClass('show')) {
        setTimeout(function(){
            var dt = eval('frequtable'+num);
            dt._fnReDraw();
        },500);
    }

}

function closeFilterBox(category) {
    $('#filter_body-'+category).hide(); // close filter
}
