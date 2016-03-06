function WriteLeftMenu(divID, aID, divClassName, aClassName)
{
document.write("<div id=\"divID65\" class=\"headerLeftMenuInActive\"><a id=\"aID65\" href=\"#\" OnMouseOver=\"link('_dir','doxys_1_15_win_bin0',this)\" class=\"leftMenuLinkHeadInActive\">doxys_1_15_win_bin</a></div>\n");
document.write("<div id='leftmenutree' class='treeLeftMenu'>\n");
var treeLeftMenu = new TreeClass('treeLeftMenu', false);
treeLeftMenu.setTreeHeightDelta(-205);
treeLeftMenu.m_iDefaultExpandedLevel = 1;treeLeftMenu.setExpandCollapseNames('Expand All','Collapse All');
treeLeftMenu.startTree( true );
  treeLeftMenu.startParentNode('Default mainpage','"#"','','../common/directoryBlue', { "onmouseover":"link('','../index',this);" });
  treeLeftMenu.startParentNode('doxys_1_15_win_bin','"#"','','../common/directoryBlue', { "onmouseover":"link('_dir','doxys_1_15_win_bin0',this);" });
  treeLeftMenu.startParentNode('Classes','"#"','','../common/classesBlue');
  treeLeftMenu.addNode('MainWindow','"#"','','../common/class', { "onmouseover":"link('_class','MainWindow0',this);" });
treeLeftMenu.endParentNode();
  treeLeftMenu.startParentNode('Functions','"#"','','../common/functionsBlue');
  treeLeftMenu.addNode('main','"#"','','../common/function', { "onmouseover":"link('_member','main2668469848',this);" });
treeLeftMenu.endParentNode();
treeLeftMenu.endParentNode();
treeLeftMenu.endParentNode();
treeLeftMenu.endTree();
treeLeftMenu.readStateFromCookie();
document.write("</div>\n");
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
