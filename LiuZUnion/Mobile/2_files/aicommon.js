jQuery(document).ready(function($) {
	// var _globalKey = "CATEGORY:LIST:NEW";
	//var _globalKey = "CATEGORY:LIST:NEWXX";
	//var _globalKey = "CATEGORY:LIST:NEWXXX";
	var _globalKey = "CATEGORY:LIST:NEWXXXX";
	function setCookie(name,value) {
		var Days = 30*24;
		var exp = new Date();
		var domain
		exp.setTime(exp.getTime() + Days*24*60*60*1000);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
		// document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/;domain=.sznews.com";
	}

	function getCookie(name) {
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		if(arr != null)
			return unescape(arr[2]);
		return null;
	}

	function deleteCookie(name){
		var date=new Date();
		date.setTime(date.getTime()-10000);
		document.cookie=name+"=v; expire="+date.toGMTString();
	}

		/** 
	函数名称：getCookie 
	函数功能：获取指定名称的cookie的值 
	输入参数：需要测试的字符串 
	返回参数： 
	*/  
	function getSSOCookie(name)  
	{  
	    var arrStr = document.cookie.split("; ");  
	    for(var i = 0;i < arrStr.length;i ++){  
	        var temp = arrStr[i].split("=");  
	        if(temp[0] == name) {  
	          return unescape(temp[1]);  
	        }  
	    }  
	    return "";  
	}  
	/** 
	函数名称：addCookie 
	函数功能：添加cookie 
	输入参数：需要测试的字符串 
	返回参数： 
	*/  
	function addSSOCookie(name,value)  
	{  
	    var Days = 30*24;
		var exp = new Date();
		var domain
		exp.setTime(exp.getTime() + Days*24*60*60*1000);
		// document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+"; path=/; domain=.sznews.com";
	}  
	  
	/** 
	函数名称：delCookie 
	函数功能：删除cookie 
	输入参数：需要测试的字符串 
	返回参数： 
	*/  
	/*function delCookie()  
	{//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间  
	    var date =  new  Date();  
	    date.setTime(date.getTime() - 10000);  
	    document.cookie = "sso" + "=a; expires=" + date.toGMTString()+"; path=/";  
	}  */
	/*function getCookie(c_name) {  
		if (document.cookie.length>0)  
		{  
		c_start=document.cookie.indexOf(c_name + "=");  
		if (c_start!=-1)  
		{   
		c_start=c_start + c_name.length+1 ;  
		c_end=document.cookie.indexOf(";",c_start);  
		if (c_end==-1) c_end=document.cookie.length;  
		return unescape(document.cookie.substring(c_start,c_end));  
		}   
		}  
		return "";  
	}  */
	jQuery.extend({
        getURLParam: function(href,strParamName) {
             var strReturn = "";
             var strHref = href?href:document.location.href;
             var bFound = false;
             var cmpstring = strParamName + "=";
             var cmplen = cmpstring.length;

             if (strHref.indexOf("?") > -1){
                 var strQueryString = strHref.substr(strHref.indexOf("?") + 1);
                 var aQueryString = strQueryString.split("&");
                 for (var iParam = 0; iParam < aQueryString.length; iParam++){
                     if (aQueryString[iParam].substr(0, cmplen) == cmpstring){
                         var aParam = aQueryString[iParam].split("=");
                         strReturn = aParam[1];
                         bFound = true;
                         break;
                     }
                 }
             }
             if (bFound == false) return null;
             return strReturn;
         }
     });

	/*************************begin  频道栏目设置  begin*******************************/
	//删除当前所有的大区
	$("div.menu-list:not(:first)").remove();

	//添加推荐
	var lis_1 = '';
	lis_1+='<li data-type="1"><a href="http://m.sznews.com/node_226141.htm?chanid=226141">深圳</a></li>';
	lis_1+='<li data-type="1"><a href="http://m.sznews.com/node_226143.htm?chanid=226143">焦点</a></li>';
	lis_1+='<li data-type="1"><a href="http://m.sznews.com/node_226144.htm?chanid=226144">图片</a></li>';
	lis_1+='<li data-type="1"><a href="http://m.sznews.com/node_237702.htm?chanid=237702">论坛</a></li>';
	lis_1+='<li data-type="1"><a href="http://m.sznews.com/node_226161.htm?chanid=226161">房产</a></li>';
	lis_1+='<li data-type="1"><a href="http://m.sznews.com/node_226162.htm?chanid=226162">金融</a></li>';
	lis_1+='<li data-type="1"><a href="http://m.sznews.com/node_226163.htm?chanid=226163">教育</a></li>';
	lis_1+='<li data-type="1"><a href="http://m.sznews.com/node_226149.htm?chanid=226149">报料</a></li>';
	lis_1+='<li data-type="1"><a href="http://m.sznews.com/node_226145.htm?chanid=226145">生活</a></li>';
	lis_1+='<li data-type="1"><a href="http://m.sznews.com/node_226146.htm?chanid=226146">美食</a></li>';
	lis_1+='<li data-type="1"><a href="http://m.sznews.com/node_226164.htm?chanid=226164">旅游</a></li>';
	lis_1+='<li data-type="1"><a href="http://m.sznews.com/node_226165.htm?chanid=226165">汽车</a></li>';
	lis_1+='<li data-type="1"><a href="http://m.sznews.com/node_226166.htm?chanid=226166">健康</a></li>';
	lis_1+='<li data-type="1"><a href="http://m.sznews.com/node_226167.htm?chanid=226167">消费</a></li>';
	lis_1+='<li data-type="1"><a href="http://m.sznews.com/node_226168.htm?chanid=226168">艺术</a></li>';
	lis_1+='<li data-type="1"><a href="http://m.sznews.com/node_226169.htm?chanid=226169">体育</a></li>';
	lis_1+='<li data-type="1"><a href="http://m.sznews.com/node_227906.htm?chanid=227906">新农业</a></li>';
	lis_1+='';

	var $newslist = $('<div class="menu-list"><div class="bti"><h2>推荐</h2>点击添加到我的主题</div><ul class="cf unchecked" id="recList">'+lis_1+'</ul></div>');
	$("div.menu-list:last").after($newslist);
	
    //深圳媒体
	var lis_6 = '';

	lis_6+='<li data-type="6"><a href="http://m.sznews.com/node_233341.htm?chanid=233341">特区报</a></li>';
	lis_6+='<li data-type="6"><a href="http://m.sznews.com/node_233342.htm?chanid=233342">深圳商报</a></li>';
	lis_6+='<li data-type="6"><a href="http://m.sznews.com/node_233343.htm?chanid=233343">深圳晚报</a></li>';
	lis_6+='<li data-type="6"><a href="http://m.sznews.com/node_233344.htm?chanid=233344">晶报</a></li>';
	lis_6+='<li data-type="6"><a href="http://m.sznews.com/node_233346.htm?chanid=233346">深圳日报</a></li>';
	lis_6+='<li data-type="6"><a href="http://m.sznews.com/node_233347.htm?chanid=233347">南方教育</a></li>';
	lis_6+='<li data-type="6"><a href="http://m.sznews.com/node_233348.htm?chanid=233348">宝安日报</a></li>';
	lis_6+='<li data-type="6"><a href="http://m.sznews.com/node_233349.htm?chanid=233349">都市报</a></li>';
	lis_6+='<li data-type="6"><a href="http://m.sznews.com/node_233350.htm?chanid=233350">青少年报</a></li>';
	lis_6+='';
	
	var $newslist = $('<div class="menu-list"><div class="bti"><h2>深圳媒体</h2>点击添加到我的主题</div><ul class="cf unchecked" id="szList">'+lis_6+'</ul></div>');
	$("div.menu-list:last").after($newslist);
                    
	//添加党政自媒体
	var lis_2 = '';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_226131.htm?chanid=226131">福田</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_226132.htm?chanid=226132">罗湖</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_226133.htm?chanid=226133">南山</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_226134.htm?chanid=226134">盐田</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_226135.htm?chanid=226135">宝安</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_226136.htm?chanid=226136">龙岗</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_226137.htm?chanid=226137">光明</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_226138.htm?chanid=226138">坪山</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_226139.htm?chanid=226139">龙华</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_226140.htm?chanid=226140">大鹏</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_228571.htm?chanid=228571">前海</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_229786.htm?chanid=229786">深汕视点</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_228929.htm?chanid=228929">食药</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_228415.htm?chanid=228415">交委</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_228483.htm?chanid=228483">宝安教育</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_229037.htm?chanid=229037">工务署</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_229274.htm?chanid=229274">工会</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_229275.htm?chanid=229275">市监</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_234653.htm?chanid=234653">公安</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_228928.htm?chanid=228928">公积金</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_228926.htm?chanid=228926">共青团</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_228950.htm?chanid=228950">人才</a></li>';	
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_229273.htm?chanid=229273">安监</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_229276.htm?chanid=229276">财政</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_228951.htm?chanid=228951">高层人才</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_229707.htm?chanid=229707">人社</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_229448.htm?chanid=229448">深圳发布</a></li>';
    lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_229618.htm?chanid=229618">深圳政协</a></li>';
    lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_229619.htm?chanid=229619">文博会</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_231131.htm?chanid=231131">健康深圳</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_232072.htm?chanid=232072">应急办</a></li>';
	lis_2+='<li data-type="2"><a href="http://m.sznews.com/node_228463.htm?chanid=228463">纪委</a></li>';
	lis_2+='';

	var $newslist = $('<div class="menu-list"><div class="bti"><h2>党政自媒体</h2>点击添加到我的主题</div><ul class="cf unchecked" id="catList">'+lis_2+'</ul></div>');
	$("div.menu-list:last").after($newslist);

	// 城市服务自媒体
	var lis_2_0 ='';
	// lis_2_0+='<li data-type="5"><a href="http://m.sznews.com/node_229275.htm?chanid=229275">市监</a></li>';
	lis_2_0+='<li data-type="5"><a href="http://m.sznews.com/node_235203.htm?chanid=235203">火车站</a></li>';
    lis_2_0+='<li data-type="5"><a href="http://m.sznews.com/node_228930.htm?chanid=228930">深水</a></li>';
	lis_2_0+='<li data-type="5"><a href="http://m.sznews.com/node_229033.htm?chanid=229033">深铁</a></li>';
	lis_2_0+='<li data-type="5"><a href="http://m.sznews.com/node_229034.htm?chanid=229034">港铁</a></li>';
	lis_2_0+='<li data-type="5"><a href="http://m.sznews.com/node_229612.htm?chanid=229612">深圳燃气</a></li>';
	lis_2_0+='<li data-type="5"><a href="http://m.sznews.com/node_232631.htm?chanid=232631">深圳通</a></li>';
	lis_2_0+='<li data-type="5"><a href="http://m.sznews.com/node_236627.htm?chanid=236627">深圳北站</a></li>';
	lis_2_0+='';
	var $newslist = $('<div class="menu-list"><div class="bti"><h2>城市服务自媒体</h2>点击添加到我的主题</div><ul class="cf unchecked" id="fwList">'+lis_2_0+'</ul></div>');
	$("div.menu-list:last").after($newslist);

	//添加新闻单位自媒体
	var lis_4 = '<li data-type="4"><a href="http://m.sznews.com/node_228336.htm?chanid=228336">读特</a></li>';
	lis_4+= '<li data-type="4"><a href="http://m.sznews.com/node_229918.htm?chanid=229918">教育时报</a></li>';
	lis_4+= '<li data-type="4"><a href="http://m.sznews.com/node_233503.htm?chanid=233503">教育通</a></li>';
	var $newslist = $('<div class="menu-list"><div class="bti"><h2>新闻单位自媒体</h2>点击添加到我的主题</div><ul class="cf unchecked" id="mtList">'+lis_4+'</ul></div>');
	$("div.menu-list:last").after($newslist);

	//添加民间自媒体
	var lis_3 = '';
	lis_3+='<li data-type="3"><a href="http://m.sznews.com/node_227842.htm?chanid=227842">天天说钱</a></li>';
	lis_3+='<li data-type="3"><a href="http://m.sznews.com/node_229070.htm?chanid=229070">游惠宝</a></li>';
	lis_3+='<li data-type="3"><a href="http://m.sznews.com/node_229030.htm?chanid=229030">懂车</a></li>';
	lis_3+='<li data-type="3"><a href="http://m.sznews.com/node_229031.htm?chanid=229031">潮生活</a></li>';
	lis_3+='<li data-type="3"><a href="http://m.sznews.com/node_229029.htm?chanid=229029">SUV</a></li>';
	lis_3+='<li data-type="3"><a href="http://m.sznews.com/node_228553.htm?chanid=228553">搜房网</a></li>';
	lis_3+='<li data-type="3"><a href="http://m.sznews.com/node_228554.htm?chanid=228554">芒果网</a></li>';
	lis_3+='<li data-type="3"><a href="http://m.sznews.com/node_228549.htm?chanid=228549">22度</a></li>';
	lis_3+='<li data-type="3"><a href="http://m.sznews.com/node_229036.htm?chanid=229036">百事通</a></li>';
	lis_3+='<li data-type="3"><a href="http://m.sznews.com/node_229278.htm?chanid=229278">育儿</a></li>';
	lis_3+='<li data-type="3"><a href="http://m.sznews.com/node_229446.htm?chanid=229446">A963</a></li>';
	lis_3+='<li data-type="3"><a href="http://m.sznews.com/node_229923.htm?chanid=229923">觅食迹</a></li>';
	lis_3+='<li data-type="3"><a href="http://m.sznews.com/node_229637.htm?chanid=229637">零售协会</a></li>';
	lis_3+='<li data-type="3"><a href="http://m.sznews.com/node_229632.htm?chanid=229632">首脑</a></li>';
	lis_3+='<li data-type="3"><a href="http://m.sznews.com/node_229917.htm?chanid=229917">淘驰科技</a></li>';
	lis_3+='<li data-type="3"><a href="http://m.sznews.com/node_232312.htm?chanid=232312">大商荟</a></li>';
	lis_3+='<li data-type="3"><a href="http://m.sznews.com/node_230946.htm?chanid=230946">动物园</a></li>';
	lis_3+='<li data-type="3"><a href="http://m.sznews.com/node_233537.htm?chanid=233537">160</a></li>';
	lis_3+='<li data-type="3"><a href="http://m.sznews.com/node_233860.htm?chanid=233860">中集集团</a></li>';
	lis_3+='<li data-type="3"><a href="http://m.sznews.com/node_236961.htm?chanid=236961">轩鸿金融</a></li>';
	lis_3+='';
	var $newslist = $('<div class="menu-list"><div class="bti"><h2>民间自媒体</h2>点击添加到我的主题</div><ul class="cf unchecked" id="zmtList">'+lis_3+'</ul></div>');
	$("div.menu-list:last").after($newslist);


	
	/*************************end  频道栏目设置  end*******************************/
	
	/*栏目添加位置开始*/
	// 导航栏频道
	// var nav_li = $('<li data-type="1"><a href="">测试</a></li>');
	// $(".navHeader .nav").append(nav_li);

	//我的主题
	// var menu_li = $('<li data-type="1"><a href="">测试</a></li>');
	// $(".menu-green").append(menu_li);
	
	//推荐
	// var rec_li = $('<li data-type="1"><a href="">推荐</a></li>');
	// $("#recList").append(rec_li);

	// 党政自媒体
	// var cat_li = $('<li data-type="2"><a href="">滨海宝安</a></li>');
	// $("#catList").append(cat_li);
	


	  
	 
	// 民间自媒体
	// var zmt_li = $('<li data-type="3"><a href="">冰镇热点</a></li>')
	// $("#zmtList").append(zmt_li);
	 
	/*栏目添加位置结束*/


	

            	//从cookie读取分类
	(function _initCategroies(){
		var __currentId = jQuery.getURLParam(null,"chanid");
		var __token = jQuery.getURLParam(null,"token");
		var __cxid = jQuery.getURLParam(null, "cxid");
		// console.log(__currentId);
		var _savedCates = decodeURIComponent(getSSOCookie(_globalKey));
		var _rawArray = _savedCates.split("|");
		var __categories = [];
		var _newURL = window.location.protocol + "//" + "m.sznews.com";
		// var _newURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
		for (var i = _rawArray.length - 1; i >= 0; i--) {
			var _data = _rawArray[i].split(":");
			if (_data.length != 3) continue;
			var _url = '<li data-type="'+_data[0]+'"><a href="'+_newURL+'/node_'+_data[1]+'.htm?chanid='+_data[1]+'&token='+__token+'">'+_data[2]+'</a></li>';
			// var _url = '<li data-type="'+_data[0]+'"><a href="'+_newURL+'/node_'+_data[1]+'.htm?chanid='+_data[1]+'&cxid='+__cxid+'&token='+__token+'">'+_data[2]+'</a></li>';
			__categories.push(_url);
		}
		// console.log(__categories);
		if (__categories.length!=0 && __categories != 'null') {
			$(".navHeader .nav").html(__categories);
		}else{
			$(".navHeader .nav").html($(".menu-green").html());
		}
		//init navi
		$(".navHeader .nav li").removeClass('on');
		var saved = $(".navHeader .nav").find('a');
		var cates = [];
		for (var i = saved.length - 1; i >= 0; i--) {
			cates.push(saved[i].innerText);
			var _id = jQuery.getURLParam(saved[i].href,"chanid");
			// console.log(_id+"|"+__currentId);
			if (_id == __currentId) {
				// console.log(_id+"|"+saved[i]);
				$(saved[i]).parent().addClass('on');
				var _left = $(saved[i]).position().left;
				var _cW = $(".navHeader .nav").width();
				if (_left > _cW*.8) {
					$('.navHeader .nav').animate({scrollLeft: $(saved[i]).position().left}, 100);
				}else{
					$('.navHeader .nav').animate({scrollLeft: 0}, 100);
				}				
			}
		}
		//过滤掉已经选中过的栏目
		$("#catList,#recList,#zmtList,#mtList,#fwList,#szList").find('a').each(function(index, el) {
			if ($.inArray(el.innerText, cates) != -1) {
				$(el).parent().detach();
			}
		});
	})();

	//显示分享菜单
	$(".sico-share,.menu-icon").click(function(event) {
		$(".side-menu").fadeToggle('fast');
	});

	//显示栏目菜单
	$(".add").click(function(event) {
		resetCategories(true);
		$(".logo").css({
			position: 'fixed',
			top: '0',
			'z-index': 9999
		});
		$(".menu").css({
			height: $(window).height() - $(".logo").height()
		}).fadeIn('fast',function(){
			$(".navHeader nav").hide();
		});
	});

	$(".ico-close").click(function(event) {
		$(".logo").removeAttr('style');
		$(".menu").slideUp('fast');
		$(".navHeader nav").show();
	});

/*	$(window).scroll(function() {
		if($(window).scrollTop()>=38){
			$(".navHeader").addClass("fixedNav");
		}else{
			$(".navHeader").removeClass("fixedNav");
		} 
  	});*/

	  	(function($) {
		    var uniqueCntr = 0;
		    $.fn.scrolled = function (waitTime, fn) {
		        if (typeof waitTime === "function") {
		            fn = waitTime;
		            waitTime = 500;
		        }
		        var tag = "scrollTimer" + uniqueCntr++;
		        this.scroll(function () {
		            var self = $(this);
		            var timer = self.data(tag);
		            if (timer) {
		                clearTimeout(timer);
		            }
		            timer = setTimeout(function () {
		                self.removeData(tag);
		                fn.call(self[0]);
		            }, waitTime);
		            self.data(tag, timer);
		        });
		    }
		})(jQuery);

	 	/*$(window).scrolled(100,function(){
			if($(window).scrollTop()>=35){
				$(".navHeader").addClass("fixedNav");
			}else{
				$(".navHeader").removeClass("fixedNav");
			} 
	  	});*/

	 // 默认头条
	var chanidx = jQuery.getURLParam(null,"chanid");
	if (chanidx==null||chanidx=='') {
		$(".nav-header .nav li:first").addClass("on");
	}

	


  	//刷新栏目
  	function resetCategories(reverse){
  		if (reverse) {
  			$(".menu-green").html($(".navHeader .nav").html());	
  			return;
  		}
  		var _catList = $(".menu-green").html();
  		$(".navHeader .nav").html(_catList);

  		var _toSaveStr ="";
  		var _lis = $(".menu-green").find('li');
  		for (var i = _lis.length - 1; i >= 0; i--) {
  			// console.log(_lis[i]);
  			var dataType = $(_lis[i]).attr("data-type") || 0;
  			var id = jQuery.getURLParam($(_lis[i]).find("a")[0].href,"chanid");
  			var name = $(_lis[i]).children('a').html();
  			_toSaveStr += dataType + ":" + id + ":" + name + ((i!=0)?"|":"");
  		}
  		// console.log("存储分类："+_toSaveStr);
  		// setCookie(_globalKey,encodeURIComponent(_toSaveStr));
  		addSSOCookie(_globalKey,encodeURIComponent(_toSaveStr));
   	}
	//分组导航
	$(".unchecked").on('click', 'li', function(event) {
		event.preventDefault();
		var dataType = $(this).attr("data-type");
		if (dataType == 1) {//推荐主题
			$(".menu-green").append($(this).detach());
		}else if(dataType == 2){//各区
			$(".menu-green").append($(this).detach());
		}else if(dataType == 3){//自媒体
			$(".menu-green").append($(this).detach());
		}else if(dataType == 4){//新闻单位自媒体
			$(".menu-green").append($(this).detach());
		}else if(dataType == 5){//城市服务自媒体
			$(".menu-green").append($(this).detach());
		}else if(dataType == 6){//深圳媒体
			$(".menu-green").append($(this).detach());
		}
		resetCategories(false);
	});
	//移除我的主题
	$(".menu-green").on('click','li', function(event) {
		if (!$(this).parent().attr("data-enable")) {
			event.preventDefault();
			var dataType = $(this).attr("data-type");
			if (!dataType) return;
			if (dataType == 1) {//推荐主题
				$("#recList").append($(this));
			}else if(dataType == 2){//各区
				$("#catList").append($(this));
			}else if(dataType == 3){//自媒体
				$("#zmtList").append($(this));
			}else if(dataType == 4){//新闻单位自媒体
				$("#mtList").append($(this));
			}else if(dataType == 5){//城市服务自媒体
				$("#fwList").append($(this));
			}else if(dataType == 6){//深圳媒体
				$("#szList").append($(this));
			}
			resetCategories(false);
		}
	});

	$(".close-icon").click(function(event) {
		history.go(-1);
	});

	var browser = {
	    versions: function () {
	        var u = navigator.userAgent, app = navigator.appVersion;
	        return {         //移动终端浏览器版本信息
	            trident: u.indexOf('Trident') > -1, //IE内核
	            presto: u.indexOf('Presto') > -1, //opera内核
	            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
	            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
	            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
	            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
	            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
	            iPad: u.indexOf('iPad') > -1, //是否iPad
	            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
	        };
	    }(),
	    language: (navigator.browserLanguage || navigator.language).toLowerCase()
	}

	var ua = navigator.userAgent.toLowerCase();
    //微信&QQ分享
    if (ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/QQ/i) == "qq") {
        $(".sico-weixin").on('click', function(event) {
        	var hasObj = document.getElementById("shareBg");
        	if (!hasObj) {
            	$("body").append('<div id="shareBg"></div>');
	            $("#shareBg").on('click', function(event) {
	            	$(this).fadeOut('fast');
				});
	            $(".side-menu").fadeOut('fast');
        	}else{
        		$("#shareBg").fadeIn('fast');
        	}
		});
    }else{
    	$(".side-menu").find('li').first().hide();
    }
});