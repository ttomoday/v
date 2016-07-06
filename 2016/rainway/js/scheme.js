function schemeSize(coef) {
	var coefficient;
	if (coef) {
		coefficient = coef;
	} else {
		coefficient = 1;
	}
	var parts = $(".part");
	var	toolt = $(".tooltips .info");
	var dots = $(".dots");
	var x = 0;

	for (i = 0; i < parts.length; i++) {
		var left = parseInt($(parts[i]).css('left'));
		var width = $(parts[i]).width();
		if (x < (left + width)) {
			x = left + width;
			
		}
	}
	for (i = 0; i < dots.length; i++) {
		var left = parseInt($(dots[i]).css('left'));
		var width = $(dots[i]).width();
		if (x < (left + width)) {
			x = left + width;
			
		}
	}

	if (!coef) {
		if ($(".tabs").width() > x) {
			coefficient = x/$(".tabs").width();
		} else {
			coefficient = $(".tabs").width()/x;
		}
	}

	

	for (i = 0; i < parts.length; i++) {
		var left = parseInt($(parts[i]).css('left'))*coefficient;
		var top = parseInt($(parts[i]).css('top'))*coefficient;
		$(parts[i]).css('width', $(parts[i]).width()*coefficient)
				   .css('left', left)
				   .css('top', top);
	}
	for (i = 0; i < toolt.length; i++) {
		var left = parseInt($(toolt[i]).css('left'))*coefficient;
		var top = parseInt($(toolt[i]).css('top'))*coefficient;
		$(toolt[i]).css('left', left)
				   .css('top', top);
	}
	for (i = 0; i < dots.length; i++) {
		var left = parseInt($(dots[i]).css('left'))*coefficient;
		var top = parseInt($(dots[i]).css('top'))*coefficient;
		$(dots[i]).css('left', left)
				   .css('top', top);
	}
}
schemeSize();

$(".tabs__caption").click(function() {
	if (!$(this).hasClass("active")) {
		$(".tabs__caption, .tabs__content").removeClass("active");
		if ($(this).hasClass("tab_1")) {
			$(".tab_1").addClass("active")
		}
		else if ($(this).hasClass("tab_2")) {
			$(".tab_2").addClass("active")
		}
		else if ($(this).hasClass("tab_3")) {
			$(".tab_3").addClass("active")
		}
	}
	schemeSize(1);
});

jQuery(function($) {
    // Cache a reference to $(window), for performance, and get the initial dimensions of the window
    var $window = $(window),
        previousDimensions = {
            width: $window.width(),
            height: $window.height()
        };

    $window.resize(function(e) {
        var newDimensions = {
            width: $window.width(),
            height: $window.height()
        };

        if (newDimensions.width > previousDimensions.width) {
            // scaling up
        } else {
            // scaling down
        }
        
        if ($window.width() > 640) {
        	coefficient = newDimensions.width/previousDimensions.width;
        } else {
        	coefficient = 1;
        }
        schemeSize(coefficient);
        // Store the new dimensions
        previousDimensions = newDimensions;
    });
});