angular.module('myApp')
    .controller('DictionaryBigTreeCheckboxCtrl', function ($scope, $rootScope, $location, requestService, $state, locals, $stateParams, APIUrl) {
        $scope.BigTreeProjectID = "0";
        $scope.TechEvolveID = $stateParams.TechEvolveID;
        $scope.PrincipleIDs = $stateParams.PrincipleIDs;
        $scope.CheckedLeavesIDs = "";
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

        $scope.PageTitle = $stateParams.Title;

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
                        //url: "http://localhost:2072/api/DictionaryBigTreesView/",
                        //url: "http://101.201.67.155:81/api/DictionaryBigTreesView/",
                        url: "http://" + APIUrl[0].url + "/api/DictionaryBigTreesView/",
                        autoParam: ["id=NodeID", "name=NodeName", "level=TreeLevel"],
                        dataFilter: filter,
                        otherParam: { "ProjectID": $scope.CurrentProjectID, "TreeTypeID": $stateParams.TreeTypeID, "OpeType": "View" }
                    },
                    check: {
                        enable: true
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    view: {
                        expandSpeed: "",
                        selectedMulti: false
                    },
                    edit: {
                        enable: false
                    },
                    callback: {
                        beforeAsync: beforeAsync,
                        onAsyncSuccess: onAsyncSuccess,
                        onAsyncError: onAsyncError,
                        onClick: onClick
                    }
                };
                $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                expandAll();
            });
        }

        iniTree();

        var log, className = "dark",
        startTime = 0, endTime = 0, perCount = 100, perTime = 100;
        function hideNodes() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			nodes = zTree.getSelectedNodes();
            if (nodes.length == 0) {
                alert("请至少选择一个节点");
                return;
            }
            zTree.hideNodes(nodes);
        }
        var curStatus = "init", curAsyncCount = 0, asyncForAll = false, goAsync = false;
        function expandAll() {
            if (!check()) {
                return;
            }
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            if (asyncForAll) {
                zTree.expandAll(true);
            } else {
                expandNodes(zTree.getNodes());
                if (!goAsync) {
                    //$("#demoMsg").text(demoMsg.expandAll);
                    curStatus = "";
                }
            }
        }
        function expandNodes(nodes) {
            if (!nodes) return;
            curStatus = "expand";
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            for (var i = 0, l = nodes.length; i < l; i++) {
                zTree.expandNode(nodes[i], true, false, false);
                if (nodes[i].isParent && nodes[i].zAsync) {
                    expandNodes(nodes[i].children);
                } else {
                    goAsync = true;
                }
            }
        }
        function check() {
            if (curAsyncCount > 0) {
                //$("#demoMsg").text(demoMsg.async);
                return false;
            }
            return true;
        }
        function asyncNodes(nodes) {
            if (!nodes) return;
            curStatus = "async";
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            for (var i = 0, l = nodes.length; i < l; i++) {
                if (nodes[i].isParent && nodes[i].zAsync) {
                    asyncNodes(nodes[i].children);
                } else {
                    goAsync = true;
                    zTree.reAsyncChildNodes(nodes[i], "refresh", true);
                }
            }
        }
        //获得所有已经勾选。
        function GetCheckIDs() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			nodes = zTree.getCheckedNodes(true),
			v = "";
            for (var i = 0; i < nodes.length; i++) {
                v += nodes[i].id + ",";
                //v += nodes[i].name + ",";
            }
            return v;
        };
        
        function ValidateChecked() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
            nodeList = zTree.getNodesByParam("level", 2);
            var fatherids = "";
            $scope.CheckedLeavesIDs = "";
            for (var i = 0; i < nodeList.length; i++) {
                if (!nodeList[i].checked) continue;
                //console.log("nodeList[" + i + "]", nodeList[i]);
                //console.log(fatherids + "___" + nodeList[i].pId, (";" + fatherids + ";").indexOf(";" + nodeList[i].pId + ";"));
                if ((";" + fatherids + ";").indexOf(";" + nodeList[i].pId + ";") >= 0)
                    return false;
                fatherids = fatherids + ";" + nodeList[i].pId;
                $scope.CheckedLeavesIDs = $scope.CheckedLeavesIDs + ";" + nodeList[i].id;
            }
            return true;
        }
        $scope.SaveChecked = function () {
            if (!ValidateChecked()) {
                alert('节点选择重复，请重新选择。');
                return;
            }


            $scope.data = {
                ProjectID: $scope.BigTreeProjectID,
                TreeTypeID: $scope.TreeTypeID,
                FatherIDs: $scope.CheckedLeavesIDs,
                OpeType: "GetRador"
            };
            requestService.lists("DictionaryBigTreesView", $scope.data).then(function (data) {
                console.log("Rador Data", data);
                $scope.$emit("RadorData", data);
            });


            var query = {};
            query.ID = $scope.TechEvolveID;
            query.PrincipleIDs = GetCheckIDs();
            query.ProjectID = locals.get("ProjectID");
            requestService.update("TechEvolutions", query).then(function (data) {
                alert('保存成功。');
            });
        };

        function filter(treeId, parentNode, childNodes) {
            if (!childNodes) return null;
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            //勾选父节点
            if (typeof parentNode != "undefined") {
                if (("," + $scope.PrincipleIDs + ",").indexOf("," + parentNode.id + ",") >= 0) {
                    zTree.checkNode(parentNode, true, true);
                }
            }
            //勾选子节点
            for (var i = 0, l = childNodes.length; i < l; i++) {
                //定理开头可以，非数字开头隐藏
                if (childNodes[i].name.length <= 3) {
                    zTree.hideNode(childNodes[i]);
                }
                if (isNaN(childNodes[i].name.substring(0, 1))) {
                    zTree.hideNode(childNodes[i]);
                }
                if (("," + $scope.PrincipleIDs + ",").indexOf("," + childNodes[i].id + ",") >= 0) {
                    zTree.checkNode(childNodes[i], true, true);
                    zTree.checkNode(parentNode, true, true);
                }
            }
            return childNodes;
        }

        function beforeAsync() {
            curAsyncCount++;
        }

        function onAsyncSuccess(event, treeId, treeNode, msg) {
            curAsyncCount--;
            if (curStatus == "expand") {
                expandNodes(treeNode.children);
            } else if (curStatus == "async") {
                asyncNodes(treeNode.children);
            }

            if (curAsyncCount <= 0) {
                if (curStatus != "init" && curStatus != "") {
                    //$("#demoMsg").text((curStatus == "expand") ? demoMsg.expandAllOver : demoMsg.asyncAllOver);
                    asyncForAll = true;
                }
                curStatus = "";
            }
        }

        function onAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
            curAsyncCount--;

            if (curAsyncCount <= 0) {
                curStatus = "";
                if (treeNode != null) asyncForAll = true;
            }
        }
        function ajaxGetNodes(treeNode, reloadType) {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            if (reloadType == "refresh") {
                treeNode.icon = "../../../css/zTreeStyle/img/loading.gif";
                zTree.updateNode(treeNode);
            }
            zTree.reAsyncChildNodes(treeNode, reloadType, true);
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


    });//end