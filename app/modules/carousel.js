jQuery(function ($) {

		function jsonLoader() {
			return $.getJSON( "data/data.json", function( data ) {
				var cards = [];
						performance = [];
						triggerOnce = true;

				$.each( data.mediacards, function( index, val ) {
					cards.push( '<div class=' + val.category + '><article class="card"><h4>'+ val.medium + '</h4><a class="title-text" href="' + val.link  + '?utm_source=' +window.location.href +'" target="_blank">' + val.linkText + '</a><blockquote class="quotes">' + val.quote +'</blockquote></div>');
				});

				$( "<div/>", {
					"class": "owl-carousel owl-theme",
					html: cards.join( "" )
				}).appendTo( "#media .inner" );
			});
		};

	jsonLoader().done(function() {
		var owl = $('.owl-carousel');
				mobile = 360;
				tablet = 768;
				desktop = 1280;
				speed = 200;

		owl.owlCarousel({
			margin: 20,
			autoHeight: false,
			navText: ["<svg version='1.1' id='arrow-left' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 477.175 477.175' ><path d='M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225 c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z'/></svg>","<svg version='1.1' id='arrow-right' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 477.175 477.175'><path d='M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5 c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z'/></svg>"],
			responsive : {
			    0 : {
					items: 1,
					slideBy: 3,
					nav: false,
					stagePadding: 50,
					center: true,
			    },
			    768 : {
					items: 2,
					nav: true,
					slideBy: 2,
					stagePadding: 0,
					center: false
			    },
			    1280 : {
					items: 3,
					nav: true,
					slideBy: 3,
					stagePadding: 0,
					center: false
			    }
			}
		});

		$('.media-nav a').on('click', function(e) {
			e.preventDefault();
			var category = $(this).text().toLowerCase();

			var toIndex = $('.owl-stage .' + category).first().parent().index();
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
		});
	})
});