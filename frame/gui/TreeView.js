HY.GUI.TreeNodeView = function(config){
	this.extend(HY.GUI.View);
	this.initWithConfig(config);
}
HY.GUI.TreeNodeView.prototype = new HY.GUI.View();
HY.GUI.TreeNodeView.prototype.defaultNormalColor = null;//"#FF0000";
HY.GUI.TreeNodeView.prototype.defaultSelectedColor = "#00FF00";
HY.GUI.TreeNodeView.prototype.defaultMouseOverColor = "#0000FF";
HY.GUI.TreeNodeView.prototype.defaultEditAble = true;
HY.GUI.TreeNodeView.prototype.initWithConfig = function(config){
	if(config){
		this.superCall("initWithConfig",[config]);
		if(config.editAble){ this._editAble = config.editAble; } else { this._editAble = this.defaultEditAble; }
		if(config.normalColor){ this._normalColor = config.normalColor; } else { this._normalColor = this.defaultNormalColor; }
		if(config.selectedColor){ this._selectedColor = config.selectedColor; } else { this._selectedColor = this.defaultSelectedColor; }
		if(config.mouseOverColor){ this._mouseOverColor = config.mouseOverColor; } else { this._mouseOverColor = this.defaultMouseOverColor; }

		if(config.nameChangedEvent){ this.addEventListener("namechanged",config.nameChangedEvent.selector,config.nameChangedEvent.target); }
		if(config.collapseEvent){ this.addEventListener("collapse",config.collapseEvent.selector,config.collapseEvent.target); }
		if(config.expandedEvent){ this.addEventListener("expanded",config.expandedEvent.selector,config.expandedEvent.target); }

		this._nodeIcon = new HY.GUI.ImageClip({mouseTrigger:false});
		this._nodeLabel = new HY.GUI.TextBox({mouseTrigger:false});
		this._nodeExpandIcon = new HY.GUI.View({});

		this._nodeLabel.addEventListener("endedit",function(pThis){
			var nodeview = this.getParent();
			var nodedata = nodeview.getNodeData();
			if(nodedata){
				var oldname = nodedata.name;
				var newname = this.getText();
				nodeview.onNameChanged(newname);
				nodedata.name = newname;
			}
		},null);
		this._nodeLabel.addEventListener("startedit",function(pThis){
			var nodeview = this.getParent();
			if(nodeview._prepareEditTime < 0){
				this.setEditAble(false);
			}else{
				var now = (new Date()).getTime();
				if(now - nodeview._prepareEditTime >= 300){
					this.setEditAble(true);
				}else{
					this.setEditAble(false);
				}
			}
		},null);
		this._nodeLabel.addEventListener("mousedown",function(pThis,pEvent){
			var nodeview = this.getParent();
			nodeview._prepareEditTime = (new Date()).getTime();
			nodeview.onMouseDown(pEvent);
		},null);
		this._nodeLabel.addEventListener("mousemove",function(pThis,pEvent){
			var nodeview = this.getParent();
			nodeview._prepareEditTime = -1;
			nodeview.onMouseMove(pEvent);
		},null);
		this._nodeLabel.addEventListener("mouseup",function(pThis,pEvent){
			var nodeview = this.getParent();
			nodeview.onMouseUp(pEvent);
		},null);
		this._nodeLabel.addEventListener("contextmenu",function(pThis,pItem){
			var nodeview = this.getParent();
			nodeview.onContextMenu(pItem);
		},null);

		this._nodeExpandIcon.addEventListener("paint",function(pThis,pDc){
			var nodeview = this.getParent();
			var nodedata = nodeview.getNodeData();
			if(nodedata && !nodedata.leaf){
				if(nodedata.expanded){
					var $width = nodeview._nodeExpandIcon.getWidth();
					var $height = nodeview._nodeExpandIcon.getHeight();
					pDc.beginPath();
					pDc.moveTo($width/3,$height/3);
					pDc.lineTo(2*$width/3,$height/3);
					pDc.lineTo($width/2,2*$height/3);
					pDc.closePath();
					pDc.fillStyle = "#000000";
					pDc.fill();
				}else{
					var $width = nodeview._nodeExpandIcon.getWidth();
					var $height = nodeview._nodeExpandIcon.getHeight();
					pDc.beginPath();
					pDc.moveTo($width/3,$height/3);
					pDc.lineTo(2*$width/3,$height/2);
					pDc.lineTo($width/3,2*$height/3);
					pDc.closePath();
					pDc.fillStyle = "#000000";
					pDc.fill();
				}
			}
		},null);
		this._nodeExpandIcon.addEventListener("mousedown",function(pThis,pEvent){
			var nodeview = this.getParent();
			var nodedata = nodeview.getNodeData();
			if(!nodedata.leaf){
				nodedata.expanded = !nodedata.expanded;
				if(nodedata.expanded){
					nodeview.onExpanded();
				}else{
					nodeview.onCollapse();
				}
			}
		},null);

		this.addChildNodeAtLayer(this._nodeIcon,0);
		this.addChildNodeAtLayer(this._nodeLabel,0);
		this.addChildNodeAtLayer(this._nodeExpandIcon,0);
		this.layoutNodeUI();

		this.setNodeData(null);
		this._nodeMoveLandType = 0;			//0不许移动 1插入为子节点 2插入为上节点 4插入为下节点
		this._minLayerWidth = 0;
		this._prepareEditTime = 0;
	}
}
HY.GUI.TreeNodeView.prototype.initNodeData = function(pNodeData){
	if(pNodeData){
		if(pNodeData.name == undefined){ pNodeData.name = "new node"; }
		if(pNodeData.selected == undefined){ pNodeData.selected = false; }
		if(pNodeData.expanded == undefined){ pNodeData.expanded = false; }
		if(pNodeData.contextMenu != undefined){ this.setContextMenu(pNodeData.contextMenu); }
		if(pNodeData.leaf == undefined){
			if(pNodeData.childNodes != undefined){
				pNodeData.leaf = false;
			}else{
				pNodeData.leaf = true;
			}
		}
		if(pNodeData.childNodes == undefined){
			if(!pNodeData.leaf){
				pNodeData.childNodes = [];
			}
		}
		if(pNodeData.normalIcon == undefined){
			if(pNodeData.leaf){
				pNodeData.normalIcon = {
					src:HY.Core.Config.Paths.Image+HY.Core.Config.HySysFiles.Icon,
					srcX:60,
					srcY:0,
					srcWidth:20,
					srcHeight:20
				};
			}else{
				pNodeData.normalIcon = {
					src:HY.Core.Config.Paths.Image+HY.Core.Config.HySysFiles.Icon,
					srcX:40,
					srcY:0,
					srcWidth:20,
					srcHeight:20
				};
			}
		}
		if(pNodeData.expandIcon == undefined){
			if(pNodeData.leaf){
				pNodeData.expandIcon = {
					src:HY.Core.Config.Paths.Image+HY.Core.Config.HySysFiles.Icon,
					srcX:60,
					srcY:0,
					srcWidth:20,
					srcHeight:20
				};
			}else{
				pNodeData.expandIcon = {
					src:HY.Core.Config.Paths.Image+HY.Core.Config.HySysFiles.Icon,
					srcX:20,
					srcY:0,
					srcWidth:20,
					srcHeight:20
				};
			}
		}
		if(pNodeData.expanded){
			this._nodeIcon.setTexture(pNodeData.expandIcon);
		}else{
			this._nodeIcon.setTexture(pNodeData.normalIcon);
		}
		if(!pNodeData.userProperty){ pNodeData.userProperty = {}; }
		if(pNodeData.userProperty.path == undefined){ pNodeData.userProperty.path = ""; }
		if(pNodeData.userProperty.deepth == undefined){ pNodeData.userProperty.deepth = 0; }
		if(pNodeData.userProperty.parent == undefined){ pNodeData.userProperty.parent = null; }
		if(pNodeData.userProperty.view == undefined){ pNodeData.userProperty.view = this; }
		this._nodeLabel.setText(pNodeData.name);
		this.setNodeData(pNodeData);
		this.layoutNodeUI();
	}
}
HY.GUI.TreeNodeView.prototype.getNodeData = function(){
	return this.getUserProperty("data");
}
HY.GUI.TreeNodeView.prototype.setNodeData = function(pData){
	this.setUserProperty("data",pData);
}
HY.GUI.TreeNodeView.prototype.getEditAble = function(){
	return this._editAble;
}
HY.GUI.TreeNodeView.prototype.setEditAble = function(pEditAble){
	this._editAble = pEditAble;
}
HY.GUI.TreeNodeView.prototype.getNodeMoveLandType = function(){
	return this._nodeMoveLandType;
}
HY.GUI.TreeNodeView.prototype.setNodeMoveLandType = function(pType){
	this._nodeMoveLandType = pType;
	this.reRender();
}
HY.GUI.TreeNodeView.prototype.setWidth = function(pWidth){
	this.superCall("setWidth",[pWidth]);
	this.layoutNodeUI();
}
HY.GUI.TreeNodeView.prototype.setHeight = function(pHeight){
	this.superCall("setHeight",[pHeight]);
	this.layoutNodeUI();
}
HY.GUI.TreeNodeView.prototype.setContextMenu = function(contextMenu){
	this.superCall("setContextMenu",[contextMenu]);
	this._nodeLabel.setContextMenu(contextMenu);
}
HY.GUI.TreeNodeView.prototype.getMinLayoutWidth = function(){
	var nodedata = this.getNodeData();
	if(nodedata){
		var nodedeepth = nodedata.userProperty.deepth;
		return this.getHeight()*(2+nodedeepth) + this._nodeLabel.getMinLayoutWidth();
	}else{
		return this.getHeight()*2+this._nodeLabel.getMinLayoutWidth();
	}
}
HY.GUI.TreeNodeView.prototype.setNormalColor = function(pColor){
	this._normalColor = pColor;
}
HY.GUI.TreeNodeView.prototype.setSelectedColor = function(pColor){
	this._selectedColor = pColor;
}
HY.GUI.TreeNodeView.prototype.setMouseOverColor = function(pColor){
	this._mouseOverColor = pColor;
}
HY.GUI.TreeNodeView.prototype.layoutNodeUI = function(){
	var startX = 0,nodedeepth =0;
	var nodedata = this.getNodeData();
	if(nodedata){
		nodedeepth = nodedata.userProperty.deepth;
	}
	startX = nodedeepth * this.getHeight();
	this._nodeExpandIcon.setX(startX);
	this._nodeExpandIcon.setY(0);
	this._nodeExpandIcon.setWidth(this.getHeight());
	this._nodeExpandIcon.setHeight(this.getHeight());
	startX += this.getHeight();
	this._nodeIcon.setX(startX);
	this._nodeIcon.setY(0);
	this._nodeIcon.setWidth(this.getHeight());
	this._nodeIcon.setHeight(this.getHeight());
	startX += this.getHeight();
	this._nodeLabel.setX(startX);
	this._nodeLabel.setY(0);
	this._nodeLabel.getFont().fontSize = this.getHeight()/2;
	this._nodeLabel.setWidth(this.getWidth()-startX);
	this._nodeLabel.setHeight(this.getHeight());
}
HY.GUI.TreeNodeView.prototype.refreshApperance = function(){
	if(this.getNodeSelected()){
		this.setBackgroundColor(this._selectedColor);
	}else{
		this.setBackgroundColor(this._normalColor);
	}
}
HY.GUI.TreeNodeView.prototype.getNodeSelected = function() {
	var nodedata = this.getNodeData();
	if(nodedata){
		return nodedata.selected;
	}else{
		return false;
	}
}
HY.GUI.TreeNodeView.prototype.setNodeSelected = function(pSelected){
	var nodedata = this.getNodeData();
	if(nodedata){
		nodedata.selected = pSelected;
	}
	if(this._editAble){
		this._nodeLabel.setMouseTrigger(pSelected);
	}
	this.refreshApperance();
}
//HY.GUI.TreeNodeView.prototype.onMouseDown = function(pEvent){
//	this.setNodeSelected(true);
//	this.superCall("onMouseDown",[pEvent]);
//}
HY.GUI.TreeNodeView.prototype.onNameChanged = function(pNewName){
	this.launchEvent("namechanged",[this,pNewName]);
}
HY.GUI.TreeNodeView.prototype.onCollapse = function(){
	this.launchEvent("collapse",[this]);
}
HY.GUI.TreeNodeView.prototype.onExpanded = function(){
	this.launchEvent("expanded",[this]);
}
HY.GUI.TreeNodeView.prototype.onPaint = function(pDc){
	this.superCall("onPaint",[pDc]);
	switch (this._nodeMoveLandType){
		case 1:
		{
			var anchorx = this.getAnchorPointX() * this.getWidth();
			var anchory = this.getAnchorPointY() * this.getHeight();
			pDc.lineWidth = 2.0;
			pDc.strokeStyle = "#00FFFF";
			pDc.strokeRect(2-anchorx,2-anchory,this.getWidth()-4,this.getHeight()-4);
			break;
		}
		case 2:
		{
			var anchorx = this.getAnchorPointX() * this.getWidth();
			var anchory = this.getAnchorPointY() * this.getHeight();
			pDc.lineWidth = 2.0;
			pDc.strokeStyle = "#00FFFF";
			pDc.beginPath();
			pDc.moveTo(-anchorx,2);
			pDc.lineTo(-anchorx+this.getWidth(),2);
			pDc.stroke();
			break;
		}
		case 4:
		{
			var anchorx = this.getAnchorPointX() * this.getWidth();
			var anchory = this.getAnchorPointY() * this.getHeight();
			pDc.lineWidth = 2.0;
			pDc.strokeStyle = "#00FFFF";
			pDc.beginPath();
			pDc.moveTo(-anchorx,this.getHeight()-2);
			pDc.lineTo(-anchorx+this.getWidth(),this.getHeight()-2);
			pDc.stroke();
			break;
		}
		default:
			break;
	}
}


