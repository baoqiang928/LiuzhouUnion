angular.module("myApp")
    .controller('SuccessCtrl', function ($scope, $location, requestService, $state, locals) {
        $scope.LogoPicName = GetLogoPicName(locals.get("Participate"));
        $scope.LocalVisitorInfo = locals.getObject("VisitorInfo");
        $scope.VisitorInfo = {
            ID: locals.get("VisitorID"),
            ExhiID: locals.get("ExhiID"),
            Title: locals.getObject("Participate")
        };
        $scope.msg = "";
        $scope.GetSuccessMessage = function () {
            requestService.add("?Action=GetSuccessMessage", $scope.VisitorInfo).then(function (data) {
                $scope.msg = data.ConfigNote;
                $scope.msg = $scope.msg.replace("[观众姓名]", $scope.LocalVisitorInfo.RealName);
                $scope.msg = $scope.msg.replace("[付款金额]", $scope.LocalVisitorInfo.TotalMeetingAmount + "元");
            });
        }
        $scope.GetSuccessMessage();
        console.log("$scope.LocalVisitorInfo", $scope.LocalVisitorInfo);
        $scope.SendEmailAfterRegist = function () {
            if (locals.get("Participate") == "14") {
                requestService.add("?Action=SendEmailAfterRegist14", $scope.LocalVisitorInfo).then(function (data) {
                });
            }
            else {
                requestService.add("?Action=SendEmailAfterRegist2", $scope.LocalVisitorInfo).then(function (data) {
                });
            }
        }
        $scope.SendEmailAfterRegist();

        $scope.SendSMSAfterRegist = function () {
            requestService.add("?Action=SendSMS", $scope.LocalVisitorInfo).then(function (data) {
            });
        }
        $scope.SendSMSAfterRegist();

    });

angular.module('myApp')
    .filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);