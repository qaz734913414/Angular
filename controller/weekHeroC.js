m1.controller('weekHero', ['$scope','$http','$rootScope','$filter', function ($scope,$http,$rootScope,$filter) {
		var url = "wangzherongyao/controller/test.json"
		//http://kogapi.games-cube.com/champion?callback=JSON_CALLBACK
//		var w = encodeURIComponent("こころ")
//		console.log(w)
//		var url = "http://kogapi.games-cube.com/UserArea?keyword={"+w+"}&callback=JSON_CALLBACK"
//		 $http.get(url,
//		 {
//		 	cache:true, //缓存 302 304
//		 	headers: {
//		 		 "DAIWAN-API-TOKEN": "C1CB9-4D48B-A8FD8-A4CCB"
//             }
//         }).then(function  (res) {
//         	console.log(res)
//         })
		$http.get(url)
		.then(function  (data) {
			return data
		}).then(function (res) {
			var startData = res.data.data  // 原始表
			//console.log($scope.arr)
			$scope.arr = res.data.data //临时表
			$scope.arr = $filter("limitTo")($scope.arr,10) // 默认显示10条数据
			//算分页的长度的
			$scope.paging = [];
			var len =  Math.ceil(startData.length/10);
			for (var i = 0; i < len; i++) {
				$scope.paging.push(i)
			}
			//console.log(paging)
			//分页的实现方法  使用 limitTo 限制条数 
			$scope.getNewData = function  (index) {// 手动加载数据 
				var Newnum = index * 10 
				$scope.arr = $filter("limitTo")(startData,10,Newnum);
				console.log($scope.arr)
			}
			
			//console.log($scope.arr)
			$rootScope.arr = res.data.data;
		})
}])
m1.controller('heroInfo', ['$scope','$location','$rootScope','$filter', function ($scope,$location,$rootScope,$filter) {
		var path =  $location.path().split("/")[2] // 没有配置路由 就没有 $location的方法
//		console.log(path)
//		console.log($rootScope.arr)
		$scope.arr = $filter("filter")($rootScope.arr,path)
		jQuery(document).ready(function($){
		var myChart = echarts.init(document.getElementById('main'));
		var option = {
		
		    title: {
		        text: '王者荣耀战力分析'
		    },
			    tooltip: {},
			    legend: {
			        data: ['战力分析']
			    },
			    radar: {
			        // shape: 'circle',
			        indicator: [
			           { name: path+"物理攻击", max:1000},
			           { name: path+"移动速度", max:5000},
			           { name: path+"物理防御", max:300},
			           { name: path+"魔法防御", max:100},
			           { name: path+"血值", max:5000}
			        ]
			    },
			     series: [{
			        name: '廉颇',
			        type: 'radar',
			        // areaStyle: {normal: {}},
			        data : [
			            {
			                value : [
			                $scope.arr[0].physical_atk,
			                $scope.arr[0].move_speed,
			                $scope.arr[0].physical_defense,
			                $scope.arr[0].magic_defense,
			                $scope.arr[0].max_hp
			                ],
			                name : 'path'
			            }
			        ]
			    }]
			}
			myChart.setOption(option);
		});
}])