HY.GUI.TreeView = function(config){
	this.extend(HY.GUI.View);
	this.initWithConfig(config);
}
HY.GUI.TreeView.prototype = new HY.GUI.View();
HY.GUI.TreeView.prototype.defaultNormalNodeColor = null;//"#FF0000";
HY.GUI.TreeView.prototype.defaultSelectedNodeColor = "#00FF00";
HY.GUI.TreeView.prototype.defaultMouseOverNodeColor = "#0000FF";
HY.GUI.TreeView.prototype.defaultRowHeight = 25;
HY.GUI.TreeView.prototype.defaultEditAble = true;
HY.GUI.TreeView.prototype.defaultMoveAble = true;
HY.GUI.TreeView.prototype.initWithConfig = function(config){
	if(config){
		this.superCall("initWithConfig",[config]);
		if(config.rootNode){ this._rootNode = config.rootNode; } else { this._rootNode = null; }
		if(config.rowHeight){ this._rowHeight = config.rowHeight; } else { this._rowHeight = this.defaultRowHeight; }
		if(config.editAble){ this._editAble = config.editAble; } else { this._editAble = this.defaultEditAble; }
		if(config.moveAble){ this._moveAble = config.moveAble; } else { this._moveAble = this.defaultMoveAble; }

		if(config.normalNodeColor){ this._normalNodeColor = config.normalNodeColor; } else { this._normalNodeColor = this.defaultNormalNodeColor; }
		if(config.selectedNodeColor){ this._selectedNodeColor = config.selectedNodeColor; } else { this._selectedNodeColor = this.defaultSelectedNodeColor; }
		if(config.mouseOverNodeColor){ this._mouseOverNodeColor = config.mouseOverNodeColor; } else { this._mouseOverNodeColor = this.defaultMouseOverNodeColor; }

		if(config.collapseEvent){ this.addEventListener("collapse",config.collapseEvent.selector,config.collapseEvent.target); }
		if(config.expandedEvent){ this.addEventListener("expanded",config.expandedEvent.selector,config.collapseEvent.target); }
		if(config.nodeMoveEvent){ this.addEventListener("nodemove",config.nodeMoveEvent.selector,config.nodeMoveEvent.target); }
		if(config.nodeSelectedEvent){ this.addEventListener("nodeselected",config.nodeSelectedEvent.selector,config.nodeSelectedEvent.target); }
		if(config.nodeContextMenuEvent){ this.addEventListener("nodecontextmenu",config.nodeContextMenuEvent.selector,config.nodeContextMenuEvent.target); }
		if(config.nodeNameChangedEvent){ this.addEventListener("nodenamechanged",config.nodeNameChangedEvent.selector,config.nodeNameChangedEvent.target); }
		if(config.nodeMouseDownEvent){ this.addEventListener("nodemousedown",config.nodeMouseDownEvent.selector,config.nodeMouseDownEvent.target); }
		if(config.nodeMouseUpEvent){ this.addEventListener("nodemouseup",config.nodeMouseUpEvent.selector,config.nodeMouseUpEvent.target); }

		this._selectedNode = null;
		this._nodeMoving = [];
		this._nodeMoveAvaLandType = [];
		this._nodeMoveLandType = [];				//前4位代表可使用的   后四位代表当前使用的
		this._nodeMoveSrcNodes = [];
		this._nodeMoveDesNodes = [];

		this._mallocTreeNodeView();
	}
}
HY.GUI.TreeView.prototype.setWidth = function(pWidth){
	this.superCall("setWidth",[pWidth]);
	var layer = this.getLayerAtIndex(0);
	if(layer){
		var i = layer.length;
		for(;i>0;--i){
			layer[i-1].setWidth(this.getWidth());
		}
	}
}
HY.GUI.TreeView.prototype.getNodeMoving = function(identifier){
	if(identifier < this._nodeMoving.length){
		return this._nodeMoving[identifier];
	}else{
		return false;
	}
}
HY.GUI.TreeView.prototype.setNodeMoving = function(pMoving,identifier){
	this._nodeMoving[identifier] = pMoving;
}
HY.GUI.TreeView.prototype.getNodeMoveLandType = function(identifier){
	if(identifier < this._nodeMoveLandType.length){
		return this._nodeMoveLandType[identifier];
	}else{
		return 0;
	}
}
HY.GUI.TreeView.prototype.setNodeMoveLandType = function(pType,identifier){
	this._nodeMoveLandType[identifier] = pType;
}
HY.GUI.TreeView.prototype.getNodeMoveAvaLandType = function(identifier){
	return this._nodeMoveAvaLandType[identifier];
}
HY.GUI.TreeView.prototype.setNodeMoveAvaLandType = function(pType,identifier){
	return this._nodeMoveAvaLandType[identifier] = pType;
}
HY.GUI.TreeView.prototype.getNodeMoveSrcNode = function(identifier){
	if(identifier < this._nodeMoveSrcNodes.length){
		return this._nodeMoveSrcNodes[identifier];
	}else{
		return null;
	}
}
HY.GUI.TreeView.prototype.setNodeMoveSrcNode = function(pNode,identifier){
	this._nodeMoveSrcNodes[identifier] = pNode;
}
HY.GUI.TreeView.prototype.getNodeMoveDesNode = function(identifier){
	if(identifier < this._nodeMoveDesNodes.length){
		return this._nodeMoveDesNodes[identifier];
	}else{
		return null;
	}
}
HY.GUI.TreeView.prototype.setNodeMoveDesNode = function(pNode,identifier){
	this._nodeMoveDesNodes[identifier] = pNode;
}
HY.GUI.TreeView.prototype.getRootNode = function(){
	return this._rootNode;
}
HY.GUI.TreeView.prototype.setRootNode = function(pNode){
	if(pNode){
		this._rootNode = pNode;
		this._mallocTreeNodeView();
	}
}
HY.GUI.TreeView.prototype.addChildNodeToNode = function(pSrcNode,pDesNode){
	if(!pDesNode.childNodes){
		pDesNode.childNodes = [];
	}
	pDesNode.childNodes.push(pSrcNode);
	this._mallocTreeNodeView();
}
HY.GUI.TreeView.prototype.removeNodeFromParent = function(pNode){
	if(pNode.userProperty && pNode.userProperty.parent){
		var remalloc = false;
		var parentnode = pNode.userProperty.parent;
		var childnodes = parentnode.childNodes;
		if(childnodes){
			for(var i = childnodes.length-1;i>=0;--i){
				if(childnodes[i] == pNode){
					childnodes.splice(i,1);
					remalloc = true;
				}
			}
		}
		if(remalloc){
			this._mallocTreeNodeView();
		}
	}
}

