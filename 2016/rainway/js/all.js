$(function() {
	$(".btn-print").click(function() {
		var box = $(this).data("print-url");
		$("#" + box).print({
            globalStyles: true,
            mediaPrint: true,
            stylesheet: null,
            noPrintSelector: ".no-print",
            iframe: true,
            append: null,
            prepend: null,
            manuallyCopyFormValues: true,
            title: null
		});
	});
})

function maxh(colums){
	var max_col_height = 0; // максимальная высота, первоначально 0
	for (i = 0; i < 3; i++) {
		$(colums[i]).css('height', 'auto');
		if ($(colums[i]).height() > max_col_height) { // если высота колонки больше значения максимальной высоты,
			max_col_height = $(colums[i]).height(); // то она сама становится новой максимальной высотой
		}
	}
	$(colums).height(max_col_height); // устанавливаем высоту каждой колонки равной значению максимальной высоты
};

function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }
    for (i = 0; i < matrix.length; i++) {
    	maxh(matrix[i]);
    }
    return matrix;
}


function heights () {
	if ($(window).width() > 640) {
		listToMatrix($(".news_list .news"), 3);
		listToMatrix($(".home_news_list .news"), 3);
		listToMatrix($(".calculate_prepares .row_3 .panel"), 3);
		listToMatrix($(".calculate_prepares .row_4 .panel"), 2);
		listToMatrix($(".type_details .description"), 2);
		listToMatrix($(".certificates .save_docs"), 2);
		listToMatrix($(".main_footer > .column"), 3);
		listToMatrix($(".region_img"), 3);
		listToMatrix($(".regional_managers_details .top"), 3);
	} else if ($(window).width() <= 640) {
		listToMatrix($(".news_list .news"), 2);
		listToMatrix($(".home_news_list .news"), 1);
		listToMatrix($(".calculate_prepares .row_3 .panel"), 1);
		listToMatrix($(".calculate_prepares .row_4 .panel"), 1);
		listToMatrix($(".type_details .description"), 1);
		listToMatrix($(".certificates .save_docs"), 1);
		listToMatrix($(".main_footer > .column"), 1);
		listToMatrix($(".region_img"), 2);
		listToMatrix($(".regional_managers_details .top"), 5);
	}
}
heights ();



window.onresize = function resize() {
	heights ();
	$(".main_nav").css("max-height", $(window).height() - 60);
}

$(".main_nav_toggle, .page_overlay").click(function() {
	$(".main_nav ").toggleClass("opened");
	$(".main_nav_toggle").toggleClass("cross");
	$(".page_overlay").toggleClass("opened");
});

$(".page_overlay, .close_popup").click(function() {
	$(".main_nav ").removeClass("opened");
	$(".main_nav_toggle").removeClass("cross");
	$(".page_overlay").removeClass("opened");
	$('.popup_wrapper').removeClass("opened");
	$('.search').removeClass("opened");
});


$(".question").click(function() {
	$(this).toggleClass("opened");
});

$(".gallery_nav_toggle").click(function() {
	$(".gallery_nav").toggleClass("opened");
});

$(".colour_select").click(function() {
	$(".colour_select").removeClass("active");
	$(".scheme_image").removeClass("active");
	$(this).addClass("active");
	if ($(this).hasClass("white")) {
		$(".scheme_image.white").addClass("active");
	} else if ($(this).hasClass("gray")) {
		$(".scheme_image.gray").addClass("active");
	} else if ($(this).hasClass("green")) {
		$(".scheme_image.green").addClass("active");
	} else if ($(this).hasClass("orange")) {
		$(".scheme_image.orange").addClass("active");
	} else if ($(this).hasClass("brown")) {
		$(".scheme_image.brown").addClass("active");
	} else if ($(this).hasClass("red")) {
		$(".scheme_image.red").addClass("active");
	}
});


$(".contacts_content .icon-place").click(function(e) {

	e.preventDefault();
	$that = $(this);
	var target = $that.data("target");
	var opened = $that.data("opened") == "true" ? true : false;

	if (opened) {
		$("#" + target).fadeOut(200);
		$that.data("opened", "false");
	} else {
		$(".contact_list").fadeOut(200);
		$(".icon-place").data("opened", "false");
		$("#" + target).fadeIn(200);
		$that.data("opened", "true");
	}
});

$(".contact_list .close_button").click(function() {
	$(".contact_list").fadeOut(200);
	$(".icon-place").data("opened", "false");
});

$(".contact_list .content a").click(function() {
	$(".contact_list .popup_wrapper").addClass("opened");
	$(".contact_list .page_overlay").addClass("opened");
});

$(".language_selector a").click(function() {
	if ($("body").hasClass("language_selector_opened")) {
		$("body").removeClass("language_selector_opened");
		$(".language_selector ul").fadeOut(200);
	} else {
		$("body").addClass("language_selector_opened");
		$(".language_selector ul").fadeIn(200);
	}
});

$(".main_nav").css("max-height", $(window).height() - 60);


//ZOOM ON GALLERY PAGE

$(".gallery_item a, .pswp__button--arrow--right, .pswp__button--arrow--left").click(function() {
	setTimeout(function() {

		winWidth = $(window).width();
		imgWidth = parseInt($(".pswp__img--placeholder").css("width"));

		// node = $(".pswp__zoom-wrap")[1];
		//var curTransform = new WebKitCSSMatrix(window.getComputedStyle(node).webkitTransform);
		$(".pswp__top-bar").css("right", (winWidth-imgWidth/**curTransform.a*/)/2);
		$(".pswp__top-bar").css("top", "5%");
	}, 500);
});





$(".tooltip").click(function() {
	$('.popup_wrapper').toggleClass("opened");
	$(".page_overlay").toggleClass("opened");
});

$(".header_search_btn").click(function() {
	$('.search').toggleClass("opened");
	setTimeout(function() {
		$(".header_search_form input").focus();
	}, 200);
});

$(".close_btn").click(function() {
	$('.search').toggleClass("opened");
	$(".header_search_form input").focusout();
});

$(".header_search_form input").focusout(function() {
	$('.search').toggleClass("opened");
});

$( window ).scroll(function() {
	if ($(this).scrollTop() >= $(this).height()) {
		$( ".p_herro_banner .main_header" ).addClass( "main_header_bg_white" );
	} else {
		$( ".p_herro_banner .main_header" ).removeClass( "main_header_bg_white");
	}

	scrollingEffects();
});

function scrollingEffects() {
	var arr = $(".feature");
	var tabs = $(".tabs");
	if (arr.length) {
		if ($( window ).scrollTop() >= ($(".feature").offset().top - $( window ).height()/3*2)) {
			(function addEffect(index) {
			  $(arr[index]).addClass("opened");
			  setTimeout(function() { ++index < arr.length && addEffect(index); }, 150);
			})(0);
		}
	}
	if (tabs.length) {
		if ($( window ).scrollTop() >= ($(".tabs").offset().top - $( window ).height()/3*2)) {
			$(".images .part, .tooltips .info, .dots").addClass("active");
		}
	}
}

scrollingEffects();
