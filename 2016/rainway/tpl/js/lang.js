$(function(){
	
	$('.changeLang').on('click', function(){
		
		 $('<form method="POST"></form>')
			.append('<input name="lang" value="' + $(this).attr('lang') + '" />')
			.submit();
	});
	
});
