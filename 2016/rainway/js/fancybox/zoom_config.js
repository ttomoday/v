$(".p_gallery_main a.group").fancybox({
    'transitionIn'  :   'elastic',
    'transitionOut' :   'elastic',
    'overlayColor'  :   '#323c46',
    'changeSpeed'   :   100,
    'overlayOpacity':   0.7,
    'cyclic'        :   true,
    'margin'        :   100,
    'padding'       :   0,
    'centerOnScroll':   true
});


$(".p_catalogue a.group").fancybox({
    'overlayColor'  :   '#323c46',
    'changeSpeed'   :   100,
    'overlayOpacity':   0.7,
    'showNavArrows' :   false,
    'margin'        :   100,
    'padding'       :   50,
    'centerOnScroll':   true
});

$(".p_contacts a.group").fancybox({
    'overlayColor'  :   '#323c46',
    'changeSpeed'   :   100,
    'overlayOpacity':   0.7,
    'showNavArrows' :   false,
    'cyclic'        :   true,
    'margin'        :   60,
    'padding'       :   0,
    'centerOnScroll':   true
});

$("#manual2").click(function() {
    $.fancybox([
        'images/ext-img-1.png',
        'images/ext-img-2.png',
        'images/ext-img-3.png',
        {
            'href'  : 'http://farm6.staticflickr.com/5612/15344856989_449794889d_b.jpg',
            'title' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        }
    ], {
        'margin'            : 60,
        'padding'           : 0,
        'transitionIn'      : 'none',
        'transitionOut'     : 'none',
        'type'              : 'image',
        'changeFade'        : 0
    });
});