HY.GUI.TreeView.prototype.getRowHeight = function(){
	return this._rowHeight;
}
HY.GUI.TreeView.prototype.setRowHeight = function(pHeight){
	this._rowHeight = pHeight;
}
HY.GUI.TreeView.prototype.getEditAble = function(){
	return this._editAble;
}
HY.GUI.TreeView.prototype.setEditAble = function(pEditable){
	this._editAble = pEditable;
}
HY.GUI.TreeView.prototype.getMoveAble = function(){
	return this._moveAble;
}
HY.GUI.TreeView.prototype.setMoveAble = function(pMoveAble){
	this._moveAble = pMoveAble;
}
HY.GUI.TreeView.prototype.setNormalNodeColor = function(pColor){
	this._normalNodeColor = pColor;
}
HY.GUI.TreeView.prototype.setSelectedNodeColor = function(pColor){
	this._selectedNodeColor = pColor;
}
HY.GUI.TreeView.prototype.setMouseOverNodeColor = function(pColor){
	this._mouseOverNodeColor = pColor;
}
HY.GUI.TreeView.prototype.getSelectedNode = function(){
	return this._selectedNode;
}
HY.GUI.TreeView.prototype.setSelectedNode = function(pNode){
	if(this._selectedNode){
		if(this._selectedNode.userProperty && this._selectedNode.userProperty.view){
			this._selectedNode.userProperty.view.setNodeSelected(false);
		}else{
			this._selectedNode.selected = false;
		}
	}
	if(pNode){
		this._selectedNode = pNode;
		if(pNode.userProperty && pNode.userProperty.view){
			pNode.userProperty.view.setNodeSelected(true);
		}else{
			pNode.selected = false;
		}
	}else{
		this._selectedNode = null;
	}
}
HY.GUI.TreeView.prototype.onCollapse = function(pNode){
	this._mallocTreeNodeView();
	this.launchEvent("collapse",[this,pNode]);
}
HY.GUI.TreeView.prototype.onExpanded = function(pNode){
	this._mallocTreeNodeView();
	this.launchEvent("expanded",[this,pNode]);
}
HY.GUI.TreeView.prototype.onNodeMove = function(pEvent,pSrcNode,pDesNode,pType){
	this.launchEvent("nodemove",[this,pEvent,pSrcNode,pDesNode,pType]);
}
HY.GUI.TreeView.prototype.onNodeSelected = function(pNode,pEvent){
	this.launchEvent("nodeselected",[this,pNode,pEvent]);
}
HY.GUI.TreeView.prototype.onNodeNameChanged = function(pNode,pNewName){
	this.launchEvent("nodenamechanged",[this,pNode,pNewName]);
}
HY.GUI.TreeView.prototype.onNodeContextMenu = function(pNode,pMenuItem){
	this.launchEvent("nodecontextmenu",[this,pNode,pMenuItem]);
}
HY.GUI.TreeView.prototype.checkNodeMoveLandType = function(pSrcNode,pDesNode){
	var pParentSrcNode = pSrcNode.userProperty.parent;
	var pParentDesNode = pDesNode.userProperty.parent;
	var pSrcPath = pSrcNode.userProperty.path;
	var pDesPath = pDesNode.userProperty.path;
	if(pParentSrcNode == null){
		return 0;
	}else if(pSrcNode == pDesNode){
		return 0;
	}else if(pDesPath.indexOf(pSrcPath) != -1){
		return 0;
	}else if(pParentDesNode == null){
		return 1;
	}else if(pDesNode.leaf){
		return 6;
	}else{
		return 7;
	}
}
HY.GUI.TreeView.prototype.getMinLayoutWidth = function(){
	var layer0 = this.getLayerAtIndex(0);
	if(layer0){
		var maxwidth = 0;
		for(var i = layer0.length-1;i>=0;--i){
			maxwidth = (maxwidth > layer0[i].getMinLayoutWidth())?maxwidth:(layer0[i].getMinLayoutWidth());
		}
		return maxwidth;
	}else{
		return 0;
	}
}
HY.GUI.TreeView.prototype.getMinLayoutHeight = function(){
	var layer0 = this.getLayerAtIndex(0);
	if(layer0){
		var count = layer0.length;
		return count*this.getRowHeight();
	}else{
		return 0;
	}
}
HY.GUI.TreeView.prototype.__mallocTreeNodeView = function(parentNode,curNode,curDeepth,curPath,cmallocView,pAssparam){
	var layer = this.getLayerAtIndex(0);
	if(cmallocView){
		var mallocNodeView = null;
		if(pAssparam.index < pAssparam.count){
			mallocNodeView = layer[pAssparam.index];
			mallocNodeView.setX(0);
			mallocNodeView.setY(pAssparam.accumlateY);
			mallocNodeView.setWidth(this.getWidth());
			mallocNodeView.setHeight(this.getRowHeight());
			mallocNodeView.setNormalColor(this._normalNodeColor);
			mallocNodeView.setSelectedColor(this._selectedNodeColor);
			mallocNodeView.setMouseOverColor(this._mouseOverNodeColor);
			mallocNodeView.setVisible(true);
		}else{
			mallocNodeView = new HY.GUI.TreeNodeView({
				x:0,
				y:pAssparam.accumlateY,
				width:this.getWidth(),
				height:this.getRowHeight(),
				normalColor:this._normalNodeColor,
				selectedColor:this._selectedNodeColor,
				mouseOverColor:this._mouseOverNodeColor
			});
			mallocNodeView.addEventListener("expanded",function(pThis){
				var treeview = this.getParent();
				if(treeview){
					treeview.onExpanded(this.getNodeData());
				}
			},null);
			mallocNodeView.addEventListener("collapse",function(pThis){
				var treeview = this.getParent();
				if(treeview){
					treeview.onCollapse(this.getNodeData());
				}
			},null);
			mallocNodeView.addEventListener("namechanged",function(pThis,pNewName){
				var treeview = this.getParent();
				if(treeview){
					treeview.onNodeNameChanged(this.getNodeData(),pNewName);
				}
			},null);
			mallocNodeView.addEventListener("contextmenu",function(pThis,pMenuItem){
				var treeview = this.getParent();
				if(treeview){
					treeview.onNodeContextMenu(this.getNodeData(),pMenuItem);
				}
			},null);
			mallocNodeView.addEventListener("mousedown",function(pThis,pEvent){
				var treeview = this.getParent();
				if(treeview.getSelectedNode() != this.getNodeData()){
					treeview.setSelectedNode(this.getNodeData());
					treeview.onNodeSelected(this.getNodeData(),pEvent);
				}
				if(treeview && treeview.getMoveAble()){
					treeview.setNodeMoving(true,pEvent.identifier);
					treeview.setNodeMoveLandType(0,pEvent.identifier);
					treeview.setNodeMoveSrcNode(this.getNodeData(),pEvent.identifier);
					treeview.setNodeMoveDesNode(null,pEvent.identifier);
				}
			},null);
			mallocNodeView.addEventListener("mousemove",function(pThis,pEvent){
				var treeview = this.getParent();
				if(treeview && treeview.getNodeMoving(pEvent.identifier)){
					var desnode = treeview.getNodeMoveDesNode(pEvent.identifier);
					if(desnode && desnode.userProperty.view == this){
						var avalandtype = treeview.getNodeMoveAvaLandType(pEvent.identifier);
						if(avalandtype == 1){
							this.setNodeMoveLandType(1);
						}else if(avalandtype == 6){
							var localoffset = this.transFromCanvasPoint(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
							if(localoffset.y < this.getHeight()/3){
								this.setNodeMoveLandType(2);
							}else if(localoffset.y > this.getHeight()*2/3){
								this.setNodeMoveLandType(4);
							}else{
								this.setNodeMoveLandType(0);
							}
						}else if(avalandtype == 7){
							var localoffset = this.transFromCanvasPoint(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
							if(localoffset.y < this.getHeight()/3){
								this.setNodeMoveLandType(2);
							}else if(localoffset.y > this.getHeight()*2/3){
								this.setNodeMoveLandType(4);
							}else{
								this.setNodeMoveLandType(1);
							}
						}
					}
				}
			},null);
			mallocNodeView.addEventListener("mouseover",function(pThis,pEvent){
				var treeview = this.getParent();
				if(treeview && treeview.getNodeMoving(pEvent.identifier)){
					var srcnode = treeview.getNodeMoveSrcNode(pEvent.identifier);
					if(srcnode && srcnode.userProperty.view != this){
						treeview.setNodeMoveDesNode(this.getNodeData(),pEvent.identifier);
						treeview.setNodeMoveAvaLandType(treeview.checkNodeMoveLandType(srcnode,this.getNodeData()),pEvent.identifier);
					}
				}
			},null);
			mallocNodeView.addEventListener("mouseout",function(pThis,pEvent){
				var treeview = this.getParent();
				treeview.setNodeMoveDesNode(null,pEvent.identifier);
				this.setNodeMoveLandType(0);
			},null)
			mallocNodeView.addEventListener("mouseup",function(pThis,pEvent){
				var treeview = this.getParent();
				if(treeview && treeview.getNodeMoving(pEvent.identifier)){
					var srcnode = treeview.getNodeMoveSrcNode(pEvent.identifier);
					var desnode = treeview.getNodeMoveDesNode(pEvent.identifier);
					if(srcnode && desnode && desnode.userProperty && desnode.userProperty.view){
						switch (desnode.userProperty.view.getNodeMoveLandType()){
							case 1:
							{
								var srcparentnode = srcnode.userProperty.parent;
								var srcnodepath = srcnode.userProperty.path;
								var desnodedata = desnode.userProperty.path;

								var srcindex = parseInt(srcnodepath.substring(srcnodepath.lastIndexOf("|")+1,srcnodepath.length));
								srcparentnode.childNodes.splice(srcindex,1);
								desnode.childNodes.splice(0,0,srcnode);

								treeview._mallocTreeNodeView();
								treeview.onNodeMove(pEvent,srcnode,desnode,1);
								break;
							}
							case 2:
							{
								var srcparentnode = srcnode.userProperty.parent;
								var srcnodepath = srcnode.userProperty.path;

								var desparentnode = desnode.userProperty.parent;
								var desnodepath = desnode.userProperty.path;

								var srcindex = parseInt(srcnodepath.substring(srcnodepath.lastIndexOf("|")+1,srcnodepath.length));
								var desindex = parseInt(desnodepath.substring(desnodepath.lastIndexOf("|")+1,desnodepath.length));
								if(srcparentnode == desparentnode){
									if(srcindex > desindex){
										srcparentnode.childNodes.splice(srcindex,1);
										desparentnode.childNodes.splice(desindex,0,srcnode);
									}else{
										desparentnode.childNodes.splice(desindex,0,srcnode);
										srcparentnode.childNodes.splice(srcindex,1);
									}
								}else{
									srcparentnode.childNodes.splice(srcindex,1);
									desparentnode.childNodes.splice(desindex,0,srcnode);
								}
								treeview._mallocTreeNodeView();
								treeview.onNodeMove(pEvent,srcnode,desnode,2);
								break;
							}
							case 4:
							{
								var srcparentnode = srcnode.userProperty.parent;
								var srcnodepath = srcnode.userProperty.path;
								var desparentnode = desnode.userProperty.parent;
								var desnodepath = desnode.userProperty.path;

								var srcindex = parseInt(srcnodepath.substring(srcnodepath.lastIndexOf("|")+1,srcnodepath.length));
								var desindex = parseInt(desnodepath.substring(desnodepath.lastIndexOf("|")+1,desnodepath.length));
								if(srcparentnode == desparentnode){
									if(srcindex > desindex){
										srcparentnode.childNodes.splice(srcindex,1);
										desparentnode.childNodes.splice(desindex+1,0,srcnode);
									}else{
										desparentnode.childNodes.splice(desindex+1,0,srcnode);
										srcparentnode.childNodes.splice(srcindex,1);
									}
								}else{
									srcparentnode.childNodes.splice(srcindex,1);
									desparentnode.childNodes.splice(desindex+1,0,srcnode);
								}
								treeview._mallocTreeNodeView();
								treeview.onNodeMove(pEvent,srcnode,desnode,4);
								break;
							}
							default :
								break;
						}
					}
				}
				treeview.setNodeMoving(false,pEvent.identifier);
			},null);
			this.addChildNodeAtLayer(mallocNodeView,0);
		}
		if(!curNode.userProperty){
			curNode.userProperty = {};
		}
		curNode.userProperty.path = curPath;
		curNode.userProperty.deepth = curDeepth;
		curNode.userProperty.parent = parentNode;
		curNode.userProperty.view = mallocNodeView;
		mallocNodeView.initNodeData(curNode);
		if(curNode == this.getSelectedNode()){
			mallocNodeView.setNodeSelected(true);
		}else{
			mallocNodeView.setNodeSelected(false);
		}
		pAssparam.index++;
		pAssparam.accumlateY += this.getRowHeight();
	}
	if(!curNode.leaf){
		if(cmallocView && curNode.expanded){
			if(curNode.childNodes){
                var len = curNode.childNodes.length;
				for(var hu_i=0;hu_i<len;++hu_i){
					var curChildNode = curNode.childNodes[hu_i];
					if(curPath == ""){
						this.__mallocTreeNodeView(curNode,curChildNode,curDeepth+1,hu_i+"",true,pAssparam);
					}else{
						this.__mallocTreeNodeView(curNode,curChildNode,curDeepth+1,curPath+"|"+hu_i,true,pAssparam);
					}
				}
			}
		}else{
			if(curNode.childNodes){
                var len = curNode.childNodes.length;
				for(var hu_i=0;hu_i<len;++hu_i){
					var curChildNode = curNode.childNodes[hu_i];
					if(curPath == ""){
						this.__mallocTreeNodeView(curNode,curChildNode,curDeepth+1,hu_i+"",false,pAssparam);
					}else{
						this.__mallocTreeNodeView(curNode,curChildNode,curDeepth+1,curPath+"|"+hu_i,false,pAssparam);
					}
				}
			}
		}
	}
}
HY.GUI.TreeView.prototype._mallocTreeNodeView = function(){
//	this.setSelectedNode(null);
	var assparam = {index:0,accumlateY:0,count:0};
	var layer = this.getLayerAtIndex(0);
	if(layer){
		assparam.count = layer.length;
		for(var i=0;i<assparam.count;++i){
			layer[i].setNodeData(null);
			layer[i].setVisible(false);
		}
	}
	if(this._rootNode!=undefined && this._rootNode != null){
		this.__mallocTreeNodeView(null,this._rootNode,0,"",true,assparam);
		this.removeChildNodeAtLayerFrom(0,assparam.index);
		this.setWidth(this.getMinLayoutWidth());
		this.setHeight(this.getMinLayoutHeight());
	}
}