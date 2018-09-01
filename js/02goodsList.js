
 
  

$(function(){

	$.ajax({
		
		url:"data/01main.json",
		success : function(arr){
			console.log(arr);
			var oUl_1 = $('#row3').find('.banner').find('.nav2');
		
			for(var i = 0;i < arr.length;i++){
				$(`<li class="li_1">
					<p>${arr[i].title}</p>
					<span>${arr[i].child_1[0]}</span><span>${arr[i].child_1[1]}</span><span>${arr[i].child_1[2]}</span>
				</li>`).appendTo(oUl_1);
			
				
			}
			for(var i = 0;i < arr.length;i++){
				$(`<ol class="child"></ol>`).appendTo(oUl_1);
				var oOl_1 = oUl_1.find('.child').eq(i);

				for(var j = 0;j < arr[i].child_2.length;j++){
					$(`<div><h3>${arr[i].child_2[j].title_2}</h3></div>`).appendTo(oOl_1);
					var oOldivs = oOl_1.find('div').eq(j);
					for(var k = 0; k < arr[i].child_2[j].child_3.length; k++){
						$(`<span>${arr[i].child_2[j].child_3[k]}</span>`).appendTo(oOldivs);
					}
				} 

			}
			
			 
		},
		error: function(msg){
			console.log(msg);
		}
	
	});



	var oUl_1 = $('#row3').find('.banner').find('.nav2');
	$('#nav .nav1 .li-1').mouseover(function(){
		oUl_1.css('display','block');
	});
	//菜单移入效果
	oUl_1.on({
		mouseenter:function(){
			
			console.log(this);
			oUl_1.find('li').attr('class','');
			oUl_1.find('ol').css('display','none').eq($(this).index()).css('display','block');
			$(this).attr('class','menu');
		},
		mouseleave:function(){
			console.log(222);
			oUl_1.find('ol').css('display','none');

		}

	},"li");

	oUl_1.on({
		mouseenter:function(){
			$(this).css('display','block');
			oUl_1.css('display','block');
		},
		mouseleave:function(){
			oUl_1.find('ol').css('display','none');
		}
	},"ol");
	
	oUl_1.on({
		mouseenter : function(){
			$(this).css({'color':'red','cursor':'pointer'});
		},
		mouseleave : function(){
			$(this).css({'color':'#666'});
		},
		click : function(){
			window.location = "02goodsList.html"
		}
	},'span');
	$('#top .top1').on({
		mouseenter : function(){
			$(this).css({'color':'red','cursor':'pointer'});
		},
		mouseleave : function(){
			$(this).css({'color':'#666'});
		}
	},'li a');	
	
	
})
 

