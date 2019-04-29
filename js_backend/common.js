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
	���ã�� �߰� �Լ�
	
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
	���̾� �ڽ� ���
	
	Parameters:
		obj		- ��ü
		id		- ����� layer id��
		top 	- layer top ��ġ
		left	- layer left ��ġ
		
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
	���̾� �ڽ� �ݱ�
	
	Parameters:
		id		- ���� layer id��

	See Also:
		<layerHidden>
*/
function layerHidden(id) {
	
	$("#" + id).hide();
}

/*
	Funcion : layerRemove
	���̾� �ڽ� ����
	
	Parameters:
		id		- ������ layer id��

	See Also:
		<layerHidden>
*/
function layerRemove(id) {
	
	$("#" + id).remove();
}

/*
	Funcion : mouseOver
	mouseover �� ��ȯ�� �̹��� ����
	
	Parameters:
		obj	- �̹��� ��ȯ�� ��ü
		
	See Also:
		<mouseOut>, <reverseSrc>
*/
function mouseOver(obj) {
	
	obj.src = reverseSrc(obj.src, true);
	return obj.src;
}

/*
	Funcion : mouseOut
	mouseout �� ��ȯ�� �̹��� ����
	
	Parameters:
		obj	- �̹��� ��ȯ�� ��ü
		
	See Also:
		<layerHidden>, <reverseSrc>
*/
function mouseOut(obj) {
	
	obj.src = reverseSrc(obj.src, false);
	return obj.src;
}

/*
	Funcion : reverseSrc
	�̹��� ��ȯ
	
	Parameters:
		src		- ��ȯ ��ų �̹��� �ҽ�
		flag	- ��ȯ ����
		
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
	���콺 ���� �� ī�װ� ���
	
	Parameters:
		oMenu	- ī�װ� ��ü
		category_id - ����� ī�װ� ���̾��� id
		
	See Also:
		
*/
function onMouseOverCategory(oMenu, category_id) {
	
	var osub = document.getElementById(category_id);	
	
//	osub.innerHTML = "";	
	osub.style.display = "block";
}

/*
	Funcion : onMouseOutCategory
	ī�װ� ����
	
	Parameters:
		category_id - ���� ī�װ� ���̾��� id
		
	See Also:
		
*/
function onMouseOutCategory(category_id) {
	document.getElementById(category_id).style.display = "none";
}

/*
	Funcion : onMouseOverCategory
	���콺 ���� �� ���� ī�װ� ���
	
	Parameters:
		oMenu		- ī�װ� ��ü
		category_id - ����� ī�װ� ���̾��� id
		oTable 		- ���� ī�װ��� �ִ� ����
		top 		- ���� ī�װ��� top 
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
	��ü����
	
	Parameters:
		classid - �߰������� ��Ÿ�� ���̾� �ڽ� class�� 
		
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
	��ǰ ����Ʈ ���� �Լ�
	
	Parameters:
		sort		- ������ ����
		
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
	������ �����ϴ� �Լ�
	
	Parameters:
		s	- ������ ������ ����
		val - ���� ��
		
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
	��ǰ ����Ʈ ��ȯ �Լ�
	
	Parameters:
		d_cat_cd		- ���� ī�װ� �ڵ�
		list_kind		- ����Ʈ ����
		pint_area		- ����Ʈ ��� ����
		sort			- ����Ʈ ���� ����
		display_cnt		- ����Ʈ ��ǰ ��� ��
		brand			- �귣��
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
	��ǰ ����Ʈ ������ ��ȯ �Լ�
	
	Parameters:
		d_cat_cd		- ���� ī�װ� �ڵ�		
		pint_area		- ����Ʈ ��� ����
		sort			- ����Ʈ ���� ����
		display_cnt		- ����Ʈ ��ǰ ��� ��
		brand			- �귣��
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
	�̹��� ��ȯ(�̹��� ���ϸ� ���� _ov ����)
	
	Parameters:
		src		- ��ȯ ��ų �̹��� �ҽ�
		
	See Also:
		<mouseOverImage>, <imageView>
*/
function mouseOverImage(src) {
	
	return src.replace(/_off\.gif/, '_on.gif');
}

/*
	Funcion : mouseOutImage
	�̹��� ��ȯ(�̹��� ���ϸ� ���� _on ����)
	
	Parameters:
		src		- ��ȯ ��ų �̹��� �ҽ�
		
	See Also:
		<mouseOverImage>, <imageView>
*/
function mouseOutImage(src) {
	
	return src.replace(/_on\.gif/, '_off.gif');
}

/*
	Funcion : mouseOverImageOV
	�̹��� ��ȯ(�̹��� ���ϸ� ���� _ov ����)
	
	Parameters:
		src		- ��ȯ ��ų �̹��� �ҽ�
		
	See Also:
		<mouseOverImage>, <imageView>
*/
function mouseOverImageOv(src) {
	
	return src.replace(/\.gif/, '_ov.gif');
}

/*
	Funcion : mouseOutImage
	�̹��� ��ȯ(�̹��� ���ϸ� ���� _ov ����)
	
	Parameters:
		src		- ��ȯ ��ų �̹��� �ҽ�
		
	See Also:
		<mouseOverImage>, <imageView>
*/
function mouseOutImageOv(src) {
	
	return src.replace(/_ov\.gif/, '.gif');
}

/*
	Funcion : viewSize
	������ ����
	
	Parameters:
		obj			- �ش��ǰ ��ü
		goods_no	- �ش��ǰ ��ȣ
		goods_sub	- �ش��ǰ ������ȣ
		
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
	���� �ð� ������ ���
	
	Parameters:
				
	See Also:			
*/
function getUnixTime() {
	
	var d = new Date();
	return d.getTime();
}

