<?php 
	header("content-type:text/html;charset=utf-8");
	//接收
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
	mysql_select_db("qfqd1803",$link);
	//3.设置数据库字符集
	mysql_query("set names utf-8");
	//4.编写sql语句
	

	$sql = "select * from qf_users where username = '{$username}'";
	//5.执行sql
	$set = mysql_query($sql);
	//6.把集合转成数组
	$arr = mysql_fetch_array($set);
	echo ($arr[1]);
	var_dump($arr);
	// print_r($arry);
	if($arr['username'] == $username){
		if($arr['password'] == $password){
			echo "<script>alert('登陆成功');location.href='../02goodsList.html';</script>";
		}else{
			echo "<script>alert('密码错误');location.href='../05login.html';</script>";
		}
	}else{
		echo "<script>alert('用户名不存在');location.href='../05login.html';</script>";
	}


 ?>