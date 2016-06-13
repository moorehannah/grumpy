$( document ).ready( function() {
    var trigger = $(".main-nav__trigger");
	var target = trigger.siblings(".main-nav");
    trigger.each(function() {
    	var button = $(this);
        
        $('html').on('click', function() {
            if($(window).width() < 750 ) {
                target.hide();
            }
        });

        button.on("click", function(e) {
            if($(window).width() < 750 ) {
                e.stopPropagation();
                target.fadeToggle("fast");
            }
        });

        $(window).on("resize", function() {
            if($(window).width() > 750 ) {
                target.show();
            } else {
                target.hide();
            }
        });

    });
});