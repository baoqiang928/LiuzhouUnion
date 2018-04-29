jQuery(document).ready(function($) {
	//获取url中的参数
        function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }

        // title:标题,logo:图标url,word:口号，cxid:平台缩写，ahref:第一个频道url，aname:第一个频道名

        function setLogo(title,logo,word,cxid,ahref,aname){
        		
        		// 设置第一个频道
        		var default_a = $(".navHeader .nav li").first().find('a');
        		default_a.attr("href",ahref);
        		default_a.text(aname);

        	   	console.log("cxid="+cxid);
				document.title=title;
                $(".biaoti img").attr("src",logo);
                $(".web-name").text(word);

                if (cxid=='' || cxid=="undefined" || cxid==null) {
                	return;
                }

                $("a").each(function(){
                  	// $(this).parents("div[id^='adsame']").length
                  	// if ($(this).parents(".adv-div").length>0) {
                    
                    var href = $(this).attr("href");
                    //是否论坛
                    var is_bbs = new String(href).indexOf("szbbs.sznews.com");
                    var has_cxid = new String(href).indexOf("cxid");
                  	//	判断是否广告的<a>标签
                  	if ($(this).parents("div[id^='adsame']").length==0&&is_bbs<0) {
						var jres = new String(href).indexOf("javascript");
						if(!(href==""||jres>=0 || href=="undefined")){
							 var res = new String(href).indexOf("?");
							if (res==-1) {
								href+="?cxid="+cxid+"&token="+new Date().getTime();
							}else{
								href+="&cxid="+cxid+"&token="+new Date().getTime();
							}
							$(this).attr("href",href);
						}
					}
                });


        }

        function setShare(){
        	var html='<a href="javascript:;" class="sico-share"></a><div class="side-menu"><ul class="cf"><li><a class="sico-weixin"></a></li><li><a onclick="javascript:bShare.share(event,\'sinaminiblog\');return false;" class="sico-sina"></a></li><li><a onclick="javascript:bShare.share(event,\'qqmb\');return false;" class="sico-tencent"></a></li><li><a onclick="javascript:bShare.share(event,\'qzone\');return false;" class="sico-fav"></a></li></ul></div>';
        	$("div.side").html(html);
        	//显示分享菜单
			$(".sico-share,.menu-icon").click(function(event) {
				$(".side-menu").fadeToggle('fast');
			});
        }
       
        
        var _host = location.host;
        var chanid = getUrlParam("chanid");
        		
        if (chanid==null||chanid=='') {
			$(".navHeader .nav li:first").addClass("on");
		}

        switch(_host){
			case "z.sznews.com":
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/hcz/");
        		if(isSz > 0){
        			setLogo("@火车站",
		            			"http://www.sznews.com/2016mi/images/logostation.png",
		            			"网聚深圳自媒体力量",
		            			"station",
		            			"http://z.sznews.com/hcz/index.htm",
		            			'火车站');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/szsga/");
        		if(isSz > 0){
        			setLogo("@深圳公安",
		            			"http://www.sznews.com/2016mi/images/logogongan.png",
		            			"网聚深圳自媒体力量",
		            			"szgongan",
		            			"http://z.sznews.com/szsga/index.htm",
		            			'深圳公安');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/160/");
        		if(isSz > 0){
        			setLogo("@160",
		            			"http://www.sznews.com/2016mi/images/logojy160.png",
		            			"网聚深圳自媒体力量",
		            			"jy160",
		            			"http://z.sznews.com/160/index.htm",
		            			'160');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/szt/");
        		if(isSz > 0){
        			setLogo("@深圳通",
		            			"http://www.sznews.com/2016mi/images/sztong.png",
		            			"网聚深圳自媒体力量",
		            			"sztong",
		            			"http://z.sznews.com/szt/index.htm",
		            			'深圳通');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/szfb/");
        		if(isSz > 0){
        			setLogo("@深圳发布",
		            			"http://www.sznews.com/2016mi/images/logoshenzfb.png",
		            			"网聚深圳自媒体力量",
		            			"shenzfb",
		            			"http://z.sznews.com/szfb/index.htm",
		            			'深圳发布');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/szrq/");
        		if(isSz > 0){
        			setLogo("@燃气",
		            			"http://www.sznews.com/2016mi/images/logoranqi.png",
		            			"网聚深圳自媒体力量",
		            			"ranqi",
		            			"http://z.sznews.com/szrq/index.htm",
		            			'燃气');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/szzx/");
        		if(isSz > 0){
        			setLogo("@政协",
		            			"http://www.sznews.com/2016mi/images/logozhengxi.png",
		            			"网聚深圳自媒体力量",
		            			"zhengxie",
		            			"http://z.sznews.com/szzx/index.htm",
		            			'政协');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/sssd/");
        		if(isSz > 0){
        			setLogo("@深汕视点",
		            			"http://www.sznews.com/2016mi/images/logosssd.png",
		            			"网聚深圳自媒体力量",
		            			"sssd",
		            			"http://z.sznews.com/sssd/index.htm",
		            			'深汕视点');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/szrs/");
        		if(isSz > 0){
        			setLogo("@人社",
		            			"http://www.sznews.com/2016mi/images/logorenshe.png",
		            			"网聚深圳自媒体力量",
		            			"renshe",
		            			"http://z.sznews.com/szrs/index.htm",
		            			'人社');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/yuer/");
        		if(isSz > 0){
        			setLogo("@育儿",
		            			"http://www.sznews.com/2016mi/images/logoyuer.png",
		            			"网聚深圳自媒体力量",
		            			"yuer",
		            			"http://z.sznews.com/yuer/index.htm",
		            			'育儿');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/sif/");
        		if(isSz > 0){
        			setLogo("@司法",
		            			"http://www.sznews.com/2016mi/images/logosifa.png",
		            			"网聚深圳自媒体力量",
		            			"sifa",
		            			"http://z.sznews.com/sif/index.htm",
		            			'司法');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/caiz/");
        		if(isSz > 0){
        			setLogo("@财政",
		            			"http://www.sznews.com/2016mi/images/logocaizg.png",
		            			"网聚深圳自媒体力量",
		            			"caizg",
		            			"http://z.sznews.com/caiz/index.htm",
		            			'财政');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/shij/");
        		if(isSz > 0){
        			setLogo("@市监",
		            			"http://www.sznews.com/2016mi/images/logoshijn.png",
		            			"网聚深圳自媒体力量",
		            			"shijn",
		            			"http://z.sznews.com/shij/index.htm",
		            			'市监');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/gongh/");
        		if(isSz > 0){
        			setLogo("@工会",
		            			"http://www.sznews.com/2016mi/images/logogonghui.png",
		            			"网聚深圳自媒体力量",
		            			"gonghui",
		            			"http://z.sznews.com/gongh/index.htm",
		            			'工会');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/anj/");
        		if(isSz > 0){
        			setLogo("@安监",
		            			"http://www.sznews.com/2016mi/images/logoanjian.png",
		            			"网聚深圳自媒体力量",
		            			"anjian",
		            			"http://z.sznews.com/anj/index.htm",
		            			'安监');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/gws/");
        		if(isSz > 0){
        			setLogo("@工务署",
		            			"http://www.sznews.com/2016mi/images/logogwshu.png",
		            			"网聚深圳自媒体力量",
		            			"igwshu",
		            			"http://z.sznews.com/gws/index.htm",
		            			'工务署');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/bst/");
        		if(isSz > 0){
        			setLogo("@百事通",
		            			"http://www.sznews.com/2016mi/images/logobstong.png",
		            			"网聚深圳自媒体力量",
		            			"ibstong",
		            			"http://z.sznews.com/bst/index.htm",
		            			'百事通');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/ttsq/");
        		if(isSz > 0){
        			setLogo("@天天说钱",
		            			"http://www.sznews.com/2016mi/images/logottsq.png",
		            			"网聚深圳自媒体力量",
		            			"ittsq",
		            			"http://z.sznews.com/ttsq/index.htm",
		            			'天天说钱');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/jbtiy/");
        		if(isSz > 0){
        			setLogo("@晶报体育",
		            			"http://www.sznews.com/2016mi/images/logojbty.png",
		            			"网聚深圳自媒体力量",
		            			"ijbty",
		            			"http://z.sznews.com/jbtiy/index.htm",
		            			'晶报体育');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/sz22/");
        		if(isSz > 0){
        			setLogo("@22度",
		            			"http://www.sznews.com/2016mi/images/logo22du.png",
		            			"网聚深圳自媒体力量",
		            			"i22du",
		            			"http://z.sznews.com/sz22/index.htm",
		            			'22度');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/Hkyh/");
        		if(isSz > 0){
        			setLogo("@游惠宝",
		            			"http://www.sznews.com/2016mi/images/logoyhbao.png",
		            			"网聚深圳自媒体力量",
		            			"iyouhb",
		            			"http://z.sznews.com/Hkyh/index.htm",
		            			'游惠宝');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/idongc/");
        		if(isSz > 0){
        			setLogo("@懂车",
		            			"http://www.sznews.com/2016mi/images/logodongche.png",
		            			"网聚深圳自媒体力量",
		            			"idche",
		            			"http://z.sznews.com/idongc/index.htm",
		            			'懂车');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/suvclub/");
        		if(isSz > 0){
        			setLogo("@SUV车友会",
		            			"http://www.sznews.com/2016mi/images/logoSUV.png",
		            			"网聚深圳自媒体力量",
		            			"isuv",
		            			"http://z.sznews.com/suvclub/index.htm",
		            			'SUV车友会');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/souf/");
        		if(isSz > 0){
        			setLogo("@搜房网",
		            			"http://www.sznews.com/2016mi/images/logosoufang.png",
		            			"网聚深圳自媒体力量",
		            			"isoufang",
		            			"http://z.sznews.com/souf/index.htm",
		            			'搜房网');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/mango/");
        		if(isSz > 0){
        			setLogo("@芒果网",
		            			"http://www.sznews.com/2016mi/images/logomangguo.png",
		            			"网聚深圳自媒体力量",
		            			"imangguo",
		            			"http://z.sznews.com/mango/index.htm",
		            			'芒果网');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/rcgzw/");
        		if(isSz > 0){
        			setLogo("@高层人才",
		            			"http://www.sznews.com/2016mi/images/logogaoceng.png",
		            			"网聚深圳自媒体力量",
		            			"igccrc",
		            			"http://z.sznews.com/rcgzw/index.htm",
		            			'高层人才');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/bajy/");
        		if(isSz > 0){
        			setLogo("@宝安教育",
		            			"http://www.sznews.com/2016mi/images/logobajiaoyu.png",
		            			"网聚深圳自媒体力量",
		            			"ibajiaoyu",
		            			"http://z.sznews.com/bajy/index.htm",
		            			'宝安教育');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/gtsz/");
        		if(isSz > 0){
        			setLogo("@港铁",
		            			"http://www.sznews.com/2016mi/images/logogangtie.png",
		            			"网聚深圳自媒体力量",
		            			"igangtie",
		            			"http://z.sznews.com/gtsz/index.htm",
		            			'港铁');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/szdt/");
        		if(isSz > 0){
        			setLogo("@深铁",
		            			"http://www.sznews.com/2016mi/images/logoditie.png",
		            			"网聚深圳自媒体力量",
		            			"iditie",
		            			"http://z.sznews.com/szdt/index.htm",
		            			'深铁');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/sgcsh/");
        		if(isSz > 0){
        			setLogo("@潮生活",
		            			"http://www.sznews.com/2016mi/images/logochaosh.png",
		            			"网聚深圳自媒体力量",
		            			"ichaosh",
		            			"http://z.sznews.com/sgcsh/index.htm",
		            			'潮生活');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/ljsz/");
        		if(isSz > 0){
        			setLogo("@纪委",
		            			"http://www.sznews.com/2016mi/images/logojiwei.png",
		            			"网聚深圳自媒体力量",
		            			"ijiwei",
		            			"http://z.sznews.com/ljsz/index.htm",
		            			'纪委');
        		}
			    var _url = location.href;
        		var isSz = new String(_url).indexOf("/rcsz/");
        		if(isSz > 0){
        			setLogo("@人才",
		            			"http://www.sznews.com/2016mi/images/logorencai.png",
		            			"网聚深圳自媒体力量",
		            			"irencai",
		            			"http://z.sznews.com/rcsz/index.htm",
		            			'人才');
        		}
        		var _url = location.href;
        		var isSz = new String(_url).indexOf("/sysz/");
        		if(isSz > 0){
        			setLogo("@食药",
		            			"http://www.sznews.com/2016mi/images/logoshiyao.png",
		            			"网聚深圳自媒体力量",
		            			"ishiyao",
		            			"http://z.sznews.com/sysz/index.htm",
		            			'食药');
        		}
				var _url = location.href;
        		var isSz = new String(_url).indexOf("/szgqt/");
        		if(isSz > 0){
        			setLogo("@共青团",
		            			"http://www.sznews.com/2016mi/images/logogqtuan.png",
		            			"网聚深圳自媒体力量",
		            			"igqtuan",
		            			"http://z.sznews.com/szgqt/index.htm",
		            			'共青团');
        		}
				var _url = location.href;
        		var isSz = new String(_url).indexOf("/szsmzj/");
        		if(isSz > 0){
        			setLogo("@民政局",
		            			"http://www.sznews.com/2016mi/images/logominzhengju.png",
		            			"网聚深圳自媒体力量",
		            			"iminzhengju",
		            			"http://z.sznews.com/szsmzj/index.htm",
		            			'民政局');
        		}
        		var _url = location.href;
        		var isSz = new String(_url).indexOf("/szgjj/");
        		if(isSz > 0){
        			setLogo("@公积金",
		            			"http://www.sznews.com/2016mi/images/logogongjijin.png",
		            			"深圳市住房公积金管理中心",
		            			"igongjijin",
		            			"http://z.sznews.com/szgjj/index.htm",
		            			'公积金');
        		}
				var _url = location.href;
        		var isSz = new String(_url).indexOf("/szsw/");
        		if(isSz > 0){
        			setLogo("@深水",
		            			"http://www.sznews.com/2016mi/images/logoshuiwujt.png",
		            			"网聚深圳自媒体力量",
		            			"ishuiwujt",
		            			"http://z.sznews.com/szsw/index.htm",
		            			'深水');
        		}
				var _url = location.href;
        		var isSz = new String(_url).indexOf("/szbajc/");
        		if(isSz > 0){
        			setLogo("@机场",
		            			"http://www.sznews.com/2016mi/images/logojichang.png",
		            			"网聚深圳自媒体力量",
		            			"ijichang",
		            			"http://z.sznews.com/szbajc/index.htm",
		            			'机场');
        		}
				
        		break;
			case "mdp.sznews.com":
        		setLogo("@大鹏",
		            			"http://www.sznews.com/2016mi/images/logodapeng.png",
		            			"网聚深圳自媒体力量",
		            			"idapeng",
		            			"http://mdp.sznews.com/index.htm",
		            			'大鹏');
        		break;
			case "mfutian.sznews.com":
        		setLogo("@福田",
		            			"http://www.sznews.com/2016mi/images/logofutian.png",
		            			"网聚深圳自媒体力量",
		            			"ift",
		            			"http://mfutian.sznews.com/index.htm",
		            			'福田');
        		break;
			 case "myantian.sznews.com":
        		setLogo("@盐田",
		            			"http://www.sznews.com/2016mi/images/logoyantian.png",
		            			"网聚深圳自媒体力量",
		            			"iyt",
		            			"http://myantian.sznews.com/index.htm",
		            			'盐田');
        		break;
			 case "mluohu.sznews.com":
        		setLogo("@罗湖",
		            			"http://www.sznews.com/2016mi/images/luohu.png",
		            			"网聚深圳自媒体力量",
		            			"ilh",
		            			"http://mluohu.sznews.com/index.htm",
		            			'罗湖');
        		break;

			 case "mlonggang.sznews.com":
        		setLogo("@龙岗",
		            			"http://www.sznews.com/2016mi/images/longganglogo1.png",
		            			"网聚深圳自媒体力量",
		            			"ilg",
		            			"http://mlonggang.sznews.com/node_228545.htm",
		            			'龙岗');
        		break;
			case "mguangming.sznews.com":
        		setLogo("@光明",
		            			"http://www.sznews.com/2016mi/images/guangming.png",
		            			"网聚深圳自媒体力量",
		            			"igm",
		            			"http://mguangming.sznews.com/index.htm",
								'光明');
        		break;
		     case "mqianhai.sznews.com":
        		setLogo("@前海",
		            			"http://www.sznews.com/2016mi/images/qianhai.png",
		            			"网聚深圳自媒体力量",
		            			"iqh",
		            			"http://mqianhai.sznews.com/index.htm",
		            			'前海');
        		break;
			 case "mpingshan.sznews.com":
        		setLogo("@坪山",
		            			"http://www.sznews.com/2016mi/images/pingshan.png",
		            			"网聚深圳自媒体力量",
		            			"ips",
		            			"http://mpingshan.sznews.com/index.htm",
		            			'坪山');
        		break;
			 case "mjiaowei.sznews.com":
        		setLogo("@交委",
		            			"http://www.sznews.com/2016mi/images/jiaowei.png",
		            			"网聚深圳自媒体力量",
		            			"ijw",
		            			"http://mjiaowei.sznews.com/index.htm",
		            			'交委');
        		break;
			case "mlonghua.sznews.com":
        		setLogo("@龙华",
		            			"http://www.sznews.com/2016mi/images/logolonghua.png",
		            			"网聚深圳自媒体力量",
		            			"ilongh",
		            			"http://mlonghua.sznews.com/index.htm",
		            			'龙华');
        		break;
        	case "mbaoan.sznews.com":
        		setLogo("@宝安",
		            			"http://www.sznews.com/2016mi/images/logobaoan.png",
		            			"网聚深圳自媒体力量",
		            			"iba",
		            			"http://mbaoan.sznews.com/index.htm",
		            			'宝安');

        		break;
        	case "mgongan.sznews.com":
        		setLogo("@公安",
		            			"http://www.sznews.com/2016mi/images/logopolice.png",
		            			"网聚深圳自媒体力量",
		            			"iga",
		            			"http://mgongan.sznews.com/index.htm",
		            			'公安');
        		break;
        	case "mnanshan.sznews.com":
        		setLogo("@南山",
		            			"http://www.sznews.com/2016mi/images/logonanshan.png",
		            			"网聚深圳自媒体力量",
		            			"ins",
		            			"http://mnanshan.sznews.com/index.htm",
		            			'南山');
        		break;
        	case "i.sznews.com":
        		setLogo("@深圳",
		            			"http://www.sznews.com/2016mi/images/logo2.png",
		            			"网聚深圳自媒体力量",
		            			"isz",
		            			"http://i.sznews.com/index.htm",
		            			'头条');
        		break;
        	/*m.sznews.com*/
        	default:
        		var cxid = getUrlParam("cxid");

		        console.log("cxid="+cxid);
		        switch(cxid){
					case 'station': 
		            	setLogo("@火车站",
		            			"http://www.sznews.com/2016mi/images/logostation.png",
		            			"网聚深圳自媒体力量",
		            			'station',
		            			"http://z.sznews.com/hcz/index.htm",
		            			'火车站');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'szgongan': 
		            	setLogo("@深圳公安",
		            			"http://www.sznews.com/2016mi/images/logogongan.png",
		            			"网聚深圳自媒体力量",
		            			'szgongan',
		            			"http://z.sznews.com/szsga/index.htm",
		            			'深圳公安');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'jy160': 
		            	setLogo("@160",
		            			"http://www.sznews.com/2016mi/images/logojy160.png",
		            			"网聚深圳自媒体力量",
		            			'jy160',
		            			"http://z.sznews.com/160/index.htm",
		            			'160');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'sztong': 
		            	setLogo("@深圳通",
		            			"http://www.sznews.com/2016mi/images/sztong.png",
		            			"网聚深圳自媒体力量",
		            			'sztong',
		            			"http://z.sznews.com/szt/index.htm",
		            			'深圳通');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'shenzfb': 
		            	setLogo("@深圳发布",
		            			"http://www.sznews.com/2016mi/images/logoshenzfb.png",
		            			"网聚深圳自媒体力量",
		            			'shenzfb',
		            			"http://z.sznews.com/szfb/index.htm",
		            			'深圳发布');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'ranqi': 
		            	setLogo("@燃气",
		            			"http://www.sznews.com/2016mi/images/logoranqi.png",
		            			"网聚深圳自媒体力量",
		            			'ranqi',
		            			"http://z.sznews.com/szrq/index.htm",
		            			'燃气');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'zhengxie': 
		            	setLogo("@政协",
		            			"http://www.sznews.com/2016mi/images/logozhengxi.png",
		            			"网聚深圳自媒体力量",
		            			'zhengxie',
		            			"http://z.sznews.com/szzx/index.htm",
		            			'政协');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'sssd': 
		            	setLogo("@深汕视点",
		            			"http://www.sznews.com/2016mi/images/logosssd.png",
		            			"网聚深圳自媒体力量",
		            			'sssd',
		            			"http://z.sznews.com/sssd/index.htm",
		            			'深汕视点');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'renshe': 
		            	setLogo("@人社",
		            			"http://www.sznews.com/2016mi/images/logorenshe.png",
		            			"网聚深圳自媒体力量",
		            			'renshe',
		            			"http://z.sznews.com/szrs/index.htm",
		            			'人社');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'yuer': 
		            	setLogo("@育儿",
		            			"http://www.sznews.com/2016mi/images/logoyuer.png",
		            			"网聚深圳自媒体力量",
		            			'yuer',
		            			"http://z.sznews.com/yuer/index.htm",
		            			'育儿');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'sifa': 
		            	setLogo("@司法",
		            			"http://www.sznews.com/2016mi/images/logosifa.png",
		            			"网聚深圳自媒体力量",
		            			'sifa',
		            			"http://z.sznews.com/sif/index.htm",
		            			'司法');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'caizg': 
		            	setLogo("@财政",
		            			"http://www.sznews.com/2016mi/images/logocaizg.png",
		            			"网聚深圳自媒体力量",
		            			'caizg',
		            			"http://z.sznews.com/caiz/index.htm",
		            			'财政');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'shijn': 
		            	setLogo("@市监",
		            			"http://www.sznews.com/2016mi/images/logoshijn.png",
		            			"网聚深圳自媒体力量",
		            			'shijn',
		            			"http://z.sznews.com/shij/index.htm",
		            			'市监');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'gonghui': 
		            	setLogo("@工会",
		            			"http://www.sznews.com/2016mi/images/logogonghui.png",
		            			"网聚深圳自媒体力量",
		            			'gonghui',
		            			"http://z.sznews.com/gongh/index.htm",
		            			'工会');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'anjian': 
		            	setLogo("@安监",
		            			"http://www.sznews.com/2016mi/images/logoanjian.png",
		            			"网聚深圳自媒体力量",
		            			'anjian',
		            			"http://z.sznews.com/anj/index.htm",
		            			'安监');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'igwshu': 
		            	setLogo("@工务署",
		            			"http://www.sznews.com/2016mi/images/logogwshu.png",
		            			"网聚深圳自媒体力量",
		            			'igwshu',
		            			"http://z.sznews.com/gws/index.htm",
		            			'工务署');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'ibstong': 
		            	setLogo("@百事通",
		            			"http://www.sznews.com/2016mi/images/logobstong.png",
		            			"网聚深圳自媒体力量",
		            			'ibstong',
		            			"http://z.sznews.com/bst/index.htm",
		            			'百事通');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'ittsq': 
		            	setLogo("@天天说钱",
		            			"http://www.sznews.com/2016mi/images/logottsq.png",
		            			"网聚深圳自媒体力量",
		            			'ittsq',
		            			"http://z.sznews.com/ttsq/index.htm",
		            			'天天说钱');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'ijbty': 
		            	setLogo("@晶报体育",
		            			"http://www.sznews.com/2016mi/images/logojbty.png",
		            			"网聚深圳自媒体力量",
		            			'ijbty',
		            			"http://z.sznews.com/jbtiy/index.htm",
		            			'晶报体育');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'i22du': 
		            	setLogo("@22度",
		            			"http://www.sznews.com/2016mi/images/logo22du.png",
		            			"网聚深圳自媒体力量",
		            			'i22du',
		            			"http://z.sznews.com/sz22/index.htm",
		            			'22度');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'iyouhb': 
		            	setLogo("@游惠宝",
		            			"http://www.sznews.com/2016mi/images/logoyhbao.png",
		            			"网聚深圳自媒体力量",
		            			'iyouhb',
		            			"http://z.sznews.com/Hkyh/index.htm",
		            			'游惠宝');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'idche': 
		            	setLogo("@懂车",
		            			"http://www.sznews.com/2016mi/images/logodongche.png",
		            			"网聚深圳自媒体力量",
		            			'idche',
		            			"http://z.sznews.com/idongc/index.htm",
		            			'懂车');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'isuv': 
		            	setLogo("@SUV车友会",
		            			"http://www.sznews.com/2016mi/images/logoSUV.png",
		            			"网聚深圳自媒体力量",
		            			'isuv',
		            			"http://z.sznews.com/suvclub/index.htm",
		            			'SUV车友会');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'isoufang': 
		            	setLogo("@搜房网",
		            			"http://www.sznews.com/2016mi/images/logosoufang.png",
		            			"网聚深圳自媒体力量",
		            			'isoufang',
		            			"http://z.sznews.com/souf/index.htm",
		            			'搜房网');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'imangguo': 
		            	setLogo("@芒果网",
		            			"http://www.sznews.com/2016mi/images/logomangguo.png",
		            			"网聚深圳自媒体力量",
		            			'imangguo',
		            			"http://z.sznews.com/mango/index.htm",
		            			'芒果网');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'igccrc': 
		            	setLogo("@高层人才",
		            			"http://www.sznews.com/2016mi/images/logogaoceng.png",
		            			"网聚深圳自媒体力量",
		            			'igccrc',
		            			"http://z.sznews.com/rcgzw/index.htm",
		            			'高层人才');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'ibajiaoyu': 
		            	setLogo("@宝安教育",
		            			"http://www.sznews.com/2016mi/images/logobajiaoyu.png",
		            			"网聚深圳自媒体力量",
		            			'ibajiaoyu',
		            			"http://z.sznews.com/bajy/index.htm",
		            			'宝安教育');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'igangtie': 
		            	setLogo("@港铁",
		            			"http://www.sznews.com/2016mi/images/logogangtie.png",
		            			"网聚深圳自媒体力量",
		            			'igangtie',
		            			"http://z.sznews.com/gtsz/index.htm",
		            			'港铁');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'iditie': 
		            	setLogo("@深铁",
		            			"http://www.sznews.com/2016mi/images/logoditie.png",
		            			"网聚深圳自媒体力量",
		            			'iditie',
		            			"http://z.sznews.com/szdt/index.htm",
		            			'深铁');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'ichaosh': 
		            	setLogo("@潮生活",
		            			"http://www.sznews.com/2016mi/images/logochaosh.png",
		            			"网聚深圳自媒体力量",
		            			'ichaosh',
		            			"http://z.sznews.com/sgcsh/index.htm",
		            			'潮生活');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'ijiwei': 
		            	setLogo("@纪委",
		            			"http://www.sznews.com/2016mi/images/logojiwei.png",
		            			"网聚深圳自媒体力量",
		            			'ijiwei',
		            			"http://z.sznews.com/ljsz/index.htm",
		            			'纪委');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'irencai': 
		            	setLogo("@人才",
		            			"http://www.sznews.com/2016mi/images/logorencai.png",
		            			"网聚深圳自媒体力量",
		            			'irencai',
		            			"http://z.sznews.com/rcsz/index.htm",
		            			'人才');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'ijichang': 
		            	setLogo("@机场",
		            			"http://www.sznews.com/2016mi/images/logojichang.png",
		            			"网聚深圳自媒体力量",
		            			'ijichang',
		            			"http://z.sznews.com/szbajc/index.htm",
		            			'机场');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'ishuiwujt': 
		            	setLogo("@深水",
		            			"http://www.sznews.com/2016mi/images/logoshuiwujt.png",
		            			"网聚深圳自媒体力量",
		            			'ishuiwujt',
		            			"http://z.sznews.com/szsw/index.htm",
		            			'深水');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'igongjijin': 
		            	setLogo("@公积金",
		            			"http://www.sznews.com/2016mi/images/logogongjijin.png",
		            			"深圳市住房公积金管理中心",
		            			'igongjijin',
		            			"http://z.sznews.com/szgjj/index.htm",
		            			'公积金');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'iminzhengju': 
		            	setLogo("@民政局",
		            			"http://www.sznews.com/2016mi/images/logominzhengju.png",
		            			"网聚深圳自媒体力量",
		            			'iminzhengju',
		            			"http://z.sznews.com/szsmzj/index.htm",
		            			'民政局');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'igqtuan': 
		            	setLogo("@共青团",
		            			"http://www.sznews.com/2016mi/images/logogqtuan.png",
		            			"网聚深圳自媒体力量",
		            			'igqtuan',
		            			"http://z.sznews.com/szgqt/index.htm",
		            			'共青团');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'ishiyao': 
		            	setLogo("@食药",
		            			"http://www.sznews.com/2016mi/images/logoshiyao.png",
		            			"网聚深圳自媒体力量",
		            			'ishiyao',
		            			"http://z.sznews.com/sysz/index.htm",
		            			'食药');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'idapeng': 
		            	setLogo("@大鹏",
		            			"http://www.sznews.com/2016mi/images/logodapeng.png",
		            			"网聚深圳自媒体力量",
		            			'idapeng',
		            			"http://mdp.sznews.com/index.htm",
		            			'大鹏');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'ift': 
		            	setLogo("@福田",
		            			"http://www.sznews.com/2016mi/images/logofutian.png",
		            			"网聚深圳自媒体力量",
		            			'ift',
		            			"http://mfutian.sznews.com/index.htm",
		            			'福田');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'iyt': 
		            	setLogo("@盐田",
		            			"http://www.sznews.com/2016mi/images/logoyantian.png",
		            			"网聚深圳自媒体力量",
		            			'iyt',
		            			"http://myantian.sznews.com/index.htm",
		            			'盐田');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'ilh': 
		            	setLogo("@罗湖",
		            			"http://www.sznews.com/2016mi/images/luohu.png",
		            			"网聚深圳自媒体力量",
		            			'ilh',
		            			"http://mluohu.sznews.com/index.htm",
		            			'罗湖');
		                console.log("cses1="+cxid);
        		setShare();
				        break;
					case 'ilg': 
		            	setLogo("@龙岗",
		            			"http://www.sznews.com/2016mi/images/longganglogo1.png",
		            			"网聚深圳自媒体力量",
		            			'ilg',
		            			"http://mlonggang.sznews.com/index.htm",
		            			'龙岗');
		                console.log("cses1="+cxid);
        		setShare();
		                break;
					case 'igm': 
		            	setLogo("@光明",
		            			"http://www.sznews.com/2016mi/images/guangming.png",
		            			"网聚深圳自媒体力量",
		            			'igm',
		            			"http://mguangming.sznews.com/index.htm",
		            			'光明');
		                console.log("cses1="+cxid);
        		setShare();
		                break;
					case 'iqh': 
		            	setLogo("@前海",
		            			"http://www.sznews.com/2016mi/images/qianhai.png",
		            			"网聚深圳自媒体力量",
		            			'iqh',
		            			"http://mqianhai.sznews.com/index.htm",
		            			'前海');
		                console.log("cses1="+cxid);
        		setShare();
		                break;
					case 'ips': 
		            	setLogo("@坪山",
		            			"http://www.sznews.com/2016mi/images/pingshan.png",
		            			"网聚深圳自媒体力量",
		            			'ips',
		            			"http://mpingshan.sznews.com/index.htm",
		            			'坪山');
		                console.log("cses1="+cxid);
        		setShare();
		                break;
					 case 'ijw': 
		            	setLogo("@交委",
		            			"http://www.sznews.com/2016mi/images/jiaowei.png",
		            			"网聚深圳自媒体力量",
		            			'ijw',
		            			"http://mjiaowei.sznews.com/index.htm",
		            			'交委');
		                console.log("cses1="+cxid);
        		setShare();
		                break;
				   case 'ilongh': 
		            	setLogo("@龙华",
		            			"http://www.sznews.com/2016mi/images/logolonghua.png",
		            			"网聚深圳自媒体力量",
		            			'ilongh',
		            			"http://mlonghua.sznews.com/index.htm",
		            			'龙华');
		                console.log("cses1="+cxid);
        		setShare();
		                break;
		            case 'isz': 
		            	setLogo("@深圳",
		            			"http://www.sznews.com/2016mi/images/logo2.png",
		            			"网聚深圳自媒体力量",
		            			'isz',
		            			"http://i.sznews.com",
		            			'头条');
		                console.log("cses1="+cxid);
        		setShare();
		                break;
		            case 'ins': 
		            	setLogo("@南山",
		            			"http://www.sznews.com/2016mi/images/logonanshan.png",
		            			"网聚深圳自媒体力量",
		            			"ins",
		            			"http://mnanshan.sznews.com/",
		            			'南山');
        		setShare();
		                break;
		            case 'iga': 
		            	setLogo("@公安",
		            			"http://www.sznews.com/2016mi/images/logopolice.png",
		            			"网聚深圳自媒体力量",
		            			"iga",
		            			"http://mgongan.sznews.com/",
		            			'公安');
        		setShare();
        				break;  
		            case 'iba': 
		            	setLogo("@宝安",
		            			"http://www.sznews.com/2016mi/images/logobaoan.png",
		            			"网聚深圳自媒体力量",
		            			'iba',
		            			"http://mbaoan.sznews.com/index.htm",
		            			'宝安');
        		setShare();
        				break;
		            default:
					   	setLogo("深圳新闻网",
					   			"http://www.sznews.com/2016mi/images/logo.png",
					   			"深圳第一新闻门户网站",
					   			'',
					   			"http://m.sznews.com",
					   			'头条');
		                break;
		        }

        }



		//去除分享按钮href
		$(function(){
			console.log("zh begin");
			$(".sico-weixin").attr("href","javascript:;");
			$(".sico-sina").attr("href","javascript:;");
			$(".sico-tencent").attr("href","javascript:;");
			$(".sico-baidu").attr("href","javascript:;");
			$(".sico-fav").attr("href","javascript:;");
			// $(".see-pc").attr("href","javascript:;");
			console.log("zh end");

		});
});