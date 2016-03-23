<?php
/*引入数据连接类*/
	require("mysql_class.php");
	/*获取参数*/
	$id       = $_REQUEST['id'];
	$newsTitle = $_REQUEST['newsTitle'];
	$newsContent = $_REQUEST['newsContent'];
	$type=$_REQUEST['newsType'];
	/*执行sql*/
	$update
 = $db->update("news","newsTitle
 = '".$newsTitle."',newsContent='".$newsContent."',newsType=".$type,"where id=".$id);
	echo json_encode(array('msg'=>'更新成功',"errorCode"=>"111111"));
	$db->dbClose();
?>