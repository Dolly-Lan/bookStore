'use strict';
require('./bower_components/angular/angular.js');
require('./bower_components/angular-route/angular-route.js');
require("./components/controller/bookList.js");
require("./components/service/bookList.js");
require("./components/directive/directive.js");
require("./components/controller/bookDetail.js");
/*require("./bower_components/jquery-3.2.1.min.js");*/
require("./bower_components/bootstrap-3.0.0/css/bootstrap.min.css");
require("./bower_components/bootstrap-3.0.0/js/bootstrap.min.js");
require("./app.css");

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'bookList',
  'bookListService',
  'pagination',
  'bookDetail'
])

//配置路由
myApp.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');//改变路由前缀，bootstarp定义的锚点中 用 / 转义，解决和angularjs路由冲突问题

  $routeProvider
      .when('/bookList',{
          templateUrl:'tpl/bookList.html',
          controller:'bookList'
      })
      .when('/bookDetail/:bookId',{
          templateUrl:'tpl/bookDetail.html',
          controller:'bookDetail'
      })
      .otherwise('/bookList');
}]);
