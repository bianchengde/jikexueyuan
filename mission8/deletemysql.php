<?php
/*引入数据连接类*/
require ("mysql_class.php");
/*获取ID*/
$id = $_REQUEST['id'];
/*删除记录*/
$delete = $db -> delete("news", "where
	 id =" . $id);
$db -> dbClose();
?>