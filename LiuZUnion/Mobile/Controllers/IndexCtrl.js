angular.module("myApp")
    .controller('IndexCtrl', function ($scope, $location, requestService, $state, locals) {

        //$scope.images = [1, 2, 3, 4, 5, 6, 7, 8];
        //$scope.loadMore = function () {
        //    var last = $scope.images[$scope.images.length - 1];
        //    for (var i = 1; i <= 8; i++) {
        //        $scope.images.push(last + i);
        //    }
        //};

        $scope.DictionaryList = [];
        $scope.data = {
            ids: "3^4^5^6^7^8"
        };
        requestService.lists("Dictionary", $scope.data).then(function (data) {
            $scope.DictionaryList = data;
        });

        $scope.CurrentDicID = "3";
        $scope.data1 = {
            currentPage: "0",
            itemsPerPage: "2",
            Title: "",
            DicID: $scope.CurrentDicID
        };
        $scope.goto = function (id) {
            $scope.CurrentDicID = id;
            $scope.data1.DicID = id;
            $scope.data1.currentPage = 1;
            //$scope.data1.Title = "5";
            console.log("$scope.data1", $scope.data1);
            requestService.lists("Articles", $scope.data1).then(function (data) {
                $scope.ArticleInfoList = data.Results;
                console.log("$scope.ArticleInfoList", $scope.ArticleInfoList);
            });

        };


        $scope.loadMore = function () {
            //    var last = $scope.images[$scope.images.length - 1];
            //    for (var i = 1; i <= 8; i++) {
            //        $scope.images.push(last + i);
            //    }
            //};
            //$scope.data1.DicID = "1";
            $scope.data1.currentPage = parseInt($scope.data1.currentPage) + 1;
            $scope.data1.DicID = $scope.CurrentDicID;
            //$scope.data1.Title = "5";
            console.log("$scope.data2", $scope.data1);
            requestService.lists("Articles", $scope.data1).then(function (data) {
                if (data.Results.length > 0) {
                    for (var i = 0; i < data.Results.length; i++) {
                        $scope.ArticleInfoList.push(data.Results[i]);
                    }
                }
                console.log("$scope.ArticleInfoList", $scope.ArticleInfoList);
            });

        };




    });//End