$(function(){
	$.ajax({
		url : "data/02goodsList.json",
		success : function(arr){
			console.log(arr);
			var oUl_4 = $('#row4 .div-center .goods-left .nav-3 ul');
			var oUl_list1 = $('#row4 .div-center .goods-right .right-list');
			for(var i = 0; i < arr[0].class.length; i++){
				$(`<li><a href="javascript:;">${arr[0].class[i]}</a></li>`).appendTo(oUl_4);
			
			}
			for(var k = 1;k <= arr.length; k++){
				$(`<li>
						<h3>${arr[k].title}</h3>
						<p></p>
				</li>`).appendTo(oUl_list1);
				var oP_list = oUl_list1.find('p').eq(i - 1);
				for(var j = 0;j < arr[k].class.length;j++){
					$(`<span>${arr[k].class[j]}</span>`).appendTo(oP_list);
				}
			}

		}
	});

	ajax(0);

	function ajax(n){
		$.ajax({
			url : "data/02goodsList-2.json",
			success : function(arr){
				console.log(arr,2);
				var oDivGoods = $('#goods');
				for(var i = 0;i < arr[n].class.length; i++){
					$(`<dl class="goods-particulars-1">
								<dt><img src="images/${arr[n].class[i].img}" alt=""></dt>
								<dd>
									<h4>${arr[n].class[i].title_2}</h4>
									<p class="p_1">${arr[n].class[i].merit}</p>
									<p class="p_2"><span>${arr[n].class[i].price}</span><span>${arr[n].class[i].state}</span></p>
									<a href="javascript:;" class="add_cart" id="${arr[n].class[i].id}">加入购物车</a>
									<p class="p_3">${arr[n].class[i].comment}条评论</p>
								</dd>
							</dl>`).appendTo(oDivGoods);
				}
			}
		})
	}
	var oBtn_list = $('.goods-right .goods-lists-1 .right-btn');
	//点击综合按钮
	oBtn_list.eq(0).click(function(){
		var oDivGoods = $('#goods');
		oDivGoods.html('');
		oBtn_list.css('border','1px solid #cecfce').eq($(this).index()).css('border-color','red');
		ajax(0);
	})

	//点击销量按钮
	oBtn_list.eq(1).click(function(){
		var oDivGoods = $('#goods');
		oDivGoods.html('');
		oBtn_list.css('border','1px solid #cecfce').eq($(this).index()).css('border-color','red');
		ajax(1);
		
	})
	//点击价格按钮
	oBtn_list.eq(2).click(function(){
		var oDivGoods = $('#goods');
		oDivGoods.html('');
		oBtn_list.css('border','1px solid #cecfce').eq($(this).index()).css('border-color','red');
		ajax(2);
		/*$.ajax({
			url : "02goodsList-2.json",
			success : function(arr){
				console.log(arr,2);
				var oDivGoods = $('#goods');
				for(var i = 0;i < arr[2].class.length; i++){
					$(`<dl class="goods-particulars-1">
						<dt><img src="images/${arr[2].class[i].img}" alt=""></dt>
						<dd>
							<h4>${arr[2].class[i].title_2}</h4>
							<p class="p_1">${arr[2].class[i].merit}</p>
							<p class="p_2"><span>${arr[2].class[i].price}</span><span>${arr[2].class[i].state}</span></p>
							<a href="javascript:;" id="${arr[2].class[i].id}">收藏</a>
							<p class="p_3">${arr[2].class[i].comment}条评论</p>
						</dd>
					</dl>`).appendTo(oDivGoods);
				}
			}
		})*/
	})

	//移入产品边框阴影效果
	var oDivGoods = $('#goods');
	oDivGoods.on({
		mouseover : function(){
			// console.log(111);
			$(this).css({"border":"1px solid #ccc","box-shadow":"1px 5px 5px #ccc"});
		},
		mouseout : function(){
			// console.log(222);
			$(this).css({"border":"1px solid #fff","box-shadow":"0 0 0 0","border-bottom":"1px solid #ccc"});
		}
	},".goods-particulars-1");

	//点击产品图片
	$('#row4 .div-center .goods-right .goods-lists-1 #goods').on('click','.goods-particulars-1 dt',function(){
	
		window.location = "03goods-particular.html";
	})

	sc_car();
	//加入购物车
	$('#goods').on('click','.add_cart',function(){
		ballMove(this);
		var id = this.id;
		//1、判断是否第一次添加cookie
		var first = $.cookie("goods") == null ? true : false;
		if(first){
			$.cookie('goods', `[{id:${id},num:1}]`, {expires: 7});
		}else{
			//2、判断之前是否添加过该商品
			var str = $.cookie('goods');
			var arr = eval(str);
			var same = false; //假设没有相同的数据
			for(var i = 0; i < arr.length; i++){
				if(arr[i].id == id){
					//之前添加过
					arr[i].num++;
					var cookieStr = JSON.stringify(arr);
					$.cookie('goods', cookieStr, {expires: 7});
					same = true;
					break;
				}
			}

			if(!same){
				//之前没添加过
				var obj = {id: id, num: 1};
				arr.push(obj);
				var cookieStr = JSON.stringify(arr);
				$.cookie('goods', cookieStr, {expires: 7});
			}
			
		}
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

	//抛物线运动
	function ballMove(startNode){
		
		$("#ball").css({
			left: $(startNode).offset().left,
			top: $(startNode).offset().top,
			display: "block"
		})

		var offsetX = $("#quick-links #cart_num").offset().left - $("#ball").offset().left;
		var offsetY = $("#quick-links #cart_num").offset().top - $("#ball").offset().top;
		
		//配置参数
		var bool = new Parabola({
			el: "#ball",
			targetEl: null,
			offset: [offsetX, offsetY],
			curvature: 0.0005,
			duration: 1000,
			callback:function(){
				$("#ball").css('display', 'none');
				sc_car();
			}
		})

		bool.start();
	}


})

$(function(){
	var oUl_links = $('#quick-links .quick-right .links-2');
	//侧边栏移入移出效果
	oUl_links.on({
		mouseover : function(){
			console.log('移入');

			$(this).next('.links-tips').css({'display':"block","left":"-111px"}).stop().animate({
				"left":"-92"
			},600)
		},
		mouseout : function(){
			console.log('移出');
			$(this).next('.links-tips').css({'display':"none","left":"-111px"});
		}
	},'a')

})


