$.fn.parallax = function(strength) {
    var scroll_top = $(window).scrollTop();
	if ( this[0].offsetTop < ( scroll_top + $(window).height() ) ) {

		// deze calculatie nog berekenen
	    var move_value = Math.round(scroll_top * strength);
	    this.css('background-position', '0 '+ ( move_value) +'px');
	}
};

$(window).on('scroll', function() {
    $('#header-block .inner').parallax(0.2);
    $('#media .inner').parallax(0.2);
    $('#contact .inner').parallax(0.2);
});