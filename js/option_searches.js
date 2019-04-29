function option_search(goods_opt,d_cat_cd)
{
	select_option(goods_opt);

	var service_url = "/app/category/options";
	var print_lists = "shoes_list_wrap";
	var print_area = "shoes_size_list";

	if(! d_cat_cd) d_cat_cd = "";
	var params = "goods_opt=" + urlEncode(goods_opt) + "&d_cat_cd="+ urlEncode(d_cat_cd);
	
	if( $("#"+ print_lists).show()){
		$("#"+ print_lists).hide();
	}

	$.ajax({
		type: "GET",
		url: service_url,
		data: params,
		success: function(msg){
			
			eval("var json = " + msg);
			
			var data_lists = "";
			
			for ( var i = 0 ; i < json.length ; i++ ) 
			{
				p_d_cat_cd = json[i].p_d_cat_cd;
				d_cat_cd = json[i].d_cat_cd;
				d_cat_nm = json[i].d_cat_nm;
				goods_cnt = json[i].goods_cnt;
				
				if(p_d_cat_cd == ""){
					data_lists += (data_lists == "") ?  "<dl>\n":"</dl>\n<dl>\n";
					data_lists += "<dt>"+ d_cat_nm +"<span>("+goods_cnt+")</span></dt>\n";
				} else {
					data_lists += "<dd><a href=\"/app/category/lists/"+d_cat_cd+"?opt="+ urlEncode(goods_opt) +"\">"+d_cat_nm+"</a> <span>("+ goods_cnt +")</span></dd>\n";
				}
			}
			
			if( data_lists != "")
			{
				data_lists += "</dl>\n";
				/* data_lists += "<p class=\"close\"><a href=\"#\" onclick=\"option_search_close();return false;\"><img src=\"/front/footscape/skin/img/common/pop_close.png\" alt=\"닫기\" /></a></p>"; */
				$("#"+ print_area).html(data_lists);
				$("#"+ print_lists).show();
			} else {
				data_lists += "<dl>\n";
				data_lists += "<dt>선택하신 '"+ goods_opt +"' 옵션 상품이 준비되지 않았습니다.</dt>\n";
				data_lists += "</dl>\n";
				/* data_lists += "<p class=\"close\"><a href=\"#\" onclick=\"option_search_close();return false;\"><img src=\"/front/footscape/skin/img/common/pop_close.png\" alt=\"닫기\" /></a></p>"; */
				$("#"+ print_area).html(data_lists);
				$("#"+ print_lists).show();
			}
		}
	});
}
old_goods_opt = "";
function select_option(goods_opt){
	
	$("#shoes_size_"+ old_goods_opt).removeClass("on");
	$("#shoes_size_"+ goods_opt).addClass("on");
	old_goods_opt = goods_opt;
}

function option_search_close(){
	var print_lists = "shoes_list_wrap";
	$("#shoes_size_"+ old_goods_opt).removeClass("on");
	$("#"+ print_lists).hide();
}
/*
     FILE ARCHIVED ON 18:38:20 Mar 15, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:11:59 Apr 29, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 52.851 (3)
  esindex: 0.015
  captures_list: 89.006
  CDXLines.iter: 16.91 (3)
  PetaboxLoader3.datanode: 68.274 (5)
  exclusion.robots: 0.181
  exclusion.robots.policy: 0.171
  RedisCDXSource: 13.918
  PetaboxLoader3.resolve: 43.686 (2)
  load_resource: 71.932
*/