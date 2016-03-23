function jisuan(){
				var point=document.getElementById("point").value;
				//判断是不是数字或者空格
				if(isNaN(point)||''==point.trim())
				{
					document.getElementById("error").innerHTML="请输入数字";
					document.getElementById("point").value="";
					document.getElementById("point").focus();
				}
				//判断输入数字范围
				else if(point>100||point<0)
				{
						document.getElementById("error").innerHTML="请输入0~100之间的数字";
				}
				else
				{
					document.getElementById("error").innerHTML="";
					//判断分数属于什么范围
					switch(true){
						case point>=90&&point<=100:
						document.getElementById("gradeValue").value="一等生";
						break;
						case point<90&&point>=80:
						document.getElementById("gradeValue").value="二等生";
						break;
						case point<80&&point>=70:
						document.getElementById("gradeValue").value="三等生";
						break;
						case point<70&&point>=60:
						document.getElementById("gradeValue").value="四等生";
						break;
						case point<60&&point>=50:
						document.getElementById("gradeValue").value="五等生";
						break;
						case point<50&&point>=40:
						document.getElementById("gradeValue").value="六等生";
						break;
						case point<40&&point>=30:
						document.getElementById("gradeValue").value="七等生";
						break;
						case point<30&&point>=20:
						document.getElementById("gradeValue").value="八等生";
						break;
						case point<20&&point>=10:
						document.getElementById("gradeValue").value="九等生";
						break;
						case point<10&&point>=0:
						document.getElementById("gradeValue").value="十等生";
						break;
					}
				}
			}