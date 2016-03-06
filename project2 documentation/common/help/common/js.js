
// ---------------------------------
// OnLoad Functions
// ---------------------------------

function onloadOrRefresh()
{
	// Get cookie for 'show/hide inheritance' and sets it
	var showStr = "";
	var cookieStr = getCookie( cookieName );
	if( cookieStr != null) { // The cookie is found
		cookieContent = getCookieContent( cookieStr, cookieInnerNameAllInheritance );
		if( cookieContent != false && isObj( cookieContent ) ) {
			showStr = cookieContent;
		}
		else {
			showStr = splitReturnFirst( originalAllInheritance_List );
		}
	}
	else {
		showStr = splitReturnFirst( originalAllInheritance_List );
	}
 if( isObj( showStr ) ){
 	showElementStoreCookie( showStr, cookieInnerNameAllInheritance );
 }
	
	hideMe = originalAllInheritance_List.split( "," );
	for( i=0; i<hideMe.length; i++ ) {
		oneOfHideMe = hideMe[i].replace( " ", "" );
		if( isObj( oneOfHideMe ) && showStr != oneOfHideMe ) {
			hideElement( oneOfHideMe );
		}
	}
	
 // Get cookie for 'show/hide overloads'
 var showStr = "";
 var cookieStr = getCookie( cookieName );
 if( cookieStr != null) { // The cookie is found
   cookieContent = getCookieContentCut( cookieStr, "overload" , "show");
   if(cookieContent.length > 0) {
     strSplit = cookieContent.split( "&" );
     for( i=0; i< strSplit.length; i++ ) {
       showOverload( strSplit[i] );
     }
   }
 }
 // Get cookie for 'show/hide on description page'
 var showStr = "";
 var cookieStr = getCookie( cookieName );
 if( cookieStr != null) { // The cookie is found
   cookieContent = getCookieContentCut( cookieStr, "desc" , "hide");
   if(cookieContent.length > 0) {
     strSplit = cookieContent.split( "&" );
     for( i=0; i< strSplit.length; i++ ) {
       hideDescription( strSplit[i] );
     }
   }
 }
}


// ---------------------------------
// Help Functions
// ---------------------------------

function getViewportSize()
{
	var w;
	var h;
	// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	if (typeof window.innerWidth != 'undefined') {
		w = window.innerWidth,
		h = window.innerHeight
	}
	// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	else if (typeof document.documentElement != 'undefined'
		&& typeof document.documentElement.clientWidth !=
		'undefined' && document.documentElement.clientWidth != 0) {
		w = document.documentElement.clientWidth,
		h = document.documentElement.clientHeight
	}
	// older versions of IE
	else{
		w = document.getElementsByTagName('body')[0].clientWidth,
		h = document.getElementsByTagName('body')[0].clientHeight
	}
	return  { 'w':w, 'h':h }; 
}


function isObj( objString )
{
	if(document.getElementById( "" + objString + "" )) {
		return true;
	}
	else {
		return false;
	}
}

// Splits the string and returs the first obj
function splitReturnFirst( commaString ) {

	str = commaString.split( "," );
	str[0] = str[0].replace(" ", "");
	return str[0];
}


// ---------------------------------
// My Cookie Functions
// ---------------------------------

function setMyCookie( cookieName, innerName, value )
{
	var cookieStr = getCookie( cookieName );
	if( cookieStr != null) { // The cookie is found
		cookieContent = cookieStr.split( "&" );
		for( i=0; i<cookieContent.length; i++ ) {
			innerStr = cookieContent[i].split( "=" );
			if( innerStr[0] == innerName ) { // Look for name in cookie
				// Name found, make cookie with changed value
				cookieContent[i] = innerStr[0] + "=" + value;
				newCookieStr = assembleCookieStr( cookieContent );
				setCookie( cookieName, newCookieStr, expires );
				return;
			}
		}
		// Name Not found, make cookie with this name
		newCookieStr = assembleCookieStr( cookieContent, innerName, value );
		setCookie( cookieName, newCookieStr, expires );
		return;
	}
	// Cookie Not found, make cookie with this name
	newCookieStr = innerName + "=" + value;
	setCookie( cookieName, newCookieStr, expires );
	return;
}

function assembleCookieStr( contentArray, innerName, value )
{
	newStr = '';
	for( i=0; i<contentArray.length; i++ ) {
		if( newStr != '') {
			newStr += "&"
		}
		newStr += contentArray[i];
	}

	// Add my name and value to the cookie if innerName != ''
	if( innerName != null ) {
		if( newStr != '' ) {
			newStr += "&"
		}
		newStr += innerName + "=" + value;
	}
	return newStr;
}


function getCookieContent( cookieStr, innerName )
{
	cookieStr = cookieStr.split( "&" );
	for( i=0; i<cookieStr.length; i++ ) {
		innerStr = cookieStr[i].split( "=" );
		if( innerStr[0] == innerName ) {
			return innerStr[1];
		}
	}
	return false;
}


function getCookieContentCut( cookieStr, innerName, findWhat )
{
  var arrayStr = "";
  cookieStr = cookieStr.split( "&" );
  for( i=0; i<cookieStr.length; i++ ) {
    innerStr = cookieStr[i].split( "=" );
    if( innerStr[0].indexOf(innerName) == 0 && innerStr[1] == findWhat) { // Found at first pos and found findWhat
      if(arrayStr.length > 0) arrayStr += "&";
      arrayStr += innerStr[0];
    }
  }
  return arrayStr;
}


// ---------------------------------
// Pure Cookie Functions
// ---------------------------------

function getCookie(name)
{
	var cookies = document.cookie;
	var start = cookies.indexOf(name + '=');
	if (start == -1) return null;
	var len = start + name.length + 1;
	var end = cookies.indexOf(';',len);
	if (end == -1) end = cookies.length;
	return unescape(cookies.substring(len,end));
}

function setCookie(name, value, expires, path, domain, secure)
{
	if(path == null) {path = "/"};
	value = escape(value);
	expires = (expires) ? ';expires=' + expires.toGMTString() :'';
	path    = (path)    ? ';path='    + path                  :'';
	domain  = (domain)  ? ';domain='  + domain                :'';
	secure  = (secure)  ? ';secure'                           :'';

	document.cookie =	name + '=' + value + expires + path + domain + secure;
}

function deleteCookie(name, path, domain)
{
	var expires = ';expires=Thu, 01-Jan-70 00:00:01 GMT';
	(path)    ? ';path='    + path                  : '';
	(domain)  ? ';domain='  + domain                : '';

	if (getCookie(name))
		document.cookie = name + '=' + expires + path + domain;
}


// ---------------------------------
// showElement / hideElement Functions
// ---------------------------------

function showElementStoreCookie( object, cookieInnerName )
{
	if(cookieInnerName != null){ ;
	  setMyCookie( cookieName, cookieInnerName, object );
	}
	d = document.getElementById( "" + object + "" );
 if(!d) return;
	d.style.visibility = "visible";
	d.style.display = '';
}

function showElement( object )
{
	d = document.getElementById( "" + object + "" );
 if(!d) return;
	d.style.visibility = "visible";
	d.style.display = '';
}

function hideElement( object )
{
	d = document.getElementById( "" + object + "" );
 if(!d) return;
	d.style.visibility = "hidden";
	d.style.display = 'none';
}

function showOverload( obj )
{
  showElement(obj + "All");
  showElement(obj + "AllSpan");

  hideElement(obj + "Single");
  hideElement(obj + "SingleSpan");
}


function hideDescription( obj )
{
  showElement(obj + "ExpSpan");

  hideElement(obj);
  hideElement(obj + "ColSpan");
}


// ---------------------------------------------
// Link function, to navigate around the website
// ---------------------------------------------

function link3( type, preLinkPart, dirarraynr, pageTab )
{
  for (var i=0; i<arr_find.length; i++)
  {
    preLinkPart=preLinkPart.split(arr_find[i]).join(arr_replace[i]);
  }
  var sSlash = "";
  if(arr_dir[dirarraynr] != "") {
    sSlash = "/";
  }
  return link2( type, arr_dir[dirarraynr] + sSlash + preLinkPart, pageTab );
}


function linkTab( type, preLinkPart, pageTab, obj )
{
  obj.href = link2( type, preLinkPart, pageTab );
}


function SetPageTab( type, pageTab )
{
    cookieContent = pageTab;
    setMyCookie( cookieName, 'tab_' + type, cookieContent );
    setMyCookie( cookieName, 'curPageType', type );
    setMyCookie( cookieName, 'curPageTab', pageTab );
	idMainContentFrame = document.getElementById('MainContentFrame');
	if ( idMainContentFrame != undefined ) {
		idMainContentFrame.style.height = getViewportSize().h + g_iMainContentFrameDeltaHeight + "px";
	}
}


function link( type, preLinkPart, obj )
{
  obj.href = link2( type, preLinkPart, "" );
}


function link2( type, preLinkPart, pageTab )
{
  var cookieVar = getCookie( cookieName );
  var cookieContent;
  var cookieContentConnectType;
  var cookieContentConnectTab;
  if( cookieVar == null ) {
    cookieContent = false;
  }
  else {
    cookieContent = getCookieContent( cookieVar, 'tab_' + type );
    cookieContentConnectType = getCookieContent( cookieVar, 'curPageType');
    cookieContentConnectTab = getCookieContent( cookieVar, 'curPageTab');
  };
  if( cookieContent == false ) {
    typeList = tabType_List.split( "," );
    typeDefaultList = tabDefault_List.split( "," );
    cookieContent = "";
    for( i=0; i<typeList.length; i++ ) {
     if( type == typeList[i].replace( " ", "" ) ) {
        cookieContent = typeDefaultList[i].replace( " ", "" );
      }
    }
    if( cookieContent == mainDirDescription) {
      cookieContent = "";
    }
    else if(cookieContent =="") {
      cookieContent = normalDescription;
    }
  }

  if( pageTab == mainDirDescription) {
    cookieContent = "";
  }
  else if( pageTab != "") {
    cookieContent = pageTab;
  }
  else if (cookieContent == mainDirDescription) {
    cookieContent = "";
  }
    var connectPage = -1;
    connectLookForList = pageConnectLookFor_List.split( "," );
    connectReplaceList = pageConnectReplace_List.split( "," );
    for( i=0; i<connectLookForList.length; i+=2 ) {
      if ( cookieContentConnectType == connectLookForList[i+0] && cookieContentConnectTab == connectLookForList[i+1] ) {
        connectPage = i
      }
    }
    if (connectPage != -1 && connectPage+1 <= connectReplaceList.length) {
      if ( type == connectReplaceList[connectPage+0] ) {
        cookieContent = connectReplaceList[connectPage+1];
      }
    }
  strlink = preLinkPart + type + cookieContent + tabExtention;
  return strlink;
}


// ---------------------------------
// Test Functions
// ---------------------------------

// ---------------------------------
// Style Sheets Functions
// ---------------------------------

function loadStyleSheet()
{
	// Get cookie for the 'Style Sheet' link and sets it
/*
	var str;
	var cookieStr = getCookie( cookieName );
	if( cookieStr != null) { // The cookie is found
		cookieContent = getCookieContent( cookieStr, cookieInnerNameOldLinks );
		if( cookieContent != false && isObj( cookieContent ) ) {
			str = cookieContent;
		}
		else {
			str = splitReturnFirst( originalLinks_List );
		}
	}
	else {
		str = splitReturnFirst( originalLinks_List );
	}
	showElementStoreCookie( str, cookieInnerNameOldLinks );
*/



	return "default.css";
}

function changeStyleSheet()
{
	return "default.css";
}
// ---------------------------------
// Search Functions
// ---------------------------------
function init()
{
  FromSearchCookie(); // gets the cookievalues
  enableDisableSearchButton();
  var OutputDiv = document.getElementById("OutputDiv");
  OutputDiv.innerHTML = "&nbsp;Loading...";
  readData();
  window.setTimeout("Search();", 50);
  var SearchStringDiv = document.getElementById("SearchString");
  SearchStringDiv.focus();
}

function readData()
{
  var OutputDiv = document.getElementById("OutputDiv");
  // Load data by direct calls
  addData(); 
  OutputDiv.innerHTML = "&nbsp;Ready";

  var dataDiv = document.getElementById("dataDiv");
  dataDiv.innerHTML = "";	
}

function enableDisableSearchButton()
{
  IncSearch = document.getElementById("chkIncSearch");
  ButtonSearch = document.getElementById("butSearch");

  ButtonSearch.disabled = IncSearch.checked;
}

function searchEnterCheck(e) {
  IncSearch = document.getElementById("chkIncSearch");
  if(IncSearch.checked) {
    return;
  }
  if (e.type == "keypress") {
    var whichCode = e.keyCode;
  }
  else {
    var whichCode = e.button;
  }

  if (e.type == "keypress") {
    if(whichCode == 13) {
      Search(true);
    }
  }
  else {
    alert("click: code=" + whichCode);
  }
}

// Search -------------------------------------------- Search

function Search(bSearchButton)
{
 var OutputDiv = document.getElementById("OutputDiv");
 searchString = document.getElementById("SearchString");
  strSearch = searchString.value.toLowerCase();
  IncSearch = document.getElementById("chkIncSearch");

  if(strSearch == "")
  {
    OutputDiv.innerHTML = "";
  }
  else
  {
    if(IncSearch.checked)
    {
      Searching();
    }
    else if(bSearchButton)
    {
      Searching();
    }
  }
}

function Searching()

{
  var OutputDiv = document.getElementById("OutputDiv");
  arrayOutput = new Array;
  searchString = document.getElementById("SearchString");
  strSearch = searchString.value.toLowerCase();
  rows = document.getElementById("rowsNumber");
  searchName = document.getElementById("chkName");
  searchBrief = document.getElementById("chkBrief");
  searchKeywords = document.getElementById("chkKeywords");
  searchClass = document.getElementById("chkClass");
  searchMethod = document.getElementById("chkMethod");
  searchAttribute = document.getElementById("chkOthers");
  var j = 0; // Number of items on output list counter
  var k = 0;

  arrayOutput[0] = "<br><table cellspacing=0 cellpadding=0 border=0 class='widthAndBorderTop'><TR VALIGN='top'><TD class='paddingHeadMultiColumn1' width=20%>" + translatorForName + "</TD><TD class='paddingHeadMultiColumn1' width=70%>" + translatorForBriefDes + "</TD><TD class='paddingHeadMultiColumn2' width=10%>" + translatorForParent + "</TD></TR>";
  if(searchClass.checked)
  {
    for (k=0; k<arr_array_of_arraynames.length; k++)
    {
	     if(arr_array_of_arraynames[k].indexOf("arr_class") != -1)
	     {
	       SearchArray(eval(arr_array_of_arraynames[k]),arr_types[0]);
	     }
    }
  }
  if(searchMethod.checked)
  {
    for (k=0; k<arr_array_of_arraynames.length; k++)
    {
	     if(arr_array_of_arraynames[k].indexOf("arr_member") != -1)
	     {
	       SearchArray(eval(arr_array_of_arraynames[k]),arr_types[1]);
	     }
    }
  }
  if(searchAttribute.checked)
  {
    for (k=0; k<arr_array_of_arraynames.length; k++)
    {
	     if(arr_array_of_arraynames[k].indexOf("arr_file") != -1)
	     {
		     SearchArray(eval(arr_array_of_arraynames[k]),arr_types[2]);
	     }
    }
    for (k=0; k<arr_array_of_arraynames.length; k++)
    {
	     if(arr_array_of_arraynames[k].indexOf("arr_namespace") != -1)
	     {
		     SearchArray(eval(arr_array_of_arraynames[k]),arr_types[3]);
	     }
    }
    for (k=0; k<arr_array_of_arraynames.length; k++)
    {
	     if(arr_array_of_arraynames[k].indexOf("arr_page") != -1)
	     {
	       SearchArray(eval(arr_array_of_arraynames[k]),arr_types[4]);
	     }
    }
    for (k=0; k<arr_array_of_arraynames.length; k++)
    {
	     if(arr_array_of_arraynames[k].indexOf("arr_directory") != -1)
	     {
        SearchArray(eval(arr_array_of_arraynames[k]),arr_types[5]);
      }
    }
    for (k=0; k<arr_array_of_arraynames.length; k++)
    {
      if(arr_array_of_arraynames[k].indexOf("arr_unit") != -1)
      {
        SearchArray(eval(arr_array_of_arraynames[k]),arr_types[6]);
      }
    }
  }
  arrayOutput[arrayOutput.length] = "</table>";
  OutputDiv.innerHTML = arrayOutput.join("");

  function SearchArray(ArrayToSearch, membertype)
  {
    for (var i=3; i<ArrayToSearch.length; i=i+6)
    {
      if (rows.value != "") // Check see if we need output more
        if (j >= rows.value)
          break;
      var found = false;
      if (searchName.checked)
      {
        if (ArrayToSearch[i].toLowerCase().indexOf(strSearch) != -1)
        {
          j++
            found = true;
        }
      }
      if(ArrayToSearch[i-1] == "" || ArrayToSearch[i-1] == null) ArrayToSearch[i-1] = "&nbsp;"
      if (searchBrief.checked && !found)
      {
        if (ArrayToSearch[i-1].toLowerCase().indexOf(strSearch) != -1)
        {
          j++
            found = true;
        }
      }
      if(ArrayToSearch[i+2] == "" || ArrayToSearch[i+2] == null) ArrayToSearch[i+2] = "&nbsp;"
      if (chkKeywords.checked && !found)
      {
        if (ArrayToSearch[i+2].toLowerCase().indexOf(strSearch) != -1)
        {
          j++
            found = true;
        }
      }
      if(found)
      {
        arrayOutput[arrayOutput.length] = "<tr valign='top'><td class='paddingNormal1'><a href='" + link3(membertype,ArrayToSearch[i]+ ArrayToSearch[i-3],ArrayToSearch[i-2],'') + "'>" + ArrayToSearch[i] + "</a></td><td class='paddingNormal1'>" + ArrayToSearch[i-1] + "</td><td class='paddingNormal2'>" + ArrayToSearch[i+1] + "</td></tr>";
      }
    }
  }
}

function ToSearchCookie(id, value)
{
	 expiresTemp = expires;
	 expires = expiresYear; // sets the global expire date for a cookie to one year
	 setMyCookie( cookieNameStay, 'search' + id, value );
	 expires = expiresTemp; // setting expires back to what it was before
}

function FromSearchCookie()
{
   var rowsNumberDefault = 15;

   var rowsNumber = rowsNumberDefault;
	  var chkName = false;
		var chkBrief = false;
		var chkKeywords = false;
		var chkClass = false;
		var chkMethod = false;
		var chkOthers = false;
		var chkIncSearch = true;

 	// Get cookie
 	var showStr = "";
 	var cookieStr = getCookie( cookieNameStay );
 	if( cookieStr != null) { // The cookie is found
  		rowsNumber = getCookieContent( cookieStr, 'search' + 'rowsNumber' );
	 	  chkName = getCookieContent( cookieStr, 'search' + 'chkName' );
		  chkBrief = getCookieContent( cookieStr, 'search' + 'chkBrief' );
		  chkKeywords = getCookieContent( cookieStr, 'search' + 'chkKeywords' );
		  chkClass = getCookieContent( cookieStr, 'search' + 'chkClass' );
		  chkMethod = getCookieContent( cookieStr, 'search' + 'chkMethod' );
		  chkOthers = getCookieContent( cookieStr, 'search' + 'chkOthers' );
		  chkIncSearch = getCookieContent( cookieStr, 'search' + 'chkIncSearch' );
	 }

  if(!rowsNumber) { rowsNumber = rowsNumberDefault; }
  if(!chkName) {chkName = 'true'} // set to 'true' if no cookie or content is found
  if(!chkClass) {chkClass = 'true'} // set to 'true' if no cookie or content is found

  document.getElementById("rowsNumber").value = rowsNumber;
  if(chkName == 'true') {document.getElementById("chkName").checked = true;}
  if(chkBrief == 'true') {document.getElementById("chkBrief").checked = true;}
  if(chkKeywords == 'true') {document.getElementById("chkKeywords").checked = true;}
  if(chkClass == 'true') {document.getElementById("chkClass").checked = true;}
  if(chkMethod == 'true') {document.getElementById("chkMethod").checked = true;}
  if(chkOthers == 'true') {document.getElementById("chkOthers").checked = true;}
  if(chkIncSearch == 'true') {document.getElementById("chkIncSearch").checked = true;}

}

