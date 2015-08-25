HY.Core.Application = function(config){
    this.extend(HY.Object);
    this.initWithConfig(config);
}
HY.Core.Application.prototype = new HY.Object();
HY.Core.Application.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        //public member
        if(config.fps != undefined){ this._fps = config.fps; } else { this._fps = 60; }
        //private member
        if(config.appWidth != undefined){ this._appWidth = config.appWidth; } else { this._appWidth = 400; }
        if(config.appHeight != undefined){ this._appHeight = config.appHeight; } else { this._appHeight = 300; }
        if(config.fullScreen != undefined){ this._fullScreen = config.fullScreen; } else { this._fullScreen = true; }
        if(config.autoScale != undefined){ this._autoScale = config.autoScale; }else{ this._autoScale = true; }
        if(config.renderCanvas != undefined){ this._renderCanvas = config.renderCanvas; } else { this._renderCanvas = null; }
        if(config.renderCanvasLocation != undefined){ this._renderCanvasLocation = config.renderCanvasLocation; } else { this._renderCanvasLocation = null; }

        this._cacheCanvas = null;
        this._scaleX = 1.0;
        this._scaleY = 1.0;
        this._canvasWidth = this._appWidth;
        this._canvasHeight = this._appHeight;
        this._rootNode = null;
        this._focusElement = [];							    //数组
        this._mouseoverElement = [];						    //数组
		this._mousePos = [];								    //数组
		this._dragClipBoard = [];
		this._mouseDownFlag = false;							//鼠标是否按下标志主要用于记录当前

        //private assist readonly member
		this.__drawReady = true;								//绘制标志
        this.__preFrameTime = null;							//前一帧时间
        this.__clipBoard = null;								//剪贴板
        this.__contextmenu = null;							//鼠标右键菜单
		this.__inputCursor = null;							//输入textfield的标签
		this.__reRenderFlag = true;                         //重绘标识
		this.__renderLoopHandle = null;						//渲染句柄

		//dc相关
        this._actionManager =  new HY.Core.Action.Manager({});		//动作管理器
        this._resourceManager = new HY.Core.Resource.Manager({});	//资源管理器
        this._console = document.getElementById("1");
        this._acctimeaa = 0;
        this._accframeaa = 0;
    }
}
HY.Core.Application.prototype.isFullScreen = function(){
    return this._fullScreen;
}
HY.Core.Application.prototype.getRenderCanvas = function() {
	return this._renderCanvas;
}
HY.Core.Application.prototype.showContextMenu = function(pEvent,pNode,pItem,pMenuShow){
    if(this._rootNode != null){
		if(this.__contextmenu == null){
			this.__contextmenu = new HY.GUI.ListView({
				width:120,
				limitMinWidth:120,
				autoFloat:true,
				borderWidth:2,
				normalItemColor:'#FFFFFF',
				rowHeight:23
			});
			this.__contextmenu.addEventListener("itemselected",function(pThis,pItem){
				if(this.menutype == 0 && this.hyfocus.onContextMenu){
					this.hyfocus.onContextMenu(pItem);
				}else if(this.menutype == 1 && this.hyfocus.onDropItem){
					this.hyfocus.onDropItem(pItem);
				}
				this.setSelectedItem(null);
			},null);
			this._rootNode.addChildNodeAtLayer(this.__contextmenu,2);
		}
		if(pMenuShow){
			var pos = pNode.transToCanvasPoint(new HY.Vect2D({x:0,y:pNode.getHeight()}));
			this.__contextmenu.hyfocus = pNode;
			this.__contextmenu.menutype = 1;
			this.__contextmenu.setX(pos.x-this._rootNode.getX());
			this.__contextmenu.setY(pos.y-this._rootNode.getY());
			this.__contextmenu.setItems(pItem);
			this.__contextmenu.setVisible(true);
		}else{
			this.__contextmenu.hyfocus = pNode;
			this.__contextmenu.menutype = 0;
			this.__contextmenu.setX(pEvent.offsetX-this._rootNode.getX());
			this.__contextmenu.setY(pEvent.offsetY-this._rootNode.getY());
			this.__contextmenu.setItems(pItem);
			this.__contextmenu.setVisible(true);
		}
		pEvent.preventDefault();
    }
}
HY.Core.Application.prototype.hideContextMenu = function(){
    if(this.__contextmenu != null){
        this.__contextmenu.setVisible(false);
    }
}
HY.Core.Application.prototype.getClipBoard = function(){
	return this.__clipBoard;
}
HY.Core.Application.prototype.setClipBoard = function(pData){
	this.__clipBoard = pData;
}
HY.Core.Application.prototype.getDragClipBoard = function(identifier){
	if(identifier == undefined){ identifier = 0; }
	if(identifier < this._dragClipBoard.length){
		return this._dragClipBoard[identifier];
	}else{
		return null;
	}
}
HY.Core.Application.prototype.setDragClipBoard = function(pData,identifier){
	if(identifier == undefined){ identifier = 0; }
	this._dragClipBoard[identifier] = pData;
}
HY.Core.Application.prototype.getFocusElement = function(identifier){
	if(identifier == undefined){ identifier = 0; }
	if(identifier < this._focusElement.length){
		return this._focusElement[identifier];
	}else{
		return null;
	}
}
HY.Core.Application.prototype.setFocusElement = function(pNode,identifier){
	if(identifier == undefined){ identifier = 0; }
	this._focusElement[identifier] = pNode;
}
HY.Core.Application.prototype.getFocusElements = function(){
	return this._focusElement;
}
HY.Core.Application.prototype.getMouseoverElement = function(identifier){
	if(identifier == undefined){ identifier = 0; }
	if(identifier < this._mouseoverElement.length){
		return this._mouseoverElement[identifier];
	}else{
		return null;
	}
}
HY.Core.Application.prototype.setMouseoverElement = function(pNode,identifier){
	if(identifier == undefined){ identifier = 0; }
	this._mouseoverElement[identifier] = pNode;
}
HY.Core.Application.prototype.getMouseoverElements = function(){
	return this._mouseoverElement;
}
HY.Core.Application.prototype.getMousePos = function(identifier){
	if(identifier == undefined){ identifier = 0; }
	if(identifier < this._mousePos.length){
		return this._mousePos[identifier];
	}else{
		return null;
	}
}
HY.Core.Application.prototype.setMousePos = function(pPos,identifier){
	if(identifier == undefined){ identifier = 0; }
	this._mousePos[identifier] = pPos;
}
HY.Core.Application.prototype.isMouseDown = function(){
	if(HY.isMobilePlatform()){
		return true;
	}else{
		return this._mouseDownFlag;
	}
}
HY.Core.Application.prototype.setMouseDown = function(pDown){
    return this._mouseDownFlag = pDown;
}
HY.Core.Application.prototype.getAppWidth = function(){
    return this._appWidth;
}
HY.Core.Application.prototype.setAppWidth = function(pWidth){
    this._appWidth = pWidth;
    if(this._renderCanvas){
        this._renderCanvas.width = pWidth;
    }
}
HY.Core.Application.prototype.getAppHeight = function(){
    return this._appHeight;
}
HY.Core.Application.prototype.setAppHeight = function(pHeight){
    this._appHeight = pHeight;
    if(this._renderCanvas){
        this._renderCanvas.height = pHeight;
    }
}
HY.Core.Application.prototype.getScaleX = function(){
    return this._scaleX;
}
HY.Core.Application.prototype.getScaleY = function(){
    return this._scaleY;
}
HY.Core.Application.prototype.getFps = function(){
    return this._fps;
}
HY.Core.Application.prototype.setFps = function(pFps) {
    this._fps = pFps;
}
HY.Core.Application.prototype.getActionManager = function(){
    return this._actionManager;
}
HY.Core.Application.prototype.getResourceManager = function(){
    return this._resourceManager;
}
HY.Core.Application.prototype.getDC = function(){
    if(this._renderCanvas != null){
        return this._renderCanvas.getContext("2d");
    }else{
        return null;
    }
}
HY.Core.Application.prototype.init = function(){
	//try{
		this.initContext();
		this.initEventDispatcher();
	//}catch(err){
	//	alert(err);
	//}
}
HY.Core.Application.prototype.initContext = function(){
    var doc = document;
    if(this._renderCanvasLocation == null){
        this._renderCanvasLocation = doc.body;
    }
    if(this._renderCanvas == null){
        this._cacheCanvas = doc.createElement("canvas");
        this._renderCanvas = doc.createElement("canvas");
        this._renderCanvas.innerText = "您的浏览器不支持CANVAS标签，请下载HTML5的浏览器，如chrome,IE9+,FireFox,Safari等";
    }
    if(this._fullScreen){
        var winSize = HY.getDocumentSize();
        this._renderCanvas.style.position = "absolute";
        this._renderCanvas.style.backgroundColor = "gray";
		this._renderCanvas.style.left = "0px";
		this._renderCanvas.style.top = "0px";
        this._renderCanvas.style.width = winSize.width+"px";
        this._renderCanvas.style.height = winSize.height+"px";
        if(!this._autoScale){
            this._scaleX = 1;
            this._scaleY = 1;
            this.setAppWidth(winSize.width);
            this.setAppHeight(winSize.height);
        }else{
            this._renderCanvas.width = this._appWidth;
            this._renderCanvas.height = this._appHeight;
            this._scaleX = this._appWidth/winSize.width;
            this._scaleY = this._appHeight/winSize.height;
        }
        var $this = this;
        window.onresize = function(){
            var newWinSize = HY.getDocumentSize();
            $this._renderCanvas.style.width = newWinSize.width+"px";
            $this._renderCanvas.style.height = newWinSize.height+"px";
            if(!$this._autoScale){
                $this._scaleX = 1;
                $this._scaleY = 1;
                $this.setAppWidth(newWinSize.width);
                $this.setAppHeight(newWinSize.height);
            }else{
                $this._scaleX = $this._appWidth/newWinSize.width;
                $this._scaleY = $this._appHeight/newWinSize.height;
            }
            if($this._rootNode){
                $this._rootNode._dispatchCanvasSizeChanged(newWinSize);
				$this.reRender();
				$this.renderLoop(0);
            }
        };
    }else{
        this._renderCanvas.style.backgroundColor = "gray";
		this._renderCanvas.style.left = "0px";
		this._renderCanvas.style.top = "0px";
        this._renderCanvas.style.width = this._appWidth + "px";
        this._renderCanvas.style.height = this._appHeight + "px";
        this._renderCanvas.width = this._appWidth;
        this._renderCanvas.height = this._appHeight;
    }
    this._renderCanvasLocation.appendChild(this._renderCanvas);
}
HY.Core.Application.prototype.initEventDispatcher = function(){
	if(HY.isMobilePlatform()){
		var doc = document;
		HY.Core.Event.addListener(doc,this,"touchstart",function(e){
			var pevent = event?event:e;
			var touchcount = pevent.changedTouches.length;
			for(var i=0;i<touchcount;++i){
				var curtouch = new HY.Core.Event.eArg(pevent,this,this._renderCanvas,pevent.changedTouches[i]);
				if(!this.getMousePos(curtouch.identifier)){
					var focusElement = this.getFocusElement(curtouch.identifier);
					if(focusElement){
						this.setFocusElement(null,curtouch.identifier);
						focusElement.onBlur();
					}
					this.setMousePos(new HY.Vect2D({x:curtouch.offsetX,y:curtouch.offsetY}),curtouch.identifier);
				}
			}
			this.renderLoop(0);
			try{
				pevent.preventDefault();
			}catch(err) {
				pevent.returnValue = false;
			}
		});
		HY.Core.Event.addListener(doc,this,"touchmove",function(e){
			var pevent = event?event:e;
			var touchcount = pevent.changedTouches.length;
			for(var i=0;i<touchcount;++i){
				var curtouch = new HY.Core.Event.eArg(pevent,this,this._renderCanvas,pevent.changedTouches[i]);
				var focusElement = this.getFocusElement(curtouch.identifier);
				if(focusElement){
					if(focusElement.isDraging()){
						focusElement._dispatchDragEvent(curtouch);
					}
					if(focusElement.isResizing()){
						focusElement._dispatchResizeEvent(curtouch);
					}
					if(focusElement.isRotating()){
						focusElement._dispatchRotateEvent(curtouch);
					}
				}
				var overelement = this.getMouseoverElement(curtouch.identifier);
				if(overelement && curtouch.target != this._renderCanvas){
					this.setMouseoverElement(null,curtouch.identifier);
					overelement.onMouseOut(curtouch);
				}
				this.setMousePos(new HY.Vect2D({x:curtouch.offsetX,y:curtouch.offsetY}),curtouch.identifier);
			}
			this.renderLoop(0);
			try{
				pevent.preventDefault();
			}catch(err){
				pevent.returnValue = false;
			}
		});
		HY.Core.Event.addListener(doc,this,"touchend",function(e){
			var pevent = event?event:e;
			var touchcount = pevent.changedTouches.length;
			for(var i=0;i<touchcount;++i){
				var curtouch = new HY.Core.Event.eArg(pevent,this,this._renderCanvas,pevent.changedTouches[i]);
				var focusElement = this.getFocusElement(curtouch.identifier);
				if(focusElement){
					focusElement.onMouseUp(curtouch);
					if(focusElement.isDraging()){
						focusElement.onEndDrag();
					}
					if(focusElement.isResizing()){
						focusElement.onEndResize();
					}
					if(focusElement.isRotating()){
						focusElement.onEndRotate();
					}
				}
				this.setMousePos(null,curtouch.identifier);
			}
			this.renderLoop(0);
			try{
				pevent.preventDefault();
			}catch(err){
				pevent.returnValue = false;
			}
		});
		HY.Core.Event.addListener(doc,this,"touchcancel",function(e){
			var pevent = event?event:e;
			var touchcount = pevent.changedTouches.length;
			for(var i=0;i<touchcount;++i){
				var curtouch = new HY.Core.Event.eArg(pevent,this,this._renderCanvas,pevent.changedTouches[i]);
				var focusElement = this.getFocusElement(curtouch.identifier);
				if(focusElement){
					focusElement.onMouseUp(curtouch);
					if(focusElement.isDraging()){
						focusElement.onEndDrag();
					}
					if(focusElement.isResizing()){
						focusElement.onEndResize();
					}
					if(focusElement.isRotating()){
						focusElement.onEndRotate();
					}
				}
				this.setMousePos(null,curtouch.identifier);
			}
			this.renderLoop(0);
			try{
				pevent.preventDefault();
			}catch(err){
				pevent.returnValue = false;
			}
		});
		HY.Core.Event.addListener(this._renderCanvas,this,"touchstart",function(e){
			var pevent = event?event:e;
			if(this._rootNode){
				var touchcount = pevent.changedTouches.length;
				for(var i=0;i<touchcount;++i){
					var curtouch = new HY.Core.Event.eArg(pevent,this,this._renderCanvas,pevent.changedTouches[i]);
					if(!this.getMousePos(curtouch.identifier)){
						if(!this._rootNode._dispatchMouseDownEvent(curtouch)){
							var prefocuselement = this.getFocusElement(curtouch.identifier);
							if(prefocuselement){
								this.setFocusElement(null,curtouch.identifier);
								prefocuselement.onBlur();
							}
						}
						this.setMousePos(new HY.Vect2D({x:curtouch.offsetX,y:curtouch.offsetY}),curtouch.identifier);
					}
				}
				this.renderLoop(0);
			}
			try{
				pevent.stopPropagation();
				pevent.preventDefault();
			}catch (err){
				pevent.cancelBubble = true;
				pevent.returnValue = false;
			}
		});
		HY.Core.Event.addListener(this._renderCanvas,this,"touchmove",function(e){
			var pevent = event?event:e;
			var touchcount = pevent.changedTouches.length;
			for(var i=0;i<touchcount;++i){
				var curtouch = new HY.Core.Event.eArg(pevent,this,this._renderCanvas,pevent.changedTouches[i]);
				var focusElement = this.getFocusElement(curtouch.identifier);
				if(focusElement){
					if(focusElement.isDraging()){
						focusElement._dispatchDragEvent(curtouch);
					}
					if(focusElement.isResizing()){
						focusElement._dispatchResizeEvent(curtouch);
					}
					if(focusElement.isRotating()){
						focusElement._dispatchRotateEvent(curtouch);
					}
				}
				if(this._rootNode != null){
					if(!this._rootNode._dispatchMouseMoveEvent(curtouch)){
						var overelement = this.getMouseoverElement(curtouch.identifier);
						if(overelement){
							overelement.setMouseoverElement(null,curtouch.identifier);
							overelement.onMouseOut(curtouch);
						}
					}
				}
				this.setMousePos(new HY.Vect2D({x:curtouch.offsetX,y:curtouch.offsetY}),curtouch.identifier);
			}
			this.renderLoop(0);
			try{
				pevent.stopPropagation();
				pevent.preventDefault();
			}catch (err){
				pevent.cancelBubble = true;
				pevent.returnValue = false;
			}
		});
		HY.Core.Event.addListener(this._renderCanvas,this,"touchend",function(e){
			var pevent = event?event:e;
			var touchcount = pevent.changedTouches.length;
			for(var i=0;i<touchcount;++i){
				var curtouch = new HY.Core.Event.eArg(pevent,this,this._renderCanvas,pevent.changedTouches[i]);
				var focusElement = this.getFocusElement(curtouch.identifier);
				if(focusElement){
					focusElement.onMouseUp(curtouch);
					if(focusElement.isDraging()){
						focusElement.onEndDrag();
					}
					if(focusElement.isResizing()){
						focusElement.onEndDrag();
					}
					if(focusElement.isRotating()){
						focusElement.onEndRotate();
					}
				}else{
					if(this._rootNode != null){
						this._rootNode._dispatchMouseUpEvent(curtouch);
					}
				}
				this.setMousePos(null,curtouch.identifier);
			}
			this.renderLoop(0);
			try{
				pevent.stopPropagation();
				pevent.preventDefault();
			}catch (err){
				pevent.cancelBubble = true;
				pevent.returnValue = false;
			}
		});
		HY.Core.Event.addListener(this._renderCanvas,this,"touchcancel",function(e){
			var pevent = event?event:e;
			var touchcount = pevent.changedTouches.length;
			for(var i=0;i<touchcount;++i){
				var curtouch = new HY.Core.Event.eArg(pevent,this,this._renderCanvas,pevent.changedTouches[i]);
				var focusElement = this.getFocusElement(curtouch.identifier);
				if(focusElement){
					focusElement.onMouseUp(curtouch);
					if(focusElement.isDraging()){
						focusElement.onEndDrag;
					}
					if(focusElement.isResizing()){
						focusElement.onEndResize();
					}
					if(focusElement.isRotating()){
						focusElement.onEndRotate();
					}
				}else{
					if(this._rootNode != null){
						this._rootNode._dispatchMouseUpEvent(curtouch);
					}
				}
				this.setMousePos(null,curtouch.identifier);
			}
			this.renderLoop(0);
			try{
				pevent.stopPropagation();
				pevent.preventDefault();
			}catch (err){
				pevent.cancelBubble = true;
				pevent.returnValue = false;
			}
		});
	}else{
		var doc = document;
		HY.Core.Event.addListener(doc,this,"keydown",function(e){
			if(this._rootNode != null){
				var pEvent = new HY.Core.Event.eArg(e, this, this._renderCanvas);
				this._rootNode._dispatchKeyDownEvent(pEvent);
				this.renderLoop(0);
				//pEvent.preventDefault();
			}
		});
		HY.Core.Event.addListener(doc,this,"keypress",function(e){
			if(this._rootNode != null){
				var pEvent = new HY.Core.Event.eArg(e, this, this._renderCanvas);
				this._rootNode._dispatchKeyPressEvent(pEvent);
				this.renderLoop(0);
				//pEvent.preventDefault();
			}
		});
		HY.Core.Event.addListener(doc,this,"keyup",function(e){
			if(this._rootNode != null){
				var pEvent = new HY.Core.Event.eArg(e, this, this._renderCanvas);
				this._rootNode._dispatchKeyUpEvent(pEvent);
				this.renderLoop(0);
				//pEvent.preventDefault();
			}
		});
		HY.Core.Event.addListener(doc,this,"mousedown",function(e){
			this.setMouseDown(true);
			var pEvent = new HY.Core.Event.eArg(e, this, this._renderCanvas);
			if(this.getFocusElement(pEvent.identifier) != null){
				var focusElement = this.getFocusElement(pEvent.identifier);
				this.setFocusElement(null,pEvent.identifier);
				focusElement.onBlur();
			}
			this.renderLoop(0);
		});
		HY.Core.Event.addListener(doc,this,"mousemove",function(e){
			var pEvent = new HY.Core.Event.eArg(e, this, this._renderCanvas);
			if(this.isMouseDown()){
				var focusElement = this.getFocusElement(pEvent.identifier);
				if(focusElement){
					if(focusElement.isDraging()){
						focusElement._dispatchDragEvent(pEvent);
					}
					if(focusElement.isResizing()){
						focusElement._dispatchResizeEvent(pEvent);
					}
					if(focusElement.isRotating()){
						focusElement._dispatchRotateEvent(pEvent);
					}
				}
			}
			var overElement = this.getMouseoverElement(pEvent.identifier);
			if(overElement){
				this.setMouseoverElement(null,pEvent.identifier);
				overElement.onMouseOut(pEvent);
			}
			this.setMousePos(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}),pEvent.identifier);
			this.renderLoop(0);
		});
		HY.Core.Event.addListener(doc,this,"mouseup",function(e){
			this.setMouseDown(false);
			var pEvent = new HY.Core.Event.eArg(e, this, this._renderCanvas);
			var focusElement = this.getFocusElement(pEvent.identifier);
			if(focusElement){
				focusElement.onMouseUp(pEvent);
				if(focusElement.isDraging()){
					focusElement.onEndDrag();
				}
				if(focusElement.isResizing()){
					focusElement.onEndResize();
				}
				if(focusElement.isRotating()){
					focusElement.onEndRotate();
				}
			}
			this.renderLoop(0);
			//this.setDragClipBoard(null);
			//this.setDragClipIcon(null);
		});
		HY.Core.Event.addListener(doc,this,"mousewheel",function(e){
			if(this.getFocusElement() != null){
				var pEvent = new HY.Core.Event.eArg(e, this, this._renderCanvas);
				this.getFocusElement()._dispatchMouseWheelEvent(pEvent);
			}
			this.renderLoop(0);
		});
		HY.Core.Event.addListener(doc,this,"DOMMouseScroll",function(e){
			if(this.getFocusElement() != null){
				var pEvent = new HY.Core.Event.eArg(e, this, this._renderCanvas);
				this.getFocusElement()._dispatchMouseWheelEvent(pEvent);
			}
			this.renderLoop(0);
		});
		HY.Core.Event.addListener(this._renderCanvas,this,"click",function(e){
			if(this._rootNode != null){
				var pEvent = new HY.Core.Event.eArg(e,this);
				this._rootNode._dispatchClickEvent(pEvent);
				this.renderLoop(0);
				pEvent.stopDispatch();
			}
		});
		HY.Core.Event.addListener(this._renderCanvas,this,"dblclick",function(e){
			if(this._rootNode != null){
				var pEvent = new HY.Core.Event.eArg(e,this);
				this._rootNode._dispatchDblClickEvent(pEvent);
				this.renderLoop(0);
				pEvent.stopDispatch();
			}
		});
		HY.Core.Event.addListener(this._renderCanvas,this,"contextmenu",function(e){
			if(this._rootNode != null){
				var pEvent = new HY.Core.Event.eArg(e,this);
				this._rootNode._dispatchContextMenuEvent(pEvent);
				this.renderLoop(0);
				pEvent.preventDefault();
				pEvent.stopDispatch();
			}
		});
		HY.Core.Event.addListener(this._renderCanvas,this,"mousedown", function (e) {
			this.setMouseDown(true);
			var pEvent = new HY.Core.Event.eArg(e,this);
			if(this._rootNode != null){
				if(!this._rootNode._dispatchMouseDownEvent(pEvent)){
					var focusElement = this.getFocusElement(pEvent.identifier);
					if(focusElement){
						this.setFocusElement(null,pEvent.identifier);
						focusElement.onBlur();
					}
				}
				this.renderLoop(0);
			}
			this.hideContextMenu();
			pEvent.stopDispatch();
		});
		HY.Core.Event.addListener(this._renderCanvas,this,"mousemove",function(e){
			var pEvent = new HY.Core.Event.eArg(e,this);
			if(this.isMouseDown()){
				var focusElement = this.getFocusElement(pEvent.identifier);
				if(focusElement){
					if(focusElement.isDraging()){
						focusElement._dispatchDragEvent(pEvent);
					}
					if(focusElement.isResizing()){
						focusElement._dispatchResizeEvent(pEvent);
					}
					if(focusElement.isRotating()){
						focusElement._dispatchRotateEvent(pEvent);
					}
				}
			}
			if(this._rootNode != null){
				if(!this._rootNode._dispatchMouseMoveEvent(pEvent)){
					if(this.getMouseoverElement(pEvent.identifier)){
						var preOverElement = this.getMouseoverElement(pEvent.identifier);
						this.setMouseoverElement(null,pEvent.identifier);
						preOverElement.onMouseOut(pEvent);
					}
				}
			}
			this.setMousePos(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
            this.renderLoop(0);
			pEvent.stopDispatch();
		});
		HY.Core.Event.addListener(this._renderCanvas,this,"mouseup",function(e){
			this.setMouseDown(false);
			var pEvent = new HY.Core.Event.eArg(e, this, this._renderCanvas);
			var focusElement = this.getFocusElement(pEvent.identifier);
			if(focusElement){
				focusElement.onMouseUp(pEvent);
				if(focusElement.isDraging()){
					focusElement.onEndDrag();
				}
				if(focusElement.isResizing()){
					focusElement.onEndResize();
				}
				if(focusElement.isRotating()){
					focusElement.onEndRotate();
				}
			}else{
				if(this._rootNode != null){
					var pEvent = new HY.Core.Event.eArg(e,this);
					this._rootNode._dispatchMouseUpEvent(pEvent);
				}
			}
			this.renderLoop(0);
			pEvent.stopDispatch();
			//this.setDragClipBoard(null);
			//this.setDragClipIcon(null);
		});
	}
}
HY.Core.Application.prototype.reRender = function(){
	this.__reRenderFlag = true;
}

