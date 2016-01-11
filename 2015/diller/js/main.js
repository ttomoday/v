
function checkAll (btn) {

	var table = $(btn).siblings("table");

	if ($(btn).hasClass("all-checked")) {
		$(table).find(":checkbox").each(function () {
        	if ( $(this).is(':checked') ) {
        		$(this).prop("checked", false);
        	}
        	$(btn).html("Выделить все");
        });
	} else {
		$(table).find(":checkbox").each(function () {
        	if ( !$(this).is(':checked') ) {
        		$(this).prop("checked", true);
        	}
        	$(btn).html("Отменить выдиления");
        });
	};

	$(btn).toggleClass("all-checked");

}

$(function() {

	// Check / unckeck all in category
	$(document).on("click", ".check-all", function () {
		var btn = $(this);
		checkAll(btn);
	});

	var cart = $('#cart-box');
	var cartPosition = cart.offset().top - 25;
	console.log(cartPosition);
	$(window).on('scroll', function() {
        if ($(window).scrollTop() > cartPosition) {
            cart.addClass("onscroll-fixed");
        } else {
            cart.removeClass("onscroll-fixed");
        }
    });
});