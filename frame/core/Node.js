HY.Core.Node = function(config){
    this.extend(HY.Object);
    this.initWithConfig(config);
}
HY.Core.Node.prototype = new HY.Object();
HY.Core.Node.prototype.defaultMouseTrigger = true;
HY.Core.Node.prototype.defaultX = 0;
HY.Core.Node.prototype.defaultY = 0;
HY.Core.Node.prototype.defaultWidth = 100;
HY.Core.Node.prototype.defaultHeight = 20;
HY.Core.Node.prototype.defaultAutoFloat = false;
HY.Core.Node.prototype.defaultAnchorPointX = 0;
HY.Core.Node.prototype.defaultAnchorPointY = 0;
HY.Core.Node.prototype.defaultRotateAngleZ = 0;
//HY.Core.Node.prototype.defaultIndependent = false;
HY.Core.Node.prototype.defaultEnable = true;
HY.Core.Node.prototype.defaultClipBound = false;
HY.Core.Node.prototype.defaultCursor = null;
HY.Core.Node.prototype.defaultBorderWidth = 0;
HY.Core.Node.prototype.defaultBorderColor = null;
HY.Core.Node.prototype.defaultCornorRadius = 0;
HY.Core.Node.prototype.defaultBackgroundColor = null;
HY.Core.Node.prototype.defaultBackgroundImage = null;
HY.Core.Node.prototype.defaultVisible = true;
HY.Core.Node.prototype.defaultAlpha = 1.0;
HY.Core.Node.prototype.defaultDragAble = false;
HY.Core.Node.prototype.defaultResizeAble = false;
HY.Core.Node.prototype.defaultRotateAble = false;
HY.Core.Node.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.x != undefined){ this._x = config.x; }else{ this._x = this.defaultX; }
        if(config.y != undefined){ this._y = config.y; }else{ this._y = this.defaultY; }
        if(config.width != undefined){ this._width = config.width; }else{ this._width = this.defaultWidth; }
        if(config.height != undefined){ this._height = config.height; }else{ this._height = this.defaultHeight; }
        if(config.autoFloat != undefined){ this._autoFloat = config.autoFloat; } else { this._autoFloat = this.defaultAutoFloat; }
        if(config.anchorPointX != undefined){ this._anchorPointX = config.anchorPointX; }else{ this._anchorPointX = this.defaultAnchorPointX; }
        if(config.anchorPointY != undefined){ this._anchorPointY = config.anchorPointY;}else{ this._anchorPointY = this.defaultAnchorPointY; }
        if(config.rotateAngleZ != undefined){ this._rotateAngleZ = config.rotateAngleZ; } else { this._rotateAngleZ = this.defaultRotateAngleZ; }
        //if(config.independent != undefined){ this._independent = config.independent; } else { this._independent = this.defaultIndependent; }

        if(config.dragAble != undefined){ this._dragAble = config.dragAble; } else { this._dragAble = this.defaultDragAble; }
        if(config.rotateAble != undefined){ this._rotateAble = config.rotateAble; } else { this._rotateAble = this.defaultRotateAble; }
        if(config.resizeAble != undefined){ this._resizeAble = config.resizeAble;} else { this._resizeAble = this.defaultResizeAble; }
        if(config.mouseTrigger != undefined){ this._mouseTrigger = config.mouseTrigger; }else{ this._mouseTrigger = this.defaultMouseTrigger; }
        if(config.enable != undefined){ this._enable = config.enable; } else { this._enable = this.defaultEnable; }
        if(config.clipBound != undefined){ this._clipBound = config.clipBound; } else { this._clipBound = this.defaultClipBound; }
        if(config.cursor != undefined){ this._cursor = config.cursor; } else { this._cursor = this.defaultCursor;}
        if(config.borderWidth != undefined){ this._borderWidth = config.borderWidth; } else { this._borderWidth = this.defaultBorderWidth; }
        if(config.borderColor != undefined){ this._borderColor = config.borderColor; } else { this._borderColor = this.defaultBorderColor; }
        if(config.cornorRadius != undefined){ this._cornorRadius = config.cornorRadius; } else { this._cornorRadius = this.defaultCornorRadius; }
        if(config.backgroundColor != undefined){ this._backgroundColor = config.backgroundColor; } else { this._backgroundColor = this.defaultBackgroundColor; }
        if(config.backgroundImage != undefined){ this._backgroundImage = config.backgroundImage; } else { this._backgroundImage = this.defaultBackgroundImage; }
        if(config.visible != undefined){ this._visible = config.visible; } else { this._visible=this.defaultVisible; }
        if(config.alpha != undefined){ this._alpha = config.alpha; } else { this._alpha = this.defaultAlpha; }
        if(config.contextMenu != undefined){ this._contextMenu = config.contextMenu; } else { this._contextMenu = null; }


		this._events = {};
        if(config.finishLaunchEvent != undefined){ this.addEventListener("finishlaunch",config.finishLaunchEvent.selector,config.finishLaunchEvent.target); }
        if(config.canvasSizeChangeEvent != undefined){ this.addEventListener("canvassizechanged",config.canvasSizeChangeEvent.selector,config.canvasSizeChangeEvent.target); }
        if(config.firstPaintEvent != undefined){ this.addEventListener("firstpaint",config.firstPaintEvent.selector,config.firstPaintEvent.target); }
        if(config.enterFrameEvent != undefined){ this.addEventListener("enterframe",config.enterFrameEvent.selector,config.enterFrameEvent.target); }
        if(config.endFrameEvent != undefined){ this.addEventListener("endframe",config.endFrameEvent.selector,config.endFrameEvent.target); }
        if(config.clickEvent != undefined){ this.addEventListener("click",config.clickEvent.selector,config.clickEvent.target); }
        if(config.dblClickEvent != undefined){ this.addEventListener("dblclick",config.dblClickEvent.selector,config.dblClickEvent.target); }
        if(config.mouseDownEvent != undefined){ this.addEventListener("mousedown",config.mouseDownEvent.selector,config.mouseDownEvent.target); }
        if(config.mouseMoveEvent != undefined){ this.addEventListener("mousemove",config.mouseMoveEvent.selector,config.mouseMoveEvent.target); }
        if(config.mouseUpEvent != undefined){ this.addEventListener("mouseup",config.mouseUpEvent.selector,config.mouseUpEvent.target); }
        if(config.mouseWheelEvent != undefined){ this.addEventListener("mousewheel",config.mouseWheelEvent.selector,config.mouseWheelEvent.target); }
        if(config.mouseOverEvent != undefined){ this.addEventListener("mouseover",config.mouseOverEvent.selector,config.mouseOverEvent.target); }
        if(config.mouseOutEvent != undefined){ this.addEventListener("mouseout",config.mouseOutEvent.selector,config.mouseOutEvent.target); }
        if(config.keyDownEvent != undefined){ this.addEventListener("keydown",config.keyDownEvent.selector,config.keyDownEvent.target); }
        if(config.keyPressEvent != undefined){ this.addEventListener("keypress",config.keyPressEvent.selector,config.keyPressEvent.target); }
        if(config.keyUpEvent != undefined){ this.addEventListener("keyup",config.keyUpEvent.selector,config.keyUpEvent.target); }
        if(config.contextMenuEvent != undefined){ this.addEventListener("contextmenu",config.contextMenuEvent.selector,config.contextMenuEvent.target); }
        if(config.focusEvent != undefined){ this.addEventListener("focus",config.focusEvent.selector,config.focusEvent.target); }
        if(config.blurEvent != undefined){ this.addEventListener("blue",config.blurEvent.selector,config.blurEvent.target); }
        if(config.paintEvent != undefined){ this.addEventListener("paint",config.paintEvent.selector,config.paintEvent.target); }
        if(config.startResizeEvent != undefined){ this.addEventListener("startresize",config.startResizeEvent.selector,config.startResizeEvent.target); }
        if(config.resizeEvent != undefined){ this.addEventListener("resize",config.resizeEvent.selector,config.resizeEvent.target); }
        if(config.endResizeEvent != undefined){ this.addEventListener("endresize",config.endResizeEvent.selector,config.endResizeEvent.target); }
        if(config.startDragEvent != undefined){ this.addEventListener("startdrag",config.startDragEvent.selector,config.startDragEvent.target); }
        if(config.dragEvent != undefined){ this.addEventListener("drag",config.dragEvent.selector,config.dragEvent.target); }
        if(config.endDragEvent != undefined){ this.addEventListener("enddrag",config.endDragEvent.selector,config.endDragEvent.target); }
        if(config.startRotateEvent != undefined){ this.addEventListener("startrotate",config.startRotateEvent.selector,config.startRotateEvent.target); }
        if(config.rotateEvent != undefined){ this.addEventListener("rotate",config.rotateEvent.selector,config.rotateEvent.target); }
        if(config.endRotateEvent != undefined){ this.addEventListener("endrotate",config.endRotateEvent.selector,config.endRotateEvent.target); }
		if(config.sizeChangedEvent != undefined){ this.addEventListener("sizechanged",config.sizeChangedEvent.selector,config.sizeChangedEvent.target); }
		if(config.positionChangedEvent != undefined){ this.addEventListener("positionchanged",config.positionChangedEvent.selector,config.positionChangedEvent.target); }
		if(config.angleChangedEvent != undefined){ this.addEventListener("anglechanged",config.angleChangedEvent.selector,config.angleChangedEvent.target); }
		if(config.anchorChangedEvent != undefined){ this.addEventListener("anchorchanged",config.anchorChangedEvent.selector,config.anchorChangedEvent.target); }
		/*
		if(config.widthChangedEvent != undefined){ this.addEventListener("widthchanged",config.widthChangedEvent.selector,config.widthChangedEvent,); }
		if(config.heightChangedEvent != undefined){  }
		*/
        this._userProperty = {};
        this._parent = null;
        this._application = null;
		this._childNodeLayers = [];

		/*
		if(config.rotateAngleZ != undefined){ this._rotateAngleZ = config.rotateAngleZ; } else { this._rotateAngleZ = this.defaultRotateAngleZ; }

        anglesin = Math.sin(parent.getRotateZ());
        anglecos = Math.cos(parent.getRotateZ());
		*/

		this._sinAngleZ = Math.sin(this._rotateAngleZ);
		this._cosAngleZ = Math.cos(this._rotateAngleZ);

		this.__layoutflag = false;
        this.__isDraging  = false;
        this.__isResizing = false;
        this.__isRotating = false;
        this.__isFirstPaint = true;

		this.needLayoutUI();
    }
}
HY.Core.Node.prototype.setUserProperty = function(key,value){
    this._userProperty[key] = value;
}
HY.Core.Node.prototype.getUserProperty = function(key){
    return this._userProperty[key];
}
HY.Core.Node.prototype.removeUserProperty = function(key){
    delete  this._userProperty[key];
}
HY.Core.Node.prototype.getMinLayoutWidth = function(){
//	return this._width;
	return 0;
}
HY.Core.Node.prototype.getWidth = function(){
    return this._width;
}
HY.Core.Node.prototype.setWidth = function(pWidth) {
	if(pWidth != this._width){
		this._width = pWidth;
        this.onSizeChanged();
		this.reRender();
	}
}
HY.Core.Node.prototype.getMinLayoutHeight = function(){
	return 0;
}
HY.Core.Node.prototype.getHeight = function(){
    return this._height;
}
HY.Core.Node.prototype.setHeight = function(pHeight){
	if(pHeight != this._height){
		this._height = pHeight;
        this.onSizeChanged();
		this.reRender();
	}
}
HY.Core.Node.prototype.getSize = function(){
    return new HY.Size2D({width:this._width,height:this._height});
}
HY.Core.Node.prototype.setSize = function(pSize){
    this.setWidth(pSize.width);
    this.setHeight(pSize.height);
}
HY.Core.Node.prototype.getX = function(){
    return this._x;
}
HY.Core.Node.prototype.setX = function(pX){
	if(pX != this._x){
		this._x = pX;
        this.onPositionChanged();
		this.reRender();
	}
}
HY.Core.Node.prototype.getY = function(){
    return this._y;
}
HY.Core.Node.prototype.setY = function(pY){
	if(pY != this._y){
		this._y = pY;
        this.onPositionChanged();
		this.reRender();
	}
}
HY.Core.Node.prototype.getPosition = function() {
    return new HY.Vect2D({x:this._x,y:this._y});
}
HY.Core.Node.prototype.setPosition = function(pPosition){
    this.setX(pPosition.x);
    this.setY(pPosition.y);
}
HY.Core.Node.prototype.getAnchorPointX = function () {
    return this._anchorPointX;
}
HY.Core.Node.prototype.getAnchorPointY = function () {
    return this._anchorPointY;
}
HY.Core.Node.prototype.getAnchorPoint = function(){
    return new HY.Vect2D({x:this._anchorPointX,y:this._anchorPointY});
}
HY.Core.Node.prototype.setAnchorPointX = function(pX){
	if(this._anchorPointX != pX){
		this._anchorPointX = pX;
        this.onAnchorChanged();
		this.reRender();
	}
}
HY.Core.Node.prototype.setAnchorPointY = function(pY){
	if(this._anchorPointY != pY){
		this._anchorPointY = pY;
        this.onAnchorChanged();
		this.reRender();
	}
}
HY.Core.Node.prototype.setAnchorPoint = function(pPoint){
    this.setAnchorPointX(pPoint.x);
    this.setAnchorPointY(pPoint.y);
}
HY.Core.Node.prototype.setApplication = function(pApp){
    this._application = pApp;
}
HY.Core.Node.prototype.getApplication = function(){
    if(this._application == null){
        var parent = this._parent;
        if(parent == null){
            return null;
        }else{
            return parent.getApplication();
        }
    }else{
        return this._application;
    }
}
HY.Core.Node.prototype.getParent = function(){
    return this._parent;
}
HY.Core.Node.prototype.setParent = function(pNode){
    this._parent = pNode;
}
HY.Core.Node.prototype.getIndependentParent = function(){
    var parent = this;
    while(parent != null && !parent._independent){
        parent = parent.getParent();
    }
    return parent;
}
HY.Core.Node.prototype.rotateZ = function(pAngle){
	this.setRotateZ(this.getRotateZ()+pAngle);
}
HY.Core.Node.prototype.getRotateZ = function(){
    return this._rotateAngleZ;
}
HY.Core.Node.prototype.setRotateZ = function(pAngle){
	if(pAngle != this._rotateAngleZ){
		this._rotateAngleZ = pAngle;
		this._sinAngleZ = Math.sin(pAngle);
		this._cosAngleZ = Math.cos(pAngle);
        this.onAngleChanged();
		this.reRender();
	}
}
HY.Core.Node.prototype.getSinRotateZ = function(){
	return this._sinAngleZ;
}
HY.Core.Node.prototype.getCosRotateZ = function(){
	return this._cosAngleZ;
}
HY.Core.Node.prototype.getDragAble = function(){
    return this._dragAble;
}
HY.Core.Node.prototype.setDragAble = function(pDrag){
    this._dragAble = pDrag;
}
HY.Core.Node.prototype.getResizeAble = function(){
    return this._resizeAble;
}
HY.Core.Node.prototype.setResizeAble = function(pResize){
    this._resizeAble = pResize;
}
HY.Core.Node.prototype.getRotateAble = function(){
    return this._rotateAble;
}
HY.Core.Node.prototype.setRotateAble = function(pRotate){
    this._rotateAble = pRotate;
}
HY.Core.Node.prototype.getMouseTrigger = function(){
    return this._mouseTrigger;
}
HY.Core.Node.prototype.setMouseTrigger = function(pMouse){
    this._mouseTrigger = pMouse;
}
HY.Core.Node.prototype.getEnable = function(){
    return this._enable;
}
HY.Core.Node.prototype.setEnable = function(pEnable){
    this._enable = pEnable;
}
HY.Core.Node.prototype.getClipBound = function(){
    return this._clipBound;
}
HY.Core.Node.prototype.setClipBound = function(pClip){
    this._clipBound = pClip;
}
HY.Core.Node.prototype.getCursor = function(){
    return this._cursor;
}
HY.Core.Node.prototype.setCursor = function(pCursor){
    this._cursor = pCursor;
}
HY.Core.Node.prototype.getBorderWidth = function(){
    return this._borderWidth;
}
HY.Core.Node.prototype.setBorderWidth = function(pWidth){
	if(this._borderWidth != pWidth){
		this._borderWidth = pWidth;
		this.reRender();
	}
}
HY.Core.Node.prototype.getBorderColor = function(){
    return this._borderColor;
}
HY.Core.Node.prototype.setBorderColor = function(pColor){
	if(this._borderColor != pColor){
		this._borderColor = pColor;
		this.reRender();
	}
}
HY.Core.Node.prototype.getCornorRadius = function(){
    return this._cornorRadius;
}
HY.Core.Node.prototype.setCornorRadius = function(pRadius){
	if(this._cornorRadius != pRadius){
		this._cornorRadius = pRadius;
	}
}
HY.Core.Node.prototype.getBackgroundColor = function(){
    return this._backgroundColor;
}
HY.Core.Node.prototype.setBackgroundColor = function(pColor){
	if(this._backgroundColor != pColor){
		this._backgroundColor = pColor;
		this.reRender();
	}
}
HY.Core.Node.prototype.getBackgroundImage = function(){
    return this._backgroundImage;
}
HY.Core.Node.prototype.setBackgroundImage = function(pImage){
	if(this._backgroundImage != pImage){
		this._backgroundImage = pImage;
		this.reRender();
	}
}
HY.Core.Node.prototype.getVisible = function(){
    return this._visible;
}
HY.Core.Node.prototype.setVisible = function(pVisible){
	if(this._visible != pVisible){
		this._visible = pVisible;
		this.reRender();
	}
}
HY.Core.Node.prototype.getAlpha = function(){
    return this._alpha;
}
HY.Core.Node.prototype.setAlpha = function(pAlpha){
	if(this._alpha != pAlpha){
		this._alpha = pAlpha;
		this.reRender();
	}
}
HY.Core.Node.prototype.getContextMenu = function(){
    return this._contextMenu;
}
HY.Core.Node.prototype.setContextMenu = function(pContextmenu){
    this._contextMenu = pContextmenu;
}
HY.Core.Node.prototype.getLayers = function(){
	return this._childNodeLayers;
}
HY.Core.Node.prototype.getLayerAtIndex = function(pIndex){
	if(pIndex < this._childNodeLayers.length){
		return this._childNodeLayers[pIndex];
	}else{
		return null;
	}
}
HY.Core.Node.prototype.getChildNodesAtLayer = function(pLayer){
	if(pLayer < this._childNodeLayers.length){
		return this._childNodeLayers[pLayer];
	}else{
		return null;
	}
}
HY.Core.Node.prototype.getChildNodeLocation = function(pNode){
	var i = this._childNodeLayers.length-1;
	for(;i>=0;--i){
		var curlayer = this._childNodeLayers[i];
		if(curlayer){
			var j = curlayer.length-1;
			for(;j>=0;--j){
				var curnode = curlayer[j];
				if(curnode == pNode){
					return {layer:i-1,index:j-1};
				}
			}
		}
	}
	return {layer:-1,index:-1};
}
HY.Core.Node.prototype.getChildNodeIndexAtLayer = function(pNode,pLayer){
	if(this._childNodeLayers){
		if(pLayer < this._childNodeLayers.length){
			if(this._childNodeLayers[pLayer]){
				var curlayer = this._childNodeLayers.length;
				var i = curlayer.length-1;
				for(;i>=0;--i){
					if(curlayer[i] == pNode){
						return i;
					}
				}
			}
		}
	}
	return -1;
}
HY.Core.Node.prototype.addChildNode = function(pNode){
	this.addChildNodeAtLayer(pNode,0);
}
HY.Core.Node.prototype.addChildNodeAtLayer = function(pNode,pLayer){
	if(pNode){
		if(!this._childNodeLayers[pLayer]){
			this._childNodeLayers[pLayer] = [];
		}
		pNode.setParent(this);
		this._childNodeLayers[pLayer].push(pNode);
		this.reRender();
	}

}
HY.Core.Node.prototype.addChildNodeAtLayersIndex = function(pNode,pLayer,pIndex){
	if(pNode){
		if(!this._childNodeLayers[pLayer]){
			this._childNodeLayers[pLayer] = [];
		}
		var i = this._childNodeLayers[pLayer].length;
		pNode.setParent(this);
		if(i < pIndex){
			this._childNodeLayers[pLayer].push(pNode);
			return i;
		}else {
			this._childNodeLayers[pLayer].splice(pIndex,0,pNode);
			return pIndex;
		}
		this.reRender();
	}
}
HY.Core.Node.prototype.removeChildNode = function(pNode){
	var i = this._childNodeLayers.length-1;
	for(;i>=0;--i){
		var layer = this._childNodeLayers[i];
		if(layer){
			var j = layer.length-1;
			for(;j>=0;--j){
				if(pNode == layer[j]){
					pNode.clearUp();
					layer.splice(j,1);
					this.reRender();
				}
			}
		}
	}
}
HY.Core.Node.prototype.removeChildNodeAtLayer = function(pNode,pLayer){
	if(pLayer < this._childNodeLayers.length){
		var layer = this._childNodeLayers[pLayer];
		if(layer){
			var i = layer.length-1;
			for(;i>=0;--i){
				if(pNode == layer[i]){
					pNode.clearUp();
					layer.splice(i,1);
					this.reRender();
				}
			}
		}
	}
}
HY.Core.Node.prototype.removeChildNodeAtLayerFrom = function(pLayer,pIndex){
	var layer = this._childNodeLayers[pLayer];
	if(layer){
		var i = layer.length-1;
		for(;i>=pIndex;--i){
			layer[i].clearUp();
			layer.splice(i,1);
			this.reRender();
		}
	}
}
HY.Core.Node.prototype.removeChildNodeAtLayersIndex = function(pLayer,pIndex){
	if(pLayer < this._childNodeLayers.length){
		var layer = this._childNodeLayers[pLayer];
		if(layer){
			if(pIndex < layer.length){
				layer[pIndex].clearUp();
				layer.splice(pIndex,1);
				this.reRender();
			}
		}
	}
}
HY.Core.Node.prototype.removeFromParent = function(){
	var parent = this.getParent();
	if(parent != null){
		parent.removeChildNode(this);
	}
}
HY.Core.Node.prototype.clearUp = function(){
	var app = this.getApplication();
	if(app){
		app.getActionManager().removeAllActionInSprite(this,true);
	}
	this.setParent(null);
	this.setApplication(null);
//	this._userProperty = null;
//	this._events = null;
}
HY.Core.Node.prototype.mouseOverThis = function(){
	var app = this.getApplication();
	if(app){
		var elements = app.getMouseoverElements();
		if(elements){
			var i = elements.length-1;
			for(;i>=0;--i){
				if(elements[i] == this){
					return true;
				}
			}
		}
		return false;
	}else{
		return false;
	}
}
HY.Core.Node.prototype.focusOnThis = function(){
	var app = this.getApplication();
	if(app){
		var elements = app.getFocusElements();
		if(elements){
			var i = elements.length;
			for(;i>=0;--i){
				if(elements[i] == this){
					return true;
				}
			}
		}
		return false;
	}else{
		return false;
	}
}
HY.Core.Node.prototype.getAccumulatePosition = function(){
    //var position = this.getPosition();
    //var parent = this;
    //var anglesin,anglecos,tempx,tempy;
    //while(parent.getParent() != null){
    //    parent = parent.getParent();
    //    anglesin = parent.getSinRotateZ();
    //    anglecos = parent.getCosRotateZ();
    //    tempx = position.x;
    //    tempy = position.y;
    //    position.x = parent.getPosition().x + (tempx*anglecos-tempy*anglesin);
    //    position.y = parent.getPosition().y + (tempx*anglesin+tempy*anglecos);
    //}
    //var position = {x:0,y:0};
    //var parent = this;
    //var anglesin,anglecos,tempx,tempy;
    //while(parent){
    //    anglesin = parent.getSinRotateZ();
    //    anglecos = parent.getCosRotateZ();
    //    tempx = position.x;
    //    tempy = position.y;
    //    position.x = parent.getPosition().x + (tempx*anglecos-tempy*anglesin);
    //    position.y = parent.getPosition().y + (tempx*anglesin+tempy*anglecos);
    //    parent = parent.getParent();
    //}
    var position = this.getPosition();
    var parent = this.getParent();
    var anglesin,anglecos,tempx,tempy;
    while(parent){
        anglesin = parent.getSinRotateZ();
        anglecos = parent.getCosRotateZ();
        tempx = position.x;
        tempy = position.y;
        position.x = parent.getPosition().x + (tempx*anglecos-tempy*anglesin);
        position.y = parent.getPosition().y + (tempx*anglesin+tempy*anglecos);
        parent = parent.getParent();
    }
    return position;
}
HY.Core.Node.prototype.getAccumulateRotateZ = function(){
    var angle = this.getRotateZ();
    var parent = this.getParent();
    while(parent){
        angle += parent.getRotateZ();
        parent = parent.getParent();
    }
    return angle;
}
HY.Core.Node.prototype.getAccumulatePositionUntilExtParent = function(pNode){
    var position = this.getPosition();
    var parent = this.getParent();
    var anglesin,anglecos,tempx,tempy;
    while(parent != pNode || parent){
        anglesin = parent.getSinRotateZ();
        anglecos = parent.getCosRotateZ();
        tempx = position.x;
        tempy = position.y;
        position.x = parent.getPosition().x + (tempx*anglecos-tempy*anglesin);
        position.y = parent.getPosition().y + (tempx*anglesin+tempy*anglecos);
        parent = parent.getParent();
    }
    return position;
}
HY.Core.Node.prototype.getAccumulateRotateZUntilExtParent = function(pNode){
    var angle = this.getRotateZ();
    var parent = this.getParent();
    while(parent){
        angle += parent.getRotateZ();
        parent = parent.getParent();
    }
    return angle;
}
HY.Core.Node.prototype.transFromCanvasPoint = function(pPoint){
    var curpos = this.getAccumulatePosition();
    var curang = this.getAccumulateRotateZ();
    var sinAng = Math.sin(curang);
    var cosAng = Math.cos(curang);
    var vector = new HY.Vect2D({x:(pPoint.x-curpos.x),y:(pPoint.y-curpos.y)});
    return new HY.Vect2D({x:(vector.x*cosAng + vector.y*sinAng),y:(vector.y*cosAng-vector.x*sinAng)});
}
HY.Core.Node.prototype.transToCanvasPoint = function(pPoint){
    var curpos = this.getAccumulatePosition();
    var curang = this.getAccumulateRotateZ();
    var sinang = Math.sin(curang);
    var cosang = Math.cos(curang);
    return new HY.Vect2D({x:(curpos.x+pPoint.x*cosang-pPoint.y*sinang),y:(curpos.y+pPoint.x*sinang+pPoint.y*cosang)});
}
HY.Core.Node.prototype.transFromCanvasVect2d = function(pVect){
    var curang = this.getAccumulateRotateZ();
    var sinang = Math.sin(curang);
    var cosang = Math.cos(curang);
    return new HY.Vect2D({x:(pVect.x*cosang+pVect.y*sinang),y:(pVect.y*cosang-pVect.x*sinang)});
}
HY.Core.Node.prototype.transToCanvasVect2d = function(pVect){
    var curang = this.getAccumulateRotateZ();
    var sinang = Math.sin(curang);
    var cosang = Math.cos(curang);
    return new HY.Vect2D({x:(pVect.x*cosang-pVect.y*sinang),y:(pVect.x*sinang+pVect.y*cosang)});
}
HY.Core.Node.prototype.transFromParentPoint = function(pPoint){
    var curpos = this.getPosition();
    var sinAng = this.getSinRotateZ();
    var cosAng = this.getCosRotateZ();
    var vector = new HY.Vect2D({x:(pPoint.x-curpos.x),y:(pPoint.y-curpos.y)});
    return new HY.Vect2D({x:(vector.x*cosAng + vector.y*sinAng),y:(vector.y*cosAng-vector.x*sinAng)});
}
HY.Core.Node.prototype.transToParentPoint = function(pPoint){
    var curpos = this.getPosition();
    var sinang = this.getSinRotateZ();
    var cosang = this.getCosRotateZ();
    return new HY.Vect2D({x:(curpos.x+pPoint.x*cosang-pPoint.y*sinang),y:(curpos.y+pPoint.x*sinang+pPoint.y*cosang)});
}
HY.Core.Node.prototype.transFromParentVect2d = function(pVect){
    var sinang = this.getSinRotateZ();
    var cosang = this.getCosRotateZ();
    return new HY.Vect2D({x:(pVect.x*cosang+pVect.y*sinang),y:(pVect.y*cosang-pVect.x*sinang)});
}
HY.Core.Node.prototype.transToParentVect2d = function(pVect){
    var sinang = this.getSinRotateZ();
    var cosang = this.getCosRotateZ();
    return new HY.Vect2D({x:(pVect.x*cosang-pVect.y*sinang),y:(pVect.x*sinang+pVect.y*cosang)});
}
HY.Core.Node.prototype.transFromExtParentPoint = function(pParentNode,pPoint){
    if(this.getParent() == pParentNode){
        return this.transFromParentPoint(pPoint);
    }else{
        var curpos = this.getAccumulatePositionUntilExtParent(pParentNode);
        var curang = this.getAccumulateRotateZUntilExtParent(pParentNode);
        var sinang = Math.sin(curang);
        var cosang = Math.cos(curang);
        var vector = new HY.Vect2D({x:(pPoint.x-curpos.x),y:(pPoint.y-curpos.y)});
        return new HY.Vect2D({x:(vector.x*cosang + vector.y*sinang),y:(vector.y*cosang-vector.x*sinang)});
    }
}
HY.Core.Node.prototype.transToExtParentPoint = function(pParentNode,pPoint){
    if(this.getParent() == pParentNode){
        return this.transToParentPoint(pPoint);
    }else{
        var curpos = this.getAccumulatePosition();
        var curang = this.getAccumulateRotateZ();
        var sinang = Math.sin(curang);
        var cosang = Math.cos(curang);
        return new HY.Vect2D({x:(curpos.x+pPoint.x*cosang-pPoint.y*sinang),y:(curpos.y+pPoint.x*sinang+pPoint.y*cosang)});
    }
}
HY.Core.Node.prototype.transFromExtParentVect2d = function(pParentNode,pVect){
    if(this.getParent() == pParentNode){
        return this.transFromParentVect2d(pVect);
    }else{
        var curang = this.getAccumulateRotateZUntilExtParent(pParentNode);
        var sinang = Math.sin(curang);
        var cosang = Math.cos(curang);
        return new HY.Vect2D({x:(pVect.x*cosang+pVect.y*sinang),y:(pVect.y*cosang-pVect.x*sinang)});
    }
}
HY.Core.Node.prototype.transToExtParentVect2d = function(pParentNode,pVect){
    if(this.getParent() == pParentNode){
        return this.transToParentVect2d(pVect);
    }else{
        var curang = this.getAccumulateRotateZUntilExtParent(pParentNode);
        var sinang = Math.sin(curang);
        var cosang = Math.cos(curang);
        return new HY.Vect2D({x:(pVect.x*cosang-pVect.y*sinang),y:(pVect.x*sinang+pVect.y*cosang)});
    }
}

