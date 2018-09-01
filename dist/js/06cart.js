$(function(){

	sc_msg();

	//显示购物车内商品
	function sc_msg(){
		$.ajax({
			url: 'data/02goodsList-2.json',
			success: function(arr){
				var $Lis = $("#center_cart .center_cart .list");
				$Lis.html("");
				//在所有商品信息里面找出，加入购物车的商品信息
				var cookie_arr = eval($.cookie('goods'));
				console.log(cookie_arr);
				// console.log(arr);
				//布局
				for(var i = 0; i < cookie_arr.length; i++){
					for(var j = 0;j < arr.length;j++){
						for(var k = 0; k < arr[j].class.length;k++){
							if(cookie_arr[i].id == arr[j].class[k].id){
								$(`<li class="li_1">
									<div class="cart_img"><img src="images/${arr[j].class[k].img}" alt=""></div>
									<div class="goods_title"><span>${arr[j].class[k].title_2}</span></div>
									<div class="price"><span>${arr[j].class[k].price}</span></div>
									<div class="goods_num">
										<button class="minus">-</button>
										<input class="goods_sum" type="text" value="${cookie_arr[i].num}">
										<button class="plus">+</button>
									</div>
									<div class="money"><span>￥${cookie_arr[i].num * (arr[j].class[k].price.substring(1)*10)/10}</span></div>
									<div class="delete"><span>删除</span></div>
									
								</li>`).appendTo($Lis);
							}
						}
					}

				}
				//商品总数
				$('#center_cart .center_cart .footer').find('.footer-sum').find('i').html(footerSum());
				//商品总金额
				$('#center_cart .center_cart .footer').find('.footer-money').find('i').html(footerMoney());
				//减号
				$('#center_cart .center_cart .list .li_1 .goods_num .minus').click(function(){
					// console.log(cookie_arr);
					if(cookie_arr[$(this).parents('.li_1').index()].num > 1){
						cookie_arr[$(this).parents('.li_1').index()].num--;
						$(this).next().val(cookie_arr[$(this).parents('.li_1').index()].num);
						for(var j = 0;j < arr.length;j++){
							for(var k = 0; k < arr[j].class.length;k++){
								if(cookie_arr[$(this).parents('.li_1').index()].id == arr[j].class[k].id){
									$(this).parent().next('.money').find('span').html(`￥${cookie_arr[$(this).parents('.li_1').index()].num * (arr[j].class[k].price.substring(1)*10)/10}`)
								}
							}
						}

					}
					var cookieStr = JSON.stringify(cookie_arr);
					//重新设置cookie
					$.cookie('goods',cookieStr,{expires : 7});
					//商品总数
					$('#center_cart .center_cart .footer').find('.footer-sum').find('i').html(footerSum());
					//商品总金额
					$('#center_cart .center_cart .footer').find('.footer-money').find('i').html(footerMoney());
				})
				//加号
				$('#center_cart .center_cart .list .li_1 .goods_num .plus').click(function(){
					// console.log(cookie_arr);
					if(cookie_arr[$(this).parents('.li_1').index()].num >= 1){
						cookie_arr[$(this).parents('.li_1').index()].num++;
						$(this).prev().val(cookie_arr[$(this).parents('.li_1').index()].num);

						for(var j = 0;j < arr.length;j++){
							for(var k = 0; k < arr[j].class.length;k++){
								if(cookie_arr[$(this).parents('.li_1').index()].id == arr[j].class[k].id){
									$(this).parent().next('.money').find('span').html(`￥${cookie_arr[$(this).parents('.li_1').index()].num * (arr[j].class[k].price.substring(1)*10)/10}`);
								}
							}
						}
					}
					//重新设置cookie
					var cookieStr = JSON.stringify(cookie_arr);
					$.cookie('goods',cookieStr,{expires : 7});
					//商品总数
					$('#center_cart .center_cart .footer').find('.footer-sum').find('i').html(footerSum());
					//商品总金额
					$('#center_cart .center_cart .footer').find('.footer-money').find('i').html(footerMoney());
				})

				//删除商品+cookie
				$('#center_cart .center_cart .list .li_1 .delete span').click(function(){
				
					cookie_arr.splice($(this).parents('.li_1').index(),1);
					// console.log(cookie_arr);
					var cookieStr = JSON.stringify(cookie_arr);
					//重新设置cookie
					$.cookie('goods',cookieStr,{expires : 7});
					$(this).parents('.li_1').remove('.li_1');
					//商品总数
					$('#center_cart .center_cart .footer').find('.footer-sum').find('i').html(footerSum());
					//商品总金额
					$('#center_cart .center_cart .footer').find('.footer-money').find('i').html(footerMoney());
					
				})

				

				//移入移出 删除按钮
				$('#center_cart .center_cart .list .li_1 .delete span').on({
					mouseover : function(){
						$(this).css('color','red');
					},
					mouseout : function(){
						$(this).css('color','#333');
					}
				})
			}
		})
		//点击商品图片
		$('#center_cart .center_cart .list').on('click','.cart_img',function(){
			window.location = "03goods-particular.html";
		})
		//移入、移出、点击 标题效果
		$('#center_cart .center_cart .list').on({
			mouseover : function(){
				$(this).find('span').css({'color':'red','cursor':'pointer'});
			},
			mouseout : function(){
				$(this).find('span').css('color','#333');
			},
			click : function(){
				window.location = "03goods-particular.html";
			}
		},'.goods_title')

		//商品总数函数
		function footerSum(){
			var cookie_arr = eval($.cookie('goods'));
			var sum = 0;
			for(var i = 0;i < cookie_arr.length;i++){
				sum += cookie_arr[i].num;
			}
			return sum;
		}
		//商品总金额函数
		function footerMoney(){
			var cookie_arr = eval($.cookie('goods'));
			var money = 0;
			for(var i = 0;i < cookie_arr.length;i++){
				var num = parseFloat($('#center_cart .center_cart .list .li_1').eq(i).find('.money').find('span').html().substring(1));

				money += num;
			}
			console.log(num);
			console.log(typeof num);
			return '￥' + money;
		}
	}
})