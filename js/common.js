$(function () {
	
	// ��� �˻�
	$("#search_q").click(function(){
		
		if($("#q").val() == "") 
		{
			if($("#q").attr("placeholder") == ""){
				alert("�˻�� �Է����ּ���.");
				return false;
			} else {
				$("#q").val($("#q").attr("placeholder"));
			}
		}
		$("#search_form").submit();
	});

	// ��� �� �˻� ���̾� ó��
	$("#search_detail").click(function(){
		//$(".detail_search").show();
	});

	//#gnb
	/*
	$("#gnb li").hover(function(){
			$(this).addClass("active")
		}, function(){
			$(this).removeClass("active")
	});
	//$(".chGnb_ct .brand dd:nth(20),.chGnb_ct .brand dd:nth(21),.chGnb_ct .brand dd:nth(22),.chGnb_ct .brand dd:nth(23),.chGnb_ct .brand dd:nth(24)").css('margin-top','16px');
	//����������
	$("#topLink_right .mypage").toggle(function(){
		$("#mypage").slideDown(100)
			}, function(){
			$("#mypage").slideUp(100)
		});
	$("#mypage").mouseleave(function(){$(this).slideUp(100)});
	//�˻�����
	$(".searchbox .txt").click(function(){$("#topTen").slideDown(100)});
	$("#topTen").mouseleave(function(){$(this).slideUp(100)});
	*/
});


//���̾��˾�
function setVisible(popId) {
	if (popId == 'login_pop'){
		alert('�α��� �� �̿��Ͻ� �� �ֽ��ϴ�');
		var t=document.getElementById('login');
		t.style.display="block";
	} else {
		var t=document.getElementById(popId);
		if (t.style.display != "block") {
			t.style.display="block";
		}
		else
		{
			t.style.display="none";
		}
	}
}

function deletViewCart(str, id) {

	$.ajax({
		type: "POST",
		url: "/app/viewedproduct/svc_delete/" + str,
		success: function(msg){
			var num = document.getElementById('total').innerHTML;
			num -= 1;
			$("#quick_view" + id).remove();
			document.getElementById('total').innerHTML=num;
		}
	});
}

/*
function openNewWindow(window) {

open (window,"NewWindow","left=100, top=100, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, &chkMode=return width=980, height=720");

}
*/

function showDetailSearch(layer_class, show_yn) {

	if(show_yn == "Y") {
		$("." + layer_class).show();
	} else {
		$("." + layer_class).hide();
	}
}

function showSubMenu(menu_id, cat_cd, idx) {
	var menu_obj = $("#" + menu_id + " > ul > li");

	// �޴� ���� ȿ��
	for(var i=0; i<menu_obj.length; i++) {
		menu_obj.eq(i).children().attr("class", "");
	}

	menu_obj.eq(idx).children().attr("class", "on");

	// ���� �޴� Ȱ��ȭ
	var sub_area_obj = $("#" + menu_id + " > div");

	sub_area_obj.hide();	// ��ü ���� ����
	$("#top_menu_category_" + cat_cd).show();		// �ش� ī�װ� ���� ����
	$("#top_menu_brand_" + cat_cd).show();			// �ش� �귣�� ���� ����
	$("#top_menu_brand_search_" + cat_cd).show();	// �ش� �귣��˻� ���� ����
}

function checkLoginForm(ff) {
	var v = new MiyaValidator(ff);
	
	v.add("user_id", {required:true, minbyte:3, maxbyte:20, name:"�����ID"});
	v.add("user_pwd", {required:true, minbyte:4, maxbyte:16, name:"��й�ȣ"});
	
	var result = v.validate();
	if(!result) {
		alert(v.getErrorMessage("{message}"));
		v.getErrorElement().focus();
		return false;
	}
	return true;
}

function checkNoMemberLoginForm(ff) {
	var v = new MiyaValidator(ff);
	
	v.add("order_name",{required:true, name:"�ֹ��ڼ���"});
	v.add("order_no",{required:true, name:"�ֹ���ȣ"});
	
	var result = v.validate();
	if ( !result )
	{
		alert(v.getErrorMessage("{message}"));
		v.getErrorElement().focus();
		return false;
	}
	return true;
}

/*
	Funcion : viewMemberPrice
	ȸ������ ����

	Parameters:
		div_id		- ȸ���� ��� ����
		price		- �ش��ǰ �ǸŰ���

	See Also:
	<getUnixTime>
*/
function viewMemberPrice(obj, div_id, price, left) {

	var obj_offset = $(obj).offset();

	if(left == ""){
		left = 148;
	}

	if($("#" + div_id + " > ul").length == 0) {
		$.ajax({
			type: "GET",
			url: "/app/svc/member_price/" + price + "?" + getUnixTime(),
			success: function(msg){
				$("#" + div_id).offset({top: obj_offset.top + 23, left: obj_offset.left - left});
				$("#" + div_id).html(msg);
			}
		});
	}

	$("#" + div_id).show();

	$('.goods_price').hover(
		function() { },
		function()
		{
			$("#" + div_id).hide();
		}
	);

	$('.member_price').hover(
		function() { },
		function()
		{
			$("#" + div_id).hide();
		}
	);	

	return;
}


