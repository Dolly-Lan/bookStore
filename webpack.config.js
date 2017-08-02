var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
//var commonsPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {
    //页面入口文件配置
    entry:[
        './app/app.js'
    ],
    //入口文件输出配置
    output: {
        path: __dirname+'/app/',
        filename: 'dist/js/bundle.js'
    },
    //插件项
    plugins: [
        //new commonsPlugin("common.js")

        new htmlWebpackPlugin({
            template:'./app/index.html',
            filename:'dist/index.html'
        })
    ],
    module: {
        //加载器配置
        loaders: [
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:path.resolve(__dirname,'node_modules'),
                include:path.resolve(__dirname,'app')
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?importLoaders=1!postcss-loader'
            },
            {
                test: /\.less$/,
                loader: 'style!css!postcss!less'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!postcss!sass'
            },
            {
                test: /\.(woff|woff2|eot|ttf|png|jpg|gif|svg)$/i,
                loader: [
                    'url-loader?limit=8192&name=dist/img/[name].[ext]',//转成base64 ，url-loader是file-loader的上层封装
                    'image-webpack-loader'   //图片压缩
                ]
            }
            /*{ test: /\.js$/, loader: 'jsx-loader?harmony' },*/
        ]
    },
    //其它解决方案配置
    resolve: {
        /*root: 'E:/github/flux-example/src', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }*/
    }
};