HY.Core.Application.prototype.run = function(pNode){
    this.__preFrameTime = 0;
    this._rootNode = pNode;
    this._rootNode.setApplication(this);
    this.init();
	this.__renderLoopHandle = 0;
    if (window.requestAnimationFrame)
        window.requestAnimationFrame(this.runLoop.bind(this));
    else if (window.msRequestAnimationFrame)
        window.msRequestAnimationFrame(this.runLoop.bind(this));
    else if (window.webkitRequestAnimationFrame)
        window.webkitRequestAnimationFrame(this.runLoop.bind(this));
    else if (window.mozRequestAnimationFrame)
        window.mozRequestAnimationFrame(this.runLoop.bind(this));
    else if (window.oRequestAnimationFrame)
        window.oRequestAnimationFrame(this.runLoop.bind(this));
    else
        this.__renderLoopHandle = window.setInterval(this.runLoop.bind(this), 16.7);
    this._rootNode._dispatchFinishLaunch();
}
HY.Core.Application.prototype.runLoop = function() {

    //var time1 = (new Date()).getTime();
	var curFrameTime,deltatime;
	if(this.__preFrameTime != 0){
		curFrameTime = (new Date()).getTime();
		deltatime = curFrameTime - this.__preFrameTime;
		this._actionManager.runActions(deltatime/1000.0);
		this.__preFrameTime = curFrameTime;
	}else{
		this.__preFrameTime = (new Date()).getTime();
        deltatime = 0;
	}
    //window.console.log("duration:"+((new Date()).getTime()-time1));
	this.renderLoop(deltatime);
    if(this.__renderLoopHandle == 0){
        window.requestAnimationFrame(this.runLoop.bind(this));
    }
}
HY.Core.Application.prototype.renderLoop = function(pDeltatime){
	if(this._rootNode && this.__drawReady && this.__reRenderFlag){
        //var time1 = (new Date()).getTime();
        //window.console.log("deltatime:"+pDeltatime);
		this.__drawReady = false;
		this.__reRenderFlag = false;
		var renderDc = this.getDC();
		this._rootNode._dispatchPaintEvent(renderDc,pDeltatime,false);
		this.__drawReady = true;
        this._acctimeaa += pDeltatime;
        this._accframeaa += 1;
        if(this._acctimeaa >= 1000){
            this._console.innerText = this._acctimeaa+"/"+this._accframeaa;
            this._acctimeaa = 0;
            this._accframeaa = 0;
        }
        //window.console.log("duration:"+((new Date()).getTime()-time1));
	}
}