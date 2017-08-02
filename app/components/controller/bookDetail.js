'use strict';

angular
    .module('bookDetail',[])
    .controller('bookDetail',['$scope','$routeParams',function ($scope,$routeParams) {
        $scope.bookId = $routeParams.bookId;
    }])