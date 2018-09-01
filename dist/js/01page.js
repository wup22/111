
$(function(){
	/*
		实现循环滚动窗口
		我们需要在所有图片的末尾，添加第一张图片

	 */	
	//1、找到当前页面上所有数字按钮
	var aBtns = $(".banner-1").find(".ul-1").find("div");
	var oUl = $(".banner-1").find(".banner-child");
	var aLis = oUl.find("li");
	//2、设置iNow，代表当前要显示的图片的下标
	var iNow = 0;
	var timer = null; //记录定时器的标识

	aBtns.click(function(){
		//点击按钮的时候，获取当前要切换的图片的下标
		iNow = $(this).index();
		//切换图片
		tab();
		
	});

	function tab(){
		//既要切换按钮，还要切换图片
		aBtns.attr('class', '');
		aBtns.eq(iNow).attr("class", 'active');

		oUl.stop().animate({top: -320 * iNow}, 500, function(){

			//第六张图片运动结束的时候，直接切回第一张图片
			if(iNow == aBtns.size()){
				oUl.css('top', 0);
				iNow = 0;
			}
		});
	};

	function timerFunc(){
		iNow++;
		// document.title = iNow;
		tab();

		//对当前iNow的值进行判断
		if(iNow == aBtns.size()){
			aBtns.eq(0).attr('class', 'active');
		}
	};


	timer = setInterval(timerFunc, 2000);

	oUl.hover(function(){
		clearInterval(timer);
	}, function(){
		timer = setInterval(timerFunc, 2000);
	});

}); 
  

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
	
	oUl_1.on({
		mouseover:function(){
			// console.log(this);
			oUl_1.find('li').attr('class','');
			oUl_1.find('ol').css('display','none').eq($(this).index()).css('display','block');
			$(this).attr('class','menu');
		},
		mouseout:function(){
			// console.log(222);
			oUl_1.find('ol').css('display','none');
		}

	},"li");
	$('#row3 .banner').on({
		mouseover:function(){
			$(this).css('display','block');
		},
		mouseout:function(){
			oUl_1.find('ol').css('display','none');
		}
	},"ol");
	
	oUl_1.on({
		mouseover : function(){
			$(this).css({'color':'red','cursor':'pointer'});
		},
		mouseout : function(){
			$(this).css({'color':'#666'});
		},
		click : function(){
			window.location = "02goodsList.html"
		}
	},'span');
	$('#top .top1').on({
		mouseover : function(){
			$(this).css({'color':'red','cursor':'pointer'});
		},
		mouseout : function(){
			$(this).css({'color':'#666'});
		}
	},'li a');
	
	 sc_car();
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
 

$(function(){
	$.ajax({
		url : 'data/01main-2.json',
		success : function(arr){
			console.log(arr);
			var oGoods = $('#row4 .good-goods');
			var oList1 = $('#row5 .goods-list-1 .list-1-right');
			for(var i = 0; i < arr[0].class.length; i++){
				$(`<dl class="goods-list">
					<dt><img src="images/${arr[0].class[i].img}" alt="眼镜"></dt>
					<dd>
						<h5>${arr[0].class[i].title}</h5>
						<span>${arr[0].class[i].price}</span><span>降价</span><br/>
						<i>999评论</i><em>|</em><i>88%好评</i>
					</dd>
				</dl>`).appendTo(oGoods);
			
			}
			for(var j = 0;j < arr[1].class.length; j++){
				$(`<dl class="list-1-dl">
					<dt><img src="images/${arr[1].class[j].img}" alt=""></dt>
					<dd>
						<h5>${arr[1].class[j].title}</h5>
						<span>${arr[1].class[j].price}</span><span>降价</span>
					</dd>
				</dl>`).appendTo(oList1);
			}

		}
	})
})

$(function(){
	var oUl_links = $('#quick-links .quick-right .links-2');
	
	oUl_links.on({
		mouseover : function(){
			$(this).next('.links-tips').css({'display':"block","left":"-111px"}).stop().animate({
				"left":"-92"
			},600)			
		},
		mouseout : function(){
		
			$(this).next('.links-tips').css({'display':"none","left":"-111px"});
		}
	},'a')
	oUl_links.on({
		mouseover : function(){
			$(this).css('display','block');
		},
		mouseout : function(){
			$(this).css('display','none');
		}
	},'.links-tips')

})
