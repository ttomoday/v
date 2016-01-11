/* BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER */
/* BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER */
/* BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER */
/* BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER */
$(function() {
	/*
	number of fieldsets
	*/
	var fieldsetCount = $('#formElem').children().length;
	
	/*
	current position of fieldset / navigation link
	*/
	var current 	= 1;
    
	/*
	sum and save the widths of each one of the fieldsets
	set the final sum as the total width of the steps element
	*/
	var stepsWidth	= 0;
    var widths 		= new Array();
	$('#steps .step').each(function(i){
        var $step 		= $(this);
		widths[i]  		= stepsWidth;
        stepsWidth	 	+= $step.width();
    });
	$('#steps').width(stepsWidth);
	
	/*
	to avoid problems in IE, focus the first input of the form
	*/
	$('#formElem').children(':first').find(':input:first').focus();	
	
	/*
	show the navigation bar
	*/
	$('#navigation').show();
	
	/*
	when clicking on a navigation link 
	the form slides to the corresponding fieldset
	*/
    $('#navigation a').bind('click',function(e){
		var $this	= $(this);
		var prev	= current;
		$this.closest('ul').find('li').removeClass('selected');
        $this.parent().addClass('selected');
		/*
		we store the position of the link
		in the current variable	
		*/
		current = $this.parent().index() + 1;
		/*
		animate / slide to the next or to the corresponding
		fieldset. The order of the links in the navigation
		is the order of the fieldsets.
		Also, after sliding, we trigger the focus on the first 
		input element of the new fieldset
		If we clicked on the last link (confirmation), then we validate
		all the fieldsets, otherwise we validate the previous one
		before the form slided
		*/
        $('#steps').stop().animate({
            marginLeft: '-' + widths[current-1] + 'px'
        },500,function(){
			if(current == fieldsetCount)
				validateSteps();
			else
				validateStep(prev);
			$('#formElem').children(':nth-child('+ parseInt(current) +')').find(':input:first').focus();	
		});
        e.preventDefault();
    });
	
	/*
	clicking on the tab (on the last input of each fieldset), makes the form
	slide to the next step
	*/
	$('#formElem > fieldset').each(function(){
		var $fieldset = $(this);
		$fieldset.children(':last').find(':input').keydown(function(e){
			if (e.which == 9){
				$('#navigation li:nth-child(' + (parseInt(current)+1) + ') a').click();
				/* force the blur for validation */
				$(this).blur();
				e.preventDefault();
			}
		});
	});
	
	/*
	validates errors on all the fieldsets
	records if the Form has errors in $('#formElem').data()
	*/
	function validateSteps(){
		var FormErrors = false;
		for(var i = 1; i < fieldsetCount; ++i){
			var error = validateStep(i);
			if(error == -1)
				FormErrors = true;
		}
		$('#formElem').data('errors',FormErrors);	
	}
	
	/*
	validates one fieldset
	and returns -1 if errors found, or 1 if not
	*/
	function validateStep(step){
		if(step == fieldsetCount) return;
		
		var error = 1;
		var hasError = false;
		$('#formElem').children(':nth-child('+ parseInt(step) +')').find(':input:not(button)').each(function(){
			var $this 		= $(this);
			var valueLength = jQuery.trim($this.val()).length;
			
			if(valueLength == ''){
				hasError = true;
				$this.css('background-color','#FFEDEF');
			}
			else
				$this.css('background-color','#FFFFFF');	
		});
		var $link = $('#navigation li:nth-child(' + parseInt(step) + ') a');
		$link.parent().find('.error,.checked').remove();
		
		var valclass = 'checked';
		if(hasError){
			error = -1;
			valclass = 'error';
		}
		$('<span class="'+valclass+'"></span>').insertAfter($link);
		
		return error;
	}
	
	/*
	if there are errors don't allow the user to submit
	*/
	$('#registerButton').bind('click',function(){
		if($('#formElem').data('errors')){
			alert('Please correct the errors in the Form');
			return false;
		}	
	});
});
/* /BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER */
/* /BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER */
/* /BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER */
/* /BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER */
/* /BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER BIG-SLIDER */




/*---slider--*/
$(function(){
	
	var note = $('#note'),
		ts = new Date(2014, 0, 1),
		newYear = true;
	
	if((new Date()) > ts){
		ts = (new Date()).getTime() + 1*24*60*60*1000;
		newYear = false;
	}
		
	$('#countdown').countdown({
		timestamp	: ts,
		callback	: function(days, hours, minutes, seconds){
			
			var message = "";
			
			message += days + " day" + ( days==1 ? '':'s' ) + ", ";
			message += hours + " hour" + ( hours==1 ? '':'s' ) + ", ";
			message += minutes + " minute" + ( minutes==1 ? '':'s' ) + " and ";
			message += seconds + " second" + ( seconds==1 ? '':'s' ) + " <br />";
			
			if(newYear){
				message += "left until the new year!";
			}
			else {
				message += "left to 10 days from now!";
			}
			
			note.html(message);
		}
	});
	
});

function validateEmail(email) { 
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
$(document).ready(function() {	
	
	$('.s_submit').click(function() {
		filled = 1;
		$(this).parent().children('.sinp').each(function() {
			if(this.value.replace(/^\s+|\s+$/g, '')=='' || this.value=='Ваше имя' || this.value=='Ваше имя' || this.value=='Ваш телефон') {$(this).effect('highlight');filled=0;}
		});
		var q=$(this).parent().children('.email');
		if(!validateEmail(q.val())&&(q.val()!='')) {q.effect('highlight');filled=0;}
		if(filled==1) {
		q=$(this).parent().children('.fhid').val();		 
		$(this).parent().submit();
		$('#dialogform').dialog('close');
		$('#dialogform2').dialog('close');
		}
	});
	$('#dialogform').dialog({autoOpen: false,
	title:"Заказ",
    height: 300,
    width: 400,
    modal: true,
	buttons:{},
	resizable:false
	});
	$('#dialogform2').dialog({autoOpen: false,
	title:"Заказ звонка",
    height: 300,
    width: 400,
    modal: true,
	buttons:{},
	resizable:false
	});
	$('.formshow').click(function(){
		$('#dialogform').dialog('open');
		$('#dialogform .nameinp').blur();
	});
	$('.formshow2').click(function(){
		$('#dialogform2').dialog('open');
		$('#dialogform2 .nameinp2').blur();
	});
	updateDate();
	setInterval(updateDate, 1000);
});
function setSender(a) {
	$('#senderid').val(a);
}




