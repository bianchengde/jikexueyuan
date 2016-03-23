//进入页面时候查询cookie里面有没有颜色。
			var bgcolor = $.cookie("bgcolor");
			if (bgcolor) {
				$("#ul-bottom ul li a").css("color", bgcolor);
				var obj = $("#color li a div");
				for (var i = 0; i < obj.length; i++) {
					if (obj[i].style.color == bgcolor) {
						obj[i].style.backgroundColor = bgcolor;
					}
				}
			}
			//导航栏点击根据主题变色
			$("#menus li a").click(function() {
				var bgcolor = $.cookie("bgcolor");
				console.log(bgcolor);
				$(this).css("color", "white");
				$(this).parent().css("backgroundColor", bgcolor);
				$(this).parent().siblings().css("backgroundColor", "#FCFCFC");
				$(this).parent().siblings().children().css("color", "black");
			});
			//选择主题颜色
			$("#color li a").click(function(e) {
				var obj = this.childNodes.item(0);
				var parent = this.parentNode.parentNode;
				var child = parent.children;
				for (var i = 0; i < child.length; i++) {
					var a = child[i].children.item(0);
					a.children.item(0).style.backgroundColor = "";
				}
				$("#menus li").css("backgroundColor", "#FCFCFC");
				$("#menus li a").css("color", "black");
				this.children[0].style.backgroundColor = this.children[0].style.color;
				$("#ul-bottom ul li a").css("color", this.children[0].style.color);
				$.cookie("bgcolor", this.children[0].style.color);
			});