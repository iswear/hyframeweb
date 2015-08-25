/**
 * Created by Administrator on 2014/10/15.
 */
HY.GUI.View = function(config){
    this.extend(HY.Core.Node);
    this.initWithConfig(config);
}
HY.GUI.View.prototype = new HY.Core.Node();
HY.GUI.View.prototype.defaultClipBound = true;//继承过来
HY.GUI.View.prototype.defaultLimitMinWidth = 0;
HY.GUI.View.prototype.defaultLimitMaxWidth = 1000000;/*表示无限制*/
HY.GUI.View.prototype.defaultLimitMinHeight = 0;
HY.GUI.View.prototype.defaultLimitMaxHeight = 1000000;
HY.GUI.View.prototype.defaultLimitMinX = -1000000;
HY.GUI.View.prototype.defaultLimitMaxX = 1000000;
HY.GUI.View.prototype.defaultLimitMinY = -1000000;
HY.GUI.View.prototype.defaultLimitMaxY = 1000000;
HY.GUI.View.prototype.defaultDragZone = {x:0,y:0,width:0,height:0};
HY.GUI.View.prototype.defaultDragAble = false;
HY.GUI.View.prototype.defaultResizeAble = false;
HY.GUI.View.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.limitMinWidth != undefined){ this._limitMinWidth = config.limitMinWidth; } else { this._limitMinWidth = this.defaultLimitMinWidth; }
        if(config.limitMaxWidth != undefined){ this._limitMaxWidth = config.limitMaxWidth; } else { this._limitMaxWidth = this.defaultLimitMaxWidth; }
        if(config.limitMinHeight != undefined){ this._limitMinHeight = config.limitMinHeight; } else { this._limitMinHeight = this.defaultLimitMinHeight; }
        if(config.limitMaxHeight != undefined){ this._limitMaxHeight = config.limitMaxHeight; } else { this._limitMaxHeight = this.defaultLimitMaxHeight; }
        if(config.limitMinX != undefined){ this._limitMinX = config.limitMinX; } else { this._limitMinX = this.defaultLimitMinX; }
        if(config.limitMaxX != undefined){ this._limitMaxX = config.limitMaxX; } else { this._limitMaxX = this.defaultLimitMaxX; }
        if(config.limitMinY != undefined){ this._limitMinY = config.limitMinY; } else { this._limitMinY = this.defaultLimitMinY; }
        if(config.limitMaxY != undefined){ this._limitMaxY = config.limitMaxY; } else { this._limitMaxY = this.defaultLimitMaxY; }
        if(config.dragZone != undefined){ this._dragZone = new HY.Rect2D(config.dragZone); } else { this._dragZone = new HY.Rect2D(this.defaultDragZone); }

