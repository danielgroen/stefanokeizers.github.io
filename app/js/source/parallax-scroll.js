$.fn.parallax = function(strength) {
    var scroll_top = $(window).scrollTop();
	if ( this[0].offsetTop < ( scroll_top + $(window).height() )) {
	    this.css('background-position', '0 '+ Math.round((scroll_top - this[0].offsetTop) * strength) +'px');
	}
};

$(window).on('scroll', function() {
	if ( $(window).width() > 768 ) {
	    $('#header-block .inner').parallax(0.2);
	    $('#media .inner').parallax(0.2);
	    $('#contact .inner').parallax(0.2);
	}
});