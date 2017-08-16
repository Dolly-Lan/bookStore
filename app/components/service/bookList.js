angular
    .module('bookListService', [])
    .service('bookListService',['$http',function($http){
        /*
        * @param : curPage一页查询的数目
        * @param : pageSize当前页数
        * @param : search搜索关键字
        * @return : Promise对象
        */
        this.getBookList = function(curPage,pageSize,search){
            var url="";
            if(search){
                var search = search.toLowerCase();
                url = 'http://localhost:3001/books/'+curPage+'/'+pageSize+'/'+search;
            }else{
                url = 'http://localhost:3001/books/'+curPage+'/'+pageSize;
            }
            return $http.get(url)
        }
        /*
        * @param : id需要删除的id
        * @return : Promise对象
        */
        this.deleteBook = function (id) {
            return $http.delete("http://localhost:3001/books/del/"+id)
        }
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
    }]);