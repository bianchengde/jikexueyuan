<?php
/*引入数据连接类*/
require ("mysql_class.php");
/*图片上传*/

if ((($_FILES["newsImg"]["type"] == "image/gif") || ($_FILES["newsImg"]["type"] == "image/jpeg") || ($_FILES["newsImg"]["type"] == "image/pjpeg")) && ($_FILES["newsImg"]["size"] < 20000)) {
	if ($_FILES["newsImg"]["error"] > 0) {
		echo "Return Code: " . $_FILES["newsImg"]["error"] . "<br />";
		exit ;
	} else {
		if (file_exists("upload/" . $_FILES["newsImg"]["name"])) {
			echo $_FILES["newsImg"]["name"] . " already exists. ";
		} else {
			move_uploaded_file($_FILES["newsImg"]["tmp_name"], "upload/" . $_FILES["newsImg"]["name"]);
		}
	}
} else {
	echo "Invalid file";
	exit ;
}
/*新增*/
$newsTitle = $_REQUEST['newsTitle'];
$newsTitle = $_REQUEST['newsTitle'];
$newsImg = "upload/" . $_FILES["newsImg"]["name"];
$newsContent = $_REQUEST['newsContent'];
$type = $_REQUEST['newsType'];
$result = $db -> insert("news", "(newsTitle,newsImg,newsContent,newsType)", "('" . $newsTitle . "','" . $newsImg . "','" . $newsContent . "','" . $type . "')");
echo json_encode(array('msg' => '新增成功', "errorCode" => "111111"));
$db -> dbClose();
?>