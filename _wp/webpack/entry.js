/****
***入口
****/
const glob = require('glob');
const dirVars = require('./base/path.js');

var options = {
  cwd: dirVars.js, // 在js目录里找
  sync: true,      // 这里不能异步，只能同步
};

//获取js里面
var files = new glob.Glob('**/!(_)*.js', options); 

const tmpDir = 'js/';  

var entry = {};
files.found.forEach(function(val){
	var fileName = val.split('.')[0];
	entry[tmpDir+fileName] = dirVars.js + '/' + val;	
});

//获取入口key值
let entryKeyArr = Object.keys(entry);
//获取入口val值
let entryValArr = Object.values(entry);


//挂载
module.exports = {
	entry:entry,     //入口挂载
	entryKey:entryKeyArr, //入口key值，type[arr]
	entryVal:entryValArr  //入口val值, type[arr]
};




















