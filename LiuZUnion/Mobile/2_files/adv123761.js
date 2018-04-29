		//获取url中的参数
		function getUrlParam(name) {
		    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		    if (r != null) return unescape(r[2]); return null; //返回参数值
		}

		/*
			hostname:域名
			cxid：@平台标识
			catalog:栏目

		*/
		function setAdv(cxid,catalog,advA,advB){
			var _host = location.host;
        	var chanid = getUrlParam("chanid");
        	var cid = getUrlParam("cxid");

        	// 是否有cid,确定@平台
        	if (cid !=null && cid != '') {


        		/*if (cxid == cid && chanid == catalog) {
            		window.html1 = advA;
            		window.html2 = advB;
            	}*/
                console.log("cxid="+cxid+ " cid="+cid+ " catalog="+catalog + " chanid="+chanid);

        		switch(cxid){
        			 case 'sznews': 
		            	// 深圳头条&& (chanid == null || chanid == '')
		            	if ((cxid == cid && chanid == catalog) || (chanid == null && catalog == '')) {
		            		window.html1 = advA;
		            		window.html2 = advB;
		            	}

		                console.log("cxid="+cxid+ " cid="+cid+ " catalog="+catalog + " chanid="+chanid);
		                break;
		            case 'isz': 
		            	// 深圳头条&& (chanid == null || chanid == '')
		            	if ((cxid == cid && chanid == catalog) || (chanid == null && catalog == '')) {
		            		window.html1 = advA;
		            		window.html2 = advB;
		            	}
		                console.log("cxid="+cxid+ " cid="+cid+ " catalog="+catalog + " chanid="+chanid);
		                break;
		            case 'ins': 

        		
		                break;
		            case 'iga': 

        		
        				break;  
		            case 'iba': 

        		
        				break;
		            default:
		                break;
		        }


        	}else{
        		// 无cid,chanid标识的
        		 switch(cxid){
		            case 'isz': 
		            	// 深圳头条&& (chanid == null || chanid == '')
		            	if (_host == "i.sznews.com" && (catalog == null || catalog == '')) {
		            		window.html1 = advA;
		            		window.html2 = advB;
		            	}
		                console.log("window.html1="+window.html1);
		                break;
		            case 'ins': 

        		
		                break;
		            case 'iga': 

        		
        				break;  
		            case 'iba': 

        		
        				break;
        			case 'sznews':
        				//sznews
        				if (_host == "m.sznews.com" && (catalog == null || catalog == '')) {
		            		window.html1 = advA;
		            		window.html2 = advB;
		            	}else if (_host == "m.sznews.com" && catalog == chanid) {
		            		window.html1 = advA;
		            		window.html2 = advB;
		            	}


		            	
		                console.log("cxid="+cxid+ " cid="+cid+ " catalog="+catalog + " chanid="+chanid);

        				break;
		            default:
		            	
		                break;
		        }

				
        	}


			

		}

		window.html1 = '';
		window.html2 = '';
		// 全部的得放前面 设置优先级
		
		//深圳新闻网 头条  226226
		setAdv("sznews",'',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=408" charset="gbk" ></script>',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=409" charset="gbk" ></script>');

		//深圳新闻网 深圳
		setAdv("sznews",'226141',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=410" charset="gbk" ></script>',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=411" charset="gbk" ></script>');

		//深圳新闻网 娱乐
		setAdv("sznews",'226142',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=412" charset="gbk" ></script>',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=413" charset="gbk" ></script>');

		//深圳新闻网 焦点
		setAdv("sznews",'226143',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=414" charset="gbk" ></script>',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=415" charset="gbk" ></script>');


		//深圳新闻网 图片
		setAdv("sznews",'226144',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=416" charset="gbk" ></script>',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=417" charset="gbk" ></script>');

		//深圳新闻网 论坛
		setAdv("sznews",'226147',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=418" charset="gbk" ></script>',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=419" charset="gbk" ></script>');

		//深圳新闻网 房产
		setAdv("sznews",'226161',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=420" charset="gbk" ></script>',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=421" charset="gbk" ></script>');

		//深圳新闻网 金融
		setAdv("sznews",'226162',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=422" charset="gbk" ></script>',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=423" charset="gbk" ></script>');

		//深圳新闻网 体育
		setAdv("sznews",'226169',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=424" charset="gbk" ></script>',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=425" charset="gbk" ></script>');

		//深圳新闻网 报料
		setAdv("sznews",'226149',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=426" charset="gbk" ></script>',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=427" charset="gbk" ></script>');

		//深圳新闻网 健康
		setAdv("sznews",'226166',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=482" charset="gbk" ></script>',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=483" charset="gbk" ></script>');

		/**************************************结束       深圳新闻网    结束******************************************/

		/**************************************开始        @深圳    开始*********************************************/

		// @深圳 头条广告
		setAdv("isz",'',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=443" charset="gbk" ></script>',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=444" charset="gbk" ></script>');

		// @深圳 深圳广告
		setAdv("isz",'226141',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=445" charset="gbk" ></script>',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=446" charset="gbk" ></script>');

		// @深圳 娱乐广告
		setAdv("isz",'226142',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=447" charset="gbk" ></script>',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=448" charset="gbk" ></script>');

		// @深圳 焦点广告
		setAdv("isz",'226143',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=449" charset="gbk" ></script>',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=450" charset="gbk" ></script>');

		// @深圳 图片广告
		setAdv("isz",'226144',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=451" charset="gbk" ></script>',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=452" charset="gbk" ></script>');

		// @深圳 论坛广告
		setAdv("isz",'226147',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=453" charset="gbk" ></script>',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=454" charset="gbk" ></script>');

		// @深圳 房产广告
		setAdv("isz",'226161',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=455" charset="gbk" ></script>',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=456" charset="gbk" ></script>');

		// @深圳 金融广告
		setAdv("isz",'226162',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=457" charset="gbk" ></script>',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=458" charset="gbk" ></script>');

		// @深圳 教育广告
		setAdv("isz",'226163',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=459" charset="gbk" ></script>',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=460" charset="gbk" ></script>');

		// @深圳 报料广告
		setAdv("isz",'226149',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=461" charset="gbk" ></script>',
			'<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=462" charset="gbk" ></script>');

		/**************************************结束        @深圳    结束*********************************************/


/*
头条 226226
深圳 226141
娱乐 226142
焦点 226143
图片 226144
论坛 226147
房产 226161
金融 226162
体育 226169
教育 226163
爆料 226149
*/