// ----------------------
// --- Treeview Class ---
// ----------------------
// Google chrome does not read cookies as default from file://
// See http://code.google.com/p/chromium/issues/detail?id=535
// Can be enabled by running Chrome with command line switch: --enable-file-cookies
// i.e.: 'google-chrome --enable-file-cookies'
var g_trees = new Object(); 
function TreeClass (treeid, collapseExpandOnText, cookieDurationDays ) {
	var self = this;
	
	
	this.getNodeImageID=function( nodeIndex ) {
		return self.treeid + "nodeImageID_" + nodeIndex;
	}
	 	
	this.getIndexFromID=function( sID ) {
		var a = sID.split('_');
		return a[1];
	}
	
	this.setCookie=function(name, value, days){ 
		var expireDate = new Date();
		//set 'expstring' to either future or past date, to set or delete cookie, respectively
		var expstring=expireDate.setDate(expireDate.getDate()+parseInt(days));
		document.cookie = name + '=' + value + '; expires=' + expireDate.toGMTString() + '; path=/';
	}
	
	this.getCookie=function(name){ 
		var re=new RegExp(name+'=[^;]+', 'i'); //construct RE to search for target name/value pair
		if (document.cookie.match(re)) return document.cookie.match(re)[0].split('=')[1];
		return '';
	}

	this.getViewport=function()
	{
		var w;
		var h;
		// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
		if (typeof window.innerWidth != 'undefined') {
			w = window.innerWidth,
			h = window.innerHeight
		}
		// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
		else if (typeof document.documentElement != 'undefined'
			&& typeof document.documentElement.clientWidth !=
			'undefined' && document.documentElement.clientWidth != 0) {
			w = document.documentElement.clientWidth,
			h = document.documentElement.clientHeight
		}
		// older versions of IE
		else{
			w = document.getElementsByTagName('body')[0].clientWidth,
			h = document.getElementsByTagName('body')[0].clientHeight
		}
		return  { 'w':w, 'h':h }; 
	}

	
	this.rememberState=function(treeid, durationdays){ 
// // 		var aState=self.getState();
		var sState = self.aParentNodesState.join(',');
		sState = sState + '#' + self.getSelectedIndex();
		sState = sState + '#' + self.getTreeScrollPosition();
		self.setCookie(treeid, sState, durationdays); 
	}
	
	this.setDefaultParentNodesState=function(){ 
		self.collapseAll();
		var firstParentNode = document.getElementsByName(self.treeid + 'parentNodeImage_' + 0)[0]; 
		var aPath = firstParentNode.src.split("/");
		var sImgBaseName = aPath[aPath.length-1];
		sImgBaseName = sImgBaseName.replace("Plus.png", "");
		if ( self.m_iDefaultExpandedLevel == 1 ) {
			self.treeOnParentNodeImageClick( firstParentNode, sImgBaseName );
		}
	}
	
	this.readFromCookie=function(){ 
		self.m_sCookie = self.getCookie(self.treeid);
		if ( self.m_sCookie != '' ) {
			var aState = self.m_sCookie.split('#');
			self.aParentNodesState 		= aState[0].split(',');
			self.selectedNodeIndex 		= aState[1];
			self.iTreeScrollPosition 	= aState[2];
		}
	}
	
	this.readStateFromCookie=function(){ 
		this.setTreeScrollPosition(this.iTreeScrollPosition);
	}

	this.dotask=function(target, functionref, tasktype){ //assign a function to execute to an event handler (ie: onunload)
		var tasktype=(window.addEventListener)? tasktype : 'on'+tasktype;
		if (target.addEventListener) 	target.addEventListener(tasktype, functionref, false);
		else if (target.attachEvent)	target.attachEvent(tasktype, functionref);
	}

	this.setExpandCollapseNames=function( sExpandAll, sCollapseAll ) {
		if ( sExpandAll 	== undefined ) sExpandAll 	= 'Expand All';
		if ( sCollapseAll 	== undefined ) sCollapseAll = 'Collapse All';
		self.m_sExpandAll 	= sExpandAll;
		self.m_sCollapseAll	= sCollapseAll;
	}
	
	this.setSaveStateInCookie=function( bDoSaveState ) {
		self.m_bDoSaveState	= bDoSaveState;
	}
	
	// Use this function tyo set the treeheight delta to e.g. -100 if tree should have a height of less 
	// than total browser viewport height. If set to undefined the height is not set (in this case you could )
	// use the CSS '#TREEID_tree' property to set the height if needed or jus the function 
	this.setTreeHeightDelta=function( iTreeHeightDelta ) {
		self.m_iTreeHeightDelta	= iTreeHeightDelta;
	}

	this.setTreeHeight=function( iTreeHeight ) {
		self.m_iTreeHeight	= iTreeHeight;
	}
	
	
	this.treeOnParentNodeImageClick=function (node, parentImgBaseName) {
		var divNode = document.getElementById(node.name.replace(self.treeid + 'parentNodeImage_',self.treeid + 'parentNodeDiv_'));
		var imageNode = node;
		var iParentNodeIndex = self.getIndexFromID(node.name);
		if (divNode.style.display == 'none'){	// Do expand
			imageNode.src = parentImgBaseName + 'Minus.png';
			divNode.style.display = '';
			self.aParentNodesState[iParentNodeIndex] = 1;
		}
		else {	// Do collapse
			imageNode.src = parentImgBaseName + 'Plus.png';
			divNode.style.display = 'none';
			self.aParentNodesState[iParentNodeIndex] = 0;
		}
	}
	
	this.treeOnParentNodeTextClick=function ( node, parentImgBaseName) {
		var divNode = document.getElementById(node.name.replace(self.treeid + 'parentNodeText_',self.treeid + 'parentNodeDiv_'));
		var imageNode = document.getElementsByName(node.name.replace(self.treeid + 'parentNodeText_',self.treeid + 'parentNodeImage_'))[0];
		var iParentNodeIndex = self.getIndexFromID(node.name);
		if ( self.collapseExpandOnText ) {
			if (divNode.style.display == 'none'){	// Do expand
				imageNode.src = parentImgBaseName + 'Minus.png';
				divNode.style.display = '';
				self.aParentNodesState[iParentNodeIndex] = 1;
			}
			else {	// Do collapse
				imageNode.src = parentImgBaseName + 'Plus.png';
				divNode.style.display = 'none';
				self.aParentNodesState[iParentNodeIndex] = 0;
			}
		}
		self.resetSelectedNode();
	}
	
	this.onNodeTextClick=function (node, nodeImgBaseName) {
		var iIndexNew = self.getIndexFromID(node.name);
 		self.setSelectedNodeByIndex( iIndexNew );
	}
	
	this.onNodeImageClick=function (node, nodeImgBaseName){
		// for now we just return from here, since the page is not changed
		// when image is clicked, due to DoxyS more elaborate javascript for opening pages
		// Hopefully we can fix this later, but for now we disable 'marking' the clicked 
		// image to avoid confusion. user just need to click the actual link
		return;
// 		var imageNode = node
	}

	this.setTreeScrollPosition=function(iYPos) {
		var sTreeDivID = this.treeid + '_tree';
		document.getElementById(sTreeDivID).scrollTop = iYPos;
	}

	this.getTreeScrollPosition=function() {
		var sTreeDivID = this.treeid + '_tree';
		return document.getElementById(sTreeDivID).scrollTop;
	}
	
	this.resetSelectedNode=function (){
		var imageNodeOld = document.getElementById( self.getNodeImageID(self.selectedNodeIndex) );
 		if (imageNodeOld != undefined ) imageNodeOld.src = self.aNodeBaseNames[self.selectedNodeIndex] + 'Normal.png';
		self.selectedNodeIndex = -1;
	}
	
	this.setSelectedNodeByIndex=function ( imageNodeIndex ){
		if ( imageNodeIndex == -1 )	return;
		var imageNodeNew = document.getElementById( self.getNodeImageID(imageNodeIndex) );
		var imageNodeOld = document.getElementById( self.getNodeImageID(self.selectedNodeIndex) );
 		if (imageNodeOld != undefined ) imageNodeOld.src = self.aNodeBaseNames[self.selectedNodeIndex] + 'Normal.png';
		imageNodeNew.src = self.aNodeBaseNames[imageNodeIndex] + 'Selected.png';
		self.selectedNodeIndex = imageNodeIndex;
	}
	
	this.expandAll=function (){
		for (index = 0; index < self.parentNodeCount; index++) {
			document.getElementById(self.treeid + 'parentNodeDiv_' + index).style.display = '';
			document.getElementsByName(self.treeid + 'parentNodeImage_' + index)[0].src = self.aParentBaseNames[index] + 'Minus.png';     
			self.aParentNodesState[index] = 1;
		}
	}
	
	this.collapseAll=function (){
		for (index = 0; index < self.parentNodeCount; index++) {
			document.getElementById(self.treeid + 'parentNodeDiv_' + index).style.display = 'none';
			document.getElementsByName(self.treeid + 'parentNodeImage_' + index)[0].src = self.aParentBaseNames[index] + 'Plus.png';     
			self.aParentNodesState[index] = 0;
		}
	}
	
	this.setState=function (aState){
		for (index = 0; index < self.parentNodeCount; index++) {
			if ( aState[index] == '0' ) {
				document.getElementById(self.treeid + 'parentNodeDiv_' + index).style.display = 'none';
				document.getElementsByName(self.treeid + 'parentNodeImage_' + index)[0].src = self.aParentBaseNames[index] + 'Plus.png';     
				self.aParentNodesState[index] = 0;
			}
			else {
				document.getElementById(self.treeid + 'parentNodeDiv_' + index).style.display = '';
				document.getElementsByName(self.treeid + 'parentNodeImage_' + index)[0].src = self.aParentBaseNames[index] + 'Minus.png';     
				self.aParentNodesState[index] = 1;
			}
		}
	}
	
	this.getState=function(){
		var aState = Array();
		for (index = 0; index < self.parentNodeCount; index++) {
			if ( document.getElementById(self.treeid + 'parentNodeDiv_' + index).style.display == 'none' ) {
				aState[index] = '0';
			}
			else {
				aState[index] = '1';
			}
		}
		return aState;
	}
	
	this.getSelectedIndex=function(){
		return self.selectedNodeIndex;
	}

	
	this.startTree=function(bAddExpandCollapseAll){
		if ( bAddExpandCollapseAll == undefined ) bAddExpandCollapseAll = true;
		document.write('<div id="' + self.treeid + '" >' );
		if ( bAddExpandCollapseAll ) this.addExpandCollapseAll(self.m_sExpandAll, self.m_sCollapseAll);
		document.write('<div id="' + self.treeid + '_tree" style="overflow-y:auto; overflow-x:hidden; padding-right:20px;" >' );
		if ( this.m_bDoSaveState ) {
			this.readFromCookie();
		}
	}
	
	this.endTree=function(){
		document.write("</div></div>" );
		var divTreeObj = document.getElementById(this.treeid + '_tree');
		if ( self.m_iTreeHeight != undefined ) {
			divTreeObj.style.height = self.m_iTreeHeight + "px";
		}
		else {
			divTreeObj.style.height = this.getViewport().h + self.m_iTreeHeightDelta + "px";
		}
		
		var bDoSetDefaultTree = true;
		if ( this.m_bDoSaveState && this.m_sCookie != '' ) {
			//console.log("endTree scrollpos: " + this.iTreeScrollPosition );
			bDoSetDefaultTree = false;
  			this.setSelectedNodeByIndex(this.selectedNodeIndex);
			this.setTreeScrollPosition(this.iTreeScrollPosition);

		}
		
		if ( bDoSetDefaultTree )	this.setDefaultParentNodesState();
	}

	
	this.startParentNode=function(text, url, target, parentBaseName, objLinkAttribs ){
		if ( parentBaseName 					== undefined )	parentBaseName = 'treeParent';
		var aPath = parentBaseName.split('/');
		var parentClassName = aPath[aPath.length -1];
		
		if ( objLinkAttribs 					== undefined )	objLinkAttribs = new Object();
		
		document.write("<table border=\"0\" cellpadding=\"1\" cellspacing=\"0\">");
		document.write('  <tr>');
		document.write("    <td><img src=\"" + parentBaseName + "Plus.png\" name=\"" + self.treeid + "parentNodeImage_" + self.parentNodeCount + "\" onclick=\"g_trees['" + self.treeid + "'].treeOnParentNodeImageClick(this,'" + parentBaseName + "')\" style=\"cursor:pointer;\"/></td>");
		document.write("    <td nowrap ><a ");
		for ( var key in objLinkAttribs) {
			var sAttr = key + '="' + objLinkAttribs[key] + '" ';
 			document.write( sAttr );
		}
		document.write(" class=\"parentTreeNode " + parentClassName + "\" name=\"" + self.treeid + "parentNodeText_" + self.parentNodeCount + "\" onclick=\"g_trees['" + self.treeid + "'].treeOnParentNodeTextClick(this,'" + parentBaseName + "');\" href=\"" + url + "\" target=\"" + target + "\" class=\"normalTreeNode\" onfocus=\"this.hideFocus=true;\" style=\"outline-style:none;\">" + text );
		document.write('</a>');
		document.write('  </td>');
		document.write('  </tr>');
		document.write('  <tr>');
		document.write('    <td></td><!-- SPACING -->');
		
 		var bExpand = false;
		if ( self.m_bDoSaveState ) {
			var iExpand = self.aParentNodesState[self.parentNodeCount];
			if ( iExpand == 1 ) bExpand = true;
		}
		if (bExpand ) 	document.write("	<td><DIV id=\"" + self.treeid + "parentNodeDiv_" + self.parentNodeCount + "\" style=\"\">" );	
		else			document.write("	<td><DIV id=\"" + self.treeid + "parentNodeDiv_" + self.parentNodeCount + "\" style=\"display:none\">" );	
		self.aParentBaseNames[self.parentNodeCount] = parentBaseName;
		self.parentNodeCount = self.parentNodeCount + 1;
	}
	
	this.endParentNode=function(){
		document.write('</DIV></td>');
		document.write('  </tr>');
		document.write('</table>');
	}
	
	this.addNode=function(text, url, target, nodeBaseName, objLinkAttribs  ){
		if ( nodeBaseName 					== undefined )	nodeBaseName = 'treeNode';
		var aPath = nodeBaseName.split('/');
		var nodeClassName = aPath[aPath.length -1];
		var sNodeImgID = self.getNodeImageID(self.nodeCount);
		
		if ( objLinkAttribs 					== undefined )	objLinkAttribs = new Object();
		document.write("<table border=\"0\" cellpadding=\"1\" cellspacing=\"0\">");
		document.write('  <tr>');
		document.write('	<td>');
		document.write('<a href="' + url + '" target="' + target + '" onfocus="this.hideFocus=true;" style="outline-style:none;">');
// 		document.write("<img src=\"" + nodeBaseName + "Normal.png\" border=\"0\" name=\"" + self.treeid + "nodeImage_" + self.nodeCount + "\" onclick=\"g_trees['" + self.treeid + "'].onNodeImageClick(this,'" + nodeBaseName + "');\" />");
 		document.write("<img id=\"" + sNodeImgID + "\"");
// Does not make the page open on image click .. :|
// 		for ( var key in objLinkAttribs) {
// 			var sAttr = key + '="' + objLinkAttribs[key] + '" ';
//  			document.write( sAttr );
// 		}
		document.write(" src=\"" + nodeBaseName + "Normal.png\" border=\"0\" name=\"" + self.treeid + "nodeImage_" + self.nodeCount + "\" onclick=\"g_trees['" + self.treeid + "'].onNodeImageClick(this,'" + nodeBaseName + "');\" />");
		
		document.write('</a>');
		document.write('	</td>');
		document.write("    <td nowrap ><a ");
		for ( var key in objLinkAttribs) {
			var sAttr = key + '="' + objLinkAttribs[key] + '" ';
 			document.write( sAttr );
		}
		document.write(" name=\"" + self.treeid + "nodeText_" + self.nodeCount + "\" onclick=\"g_trees['" + self.treeid + "'].onNodeTextClick(this,'" + nodeBaseName + "');\" href=\"" + url + "\" target=\"" + target + "\" class=\"normalTreeNode " + nodeClassName + "\" onfocus=\"this.hideFocus=true;\" style=\"outline-style:none;\">" + text + "</a></td>");
		document.write('  </tr>');
		document.write('</table>');
		self.aNodeBaseNames[self.nodeCount] = nodeBaseName;
		self.nodeCount = self.nodeCount + 1;
	}
	
	this.addExpandCollapseAll=function (sExpandAll, sCollapseAll){
		document.write("<table width=\"99%\" border=\"0\">");	// If we use 100% here then right border of menu disappears in IE!
		document.write('  <tr>');
		document.write("    <td nowrap align=\"left\" width=\"auto\"><a onclick=\"g_trees['" + self.treeid + "'].expandAll();\" class=\"expandCollapse\" style=\"cursor:pointer;\">" + sExpandAll + "</a></td>");
		document.write("    <td width=\"20%\" </td>");
		document.write("    <td nowrap align=\"right\" width=\"auto\"><a onclick=\"g_trees['" + self.treeid + "'].collapseAll();\" class=\"expandCollapse\" style=\"cursor:pointer;\">" + sCollapseAll + "</a></td>");
		document.write("    <td width=\"80%\" </td>");
		document.write('  </tr>');
		document.write('</table>');  
	}

	this.treeid = treeid;
	this.m_iTreeHeightDelta = 0;
	this.m_iTreeHeight = undefined;
	if ( cookieDurationDays == undefined ) cookieDurationDays = 1;
	if ( collapseExpandOnText == undefined ) collapseExpandOnText = true;
	this.cookieDurationDays				= cookieDurationDays;
	this.collapseExpandOnText			= collapseExpandOnText;
	this.parentNodeCount					= 0;
	this.nodeCount								= 0;
	this.aParentBaseNames 				= new Array(); 
	this.aNodeBaseNames 					= new Array(); 
		
	// State information 	
	this.aParentNodesState 				= new Array(); 
	this.selectedNodeIndex  			= -1;
	this.iTreeScrollPosition			= 0;
	this.m_bDoSaveState						= true;
	this.m_sCookie								= '';
	this.m_iDefaultExpandedLevel	= 1;	
	g_trees[treeid] = this;
	
	self.dotask(window, function(){ self.rememberState(treeid, self.cookieDurationDays)}, 'unload');
	self.dotask(window, function(){ self.readStateFromCookie()}, 'load');
}


function overLibDiagram() {
ol_css=CSSSTYLE;
ol_textfont="Courier,Arial,Verdana,Helvetica";
ol_textfont="Arial,Verdana,Helvetica";
ol_textcolor="#000000";
ol_textsize="12"; //px.
ol_textdecoration="none";
ol_textstyle="normal";
ol_textweight="normal";
ol_captionfont="Arial,Verdana,Helvetica";
ol_capcolor="#000000";
ol_captionsize="12"; //px.
ol_captiondecoration="none";
ol_captionstyle="normal";
ol_captionweight="bold";
ol_captionweight="normal";
ol_capbgcolor="#acd";
ol_fgcolor="#ddd";
ol_bgcolor="#000";
ol_hpos=8
ol_offsetx=0
ol_hauto="on";
ol_vauto="on";
ol_width=0;
ol_height=0;
}
function overLibLeftMenu() {
ol_css=CSSSTYLE;
ol_textfont="Arial,Verdana,Helvetica";
ol_textcolor="#000000";
ol_textsize="12"; //px.
ol_textdecoration="none";
ol_textstyle="normal";
ol_textweight="normal";
ol_fgcolor="#ddd";
ol_bgcolor="#000";
ol_hpos=8
ol_offsetx=0
ol_hauto="on";
ol_vauto="on";
ol_width=0;
ol_height=0;
}
function overLibHelp() {
ol_css=CSSSTYLE;
ol_textfont="Arial,Verdana,Helvetica";
ol_textcolor="#000000";
ol_textsize="12"; //px.
ol_textdecoration="none";
ol_textstyle="normal";
ol_textweight="normal";
ol_fgcolor="#ddd";
ol_bgcolor="#000";
ol_hpos=7
ol_offsetx=190
ol_width=0;
ol_height=0;
}
function overLibGeneratedByDoxyS() {
ol_css=CSSSTYLE;
ol_textfont="Arial,Verdana,Helvetica";
ol_textcolor="#000000";
ol_textsize="12"; //px.
ol_textdecoration="none";
ol_textstyle="normal";
ol_textweight="normal";
ol_fgcolor="#ddd";
ol_bgcolor="#000";
ol_hpos=7
ol_vpos=35
ol_offsetx=157
ol_width=0;
ol_height=0;
}
//\//////////////////////////////////////////////////////////////////////////////////
//\  overLIB 3.51  --  This notice must remain untouched at all times.
//\  Copyright Erik Bosrup 1998-2002. All rights reserved.
//\
//\  By Erik Bosrup (erik@bosrup.com).  Last modified 2002-11-01.
//\  Portions by Dan Steinman (dansteinman.com). Additions by other people are
//\  listed on the overLIB homepage.
//\
//\  Get the latest version at http://www.bosrup.com/web/overlib/
//\
//\  This script is published under an open source license. Please read the license
//\  agreement online at: http://www.bosrup.com/web/overlib/license.html
//\  If you have questions regarding the license please contact erik@bosrup.com.
//\
//\  This script library was originally created for personal use. By request it has
//\  later been made public. This is free software. Do not sell this as your own
//\  work, or remove this copyright notice. For full details on copying or changing
//\  this script please read the license agreement at the link above.
//\
//\  Please give credit on sites that use overLIB and submit changes of the script
//\  so other people can use them as well. This script is free to use, don't abuse.
//\//////////////////////////////////////////////////////////////////////////////////

//\  THIS IS A VERY MODIFIED VERSION. DO NOT EDIT OR PUBLISH. GET THE ORIGINAL!

