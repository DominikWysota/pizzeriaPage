var size = new Array(9);
var price = new Array(9);
var price_mod = new Array(9);
var pizza_name = new Array(9);
var picture = new Array(9);
var number_orders;
var a;
var ident = 0;
var final_price = 0;

$(document).ready(function(){
    $('.menu_mobile, .hide').hide();
    
    $('nav').click(function () {
		$('nav').toggleClass('active');
		$('.menu_mobile').animate({
			width: 'toggle'
		}, 300);
		$('.hide').animate({
			visibility: 'toggle'
		});
		$('body').toggleClass('stop-scrolling')
	});
    $('.shop_icon').click(function () {
		$('.shop').animate({
			left: '50%'
		}, 300);
        $('.hide').animate({
			visibility: 'toggle'
		});
        $('body').toggleClass('stop-scrolling')
	});
    $('.next').click(function () {
        if (number_orders > 0){
        $('.shop2').css({
			left: '50%'
		});
        $('.shop').css({
			left: '-50%'
		});
        }
	});
    $('.order').click(function () {
        $('.shop3').css({
			left: '50%'
		});
        $('.shop2').css({
			left: '-50%'
		});
        number_orders = 0;
        document.getElementById("number_orders").innerHTML = number_orders;
        $('.added_pizza').remove();
        final_price = 0;
        $('.final_price').html(final_price);
        $('#formularz').get(0).reset();
	});
    $('.fa-times-circle').click(function () {
		$('.shop').animate({
			left: '-50%'
		}, 300);
        $('.shop2').animate({
			left: '-50%'
		}, 300);
        $('.shop3').animate({
			left: '-50%'
		}, 300);
        $('body').removeClass('stop-scrolling');
        $('.hide').hide();
	});
    $('.fa-arrow-alt-circle-left').click(function () {
		$('.shop2').css({
            left: '-50%'
        });
        $('.shop').css({
			left: '50%'
		});
        $('#formularz').get(0).reset();
	});
    
    for(i=0; i<9; i++){
    size[i] = 0;
    price[i] = document.getElementById("price"+i).innerHTML;
    pizza_name[i] = $('h1.'+i).html();
    picture[i] = $('img.pizza_photo.'+i).attr('src');
}
    $('.minus').click(function (){
        a = parseInt($(this).attr('class').split(/\s/)[0]);
        if (size[a] > 0){
            size[a]--;
            size_pizza();
        }
    });
    $('.plus').click(function (){
        a = parseInt($(this).attr('class').split(/\s/)[0]);
        if (size[a] < 3){
            size[a]++;
            size_pizza();
        }
    });
    $('.buy').click(function (){
        //Skróć to później jakoś
        a = parseInt($(this).attr('class').split(/\s/)[0]);
        if(size[a] == 0){
            price_mod[a] = price[a];
        }
        number_orders = document.getElementById("number_orders").innerHTML;
        number_orders++;
        document.getElementById("number_orders").innerHTML = number_orders;
        buy_pizza();     
    });
    $('.shop').on("click", "i.delete_pizza", function (){
        var del = parseInt($(this).attr('class').split(/\s/)[3]);
        var x = $('.add_price.'+del).html();
        final_price = final_price - x*1;
        $('.final_price').html(final_price.toFixed(2));
        $('#'+del).remove();
        number_orders--;
        document.getElementById("number_orders").innerHTML = number_orders;
    });
});

function size_pizza(){
if (size[a] == 0){
        document.getElementById("js_size"+a).innerHTML = "Small";
        document.getElementById("price"+a).innerHTML = price[a];
        price_mod[a] = price[a];
    }
if (size[a] == 1){
        document.getElementById("js_size"+a).innerHTML = "Medium";
        document.getElementById("price"+a).innerHTML = (price[a] * 0.2 + price[a] * 1).toFixed(2);
        price_mod[a] = (price[a] * 0.2 + price[a] * 1).toFixed(2);
    }
if (size[a] == 2){
        document.getElementById("js_size"+a).innerHTML = "Large";
        document.getElementById("price"+a).innerHTML = (price[a] * 0.5 + price[a] * 1).toFixed(2);
        price_mod[a] = (price[a] * 0.5 + price[a] * 1).toFixed(2);
    }
if (size[a] == 3){
        document.getElementById("js_size"+a).innerHTML = "Party";
        document.getElementById("price"+a).innerHTML = (price[a] * 0.8 + price[a] * 1).toFixed(2);
        price_mod[a] = (price[a] * 0.8 + price[a] * 1).toFixed(2);
    }
};

function buy_pizza(){
    $('.shop').append($("<div id='empty' class='added_pizza'><img class='picture'><h2 class='pizza_name'></h2><h2 class='add_price'></h2><i class='far fa-times-circle delete_pizza'></i></div>"));
    if($('.added_pizza').is('#empty')){
        $('div#empty').children().toggleClass(''+ident);
        $('div#empty.added_pizza').attr({id:''+ident});
        $('h2.'+ident+'.add_price').html(price_mod[a]);
        $('h2.'+ident+'.pizza_name').html(pizza_name[a]);
        $('img.'+ident+'.picture').attr({src: picture[a]});
        ident++;   
    }
    final_price = final_price + price_mod[a]*1;
    $('.final_price').html(final_price.toFixed(2));
};