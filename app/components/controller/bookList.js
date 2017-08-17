'use strict';

angular
    .module('bookList', [])

    .controller('bookList', ['$scope','$http','$timeout','bookListService',function($scope,$http,$timeout,bookListService) {
        $scope.newBook = {};
        $scope.book = {};
        $scope.books= [];
        $scope.search = "";
        $scope.pageOpts = {
            pageSize: 2,
            curPage: 1,
            page: 1
        };

        $scope.getBookList = function (curPage,pageSize,search) {
            bookListService
                .getBookList(curPage,pageSize,search)
                .then((docs)=>{
                    var data = docs.data;
                    $scope.books = data.books;
                    $scope.pageOpts.page = data.pages;
                    $scope.pageOpts.curPage = data.curPage;
                })
        }

        //删除图书
        $scope.deleteBook = function (id) {
            bookListService
                .deleteBook(id)
                .then((docs)=>{
                        var data = docs.data;
                        if(data.code == 0){
                        $scope.getBookList($scope.pageOpts.curPage,$scope.pageOpts.pageSize,$scope.search);
                    }
                })
        }

        $scope.addBook = function(newBook){
            bookListService
                .addBook(newBook)
                .then((docs)=>{
                    var data = docs.data;
                    if(data.code == 0) {
                        $scope.getBookList($scope.pageOpts.curPage, $scope.pageOpts.pageSize, $scope.search);
                    }
                })
        }

        //把当前更新对象，和其$scope.books中的索引生成给$scope.book对象
        $scope.startEdit = function (book,index) {
            $scope.book = book;
            $scope.book.index = index;
        }

        //对$scope.book对象进行修改和提交更新
        $scope.confirmEdit = function (book) {
            var index = book.index;
            var postBook = {}; //只提交book相关信息，index作前台索引用
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

        $scope.getBookList($scope.pageOpts.curPage,$scope.pageOpts.pageSize, "");


        /*$scope.$watch('search', function(newVal, oldVal) {
            var timer;
            if (newVal !== oldVal) {
                if (timer)
                    $timeout.cancel(timer);
                timer = $timeout(function () {
                    $scope.getDataAsync($scope.pageOpts.pageSize, $scope.pageOpts.curPage, $scope.search);
                },1000);
            }
        }, true);*/



    }])

