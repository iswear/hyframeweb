hyeditorevent = {};

hyeditorevent.menu = {};
hyeditorevent.map = {};
hyeditorevent.map.window = {};
hyeditorevent.map.terrain = {};
hyeditorevent.map.resTree = {};

hyeditorevent.assemble = {};
hyeditorevent.assemble.window = {};
hyeditorevent.assemble.structTree = {};
hyeditorevent.assemble.actionList = {};
hyeditorevent.assemble.timeline = {};
hyeditorevent.assemble.resTree = {};
hyeditorevent.assemble.unit = {};

/*
主菜单点击事件				注册代码:hyeditor.menu.addEventListener("menuitem",hyeditorevent.menu,hyeditor);）
this			->			hyeditor
pMenuItem		->			菜单项
pDropItem		->			菜单下拉项
 */
hyeditorevent.menu.menuitem = function(pThis,pMenuItem,pDropItem){
	var menuindex = pMenuItem.userProperty.index;
	var dropindex = pDropItem.userProperty.index;
	switch (menuindex){
		case 0:
		{
			break;
		}
		case 1:
		{
			if(dropindex == 0){
				var x = (this.map.window.getWidth()-this.assemble.window.getWidth())/2;
				var y = (this.map.window.getHeight()-this.assemble.window.getHeight())/2;
				if(x < 0){ x = 0; }
				if(y < 0){ y = 0; }
				this.assemble.window.setX(x);
				this.assemble.window.setY(y);
				this.assemble.window.setVisible(true);
				this.assemble.importAssembleData(null);
			}
			break;
		}
		case 2:
		{
			this.map.setMode(dropindex);
			break;
		}
		case 3:
		{
			break;
		}
		default :
			break;

	}
}
/*
地图编辑器初始化位置事件 		注册代码:hyeditor.menu.addEventListener("finishlaunch",hyeditorevent.map.window,null);
this			->			hyeditor.map.window
 */
hyeditorevent.map.window.finishlaunch = function(pThis){
	var app = this.getApplication();
	if(app){
		this.setWidth(app.getAppWidth());
		this.setHeight(app.getAppHeight());
	}
};
/*
地图编辑器画布尺寸改变事件		注册代码:hyeditor.map.window.addEventListener("canvassizechange",hyeditorevent.map.window.canvassizechange,null);
this			->			hyeditor.map.window
 */
hyeditorevent.map.window.canvassizechanged = function(pThis){
	var app = this.getApplication();
	if(app){
		this.setWidth(app.getAppWidth());
		this.setHeight(app.getAppHeight());
	}
};
/*
地图编辑器地图点击事件			注册代码:hyeditor.map.terrain.addEventListener("mousedown",hyeditorevent.map.terrain.mousedown,hyeditor);
this			->			hyeditor
 */
