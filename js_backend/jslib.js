/*
	About: jslib.js
		�ڹٽ�ũ��Ʈ ���̺귯�� �Լ� ����

	�ۼ���:
		�ջ��

	��������:
		- 2003-01-13 : CheckBoxChoiceAll,isCheckBoxChoice �Լ� �߰�
		- 2008-05-22	: Comment ó��
		- 2008-05-30 : ������� �ʴ� �Լ� ���� ( wait* ... )
		- 2008-10-30 : ltrim �Լ� �߰�
		- 2009-12-

	License:
		Copyright �� X2soft. <http://www.x2soft.co.kr> All Rights Reserved.
*/

/*
	Function: isEmail
		Email Format Check

	Parameters:
		str - Email Address

	Returns:
		true or false
*/

function isEmail(str) {
  // regular expression ���� ���� ����
  var supported = 0;
  if (window.RegExp) {
    var tempStr = "a";
    var tempReg = new RegExp(tempStr);
    if (tempReg.test(tempStr)) supported = 1;
  }
  if (!supported)
    return (str.indexOf(".") > 2) && (str.indexOf("@") > 0);
  var r1 = new RegExp("(@.*@)|(\\.\\.)|(@\\.)|(^\\.)");
  var r2 = new RegExp("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$");
  return (!r1.test(str) && r2.test(str));
}

/*
	Function: isResNo
		�ֹι�ȣ Sum Check

	Parameters:
		s - �ֹι�ȣ

	Returns:
		true or false
*/

function isResNo(s) {
	if( s.charAt(6) == 1 || s.charAt(6) == 2 ){
		if( s.charAt(12) ==	(( 11 - ((s.charAt(0)*2+s.charAt(1)*3+s.charAt(2)*4
			 +s.charAt(3)*5+s.charAt(4)*6+s.charAt(5)*7
			 +s.charAt(6)*8+s.charAt(7)*9+s.charAt(8)*2
			 +s.charAt(9)*3+s.charAt(10)*4+s.charAt(11)*5)
			% 11)))%10)
			return true;
	}
	return false;
}

/*
	Function: isBusino
		����ڵ�Ϲ�ȣ�˻�

	Parameters:
		Num - number(10�ڸ�)

	Returns:
		true or false
*/
function isBusiNo(NUM) {
	var sum = 0;
	var checknum = 0;
	var anum = new Array(10);
	var chknum = new Array("1","3","7","1","3","7","1","3","5");
	for(var i=0;i<10;i++){ anum[i]=NUM.substring(i,i+1); }
	for(var i=0;i< 9;i++){ sum += anum[i]*chknum[i]; }
	sum += parseInt((anum[8]*5)/10);
	checknum = (10 - sum % 10) %10;
	if(checknum != anum[9]){
		return false;
	} else {
		return true;
	}
}

/*
Function: isNumber
	Check Number

Parameters:
	Num - number

Returns:
	true or false
*/
function isNumber(value) {
	var num = parseFloat(value); // ���� ��ȯ
	if (isNaN(num)) { // ���� NaN �̸� ���� �ƴ�.
		return false;
	}
	return true;
}

/*
	Function: isNumVal
		Number Format Check

	Parameters:
		Num - number

	Returns:
		true or false
*/

function isNumVal(NUM) {
	for(var i=0;i<NUM.length;i++){
		achar = NUM.substring(i,i+1);
		if( achar < "0" || achar > "9" ){
			return false;
		}
	}
	return true;
}

/*
	Function: isNumObj
		���ڸ� �Է¹޵���

	Parameters:
		obj - text

	Returns:
		true or false
*/

function isNumObj(obj)
{
	for (var i = 0; i < obj.value.length ; i++){
		chr = obj.value.substr(i,1);
		chr = escape(chr);
		key_eg = chr.charAt(1);
		if (key_eg == 'u'){
			key_num = chr.substr(i,(chr.length-1));
			if((key_num < "AC00") || (key_num > "D7A3")) {
				event.returnValue = false;
			}
		}
	}
	if (event.keyCode >= 48 && event.keyCode <= 57) {

	} else {
		event.returnValue = false;
	}
}

