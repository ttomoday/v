(function($) {

  $.fn.menumaker = function(options) {
      
      var cssmenu = $(this), settings = $.extend({
        title: "",
        format: "dropdown",
        breakpoint: 1128, //1095
        sticky: false
      }, options);

      return this.each(function() {
        cssmenu.find('li ul').parent().addClass('has-sub');
        if (settings.format != 'select') {
          cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
          $(this).find("#menu-button").on('click', function(){
            $(this).toggleClass('menu-opened');
            var mainmenu = $(this).next('ul');
            if (mainmenu.hasClass('open')) { 
              mainmenu.hide().removeClass('open');
            }
            else {
              mainmenu.show().addClass('open');
              if (settings.format === "dropdown") {
                mainmenu.find('ul').show();
              }
            }
          });

          multiTg = function() {
            cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
            cssmenu.find('.submenu-button').on('click', function() {
              $(this).toggleClass('submenu-opened');
              if ($(this).siblings('ul').hasClass('open')) {
                $(this).siblings('ul').removeClass('open').hide();
              }
              else {
                $(this).siblings('ul').addClass('open').show();
              }
            });
          };

          if (settings.format === 'multitoggle') multiTg();
          else cssmenu.addClass('dropdown');
        }

        else if (settings.format === 'select')
        {
          cssmenu.append('<select style="width: 100%"/>').addClass('select-list');
          var selectList = cssmenu.find('select');
          selectList.append('<option>' + settings.title + '</option>', {
                                                         "selected": "selected",
                                                         "value": ""});
          cssmenu.find('a').each(function() {
            var element = $(this), indentation = "";
            for (i = 1; i < element.parents('ul').length; i++)
            {
              indentation += '-';
            }
            selectList.append('<option value="' + $(this).attr('href') + '">' + indentation + element.text() + '</option');
          });
          selectList.on('change', function() {
            window.location = $(this).find("option:selected").val();
          });
        }

        if (settings.sticky === true) cssmenu.css('position', 'fixed');

        resizeFix = function() {
          if ($(window).width() > settings.breakpoint) {
            cssmenu.find('ul').show();
            cssmenu.removeClass('small-screen');
            if (settings.format === 'select') {
              cssmenu.find('select').hide();
            }
            else {
              cssmenu.find("#menu-button").removeClass("menu-opened");
            }
          }

          if ($(window).width() <= settings.breakpoint && !cssmenu.hasClass("small-screen")) {
            cssmenu.find('ul').hide().removeClass('open');
            cssmenu.addClass('small-screen');
            if (settings.format === 'select') {
              cssmenu.find('select').show();
            }
          }
        };
        resizeFix();
        return $(window).on('resize', resizeFix);

      });
  };
})(jQuery);

var createCookie = function(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}


$(function(){

	$("#cssmenu").menumaker({
		title: "",
		format: "dropdown"
	});

	$(".phone a img").click(function(){
		if ($(window).width() <= '520'){
			$(".hide_num").toggleClass('d_block');
		 }
		 else {
			$(".phone span").toggle();
			$(this).toggleClass("show_num");
		 }
	});
	
	$(window).on('resize', function(){
		if ($(window).width() <= '520'){
			$(".phone span").hide();
			if( !$('.phone_img').hasClass('show_num')) $(".hide_num").addClass('d_block');
		 }
		 else {
			 if( !$('.phone_img').hasClass('show_num')) $(".phone span").show();
			 $(".hide_num").removeClass('d_block');
		 }
	});

	$('.post').addClass("hidden").viewportChecker({
		classToAdd: 'visible animated fadeIn', // Class to add to the elements when they are visible
		offset: 150    
	});
  $('.post_r').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated fadeInRightBig', // Class to add to the elements when they are visible
    offset: 1    
  });
  $('.post_l').addClass("hidden").viewportChecker({
    classToAdd: 'visible animated fadeInLeftBig', // Class to add to the elements when they are visible
    offset: 1    
  });

 // tabbed content	
	$(".tab_content").hide();
	$(".tab_content:first").show();

	/* if in tab mode */
	$("ul.tabs li").click(function() {
	
		$(".tab_content").hide();
		var activeTab = $(this).attr("rel"); 
		$("#"+activeTab).fadeIn();	
	
		$("ul.tabs li").removeClass("active");
		$(this).addClass("active");

		$(".tab_drawer_heading").removeClass("d_active");
		$(".tab_drawer_heading[rel^='"+activeTab+"']").addClass("d_active");
	
	});
	/* if in drawer mode */
	$(".tab_drawer_heading").click(function() {
		
		$(".tab_content").hide();
		var d_activeTab = $(this).attr("rel"); 
		$("#"+d_activeTab).fadeIn();
	
		$(".tab_drawer_heading").removeClass("d_active");
			$(this).addClass("d_active");
		
		$("ul.tabs li").removeClass("active");
		$("ul.tabs li[rel^='"+d_activeTab+"']").addClass("active");
	});
	
	/* Extra class "tab_last" 
	 to add border to right side
	 of last tab */
	$('ul.tabs li').last().addClass("tab_last");
	
	$('a[href*=#calculator]').on("click", function(evt){
		if ($("#calculator").length)
		{
			evt.preventDefault();
			$('html, body').animate({
				scrollTop: $("#calculator").offset().top
			}, 1500);
			return false;
		} else {
			return true;			
		}
   });

  $("#view_ctrl a").click(function(e) {
    e.preventDefault();
    $("#view_ctrl a").removeClass('active_view_ctrl');
    $(this).addClass('active_view_ctrl');
  })

});