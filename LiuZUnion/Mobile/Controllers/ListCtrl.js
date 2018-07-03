angular.module("myApp")
    .controller('ListCtrl', function ($scope, $location, requestService, $state, $stateParams, locals) {
        if (GetUserID($stateParams.UserID, locals.get("UserID")) == "-1") return;
        $scope.UserID = GetUserID($stateParams.UserID, locals.get("UserID"));
        locals.set("UserID", $scope.UserID);
        $scope.CurrentColumnName = $stateParams.ColumnName;
        console.log("$scope.CurrentColumnName", $scope.CurrentColumnName);
        if ((typeof $scope.CurrentColumnName == 'undefined') || ($scope.CurrentColumnName == null)) {
            $scope.CurrentColumnName = $scope.$parent.CurrentColumn;
        }
        $scope.busy = true;

        $scope.data1 = {
            currentPage: "1",
            itemsPerPage: "5",
            UserID: $scope.UserID,
            ColumnName: $scope.CurrentColumnName,
            BigPictureDisplay: ""
        };
        $scope.data1.currentPage = 1;
        $scope.data1.itemsPerPage = 5;
        $scope.ArticleInfoList = [];
        requestService.lists("Articles", $scope.data1).then(function (data) {
            console.log("data.Results222", data.Results);
            $scope.ArticleInfoList = data.Results;
            $("#js_plugins_loading").attr("style", "display: none;");
            $scope.data1.currentPage = 2;
            $scope.busy = false;
        });

        $scope.loadMore = function () {
            if ($scope.busy) {
                $("#js_plugins_loading").attr("style", "display: none;");
                return;
            }
            $scope.busy = true;
            requestService.lists("Articles", $scope.data1).then(function (data) {
                $("#js_plugins_loading").attr("style", "display: none;");
                if (data.Results.length > 0) {
                    for (var i = 0; i < data.Results.length; i++) {
                        $scope.ArticleInfoList.push(data.Results[i]);
                    }
                    $scope.data1.currentPage = parseInt($scope.data1.currentPage) + 1;
                }
                $scope.busy = false;
            });

        };

        $scope.ShowArticle = function (ID, ColumnName) {
            $state.go("detail", { "ID": ID, "ColumnName": ColumnName });
        };

        $scope.NormalFilter = function (item) {
            if (item.BigPictureDisplay == "True") {
                return false;
            }
            return true;
        };

    });


