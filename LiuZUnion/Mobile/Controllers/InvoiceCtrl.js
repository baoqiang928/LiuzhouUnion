angular.module("myApp")
    .controller('InvoiceCtrl', function ($scope, $location, requestService, $state, locals) {
        $scope.LogoPicName = GetLogoPicName(locals.get("Participate"));
        $scope.VisitorInfo = locals.getObject("VisitorInfo");
        console.log("$scope.VisitorInfo_from invoice", $scope.VisitorInfo);
        $scope.InvoiceInfo = {
            ID: "",
            VisitorID: "",
            ExhiID: "",
            CompanyTitle: "",
            TaxNumber: "",
            Address: "",
            Phone: "",
            BankName: "",
            BankAccount: "",
            DeliveryAddress: "",
            ContactName: "",
            ContactTel: "",
            NoNeed: ""
        };
        $scope.InvoiceInfo.VisitorID = $scope.VisitorInfo.ID;
        $scope.InvoiceInfo.ExhiID = $scope.VisitorInfo.ExhiID;
        console.log("$scope.InvoiceInfo invoice123", $scope.InvoiceInfo);

        //自动加载原有发票信息
        requestService.add("?Action=GetInvoice", $scope.InvoiceInfo).then(function (data) {
            console.log("data", data);
            if (data.VisitorID == null) return;
            $scope.InvoiceInfo = data;
            console.log("InvoiceInfo data", $scope.InvoiceInfo);
        });


        $scope.InsertInvoice = function (isValid) {
            if (!isValid) {
                return;
            }
            console.log("$scope.InvoiceInfo", $scope.InvoiceInfo);
            requestService.add("?Action=InsertInvoice", $scope.InvoiceInfo).then(function (data) {
                $state.go("success");
            });
        }

        $scope.NoInvoice = function () {
            question = confirm("确实不需要发票吗，一旦确认不能更改?")
            if (question != "0") {
                $scope.InvoiceInfo = {
                    ID: "",
                    VisitorID: $scope.VisitorInfo.ID,
                    ExhiID: $scope.VisitorInfo.ExhiID,                    
                    NoNeed: "不需要发票"
                };
                requestService.add("?Action=InsertInvoice", $scope.InvoiceInfo).then(function (data) {
                    $state.go("success");
                });
                return;
            }
        }

    });