/*
	Funcion : loginChk
	�α��� ���� Ȯ��
	
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
	scroll ��ġ �̵�(��, �Ʒ�)
	
	Parameters:
		gap - �̵� �ȼ� ( + : ��, - : �Ʒ� )
				
	See Also:			
*/
function gdscroll(gap)
{
	var gdscroll = document.getElementById('gdscroll');
	gdscroll.scrollTop += gap;
}

/*
	Funcion : couponDown
	���� �ٿ�
	
	Parameters:
		url 		- ���� url
		goods_no 	- ��ǰ��ȣ 
		goods_sub	- ��ǰ ������ȣ
				
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
	������� ���̾� ���
	
	Parameters:
		obj 	- �ش簴ü
		div_id	- ������� ���̾� �ڽ� id��
		
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
	������ �Һ� �ȳ� ���̾� �ڽ� ��� 
	
	Parameters:
		obj 	- �ش簴ü
		div_id	- ������� ���̾� �ڽ� id��
		
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
	�α��� �˾� â ���� �Լ�
	
	Parameters:
		
	See Also:		
*/
function login_popup() {
	
	openWindow('/app/member/login_pop', 'login_pop', 'resizable=no,scrollbars=no', 350, 280, true);	
}

/*
	Funcion : openerLocation
	�θ�â  Location �Լ�
	
	Parameters:
		url - �̵����
	See Also:		
*/

function openerLocation(url) {
	
	opener.document.location.href = url;
	self.close();
}

/*
	Funcion : viewContent
	�� ���� �� �亯 ����
	
	Parameters:
		id1 - �� ���� id 
		id2 - �亯 ���� id
		id3 - ���� ���� id
		
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
	���ڸ� �Է� ����
	
	Parameters:		
		
	See Also:		
*/
function onlynumber() {
	
	if ( window.event == null ) return;

	var e = event.keyCode;

	if (e>=48 && e<=57) return;
	if (e>=96 && e<=105) return;
	if ( e==8 || e==9 || e==13 || e==37 || e==39) return; // tab, back, ��,��
	event.returnValue = false;
}

/*
	Funcion : checkQty
	���ż��� üũ
	
	Parameters:		
		loc - ���ż��� �Է���

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
	�����ȣ �˻� �˾� â ����
	
	Parameters:
		control_name1 - �����ȣ
		control_name2 - ��, ��
		control_name3 - ��, ��
		control_name4 - ��
		
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
	�̸��� �޺κ� ó�� �Լ�
	
	Parameters:
		email_tail	- �׸� �ִ� �̸��� �޺κ�
		email_etc	- �̸��� �޺κ� ���� �Է�		
		
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
	����Ʈ ������ �Լ�
	
	Parameters:
		cat_cd	- ī�װ� �ڵ�
		kind	- ������ ����		
		
	See Also:
*/
function more_list(cat_cd, kind)
{
	// �⺻��� ����,,, ���� ����Ʈ �۾�
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

// ȭ�鿡�� �˾� �Ǵ� ���̾��� ������ ������ ��ġ�� ��ȯ
function getWidthPosition(w){
	var x = ((document.documentElement.clientWidth - w) / 2) + document.documentElement.scrollLeft;   
	return x;
}

// ȭ�鿡�� �˾� �Ǵ� ���̾��� ������ ������ ��ġ�� ��ȯ
function getHeightPosition(h){
    var y = ((document.documentElement.clientHeight - h) / 2) + document.documentElement.scrollTop;
	return y;
}

function LoginCheckUrl(url) {
	if ( !loginChk() ) {
		if ( confirm("ȸ�������Դϴ�.\n\n�α��� �Ͻðڽ��ϱ�?") ) {
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
		alert("ī�װ��� ������ �ּ���.");
		return false;
	}
}

// �޴� �÷��ÿ� ���� �Լ�
function BtnClickChkEvent(mode){
	
	//���� ���
	if(mode == "open"){
		document.getElementById('flashArea').style.position = "";
	} else {
		document.getElementById('flashArea').style.position = "relative";
	}
}

//�ֹ� ��� �˾�
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
		alert('�ֹ���� ������ ������ �ּ���.');
		ff.cancel_reason.focus();
		return false;
	}
	if(!confirm("�ֹ� ��Ҹ� �Ͻðڽ��ϱ�?")){
		return false;
	}
	
	// �ֹ���� URL ����
	var exec_url = "/app/mypage/order_cancel_cmd";
	if( pg_yn == "Y" ){	// ī��, ������ü ������� ó��
		exec_url = "/app/mypage/order_cancel_pg";
	}

	$.ajax({ 
		type: "POST", 
		data: "ord_no=" + ord_no + "&cancel_reason=" + cancel_reason,
		url: exec_url, 
		success: function(msg) {
			if(msg == 1) {
				alert("�ֹ��� ���������� ��� �Ǿ����ϴ�.");
				opener.location.reload();
				//opener.location = "/app/mypage/order_view?ord_no=" + ord_no;
				self.close();
			}else {
				alert(msg);
				alert("[�ֹ� ��� ����] �����ڿ��� �����Ͻñ� �ٶ��ϴ�.");
				opener.location.reload();
				//opener.location = "/app/mypage/order_view?ord_no=" + ord_no;
				self.close();
			}
		}
	});		
}

function checkTime()
{
	// 1. �ð� üũ(Ŭ���̾�Ʈ vs ����)
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
				alert('���� ��ǻ���� �ð��� ��Ȯ���� �ʽ��ϴ�.\n�ð��� �����Ͻ� �� �̿��� �ֽñ� �ٶ��ϴ�.');
			}
		}
	});
}



/* ������ �߰� ��� */
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