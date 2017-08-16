'use strict';

angular
    .module('bookList', [])

    .controller('bookList', ['$scope','$http','$timeout','bookListService',function($scope,$http,$timeout,bookListService) {
        $scope.newBook = {};
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

