jQuery(function ($) {
    $(".header .menu a").on('click touch', function(event){
        event.preventDefault();
        var $gutter = 40;
        var full_url = this.href;
        var parts = full_url.split("#");
        var trgt = parts[1];
        var target_offset = $("#"+trgt).offset();
        var target_top = target_offset.top - $gutter;
        $('html, body').animate({scrollTop:target_top}, 200, 'linear');
    });
});