/*
	Function: OnlyNum
		�ش� ��ü�� ���� ���� Ȯ��, onkeydown �� ���
	Parameters:
		type - 
	Returns:
		true or false
*/
function OnlyNum( obj, type ) {

	if ( ! type ) type = "ko";

	if (type == "ko") { // õ���� �޸�

		if (event.keyCode == 8) { 			// Back Space
		} else if (event.keyCode == 9) {		// Tab
		} else if (event.keyCode == 46) {		// Delete
		} else if (event.keyCode >= 48 && event.keyCode <= 57) {		// 1 ~ 0
		} else if (event.keyCode >= 96 && event.keyCode <= 105) {		// Number Pad 1 ~ 0
		} else {
			event.returnValue = false;
		}
	
	} else if (type == "kom") { // õ���� �޸�, ���̳ʽ�

		if (event.keyCode == 8) { 			// Back Space
		} else if (event.keyCode == 9) {		// Tab
		} else if (event.keyCode == 46) {		// Delete
		} else if (event.keyCode >= 48 && event.keyCode <= 57) {		// 1 ~ 0
		} else if (event.keyCode >= 96 && event.keyCode <= 105) {		// Number Pad 1 ~ 0
		} else if (event.keyCode == 45 && obj.value == ""){ 			// ù '-' ����
		} else {
			event.returnValue = false;
		}
	
	} else if (type == "us") { // õ���� �޸�, �Ҽ���
	
		if (event.keyCode == 8) { 			// Back Space
		} else if (event.keyCode == 9) {		// Tab
		} else if (event.keyCode == 46) {		// Delete
		} else if (event.keyCode >= 48 && event.keyCode <= 57) {		// 1 ~ 0
		} else if (event.keyCode >= 96 && event.keyCode <= 105) {		// Number Pad 1 ~ 0
		} else if (event.keyCode >= 96 && event.keyCode <= 105) {		// Number Pad 1 ~ 0
		} else if (event.keyCode == 110  ) {							// Number Pad .
		} else if (event.keyCode == 190) {								// .
		} else {
			event.returnValue = false;
		}		
	} else if (type == "usm") { // õ���� �޸�, �Ҽ���, ���̳ʽ�
	
	}		
}
/*
	Function: isMaxLength
		���ڿ��� �ִ�ũ��

	Parameters:
		str - ���ڿ�
		len -  �ִ�ũ��

	Returns:
		true or false
*/

function isMaxLength(str,len){
	var strlen = 0;
	for (var i = 0; i < str.length ; i++){
		chr = escape(str.substr(i,1));
		key_eg = chr.charAt(1);
		if (key_eg == 'u'){
			strlen+=2;
		} else {
			strlen++;
		}
	}
	if(strlen > len){
		return true;
	} else {
		return false;
	}
}

/*
	Function: isCheckBox
		Check Box Check ����

	Parameters:
		obj	- checkbox object

	Returns:
		true or false
*/

function isCheckBox(obj) {
	if (obj.length > 1) {
		for(i=0;i<obj.length;i++) if (obj[i].checked) return true;
	} else {
		return obj.checked;
	}
	return false;
}

/*
	Function: CheckBoxChoiceAll
		�ش� CheckBox ��� ����

	Parameters:
		obj	- checkbox object
		objKey - checkbox object

	Returns:
		true or false
*/

function CheckBoxChoiceAll(obj,objKey){
	if(obj){
		if(obj.length){
			for(i=0;i<obj.length;i++){
				obj[i].checked = objKey.checked;
			}
		} else {
			obj.checked = objKey.checked;
		}
	}
}

/*
	Function: isCheckBoxChoice
		üũ�ڽ� ���ÿ���

	Parameters:
		obj	- checkbox object

	Returns:
		true or false
*/

