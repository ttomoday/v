function show_parent (block) {
    
}

$(function() {

    // Menu
	var menuButton = $( "#profile-menu-controls" );

    menuButton.click(function() {

    	if (menuButton.hasClass("close-menu")) {
    		$( "#profile-menu" ).hide( "400");
    		menuButton.html("Profile menu");
    	} else {
    		$( "#profile-menu" ).show( "400");
    		menuButton.html("Close");
    	}
		
		$("#profile-menu-controls").toggleClass( "close-menu" );
	});

    // Cars tab
    $(".cars-info-btn").click(function () {
        $(this).next().show( "200" );
    });

    $(".cars-block-close").click(function () {
        $(this).parent().hide("200");
    })

    $(".cars-settings-btn").click(function () {
        $(this).next().show( "200" );
    });

    $(".cars-settings-close").click(function () {
        $(this).parent().hide("200");
    })


    $(".range-slider").slider({
        min: 0,
        max: 1000,
        values: [0,1000],
        range: true,
        stop: function(event, ui) {
            $("input#minYear").val($(".range-slider").slider("values",0));
            $("input#maxYear").val($(".range-slider").slider("values",1));
        },
        slide: function(event, ui){
            $("input#minYear").val($(".range-slider").slider("values",0));
            $("input#maxYear").val($(".range-slider").slider("values",1));
        }
    });


    $("input#minYear").change(function(){
        var value1=$("input#minYear").val();
        var value2=$("input#maxYear").val();

        if(parseInt(value1) > parseInt(value2)){
            value1 = value2;
            $("input#minYear").val(value1);
        }
        $(".range-slider").slider("values",0,value1);    
    });

        
    $("input#maxYear").change(function(){
        var value1=$("input#minYear").val();
        var value2=$("input#maxYear").val();
        
        if (value2 > 1000) { value2 = 1000; $("input#maxYear").val(1000)}

        if(parseInt(value1) > parseInt(value2)){
            value2 = value1;
            $("input#maxYear").val(value2);
        }
        $(".range-slider").slider("values",1,value2);
    });


    // Advanced search open
    $("#advanced-search-open").click(function () {

        var searchForm = $("#search-form");
        if (searchForm.hasClass("close-form")) {
            $( "#search-form" ).hide( "200");
            $(".advanced-search-wrapper").css("background", "none")
        } else {
            $( "#search-form" ).show( "200");
            $(".advanced-search-wrapper").css("background", "#f3f3f3")
        }

        $("#search-form").toggleClass( "close-form" );
    })


});