
$(function(){
	var dataPacket = {}, step = 0, doCleanInput = 0;

	function showStep(stepNum)
	{
		if (stepNum == 0)
		{
			doCleanInput = 1;
			$('.__calcStep').show();
			$('.__stepsHolder').hide();
		}
		else {
			$('.__calcStep').hide();
			$('.__stepsHolder').show();
		}

		$('.__finalNext').hide();
		$('.__nextStep').show();

		if (stepNum == 1)
		{
			$('.__skatSelectBlock').hide();
			$('#__bl-' + dataPacket['hst']).css('display','block');
		}
		else if (stepNum == 2) {
			recommendDegree();
		}
		else if (stepNum == 3)
		{
			recommendSystemType();
			recommendFunnelCount();

			$('.__finalNext').show();
			$('.__nextStep').hide();
		}

		$('.err').empty();
		$('#calc_step_' + step).hide();
		$('#calc_step_' + stepNum).slideDown('slow');
		$('.__stepSel').removeClass('active_step');
		$('.step_' + stepNum).addClass('active_step');
		
		$('html, body').animate({
	        scrollTop: $("#calculator").offset().top - 60
	    }, 0);

		cleanFields(stepNum);
		step = stepNum;
	}

	function cleanFields(stepNum)
	{
		// clean up dataPacket on current screen values
		if( $('#calc_step_' + stepNum).find('input:visible').length ) {
			$.each( $('#calc_step_' + stepNum).find('input:visible'), function(indx, el){
				if (doCleanInput == stepNum) {
					$(el).val('');					
				}
				if (typeof dataPacket[$(el).prop('name')] != 'undefined')
					delete(dataPacket[$(el).prop('name')]);
			});
		}
		if( $('#calc_step_' + stepNum).find('select:visible').length ) {
			$.each( $('#calc_step_' + stepNum).find('select:visible'), function(indx, el){
				delete(dataPacket[$(el).prop('name')]);
			});
		}
		if (doCleanInput == stepNum) doCleanInput = 0;
	}

	function fillFields(stepNum)
	{
		var showNext = true;
		$('.err').empty();
		if( $('#calc_step_' + stepNum).find('input:visible').length ) {
			$.each( $('#calc_step_' + stepNum).find('input:visible'), function(indx, el){
				var elVal = $(el).val();
				if ($(el).prop('type') == 'text') {
					elVal = elVal.replace(',', '.');
					elVal = elVal.replace(/[^\d.]/g, '');
				}

				if (elVal.length == 0) {
					$(el).parent().find('.err').html('Заполните значение');
					showNext = false;
				}
				else {
					if (typeof dataPacket[$(el).prop('name')] == 'undefined')
						dataPacket[$(el).prop('name')] = elVal;
					else {
						if ($(el).prop('name') == 'l')
							dataPacket[$(el).prop('name')] = dataPacket[$(el).prop('name')] + ';' + elVal;
						else dataPacket[$(el).prop('name')] = elVal;
					}
				}
				$(el).val(elVal);
			});
		}

		if( $('#calc_step_' + stepNum).find('select:visible').length ) {
			$.each( $('#calc_step_' + stepNum).find('select:visible'), function(indx, el){
				dataPacket[$(el).prop('name')] = $(el).val();
			});
		}

		return showNext;
	}

	function recommendDegree() {
		if (parseFloat(dataPacket['vn']) > 1) 
			$('#__degRec').text('87');
		else 
			$('#__degRec').text('67');
	}
	
	function recommendSystemType()
	{
		if(dataPacket['h'] > 3 || dataPacket['s'] > 100)
		{
			$('#__sys130').prop('checked', true).trigger('click');
			$('#__systemRec').html('Rainway 130');
		}
		else {
			$('#__sys90').prop('checked', true).trigger('click');
			$('#__systemRec').html('Rainway 90');
		}
	}

	function recommendFunnelCount()
	{
		var lArray = dataPacket['l'].split(';'), recVrn = 1;
		for (var i=lArray.length; i--;) {
			lArray[i] = parseFloat(lArray[i]);
		}

		// based on rainway type
		if( $('#__sys90').is(':checked') ) {
			recVrn = Math.ceil(dataPacket['s'] / 70);
		}
		else {
			recVrn = Math.ceil(dataPacket['s'] / 110);
		}
		
		// based on sizes
		var lengthVrn = 0;
		switch(dataPacket['hst']) {
			case '1skat' : 
				lengthVrn = Math.ceil(lArray[0] / 12);
				break;
			case '2skat' : 
				lengthVrn = Math.ceil(lArray[0] / 12) * 2;
				break;
			case '4skat' : 
				// lengthVrn = Math.ceil( (lArray[0] * 2) / 12)  + Math.ceil((lArray[1] * 2) / 12);
				lengthVrn = Math.ceil( ( (lArray[0] + lArray[1]) * 2) / 12);
				break;
			case 'Gskat' :
				lengthVrn = Math.ceil((lArray[0] + lArray[1]) / 12) + Math.ceil((lArray[2] + lArray[3]) / 12);
				break;
			case 'Tskat' :
				lengthVrn = Math.ceil(lArray[0] / 12) + Math.ceil((lArray[1] + lArray[2]) / 12) + Math.ceil((lArray[1] + lArray[3]) / 12);
				break;
			default :
				for (i = lArray.length - 1; i >= 0; i-- ) {
					lengthVrn += Math.ceil(lArray[i] / 12);
				}
				break;
		}

		$('#__vrnRec').html(Math.max(lengthVrn, recVrn));
	}

	$('#__doCount').on('click', function(){
		var goNext = fillFields(step);

		if (typeof dataPacket['color'] == 'undefined')
			dataPacket['color'] = $('.__colorElement').first().data('color');
		if (goNext == false) return ;

		var link = [];
		for (key in dataPacket) link.push(key + '=' + dataPacket[key]);
		link = link.join('+');
		
		$.ajax({
			url	: '/ajax/calc/' + link,
			success	: function(data) {
				$('#__calcResult').empty().hide().append(data).slideDown('fast', function(){
					$('.print_table').after('<div class="result_page_btn"><div class="float_l"><a href="/calc/'+link+'" target="_blank" class="print __printMain"><span>Распечатать</span></a><a href="javascript:window.location=\'/calc/'+link+'/pdf\'" class="save __saveMain"><span>Сохранить</span></a></div><span class="next" id="__calcToBasket">ОФОРМИТЬ ЗАКАЗ</span><a href="javascript:void(0);" id="__newCalc" class="back">НОВЫЙ ПРОСЧЕТ</a></div>');
					$('.__stepsHolder').hide();
				});				
			}
		});

	});

	$('body').on('click', '#__newCalc', function(){
		dataPacket = [];
		$('#__calcResult').empty();
		$('.__stepsHolder input').val('');
		showStep(0);
	});
	
	function buyCalculation(doClean) {
		var link = [];
		for (key in dataPacket) link.push(key + '=' + dataPacket[key]);
		link = '/ajax/calcToBasket/calc/' + link.join('+');
		if (doClean) link = link + '/clean';
		
		$.ajax({
			url	: link,
			dataType : 'JSON',
			success	: function(data) {
				if (!doClean) {
					pushBasket(data.amount, data.cost, false);
					showBasket();
				}
				else {
					pushBasket(data.amount, data.cost, true);
					$.ajax({
						url : '/ajax/getOrderForm',
						type : 'post',
						success : function( result ) {
							if( result == false ) {
								alert('Ooops, something wrong');
							}
							else {
								showOrderForm(result);
							}
						}
					});
				}
			}
		});
	}

	$('body').on('click', '#__calcToBasket', function(){
		if ( $('#basketCount').text() == '' ) {
			buyCalculation(true);
		}
		else {			
			$('#__chooseCalcBuy').remove();
			var chooseCalcBuy = $('<div>').addClass('basket_pop_up_3').attr('id', '__chooseCalcBuy').hide()
			.append(
				$('<a>').prop({'href':'javascript:void(0);'}).append(
					$('<img>').prop('src', '/tpl/img/basket_close.png').addClass('basket_close')
				).click(function(){hidePopups(false);}),
				$('<div>').addClass('basket_pop_up_3_img_wrapp').append(
					$('<img>').prop('src', '/tpl/img/num_goods_bask.png'),
					$('<span>').addClass('basket_pop_up_3_num').text(parseInt($('#basketCount').text(), 10) + ' шт.')
				),
				$('<div>').addClass('pop_up_hr'),
				$('<p>').text('В вашей корзине уже есть товары'),
				$('<div>').addClass('pop_up_hr'),
				$('<a>').text('ОЧИСТИТЬ').addClass('back').prop({'href':'javascript:void(0);'}).click(function(){buyCalculation(true); $('#__chooseCalcBuy').remove();}),
				$('<a>').text('ДОБАВИТЬ К ТЕКУЩИМ').addClass('next').prop({'href':'javascript:void(0);'}).click(function(){buyCalculation(false); $('#__chooseCalcBuy').remove();})
			);

			showPopupBg();
			onScreen.push('#__chooseCalcBuy');
			chooseCalcBuy.css('z-index', 350).appendTo('body');
			chooseCalcBuy.css({'left':($(window).width() - chooseCalcBuy.width())/2, 'top':($(window).height() - chooseCalcBuy.height())/2}).fadeIn(500);
		}
	});


	$('.serv_list li a').click(function() {
		dataPacket["hst"] = $(this).data('hst');
		showStep(1);
	});

	$('.__colorElement').on('click', function(){
		if ($(this).hasClass('form_color_active')) return ;
		$('.__colorElement').removeClass('form_color_active');
		dataPacket['color'] = $(this).data('color');
		$(this).addClass('form_color_active');
	});
	
	$('.__colorElement').first().click();

	$('#__sys90, #__sys130').on('change click', function(){
		recommendFunnelCount();
		dataPacket['st'] = $(this).val();
	});

	$('#__otvodType').on('change', function(){
		var img = $(this).find('option:selected').data('img');
		$('.__otvodTypeImg').attr('src', img);
	});

	$('#__montagType').on('change', function(){
		var img = $(this).find('option:selected').data('img');
		$('.__montagTypeImg').attr('src', img);
	});

	$('.__stepsHolder .__nextStep').click(function(){
		$('.err').empty();
		var showNext = fillFields(step);
		if (showNext)
			showStep(step + 1);
	});

	$('.__stepsHolder .__prevStep').click(function(){
		showStep(step - 1);
	});
	
	// only number + one dot
	var numReg = /([^\d\.,])/;	
	$('.__stepsHolder input[type="text"]').keypress(function(event) {
		var charCode = (event.which) ? event.which : event.keyCode;
		if ( ($(this).val().indexOf('.') != -1 || $(this).val().indexOf(',') != -1) && ('.' == String.fromCharCode(charCode) || ',' == String.fromCharCode(charCode)) ) return false;
	});
	
	$('.__stepsHolder input[type="text"]').keyup(function() {
		$(this).val( $(this).val().replace(numReg, '') );
	});
});