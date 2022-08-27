/**
 * Custom Sort mechanism, takes into account mixed text/number strings
 * Has to be called as "sType": "natural" in db-behaviours.js file
 */

jQuery.fn.dataTableExt.oSort['natural-asc']  = function(a,b) {
	return naturalSort(a,b);
};

jQuery.fn.dataTableExt.oSort['natural-desc'] = function(a,b) {
	return naturalSort(a,b) * -1;
};

/**
 * Custom Sort that looks into the title attribute of an empty span of the column to sort 
 * Need to give the raw number in the view file
 * Has to be called as "sType": "title" in db-behaviours.js file
 * modified to take NULL values into account
 * 
*/
jQuery.fn.dataTableExt.oSort['title-asc']  = function(a,b) {
	
	if (a.match(/title="*(-?[0-9]+)/) == null){
		var x = 0;
	}
	else {
		var x = parseFloat(a.match(/title="*(-?[0-9]+)/)[1]);
		if (a.includes('desc')) {
			x = x+1;
		}
	}
	if (b.match(/title="*(-?[0-9]+)/) == null){
		var y = 0;
	}
	else{
		var y = parseFloat(b.match(/title="*(-?[0-9]+)/)[1]);
		if (b.includes('desc')) {
			y = y+1;
		}
	}	
	
	return ((x < y) ? -1 : ((x > y) ?  1 : 0));
};

jQuery.fn.dataTableExt.oSort['title-desc'] = function(a,b) {
	if (a.match(/title="*(-?[0-9]+)/) == null){
		var x = 0;
	}
	else {
		var x = parseFloat(a.match(/title="*(-?[0-9]+)/)[1]);
		if (a.includes('desc')) {
			x = x+1;
		}
	}
	if (b.match(/title="*(-?[0-9]+)/) == null){
		var y = 0;
	}
	else{
		var y = parseFloat(b.match(/title="*(-?[0-9]+)/)[1]);
		if (b.includes('desc')) {
			y = y+1;
		}
	}	
	
	/*
	var x = a.match(/title="*(-?[0-9]+)/)[1];
	var y = b.match(/title="*(-?[0-9]+)/)[1];
	x = parseFloat( x );
	y = parseFloat( y );
	*/
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};



/**
*
* Custom Sort to have European Style date format, (dd/mm/YY ) get sorted correctly
* Date format must be exact
* @usage: "sType": "uk_date" 
* 
*
**/
function trim(str) {
	str = str.replace(/^\s+/, '');
	for (var i = str.length - 1; i >= 0; i--) {
		if (/\S/.test(str.charAt(i))) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return str;
}

jQuery.fn.dataTableExt.oSort['custom_date-asc'] = function(a, b) {
	if (trim(a) != '') {
		
		var frDatea2 = a.split('/');
		var x = (frDatea2[2] + frDatea2[1] + frDatea2[0])  * 1;
	} else {
		var x = 10000000000000; // = l'an 1000 ...
	}

	if (trim(b) != '') {
		
		frDateb = b.split('/');
		var y = (frDateb[2] + frDateb[1] + frDateb[0])  * 1;		                
	} else {
		var y = 10000000000000;		                
	}
	var z = ((x < y) ? -1 : ((x > y) ? 1 : 0));
	return z;
};

jQuery.fn.dataTableExt.oSort['custom_date-desc'] = function(a, b) {
	if (trim(a) != '') {
		
		var frDatea2 = a.split('/');
		var x = (frDatea2[2] + frDatea2[1] + frDatea2[0])  * 1;		                
	} else {
		var x = 10000000000000;		                
	}

	if (trim(b) != '') {
		
		frDateb = b.split('/');
		var y = (frDateb[2] + frDateb[1] + frDateb[0])  * 1;		                
	} else {
		var y = 0;		                
	}		            
	var z = ((x < y) ? 1 : ((x > y) ? -1 : 0));		            
	return z;
}; 


/**
 * Natural Sort algorithm for Javascript - Version 0.6 - Released under MIT license
 * @author Jim Palmer (based on chunking idea from Dave Koelle)
 * Contributors: Mike Grier (mgrier.com), Clint Priest, Kyle Adams, guillermo
 */
function naturalSort (a, b) {
	var re = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
		sre = /(^[ ]*|[ ]*$)/g,
		dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
		hre = /^0x[0-9a-f]+$/i,
		ore = /^0/,
		// convert all to strings and trim()
		x = a.toString().replace(sre, '') || '',
		y = b.toString().replace(sre, '') || '',
		// chunk/tokenize
		xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
		yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
		// numeric, hex or date detection
		xD = parseInt(x.match(hre)) || (xN.length != 1 && x.match(dre) && Date.parse(x)),
		yD = parseInt(y.match(hre)) || xD && y.match(dre) && Date.parse(y) || null;
	// first try and sort Hex codes or Dates
	if (yD)
		if ( xD < yD ) return -1;
		else if ( xD > yD )	return 1;
	// natural sorting through split numeric strings and default strings
	for(var cLoc=0, numS=Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
		// find floats not starting with '0', string or 0 if not defined (Clint Priest)
		oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
		oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
		// handle numeric vs string comparison - number < string - (Kyle Adams)
		if (isNaN(oFxNcL) !== isNaN(oFyNcL)) return (isNaN(oFxNcL)) ? 1 : -1; 
		// rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
		else if (typeof oFxNcL !== typeof oFyNcL) {
			oFxNcL += ''; 
			oFyNcL += ''; 
		}
		if (oFxNcL < oFyNcL) return -1;
		if (oFxNcL > oFyNcL) return 1;
	}
	return 0;
}


