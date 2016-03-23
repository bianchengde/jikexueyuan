//存储变量X
var x = '';
//存储变量y
var y = '';
//存储运算符号
var z = '';
//+/-和%的标致位
var flag = 0;
//+ - × /标致位
var flag2 = 0;
//小数标致位
var point = 0;
//等于号标致位
var equal = 0;
//鼠标按下时样式
function down(obj) {
	obj.style.backgroundColor = '#717280';
};
//鼠标抬起时样式
function up(obj) {
	obj.style.backgroundColor = '#D1D1D1';
};
//鼠标抬起时样式
function up2(obj) {
	obj.style.backgroundColor = '#EE8133';
};
//计算方法
function jisuan(obj) {
	//获取按下的值
	var str = obj.innerHTML;
	//获取顶部结果
	var result = document.getElementById("result").innerHTML;
	//验证是否数字
	var reg = /^\d+$/;
	//验证小数
	var xiaoshu=/^-?\d+\.\d+$/;
	if (str == "c") {
		flag = 0;
		flag2 = 0;
		point = 0;
		result.innerHTML = "";
		x = '';
		y = '';
		z = '';
		document.getElementById("result").innerHTML = 0;
	} else if (str == "+/-") {
		flag = 1;
		document.getElementById("result").innerHTML = -result;
	} else if (str == "%") {
		flag = 1;
		document.getElementById("result").innerHTML = result * 0.01;
	}
	//如果是数字
	else if (str.match(reg)) {
		//如果运算符或者%,+/-选中的情况下
		if (flag == 1 || flag2 == 1) {
			flag = 0;
			flag2 = 0;
			document.getElementById("result").innerHTML = str;
		} else {
			//刚刚按下等于号的情况下
			if (equal == 1) {
				equal = 0;
				//按下小数点的情况下
				if (point == 1) {
					point = 0;
					document.getElementById("result").innerHTML = 0 + '.' + str;
				} else {
					document.getElementById("result").innerHTML = str;
				}
			} else {
				if (result == '0') {
					if (point == 1) {
						point = 0;
						document.getElementById("result").innerHTML = result + '.' + str;
					} else {
						document.getElementById("result").innerHTML = str;
					}
				} else {
					if (point == 1) {
						point = 0;
						document.getElementById("result").innerHTML = result + '.' + str;
					} else {
						document.getElementById("result").innerHTML = result + str;
					}
				}
			}
		}
	} else if (str == '÷') {
		x = result;
		flag2 = 1;
		z = '÷';
	} else if (str == '×') {
		x = result;
		flag2 = 1;
		z = '×';
	} else if (str == '-') {
		x = result;
		flag2 = 1;
		z = '-';
	} else if (str == '+') {
		x = result;
		flag2 = 1;
		z = '+';
	} else if (str == '.') {
		if(result.match(xiaoshu))
		{
			point = 0;
		}
		else
		{
			point = 1;
		}
	} else if (str == '=') {
		//输出结果
		var outcome = 0;
		flag = 0;
		flag2 = 0;
		equal = 1;
		point = 0;
		y = result;
		if (z == '×') {
			outcome = x * y;
		} else if (z == '÷') {
			outcome = x / y;
		} else if (z == '+') {
			outcome = parseFloat(x) + parseFloat(y);
		} else if (z == '-') {
			outcome = x - y;
		}
		document.getElementById("result").innerHTML = outcome;
	}
}