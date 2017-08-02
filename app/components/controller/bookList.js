'use strict';

angular
    .module('bookList', [])

    .controller('bookList', ['$scope','$http','$timeout',function($scope,$http,$timeout) {
        $scope.books= [];
        $scope.filterText = "";
        $scope.pagingOptions = {
            pageSize: 3,
            currentPage: 1,
            pageLength: 1
        };
        $scope.getDataAsync = function(pageSize, page, searchText) {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get('../data/books.json')
                    .success(function(largeLoad) {
                        data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingData(data, page, pageSize);
                    });
            } else {
                $http.get('../data/books.json')
                    .success(function(largeLoad) {
                        $scope.setPagingData(largeLoad, page, pageSize);
                    });
            }
        };

        $scope.setPagingData = function(data, page, pageSize) {
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.books = pagedData;
            $scope.pagingOptions.pageLength = Math.ceil(data.length/pageSize).toString();
            if (!$scope.$$phase) { //返回$digest
                $scope.$apply();
            }
        };

        $scope.getDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

        $scope.$watch('filterText', function(newVal, oldVal) {
            var timeout ;
            if (newVal !== oldVal) {
                $timeout.cancel(timeout);
                timeout = $timeout(function () {
                    $scope.getDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterText);
                },500);
            }
        }, true);

    }])