HY.Core.Node.prototype.getAllResource = function() {
    var resources = [];
    if (this._backgroundImage && this._backgroundImage != "") {
        resources.push({resURL: this._backgroundImage, resType: HYRESOURCETYPE.IMAGE});
    }
    return resources;
}
HY.Core.Node.prototype.isResizing = function() {
    return this.__isResizing;
}
HY.Core.Node.prototype.isDraging = function(){
    return this.__isDraging;
}
HY.Core.Node.prototype.isRotating = function(){
    return this.__isRotating;
}
HY.Core.Node.prototype.needLayoutUI = function(){
	this.__layoutflag = true;
}
HY.Core.Node.prototype.layoutUI = function(){}
HY.Core.Node.prototype.reRender = function(){
	var app = this.getApplication();
	if(app){
		app.reRender();
	}
}
HY.Core.Node.prototype.addEventListener = function(pType,pSelector,pTarget){
	if(!this._events[pType]){
		this._events[pType] = [];
	}
	this._events[pType].push({selector:pSelector,target:pTarget});
}
HY.Core.Node.prototype.removeAllEventListener = function(pType){
	if(this._events[pType]){
		this._events[pType].splice(0,this._events[pType].length);
	}
}
HY.Core.Node.prototype.launchEvent = function(pType,eParamarray){
	var events = this._events[pType];
	if(events){
		var len = events.length;
		for(var i=0;i<len;++i){
			var eListener = events[i];
			if(eListener.selector){
				if(eListener.target){
					return eListener.selector.apply(eListener.target,eParamarray);
				}else{
					return eListener.selector.apply(this,eParamarray);
				}
			}
		}
	}
}
HY.Core.Node.prototype.onFinishLaunch = function(){
    this.launchEvent("finishlaunch",[this]);
}
HY.Core.Node.prototype.onCanvasSizeChanged = function(pNewSize){
    this.launchEvent("canvassizechanged",[this,pNewSize]);
}
HY.Core.Node.prototype.onFirstPaint = function(pDc){
	this.launchEvent("firstpaint",[this,pDc]);
}
HY.Core.Node.prototype.onClick = function(pEvent){
	this.launchEvent("click",[this,pEvent]);
}
HY.Core.Node.prototype.onDblClick = function (pEvent) {
	this.launchEvent("dblclick",[this,pEvent]);
}
HY.Core.Node.prototype.onMouseDown = function(pEvent){
	this.launchEvent("mousedown",[this,pEvent]);
}
HY.Core.Node.prototype.onMouseMove = function(pEvent){
	this.launchEvent("mousemove",[this,pEvent]);
}
HY.Core.Node.prototype.onMouseUp = function(pEvent){
	this.launchEvent("mouseup",[this,pEvent]);
}
HY.Core.Node.prototype.onMouseWheel = function(pEvent){
	this.launchEvent("mousewheel",[this,pEvent]);
}
HY.Core.Node.prototype.onMouseOver = function(pEvent){
	this.launchEvent("mouseover",[this,pEvent]);
}
HY.Core.Node.prototype.onMouseOut = function(pEvent){
	this.launchEvent("mouseout",[this,pEvent]);
}
HY.Core.Node.prototype.onKeyDown = function(pEvent){
	this.launchEvent("keydown",[this,pEvent]);
}
HY.Core.Node.prototype.onKeyPress = function(pEvent){
    this.launchEvent("keypress",[this,pEvent]);
}
HY.Core.Node.prototype.onKeyUp = function(pEvent){
	this.launchEvent("keyup",[this,pEvent]);
}
HY.Core.Node.prototype.onFocus = function(pEvent){
	this.launchEvent("focus",[this,pEvent]);
}
HY.Core.Node.prototype.onBlur = function(){
	this.launchEvent("blur",[this]);
}
HY.Core.Node.prototype.onEnterFrame = function(pDeltaTime){
	this.launchEvent("enterframe",[this,pDeltaTime]);
}
HY.Core.Node.prototype.onEndFrame = function(pDeltaTime){
    this.launchEvent("endframe",[this,pDeltaTime]);
}
HY.Core.Node.prototype.onPaint = function(pDc){
	this.launchEvent("paint",[this,pDc]);
}
HY.Core.Node.prototype.onStartResize = function(){
	this.__isResizing = true;
	this.launchEvent("startresize",[this]);
}
HY.Core.Node.prototype.onEndResize = function(){
	this.__isResizing = false;
	this.launchEvent("endresize",[this]);
}
HY.Core.Node.prototype.onResize = function(){
    this.launchEvent("resize",[this]);
}
HY.Core.Node.prototype.onStartDrag = function(){
	this.__isDraging = true;
	this.launchEvent("startdrag",[this]);
}
HY.Core.Node.prototype.onEndDrag = function(){
    this.__isDraging = false;
	this.launchEvent("enddrag",[this])
}
HY.Core.Node.prototype.onDrag = function() {
	this.launchEvent("drag",[this]);
}
HY.Core.Node.prototype.onStartRotate = function(){
    this.__isRotating = true;
	this.launchEvent("startrotate",[this]);
}
HY.Core.Node.prototype.onEndRotate = function(){
    this.__isRotating = false;
	this.launchEvent("endrotate",[this]);
}
HY.Core.Node.prototype.onRotate = function(){
	this.launchEvent("rotate",[this]);
}
HY.Core.Node.prototype.onContextMenu = function(pItem){
	this.launchEvent("contextmenu",[this,pItem]);
}
HY.Core.Node.prototype.onSizeChanged = function(){
    this.launchEvent("sizechanged",[this]);
}
HY.Core.Node.prototype.onPositionChanged = function(){
    this.launchEvent("positionchanged",[this])
}
HY.Core.Node.prototype.onAngleChanged = function(){
    this.launchEvent("anglechanged",[this]);
}
HY.Core.Node.prototype.onAnchorChanged = function(){
    this.launchEvent("anchorchanged",[this]);
}
HY.Core.Node.prototype._dispatchFinishLaunch = function(){
    var i = this._childNodeLayers.length-1;
    for(;i>=0;--i){
        var layer = this._childNodeLayers[i];
        if(layer){
            var j = layer.length-1;
            for(;j>=0;--j){
                layer[j]._dispatchFinishLaunch();
            }
        }
    }
    this.onFinishLaunch();
}
HY.Core.Node.prototype._dispatchCanvasSizeChanged = function(pNewSize){
    var i = this._childNodeLayers.length-1;
    for(;i>=0;--i){
        var layer = this._childNodeLayers[i];
        if(layer){
            var j = layer.length-1;
            for(;j>=0;--j){
                layer[j]._dispatchCanvasSizeChanged(pNewSize);
            }
        }
    }
    this.onCanvasSizeChanged(pNewSize);
}
HY.Core.Node.prototype._createClipPath = function(pDc){
    pDc.beginPath();
    var anchorPointX = Math.ceil(this._anchorPointX * this._width);
    var anchorPointY = Math.ceil(this._anchorPointY * this._height);
    var offsetx = this.getBorderWidth()/2;
    if(this._cornorRadius && this._cornorRadius!=0){
        pDc.moveTo(0-anchorPointX,this._cornorRadius-anchorPointY);
        pDc.arcTo(0-anchorPointX,0-anchorPointY,this._cornorRadius-anchorPointX, 0-anchorPointY,this._cornorRadius);
        pDc.lineTo(this._width-this._cornorRadius-anchorPointX, 0-anchorPointY);
        pDc.arcTo(this._width-anchorPointX, 0-anchorPointY,this._width-anchorPointX, this._cornorRadius-anchorPointY,this._cornorRadius);
        pDc.lineTo(this._width-anchorPointX, this._height-this._cornorRadius-anchorPointY);
        pDc.arcTo(this._width-anchorPointX, this._height-anchorPointY,this._width-this._cornorRadius-anchorPointX, this._height-anchorPointY, this._cornorRadius);
        pDc.lineTo(this._cornorRadius-anchorPointX, this._height-anchorPointY);
        pDc.arcTo(-anchorPointX, this._height-anchorPointY,0-anchorPointX,this._height-this._cornorRadius-anchorPointY,this._cornorRadius);
        pDc.closePath()
    }else{
        pDc.moveTo(-anchorPointX,-anchorPointY-offsetx);
        pDc.lineTo(this._width-anchorPointX,-anchorPointY-offsetx);
        pDc.lineTo(this._width-anchorPointX,this._height-anchorPointY+offsetx);
        pDc.lineTo(-anchorPointX,this._height-anchorPointY+offsetx);
        pDc.closePath();
    }
}
HY.Core.Node.prototype._createBorderPath = function(pDc){
	pDc.beginPath();
	var anchorPointX = Math.ceil(this._anchorPointX * this._width);
	var anchorPointY = Math.ceil(this._anchorPointY * this._height);
    var offsetx = this.getBorderWidth()/2;
	if(this._cornorRadius && this._cornorRadius!=0){
		pDc.moveTo(0-anchorPointX,this._cornorRadius-anchorPointY);
		pDc.arcTo(0-anchorPointX,0-anchorPointY,this._cornorRadius-anchorPointX, 0-anchorPointY,this._cornorRadius);
		pDc.lineTo(this._width-this._cornorRadius-anchorPointX, 0-anchorPointY);
		pDc.arcTo(this._width-anchorPointX, 0-anchorPointY,this._width-anchorPointX, this._cornorRadius-anchorPointY,this._cornorRadius);
		pDc.lineTo(this._width-anchorPointX, this._height-this._cornorRadius-anchorPointY);
		pDc.arcTo(this._width-anchorPointX, this._height-anchorPointY,this._width-this._cornorRadius-anchorPointX, this._height-anchorPointY, this._cornorRadius);
		pDc.lineTo(this._cornorRadius-anchorPointX, this._height-anchorPointY);
		pDc.arcTo(-anchorPointX, this._height-anchorPointY,0-anchorPointX,this._height-this._cornorRadius-anchorPointY,this._cornorRadius);
		pDc.closePath()
	}else{
		pDc.moveTo(-anchorPointX+offsetx,-anchorPointY);
		pDc.lineTo(this._width-anchorPointX-offsetx,-anchorPointY);
		pDc.lineTo(this._width-anchorPointX-offsetx,this._height-anchorPointY);
		pDc.lineTo(-anchorPointX+offsetx,this._height-anchorPointY);
		pDc.closePath();
	}
}
HY.Core.Node.prototype._dispatchEnterFrame = function(pDeltaTime){
    this.onEnterFrame(pDeltaTime);
    var i = this._childNodeLayers.length-1;
    for(;i>=0;--i){
        var layer = this._childNodeLayers[i];
        if(layer){
            var j = layer.length-1;
            for(;j>=0;--j){
                layer[j]._dispatchEnterFrame(pDeltaTime);
            }
        }
    }
    this.onEndFrame(pDeltaTime);
}
HY.Core.Node.prototype._dispatchPaintEvent = function (pDc,pDeltaTime,pNotPaint) {
    this.onEnterFrame(pDeltaTime);
	if(this.__layoutflag){
		this.layoutUI();
		this.__layoutflag = false;
	}
    if(this._visible && !pNotPaint){
        if(this.__isFirstPaint){
            this.__isFirstPaint = false;
            this.onFirstPaint(pDc);
        }
        var i= 0,j=0;
        pDc.save();
        if(this.getX() != 0 || this.getY() != 0){
            pDc.translate(this.getX(), this.getY());
        }
        if(this.getRotateZ() != 0){
            pDc.rotate(this.getRotateZ());
        }
        pDc.globalAlpha = this._alpha;
        /*裁剪区域并绘制背景色*/
		if(this._clipBound || this._backgroundColor){
			this._createClipPath(pDc);
			if(this._clipBound){
				pDc.clip();
			}
			if(this._backgroundColor){
				pDc.fillStyle = this._backgroundColor;
				pDc.fill();
			}
		}
        /*绘制背景图片*/
        if(this._backgroundImage != undefined && this._backgroundImage != null && this._backgroundImage != ""){
            var app = this.getApplication();
            if(app){
                var backImage = app.getResourceManager().getResDataByURL(this._backgroundImage);
                if(backImage != null){
                    var anchorPointX = Math.ceil(this._anchorPointX * this._width);
                    var anchorPointY = Math.ceil(this._anchorPointY * this._height);
                    pDc.drawImage(backImage,0,0,backImage.width,backImage.height,0-anchorPointX,0-anchorPointY,this._width,this._height);
                }
            }
        }
        /*自定义绘制*/
        this.onPaint(pDc);
        /*绘制子控件*/
		var layercount = this._childNodeLayers.length;
		for(i=0;i<layercount;++i){
			var layer = this._childNodeLayers[i];
			if(layer){
				var nodecount = layer.length;
				for(j=0;j<nodecount;++j){
					layer[j]._dispatchPaintEvent(pDc,pDeltaTime,false);
				}
			}
		}
        /*绘制边框*/
        if(this._borderColor != null && this._borderWidth > 0){
			this._createBorderPath(pDc);
            pDc.lineWidth = this._borderWidth;
            pDc.strokeStyle = this._borderColor;
            pDc.stroke();
        }
        pDc.restore();
    }
    this.onEndFrame(pDeltaTime);
}
HY.Core.Node.prototype._dispatchKeyUpEvent = function(pEvent){
	var i = this._childNodeLayers.length-1;
	for(;i>=0;--i){
		var layer = this._childNodeLayers[i];
		if(layer){
			var j = layer.length-1;
			for(;j>=0;--j){
				layer[j]._dispatchKeyUpEvent(pEvent);
			}
		}
	}
	this.onKeyUp(pEvent);
}
HY.Core.Node.prototype._dispatchKeyPressEvent = function(pEvent){
	var i = this._childNodeLayers.length-1;
	for(;i>=0;--i){
		var layer = this._childNodeLayers[i];
		if(layer){
			var j = layer.length-1;
			for(;j>=0;--j){
				layer[j]._dispatchKeyPressEvent(pEvent);
			}
		}
	}
	this.onKeyPress(pEvent);
}
HY.Core.Node.prototype._dispatchKeyDownEvent = function(pEvent){
	var i = this._childNodeLayers.length-1;
	for(;i>=0;--i){
		var layer = this._childNodeLayers[i];
		if(layer){
			var j = layer.length-1;
			for(;j>=0;--j){
				layer[j]._dispatchKeyDownEvent(pEvent);
			}
		}
	}
	this.onKeyDown(pEvent);
}
HY.Core.Node.prototype._dispatchMouseWheelEvent = function(pEvent){
	var i = this._childNodeLayers.length-1;
	for(;i>=0;--i){
		var layer = this._childNodeLayers[i];
		if(layer){
			var j = layer.length-1;
			for(;j>=0;--j){
				layer[j]._dispatchMouseWheelEvent(pEvent);
			}
		}
	}
	this.onMouseWheel(pEvent);
}
HY.Core.Node.prototype._dispatchClickEvent = function(pEvent) {
    if(this._visible){
        var evevectorincom = this.transFromCanvasPoint(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
        var lefttop = new HY.Vect2D({});
        lefttop.x = -1*this._anchorPointX*this._width;
        lefttop.y = -1*this._anchorPointY*this._height;
        var rightbottom = new HY.Vect2D({});
        rightbottom.x = (1-this._anchorPointX)*this._width;
        rightbottom.y = (1-this._anchorPointY)*this._height;
        if(this._clipBound){
            if(evevectorincom.x >= lefttop.x && evevectorincom.x <= rightbottom.x  && evevectorincom.y >= lefttop.y && evevectorincom.y <= rightbottom.y){
				var i = this._childNodeLayers.length-1;
				for(;i>=0;--i){
					var layer = this._childNodeLayers[i];
					if(layer){
						var j = layer.length-1;
						for(;j>=0;--j){
							if(layer[j]._dispatchClickEvent(pEvent)){
								return true;
							}
						}
					}
				}
                if(this._enable){
                    if(this._mouseTrigger){
                        this.onClick(pEvent);
                        return true;
                    }else{
                        return false;
                    }
                } else {
                    return true;
                }
            }else{
                return false;
            }
        }else{
			var i = this._childNodeLayers.length-1;
			for(;i>=0;--i){
				var layer = this._childNodeLayers[i];
				if(layer){
					var j = layer.length-1;
					for(;j>=0;--j){
						if(layer[j]._dispatchClickEvent(pEvent)){
							return true;
						}
					}
				}
			}
            if(this._enable){
                if(this._mouseTrigger){
                    if(evevectorincom.x >= lefttop.x && evevectorincom.x <= rightbottom.x  && evevectorincom.y >= lefttop.y && evevectorincom.y <= rightbottom.y){
                        this.onClick(pEvent);
                        return true;
                    }else{
                        return false;
                    }
                }
            }else{
                return true;
            }
        }
    }else{
        return false;
    }
}
HY.Core.Node.prototype._dispatchDblClickEvent = function(pEvent){
    if(this._visible){
        var evevectorincom = this.transFromCanvasPoint(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
        var lefttop = new HY.Vect2D({});
        lefttop.x = -1*this._anchorPointX*this._width;
        lefttop.y = -1*this._anchorPointY*this._height;
        var rightbottom = new HY.Vect2D({});
        rightbottom.x = (1-this._anchorPointX)*this._width;
        rightbottom.y = (1-this._anchorPointY)*this._height;
        if(this._clipBound){
            if(evevectorincom.x >= lefttop.x && evevectorincom.x <= rightbottom.x  && evevectorincom.y >= lefttop.y && evevectorincom.y <= rightbottom.y){
				var i = this._childNodeLayers.length-1;
				for(;i>=0;--i){
					var layer = this._childNodeLayers[i];
					if(layer){
						var j = layer.length-1;
						for(;j>=0;--j){
							if(layer[j]._dispatchDblClickEvent(pEvent)){
								return true;
							}
						}
					}
				}
                if(this._enable){
                    if(this._mouseTrigger){
                        this.onDblClick(pEvent);
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }else{
			var i = this._childNodeLayers.length-1;
			for(;i>=0;--i){
				var layer = this._childNodeLayers[i];
				if(layer){
					var j = layer.length-1;
					for(;j>=0;--j){
						if(layer[j]._dispatchDblClickEvent(pEvent)){
							return true;
						}
					}
				}
			}
            if(this._enable){
                if(this._mouseTrigger){
                    if(evevectorincom.x >= lefttop.x && evevectorincom.x <= rightbottom.x  && evevectorincom.y >= lefttop.y && evevectorincom.y <= rightbottom.y){
                        this.onDblClick(pEvent);
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            }else{
                return true;
            }
        }
    }else{
        return false;
    }
}
HY.Core.Node.prototype._dispatchContextMenuEvent = function(pEvent) {
    if(this._visible){
        var evevectorincom = this.transFromCanvasPoint(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
        var lefttop = new HY.Vect2D({});
        lefttop.x = -1*this._anchorPointX*this._width;
        lefttop.y = -1*this._anchorPointY*this._height;
        var rightbottom = new HY.Vect2D({});
        rightbottom.x = (1-this._anchorPointX)*this._width;
        rightbottom.y = (1-this._anchorPointY)*this._height;
        if(this._clipBound){
            if(evevectorincom.x >= lefttop.x && evevectorincom.x <= rightbottom.x  && evevectorincom.y >= lefttop.y && evevectorincom.y <= rightbottom.y){
				var i = this._childNodeLayers.length-1;
				for(;i>=0;--i){
					var layer = this._childNodeLayers[i];
					if(layer){
						var j = layer.length-1;
						for(;j>=0;--j){
							if(layer[j]._dispatchContextMenuEvent(pEvent)){
								return true;
							}
						}
					}
				}
                if(this._enable){
                    if(this._mouseTrigger){
                        if(this._contextMenu != null && this._contextMenu.length > 0){
                            var app = this.getApplication();
                            if(app != null){
                                app.showContextMenu(pEvent,this,this._contextMenu,false);
                            }
                        }else{
                            this.onContextMenu(null);
                        }
                        return true;
                    }else{
                        return false;
                    }
                } else {
                    return true;
                }
            }else{
                return false;
            }
        }else{
			var i = this._childNodeLayers.length-1;
			for(;i>=0;--i){
				var layer = this._childNodeLayers[i];
				if(layer){
					var j = layer.length-1;
					for(;j>=0;--j){
						if(layer[j]._dispatchContextMenuEvent(pEvent)){
							return true;
						}
					}
				}
			}
            if(this._enable){
                if(this._mouseTrigger){
                    if(evevectorincom.x >= lefttop.x && evevectorincom.x <= rightbottom.x  && evevectorincom.y >= lefttop.y && evevectorincom.y <= rightbottom.y){
                        if(this._contextMenu != null && this._contextMenu.length > 0){
                            var app = this.getApplication();
                            if(app != null){
                                app.showContextMenu(pEvent,this,this._contextMenu,false);
                            }
                        }else{
                            this.onContextMenu(null);
                        }
                        return true;
                    }else{
                        return false;
                    }
                }
            }else{
                return true;
            }
        }
    }else{
        return false;
    }
}
HY.Core.Node.prototype._dispatchRotateEvent = function(pEvent){
	return false;
}
HY.Core.Node.prototype._dispatchResizeEvent = function(pEvent){
	return false;
}
HY.Core.Node.prototype._dispatchDragEvent = function(pEvent){
	return false;
}
HY.Core.Node.prototype._dispatchMouseDownEvent = function(pEvent){
	return false;
}
HY.Core.Node.prototype._dispatchMouseMoveEvent = function(pEvent){
	return false;
}
HY.Core.Node.prototype._dispatchMouseUpEvent = function(pEvent){
	return false;
}