var INARRAY=1;
var CAPARRAY=2;
var STICKY=3;
var BACKGROUND=4;
var NOCLOSE=5;
var CAPTION=6;
var LEFT=7;
var RIGHT=8;
var CENTER=9;
var OFFSETX=10;
var OFFSETY=11;
var FGCOLOR=12;
var BGCOLOR=13;
var TEXTCOLOR=14;
var CAPCOLOR=15;
var CLOSECOLOR=16;
var WIDTH=17;
var BORDER=18;
var STATUS=19;
var AUTOSTATUS=20;
var AUTOSTATUSCAP=21;
var HEIGHT=22;
var CLOSETEXT=23;
var SNAPX=24;
var SNAPY=25;
var FIXX=26;
var FIXY=27;
var FGBACKGROUND=28;
var BGBACKGROUND=29;
var PADX=30;// PADX2 out
var PADY=31;// PADY2 out
var FULLHTML=34;
var ABOVE=35;
var BELOW=36;
var CAPICON=37;
var TEXTFONT=38;
var CAPTIONFONT=39;
var CLOSEFONT=40;
var TEXTSIZE=41;
var CAPTIONSIZE=42;
var CLOSESIZE=43;
var FRAME=44;
var TIMEOUT=45;
var FUNCTION=46;
var DELAY=47;
var HAUTO=48;
var VAUTO=49;
var CLOSECLICK=50;
var CSSOFF=51;
var CSSSTYLE=52;
var CSSCLASS=53;
var FGCLASS=54;
var BGCLASS=55;
var TEXTFONTCLASS=56;
var CAPTIONFONTCLASS=57;
var CLOSEFONTCLASS=58;
var PADUNIT=59;
var HEIGHTUNIT=60;
var WIDTHUNIT=61;
var TEXTSIZEUNIT=62;
var TEXTDECORATION=63;
var TEXTSTYLE=64;
var TEXTWEIGHT=65;
var CAPTIONSIZEUNIT=66;
var CAPTIONDECORATION=67;
var CAPTIONSTYLE=68;
var CAPTIONWEIGHT=69;
var CLOSESIZEUNIT=70;
var CLOSEDECORATION=71;
var CLOSESTYLE=72;
var CLOSEWEIGHT=73;
var CAPBGCOLOR=74;
if(typeof ol_fgcolor=='undefined'){var ol_fgcolor="#CCCCFF";}
if(typeof ol_bgcolor=='undefined'){var ol_bgcolor="#333399";}
if(typeof ol_capbgcolor=='undefined'){var ol_capbgcolor="#333399";}
if(typeof ol_textcolor=='undefined'){var ol_textcolor="#000000";}
if(typeof ol_capcolor=='undefined'){var ol_capcolor="#FFFFFF";}
if(typeof ol_closecolor=='undefined'){var ol_closecolor="#9999FF";}
if(typeof ol_textfont=='undefined'){var ol_textfont="Verdana,Arial,Helvetica";}
if(typeof ol_captionfont=='undefined'){var ol_captionfont="Verdana,Arial,Helvetica";}
if(typeof ol_closefont=='undefined'){var ol_closefont="Verdana,Arial,Helvetica";}
if(typeof ol_textsize=='undefined'){var ol_textsize="1";}
if(typeof ol_captionsize=='undefined'){var ol_captionsize="1";}
if(typeof ol_closesize=='undefined'){var ol_closesize="1";}
if(typeof ol_width=='undefined'){var ol_width="200";}
if(typeof ol_border=='undefined'){var ol_border="1";}
if(typeof ol_offsetx=='undefined'){var ol_offsetx=10;}
if(typeof ol_offsety=='undefined'){var ol_offsety=10;}
if(typeof ol_text=='undefined'){var ol_text="Default Text";}
if(typeof ol_cap=='undefined'){var ol_cap="";}
if(typeof ol_sticky=='undefined'){var ol_sticky=0;}
if(typeof ol_background=='undefined'){var ol_background="";}
if(typeof ol_close=='undefined'){var ol_close="Close";}
if(typeof ol_hpos=='undefined'){var ol_hpos=8;}
if(typeof ol_status=='undefined'){var ol_status="";}
if(typeof ol_autostatus=='undefined'){var ol_autostatus=0;}
if(typeof ol_height=='undefined'){var ol_height=-1;}
if(typeof ol_snapx=='undefined'){var ol_snapx=0;}
if(typeof ol_snapy=='undefined'){var ol_snapy=0;}
if(typeof ol_fixx=='undefined'){var ol_fixx=-1;}
if(typeof ol_fixy=='undefined'){var ol_fixy=-1;}
if(typeof ol_fgbackground=='undefined'){var ol_fgbackground="";}
if(typeof ol_bgbackground=='undefined'){var ol_bgbackground="";}
if(typeof ol_padxl=='undefined'){var ol_padxl=1;}
if(typeof ol_padxr=='undefined'){var ol_padxr=1;}
if(typeof ol_padyt=='undefined'){var ol_padyt=1;}
if(typeof ol_padyb=='undefined'){var ol_padyb=1;}
if(typeof ol_fullhtml=='undefined'){var ol_fullhtml=0;}
if(typeof ol_vpos=='undefined'){var ol_vpos=36;}
if(typeof ol_aboveheight=='undefined'){var ol_aboveheight=0;}
if(typeof ol_capicon=='undefined'){var ol_capicon="";}
if(typeof ol_frame=='undefined'){var ol_frame=self;}
if(typeof ol_timeout=='undefined'){var ol_timeout=0;}
if(typeof ol_function=='undefined'){var ol_function=null;}
if(typeof ol_delay=='undefined'){var ol_delay=0;}
if(typeof ol_hauto=='undefined'){var ol_hauto=0;}
if(typeof ol_vauto=='undefined'){var ol_vauto=0;}
if(typeof ol_closeclick=='undefined'){var ol_closeclick=0;}
if(typeof ol_css=='undefined'){var ol_css=51;}
if(typeof ol_fgclass=='undefined'){var ol_fgclass="";}
if(typeof ol_bgclass=='undefined'){var ol_bgclass="";}
if(typeof ol_textfontclass=='undefined'){var ol_textfontclass="";}
if(typeof ol_captionfontclass=='undefined'){var ol_captionfontclass="";}
if(typeof ol_closefontclass=='undefined'){var ol_closefontclass="";}
if(typeof ol_padunit=='undefined'){var ol_padunit="px";}
if(typeof ol_heightunit=='undefined'){var ol_heightunit="px";}
if(typeof ol_widthunit=='undefined'){var ol_widthunit="px";}
if(typeof ol_textsizeunit=='undefined'){var ol_textsizeunit="px";}
if(typeof ol_textdecoration=='undefined'){var ol_textdecoration="none";}
if(typeof ol_textstyle=='undefined'){var ol_textstyle="normal";}
if(typeof ol_textweight=='undefined'){var ol_textweight="normal";}
if(typeof ol_captionsizeunit=='undefined'){var ol_captionsizeunit="px";}
if(typeof ol_captiondecoration=='undefined'){var ol_captiondecoration="none";}
if(typeof ol_captionstyle=='undefined'){var ol_captionstyle="normal";}
if(typeof ol_captionweight=='undefined'){var ol_captionweight="bold";}
if(typeof ol_closesizeunit=='undefined'){var ol_closesizeunit="px";}
if(typeof ol_closedecoration=='undefined'){var ol_closedecoration="none";}
if(typeof ol_closestyle=='undefined'){var ol_closestyle="normal";}
if(typeof ol_closeweight=='undefined'){var ol_closeweight="normal";}
if(typeof ol_texts=='undefined'){var ol_texts=new Array("Text 0", "Text 1");}
if(typeof ol_caps=='undefined'){var ol_caps=new Array("Caption 0", "Caption 1");}
var otext="";
var ocap="";
var osticky=0;
var obackground="";
var oclose="Close";
var ohpos=7;
var ooffsetx=2;
var ooffsety=2;
var ofgcolor="";
var obgcolor="";
var ocapbgcolor="";
var otextcolor="";
var ocapcolor="";
var oclosecolor="";
var owidth=100;
var oborder=1;
var ostatus="";
var oautostatus=0;
var oheight=-1;
var osnapx=0;
var osnapy=0;
var ofixx=-1;
var ofixy=-1;
var ofgbackground="";
var obgbackground="";
var opadxl=0;
var opadxr=0;
var opadyt=0;
var opadyb=0;
var ofullhtml=0;
var ovpos=36;
var oaboveheight=0;
var ocapicon="";
var otextfont="Verdana,Arial,Helvetica";
var ocaptionfont="Verdana,Arial,Helvetica";
var oclosefont="Verdana,Arial,Helvetica";
var otextsize="1";
var ocaptionsize="1";
var oclosesize="1";
var oframe=self;
var otimeout=0;
var otimerid=0;
var oallowmove=0;
var ofunction=null;
var odelay=0;
var odelayid=0;
var ohauto=0;
var ovauto=0;
var ocloseclick=0;
var ocss=51;
var ofgclass="";
var obgclass="";
var otextfontclass="";
var ocaptionfontclass="";
var oclosefontclass="";
var opadunit="px";
var oheightunit="px";
var owidthunit="px";
var otextsizeunit="px";
var otextdecoration="";
var otextstyle="";
var otextweight="";
var ocaptionsizeunit="px";
var ocaptiondecoration="";
var ocaptionstyle="";
var ocaptionweight="";
var oclosesizeunit="px";
var oclosedecoration="";
var oclosestyle="";
var ocloseweight="";
var ox=0;
var oy=0;
var oallow=0;
var oshowingsticky=0;
var oremovecounter=0;
var over=null;
var fnRef;
var ns4=(navigator.appName=='Netscape' && parseInt(navigator.appVersion)==4);
var ns6=(document.getElementById)? true:false;
var ie4=(document.all)? true:false;
if(ie4)var docRoot='document.body';
var ie5=false;
if(ns4){
var oW=window.innerWidth;
var oH=window.innerHeight;
window.onresize=function(){if(oW!=window.innerWidth||oH!=window.innerHeight)location.reload();}
}
if(ie4){
if((navigator.userAgent.indexOf('MSIE 5')> 0)||(navigator.userAgent.indexOf('MSIE 6')> 0)){
if(document.compatMode && document.compatMode=='CSS1Compat')docRoot='document.documentElement';
ie5=true;
}
if(ns6){
ns6=false;
}
}
if((ns4)||(ie4)||(ns6)){
document.onmousemove=mouseMove
if(ns4)document.captureEvents(Event.MOUSEMOVE)
}else{
overlib=no_overlib;
nd=no_overlib;
ver3fix=true;
}
function no_overlib(){
return ver3fix;
}
function overlib(){
otext=ol_text;
ocap=ol_cap;
osticky=ol_sticky;
obackground=ol_background;
oclose=ol_close;
ohpos=ol_hpos;
ooffsetx=ol_offsetx;
ooffsety=ol_offsety;
ofgcolor=ol_fgcolor;
obgcolor=ol_bgcolor;
ocapbgcolor=ol_capbgcolor;
otextcolor=ol_textcolor;
ocapcolor=ol_capcolor;
oclosecolor=ol_closecolor;
owidth=ol_width;
oborder=ol_border;
ostatus=ol_status;
oautostatus=ol_autostatus;
oheight=ol_height;
osnapx=ol_snapx;
osnapy=ol_snapy;
ofixx=ol_fixx;
ofixy=ol_fixy;
ofgbackground=ol_fgbackground;
obgbackground=ol_bgbackground;
opadxl=ol_padxl;
opadxr=ol_padxr;
opadyt=ol_padyt;
opadyb=ol_padyb;
ofullhtml=ol_fullhtml;
ovpos=ol_vpos;
oaboveheight=ol_aboveheight;
ocapicon=ol_capicon;
otextfont=ol_textfont;
ocaptionfont=ol_captionfont;
oclosefont=ol_closefont;
otextsize=ol_textsize;
ocaptionsize=ol_captionsize;
oclosesize=ol_closesize;
otimeout=ol_timeout;
ofunction=ol_function;
odelay=ol_delay;
ohauto=ol_hauto;
ovauto=ol_vauto;
ocloseclick=ol_closeclick;
ocss=ol_css;
ofgclass=ol_fgclass;
obgclass=ol_bgclass;
otextfontclass=ol_textfontclass;
ocaptionfontclass=ol_captionfontclass;
oclosefontclass=ol_closefontclass;
opadunit=ol_padunit;
oheightunit=ol_heightunit;
owidthunit=ol_widthunit;
otextsizeunit=ol_textsizeunit;
otextdecoration=ol_textdecoration;
otextstyle=ol_textstyle;
otextweight=ol_textweight;
ocaptionsizeunit=ol_captionsizeunit;
ocaptiondecoration=ol_captiondecoration;
ocaptionstyle=ol_captionstyle;
ocaptionweight=ol_captionweight;
oclosesizeunit=ol_closesizeunit;
oclosedecoration=ol_closedecoration;
oclosestyle=ol_closestyle;
ocloseweight=ol_closeweight;
fnRef='';
if((ns4)||(ie4)||(ns6)){
if(over)cClick();
oframe=ol_frame;
if(ns4)over=oframe.document.overDiv
if(ie4)over=oframe.overDiv.style
if(ns6)over=oframe.document.getElementById("overDiv");
}
var c=-1, udf, v=null;
var ar=arguments;
udf=(!ar.length ? 1 : 0);
for(i=0;i < ar.length;i++){
if(c < 0){
if(typeof ar[i]=='number'){
udf=(ar[i]==46 ? 0 : 1);
i--;
}else{
otext=ar[i];
}
c=0;
}else{
if(ar[i]==1){udf=0;otext=ol_texts[ar[++i]];continue;}
if(ar[i]==2){ocap=ol_caps[ar[++i]];continue;}
if(ar[i]==3){osticky=1;continue;}
if(ar[i]==4){obackground=ar[++i];continue;}
if(ar[i]==NOCLOSE){oclose="";continue;}
if(ar[i]==6){ocap=ar[++i];continue;}
if(ar[i]==9 || ar[i]==7 || ar[i]==8){ohpos=ar[i];continue;}
if(ar[i]==10){ooffsetx=ar[++i];continue;}
if(ar[i]==11){ooffsety=ar[++i];continue;}
if(ar[i]==12){ofgcolor=ar[++i];continue;}
if(ar[i]==13){obgcolor=ar[++i];continue;}
if(ar[i]==14){otextcolor=ar[++i];continue;}
if(ar[i]==15){ocapcolor=ar[++i];continue;}
if(ar[i]==16){oclosecolor=ar[++i];continue;}
if(ar[i]==17){owidth=ar[++i];continue;}
if(ar[i]==18){oborder=ar[++i];continue;}
if(ar[i]==19){ostatus=ar[++i];continue;}
if(ar[i]==20){oautostatus=(oautostatus==1)? 0 : 1;continue;}
if(ar[i]==21){oautostatus=(oautostatus==2)? 0 : 2;continue;}
if(ar[i]==22){oheight=ar[++i];oaboveheight=ar[i];continue;}// Same param again.
if(ar[i]==23){oclose=ar[++i];continue;}
if(ar[i]==24){osnapx=ar[++i];continue;}
if(ar[i]==25){osnapy=ar[++i];continue;}
if(ar[i]==26){ofixx=ar[++i];continue;}
if(ar[i]==27){ofixy=ar[++i];continue;}
if(ar[i]==28){ofgbackground=ar[++i];continue;}
if(ar[i]==29){obgbackground=ar[++i];continue;}
if(ar[i]==30){opadxl=ar[++i];opadxr=ar[++i];continue;}
if(ar[i]==31){opadyt=ar[++i];opadyb=ar[++i];continue;}
if(ar[i]==34){ofullhtml=1;continue;}
if(ar[i]==36 || ar[i]==35){ovpos=ar[i];continue;}
if(ar[i]==37){ocapicon=ar[++i];continue;}
if(ar[i]==38){otextfont=ar[++i];continue;}
if(ar[i]==39){ocaptionfont=ar[++i];continue;}
if(ar[i]==40){oclosefont=ar[++i];continue;}
if(ar[i]==41){otextsize=ar[++i];continue;}
if(ar[i]==42){ocaptionsize=ar[++i];continue;}
if(ar[i]==43){oclosesize=ar[++i];continue;}
if(ar[i]==44){opt_FRAME(ar[++i]);continue;}
if(ar[i]==45){otimeout=ar[++i];continue;}
if(ar[i]==46){udf=0;if(typeof ar[i+1] !='number')v=ar[++i];opt_FUNCTION(v);continue;}
if(ar[i]==47){odelay=ar[++i];continue;}
if(ar[i]==48){ohauto=(ohauto==0)? 1 : 0;continue;}
if(ar[i]==49){ovauto=(ovauto==0)? 1 : 0;continue;}
if(ar[i]==50){ocloseclick=(ocloseclick==0)? 1 : 0;continue;}
if(ar[i]==51){ocss=ar[i];continue;}
if(ar[i]==52){ocss=ar[i];continue;}
if(ar[i]==53){ocss=ar[i];continue;}
if(ar[i]==54){ofgclass=ar[++i];continue;}
if(ar[i]==55){obgclass=ar[++i];continue;}
if(ar[i]==56){otextfontclass=ar[++i];continue;}
if(ar[i]==57){ocaptionfontclass=ar[++i];continue;}
if(ar[i]==58){oclosefontclass=ar[++i];continue;}
if(ar[i]==59){opadunit=ar[++i];continue;}
if(ar[i]==60){oheightunit=ar[++i];continue;}
if(ar[i]==61){owidthunit=ar[++i];continue;}
if(ar[i]==62){otextsizeunit=ar[++i];continue;}
if(ar[i]==63){otextdecoration=ar[++i];continue;}
if(ar[i]==64){otextstyle=ar[++i];continue;}
if(ar[i]==65){otextweight=ar[++i];continue;}
if(ar[i]==66){ocaptionsizeunit=ar[++i];continue;}
if(ar[i]==67){ocaptiondecoration=ar[++i];continue;}
if(ar[i]==68){ocaptionstyle=ar[++i];continue;}
if(ar[i]==69){ocaptionweight=ar[++i];continue;}
if(ar[i]==70){oclosesizeunit=ar[++i];continue;}
if(ar[i]==71){oclosedecoration=ar[++i];continue;}
if(ar[i]==72){oclosestyle=ar[++i];continue;}
if(ar[i]==73){ocloseweight=ar[++i];continue;}
if(ar[i]==74){ocapbgcolor=ar[++i];continue;}
}
}
if(udf && ofunction)otext=ofunction();
if(odelay==0){
return overlib351();
}else{
odelayid=setTimeout("overlib351()", odelay);
return false;
}
}
function nd(){
if(oremovecounter >=1){oshowingsticky=0};
if((ns4)||(ie4)||(ns6)){
if(oshowingsticky==0){
oallowmove=0;
if(over !=null)hideObject(over);
}else{
oremovecounter++;
}
}
return true;
}
function overlib351(){
var layerhtml;
if(obackground !="" || ofullhtml){
layerhtml=ol_content_background(otext, obackground, ofullhtml);
}else{
if(ofgbackground !="" && ocss==CSSOFF){
ofgbackground="BACKGROUND=\""+ofgbackground+"\"";
}
if(obgbackground !="" && ocss==CSSOFF){
obgbackground="BACKGROUND=\""+obgbackground+"\"";
}
if(ofgcolor !="" && ocss==CSSOFF){
ofgcolor="BGCOLOR=\""+ofgcolor+"\"";
}
if(obgcolor !="" && ocss==CSSOFF){
obgcolor="BGCOLOR=\""+obgcolor+"\"";
}
if(oheight > 0 && ocss==51){
oheight="HEIGHT=" + oheight;
}else{
oheight="";
}
if(ocap==""){
layerhtml=ol_content_simple(otext);
}else{
if(osticky){
layerhtml=ol_content_caption(otext, ocap, oclose);
}else{
layerhtml=ol_content_caption(otext, ocap, "");
}
}
}
if(osticky){
if(otimerid > 0){
clearTimeout(otimerid);
otimerid=0;
}
oshowingsticky=1;
oremovecounter=0;
}
layerWrite(layerhtml);
if(oautostatus > 0){
ostatus=otext;
if(oautostatus > 1){
ostatus=ocap;
}
}
oallowmove=0;
if(otimeout > 0){
if(otimerid > 0)clearTimeout(otimerid);
otimerid=setTimeout("cClick()", otimeout);
}
disp(ostatus);
if(osticky)oallowmove=0;
return(ostatus !='');
}
function ol_content_simple(text){
if(ocss==CSSCLASS)txt="<TABLE WIDTH="+owidth+" BORDER=0 CELLPADDING="+oborder+" CELLSPACING=0 class=\""+obgclass+"\"><TR><TD><TABLE WIDTH=100% BORDER=0 CELLPADDING=2 CELLSPACING=0 class=\""+ofgclass+"\"><TR><TD VALIGN=TOP><FONT class=\""+otextfontclass+"\">"+text+"</FONT></TD></TR></TABLE></TD></TR></TABLE>";
if(ocss==CSSSTYLE)txt="<TABLE WIDTH="+owidth+" BORDER=0 CELLPADDING="+oborder+" CELLSPACING=0 style=\"background-color: "+obgcolor+";height: "+oheight+oheightunit+";\"><TR><TD><TABLE WIDTH=100% BORDER=0 CELLPADDING=2 CELLSPACING=0 style=\"color: "+ofgcolor+";background-color: "+ofgcolor+";height: "+oheight+oheightunit+";\"><TR><TD VALIGN=TOP><FONT style=\"font-family: "+otextfont+";color: "+otextcolor+";font-size: "+otextsize+otextsizeunit+";text-decoration: "+otextdecoration+";font-weight: "+otextweight+";font-style:"+otextstyle+"\">"+text+"</FONT></TD></TR></TABLE></TD></TR></TABLE>";
if(ocss==CSSOFF)txt="<TABLE WIDTH="+owidth+" BORDER=0 CELLPADDING="+oborder+" CELLSPACING=0 "+obgcolor+" "+oheight+"><TR><TD><TABLE WIDTH=100% BORDER=0 CELLPADDING=2 CELLSPACING=0 "+ofgcolor+" "+ofgbackground+" "+oheight+"><TR><TD VALIGN=TOP><FONT FACE=\""+otextfont+"\" COLOR=\""+otextcolor+"\" SIZE=\""+otextsize+"\">"+text+"</FONT></TD></TR></TABLE></TD></TR></TABLE>";
set_background("");
return txt;
}
function ol_content_caption(text, title, close){
closing="";
closeevent="onMouseOver";
if(ocloseclick==1)closeevent="onClick";
if(ocapicon !="")ocapicon="<IMG SRC=\""+ocapicon+"\"> ";
if(close !=""){
if(ocss==CSSCLASS)closing="<TD ALIGN=RIGHT><A HREF=\"javascript:return "+fnRef+"cClick();\" "+closeevent+"=\"return " + fnRef + "cClick();\" class=\""+oclosefontclass+"\">"+close+"</A></TD>";
if(ocss==CSSSTYLE)closing="<TD ALIGN=RIGHT><A HREF=\"javascript:return "+fnRef+"cClick();\" "+closeevent+"=\"return " + fnRef + "cClick();\" style=\"color: "+oclosecolor+";font-family: "+oclosefont+";font-size: "+oclosesize+oclosesizeunit+";text-decoration: "+oclosedecoration+";font-weight: "+ocloseweight+";font-style:"+oclosestyle+";\">"+close+"</A></TD>";
if(ocss==CSSOFF)closing="<TD ALIGN=RIGHT><A HREF=\"javascript:return "+fnRef+"cClick();\" "+closeevent+"=\"return " + fnRef + "cClick();\"><FONT COLOR=\""+oclosecolor+"\" FACE=\""+oclosefont+"\" SIZE=\""+oclosesize+"\">"+close+"</FONT></A></TD>";
}
if(ocss==CSSCLASS)txt="<TABLE WIDTH="+owidth+" BORDER=0 CELLPADDING="+oborder+" CELLSPACING=0 class=\""+obgclass+"\"><TR><TD><TABLE WIDTH=100% BORDER=0 CELLPADDING=0 CELLSPACING=0><TR><TD><FONT class=\""+ocaptionfontclass+"\">"+ocapicon+title+"</FONT></TD>"+closing+"</TR></TABLE><TABLE WIDTH=100% BORDER=0 CELLPADDING=2 CELLSPACING=0 class=\""+ofgclass+"\"><TR><TD VALIGN=TOP><FONT class=\""+otextfontclass+"\">"+text+"</FONT></TD></TR></TABLE></TD></TR></TABLE>";
if(ocss==CSSSTYLE)txt="<TABLE WIDTH="+owidth+" BORDER=0 CELLPADDING="+oborder+" CELLSPACING=0 style=\"background-color: "+obgcolor+";background-image: url("+obgbackground+");height: "+oheight+oheightunit+";\"><TR><TD><TABLE WIDTH=100% BORDER=0 CELLPADDING=1 CELLSPACING=0 style=\"background-color: "+ocapbgcolor+";\"><TR><TD><FONT style=\"font-family: "+ocaptionfont+";color: "+ocapcolor+";font-size: "+ocaptionsize+ocaptionsizeunit+";font-weight: "+ocaptionweight+";font-style: "+ocaptionstyle+";text-decoration: " + ocaptiondecoration + ";\">"+ocapicon+title+"</FONT></TD>"+closing+"</TR></TABLE><TABLE HEIGHT=1 WIDTH=100% BORDER=0 CELLPADDING=0 CELLSPACING=0 style=\"background-color: "+obgcolor+";\"><TR><TD HEIGHT=1></TD></TR></TABLE><TABLE WIDTH=100% BORDER=0 CELLPADDING=2 CELLSPACING=0 style=\"color: "+ofgcolor+";background-color: "+ofgcolor+";height: "+oheight+oheightunit+";\"><TR><TD VALIGN=TOP><FONT style=\"font-family: "+otextfont+";color: "+otextcolor+";font-size: "+otextsize+otextsizeunit+";text-decoration: "+otextdecoration+";font-weight: "+otextweight+";font-style:"+otextstyle+"\">"+text+"</FONT></TD></TR></TABLE></TD></TR></TABLE>";
if(ocss==CSSOFF)txt="<TABLE WIDTH="+owidth+" BORDER=0 CELLPADDING="+oborder+" CELLSPACING=0 "+obgcolor+" "+obgbackground+" "+oheight+"><TR><TD><TABLE WIDTH=100% BORDER=0 CELLPADDING=0 CELLSPACING=0><TR><TD><B><FONT COLOR=\""+ocapcolor+"\" FACE=\""+ocaptionfont+"\" SIZE=\""+ocaptionsize+"\">"+ocapicon+title+"</FONT></B></TD>"+closing+"</TR></TABLE><TABLE WIDTH=100% BORDER=0 CELLPADDING=2 CELLSPACING=0 "+ofgcolor+" "+ofgbackground+" "+oheight+"><TR><TD VALIGN=TOP><FONT COLOR=\""+otextcolor+"\" FACE=\""+otextfont+"\" SIZE=\""+otextsize+"\">"+text+"</FONT></TD></TR></TABLE></TD></TR></TABLE>";
set_background("");
return txt;
}
function ol_content_background(text, picture, hasfullhtml){
var txt;
if(hasfullhtml){
txt=text;
}else{
var pU, hU, wU;
pU=(opadunit=='%' ? '%' : '');
hU=(oheightunit=='%' ? '%' : '');
wU=(owidthunit=='%' ? '%' : '');
if(ocss==CSSCLASS)txt="<TABLE WIDTH="+owidth+" BORDER=0 CELLPADDING=0 CELLSPACING=0 HEIGHT="+oheight+"><TR><TD COLSPAN=3 HEIGHT="+opadyt+"></TD></TR><TR><TD WIDTH="+opadxl+"></TD><TD VALIGN=TOP WIDTH="+(owidth-opadxl-opadxr)+"><FONT class=\""+otextfontclass+"\">"+text+"</FONT></TD><TD WIDTH="+opadxr+"></TD></TR><TR><TD COLSPAN=3 HEIGHT="+opadyb+"></TD></TR></TABLE>";
if(ocss==CSSSTYLE)txt="<TABLE WIDTH="+owidth+wU+" BORDER=0 CELLPADDING=0 CELLSPACING=0 HEIGHT="+oheight+hU+"><TR><TD COLSPAN=3 HEIGHT="+opadyt+pU+"></TD></TR><TR><TD WIDTH="+opadxl+pU+"></TD><TD VALIGN=TOP WIDTH="+(owidth-opadxl-opadxr)+pU+"><FONT style=\"font-family: "+otextfont+";color: "+otextcolor+";font-size: "+otextsize+otextsizeunit+";\">"+text+"</FONT></TD><TD WIDTH="+opadxr+pU+"></TD></TR><TR><TD COLSPAN=3 HEIGHT="+opadyb+pU+"></TD></TR></TABLE>";
if(ocss==CSSOFF)txt="<TABLE WIDTH="+owidth+" BORDER=0 CELLPADDING=0 CELLSPACING=0 HEIGHT="+oheight+"><TR><TD COLSPAN=3 HEIGHT="+opadyt+"></TD></TR><TR><TD WIDTH="+opadxl+"></TD><TD VALIGN=TOP WIDTH="+(owidth-opadxl-opadxr)+"><FONT FACE=\""+otextfont+"\" COLOR=\""+otextcolor+"\" SIZE=\""+otextsize+"\">"+text+"</FONT></TD><TD WIDTH="+opadxr+"></TD></TR><TR><TD COLSPAN=3 HEIGHT="+opadyb+"></TD></TR></TABLE>";
}
set_background(picture);
return txt;
}
function set_background(pic){
if(pic==""){
if(ns4)over.background.src=null;
if(ie4)over.backgroundImage="none";
if(ns6)over.style.backgroundImage="none";
}else{
if(ns4){
over.background.src=pic;
}else if(ie4){
over.backgroundImage="url("+pic+")";
}else if(ns6){
over.style.backgroundImage="url("+pic+")";
}
}
}
function disp(statustext){
if((ns4)||(ie4)||(ns6)){
if(oallowmove==0){
placeLayer();
showObject(over);
oallowmove=1;
}
}
if(statustext !=""){
self.status=statustext;
}
}
function placeLayer(){
var placeX, placeY;
if(ofixx > -1){
placeX=ofixx;
}else{
winoffset=(ie4)? eval('oframe.'+docRoot+'.scrollLeft'): oframe.pageXOffset;
if(ie4)iwidth=eval('oframe.'+docRoot+'.clientWidth');
if(ns4 || ns6)iwidth=oframe.innerWidth;
if(ohauto==1){
if((ox - winoffset)>((eval(iwidth))/ 2)){
ohpos=7;
}else{
ohpos=8;
}
}
if(ohpos==9){// Center
placeX=ox+ooffsetx-(owidth/2);
if(placeX < winoffset)placeX=winoffset;
}
if(ohpos==8){// Right
placeX=ox+ooffsetx;
if((eval(placeX)+ eval(owidth))>(winoffset + iwidth)){
placeX=iwidth + winoffset - owidth;
if(placeX < 0)placeX=0;
}
}
if(ohpos==7){// Left
placeX=ox-ooffsetx-owidth;
if(placeX < winoffset)placeX=winoffset;
}
if(osnapx > 1){
var snapping=placeX % osnapx;
if(ohpos==7){
placeX=placeX -(osnapx + snapping);
}else{
placeX=placeX +(osnapx - snapping);
}
if(placeX < winoffset)placeX=winoffset;
}
}
if(ofixy > -1){
placeY=ofixy;
}else{
scrolloffset=(ie4)? eval('oframe.'+docRoot+'.scrollTop'): oframe.pageYOffset;
if(ovauto==1){
if(ie4)iheight=eval('oframe.'+docRoot+'.clientHeight');
if(ns4 || ns6)iheight=oframe.innerHeight;
iheight=(eval(iheight))/ 2;
if((oy - scrolloffset)> iheight){
ovpos=35;
}else{
ovpos=36;
}
}
if(ovpos==35){
if(oaboveheight==0){
var divref=(ie4)? oframe.document.all['overDiv'] : over;
oaboveheight=(ns4)? divref.clip.height : divref.offsetHeight;
}
placeY=oy -(oaboveheight + ooffsety);
if(placeY < scrolloffset)placeY=scrolloffset;
}else{
placeY=oy + ooffsety;
}
if(osnapy > 1){
var snapping=placeY % osnapy;
if(oaboveheight > 0 && ovpos==35){
placeY=placeY -(osnapy + snapping);
}else{
placeY=placeY +(osnapy - snapping);
}
if(placeY < scrolloffset)placeY=scrolloffset;
}
}
repositionTo(over, placeX, placeY);
}
function mouseMove(e){
if((ns4)||(ns6)){ox=e.pageX;oy=e.pageY;}
if(ie4){ox=event.x;oy=event.y;}
if(ie5){ox=eval('event.x+oframe.'+docRoot+'.scrollLeft');oy=eval('event.y+oframe.'+docRoot+'.scrollTop');}
if(oallowmove==1){
placeLayer();
}
}
function cClick(){
hideObject(over);
oshowingsticky=0;
return false;
}
function compatibleframe(frameid){
if(ns4){
if(typeof frameid.document.overDiv=='undefined')return false;
}else if(ie4){
if(typeof frameid.document.all["overDiv"]=='undefined')return false;
}else if(ns6){
if(frameid.document.getElementById('overDiv')==null)return false;
}
return true;
}
function layerWrite(txt){
txt +="";
if(ns4){
var lyr=oframe.document.overDiv.document
lyr.write(txt)
lyr.close()
}else if(ie4){
oframe.document.all["overDiv"].innerHTML=txt
}else if(ns6){
range=oframe.document.createRange();
range.setStartBefore(over);
domfrag=range.createContextualFragment(txt);
while(over.hasChildNodes()){
over.removeChild(over.lastChild);
}
over.appendChild(domfrag);
}
}
function showObject(obj){
if(ns4)obj.visibility="show";
else if(ie4)obj.visibility="visible";
else if(ns6)obj.style.visibility="visible";
}
function hideObject(obj){
if(ns4)obj.visibility="hide";
else if(ie4)obj.visibility="hidden";
else if(ns6)obj.style.visibility="hidden";
if(otimerid > 0)clearTimeout(otimerid);
if(odelayid > 0)clearTimeout(odelayid);
otimerid=0;
odelayid=0;
self.status="";
}
function repositionTo(obj,xL,yL){
if((ns4)||(ie4)){
obj.left=(ie4 ? xL + 'px' : xL);
obj.top=(ie4 ? yL + 'px' : yL);
}else if(ns6){
obj.style.left=xL + "px";
obj.style.top=yL+ "px";
}
}
function getFrameRef(thisFrame, ofrm){
var retVal='';
for(var i=0;i<thisFrame.length;i++){
if(thisFrame[i].length > 0){
retVal=getFrameRef(thisFrame[i],ofrm);
if(retVal=='')continue;
}else if(thisFrame[i] !=ofrm)continue;
retVal='['+i+']' + retVal;
break;
}
return retVal;
}
function opt_FRAME(frm){
oframe=compatibleframe(frm)? frm : ol_frame;
if(oframe !=ol_frame){
var tFrm=getFrameRef(top.frames, oframe);
var sFrm=getFrameRef(top.frames, ol_frame);
if(sFrm.length==tFrm.length){
l=tFrm.lastIndexOf('[');
if(l){
while(sFrm.substring(0,l)!=tFrm.substring(0,l))l=tFrm.lastIndexOf('[',l-1);
tFrm=tFrm.substr(l);
sFrm=sFrm.substr(l);
}
}
var cnt=0, p='', str=tFrm;
while((k=str.lastIndexOf('['))!=-1){
cnt++;
str=str.substring(0,k);
}
for(var i=0;i<cnt;i++)p=p + 'parent.';
fnRef=p + 'frames' + sFrm + '.';
}
if((ns4)||(ie4 ||(ns6))){
if(ns4)over=oframe.document.overDiv;
if(ie4)over=oframe.overDiv.style;
if(ns6)over=oframe.document.getElementById("overDiv");
}
return 0;
}
function opt_FUNCTION(callme){
otext=(callme ? callme():(ofunction ? ofunction(): 'No Function'));
return 0;
}

