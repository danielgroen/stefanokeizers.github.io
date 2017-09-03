jQuery(function ($) {

	var owl = $('.owl-carousel');
	
	var mobile = 360;
	var tablet = 768;
	var desktop = 1280;
	var speed = 200;

	var itemsPerSlide = 1;
	// TODO:: onresize en onload
	$( window ).on('resize load', debounce(function () {
		 if ( $(window).width() >= tablet ) {
		 	console.log($(window).width())
			itemsPerSlide = 3;
		}
		console.log(itemsPerSlide, $(window).width());
	}, speed));

	owl.owlCarousel({
		margin: 20,
		responsive : {
		    0 : {
				items: 1,
				slideBy: 1
		    },
		    768 : {
				items: 3,
				slideBy: 3
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