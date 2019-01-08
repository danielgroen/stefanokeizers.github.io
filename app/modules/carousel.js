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
      navText: ["<svg id='arrow-left' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm107.5-8.5l122.8-122.8c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17L234.2 256l91.7 91.7c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L163.5 264.5c-4.7-4.7-4.7-12.3 0-17z'/></svg>",
                "<svg id='arrow-right' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm107.5-8.5l122.8-122.8c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17L234.2 256l91.7 91.7c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L163.5 264.5c-4.7-4.7-4.7-12.3 0-17z'/></svg>"],
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