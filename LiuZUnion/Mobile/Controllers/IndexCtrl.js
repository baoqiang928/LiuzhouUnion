angular.module("myApp")
    .controller('IndexCtrl', function ($scope, $location, requestService, $state,$stateParams, locals) {
        if (GetUserID($stateParams.UserID, locals.get("UserID")) == "-1") return;
        $scope.UserID = GetUserID($stateParams.UserID, locals.get("UserID"));
        locals.set("UserID", $scope.UserID);

        $scope.ColumnInfoList = [];
        $scope.data = {
            currentPage: "",
            itemsPerPage: "",
            UserID: $scope.UserID
        };
        $("#js_plugins_loading").attr("style", "");
        $scope.GetColumnInfoList = function () {
            $scope.data.currentPage = 1;
            $scope.data.itemsPerPage = "999";
            requestService.lists("Columns", $scope.data).then(function (data) {
                $scope.ColumnInfoList = data.Results;
                if ((GetQueryString('ColIndex')=="1") && ($scope.ColumnInfoList.length > 0))
                {
                    $scope.ColumnInfoList[0].ActiveStatus = "active";
                    $scope.CurrentColumn = $scope.ColumnInfoList[0].Name;
                    $scope.goto($scope.ColumnInfoList[0].Name);
                }                
            });
        }
        $scope.GetColumnInfoList();
        $scope.CurrentColumn = "";
        $scope.goto = function (ColumnName) {
            $("#js_plugins_loading").attr("style", "");
            $scope.CurrentColumn = ColumnName;
            $state.go("list", { "ColumnName": ColumnName });
        };

        $scope.GetActiveStatus = function (name) {
            if (name == $scope.CurrentColumn) return "active";
            return "";
        };
        

    });//End


