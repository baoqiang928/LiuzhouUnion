angular.module("myApp")
    .controller('DetailCtrl', function ($scope, $location, requestService, $state, $stateParams, locals) {
        if (GetUserID($stateParams.UserID, locals.get("UserID")) == "-1") return;
        $scope.UserID = GetUserID($stateParams.UserID, locals.get("UserID"));
        locals.set("UserID", $scope.UserID);

        $scope.CurrentColumnName = $stateParams.ColumnName;
        $scope.ArticleInfoList = [];
        $scope.data1 = {
            currentPage: "",
            itemsPerPage: "",
            UserID: $scope.UserID,
            ColumnName: "",
            BigPictureDisplay: ""
        };

        var ID = $stateParams.ID;//getQueryString("ID");
        $scope.data = {
            UserID: $scope.UserID,
            ColumnName: "",
            Serial: "",
            Hot: "",
            ID: "",
            Title: "",
            HtmlNote: "",
            Department: "",
            CreateDateTime: "",
            TopDisplay: "",
            CoverPicUrl:"",
            BigPictureDisplay: ""
        };
        requestService.getobj("Articles", ID).then(function (data) {
            $scope.data = data;
            $("title").html(data.Title);
            var d = {
                url: location.href
            }
            $scope.ShareInfo(data.Title, data.Note, data.CoverPicUrl, d);
        });


        //Share
        $scope.Token = "";
        var images = {
            localIds: [],
            serverIds: []
        };
        var len = 0;

        $scope.ShareInfo = function (Title, HtmlNote, CoverPicUrl, d) {
            requestService.lists("WechatIdentitys", d).then(function (data) {
                $scope.Token = data.Token;
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wxeb03befcc408dc9a', // 必填，公众号的唯一标识
                    timestamp: data.Timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.NonceStr, // 必填，生成签名的随机串
                    signature: data.Signature,// 必填，签名，见附录1
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'
                    ]   // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

                wx.ready(function () {
                    var shareData = {
                        title: Title,	//	标题
                        desc: HtmlNote,	//	描述
                        link: d.url,	//	分享的URL，必须和当前打开的网页的URL是一样的
                        imgUrl: CoverPicUrl	//	缩略图地址
                    };
                    wx.onMenuShareAppMessage(shareData);
                    wx.onMenuShareTimeline(shareData);
                });
                wx.error(function (res) {
                    alert(res.errMsg);//错误提示
                });
            });
        };
       
        //Share End



    });

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    } else {
        return null;
    }
}

angular.module('myApp')
    .filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);