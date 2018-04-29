angular.module("myApp")
    .controller('HotelCtrl', function ($scope, $location, requestService, $state, locals) {
        $scope.LogoPicName = "newlogo.jpg";
        $scope.HotelDays = [{ id: 1, name: '1' }, { id: 2, name: '2' }, { id: 3, name: '3' }];
        $scope.VisitorInfo = locals.getObject("VisitorInfo");
        console.log("$scope.VisitorInfo", $scope.VisitorInfo);
        $scope.Hotel1Start513 = "";
        $scope.Hotel1Start514 = "";
        $scope.Hotel1End514 = "";
        $scope.Hotel1End515 = "";

        $scope.Hotel1RoomType9 = "";
        $scope.Hotel1RoomType6 = "";
        $scope.Hotel1RoomType5 = "";
        $scope.Hotel1RoomType4 = "";
        $scope.Hotel1RoomType3 = "";

        $scope.Hotel2Start515 = "";
        $scope.Hotel2Start516 = "";
        $scope.Hotel2Start517 = "";
        $scope.Hotel2Start518 = "";

        $scope.Hotel2End516 = "";
        $scope.Hotel2End517 = "";
        $scope.Hotel2End518 = "";
        $scope.Hotel2End519 = "";

        $scope.Hotel2RoomType1 = "";
        $scope.Hotel2RoomType2 = "";

        $scope.InsertHotel = function () {

            if (($scope.VisitorInfo.HotelAD1 != null) && ($scope.VisitorInfo.HotelAD1 != "") &&
                ($scope.VisitorInfo.HotelAD2 != null) && ($scope.VisitorInfo.HotelAD2 != "") &&
                ($scope.VisitorInfo.HotelAD3 != null) && ($scope.VisitorInfo.HotelAD3 != "")) {
                var days = DateDiff($scope.VisitorInfo.HotelAD1, $scope.VisitorInfo.HotelAD2);
                if (days == 0) days = days + 1;
                if (days < 0) {
                    alert("离店时间晚于入驻时间，请重新输入。");
                    return;
                }
                var price1 = 0;
                if ($scope.VisitorInfo.HotelAD3 == "9号楼双人间")
                    price1 = 590;
                if ($scope.VisitorInfo.HotelAD3 == "普通双人间")
                    price1 = 490;
                $scope.VisitorInfo.HotelA = price1 * days;
            }

            if (($scope.VisitorInfo.HotelBD1 != null) && ($scope.VisitorInfo.HotelBD1 != "") &&
                ($scope.VisitorInfo.HotelBD2 != null) && ($scope.VisitorInfo.HotelBD2 != "") &&
                ($scope.VisitorInfo.HotelBD3 != null) && ($scope.VisitorInfo.HotelBD3 != "")) {
                days = DateDiff($scope.VisitorInfo.HotelBD1, $scope.VisitorInfo.HotelBD2);
                if (days == 0) days = days + 1;
                if (days < 0) {
                    alert("离店时间晚于入驻时间，请重新输入。");
                    return;
                }
                var price2 = 0;
                if ($scope.VisitorInfo.HotelBD3 == "标准间")
                    price2 = 510;
                if ($scope.VisitorInfo.HotelBD3 == "大床房")
                    price2 = 510;

                $scope.VisitorInfo.HotelB = price2 * days;
            }


            //if (($scope.VisitorInfo.HotelA == null)
            //    || ($scope.VisitorInfo.HotelAD1 == null)
            //    || ($scope.VisitorInfo.HotelAD2 == null)
            //    || ($scope.VisitorInfo.HotelAD3 == null)) {
            //    alert("请完整填写酒店信息。");
            //    return;
            //}

            requestService.add("?Action=InsertHotel", $scope.VisitorInfo).then(function (data) {
                alert('购买酒店成功。');
                $state.go("MultipleEntrance");
            });
        }

        $scope.GotoIntroducePage = function () {
            $state.go("hotelinfo");
        }

    });

// 计算两个日期的间隔天数  
function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2002-12-18格式   
    var FromDate = sDate1.split("-");
    var ToDate = sDate2.split("-");
    return parseInt(ToDate[0] + ToDate[1] + ToDate[2]) - parseInt(FromDate[0] + FromDate[1] + FromDate[2]);
    //oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为12-18-2002格式   
    //aDate = sDate2.split("-")
    //oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    //iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数   
    //return iDays
}