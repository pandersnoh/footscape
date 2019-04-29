var Suggestions = new function()
{
	this.print_frame		= "top_auto_search_area";
	this.print_keyword		= "suggest_keyword";
	this.print_cats			= "suggest_cats";
	this.print_goods		= "suggest_goods";
	this.print_plan			= "suggest_plan";
	this.index				= -1;
	this.kwd_type			= "";
	this.kwd_value			= "";

	this.Go = function() {
	}

	this.Do = function(q) {

		var self = Suggestions;

		// 스페이스바(13), 엔터(32) 입력 시 실행 방지
		if(event.keyCode == 13 || event.keyCode == 32) return false;
		
		// ESC 
		if(event.keyCode == 27){
			$("#" + self.print_frame).hide();
			//return false;
		}

		if(event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40){ 
			this.Move(event.keyCode);
		} else {

			// 마지막 글자를 판단 후 실행 여부 결정 
			// 칸ㄱ, ㄴ, ㅏ, ㅐ 등 방지
			if(! this.CheckToGo(q)) return false;

			this.index = -1;
			var ret = self.PrintResult(q);
		}

		return false;
	}

	this.Move = function(move) {

		var index = this.index;

		if(move == 37){			// Left
			if(index >= $("#" + this.print_keyword + " > a.search_keyword").length){
				this.index = 0;
			} else {
				return false;
			}
		} else if(move == 39){	// Right
			if(index < $("#" + this.print_keyword + " > a.search_keyword").length){
				this.index = $("#" + this.print_keyword + " > a.search_keyword").length;
			} else {
				return false;
			}
		} else if(move == 38){	// Up
			if(index > 0) {
				this.index--;
			} else {
				this.index = $("a.search_keyword").length;
			}
		} else if(move == 40){	// Down
			this.index++;
			if(this.index >= $("a.search_keyword").length) {
				this.index = 0;
			}
		}

		$("a.search_keyword").eq(index).css('background','#FFFFFF');
		$("a.search_keyword").eq(this.index).css('background','#F3F3F3');
		this.kwd_type = $("a.search_keyword").eq(this.index).attr("kwd_type");
		this.kwd_value = $("a.search_keyword").eq(this.index).attr("kwd_value");

		if(this.kwd_type == "keyword"){
			$("#q").val(this.kwd_value);
		}

		return true;
	}
	
	this.PrintResult = function(q) {

		if(q != "") {
			var self = Suggestions;
			var service_url = '/app/search/suggestions';
			$.ajax({
				type: "GET",
				url: service_url,
				data: "q=" + urlEncode(q),
				success: function(msg){
					var data_kwd = "";
					var data_cats = "";
					var data_goods = "";
					var data_goods_img = "";
					var data_plan = "";

					eval("var json = " + msg);
					this.kwds = json;
						
					// 추천 검색어
					for(var i=0; i<json.kwd.length; i++) {

						kwd = json.kwd[i].kwd;
						kwd_strong = json.kwd[i].kwd_strong;
						kwd_strong_short = json.kwd[i].kwd_strong_short;
						//data_kwd += "<span style=\"background-color:#ffffff\" onMouseover=\"this.style.backgroundColor='#F3F3F3';\" onMouseout=\"this.style.backgroundColor='#ffffff';\" class=\"keyword search_keyword\" kwd_type='keyword' kwd_value='" + kwd + "'><a href=\"/app/product/search?q="+ urlEncode(kwd) +"\">"+ kwd_strong +"</a></span>\n";
						data_kwd += "<a href=\"/app/product/search?q=" + urlEncode(kwd) + "\" class=\"search_keyword\" kwd_type=\"keyword\" kwd_value=\"" + kwd + "\">" + kwd_strong_short + "</a>\n";
						
					}

					if( data_kwd != ""){
						$("#"+ self.print_keyword).html(data_kwd);
					} else {
						$("#"+ self.print_keyword).html(data_kwd);
					}

					// 추천 카테고리
					/*
					for(var i=0; i<json.cats.length; i++) {

						d_cat_cd = json.cats[i].d_cat_cd;
						full_nm_strong = json.cats[i].full_nm_strong;
											
						data_cats += "<span style=\"background-color:#ffffff\" onMouseover=\"this.style.backgroundColor='#F3F3F3';\" onMouseout=\"this.style.backgroundColor='#ffffff';\" class=\"keyword search_keyword\" kwd_type='url' kwd_value='/app/category/lists/" + d_cat_cd + "'><a href=\"/app/category/lists/"+ d_cat_cd +"\">"+ full_nm_strong +"</a></span>\n";
					}
					if( data_cats != ""){
						$("#"+ self.print_cats).html(data_cats);
					} else {
						$("#"+ self.print_cats).html(data_cats);
					}
					*/

					// 상품
					for(var i=0; i<json.goods.length; i++) {

						var good = json.goods[i];
						var img = "http://web.archive.org/web/20150315182335/http://image.footscape.com/images/goods_img/" + good.reg_dm + "/" + good.goods_no + "/" + good.goods_no + "_a_180." + good.img_ext;

						data_goods += "<a href=\"/app/product/detail/" + good.goods_no + "/" + good.goods_sub + "\" class=\"search_keyword\" kwd_type=\"url\" kwd_value=\"/app/product/detail/" + good.goods_no + "/" + good.goods_sub + "\" onmouseenter=\"Suggestions.showImage('" + good.goods_no + "', '" + good.goods_sub + "');\">"  + good.goods_nm_strong_short + "</a>";

						if(i == 0) {
							data_goods_img += "<div class=\"imgBox\" id=\"suggest_goods_img_" + good.goods_no + "_" + good.goods_sub + "\">";
						} else {
							data_goods_img += "<div class=\"imgBox\" id=\"suggest_goods_img_" + good.goods_no + "_" + good.goods_sub + "\" style=\"display: none;\">";
						}
						data_goods_img += "<a href=\"/app/product/detail/" + good.goods_no + "/" + good.goods_sub + "\"><img src=\"" + img + "\" alt=\"\" width=\"186\" height=\"173\"></a></div>";
					}

					data_goods = data_goods + data_goods_img;
					if(data_goods != ""){
						$("#"+ self.print_goods).html(data_goods);
					}

					// 기획전
					for(var i=0; i<json.plan.length; i++) {
						var plan = json.plan[i];
						data_plan += "<a href=\"" + plan.url + "\"><img src=\"" + plan.plan_preview_img + "\" width=\"122\" height=\"115\" alt=\"" + plan.title + "\"></a>";
					}

					if(data_plan != ""){
						$("#"+ self.print_plan).html(data_plan);
					}

					if(data_kwd == "" && data_cats == "" && data_goods == 0 && data_plan == 0){
						$("#" + self.print_frame).hide();
					} else {
						$("#" + self.print_frame).show();
						return true;
					}
				}
			});
		} else {
			$("#"+ this.print_keyword).html("");
			$("#"+ this.print_cats).html("");
			$("#"+ this.print_goods).html("");
			$("#" + this.print_frame).hide();
		}
		return false;
	}

	this.CheckToGo = function(q) {

		var chr = q.substr(q.length -1,1);

		if(q.length > 0){		
			chr = escape(chr);
			if (chr.charAt(1) == "u"){
				// Kor
				chr = chr.substr(2, (chr.length - 1));
				//console.log("chr : " + chr);
				if((chr < "AC00") || (chr > "D7A3")) return false;
			} else {
				// Not Kor
				return true;
			}
		}
		return true;
	}

	this.Close = function() {

		$("#"+ this.print_frame).hide();
	}

	this.showImage = function(goods_no, goods_sub) {
		$("#"+ this.print_goods + " > div").css("display", "none");
		$("#"+ this.print_goods + "_img_" + goods_no + "_" + goods_sub).css("display", "");
	}
}

/*
     FILE ARCHIVED ON 18:23:35 Mar 15, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:11:52 Apr 29, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 176.132 (3)
  esindex: 0.006
  captures_list: 196.555
  CDXLines.iter: 9.952 (3)
  PetaboxLoader3.datanode: 135.333 (5)
  exclusion.robots: 0.162
  exclusion.robots.policy: 0.154
  RedisCDXSource: 7.987
  PetaboxLoader3.resolve: 133.693 (4)
  load_resource: 148.472
*/