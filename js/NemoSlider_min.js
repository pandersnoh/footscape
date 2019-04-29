/*
* Project: : 네모 슬라이더
* License: : http://www.nemoplugin.com/
* License: : http://cafe.naver.com/nemonuri
* Since : 2013.09.14
* NemoSlider 버전 v1.14
* default
	$("#포함된 레이아웃 id").NemoSlider({
		class_set : "롤링을 둘러싼 class"
	});
*/
;(function ( $, window, document, undefined ) {$.fn.extend({

		NemoSlider: function(options) {

			var defaults = {
				/*
				슬라이드 롤링을 둘러싼 HTML의 CLASS
				*/
				class_set : "nemoslider",
				
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 기본 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
				/*
				타입 결정
				none 		: 일반 롤링
				slide 		: 좌우 슬라이드
				updown 	: 상하 슬라이드
				fade 		: 페이드
				*/
				move_type : "none",

				/*
				자동 롤링
				on 		: 자동 롤링 켬
				off 		: 자동 롤링 끔
				*/
				auto_set : "on",

				/*
				랜덤 시작
				on 		: 첫 시작을 랜덤으로
				off 		: 기본
				*/
				random_set : "off",

				/*
				메인 이미지 (롤링 슬라이드 적용 이미지)의 CSS포지션 설정 [옵션 : img_class]
				네모 슬라이더는 css의 position left 이동을 이용하여 움직이는 롤링 슬라이드 입니다.
				기본적으로 메인 이미지가 relative 설정 되어있으며 필요시 다른것으로 변경할수 있습니다.
				relative, absolute 등등
				*/
				img_class_position :"relative",
				
				/*
				이미지와 이미지 변경 사이의 시간입니다.
				1초는 1000 입니다.
				기본은 2000이며 2초후 다음 이미지로 변경됩니다.
				*/
				set_time : 2000,
				/*
				슬라이드 적용시 동작되는 속도입니다.
				기본 옵션은 400 이며 0.4초 동안 이동합니다.
				*/
				delay : 400,
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 페이드 사용시 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
				/*
				페이드 적용시 동작되는 속도입니다.
				*/
				fade_delay : 400,
				/*
				기본 시작 페이드 값 0~1
				*/
				fade_set  : 0,
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 슬라이드 사용시 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
				/*
				좌우 슬라이드 및 상하 슬라이드 사용시 슬라이드 방향
				left 		: 왼쪽 방향
				right 		: 우측 방향
				up 			: 위쪽 방향
				down	 	: 아래 방향
				*/
				slide_way : "left",

				/*
				슬라이드 이용시 마지막으로 왔을때 되돌아 갈것인지
				무한루프 할것인지 결정
				off : 되돌림
				on : 한방향으로 무한 루프
				*/
				slide_subset : "on",

				/*
				좌우 슬라이드 및 상하 슬라이드 사용시 페이드효과
				on 		: 사용
				off 		: 비사용
				*/
				slide_fade : "off",

				/*
				좌우 슬라이드 및 상하 슬라이드 사용시불투명도 양 조절
				*/
				slide_fade_set : 0.3,

				/*
				좌우 슬라이드 및 상하 슬라이드 사용시불투명도 동작되는 속도입니다.
				*/
				slide_fade_delay : 400,
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 버튼 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
				/*
				버튼 동작 설정
				over : 마우스 오버시 동작
				click : 마우스 클릭시 동작
				*/
				bt_set : "click",

				/*
				슬라이드 롤링 동작시 이미지에 해당되는 버튼의 이미지 파일명을 바꾸기 (imgname.jpg -> imgname_ov.jpg)
				on 		: 사용
				off 		: 비사용
				*/
				bt_change : "off",
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ class 이름 설정 ㅡㅡ ㅡㅡㅡㅡㅡㅡㅡㅡㅡ
				// 첫번째 이미지 class
				img_class : "img_view",
				// 두번째 이미지 class (기본"move_type : none"만 가능)
				img_class2 : "img_view2",
				// 세번째 이미지 class (기본"move_type : none"만 가능)
				img_class3 : "img_view3",
				// 왼쪽 버튼 class
				left_bt : "left_bt",
				// 오른쪽 버튼 class
				right_bt : "right_bt",
				// 버튼 class
				bt_class : "bt_view",
				/*
				마우스 오버시 bt_change 효과를 넣고싶은 이미지 클래스 (imgname.jpg -> imgname_ov.jpg)
				클래스로 data_over 가 지정된 모든 이미지에 마우스 오버시 (imgname.jpg -> imgname_ov.jpg) 효과가 발생합니다.)
				*/
				ov_img : "data_over",
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 마우스 오버시 자동롤링이 멈추도록 ㅡㅡ
				/*
				on 		: 사용
				off 		: 비사용
				*/
				// 첫번째 이미지
				img_overStop : "on",
				// 두번째 이미지
				img2_overStop : "on",
				// 세번쨰 이미지
				img3_overStop : "on",
				// 버튼
				bt_overStop : "on",
				// 좌우버튼
				lrbt_overStop : "on",
				// 기타 its_stop과 연동
				its_overStop : "on",
				// 기타 오버시 멈춤 클래스 설정
				its_stop : "its_stop",
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ bt_change 옵션 커스텀 사용하기 ㅡㅡㅡㅡ
				/*
				옵션 bt_change 효과의 파일명 변경을 _ov가 아닌 원하는것으로 수정할때 사용합니다.
				on 		: 사용
				off 		: 비사용
				*/
				bt_nc : "off",
				/*
				지정된 값으로 사용이됩니다.
				*/
				over_name : "_ov",
				/*
				이미지 파일 확장자 지정입니다.
				*/
				extension : "jpg"
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
			};

var options =  $.extend(defaults, options); return this.each(function(){var o = options; var class_set = $("#"+this.id+" ."+o.class_set); var img_view = $("#"+this.id+" ."+o.class_set+" ."+o.img_class); var img_view_li = $("#"+this.id+" ."+o.class_set+" ."+o.img_class).children(); var img_view_img = $("#"+this.id+" ."+o.class_set+" ."+o.img_class+" img"); var img_view2 = $("#"+this.id+" ."+o.class_set+" ."+o.img_class2); var img_view2_li = $("#"+this.id+" ."+o.class_set+" ."+o.img_class2).children(); var img_view2_img= $("#"+this.id+" ."+o.class_set+" ."+o.img_class2+" img"); var img_view3 = $("#"+this.id+" ."+o.class_set+" ."+o.img_class3); var img_view3_li = $("#"+this.id+" ."+o.class_set+" ."+o.img_class3).children(); var img_view3_img = $("#"+this.id+" ."+o.class_set+" ."+o.img_class3+" img"); var bt_view = $("#"+this.id+" ."+o.class_set+" ."+o.bt_class); var bt_view_li = $("#"+this.id+" ."+o.class_set+" ."+o.bt_class).children(); var bt_view_img = $("#"+this.id+" ."+o.class_set+" ."+o.bt_class+" img"); var left_bt = $("#"+this.id+" ."+o.class_set+" ."+o.left_bt); var right_bt = $("#"+this.id+" ."+o.class_set+" ."+o.right_bt); var its_stop = $("."+o.its_stop); var move_type = o.move_type; var auto_set = o.auto_set; var random_set = o.random_set; var img_class_position = o.img_class_position; var set_time = o.set_time; var delay_c = o.delay; var fade_delay = o.fade_delay; var fade_set = o.fade_set; var slide_way = o.slide_way; var slide_subset = o.slide_subset; var slide_fade = o.slide_fade; var slide_fade_set = o.slide_fade_set; var slide_fade_delay = o.slide_fade_delay; var bt_set = o.bt_set; var bt_change = o.bt_change; var bt_nc = o.bt_nc; var over_name = o.over_name; var extension = o.extension; var ov_img = $("#"+this.id+" ."+o.class_set+" img."+o.ov_img); var img_overStop = o.img_overStop; var img2_overStop = o.img2_overStop; var img3_overStop = o.img3_overStop; var bt_overStop = o.bt_overStop; var lrbt_overStop = o.lrbt_overStop; var its_overStop = o.its_overStop; if(random_set=="on"){var index_num = Math.floor(Math.random()*img_view_li.length); } else{var index_num = 0; } var setTimeID = 0; startup(index_num); switch(bt_set){case "over" : bt_view_li.bind("mouseover",function(){animate_stop(); index_num = bt_view_li.index(this); startup(index_num); }); break; case "click" : bt_view_li.bind("click",function(){animate_stop(); index_num = bt_view_li.index(this); startup(index_num); }); break; } left_bt.bind("click",function(){animate_stop(); index_num--; index_check(index_num); img_roll(index_num); bt_change_set(index_num); }); right_bt.bind("click",function(){animate_stop(); index_num++; index_check(index_num); img_roll(index_num); bt_change_set(index_num); }); if(img_overStop=="on"){img_view_li.bind("mouseover",function(){auto_stop();}); img_view_li.bind("mouseout",function(){play_check();}); } if(img2_overStop=="on"){img_view2_li.bind("mouseover",function(){auto_stop();}); img_view2_li.bind("mouseout",function(){play_check();}); } if(img3_overStop=="on"){img_view3_li.bind("mouseover",function(){auto_stop();}); img_view3_li.bind("mouseout",function(){play_check();}); } if(bt_overStop=="on"){bt_view_li.bind("mouseover",function(){auto_stop();}); bt_view_li.bind("mouseout",function(){play_check();}); } if(lrbt_overStop=="on"){left_bt.bind("mouseover",function(){auto_stop();}); left_bt.bind("mouseout",function(){play_check();}); right_bt.bind("mouseover",function(){auto_stop();}); right_bt.bind("mouseout",function(){play_check();}); } if(its_overStop=="on"){its_stop.bind("mouseover",function(){auto_stop();}); its_stop.bind("mouseout",function(){play_check();}); } ov_img.bind("mouseover",function(){bt_ov($(this)); }); ov_img.bind("mouseout",function(){bt_out($(this)); }); if(slide_subset=="on"){img_view_li.clone().prependTo(img_view).addClass("slide_subset_f"); img_view_li.clone().appendTo(img_view).addClass("slide_subset_e"); $(".slide_subset_f, .slide_subset_e").animate({opacity :slide_fade_set},slide_fade_delay); } function auto_play(){if(setTimeID!=0){window.clearInterval(setTimeID); } setTimeID = setInterval(function(){index_num++; index_check(index_num); img_roll(index_num); bt_change_set(index_num); },set_time); } function auto_stop(){if(setTimeID!=0){window.clearInterval(setTimeID); } setTimeID = 0; } function play_check(){if(auto_set == "on"){auto_play(); } else {auto_stop(); } } function index_check(index_ch){var img_view_li_w = img_view_li.eq(0).width(); var img_view_w = img_view_li.eq(0).width()*img_view_li.length; var img_view_li_h = img_view_li.eq(0).height(); var img_view_h = img_view_li.eq(0).height()*img_view_li.length; if(img_view_li.length<=index_ch){index_num = 0; if(slide_subset=="on"){if(slide_way=="left"){img_view.css({left :img_view_li_w}); slide_copyimg_front(); } if(slide_way=="right"){img_view.css({left :-img_view_li_w}); slide_copyimg_end(); } if(slide_way=="up"){img_view.css({top :img_view_li_h}); slide_copyimg_front(); } if(slide_way=="down"){img_view.css({top :-img_view_li_h}); slide_copyimg_end(); } } } if(index_ch<0){index_num = img_view_li.length-1; if(slide_subset=="on"){if(slide_way=="left"){img_view.css({left :-img_view_w}); slide_copyimg_end(); } if(slide_way=="right"){img_view.css({left :img_view_w}); slide_copyimg_front(); } if(slide_way=="up"){img_view.css({top :-img_view_h}); slide_copyimg_end(); } if(slide_way=="down"){img_view.css({top :img_view_h}); slide_copyimg_front(); } } } } function img_roll(moving){if(slide_fade=="on"){for(var sf=0; sf<img_view_li.length+1; sf++){if(slide_way=="left" || slide_way=="up"){if(sf==moving){img_view_li.eq(moving).animate({opacity :1},slide_fade_delay); } else{img_view_li.eq(sf).animate({opacity :slide_fade_set},slide_fade_delay); } } if(slide_way=="right" || slide_way=="down"){var right_index = (img_view_li.length-1)-moving; if(sf==right_index){img_view_li.eq(right_index).animate({opacity :1},slide_fade_delay); } else{img_view_li.eq(sf).animate({opacity :slide_fade_set},slide_fade_delay); } } } } switch(move_type){case "none" : move_none(moving); break; case "slide" : if(slide_subset=="on"){move_slide_on(moving); } else{move_slide(moving); } break; case "updown" : if(slide_subset=="on"){move_updown_on(moving); } else{move_updown(moving); } break; case "fade" : move_fade(moving); break; default : return false; break; } } function startup(f_index){img_roll(f_index); bt_change_set(f_index); play_check(); } function img2_img3(mn){img_view2_li.css({display :"none"}); img_view3_li.css({display :"none"}); img_view2_li.eq(mn).css({display :"block"}); img_view3_li.eq(mn).css({display :"block"}); } function move_none(mn){img_view_li.css({display :"none"}); img2_img3(mn); img_view_li.eq(mn).css({display :"block"}); } function move_slide(mn){img_view_li.css({float :"left"}); var img_view_w = img_view_li.eq(0).width()*img_view_li.length; var img_view_li_w = img_view_li.eq(0).width(); var img_view_h = img_view_li.eq(0).height(); img_view.css({width :img_view_w,height :img_view_h,position :img_class_position}); if(slide_way == "left"){img_view.animate({left :mn*img_view_li_w*-1},delay_c); } if(slide_way == "right"){img_view.css({marginLeft :-img_view_w+img_view_li_w}); img_view.animate({left :mn*img_view_li_w},delay_c); } img2_img3(mn); } function move_slide_on(mn){img_view_li.css({float :"left"}); var img_view_w = img_view_li.eq(0).width()*img_view_li.length; var img_view_li_w = img_view_li.eq(0).width(); var img_view_h = img_view_li.eq(0).height(); img_view.css({width :img_view_w*3,height :img_view_h,position :img_class_position}); if(slide_way == "left"){img_view.css({marginLeft :-img_view_w}); img_view.animate({left :mn*img_view_li_w*-1},delay_c); } if(slide_way == "right"){img_view.css({marginLeft :-(img_view_w+(img_view_li_w*(img_view_li.length-1)))}); img_view.animate({left :mn*img_view_li_w},delay_c); } img2_img3(mn); } function move_updown(mn){img_view_li.css({float :"left"}); var img_view_w = img_view_li.eq(0).width(); var img_view_h = img_view_li.eq(0).height()*img_view_li.length; var img_view_li_h = img_view_li.eq(0).height(); img_view.css({width :img_view_w,height :img_view_h,position :img_class_position}); if(slide_way == "up"){img_view.animate({top :mn*img_view_li_h*-1},delay_c); } if(slide_way == "down"){img_view.css({marginTop :-img_view_h+img_view_li_h}); img_view.animate({top :mn*img_view_li_h},delay_c); } img2_img3(mn); } function move_updown_on(mn){img_view_li.css({float :"left"}); var img_view_w = img_view_li.eq(0).width(); var img_view_h = img_view_li.eq(0).height()*img_view_li.length; var img_view_li_h = img_view_li.eq(0).height(); img_view.css({width :img_view_w,height :img_view_h,position :img_class_position}); if(slide_way == "up"){img_view.css({marginTop :-img_view_h}); img_view.animate({top :mn*img_view_li_h*-1},delay_c); } if(slide_way == "down"){img_view.css({marginTop :-(img_view_h+(img_view_li_h*(img_view_li.length-1)))}); img_view.animate({top :mn*img_view_li_h},delay_c); } img2_img3(mn); } function move_fade(mn){img_view_li.css({display :"none",opacity :fade_set}); img_view_li.eq(mn).css({display :"block"}).animate({opacity :1},fade_delay); img2_img3(mn); } function slide_copyimg_front(){$(".slide_subset_f").eq($(".slide_subset_f").length-1).css({opacity :1}); $(".slide_subset_f").eq($(".slide_subset_f").length-1).animate({opacity :slide_fade_set}); } function slide_copyimg_end(){$(".slide_subset_e").eq(0).css({opacity :1}); $(".slide_subset_e").eq(0).animate({opacity :slide_fade_set}); } function animate_stop(){img_view.stop(); img_view_li.stop(); $(".slide_subset_f").stop(); $(".slide_subset_e").stop(); } function bt_change_set(bc){for(var i=0; i<bt_view_li.length; i++){if(i!=bc){bt_cout(bt_view_li.eq(i)); } else{bt_cov(bt_view_li.eq(bc)); } } if(bt_change=="on"){for(var i=0; i<bt_view_li.length; i++){if(i!=bc){bt_out(bt_view_img.eq(i)); } else{bt_ov(bt_view_img.eq(bc)); } } } } function bt_ov(e) {if(bt_nc == "on") {if(e.attr("src")){e.attr('src',e.attr('src').replace(over_name+"."+extension, "."+extension)); e.attr('src',e.attr('src').replace("."+extension, over_name+"."+extension)); } } else {if(e.attr("src")){e.attr('src',e.attr('src').replace(/_ov\./gi , ".")); e.attr('src',e.attr('src').replace(/(.+\/.+)(\.)(.+)/gi , "$1_ov$2$3")); } } } function bt_out(e) {if(o.bt_nc == "on") {if(e.attr("src")){e.attr('src',e.attr('src').replace(over_name+"."+extension, "."+extension)); } } else {if(e.attr("src")){e.attr('src',e.attr('src').replace(/_ov\./gi , ".")); } } }
	
	// 버튼 파일명에 _ov 삽입 : 커스텀
	function bt_cov(e)
	{
		// e.addClass("test");
		// e.css({"color":"red"});
		// e.css({"border":"1px solid #333"});
	}
	// 해당 파일명에 _ov 삭제 : 커스텀
	function bt_cout(e)
	{
		// e.removeClass("test");
		// e.css({"color":"red"});
		// e.css({"border":"1px solid #fff"});
	}

}); } }); })( jQuery, window, document );
/*
     FILE ARCHIVED ON 18:16:40 Mar 15, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:11:59 Apr 29, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 150.917 (3)
  esindex: 0.008
  captures_list: 237.782
  CDXLines.iter: 10.257 (3)
  PetaboxLoader3.datanode: 294.265 (5)
  exclusion.robots: 0.177
  exclusion.robots.policy: 0.158
  RedisCDXSource: 73.802
  PetaboxLoader3.resolve: 198.184 (2)
  load_resource: 361.101
*/