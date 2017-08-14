'use strict';

angular
    .module('bookList', [])

    .controller('bookList', ['$scope','$http','$timeout',function($scope,$http,$timeout) {
        $scope.books= [];
        $scope.search = "";
        $scope.pageOpts = {
            pageSize: 2,
            curPage: 1,
            page: 1
        };
        $scope.getDataAsync = function(pageSize, page) {
            $http
                .get('http://localhost:3001/books/'+page+'/'+pageSize)
                .success(function(largeLoad) {
                    $scope.books = largeLoad.books;
                    $scope.pageOpts.page = largeLoad.pages;
                });
        };

        //删除图书
        $scope.delete = function (id,curPage,pageSize,search) {
            $http
                .get("http://localhost:3001/books/del/"+id+'/'+curPage+'/'+pageSize+'/'+search)
                .success(function (res) {
                    $scope.pageOpts.page = res.pages
                    if(curPage > res.pages)
                        $scope.pageOpts.curPage = res.pages;
                });
        }

        $scope.getDataAsync($scope.pageOpts.pageSize, $scope.pageOpts.curPage,"");


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

        $scope.searchBook = function (curPage, pageSize, search) {
            var search = search.toLowerCase();
            $http
                .get('http://localhost:3001/books/'+curPage+'/'+pageSize+'/'+search)
                .success(function(largeLoad) {
                    $scope.books = largeLoad.books;
                    $scope.pageOpts.page = (largeLoad.pages).toString();
                });
        }

    }])

