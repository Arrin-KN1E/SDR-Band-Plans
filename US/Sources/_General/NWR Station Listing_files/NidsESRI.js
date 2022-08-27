(function() {

    window.ESRI = {};
    ESRI.Geocode = {};
    ESRI.Geocode.CreateRequestParameters = function(query, additionalOutFields, maxLocations) {
        var rtn = {
            sourceCountry: 'USA',
            text: query,
            maxLocations: maxLocations || 5,
            f: 'json'
        };

        if (typeof additionalOutFields !== 'undefined' && additionalOutFields !== null && additionalOutFields.length > 0) {
            var fieldsToInclude = ["Score", "Addr_Type"];
            $.each(additionalOutFields, function (i, val){
                if (jQuery.inArray(val, fieldsToInclude) === -1){
                    fieldsToInclude.push(val);
                }
            });
            var additionalFieldsCSV = fieldsToInclude.join(",");
            rtn = $.extend(rtn, {outFields: additionalFieldsCSV});
        }

        return rtn;
    };

    ESRI.Geocode.Find = function(query, additionalFields, maxLocations, callback) {
        var params = ESRI.Geocode.CreateRequestParameters(query, additionalFields, maxLocations);

        for (var re in this.CustomLocations) {
            if (query.toLowerCase().match(new RegExp(re))) {
                callback(this.CustomLocations[re], {success:true});
                return true;
            }
        }

        $.get('http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find/',
            params,
            function(response) {
                if (typeof callback !== 'undefined') {
                    if (response && response.locations && response.locations.length > 0){
                        callback(response, {success:true});
                    }else{
                        callback(null, {success:false});
                    }
                }
            },
            'jsonp'
            ).fail(function(){
                if (typeof callback !== 'undefined'){
                    callback(null, {success:false});
                }
            }
        );
    };

    ESRI.Geocode.CustomLocations = {
       "andover,?\\s*(me|maine)": {
            locations: [
                {
                    name: "Andover, ME",
                    feature: {
                        geometry:{
                            x: -70.7525,
                            y: 44.634167
                        }
                    },
                    custom: true
                }
            ]
       },
        "bear creek,?\\s*(pa|pennsylvania)": {
            locations: [
                {
                    name: "Bear Creek, PA",
                    feature: {
                        geometry:{
                            x: -75.772809,
                            y: 41.204074
                        }
                    },
                    custom: true
                }
            ]
        },
        "welcome,?\\s*(md|maryland)": {
            locations: [
                {
                    name: "Welcome, MD",
                    feature: {
                        geometry:{
                            x: -77.081212,
                            y: 38.4692469
                        }
                    },
                    custom: true
                }
            ]
        },
       "eagle,?\\s*co(lorado)?": {
            locations: [
                {
                    name: "Eagle, CO",
                    feature: {
                        geometry:{
                            x: -106.8272,
                            y: 39.6506
                        }
                    },
                    custom: true
                }
            ]
       },
       "^\\s*32899\\s*$": {
            locations: [
                {
                    name: "32899",
                    feature: {
                        geometry:{
                            x: -80.6774,
                            y: 28.6143
                        }
                    },
                    custom: true
                }
            ]
       },
       "^\\s*97003\\s*$": {
            locations: [
                {
                    name: "97003",
                    feature: {
                        geometry:{
                            x: -122.8752489,
                            y: 45.5050916
                        }
                    },
                    custom: true
                }
            ]
       },
       "^\\s*08736\\s*$": {
            locations: [
                {
                    name: "08736",
                    feature: {
                        geometry:{
                            x: -74.037,
                            y: 40.1128
                        }
                    },
                    custom: true
                }
            ]
       },
       "^(new york( city)?,?\\s*(ny|new york)?|nyc)\\s*$": {
            locations: [
                {
                    name: "New York City, NY",
                    feature: {
                        geometry:{
                            x: -74.0059,
                            y: 40.7142
                        }
                    },
                    custom: true
                }
            ]
       },
       "^boston,?\\s*(ma(ssachusetts)?)?\\s*$": {
            locations: [
                {
                    name: "Boston, MA",
                    feature: {
                        geometry:{
                            x: -71.05977,
                            y: 42.3584
                        }
                    },
                    custom: true
                }
            ]
       },
       "^pinnacles\\s+(nat(iona|'?)l)\\s+(monument|park)\\s*$": {
            locations: [
                {
                    name: "Pinnacles National Park",
                    feature: {
                        geometry:{
                            x: -121.147278,
                            y: 36.47075
                        }
                    },
                    custom: true
                }
            ]
       }
    };

})();

