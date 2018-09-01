<?php 
	header("content-type:text/html;charset=utf-8");
	//接收用户信息
	$username = $_POST['username'];
	$password = $_POST['password'];
	echo $username,$password;
	//操作数据库
	//1.连接数据库
	$link = mysql_connect("localhost","root","123456");
	if(!$link){
		echo '数据库链接失败';
		exit; //退出
	}
	//2.选择数据库
	mysql_select_db("qfqd1803");
	//3.设置数据库字符集
	mysql_set_charset('utf8');

 	$s = "select * from qf_users where username = '{$username}'";
	//5.执行sql
	$set = mysql_query($s);
	//6.把集合转成数组
	$arr = mysql_fetch_array($set);
	if($arr['username'] != $username){
			
		$time = time();
		$sql = "insert into qf_users(username, password, create_time) values('{$username}','{$password}','{$time}')";
		//5.执行sql语句
		$row = mysql_query($sql);
		// echo $row;

		if($row){
			echo "<script>alert('注册成功');location.href='../05login.html';</script>";
		}else{
			echo "<script>alert('注册失败'); location.href = '../04register.html';</script>";
		}
		
	}else{
		echo "<script>alert('用户名已存在');location.href='../04register.html';</script>";
	}

	mysql_close($link);

 ?>