String.prototype.URLEncode = function URLEncode() {

	var s0, i, s, u, str;
	s0 = ""; // encoded str
	str = this; // src
	for (i = 0; i < str.length; i++) { // scan the source
		s = str.charAt(i);
		u = str.charCodeAt(i); // get unicode of the char
		if (s == " "){s0 += "+";} // SP should be converted to "+"
		else {
			if ( u == 0x2a || u == 0x2d || u == 0x2e || u == 0x5f 
			|| ((u >= 0x30) && (u <= 0x39)) || ((u >= 0x41) && (u <= 0x5a)) 
			|| ((u >= 0x61) && (u <= 0x7a))) { // check for escape
				s0 = s0 + s; // don't escape
			} else { // escape
				if ((u >= 0x0) && (u <= 0x7f)){ // single byte format
					s = "0"+u.toString(16);
					s0 += "%"+ s.substr(s.length-2);
				} else if (u > 0x1fffff){ // quaternary byte format (extended)
					s0 += "%" + (oxf0 + ((u & 0x1c0000) >> 18)).toString(16);
					s0 += "%" + (0x80 + ((u & 0x3f000) >> 12)).toString(16);
					s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
					s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
				} else if (u > 0x7ff) { // triple byte format
					s0 += "%" + (0xe0 + ((u & 0xf000) >> 12)).toString(16);
					s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
					s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
				} else { // double byte format
					s0 += "%" + (0xc0 + ((u & 0x7c0) >> 6)).toString(16);
					s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
				}
			}
		}
	}
	return s0;
};

/*
	Funcion : addfavorites
	즐겨찾기 추가 함수
	
	Parameters:
			 
	See Also:
		
*/
function addfavorites(title, url) {
	
	if (window.sidebar) {								// firefox
		window.sidebar.addPanel(title, url, "");
	} else if( window.external ) {						// ie
		window.external.AddFavorite(url, title);
	} else if(window.opera && window.print) {			// opera
		var elem = document.createElement('a'); 
	    elem.setAttribute('href', url); 
	    elem.setAttribute('title', title); 
	    elem.setAttribute('rel', 'sidebar'); 
	    elem.click();
	}
}

/*
	Funcion : layerView
	레이어 박스 출력
	
	Parameters:
		obj		- 객체
		id		- 출력할 layer id명
		top 	- layer top 위치
		left	- layer left 위치
		
	See Also:
		<layerHidden>
*/
function layerView(obj, id, top, left) {
	
	var offset = $(obj).offset();
	$("#" + id).css("top", offset.top + top);
	$("#" + id).css("left", offset.left + left);
	$("#" + id).show();
}

/*
	Funcion : layerHidden
	레이어 박스 닫기
	
	Parameters:
		id		- 닫을 layer id명

	See Also:
		<layerHidden>
*/
function layerHidden(id) {
	
	$("#" + id).hide();
}

/*
	Funcion : layerRemove
	레이어 박스 제거
	
	Parameters:
		id		- 제거할 layer id명

	See Also:
		<layerHidden>
*/
function layerRemove(id) {
	
	$("#" + id).remove();
}

/*
	Funcion : mouseOver
	mouseover 시 변환된 이미지 리턴
	
	Parameters:
		obj	- 이미지 변환할 객체
		
	See Also:
		<mouseOut>, <reverseSrc>
*/
function mouseOver(obj) {
	
	obj.src = reverseSrc(obj.src, true);
	return obj.src;
}

/*
	Funcion : mouseOut
	mouseout 시 변환된 이미지 리턴
	
	Parameters:
		obj	- 이미지 변환할 객체
		
	See Also:
		<layerHidden>, <reverseSrc>
*/
function mouseOut(obj) {
	
	obj.src = reverseSrc(obj.src, false);
	return obj.src;
}

/*
	Funcion : reverseSrc
	이미지 변환
	
	Parameters:
		src		- 변환 시킬 이미지 소스
		flag	- 변환 여부
		
	See Also:
		<mouseOver>, <mouseOut>
*/
function reverseSrc(src, flag) {
			
	var url = src;
	var tmp_arr = url.split("/");
	var file_name = tmp_arr[tmp_arr.length-1];
	var set_name = null;
	if ( flag )
	{
		re = /(_on\.)/gi;
		if ( re.test(file_name) )
		{				
			set_name = file_name;
		}
		else
		{				
			set_name = file_name.replace(/\_off/i, "_on");
		}
	} 
	else
	{
		set_name = file_name.replace(/\_on/i, "_off");
	}
	return url.replace(file_name, set_name);	
}

