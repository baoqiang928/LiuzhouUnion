angular.module("myApp")
    .controller('BrankListCtrl', function ($scope, $location, requestService, $state, $stateParams, locals) {
        $scope.CurrentColumnID = $stateParams.ColumnID;
        if ((typeof $scope.CurrentColumnID == 'undefined') || ($scope.CurrentColumnID == null)) {
            $scope.CurrentColumnID = $scope.$parent.CurrentColumnID;
        }

        $scope.data = {
            ProjectID: "0",
            TreeTypeID: "5",
            FatherIDs: $scope.CurrentColumnID,
            OpeType: "GetChildren"
        };
        $scope.ColumnInfoList = [];
        requestService.lists("DictionaryBigTreesView", $scope.data).then(function (data) {
            $scope.ColumnInfoList = data;
            $("#js_plugins_loading").attr("style", "display: none;");
        });


        $scope.ShowColumn = function (ColumnID) {
            $state.go("list", { "ColumnID": ColumnID });
        };


    });


