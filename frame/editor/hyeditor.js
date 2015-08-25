var hyeditor = {};

hyeditor.map = {
	_mode:0
};
hyeditor.assemble = {
	_selectedUnit:null,
	_curActionName:null
};

hyeditor.menu = new HY.GUI.Menu({
	x:0,
	y:0,
	width:400,
	height:25,
	backgroundColor:'#ffffff',
	items:hyeditordata.menu
});
hyeditor.menu.addEventListener("menuitem",hyeditorevent.menu.menuitem,hyeditor);
hyeditor.projectTreeView =  new HY.GUI.TreeView({
	rootNode:hyeditordata.projectTree
});
hyeditor.projectTreePanel = new HY.GUI.Panel({
	title:'项目列表',
	viewPort:new HY.GUI.ScrollView({contentView:hyeditor.projectTreeView})
});
hyeditor.map.resTreeView = new HY.GUI.TreeView({
	rootNode:hyeditordata.map.resTree
});
hyeditor.map.resTreePanel = new HY.GUI.Panel({
	title:'资源列表',
	viewPort:new HY.GUI.ScrollView({contentView:hyeditor.map.resTreeView})
});
hyeditor.map.resTreeView.addEventListener("nodeselected",hyeditorevent.map.resTree.nodeselected,null);
hyeditor.map.terrain = new HY.Tools.Terrain({
	x:0,y:0,width:600,height:500,backgroundColor:'#CCCCCC'
});
hyeditor.map.terrainPanel = new HY.GUI.Panel({
	title:'地图'
});
hyeditor.map.terrainPanel.getViewPort().addChildNodeAtLayer(hyeditor.map.terrain,0);
hyeditor.map.terrain.addEventListener("mousedown",hyeditorevent.map.terrain.mousedown,hyeditor);
hyeditor.map.terrain.addEventListener("mousemove",hyeditorevent.map.terrain.mousemove,hyeditor);
hyeditor.map.window = new HY.GUI.Window({
	width:610,
	height:100,
	dragAble:false,
	closeAble:false,
	title:'地图编辑器',
	viewPort: new HY.GUI.SplitView({
		width:600,
		splitDirection:1,
		adjustAble:false,
		splitViews:[
			hyeditor.menu,
			new HY.GUI.SplitView({
				width:600,
				splitViews:[hyeditor.projectTreePanel,hyeditor.map.terrainPanel,hyeditor.map.resTreePanel],
				splitParam:[150,300,150],
				autoAdjustViewIndex:1,
				splitByPixel:true
			})
		],
		splitParam:[25,25],
		splitByPixel:true
	})
});
hyeditor.map.window.addEventListener("finishlaunch",hyeditorevent.map.window.finishlaunch,null);
hyeditor.map.window.addEventListener("canvassizechanged",hyeditorevent.map.window.canvassizechanged,null);
hyeditor.map.getMode = function(){
	return this._mode;
}
hyeditor.map.setMode = function(pMode){
	this._mode = pMode;
}
hyeditor.map.importMapData = function(){}
hyeditor.map.exportMapData = function(){}

