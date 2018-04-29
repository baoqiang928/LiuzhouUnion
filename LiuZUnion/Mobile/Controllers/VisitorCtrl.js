angular.module("myApp")
    .controller('VisitorCtrl', function ($scope, $location, requestService, $state, locals) {

        if (locals.get("LoginToOperate") == "RegForCooleague") {
            $scope.VisitorInfo = locals.getObject("VisitorInfo");
            $scope.VisitorInfo.ID = "";
            $scope.VisitorInfo.RealName = "";
            $scope.VisitorInfo.CellPhone = "";
            $scope.VisitorInfo.CreateDate = "";
        }
        else {
            $scope.VisitorInfo = {
                ExhiID: "42",//locals.get("ExhiID"),
                CompanyName: "",
                RealName: "",
                Rank: "",
                CellPhone: "",
                Email: "",
                Suggest: "铸件生产企业/Casting"
            };
        }

        $scope.LogoPicName = GetLogoPicName(locals.get("Participate"));

        $scope.InsertVisitor = function (isValid) {
            if (!isValid) {
                return;
            }
            $scope.VisitorInfo.WebSite = locals.get("Participate");
            requestService.add("?Action=InsertVisitor", $scope.VisitorInfo).then(function (data) {
                if (data.RealName == "手机号码重复") {
                    alert("相同手机号码只能注册一次。");
                    return;
                }
                if (data.RealName == "请输入正确验证码") {
                    alert("请输入正确验证码。");
                    return;
                }
                locals.setObject("VisitorInfo", data);
                if (locals.get("Participate") == "14") {
                    $state.go("specialmeeting");
                    return;
                }
                $state.go("meeting");
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


var countdown = 60;
function sendemail() {
    var obj = $("#btnSendCode");
    settime(obj);
}
function settime(obj) { //发送验证码倒计时
    if (countdown == 0) {
        obj.attr('disabled', false);
        //obj.removeattr("disabled"); 
        obj.text("发送验证码");
        countdown = 60;
        return;
    } else {
        obj.attr('disabled', true);
        obj.text("重新发送(" + countdown + ")");
        countdown--;
    }
    setTimeout(function () {
        settime(obj)
    }
        , 1000);
}