function isCheckBoxChoice(obj){
	if(obj){
		if(obj.length){
			for(i=0;i<obj.length;i++){
				if(obj[i].checked == true){ return true; }
			}
			return false;
		} else {
			return obj.checked;
		}
	} else { return false; }
}

/*
	Function: isRadio
		Radio ��������

	Parameters:
		obj - radio object

	Returns:
		true or false
*/

function isRadio(obj) {
	if (obj.length > 1) {
		for(i=0;i<obj.length;i++) if (obj[i].checked) return true;
	} else {
		return obj.checked;
	}
	return false;
}

/*
	Function: setSelectBox
		Select �ڽ� Value �� ����

	Parameters:
		obj - select object
		value - value

	Returns:
		true or false
*/

function setSelectBox(obj,value) {
	for(i=0;i<obj.length;i++){
		if (obj[i].value == value){
			obj[i].selected = true;
			return true;
		}
	}
	return false;
}

/*
	Function: getSelectBox
		���õ� SlectBox

	Parameters:
		obj - SelectBox Object

	Returns:
		Checked SelectBox
*/

function getSelectBox(obj){
	if(obj){
		if(obj.selectedIndex >= 0){
			return obj[obj.selectedIndex].value;
		} else {
			return false;
		}
	} else { return false; }
}


/*
	Function: setRadioButton
		Radio Button Value �� ����

	Parameters:
		obj - radio object
		value - value

	Returns:
		Checked SelectBox
*/

function setRadioButton(obj,value) {
	if (obj.length > 1) {
		for(i=0;i<obj.length;i++){
			if (obj[i].value == value){
				obj[i].checked = true;
				return true;
			}
		}
	} else {
		if(obj.value == value){
				obj.checked = true;
				return true;
		}
	}
	return false;
}

/*
	Function: getRadioButton
		üũ�� ������ư ��

	Parameters:
		obj - RadioButton object

	Returns:
		üũ�� ������ư ��
*/

function getRadioButton(obj){
	if(obj){
		if(obj.length){
			for(i=0;i<obj.length;i++){
				if(obj[i].checked == true){
					return obj[i].value;
				}
			}

		}else{
			return obj.value;
		}
	} else { return false; }
}

/*
	Function: moveObject
		����ũ���� ���� �޾����� �ٸ� object�� �̵�

	Parameters:
		obj - �ش� obj
		len - ����
		nobj - �̵��� obj

	Returns:
		üũ�� ������ư ��
*/

function moveObject(obj,len,nobj){
	if(obj.value.length == len){
		nobj.focus();
		return true;
	}
	return false;
}


/*
	Function: urlEncode
		���ڿ� ���ڵ� ( encodeURIComponent ��� )

	Parameters:
		str - ���ڿ�

	Returns:
		encoded str
*/

function urlEncode(str){

	var ch;
    //while((ch=str.indexOf(" ")) > 0) str = str.substr(0, ch) + "%20" + str.substr(ch+1, str.length);
	/*
    while((ch=str.indexOf("+")) > 0) str = str.substr(0, ch) + "%2B" + str.substr(ch+1, str.length);
    while((ch=str.indexOf("/")) > 0) str = str.substr(0, ch) + "%2F" + str.substr(ch+1, str.length);
    while((ch=str.indexOf("&")) > 0) str = str.substr(0, ch) + "%26" + str.substr(ch+1, str.length);
    while((ch=str.indexOf("?")) > 0) str = str.substr(0, ch) + "%3F" + str.substr(ch+1, str.length);
	*/
	var estr = encodeURIComponent(str);

	// Ư������ ó��

	re = /%C2%A0/gi;
	estr =estr.replace(re,"%20");
    return estr;
}

/*
	Function: openWindow
		�˾������� ����

	Parameters:
		theURL	- �˾����� ���� URL
		winName	- �˾������� �̸�
		features	- �˾�â�� �Ӽ�
		myWidth	- �˾�â����
		myHeight	- �˾�â�ǳ���
		isCenter	- �˾�â�� �߾� ���� ����

	Returns:
		����
*/

