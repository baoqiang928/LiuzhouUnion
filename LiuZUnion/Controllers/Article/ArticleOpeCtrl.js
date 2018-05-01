angular.module("myApp")
    .controller('ArticleOpeCtrl', function ($scope, $location, requestService, $stateParams, $state) {
        $scope._simpleConfig = {
            //初始化编辑器内容  
            content: '<p>test1</p>',
            //是否聚焦 focus默认为false  
            focus: true,
            //首行缩进距离,默认是2em  
            indentValue: '2em',
            //初始化编辑器宽度,默认1000  
            initialFrameWidth: '100%',
            //初始化编辑器高度,默认320  
            initialFrameHeight: 720,
            //编辑器初始化结束后,编辑区域是否是只读的，默认是false  
            readonly: false,
            //启用自动保存  
            enableAutoSave: false,
            //自动保存间隔时间， 单位ms  
            saveInterval: 500,
            //是否开启初始化时即全屏，默认关闭  
            fullscreen: false,
            //图片操作的浮层开关，默认打开  
            imagePopup: true,
            //提交到后台的数据是否包含整个html字符串  
            allHtmlEnabled: false,
            //额外功能添加
            functions: ['map', 'insertimage', 'insertvideo', 'attachment',
            , 'insertcode', 'webapp', 'template',
            'background', 'wordimage']
        };
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
            UE.getEditor('idTest').setContent(" ", true);
            $scope.$apply();//必需手动进行脏值检测,否则数据无法刷新到界面  
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