/*
	Funcion : onMouseOverCategory
	마우스 오버 시 카테고리 출력
	
	Parameters:
		oMenu	- 카테고리 객체
		category_id - 출력할 카테고리 레이어의 id
		
	See Also:
		
*/
function onMouseOverCategory(oMenu, category_id) {
	
	var osub = document.getElementById(category_id);	
	
//	osub.innerHTML = "";	
	osub.style.display = "block";
}

/*
	Funcion : onMouseOutCategory
	카테고리 숨김
	
	Parameters:
		category_id - 숨길 카테고리 레이어의 id
		
	See Also:
		
*/
function onMouseOutCategory(category_id) {
	document.getElementById(category_id).style.display = "none";
}

/*
	Funcion : onMouseOverCategory
	마우스 오버 시 하위 카테고리 출력
	
	Parameters:
		oMenu		- 카테고리 객체
		category_id - 출력할 카테고리 레이어의 id
		oTable 		- 상위 카테고리가 있는 영역
		top 		- 상위 카테고리의 top 
	See Also:
		
*/
function onMouseOverCategory2(oMenu, oTable, category_id, top) {
	
	var osub = document.getElementById(category_id);
	var otb = document.getElementById(oTable);

	osub.style.top =  (27*top) - 10;
	osub.style.left =  140;
	osub.style.display = "block";	
}

/*
	Funcion : allView
	전체보기
	
	Parameters:
		classid - 추가적으로 나타낼 레이어 박스 class명 
		
	See Also:
		<layerHidden>
*/
function allView(classid) {
	
	var ff = document.getElementById("view");
	if ( ff.allview.value == "N" || ff.allview.value == "" ) {
		ff.allview.value = "Y"
		$("." + classid).show();
	}
	else {
		ff.allview.value = "N"
		$("." + classid).hide();
	}		
}

/*
	Funcion : send
	상품 리스트 정렬 함수
	
	Parameters:
		sort		- 정렬할 조건
		
	See Also:
		
*/
function send(sort) {
	
	var ff = document.f1;
	ff.sort.value = sort;
	ff.page.value = 1;
	
	var brand = ff.brand.value;
	var list_kind = ff.list_kind.value;
	var display_cnt = ff.display_cnt.value;	

	ff.method = "get";	
	ff.action = ff.action + "?brand=" + brand + "&list_kind=" + list_kind + "&sort=" + sort + "&display_cnt=" + display_cnt + "#abc";	
	
	ff.submit();
}

/*
	Funcion : opacity
	투명도를 조절하는 함수
	
	Parameters:
		s	- 투명도를 적용할 영역
		val - 투명도 값
		
	See Also:
		
*/
function opacity(s, val) {
	
	if ( navigator.appName.indexOf("Explorer") != -1 ) {
		s.style.filter="Alpha(opacity=" + val + ")";
	} else {
		s.style.opacity= val/100;
	}
}

/*
	Funcion : listSwatch
	상품 리스트 변환 함수
	
	Parameters:
		d_cat_cd		- 전시 카테고리 코드
		list_kind		- 리스트 종류
		pint_area		- 리스트 출력 영역
		sort			- 리스트 정렬 조건
		display_cnt		- 리스트 상품 출력 수
		brand			- 브랜드
	See Also:
		
*/
function listSwitch(form, list_kind) {
	
	form.list_kind.value = list_kind;
	
	for ( var i = 0 ; i < $(".goods_list_kind img[name='list_img']").length ; i++ )
	{
		var src = $(".goods_list_kind img[name='list_img']:eq(" + i + ")").attr("src");
		$(".goods_list_kind img[name='list_img']:eq(" + i + ")").attr("src", mouseOutImageOv(src));
	}
	
	if (list_kind == 'detail')
	{
		src = $(".goods_list_kind img[name='list_img']:eq(0)").attr("src");
		$(".goods_list_kind img[name='list_img']:eq(0)").attr("src", mouseOverImageOv(src));
	}
	else if (list_kind == 'small')
	{
		src = $(".goods_list_kind img[name='list_img']:eq(1)").attr("src");
		$(".goods_list_kind img[name='list_img']:eq(1)").attr("src", mouseOverImageOv(src));
	}
	else if (list_kind == 'big')
	{
		src = $(".goods_list_kind img[name='list_img']:eq(2)").attr("src");
		$(".goods_list_kind img[name='list_img']:eq(2)").attr("src", mouseOverImageOv(src));
	}

	var service_url = "/app/util/list_switch/"+list_kind;
	var param = formData2QueryString(form);

	$.ajax({
		type: "POST",
		url: service_url,
		data : param,
		success: function(msg)
		{
			document.getElementById('goods_list').innerHTML = msg;
		}
	});
	return false;
}