function openWindow(theURL,winName,features, myWidth, myHeight, isCenter)
{
	if(window.screen)if(isCenter)if(isCenter=="true"){
		var myLeft = (screen.width-myWidth)/2;
		var myTop = (screen.height-myHeight)/2;
		features+=(features!='')?',':'';
		features+=',left='+myLeft+',top='+myTop;
	}
	var w = window.open(theURL,winName,features+((features!='')?',':'')+'width='+myWidth+',height='+myHeight);
	try{
		w.focus();
	}catch(e){}

	return w;
	//var w = window.open('',winName,features+((features!='')?',':'')+'width='+myWidth+',height='+myHeight);
	//w.document.location.href = theURL;
}

/*
	Function: getCookie
		��Ű�� �б�

	Parameters:
		name	- cookie name

	Returns:
		����
*/

function getCookie (name) {
	var dcookie = document.cookie;
	dcookie =dcookie.replace(/%5F/g,"_");
	var cname = name + "=";
	var clen = dcookie.length;
	var cbegin = 0;
	while (cbegin < clen) {
		var vbegin = cbegin + cname.length;
			if (dcookie.substring(cbegin, vbegin) == cname) {
				var vend = dcookie.indexOf (";", vbegin);
				if (vend == -1) vend = clen;
			return unescape(dcookie.substring(vbegin, vend));
		}
		cbegin = dcookie.indexOf(" ", cbegin) + 1;
		if (cbegin == 0) break;
	}
	return "";
}

/*
	Function: FileSize
		����ũ��

	Parameters:
		size - File size

	Returns:
		����
*/

function FileSize(size){
	var s = '';
	size = size/1024;
	if(size > 1024){
		size = size / 1024;
		s = Math.round(size*100)/100 + 'MB';
	} else {
		s = Math.round(size*100)/100 + 'KB';
	}
	return s;
}

/*
	Function: plugIn
		ActiveX Ȱ��ȭ ��ũ��Ʈ

	Parameters:
		id - ID
*/

function plugIn(id){
	document.write(id.innerHTML);
	id.id = '';
}

/*
	Function: plugInAx
		ActiveX Ȱ��ȭ ��ũ��Ʈ

	Parameters:
		id - ID
*/

function plugInAx(id){
	document.write(id.innerHTML);
	id.innerHTML = ''
	id.id = '';
}

/*
	Function: ActiveXWrite
		ActiveX Ȱ��ȭ ��ũ��Ʈ

	Parameters:
		obj - object
*/

function ActiveXWrite(obj){
	document.write(obj);
}

/*
	Function: MM_preloadImages
		�̹��� �ε�
*/
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

/*
	Function: MM_swapImgRestore
		�����̹��� ����
*/
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

/*
	Function: MM_findObj
		��ü ã��		

	Parameters:
		n - name
		d - document object
*/
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

/*
	Function: MM_swapImage
		�̹��� ����
*/
function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

/*
	Function: NumberFormat
		���ڸ� ������ �������� ���

	Parameters:
		val - value
		decimal - divider Ÿ��

	Returns:
		����� ����

*/
 function NumberFormat(val, decimal) {
	//decimal  - the number of decimals after the digit from 0 to 3
	//-- Returns the passed number as a string in the xxx,xxx.xx format.

	anynum= val;
	divider =10;
	switch(decimal){
		case 0:
			divider =1;
			break;
		case 1:
			divider =10;
			break;
		case 2:
			divider =100;
			break;
		default:  	 //for 3 decimal places
			divider =1000;
	}

	workNum=Math.abs((Math.round(anynum*divider)/divider));

	workStr=""+workNum

	if (workStr.indexOf(".")==-1){workStr+="."}

	dStr=workStr.substr(0,workStr.indexOf("."));dNum=dStr-0
	pStr=workStr.substr(workStr.indexOf("."))

	while (pStr.length-1< decimal){pStr+="0"}

	if(pStr =='.') pStr ='';

	//--- Adds a comma in the thousands place.
	if (dNum>=1000) {
	  dLen=dStr.length
	  dStr=parseInt(""+(dNum/1000))+","+dStr.substring(dLen-3,dLen)
	}

	//-- Adds a comma in the millions place.
	if (dNum>=1000000) {
	  dLen=dStr.length
	  dStr=parseInt(""+(dNum/1000000))+","+dStr.substring(dLen-7,dLen)
	}
	retval = dStr + pStr
	//-- Put numbers in parentheses if negative.
	if (anynum<0) {retval="("+retval+")";}


	//You could include a dollar sign in the return value.
	  //retval =  "$"+retval

	  return retval;
 }

