angular.module("myApp")
    .controller('MeetingCtrl', function ($scope, $location, requestService, $state, locals) {
        $scope.LogoPicName = GetLogoPicName(locals.get("Participate"));
        $scope.GFFAmount = "";
        $scope.MeetingAmount = "";
        $scope.VisitorInfo = locals.getObject("VisitorInfo");
        $scope.VisitorInfo.MeetingAmount = "";
        $scope.VisitorInfo.GFFAmount = "";
        console.log("$scope.VisitorInfo", $scope.VisitorInfo);
        $scope.Participate = locals.get("Participate");
        $scope.MeetingInfoList = INIMeetingInfoList($scope.Participate);
        //根据观众类型，变动价格
        UpdatePriceByVisitorType($scope.VisitorInfo.Department, $scope.MeetingInfoList);

        $scope.tips = INITips($scope.Participate);
        $scope.tips = $scope.tips + AppendTips($scope.VisitorInfo.Department);

        $scope.inputtype = "checkbox";
        if ($scope.Participate == "14") {
            $scope.inputtype = "radio";
        }
        $scope.Checked = function ($event, ID, Price) {
            if (ID == $scope.Participate) {
                //SelectMeeting(ID, $scope, $scope.MeetingInfoList);
                return true;
            }
            return false;
        }
        $scope.ClickMeetingChecked = function ($event, id, price) {
            console.log("$event", $event);
            if ($event == null) return;
            if (typeof ($event) == "undefined") return;
            var checkbox = $event.target;
            if (id == "14") {
                if (checkbox.checked) {
                    if ($scope.Participate == "2") {
                        //如果是年会会务费，则论坛免费
                        SetForumMeetingFree($scope.MeetingInfoList);
                    }
                }
                else {
                    //根据观众类型，变动价格
                    UpdatePriceByVisitorType($scope.VisitorInfo.Department, $scope.MeetingInfoList);
                }
            }
            //正常情况,记录勾选情况
            if (checkbox.checked) {
                SelectMeeting(id, $scope, $scope.MeetingInfoList);
                if ($scope.Participate == "14") {
                    //只能选择一个
                    if (id == "14") {
                        UnSelectMeeting("2", $scope);
                    }
                    if (id == "2") {
                        UnSelectMeeting("14", $scope);
                        console.log("$scope.GFFAmount", $scope.GFFAmount);
                        console.log("$scope.MeetingAmount", $scope.MeetingAmount);
                    }
                }
            }
            else {
                UnSelectMeeting(id, $scope);
            }
        }
        $scope.IsDisabled = function ($event, id, price) {
            if ($scope.Participate == "14") {
                return;
            }
            if ((id == $scope.Participate) && ($scope.Participate == "2")) {
                return true;
            }
        }

        $scope.DinnerClick = function ($event) {
            var checkbox = $event.target;
            if (checkbox.checked) {
                $scope.VisitorInfo.Fax = "300";
                return;
            }
            $scope.VisitorInfo.Fax = "";
        }

        $scope.IsShown = function (index) {
            if (index == 1) return false;
            return true;
        }
        $scope.InsertMeeting = function () {
            $('input:radio').each(function () {
                if ($(this).attr('checked') == true) {
                    if ($(this).attr("id") == "Ctrl2") {
                        $scope.VisitorInfo.GFFAmount = $(this).val();
                    }
                    if ($(this).attr("id") == "Ctrl14") {
                        $scope.VisitorInfo.MeetingAmount = $(this).val();
                    }
                }
            });
            $('input:checkbox').each(function () {
                if ($(this).attr('checked') == true) {
                    if ($(this).attr("id") == "Ctrl2") {
                        $scope.VisitorInfo.GFFAmount = $(this).val();
                    }
                    if ($(this).attr("id") == "Ctrl14") {
                        $scope.VisitorInfo.MeetingAmount = $(this).val();
                    }
                }
            });

            console.log("$scope.VisitorInfo", $scope.VisitorInfo);
            if (($scope.VisitorInfo.GFFAmount == "") && ($scope.VisitorInfo.MeetingAmount == "")) {
                alert("请选择参加会议。");
                return;
            }
            console.log("$scope.VisitorInfo", $scope.VisitorInfo);
            requestService.add("?Action=InsertMeeting", $scope.VisitorInfo).then(function (data) {
                locals.setObject("VisitorInfo", $scope.VisitorInfo);
                $state.go("invoice");
            });
        }



    });

function MeetingInfo() {
    this.ID = "";
    this.Name = "";
    this.Price = "";
    this.Description = "";
    this.Tips = "";
}

function SelectMeeting(id, scope, MeetingInfoList) {
    if (id == "14") {
        scope.MeetingAmount = GetMeetingInfoByID(MeetingInfoList, id).Price;
    }
    if (id == "2") {
        scope.GFFAmount = GetMeetingInfoByID(MeetingInfoList, id).Price;
    }
}
function UnSelectMeeting(id, scope) {
    if (id == "14") {
        scope.MeetingAmount = "";
    }
    if (id == "2") {
        scope.GFFAmount = "";
    }
}


//如果是年会会务费，则论坛免费
function SetForumMeetingFree(MeetingInfoList) {
    var meetinginfo = GetMeetingInfoByID(MeetingInfoList, "2");
    meetinginfo.Price = "0";
}

