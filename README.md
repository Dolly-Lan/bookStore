# bookStore

angular-seed + boostrap + webpack 图书管理系统

分页/搜索/详情

![image](https://github.com/Dolly-Lan/bookStore/blob/master/preview.png)

一、app目录

app/

  Index.html （link所有css 引入所有js ng-view默认视图）
  
  app.js  （配置router 导入所有依赖module）
  
  data/  （假数据）
  
    data.json
    
  bower_components/ （库文件）
  
    angular/ 
    
    angular-route/
    
    bootstrap-3.0.0/
    
  components/
  
    controller/
    
      bookList.js （定义列表页控制器）
      
    directive/
    
      pagination.js （定义分页指令）
      
  tpl/
  
    bookList.html （定义列表页模板 使用分页指令）
    
    pagination.html （定义分页模板）

二、技术细节   

1)bookList  controller定义异步请求后台数据方法 :

    /*
    * @param : pageSize一页查询的数目，绑定到$scope上
    * @param : currPage当前页数，绑定到$scope上
    * @param : filterText搜索关键字，绑定到$scope上
    * @return : null
    */
    $scope.getDataAsync($scope.pageSize, $scope.currPage, $scope.filterText) {
      $http
        .get()
        .success(data){
          $scope.books = JSON.stringify(data.books); //解析后台书籍数据绑定到$scope上
          $scope.pageLength = data.pageLength;  //数据分页总页数绑定至$scope上
        }
    }

2)分页（无省略号）

定义分页directive，在bookList controller的模板中调用，通过绑定策略把controller中的3个$scope值(pageSize, currPage,getDataAsync())传递给分页directive

3)setTimeout自动搜索

  1.$scope.$watch(‘filterText’,callback)

  2.callbacke中调用setTimeout()【记住使用clearTimeout方法清除上次调用的getDataAsync()，否则多个该函数则进入队列中等待执行】延迟执行getDataAsync()，以防止filterText频繁变化而频繁请求服务器
  
4)查看详情：

  1.配置路由 url中通过 /:params 形式来接收参数

  2.$routeParams依赖来接收来源页面间传递的参数 	