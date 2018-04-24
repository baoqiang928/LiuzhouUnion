angular.module('myApp')
    .controller('TechEvolveOpeCtrl', function ($scope, $location, requestService, $state, locals, $stateParams) {
        $scope.Name = $stateParams.Name;
        $scope.Character = $stateParams.Character;
        $scope.Remark = $stateParams.Remark;
        $scope.$on("nodeData", function (event, msg) {
            $scope.nodeData = msg;
        });

        $scope.$on("RadorData", function (event, msg) {

            var indicatorlist = [];
            var maxvaluelist = [];
            var currentvaluelist = [];
            for (var i = 0; i < msg.length; i++) {
                indicatorlist.push({ name: msg[i].FatherName, max: msg[i].MaxValue });
                maxvaluelist.push(msg[i].MaxValue);
                currentvaluelist.push(msg[i].CurrentValue);
            }
            DrawRador(indicatorlist,maxvaluelist,currentvaluelist);
        });

        function DrawRador(indicatorlist,maxvaluelist,currentvaluelist) {
            var dom = document.getElementById("container");
            var myChart = echarts.init(dom);
            var app = {};
            option = null;
            option = {
                title: {
                    text: '基础雷达图'
                },
                tooltip: {},
                legend: {
                    data: ['最大值', '当前值']
                },
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#fff',
                            backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                        }
                    },
                    indicator: indicatorlist
                },
                series: [{
                    name: '当前值 vs 最大值',
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data: [
                        {
                            value: currentvaluelist,
                            name: '当前值'
                        },
                         {
                             value: maxvaluelist,
                             name: '最大值'
                         }
                    ]
                }]
            };;
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        }

    });//End