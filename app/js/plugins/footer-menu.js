$( document ).ready( function() {
    var trigger = $(".footer-menu__item");
    trigger.each(function() {
        var trigger = $(this);
        
        trigger.on("click", function() {
            var className = "is-open";
            if($(window).width() < 750 ) {
                $(this).children(".footer-links").slideToggle("fast");
                if (trigger.hasClass(className)) {
                    trigger.removeClass(className);
                } else {
                    trigger.addClass(className);
                }
            }
        });

        $(window).on("resize", function() {
            var links = trigger.children(".footer-links");
            if($(window).width() > 750 ) {
                links.show();
            } else {
                links.hide();
            }
        });
    });
});