/*
	Funcion : listSwitchPage
	상품 리스트 페이지 변환 함수
	
	Parameters:
		d_cat_cd		- 전시 카테고리 코드		
		pint_area		- 리스트 출력 영역
		sort			- 리스트 정렬 조건
		display_cnt		- 리스트 상품 출력 수
		brand			- 브랜드
	See Also:
		
*/
function listSwitchPage(form, page) {
	
	var list_kind = form.list_kind.value;
	form.page.value = page;
	
	var param = decodeURI(formData2QueryString(form));
	
	var url = form.action + "?" + param;
	
	document.location.href = url;
}

/*
	Funcion : mouseOverImage
	이미지 변환(이미지 파일명 끝에 _ov 붙임)
	
	Parameters:
		src		- 변환 시킬 이미지 소스
		
	See Also:
		<mouseOverImage>, <imageView>
*/
function mouseOverImage(src) {
	
	return src.replace(/_off\.gif/, '_on.gif');
}

/*
	Funcion : mouseOutImage
	이미지 변환(이미지 파일명 끝에 _on 제거)
	
	Parameters:
		src		- 변환 시킬 이미지 소스
		
	See Also:
		<mouseOverImage>, <imageView>
*/
function mouseOutImage(src) {
	
	return src.replace(/_on\.gif/, '_off.gif');
}

/*
	Funcion : mouseOverImageOV
	이미지 변환(이미지 파일명 끝에 _ov 붙임)
	
	Parameters:
		src		- 변환 시킬 이미지 소스
		
	See Also:
		<mouseOverImage>, <imageView>
*/
function mouseOverImageOv(src) {
	
	return src.replace(/\.gif/, '_ov.gif');
}

/*
	Funcion : mouseOutImage
	이미지 변환(이미지 파일명 끝에 _ov 제거)
	
	Parameters:
		src		- 변환 시킬 이미지 소스
		
	See Also:
		<mouseOverImage>, <imageView>
*/
function mouseOutImageOv(src) {
	
	return src.replace(/_ov\.gif/, '.gif');
}

/*
	Funcion : viewSize
	사이즈 보기
	
	Parameters:
		obj			- 해당상품 객체
		goods_no	- 해당상품 번호
		goods_sub	- 해당상품 하위번호
		
	See Also:
	<getUnixTime>		
*/
function viewSize(obj, goods_no, goods_sub) {
	
	$("div.size_view").empty();
	
	$.ajax({
		type: "GET",
		url: "/app/svc/optionList/" + goods_no + "/" + goods_sub + "?" + getUnixTime(),
		success: function(msg){
			$(obj).append(msg);		
		}
	});
	
	$(obj).hover(
		function(){},
		function()
		{
			$("div.size_view").empty();
		}
	);
	return;
}

function viewSize2(obj, opt_id, goods_no, goods_sub) {

	$("#" + opt_id).empty();
	$.ajax({
		type: "GET",
		url: "/app/svc/optionList/" + goods_no + "/" + goods_sub + "?" + getUnixTime(),
		success: function(msg){
			$("#"+opt_id).append(msg);
			$("#"+opt_id).show();

		}
	});
	
	$(obj).hover(
		function(){},
		function()
		{
			$("#" + opt_id).empty();
		}
	);
	return;
}

