 function jSlider(el) {

     //configurations
     var width = 220;
     var itemsPerSlide = 4;
     var maxItem = $("#slider .items").find('.item').length;
     var currItem = 1;

     var $prev = $('#slider .prev');
     var $next = $('#slider .next');
     var $items = $("#slider .items");
 
     var r = $.Deferred();

     // Initialize
     this.initialize = function() {
         var $slider = $(el);
         var $ul = $(el + " > ul");
         var $items = $ul.children();

         var ulwidth = 250 * $ul.children().length;

         $ul.css({
            'width': ulwidth,
         })

         $items.css({
            'width': '210px',
            'float': 'left',
        });
     };

     function stylize() {
        $(el).children().children().css({
            'width': '210px',
            'float': 'left',
        });
     }

     //back to first slider
     function backToStart() {
         $items.animate({
             'margin-left': '0'
         }, 500, function() {
             currItem = 1;
         });
     };

     //animate on click
     $prev.click(function() {
         if (!$.timers.length) {
             if (currItem > 1) {
                 $items.animate({
                     'margin-left': '+=' + width
                 }, 350, function() {
                     currItem--;
                 });
             } else {
                 $items.animate({
                     'margin-left': '+=' + 20
                 }, 200);
                 $items.animate({
                     'margin-left': '-=' + 20
                 }, 200);
             };
         }
     });

     $next.click(function() {
         if (!$.timers.length) {
             if (currItem <= maxItem - itemsPerSlide) {
                 $items.animate({
                     'margin-left': '-=' + width
                 }, 350, function() {
                     currItem++;
                 });
             } else {
                 backToStart();
             };
         }
     });
 }