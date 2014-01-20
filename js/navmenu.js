var menuJSON = "{\"title\":\"Navigation\",\"children\":[{\"title\":\"Dolor\",\"children\":[]},{\"title\":\"Ipsum\",\"children\":[{\"title\":\"Ipsum1\",\"children\":[{\"title\":\"Ipsum11\",\"children\":[]},{\"title\":\"Ipsum12\",\"children\":[]}]},{\"title\":\"Ipsum2\",\"children\":[]},{\"title\":\"Ipsum3\",\"children\":[]}]},{\"title\":\"Lorem\",\"children\":[{\"title\":\"Lorem1\",\"children\":[]},{\"title\":\"Lorem2\",\"children\":[]},{\"title\":\"Lorem3\",\"children\":[]}]},{\"title\":\"Sit\",\"children\":[]},{\"title\":\"Amet\",\"children\":[]}]}";
var menu = JSON.parse(menuJSON),
    movingDiv,
    prevIds=[];
addMovingDiv();
buildMenuTree(menu,0);

function buildMenuTree(node, level)
{
    console.log(node.title);
    if(!node || node.children.length <= 0)
    {
        return;
    }
    var menuDiv, titleDiv, itemsSectionDiv,menuItemDiv,backDiv;
    menuDiv = document.createElement("div");
    titleDiv = document.createElement("div");
    itemsSectionDiv = document.createElement("div");
    menuDiv.className = "menu";
    menuDiv.id = node.title.split(' ').join('').toLowerCase()+"Menu";
    titleDiv.className = "menuTitle";
    titleDiv.innerHTML = node.title;
    if(level > 0)
    {
        backDiv = document.createElement("div");
        backDiv.className = "navback";
        backDiv.innerHTML = "Back";
        backDiv.onclick = navigateBack;
        titleDiv.appendChild(backDiv);
    }
    itemsSectionDiv.className = "menuItemsSection";
    for(var i=0; i<node.children.length; i++)
    {
        menuItemDiv = document.createElement("div");
        menuItemDiv.className = "menuItem";
        menuItemDiv.innerHTML = node.children[i].title;
        menuItemDiv.onclick = menuItemClick;
        itemsSectionDiv.appendChild(menuItemDiv);
    }
    menuDiv.appendChild(titleDiv);
    menuDiv.appendChild(itemsSectionDiv);
    if(level == 0) 
    {
        $(menuDiv).css({"display":"block","opacity":"1.0","left":200*level});
    }
    else
    {
        $(menuDiv).css("left",200*level);   
    }
    movingDiv.appendChild(menuDiv);
    for(var i=0; i<node.children.length; i++)
    {
        buildMenuTree(node.children[i], level+1);
    }
}

function addMovingDiv()
{
    $("<div id=\"movingDiv\" class=\"movingDiv\"></div>").appendTo(".menuContainer");
    movingDiv = document.getElementById("movingDiv");
}

$( document ).ready(function() {
  $(".menuContainer").css("height",window.innerHeight);
});

function menuItemClick(evt)
{
    var item = evt.currentTarget,
        currMenu = item.parentNode.parentNode, 
        currId = currMenu.id,
        menuId = $(item).text().split(' ').join('').toLowerCase()+"Menu",
        menu = document.getElementById(menuId);
    if(menu)
    {
        var currLeft = parseInt($(movingDiv).css('left'));
        $(currMenu).css({"display":"none","opacity":"0.0"});
        prevIds.push(currId);
        $(menu).css({"display":"block","opacity":"1.0"});
        $(movingDiv).css('left',currLeft-200);
        logEvents(item.innerHTML, currId, menuId);
    }
    else
    {
        logEvents(item.innerHTML);
    }
}

function navigateBack(evt)
{
    var item = evt.currentTarget,
        currMenu = item.parentNode.parentNode,
        prevId = prevIds.pop(),
        currLeft = parseInt($(movingDiv).css('left'));
    $(currMenu).css({"display":"none","opacity":"0.0"});
    $("#"+prevId).css({"display":"block","opacity":"1.0"});
    $(movingDiv).css('left',currLeft+200);
    logEvents(item.innerHTML, currMenu.id, prevId);
}

function logEvents(menuItemTitle, currMenuId, nextMenuId)
{
    $("#log").append("-Clicked on "+menuItemTitle+".<br>");
    if(currMenuId && nextMenuId)
    {
        $("#log").append("*Navigating from "+currMenuId+" to "+nextMenuId+".<br>");
    }
}
// http://jsfiddle.net/Bf9fh/