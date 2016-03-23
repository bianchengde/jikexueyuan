<?php
/*引入数据连接类*/
require ("mysql_class.php");
/*获取参数*/
$type = $_REQUEST['type'];
$sql = "select id,newsTitle,newsImg,newsContent from news where newsType=" . $type;
$result = $db -> query($sql);
$arr = array();
while ($row = mysql_fetch_array($result)) {
	array_push($arr, $row);
}
$json['data'] = $arr;
echo json_encode($json);
$db -> dbClose();
?>