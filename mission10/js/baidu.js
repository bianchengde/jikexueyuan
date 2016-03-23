$(function() {
				/*页面加载时文本框获得焦点*/
				document.getElementById('search').blur();
				document.getElementById('search').focus();
				/*页面加载时文本框获得焦点End*/
				var username = $.cookie("username");
				var ischeck = $.cookie("check");
				/*判断是否选中自动登录*/
				if (!$.cookie('check')) {
					$("#loginStyle").attr("disabled", true);
					$("#logo1").show();
					$("#logo2").hide();
					$("#s-wrap").hide();
					$("#nav-left").hide();
					$("#s-top-wrap").hide();
				} else {
					$("#loginStyle").attr("disabled", false);
					$("#logo2").show();
					$("#logo1").hide();
					$("#s-wrap").show();
					$("#nav-left").show();
					$("#s-top-wrap").show();
					$("#lb").html(username);
					$("#lb").mouseover(function() {
						$("#tooltip1").show();
					});
					$("#tooltip1").mouseleave(function() {
						$("#tooltip1").hide();
					});
				}
				/*我的关注默认选中*/
				$("#s-content-1").show().siblings().hide();
				$("#main-nav li:first-child").addClass("on");
				$("#main-nav li").each(function(index) {
					$(this).click(function() {
						$("#main-nav li.on").removeClass("on");
						$(this).addClass("on");
						if (index == 0) {
							$("#s-content-1").show().siblings().hide();
						} else if (index == 1) {
							$("#s-content-2").show().siblings().hide();
						}else if(index==2){
							$("#s-content-3").show().siblings().hide();
						}else if(index==3){
							$("#s-content-4").show().siblings().hide();
						}
					});
				});
				$("#s-content-title").click(function(){
					$(this).toggleClass("s-mblock-up");
					$("#s-content-center").toggle();
				});
				/*我的关注默认选中End*/
				/*更多产品效果*/
				$("#more").mouseover(function() {
					$("#s_bdbri").slideDown("fast", "linear");
				});
				$("#s_bdbri").mouseover(function() {
					$("#s_bdbri").show();
				});
				$("#s_bdbri").mouseleave(function() {
					$("#s_bdbri").hide();
				});
				/*$("#more").mouseleave(function(){
					$("#s_bdbri").slideUp(100);
				});*/
				/*回到顶部效果*/
				$('#top_feed').click(function() {
					$('html,body').animate({
						scrollTop: '0px'
					}, 500);
				});
				/*监听窗口的滚动*/
				$(window).scroll(function(event) {
					if ($("body").scrollTop() > 100) {
						/*到顶部距离大于100px出现回到顶部*/
						$("#top_feed").css("visibility", "visible");
					} else {
						$("#top_feed").css("visibility", "hidden");
					}
					if ($("body").scrollTop() > 200) {
						/*到顶部距离大于200px出现顶部搜索框*/
						$("#s-top-wrap").css("visibility", "visible");
					} else {
						$("#s-top-wrap").css("visibility", "hidden");
					}
				});
				/*关闭登录对话框*/
				$("#close-btn").click(function() {
					$("#dialog").hide()
				});
				/*清空用户名和密码*/
				$("#clear-btn1").click(function() {
					$("#input-username").val("");
					$("#input-username").focus();
				});
				$("#clear-btn2").click(function() {
					$("#input-password").val("");
					$("#input-password").focus();
				});
				/*清空用户名和密码End*/
				/*点击登录弹出登录对话框*/
				$("#lb").click(function() {
					$("#dialog").show();
					/*自动填入用户名密码*/
					if ($.cookie("username") && $.cookie("password")) {
						$("#input-username").val($.cookie("username"));
						$("#input-password").val($.cookie("password"));
					}
				});
				/*登录框可拖拽*/
				$("#dialog").draggable();
				$("#classify").click(function() {
					$("#classify-icon").toggleClass("classed");
				});
				$("#cashback").click(function() {
					$("#cashback-icon").toggleClass("classed");
				});
			});
			/*登录方法*/
			function login() {
				var username = $("#input-username").val();
				var password = $("#input-password").val();
				/*验证登录名密码*/
				if (username == "admin" && password == "admin") {
					$.cookie("username", username);
					$.cookie("password", password);
					$("#lb").html(username);
					if ($('#pass-checkbox').is(':checked')) {
						$.cookie("check", "checked");
						console.log($.cookie("check"));
					}
					$("#dialog").hide();
					$("#loginStyle").attr("disabled", false);
					$("#logo2").show();
					$("#logo1").hide();
					$("#s-wrap").show();
					$("#nav-left").show();
					$("#s-top-wrap").show();
					$("#lb").html(username);
					$("#lb").mouseover(function() {
						$("#tooltip1").show();
					});
					$("#tooltip1").mouseleave(function() {
						$("#tooltip1").hide();
					});
				} else {
					alert("用户名或密码错误");
				}
			}
			/*登出*/
			function logout() {
				$.cookie('check', '', {
					expires: -1
				});
				location.reload();
			}
			/*百度输入框效果*/
			function addBorder() {
				$("#sp1").removeClass("hoverBorder");
				$("#sp1").addClass("changeBorder");
			}

			function removeBorder() {
				$("#sp1").removeClass("changeBorder")
			}

			function border() {
				$("#sp1").addClass("hoverBorder");
			}

			function borderChange() {
				$("#sp1").removeClass("hoverBorder");
			}