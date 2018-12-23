const path = require('path');   //node路径

var srcPath = {};

srcPath.rootDir = path.resolve(__dirname, '../../');   //根路径
srcPath.src = path.resolve(srcPath.rootDir,'./src');   //源文件
srcPath.dist = path.resolve(srcPath.rootDir,'./dist'); //生成线上
srcPath.assets = path.resolve(srcPath.rootDir,'./assets'); //资产
srcPath.js = path.resolve(srcPath.rootDir,'../assets/_js'); //js
srcPath.lib = path.resolve(srcPath.rootDir,'../assets/_lib'); //lib

//将srcPath 挂载出去
module.exports = srcPath;