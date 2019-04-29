/* Footscape Side Banner */
/* Date : 2013.12.02 */
/* Script Coding : Seungmin Roh */

$(window).load(function() {  
	$('#slideopen_1').click (function() {
		if ($('#slideopen_1 img').attr("src") == ("./img/page1_button_on.png")) /* 사이드배너 닫기 */
					{		
						$('.slide_content_wrap').clearQueue().stop().animate({width:"1600px"}, 200);
						$('.slidebutton_wrap').clearQueue().stop().animate({width:"1600px"}, 200);
						$('.slide_bg').clearQueue().stop().animate({width:"1600px"}, 200);

						$('.slide_content_wrap').css('right','-1600px');
						$('.slidebutton_wrap').css('right','-1474px');
						$('.slide_bg').css('right','-1600px');
									
						$('#slideopen_1 img').attr('src', './img/page1_button_off.png');
						$('#slideopen_2 img').attr('src', './img/page2_button_off.png');
						return false;
					}
			else
					{
					$('#slide_content1').clearQueue().stop().animate({width:"100%"}, 230);
					$('#slide_content2').clearQueue().stop().animate({width:"0%"}, 200);
					$('#slide_bg').clearQueue().stop().animate({width:"100%"}, 230);
					$('#slidebutton_wrap').clearQueue().stop().animate({width:"100%"}, 230);

					$('#slide_content1').css('right','-177px');
					$('#slide_bg').css('right','-177px');
					$('#slidebutton_wrap').css('right','-51px');

					$('#slideopen_1').css('z-index', '999');
					$('#slideopen_2').css('z-index', '998');

					$('#slideopen_1 img').attr('src', './img/page1_button_on.png');
					$('#slideopen_2 img').attr('src', './img/page2_button_off.png');
					return false; 
					}
			}
	);
 
	$('#slideopen_2').click (function() {
		if ($('#slideopen_2 img').attr("src") == ("./img/page2_button_on.png")) /* 사이드배너 닫기 */
					{		
						$('.slide_content_wrap').clearQueue().stop().animate({width:"1600px"}, 200);
						$('.slidebutton_wrap').clearQueue().stop().animate({width:"1600px"}, 200);
						$('#slide_bg').clearQueue().stop().animate({width:"1600px"}, 200);

						$('.slide_content_wrap').css('right','-1600px');
						$('#slidebutton_wrap').css('right','-1474px');
						$('#slide_bg').css('right','-1600px');
									
						$('#slideopen_1 img').attr('src', './img/page1_button_off.png');
						$('#slideopen_2 img').attr('src', './img/page2_button_off.png');
						return false;
					}

			else
					{
					$('#slide_content1').clearQueue().stop().animate({width:"0%"}, 200);
					$('#slide_content2').clearQueue().stop().animate({width:"100%"}, 230);
					$('#slide_bg').clearQueue().stop().animate({width:"100%"}, 230);
					$('#slidebutton_wrap').clearQueue().stop().animate({width:"100%"}, 230);

					$('#slide_content2').css('right','-177px');
					$('.slide_bg').css('right','-177px');
					$('.slidebutton_wrap').css('right','-51px');

					$('#slideopen_1').css('z-index', '998');
					$('#slideopen_2').css('z-index', '999');

					$('#slideopen_1 img').attr('src', './img/page1_button_off.png');
					$('#slideopen_2 img').attr('src', './img/page2_button_on.png');
					return false; 
					}
			}
	);
	$('.slidepage_close').click (function() {
		$('.slide_content_wrap').clearQueue().stop().animate({width:"1600px"}, 200);
		$('.slidebutton_wrap').clearQueue().stop().animate({width:"1600px"}, 200);
		$('.slide_bg').clearQueue().stop().animate({width:"1600px"}, 200);

		$('.slide_content_wrap').css('right','-1600px');
		$('#slidebutton_wrap').css('right','-1474px');
		$('#slide_bg').css('right','-1600px');
					
		$('#slideopen_1 img').attr('src', './img/page1_button_off.png');
		$('#slideopen_2 img').attr('src', './img/page2_button_off.png');
		return false;
		}
	);
});