/*
	Funcion : getUnixTime
	현재 시간 데이터 얻기
	
	Parameters:
				
	See Also:			
*/
function getUnixTime() {
	
	var d = new Date();
	return d.getTime();
}

/*
	Funcion : loginChk
	로그인 여부 확인
	
	Parameters:
				
	See Also:			
*/
function loginChk() {
	
	var result = "0";

	$.ajax({
		type: "GET",
		async: false,
		url: "/app/member/login_check",
		success: function(msg){
			eval("var json = " + msg);
			result = json.result;
		}
	});
	
	if ( result == "1")
	{
		return true;
	}
	else
	{
		return false;
	}
}

/*
	Funcion : gdscroll
	scroll 위치 이동(위, 아래)
	
	Parameters:
		gap - 이동 픽셀 ( + : 위, - : 아래 )
				
	See Also:			
*/
function gdscroll(gap)
{
	var gdscroll = document.getElementById('gdscroll');
	gdscroll.scrollTop += gap;
}

/*
	Funcion : couponDown
	쿠폰 다운
	
	Parameters:
		url 		- 현재 url
		goods_no 	- 상품번호 
		goods_sub	- 상품 하위번호
				
	See Also:			
*/
function couponDown(url, goods_no, goods_sub) {
	
	var div_id = "coupon_down_pop";
	var target_url = encodeURIComponent("/app/product/detail/" + goods_no + "/" + goods_sub);
	var service_url = "/app/contents/coupon_down/" + goods_no + "/" + goods_sub;
	
	if ( !loginChk() )
	{
		document.location.reload("/app/member/login?target_url=" + target_url);
		return false;
	}

	if ( $("#" + div_id).length == 0 )
	{
		$("<div id='" + div_id + "'></div>").appendTo("body");
	}
	
	$.ajax({
		type: "GET",
		url: service_url,
		success: function(msg){
			$("#" + div_id).html(msg);
		}
	});
	
	$("#" + div_id).jqm();
	$("#" + div_id).jqm({modal:true});
	$("#" + div_id).jqmShow();
	
	return false;
	
}

/*
	Funcion : viewBaesongInfo
	배송정보 레이어 출력
	
	Parameters:
		obj 	- 해당객체
		div_id	- 배송정보 레이어 박스 id명
		
	See Also:		
*/
function viewBaesongInfo(obj, div_id, top, left) {
		
	var offset = $(obj).offset();
	$("#" + div_id).css("top",offset.top + top);
	$("#" + div_id).css("left",offset.left - left);	
	$("#" + div_id).show();
	
	return false;
}

/*
	Funcion : viewCard_interest
	무이자 할부 안내 레이어 박스 출력 
	
	Parameters:
		obj 	- 해당객체
		div_id	- 배송정보 레이어 박스 id명
		
	See Also:		
*/
function viewCard_interest(obj, div_id, top, left) {
		
	var offset = $(obj).offset();
	$("#" + div_id).css("top",offset.top + top);
	$("#" + div_id).css("left",offset.left - left);	
	$("#" + div_id).show();
	
	return false;
}
/*
	Funcion : login_popup
	로그인 팝업 창 생성 함수
	
	Parameters:
		
	See Also:		
*/
function login_popup() {
	
	openWindow('/app/member/login_pop', 'login_pop', 'resizable=no,scrollbars=no', 350, 280, true);	
}

/*
	Funcion : openerLocation
	부모창  Location 함수
	
	Parameters:
		url - 이동경로
	See Also:		
*/

function openerLocation(url) {
	
	opener.document.location.href = url;
	self.close();
}

/*
	Funcion : viewContent
	상세 내용 및 답변 보기
	
	Parameters:
		id1 - 상세 내용 id 
		id2 - 답변 내용 id
		id3 - 덧글 내용 id
		
	See Also:		
*/
function viewContent(id1, id2, id3)
{
	if ( document.getElementById(id1) != null )
	{
		document.getElementById(id1).style.display = ( document.getElementById(id1).style.display == "none" ) ? "":"none";		
	}
	if ( document.getElementById(id2) != null )
	{
		document.getElementById(id2).style.display = ( document.getElementById(id2).style.display == "none" ) ? "":"none";		
	}
	
	if ( document.getElementById(id3) != null )
	{
		document.getElementById(id3).style.display = ( document.getElementById(id3).style.display == "none" ) ? "":"none";		
	}
}

