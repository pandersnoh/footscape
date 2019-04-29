var Suggestions = new function()
{
	this.print_frame	= "word_layer";
	this.print_keyword	= "suggest_keyword";
	this.print_goods	= "suggest_goods";
	this.print_cats		= "suggest_cats";
	this.print_preview	= "search_preview";
	this.preview_msg	= "<p><strong>추천상품 미리보기</strong><br />(추천상품에 마우스를 올리시면<br />해당 상품의 이미지를<br />보실 수 있습니다.)<br /></p>";
	
	this.Do = function(q)
	{
		var self = Suggestions;

		// 스페이스바(13), 엔터(32) 입력 시 실행 방지
		if(event.keyCode == 13 || event.keyCode == 32) return false;

		// 마지막 글자를 판단 후 실행 여부 결정 
		// 칸ㄱ, ㄴ, ㅏ, ㅐ 등 방지
		if(! this.CheckToGo(q)) return false;
	
		self.PrintResult(q);

		return false;
	}
	
	this.PrintResult = function(q)
	{
		if( q != "" ){

			var self = Suggestions;
			var service_url = '/app/search/suggestions';
			$.ajax({
				type: "GET",
				url: service_url,
				data: "q=" + urlEncode(q),
				success: function(msg){

					var data_kwd = "";
					var data_goods = "";
					var data_cats = "";

					eval("var json = " + msg);
					z
					// 추천 검색어
					for ( var i = 0 ; i < json.kwd.length ; i++ ) 
					{
						kwd = json.kwd[i].kwd;
						kwd_strong = json.kwd[i].kwd_strong;
											
						data_kwd += "<span style=\"background-color:#ffffff\" onMouseover=\"this.style.backgroundColor='#F3F3F3';\" onMouseout=\"this.style.backgroundColor='#ffffff';\"><a href=\"/app/product/search?q="+ urlEncode(kwd) +"\">"+ kwd_strong +"</a></span>\n";
					}
					if( data_kwd != ""){
						$("#"+ self.print_keyword).html(data_kwd);
					}

					// 추천 상품
					for ( var i = 0 ; i < json.goods.length ; i++ ) 
					{
						goods_no = json.goods[i].goods_no;
						goods_sub = json.goods[i].goods_sub;
						goods_nm_strong = json.goods[i].goods_nm_strong;
											
						data_goods += "<span style=\"background-color:#ffffff\" onMouseover=\"this.style.backgroundColor='#F3F3F3';\" onMouseout=\"this.style.backgroundColor='#ffffff';\"><a href=\"/app/product/detail/"+ goods_no+"/"+goods_sub +"\" onmouseover=\"Suggestions.Preview('"+goods_no+"','"+goods_sub+"');\">"+ goods_nm_strong +"</a></span>\n";
					}
					if( data_goods != ""){
						$("#"+ self.print_goods).html(data_goods);
					}

					
					// 추천 카테고리
					for ( var i = 0 ; i < json.cats.length ; i++ ) 
					{
						d_cat_cd = json.cats[i].d_cat_cd;
						full_nm_strong = json.cats[i].full_nm_strong;
											
						data_cats += "<span style=\"background-color:#ffffff\" onMouseover=\"this.style.backgroundColor='#F3F3F3';\" onMouseout=\"this.style.backgroundColor='#ffffff';\"><a href=\"/app/category/lists/"+ d_cat_cd +"\">"+ full_nm_strong +"</a></span>\n";
					}
					if( data_cats != ""){
						$("#"+ self.print_cats).html(data_cats);
					}

					if(data_kwd == "" && data_goods == "" && data_cats == ""){
						//$('div.word_layer').hide();
					} else {
						$('div.word_layer').show();
					}

				}
			});
		} else {
			$("#"+ this.print_keyword).html("");
			$("#"+ this.print_goods).html("");
			$("#"+ this.print_cats).html("");
			$("#"+ this.print_preview).html(this.preview_msg);
			$('div.word_layer').hide();
		}
		return false;
	}

	this.Preview = function(goods_no, goods_sub)
	{
		var service_url = '/app/search/preview/'+ goods_no +"/" + goods_sub;
		$.ajax({
			type: "GET",
			url: service_url,
			success: function(msg){
				var image_url = "";

				eval("var json = " + msg);
				
				img = json[0].img;
				$("#search_preview").html("<img src=\""+ img +"\">");
			}
		});
		return false;
	}

	this.CheckToGo = function(q)
	{
		for(var i = 0; i < q.length; i++)
		{
			var chr = q.substr(i,1);
			chr = escape(chr);
			if (chr.charAt(1) == "u")
			{
				// Kor
				chr = chr.substr(2, (chr.length - 1));
				if((chr < "AC00") || (chr > "D7A3"))
					return false;
			}
			else
			{
				// Not Kor
				return true;
			}
		}
		return true;
	}

	this.Close = function()
	{
		$('div.'+ this.print_frame).hide();
	}
}
/*
     FILE ARCHIVED ON 17:27:21 Mar 15, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:11:52 Apr 29, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 238.234 (3)
  esindex: 0.009
  captures_list: 300.809
  CDXLines.iter: 15.205 (3)
  PetaboxLoader3.datanode: 213.006 (5)
  exclusion.robots: 0.241
  exclusion.robots.policy: 0.229
  RedisCDXSource: 43.603
  PetaboxLoader3.resolve: 329.31 (3)
  load_resource: 394.678
*/