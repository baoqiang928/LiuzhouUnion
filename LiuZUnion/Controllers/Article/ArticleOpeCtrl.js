angular.module("myApp")
    .controller('ArticleOpeCtrl', function ($scope, $location, requestService, $stateParams, $state) {
        var Sources = "Articles";
        $scope.data = {
            DicID: "",
            SerialNum: "",
            Title: "",
            Note: "",
            Remark: ""
        };

        if ($stateParams.ID != null) {
            requestService.getobj(Sources, $stateParams.ID).then(function (data) {
                $scope.data = data;
            });
        }

        $scope.Save = function () {

            if (!$('#validation-form').valid()) {
                return false;
            }

            if ($stateParams.ID == "") {
                requestService.add(Sources, $scope.data).then(function (data) {
                    $state.go("ArticleList");
                });
                return;
            }

            requestService.update(Sources, $scope.data).then(function (data) {
                $state.go("ArticleList");
            });
        };


        $('#validation-form').validate({
            errorElement: 'div',
            errorClass: 'help-block',
            focusInvalid: false,
            rules: {
                Title: {
                    required: true,
                    maxlength: 500
                },
                Note: {
                    maxlength: 2000
                },
                Remark: {
                    maxlength: 1000
                }
            },

            messages: {
                DicID: {
                    required: "请填写DicID。",
                    maxlength: "输入内容过多，请重新输入。"
                },
                SerialNum: {
                    required: "请填写顺序号。",
                    maxlength: "输入内容过多，请重新输入。"
                },
                Title: {
                    required: "请填写名称。",
                    maxlength: "输入内容过多，请重新输入。"
                },
                Note: {
                    maxlength: "输入内容过多，请重新输入。"
                },
                Remark: {
                    maxlength: "输入内容过多，请重新输入。"
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit   
                $('.alert-danger', $('.login-form')).show();
            },

            highlight: function (e) {
                $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
            },

            success: function (e) {
                $(e).closest('.form-group').removeClass('has-error').addClass('has-info');
                $(e).remove();
            },

            errorPlacement: function (error, element) {
                if (element.is(':checkbox') || element.is(':radio')) {
                    var controls = element.closest('div[class*="col-"]');
                    if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
                    else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
                }
                else if (element.is('.select2')) {
                    error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
                }
                else if (element.is('.chosen-select')) {
                    error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
                }
                else error.insertAfter(element.parent());
            },

            submitHandler: function (form) {
            },
            invalidHandler: function (form) {
            }
        });


    });//end

