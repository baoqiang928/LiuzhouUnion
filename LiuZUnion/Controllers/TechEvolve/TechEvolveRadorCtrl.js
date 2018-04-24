angular.module('myApp')
    .controller('TechEvolveRadorCtrl', function ($scope, $location, requestService, $state, locals, $stateParams) {

        //var dom = document.getElementById("container");
        //var myChart = echarts.init(dom);
        //var app = {};
        //option = null;
        //option = {
        //    title: {
        //        text: '基础雷达图'
        //    },
        //    tooltip: {},
        //    legend: {
        //        data: ['最大值', '当前值']
        //    },
        //    radar: {
        //        // shape: 'circle',
        //        name: {
        //            textStyle: {
        //                color: '#fff',
        //                backgroundColor: '#999',
        //                borderRadius: 3,
        //                padding: [3, 5]
        //            }
        //        },
        //        indicator: [
        //           { name: '销售（sales）1', max: 6500 },
        //           { name: '管理（Administration）2', max: 16000 },
        //           { name: '信息技术（Information Techology）', max: 30000 },
        //           { name: '客服（Customer Support）', max: 38000 },
        //           { name: '研发（Development）', max: 52000 },
        //           { name: '市场（Marketing）', max: 25000 }
        //        ]
        //    },
        //    series: [{
        //        name: '当前值 vs 最大值',
        //        type: 'radar',
        //        // areaStyle: {normal: {}},
        //        data: [
        //            {
        //                value: [4300, 10000, 28000, 35000, 50000, 19000],
        //                name: '当前值'
        //            },
        //             {
        //                 value: [5000, 14000, 28000, 31000, 42000, 21000],
        //                 name: '最大值'
        //             }
        //        ]
        //    }]
        //};;
        //if (option && typeof option === "object") {
        //    myChart.setOption(option, true);
        //}


    });//End