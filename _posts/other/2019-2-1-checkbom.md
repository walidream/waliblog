---
layout: post
title: 检测文件bom   #标题
tagline: 检测文件bom
category: other      #分类
author: wali    #作者
tag: other     #标签
ghurl:        #github url
ghurl_zip:    #github zip下载
comments: true

post_nav: false
---

去除掉文件的bom

```php
<?php
// $content = file_get_contents("http://taoke.dev.shbz.com/captcha.html");
// $charset = array();
// /* $length = strlen($content);
// for ($i = 0; $i < $length; $i++) {
	// $j = $i + 1;
	// echo ord(substr($content, $i, $j)) . "\n";
// } */
// $charset[1] = substr($content, 0, 1);
// $charset[2] = substr($content, 1, 1);
// $charset[3] = substr($content, 2, 1);
// echo ord($charset[1]) . "\n";
// echo ord($charset[2]) . "\n";
// echo ord($charset[3]) . "\n";


//写要查找的路径,cmd命令框中输入 E:\www\test>php -f checkbom.php
$basedir = 'E:\www\h5\config';
 
$auto = 0;
checkdir($basedir);
 
function checkdir($basedir)
{
  if ($dh = opendir($basedir)) {
    while (($file = readdir($dh)) !== false) {
      if ($file != '.' && $file != '..') {
        if (!is_dir($basedir . "/" . $file)) {
			if (checkBOM("$basedir/$file")) {
				echo "filename: $basedir/$file bom found \n";
			}
        } else {
          $dirname = $basedir . "/" . $file;
          checkdir($dirname);
        }
      }
    }
    closedir($dh);
  }
}
function checkBOM($filename)
{
  global $auto;
  $contents  = file_get_contents($filename);
  $charset[1] = substr($contents, 0, 1);
  $charset[2] = substr($contents, 1, 1);
  $charset[3] = substr($contents, 2, 1);
  if (ord($charset[1]) == 239 && ord($charset[2]) == 187 && ord($charset[3]) == 191) {
    if ($auto == 1) {
      $rest = substr($contents, 3);
      rewrite($filename, $rest);
      //return ("BOM found, automatically removed.\n");
	  return true;
    } else {
      //return ("BOM found.\n");
	  return true;
    }
  } else
	  return false;
}
 
function rewrite($filename, $data)
{
  $filenum = fopen($filename, "w");
  flock($filenum, LOCK_EX);
  fwrite($filenum, $data);
  fclose($filenum);
}
```














