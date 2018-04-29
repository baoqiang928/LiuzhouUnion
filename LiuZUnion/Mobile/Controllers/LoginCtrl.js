angular.module("myApp")
    .controller('LoginCtrl', function ($scope, $location, requestService, $state, locals) {
        $scope.LogoPicName = GetLogoPicName(locals.get("Participate"));
        if (locals.get("LoginToOperate") == "Hotel")
        {
            $scope.LogoPicName = "newlogo.jpg";
        }
        $scope.VisitorInfo = {
            ExhiID: locals.get("ExhiID"),
            CellPhone: ""
        };
        $scope.Login = function (isValid) {
            if (!isValid) {
                return;
            }
            requestService.add("?Action=GetVisitor", $scope.VisitorInfo).then(function (data) {
                //验证
                if (data.ExhiID == null) {
                    alert("信息不存在，请重新输入。");
                    return;
                }
                console.log("data", data);
                if (((data.Country == null) || (data.Country == "")) && (locals.get("LoginToOperate") != "RegForCooleague")) {
                    alert("请先付款后，在操作此项功能。");
                    return;
                }
                
                data.CreateDate = "";
                locals.setObject("VisitorInfo", data);
                console.log("setObject", data);

                if (locals.get("LoginToOperate") == "Invoice")
                    $state.go("invoice");
                if (locals.get("LoginToOperate") == "Hotel")
                    $state.go("hotelinfo");
                if (locals.get("LoginToOperate") == "QRCode")
                    $state.go("qrcode");
                if (locals.get("LoginToOperate") == "RegForCooleague")
                    $state.go("info");

            });
        }

        $scope.SendValidCode = function () {
            if ($scope.VisitorInfo.CellPhone == "") {
                alert("请输入手机。");
                return;
            }
            var obj = $("#btnSendCode");
            settime(obj);
            requestService.add("?Action=SendValidCode", $scope.VisitorInfo).then(function (data) {
                console.log("data", data);
                console.log("$scope.VisitorInfo", $scope.VisitorInfo);
                alert(data.msg);
            });
        }

    });