/*
	Function: SetTab
		CSS Tab Script

	Parameters:
		id - Tab�� ID
		cnt - ��ü Tab ����
		type - Tab ����
*/

function SetClickTab(id,cnt,type){
	for(var i=1; i <= cnt; i++){
		if(type){
			if( i == id){
				if($("t"+type+i)){
					$("t"+type+i).className = "on";
					$("t"+type+i+"_body").style.display = "block";
				}
			} else {
				if($("t"+type+i)){
					$("t"+type+i).className = "";
					$("t"+type+i+"_body").style.display = "none";
				}
			}
		}else{
			if( i == id){
				$("t"+i).className = "on";
				$("t"+i+"_body").style.display = "block";
			} else {
				$("t"+i).className = "";
				$("t"+i+"_body").style.display = "none";
			}
		}
	}
}

/*
	Function: currency
		���ڸ� �Է�

	Parameters:
		obj - text
*/

function checkFloat(obj)
{
	var keycode = event.keyCode;
	if (keycode >= 48 && keycode <= 57) {
	} else if(keycode == 46){
	} else {
		event.returnValue = false;
	}
}

/*
	Function: currency
		���ڸ� �Է�

	Parameters:
		obj - text
*/

function currency(obj)
{
	for (var i = 0; i < obj.value.length ; i++){
		chr = obj.value.substr(i,1);
		chr = escape(chr);
		key_eg = chr.charAt(1);
		if (key_eg == 'u'){
			key_num = chr.substr(i,(chr.length-1));
			if((key_num < "AC00") || (key_num > "D7A3")) {
				event.returnValue = false;
			}
		}
	}
	if (event.keyCode >= 48 && event.keyCode <= 57) {

	} else {
		event.returnValue = false;
	}
}

function currency_point ( obj){
	if(
		(	
			( event.keyCode == 9 )			// tab
			||	( event.keyCode == 8 )		// bs
			||	( event.keyCode == 46 )		// delete
			||	( event.keyCode > 47 && event.keyCode < 58 )		// 1 ~ 0
			||	( event.keyCode >= 96 && event.keyCode <= 105 )		// numpad 1~0
		) == false
	) {
		event.returnValue = false;
	}	
}
/*
	Function: currency2
		���ڸ� �Է� ( ���̳ʽ�, ',' ���� )

	Parameters:
		obj - text
*/
function currency2(obj) {

	var keycode = event.keyCode;
	if (keycode >= 48 && keycode <= 57) {
	} else if(keycode == 45 && obj.value == ""){ // ù '-' ����
	} else if(keycode == 44){		// ',' ����
	} else {
		event.returnValue = false;
	}

	/*
	if (obj == null)	var obj = this;
	var str      = obj.value;

	new_val = '';
	rst = true;
	for(i=0;i<str.length;i++) {
		char = str.substring(i,i+1);
		if ((i>0 && char != '-' && char >= '0' && char <= '9') || char == ',' || (i == 0 && char == '-') || (char >= '1' && char <= '9') ) {
			new_val = new_val + char;
		} else {
			rst = false;
		}
	}
	str = new_val;
	obj.value = str;
	//return rst;
	*/
}

