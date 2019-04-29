var zoom = new function()
{
	this.className 			= 'zoom_view';
	this.service_url		= '/app/svc/zoom_view/';
	this.offset				= null;
	this.screen_frame		= 'contents';
	this.screen_width		= document.documentElement.clientWidth;
	this.view_width			= 532;
	this.currentImageIdx	= 0;
	this.smallImages		= new Object();

	this.view = function(obj, goods_no, goods_sub)
	{
		var self = zoom;
		self.offset = $(obj).offset();

		if ( self.checkDup(goods_no, goods_sub) == 0 )
		{
			self.getProductInfo(goods_no, goods_sub);
		}
	}

	this.checkDup = function(goods_no, goods_sub)
	{
		var self = zoom;
		var cnt = $(self.getLayerName(goods_no, goods_sub)).length;
		return cnt;
	}

	this.getLayerName = function(goods_no, goods_sub)
	{
		return "#zoom_view_" + goods_no + "_" + goods_sub;
	}

	this.getFrameOffset = function()
	{
		var self = zoom;
		var offset = $("#" + self.screen_frame).offset();
		return offset;
	}

	this.getProductInfo = function(goods_no, goods_sub)
	{
		var self = zoom;
		var frameoffset = self.getFrameOffset();

		/*
		if ( (self.offset.left - frameoffset.left + self.view_width) > self.screen_width )
		{
			self.offset.left = self.offset.left - self.view_width;
		}
		*/
		if(navigator.userAgent.toLowerCase().indexOf("webkit") >= 0) {
			var x = document.body.scrollTop + 150;
		} else {
			var x = document.documentElement.scrollTop + 150;
		}

		var y = (frameoffset.left+70);

		var div_id = "zoom_view";

		if ( $("#" + div_id).length == 0 )
		{
			$("<div id='" + div_id + "'></div>").appendTo("body");
		}
		$.ajax({
			type: "GET",
			url: self.service_url + goods_no + '/' + goods_sub + "?top=" + x + "&left=" + y,
			success: function(msg) {
				//$("body").append(msg);
				$("#" + div_id).html(msg);
				//document.getElementById("zoom_view_here").scrollIntoView(true);
				//$("div.zoom_view").easydrag();
			}
		});

		//$("#" + div_id).jqm();
		//$("#" + div_id).jqm({modal:true});
		//$("#" + div_id).jqmShow();

		return false;
	}

	this.close = function(id)
	{
		var self = zoom;
		$("#zoom_view").remove();
		//$('#zoom_view').jqmHide();
	}

	this.viewSubOption = function(goods_no, goods_sub, goods_opt, option_cnt)
	{
		$("select[name='option2']:eq(0) > option:gt(0)").remove();

		 var is_price_include = goods_opt.indexOf("|");
		 if( is_price_include > -1){
			 tmp = goods_opt.split("|");
			 goods_opt = tmp[0];
		 }

		if ( option_cnt > 1 && goods_opt != "") {

			$.ajax({
				type: "POST"
				, url: "/app/svc/production_option"
				, data: "goods_no=" + urlEncode(goods_no) + "&goods_sub=" + urlEncode(goods_sub) + "&goods_opt=" + urlEncode(goods_opt)
				, success: function(msg) {
					eval("var json = " + msg);
					for ( var i = 0 ; i < json.length ; i++ ) {
						var data = "<option value='" + decodeURI(json[i].val) + "'>" + decodeURI(json[i].txt) + "</option>";
						$("select[name='option2']:eq(0)").append(data);
					}
				}
			});
		}
	}

	this.getOpt = function(opt_cnt, first_option_cnt, no_price)
	{
		var self = zoom;
		var fid = "zoom_order_info select[name='option1']";
		var sid = "zoom_order_info select[name='option2']";
		var hfid = "zoom_order_info input[name='option1'][type='hidden']";

		var opt = "";

		if( first_option_cnt == 1 && $("#" + hfid ).attr("value") != undefined ){
			opt1 = $("#" + hfid ).attr("value");
		} else {
			opt1 = $("#" + fid + " option:selected").attr("value");
		}

		if ( opt1 == "" ) { return false; }

		if( no_price && opt1 != undefined ){
			var is_price_include = opt1.indexOf("|");
			if( is_price_include > -1){
				// opt_price included
				tmp = opt1.split("|");
				 opt1 = tmp[0];
			}
		}

		opt = opt1;

		if ( opt_cnt == 2) {
			var opt2 = $("#" + sid + " option:selected").attr("value");
			if ( opt2 == "" ) 	{ return false; }
			opt = opt1 + '^' + opt2;
		}
		return opt;
	}

	this.getQty = function(goods_no, goods_sub)
	{
		var self = zoom;

		var qty_obj = $("#zoom_order_info input[name='qty'][type='text']");
		var qty = parseInt($(qty_obj).attr("value"));
		return qty;
	}

	this.setQty = function(goods_no, goods_sub, qty)
	{
		var self = zoom;

		var qty_obj = $("#zoom_view_" + goods_no + "_" + goods_sub + " input[name='qty'][type='text']");
		$(qty_obj).attr("value", qty);
	}

	this.getAddopt = function() {

		var self = zoom;
		var addopt = "";
		for( var i = 1; i< 10; i++){

			var addopt_required_yn = $("#" + "zoom_order_info input[name='addopt_required_yn" + i + "']");
			var addopt_obj = $("#" + "zoom_order_info select[name='addopt" + i + "']");

			// 필수값 여부 판단
			if( addopt_required_yn ){
				if( addopt_required_yn.attr("value") == "Y" && addopt_obj.attr("value") == "" ){
					addopt = "failed";
					break;
				}
			}

			if( addopt_obj.attr("value") ){
				addopt += ( addopt != "" ) ? "^":"";
				addopt += addopt_obj.attr("value");
			} else {
			}
		}
		return addopt;
	}

	this.changeQty = function(opt_cnt, goods_no, goods_sub, flag)
	{
		var self = zoom;

		var qty = self.getQty(goods_no,goods_sub);

		if ( flag == "plus" ) {
			self.setQty(goods_no,goods_sub,qty+1);
		} else {
			if ( qty < 2 ) {
				alert('더 이상 줄일 수 없습니다.');
				return;
			}
			self.setQty(goods_no,goods_sub,qty-1);
		}
	}

	this.addWish = function(opt_cnt, goods_no, goods_sub, first_option_cnt)
	{
		var self = zoom;
		var opt = self.getOpt(opt_cnt, first_option_cnt);
		var opt_noprice = self.getOpt(opt_cnt, first_option_cnt, true);
		var addopt = self.getAddopt();
		var qty = self.getQty(goods_no, goods_sub);
		var zoom_id = "zoom_view_" + goods_no + "_" + goods_sub;

		if ( !loginChk() )
		{
			alert('로그인 후 이용하실 수 있습니다');
			return false;
		}

		if ( opt == false)
		{
			alert('옵션을 선택하세요');
			return;
		}

		if ( addopt == 'failed') {
			alert('추가 옵션을 선택하세요');
			return false;
		}

		if ( miniCart.chkJaego(goods_no, goods_sub, opt_noprice, qty) != "1" )
		{
			alert('재고가 부족합니다.');
			return;
		}

		// 위시리스트 저장 후 결과 출력
		$.ajax({
			type: "POST",
			url: "/app/wish/svc_add/" + goods_no + "/" + goods_sub,
			data: "goods_opt=" + urlEncode(opt) + "&addopt=" + urlEncode(addopt),
			success: function(msg){
				//shoppingSlide.viewWish(false);
				$("#" + zoom_id).remove();
				//$('#zoom_view').jqmHide();
				alert('찜 한 상품에 담았습니다.');
			}
		});
	}

	this.order = function(opt_cnt, goods_no, goods_sub, first_option_cnt)
	{
		// 1. 시간 체크(클라이언트 vs 서버)
		checkTime();

		var self = zoom;
		var zoom_id = "zoom_view_" + goods_no + "_" + goods_sub;
		var opt = self.getOpt(opt_cnt, first_option_cnt);
		var opt_noprice = self.getOpt(opt_cnt, first_option_cnt, true);
		var addopt = self.getAddopt();
		var qty = self.getQty(goods_no, goods_sub);
		var popup = document.f1.popup.value;

		if ( opt == false)
		{
			alert('옵션을 선택하세요');
			return;
		}

		if ( opt == true) {
			opt = urlEncode(opt);
		}

		if ( addopt == 'failed') {
			alert('추가 옵션을 선택하세요');
			return false;
		}

		if ( miniCart.chkJaego(goods_no, goods_sub, opt_noprice, qty) != "1" ) {
			alert('재고가 부족합니다.');
			return;
		}
		// 기본옵션 포맷 : BLUE|5000^GREEN
		var opt_price = 0;
		var opt1 = "";
		if( opt_cnt > 1 ){
			tmp_opt = opt.split("^");
			opt1 = tmp_opt[0];
		} else if( opt_cnt == 1 ){
			opt1 = opt;
		}

		var is_price_include = opt1.indexOf("|");
		if( is_price_include > -1){
			tmp = opt1.split("|");
			opt_price = parseInt(tmp[1]);
		}

		// 추가옵션 포맷 : RED|5000^BLUE|1000^GREEN|3000
		var addopt_price = 0;
		if( addopt ){
			is_multi = addopt.indexOf("^");
			is_price = addopt.indexOf("|");
			if( is_price > -1 ){
				if( is_multi > -1 ){
					tmp_addopt = addopt.split("^");
					for(i = 0; i < tmp_addopt.length; i++){
						tmp = tmp_addopt[i].split("|");
						addopt_price += parseInt(tmp[1]);
					}
				} else {
					tmp = addopt.split("|");
					addopt_price += parseInt(tmp[1]);
				}
			}
		}

		$.ajax({
			type: "POST",
			url: "/app/cart/mini_cart_save/" + goods_no + "/" + goods_sub,
			data: "goods_opt=" + urlEncode(opt_noprice) + "&opt_price=" + urlEncode(opt_price) + "&addopt=" + urlEncode(addopt) + "&addopt_price=" + urlEncode(addopt_price) + "&goods_cnt=" + qty,
			success: function(msg){
				//self.close("zoom_view_" + goods_no + "_" + goods_sub);
				$("#" + zoom_id).remove();
				//$('#zoom_view').jqmHide();
				if(popup == "Y") {
					window.close();
					opener.location.href = '/app/order/order_form';
				}
				else {
					document.location.href = '/app/order/order_form';
				}

			}
		});
	}

	this.addCart = function(opt_cnt, goods_no, goods_sub, first_option_cnt)
	{
		// 1. 시간 체크(클라이언트 vs 서버)
		checkTime();

		var self = zoom;
		var zoom_id = "zoom_view_" + goods_no + "_" + goods_sub;
		var opt = self.getOpt(opt_cnt, first_option_cnt);
		var opt_noprice = self.getOpt(opt_cnt, first_option_cnt, true);
		var addopt = self.getAddopt();
		var qty = self.getQty(goods_no, goods_sub);
		var popup = document.f1.popup.value;

		if ( opt == false)
		{
			alert('옵션을 선택하세요');
			return;
		}

		if ( addopt == 'failed') {
			alert('추가 옵션을 선택하세요');
			return false;
		}

		if ( opt == true) {
			opt = urlEncode(opt);
		}

		if ( "1" != miniCart.chkJaego(goods_no, goods_sub, opt_noprice, qty)) {
			alert('재고가 부족합니다.');
			return;
		}

		// 기본옵션 포맷 : BLUE|5000^GREEN
		var opt_price = 0;
		var opt1 = "";
		if( opt_cnt > 1 ){
			tmp_opt = opt.split("^");
			opt1 = tmp_opt[0];
		} else if( opt_cnt == 1 ){
			opt1 = opt;
		}

		var is_price_include = opt1.indexOf("|");
		if( is_price_include > -1){
			tmp = opt1.split("|");
			opt_price = parseInt(tmp[1]);
		}

		// 추가옵션 포맷 : RED|5000^BLUE|1000^GREEN|3000
		var addopt_price = 0;
		if( addopt ){
			is_multi = addopt.indexOf("^");
			is_price = addopt.indexOf("|");
			if( is_price > -1 ){
				if( is_multi > -1 ){
					tmp_addopt = addopt.split("^");
					for(i = 0; i < tmp_addopt.length; i++){
						tmp = tmp_addopt[i].split("|");
						addopt_price += parseInt(tmp[1]);
					}
				} else {
					tmp = addopt.split("|");
					addopt_price += parseInt(tmp[1]);
				}
			}
		}

		$.ajax({
			type: "POST",
			url: "/app/cart/mini_cart_save/" + goods_no + "/" + goods_sub,
			data: "goods_opt=" + urlEncode(opt_noprice) + "&opt_price=" + urlEncode(opt_price) + "&addopt=" + urlEncode(addopt) + "&addopt_price=" + urlEncode(addopt_price) + "&goods_cnt=" + qty,
			success: function(msg){
				//self.close("zoom_view_" + goods_no + "_" + goods_sub);
				//$('#zoom_view').jqmHide();
				if(popup == "Y") {
					window.close();
					opener.location.href = '/app/cart';
				}
				else {
					$("#" + zoom_id).remove();
					//$('#zoom_view').jqmHide();
					shoppingSlide.viewCart(false);
				}


			}
		});
	}

	this.detailView = function(goods_no,goods_sub)
	{
		var self = zoom;
		$("#" + zoom_id).remove();
		//$('#zoom_view').jqmHide();
		document.location.href = '/app/product/detail/' + goods_no + "/" + goods_sub;
	}

	this.changeImg = function(thumb_img_id, small_img_id, idx) {

		var self = zoom;
		var small_img_obj = $("#" + small_img_id);
		var thumb_img_obj = $("#" + thumb_img_id);

		currentImageIdx = parseInt(idx);

		if(self.smallImages[currentImageIdx] == undefined) {
			
			// 이미지 객체 만들기
			self.smallImages[currentImageIdx] = new Image();
			self.smallImages[currentImageIdx].src = thumb_img_obj.attr("src");
		}

		small_img_obj.fadeOut(300, function(){
			$(this).attr("src", self.smallImages[currentImageIdx].src).bind('onreadystatechange load', function(){
				if (this.complete) $(this).fadeIn(300);
			});
		});
	}
}









// DIV팝업셋 시작
function setCookie( name, value, expiredays ) {
    var todayDate = new Date();
        todayDate.setDate( todayDate.getDate() + expiredays );
        document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
    }

function closeWin(setName) {
/* 공지가 2개일때
    if ( document.notice_form.chkbox.checked || document.notice_form2.chkbox2.checked){
        setCookie( setName, "done" , 1 );
    }
*/
  if (document.notice_form.chkbox.checked){
        setCookie( setName, "done" , 1 );
    }


  if(setName=="divpop")
  {
    document.all['divpop'].style.visibility = "hidden";
  }
 /* 공지가 2개일때
  if(setName=="photo_divpop")
  {
   document.all['divpop'].style.visibility = "hidden";
 } */
}
// DIV팝업셋 끝
/*
     FILE ARCHIVED ON 16:30:33 Mar 15, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:11:59 Apr 29, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 85.698 (3)
  esindex: 0.008
  captures_list: 112.285
  CDXLines.iter: 14.74 (3)
  PetaboxLoader3.datanode: 62.537 (5)
  exclusion.robots: 0.194
  exclusion.robots.policy: 0.175
  RedisCDXSource: 8.276
  PetaboxLoader3.resolve: 124.694 (4)
  load_resource: 145.451
*/