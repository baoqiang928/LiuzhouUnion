angular.module("myApp")
    .controller('IndexCtrl', function ($scope, $location, requestService, $state, locals) {
        $scope.DictionaryList = [];
        $scope.data = {
            ids: "3^4^5^6^7^8"
        };
        requestService.lists("Dictionary", $scope.data).then(function (data) {
            $scope.DictionaryList = data;
            console.log("$scope.Dictionary", data);
        });


        $scope.goto = function (id) {
            $scope.data1 = {
                currentPage: "",
                itemsPerPage: "",
                Title: "",
                DicID: "1"
            };
            //$scope.data1.DictID = "1";
            $scope.data1.currentPage = 1;
            $scope.data1.itemsPerPage = "5";
            //$scope.data1.Title = "5";
            console.log("$scope.data1", $scope.data1);
            requestService.lists("Articles", $scope.data1).then(function (data) {
                $scope.ArticleInfoList = data.Results;
                console.log("$scope.ArticleInfoList", $scope.ArticleInfoList);
            });

        };



    });