function INIMeetingInfoList(Participate) {
    var MeetingInfoList = [];
    var MeetingInfo14 = new MeetingInfo();
    MeetingInfo14.Name = "中铸协年会 CFA Annual Congress";
    MeetingInfo14.ID = "14";
    MeetingInfo14.Price = "2700";
    MeetingInfo14.Description1 = "（含会议入场券、会议资料及自助餐）";
    MeetingInfo14.Description = "4月30日后付款：2900元/人 ";

    MeetingInfo14.Tips = "附加服务";

    var MeetingInfo2 = new MeetingInfo();
    MeetingInfo2.Name = "全球铸造论坛（GFF）";
    MeetingInfo2.ID = "2";
    MeetingInfo2.Price = "1500";
    MeetingInfo2.Description1 = "(参加中铸协年会人员免费参加GFF论坛) ";
    MeetingInfo2.Description = "(The 14th CFA Annual Congress delegate is free of charge)";
    MeetingInfo2.Tips = "附加服务";
    if (Participate == "14") {
        MeetingInfoList.push(MeetingInfo14);
        MeetingInfoList.push(MeetingInfo2);
    }
    if (Participate == "2") {
        MeetingInfoList.push(MeetingInfo2);
        MeetingInfoList.push(MeetingInfo14);
    }
    return MeetingInfoList;
}
//页面根据不同会议，提示不同
function INITips(Participate) {
    var tips = "";
    if (Participate == "2") {
        tips = tips + "第二届全球铸造论坛（The 2nd Global Foundry Forum）将于5月16日在北京·中国国际展览中心盛大开幕。作为全球性行业聚会，全球铸造论坛一直受到来自金砖铸造业联合会、“一带一路”沿线国家和地区、香港、台湾地区铸造行业的高度重视和积极参与。本届世界铸造论坛将迎来270余位来自世界各地的铸造同仁共同参与。";
        tips = tips + "<br>The 2nd Global Foundry Forum will be held on May 16, 2018 in China International Exhibition Center (New venue), Beijing. As an international industry event, the forum has received extensive attention and participation by the BRICS Foundry Association, the Belt and Road countries and regions, as well as Hong Kong and Taiwan. The 2nd Global Foundry Forum is expected to attract more than 270 foundrymen from all over the world to attend.";
    }
    //if (Participate == "14") {
    //    tips = "第十四届中铸协年会注册 14th CFA Annual Congress";
    //}
    return tips;
}

function AppendTips(VisitorType) {
    var tips = "";
    //嘉宾
    if (VisitorType == "VIP") {
        tips = tips + "<br><br><font color=red>温馨提示：您是我们的邀请嘉宾，欢迎您莅临参会。";
        tips = tips + "<br>Tips: You are our distinguished guest, welcome to attend the conference.";
        tips = tips + "</font>";
    }
    //会员
    if (VisitorType == "Membership") {
        tips = tips + "<br><br><font color=red>温馨提示：本次参会您享受会员专属价格。完成付款后，注册正式生效。";
        tips = tips + "<br>Tips: You enjoy the exclusive price of the membership. Registration will take into effect after payment is completed.";
        tips = tips + "</font>";
    }
    //论文作者
    if (VisitorType == "Author") {
        tips = tips + "<br><br><font color=red>温馨提示：本次参会您享受论文作者专属价格。完成付款后，注册正式生效。";
        tips = tips + "<br>Tips: You enjoy the exclusive price. Registration will take into effect after payment is completed.";
        tips = tips + "</font>";
    }
    //非会员
    if (VisitorType == "") {
        tips = tips + "<br><br><font color=red>温馨提示：本次参会您享受非会员价格。完成付款后，注册正式生效。如您对非会员身份有疑问，请您致电010-68418899-663咨询。";
        tips = tips + "<br>Tips: You will have no discount this time. Effective after payment is completed. If you have any question about your non-membership, please call 8610-68418899-663.";
        tips = tips + "</font>";
    }
    return tips;
}

function GetMeetingInfoByID(MeetingInfoList, ID) {
    for (var i = 0; i < MeetingInfoList.length; i++) {
        var meetinginfo = MeetingInfoList[i];
        if (meetinginfo.ID == ID) {
            return meetinginfo;
        }
    }
    return null;
}

function UpdatePriceByVisitorType(VisitorType, MeetingInfoList) {
    for (var i = 0; i < MeetingInfoList.length; i++) {
        var meetinginfo = MeetingInfoList[i];
        if (meetinginfo.ID == "14") {
            //贵宾
            if (VisitorType == "VIP") {
                meetinginfo.Price = 0;
            }

            //会员
            if (VisitorType == "Membership") {
                meetinginfo.Price = "2200";
                meetinginfo.Description = "4月30日之后付款：2400元/人";
            }

            //论文作者
            if (VisitorType == "Author") {
                meetinginfo.Price = "2200";
                meetinginfo.Description = "4月30日之后付款：2400元/人";
            }

            //非会员
            if (VisitorType == "") {
                meetinginfo.Price = "2700";
                meetinginfo.Description = "4月30日之后付款：2900元/人";
            }

        }

        if (meetinginfo.ID == "2") {
            //贵宾
            if (VisitorType == "VIP") {
                meetinginfo.Price = 0;
            }
            //非会员
            if (VisitorType == "") {
                meetinginfo.Price = "1500";
            }
        }


    }
}