hyeditor.assemble.structTreeView = new HY.GUI.TreeView({});
hyeditor.assemble.structTreePanel = new HY.GUI.Panel({
	title:'结构',
	viewPort:new HY.GUI.ScrollView({contentView:hyeditor.assemble.structTreeView})
});
hyeditor.assemble.structTreeView.addEventListener("nodeselected",hyeditorevent.assemble.structTree.nodeselected,hyeditor);
hyeditor.assemble.structTreeView.addEventListener("nodemove",hyeditorevent.assemble.structTree.nodemove,hyeditor);
hyeditor.assemble.structTreeView.addEventListener("nodenamechanged",hyeditorevent.assemble.structTree.nodenamechanged,hyeditor);
hyeditor.assemble.structTreeView.addEventListener("nodecontextmenu",hyeditorevent.assemble.structTree.nodecontextmenu,hyeditor);
hyeditor.assemble.assemble = null;
hyeditor.assemble.assemblePanel = new HY.GUI.Panel({
	title:'编辑区'
});
hyeditor.assemble.unitPanel = new HY.GUI.Panel({
	title:'零件参数'
});
hyeditor.assemble.unitNameLabel = new HY.GUI.Label({
	text:'名称:',
	x:5,
	y:5,
	width:50,
	height:25,
	textAlign:HY.GUI.TEXTALIGNCRIGHT
});
hyeditor.assemble.unitNameBox = new HY.GUI.TextBox({
	x:60,
	y:5,
	width:60,
	height:25,
	borderWidth:1.0,
	borderColor:'gray'
});
hyeditor.assemble.unitXLabel = new HY.GUI.Label({
	text:'X轴:',
	x:5,
	y:35,
	width:50,
	height:25,
	textAlign:HY.GUI.TEXTALIGNCRIGHT
});
hyeditor.assemble.unitXBox = new HY.GUI.TextBox({
	x:60,
	y:35,
	width:60,
	height:25,
	borderWidth:1.0,
	borderColor:'gray'
});
hyeditor.assemble.unitYLabel = new HY.GUI.Label({
	text:'Y轴:',
	x:5,
	y:65,
	width:50,
	height:25,
	textAlign:HY.GUI.TEXTALIGNCRIGHT
});
hyeditor.assemble.unitYBox = new HY.GUI.TextBox({
	x:60,
	y:65,
	width:60,
	height:25,
	borderWidth:1.0,
	borderColor:'gray'
});
hyeditor.assemble.unitWidthLabel  = new HY.GUI.Label({
	text:'宽度:',
	x:5,
	y:95,
	width:50,
	height:25,
	textAlign:HY.GUI.TEXTALIGNCRIGHT
});
hyeditor.assemble.unitWidthBox = new HY.GUI.TextBox({
	x:60,
	y:95,
	width:60,
	height:25,
	borderWidth:1.0,
	borderColor:'gray'
});
hyeditor.assemble.unitHeightLabel = new HY.GUI.Label({
	text:'高度:',
	x:5,
	y:125,
	width:50,
	height:25,
	textAlign:HY.GUI.TEXTALIGNCRIGHT
});
hyeditor.assemble.unitHeightBox = new HY.GUI.TextBox({
	x:60,
	y:125,
	width:60,
	height:25,
	borderWidth:1.0,
	borderColor:'gray'
});
hyeditor.assemble.unitAnchorXLabel = new HY.GUI.Label({
	text:'锚点X:',
	x:5,
	y:155,
	width:50,
	height:25,
	textAlign:HY.GUI.TEXTALIGNCRIGHT
});
hyeditor.assemble.unitAnchorXBox = new HY.GUI.TextBox({
	x:60,
	y:155,
	width:60,
	height:25,
	borderWidth:1.0,
	borderColor:'gray'
});
hyeditor.assemble.unitAnchorYLabel = new HY.GUI.Label({
	text:'锚点Y:',
	x:5,
	y:185,
	width:50,
	height:25,
	textAlign:HY.GUI.TEXTALIGNCRIGHT
});
hyeditor.assemble.unitAnchorYBox = new HY.GUI.TextBox({
	x:60,
	y:185,
	width:60,
	height:25,
	borderWidth:1.0,
	borderColor:'gray'
});
hyeditor.assemble.unitAlphaLabel = new HY.GUI.Label({
	text:'透明度:',
	x:5,
	y:215,
	width:50,
	height:25,
	textAlign:HY.GUI.TEXTALIGNCRIGHT
});
hyeditor.assemble.unitAlphaBox = new HY.GUI.TextBox({
	x:60,
	y:215,
	width:60,
	height:25,
	borderWidth:1.0,
	borderColor:'gray'
});
hyeditor.assemble.unitTextureLabel = new HY.GUI.Label({
	text:'贴图:',
	x:5,
	y:245,
	width:50,
	height:25,
	textAlign:HY.GUI.TEXTALIGNCRIGHT
});
hyeditor.assemble.unitTextureBtn = new HY.GUI.Button({
	x:60,
	y:245,
	width:60,
	height:25,
	title:'选择',
	normalColor:'#AAAAAA'
});
hyeditor.assemble.unitPanel.getViewPort().addChildNodeAtLayer(hyeditor.assemble.unitNameLabel,0);
hyeditor.assemble.unitPanel.getViewPort().addChildNodeAtLayer(hyeditor.assemble.unitNameBox,0);
hyeditor.assemble.unitPanel.getViewPort().addChildNodeAtLayer(hyeditor.assemble.unitXLabel,0);
hyeditor.assemble.unitPanel.getViewPort().addChildNodeAtLayer(hyeditor.assemble.unitXBox,0);
hyeditor.assemble.unitPanel.getViewPort().addChildNodeAtLayer(hyeditor.assemble.unitYLabel,0);
hyeditor.assemble.unitPanel.getViewPort().addChildNodeAtLayer(hyeditor.assemble.unitYBox,0);
hyeditor.assemble.unitPanel.getViewPort().addChildNodeAtLayer(hyeditor.assemble.unitWidthLabel,0);
hyeditor.assemble.unitPanel.getViewPort().addChildNodeAtLayer(hyeditor.assemble.unitWidthBox,0);
hyeditor.assemble.unitPanel.getViewPort().addChildNodeAtLayer(hyeditor.assemble.unitHeightLabel,0);
hyeditor.assemble.unitPanel.getViewPort().addChildNodeAtLayer(hyeditor.assemble.unitHeightBox,0);
hyeditor.assemble.unitPanel.getViewPort().addChildNodeAtLayer(hyeditor.assemble.unitAnchorXLabel,0);
hyeditor.assemble.unitPanel.getViewPort().addChildNodeAtLayer(hyeditor.assemble.unitAnchorXBox,0);
hyeditor.assemble.unitPanel.getViewPort().addChildNodeAtLayer(hyeditor.assemble.unitAnchorYLabel,0);
hyeditor.assemble.unitPanel.getViewPort().addChildNodeAtLayer(hyeditor.assemble.unitAnchorYBox,0);
hyeditor.assemble.unitPanel.getViewPort().addChildNodeAtLayer(hyeditor.assemble.unitAlphaLabel,0);
hyeditor.assemble.unitPanel.getViewPort().addChildNodeAtLayer(hyeditor.assemble.unitAlphaBox,0);
hyeditor.assemble.unitPanel.getViewPort().addChildNodeAtLayer(hyeditor.assemble.unitTextureLabel,0);
hyeditor.assemble.unitPanel.getViewPort().addChildNodeAtLayer(hyeditor.assemble.unitTextureBtn,0);
hyeditor.assemble.actionListView = new HY.GUI.ListView({
	contextMenu:hyeditordata.assemble.actionList.contextMenu
});
hyeditor.assemble.actionListPanel = new HY.GUI.Panel({
	title:'动作列表',
	viewPort:new HY.GUI.ScrollView({contentView:hyeditor.assemble.actionListView})
});
hyeditor.assemble.actionListView.addEventListener("contextmenu",hyeditorevent.assemble.actionList.contextmenu,hyeditor);
hyeditor.assemble.actionListView.addEventListener("itemselected",hyeditorevent.assemble.actionList.itemselected,hyeditor);
hyeditor.assemble.actionListView.addEventListener("itemcontextmenu",hyeditorevent.assemble.actionList.itemcontextmenu,hyeditor);
hyeditor.assemble.timelineListView = new HY.GUI.TimeLineListView({});
hyeditor.assemble.timelineListPanel = new HY.GUI.Panel({
	title:'时间轴',
	viewPort:new HY.GUI.ScrollView({contentView:hyeditor.assemble.timelineListView})
});
hyeditor.assemble.timelineListView.addEventListener("itemselected",hyeditorevent.assemble.timeline.itemselected,hyeditor);
hyeditor.assemble.timelineListView.addEventListener("itemcontextmenu",hyeditorevent.assemble.timeline.itemcontextmenu,hyeditor);
hyeditor.assemble.timelineListView.addEventListener("curframechanged",hyeditorevent.assemble.timeline.curframechanged,hyeditor);
hyeditor.assemble.window = new HY.GUI.Window({
	x:50,
	y:50,
	width:700,
	height:500,
	visible:false,
	title:'动画编辑器',
	viewPort:new HY.GUI.SplitView({
		width:700,
		splitDirection:1,
		splitViews:[
			new HY.GUI.SplitView({
				width:700,
				splitViews:[hyeditor.assemble.structTreePanel,hyeditor.assemble.assemblePanel,hyeditor.assemble.unitPanel],
				splitParam:[150,400,150],
				autoAdjustViewIndex:1,
				splitByPixel:true
			}),
			new HY.GUI.SplitView({
				width:700,
				splitViews:[hyeditor.assemble.actionListPanel,hyeditor.assemble.timelineListPanel],
				splitParam:[150,400],
				splitByPixel:true
			})
		],
		splitParam:[350,150],
		splitByPixel:true
	})
});
hyeditor.assemble.getCurActionName = function(){
	return this._curActionName;
}
hyeditor.assemble.setCurActionName = function(pName){
	this._curActionName = pName;
	this.refreshTimeList();
}
hyeditor.assemble.getSelectedUnit = function(){
	return this._selectedUnit;
}
hyeditor.assemble.setSelectedUnit = function(pUnit){
	if(!this._selectedUnit || this._selectedUnit != pUnit){
		if(this._selectedUnit){
			this._selectedUnit.setSelected(false);
		}
		pUnit.setSelected(true);
		this._selectedUnit = pUnit;
		var structnode = pUnit.getUserProperty("node");
		if(structnode){
			this.structTreeView.setSelectedNode(structnode);
		}
		var timeline = pUnit.getUserProperty("time");
		if(timeline){
			this.timelineListView.setSelectedItem(timeline);
		}
		hyeditor.assemble.unitNameLabel = new HY.GUI.Label({
			text:'名称:',
			x:5,
			y:5,
			width:50,
			height:25,
			textAlign:HY.GUI.TEXTALIGNCRIGHT
		});
		hyeditor.assemble.unitNameBox.setText(pUnit.getName()+"");
		hyeditor.assemble.unitXBox.setText(pUnit.getX()+"");
		hyeditor.assemble.unitYBox.setText(pUnit.getY()+"");
		hyeditor.assemble.unitWidthBox.setText(pUnit.getWidth()+"");
		hyeditor.assemble.unitHeightBox.setText(pUnit.getHeight()+"");
		hyeditor.assemble.unitAnchorXBox.setText(pUnit.getAnchorPointX()+"");
		hyeditor.assemble.unitAnchorYBox.setText(pUnit.getAnchorPointY()+"");
		hyeditor.assemble.unitAlphaBox.setText(pUnit.getAlpha()+"");
	}
}
hyeditor.assemble._createEditUnit = function(pConfig){
	var config = pConfig;
	if(!config){
		config = {
			name:'新零件'
		};
	}
	config.contextMenu=hyeditordata.assemble.newUnit.contextMenu;
	var curunit = new HY.Tools.Unit(config);
	curunit.addEventListener("mousedown",hyeditorevent.assemble.unit.mousedown,hyeditor);
	curunit.addEventListener("contextmenu",hyeditorevent.assemble.unit.contextmenu,null);
	curunit.addEventListener("positionchanged",hyeditorevent.assemble.unit.positionchanged,hyeditor);
	curunit.addEventListener("sizechanged",hyeditorevent.assemble.unit.sizechanged,hyeditor);
	curunit.addEventListener("anglechanged",hyeditorevent.assemble.unit.anglechanged,hyeditor);
	curunit.addEventListener("anchorchanged",hyeditorevent.assemble.unit.anchorchanged,hyeditor);
	var childnodes = config.childNodes;
	if(childnodes){
		var len = childnodes.length;
		for(var i=0; i<len ; ++i){
			curunit.addChildUnit(this.createEditUnit(childnodes[i]));
		}
	}
	return curunit;
}
hyeditor.assemble._createEditAssemble = function(pConfig){
	var config = pConfig;
	if(!config){
		config = {
			name:'新装配件',
			width:100,
			height:100
		};
	}
	config.contextMenu = hyeditordata.assemble.newUnit.contextMenu;
	var curassemble = new HY.Tools.Assemble(config);
	curassemble.addEventListener("mousedown",hyeditorevent.assemble.unit.mousedown,hyeditor);
	curassemble.addEventListener("contextmenu",hyeditorevent.assemble.unit.contextmenu,null);
	curassemble.addEventListener("positionchanged",hyeditorevent.assemble.unit.positionchanged,hyeditor);
	curassemble.addEventListener("sizechanged",hyeditorevent.assemble.unit.sizechanged,hyeditor);
	curassemble.addEventListener("anglechanged",hyeditorevent.assemble.unit.anglechanged,hyeditor);
	curassemble.addEventListener("anchorchanged",hyeditorevent.assemble.unit.anchorchanged,hyeditor);
	var childnodes = config.childNodes;
	if(childnodes){
		var len = childnodes.length;
		for(var i = 0; i<len ; ++i){
			curassemble.addChildUnit(this.createEditUnit(childnodes[i]));
		}
	}
	return curassemble;
}

