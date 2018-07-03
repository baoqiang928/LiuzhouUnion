angular.module("myApp")
    .controller('ListCtrl', function ($scope, $location, requestService, $state, $stateParams, locals) {
        $scope.CurrentColumnID = $stateParams.ColumnID;
        if ((typeof $scope.CurrentColumnID == 'undefined') || ($scope.CurrentColumnID == null)) {
            $scope.CurrentColumnID = $scope.$parent.CurrentColumnID;
        }
        $scope.busy = true;
        $scope.data1 = {
            currentPage: "1",
            itemsPerPage: "5",
            Title:"",
            DicIDs: $scope.CurrentColumnID,
            BigPictureDisplay: ""
        };
        $scope.data1.currentPage = 1;
        $scope.data1.itemsPerPage = 5;
        $scope.ArticleInfoList = [];
        requestService.lists("Articles", $scope.data1).then(function (data) {
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

        $scope.ShowArticle = function (ID, ColumnID) {
            $state.go("detail", { "ID": ID, "ColumnID": ColumnID });
        };

        $scope.NormalFilter = function (item) {
            if (item.BigPictureDisplay == "True") {
                return false;
            }
            return true;
        };

    });


