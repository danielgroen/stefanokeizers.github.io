jQuery(function ($) {

	var owl = $('.owl-carousel');
	
	var mobile = 360;
	var tablet = 768;
	var desktop = 1280;
	var speed = 200;

	var itemsPerSlide = 1;
	$( window ).on('resize load', debounce(function () {
		 if ( $(window).width() >= tablet ) {
			itemsPerSlide = 3;
		}
	}, speed));

	owl.owlCarousel({
		margin: 20,
		responsive : {
		    0 : {
				items: 1,
				slideBy: 3,
				stagePadding: 50,
				center: true
		    },
		    768 : {
				items: 3,
				slideBy: 3,
				stagePadding: 0,
				center: false
		    }
		}
	});

	$('.media-nav a').on('click', function(e) {
		e.preventDefault();
		var toIndex = $(this).parent().index() * itemsPerSlide;
		owl.trigger('to.owl.carousel', [toIndex, speed, true]);
	})

	// Debounce function
  	function debounce(callback, time) {
		var timeout;
		return function() {
		  clearTimeout(timeout);
		  timeout = setTimeout(callback, time);
		};
  	};
});