;
(function() {

    'use strict';

    // iPad and iPod detection	
    var isiPad = function() {
        return (navigator.platform.indexOf("iPad") != -1);
    };

    var isiPhone = function() {
        return (
            (navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPod") != -1)
        );
    };

    // Parallax
    var parallax = function() {
        $(window).stellar();
    };

    // Animations
    // Home

    var homeAnimate = function() {
        if ($('#coffee-home').length > 0) {

            $('#coffee-home').waypoint(function(direction) {

                if (direction === 'down' && !$(this.element).hasClass('animated')) {


                    setTimeout(function() {
                        $('#coffee-home .to-animate').each(function(k) {
                            var el = $(this);

                            setTimeout(function() {
                                el.addClass('fadeInUp animated');
                            }, k * 200, 'easeInOutExpo');

                        });
                    }, 200);


                    $(this.element).addClass('animated');

                }
            }, { offset: '80%' });

        }
    };

    // Document on load.
    $(function() {

        // Animations
        homeAnimate();

    });


}());