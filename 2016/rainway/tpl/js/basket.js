	
var	bgInited = false,
	onScreen = []
;


var busketCounter = $('#basketCount');
var priceCont = $('.top_price_holder');
var heBoughtNothing = function() {
	busketCounter.hide();
	priceCont.hide();
}
var heBoughtSomething = function() {
	busketCounter.show();
	priceCont.show();
}
if (busketCounter.html() == 0) heBoughtNothing();

function number_format(number, decimals, dec_point, thousands_sep) {
	number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number,
	prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
	sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
	dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
	s = '',
	toFixedFix = function(n, prec) {
	  var k = Math.pow(10, prec);
	  return '' + (Math.round(n * k) / k).toFixed(prec);
	};

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
	s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
	s[1] = s[1] || '';
	s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

function pushBasket( addNum, addPrice, doClean ) {
	var totalBasket = 0;
	if (!doClean)
	{
		totalBasket = parseInt($('#basketCount').text(), 10);
		if (isNaN(totalBasket)) totalBasket = 0;
	}

	totalBasket += parseInt( addNum, 10 );
	$('#basketCount').text('+' + totalBasket);

	var totalSum = parseFloat( $('#__basketTotalCost').text() );
	totalSum += parseFloat( addPrice );
	$('#__basketTotalCost').text( number_format(totalSum, 2, '.', ''));
	liveBasket();
	heBoughtSomething();
}

function liveBasket() {
	var totalBasket = parseInt($('#basketCount').text(), 10);
	if( totalBasket <= 0 ) {
		$('#basketCount').text('');
	}
}


function hidePopups(keepBg)
{
	$.each( onScreen, function( el1, el2){
		if ($(el2).length)
			$(el2).css('z-index', -50).hide();
	  } );
	if (!keepBg)
		$('#shadowBg').css('z-index', -50).hide();
	onScreen = [];
}

function showPopupBg()
{
	if (!bgInited)
	{
		$('#shadowBg').css({
			'backgroundColor' : '#000',
			'opacity' : 0.8,
			'display' : 'none',
			'position' : 'absolute',
			'top' : 0,
			'left' : 0,
			'overflow' : 'hidden',
			'z-index' : 50
		})
		.click(function(){
			hidePopups();
		});
		bgInited = true;
	}

	$('#shadowBg')
		.width($(document).width())
		.css({'z-index':300, 'height' : '100%', 'width' : '100%'})
	$('#shadowBg').show();
}

$('body').on('click', '.__closeBasket', function(){
	hidePopups();
});

function showBasket()
{
	if (typeof inBasket !== 'undefined' && inBasket == true) return ;

	showPopupBg();
	if ($('#__sBasket').length) $('#__sBasket').remove();
	$.ajax({
		url : '/ajax/popupBasket/',
		success : function( result ) {
			if( result === false ) {
				alert("Что-то не так...");
			}
			else {
				onScreen.push('#__sBasket');
				$('<div>')
					.attr({'id':'__sBasket', 'class':'basket_container'})
					.append(result)
					.appendTo('body');
				$('html, body').animate({scrollTop: 0}, 750);
				$('#shadowBg').height( $(document).height() );
			}
	} });
}

function showOrderForm(hmtlForm)
{
	$('html, body').animate({scrollTop: 0}, 750);
	showPopupBg();
	hidePopups(true);
	onScreen.push('#__orderPopup');
	$('body').append(hmtlForm);
	$('body').find('#__orderPopup .offer_tabs :radio').first().click();
	$('#shadowBg').height( $(document).height() );
}

function showBasketPopup() {
	$('.basket_pop_up_2').remove();
	var txtPopup = $('<div>')
		.addClass('basket_pop_up_2')
		.html('<img src="/tpl/img/pl_goods_bask.png" alt=""><p>Товар добавлен в корзину</p>')
	.appendTo('body');
	
	txtPopup.css({'left':($(window).width() - txtPopup.width())/2, 'top':($(window).height() - txtPopup.height())/2}).fadeOut(2000);
	
}

$( function() {
	$('#basketCount').live( 'change', liveBasket );
	liveBasket();
	
	$('.__cart').click( function(evt){
		evt.preventDefault();
		evt.stopPropagation();
		
		var cost = $(this).data('price');
		cost = parseFloat(cost);
		if( isNaN(cost) ) return false;
		
		var oId = $(this).data('product');
		if (colorNeeded == false) idColor = 0;
		else {
			var idColor = parseInt($(this).data('color'), 10);
			if( isNaN(idColor) ) {
				alert('Не указан цвет');
				return false;
			}
		}
		
		var quant = 1;
		if ( $('.__buyAmount').length && !isNaN( parseInt($('.__buyAmount').one().val()) )) 
		{
			quant = parseInt($('.__buyAmount').one().val());
		}

		$.ajax({
			url : '/ajax/addToCart/',
			type : 'post',
			data : { amount: quant, product: oId, color: idColor },
			success : function( result ) {
				if( result === false ) {
					alert("Что-то не так...");
				}
				else {
					result = $.parseJSON(result);
					if (result.error != undefined )
					{
						alert(result.error);
					}
					else 
					{
						pushBasket( result.amount, result.cost );
						showBasketPopup();
					}
				}
		} });

	} );

	$('#basketPopup').click(showBasket);
	
	$('body').on('click', '.__minus_cart', function(){
		var input = $(this).parent().find('.__inputAmount');		
		var val = parseInt(input.val());
		if (val == 1) return;
		
		input.val(val-1).trigger('keyup');;
	});
	
	$('body').on('click', '.__plus_cart', function(){
		var input = $(this).parent().find('.__inputAmount');		
		var val = parseInt(input.val());
		input.val(val+1).trigger('keyup');
	});
	
	var timeOutBasketKeyPress = false;
	$('body').on('keyup', '.__inputAmount', function() {
		var _this = $(this);
		orderId = parseInt(_this.data('id'));
		container = $('#order_' + orderId);
		newAmount = parseInt(_this.val());
		prevValue = parseInt(_this.data('prev'));
		
		clearTimeout(timeOutBasketKeyPress);
		timeOutBasketKeyPress = setTimeout(function() {
			changeAmount(orderId, prevValue, newAmount, _this);
		}, 500);
	});
	
	var finalSummStart, container, prevValue, qField, orderId, newAmount, direction, itemPrice, finalProdPrice, pushAmount;

	var changeAmount = function(orderId, prevValue, newAmount, _this) {
		if (prevValue == newAmount || !newAmount || newAmount <= 0) {
			_this.val(prevValue).blur();
			return;
		}
		_this.prop('disabled', true);
		finalProdPrice = container.find('.__totalItemSum');
		itemPrice = _this.data('price');
		$.ajax({
			url : '/ajax/changeAmount/',
			type : 'post',
			data : {
				orderId : orderId,
				newAmount: newAmount
			},
			success : function(result) {
				if (!result) {
					alert('Ooops, something wrong');
				}
				else {
					pushAmount = newAmount - prevValue;
					pushPrice = pushAmount * itemPrice;
					pushBasket(pushAmount, pushPrice);

					finalProdPrice.html( number_format(newAmount*itemPrice, 2, '.', '') );
					_this.prop('disabled', false);
					_this.data('prev', newAmount);
				}
			}
		});
		return;
	}

	$('body').on('keyup', '.__buyAmount', function(){
		if ($('#__curProdPrice').length) {
			$('#__curProdPrice').text( number_format( $('#__curProdPrice').data('orig') * $(this).val(), 2, '.', '' ) );
		}
	});
	
	$('body').on('click', '.__minus_prod', function(){
		var input = $(this).parent().find('.__buyAmount');		
		var val = parseInt(input.val());
		if (val == 1) return;
		
		input.val(val-1).trigger('keyup');
	});
	
	$('body').on('click', '.__plus_prod', function(){
		var input = $(this).parent().find('.__buyAmount');		
		var val = parseInt(input.val());
		input.val(val+1).trigger('keyup');		
	});
	
	$('body').on('click', '.__pickColor', function(evt) {
		$(this).parent().find('.__colorPickBlock').stop().slideToggle();
	});
	
	$('body').on('click', '.__basketColorChange', function(evt) {
		var cur = $(this).parent().data('cur');

		if (cur == $(this).data('color')) {
			$(this).parent().stop().slideToggle();
			return ;
		}

		$.ajax({
			url : '/ajax/changeColor/',
			type : 'post',
			data : { idOrder : $(this).data('ido'), color : $(this).data('color') },
			success : function( result ) {
				if( result === false ) {
					alert('Ooops, something wrong');
				}
				else {
					showBasket();
				}
			}
		});
	});

	// only number
	var phoneNumReg = /([^\d])/;
	$('body').on('change', '#form_tel', function(event) {
		$(this).val( $(this).val().replace(phoneNumReg, '') );
	});
	
	$('body').on('click', '#__processOrder', function(){
		if ($('#__orderPopup').length) $('#__orderPopup').remove();
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
	});
	
	$('body').on('click', '.offer_tab :radio', function(){		
		$('.__orderRadioHolder :radio').prop('disabled', false);
		
		if( $(this).val() == 'new_poshta') {
			$('#pay_type_cash').prop('disabled', true);
		}
		else if( $(this).val() == 'self') {
			$('#pay_type_cod').prop('disabled', true);
		}
		
		if ($('.__orderRadioHolder :radio:checked').is(':disabled') || $('.__orderRadioHolder :radio:checked').length == 0)
			$('.__orderRadioHolder :radio:not([disabled])').first().click();		
	});
	
	$('body').on('submit', '#form_offer', function(){
		return false;
	});
	
	$('body').on('click', '#confirmOrder', function(){
		$('.__order_errors').empty();
		$('#__orderPopup .input_error').removeClass('input_error');

		if ( $('#form_tel').val().length < 7 ) {
			$('#phone_err').html('Укажите контактный телефон');
			$("#form_tel").addClass("input_error");
			return false;
		}
		
		if ( $('#delivery_type_new_poshta').is(':checked') && $('#delivery_address').val().length < 5 ) {
			$('#delivery_address').addClass("input_error");
			$('#address_err').html('Укажите адрес доставки');
			return false;
		}
		
		$.ajax({
			type	: 'POST',
			url		: '/ajax/doOrder',
			data	: $('#form_offer').serialize(),
			success	: function(data) {
				data = $.parseJSON(data);
				if (data.status == 'ok') {
					$('html, body').animate({scrollTop: 0}, 750);
					$('body').find('#__orderPopup').empty().addClass("offer_ok").html(data.html);
					
					if (typeof data.gaHead != 'undefined' && typeof data.gaSub != 'undefined')
					{
						if (typeof _gaq == 'object')
						{
							_gaq.push(['_addTrans',
								data.gaHead['ord'],
								data.gaHead['name'],
								data.gaHead['total']
							]);
							
							for (var i = 0; i <= data.gaSub.length; i++)
							{		
								_gaq.push(['_addItem',
									data.gaSub[i]['ord'],
									data.gaSub[i]['id'],
									data.gaSub[i]['name'],
									data.gaSub[i]['type'],
									data.gaSub[i]['price'],
									data.gaSub[i]['amount']
								]);
							}
						}
						pushBasket(0, 0, true);
					}
					return false;
				}
				else {
					$('body').find('.order_errors').html(data.html);
					return false;
				}
			}
		});
		
		return false;
	});
	
	$('body').on('click', '.__removeOrder', function(evt) {
		evt.preventDefault();
		var idO = ( ( $(this).attr('id') ).split('_') ).pop();

		$.ajax({
			url : '/ajax/removeOrder/',
			type : 'post',
			data : { idOrder : idO },
			success : function( result ) {
				if( result === false ) {
					alert('Ooops, something wrong');
				}
				else {
					result = $.parseJSON(result);
					pushBasket( -result.amount, -result.cost );
					$('#order_' + idO + ' td').fadeOut( 'slow', function(){ $(this).remove(); });

					if( parseInt( $('#basketCount').text(), 10) == 0 ) {
						window.location.reload();
					}
				}
			}
		});
	});
});