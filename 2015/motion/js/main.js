// On dociment ready
$( document ).ready(function() {
	// Entire page smooth scrolling
    $.srSmoothscroll();

    // Smooth scrolling
	$(document).on("scroll",function(){
	    if($(document).scrollTop()>30){
		    $("#header").addClass("small");
		} else{
		    $("#header").removeClass("small");
		}
	});

    // top menu
    $(function() {  
        var pull        = $('#pull');  
            menu        = $('nav ul');  
            menuHeight  = menu.height();  
      
        $(pull).on('click', function(e) {  
            e.preventDefault();  
            menu.slideToggle();  
        });  
    });

    $(window).resize(function(){  
        var w = $(window).width();  
        if(w > 320 && menu.is(':hidden')) {  
            menu.removeAttr('style');  
        }  
    }); 

	//initialize swiper when document ready  
    var swiper1 = new Swiper('.swiper1', {
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        nextButton: '.swiper-button-next1',
        prevButton: '.swiper-button-prev1',
        slidesPerView: 'auto',
        coverflow: {
            rotate: 30,
            stretch: 0,
            depth: 60,
            modifier: 1,
            slideShadows : true
        }
    });

    // initialize swiper for works
    var swiper = new Swiper('.swiper2', {
        pagination: '.swiper-pagination2',
        nextButton: '.swiper-button-next2',
        prevButton: '.swiper-button-prev2',
        slidesPerView: 4,
        paginationClickable: true,
        spaceBetween: 30
    });

    // twits slider
    var swiper3 = new Swiper('.swiper3', {
        pagination: '.swiper-pagination3',
        paginationClickable: '.swiper-pagination3',
        nextButton: '.swiper-button-next3',
        prevButton: '.swiper-button-prev3',
        spaceBetween: 30
    });
});
