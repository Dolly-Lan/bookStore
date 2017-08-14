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
        $scope.getDataAsync = function(curPage,pageSize,search) {
            var url="";
            if(search){
                var search = search.toLowerCase();
                url = 'http://localhost:3001/books/'+curPage+'/'+pageSize+'/'+search;
            }else{
                url = 'http://localhost:3001/books/'+curPage+'/'+pageSize;
            }
            $http
                .get(url)
                .success(function(largeLoad) {
                    $scope.books = largeLoad.books;
                    $scope.pageOpts.page = largeLoad.pages;
                    $scope.pageOpts.curPage = largeLoad.curPage;
                });
        };

        //删除图书
        $scope.delete = function (id) {
            $http
                .delete("http://localhost:3001/books/del/"+id)
                .success(function (res) {
                    //删除成功后重新请求当前页
                    if(res.code == 0){
                        $scope.getDataAsync($scope.pageOpts.curPage,$scope.pageOpts.pageSize,$scope.search);
                    }
                });
        }

        $scope.getDataAsync($scope.pageOpts.curPage,$scope.pageOpts.pageSize, "");


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