hyeditorevent.map.terrain.mousedown = function(pThis,pEvent){
	var terrain = this.map.terrain;
	switch (this.map.getMode()){
		case 0:
		{
			var app = this.map.window.getApplication();
			if(app){
				var dragdata = app.getDragClipBoard(pEvent.identifier);
				if(dragdata && dragdata.drawType != undefined){
					var localoffset = terrain.transFromCanvasPoint(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
					switch (dragdata.drawType){
						case 1:
						{
							if(dragdata.bush){
								terrain.setBackgroundBush(dragdata.bush);
							}
							break;
						}
						case 2:
						{
							terrain._preDrawPoint = localoffset;
							break;
						}
						case 3:
						{
							var coor = terrain.transFromXYToRowCol(localoffset);
							terrain.addBlock(dragdata.texture,coor.row,coor.col);
							break;
						}
						case 4:
						{
							var newobject = HY.Game.Factory.createAssemble(dragdata.objectJson);
							newobject.setX(localoffset.x);
							newobject.setY(localoffset.y);
							terrain.addChildObject(newobject);
							break;
						}
						case 5:
						{
							var newobject = HY.Game.Factory.createSprite(dragdata.objectJson);
							terrain.setLeader(newobject);
							newobject.setX(localoffset.x);
							newobject.setY(localoffset.y);
							terrain.addChildObject(newobject);
							break;
						}
						default :
							break;
					}
				}
			}
			break;
		}
			/*测试使用*/
		case 1:
		{
			var localOffset = terrain.transFromCanvasPoint(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
			if(terrain.getLeader()){
                terrain.getLeader().walkTo(localOffset);
			}
			break;
		}
		case 2:
		{
			var localOffset = terrain.transFromCanvasPoint(new HY.Vect2D({x: pEvent.offsetX, y: pEvent.offsetY}));
			if (terrain.getLeader()) {
                terrain.getLeader().shotTo(localOffset);
			}
		}
			/*测试使用*/
		default :
			break;
	}
}
/*
地图编辑器鼠标移动事件			注册代码:hyeditor.map.terrain.addEventListener("mousemove",hyeditorevent.map.terrain.mousemove,hyeditor);
this			->			hyeditor
 */
hyeditorevent.map.terrain.mousemove = function(pThis,pEvent){
	var app = this.map.window.getApplication();
	if(this.map.getMode() == 0){
		var dragData = app.getDragClipBoard();
		if(dragData && dragData.drawType){
			var terrain = this.map.terrain;
			var localOffset = terrain.transFromCanvasPoint(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
			switch (dragData.drawType){
				case 2:
				{
					if(app.isMouseDown()){
						if(!terrain._preDrawPoint){
							terrain._preDrawPoint = localOffset;
						}else if(Math.abs(localOffset.x-terrain._preDrawPoint.x)+Math.abs(localOffset.y-terrain._preDrawPoint.y)>25){
							terrain.addPath(dragData.bush,true,10,terrain._preDrawPoint.x,terrain._preDrawPoint.y,localOffset.x,localOffset.y);
							terrain._preDrawPoint = localOffset;
						}
					}
					break;
				}
				case 3:
				{
					if(app.isMouseDown()){
						var coordinate = terrain.transFromXYToRowCol(localOffset);
						terrain.addBlock(dragData.texture,coordinate.row,coordinate.col);
					}
					break;
				}
				default :
					break;
			}
		}
	}
}
/*
地图编辑器资源选取事件			注册代码:
this			->			hyeditor.map.resTree
 */
hyeditorevent.map.resTree.nodeselected = function(pThis,pNode,pEvent){
	var app = this.getApplication();
	if(pNode.dragClipBoardData){
		app.setDragClipBoard(pNode.dragClipBoardData,pEvent.identifier);
	}else{
		app.setDragClipBoard(null,pEvent.identifier);
	}
}
/*
动画编辑器结构树节点选取事件			注册代码:
this			->			hyeditor
 */
hyeditorevent.assemble.structTree.nodeselected = function(pThis,pNode){
	if(pNode.userProperty && pNode.userProperty.sprite){
		this.assemble.setSelectedUnit(pNode.userProperty.sprite);
	}
}
/*
动画编辑器结构树节点移动事件			注册代码:
this			->			hyeditor
 */
hyeditorevent.assemble.structTree.nodemove = function(pThis,pEvent,pSrcNode,pDesNode,pType){
	switch (pType){
		case 1:									//第一个
		{
			if(pSrcNode.userProperty && pSrcNode.userProperty.sprite && pDesNode.userProperty && pDesNode.userProperty.sprite){
				pSrcNode.userProperty.sprite.removeFromParent();
				pDesNode.userProperty.sprite.addChildUnitAt(pSrcNode.userProperty.sprite,0);
			}
			break;
		}
		case 2:									//上方
		{
			if(pSrcNode.userProperty && pSrcNode.userProperty.sprite && pDesNode.userProperty && pDesNode.userProperty.sprite){
				var srcparentsprite = pSrcNode.userProperty.sprite.getParent();
				var desparentsprite = pDesNode.userProperty.sprite.getParent();
				var srcindex = srcparentsprite.getChildUnitIndex(pSrcNode.userProperty.sprite);
				var desindex = desparentsprite.getChildUnitIndex(pDesNode.userProperty.sprite);
				if(srcparentsprite == desparentsprite){
					pSrcNode.userProperty.sprite.removeFromParent();
					if(srcindex > desindex){
						desparentsprite.addChildUnitAt(pSrcNode.userProperty.sprite,desindex);
					}else{
						desparentsprite.addChildUnitAt(pSrcNode.userProperty.sprite,desindex-1);
					}
				}else{
					pSrcNode.userProperty.sprite.removeFromParent();
					desparentsprite.addChildUnitAt(pSrcNode.userProperty.sprite,desindex-1);
				}
			}
			break;
		}
		case 4:									//下方
		{
			if(pSrcNode.userProperty && pSrcNode.userProperty.sprite && pDesNode.userProperty && pDesNode.userProperty.sprite){
				var srcparentsprite = pSrcNode.userProperty.sprite.getParent();
				var desparentsprite = pDesNode.userProperty.sprite.getParent();
				var srcindex = srcparentsprite.getChildUnitIndex(pSrcNode.userProperty.sprite);
				var desindex = desparentsprite.getChildUnitIndex(pDesNode.userProperty.sprite);
				if(srcparentsprite == desparentsprite){
					pSrcNode.userProperty.sprite.removeFromParent();
					if(srcindex > desindex){
						desparentsprite.addChildUnitAt(pSrcNode.userProperty.sprite,desindex+1);
					}else{
						desparentsprite.addChildUnitAt(pSrcNode.userProperty.sprite,desindex);
					}
				}else{
					pSrcNode.userProperty.sprite.removeFromParent();
					desparentsprite.addChildUnitAt(pSrcNode.userProperty.sprite,desindex+1);
				}
			}
			break;
		}
		default :
			break;
	}
}
/*
动画编辑器结构树节点名称改变事件		注册代码:
this			->			hyeditor
 */
hyeditorevent.assemble.structTree.nodenamechanged = function(pThis,pNode){
	if(pNode && pNode.userProperty && pNode.userProperty.sprite){
		pNode.userProperty.sprite.setName(pNode.name);
		var timeline = pNode.userProperty.sprite.getUserProperty("time");
		if(timeline && timeline.userProperty  && timeline.userProperty.view){
			timeline.userProperty.view.setName(pNode.name);
		}
	}
}
/*
动画编辑器结构树节点右键菜单事件		注册代码:
this			->			hyeditor
 */
hyeditorevent.assemble.structTree.nodecontextmenu = function(pThis,pNode,pItem){
	if(pItem && pItem.userProperty && pItem.userProperty.index != undefined){
		switch (pItem.userProperty.index){
			case 0:
			{
				if(pNode && pNode.userProperty && pNode.userProperty.sprite){
					var newunit = this.assemble._createEditUnit(null);
					var newnode = this.assemble._createStructNode(newunit);
					pNode.userProperty.sprite.addChildUnit(newunit);
					this.assemble.structTreeView.addChildNodeToNode(newnode,pNode);
					this.assemble.refreshTimeList();
				}
				break;
			}
			case 1:
			{
				if(pNode != this.assemble.structTreeView.getRootNode()){
					if(pNode && pNode.userProperty && pNode.userProperty.sprite){
						pNode.userProperty.sprite.removeFromParent();
						this.assemble.structTreeView.removeNodeFromParent(pNode);
						this.assemble.refreshTimeList();
					}
				}else{
					window.open("http://www.baidu.com");
				}
				break;
			}
			case 2:
			{
				window.open("http://www.baidu.com");
				break;
			}
			default :
				break;
		}
	}
}
hyeditorevent.assemble.actionList.contextmenu = function(pThis,pItem) {
	if(pItem && pItem.userProperty && pItem.userProperty.index != undefined){
		switch (pItem.userProperty.index){
			case 0:
			{
				if(this.assemble.assemble){
					this.assemble.assemble.addActionName("action");
					this.assemble.refreshActionList();
				}
				break;
			}
			case 1:
			{
				window.open("http://www.baidu.com");
				break;
			}
			default :
				break;
		}
	}
}
hyeditorevent.assemble.actionList.itemselected = function(pThis,pItem){
	this.assemble.setCurActionName(pItem.name);
}
hyeditorevent.assemble.actionList.itemcontextmenu = function(pThis,pItem,pMenuItem){
	if(pMenuItem && pMenuItem.userProperty && pMenuItem.userProperty.index != undefined){
		switch (pMenuItem.userProperty.index){
			case 0:
			{
				if(this.assemble.assemble){
					this.assemble.assemble.addActionName("action");
					this.assemble.refreshActionList();
				}
				break;
			}
			case 1:
			{
				var actionname = pItem.name;
                this.assemble.assemble.stopAllAction(true);
				this.assemble.assemble.compileActionByName(actionname,true);
				this.assemble.assemble.runActionLoopByName(actionname,1,0);
				break;
			}
			case 2:
			{
				var actionname = pItem.name;
				this.assemble.assemble.stopAllAction(true);
				break;
			}
			case 3:
			{
				var actionname = pItem.name;
				this.assemble.assemble.removeActionNameByName(actionname);
				if(this.assemble.getCurActionName() == actionname){
					this.assemble.setCurActionName(null);
				}
				break;
			}
			case 4:
			{
				window.open("http://www.baidu.com");
				break;
			}
			default :
			{
				break;
			}
		}
	}
}
hyeditorevent.assemble.timeline.itemselected = function(pThis,pItem){
	if(pItem.userProperty && pItem.userProperty.sprite){
		this.assemble.setSelectedUnit(pItem.userProperty.sprite);
	}
}
hyeditorevent.assemble.timeline.itemcontextmenu = function(pThis,pItem,pMenuItem){
	if(pMenuItem && pMenuItem.userProperty && pMenuItem.userProperty.index != undefined){
		switch (pMenuItem.userProperty.index){
			case 0:
			{
				if(pItem && pItem.userProperty && pItem.userProperty.view && pItem.userProperty.sprite){
					var frametime = pItem.userProperty.view.getSelectedTime();
					pItem.userProperty.sprite.addKeyFrame(this.assemble.getCurActionName(),frametime);
					this.assemble.refreshTimeList();
				}
				break;
			}
			case 1:
			{
				if(pItem && pItem.userProperty && pItem.userProperty.view && pItem.userProperty.sprite){
					var frametime = pItem.userProperty.view.getSelectedTime();
					pItem.userProperty.sprite.removeKeyFrame(this.assemble.getCurActionName(),frametime);
					this.assemble.refreshTimeList();
				}
				break;
			}
			case 2:
			{
				if(pItem && pItem.userProperty && pItem.userProperty.view && pItem.userProperty.sprite){
					var frametime = pItem.userProperty.view.getSelectedTime();
					pItem.userProperty.sprite.addTweenAtFrame(this.assemble.getCurActionName(),frametime);
					this.assemble.refreshTimeList();
				}
				break;
			}
			case 3:
			{
				if(pItem && pItem.userProperty && pItem.userProperty.view && pItem.userProperty.sprite){
					var frametime = pItem.userProperty.view.getSelectedTime();
					pItem.userProperty.sprite.removeTweenAtFrame(this.assemble.getCurActionName(),frametime);
					this.refreshTimeList();
				}
				break;
			}
			default :
				break;
		}
	}
}
hyeditorevent.assemble.timeline.curframechanged = function(){
	if(this.assemble.assemble){
		this.assemble.assemble.adjustToFrame(this.assemble.getCurActionName(),this.assemble.timelineListView.getCurFrame(),true);
	}
}
/*
动画编辑器精灵点击事件				注册代码：
this				->				hyeditor
 */
hyeditorevent.assemble.unit.mousedown = function(pThis,pEvent){
	this.assemble.setSelectedUnit(pThis);
}
/*
动画编辑器精灵右键事件				注册代码:
this				->				self
 */
hyeditorevent.assemble.unit.contextmenu = function(pThis,pMenuItem){
	if(pMenuItem.userProperty && pMenuItem.userProperty.index != undefined){
		switch (pMenuItem.userProperty.index){
			case 0:
			{
				this.setEditMode(HY.Game.NODE.EDITMODE.POSITION);
				break;
			}
			case 1:
			{
				this.setEditMode(HY.Game.NODE.EDITMODE.ANGLE);
				break;
			}
			case 2:
			{
				this.setEditMode(HY.Game.NODE.EDITMODE.RESIZE);
				break;
			}
			case 3:
			{
				this.setEditMode(HY.Game.NODE.EDITMODE.ANCHOR);
				break;
			}
			default :
				break;
		}
	}
}
/*
动画编辑精灵位置移动时间			注册代码:
this				->				hyeditor
 */
hyeditorevent.assemble.unit.positionchanged =function(pThis){
	var timeline = this.assemble.timelineListView.getSelectedItem();
	if(timeline && timeline.userProperty && timeline.userProperty.view){
		var selectedframe = timeline.userProperty.view.getSelectedFrame();
		var selectedtime = timeline.userProperty.view.getSelectedTime();
		if(timeline.userProperty.view.isKeyFrame(selectedframe)){
			var keyframe = pThis.getKeyFrame(this.assemble.getCurActionName(),selectedtime);
			keyframe.spriteParam.x = pThis.getX();
			keyframe.spriteParam.y = pThis.getY();
		}
	}
}
/*
 动画编辑精灵位置移动时间			注册代码:
 this				->				hyeditor
 */
hyeditorevent.assemble.unit.sizechanged = function(pThis){
	var timeline = this.assemble.timelineListView.getSelectedItem();
	if(timeline && timeline.userProperty && timeline.userProperty.view){
		var selectedframe = timeline.userProperty.view.getSelectedFrame();
		var selectedtime = timeline.userProperty.view.getSelectedTime();
		if(timeline.userProperty.view.isKeyFrame(selectedframe)){
			var keyframe = pThis.getKeyFrame(this.assemble.getCurActionName(),selectedtime);
			keyframe.spriteParam.width = pThis.getWidth();
			keyframe.spriteParam.height = pThis.getHeight();
		}
	}
}
/*
动画编辑精灵旋转事件				注册代码:
this				->			hyeditor
 */
hyeditorevent.assemble.unit.anglechanged = function(pThis){
	var timeline = this.assemble.timelineListView.getSelectedItem();
	if(timeline && timeline.userProperty && timeline.userProperty.view){
		var selectedframe = timeline.userProperty.view.getSelectedFrame();
		var selectedtime = timeline.userProperty.view.getSelectedTime();
		if(timeline.userProperty.view.isKeyFrame(selectedframe)){
			var keyframe = pThis.getKeyFrame(this.assemble.getCurActionName(),selectedtime);
			keyframe.spriteParam.rotateAngleZ = pThis.getRotateZ();
		}
	}
}
/*
动画编辑精灵锚点移动事件			注册代码:
this				->			hyeditor
 */
hyeditorevent.assemble.unit.anchorchanged = function(pThis){
	var timeline = this.assemble.timelineListView.getSelectedItem();
	if(timeline && timeline.userProperty && timeline.userProperty.view){
		var selectedframe = timeline.userProperty.view.getSelectedFrame();
		var selectedtime = timeline.userProperty.view.getSelectedTime();
		if(timeline.userProperty.view.isKeyFrame(selectedframe)){
			var keyframe = pThis.getKeyFrame(this.assemble.getCurActionName(),selectedtime);
			keyframe.spriteParam.anchorX = pThis.getAnchorPointX();
			keyframe.spriteParam.anchorY = pThis.getAnchorPointY();
		}
	}
}

/*
名称:[]
坐标x:
坐标y:
宽度:
高度:
锚点x:
锚点y:
透明度:
贴图:
 */