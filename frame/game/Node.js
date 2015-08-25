/*
 */
HY.Game.Node = function(config){
    this.extend(HY.Core.Node);
    this.initWithConfig(config);
}
HY.Game.Node.prototype = new HY.Core.Node();
HY.Game.Node.prototype.defaultAnchorPointX = 0.5;
HY.Game.Node.prototype.defaultAnchorPointY = 0.5;
HY.Game.Node.prototype.defaultClipBound = false;
HY.Game.Node.prototype.defaultDragAble = false;
HY.Game.Node.prototype.defaultResizeAble = false;
HY.Game.Node.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.dragZone != undefined){ this._dragZone = new HY.Rect2D(config.dragZone); } else { this._dragZone = new HY.Rect2D({x:-1000000,y:-1000000,width:2000000,height:2000000}); }
        if(config.dragLimitZone != undefined){ this._dragLimitZone = config.dragLimitZone; } else { this._dragLimitZone = null; }
        this.__dragStartCanvasPoint = null;
        this.__dragStartPosition = null;
        this.__dragLimitZone = null;
        this.__resizeStartCanvasPoint = null;
        this.__resizeStartPosition  = null;
        this.__resizeStartSize = null;
        this.__resizeDirection = 0;
        this.__rotateStartAngle = 0;
        this.__rotateStartCanvasAngle = 0;
        this.__accumlateTime = 0;
    }
}
HY.Game.Node.prototype.getDragZone = function(){
    return this._dragZone;
}
HY.Game.Node.prototype.setDragZone = function(pZone) {
    this._dragZone = pZone;
}

HY.Game.Node.prototype.runAction = function(pAction,pMode,pDelChild){
    var app = this.getApplication();
    if(app && app.getActionManager()){
        app.getActionManager().addActionLink(this,pAction,pMode,pDelChild);
    }
}
HY.Game.Node.prototype.stopAction = function(pAction,pChildrenStop){
    var app = this.getApplication();
    if(app && app.getActionManager()()){
        app.getActionManager().removeActionInSprite(this,pAction,pChildrenStop);
    }
}
HY.Game.Node.prototype.stopAllAction = function(pChildrenStop){
    var app = this.getApplication();
    if(app && app.getActionManager()){
        app.getActionManager().removeAllActionInSprite(this,pChildrenStop);
    }
}
HY.Game.Node.prototype.stopActionWithType = function(pType,pChildrenStop){
	var app = this.getApplication();
	if(app && app.getActionManager()){
		app.getActionManager().removeActionInSpriteWithType(this,pType,pChildrenStop);
	}
}
HY.Game.Node.prototype.stopActionWithOutType = function(pType,pChildrenStop){
	var app = this.getApplication();
	if(app && app.getActionManager()){
		app.getActionManager().removeActionInSpriteWithoutType(this,pType,pChildrenStop);
	}
}

