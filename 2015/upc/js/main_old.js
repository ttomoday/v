// Create namespace
var Module = window.Module || {};

// init placeholder
Module.Placeholder = {
    init: function() {
        jQuery('input, textarea').placeholder();
    }
};

// Init carousels on home page
Module.OwlsHome = {
    init: function() {

        // Main full-size slider
        var mainOwl = $(".slider--main");
        mainOwl.owlCarousel({
            items: 1,
            autoplay: true,
            dots: false,
            nav: true,
            navText: false,
            responsiveRefreshRate: 100,
            loop: true,
        });

        // Custom Navigation Events
        $('.main-arrows .next').click(function() {
            mainOwl.trigger('next.owl.carousel');
        })
        $('.main-arrows .prev').click(function() {
            mainOwl.trigger('prev.owl.carousel');
        })

        // News slider
        $("#news-list").owlCarousel({
            dots: false,
            nav: true,
            navText: false,
            loop: true,
            responsiveBaseElement: ".box-to-check",
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                768: {
                    items: 3
                }
            }
        });


        // Initialize socks-list slider
        $("#socks-list").owlCarousel({
            items: 5,
            dots: false,
            nav: true,
            navText: false,
            responsiveRefreshRate: 100,
            loop: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                },
                1200: {
                    items: 5
                }
            }
        });
    }
};


// 
Module.Placeholder = {
    init: function() {
        jQuery('input, textarea').placeholder();
    }
};



// pages namepace
var Pages = {
    Common: [
        Module.CustomForms,
        Module.MobileNav,
        Module.TouchNav,
        Module.StickyNavbar,
        Module.Validation,
        Module.Placeholder,
    ],
    Home: [
        Module.OwlsHome,
        Module.Tabs,
        Module.BackgroundResize,
        Module.SameHeight
    ],
    Catalog: [

    ],
    Product: [
        Module.Tabs,
        Module.SameHeight,
        Module.OpenClose,
        Module.InfiniyCarousel,
        Module.ToogleClass,
        Module.SwitchView,
        Module.ZoomImage
    ],
    Details: [
        Module.SameHeight,
        Module.ToogleClass,
        Module.ZoomImage
    ]
};



// page controller
var Controller = {
    init: function() {
        jQuery.each(this.getCurrentPage(), function(index, widget) {
            if (widget.init) {
                widget.init();
            }
        });
    },
    getCurrentPage: function() {
        var currentPage = jQuery('[data-page]').data('page');
        if (currentPage) {
            return Pages.Common.concat(Pages[currentPage] || []);
        }
    }
};

// initialize page when ready
jQuery(function() {
    Controller.init();
});



// Old JS -----------------------------------------------------