/*
	Funcion : onlynumber
	숫자만 입력 가능
	
	Parameters:		
		
	See Also:		
*/
function onlynumber() {
	
	if ( window.event == null ) return;

	var e = event.keyCode;

	if (e>=48 && e<=57) return;
	if (e>=96 && e<=105) return;
	if ( e==8 || e==9 || e==13 || e==37 || e==39) return; // tab, back, ←,→
	event.returnValue = false;
}

/*
	Funcion : checkQty
	구매수량 체크
	
	Parameters:		
		loc - 구매수량 입력폼

	See Also:		
*/
function checkQty(loc) {
	if(loc.value == "" || loc.value == 0){
		loc.value = "1";
		loc.focus();
		loc.select();
		return false;
	}
	
	if(/[^0123456789]/g.test(loc.value)) {
		loc.value = "1";
		loc.focus();
		loc.select();
		return false;
	}
}

/*
	Funcion : popup_zipcode
	우편번호 검색 팝업 창 생성
	
	Parameters:
		control_name1 - 우편번호
		control_name2 - 시, 도
		control_name3 - 구, 군
		control_name4 - 동
		
	See Also:
*/
function popup_zipcode(control_name1, control_name2, control_name3, control_name4, width, height) {
	
	openWindow("/app/util/find_zip_post/?name1=" + control_name1 + "&name2=" + control_name2 + "&name3=" + control_name3 + "&name4=" + control_name4, 'find_zip', 'resizable=no,scrollbars=no', width, height, true);	
}

function popup_coupon(coupon_no) {
	
	var coupon_no= coupon_no;
	openWindow("/app/contents/coupon_products?coupon_no=" + coupon_no, 'coupon', 'resizable=yes,scrollbars=yes', 970, 735, true);
	//close();
}

function popup_partner(type)
{
	if( type == "partner")
	{
		var win = window.open("/app/company/partner", "partner", "width=538, height=600");
		win.focus();
	}
	else if (type == "recruit")
	{
		var win = window.open("/app/company/recruit", "recruit", "width=538, height=550");
		win.focus();
	}
		//close();
}

/*
	Funcion : inputDomain
	이메일 뒷부분 처리 함수
	
	Parameters:
		email_tail	- 항목에 있는 이메일 뒷부분
		email_etc	- 이메일 뒷부분 직접 입력		
		
	See Also:
*/
function inputDomain(email_tail, email_etc) {
		
	var selected_domain = $("select[name='" + email_tail + "']:eq(0)").attr("value");
	var input_domain = $("input[name='" + email_etc + "']:eq(0)");
	
	if ( selected_domain == "etc" )
	{
		$(input_domain).css( {display:""} );
		$(input_domain).focus();
	}
	else
	{
		$(input_domain).css( {display:"none"} );
	}
}

/*
	Funcion : more_list
	리스트 더보기 함수
	
	Parameters:
		cat_cd	- 카테고리 코드
		kind	- 페이지 종류		
		
	See Also:
*/
function more_list(cat_cd, kind)
{
	// 기본기능 구현,,, 추후 임팩트 작업
	if (kind =="newArrival") {
		var target_url = "/app/contents/new_goods_more/00" + cat_cd;	
	} else if (kind =="onSale") {
		var target_url = "/app/contents/OnSaleMore/00200" + cat_cd;
	}
	

	if($("#more_list" + cat_cd).css('display') == "none")
	{
		$.ajax({
			type: "GET",
			url: target_url,
			success: function(msg){
				if (msg != "") {
				$("#more_list" + cat_cd).show();
				$("#more_list" + cat_cd).html(msg);
				$("#more" + cat_cd).attr('src',"/media/img/contents/new/view_out.gif");
				}
			}
		});
	}
	else
	{
		$("#more_list" + cat_cd).hide();
		$("#more" + cat_cd).attr('src',"/media/img/contents/new/view_plus.gif");
	}
}

// 화면에서 팝업 또는 레이어의 값으로 나눠서 위치를 반환
function getWidthPosition(w){
	var x = ((document.documentElement.clientWidth - w) / 2) + document.documentElement.scrollLeft;   
	return x;
}

