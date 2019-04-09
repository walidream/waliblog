const path = require('path');   //node路径
const fs = require('fs');
const rimraf = require('rimraf');   //深度删除文件
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');   //压缩插件
const webpack = require('webpack');  //加载weubapc
const entry = require('./webpack/entry.js');


/**清空dist目录**/
rimraf('../assets/js', fs, function cb() {
  console.log('/assets/js目录已经清空，开始构建...');
});

var _config = {
	
	entry:entry.entry,
	output:{
		filename:'[name].bundle.js',
		path:path.resolve(__dirname,'../assets'),
	},
	watch: false,  //监听
	module: {
	  rules: [
		{
		  test: /\.js$/,
		  exclude: /(node_modules|bower_components)/,
		  use: {
			loader: 'babel-loader',
			options: {
			  presets: ['@babel/preset-env']
			}
		  }
		}
	  ],
	  loaders: [
		  {
			test: /\.json$/,
			loader: 'json-loader'
		  }
		]
	},
	plugins:[
		/***加载jquery**/
		new webpack.ProvidePlugin({
		  $: 'jquery',
		  jQuery: 'jquery',
		  'window.jQuery':'jQuery'		  
		})
	]
}

module.exports = _config;




























