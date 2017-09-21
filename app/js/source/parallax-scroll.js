var breakpoint = 768;

$.fn.parallax = function(strength, offset) {
	// offset = this[0].clientHeight / offset * 100 ;
	if (!$.isNumeric(offset)) { offset = 0;	}
	if ( $(window).width() > breakpoint  ) {
		if ( this[0].offsetTop < ( $(window).scrollTop() + $(window).height() )) {
 		   this.css('background-position-y', Math.round( ( $(window).scrollTop() - this[0].offsetTop ) * strength + offset ) +'px');
		}
	} else {
	    this.css('background-position-y', '');
	}

};

$(window).on('scroll load', function() {
	$('#header-block .inner').parallax(0.2);
	$('#media .inner').parallax(0.2);
	$('#contact .inner').parallax(0.2, -200);
});