$(function() {

    // jQuery to collapse the navbar on scroll
    // Variables
    if ($(".nav-tabs-about").length) {
        var secondaryNav = $(".nav-tabs-about"),
            secondaryNavTopPosition = secondaryNav.offset().top - 50;
    };

    if ($(".sidebar-container").length) {
        var sidebar = $(".sidebar-container"),
            sidebarPosition = sidebar.offset().top;
    };

    $(window).on('scroll', function() {
        if ($(window).scrollTop() > secondaryNavTopPosition) {
            $(".nav-tabs-about").addClass("nav-tabs-about-fixed");
        } else {
            $(".nav-tabs-about").removeClass("nav-tabs-about-fixed");
        }

        if ($(window).scrollTop() >= sidebarPosition) {
            $(".sidebar-container").addClass("sb-fixed");
        } else {
            $(".sidebar-container").removeClass("sb-fixed");
        }
    });

    $('body').scrollspy({
        offset: 70,
        target: '.nav-tabs-about'
    });

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    $('a.page-scroll-about').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 50
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    $('a.page-scroll-top').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    // Initialize news slider
    var $owl = $("#news-list").owlCarousel({
        dots: false,
        nav: true,
        navText: false,
        loop: true,
        responsiveBaseElement: ".box-to-check",
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 3
            }
        }
    });



    // Socks colors options
    $(".sock-option").each(function() {
        $(this).css("background-image", "url(" + $(this).attr("data-bg") + ")");
    });

    $(".sock-option").mouseover(function() {
            var imgSrc = $(this).attr('data-bg');
            var bgSrc = 'url(' + imgSrc + ')';
            $(this).parent().parent().css('background-image', bgSrc);
        })
        .mouseout(function() {
            var imgSrcOrigin = $(this).parent().parent().attr('data-src');
            var bgSrc = 'url(' + imgSrcOrigin + ')';
            $(this).parent().parent().css('background-image', bgSrc);
        })


    // Activate parallax effect if device width > 991px
    if ($(window).width() > 991) {
        $.stellar({
            horizontalScrolling: false,
            verticalScrolling: true,
            hideDistantElements: false,
            verticalOffset: 450,
            horizontalOffset: 40,
            responsive: true
        });
    }

    // Initialize production-list slider
    $("#production-slider").owlCarousel({
        items: 4,
        dots: false,
        nav: false,
        loop: false,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });

    // Initialize achievements-list slider
    $("#achievements-slider").owlCarousel({
        dots: false,
        nav: true,
        navText: false,
        loop: false,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 3
            }
        }
    });

    // Light box for photos
    $("a[rel^='prettyPhoto']").prettyPhoto({
        show_title: false,
        social_tools: false,
        theme: 'squared_light'
    });

    // Side menu
    $(".sm-title").click(function() {
        $(this).toggleClass('sm-active');
        $(this).siblings('ul').slideToggle();
    });

    // Initialize catalog slider
    $(".catalog-items-row").owlCarousel({
        items: 5,
        dots: false,
        nav: false,
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    });



    $('.sidebar-handler').click(function(e) {

        e.preventDefault();

        $('html, body').focus();

        // Get element ID to open
        var sbToOpen = $(this).attr('data-target');


        if ($(this).attr('data-sb-state') == "sb-closed") {

            // If page about - configure nav tabs width
            if ($(".nav-tabs-about").length) {
                $('.nav-tabs-about').addClass('sidebar--opened');
            };

            set_sidebar_handlers();
            $(this).html('CLOSE <i class="fa fa-caret-up"></i>');

            // Make block to open ontop with z-index
            switch (sbToOpen) {
                case "side-bonus":
                    $('#side-bonus').css('z-index', '101');
                    $('#side-accent').css('z-index', '100');
                    // $( this )
                    break;
                case "side-accent":
                    $('#side-accent').css('z-index', '101');
                    $('#side-bonus').css('z-index', '100');
                    break;
                default:
                    console.log("block doesn't exist");
            }

            // Now open block
            $(this).attr('data-sb-state', 'sb-opened');
            $('#' + sbToOpen).addClass('sb-opened');
            $('.content-container').addClass('sb-opened');

            // Add class handler-opened
            $('.sidebar-handler').removeClass('handler-opened');
            $(this).addClass('handler-opened');

        } else {

            // If page about - configure nav tabs width
            if ($(".nav-tabs-about").length) {
                $('.nav-tabs-about').removeClass('sidebar--opened');
            };

            // Hide all sidebars
            $('.sidebar-container').removeClass('sb-opened');
            $('.content-container').removeClass('sb-opened');

            // Set sidebar-handlers as closed
            $('.sidebar-handler').each(function() {
                $(this).attr('data-sb-state', 'sb-closed');
            });

            set_sidebar_handlers();

            // Remove class handler-opened
            $('.sidebar-handler').removeClass('handler-opened');
        }

        console.log($owl);

        // $owl.trigger('refresh.owl.carousel');

        // console.log($("#news-list").data("owlCarousel"));
        // $("#news-list").data("owlCarousel").reinit();

        $owl.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        $owl.find('.owl-stage-outer').children().unwrap();

        $owl.owlCarousel({
            dots: false,
            nav: true,
            navText: false,
            loop: true,
            responsiveBaseElement: ".box-to-check",
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                768: {
                    items: 3
                }
            }
        });
    });


    var sliiide_settings = {
        toggle: ".mobile-menu-handler", // the selector for the menu toggle, whatever clickable element you want to activate or deactivate the menu. A click listener will be added to this element.
        exit_selector: ".slider-exit", // the selector for an exit button in the div if needed, when the exit element is clicked the menu will deactivate, suitable for an exit element inside the nav menu or the side bar
        animation_duration: "0.5s", //how long it takes to slide the menu
        place: "left", //where is the menu sliding from, possible options are (left | right | top | bottom)
        animation_curve: "cubic-bezier(0.54, 0.01, 0.57, 1.03)", //animation curve for the sliding animation
        body_slide: true, //set it to true if you want to use the effect where the entire page slides and not just the div
        no_scroll: true, //set to true if you want the scrolling disabled while the menu is active
    };

    //initialize sliiide
    $('.smobitrigger').smplmnu({
        background: "#141414",
        textColor: "#989898"
    });


    var toggles = document.querySelectorAll(".c-hamburger");

    for (var i = toggles.length - 1; i >= 0; i--) {
        var toggle = toggles[i];
        toggleHandler(toggle);
    };

    function toggleHandler(toggle) {
        toggle.addEventListener("click", function(e) {
            e.preventDefault();
            (this.classList.contains("is-active") === true) ? this.classList.remove("is-active"): this.classList.add("is-active");
        });
    }

    // Initialize map
    // initMap();

    // Change shipping mathod radio boxes
    $('.radio-box').click(function() {

        $('.radio-box').removeClass('active');
        var box = $(this).attr('data-box');
        $('.radio-box[data-box="' + box + '"]').addClass('active');
        console.log($('.radio-box[data-box="' + box + '"]').find('input[type="radio"]'));
        $('.radio-box[data-box="' + box + '"]').find('input[type="radio"]').prop('checked', 'true');

    })

    $('.color-switcher div').click(function() {
        var target = $(this).attr('data-target');
        colorChanger(target);
    })

});

function set_sidebar_handlers() {

    $('.sidebar-handler').each(function() {
        if ($(this).attr('data-target') == 'side-bonus') {
            $(this).html('BONUS <i class="caret"></i>');
        } else {
            $(this).html('ACCENT <i class="caret"></i>');
        }
    });

}

function initMap() {

    var myLatLng = {
        lat: -25.363,
        lng: 131.044
    };
    var myLatLng2 = {
        lat: -26.363,
        lng: 132.044
    };
    var myLatLng3 = {
        lat: -26.963,
        lng: 132.644
    };

    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('buy-map'), {
        center: myLatLng2,
        scrollwheel: false,
        zoom: 8
    });

    // Create a marker and set its position.
    var marker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        title: 'Hello World!'
    });

    var marker = new google.maps.Marker({
        map: map,
        position: myLatLng2,
        title: 'Hello World!'
    });

    var marker = new google.maps.Marker({
        map: map,
        position: myLatLng3,
        title: 'Hello World!'
    });
}

function colorChanger(target) {
    var color = target;

    $('.product-img-holder img').removeClass('active');
    $('.product-img-holder img[data-color="' + color + '"]').addClass('active');
}
