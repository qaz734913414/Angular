var m1 = angular.module("myApp",['ngRoute'])
	m1.config(["$routeProvider","$locationProvider",function($routeProvider,$locationProvider){
		$routeProvider
		.when("/",{
			templateUrl:"wangzherongyao/views/weekHero.html",
			controller:"weekHero"
		})
		.when("/heroInfo/:name",{
			templateUrl:"wangzherongyao/views/heroInfo.html",
			controller:'heroInfo'
		})
		.otherwise({ redirectTo: '/' }) //默认加载的页面 
		$locationProvider.html5Mode({
			enabled:true,
			requireBase:false
		})
		// 路由hash  1.$locationProvider.html5Mode 模式 两个参数 enabled:true, requireBase:false 替换掉基础路径
		//			 2.模板上的页面 需要加上根目录的路径
		//           3.页面跳转时 a href="路由的路径" 例如 a href="heroInfo" 不用加/ 
		//           4.html 页面加上 meta标签下 <base href="/wangzherongyao"> 
		//			 5.修改JS路径  到 根目录下 /wangzherongyao
		//           6.页面 <a href="heroInfo/flag"> / 后表示参数 实参
		//           7.路由里 .when("/heroInfo/:name")  :name 表示 形参
	}]) //路由服务 $routeProvider  ui-roouter = $stateProvider