define(function(require) {
	require('jquery-2.1.1.min');
	require('swiper.min');
	var mySwiper = new Swiper('.swiper-container', {
		loop: true,
		autoplay: 3000,
		//分页器
		pagination: '.swiper-pagination',
		//分页可点击
		paginationClickable: true,
		//前进后退按钮
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
	});
	var mySwiper1 = new Swiper('.swiper-container1', {
		loop: true,
		autoplay: 3000,
		slidesPerView: 3,
		//前进后退按钮
		nextButton: '.swiper-button-next1',
		prevButton: '.swiper-button-prev1',
	});
	var mySwiper2 = new Swiper('.swiper-container2', {
		loop: true,
		autoplay: 3000,
		slidesPerView: 4,
		//前进后退按钮
		nextButton: '.swiper-button-next2',
		prevButton: '.swiper-button-prev2',
	});
	$(function() {
		/*热门课程导航栏初始化时选中第一个*/
		$("#hot-lesson ul li:first-child").addClass("on");
		$("#lesson1").show();
		$("#lesson1").siblings().hide();
		$("#hot-lesson ul li").mouseover(function() {
			$(this).addClass("on");
			$(this).siblings().removeClass("on");
			var id = 'lesson' + $(this).attr("positionid");
			$("#" + id + "").show();
			$("#" + id + "").siblings().hide();
		});
		$("#close").click(function() {
			$("#pewm").hide();
		});
	});

});