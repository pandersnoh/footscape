var PopularSearches = new function()
{
	this.print_area	= "hotkeyword";
	this.roll_print_area	= "roll_hotkeyword";

	this.Init = function()
	{
		var self = PopularSearches;
		self.PrintResult();
		self.roll();
		return false;
	}

	this.PrintResult = function()
	{
		var self = PopularSearches;
		var service_url = '/app/search/popular_searches';
		$.ajax({
			type: "GET",
			url: service_url,
			success: function(msg){
				var data = "";
				var roll_data = "";
				eval("var json = " + msg);

				for ( var i = 0 ; i < json.length ; i++ )
				{
					kwd = json[i].kwd;
					kwd_all = json[i].kwd_all;
					rank = json[i].rank
					rank_inc = json[i].rank_inc;
					rank_img = "";

					if(rank_inc > 0) {
						rank_img = "blt_up";
					} else if(rank_inc < 0) {
						rank_img = "blt_down";
					} else {
						rank_img = "blt_same";
					}

					data += "<li><dl><dt><img src=\"/front/footscape_v2/skin/img/common/header/0" + (i+1) + ".jpg\" alt=\"\"> </dt><dd class=\"title\"><a href=\"/app/product/search?q=" + urlEncode(kwd_all) + "\">" + kwd + "</a></dd>" +
							"<dd class=\"count\"><img src=\"/front/footscape_v2/skin/images/" + rank_img + ".png\" alt=\"\"></dd></dl></li>";

					roll_data += "<li><a href=\"/app/product/search?q=" + urlEncode(kwd_all) + "\" onmouseenter=\"$('#top_best_search').show();\">" + "<img src=\"/front/footscape_v2/skin/img/common/header/0" + (i+1) + ".jpg\" alt=\"\">"  + kwd + "<span class=\"count_img\"><img src=\"/front/footscape_v2/skin/images/" + rank_img + ".png\" alt=\"\"></span></a></li>";
				}
				$("#"+ self.print_area).html(data);
				$("#"+ self.roll_print_area).html(roll_data);
			}
		});
		return false;
	}

	this.roll = function()
	{
		var self = PopularSearches;
		var $element = $('#' + self.roll_print_area);
		var autoPlay = true;
		var auto = null;
		var speed = 2000;
		var timer = null;

		var move = $element.children().outerHeight();
		var first = false;
		var lastChild;

		lastChild = $element.children().eq(-1).clone(true);
		lastChild.prependTo($element);
		$element.children().eq(-1).remove();

		if($element.children().length==1){
			$element.css('top','0px');
		}else{
			$element.css('top','-' + move + 'px');
		}

		if(autoPlay){
			timer = setInterval(moveNextSlide, speed);
			auto = true;
		}else{
		}

		$element.find('>li').bind({
			'mouseenter': function(){
				if(auto){
					clearInterval(timer);
				}
			},
			'mouseleave': function(){
				if(auto){
					timer = setInterval(moveNextSlide, speed);
				}
			}
		});

		function moveNextSlide(){
			$element.each(function(idx){

				var firstChild = $element.children().filter(':first-child').clone(true);
				firstChild.appendTo($element.eq(idx));
				$element.children().filter(':first-child').remove();
				$element.css('top','0px');

				$element.eq(idx).animate({'top':'-' + move + 'px'},'slow');
			});
		}
	}
}
/*
     FILE ARCHIVED ON 17:53:00 Mar 15, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:11:59 Apr 29, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 33.725 (3)
  esindex: 0.009
  captures_list: 49.634
  CDXLines.iter: 11.142 (3)
  PetaboxLoader3.datanode: 43.791 (4)
  exclusion.robots: 0.215
  exclusion.robots.policy: 0.202
  RedisCDXSource: 1.578
  PetaboxLoader3.resolve: 27.189
  load_resource: 61.263
*/