// 화면에서 팝업 또는 레이어의 값으로 나눠서 위치를 반환
function getHeightPosition(h){
    var y = ((document.documentElement.clientHeight - h) / 2) + document.documentElement.scrollTop;
	return y;
}

function LoginCheckUrl(url) {
	if ( !loginChk() ) {
		if ( confirm("회원전용입니다.\n\n로그인 하시겠습니까?") ) {
			document.location = "/app/member/login";
		} else {
			return false;
		}
	} else {
		document.location = url;
	}
}

function goCategory(d_cat_cd){
	if(d_cat_cd !=""){
		document.location = "/app/category/lists/" + d_cat_cd;
	} else{
		alert("카테고리를 선택해 주세요.");
		return false;
	}
}

// 메뉴 플래시에 대한 함수
function BtnClickChkEvent(mode){
	
	//오픈 모드
	if(mode == "open"){
		document.getElementById('flashArea').style.position = "";
	} else {
		document.getElementById('flashArea').style.position = "relative";
	}
}

//주문 취소 팝업
function order_cancel(ord_no, page, pg_yn) {
	openWindow("/app/svc/order_cancel/" + ord_no + "/" + page + "/" + pg_yn, "cancel_order", "resizable=no,scrollbars=no", 540, 235, true);
}

function order_cancel_cmd()
{
	ff = document.lf1;
	
	var ord_no = ff.ord_no.value;
	var cancel_reason = ff.cancel_reason.value;
	var pg_yn = ff.pg_yn.value;
	
	if( ff.cancel_reason.selectedIndex == 0  )
	{
		alert('주문취소 사유를 선택해 주세요.');
		ff.cancel_reason.focus();
		return false;
	}
	if(!confirm("주문 취소를 하시겠습니까?")){
		return false;
	}
	
	// 주문취소 URL 설정
	var exec_url = "/app/mypage/order_cancel_cmd";
	if( pg_yn == "Y" ){	// 카드, 계좌이체 승인취소 처리
		exec_url = "/app/mypage/order_cancel_pg";
	}

	$.ajax({ 
		type: "POST", 
		data: "ord_no=" + ord_no + "&cancel_reason=" + cancel_reason,
		url: exec_url, 
		success: function(msg) {
			if(msg == 1) {
				alert("주문이 정상적으로 취소 되었습니다.");
				opener.location.reload();
				//opener.location = "/app/mypage/order_view?ord_no=" + ord_no;
				self.close();
			}else {
				alert(msg);
				alert("[주문 취소 실패] 관리자에게 문의하시기 바랍니다.");
				opener.location.reload();
				//opener.location = "/app/mypage/order_view?ord_no=" + ord_no;
				self.close();
			}
		}
	});		
}

function checkTime()
{
	// 1. 시간 체크(클라이언트 vs 서버)
	$.ajax({
		type: "POST"
		, async: false
		, url: "/app/svc/get_sever_unix_time"
		, success: function(msg) {
			var server_time = msg;
			var now = new Date();
			var now_unix = now.getTime();
			var client_time = Math.floor(now_unix / 1000);
			if ( Math.abs(server_time - client_time) > 500 ) {
				alert('고객님 컴퓨터의 시간이 정확하지 않습니다.\n시간을 조정하신 후 이용해 주시기 바랍니다.');
			}
		}
	});
}



/* 가방팝 추가 기능 */
function inFocus(i) {
	(i).style.border='1px solid #f60';
}
function outFocus(i) {
	(i).style.border='1px solid #b3b3b3';
}

function onMouse(i) {
	(i).style.border='1px solid #f60';	
}

function outMouse(i){
	(i).style.border='1px solid #fff';	
}
/*
     FILE ARCHIVED ON 17:41:45 Mar 15, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:11:51 Apr 29, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 109.677 (3)
  esindex: 0.01
  captures_list: 125.005
  CDXLines.iter: 10.661 (3)
  PetaboxLoader3.datanode: 63.621 (5)
  exclusion.robots: 0.213
  exclusion.robots.policy: 0.198
  RedisCDXSource: 1.865
  PetaboxLoader3.resolve: 126.095 (3)
  load_resource: 139.976
*/