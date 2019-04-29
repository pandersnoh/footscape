$(window).load(function() {
    $('#nav_topbanner').cycle( {
        fx: 'scrollHorz', 
        speed: 700, 
        timeout: 2500, 
        prev: '#nav_topbanner_prev', 
        next: '#nav_topbanner_next'
    });
    $('#banner_img').cycle({
    	fx: 'fade',
    	speed: 500,
    	timeout: 3000,
    	pager: '#banner_pager',
    	pagerEvent: 'mouseover',
    	pauseOnPagerHover: true,
    	pagerAnchorBuilder: function (idx, slide) {
    		return '#banner_pager li:eq(' + (idx) + ') a';
    	}
    });    
    $('#power_ban_img').cycle( {
        fx:'scrollHorz', 
        prev:'#power1_prev', 
        next:'#power1_next', 
        timeout:2500, 
        speed:750, 
        pause:true, 
        activePagerClass: 'on',
        pager: '#power_ban_img_roll',
        pagerAnchorBuilder: function(idx, slide) {
            return '<a href="#" class="goods_img_roll_0' + idx+1 + '">1번째 배너</a>';
        }
    });
    $('#power2_goods').cycle( {
        before:function(currSlideElement, nextSlideElement) {
            $("#power_ban2_page").html($(nextSlideElement).attr("page"));
        },
        fx:'scrollHorz',
        prev:'#power2_prev',
        next:'#power2_next',
        pause:true,
        timeout:4000,
        speed:750
    });
    $('#power3_goods').cycle( {
        before:function(currSlideElement, nextSlideElement) {
            $("#power_ban3_page").html($(nextSlideElement).attr("page"));
        },
        fx:'scrollHorz',
        prev:'#power3_prev',
        next:'#power3_next',
        pause:true,
        timeout:5000,
        speed:750
    });
    $('#power4_goods').cycle( {
        before:function(currSlideElement, nextSlideElement) {
            $("#power_ban4_page").html($(nextSlideElement).attr("page"));
        }, 
        fx:'scrollHorz',
        prev:'#power4_prev',
        next:'#power4_next',
        pause:true,
        timeout:6000,
        speed:750
    });
    $('ul.brand_arr').cycle({
    	fx: 'scrollHorz',
    	speed: 700,
    	timeout: 2500,
    	activePagerClass: 'on',
    	pager: '.over_page',
    	prev: '#brand_arr_prev',
    	next: '#brand_arr_next',
    	pagerAnchorBuilder: function (idx, slide) {
    		return '<a href="#" class="over_page_0' + idx + 1 + '">1번째 배너</a>';
    	}
    });
    $('#m00_tab_list').cycle({
    	fx: 'scrollVert',
    	speed: 500,
    	timeout: 4500,
    	pager: '#m00_pager',
    	pagerEvent: 'mouseover',
    	pauseOnPagerHover: true,
    	pagerAnchorBuilder: function (idx, slide) {
    		return '#m00_pager li:eq(' + (idx) + ') a';
    	}
    });
    $('#big01_img').cycle({
    	fx: 'scrollHorz',
    	speed: 500,
    	timeout: 3000,
    	pager: '#big01_pager',
    	pagerEvent: 'mouseover',
    	pauseOnPagerHover: true,
    	pagerAnchorBuilder: function (idx, slide) {
    		return '#big01_pager li:eq(' + (idx) + ') a';
    	}
    });    
    $('#preview_roll1').cycle({
    	fx:'scrollHorz',
    	timeout:3000
    });
    $("#main_banner2").NemoSlider({
    	class_set: "nemo",
    	slide_fade_set: 1,
    	move_type: "slide",
    	bt_set: "over",
    	bt_change: "on",
    	slide_subset: "on",
    	its_stop: "it_is"
    });

    // 신발 및 의류 탭메뉴 프로모션
    $("#tab_promo .navi a").click(function () {
    	return false;
    });
    $("#tab_promo .navi a").mouseover(function () {
    	$($(this).attr("href")).fadeIn(300);
    	$(this).addClass("on");
    	$("#tab_promo .ct div").not($(this).attr("href")).fadeOut();
    	$("#tab_promo .navi a").not(this).removeClass("on");
    });
    $("#promo #list_promo li").hover(function () {
    	$(this).addClass("on")
    }, function () {
    	$(this).removeClass("on")
    });

    $(".brandBest_Content").not(":first").hide();
    $("#brandbest_tab ul li:first").addClass("active").show();
    $("#brandbest_tab ul li").hover(function () {
    	$("#brandbest_tab ul li.active").removeClass("active");
    	$(this).addClass("active");
    	$(".brandBest_Content").hide();
    	$($('a', this).attr("href")).show();
    	return false;
    });    
});