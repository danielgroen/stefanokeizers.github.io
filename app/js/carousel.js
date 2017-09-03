jQuery(function ($) {

	var owl = $('.owl-carousel');
	
	var mobile = 360;
	var tablet = 768;
	var desktop = 1280;
	var speed = 200;

	var itemsPerSlide = 3;

	owl.owlCarousel({
		margin: 20,
		nav: false,
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
	});

	owl.on('changed.owl.carousel', function(event) {
		var index = $('.owl-dot.active').index() + 1;
		$('.media-category.active').removeClass('active');
		$( '.media-category:nth-child(' + index + ')').addClass('active');
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