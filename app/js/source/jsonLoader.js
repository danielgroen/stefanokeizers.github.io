jQuery(function ($) {
	$.getJSON( "data/data.json", function( data ) {
		// var titles = [];
		var performance = [];
		var triggerOnce = true;

		// speeldata
		$.each( data.speeldata, function( index, val ) {
			if (val.kaarten) {
				var tickets = '<a href="' + val.kaarten + '">Bestel kaarten</a>';
			} else {
				var tickets = 'uitverkocht';
			}

			if (Object.keys(val).length == 4) {
				
				if(triggerOnce == true ) {
					triggerOnce = false;
					var object = data.speeldata[0];
					performance.push( "<tr><th>" + Object.keys(object)[0] + "</th><th>" + Object.keys(object)[1] + "</th><th>" + Object.keys(object)[2] + "</th><th>" + Object.keys(object)[3] + "<th></tr>" );
				}
			}
			performance.push( "<tr><td>" + val.datum + "</td><td>" + val.plaats + "</td><td>" + val.theater + "</td><td>" + tickets + "</td></tr>" );
		});

		$( "<table/>", {
			"class": "data",
			html: performance.join( "" )
		}).appendTo( "#speeldata .inner" );
	});

		// kaartjes

});