var miniCart = new function()
{
	this.id	 			= 'mini_cart';
	this.service_url	= '/app/svc/mini_cart/';
	this.offset			= null;
	this.width			= 174;
	
	this.chkJaego = function(goods_no, goods_sub, opt, goods_cnt)
	{
		var self = miniCart;
		var result = 0;
		$.ajax({
			type: "POST",
			async: false,
			url: "/app/svc/jaego_chk/" + goods_no + "/" + goods_sub,
			data: "goods_opt=" + urlEncode(opt) + "&goods_cnt=" + goods_cnt,
			success: function(msg) {	
				eval("var response = " + msg);
				result = response.result;
			}
		});		
		return result;
	}
	
	this.deleteCart = function(str)
	{
		var self = miniCart;
		$.ajax({
			url: "/app/svc/delete_cart/" + str,
			success: function(msg){
				shoppingSlide.viewCart(false);	
			}
		});
	}
	
	this.directOrder = function()
	{
		document.location.href = '/app/order/order_form';
	}	
}

/*
 	this.chkJaego = function(goods_no, goods_sub, opt, goods_cnt)
	{
		var self = miniCart;
		var result = 0;
		$.ajax({
			type: "POST",
			async: false,
			url: "/app/svc/jaego_chk/" + goods_no + "/" + goods_sub,
			data: "goods_opt=" + opt + "&goods_cnt=" + goods_cnt,
			success: function(msg) {	
				eval("var response = " + msg);
				result = response.result;				
			}
		});		
		return result;
	}
 */
/*
     FILE ARCHIVED ON 16:43:12 Mar 15, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:11:51 Apr 29, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 47.615 (3)
  esindex: 0.008
  captures_list: 65.467
  CDXLines.iter: 12.696 (3)
  PetaboxLoader3.datanode: 138.492 (5)
  exclusion.robots: 0.217
  exclusion.robots.policy: 0.203
  RedisCDXSource: 1.701
  PetaboxLoader3.resolve: 38.365 (2)
  load_resource: 199.039
*/