/*
	Function: com
		�޸�

	Parameters:
		obj - object
*/
function com(obj)
{
	if (obj.value != "")
	{
		obj.value = unComma(obj.value);
		obj.value = Comma(obj.value);
	}
}

/*
	Function: com2
		�޸�ó�� ( ���̳ʽ� ó�� )

	Parameters:
		obj - object
*/
function com2(obj)
{
	var str = obj.value;
	if ( str != null && str != "" )
	{
		var retStr = "";
		var m = "";
		str = str.replace(/^0*|\,/g,'');
		if( str.charAt(0) == "-" ) {
			m = "-";
			str = str.substr(1,str.length);
		}
		var strLen = str.length;
		for(var i=0; i<strLen; i++){
			if ((i%3 == strLen%3) && (i != 0)) {
				retStr += ",";
			}
			retStr += str.charAt(i);
		}
		obj.value = "" + m + retStr + "";
	}
}

/*
	Function: com3
		�޸�ó�� ( ���̳ʽ��� �Ҽ��� ó�� )

	Parameters:
		obj - object
*/
function com3(obj) {
	var str = obj.value;
	if ( str != null && str != "" ) {

		var retStr = "";
		var m = "";
		var dot = "";
		var dotIdx = -1;
		str = str.replace(/^0*|\,/g,'');
		if( str.charAt(0) == "-" ) {
			m = "-";
			str = str.substr(1,str.length);
			//alert(str);
		}
		dotIdx = str.indexOf(".");
		if( dotIdx > 0 ) {
			dot = str.substr(dotIdx,str.length);
			str = str.substr(0,dotIdx);
			//alert(str);
			//alert(dotIdx);
		}
		var strLen = str.length;
		for(var i=0; i<strLen; i++){
			if ((i%3 == strLen%3) && (i != 0)) {
				retStr += ",";
			}
			retStr += str.charAt(i);
		}
		obj.value = "" + m + retStr + dot + "";
	}
}

/*
	Function: unComma
		�޸� ���ֱ�

	Parameters:
		obj - object
*/

function unComma(input) {
   var inputString = new String;
   var outputString = new String;
   var outputNumber = new Number;
   var counter = 0;
   inputString=input;
   outputString='';
   for (counter=0;counter <inputString.length; counter++)
   {
      outputString += (inputString.charAt(counter) != ',' ?inputString.charAt(counter) : '');
   }
   outputNumber = parseFloat(outputString);
   
   return (outputNumber);
}

/*
	Function: Comma
		�޾ƿ� numstr�� ','�� �߰��Ͽ� Return

	Parameters:
		numstr - string value
	
	Returns:
		�޸�ó���� ����
*/

function Comma(numstr) {
	var numstr = String(numstr);
	var re0 = /(\d+)(\d{3})($|\..*)/;
	if (re0.test(numstr))
		return numstr.replace(re0, function(str,p1,p2,p3) { return Comma(p1) + "," + p2 + p3; });
	else
		return numstr;
}

/*
	Function: Resize
		�˾� ũ�� ���߱�

	Parameters:
		w - width
		h - height
*/

function Resize(w,h){
	//alert(parent.document.location.href+"\n"+self.document.location.href +"\n"+document.body.clientWidth + "\n" + w*0.9);

	//if( parent.document.location.href == self.document.location.href && document.body.clientWidth < w * 0.9){
	if( parent.document.location.href == self.document.location.href && document.body.clientWidth < w * 0.9){
		window.resizeTo(w,h);
		//alert(document.body.clientWidth);
		//alert(w);
	}
}


/*
	Function: imageAutoResize
		�̸����� �˾� �߰�

	Parameters:
		image_URL - image_URL
*/

