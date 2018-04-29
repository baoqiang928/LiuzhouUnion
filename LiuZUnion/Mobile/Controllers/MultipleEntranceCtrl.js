angular.module("myApp")
    .controller('MultipleEntranceCtrl', function ($scope, $location, requestService, $state, locals) {
        locals.set("ExhiID", 36); //内网
        //locals.set("ExhiID", 42);

        $scope.ClickParticipate14 = function () {
            locals.set("Participate", 14);
            $state.go("info");
        }
        $scope.ClickParticipate2 = function () {
            locals.set("Participate", 2);
            $state.go("info");
        }
        $scope.ModifyInvoiceInfo = function () {
            locals.set("LoginToOperate", "Invoice");
            $state.go("login");
        }
        $scope.BuyHotel = function () {
            locals.set("LoginToOperate", "Hotel");
            $state.go("login");
        }
        $scope.ViewQRCode = function () {
            locals.set("LoginToOperate", "QRCode");
            $state.go("login");
        }
        $scope.RegForCooleague = function () {
            locals.set("LoginToOperate", "RegForCooleague");
            $state.go("login");
        }

    });