function WriteLeftMenu(divID, aID, divClassName, aClassName)
{
document.write("<div id=\"divID6\" class=\"headerLeftMenuInActive\"><a id=\"aID6\" href=\"#\" OnMouseOver=\"link('_statsindex','index',this)\" class=\"leftMenuLinkHeadInActive\">Statistics</a></div>\n");
document.write("<div id='leftmenutree' class='treeLeftMenu'>\n");
var treeLeftMenu = new TreeClass('treeLeftMenu', false);
treeLeftMenu.setTreeHeightDelta(-205);
treeLeftMenu.m_iDefaultExpandedLevel = 1;treeLeftMenu.setExpandCollapseNames('Expand All','Collapse All');
treeLeftMenu.startTree( true );
  treeLeftMenu.startParentNode('Default mainpage','"#"','','../directoryBlue', { "onmouseover":"link('','../../index',this);" });
  treeLeftMenu.startParentNode('doxys_1_15_win_bin','"#"','','../directoryBlue', { "onmouseover":"link('_dir','../../doxys_1_15_win_bin/doxys_1_15_win_bin0',this);" });
  treeLeftMenu.startParentNode('Classes','"#"','','../classesBlue');
  treeLeftMenu.addNode('MainWindow','"#"','','../class', { "onmouseover":"link('_class','../../doxys_1_15_win_bin/MainWindow0',this);" });
treeLeftMenu.endParentNode();
  treeLeftMenu.startParentNode('Functions','"#"','','../functionsBlue');
  treeLeftMenu.addNode('main','"#"','','../function', { "onmouseover":"link('_member','../../doxys_1_15_win_bin/main2668469848',this);" });
treeLeftMenu.endParentNode();
treeLeftMenu.endParentNode();
treeLeftMenu.endParentNode();
treeLeftMenu.endTree();
treeLeftMenu.readStateFromCookie();
document.write("</div>\n");
document.write("<div class=\"paragraphLeftMenu\">Pages</div>\n");
document.write("<div id=\"divID67\" class=\"leftMenuTreeInActive\"><a id=\"aID67\" href=\"#\" OnMouseOver=\"link('_statsgeneral','stats_general',this)\" class=\"leftMenuLinkInActive\">General</a></div>\n");
document.write("<div id=\"divID68\" class=\"leftMenuTreeInActive\"><a id=\"aID68\" href=\"#\" OnMouseOver=\"link('_statsundoc','stats_undoc',this)\" class=\"leftMenuLinkInActive\">Undocumented</a></div>\n");
document.write("<div id=\"divID69\" class=\"leftMenuTreeInActive\"><a id=\"aID69\" href=\"#\" OnMouseOver=\"link('_statsmsg','stats_msg_msg',this)\" class=\"leftMenuLinkInActive\">Msg-Messages</a></div>\n");
document.write("<div id=\"divID70\" class=\"leftMenuTreeInActive\"><a id=\"aID70\" href=\"#\" OnMouseOver=\"link('_statsmsg','stats_msg_warn',this)\" class=\"leftMenuLinkInActive\">Msg-Warnings</a></div>\n");
document.write("<div id=\"divID71\" class=\"leftMenuTreeInActive\"><a id=\"aID71\" href=\"#\" OnMouseOver=\"link('_statsmsg','stats_msg_err',this)\" class=\"leftMenuLinkInActive\">Msg-Errors</a></div>\n");
document.write("<div id=\"divID72\" class=\"leftMenuTreeInActive\"><a id=\"aID72\" href=\"#\" OnMouseOver=\"link('_statsmsg','stats_msg_dbg',this)\" class=\"leftMenuLinkInActive\">Msg-Debug</a></div>\n");
if(divID != "" && aID != "")
{
  var elemDiv = document.getElementById(divID);
  var elemA = document.getElementById(aID);
  if (elemDiv != undefined && elemA != undefined ) { // this is needed to abvoid crashing js on some memberpages 
    elemDiv.className = divClassName;
    elemA.className = aClassName;
  }
}
}