HY.Game.Node.prototype.resetAccumulateTime = function(){
    this.__accumlateTime = 0;
}
HY.Game.Node.prototype.getAccumulateTime = function(){
    return this.__accumlateTime;
}
HY.Game.Node.prototype._dispatchRotateEvent = function(pEvent){
    var posInCanvas = this.transToCanvasPoint(new HY.Vect2D({x:0,y:0}));
    var vect2dInCanvas = new HY.Vect2D({x:pEvent.offsetX-posInCanvas.x,y:pEvent.offsetY-posInCanvas.y});
    var newAngle = this.__rotateStartAngle+vect2dInCanvas.getAngle()-this.__rotateStartCanvasAngle;
    this.setRotateZ(newAngle);
    this.onRotate();
}
HY.Game.Node.prototype._dispatchResizeEvent = function(pEvent){
    var curCanvasOffset = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
    var offsetVectAtCanvas = new HY.Vect2D({});
    var offsetVectAtThis = new HY.Vect2D({});
    var scaleX,scaleY;
    var newSize = new HY.Size2D({});
    offsetVectAtCanvas.x = curCanvasOffset.x - this.__resizeStartCanvasPoint.x;
    offsetVectAtCanvas.y = curCanvasOffset.y - this.__resizeStartCanvasPoint.y;
    offsetVectAtThis = this.transFromCanvasVect2d(offsetVectAtCanvas);
    switch (this.__resizeDirection){
        case HY.Game.RESIZENORTHWEST:{
            var leftTop = new HY.Vect2D({});
            leftTop.x = -this.getAnchorPointX()*this.__resizeStartSize.width;
            leftTop.y = -this.getAnchorPointY()*this.__resizeStartSize.height;
            scaleX = (leftTop.x+offsetVectAtThis.x)*1.0/leftTop.x;
            scaleY = (leftTop.y+offsetVectAtThis.y)*1.0/leftTop.y;
            newSize.width = this.__resizeStartSize.width*scaleX;
            newSize.height = this.__resizeStartSize.height*scaleY;
            if(newSize.width > 10){
                this.setWidth(this.__resizeStartSize.width*scaleX);
            }else{
                this.setWidth(10);
            }
            this.setHeight(this.__resizeStartSize.height*scaleY);
            break;
        }
        case HY.Game.RESIZENORTHEAST:{
            var rightTop = new HY.Vect2D({});
            rightTop.x = (1-this.getAnchorPointX())*this.__resizeStartSize.width;
            rightTop.y = -this.getAnchorPointY()*this.__resizeStartSize.height;
            scaleX = (rightTop.x+offsetVectAtThis.x)*1.0/rightTop.x;
            scaleY = (rightTop.y+offsetVectAtThis.y)*1.0/rightTop.y;
            this.setWidth(this.__resizeStartSize.width*scaleX);
            this.setHeight(this.__resizeStartSize.height*scaleY);
            break;
        }
        case HY.Game.RESIZESOUTHEAST:{
            var rightBottom = new HY.Vect2D({});
            rightBottom.x = (1-this.getAnchorPointX())*this.__resizeStartSize.width;
            rightBottom.y = (1-this.getAnchorPointY())*this.__resizeStartSize.height;
            scaleX = (rightBottom.x+offsetVectAtThis.x)*1.0/rightBottom.x;
            scaleY = (rightBottom.y+offsetVectAtThis.y)*1.0/rightBottom.y;
            this.setWidth(this.__resizeStartSize.width*scaleX);
            this.setHeight(this.__resizeStartSize.height*scaleY);
            break;
        }
        case HY.Game.RESIZESOUTHWEST:{
            var leftBottom = new HY.Vect2D({});
            leftBottom.x = -this.getAnchorPointX()*this.__resizeStartSize.width;
            leftBottom.y = (1-this.getAnchorPointY())*this.__resizeStartSize.height;
            scaleX = (leftBottom.x+offsetVectAtThis.x)*1.0/leftBottom.x;
            scaleY = (leftBottom.y+offsetVectAtThis.y)*1.0/leftBottom.y;
            this.setWidth(this.__resizeStartSize.width*scaleX);
            this.setHeight(this.__resizeStartSize.height*scaleY);
            break;
        }
        default :{
            break;
        }
    }
    this.onResize();
}
HY.Game.Node.prototype._dispatchDragEvent = function(pEvent){
    var curCanvasOffset = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
    var parent = this.getParent();
    var offsetVect = new HY.Vect2D({});
    var newPosition = new HY.Vect2D({});
    if(parent == null){
        offsetVect.x = curCanvasOffset.x - this.__dragStartCanvasPoint.x;
        offsetVect.y = curCanvasOffset.y - this.__dragStartCanvasPoint.y;
        newPosition.x = this.__dragStartPosition.x + offsetVect.x;
        newPosition.y = this.__dragStartPosition.y + offsetVect.y;
    }else{
        var curCanvasInParent = parent.transFromCanvasPoint(curCanvasOffset);
        var startCanvasInParent = parent.transFromCanvasPoint(this.__dragStartCanvasPoint);
        offsetVect.x = curCanvasInParent.x - startCanvasInParent.x;
        offsetVect.y = curCanvasInParent.y - startCanvasInParent.y;
        newPosition.x = this.__dragStartPosition.x + offsetVect.x;
        newPosition.y = this.__dragStartPosition.y + offsetVect.y;
    }
    try{
        if(this._dragLimitZone){
            if(this._dragLimitZone.type == 1){
                if(newPosition.x < this._dragLimitZone.x){
                    newPosition.x = this._dragLimitZone.x;
                }else if(newPosition.x > this._dragLimitZone.x+this._dragLimitZone.width){
                    newPosition.x = this._dragLimitZone.x + this._dragLimitZone.width;
                }
                if(newPosition.y < this._dragLimitZone.y){
                    newPosition.y = this._dragLimitZone.y;
                }else if(newPosition.y > this._dragLimitZone.y + this._dragLimitZone.height){
                    newPosition.y = this._dragLimitZone.y + this._dragLimitZone.height;
                }
                this.setPosition(newPosition);
            }else if(this._dragLimitZone.type == 2){
                var deltaVect = new HY.Vect2D({x:newPosition.x-this._dragLimitZone.x,y:newPosition.y - this._dragLimitZone.y});
                if(deltaVect.moldSquare() > this._dragLimitZone.radius*this._dragLimitZone.radius){
                    deltaVect.normalize();
                    newPosition.x = this._dragLimitZone.x + deltaVect.x * this._dragLimitZone.radius;
                    newPosition.y = this._dragLimitZone.y + deltaVect.y * this._dragLimitZone.radius;
                }
                this.setPosition(newPosition);
            }else{
                this.setPosition(newPosition);
            }
        }else{
            this.setPosition(newPosition);
        }
    }catch(err){
        window.console.log("HY.Game.Node.prototype._dispatchDragEvent:"+err);
        this.setPosition(newPosition);
    }

    this.onDrag();
}
HY.Game.Node.prototype._dispatchMouseDownEvent = function(pEvent){
    if(this._visible){
        var app = this.getApplication();
        var evevectorincom = this.transFromCanvasPoint(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
        var lefttop = new HY.Vect2D({});
        lefttop.x = -1*this._anchorPointX*this.getWidth();
        lefttop.y = -1*this._anchorPointY*this.getHeight();
        var rightbottom = new HY.Vect2D({});
        rightbottom.x = (1-this._anchorPointX)*this.getWidth();
        rightbottom.y = (1-this._anchorPointY)*this.getHeight();
        if(this._clipBound){
            if(evevectorincom.x >= lefttop.x && evevectorincom.x <= rightbottom.x  && evevectorincom.y >= lefttop.y && evevectorincom.y <= rightbottom.y){
                var layers = this.getLayers();
                var i = layers.length-1;
                for(;i>=0;--i){
                    var layer = layers[i];
                    if(layer){
                        var j = layer.length-1;
                        for(;j>=0;--j){
                            if(layer[j]._dispatchMouseDownEvent(pEvent)){
                                return true;
                            }
                        }
                    }
                }
                if(this._enable){
                    if(this._mouseTrigger){
                        this.onMouseDown(pEvent);
                        /*focus and blue event*/
                        if(app.getFocusElement(pEvent.identifier)){
                            var preFocusElement = app.getFocusElement(pEvent.identifier);
                            app.setFocusElement(this,pEvent.identifier);
                            preFocusElement.onBlur();
                            this.onFocus(pEvent);
                        }else{
                            app.setFocusElement(this,pEvent.identifier);
                            this.onFocus(pEvent);
                        }
                        /*drag and resize event*/
                        if(this._resizeAble){
                            if(evevectorincom.x <= lefttop.x+HY.GUI.RESIZEEDAGEWIDTH && evevectorincom.y <= lefttop.y+HY.GUI.RESIZEEDAGEWIDTH){
                                this.onStartResize();
                                this.__resizeDirection = HY.Game.RESIZENORTHWEST;
                                this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                                this.__resizeStartPosition = this.getPosition();
                                this.__resizeStartSize = this.getSize();
                            }else if(evevectorincom.x >= rightbottom.x-HY.GUI.RESIZEEDAGEWIDTH && evevectorincom.y <= lefttop.y+HY.GUI.RESIZEEDAGEWIDTH){
                                this.onStartResize();
                                this.__resizeDirection = HY.Game.RESIZENORTHEAST;
                                this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                                this.__resizeStartPosition = this.getPosition();
                                this.__resizeStartSize = this.getSize();
                            }else if(evevectorincom.x >= rightbottom.x-HY.GUI.RESIZEEDAGEWIDTH && evevectorincom.y >= rightbottom.y-HY.GUI.RESIZEEDAGEWIDTH){
                                this.onStartResize();
                                this.__resizeDirection = HY.Game.RESIZESOUTHEAST;
                                this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                                this.__resizeStartPosition = this.getPosition();
                                this.__resizeStartSize = this.getSize();
                            }else if(evevectorincom.x <= lefttop.x+HY.GUI.RESIZEEDAGEWIDTH && evevectorincom.y >= rightbottom.y-HY.GUI.RESIZEEDAGEWIDTH){
                                this.onStartResize();
                                this.__resizeDirection = HY.Game.RESIZESOUTHWEST;
                                this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                                this.__resizeStartPosition = this.getPosition();
                                this.__resizeStartSize = this.getSize();
                            }
                        }
                        if(this._dragAble && !this.isResizing()){
                            if(evevectorincom.x >= this._dragZone.x && evevectorincom.x <= this._dragZone.x + this._dragZone.width
                                && evevectorincom.y >= this._dragZone.y && evevectorincom.y <= this._dragZone.y + this._dragZone.height){
                                this.onStartDrag();
                                this.__dragStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                                this.__dragStartPosition = this.getPosition();
                            }
                        }
                        if(this._rotateAble && !this.isResizing() && !this.isDraging()){
                            this.onStartRotate();
                            var anchorInCanvas = this.transToCanvasPoint(new HY.Vect2D({x:0,y:0}));
                            var vect2dInCanvas = new HY.Vect2D({x:pEvent.offsetX-anchorInCanvas.x,y:pEvent.offsetY-anchorInCanvas.y});
                            this.__rotateStartAngle = this.getRotateZ();
                            this.__rotateStartCanvasAngle = vect2dInCanvas.getAngle();
                        }
                        return true;
                    }else{
                        if(app.getFocusElement(pEvent.identifier)){
                            var preFocusElement = app.getFocusElement(pEvent.identifier);
                            app.setFocusElement(this,pEvent.identifier);
                            preFocusElement.onBlur();
                        }
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
            var i = layers.length-1;
            for(;i>=0;--i){
                var layer = layers[i];
                if(layer){
                    var j = layer.length-1;
                    for(;j>=0;--j){
                        if(layer[j]._dispatchMouseDownEvent(pEvent)){
                            return true;
                        }
                    }
                }
            }
            if(this._enable){
                if(this._mouseTrigger){
                    if(evevectorincom.x > lefttop.x && evevectorincom.x < rightbottom.x  && evevectorincom.y > lefttop.y && evevectorincom.y < rightbottom.y){
                        this.onMouseDown(pEvent);
                        if(app.getFocusElement(pEvent.identifier)){
                            var preFocusElement = app.getFocusElement(pEvent.identifier);
                            app.setFocusElement(this,pEvent.identifier);
                            preFocusElement.onBlur();
                            this.onFocus(pEvent);
                        }else{
                            app.setFocusElement(this,pEvent.identifier);
                            this.onFocus(pEvent);
                        }
                        if(this._resizeAble){
                            if(evevectorincom.x <= lefttop.x+HY.GUI.RESIZEEDAGEWIDTH && evevectorincom.y <= lefttop.y+HY.GUI.RESIZEEDAGEWIDTH){
                                this.onStartResize();
                                this.__resizeDirection = HY.Game.RESIZENORTHWEST;
                                this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                                this.__resizeStartPosition = this.getPosition();
                                this.__resizeStartSize = this.getSize();
                            }else if(evevectorincom.x >= rightbottom.x-HY.GUI.RESIZEEDAGEWIDTH && evevectorincom.y <= lefttop.y+HY.GUI.RESIZEEDAGEWIDTH){
                                this.onStartResize();
                                this.__resizeDirection = HY.Game.RESIZENORTHEAST;
                                this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                                this.__resizeStartPosition = this.getPosition();
                                this.__resizeStartSize = this.getSize();
                            }else if(evevectorincom.x >= rightbottom.x-HY.GUI.RESIZEEDAGEWIDTH && evevectorincom.y >= rightbottom.y-HY.GUI.RESIZEEDAGEWIDTH){
                                this.onStartResize();
                                this.__resizeDirection = HY.Game.RESIZESOUTHEAST;
                                this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                                this.__resizeStartPosition = this.getPosition();
                                this.__resizeStartSize = this.getSize();
                            }else if(evevectorincom.x <= lefttop.x+HY.GUI.RESIZEEDAGEWIDTH && evevectorincom.y >= rightbottom.y-HY.GUI.RESIZEEDAGEWIDTH){
                                this.onStartResize();
                                this.__resizeDirection = HY.Game.RESIZESOUTHWEST;
                                this.__resizeStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                                this.__resizeStartPosition = this.getPosition();
                                this.__resizeStartSize = this.getSize();
                            }
                        }
                        if(this._dragAble && !this.isResizing()){
                            if(evevectorincom.x >= this._dragZone.x && evevectorincom.x <= this._dragZone.x + this._dragZone.width
                                && evevectorincom.y >= this._dragZone.y && evevectorincom.y <= this._dragZone.y + this._dragZone.height){
                                this.onStartDrag();
                                this.__dragStartCanvasPoint = new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY});
                                this.__dragStartPosition = this.getPosition();
                            }
                        }
                        if(this._rotateAble && !this.isResizing() && !this.isDraging()){
                            this.onStartRotate();
                            var anchorInCanvas = this.transToCanvasPoint(new HY.Vect2D({x:0,y:0}));
                            var vect2dInCanvas = new HY.Vect2D({x:pEvent.offsetX-anchorInCanvas.x,y:pEvent.offsetY-anchorInCanvas.y});
                            this.__rotateStartAngle = this.getRotateZ();
                            this.__rotateStartCanvasAngle = vect2dInCanvas.getAngle();
                        }
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    if(evevectorincom.x > lefttop.x && evevectorincom.x < rightbottom.x  && evevectorincom.y > lefttop.y && evevectorincom.y < rightbottom.y){
                        if (app.getFocusElement(pEvent.identifier)) {
                            var preFocusElement = app.getFocusElement(pEvent.identifier);
                            app.setFocusElement(null,pEvent.identifier);
                            preFocusElement.onBlur();
                        }
                    }
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
HY.Game.Node.prototype._dispatchMouseMoveEvent = function(pEvent){
    if(this._visible){
        var app = this.getApplication();
        var evevectorincom = this.transFromCanvasPoint(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
        var lefttop = new HY.Vect2D({});
        lefttop.x = -1*this._anchorPointX*this.getWidth();
        lefttop.y = -1*this._anchorPointY*this.getHeight();
        var rightbottom = new HY.Vect2D({});
        rightbottom.x = (1-this._anchorPointX)*this.getWidth();
        rightbottom.y = (1-this._anchorPointY)*this.getHeight();
        if(this._clipBound){
            if(evevectorincom.x >= lefttop.x && evevectorincom.x <= rightbottom.x  && evevectorincom.y >= lefttop.y && evevectorincom.y <= rightbottom.y){
                var layers = this.getLayers();
                var i = layers.length-1;
                for(;i>=0;--i){
                    var layer = layers[i];
                    if(layer){
                        var j = layer.length-1;
                        for(;j>=0;--j){
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
        }else{
            var layers = this.getLayers();
            var i = layers.length-1;
            for(;i>=0;--i){
                var layer = layers[i];
                if(layer){
                    var j = layer.length-1;
                    for(;j>=0;--j){
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
HY.Game.Node.prototype._dispatchMouseUpEvent = function(pEvent){
    if(this._visible){
        var evevectorincom = this.transFromCanvasPoint(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
        var lefttop = new HY.Vect2D({});
        lefttop.x = -1*this._anchorPointX*this.getWidth();
        lefttop.y = -1*this._anchorPointY*this.getHeight();
        var rightbottom = new HY.Vect2D({});
        rightbottom.x = (1-this._anchorPointX)*this.getWidth();
        rightbottom.y = (1-this._anchorPointY)*this.getHeight();
        if(this._clipBound){
            if(evevectorincom.x >= lefttop.x && evevectorincom.x <= rightbottom.x  && evevectorincom.y >= lefttop.y && evevectorincom.y <= rightbottom.y){
                var layers = this.getLayers();
                var i = layers.length-1;
                for(;i>=0;--i){
                    var layer = layers[i];
                    if(layer){
                        var j = layer.length-1;
                        for(;j>=0;--j){
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
            var i = layers.length-1;
            for(;i>=0;--i){
                var layer = layers[i];
                if(layer){
                    var j = layer.length-1;
                    for(;j>=0;--j){
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
