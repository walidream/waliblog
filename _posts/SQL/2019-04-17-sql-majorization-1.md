---
layout: post
title:  mySql 开发技巧及优化 #标题
tagline: mySql 开发技巧及优化
category: SQL      #分类
author: wali    #作者
tag: mySQL     #标签
ghurl:        #github url
ghurl_zip:    #github zip下载
comments: true

post_nav: ["1.join更新表","2.join优化子查询","3.join优化聚合查询","4.如何实现分组选择","5.行转列"]
---

这小节小菜将记录一些常用的开发技巧,想练习的小伙伴们下载[练习表查询sql表](http://walidream.com/waliData/school.sql){:download="school.sql"}

# 1.join更新表

更新表中多条数据

```sql
--将课程成中php老师都替换成'小白'
UPDATE teacher t
JOIN ( SELECT * FROM course c WHERE c.c_name = 'php' ) b ON t.t_id = b.t_id 
SET t.t_name = '小白'
--这样子写在sql会报错
UPDATE teacher t 
SET t.t_name = '催永元' 
WHERE
	t.t_id IN ( SELECT c.t_id FROM course c INNER JOIN teacher t ON t.t_id = c.t_id WHERE c.c_name = 'php' )
```
![ssl](https://raw.githubusercontent.com/walidream/waliblog/gh-pages/static/image/server/server_44.png)

# 2.join优化子查询
```sql
--未优化
SELECT C.c_name, (
	SELECT T.t_name
	FROM teacher T
	WHERE T.t_id = C.t_id
) AS t_name
FROM course C;

--优化后
SELECT C.c_name, T.t_name 
FROM course C
LEFT JOIN teacher T on C.t_id = T.t_id;
```
![ssl](https://raw.githubusercontent.com/walidream/waliblog/gh-pages/static/image/server/server_45.png)

# 3.join优化聚合查询

查询每门课最高分数是多少

```sql
SELECT
	c.c_name,
	sc.s_score 
FROM
	score sc
	LEFT JOIN course c ON sc.c_id = c.c_id 
WHERE
	sc.s_score = ( SELECT MAX( t.s_score ) FROM score t WHERE t.c_id = sc.c_id )
```
![ssl](https://raw.githubusercontent.com/walidream/waliblog/gh-pages/static/image/server/server_46.png)

# 4.如何实现分组选择

查询每门课程的前3名学科的同学姓名

```sql
SELECT
	st.s_name,
	tmp.c_id,
	tmp.s_score 
FROM
	student st
	LEFT JOIN (
	SELECT
		sc.s_id,
		sc.c_id,
		sc.s_score 
	FROM
		score sc
		LEFT JOIN score s ON sc.c_id = s.c_id 
		AND sc.s_score <= s.s_score GROUP BY sc.c_id, sc.s_id, sc.s_score HAVING COUNT( sc.c_id ) > 3 
	ORDER BY
		sc.c_id,
		sc.s_score DESC 
	) tmp ON tmp.s_id = st.s_id 
ORDER BY
	c_id,
	s_score DESC
```

![ssl](https://raw.githubusercontent.com/walidream/waliblog/gh-pages/static/image/server/server_47.png)


# 5.行转列

```sql
SELECT st.s_name, c.c_name, sc.s_score
FROM student st, course c, score sc
WHERE sc.s_id = st.s_id 
AND sc.c_id = c.c_id
```
![ssl](https://raw.githubusercontent.com/walidream/waliblog/gh-pages/static/image/server/server_48.png)

转换成下面的效果

#### 静态行转列

```sql
--
-- 静态行转列
--
SELECT
	sc.s_id,
	st.s_name,
	MAX( CASE c.c_name WHEN 'java' THEN sc.s_score ELSE 0 END ) 'java',
	MAX( CASE c.c_name WHEN 'net' THEN sc.s_score ELSE 0 END ) 'net',
	MAX( CASE c.c_name WHEN 'php' THEN sc.s_score ELSE 0 END ) 'php',
	MAX( CASE c.c_name WHEN 'hadoop' THEN sc.s_score ELSE 0 END ) 'hadoop',
	MAX( CASE c.c_name WHEN 'test' THEN sc.s_score ELSE 0 END ) 'test',
	MAX( CASE c.c_name WHEN 'google' THEN sc.s_score ELSE 0 END ) 'google' 
FROM
	score sc
	LEFT JOIN course c ON sc.c_id = c.c_id
	LEFT JOIN student st ON sc.s_id = st.s_id 
GROUP BY
	sc.s_id
```

![ssl](https://raw.githubusercontent.com/walidream/waliblog/gh-pages/static/image/server/server_49.png)


#### 动态行转列

```sql
--
-- 动态行转列
--
SET @SQL = NULL;
SELECT
	GROUP_CONCAT( DISTINCT CONCAT( 'MAX(IF(c.c_name = ''', c.c_name, ''',sc.s_score,0)) AS ''', c.c_name, '''' ) ) INTO @SQL 
FROM
	course c;

SET @SQL = CONCAT( 'SELECT st.s_id,st.s_name,', @SQL, 'FROM score sc
	LEFT JOIN course c ON sc.c_id = c.c_id
	LEFT JOIN student st ON sc.s_id = st.s_id 
	GROUP BY
sc.s_id' );
PREPARE stmt 
FROM
	@SQL;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
```

![ssl](https://raw.githubusercontent.com/walidream/waliblog/gh-pages/static/image/server/server_50.png)