//		this.setX(this.getX());
//		this.setY(this.getY());
//		this.setWidth(this.getWidth());
//		this.setHeight(this.getHeight());

        this._anchorPointX = 0;
        this._anchorPointY = 0;
        this._rotateAngleZ = 0;

        this.__dragStartCanvasPoint = null;//in this parent location
        this.__dragStartPosition = null;
        this.__resizeStartCanvasPoint = null;
        this.__resizeStartPosition  = null;
        this.__resizeStartSize = null;
        this.__resizeDirection = 0;
    }
}
HY.GUI.View.prototype.setX = function(pX,eIgnoreMinMax){
	if(pX < this._limitMinX){
		pX = this._limitMinX;
	}else if(pX > this._limitMaxX){
		pX = this._limitMaxX;
	}
	this.superCall("setX",[pX]);
}
HY.GUI.View.prototype.setY = function(pY,eIgnoreMinMax){
	if(pY < this._limitMinY){
		pY = this._limitMinY;
	}else if(pY > this._limitMaxY){
		pY = this._limitMaxY;
	}
	this.superCall("setY",[pY]);
}
HY.GUI.View.prototype.setWidth = function(pWidth){
	if(pWidth < this._limitMinWidth){
		pWidth = this._limitMinWidth;
	}else if(pWidth > this._limitMaxWidth){
		pWidth = this._limitMaxWidth;
	}
	this.superCall("setWidth",[pWidth]);
}
HY.GUI.View.prototype.setHeight = function(pHeight){
	if(pHeight < this._limitMinHeight){
		pHeight = this._limitMinHeight;
	}else if(pHeight > this._limitMaxHeight){
		pHeight = this._limitMaxHeight;
	}
	this.superCall("setHeight",[pHeight]);
}
HY.GUI.View.prototype.setAnchorPointX = function(pX){}
HY.GUI.View.prototype.setAnchorPointY = function(pY){}
HY.GUI.View.prototype.setAnchorPoint = function(pPoint){}
HY.GUI.View.prototype.getLimitMinWidth = function(){
    return this._limitMinWidth;
}
HY.GUI.View.prototype.setLimitMinWidth = function(pWidth){
    this._limitMinWidth = pWidth;
	this.setWidth(this.getWidth());
}
HY.GUI.View.prototype.getLimitMaxWidth = function(){
    return this._limitMaxWidth;
}
HY.GUI.View.prototype.setLimitMaxWidth = function(pWidth){
    this._limitMaxWidth = pWidth;
	this.setWidth(this.getWidth());
}
HY.GUI.View.prototype.getLimitMinHeight = function(){
    return this._limitMinHeight;
}
HY.GUI.View.prototype.setLimitMinHeight = function(pHeight){
    this._limitMinHeight = pHeight;
	this.setHeight(this.getHeight());
}
HY.GUI.View.prototype.getLimitMaxHeight = function(){
    return this._limitMaxHeight;
}
HY.GUI.View.prototype.setLimitMaxHeight = function(pHeight){
    this._limitMaxHeight = pHeight;
	this.setHeight(this.getHeight());
}
HY.GUI.View.prototype.getLimitMinX = function(){
    return this._limitMinX;
}
HY.GUI.View.prototype.setLimitMinX = function(pX){
    this._limitMinX = pX;
	this.setX(this.getX());
}
HY.GUI.View.prototype.getLimitMaxX = function(){
    return this._limitMaxX;
}
HY.GUI.View.prototype.setLimitMaxX = function(pX){
    this._limitMaxX = pX;
	this.setX(this.getX());
}
HY.GUI.View.prototype.getLimitMinY = function(){
    return this._limitMinY;
}
HY.GUI.View.prototype.setLimitMinY = function(pY){
    this._limitMinY = pY;
	this.setY(this.getY());
}
HY.GUI.View.prototype.getLimitMaxY = function(){
    return this._limitMaxY;
}
HY.GUI.View.prototype.setLimitMaxY = function(pY){
    this._limitMaxY = pY;
	this.setY(this.getY());
}
HY.GUI.View.prototype.getDragZone = function(){
    return this._dragZone;
}
HY.GUI.View.prototype.setDragZone = function(pZone){
    this._dragZone = pZone;
}
HY.GUI.View.prototype._dispatchResizeEvent = function(pEvent){
    if(this._anchorPointX == 0 && this._anchorPointY == 0){
        var offsetVectAtCanvas = new HY.Vect2D({});
        var offsetVectAtParent = new HY.Vect2D({});
        var offsetVectAtThis = new HY.Vect2D({});
        offsetVectAtCanvas.x = pEvent.offsetX - this.__resizeStartCanvasPoint.x;
        offsetVectAtCanvas.y = pEvent.offsetY - this.__resizeStartCanvasPoint.y;
        offsetVectAtThis = this.transFromCanvasVect2d(offsetVectAtCanvas);

        switch (this.__resizeDirection){
            case HY.GUI.RESIZENORTHWEST:{
                this.setWidth(this.__resizeStartSize.width-offsetVectAtThis.x);
                this.setHeight(this.__resizeStartSize.height-offsetVectAtThis.y);
                offsetVectAtParent = this.transToParentVect2d(offsetVectAtThis);
                this.setX(this.__resizeStartPosition.x+offsetVectAtParent.x);
                this.setY(this.__resizeStartPosition.y+offsetVectAtParent.y);
                break;
            }
            case HY.GUI.RESIZENORTH:{
                this.setHeight(this.__resizeStartSize.height-offsetVectAtThis.y);
                offsetVectAtThis.x = 0;
                offsetVectAtParent = this.transToParentVect2d(offsetVectAtThis);
                this.setX(this.__resizeStartPosition.x+offsetVectAtParent.x);
                this.setY(this.__resizeStartPosition.y+offsetVectAtParent.y);
                break;
            }
            case HY.GUI.RESIZENORTHEAST:{
                this.setWidth(this.__resizeStartSize.width+offsetVectAtThis.x);
                this.setHeight(this.__resizeStartSize.height-offsetVectAtThis.y);
                offsetVectAtThis.x = 0;
                offsetVectAtParent = this.transToParentVect2d(offsetVectAtThis);
                this.setX(this.__resizeStartPosition.x+offsetVectAtParent.x);
                this.setY(this.__resizeStartPosition.y+offsetVectAtParent.y);
                break;
            }
            case HY.GUI.RESIZEEAST:{
                this.setWidth(this.__resizeStartSize.width+offsetVectAtThis.x);
                break;
            }
            case HY.GUI.RESIZESOUTHEAST:{
                this.setWidth(this.__resizeStartSize.width+offsetVectAtThis.x);
                this.setHeight(this.__resizeStartSize.height+offsetVectAtThis.y);
                break;
            }
            case HY.GUI.RESIZESOUTH:{
                this.setHeight(this.__resizeStartSize.height+offsetVectAtThis.y);
                break;
            }
            case HY.GUI.RESIZESOUTHWEST:{
                this.setWidth(this.__resizeStartSize.width-offsetVectAtThis.x);
                this.setHeight(this.__resizeStartSize.height+offsetVectAtThis.y);
                offsetVectAtThis.y = 0;
                offsetVectAtParent = this.transToParentVect2d(offsetVectAtThis);
                this.setX(this.__resizeStartPosition.x+offsetVectAtParent.x);
                this.setY(this.__resizeStartPosition.y+offsetVectAtParent.y);
                break;
            }
            case HY.GUI.RESIZEWEST:{
                this.setWidth(this.__resizeStartSize.width-offsetVectAtThis.x);
                offsetVectAtThis.y = 0;
                offsetVectAtParent = this.transToParentVect2d(offsetVectAtThis);
                this.setX(this.__resizeStartPosition.x+offsetVectAtParent.x);
                this.setY(this.__resizeStartPosition.y+offsetVectAtParent.y);
                break;
            }
            default :{
                break;
            }
        }
    }
    this.onResize();
}
HY.GUI.View.prototype._dispatchDragEvent = function(pEvent){
    var parent = this.getParent();
    var offsetVect = new HY.Vect2D({});
    var newPosition = new HY.Vect2D({});
    if(parent == null){
        offsetVect.x = pEvent.offsetX - this.__dragStartCanvasPoint.x;
        offsetVect.y = pEvent.offsetY - this.__dragStartCanvasPoint.y;
        newPosition.x = this.__dragStartPosition.x + offsetVect.x;
        if(newPosition.x > this._limitMaxX){
            newPosition.x = this._limitMaxX;
        }else if(newPosition.x < this._limitMinX){
            newPosition.x = this._limitMinX;
        }
        newPosition.y = this.__dragStartPosition.y + offsetVect.y;
        if(newPosition.y > this._limitMaxY){
            newPosition.y = this._limitMaxY;
        }else if(newPosition.y < this._limitMinY){
            newPosition.y = this._limitMinY;
        }
        this.setPosition(newPosition);
    }else{
        var curCanvasInParent = parent.transFromCanvasPoint(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
        var startCanvasInParent = parent.transFromCanvasPoint(this.__dragStartCanvasPoint);
        offsetVect.x = curCanvasInParent.x - startCanvasInParent.x;
        offsetVect.y = curCanvasInParent.y - startCanvasInParent.y;
        newPosition.x = this.__dragStartPosition.x + offsetVect.x;
        if(newPosition.x > this._limitMaxX){
            newPosition.x = this._limitMaxX;
        }else if(newPosition.x < this._limitMinX){
            newPosition.x = this._limitMinX;
        }
        newPosition.y = this.__dragStartPosition.y + offsetVect.y;
        if(newPosition.y > this._limitMaxY){
            newPosition.y = this._limitMaxY;
        }else if(newPosition.y < this._limitMinY){
            newPosition.y = this._limitMinY;
        }
        this.setPosition(newPosition);
    }
    this.onDrag();
}
HY.GUI.View.prototype._dispatchMouseDownEvent = function(pEvent){
    if(this._visible){
        var app = this.getApplication();
        var evevectorincom = this.transFromCanvasPoint(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
        var lefttop = new HY.Vect2D({});
        lefttop.x = -1*this._anchorPointX*this._width;
        lefttop.y = -1*this._anchorPointY*this._height;
        var rightbottom = new HY.Vect2D({});
        rightbottom.x = (1-this._anchorPointX)*this._width;
        rightbottom.y = (1-this._anchorPointY)*this._height;
        if(this._clipBound){
            if(evevectorincom.x >= lefttop.x && evevectorincom.x <= rightbottom.x  && evevectorincom.y >= lefttop.y && evevectorincom.y <= rightbottom.y){
                var layers = this.getLayers();
                for(var i = layers.length-1;i>=0;--i){
                    var layer = layers[i];
                    if(layer){
                        for(var j = layer.length-1;j>=0;--j){
                            if(layer[j]._dispatchMouseDownEvent(pEvent)){
                                return true;
                            }
                        }
                    }
                }
                if(this._mouseTrigger){
                    this.onMouseDown(pEvent);
                    /*focus and blue event*/
                    if(app.getFocusElement(pEvent.identifier)){
                        if(app.getFocusElement(pEvent.identifier) != this){
                            var preFocusElement = app.getFocusElement(pEvent.identifier);
                            app.setFocusElement(this,pEvent.identifier);
                            preFocusElement.onBlur();
                            this.onFocus(pEvent);
                        }
                    }else{
                        app.setFocusElement(this,pEvent.identifier);
                        this.onFocus(pEvent);
                    }
                    /*drag and resize event*/
                    if(this._resizeAble){
                        if(evevectorincom.x <= lefttop.x+HY.GUI.RESIZEEDAGEWIDTH && evevectorincom.y <= lefttop.y+HY.GUI.RESIZEEDAGEWIDTH){
                            this.onStartResize();
                            this.__resizeDirection = HY.GUI.RESIZENORTHWEST;
                            this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                            this.__resizeStartPosition = this.getPosition();
                            this.__resizeStartSize = this.getSize();
                        }else if(evevectorincom.x >= rightbottom.x-HY.GUI.RESIZEEDAGEWIDTH && evevectorincom.y <= lefttop.y+HY.GUI.RESIZEEDAGEWIDTH){
                            this.onStartResize();
                            this.__resizeDirection = HY.GUI.RESIZENORTHEAST;
                            this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                            this.__resizeStartPosition = this.getPosition();
                            this.__resizeStartSize = this.getSize();
                        }else if(evevectorincom.x >= rightbottom.x-HY.GUI.RESIZEEDAGEWIDTH && evevectorincom.y >= rightbottom.y-HY.GUI.RESIZEEDAGEWIDTH){
                            this.onStartResize();
                            this.__resizeDirection = HY.GUI.RESIZESOUTHEAST;
                            this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                            this.__resizeStartPosition = this.getPosition();
                            this.__resizeStartSize = this.getSize();
                        }else if(evevectorincom.x <= lefttop.x+HY.GUI.RESIZEEDAGEWIDTH && evevectorincom.y >= rightbottom.y-HY.GUI.RESIZEEDAGEWIDTH){
                            this.onStartResize();
                            this.__resizeDirection = HY.GUI.RESIZESOUTHWEST;
                            this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                            this.__resizeStartPosition = this.getPosition();
                            this.__resizeStartSize = this.getSize();
                        }else if(evevectorincom.x <= lefttop.x + HY.GUI.RESIZEEDAGEWIDTH){
                            this.onStartResize();
                            this.__resizeDirection = HY.GUI.RESIZEWEST;
                            this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                            this.__resizeStartPosition = this.getPosition();
                            this.__resizeStartSize = this.getSize();
                        }else if(evevectorincom.y <= lefttop.y + HY.GUI.RESIZEEDAGEWIDTH){
                            this.onStartResize();
                            this.__resizeDirection = HY.GUI.RESIZENORTH;
                            this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                            this.__resizeStartPosition = this.getPosition();
                            this.__resizeStartSize = this.getSize();
                        }else if(evevectorincom.x >= rightbottom.x - HY.GUI.RESIZEEDAGEWIDTH){
                            this.onStartResize();
                            this.__resizeDirection = HY.GUI.RESIZEEAST;
                            this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                            this.__resizeStartPosition = this.getPosition();
                            this.__resizeStartSize = this.getSize();
                        }else if(evevectorincom.y >= rightbottom.y - HY.GUI.RESIZEEDAGEWIDTH){
                            this.onStartResize();
                            this.__resizeDirection = HY.GUI.RESIZESOUTH;
                            this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                            this.__resizeStartPosition = this.getPosition();
                            this.__resizeStartSize = this.getSize();
                        }
                    }
                    if(this._dragAble && !this.isResizing()){
                        if(this._dragZone != null){
                            if(evevectorincom.x >= this._dragZone.x && evevectorincom.x <= this._dragZone.x + this._dragZone.width
                                && evevectorincom.y >= this._dragZone.y && evevectorincom.y <= this._dragZone.y + this._dragZone.height){
                                this.onStartDrag();
                                this.__dragStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                                this.__dragStartPosition = this.getPosition();
                            }
                        }
                    }
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }else{
            var layers = this.getLayers();
            for(var i = layers.length-1;i>=0;--i){
                var layer = layers[i];
                if(layer){
                    for(var j = layer.length-1;j>=0;--j){
                        if(layer[j]._dispatchMouseDownEvent(pEvent)){
                            return true;
                        }
                    }
                }
            }
            if(this._mouseTrigger){
                if(evevectorincom.x > lefttop.x && evevectorincom.x < rightbottom.x  && evevectorincom.y > lefttop.y && evevectorincom.y < rightbottom.y){
                    this.onMouseDown(pEvent);
                    if(app.getFocusElement(pEvent.identifier)){
                        if(app.getFocusElement(pEvent.identifier) != this){
                            var preFocusElement = app.getFocusElement(pEvent.identifier);
                            app.setFocusElement(this,pEvent.identifier);
                            preFocusElement.onBlur();
                            this.onFocus(pEvent);
                        }
                    }else{
                        app.setFocusElement(this,pEvent.identifier);
                        this.onFocus(pEvent);
                    }
                    if(this._resizeAble){
                        if(evevectorincom.x <= lefttop.x+HY.GUI.RESIZEEDAGEWIDTH && evevectorincom.y <= lefttop.y+HY.GUI.RESIZEEDAGEWIDTH){
                            this.onStartResize();
                            this.__resizeDirection = HY.GUI.RESIZENORTHWEST;
                            this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                            this.__resizeStartPosition = this.getPosition();
                            this.__resizeStartSize = this.getSize();
                        }else if(evevectorincom.x >= rightbottom.x-HY.GUI.RESIZEEDAGEWIDTH && evevectorincom.y <= lefttop.y+HY.GUI.RESIZEEDAGEWIDTH){
                            this.onStartResize();
                            this.__resizeDirection = HY.GUI.RESIZENORTHEAST;
                            this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                            this.__resizeStartPosition = this.getPosition();
                            this.__resizeStartSize = this.getSize();
                        }else if(evevectorincom.x >= rightbottom.x-HY.GUI.RESIZEEDAGEWIDTH && evevectorincom.y >= rightbottom.y-HY.GUI.RESIZEEDAGEWIDTH){
                            this.onStartResize();
                            this.__resizeDirection = HY.GUI.RESIZESOUTHEAST;
                            this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                            this.__resizeStartPosition = this.getPosition();
                            this.__resizeStartSize = this.getSize();
                        }else if(evevectorincom.x <= lefttop.x+HY.GUI.RESIZEEDAGEWIDTH && evevectorincom.y >= rightbottom.y-HY.GUI.RESIZEEDAGEWIDTH){
                            this.onStartResize();
                            this.__resizeDirection = HY.GUI.RESIZESOUTHWEST;
                            this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                            this.__resizeStartPosition = this.getPosition();
                            this.__resizeStartSize = this.getSize();
                        }else if(evevectorincom.x <= lefttop.x + HY.GUI.RESIZEEDAGEWIDTH){
                            this.onStartResize();
                            this.__resizeDirection = HY.GUI.RESIZEWEST;
                            this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                            this.__resizeStartPosition = this.getPosition();
                            this.__resizeStartSize = this.getSize();
                        }else if(evevectorincom.y <= lefttop.y + HY.GUI.RESIZEEDAGEWIDTH){
                            this.onStartResize();
                            this.__resizeDirection = HY.GUI.RESIZENORTH;
                            this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                            this.__resizeStartPosition = this.getPosition();
                            this.__resizeStartSize = this.getSize();
                        }else if(evevectorincom.x >= rightbottom.x - HY.GUI.RESIZEEDAGEWIDTH){
                            this.onStartResize();
                            this.__resizeDirection = HY.GUI.RESIZEEAST;
                            this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                            this.__resizeStartPosition = this.getPosition();
                            this.__resizeStartSize = this.getSize();
                        }else if(evevectorincom.y >= rightbottom.y - HY.GUI.RESIZEEDAGEWIDTH){
                            this.onStartResize();
                            this.__resizeDirection = HY.GUI.RESIZESOUTH;
                            this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                            this.__resizeStartPosition = this.getPosition();
                            this.__resizeStartSize = this.getSize();
                        }
                    }
                    if(this._dragAble && !this.isResizing()){
                        if(this._dragZone != null){
                            if(evevectorincom.x >= this._dragZone.x && evevectorincom.x <= this._dragZone.x + this._dragZone.width
                                && evevectorincom.y >= this._dragZone.y && evevectorincom.y <= this._dragZone.y + this._dragZone.height){
                                this.onStartDrag();
                                this.__dragStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                                this.__dragStartPosition = this.getPosition();
                            }
                        }
                    }
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }
    }else{
        return false;
    }
}
HY.GUI.View.prototype._dispatchMouseMoveEvent = function(pEvent){
    if(this._visible){
        var app = this.getApplication();
        var evevectorincom = this.transFromCanvasPoint(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
        var lefttop = new HY.Vect2D({});
        lefttop.x = -1*this._anchorPointX*this._width;
        lefttop.y = -1*this._anchorPointY*this._height;
        var rightbottom = new HY.Vect2D({});
        rightbottom.x = (1-this._anchorPointX)*this._width;
        rightbottom.y = (1-this._anchorPointY)*this._height;
        if(this._clipBound){
            if(evevectorincom.x >= lefttop.x && evevectorincom.x <= rightbottom.x  && evevectorincom.y >= lefttop.y && evevectorincom.y <= rightbottom.y){
                var layers = this.getLayers();
                for(var i=layers.length-1;i>=0;--i){
                    var layer = layers[i];
                    if(layer){
                        for(var j = layer.length-1;j>=0;--j){
                            if(layer[j]._dispatchMouseMoveEvent(pEvent)){
                                return true;
                            }
                        }
                    }
                }
                if(this._enable){
                    if(this._mouseTrigger){
                        if(app.getMouseoverElement(pEvent.identifier)){
                            if(app.getMouseoverElement(pEvent.identifier) != this){
                                var preOverElement = app.getMouseoverElement(pEvent.identifier);
                                app.setMouseoverElement(this,pEvent.identifier);
                                preOverElement.onMouseOut(pEvent);
                                this.onMouseOver(pEvent);
                            }
                        }else {
                            app.setMouseoverElement(this,pEvent.identifier);
                            this.onMouseOver(pEvent);
                        }
                        this.onMouseMove(pEvent);
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return true;
                }
            }else{
                return false;
            }
        }else{
            var layers = this.getLayers();
            for(var i=layers.length-1;i>=0;--i){
                var layer = layers[i];
                if(layer){
                    for(var j=layer.length;j>=0;--j){
                        if(layer[j]._dispatchMouseMoveEvent(pEvent)){
                            return true;
                        }
                    }
                }
            }
            if(evevectorincom.x >= lefttop.x && evevectorincom.x <= rightbottom.x  && evevectorincom.y >= lefttop.y && evevectorincom.y <= rightbottom.y){
                if(this._enable){
                    if(this._mouseTrigger){
                        if(app.getMouseoverElement(pEvent.identifier)){
                            if(app.getMouseoverElement(pEvent.identifier) != this){
                                var preOverElement = app.getMouseoverElement(pEvent.identifier);
                                app.setMouseoverElement(this,pEvent.identifier);
                                preOverElement.onMouseOut(pEvent);
                                this.onMouseOver(pEvent);
                            }
                        }else{
                            app.setMouseoverElement(this,pEvent.identifier);
                            this.onMouseOver(pEvent);
                        }
                        this.onMouseMove(pEvent);
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return true;
                }
            }else{
                return false;
            }
        }
    }
}
HY.GUI.View.prototype._dispatchMouseUpEvent = function(pEvent){
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
                var layers = this.getLayers();
                for(var i=layers.length-1;i>=0;--i){
                    var layer = layers[i];
                    if(layer){
                        for(var j=layer.length-1;j>=0;--j){
                            if(layer[j]._dispatchMouseUpEvent(pEvent)){
                                return true;
                            }
                        }
                    }
                }
                if(this._enable){
                    if(this._mouseTrigger){
                        this.onMouseUp(pEvent);
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return true;
                }
            }else{
                return false;
            }
        }else{
            var layers = this.getLayers();
            for(var i=layers.length-1;i>=0;--i){
                var layer = layers[i];
                if(layer){
                    var j = layer.length;
                    for(var j=layer.length-1;j>=0;--j){
                        if(layer[j]._dispatchMouseUpEvent(pEvent)){
                            return true;
                        }
                    }
                }
            }
            if(this._enable){
                if(this._mouseTrigger){
                    if(evevectorincom.x >= lefttop.x && evevectorincom.x <= rightbottom.x  && evevectorincom.y >= lefttop.y && evevectorincom.y <= rightbottom.y){
                        this.onMouseUp(pEvent);
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