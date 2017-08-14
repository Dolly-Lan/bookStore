angular
    .module('pagination', [])
    .directive('pagination', function(){
        return {
            restrict: 'AE',
            scope: {
                pagesize:'=',
                numpages: '=',
                currpage: '=',
                onselectpage : '&'
            },

            templateUrl: '../tpl/pagination.html',

            replace: true,

            link: function(s){
                //根据页面总数变化来重新生成分页组件
                s.$watch('numpages', function(value){
                    //页号组件参数s.pages
                    s.pages = [];

                    for(var i=1;i<=value;i++){
                        s.pages.push(i);
                    }
                    //初始化active页号
                    s.isActivePage(s.currpage);
                    //当页面总数减少后，则需保持页面处在最后页的选中状态
                    if(s.currpage > value){
                        s.selectPage(value);
                    }
                });

                //判读是否有上一页
                s.noPreviousPage = function(){
                    return s.currpage == 1;
                };

                //判断是否有下一页
                s.noNextPage = function(){
                    return s.currpage == s.numpages;
                };

                //判断当前页是否被选中
                s.isActivePage = function(page){
                    return s.currpage==page;
                };

                //选择页数
                s.selectPage = function(page){
                    if(!s.isActivePage(page)){
                        s.currpage = page;
                        s.onselectpage({pageSize:s.pagesize, page:s.currpage} );
                    }
                };

                //选择下一页
                s.selectNextPage = function(){
                    if(!s.noNextPage()){
                        s.selectPage(s.currpage+1);
                    }
                };

                //选择上一页
                s.selectPreviousPage = function(){
                    if(!s.noPreviousPage()){
                        s.selectPage(s.currpage-1);
                    }
                };
            }
        };
    });