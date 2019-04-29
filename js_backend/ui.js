function viewItem(id) {	
	var gon = document.getElementById(id);
	gon.style.display = "";
}

function hideItem(id) {
	var gon = document.getElementById(id);
	gon.style.display = 'none';	
}

function allCategoryview(menu_id, id) {
	
	var img = document.getElementById(menu_id);
	var gon = document.getElementById(id);
	
	if(gon.style.display == "none"){
		gon.style.display = "";
		img.className = "selected_01";
	} else {
		gon.style.display = "none";
		img.className = "selected1";
	}
		
}

function clOn(id) {		
	var gon = document.getElementById(id);
	gon.className = gon.className.replace('_off','_on');
}
function clOff(id) {		
	var gon = document.getElementById(id);
	gon.className = gon.className.replace('_on','_off');
}

function menuA(id,cont,total,num) {	
	var id = id;
	var cont = cont;
	var total = total;
	var menu = new Array();
	var content = new Array();
	for(j=0; j <= eval(total); j++) { 
		menu[j] = document.getElementById(id + eval(j+1)); 
		content[j] = document.getElementById(cont + eval(j+1)); 
	}
	for(var i=0 ; i<= eval(total); i++) {
		if (i == num) { 
			menu[i].src = menu[i].src.replace('_off','_on');
			content[i].style.display = ''; 
		}
		else { 
			menu[i].src = menu[i].src.replace('_on','_off');
			content[i].style.display = 'none'; 
		}
	}
}

/* quick */
function initMoving(target, topPosition, topLimit, btmLimit) {
if (!target)
return false;

var obj = target;
obj.initTop = topPosition;
obj.topLimit = topLimit;
obj.bottomLimit = document.documentElement.scrollHeight - btmLimit;

obj.style.position = "absolute";
obj.top = obj.initTop;
obj.left = obj.initLeft;
obj.style.top = obj.top + "px";

obj.getTop = function() {
if (document.documentElement.scrollTop) {
return document.documentElement.scrollTop;
} else if (window.pageYOffset) {
return window.pageYOffset;
} else {
return 0;
}
}

obj.move = setInterval(function() {
pos = obj.getTop() + topPosition;

if (pos > obj.bottomLimit)
pos = obj.bottomLimit
if (pos < obj.topLimit)
pos = obj.topLimit

interval = obj.top - pos;
obj.top = obj.top - interval / 4;
obj.style.top = obj.top + "px";
}, 15)
}
/* //quick */

/*°¡¹æÆË Ãß°¡*/
function menuA(id,cont,total,num) {	
	var id = id;
	var cont = cont;
	var total = total;
	var menu = new Array();
	var content = new Array();
	for(j=0; j <= eval(total); j++) { 
		menu[j] = document.getElementById(id + eval(j+1)); 
		content[j] = document.getElementById(cont + eval(j+1)); 
	}
	for(var i=0 ; i<= eval(total); i++) {
		if (i == num) { 
			menu[i].style.display = ''; 
			content[i].style.display = ''; 
		}
		else { 
			menu[i].style.display = 'none'; 
			content[i].style.display = 'none'; 
		}
	}
}

function menuB(id,total,num) {	
	var id = id;
	var total = total;
	var menu = new Array();
	for(j=0; j <= eval(total); j++) { 
		menu[j] = document.getElementById(id + eval(j+1)); 
	}
	for(var i=0 ; i<= eval(total); i++) {
		if (i == num) { 
			menu[i].style.display = ''; 
		}
		else { 
			menu[i].style.display = 'none'; 
		}
	}
}

function menuC(id,cont,total,num) {	
	var id = id;
	var cont = cont;
	var total = total;
	var menu = new Array();
	var content = new Array();
	for(j=0; j <= eval(total); j++) { 
		menu[j] = document.getElementById(id + eval(j+1)); 
		content[j] = document.getElementById(cont + eval(j+1)); 
	}
	for(var i=0 ; i<= eval(total); i++) {
		if (i == num) { 
			menu[i].className = menu[i].className.replace('off','on');
			content[i].style.display = ''; 
		}
		else { 
			menu[i].className = menu[i].className.replace('on','off');
			content[i].style.display = 'none'; 
		}
	}
}

function menuD(id,cont1,cont2,total,num) {	
	var id = id;
	var cont1 = cont1;
	var cont2 = cont2;
	var total = total;
	var menu = new Array();
	var content1 = new Array();
	var content2 = new Array();
	for(j=0; j <= eval(total); j++) { 
		menu[j] = document.getElementById(id + eval(j+1)); 
		content1[j] = document.getElementById(cont1 + eval(j+1)); 
		content2[j] = document.getElementById(cont2 + eval(j+1)); 
	}
	for(var i=0 ; i<= eval(total); i++) {
		if (i == num) { 
			menu[i].className = menu[i].className.replace('off','on');
			content1[i].src = content1[i].src.replace('_off','_on');
			content2[i].style.display = ''; 
		}
		else { 
			menu[i].className = menu[i].className.replace('on','off');
			content1[i].src = content1[i].src.replace('_on','_off');
			content2[i].style.display = 'none'; 
		}
	}
}

function menuE(id,cont,total,num) {	
	var id = id;
	var cont = cont;
	var total = total;
	var menu = new Array();
	var content = new Array();
	for(j=0; j <= eval(total); j++) { 
		menu[j] = document.getElementById(id + eval(j+1)); 
		content[j] = document.getElementById(cont + eval(j+1)); 
	}
	for(var i=0 ; i<= eval(total); i++) {
		if (i == num) { 
			menu[i].src = menu[i].src.replace('_off','_on');
			content[i].style.display = ''; 
		}
		else { 
			menu[i].src = menu[i].src.replace('_on','_off');
			content[i].style.display = 'none'; 
		}
	}
}

function menuF(id,cont1,cont2,total,num) {	
	var id = id;
	var cont1 = cont1;
	var cont2 = cont2;
	var total = total;
	var menu = new Array();
	var content1 = new Array();
	var content2 = new Array();
	for(j=0; j <= eval(total); j++) { 
		menu[j] = document.getElementById(id + eval(j+1)); 
		content1[j] = document.getElementById(cont1 + eval(j+1)); 
		content2[j] = document.getElementById(cont2 + eval(j+1)); 
	}
	for(var i=0 ; i<= eval(total); i++) {
		if (i == num) { 
			menu[i].className = menu[i].className.replace('off','on');
			content1[i].style.display = '';
			content2[i].style.display = ''; 
		}
		else { 
			menu[i].className = menu[i].className.replace('on','off');
			content1[i].style.display = 'none'; 
			content2[i].style.display = 'none'; 
		}
	}
}
/* °¡¹æÆË Ãß°¡*/
/*
     FILE ARCHIVED ON 02:32:18 Mar 16, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:11:51 Apr 29, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 48.796 (3)
  esindex: 0.009
  captures_list: 66.636
  CDXLines.iter: 12.828 (3)
  PetaboxLoader3.datanode: 90.198 (5)
  exclusion.robots: 0.169
  exclusion.robots.policy: 0.158
  RedisCDXSource: 1.643
  PetaboxLoader3.resolve: 58.916 (2)
  load_resource: 168.365
*/