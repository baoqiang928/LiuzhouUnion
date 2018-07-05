angular.module('myApp')
    .controller('DictionaryBigTreeCtrl', function ($scope, $rootScope, $location, requestService, $state, locals, $stateParams, APIUrl) {
        $scope.BigTreeProjectID = "0";
        if (typeof $stateParams.BigTreeProjectID != "undefined") {
            $scope.BigTreeProjectID = $stateParams.BigTreeProjectID;
        }
        else {
            if (typeof $stateParams.$parent != "undefined")
                $scope.BigTreeProjectID = $stateParams.$parent.BigTreeProjectID;
        }

        $scope.FatherIDs = "";
        if ((typeof $scope.$parent == "undefined") || (typeof $scope.$parent.FatherIDs == "undefined")) {
            $scope.FatherIDs = "";
        } else {
            $scope.FatherIDs = $scope.$parent.FatherIDs;
        }

        $scope.TreeTypeID = "";
        if (typeof $stateParams.TreeTypeID == "undefined") {
            $scope.TreeTypeID = $scope.$parent.TreeTypeID;
        } else {
            $scope.TreeTypeID = $stateParams.TreeTypeID;
        }

        //控制是否可以编辑
        $scope.AllowedTreeEditable = true;
        if ((typeof $scope.$parent == "undefined") || (typeof $scope.$parent.AllowedTreeEditable == "undefined")) {
            $scope.AllowedTreeEditable = true;
        } else {
            $scope.AllowedTreeEditable = $scope.$parent.AllowedTreeEditable;
        }

        $scope.PageTitle = $stateParams.Title;

        $scope.$on("FilterTreeParentNodes", function (event, msg) {
            SetNullNodeData();//清空上次选择信息。未来可以不放在这里。
            $scope.ShowAllNodes();
            var zTree = $.fn.zTree.getZTreeObj("treeDemo1");
            var nodes = zTree.getNodes(true);
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].level != "0") continue;
                //console.log("nodes[" + i + "]", mytrim(nodes[i]));
                if (msg.indexOf(mytrim(nodes[i].name)) < 0) {
                    zTree.hideNode(nodes[i]);
                }
            }
        });

        $scope.ShowAllNodes = function () {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo1");
            var nodes = zTree.getNodes(true);
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].level != "0") continue;
                zTree.showNode(nodes[i]);
            }
        };

        var iniTree = function () {
            $scope.data = {
                ProjectID: $scope.BigTreeProjectID,
                TreeTypeID: $scope.TreeTypeID,
                FatherIDs: $scope.FatherIDs,
                OpeType: "GetFathers"
            };
            requestService.lists("DictionaryBigTreesView", $scope.data).then(function (data) {
                var zNodes = data;
                var setting = {
                    async: {
                        enable: true,
                        url: "http://" + APIUrl[0].url + "/api/DictionaryBigTreesView/",
                        autoParam: ["id=NodeID", "name=NodeName", "level=TreeLevel"],
                        otherParam: { "ProjectID": $scope.CurrentProjectID, "TreeTypeID": $stateParams.TreeTypeID, "OpeType": "View" }
                    },
                    check: {
                        enable: false
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    view: {
                        expandSpeed: "",
                        addHoverDom: addHoverDom,
                        removeHoverDom: removeHoverDom,
                        selectedMulti: false
                    },
                    edit: {
                        enable: true,
                        showRenameBtn: false,
                        showRemoveBtn: showRemoveBtn,
                    },
                    callback: {
                        beforeExpand: beforeExpand,
                        onAsyncSuccess: onAsyncSuccess,
                        onAsyncError: onAsyncError,
                        beforeRemove: beforeRemove,
                        beforeRename: beforeRename,
                        onClick: onClick
                }
                };
                $.fn.zTree.init($("#treeDemo1"), setting, zNodes);

            });
        }

        iniTree();

        var log, className = "dark",
        startTime = 0, endTime = 0, perCount = 100, perTime = 100;

        function showRemoveBtn(treeId, treeNode) {
            if (!$scope.AllowedTreeEditable) return false;
            return !treeNode.isParent;
        }
        function beforeExpand(treeId, treeNode) {
            //if (!treeNode.isAjaxing) {
            //    startTime = new Date();
            //    treeNode.times = 1;
            //    ajaxGetNodes(treeNode, "refresh");
            //    return true;
            //} else {
            //    alert("zTree 正在下载数据中，请稍后展开节点。。。");
            //    return false;
            //}
        }
        function onAsyncSuccess(event, treeId, treeNode, msg) {
            //if (!msg || msg.length == 0) {
            //    return;
            //}
            //var zTree = $.fn.zTree.getZTreeObj("treeDemo1"),
            //totalCount = treeNode.count;
            //if (treeNode.children.length < totalCount) {
            //    setTimeout(function () { ajaxGetNodes(treeNode); }, perTime);
            //} else {
            //    treeNode.icon = "";
            //    zTree.updateNode(treeNode);
            //    zTree.selectNode(treeNode.children[0]);
            //    endTime = new Date();
            //    var usedTime = (endTime.getTime() - startTime.getTime()) / 1000;
            //    className = (className === "dark" ? "" : "dark");
            //    showLog("[ " + getTime() + " ]&nbsp;&nbsp;treeNode:" + treeNode.name);
            //    showLog("加载完毕，共进行 " + (treeNode.times - 1) + " 次异步加载, 耗时：" + usedTime + " 秒");
            //}
        }

        function onAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo1");
            alert("异步获取数据出现异常。");
            treeNode.icon = "";
            zTree.updateNode(treeNode);
        }
        function ajaxGetNodes(treeNode, reloadType) {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo1");
            if (reloadType == "refresh") {
                treeNode.icon = "../../../css/zTreeStyle/img/loading.gif";
                zTree.updateNode(treeNode);
            }
            zTree.reAsyncChildNodes(treeNode, reloadType, true);
        }
        //function showLog(str) {
        //    if (!log) log = $("#log");
        //    log.append("<li class='" + className + "'>" + str + "</li>");
        //    if (log.children("li").length > 4) {
        //        log.get(0).removeChild(log.children("li")[0]);
        //    }
        //}
        //function getTime() {
        //    var now = new Date(),
        //	h = now.getHours(),
        //	m = now.getMinutes(),
        //	s = now.getSeconds(),
        //	ms = now.getMilliseconds();
        //    return (h + ":" + m + ":" + s + " " + ms);
        //}
        //清空右侧信息。
        function SetNullNodeData() {
            $scope.nodeData.ID = "";
            $scope.nodeData.Name = "";
            $scope.nodeData.Note = "";
            $scope.nodeData.Remark = "";
        }
        $scope.nodeData = function () {
            this.ID = "";
            this.Name = "";
            this.Note = "";
            this.Remark = "";
        };
        function onClick(event, treeId, treeNode, clickFlag) {
            //showLog("[ " + getTime() + " onClick ]&nbsp;&nbsp;clickFlag = " + clickFlag + " (" + (clickFlag === 1 ? "普通选中" : (clickFlag === 0 ? "<b>取消选中</b>" : "<b>追加选中</b>")) + ")");
            //console.log("treeNode", treeNode);
            $scope.CurrentNode = treeNode;
            requestService.getobj("DictionaryTrees", treeNode.id).then(function (data) {
                $scope.nodeData = data;
                //$scope.SelectedNodeName = data.Name;
            });

        }
        function beforeRemove(treeId, treeNode) {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo1");
            zTree.selectNode(treeNode);
            if (confirm("确认删除 节点 -- " + treeNode.name + " 吗？")) {
                requestService.delete("DictionaryTrees", treeNode.id).then(function (data) { });
                return true;
            }
            return false;
        }
        function beforeRename(treeId, treeNode, newName) {
            if (newName.length == 0) {
                setTimeout(function () {
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo1");
                    zTree.cancelEditName();
                    alert("节点名称不能为空.");
                }, 0);
                return false;
            }
            return true;
        }
        var newCount = 1;
        $scope.Name = "";
        $scope.CurrentNode = {};
        function addHoverDom(treeId, treeNode) {
            if (!$scope.AllowedTreeEditable) return;
            var sObj = $("#" + treeNode.tId + "_span");
            if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
            var addStr = "<span class='button edit' id='addBtn_" + treeNode.tId
                + "' title='add node' onfocus='this.blur();'></span>";
            sObj.after(addStr);
            var btn = $("#addBtn_" + treeNode.tId);
            if (btn) btn.bind("click", function () {
                $scope.CurrentNode = treeNode;
                $scope.CurrentOperate = "Add";
                $('#modal-table').modal('show');
                //var zTree = $.fn.zTree.getZTreeObj("treeDemo1");
                //zTree.addNodes(treeNode, { id: (100 + newCount), pId: treeNode.id, name: "new node" + (newCount++) });
                return false;
            });
        };

        $scope.SaveTreeNode = function () {
            if ($scope.CurrentOperate == "Add") {
                var NodeInfo = {};
                NodeInfo.ProjectID = $scope.CurrentProjectID;
                NodeInfo.TreeTypeID = $stateParams.TreeTypeID;
                NodeInfo.Name = $scope.Name;
                var pId = 0;
                if ($scope.CurrentNode != null) {
                    NodeInfo.FatherID = $scope.CurrentNode.id;
                    pId = $scope.CurrentNode.id;
                }
                //展开这个节点，否则会重复增加两个。
                var zTree = $.fn.zTree.getZTreeObj("treeDemo1");
                zTree.expandNode($scope.CurrentNode, true, null, null, true);

                requestService.add("DictionaryTrees", NodeInfo).then(function (data) {
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo1");
                    zTree.addNodes($scope.CurrentNode, { id: data, pId: pId, name: $scope.Name });
                    alert("保存成功。");
                    $('#modal-table').modal('hide');
                });
            }

        };

        function removeHoverDom(treeId, treeNode) {
            $("#addBtn_" + treeNode.tId).unbind().remove();
        };

        $scope.newSubItem = function () {
            $scope.CurrentNode = null;
            $scope.CurrentOperate = "Add";
            $('#modal-table').modal('show');
        };


        $scope.UpdateCurrentNodeName = function () {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo1");
            $scope.CurrentNode.name = $scope.nodeData.Name;
            zTree.updateNode($scope.CurrentNode);
        };

    });//end



function mytrim(str) {
    //定义一个从前往后的变量
    var start = 0;
    //定义一个从后往前的变量
    var end = str.length - 1;
    //start<=end,防止传进来的字符串全是空格所做无用功
    while (start <= end && str.charAt(start) == " ") {
        start++;
    }
    while (start <= end && str.charAt(end) == " ") {
        end--;
    }
    //substring函数特点包含头不包含尾，所以加1
    return str.substring(start, end + 1);
}