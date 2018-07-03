angular.module("myApp")
    .controller('IndexCtrl', function ($scope, $location, requestService, $state, $stateParams, locals) {

        $scope.ColumnInfoList = [];
        $scope.data = {
            ProjectID: "0",
            TreeTypeID: "5",
            FatherIDs: "45",
            OpeType: "GetChildren"
        };
        console.log("$scope.data", $scope.data);
        $("#js_plugins_loading").attr("style", "");
        $scope.GetColumnInfoList = function () {
            requestService.lists("DictionaryBigTreesView", $scope.data).then(function (data) {
                $scope.ColumnInfoList = data;
                if ((GetQueryString('ColIndex') == "1") && ($scope.ColumnInfoList.length > 0)) {
                    $scope.ColumnInfoList[0].ActiveStatus = "active";
                    $scope.CurrentColumnID = $scope.ColumnInfoList[0].id;
                    $scope.goto($scope.ColumnInfoList[0].id);
                }
            });
        }
        $scope.GetColumnInfoList();
        $scope.CurrentColumnID = "";
        $scope.goto = function (ColumnID) {
            $("#js_plugins_loading").attr("style", "");
            $scope.CurrentColumnID = ColumnID;
            $state.go("list", { "ColumnID": ColumnID });
        };

        $scope.GetActiveStatus = function (id) {
            if (id == $scope.CurrentColumnID) return "active";
            return "";
        };


    });//End