function imageAutoResize(image_URL){
	full_image = new Image();
	full_image["src"] = image_URL;

	i = 0;
	img_width = 0;
	img_height = 0;
	var str = "";

	// Netscape ������ Loop �־���
	do {
		i += 1;
		img_width = full_image["width"];
		img_height = full_image["height"];
		str += i + "= width:" + img_width + ", height:" + img_height + "\n";
	} while(i < 40 && (img_width == "0"  || img_height == "0"));

	if(img_width == "0" || img_height == "0") {
		img_width = 520;
		img_height = 520
	} else {
		img_width += 40;
		img_height += 45;
	}

	var full_win = window.open(image_URL, "full_image_win", "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=yes,resizable=yes,Width="+img_width+",Height="+img_height);
	full_win.focus();
}

/*
	Function: getRadioValue
		üũ�� ������ư ��

	Parameters:
		obj - RadioButton object

	Returns:
		üũ�� ������ư ��
*/

function getRadioValue(obj){
	if(obj){
		if(obj.length){
			for(i=0;i<obj.length;i++){
				if(obj[i].checked == true){
					return obj[i].value;
				}
			}
		}else{
			return obj.value;
		}
	} else { return false; }
}

/*
	Function: AllCheckCheckBox
		�ش� ��ü�� Check ����

	Parameters:
		obj - üũ�� ��ü
		ischeck - üũ ����

	Returns:
		üũ�� ������ư ��
*/

function AllCheckCheckBox(obj, ischeck){
	var i;
	if (obj){
		if (obj.length > 0)	{
			for(i=0;i < obj.length;i++) obj[i].checked = ischeck;
		} else {
			obj.checked = ischeck;
		}
		return;
	} else {
		return;
	}
}

/*
	Function: getDateObjToStr
		��¥�� YYYYMMDD �������� ����

	Parameters:
		date - date object

	Returns:
		date string "YYYYMMDD"
*/

function getDateObjToStr(date){
	var str = new Array();

	var _year = date.getFullYear();
	str[str.length] = _year;

	var _month = date.getMonth()+1;
	if(_month < 10) _month = "0"+_month;
	str[str.length] = _month;

	var _day = date.getDate();
	if(_day < 10) _day = "0"+_day;
	str[str.length] = _day
	var getDateObjToStr = str.join("");

	return getDateObjToStr;
}

/*
	Function: calcDate
	����Ʈ ��� �Լ�

	Parameters:
		date - string "yyyymmdd"
		period - int
		period_kind - string "Y","M","D"
		gt_today - boolean

	Returns:
		calcDate("20080205",30,"D");
*/

function calcDate(date,period, period_kind,gt_today){

	var today = getDateObjToStr(new Date());

	var in_year = date.substr(0,4);
	var in_month = date.substr(4,2);
	var in_day = date.substr(6,2);

	var nd = new Date(in_year, in_month-1, in_day);
	if(period_kind == "D"){
		nd.setDate(nd.getDate()+period);
	}
	if(period_kind == "M"){
		nd.setMonth(nd.getMonth()+period);
	}
	if(period_kind == "Y"){
		nd.setFullYear(nd.getFullYear()+period);
	}
	var new_date = new Date(nd);
	var calcDate = getDateObjToStr(new_date);
	if(! gt_today){ // ���Ϻ��� ū ��¥ ��ȯ�Ѵٸ�
		if(calcDate > today){
			calcDate = today;
		}
	}
	return calcDate;
}


/*
	Function: trim
		�յ� ���ڿ� ����

	Parameters:
		String
*/
String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

/*
	Function: ltrim
		�� ���ڿ� ����

	Parameters:
		String
*/
String.prototype.ltrim = function(){
    return this.replace(/^\s*/g, "");
}

/*
	Function: trim
		�յ� ���ڿ� ����

	Parameters:
		String
*/
function trim(str){
	return str.replace(/^\s+|\s+$/g, '');
}