hyeditor.assemble._createStructNode = function(pSprite){
	var pStructNode = {
		name:pSprite.getName(),
		leaf:false,
		expanded:false,
		normalIcon:hyeditordata.assemble.structNode.nodeNormalIcon,
		expandIcon:hyeditordata.assemble.structNode.nodeExpandIcon,
		userProperty:{
			sprite:pSprite
		},
		childNodes:[]
	}
	if(pSprite == this.assemble){
		pStructNode.contextMenu = hyeditordata.assemble.structNode.rootContextMenu;
	}else{
		pStructNode.contextMenu = hyeditordata.assemble.structNode.nodeContextMenu;
	}
	if(pSprite == this._selectedUnit){
		pStructNode.selected = true;
	}
	pSprite.setUserProperty("node",pStructNode);

	var spriteUnitNodes = pSprite.getChildUnits();
	var len = spriteUnitNodes.length;
	for(var i = 0; i<len ; ++i){
		pStructNode.childNodes.push(this._createStructNode(spriteUnitNodes[i]));
	}
	return pStructNode;
}
hyeditor.assemble._createActionList = function(){
	var actionitems = this.assemble.getActionNames();
	var len = actionitems.length;
	for(var i=0; i<len ; ++i){
		var curactionitem = actionitems[i];
		curactionitem.contextMenu = hyeditordata.assemble.actionList.itemContextMenu;
	}
	return actionitems;
}
hyeditor.assemble._createTimeList = function(pSprite,pActionname,pItems){
	if(pActionname ){
		var items = pItems?pItems:[];
		var timelineitem = {
			name:pSprite.getName(),
			keyFrames:pSprite.getActionFramesByName(pActionname),
			userProperty:{
				sprite:pSprite
			},
			contextMenu:hyeditordata.assemble.timeline.contextMenu
		};
		pSprite.setUserProperty("time",timelineitem);
		if(pSprite == this._selectedUnit){
			this.timelineListView.setSelectedItem(timelineitem);
		}
		items.push(timelineitem);
		var spriteChildUnits = pSprite.getChildUnits();
		var len = spriteChildUnits.length;
		for(var i=0; i<len ; ++i){
			this._createTimeList(spriteChildUnits[i],pActionname,items);
		}
		return items;
	}else{
		return [];
	}
}
hyeditor.assemble.refreshEditAssemble = function(pJson){
	this.assemble = this._createEditAssemble(pJson);
	this.assemblePanel.getViewPort().addChildNodeAtLayer(hyeditor.assemble.assemble,0);
}
hyeditor.assemble.refreshStructTree = function(){
	this.structTreeView.setRootNode(this._createStructNode(this.assemble));
}
hyeditor.assemble.refreshActionList = function(){
	this.actionListView.setItems(this._createActionList());
}
hyeditor.assemble.refreshTimeList =  function(){
	this.timelineListView.setItems(this._createTimeList(this.assemble,this.getCurActionName(),null));
}
hyeditor.assemble.importAssembleData = function(pJson){
	if(this.assemble != null){
		this.assemble.removeFromParent();
	}
	this._selectedUnit = null;
	this._curActionName = null;
	this.refreshEditAssemble(pJson);
	this.refreshStructTree();
	this.refreshActionList();
	this.refreshTimeList();
}
hyeditor.assemble.exportAssembleData = function(){
}
hyeditor.map.window.addChildNodeAtLayer(hyeditor.assemble.window,0);
var app = new HY.Core.Application({
	fullScreen:true,
	autoScale:false
});
app.run(hyeditor.map.window);

