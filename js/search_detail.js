// 상세 검색 메뉴 선택
function showDetailSearchMenu(d_cat_cd) {
	// 탭 변경
	$("#detail_search_menu > li").removeClass("on");
	$("#detail_search_menu_" + d_cat_cd).addClass("on");

	// 전시카테고리값 변경
	$("#detail_search_d_cat_cd").val(d_cat_cd);

	// 브랜드영역
	$("#detail_search_brand > div").hide();
	$("#detail_search_brand_" + d_cat_cd).show();

	// 사이즈 영역
	if(d_cat_cd == "001") {
		$("#detail_search_size").show();
	} else {
		$("#detail_search_size").hide();
	}

	// 용도카테고리 영역
	$("dl.detail_search_i_cat").hide();
	$("#detail_search_i_cat_" + d_cat_cd).show();
}

//옵션에 겁색조건 추가
function setSearch(type,name,value) {
	var search_item = "";
	var ff = document.detail_search_form;
	var id = type + "_" + value;
	

	if(type == "search_brand") {
		search_item = "<dl class=" + type + " id=\"" + id + "\"><dt><a href='#' onClick=\"deleteSearch('" + id + "','" + type + "'); return false;\">b</a></dt><dd><a href='#' onClick=\"deleteSearch('" + id + "','" + type + "'); return false;\">" + name + "</a></dd><input type=\"hidden\" name=\"brand[]\" value=\"" + value + "\"></dl>";
	}

	if(type == "search_size") {
		search_item = "<dl class=" + type + " id=\"" + id + "\"><dt><a href='#' onClick=\"deleteSearch('" + id + "','" + type + "'); return false;\">s</a></dt><dd><a href='#' onClick=\"deleteSearch('" + id + "','" + type + "'); return false;\">" + name + "</a></dd><input type=\"hidden\" name=\"size[]\" value=\"" + value + "\"></dl>";
	}

	if(type == "search_price") {

		var price1 = ff.price_fr.value;
		var price2 = ff.price_to.value;
		if(price1 == "" || price2 == "") {
			alert("판매가를 입력해 주십시오.");
			return false;
		}

		search_item = "<dl class=" + type + " id=\"search_price_" + value + "\"><dt><a href='#' onClick=\"deleteSearch('search_price_" + value + "'); return false;\">k</a></dt><dd><a href='#' onClick=\"deleteSearch('search_price_" + value + "'); return false;\">" + price1 + " ~ " + price2 + "</a></dd></dl>";

		ff.price1.value = price1;
		ff.price2.value = price2;
	}

	if(type == "search_gender") {
		var checked = $("input:checkbox[name='" + id + "']").is(":checked");
		if(checked) {
			search_item = "<dl class=" + type + " id=\"" + id + "\"><dt><a href='#' onClick=\"deleteSearch('" + id + "','" + type + "'); return false;\">g</a></dt><dd><a href='#' onClick=\"deleteSearch('" + id + "','" + type + "'); return false;\">" + name + "</a></dd><input type=\"hidden\" name=\"sex[]\" value=\"" + value + "\"></dl>";
		} else {
			deleteSearch(id, type);
		}
	}

	if(type == "search_color") {
		search_item = "<dl class=" + type + " id=\"" + id + "\"><dt><a href='#' onClick=\"deleteSearch('" + id + "','" + type + "'); return false;\">c</a></dt><dd><a href='#' onClick=\"deleteSearch('" + id + "','" + type + "'); return false;\">" + name + "</a></dd><input type=\"hidden\" name=\"color[]\" value=\"" + value + "\"></dl>";
	}

	if(type == "search_item") {
		var checked = $("input:checkbox[name='" + id + "']").is(":checked");
		if(checked) {
			search_item = "<dl class=" + type + " id=\"" + id + "\"><dt><a href='#' onClick=\"deleteSearch('" + id + "','" + type + "'); return false;\">f</a></dt><dd><a href='#' onClick=\"deleteSearch('" + id + "','" + type + "'); return false;\">" + name + "</a></dd><input type=\"hidden\" name=\"item_cat_cd[]\" value=\"" + value + "\"></dl>";
		} else {
			deleteSearch(id, type);
		}
	}

	if(type == "search_keyword") {
		var keyword = ff.keyword.value;

		var keyword_values = $("input[name='" + type + "'][type='hidden']");
		var num = keyword_values.length;

		search_item = "<dl class=" + type + " id=\"search_keyword_" + num + "\"><dt><a href='#' onClick=\"deleteSearch('search_keyword_" + num + "','" + type + "'); return false;\">k</a></dt><dd><a href='#' onClick=\"deleteSearch('search_keyword_" + num + "','" + type + "'); return false;\">" + keyword + "</a></dd><input type=\"hidden\" name=\"" + type + "\" value=\"" + keyword + "\"></dl>";
	}

	if($('#search_values #' + type + '_' + value).length > 0) {
		alert("추가된 검색조건 입니다.");
		return false;
	}

	document.getElementById('search_values').innerHTML += search_item;

	setSearchValue(type);
}

function setSearchValue(type) {
	var search_values = $("input[name='"+type+"'][type='hidden']");

	var value = "";
	for(var i=0; i<search_values.length; i++) {
		if(i == 0) {
			value = $(search_values[i]).attr("value");
		} else {
			value += " " + $(search_values[i]).attr("value");
		}
	}

	var ff = document.detail_search_form;

	if(type == "search_keyword") {
		ff.q.value = "";
		ff.q.value = value;
	}
}

function resetSearch() {
	document.detail_search_form.reset();
	$('.search_brand').remove();
	$('.search_size').remove();
	$('.search_color').remove();
	$('.search_price').remove();
	$('.search_gender').remove();
	$('.search_item').remove();
	$('.search_keyword').remove();
}

function deleteSearch(id,type) {

	$('#'+id).remove();
	
	//옵션 삭제 시 checkbox 검색조건에 대하여 unchecked
	if(type == "search_gender" ||type == "search_item") {
		$("input:checkbox[name='" + id + "']").attr("checked", false);
	}

	setSearchValue(type);
}

function sendSearch() {

	var ff = document.detail_search_form;

	if($("#search_values").html() == "") {
		alert("검색 조건을 최소한 1개 이상 선택해 주세요.");
		return false;
	}

	/*
	if(ff.q.value == "") {
		alert("검색어를 입력해 주세요.");
		ff.keyword.focus();
		return false;
	}
	*/

	ff.submit();
}


var best_kwd_idx = 0;
var best_kwd_timer = null;
function bestKeywordRoll()
{
	var kwd_obj = $("#roll_keyword_inner > li");

	var kwd = kwd_obj.eq(best_kwd_idx).html();
	$("#q").val(kwd);

	if(best_kwd_idx >= kwd_obj.length-1){
		best_kwd_idx = 0;
	} else {
		best_kwd_idx++;
	}
	
}

$(window).load(function() {
	best_kwd_timer = setInterval(bestKeywordRoll, 2500);

	$("#q").bind({
		'focus': function(){
			clearInterval(best_kwd_timer);
			$("#q").val('');
		},
		'blur': function(){
			best_kwd_timer = setInterval(bestKeywordRoll, 2500);
		}
	});

	// 상단 상세검색 가격 슬라이드
	$("#top-slider-range").slider({
		range: true,
		min: 0,
		max: 1000000,
		values: [ 0, 0],
		slide: function( event, ui ) {
			$("#top_price_fr").val(ui.values[0]);
			$("#top_price_to").val(ui.values[1]);
		}
	});
});