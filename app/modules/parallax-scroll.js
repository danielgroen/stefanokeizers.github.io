var breakpoint = 768;

$.fn.parallax = function(strength, offset) {
	if (this.length != 0) {
		if (!$.isNumeric(offset)) { offset = 0;	}
		if ( $(window).width() > breakpoint  ) {
			if ( this[0].offsetTop < ( $(window).scrollTop() + $(window).height() )) {
	 		   this.css('background-position-y', Math.round( ( $(window).scrollTop() - this[0].offsetTop ) * strength + offset ) +'px');
			}
		} else {
		    this.css('background-position-y', '');
		}
	}
};

$(window).on('scroll load', function() {
	$('.block.hero .inner').parallax(0.2);
	$('.block.media .inner').parallax(0.2);
	$('.block.book .inner').parallax(0.2, -200);
	$('.block.contact .inner').parallax(0.2, -200);
});