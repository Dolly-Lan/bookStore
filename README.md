# bookStore

angular-seed + boostrap + webpack 图书管理系统

分页/搜索/详情/删除/新增

![image]

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
    
    service/
      bookList.js （定义列表页service）
  
    controller/
    
      bookList.js （定义列表页控制器）
      
    directive/
    
      pagination.js （定义分页指令）
      
  tpl/
  
    bookList.html （定义列表页模板 使用分页指令）
    
    pagination.html （定义分页模板）

二、技术细节   

1) 在service层中service/bookList.js定义异步请求后台数据方法 :
    
    getBookList()
    deleteBook()

2)  在control层中controller/bookList.js定义改变model的方法

    $scope.getBookList()
    $scope.deleteBooks()

3)分页（无省略号）

定义分页directive，在bookList controller的模板中调用，通过绑定策略把controller中的3个$scope值(curPage,pageSize,getDataAsync())双向传递给分页directive


4)删除：

删除成功后重新请求当前页，会更新$scope上的值，则各个组件也会更新，比如分页

    //删除图书
    $scope.deleteBooks = function (id) {
        bookListService
            .deleteBook(id)
            .then((docs)=>{
                    var data = docs.data;
                    if(data.code == 0){
                    $scope.getBookList($scope.pageOpts.curPage,$scope.pageOpts.pageSize,$scope.search);
                }
            })
    }
 
5)新增:

  注入的service方法中采用POST提交书籍信息对象

    /*
    * @param : newBook新增书籍对象{name:"xx"}
    * @return : Promise对象
    */
    this.addBook = function (newBook) {
        return $http({
            url: "http://localhost:3001/books/add",
            data: newBook,
            method: "POST"
        })
    }
    
6)查询：

  根据“书名”模糊查询，bookListService中getBookList()方法，最后多传一个字符串参数表示查询字符串

7）更新
  
   更新包含2个操作，开始更新startEdit()，确认更新confirmEdit()
    
    //把当前更新对象，和其$scope.books中的索引生成给$scope.book对象
    $scope.startEdit = function (book,index) {
        $scope.book = book;
        $scope.book.index = index;
    }
    
    //对$scope.book对象进行修改和提交更新
    $scope.confirmEdit = function (book) {
        var index = book.index;
        var postBook = {};  //只提交book相关信息，index作前台索引用
        postBook.name = book.name;
        postBook.id = book.id;
        bookListService
            .confirmEdit(postBook)
            .then((docs)=>{
                var data = docs.data;
                $scope.books[index].id = data.id;
                $scope.books[index].name = data.name;
            })
    }
  
7)查看详情：

  1.配置路由 url中通过 /:params 形式来接收参数

  2.$routeParams依赖来接收来源页面间传递的参数 	

8)setTimeout自动搜索（修正：无）

  1.$scope.$watch(‘filterText’,callback)

  2.callbacke中调用setTimeout()【记住使用clearTimeout方法清除上次调用的getDataAsync()，否则多个该函数则进入队列中等待执行】延迟执行getDataAsync()，以防止filterText频繁变化而频繁请求服务器
