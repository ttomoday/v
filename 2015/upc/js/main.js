/*
 *
 *  UPC 
 *  JS Mosules
 *
*/


// Create namespace
var Module = window.Module || {};


// Left sidebars module
Module.LeftSidebar = {
    init: function() {
      // Left sidebar handler
      $('.sidebar-handler').left_sidebar();

    }
};

// Left sidebars module loader overlay
Module.loaderOverlay = {
    init: function() {
      // Left sidebar handler
      $('.sidebar-handler').loader_overlay();

    }
};

// Left sidebars menu
Module.LeftMenuToggler = {
    init: function() {
      $(".sm-title").left_menu();
    }
};

// cart handler
Module.CartHandler = {
    init: function() {
        $('.cart-opener').click(function(e) {
            e.preventDefault();
            $(this).toggleClass('opened');
            $( ".checkout-box" ).toggleClass('opened');
        })
    }
}

// Smoth page scroll links
Module.SmoothLinks = {
  init: function() {
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
  }
}


// Module right mobile menu
Module.RightMenu = {
  init: function() {
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
  }
}

// Main full-size carousel on home page
Module.CorouselMain = {
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
    }
};

// Home page parallax module
Module.HomeParallax = {
    init: function() {

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
    }
};

// Home page news slider
Module.HomeNewsSlider = {
    init: function() {

        var newsslider = $("#news-list");

        function create() {
            newsslider.owlCarousel({
            dots: false,
            nav: true,
            navText: false,
            loop: true,
            responsiveBaseElement: ".box-to-check",
            responsive: {
                0: {
                    items: 1},
                480: {
                    items: 2},
                768: {
                    items: 3}
                }
            });
        }

        create();

        $('.sidebar-handler').click(function() {

            // Destroy carousel
            newsslider.trigger('destroy.owl.carousel');          
            newsslider.find('.owl-stage-outer').children().unwrap();
            newsslider.removeClass('owl-loaded owl-carousel');

            setTimeout(create, 350);

        })
    }
};


// One row socks list slider
Module.OneRowSocksSlider = {
  init: function() {

    var rowSliders = $('.socks-row-slider');

    function create () {

        console.log('inited');

        // Initialize socks-list slider
        rowSliders.owlCarousel({
          items: 5,
          dots: false,
          nav: true,
          navText: false,
          responsiveRefreshRate: 100,
          loop: true,
          responsive: {
            0: {
                items: 1 },
            480: {
                items: 2 },
            768: {
                items: 3 },
            992: {
                items: 4 },
            1200: {
                items: 5 }
          }
        });
    }

    create();

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


    $('.sidebar-handler').click(function() {

        // Destroy carousel
        rowSliders.trigger('destroy.owl.carousel');          
        rowSliders.find('.owl-stage-outer').children().unwrap();
        rowSliders.removeClass('owl-loaded owl-carousel');

        setTimeout(create, 350);

    })

  }
};


// ProductionSlider About page
Module.ProductionSlider = {
  init: function() {
    
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
  }
}


// ProductionSlider About page
Module.AchievSlider = {
  init: function() {
    
    // Initialize achievements-list slider
    $("#achievements-slider").owlCarousel({
      dots: false,
      nav: true,
      navText: false,
      loop: false,
      responsive: {
        0: {
          items: 1},
        480: {
          items: 2},
        768: {
          items: 3}
      }
    });
  }
}


// ProductionSlider About page
Module.AboutSubMenu = {
  init: function() {
    
    var secondaryNav = $(".nav-tabs-about"),
        secondaryNavTopPosition = secondaryNav.offset().top - 50;

    var sidebar = $(".sidebar-container"),
        sidebarPosition = sidebar.offset().top;

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

  }
}

// Open photo in lightbox
Module.PrettyPhoto = {
  init: function() {
    // Light box for photos
    $("a[rel^='prettyPhoto']").prettyPhoto({
        show_title: false,
        social_tools: false,
        theme: 'squared_light'
    });
  }
}


Module.Spinner = {
    init: function() {
        $( ".spinner" ).spinner();
    }
}


// Map initialization
Module.BuyMap = {
  init: function() {
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
}


//Module RadioBox
Module.RadioBox = {
  init: function() {
    // Change shipping mathod radio boxes
    $('.radio-box').click(function() {

        $('.radio-box').removeClass('active');
        var box = $(this).attr('data-box');
        $('.radio-box[data-box="' + box + '"]').addClass('active');
        $('.radio-box[data-box="' + box + '"]').find('input[type="radio"]').prop('checked', 'true');

    })

  }
}


//Module RadioBox
Module.ColoChanger = {
  init: function() {

    $('.color-switcher div').click(function() {
        var target = $(this).attr('data-target');
        colorChanger(target);
        $('img[data-zoomable="true"].active').elevateZoom();
    })


    function colorChanger(target) {
        var color = target;

        $('.type-holder.active img').removeClass('active');
        $('.type-holder.active img[data-color="' + color + '"]').addClass('active');
    }

  }
}


//Module RadioBox
Module.SockTypeChanger = {
  init: function() {

    $('.type-switcher div').click(function() {
        var target = $(this).attr('data-target');
        typeChanger(target);
    })

    function typeChanger(target) {
        var type = target;

        $('.type-holder').removeClass('active');
        $('.type-holder[data-type="' + type + '"]').addClass('active');
    }

  }
}


// Module image zoom
Module.ImgZoom = {
    init: function() {
        
        $('img[data-zoomable="true"].active').elevateZoom();
    }
}


//Module for select
Module.SelectBoxit = {
    init: function() {
        $('.select--select-2').selectBoxIt();
    }
}


// pages namepace
var Pages = {

    Common: [
        Module.LeftSidebar,
        Module.LeftMenuToggler,
        Module.SmoothLinks,
        Module.RightMenu
    ],
    Home: [
        Module.loaderOverlay,
        Module.CorouselMain,
        Module.HomeNewsSlider,
        Module.OneRowSocksSlider,
        Module.HomeParallax
    ],
    About: [
        Module.ProductionSlider,
        Module.AchievSlider,
        Module.AboutSubMenu,
        Module.PrettyPhoto
    ],
    Product: [
      Module.OneRowSocksSlider,
      Module.Spinner,
      Module.CartHandler,
      Module.ColoChanger,
      Module.SockTypeChanger,
      Module.ImgZoom
    ],
    Catalog: [
      Module.OneRowSocksSlider,

    ],
    Buy: [
      Module.BuyMap,
      Module.SelectBoxit
    ],
    Cart: [
      Module.RadioBox
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
