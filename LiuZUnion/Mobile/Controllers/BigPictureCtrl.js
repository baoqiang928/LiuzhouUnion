angular.module("myApp")
    .controller('BigPictureCtrl', function ($scope, $location,$http, requestService, $state, $stateParams, locals) {

        $scope.data1 = {
            currentPage: "1",
            itemsPerPage: "3",
            Title: "",
            DicIDs: "",
            BigPictureDisplay: "True"
        };
        $scope.data1.currentPage = 1;
        $scope.data1.itemsPerPage = 3;
        $scope.ArticleInfoList = [];
        requestService.lists("Articles", $scope.data1).then(function (data) {
            console.log("data.Results", data.Results);
            $scope.ArticleInfoList = data.Results;
        });



        $scope.ShowArticle = function (ID) {
            $state.go("detail", { "ID": ID });
        };
    });


function GetUserID(ParamUserID, LocalsUserID) {
    if ((ParamUserID == null) && (typeof LocalsUserID == 'undefined')) {
        alert('无法识别用户身份');
        return "-1";
    }

    if (ParamUserID != null) {
        return ParamUserID;
    }
    else {
        return LocalsUserID;
    }
}