/*
	�ɼ� �̸� ���� : ������ ( 2014-08-14 )
*/
function GoodsListOptions(div_id, type, goods_no, goods_sub) {

	var id = "#" + div_id;
	if(type == "on")
	{
		$(id).show();

		if($(id).html().trim() != "") return false;

		$.ajax({
			type: "GET",
			url: "/app/svc/optionList/" + goods_no + "/" + goods_sub + "?" + getUnixTime(),
			success: function(msg){
				$(id).html(msg);
			}
		});
	}
	else
	{
		$(id).hide();
	}
}

function tabMenuA(tab_id, idx)
{
	var tab_obj = $("#" + tab_id + " a");
	
	for(var i=0; i<tab_obj.length; i++) {
		tab_obj.eq(i).attr("class", "");
	}

	tab_obj.eq(idx).attr("class", "on");
}

function GetSection(div_id, sec_code, sec_no, sort) {

	$.ajax({
		type: "GET",
		url: "/app/svc/section/" + sec_code + "/" + sec_no + "?" + getUnixTime(),
		data: "sort=" + sort,
		success: function(msg){
			$("#" + div_id).html(msg);
		}
	});
}

function commonUpdUpCnt(no) 
{
	if(! confirm('��ǰ���� ��õ�Ͻðڽ��ϱ�?')){
		return false;
	}
	$.ajax({
		type: "GET",
		url: "/app/product/estimate_up/"+ no,
		success: function(msg){
			var hits = parseInt($("#up_cnt_"+no).html());
			$("#up_cnt_"+no).html(++hits);
			alert("��ǰ���� ��õ�Ͽ����ϴ�.");
		}
	});
}

function subMenuSearchBrand(brand_list_id, d_cat_cd, item_cat_cd)
{
	var ff = document.top_menu_form;
	var brand_input_obj = $("#" + brand_list_id + " input:checkbox[name='brand[]']");
	var brand_text_obj = $("#" + brand_list_id + " label");

	var brand = "";
	for(var i=0; i<brand_input_obj.length; i++) {
		if(brand_input_obj[i].checked) {
			brand += (brand == "") ? brand_input_obj[i].value : "\t" + brand_input_obj[i].value;
		}
	}

	if(brand == "") {
		alert("�˻��� �귣�带 ������ �ּ���.");
		return false;
	}

	ff.d_cat_cd.value = d_cat_cd;
	ff.item_cat_cd.value = item_cat_cd;

	ff.submit();
}

function setSubMenuSearchBrand(brand_list_id, obj, idx)
{
	var brand_text_obj = $("#" + brand_list_id + " label");

	if(obj.checked) {
		/*brand_text_obj.eq(idx).css("font-weight", "Bold");*/
		brand_text_obj.eq(idx).css("color", "#f66a1e");
	} else {
		brand_text_obj.eq(idx).css("font-weight", "");
		brand_text_obj.eq(idx).css("color", "#909191");
	}
}

function subMenuSearchBrandInit(brand_list_id)
{
	var brand_input_obj = $("#" + brand_list_id + " input:checkbox[name='brand[]']");
	var brand_text_obj = $("#" + brand_list_id + " label");

	brand_input_obj.attr("checked", false);
	brand_text_obj.css("font-weight", "");
	brand_text_obj.css("color", "#909191");
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

function popup_coupon(coupon_no) {
	var coupon_no= coupon_no;
	openWindow("/app/contents/coupon_products?coupon_no=" + coupon_no, 'coupon', 'resizable=yes,scrollbars=yes', 905, 735, true);
	//close();
}

var currentPosition = parseInt($(".fixed").css("top"));    
	$(window).scroll(function() {     
		var position = $(window).scrollTop();   
			if(position>300){            
			if($.browser.msie && $.browser.version < 7){                
				$(".fixed").stop().animate({"top":position+currentPosition-200+"px"},1000);            
				}else{                
					$(".fixed").css({'position':'fixed', 'top':'50px'});            
					}        
					}else{            
						$('.fixed').attr('style','');        
					}    
				});

/*
     FILE ARCHIVED ON 16:53:07 Mar 15, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:11:52 Apr 29, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 120.542 (3)
  esindex: 0.012
  captures_list: 142.393
  CDXLines.iter: 12.823 (3)
  PetaboxLoader3.datanode: 151.786 (4)
  exclusion.robots: 0.288
  exclusion.robots.policy: 0.269
  RedisCDXSource: 4.739
  PetaboxLoader3.resolve: 25.484
  load_resource: 74.944
*/