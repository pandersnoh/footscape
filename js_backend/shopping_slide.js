var shoppingSlide = new function()
{
	this.frameID 		= 'mini_cart';
	this.url_cart 		= '/app/order/slide_cart';
	this.url_today		= '/app/order/slide_today';
	this.url_wish		= '/app/order/slide_wish';
	this.view_cart_status = false;
	this.button_cart 	= null;
	this.button_today 	= null;
	this.button_wish 	= null;
	this.active_section	= null;
	
	this.init = function()
	{
		var self = shoppingSlide;
		
		self.button_cart 	= "#" + self.frameID + " a[class='nav_cart']:eq(0)";
		self.button_today 	= "#" + self.frameID + " a[class='nav_view']:eq(0)";
		self.button_wish 	= "#" + self.frameID + " a[class='nav_wish']:eq(0)";
	}
	
	this.processService = function(section_id, service_url)
	{
		var self = shoppingSlide;
		//if ( self.active_section != section_id)
		//{	
			var ko = new Date();
			var ji = ko.getTime();	
			$.ajax({
				type: "GET",
				async: false,
				url: service_url + "?s=" + ji,
				success: function(msg){
					$("#" + self.frameID).html(msg);
				}
			});			
			//self.openFrame();
			self.active_section = section_id;
		//}
	}
	
	this.viewCart = function()
	{	
		var self = shoppingSlide;
		self.processService("cart", self.url_cart);
	}
	
	this.closeFrame = function()
	{
		var self = shoppingSlide;
		$("#" + self.frameID + " > #slide_cart_content").remove();
		$.ajax({
			type: "GET",
			async: false,
			url: '/common/common/stickyShoppingUtility',
			success: function(msg){
				$("#" + self.frameID).html(msg);
			}
		});	
	}
	
	this.deleteCart = function(str)
	{
		var self = shoppingSlide;
		$.ajax({
			url: "/app/svc/delete_cart/" + str,
			success: function(msg){
				shoppingSlide.viewCart(false);	
			}
		});
	}
	
	this.deleteAll = function()
	{
		var self = shoppingSlide;
		
		var cart_goods = $("input[name='no'][type='hidden']");
		

		var goods = new Array();
		for ( var i = 0 ; i < cart_goods.length ; i++ )
		{
			var info = $(cart_goods[i]).attr("value");
			goods.push(info);
		}
		var tmp_str = goods.join('.');
		if ( tmp_str != "" )
		{
			self.deleteCart(tmp_str);	
		}
	}	
}

$(document).ready(function() { 
	shoppingSlide.init(); 
});
/*
     FILE ARCHIVED ON 17:21:12 Mar 15, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:11:51 Apr 29, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 65.176 (3)
  esindex: 0.01
  captures_list: 83.225
  CDXLines.iter: 12.995 (3)
  PetaboxLoader3.datanode: 72.137 (5)
  exclusion.robots: 0.214
  exclusion.robots.policy: 0.2
  RedisCDXSource: 1.701
  PetaboxLoader3.resolve: 70.187 (3)
  load_resource: 102.313
*/