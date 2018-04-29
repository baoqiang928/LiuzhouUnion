angular.module("myApp")
    .controller('QRCodeCtrl', function ($scope, $location, requestService, $state, locals) {
        $scope.VisitorInfo = locals.getObject("VisitorInfo");
        $scope.picpath = "";
        $scope.msg = "请保存下面二维码，入场使用，谢谢。";
        requestService.add("?Action=GetQRCode", $scope.VisitorInfo).then(function (data) {
            $scope.picpath = data.PicPath;
        });
    });