// -------------------------------------------------------------------------------------
// --- JQuery tools. Download here:  http://flowplayer.org/tools/download/index.html ---
// -------------------------------------------------------------------------------------
/*!
 * jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Sat Feb 13 22:33:48 2010 -0500
 */
(function(A,w){function ma(){if(!c.isReady){try{s.documentElement.doScroll("left")}catch(a){setTimeout(ma,1);return}c.ready()}}function Qa(a,b){b.src?c.ajax({url:b.src,async:false,dataType:"script"}):c.globalEval(b.text||b.textContent||b.innerHTML||"");b.parentNode&&b.parentNode.removeChild(b)}function X(a,b,d,f,e,j){var i=a.length;if(typeof b==="object"){for(var o in b)X(a,o,b[o],f,e,d);return a}if(d!==w){f=!j&&f&&c.isFunction(d);for(o=0;o<i;o++)e(a[o],b,f?d.call(a[o],o,e(a[o],b)):d,j);return a}return i?
e(a[0],b):w}function J(){return(new Date).getTime()}function Y(){return false}function Z(){return true}function na(a,b,d){d[0].type=a;return c.event.handle.apply(b,d)}function oa(a){var b,d=[],f=[],e=arguments,j,i,o,k,n,r;i=c.data(this,"events");if(!(a.liveFired===this||!i||!i.live||a.button&&a.type==="click")){a.liveFired=this;var u=i.live.slice(0);for(k=0;k<u.length;k++){i=u[k];i.origType.replace(O,"")===a.type?f.push(i.selector):u.splice(k--,1)}j=c(a.target).closest(f,a.currentTarget);n=0;for(r=
j.length;n<r;n++)for(k=0;k<u.length;k++){i=u[k];if(j[n].selector===i.selector){o=j[n].elem;f=null;if(i.preType==="mouseenter"||i.preType==="mouseleave")f=c(a.relatedTarget).closest(i.selector)[0];if(!f||f!==o)d.push({elem:o,handleObj:i})}}n=0;for(r=d.length;n<r;n++){j=d[n];a.currentTarget=j.elem;a.data=j.handleObj.data;a.handleObj=j.handleObj;if(j.handleObj.origHandler.apply(j.elem,e)===false){b=false;break}}return b}}function pa(a,b){return"live."+(a&&a!=="*"?a+".":"")+b.replace(/\./g,"`").replace(/ /g,
"&")}function qa(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function ra(a,b){var d=0;b.each(function(){if(this.nodeName===(a[d]&&a[d].nodeName)){var f=c.data(a[d++]),e=c.data(this,f);if(f=f&&f.events){delete e.handle;e.events={};for(var j in f)for(var i in f[j])c.event.add(this,j,f[j][i],f[j][i].data)}}})}function sa(a,b,d){var f,e,j;b=b&&b[0]?b[0].ownerDocument||b[0]:s;if(a.length===1&&typeof a[0]==="string"&&a[0].length<512&&b===s&&!ta.test(a[0])&&(c.support.checkClone||!ua.test(a[0]))){e=
true;if(j=c.fragments[a[0]])if(j!==1)f=j}if(!f){f=b.createDocumentFragment();c.clean(a,b,f,d)}if(e)c.fragments[a[0]]=j?f:1;return{fragment:f,cacheable:e}}function K(a,b){var d={};c.each(va.concat.apply([],va.slice(0,b)),function(){d[this]=a});return d}function wa(a){return"scrollTo"in a&&a.document?a:a.nodeType===9?a.defaultView||a.parentWindow:false}var c=function(a,b){return new c.fn.init(a,b)},Ra=A.jQuery,Sa=A.$,s=A.document,T,Ta=/^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,Ua=/^.[^:#\[\.,]*$/,Va=/\S/,
Wa=/^(\s|\u00A0)+|(\s|\u00A0)+$/g,Xa=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,P=navigator.userAgent,xa=false,Q=[],L,$=Object.prototype.toString,aa=Object.prototype.hasOwnProperty,ba=Array.prototype.push,R=Array.prototype.slice,ya=Array.prototype.indexOf;c.fn=c.prototype={init:function(a,b){var d,f;if(!a)return this;if(a.nodeType){this.context=this[0]=a;this.length=1;return this}if(a==="body"&&!b){this.context=s;this[0]=s.body;this.selector="body";this.length=1;return this}if(typeof a==="string")if((d=Ta.exec(a))&&
(d[1]||!b))if(d[1]){f=b?b.ownerDocument||b:s;if(a=Xa.exec(a))if(c.isPlainObject(b)){a=[s.createElement(a[1])];c.fn.attr.call(a,b,true)}else a=[f.createElement(a[1])];else{a=sa([d[1]],[f]);a=(a.cacheable?a.fragment.cloneNode(true):a.fragment).childNodes}return c.merge(this,a)}else{if(b=s.getElementById(d[2])){if(b.id!==d[2])return T.find(a);this.length=1;this[0]=b}this.context=s;this.selector=a;return this}else if(!b&&/^\w+$/.test(a)){this.selector=a;this.context=s;a=s.getElementsByTagName(a);return c.merge(this,
a)}else return!b||b.jquery?(b||T).find(a):c(b).find(a);else if(c.isFunction(a))return T.ready(a);if(a.selector!==w){this.selector=a.selector;this.context=a.context}return c.makeArray(a,this)},selector:"",jquery:"1.4.2",length:0,size:function(){return this.length},toArray:function(){return R.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this.slice(a)[0]:this[a]},pushStack:function(a,b,d){var f=c();c.isArray(a)?ba.apply(f,a):c.merge(f,a);f.prevObject=this;f.context=this.context;if(b===
"find")f.selector=this.selector+(this.selector?" ":"")+d;else if(b)f.selector=this.selector+"."+b+"("+d+")";return f},each:function(a,b){return c.each(this,a,b)},ready:function(a){c.bindReady();if(c.isReady)a.call(s,c);else Q&&Q.push(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(R.apply(this,arguments),"slice",R.call(arguments).join(","))},map:function(a){return this.pushStack(c.map(this,
function(b,d){return a.call(b,d,b)}))},end:function(){return this.prevObject||c(null)},push:ba,sort:[].sort,splice:[].splice};c.fn.init.prototype=c.fn;c.extend=c.fn.extend=function(){var a=arguments[0]||{},b=1,d=arguments.length,f=false,e,j,i,o;if(typeof a==="boolean"){f=a;a=arguments[1]||{};b=2}if(typeof a!=="object"&&!c.isFunction(a))a={};if(d===b){a=this;--b}for(;b<d;b++)if((e=arguments[b])!=null)for(j in e){i=a[j];o=e[j];if(a!==o)if(f&&o&&(c.isPlainObject(o)||c.isArray(o))){i=i&&(c.isPlainObject(i)||
c.isArray(i))?i:c.isArray(o)?[]:{};a[j]=c.extend(f,i,o)}else if(o!==w)a[j]=o}return a};c.extend({noConflict:function(a){A.$=Sa;if(a)A.jQuery=Ra;return c},isReady:false,ready:function(){if(!c.isReady){if(!s.body)return setTimeout(c.ready,13);c.isReady=true;if(Q){for(var a,b=0;a=Q[b++];)a.call(s,c);Q=null}c.fn.triggerHandler&&c(s).triggerHandler("ready")}},bindReady:function(){if(!xa){xa=true;if(s.readyState==="complete")return c.ready();if(s.addEventListener){s.addEventListener("DOMContentLoaded",
L,false);A.addEventListener("load",c.ready,false)}else if(s.attachEvent){s.attachEvent("onreadystatechange",L);A.attachEvent("onload",c.ready);var a=false;try{a=A.frameElement==null}catch(b){}s.documentElement.doScroll&&a&&ma()}}},isFunction:function(a){return $.call(a)==="[object Function]"},isArray:function(a){return $.call(a)==="[object Array]"},isPlainObject:function(a){if(!a||$.call(a)!=="[object Object]"||a.nodeType||a.setInterval)return false;if(a.constructor&&!aa.call(a,"constructor")&&!aa.call(a.constructor.prototype,
"isPrototypeOf"))return false;var b;for(b in a);return b===w||aa.call(a,b)},isEmptyObject:function(a){for(var b in a)return false;return true},error:function(a){throw a;},parseJSON:function(a){if(typeof a!=="string"||!a)return null;a=c.trim(a);if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return A.JSON&&A.JSON.parse?A.JSON.parse(a):(new Function("return "+
a))();else c.error("Invalid JSON: "+a)},noop:function(){},globalEval:function(a){if(a&&Va.test(a)){var b=s.getElementsByTagName("head")[0]||s.documentElement,d=s.createElement("script");d.type="text/javascript";if(c.support.scriptEval)d.appendChild(s.createTextNode(a));else d.text=a;b.insertBefore(d,b.firstChild);b.removeChild(d)}},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,b,d){var f,e=0,j=a.length,i=j===w||c.isFunction(a);if(d)if(i)for(f in a){if(b.apply(a[f],
d)===false)break}else for(;e<j;){if(b.apply(a[e++],d)===false)break}else if(i)for(f in a){if(b.call(a[f],f,a[f])===false)break}else for(d=a[0];e<j&&b.call(d,e,d)!==false;d=a[++e]);return a},trim:function(a){return(a||"").replace(Wa,"")},makeArray:function(a,b){b=b||[];if(a!=null)a.length==null||typeof a==="string"||c.isFunction(a)||typeof a!=="function"&&a.setInterval?ba.call(b,a):c.merge(b,a);return b},inArray:function(a,b){if(b.indexOf)return b.indexOf(a);for(var d=0,f=b.length;d<f;d++)if(b[d]===
a)return d;return-1},merge:function(a,b){var d=a.length,f=0;if(typeof b.length==="number")for(var e=b.length;f<e;f++)a[d++]=b[f];else for(;b[f]!==w;)a[d++]=b[f++];a.length=d;return a},grep:function(a,b,d){for(var f=[],e=0,j=a.length;e<j;e++)!d!==!b(a[e],e)&&f.push(a[e]);return f},map:function(a,b,d){for(var f=[],e,j=0,i=a.length;j<i;j++){e=b(a[j],j,d);if(e!=null)f[f.length]=e}return f.concat.apply([],f)},guid:1,proxy:function(a,b,d){if(arguments.length===2)if(typeof b==="string"){d=a;a=d[b];b=w}else if(b&&
!c.isFunction(b)){d=b;b=w}if(!b&&a)b=function(){return a.apply(d||this,arguments)};if(a)b.guid=a.guid=a.guid||b.guid||c.guid++;return b},uaMatch:function(a){a=a.toLowerCase();a=/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||!/compatible/.test(a)&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}},browser:{}});P=c.uaMatch(P);if(P.browser){c.browser[P.browser]=true;c.browser.version=P.version}if(c.browser.webkit)c.browser.safari=
true;if(ya)c.inArray=function(a,b){return ya.call(b,a)};T=c(s);if(s.addEventListener)L=function(){s.removeEventListener("DOMContentLoaded",L,false);c.ready()};else if(s.attachEvent)L=function(){if(s.readyState==="complete"){s.detachEvent("onreadystatechange",L);c.ready()}};(function(){c.support={};var a=s.documentElement,b=s.createElement("script"),d=s.createElement("div"),f="script"+J();d.style.display="none";d.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
var e=d.getElementsByTagName("*"),j=d.getElementsByTagName("a")[0];if(!(!e||!e.length||!j)){c.support={leadingWhitespace:d.firstChild.nodeType===3,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/red/.test(j.getAttribute("style")),hrefNormalized:j.getAttribute("href")==="/a",opacity:/^0.55$/.test(j.style.opacity),cssFloat:!!j.style.cssFloat,checkOn:d.getElementsByTagName("input")[0].value==="on",optSelected:s.createElement("select").appendChild(s.createElement("option")).selected,
parentNode:d.removeChild(d.appendChild(s.createElement("div"))).parentNode===null,deleteExpando:true,checkClone:false,scriptEval:false,noCloneEvent:true,boxModel:null};b.type="text/javascript";try{b.appendChild(s.createTextNode("window."+f+"=1;"))}catch(i){}a.insertBefore(b,a.firstChild);if(A[f]){c.support.scriptEval=true;delete A[f]}try{delete b.test}catch(o){c.support.deleteExpando=false}a.removeChild(b);if(d.attachEvent&&d.fireEvent){d.attachEvent("onclick",function k(){c.support.noCloneEvent=
false;d.detachEvent("onclick",k)});d.cloneNode(true).fireEvent("onclick")}d=s.createElement("div");d.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";a=s.createDocumentFragment();a.appendChild(d.firstChild);c.support.checkClone=a.cloneNode(true).cloneNode(true).lastChild.checked;c(function(){var k=s.createElement("div");k.style.width=k.style.paddingLeft="1px";s.body.appendChild(k);c.boxModel=c.support.boxModel=k.offsetWidth===2;s.body.removeChild(k).style.display="none"});a=function(k){var n=
s.createElement("div");k="on"+k;var r=k in n;if(!r){n.setAttribute(k,"return;");r=typeof n[k]==="function"}return r};c.support.submitBubbles=a("submit");c.support.changeBubbles=a("change");a=b=d=e=j=null}})();c.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};var G="jQuery"+J(),Ya=0,za={};c.extend({cache:{},expando:G,noData:{embed:true,object:true,
applet:true},data:function(a,b,d){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var f=a[G],e=c.cache;if(!f&&typeof b==="string"&&d===w)return null;f||(f=++Ya);if(typeof b==="object"){a[G]=f;e[f]=c.extend(true,{},b)}else if(!e[f]){a[G]=f;e[f]={}}a=e[f];if(d!==w)a[b]=d;return typeof b==="string"?a[b]:a}},removeData:function(a,b){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var d=a[G],f=c.cache,e=f[d];if(b){if(e){delete e[b];c.isEmptyObject(e)&&c.removeData(a)}}else{if(c.support.deleteExpando)delete a[c.expando];
else a.removeAttribute&&a.removeAttribute(c.expando);delete f[d]}}}});c.fn.extend({data:function(a,b){if(typeof a==="undefined"&&this.length)return c.data(this[0]);else if(typeof a==="object")return this.each(function(){c.data(this,a)});var d=a.split(".");d[1]=d[1]?"."+d[1]:"";if(b===w){var f=this.triggerHandler("getData"+d[1]+"!",[d[0]]);if(f===w&&this.length)f=c.data(this[0],a);return f===w&&d[1]?this.data(d[0]):f}else return this.trigger("setData"+d[1]+"!",[d[0],b]).each(function(){c.data(this,
a,b)})},removeData:function(a){return this.each(function(){c.removeData(this,a)})}});c.extend({queue:function(a,b,d){if(a){b=(b||"fx")+"queue";var f=c.data(a,b);if(!d)return f||[];if(!f||c.isArray(d))f=c.data(a,b,c.makeArray(d));else f.push(d);return f}},dequeue:function(a,b){b=b||"fx";var d=c.queue(a,b),f=d.shift();if(f==="inprogress")f=d.shift();if(f){b==="fx"&&d.unshift("inprogress");f.call(a,function(){c.dequeue(a,b)})}}});c.fn.extend({queue:function(a,b){if(typeof a!=="string"){b=a;a="fx"}if(b===
w)return c.queue(this[0],a);return this.each(function(){var d=c.queue(this,a,b);a==="fx"&&d[0]!=="inprogress"&&c.dequeue(this,a)})},dequeue:function(a){return this.each(function(){c.dequeue(this,a)})},delay:function(a,b){a=c.fx?c.fx.speeds[a]||a:a;b=b||"fx";return this.queue(b,function(){var d=this;setTimeout(function(){c.dequeue(d,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var Aa=/[\n\t]/g,ca=/\s+/,Za=/\r/g,$a=/href|src|style/,ab=/(button|input)/i,bb=/(button|input|object|select|textarea)/i,
cb=/^(a|area)$/i,Ba=/radio|checkbox/;c.fn.extend({attr:function(a,b){return X(this,a,b,true,c.attr)},removeAttr:function(a){return this.each(function(){c.attr(this,a,"");this.nodeType===1&&this.removeAttribute(a)})},addClass:function(a){if(c.isFunction(a))return this.each(function(n){var r=c(this);r.addClass(a.call(this,n,r.attr("class")))});if(a&&typeof a==="string")for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1)if(e.className){for(var j=" "+e.className+" ",
i=e.className,o=0,k=b.length;o<k;o++)if(j.indexOf(" "+b[o]+" ")<0)i+=" "+b[o];e.className=c.trim(i)}else e.className=a}return this},removeClass:function(a){if(c.isFunction(a))return this.each(function(k){var n=c(this);n.removeClass(a.call(this,k,n.attr("class")))});if(a&&typeof a==="string"||a===w)for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1&&e.className)if(a){for(var j=(" "+e.className+" ").replace(Aa," "),i=0,o=b.length;i<o;i++)j=j.replace(" "+b[i]+" ",
" ");e.className=c.trim(j)}else e.className=""}return this},toggleClass:function(a,b){var d=typeof a,f=typeof b==="boolean";if(c.isFunction(a))return this.each(function(e){var j=c(this);j.toggleClass(a.call(this,e,j.attr("class"),b),b)});return this.each(function(){if(d==="string")for(var e,j=0,i=c(this),o=b,k=a.split(ca);e=k[j++];){o=f?o:!i.hasClass(e);i[o?"addClass":"removeClass"](e)}else if(d==="undefined"||d==="boolean"){this.className&&c.data(this,"__className__",this.className);this.className=
this.className||a===false?"":c.data(this,"__className__")||""}})},hasClass:function(a){a=" "+a+" ";for(var b=0,d=this.length;b<d;b++)if((" "+this[b].className+" ").replace(Aa," ").indexOf(a)>-1)return true;return false},val:function(a){if(a===w){var b=this[0];if(b){if(c.nodeName(b,"option"))return(b.attributes.value||{}).specified?b.value:b.text;if(c.nodeName(b,"select")){var d=b.selectedIndex,f=[],e=b.options;b=b.type==="select-one";if(d<0)return null;var j=b?d:0;for(d=b?d+1:e.length;j<d;j++){var i=
e[j];if(i.selected){a=c(i).val();if(b)return a;f.push(a)}}return f}if(Ba.test(b.type)&&!c.support.checkOn)return b.getAttribute("value")===null?"on":b.value;return(b.value||"").replace(Za,"")}return w}var o=c.isFunction(a);return this.each(function(k){var n=c(this),r=a;if(this.nodeType===1){if(o)r=a.call(this,k,n.val());if(typeof r==="number")r+="";if(c.isArray(r)&&Ba.test(this.type))this.checked=c.inArray(n.val(),r)>=0;else if(c.nodeName(this,"select")){var u=c.makeArray(r);c("option",this).each(function(){this.selected=
c.inArray(c(this).val(),u)>=0});if(!u.length)this.selectedIndex=-1}else this.value=r}})}});c.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(a,b,d,f){if(!a||a.nodeType===3||a.nodeType===8)return w;if(f&&b in c.attrFn)return c(a)[b](d);f=a.nodeType!==1||!c.isXMLDoc(a);var e=d!==w;b=f&&c.props[b]||b;if(a.nodeType===1){var j=$a.test(b);if(b in a&&f&&!j){if(e){b==="type"&&ab.test(a.nodeName)&&a.parentNode&&c.error("type property can't be changed");
a[b]=d}if(c.nodeName(a,"form")&&a.getAttributeNode(b))return a.getAttributeNode(b).nodeValue;if(b==="tabIndex")return(b=a.getAttributeNode("tabIndex"))&&b.specified?b.value:bb.test(a.nodeName)||cb.test(a.nodeName)&&a.href?0:w;return a[b]}if(!c.support.style&&f&&b==="style"){if(e)a.style.cssText=""+d;return a.style.cssText}e&&a.setAttribute(b,""+d);a=!c.support.hrefNormalized&&f&&j?a.getAttribute(b,2):a.getAttribute(b);return a===null?w:a}return c.style(a,b,d)}});var O=/\.(.*)$/,db=function(a){return a.replace(/[^\w\s\.\|`]/g,
function(b){return"\\"+b})};c.event={add:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){if(a.setInterval&&a!==A&&!a.frameElement)a=A;var e,j;if(d.handler){e=d;d=e.handler}if(!d.guid)d.guid=c.guid++;if(j=c.data(a)){var i=j.events=j.events||{},o=j.handle;if(!o)j.handle=o=function(){return typeof c!=="undefined"&&!c.event.triggered?c.event.handle.apply(o.elem,arguments):w};o.elem=a;b=b.split(" ");for(var k,n=0,r;k=b[n++];){j=e?c.extend({},e):{handler:d,data:f};if(k.indexOf(".")>-1){r=k.split(".");
k=r.shift();j.namespace=r.slice(0).sort().join(".")}else{r=[];j.namespace=""}j.type=k;j.guid=d.guid;var u=i[k],z=c.event.special[k]||{};if(!u){u=i[k]=[];if(!z.setup||z.setup.call(a,f,r,o)===false)if(a.addEventListener)a.addEventListener(k,o,false);else a.attachEvent&&a.attachEvent("on"+k,o)}if(z.add){z.add.call(a,j);if(!j.handler.guid)j.handler.guid=d.guid}u.push(j);c.event.global[k]=true}a=null}}},global:{},remove:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){var e,j=0,i,o,k,n,r,u,z=c.data(a),
C=z&&z.events;if(z&&C){if(b&&b.type){d=b.handler;b=b.type}if(!b||typeof b==="string"&&b.charAt(0)==="."){b=b||"";for(e in C)c.event.remove(a,e+b)}else{for(b=b.split(" ");e=b[j++];){n=e;i=e.indexOf(".")<0;o=[];if(!i){o=e.split(".");e=o.shift();k=new RegExp("(^|\\.)"+c.map(o.slice(0).sort(),db).join("\\.(?:.*\\.)?")+"(\\.|$)")}if(r=C[e])if(d){n=c.event.special[e]||{};for(B=f||0;B<r.length;B++){u=r[B];if(d.guid===u.guid){if(i||k.test(u.namespace)){f==null&&r.splice(B--,1);n.remove&&n.remove.call(a,u)}if(f!=
null)break}}if(r.length===0||f!=null&&r.length===1){if(!n.teardown||n.teardown.call(a,o)===false)Ca(a,e,z.handle);delete C[e]}}else for(var B=0;B<r.length;B++){u=r[B];if(i||k.test(u.namespace)){c.event.remove(a,n,u.handler,B);r.splice(B--,1)}}}if(c.isEmptyObject(C)){if(b=z.handle)b.elem=null;delete z.events;delete z.handle;c.isEmptyObject(z)&&c.removeData(a)}}}}},trigger:function(a,b,d,f){var e=a.type||a;if(!f){a=typeof a==="object"?a[G]?a:c.extend(c.Event(e),a):c.Event(e);if(e.indexOf("!")>=0){a.type=
e=e.slice(0,-1);a.exclusive=true}if(!d){a.stopPropagation();c.event.global[e]&&c.each(c.cache,function(){this.events&&this.events[e]&&c.event.trigger(a,b,this.handle.elem)})}if(!d||d.nodeType===3||d.nodeType===8)return w;a.result=w;a.target=d;b=c.makeArray(b);b.unshift(a)}a.currentTarget=d;(f=c.data(d,"handle"))&&f.apply(d,b);f=d.parentNode||d.ownerDocument;try{if(!(d&&d.nodeName&&c.noData[d.nodeName.toLowerCase()]))if(d["on"+e]&&d["on"+e].apply(d,b)===false)a.result=false}catch(j){}if(!a.isPropagationStopped()&&
f)c.event.trigger(a,b,f,true);else if(!a.isDefaultPrevented()){f=a.target;var i,o=c.nodeName(f,"a")&&e==="click",k=c.event.special[e]||{};if((!k._default||k._default.call(d,a)===false)&&!o&&!(f&&f.nodeName&&c.noData[f.nodeName.toLowerCase()])){try{if(f[e]){if(i=f["on"+e])f["on"+e]=null;c.event.triggered=true;f[e]()}}catch(n){}if(i)f["on"+e]=i;c.event.triggered=false}}},handle:function(a){var b,d,f,e;a=arguments[0]=c.event.fix(a||A.event);a.currentTarget=this;b=a.type.indexOf(".")<0&&!a.exclusive;
if(!b){d=a.type.split(".");a.type=d.shift();f=new RegExp("(^|\\.)"+d.slice(0).sort().join("\\.(?:.*\\.)?")+"(\\.|$)")}e=c.data(this,"events");d=e[a.type];if(e&&d){d=d.slice(0);e=0;for(var j=d.length;e<j;e++){var i=d[e];if(b||f.test(i.namespace)){a.handler=i.handler;a.data=i.data;a.handleObj=i;i=i.handler.apply(this,arguments);if(i!==w){a.result=i;if(i===false){a.preventDefault();a.stopPropagation()}}if(a.isImmediatePropagationStopped())break}}}return a.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
fix:function(a){if(a[G])return a;var b=a;a=c.Event(b);for(var d=this.props.length,f;d;){f=this.props[--d];a[f]=b[f]}if(!a.target)a.target=a.srcElement||s;if(a.target.nodeType===3)a.target=a.target.parentNode;if(!a.relatedTarget&&a.fromElement)a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;if(a.pageX==null&&a.clientX!=null){b=s.documentElement;d=s.body;a.pageX=a.clientX+(b&&b.scrollLeft||d&&d.scrollLeft||0)-(b&&b.clientLeft||d&&d.clientLeft||0);a.pageY=a.clientY+(b&&b.scrollTop||
d&&d.scrollTop||0)-(b&&b.clientTop||d&&d.clientTop||0)}if(!a.which&&(a.charCode||a.charCode===0?a.charCode:a.keyCode))a.which=a.charCode||a.keyCode;if(!a.metaKey&&a.ctrlKey)a.metaKey=a.ctrlKey;if(!a.which&&a.button!==w)a.which=a.button&1?1:a.button&2?3:a.button&4?2:0;return a},guid:1E8,proxy:c.proxy,special:{ready:{setup:c.bindReady,teardown:c.noop},live:{add:function(a){c.event.add(this,a.origType,c.extend({},a,{handler:oa}))},remove:function(a){var b=true,d=a.origType.replace(O,"");c.each(c.data(this,
"events").live||[],function(){if(d===this.origType.replace(O,""))return b=false});b&&c.event.remove(this,a.origType,oa)}},beforeunload:{setup:function(a,b,d){if(this.setInterval)this.onbeforeunload=d;return false},teardown:function(a,b){if(this.onbeforeunload===b)this.onbeforeunload=null}}}};var Ca=s.removeEventListener?function(a,b,d){a.removeEventListener(b,d,false)}:function(a,b,d){a.detachEvent("on"+b,d)};c.Event=function(a){if(!this.preventDefault)return new c.Event(a);if(a&&a.type){this.originalEvent=
a;this.type=a.type}else this.type=a;this.timeStamp=J();this[G]=true};c.Event.prototype={preventDefault:function(){this.isDefaultPrevented=Z;var a=this.originalEvent;if(a){a.preventDefault&&a.preventDefault();a.returnValue=false}},stopPropagation:function(){this.isPropagationStopped=Z;var a=this.originalEvent;if(a){a.stopPropagation&&a.stopPropagation();a.cancelBubble=true}},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z;this.stopPropagation()},isDefaultPrevented:Y,isPropagationStopped:Y,
isImmediatePropagationStopped:Y};var Da=function(a){var b=a.relatedTarget;try{for(;b&&b!==this;)b=b.parentNode;if(b!==this){a.type=a.data;c.event.handle.apply(this,arguments)}}catch(d){}},Ea=function(a){a.type=a.data;c.event.handle.apply(this,arguments)};c.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){c.event.special[a]={setup:function(d){c.event.add(this,b,d&&d.selector?Ea:Da,a)},teardown:function(d){c.event.remove(this,b,d&&d.selector?Ea:Da)}}});if(!c.support.submitBubbles)c.event.special.submit=
{setup:function(){if(this.nodeName.toLowerCase()!=="form"){c.event.add(this,"click.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="submit"||d==="image")&&c(b).closest("form").length)return na("submit",this,arguments)});c.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="text"||d==="password")&&c(b).closest("form").length&&a.keyCode===13)return na("submit",this,arguments)})}else return false},teardown:function(){c.event.remove(this,".specialSubmit")}};
if(!c.support.changeBubbles){var da=/textarea|input|select/i,ea,Fa=function(a){var b=a.type,d=a.value;if(b==="radio"||b==="checkbox")d=a.checked;else if(b==="select-multiple")d=a.selectedIndex>-1?c.map(a.options,function(f){return f.selected}).join("-"):"";else if(a.nodeName.toLowerCase()==="select")d=a.selectedIndex;return d},fa=function(a,b){var d=a.target,f,e;if(!(!da.test(d.nodeName)||d.readOnly)){f=c.data(d,"_change_data");e=Fa(d);if(a.type!=="focusout"||d.type!=="radio")c.data(d,"_change_data",
e);if(!(f===w||e===f))if(f!=null||e){a.type="change";return c.event.trigger(a,b,d)}}};c.event.special.change={filters:{focusout:fa,click:function(a){var b=a.target,d=b.type;if(d==="radio"||d==="checkbox"||b.nodeName.toLowerCase()==="select")return fa.call(this,a)},keydown:function(a){var b=a.target,d=b.type;if(a.keyCode===13&&b.nodeName.toLowerCase()!=="textarea"||a.keyCode===32&&(d==="checkbox"||d==="radio")||d==="select-multiple")return fa.call(this,a)},beforeactivate:function(a){a=a.target;c.data(a,
"_change_data",Fa(a))}},setup:function(){if(this.type==="file")return false;for(var a in ea)c.event.add(this,a+".specialChange",ea[a]);return da.test(this.nodeName)},teardown:function(){c.event.remove(this,".specialChange");return da.test(this.nodeName)}};ea=c.event.special.change.filters}s.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(f){f=c.event.fix(f);f.type=b;return c.event.handle.call(this,f)}c.event.special[b]={setup:function(){this.addEventListener(a,
d,true)},teardown:function(){this.removeEventListener(a,d,true)}}});c.each(["bind","one"],function(a,b){c.fn[b]=function(d,f,e){if(typeof d==="object"){for(var j in d)this[b](j,f,d[j],e);return this}if(c.isFunction(f)){e=f;f=w}var i=b==="one"?c.proxy(e,function(k){c(this).unbind(k,i);return e.apply(this,arguments)}):e;if(d==="unload"&&b!=="one")this.one(d,f,e);else{j=0;for(var o=this.length;j<o;j++)c.event.add(this[j],d,i,f)}return this}});c.fn.extend({unbind:function(a,b){if(typeof a==="object"&&
!a.preventDefault)for(var d in a)this.unbind(d,a[d]);else{d=0;for(var f=this.length;d<f;d++)c.event.remove(this[d],a,b)}return this},delegate:function(a,b,d,f){return this.live(b,d,f,a)},undelegate:function(a,b,d){return arguments.length===0?this.unbind("live"):this.die(b,null,d,a)},trigger:function(a,b){return this.each(function(){c.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){a=c.Event(a);a.preventDefault();a.stopPropagation();c.event.trigger(a,b,this[0]);return a.result}},
toggle:function(a){for(var b=arguments,d=1;d<b.length;)c.proxy(a,b[d++]);return this.click(c.proxy(a,function(f){var e=(c.data(this,"lastToggle"+a.guid)||0)%d;c.data(this,"lastToggle"+a.guid,e+1);f.preventDefault();return b[e].apply(this,arguments)||false}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var Ga={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};c.each(["live","die"],function(a,b){c.fn[b]=function(d,f,e,j){var i,o=0,k,n,r=j||this.selector,
u=j?this:c(this.context);if(c.isFunction(f)){e=f;f=w}for(d=(d||"").split(" ");(i=d[o++])!=null;){j=O.exec(i);k="";if(j){k=j[0];i=i.replace(O,"")}if(i==="hover")d.push("mouseenter"+k,"mouseleave"+k);else{n=i;if(i==="focus"||i==="blur"){d.push(Ga[i]+k);i+=k}else i=(Ga[i]||i)+k;b==="live"?u.each(function(){c.event.add(this,pa(i,r),{data:f,selector:r,handler:e,origType:i,origHandler:e,preType:n})}):u.unbind(pa(i,r),e)}}return this}});c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),
function(a,b){c.fn[b]=function(d){return d?this.bind(b,d):this.trigger(b)};if(c.attrFn)c.attrFn[b]=true});A.attachEvent&&!A.addEventListener&&A.attachEvent("onunload",function(){for(var a in c.cache)if(c.cache[a].handle)try{c.event.remove(c.cache[a].handle.elem)}catch(b){}});(function(){function a(g){for(var h="",l,m=0;g[m];m++){l=g[m];if(l.nodeType===3||l.nodeType===4)h+=l.nodeValue;else if(l.nodeType!==8)h+=a(l.childNodes)}return h}function b(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];
if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1&&!p){t.sizcache=l;t.sizset=q}if(t.nodeName.toLowerCase()===h){y=t;break}t=t[g]}m[q]=y}}}function d(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1){if(!p){t.sizcache=l;t.sizset=q}if(typeof h!=="string"){if(t===h){y=true;break}}else if(k.filter(h,[t]).length>0){y=t;break}}t=t[g]}m[q]=y}}}var f=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
e=0,j=Object.prototype.toString,i=false,o=true;[0,0].sort(function(){o=false;return 0});var k=function(g,h,l,m){l=l||[];var q=h=h||s;if(h.nodeType!==1&&h.nodeType!==9)return[];if(!g||typeof g!=="string")return l;for(var p=[],v,t,y,S,H=true,M=x(h),I=g;(f.exec(""),v=f.exec(I))!==null;){I=v[3];p.push(v[1]);if(v[2]){S=v[3];break}}if(p.length>1&&r.exec(g))if(p.length===2&&n.relative[p[0]])t=ga(p[0]+p[1],h);else for(t=n.relative[p[0]]?[h]:k(p.shift(),h);p.length;){g=p.shift();if(n.relative[g])g+=p.shift();
t=ga(g,t)}else{if(!m&&p.length>1&&h.nodeType===9&&!M&&n.match.ID.test(p[0])&&!n.match.ID.test(p[p.length-1])){v=k.find(p.shift(),h,M);h=v.expr?k.filter(v.expr,v.set)[0]:v.set[0]}if(h){v=m?{expr:p.pop(),set:z(m)}:k.find(p.pop(),p.length===1&&(p[0]==="~"||p[0]==="+")&&h.parentNode?h.parentNode:h,M);t=v.expr?k.filter(v.expr,v.set):v.set;if(p.length>0)y=z(t);else H=false;for(;p.length;){var D=p.pop();v=D;if(n.relative[D])v=p.pop();else D="";if(v==null)v=h;n.relative[D](y,v,M)}}else y=[]}y||(y=t);y||k.error(D||
g);if(j.call(y)==="[object Array]")if(H)if(h&&h.nodeType===1)for(g=0;y[g]!=null;g++){if(y[g]&&(y[g]===true||y[g].nodeType===1&&E(h,y[g])))l.push(t[g])}else for(g=0;y[g]!=null;g++)y[g]&&y[g].nodeType===1&&l.push(t[g]);else l.push.apply(l,y);else z(y,l);if(S){k(S,q,l,m);k.uniqueSort(l)}return l};k.uniqueSort=function(g){if(B){i=o;g.sort(B);if(i)for(var h=1;h<g.length;h++)g[h]===g[h-1]&&g.splice(h--,1)}return g};k.matches=function(g,h){return k(g,null,null,h)};k.find=function(g,h,l){var m,q;if(!g)return[];
for(var p=0,v=n.order.length;p<v;p++){var t=n.order[p];if(q=n.leftMatch[t].exec(g)){var y=q[1];q.splice(1,1);if(y.substr(y.length-1)!=="\\"){q[1]=(q[1]||"").replace(/\\/g,"");m=n.find[t](q,h,l);if(m!=null){g=g.replace(n.match[t],"");break}}}}m||(m=h.getElementsByTagName("*"));return{set:m,expr:g}};k.filter=function(g,h,l,m){for(var q=g,p=[],v=h,t,y,S=h&&h[0]&&x(h[0]);g&&h.length;){for(var H in n.filter)if((t=n.leftMatch[H].exec(g))!=null&&t[2]){var M=n.filter[H],I,D;D=t[1];y=false;t.splice(1,1);if(D.substr(D.length-
1)!=="\\"){if(v===p)p=[];if(n.preFilter[H])if(t=n.preFilter[H](t,v,l,p,m,S)){if(t===true)continue}else y=I=true;if(t)for(var U=0;(D=v[U])!=null;U++)if(D){I=M(D,t,U,v);var Ha=m^!!I;if(l&&I!=null)if(Ha)y=true;else v[U]=false;else if(Ha){p.push(D);y=true}}if(I!==w){l||(v=p);g=g.replace(n.match[H],"");if(!y)return[];break}}}if(g===q)if(y==null)k.error(g);else break;q=g}return v};k.error=function(g){throw"Syntax error, unrecognized expression: "+g;};var n=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(g){return g.getAttribute("href")}},
relative:{"+":function(g,h){var l=typeof h==="string",m=l&&!/\W/.test(h);l=l&&!m;if(m)h=h.toLowerCase();m=0;for(var q=g.length,p;m<q;m++)if(p=g[m]){for(;(p=p.previousSibling)&&p.nodeType!==1;);g[m]=l||p&&p.nodeName.toLowerCase()===h?p||false:p===h}l&&k.filter(h,g,true)},">":function(g,h){var l=typeof h==="string";if(l&&!/\W/.test(h)){h=h.toLowerCase();for(var m=0,q=g.length;m<q;m++){var p=g[m];if(p){l=p.parentNode;g[m]=l.nodeName.toLowerCase()===h?l:false}}}else{m=0;for(q=g.length;m<q;m++)if(p=g[m])g[m]=
l?p.parentNode:p.parentNode===h;l&&k.filter(h,g,true)}},"":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("parentNode",h,m,g,p,l)},"~":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("previousSibling",h,m,g,p,l)}},find:{ID:function(g,h,l){if(typeof h.getElementById!=="undefined"&&!l)return(g=h.getElementById(g[1]))?[g]:[]},NAME:function(g,h){if(typeof h.getElementsByName!=="undefined"){var l=[];
h=h.getElementsByName(g[1]);for(var m=0,q=h.length;m<q;m++)h[m].getAttribute("name")===g[1]&&l.push(h[m]);return l.length===0?null:l}},TAG:function(g,h){return h.getElementsByTagName(g[1])}},preFilter:{CLASS:function(g,h,l,m,q,p){g=" "+g[1].replace(/\\/g,"")+" ";if(p)return g;p=0;for(var v;(v=h[p])!=null;p++)if(v)if(q^(v.className&&(" "+v.className+" ").replace(/[\t\n]/g," ").indexOf(g)>=0))l||m.push(v);else if(l)h[p]=false;return false},ID:function(g){return g[1].replace(/\\/g,"")},TAG:function(g){return g[1].toLowerCase()},
CHILD:function(g){if(g[1]==="nth"){var h=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2]==="even"&&"2n"||g[2]==="odd"&&"2n+1"||!/\D/.test(g[2])&&"0n+"+g[2]||g[2]);g[2]=h[1]+(h[2]||1)-0;g[3]=h[3]-0}g[0]=e++;return g},ATTR:function(g,h,l,m,q,p){h=g[1].replace(/\\/g,"");if(!p&&n.attrMap[h])g[1]=n.attrMap[h];if(g[2]==="~=")g[4]=" "+g[4]+" ";return g},PSEUDO:function(g,h,l,m,q){if(g[1]==="not")if((f.exec(g[3])||"").length>1||/^\w/.test(g[3]))g[3]=k(g[3],null,null,h);else{g=k.filter(g[3],h,l,true^q);l||m.push.apply(m,
g);return false}else if(n.match.POS.test(g[0])||n.match.CHILD.test(g[0]))return true;return g},POS:function(g){g.unshift(true);return g}},filters:{enabled:function(g){return g.disabled===false&&g.type!=="hidden"},disabled:function(g){return g.disabled===true},checked:function(g){return g.checked===true},selected:function(g){return g.selected===true},parent:function(g){return!!g.firstChild},empty:function(g){return!g.firstChild},has:function(g,h,l){return!!k(l[3],g).length},header:function(g){return/h\d/i.test(g.nodeName)},
text:function(g){return"text"===g.type},radio:function(g){return"radio"===g.type},checkbox:function(g){return"checkbox"===g.type},file:function(g){return"file"===g.type},password:function(g){return"password"===g.type},submit:function(g){return"submit"===g.type},image:function(g){return"image"===g.type},reset:function(g){return"reset"===g.type},button:function(g){return"button"===g.type||g.nodeName.toLowerCase()==="button"},input:function(g){return/input|select|textarea|button/i.test(g.nodeName)}},
setFilters:{first:function(g,h){return h===0},last:function(g,h,l,m){return h===m.length-1},even:function(g,h){return h%2===0},odd:function(g,h){return h%2===1},lt:function(g,h,l){return h<l[3]-0},gt:function(g,h,l){return h>l[3]-0},nth:function(g,h,l){return l[3]-0===h},eq:function(g,h,l){return l[3]-0===h}},filter:{PSEUDO:function(g,h,l,m){var q=h[1],p=n.filters[q];if(p)return p(g,l,h,m);else if(q==="contains")return(g.textContent||g.innerText||a([g])||"").indexOf(h[3])>=0;else if(q==="not"){h=
h[3];l=0;for(m=h.length;l<m;l++)if(h[l]===g)return false;return true}else k.error("Syntax error, unrecognized expression: "+q)},CHILD:function(g,h){var l=h[1],m=g;switch(l){case "only":case "first":for(;m=m.previousSibling;)if(m.nodeType===1)return false;if(l==="first")return true;m=g;case "last":for(;m=m.nextSibling;)if(m.nodeType===1)return false;return true;case "nth":l=h[2];var q=h[3];if(l===1&&q===0)return true;h=h[0];var p=g.parentNode;if(p&&(p.sizcache!==h||!g.nodeIndex)){var v=0;for(m=p.firstChild;m;m=
m.nextSibling)if(m.nodeType===1)m.nodeIndex=++v;p.sizcache=h}g=g.nodeIndex-q;return l===0?g===0:g%l===0&&g/l>=0}},ID:function(g,h){return g.nodeType===1&&g.getAttribute("id")===h},TAG:function(g,h){return h==="*"&&g.nodeType===1||g.nodeName.toLowerCase()===h},CLASS:function(g,h){return(" "+(g.className||g.getAttribute("class"))+" ").indexOf(h)>-1},ATTR:function(g,h){var l=h[1];g=n.attrHandle[l]?n.attrHandle[l](g):g[l]!=null?g[l]:g.getAttribute(l);l=g+"";var m=h[2];h=h[4];return g==null?m==="!=":m===
"="?l===h:m==="*="?l.indexOf(h)>=0:m==="~="?(" "+l+" ").indexOf(h)>=0:!h?l&&g!==false:m==="!="?l!==h:m==="^="?l.indexOf(h)===0:m==="$="?l.substr(l.length-h.length)===h:m==="|="?l===h||l.substr(0,h.length+1)===h+"-":false},POS:function(g,h,l,m){var q=n.setFilters[h[2]];if(q)return q(g,l,h,m)}}},r=n.match.POS;for(var u in n.match){n.match[u]=new RegExp(n.match[u].source+/(?![^\[]*\])(?![^\(]*\))/.source);n.leftMatch[u]=new RegExp(/(^(?:.|\r|\n)*?)/.source+n.match[u].source.replace(/\\(\d+)/g,function(g,
h){return"\\"+(h-0+1)}))}var z=function(g,h){g=Array.prototype.slice.call(g,0);if(h){h.push.apply(h,g);return h}return g};try{Array.prototype.slice.call(s.documentElement.childNodes,0)}catch(C){z=function(g,h){h=h||[];if(j.call(g)==="[object Array]")Array.prototype.push.apply(h,g);else if(typeof g.length==="number")for(var l=0,m=g.length;l<m;l++)h.push(g[l]);else for(l=0;g[l];l++)h.push(g[l]);return h}}var B;if(s.documentElement.compareDocumentPosition)B=function(g,h){if(!g.compareDocumentPosition||
!h.compareDocumentPosition){if(g==h)i=true;return g.compareDocumentPosition?-1:1}g=g.compareDocumentPosition(h)&4?-1:g===h?0:1;if(g===0)i=true;return g};else if("sourceIndex"in s.documentElement)B=function(g,h){if(!g.sourceIndex||!h.sourceIndex){if(g==h)i=true;return g.sourceIndex?-1:1}g=g.sourceIndex-h.sourceIndex;if(g===0)i=true;return g};else if(s.createRange)B=function(g,h){if(!g.ownerDocument||!h.ownerDocument){if(g==h)i=true;return g.ownerDocument?-1:1}var l=g.ownerDocument.createRange(),m=
h.ownerDocument.createRange();l.setStart(g,0);l.setEnd(g,0);m.setStart(h,0);m.setEnd(h,0);g=l.compareBoundaryPoints(Range.START_TO_END,m);if(g===0)i=true;return g};(function(){var g=s.createElement("div"),h="script"+(new Date).getTime();g.innerHTML="<a name='"+h+"'/>";var l=s.documentElement;l.insertBefore(g,l.firstChild);if(s.getElementById(h)){n.find.ID=function(m,q,p){if(typeof q.getElementById!=="undefined"&&!p)return(q=q.getElementById(m[1]))?q.id===m[1]||typeof q.getAttributeNode!=="undefined"&&
q.getAttributeNode("id").nodeValue===m[1]?[q]:w:[]};n.filter.ID=function(m,q){var p=typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id");return m.nodeType===1&&p&&p.nodeValue===q}}l.removeChild(g);l=g=null})();(function(){var g=s.createElement("div");g.appendChild(s.createComment(""));if(g.getElementsByTagName("*").length>0)n.find.TAG=function(h,l){l=l.getElementsByTagName(h[1]);if(h[1]==="*"){h=[];for(var m=0;l[m];m++)l[m].nodeType===1&&h.push(l[m]);l=h}return l};g.innerHTML="<a href='#'></a>";
if(g.firstChild&&typeof g.firstChild.getAttribute!=="undefined"&&g.firstChild.getAttribute("href")!=="#")n.attrHandle.href=function(h){return h.getAttribute("href",2)};g=null})();s.querySelectorAll&&function(){var g=k,h=s.createElement("div");h.innerHTML="<p class='TEST'></p>";if(!(h.querySelectorAll&&h.querySelectorAll(".TEST").length===0)){k=function(m,q,p,v){q=q||s;if(!v&&q.nodeType===9&&!x(q))try{return z(q.querySelectorAll(m),p)}catch(t){}return g(m,q,p,v)};for(var l in g)k[l]=g[l];h=null}}();
(function(){var g=s.createElement("div");g.innerHTML="<div class='test e'></div><div class='test'></div>";if(!(!g.getElementsByClassName||g.getElementsByClassName("e").length===0)){g.lastChild.className="e";if(g.getElementsByClassName("e").length!==1){n.order.splice(1,0,"CLASS");n.find.CLASS=function(h,l,m){if(typeof l.getElementsByClassName!=="undefined"&&!m)return l.getElementsByClassName(h[1])};g=null}}})();var E=s.compareDocumentPosition?function(g,h){return!!(g.compareDocumentPosition(h)&16)}:
function(g,h){return g!==h&&(g.contains?g.contains(h):true)},x=function(g){return(g=(g?g.ownerDocument||g:0).documentElement)?g.nodeName!=="HTML":false},ga=function(g,h){var l=[],m="",q;for(h=h.nodeType?[h]:h;q=n.match.PSEUDO.exec(g);){m+=q[0];g=g.replace(n.match.PSEUDO,"")}g=n.relative[g]?g+"*":g;q=0;for(var p=h.length;q<p;q++)k(g,h[q],l);return k.filter(m,l)};c.find=k;c.expr=k.selectors;c.expr[":"]=c.expr.filters;c.unique=k.uniqueSort;c.text=a;c.isXMLDoc=x;c.contains=E})();var eb=/Until$/,fb=/^(?:parents|prevUntil|prevAll)/,
gb=/,/;R=Array.prototype.slice;var Ia=function(a,b,d){if(c.isFunction(b))return c.grep(a,function(e,j){return!!b.call(e,j,e)===d});else if(b.nodeType)return c.grep(a,function(e){return e===b===d});else if(typeof b==="string"){var f=c.grep(a,function(e){return e.nodeType===1});if(Ua.test(b))return c.filter(b,f,!d);else b=c.filter(b,f)}return c.grep(a,function(e){return c.inArray(e,b)>=0===d})};c.fn.extend({find:function(a){for(var b=this.pushStack("","find",a),d=0,f=0,e=this.length;f<e;f++){d=b.length;
c.find(a,this[f],b);if(f>0)for(var j=d;j<b.length;j++)for(var i=0;i<d;i++)if(b[i]===b[j]){b.splice(j--,1);break}}return b},has:function(a){var b=c(a);return this.filter(function(){for(var d=0,f=b.length;d<f;d++)if(c.contains(this,b[d]))return true})},not:function(a){return this.pushStack(Ia(this,a,false),"not",a)},filter:function(a){return this.pushStack(Ia(this,a,true),"filter",a)},is:function(a){return!!a&&c.filter(a,this).length>0},closest:function(a,b){if(c.isArray(a)){var d=[],f=this[0],e,j=
{},i;if(f&&a.length){e=0;for(var o=a.length;e<o;e++){i=a[e];j[i]||(j[i]=c.expr.match.POS.test(i)?c(i,b||this.context):i)}for(;f&&f.ownerDocument&&f!==b;){for(i in j){e=j[i];if(e.jquery?e.index(f)>-1:c(f).is(e)){d.push({selector:i,elem:f});delete j[i]}}f=f.parentNode}}return d}var k=c.expr.match.POS.test(a)?c(a,b||this.context):null;return this.map(function(n,r){for(;r&&r.ownerDocument&&r!==b;){if(k?k.index(r)>-1:c(r).is(a))return r;r=r.parentNode}return null})},index:function(a){if(!a||typeof a===
"string")return c.inArray(this[0],a?c(a):this.parent().children());return c.inArray(a.jquery?a[0]:a,this)},add:function(a,b){a=typeof a==="string"?c(a,b||this.context):c.makeArray(a);b=c.merge(this.get(),a);return this.pushStack(qa(a[0])||qa(b[0])?b:c.unique(b))},andSelf:function(){return this.add(this.prevObject)}});c.each({parent:function(a){return(a=a.parentNode)&&a.nodeType!==11?a:null},parents:function(a){return c.dir(a,"parentNode")},parentsUntil:function(a,b,d){return c.dir(a,"parentNode",
d)},next:function(a){return c.nth(a,2,"nextSibling")},prev:function(a){return c.nth(a,2,"previousSibling")},nextAll:function(a){return c.dir(a,"nextSibling")},prevAll:function(a){return c.dir(a,"previousSibling")},nextUntil:function(a,b,d){return c.dir(a,"nextSibling",d)},prevUntil:function(a,b,d){return c.dir(a,"previousSibling",d)},siblings:function(a){return c.sibling(a.parentNode.firstChild,a)},children:function(a){return c.sibling(a.firstChild)},contents:function(a){return c.nodeName(a,"iframe")?
a.contentDocument||a.contentWindow.document:c.makeArray(a.childNodes)}},function(a,b){c.fn[a]=function(d,f){var e=c.map(this,b,d);eb.test(a)||(f=d);if(f&&typeof f==="string")e=c.filter(f,e);e=this.length>1?c.unique(e):e;if((this.length>1||gb.test(f))&&fb.test(a))e=e.reverse();return this.pushStack(e,a,R.call(arguments).join(","))}});c.extend({filter:function(a,b,d){if(d)a=":not("+a+")";return c.find.matches(a,b)},dir:function(a,b,d){var f=[];for(a=a[b];a&&a.nodeType!==9&&(d===w||a.nodeType!==1||!c(a).is(d));){a.nodeType===
1&&f.push(a);a=a[b]}return f},nth:function(a,b,d){b=b||1;for(var f=0;a;a=a[d])if(a.nodeType===1&&++f===b)break;return a},sibling:function(a,b){for(var d=[];a;a=a.nextSibling)a.nodeType===1&&a!==b&&d.push(a);return d}});var Ja=/ jQuery\d+="(?:\d+|null)"/g,V=/^\s+/,Ka=/(<([\w:]+)[^>]*?)\/>/g,hb=/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,La=/<([\w:]+)/,ib=/<tbody/i,jb=/<|&#?\w+;/,ta=/<script|<object|<embed|<option|<style/i,ua=/checked\s*(?:[^=]|=\s*.checked.)/i,Ma=function(a,b,d){return hb.test(d)?
a:b+"></"+d+">"},F={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};F.optgroup=F.option;F.tbody=F.tfoot=F.colgroup=F.caption=F.thead;F.th=F.td;if(!c.support.htmlSerialize)F._default=[1,"div<div>","</div>"];c.fn.extend({text:function(a){if(c.isFunction(a))return this.each(function(b){var d=
c(this);d.text(a.call(this,b,d.text()))});if(typeof a!=="object"&&a!==w)return this.empty().append((this[0]&&this[0].ownerDocument||s).createTextNode(a));return c.text(this)},wrapAll:function(a){if(c.isFunction(a))return this.each(function(d){c(this).wrapAll(a.call(this,d))});if(this[0]){var b=c(a,this[0].ownerDocument).eq(0).clone(true);this[0].parentNode&&b.insertBefore(this[0]);b.map(function(){for(var d=this;d.firstChild&&d.firstChild.nodeType===1;)d=d.firstChild;return d}).append(this)}return this},
wrapInner:function(a){if(c.isFunction(a))return this.each(function(b){c(this).wrapInner(a.call(this,b))});return this.each(function(){var b=c(this),d=b.contents();d.length?d.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){c(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){c.nodeName(this,"body")||c(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.appendChild(a)})},
prepend:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,this)});else if(arguments.length){var a=c(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,
this.nextSibling)});else if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,c(arguments[0]).toArray());return a}},remove:function(a,b){for(var d=0,f;(f=this[d])!=null;d++)if(!a||c.filter(a,[f]).length){if(!b&&f.nodeType===1){c.cleanData(f.getElementsByTagName("*"));c.cleanData([f])}f.parentNode&&f.parentNode.removeChild(f)}return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++)for(b.nodeType===1&&c.cleanData(b.getElementsByTagName("*"));b.firstChild;)b.removeChild(b.firstChild);
return this},clone:function(a){var b=this.map(function(){if(!c.support.noCloneEvent&&!c.isXMLDoc(this)){var d=this.outerHTML,f=this.ownerDocument;if(!d){d=f.createElement("div");d.appendChild(this.cloneNode(true));d=d.innerHTML}return c.clean([d.replace(Ja,"").replace(/=([^="'>\s]+\/)>/g,'="$1">').replace(V,"")],f)[0]}else return this.cloneNode(true)});if(a===true){ra(this,b);ra(this.find("*"),b.find("*"))}return b},html:function(a){if(a===w)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(Ja,
""):null;else if(typeof a==="string"&&!ta.test(a)&&(c.support.leadingWhitespace||!V.test(a))&&!F[(La.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Ka,Ma);try{for(var b=0,d=this.length;b<d;b++)if(this[b].nodeType===1){c.cleanData(this[b].getElementsByTagName("*"));this[b].innerHTML=a}}catch(f){this.empty().append(a)}}else c.isFunction(a)?this.each(function(e){var j=c(this),i=j.html();j.empty().append(function(){return a.call(this,e,i)})}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&
this[0].parentNode){if(c.isFunction(a))return this.each(function(b){var d=c(this),f=d.html();d.replaceWith(a.call(this,b,f))});if(typeof a!=="string")a=c(a).detach();return this.each(function(){var b=this.nextSibling,d=this.parentNode;c(this).remove();b?c(b).before(a):c(d).append(a)})}else return this.pushStack(c(c.isFunction(a)?a():a),"replaceWith",a)},detach:function(a){return this.remove(a,true)},domManip:function(a,b,d){function f(u){return c.nodeName(u,"table")?u.getElementsByTagName("tbody")[0]||
u.appendChild(u.ownerDocument.createElement("tbody")):u}var e,j,i=a[0],o=[],k;if(!c.support.checkClone&&arguments.length===3&&typeof i==="string"&&ua.test(i))return this.each(function(){c(this).domManip(a,b,d,true)});if(c.isFunction(i))return this.each(function(u){var z=c(this);a[0]=i.call(this,u,b?z.html():w);z.domManip(a,b,d)});if(this[0]){e=i&&i.parentNode;e=c.support.parentNode&&e&&e.nodeType===11&&e.childNodes.length===this.length?{fragment:e}:sa(a,this,o);k=e.fragment;if(j=k.childNodes.length===
1?(k=k.firstChild):k.firstChild){b=b&&c.nodeName(j,"tr");for(var n=0,r=this.length;n<r;n++)d.call(b?f(this[n],j):this[n],n>0||e.cacheable||this.length>1?k.cloneNode(true):k)}o.length&&c.each(o,Qa)}return this}});c.fragments={};c.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){c.fn[a]=function(d){var f=[];d=c(d);var e=this.length===1&&this[0].parentNode;if(e&&e.nodeType===11&&e.childNodes.length===1&&d.length===1){d[b](this[0]);
return this}else{e=0;for(var j=d.length;e<j;e++){var i=(e>0?this.clone(true):this).get();c.fn[b].apply(c(d[e]),i);f=f.concat(i)}return this.pushStack(f,a,d.selector)}}});c.extend({clean:function(a,b,d,f){b=b||s;if(typeof b.createElement==="undefined")b=b.ownerDocument||b[0]&&b[0].ownerDocument||s;for(var e=[],j=0,i;(i=a[j])!=null;j++){if(typeof i==="number")i+="";if(i){if(typeof i==="string"&&!jb.test(i))i=b.createTextNode(i);else if(typeof i==="string"){i=i.replace(Ka,Ma);var o=(La.exec(i)||["",
""])[1].toLowerCase(),k=F[o]||F._default,n=k[0],r=b.createElement("div");for(r.innerHTML=k[1]+i+k[2];n--;)r=r.lastChild;if(!c.support.tbody){n=ib.test(i);o=o==="table"&&!n?r.firstChild&&r.firstChild.childNodes:k[1]==="<table>"&&!n?r.childNodes:[];for(k=o.length-1;k>=0;--k)c.nodeName(o[k],"tbody")&&!o[k].childNodes.length&&o[k].parentNode.removeChild(o[k])}!c.support.leadingWhitespace&&V.test(i)&&r.insertBefore(b.createTextNode(V.exec(i)[0]),r.firstChild);i=r.childNodes}if(i.nodeType)e.push(i);else e=
c.merge(e,i)}}if(d)for(j=0;e[j];j++)if(f&&c.nodeName(e[j],"script")&&(!e[j].type||e[j].type.toLowerCase()==="text/javascript"))f.push(e[j].parentNode?e[j].parentNode.removeChild(e[j]):e[j]);else{e[j].nodeType===1&&e.splice.apply(e,[j+1,0].concat(c.makeArray(e[j].getElementsByTagName("script"))));d.appendChild(e[j])}return e},cleanData:function(a){for(var b,d,f=c.cache,e=c.event.special,j=c.support.deleteExpando,i=0,o;(o=a[i])!=null;i++)if(d=o[c.expando]){b=f[d];if(b.events)for(var k in b.events)e[k]?
c.event.remove(o,k):Ca(o,k,b.handle);if(j)delete o[c.expando];else o.removeAttribute&&o.removeAttribute(c.expando);delete f[d]}}});var kb=/z-?index|font-?weight|opacity|zoom|line-?height/i,Na=/alpha\([^)]*\)/,Oa=/opacity=([^)]*)/,ha=/float/i,ia=/-([a-z])/ig,lb=/([A-Z])/g,mb=/^-?\d+(?:px)?$/i,nb=/^-?\d/,ob={position:"absolute",visibility:"hidden",display:"block"},pb=["Left","Right"],qb=["Top","Bottom"],rb=s.defaultView&&s.defaultView.getComputedStyle,Pa=c.support.cssFloat?"cssFloat":"styleFloat",ja=
function(a,b){return b.toUpperCase()};c.fn.css=function(a,b){return X(this,a,b,true,function(d,f,e){if(e===w)return c.curCSS(d,f);if(typeof e==="number"&&!kb.test(f))e+="px";c.style(d,f,e)})};c.extend({style:function(a,b,d){if(!a||a.nodeType===3||a.nodeType===8)return w;if((b==="width"||b==="height")&&parseFloat(d)<0)d=w;var f=a.style||a,e=d!==w;if(!c.support.opacity&&b==="opacity"){if(e){f.zoom=1;b=parseInt(d,10)+""==="NaN"?"":"alpha(opacity="+d*100+")";a=f.filter||c.curCSS(a,"filter")||"";f.filter=
Na.test(a)?a.replace(Na,b):b}return f.filter&&f.filter.indexOf("opacity=")>=0?parseFloat(Oa.exec(f.filter)[1])/100+"":""}if(ha.test(b))b=Pa;b=b.replace(ia,ja);if(e)f[b]=d;return f[b]},css:function(a,b,d,f){if(b==="width"||b==="height"){var e,j=b==="width"?pb:qb;function i(){e=b==="width"?a.offsetWidth:a.offsetHeight;f!=="border"&&c.each(j,function(){f||(e-=parseFloat(c.curCSS(a,"padding"+this,true))||0);if(f==="margin")e+=parseFloat(c.curCSS(a,"margin"+this,true))||0;else e-=parseFloat(c.curCSS(a,
"border"+this+"Width",true))||0})}a.offsetWidth!==0?i():c.swap(a,ob,i);return Math.max(0,Math.round(e))}return c.curCSS(a,b,d)},curCSS:function(a,b,d){var f,e=a.style;if(!c.support.opacity&&b==="opacity"&&a.currentStyle){f=Oa.test(a.currentStyle.filter||"")?parseFloat(RegExp.$1)/100+"":"";return f===""?"1":f}if(ha.test(b))b=Pa;if(!d&&e&&e[b])f=e[b];else if(rb){if(ha.test(b))b="float";b=b.replace(lb,"-$1").toLowerCase();e=a.ownerDocument.defaultView;if(!e)return null;if(a=e.getComputedStyle(a,null))f=
a.getPropertyValue(b);if(b==="opacity"&&f==="")f="1"}else if(a.currentStyle){d=b.replace(ia,ja);f=a.currentStyle[b]||a.currentStyle[d];if(!mb.test(f)&&nb.test(f)){b=e.left;var j=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;e.left=d==="fontSize"?"1em":f||0;f=e.pixelLeft+"px";e.left=b;a.runtimeStyle.left=j}}return f},swap:function(a,b,d){var f={};for(var e in b){f[e]=a.style[e];a.style[e]=b[e]}d.call(a);for(e in b)a.style[e]=f[e]}});if(c.expr&&c.expr.filters){c.expr.filters.hidden=function(a){var b=
a.offsetWidth,d=a.offsetHeight,f=a.nodeName.toLowerCase()==="tr";return b===0&&d===0&&!f?true:b>0&&d>0&&!f?false:c.curCSS(a,"display")==="none"};c.expr.filters.visible=function(a){return!c.expr.filters.hidden(a)}}var sb=J(),tb=/<script(.|\s)*?\/script>/gi,ub=/select|textarea/i,vb=/color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,N=/=\?(&|$)/,ka=/\?/,wb=/(\?|&)_=.*?(&|$)/,xb=/^(\w+:)?\/\/([^\/?#]+)/,yb=/%20/g,zb=c.fn.load;c.fn.extend({load:function(a,b,d){if(typeof a!==
"string")return zb.call(this,a);else if(!this.length)return this;var f=a.indexOf(" ");if(f>=0){var e=a.slice(f,a.length);a=a.slice(0,f)}f="GET";if(b)if(c.isFunction(b)){d=b;b=null}else if(typeof b==="object"){b=c.param(b,c.ajaxSettings.traditional);f="POST"}var j=this;c.ajax({url:a,type:f,dataType:"html",data:b,complete:function(i,o){if(o==="success"||o==="notmodified")j.html(e?c("<div />").append(i.responseText.replace(tb,"")).find(e):i.responseText);d&&j.each(d,[i.responseText,o,i])}});return this},
serialize:function(){return c.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?c.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ub.test(this.nodeName)||vb.test(this.type))}).map(function(a,b){a=c(this).val();return a==null?null:c.isArray(a)?c.map(a,function(d){return{name:b.name,value:d}}):{name:b.name,value:a}}).get()}});c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
function(a,b){c.fn[b]=function(d){return this.bind(b,d)}});c.extend({get:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b=null}return c.ajax({type:"GET",url:a,data:b,success:d,dataType:f})},getScript:function(a,b){return c.get(a,null,b,"script")},getJSON:function(a,b,d){return c.get(a,b,d,"json")},post:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b={}}return c.ajax({type:"POST",url:a,data:b,success:d,dataType:f})},ajaxSetup:function(a){c.extend(c.ajaxSettings,a)},ajaxSettings:{url:location.href,
global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:A.XMLHttpRequest&&(A.location.protocol!=="file:"||!A.ActiveXObject)?function(){return new A.XMLHttpRequest}:function(){try{return new A.ActiveXObject("Microsoft.XMLHTTP")}catch(a){}},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},etag:{},ajax:function(a){function b(){e.success&&
e.success.call(k,o,i,x);e.global&&f("ajaxSuccess",[x,e])}function d(){e.complete&&e.complete.call(k,x,i);e.global&&f("ajaxComplete",[x,e]);e.global&&!--c.active&&c.event.trigger("ajaxStop")}function f(q,p){(e.context?c(e.context):c.event).trigger(q,p)}var e=c.extend(true,{},c.ajaxSettings,a),j,i,o,k=a&&a.context||e,n=e.type.toUpperCase();if(e.data&&e.processData&&typeof e.data!=="string")e.data=c.param(e.data,e.traditional);if(e.dataType==="jsonp"){if(n==="GET")N.test(e.url)||(e.url+=(ka.test(e.url)?
"&":"?")+(e.jsonp||"callback")+"=?");else if(!e.data||!N.test(e.data))e.data=(e.data?e.data+"&":"")+(e.jsonp||"callback")+"=?";e.dataType="json"}if(e.dataType==="json"&&(e.data&&N.test(e.data)||N.test(e.url))){j=e.jsonpCallback||"jsonp"+sb++;if(e.data)e.data=(e.data+"").replace(N,"="+j+"$1");e.url=e.url.replace(N,"="+j+"$1");e.dataType="script";A[j]=A[j]||function(q){o=q;b();d();A[j]=w;try{delete A[j]}catch(p){}z&&z.removeChild(C)}}if(e.dataType==="script"&&e.cache===null)e.cache=false;if(e.cache===
false&&n==="GET"){var r=J(),u=e.url.replace(wb,"$1_="+r+"$2");e.url=u+(u===e.url?(ka.test(e.url)?"&":"?")+"_="+r:"")}if(e.data&&n==="GET")e.url+=(ka.test(e.url)?"&":"?")+e.data;e.global&&!c.active++&&c.event.trigger("ajaxStart");r=(r=xb.exec(e.url))&&(r[1]&&r[1]!==location.protocol||r[2]!==location.host);if(e.dataType==="script"&&n==="GET"&&r){var z=s.getElementsByTagName("head")[0]||s.documentElement,C=s.createElement("script");C.src=e.url;if(e.scriptCharset)C.charset=e.scriptCharset;if(!j){var B=
false;C.onload=C.onreadystatechange=function(){if(!B&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){B=true;b();d();C.onload=C.onreadystatechange=null;z&&C.parentNode&&z.removeChild(C)}}}z.insertBefore(C,z.firstChild);return w}var E=false,x=e.xhr();if(x){e.username?x.open(n,e.url,e.async,e.username,e.password):x.open(n,e.url,e.async);try{if(e.data||a&&a.contentType)x.setRequestHeader("Content-Type",e.contentType);if(e.ifModified){c.lastModified[e.url]&&x.setRequestHeader("If-Modified-Since",
c.lastModified[e.url]);c.etag[e.url]&&x.setRequestHeader("If-None-Match",c.etag[e.url])}r||x.setRequestHeader("X-Requested-With","XMLHttpRequest");x.setRequestHeader("Accept",e.dataType&&e.accepts[e.dataType]?e.accepts[e.dataType]+", */*":e.accepts._default)}catch(ga){}if(e.beforeSend&&e.beforeSend.call(k,x,e)===false){e.global&&!--c.active&&c.event.trigger("ajaxStop");x.abort();return false}e.global&&f("ajaxSend",[x,e]);var g=x.onreadystatechange=function(q){if(!x||x.readyState===0||q==="abort"){E||
d();E=true;if(x)x.onreadystatechange=c.noop}else if(!E&&x&&(x.readyState===4||q==="timeout")){E=true;x.onreadystatechange=c.noop;i=q==="timeout"?"timeout":!c.httpSuccess(x)?"error":e.ifModified&&c.httpNotModified(x,e.url)?"notmodified":"success";var p;if(i==="success")try{o=c.httpData(x,e.dataType,e)}catch(v){i="parsererror";p=v}if(i==="success"||i==="notmodified")j||b();else c.handleError(e,x,i,p);d();q==="timeout"&&x.abort();if(e.async)x=null}};try{var h=x.abort;x.abort=function(){x&&h.call(x);
g("abort")}}catch(l){}e.async&&e.timeout>0&&setTimeout(function(){x&&!E&&g("timeout")},e.timeout);try{x.send(n==="POST"||n==="PUT"||n==="DELETE"?e.data:null)}catch(m){c.handleError(e,x,null,m);d()}e.async||g();return x}},handleError:function(a,b,d,f){if(a.error)a.error.call(a.context||a,b,d,f);if(a.global)(a.context?c(a.context):c.event).trigger("ajaxError",[b,a,f])},active:0,httpSuccess:function(a){try{return!a.status&&location.protocol==="file:"||a.status>=200&&a.status<300||a.status===304||a.status===
1223||a.status===0}catch(b){}return false},httpNotModified:function(a,b){var d=a.getResponseHeader("Last-Modified"),f=a.getResponseHeader("Etag");if(d)c.lastModified[b]=d;if(f)c.etag[b]=f;return a.status===304||a.status===0},httpData:function(a,b,d){var f=a.getResponseHeader("content-type")||"",e=b==="xml"||!b&&f.indexOf("xml")>=0;a=e?a.responseXML:a.responseText;e&&a.documentElement.nodeName==="parsererror"&&c.error("parsererror");if(d&&d.dataFilter)a=d.dataFilter(a,b);if(typeof a==="string")if(b===
"json"||!b&&f.indexOf("json")>=0)a=c.parseJSON(a);else if(b==="script"||!b&&f.indexOf("javascript")>=0)c.globalEval(a);return a},param:function(a,b){function d(i,o){if(c.isArray(o))c.each(o,function(k,n){b||/\[\]$/.test(i)?f(i,n):d(i+"["+(typeof n==="object"||c.isArray(n)?k:"")+"]",n)});else!b&&o!=null&&typeof o==="object"?c.each(o,function(k,n){d(i+"["+k+"]",n)}):f(i,o)}function f(i,o){o=c.isFunction(o)?o():o;e[e.length]=encodeURIComponent(i)+"="+encodeURIComponent(o)}var e=[];if(b===w)b=c.ajaxSettings.traditional;
if(c.isArray(a)||a.jquery)c.each(a,function(){f(this.name,this.value)});else for(var j in a)d(j,a[j]);return e.join("&").replace(yb,"+")}});var la={},Ab=/toggle|show|hide/,Bb=/^([+-]=)?([\d+-.]+)(.*)$/,W,va=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];c.fn.extend({show:function(a,b){if(a||a===0)return this.animate(K("show",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");
this[a].style.display=d||"";if(c.css(this[a],"display")==="none"){d=this[a].nodeName;var f;if(la[d])f=la[d];else{var e=c("<"+d+" />").appendTo("body");f=e.css("display");if(f==="none")f="block";e.remove();la[d]=f}c.data(this[a],"olddisplay",f)}}a=0;for(b=this.length;a<b;a++)this[a].style.display=c.data(this[a],"olddisplay")||"";return this}},hide:function(a,b){if(a||a===0)return this.animate(K("hide",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");!d&&d!=="none"&&c.data(this[a],
"olddisplay",c.css(this[a],"display"))}a=0;for(b=this.length;a<b;a++)this[a].style.display="none";return this}},_toggle:c.fn.toggle,toggle:function(a,b){var d=typeof a==="boolean";if(c.isFunction(a)&&c.isFunction(b))this._toggle.apply(this,arguments);else a==null||d?this.each(function(){var f=d?a:c(this).is(":hidden");c(this)[f?"show":"hide"]()}):this.animate(K("toggle",3),a,b);return this},fadeTo:function(a,b,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,d)},
animate:function(a,b,d,f){var e=c.speed(b,d,f);if(c.isEmptyObject(a))return this.each(e.complete);return this[e.queue===false?"each":"queue"](function(){var j=c.extend({},e),i,o=this.nodeType===1&&c(this).is(":hidden"),k=this;for(i in a){var n=i.replace(ia,ja);if(i!==n){a[n]=a[i];delete a[i];i=n}if(a[i]==="hide"&&o||a[i]==="show"&&!o)return j.complete.call(this);if((i==="height"||i==="width")&&this.style){j.display=c.css(this,"display");j.overflow=this.style.overflow}if(c.isArray(a[i])){(j.specialEasing=
j.specialEasing||{})[i]=a[i][1];a[i]=a[i][0]}}if(j.overflow!=null)this.style.overflow="hidden";j.curAnim=c.extend({},a);c.each(a,function(r,u){var z=new c.fx(k,j,r);if(Ab.test(u))z[u==="toggle"?o?"show":"hide":u](a);else{var C=Bb.exec(u),B=z.cur(true)||0;if(C){u=parseFloat(C[2]);var E=C[3]||"px";if(E!=="px"){k.style[r]=(u||1)+E;B=(u||1)/z.cur(true)*B;k.style[r]=B+E}if(C[1])u=(C[1]==="-="?-1:1)*u+B;z.custom(B,u,E)}else z.custom(B,u,"")}});return true})},stop:function(a,b){var d=c.timers;a&&this.queue([]);
this.each(function(){for(var f=d.length-1;f>=0;f--)if(d[f].elem===this){b&&d[f](true);d.splice(f,1)}});b||this.dequeue();return this}});c.each({slideDown:K("show",1),slideUp:K("hide",1),slideToggle:K("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(a,b){c.fn[a]=function(d,f){return this.animate(b,d,f)}});c.extend({speed:function(a,b,d){var f=a&&typeof a==="object"?a:{complete:d||!d&&b||c.isFunction(a)&&a,duration:a,easing:d&&b||b&&!c.isFunction(b)&&b};f.duration=c.fx.off?0:typeof f.duration===
"number"?f.duration:c.fx.speeds[f.duration]||c.fx.speeds._default;f.old=f.complete;f.complete=function(){f.queue!==false&&c(this).dequeue();c.isFunction(f.old)&&f.old.call(this)};return f},easing:{linear:function(a,b,d,f){return d+f*a},swing:function(a,b,d,f){return(-Math.cos(a*Math.PI)/2+0.5)*f+d}},timers:[],fx:function(a,b,d){this.options=b;this.elem=a;this.prop=d;if(!b.orig)b.orig={}}});c.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this);(c.fx.step[this.prop]||
c.fx.step._default)(this);if((this.prop==="height"||this.prop==="width")&&this.elem.style)this.elem.style.display="block"},cur:function(a){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];return(a=parseFloat(c.css(this.elem,this.prop,a)))&&a>-10000?a:parseFloat(c.curCSS(this.elem,this.prop))||0},custom:function(a,b,d){function f(j){return e.step(j)}this.startTime=J();this.start=a;this.end=b;this.unit=d||this.unit||"px";this.now=this.start;
this.pos=this.state=0;var e=this;f.elem=this.elem;if(f()&&c.timers.push(f)&&!W)W=setInterval(c.fx.tick,13)},show:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.show=true;this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());c(this.elem).show()},hide:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(a){var b=J(),d=true;if(a||b>=this.options.duration+this.startTime){this.now=
this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;for(var f in this.options.curAnim)if(this.options.curAnim[f]!==true)d=false;if(d){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;a=c.data(this.elem,"olddisplay");this.elem.style.display=a?a:this.options.display;if(c.css(this.elem,"display")==="none")this.elem.style.display="block"}this.options.hide&&c(this.elem).hide();if(this.options.hide||this.options.show)for(var e in this.options.curAnim)c.style(this.elem,
e,this.options.orig[e]);this.options.complete.call(this.elem)}return false}else{e=b-this.startTime;this.state=e/this.options.duration;a=this.options.easing||(c.easing.swing?"swing":"linear");this.pos=c.easing[this.options.specialEasing&&this.options.specialEasing[this.prop]||a](this.state,e,0,1,this.options.duration);this.now=this.start+(this.end-this.start)*this.pos;this.update()}return true}};c.extend(c.fx,{tick:function(){for(var a=c.timers,b=0;b<a.length;b++)a[b]()||a.splice(b--,1);a.length||
c.fx.stop()},stop:function(){clearInterval(W);W=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){c.style(a.elem,"opacity",a.now)},_default:function(a){if(a.elem.style&&a.elem.style[a.prop]!=null)a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit;else a.elem[a.prop]=a.now}}});if(c.expr&&c.expr.filters)c.expr.filters.animated=function(a){return c.grep(c.timers,function(b){return a===b.elem}).length};c.fn.offset="getBoundingClientRect"in s.documentElement?
function(a){var b=this[0];if(a)return this.each(function(e){c.offset.setOffset(this,a,e)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);var d=b.getBoundingClientRect(),f=b.ownerDocument;b=f.body;f=f.documentElement;return{top:d.top+(self.pageYOffset||c.support.boxModel&&f.scrollTop||b.scrollTop)-(f.clientTop||b.clientTop||0),left:d.left+(self.pageXOffset||c.support.boxModel&&f.scrollLeft||b.scrollLeft)-(f.clientLeft||b.clientLeft||0)}}:function(a){var b=
this[0];if(a)return this.each(function(r){c.offset.setOffset(this,a,r)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);c.offset.initialize();var d=b.offsetParent,f=b,e=b.ownerDocument,j,i=e.documentElement,o=e.body;f=(e=e.defaultView)?e.getComputedStyle(b,null):b.currentStyle;for(var k=b.offsetTop,n=b.offsetLeft;(b=b.parentNode)&&b!==o&&b!==i;){if(c.offset.supportsFixedPosition&&f.position==="fixed")break;j=e?e.getComputedStyle(b,null):b.currentStyle;
k-=b.scrollTop;n-=b.scrollLeft;if(b===d){k+=b.offsetTop;n+=b.offsetLeft;if(c.offset.doesNotAddBorder&&!(c.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(b.nodeName))){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=d;d=b.offsetParent}if(c.offset.subtractsBorderForOverflowNotVisible&&j.overflow!=="visible"){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=j}if(f.position==="relative"||f.position==="static"){k+=o.offsetTop;n+=o.offsetLeft}if(c.offset.supportsFixedPosition&&
f.position==="fixed"){k+=Math.max(i.scrollTop,o.scrollTop);n+=Math.max(i.scrollLeft,o.scrollLeft)}return{top:k,left:n}};c.offset={initialize:function(){var a=s.body,b=s.createElement("div"),d,f,e,j=parseFloat(c.curCSS(a,"marginTop",true))||0;c.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});b.innerHTML="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
a.insertBefore(b,a.firstChild);d=b.firstChild;f=d.firstChild;e=d.nextSibling.firstChild.firstChild;this.doesNotAddBorder=f.offsetTop!==5;this.doesAddBorderForTableAndCells=e.offsetTop===5;f.style.position="fixed";f.style.top="20px";this.supportsFixedPosition=f.offsetTop===20||f.offsetTop===15;f.style.position=f.style.top="";d.style.overflow="hidden";d.style.position="relative";this.subtractsBorderForOverflowNotVisible=f.offsetTop===-5;this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==j;a.removeChild(b);
c.offset.initialize=c.noop},bodyOffset:function(a){var b=a.offsetTop,d=a.offsetLeft;c.offset.initialize();if(c.offset.doesNotIncludeMarginInBodyOffset){b+=parseFloat(c.curCSS(a,"marginTop",true))||0;d+=parseFloat(c.curCSS(a,"marginLeft",true))||0}return{top:b,left:d}},setOffset:function(a,b,d){if(/static/.test(c.curCSS(a,"position")))a.style.position="relative";var f=c(a),e=f.offset(),j=parseInt(c.curCSS(a,"top",true),10)||0,i=parseInt(c.curCSS(a,"left",true),10)||0;if(c.isFunction(b))b=b.call(a,
d,e);d={top:b.top-e.top+j,left:b.left-e.left+i};"using"in b?b.using.call(a,d):f.css(d)}};c.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),d=this.offset(),f=/^body|html$/i.test(b[0].nodeName)?{top:0,left:0}:b.offset();d.top-=parseFloat(c.curCSS(a,"marginTop",true))||0;d.left-=parseFloat(c.curCSS(a,"marginLeft",true))||0;f.top+=parseFloat(c.curCSS(b[0],"borderTopWidth",true))||0;f.left+=parseFloat(c.curCSS(b[0],"borderLeftWidth",true))||0;return{top:d.top-
f.top,left:d.left-f.left}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||s.body;a&&!/^body|html$/i.test(a.nodeName)&&c.css(a,"position")==="static";)a=a.offsetParent;return a})}});c.each(["Left","Top"],function(a,b){var d="scroll"+b;c.fn[d]=function(f){var e=this[0],j;if(!e)return null;if(f!==w)return this.each(function(){if(j=wa(this))j.scrollTo(!a?f:c(j).scrollLeft(),a?f:c(j).scrollTop());else this[d]=f});else return(j=wa(e))?"pageXOffset"in j?j[a?"pageYOffset":
"pageXOffset"]:c.support.boxModel&&j.document.documentElement[d]||j.document.body[d]:e[d]}});c.each(["Height","Width"],function(a,b){var d=b.toLowerCase();c.fn["inner"+b]=function(){return this[0]?c.css(this[0],d,false,"padding"):null};c.fn["outer"+b]=function(f){return this[0]?c.css(this[0],d,false,f?"margin":"border"):null};c.fn[d]=function(f){var e=this[0];if(!e)return f==null?null:this;if(c.isFunction(f))return this.each(function(j){var i=c(this);i[d](f.call(this,j,i[d]()))});return"scrollTo"in
e&&e.document?e.document.compatMode==="CSS1Compat"&&e.document.documentElement["client"+b]||e.document.body["client"+b]:e.nodeType===9?Math.max(e.documentElement["client"+b],e.body["scroll"+b],e.documentElement["scroll"+b],e.body["offset"+b],e.documentElement["offset"+b]):f===w?c.css(e,d):this.css(d,typeof f==="string"?f:f+"px")}});A.jQuery=A.$=c})(window);

/*!
 * jQuery UI 1.8.4
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(c,j){function k(a){return!c(a).parents().andSelf().filter(function(){return c.curCSS(this,"visibility")==="hidden"||c.expr.filters.hidden(this)}).length}c.ui=c.ui||{};if(!c.ui.version){c.extend(c.ui,{version:"1.8.4",plugin:{add:function(a,b,d){a=c.ui[a].prototype;for(var e in d){a.plugins[e]=a.plugins[e]||[];a.plugins[e].push([b,d[e]])}},call:function(a,b,d){if((b=a.plugins[b])&&a.element[0].parentNode)for(var e=0;e<b.length;e++)a.options[b[e][0]]&&b[e][1].apply(a.element,d)}},contains:function(a,
b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(a,b){if(c(a).css("overflow")==="hidden")return false;b=b&&b==="left"?"scrollLeft":"scrollTop";var d=false;if(a[b]>0)return true;a[b]=1;d=a[b]>0;a[b]=0;return d},isOverAxis:function(a,b,d){return a>b&&a<b+d},isOver:function(a,b,d,e,h,i){return c.ui.isOverAxis(a,d,h)&&c.ui.isOverAxis(b,e,i)},keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,
CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});c.fn.extend({_focus:c.fn.focus,focus:function(a,b){return typeof a==="number"?this.each(function(){var d=this;setTimeout(function(){c(d).focus();b&&b.call(d)},a)}):this._focus.apply(this,arguments)},enableSelection:function(){return this.attr("unselectable",
"off").css("MozUserSelect","")},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect","none")},scrollParent:function(){var a;a=c.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(c.curCSS(this,"position",1))&&/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(c.curCSS(this,
"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!a.length?c(document):a},zIndex:function(a){if(a!==j)return this.css("zIndex",a);if(this.length){a=c(this[0]);for(var b;a.length&&a[0]!==document;){b=a.css("position");if(b==="absolute"||b==="relative"||b==="fixed"){b=parseInt(a.css("zIndex"));if(!isNaN(b)&&b!=0)return b}a=a.parent()}}return 0}});c.each(["Width","Height"],function(a,b){function d(f,g,l,m){c.each(e,function(){g-=
parseFloat(c.curCSS(f,"padding"+this,true))||0;if(l)g-=parseFloat(c.curCSS(f,"border"+this+"Width",true))||0;if(m)g-=parseFloat(c.curCSS(f,"margin"+this,true))||0});return g}var e=b==="Width"?["Left","Right"]:["Top","Bottom"],h=b.toLowerCase(),i={innerWidth:c.fn.innerWidth,innerHeight:c.fn.innerHeight,outerWidth:c.fn.outerWidth,outerHeight:c.fn.outerHeight};c.fn["inner"+b]=function(f){if(f===j)return i["inner"+b].call(this);return this.each(function(){c.style(this,h,d(this,f)+"px")})};c.fn["outer"+
b]=function(f,g){if(typeof f!=="number")return i["outer"+b].call(this,f);return this.each(function(){c.style(this,h,d(this,f,true,g)+"px")})}});c.extend(c.expr[":"],{data:function(a,b,d){return!!c.data(a,d[3])},focusable:function(a){var b=a.nodeName.toLowerCase(),d=c.attr(a,"tabindex");if("area"===b){b=a.parentNode;d=b.name;if(!a.href||!d||b.nodeName.toLowerCase()!=="map")return false;a=c("img[usemap=#"+d+"]")[0];return!!a&&k(a)}return(/input|select|textarea|button|object/.test(b)?!a.disabled:"a"==
b?a.href||!isNaN(d):!isNaN(d))&&k(a)},tabbable:function(a){var b=c.attr(a,"tabindex");return(isNaN(b)||b>=0)&&c(a).is(":focusable")}})}})(jQuery);
;/*!
 * jQuery UI Widget 1.8.4
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(b,j){var k=b.fn.remove;b.fn.remove=function(a,c){return this.each(function(){if(!c)if(!a||b.filter(a,[this]).length)b("*",this).add([this]).each(function(){b(this).triggerHandler("remove")});return k.call(b(this),a,c)})};b.widget=function(a,c,d){var e=a.split(".")[0],f;a=a.split(".")[1];f=e+"-"+a;if(!d){d=c;c=b.Widget}b.expr[":"][f]=function(h){return!!b.data(h,a)};b[e]=b[e]||{};b[e][a]=function(h,g){arguments.length&&this._createWidget(h,g)};c=new c;c.options=b.extend(true,{},c.options);
b[e][a].prototype=b.extend(true,c,{namespace:e,widgetName:a,widgetEventPrefix:b[e][a].prototype.widgetEventPrefix||a,widgetBaseClass:f},d);b.widget.bridge(a,b[e][a])};b.widget.bridge=function(a,c){b.fn[a]=function(d){var e=typeof d==="string",f=Array.prototype.slice.call(arguments,1),h=this;d=!e&&f.length?b.extend.apply(null,[true,d].concat(f)):d;if(e&&d.substring(0,1)==="_")return h;e?this.each(function(){var g=b.data(this,a),i=g&&b.isFunction(g[d])?g[d].apply(g,f):g;if(i!==g&&i!==j){h=i;return false}}):
this.each(function(){var g=b.data(this,a);if(g){d&&g.option(d);g._init()}else b.data(this,a,new c(d,this))});return h}};b.Widget=function(a,c){arguments.length&&this._createWidget(a,c)};b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(a,c){b.data(c,this.widgetName,this);this.element=b(c);this.options=b.extend(true,{},this.options,b.metadata&&b.metadata.get(c)[this.widgetName],a);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});
this._create();this._init()},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},widget:function(){return this.element},option:function(a,c){var d=a,e=this;if(arguments.length===0)return b.extend({},e.options);if(typeof a==="string"){if(c===j)return this.options[a];d={};d[a]=c}b.each(d,function(f,
h){e._setOption(f,h)});return e},_setOption:function(a,c){this.options[a]=c;if(a==="disabled")this.widget()[c?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",c);return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(a,c,d){var e=this.options[a];c=b.Event(c);c.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();d=d||{};if(c.originalEvent){a=
b.event.props.length;for(var f;a;){f=b.event.props[--a];c[f]=c.originalEvent[f]}}this.element.trigger(c,d);return!(b.isFunction(e)&&e.call(this.element[0],c,d)===false||c.isDefaultPrevented())}}})(jQuery);
;/*!
 * jQuery UI Mouse 1.8.4
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function(c){c.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var a=this;this.element.bind("mousedown."+this.widgetName,function(b){return a._mouseDown(b)}).bind("click."+this.widgetName,function(b){if(a._preventClickEvent){a._preventClickEvent=false;b.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)},_mouseDown:function(a){a.originalEvent=a.originalEvent||{};if(!a.originalEvent.mouseHandled){this._mouseStarted&&
this._mouseUp(a);this._mouseDownEvent=a;var b=this,e=a.which==1,f=typeof this.options.cancel=="string"?c(a.target).parents().add(a.target).filter(this.options.cancel).length:false;if(!e||f||!this._mouseCapture(a))return true;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){b.mouseDelayMet=true},this.options.delay);if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a)){this._mouseStarted=this._mouseStart(a)!==false;if(!this._mouseStarted){a.preventDefault();
return true}}this._mouseMoveDelegate=function(d){return b._mouseMove(d)};this._mouseUpDelegate=function(d){return b._mouseUp(d)};c(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);c.browser.safari||a.preventDefault();return a.originalEvent.mouseHandled=true}},_mouseMove:function(a){if(c.browser.msie&&!a.button)return this._mouseUp(a);if(this._mouseStarted){this._mouseDrag(a);return a.preventDefault()}if(this._mouseDistanceMet(a)&&
this._mouseDelayMet(a))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,a)!==false)?this._mouseDrag(a):this._mouseUp(a);return!this._mouseStarted},_mouseUp:function(a){c(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;this._preventClickEvent=a.target==this._mouseDownEvent.target;this._mouseStop(a)}return false},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-
a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})(jQuery);
;/*
 * jQuery UI Position 1.8.4
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Position
 */
(function(c){c.ui=c.ui||{};var m=/left|center|right/,n=/top|center|bottom/,p=c.fn.position,q=c.fn.offset;c.fn.position=function(a){if(!a||!a.of)return p.apply(this,arguments);a=c.extend({},a);var b=c(a.of),d=(a.collision||"flip").split(" "),e=a.offset?a.offset.split(" "):[0,0],g,h,i;if(a.of.nodeType===9){g=b.width();h=b.height();i={top:0,left:0}}else if(a.of.scrollTo&&a.of.document){g=b.width();h=b.height();i={top:b.scrollTop(),left:b.scrollLeft()}}else if(a.of.preventDefault){a.at="left top";g=h=
0;i={top:a.of.pageY,left:a.of.pageX}}else{g=b.outerWidth();h=b.outerHeight();i=b.offset()}c.each(["my","at"],function(){var f=(a[this]||"").split(" ");if(f.length===1)f=m.test(f[0])?f.concat(["center"]):n.test(f[0])?["center"].concat(f):["center","center"];f[0]=m.test(f[0])?f[0]:"center";f[1]=n.test(f[1])?f[1]:"center";a[this]=f});if(d.length===1)d[1]=d[0];e[0]=parseInt(e[0],10)||0;if(e.length===1)e[1]=e[0];e[1]=parseInt(e[1],10)||0;if(a.at[0]==="right")i.left+=g;else if(a.at[0]==="center")i.left+=
g/2;if(a.at[1]==="bottom")i.top+=h;else if(a.at[1]==="center")i.top+=h/2;i.left+=e[0];i.top+=e[1];return this.each(function(){var f=c(this),k=f.outerWidth(),l=f.outerHeight(),j=c.extend({},i);if(a.my[0]==="right")j.left-=k;else if(a.my[0]==="center")j.left-=k/2;if(a.my[1]==="bottom")j.top-=l;else if(a.my[1]==="center")j.top-=l/2;j.left=parseInt(j.left);j.top=parseInt(j.top);c.each(["left","top"],function(o,r){c.ui.position[d[o]]&&c.ui.position[d[o]][r](j,{targetWidth:g,targetHeight:h,elemWidth:k,
elemHeight:l,offset:e,my:a.my,at:a.at})});c.fn.bgiframe&&f.bgiframe();f.offset(c.extend(j,{using:a.using}))})};c.ui.position={fit:{left:function(a,b){var d=c(window);b=a.left+b.elemWidth-d.width()-d.scrollLeft();a.left=b>0?a.left-b:Math.max(0,a.left)},top:function(a,b){var d=c(window);b=a.top+b.elemHeight-d.height()-d.scrollTop();a.top=b>0?a.top-b:Math.max(0,a.top)}},flip:{left:function(a,b){if(b.at[0]!=="center"){var d=c(window);d=a.left+b.elemWidth-d.width()-d.scrollLeft();var e=b.my[0]==="left"?
-b.elemWidth:b.my[0]==="right"?b.elemWidth:0,g=-2*b.offset[0];a.left+=a.left<0?e+b.targetWidth+g:d>0?e-b.targetWidth+g:0}},top:function(a,b){if(b.at[1]!=="center"){var d=c(window);d=a.top+b.elemHeight-d.height()-d.scrollTop();var e=b.my[1]==="top"?-b.elemHeight:b.my[1]==="bottom"?b.elemHeight:0,g=b.at[1]==="top"?b.targetHeight:-b.targetHeight,h=-2*b.offset[1];a.top+=a.top<0?e+b.targetHeight+h:d>0?e+g+h:0}}}};if(!c.offset.setOffset){c.offset.setOffset=function(a,b){if(/static/.test(c.curCSS(a,"position")))a.style.position=
"relative";var d=c(a),e=d.offset(),g=parseInt(c.curCSS(a,"top",true),10)||0,h=parseInt(c.curCSS(a,"left",true),10)||0;e={top:b.top-e.top+g,left:b.left-e.left+h};"using"in b?b.using.call(a,e):d.css(e)};c.fn.offset=function(a){var b=this[0];if(!b||!b.ownerDocument)return null;if(a)return this.each(function(){c.offset.setOffset(this,a)});return q.call(this)}}})(jQuery);
;/*
 * jQuery UI Accordion 1.8.4
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Accordion
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(c){c.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()}},_create:function(){var a=this,b=a.options;a.running=0;a.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");
a.headers=a.element.find(b.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){b.disabled||c(this).addClass("ui-state-hover")}).bind("mouseleave.accordion",function(){b.disabled||c(this).removeClass("ui-state-hover")}).bind("focus.accordion",function(){b.disabled||c(this).addClass("ui-state-focus")}).bind("blur.accordion",function(){b.disabled||c(this).removeClass("ui-state-focus")});a.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
if(b.navigation){var d=a.element.find("a").filter(b.navigationFilter).eq(0);if(d.length){var f=d.closest(".ui-accordion-header");a.active=f.length?f:d.closest(".ui-accordion-content").prev()}}a.active=a._findActive(a.active||b.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all ui-corner-top");a.active.next().addClass("ui-accordion-content-active");a._createIcons();a.resize();a.element.attr("role","tablist");a.headers.attr("role","tab").bind("keydown.accordion",function(g){return a._keydown(g)}).next().attr("role",
"tabpanel");a.headers.not(a.active||"").attr({"aria-expanded":"false",tabIndex:-1}).next().hide();a.active.length?a.active.attr({"aria-expanded":"true",tabIndex:0}):a.headers.eq(0).attr("tabIndex",0);c.browser.safari||a.headers.find("a").attr("tabIndex",-1);b.event&&a.headers.bind(b.event.split(" ").join(".accordion ")+".accordion",function(g){a._clickHandler.call(a,g,this);g.preventDefault()})},_createIcons:function(){var a=this.options;if(a.icons){c("<span></span>").addClass("ui-icon "+a.icons.header).prependTo(this.headers);
this.active.children(".ui-icon").toggleClass(a.icons.header).toggleClass(a.icons.headerSelected);this.element.addClass("ui-accordion-icons")}},_destroyIcons:function(){this.headers.children(".ui-icon").remove();this.element.removeClass("ui-accordion-icons")},destroy:function(){var a=this.options;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabIndex");
this.headers.find("a").removeAttr("tabIndex");this._destroyIcons();var b=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");if(a.autoHeight||a.fillHeight)b.css("height","");return c.Widget.prototype.destroy.call(this)},_setOption:function(a,b){c.Widget.prototype._setOption.apply(this,arguments);a=="active"&&this.activate(b);if(a=="icons"){this._destroyIcons();
b&&this._createIcons()}if(a=="disabled")this.headers.add(this.headers.next())[b?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")},_keydown:function(a){if(!(this.options.disabled||a.altKey||a.ctrlKey)){var b=c.ui.keyCode,d=this.headers.length,f=this.headers.index(a.target),g=false;switch(a.keyCode){case b.RIGHT:case b.DOWN:g=this.headers[(f+1)%d];break;case b.LEFT:case b.UP:g=this.headers[(f-1+d)%d];break;case b.SPACE:case b.ENTER:this._clickHandler({target:a.target},a.target);
a.preventDefault()}if(g){c(a.target).attr("tabIndex",-1);c(g).attr("tabIndex",0);g.focus();return false}return true}},resize:function(){var a=this.options,b;if(a.fillSpace){if(c.browser.msie){var d=this.element.parent().css("overflow");this.element.parent().css("overflow","hidden")}b=this.element.parent().height();c.browser.msie&&this.element.parent().css("overflow",d);this.headers.each(function(){b-=c(this).outerHeight(true)});this.headers.next().each(function(){c(this).height(Math.max(0,b-c(this).innerHeight()+
c(this).height()))}).css("overflow","auto")}else if(a.autoHeight){b=0;this.headers.next().each(function(){b=Math.max(b,c(this).height("").height())}).height(b)}return this},activate:function(a){this.options.active=a;a=this._findActive(a)[0];this._clickHandler({target:a},a);return this},_findActive:function(a){return a?typeof a==="number"?this.headers.filter(":eq("+a+")"):this.headers.not(this.headers.not(a)):a===false?c([]):this.headers.filter(":eq(0)")},_clickHandler:function(a,b){var d=this.options;
if(!d.disabled)if(a.target){a=c(a.currentTarget||b);b=a[0]===this.active[0];d.active=d.collapsible&&b?false:this.headers.index(a);if(!(this.running||!d.collapsible&&b)){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);if(!b){a.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected);
a.next().addClass("ui-accordion-content-active")}h=a.next();f=this.active.next();g={options:d,newHeader:b&&d.collapsible?c([]):a,oldHeader:this.active,newContent:b&&d.collapsible?c([]):h,oldContent:f};d=this.headers.index(this.active[0])>this.headers.index(a[0]);this.active=b?c([]):a;this._toggle(h,f,g,b,d)}}else if(d.collapsible){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);
this.active.next().addClass("ui-accordion-content-active");var f=this.active.next(),g={options:d,newHeader:c([]),oldHeader:d.active,newContent:c([]),oldContent:f},h=this.active=c([]);this._toggle(h,f,g)}},_toggle:function(a,b,d,f,g){var h=this,e=h.options;h.toShow=a;h.toHide=b;h.data=d;var j=function(){if(h)return h._completed.apply(h,arguments)};h._trigger("changestart",null,h.data);h.running=b.size()===0?a.size():b.size();if(e.animated){d={};d=e.collapsible&&f?{toShow:c([]),toHide:b,complete:j,
down:g,autoHeight:e.autoHeight||e.fillSpace}:{toShow:a,toHide:b,complete:j,down:g,autoHeight:e.autoHeight||e.fillSpace};if(!e.proxied)e.proxied=e.animated;if(!e.proxiedDuration)e.proxiedDuration=e.duration;e.animated=c.isFunction(e.proxied)?e.proxied(d):e.proxied;e.duration=c.isFunction(e.proxiedDuration)?e.proxiedDuration(d):e.proxiedDuration;f=c.ui.accordion.animations;var i=e.duration,k=e.animated;if(k&&!f[k]&&!c.easing[k])k="slide";f[k]||(f[k]=function(l){this.slide(l,{easing:k,duration:i||700})});
f[k](d)}else{if(e.collapsible&&f)a.toggle();else{b.hide();a.show()}j(true)}b.prev().attr({"aria-expanded":"false",tabIndex:-1}).blur();a.prev().attr({"aria-expanded":"true",tabIndex:0}).focus()},_completed:function(a){this.running=a?0:--this.running;if(!this.running){this.options.clearStyle&&this.toShow.add(this.toHide).css({height:"",overflow:""});this.toHide.removeClass("ui-accordion-content-active");this._trigger("change",null,this.data)}}});c.extend(c.ui.accordion,{version:"1.8.4",animations:{slide:function(a,
b){a=c.extend({easing:"swing",duration:300},a,b);if(a.toHide.size())if(a.toShow.size()){var d=a.toShow.css("overflow"),f=0,g={},h={},e;b=a.toShow;e=b[0].style.width;b.width(parseInt(b.parent().width(),10)-parseInt(b.css("paddingLeft"),10)-parseInt(b.css("paddingRight"),10)-(parseInt(b.css("borderLeftWidth"),10)||0)-(parseInt(b.css("borderRightWidth"),10)||0));c.each(["height","paddingTop","paddingBottom"],function(j,i){h[i]="hide";j=(""+c.css(a.toShow[0],i)).match(/^([\d+-.]+)(.*)$/);g[i]={value:j[1],
unit:j[2]||"px"}});a.toShow.css({height:0,overflow:"hidden"}).show();a.toHide.filter(":hidden").each(a.complete).end().filter(":visible").animate(h,{step:function(j,i){if(i.prop=="height")f=i.end-i.start===0?0:(i.now-i.start)/(i.end-i.start);a.toShow[0].style[i.prop]=f*g[i.prop].value+g[i.prop].unit},duration:a.duration,easing:a.easing,complete:function(){a.autoHeight||a.toShow.css("height","");a.toShow.css({width:e,overflow:d});a.complete()}})}else a.toHide.animate({height:"hide",paddingTop:"hide",
paddingBottom:"hide"},a);else a.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},a)},bounceslide:function(a){this.slide(a,{easing:a.down?"easeOutBounce":"swing",duration:a.down?1E3:200})}}})})(jQuery);
;/*
 * jQuery UI Autocomplete 1.8.4
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Autocomplete
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 */
(function(e){e.widget("ui.autocomplete",{options:{appendTo:"body",delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},_create:function(){var a=this,b=this.element[0].ownerDocument;this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(c){if(!a.options.disabled){var d=e.ui.keyCode;switch(c.keyCode){case d.PAGE_UP:a._move("previousPage",
c);break;case d.PAGE_DOWN:a._move("nextPage",c);break;case d.UP:a._move("previous",c);c.preventDefault();break;case d.DOWN:a._move("next",c);c.preventDefault();break;case d.ENTER:case d.NUMPAD_ENTER:a.menu.element.is(":visible")&&c.preventDefault();case d.TAB:if(!a.menu.active)return;a.menu.select(c);break;case d.ESCAPE:a.element.val(a.term);a.close(c);break;default:clearTimeout(a.searching);a.searching=setTimeout(function(){if(a.term!=a.element.val()){a.selectedItem=null;a.search(null,c)}},a.options.delay);
break}}}).bind("focus.autocomplete",function(){if(!a.options.disabled){a.selectedItem=null;a.previous=a.element.val()}}).bind("blur.autocomplete",function(c){if(!a.options.disabled){clearTimeout(a.searching);a.closing=setTimeout(function(){a.close(c);a._change(c)},150)}});this._initSource();this.response=function(){return a._response.apply(a,arguments)};this.menu=e("<ul></ul>").addClass("ui-autocomplete").appendTo(e(this.options.appendTo||"body",b)[0]).mousedown(function(c){var d=a.menu.element[0];
c.target===d&&setTimeout(function(){e(document).one("mousedown",function(f){f.target!==a.element[0]&&f.target!==d&&!e.ui.contains(d,f.target)&&a.close()})},1);setTimeout(function(){clearTimeout(a.closing)},13)}).menu({focus:function(c,d){d=d.item.data("item.autocomplete");false!==a._trigger("focus",null,{item:d})&&/^key/.test(c.originalEvent.type)&&a.element.val(d.value)},selected:function(c,d){d=d.item.data("item.autocomplete");var f=a.previous;if(a.element[0]!==b.activeElement){a.element.focus();
a.previous=f}false!==a._trigger("select",c,{item:d})&&a.element.val(d.value);a.close(c);a.selectedItem=d},blur:function(){a.menu.element.is(":visible")&&a.element.val()!==a.term&&a.element.val(a.term)}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu");e.fn.bgiframe&&this.menu.element.bgiframe()},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");this.menu.element.remove();
e.Widget.prototype.destroy.call(this)},_setOption:function(a,b){e.Widget.prototype._setOption.apply(this,arguments);a==="source"&&this._initSource();if(a==="appendTo")this.menu.element.appendTo(e(b||"body",this.element[0].ownerDocument)[0])},_initSource:function(){var a,b;if(e.isArray(this.options.source)){a=this.options.source;this.source=function(c,d){d(e.ui.autocomplete.filter(a,c.term))}}else if(typeof this.options.source==="string"){b=this.options.source;this.source=function(c,d){e.getJSON(b,
c,d)}}else this.source=this.options.source},search:function(a,b){a=a!=null?a:this.element.val();if(a.length<this.options.minLength)return this.close(b);clearTimeout(this.closing);if(this._trigger("search")!==false)return this._search(a)},_search:function(a){this.term=this.element.addClass("ui-autocomplete-loading").val();this.source({term:a},this.response)},_response:function(a){if(a.length){a=this._normalize(a);this._suggest(a);this._trigger("open")}else this.close();this.element.removeClass("ui-autocomplete-loading")},
close:function(a){clearTimeout(this.closing);if(this.menu.element.is(":visible")){this._trigger("close",a);this.menu.element.hide();this.menu.deactivate()}},_change:function(a){this.previous!==this.element.val()&&this._trigger("change",a,{item:this.selectedItem})},_normalize:function(a){if(a.length&&a[0].label&&a[0].value)return a;return e.map(a,function(b){if(typeof b==="string")return{label:b,value:b};return e.extend({label:b.label||b.value,value:b.value||b.label},b)})},_suggest:function(a){var b=
this.menu.element.empty().zIndex(this.element.zIndex()+1),c;this._renderMenu(b,a);this.menu.deactivate();this.menu.refresh();this.menu.element.show().position(e.extend({of:this.element},this.options.position));a=b.width("").outerWidth();c=this.element.outerWidth();b.outerWidth(Math.max(a,c))},_renderMenu:function(a,b){var c=this;e.each(b,function(d,f){c._renderItem(a,f)})},_renderItem:function(a,b){return e("<li></li>").data("item.autocomplete",b).append(e("<a></a>").text(b.label)).appendTo(a)},_move:function(a,
b){if(this.menu.element.is(":visible"))if(this.menu.first()&&/^previous/.test(a)||this.menu.last()&&/^next/.test(a)){this.element.val(this.term);this.menu.deactivate()}else this.menu[a](b);else this.search(null,b)},widget:function(){return this.menu.element}});e.extend(e.ui.autocomplete,{escapeRegex:function(a){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},filter:function(a,b){var c=new RegExp(e.ui.autocomplete.escapeRegex(b),"i");return e.grep(a,function(d){return c.test(d.label||d.value||
d)})}})})(jQuery);
(function(e){e.widget("ui.menu",{_create:function(){var a=this;this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(b){if(e(b.target).closest(".ui-menu-item a").length){b.preventDefault();a.select(b)}});this.refresh()},refresh:function(){var a=this;this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem").children("a").addClass("ui-corner-all").attr("tabindex",-1).mouseenter(function(b){a.activate(b,
e(this).parent())}).mouseleave(function(){a.deactivate()})},activate:function(a,b){this.deactivate();if(this.hasScroll()){var c=b.offset().top-this.element.offset().top,d=this.element.attr("scrollTop"),f=this.element.height();if(c<0)this.element.attr("scrollTop",d+c);else c>f&&this.element.attr("scrollTop",d+c-f+b.height())}this.active=b.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end();this._trigger("focus",a,{item:b})},deactivate:function(){if(this.active){this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
this._trigger("blur");this.active=null}},next:function(a){this.move("next",".ui-menu-item:first",a)},previous:function(a){this.move("prev",".ui-menu-item:last",a)},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},move:function(a,b,c){if(this.active){a=this.active[a+"All"](".ui-menu-item").eq(0);a.length?this.activate(c,a):this.activate(c,this.element.children(b))}else this.activate(c,
this.element.children(b))},nextPage:function(a){if(this.hasScroll())if(!this.active||this.last())this.activate(a,this.element.children(":first"));else{var b=this.active.offset().top,c=this.element.height(),d=this.element.children("li").filter(function(){var f=e(this).offset().top-b-c+e(this).height();return f<10&&f>-10});d.length||(d=this.element.children(":last"));this.activate(a,d)}else this.activate(a,this.element.children(!this.active||this.last()?":first":":last"))},previousPage:function(a){if(this.hasScroll())if(!this.active||
this.first())this.activate(a,this.element.children(":last"));else{var b=this.active.offset().top,c=this.element.height();result=this.element.children("li").filter(function(){var d=e(this).offset().top-b+c-e(this).height();return d<10&&d>-10});result.length||(result=this.element.children(":first"));this.activate(a,result)}else this.activate(a,this.element.children(!this.active||this.first()?":last":":first"))},hasScroll:function(){return this.element.height()<this.element.attr("scrollHeight")},select:function(a){this._trigger("selected",
a,{item:this.active})}})})(jQuery);
;/*
 * jQuery UI Button 1.8.4
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Button
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(a){var g,i=function(b){a(":ui-button",b.target.form).each(function(){var c=a(this).data("button");setTimeout(function(){c.refresh()},1)})},h=function(b){var c=b.name,d=b.form,e=a([]);if(c)e=d?a(d).find("[name='"+c+"']"):a("[name='"+c+"']",b.ownerDocument).filter(function(){return!this.form});return e};a.widget("ui.button",{options:{text:true,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",i);this._determineButtonType();
this.hasTitle=!!this.buttonElement.attr("title");var b=this,c=this.options,d=this.type==="checkbox"||this.type==="radio",e="ui-state-hover"+(!d?" ui-state-active":"");if(c.label===null)c.label=this.buttonElement.html();if(this.element.is(":disabled"))c.disabled=true;this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role","button").bind("mouseenter.button",function(){if(!c.disabled){a(this).addClass("ui-state-hover");this===g&&a(this).addClass("ui-state-active")}}).bind("mouseleave.button",
function(){c.disabled||a(this).removeClass(e)}).bind("focus.button",function(){a(this).addClass("ui-state-focus")}).bind("blur.button",function(){a(this).removeClass("ui-state-focus")});d&&this.element.bind("change.button",function(){b.refresh()});if(this.type==="checkbox")this.buttonElement.bind("click.button",function(){if(c.disabled)return false;a(this).toggleClass("ui-state-active");b.buttonElement.attr("aria-pressed",b.element[0].checked)});else if(this.type==="radio")this.buttonElement.bind("click.button",
function(){if(c.disabled)return false;a(this).addClass("ui-state-active");b.buttonElement.attr("aria-pressed",true);var f=b.element[0];h(f).not(f).map(function(){return a(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed",false)});else{this.buttonElement.bind("mousedown.button",function(){if(c.disabled)return false;a(this).addClass("ui-state-active");g=this;a(document).one("mouseup",function(){g=null})}).bind("mouseup.button",function(){if(c.disabled)return false;a(this).removeClass("ui-state-active")}).bind("keydown.button",
function(f){if(c.disabled)return false;if(f.keyCode==a.ui.keyCode.SPACE||f.keyCode==a.ui.keyCode.ENTER)a(this).addClass("ui-state-active")}).bind("keyup.button",function(){a(this).removeClass("ui-state-active")});this.buttonElement.is("a")&&this.buttonElement.keyup(function(f){f.keyCode===a.ui.keyCode.SPACE&&a(this).click()})}this._setOption("disabled",c.disabled)},_determineButtonType:function(){this.type=this.element.is(":checkbox")?"checkbox":this.element.is(":radio")?"radio":this.element.is("input")?
"input":"button";if(this.type==="checkbox"||this.type==="radio"){this.buttonElement=this.element.parents().last().find("label[for="+this.element.attr("id")+"]");this.element.addClass("ui-helper-hidden-accessible");var b=this.element.is(":checked");b&&this.buttonElement.addClass("ui-state-active");this.buttonElement.attr("aria-pressed",b)}else this.buttonElement=this.element},widget:function(){return this.buttonElement},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible");this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
this.hasTitle||this.buttonElement.removeAttr("title");a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments);if(b==="disabled")c?this.element.attr("disabled",true):this.element.removeAttr("disabled");this._resetButton()},refresh:function(){var b=this.element.is(":disabled");b!==this.options.disabled&&this._setOption("disabled",b);if(this.type==="radio")h(this.element[0]).each(function(){a(this).is(":checked")?a(this).button("widget").addClass("ui-state-active").attr("aria-pressed",
true):a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed",false)});else if(this.type==="checkbox")this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed",true):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed",false)},_resetButton:function(){if(this.type==="input")this.options.label&&this.element.val(this.options.label);else{var b=this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"),
c=a("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),d=this.options.icons,e=d.primary&&d.secondary;if(d.primary||d.secondary){b.addClass("ui-button-text-icon"+(e?"s":d.primary?"-primary":"-secondary"));d.primary&&b.prepend("<span class='ui-button-icon-primary ui-icon "+d.primary+"'></span>");d.secondary&&b.append("<span class='ui-button-icon-secondary ui-icon "+d.secondary+"'></span>");if(!this.options.text){b.addClass(e?"ui-button-icons-only":"ui-button-icon-only").removeClass("ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary");
this.hasTitle||b.attr("title",c)}}else b.addClass("ui-button-text-only")}}});a.widget("ui.buttonset",{_create:function(){this.element.addClass("ui-buttonset");this._init()},_init:function(){this.refresh()},_setOption:function(b,c){b==="disabled"&&this.buttons.button("option",b,c);a.Widget.prototype._setOption.apply(this,arguments)},refresh:function(){this.buttons=this.element.find(":button, :submit, :reset, :checkbox, :radio, a, :data(button)").filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass("ui-corner-left").end().filter(":last").addClass("ui-corner-right").end().end()},
destroy:function(){this.element.removeClass("ui-buttonset");this.buttons.map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");a.Widget.prototype.destroy.call(this)}})})(jQuery);
;/*
 * jQuery UI Tabs 1.8.4
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(d,p){function u(){return++v}function w(){return++x}var v=0,x=0;d.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:false,cookie:null,collapsible:false,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(true)},_setOption:function(a,e){if(a=="selected")this.options.collapsible&&
e==this.options.selected||this.select(e);else{this.options[a]=e;this._tabify()}},_tabId:function(a){return a.title&&a.title.replace(/\s/g,"_").replace(/[^A-Za-z0-9\-_:\.]/g,"")||this.options.idPrefix+u()},_sanitizeSelector:function(a){return a.replace(/:/g,"\\:")},_cookie:function(){var a=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+w());return d.cookie.apply(null,[a].concat(d.makeArray(arguments)))},_ui:function(a,e){return{tab:a,panel:e,index:this.anchors.index(a)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var a=
d(this);a.html(a.data("label.tabs")).removeData("label.tabs")})},_tabify:function(a){function e(g,f){g.css("display","");!d.support.opacity&&f.opacity&&g[0].style.removeAttribute("filter")}var b=this,c=this.options,h=/^#.+/;this.list=this.element.find("ol,ul").eq(0);this.lis=d("li:has(a[href])",this.list);this.anchors=this.lis.map(function(){return d("a",this)[0]});this.panels=d([]);this.anchors.each(function(g,f){var j=d(f).attr("href"),l=j.split("#")[0],q;if(l&&(l===location.toString().split("#")[0]||
(q=d("base")[0])&&l===q.href)){j=f.hash;f.href=j}if(h.test(j))b.panels=b.panels.add(b._sanitizeSelector(j));else if(j!=="#"){d.data(f,"href.tabs",j);d.data(f,"load.tabs",j.replace(/#.*$/,""));j=b._tabId(f);f.href="#"+j;f=d("#"+j);if(!f.length){f=d(c.panelTemplate).attr("id",j).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(b.panels[g-1]||b.list);f.data("destroy.tabs",true)}b.panels=b.panels.add(f)}else c.disabled.push(g)});if(a){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.lis.addClass("ui-state-default ui-corner-top");this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");if(c.selected===p){location.hash&&this.anchors.each(function(g,f){if(f.hash==location.hash){c.selected=g;return false}});if(typeof c.selected!=="number"&&c.cookie)c.selected=parseInt(b._cookie(),10);if(typeof c.selected!=="number"&&this.lis.filter(".ui-tabs-selected").length)c.selected=
this.lis.index(this.lis.filter(".ui-tabs-selected"));c.selected=c.selected||(this.lis.length?0:-1)}else if(c.selected===null)c.selected=-1;c.selected=c.selected>=0&&this.anchors[c.selected]||c.selected<0?c.selected:0;c.disabled=d.unique(c.disabled.concat(d.map(this.lis.filter(".ui-state-disabled"),function(g){return b.lis.index(g)}))).sort();d.inArray(c.selected,c.disabled)!=-1&&c.disabled.splice(d.inArray(c.selected,c.disabled),1);this.panels.addClass("ui-tabs-hide");this.lis.removeClass("ui-tabs-selected ui-state-active");
if(c.selected>=0&&this.anchors.length){this.panels.eq(c.selected).removeClass("ui-tabs-hide");this.lis.eq(c.selected).addClass("ui-tabs-selected ui-state-active");b.element.queue("tabs",function(){b._trigger("show",null,b._ui(b.anchors[c.selected],b.panels[c.selected]))});this.load(c.selected)}d(window).bind("unload",function(){b.lis.add(b.anchors).unbind(".tabs");b.lis=b.anchors=b.panels=null})}else c.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"));this.element[c.collapsible?"addClass":
"removeClass"]("ui-tabs-collapsible");c.cookie&&this._cookie(c.selected,c.cookie);a=0;for(var i;i=this.lis[a];a++)d(i)[d.inArray(a,c.disabled)!=-1&&!d(i).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled");c.cache===false&&this.anchors.removeData("cache.tabs");this.lis.add(this.anchors).unbind(".tabs");if(c.event!=="mouseover"){var k=function(g,f){f.is(":not(.ui-state-disabled)")&&f.addClass("ui-state-"+g)},n=function(g,f){f.removeClass("ui-state-"+g)};this.lis.bind("mouseover.tabs",
function(){k("hover",d(this))});this.lis.bind("mouseout.tabs",function(){n("hover",d(this))});this.anchors.bind("focus.tabs",function(){k("focus",d(this).closest("li"))});this.anchors.bind("blur.tabs",function(){n("focus",d(this).closest("li"))})}var m,o;if(c.fx)if(d.isArray(c.fx)){m=c.fx[0];o=c.fx[1]}else m=o=c.fx;var r=o?function(g,f){d(g).closest("li").addClass("ui-tabs-selected ui-state-active");f.hide().removeClass("ui-tabs-hide").animate(o,o.duration||"normal",function(){e(f,o);b._trigger("show",
null,b._ui(g,f[0]))})}:function(g,f){d(g).closest("li").addClass("ui-tabs-selected ui-state-active");f.removeClass("ui-tabs-hide");b._trigger("show",null,b._ui(g,f[0]))},s=m?function(g,f){f.animate(m,m.duration||"normal",function(){b.lis.removeClass("ui-tabs-selected ui-state-active");f.addClass("ui-tabs-hide");e(f,m);b.element.dequeue("tabs")})}:function(g,f){b.lis.removeClass("ui-tabs-selected ui-state-active");f.addClass("ui-tabs-hide");b.element.dequeue("tabs")};this.anchors.bind(c.event+".tabs",
function(){var g=this,f=d(g).closest("li"),j=b.panels.filter(":not(.ui-tabs-hide)"),l=d(b._sanitizeSelector(g.hash));if(f.hasClass("ui-tabs-selected")&&!c.collapsible||f.hasClass("ui-state-disabled")||f.hasClass("ui-state-processing")||b._trigger("select",null,b._ui(this,l[0]))===false){this.blur();return false}c.selected=b.anchors.index(this);b.abort();if(c.collapsible)if(f.hasClass("ui-tabs-selected")){c.selected=-1;c.cookie&&b._cookie(c.selected,c.cookie);b.element.queue("tabs",function(){s(g,
j)}).dequeue("tabs");this.blur();return false}else if(!j.length){c.cookie&&b._cookie(c.selected,c.cookie);b.element.queue("tabs",function(){r(g,l)});b.load(b.anchors.index(this));this.blur();return false}c.cookie&&b._cookie(c.selected,c.cookie);if(l.length){j.length&&b.element.queue("tabs",function(){s(g,j)});b.element.queue("tabs",function(){r(g,l)});b.load(b.anchors.index(this))}else throw"jQuery UI Tabs: Mismatching fragment identifier.";d.browser.msie&&this.blur()});this.anchors.bind("click.tabs",
function(){return false})},_getIndex:function(a){if(typeof a=="string")a=this.anchors.index(this.anchors.filter("[href$="+a+"]"));return a},destroy:function(){var a=this.options;this.abort();this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.anchors.each(function(){var e=d.data(this,"href.tabs");if(e)this.href=
e;var b=d(this).unbind(".tabs");d.each(["href","load","cache"],function(c,h){b.removeData(h+".tabs")})});this.lis.unbind(".tabs").add(this.panels).each(function(){d.data(this,"destroy.tabs")?d(this).remove():d(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")});a.cookie&&this._cookie(null,a.cookie);return this},add:function(a,e,b){if(b===p)b=this.anchors.length;
var c=this,h=this.options;e=d(h.tabTemplate.replace(/#\{href\}/g,a).replace(/#\{label\}/g,e));a=!a.indexOf("#")?a.replace("#",""):this._tabId(d("a",e)[0]);e.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);var i=d("#"+a);i.length||(i=d(h.panelTemplate).attr("id",a).data("destroy.tabs",true));i.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");if(b>=this.lis.length){e.appendTo(this.list);i.appendTo(this.list[0].parentNode)}else{e.insertBefore(this.lis[b]);
i.insertBefore(this.panels[b])}h.disabled=d.map(h.disabled,function(k){return k>=b?++k:k});this._tabify();if(this.anchors.length==1){h.selected=0;e.addClass("ui-tabs-selected ui-state-active");i.removeClass("ui-tabs-hide");this.element.queue("tabs",function(){c._trigger("show",null,c._ui(c.anchors[0],c.panels[0]))});this.load(0)}this._trigger("add",null,this._ui(this.anchors[b],this.panels[b]));return this},remove:function(a){a=this._getIndex(a);var e=this.options,b=this.lis.eq(a).remove(),c=this.panels.eq(a).remove();
if(b.hasClass("ui-tabs-selected")&&this.anchors.length>1)this.select(a+(a+1<this.anchors.length?1:-1));e.disabled=d.map(d.grep(e.disabled,function(h){return h!=a}),function(h){return h>=a?--h:h});this._tabify();this._trigger("remove",null,this._ui(b.find("a")[0],c[0]));return this},enable:function(a){a=this._getIndex(a);var e=this.options;if(d.inArray(a,e.disabled)!=-1){this.lis.eq(a).removeClass("ui-state-disabled");e.disabled=d.grep(e.disabled,function(b){return b!=a});this._trigger("enable",null,
this._ui(this.anchors[a],this.panels[a]));return this}},disable:function(a){a=this._getIndex(a);var e=this.options;if(a!=e.selected){this.lis.eq(a).addClass("ui-state-disabled");e.disabled.push(a);e.disabled.sort();this._trigger("disable",null,this._ui(this.anchors[a],this.panels[a]))}return this},select:function(a){a=this._getIndex(a);if(a==-1)if(this.options.collapsible&&this.options.selected!=-1)a=this.options.selected;else return this;this.anchors.eq(a).trigger(this.options.event+".tabs");return this},
load:function(a){a=this._getIndex(a);var e=this,b=this.options,c=this.anchors.eq(a)[0],h=d.data(c,"load.tabs");this.abort();if(!h||this.element.queue("tabs").length!==0&&d.data(c,"cache.tabs"))this.element.dequeue("tabs");else{this.lis.eq(a).addClass("ui-state-processing");if(b.spinner){var i=d("span",c);i.data("label.tabs",i.html()).html(b.spinner)}this.xhr=d.ajax(d.extend({},b.ajaxOptions,{url:h,success:function(k,n){d(e._sanitizeSelector(c.hash)).html(k);e._cleanup();b.cache&&d.data(c,"cache.tabs",
true);e._trigger("load",null,e._ui(e.anchors[a],e.panels[a]));try{b.ajaxOptions.success(k,n)}catch(m){}},error:function(k,n){e._cleanup();e._trigger("load",null,e._ui(e.anchors[a],e.panels[a]));try{b.ajaxOptions.error(k,n,a,c)}catch(m){}}}));e.element.dequeue("tabs");return this}},abort:function(){this.element.queue([]);this.panels.stop(false,true);this.element.queue("tabs",this.element.queue("tabs").splice(-2,2));if(this.xhr){this.xhr.abort();delete this.xhr}this._cleanup();return this},url:function(a,
e){this.anchors.eq(a).removeData("cache.tabs").data("load.tabs",e);return this},length:function(){return this.anchors.length}});d.extend(d.ui.tabs,{version:"1.8.4"});d.extend(d.ui.tabs.prototype,{rotation:null,rotate:function(a,e){var b=this,c=this.options,h=b._rotate||(b._rotate=function(i){clearTimeout(b.rotation);b.rotation=setTimeout(function(){var k=c.selected;b.select(++k<b.anchors.length?k:0)},a);i&&i.stopPropagation()});e=b._unrotate||(b._unrotate=!e?function(i){i.clientX&&b.rotate(null)}:
function(){t=c.selected;h()});if(a){this.element.bind("tabsshow",h);this.anchors.bind(c.event+".tabs",e);h()}else{clearTimeout(b.rotation);this.element.unbind("tabsshow",h);this.anchors.unbind(c.event+".tabs",e);delete this._rotate;delete this._unrotate}return this}})})(jQuery);
;