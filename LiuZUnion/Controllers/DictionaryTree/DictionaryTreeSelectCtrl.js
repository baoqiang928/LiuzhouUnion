angular.module("myApp")
    .controller('DictionaryTreeSelectCtrl', function ($scope, $location, requestService, $state) {

        var setting = {
            check: {
                enable: true,
                chkboxType: { "Y": "", "N": "" }
            },
            view: {
                dblClickExpand: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                beforeClick: beforeClick,
                onCheck: onCheck
            }
        };

        //var zNodes = [
		//	{ id: 1, pId: 0, name: "北京" },
		//	{ id: 2, pId: 0, name: "天津" },
		//	{ id: 3, pId: 0, name: "上海" },
		//	{ id: 6, pId: 0, name: "重庆" },
		//	{ id: "41", pId: "4", name: "石家庄1", open: false, nocheck: false },
		//	{ id: 42, pId: 4, name: "保定" },
		//	{ id: 43, pId: 4, name: "邯郸" },
		//	{ id: 44, pId: 4, name: "承德" },
		//	{ id: 5, pId: 0, name: "广东省", open: true, nocheck: true },
		//	{ id: 51, pId: 5, name: "广州" },
		//	{ id: 52, pId: 5, name: "深圳" },
		//	{ id: 53, pId: 5, name: "东莞" },
		//	{ id: 54, pId: 5, name: "佛山" },
		//	{ id: 6, pId: 0, name: "福建省", open: true, nocheck: true },
		//	{ id: 61, pId: 6, name: "福州" },
		//	{ id: 62, pId: 6, name: "厦门" },
		//	{ id: 63, pId: 6, name: "泉州" },
		//	{ id: "4", pId: "0", name: "河北省", open: true, nocheck: true },
		//	{ id: "64", pId: "6", name: "三明" }
        //];
        var zNodes = [{ id: 1, pId: 0, name: "工会资讯", open: true, nocheck: true }, { id: 3, pId: 0, name: "通知公告", open: true, nocheck: true }, { id: 8, pId: 0, name: "劳模风采", open: true, nocheck: true }, { id: 11, pId: 0, name: "市直运动会", open: true, nocheck: true }, { id: 13, pId: 0, name: "法律法规", open: true, nocheck: true }, { id: 14, pId: 0, name: "培训教育", open: true, nocheck: true }, { id: 22, pId: 0, name: "律师咨询", open: true, nocheck: true }, { id: 25, pId: 0, name: "心理咨询", open: true, nocheck: true }, { id: 28, pId: 0, name: "优惠购物", open: true, nocheck: true }, { id: 31, pId: 0, name: "微阅读", open: true, nocheck: true }, { id: 34, pId: 0, name: "特色体育", open: true, nocheck: true }, { id: 38, pId: 0, name: "活动阵地", open: true, nocheck: true }, { id: 42, pId: 0, name: "温暖四季行", open: true, nocheck: true }, { id: 4, pId: 1, name: "市直机关工会" }, { id: 5, pId: 1, name: "市直基层工会" }, { id: 6, pId: 1, name: "工会传声筒" }, { id: 7, pId: 3, name: "通知公告" }];
        function beforeClick(treeId, treeNode) {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            zTree.checkNode(treeNode, !treeNode.checked, null, true);
            return false;
        }

        function onCheck(e, treeId, treeNode) {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			nodes = zTree.getCheckedNodes(true),
			v = "";
            ids = "";
            for (var i = 0, l = nodes.length; i < l; i++) {
                v += nodes[i].name + ",";
                ids += nodes[i].id + ",";
            }

            if (v.length > 0) v = v.substring(0, v.length - 1);
            $scope.$parent.data.DicIDs = ids;
            $scope.$parent.data.DicNames = v;
            //alert($scope.$parent.data.DicID);
            $scope.$parent.$apply();
            //var cityObj = $("#citySel");
            //cityObj.attr("value", v);
        }

        $scope.showMenu = function () {
            $('#modal-table2').modal('show');
            //var cityObj = $("#citySel");
            //var cityOffset = $("#citySel").offset();
            //console.log("cityOffset", cityOffset);
            //$("#menuContent").css({ left: cityOffset.left + "px", top: cityOffset.top + cityObj.outerHeight() + "px" }).slideDown("fast");
            //alert(2);
            //$("body").bind("mousedown", onBodyDown);
        }
        function hideMenu() {
            $("#menuContent").fadeOut("fast");
            $("body").unbind("mousedown", onBodyDown);
        }
        function onBodyDown(event) {
            if (!(event.target.id == "menuBtn" || event.target.id == "citySel" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
                hideMenu();
            }
        }

        function strToJson(str) {
            var json = (new Function("return " + str))();
            return json;
        }

        var query = {
            SonID: "1",
            OpeType: "GetArticlesDictionarySelector"
        }
        requestService.lists("DictionaryBigTrees", query).then(function (data) {
            console.log("data", data);
            $.fn.zTree.init($("#treeDemo"), setting, strToJson(data.Results));
        });

        //$(document).ready(function () {
        //    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        //});


    });