/*
	printFlash( "/skin/eshop/images/flash/main.swf", 800, 600, "main_flash", "menu=member&type=order" );
	
	file	: flash ���ϸ� ( ������� )
	id		: object ID ( ���� ���� )
	vars	: flashvars ( ���� ���� )
	mode	: "transparent" �⺻ ( �������� )
*/
function printFlash( file, width, height, id, vars, mode ) {

	var strProtocol = (document.location.protocol.indexOf("https")!=-1 ) ?"https":"http";
	var strWidth	= " width=\"" + width + "\"";
	var strHeight	= " height=\"" + height +"\"";
	var strIEVars	= ( vars ) ? "<param name=\"FlashVars\" value=\""+ vars + "\" />" : "";
	var strFFVars	= ( vars ) ? "FlashVars=\"" + vars + "\"":"";
	var strId		= ( id ) ? " id=\""+ id + "\"":"";
	var strMode		= ( mode ) ? mode : "transparent";
	
	var printFlash	= "";
	printFlash		+= "<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"" + strProtocol +"://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0\" "+ strWidth + strHeight + strId + ">";
	printFlash		+= "<param name=\"movie\" value=\""+ file +"\" />";
	printFlash		+= "<param name=\"quality\" value=\"high\" />";
	printFlash		+= "<param name=\"allowScriptAccess\" value=\"always\" />";
	printFlash		+= "<param name=\"wmode\" value=\""+ strMode +"\" />";
	printFlash		+= strIEVars;
	printFlash		+= "<embed src=\""+ file + "\" "+ strFFVars +" quality=\"high\" allowscriptaccess=\"always\" wmode=\"" + strMode + "\" type=\"application/x-shockwave-flash\" pluginspage=\"" + strProtocol +"://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash\"" + strWidth + strHeight + ">";
	printFlash		+= "</embed>";
	printFlash		+= "</object>";
	
	document.write(printFlash);
}

/*
	���̾� ���( ����, ���� )
*/
function flickLayer(layer_id){
	if( document.getElementById(layer_id).style.display == "none" ){
		document.getElementById(layer_id).style.display = "";
	} else {
		document.getElementById(layer_id).style.display = "none";
	}
}

/*
	�������� ���̾� �˾� ���
*/
function popup_layer(div_id, ns_no, idx) {
	
	if(popup_seq < 3){
				
		var left = (popup_seq) * 450 + 10;
		var z_index = (popup_seq + 1) * 100;
	
		if ( $("#" + div_id).length == 0 )
		{
			$("<div id='" + div_id + "' style='width: 500px; position: absolute; left: " + left + "px; top: 15%; z-index: " + z_index + "; display: none; background-color: #ffffff;'></div>").appendTo("body");
		}
		
		$.ajax({
			type: "GET",
			url: "/app/svc/getNoticePopup/" + ns_no + "/" + idx,
			success: function(msg) {
				$("#" + div_id).html(msg);
				$("#" + div_id).easydrag();
				
				// �̹��� ������ ���
				var img_src = $("#pop_contents" + idx + " img").attr("src");					
				
				if(img_src != undefined){
					var imgObj = new Image();
					imgObj.src = img_src;
					
					imgObj.onload = function() {
 						var pop_width = imgObj.width + 4;
						if(pop_width > 4){
							$("#" + div_id).width(pop_width);	
						}
					}
				}
			}			
		});
		popup_seq++;
		
		if(document.getElementById(div_id))
		{
			cookiedata = document.cookie;
			if ( cookiedata.indexOf("maindiv" + idx + "=done") < 0 ) {
				document.getElementById(div_id).style.display = "";
			}
		}	
	}
}
/*
     FILE ARCHIVED ON 02:32:55 Mar 16, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:11:52 Apr 29, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 132.309 (3)
  esindex: 0.01
  captures_list: 148.802
  CDXLines.iter: 11.518 (3)
  PetaboxLoader3.datanode: 249.121 (5)
  exclusion.robots: 0.306
  exclusion.robots.policy: 0.292
  RedisCDXSource: 1.391
  PetaboxLoader3.resolve: 36.118 (2)
  load_resource: 197.686
*/