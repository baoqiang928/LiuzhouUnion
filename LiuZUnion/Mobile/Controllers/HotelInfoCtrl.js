angular.module("myApp")
    .controller('HotelInfoCtrl', function ($scope, $location, requestService, $state, locals) {
        $scope.LogoPicName = GetLogoPicName(locals.get("Participate"));
        $scope.Go = function () {
            $state.go("success");
        }

        $scope.Buy = function () {
            $state.go("hotel");
        };

        //9号楼
        $scope.building9 = 80;
        //6号楼
        $scope.building6 = 178;
      
        //标准间
        $scope.NormalRoom = 70;
        //大床房
        $scope.BigBedRoom = 50;


        requestService.add("?Action=GetHotelCount", "9号楼双人间").then(function (data) {
            console.log("data", data);
            $scope.building9 = 80 - parseInt(data);
        });

        requestService.add("?Action=GetHotelCount", "普通双人间").then(function (data) {
            console.log("data", data);
            $scope.building6 = 178 - parseInt(data);
        });
       
        requestService.add("?Action=GetHotelCount", "标准间").then(function (data) {
            console.log("data", data);
            $scope.NormalRoom = 70 - parseInt(data);
        });
        requestService.add("?Action=GetHotelCount", "大床房").then(function (data) {
            console.log("data", data);
            $scope.BigBedRoom = 50 - parseInt(data);
        });


    });