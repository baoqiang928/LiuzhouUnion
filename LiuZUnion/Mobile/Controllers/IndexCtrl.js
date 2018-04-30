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

    });


