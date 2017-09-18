jQuery(function ($) {

		function jsonLoader() {
			return $.getJSON( "data/data.json", function( data ) {
				var cards = [];
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

				// kaartjes
				$.each( data.mediacards, function( index, val ) {
					cards.push( '<div class=' + val.category + '><article class="card"><h4>'+ val.title + '</h4><a href="' + val.link + '">' + val.linkText + '</a><blockquote>' + val.quote +'</blockquote></div>');
				});

				$( "<div/>", {
					"class": "owl-carousel owl-theme",
					html: cards.join( "" )
				}).appendTo( "#media .inner" );
			});
		};

	jsonLoader().done(function() {
		var owl = $('.owl-carousel');
		var mobile = 360;
		var tablet = 768;
		var desktop = 1280;
		var speed = 200;
		var itemsPerSlide = 3;

		owl.owlCarousel({
			margin: 20,
			navText: ["<svg version='1.1' id='arrow-left' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 477.175 477.175' ><path d='M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225 c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z'/></svg>","<svg version='1.1' id='arrow-right' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 477.175 477.175'><path d='M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5 c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z'/></svg>"],
			responsive : {
			    0 : {
					items: 1,
					slideBy: 3,
					nav: false,
					mouseDrag: true,
					stagePadding: 50,
					center: true,
			    },
			    768 : {
					items: 3,
					mouseDrag: false,
					nav: true,
					slideBy: 3,
					stagePadding: 0,
					center: false
			    }
			}
		});

		$('.media-nav a').on('click', function(e) {
			e.preventDefault();
			console.log($(this).parent().index());
			var toIndex = $(this).parent().index() * itemsPerSlide;
			owl.trigger('to.owl.carousel', [toIndex, speed, true]);
		});

		$('.media-category').each(function( index ) {
			var htmlText = $(this).find('a').text().toLowerCase();
			$(this).addClass(htmlText);
		});

		owl.on('changed.owl.carousel', function(event) {
			var index = event.item.index + 1;

			var ClassOfActiveItem =  $('.owl-carousel .owl-item:nth-child(' + index + ') > ').attr('class');
			$('.media-category.active').removeClass('active');
			
			$( '.media-category.' + ClassOfActiveItem ).addClass('active');
		})
	})
});