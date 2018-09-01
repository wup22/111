$(function(){

	sc_car();
	//获取页面所需元素
	var oBigBox = $('#row4 .box_1 .goods-img .goods-img-left .goods-md-img-box');
	
	//获取遮罩
	var oMark = $("#row4 .box_1 .goods-img .goods-img-left .goods-md-img-box .mark");
	//获取滑块
	var oFloat = $("#row4 .box_1 .goods-img .goods-img-left .goods-md-img-box .float_layer");
	//获取大图盒子
	var oBigPic = $("#row4 .box_1 .goods-img .goods-img-right");
	//获取大图
	var oBigImg = $("#row4 .box_1 .goods-img .goods-img-right .goods-lg-img");
	console.log(oBigBox,1);
	console.log(oMark,2);
	console.log(oFloat,3);
	console.log(oBigPic,4);
	console.log(oBigImg,5);

	//给遮罩添加移入事件，滑块和大图所在的盒子显示
	oMark.mouseover(function(){
		// console.log('移入遮罩');
		oFloat.css('display','block');
		oBigPic.css('display','block');
	})

	
	//给遮罩添加移出事件，滑块和大图所在的盒子隐藏
	oMark.mouseout(function(){
		// console.log('移出遮罩');
		oFloat.css('display','none');
		oBigPic.css('display','none');
	})

	
	//给遮罩添加移动事件，实现滑块跟随并设置边界
	oMark.mousemove(function(event){
		// console.log('鼠标跟随');
		var left = event.pageX - oBigBox.offset().left - oMark.position().left - oFloat.width() / 2;
		var top = event.pageY - oBigBox.offset().top - oMark.position().top - oFloat.height() / 2;
		// console.log(oMark.offset().top);
		// console.log(left,top);
		if(left <= 0){
			left = 0;
		}else if(left >= oMark.width() - oFloat.width()){
			left = oMark.width() - oFloat.width();
		}
		if(top <= 0){
			top = 0;
		}else if(top >= oMark.height() - oFloat.height()){
			top = oMark.height() - oFloat.height();
		}
		
		oFloat.css({"left":left,"top":top});
		//滑块移动比例
		var pX = left / (oMark.width() - oFloat.width());
		var pY = top / (oMark.height() - oFloat.height());
		//设置大图坐标值
		var BX = - pX * (oBigImg.width() - oBigPic.width());
		var BY = - pY * (oBigImg.height() - oBigPic.height());
		oBigImg.css({"top":BY,"left":BX});
	})


	/*$('#goods-btn-cart').click(function(){
		$('#cart-num').html();

	});*/

	var oGoodsSmImg = $('#row4 .box_1 .goods-sm-img-box .goods-sm-img');
	// alert(oGoodsSmImg.find('img').attr('src'));
	oGoodsSmImg.click(function(){
		oGoodsSmImg.css('border','1px solid #cecfce').eq($(this).index()).css('border-color','red');
		var $src = oGoodsSmImg.find('img').eq($(this).index()).attr('src');
		oBigBox.find('img').attr('src','');
		oBigBox.find('img').attr('src',$src);
		oBigImg.find('img').attr('src','');
		oBigImg.find('img').attr('src',$src);
	})

	//减号
	$('#row4 .box_1 .goods-right .num .minus').click(function(){
		var num = $('#goods-num').val();
		num--;
		if(!/^\d+$/.test(num)){
			num = 1;				
		}
		if(num > 0){$('#goods-num').val(num);}		
	})
	//加号
	$('#row4 .box_1 .goods-right .num .pius').click(function(){
		var num = $('#goods-num').val();
		num++;
		
		if(!/^\d+$/.test(num)){
			num = 1;					
		}	
		$('#goods-num').val(num);		
	})

	$('#goods-num').blur(function(){
		var num = $(this).val();
		if(!/^\d+$/.test(num)){
			num = 1;					
		}
		$(this).val(num);	
	})
	$('#goods-btn-cart').click(function(){
		
	})



	// 购物车数字
	function sc_car(){
		var str = $.cookie("goods");
		if(str){
			var arr = eval(str);
			var sum = 0;
			for(var i = 0; i < arr.length; i++){
				sum += arr[i].num;
			}
			$("#cart_num").html(sum);
			$("#cart_num_1").html(sum);
		}
	}

})