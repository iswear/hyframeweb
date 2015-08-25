HY.Core.Event = {};

HY.Core.Event.addListener = function(pNode,pThis,pType,pListener){
    try{
        pNode.addEventListener(pType,pListener.bind(pThis),false);
        //pNode.addEventListener(pType,function(e){
        //    pListener.call(pThis,e);
        //},false);
    } catch(err) {
        pType = "on"+pType;
        pNode.attachEvent(pType,pListener.bind(this));
        //pNode.attachEvent(pType,function(e){
        //    pListener.call(pThis,e);
        //});
    }
}
HY.Core.Event.eArg = function(pEvent,pApp,pNode,pTouch){
	if(HY.isMobilePlatform()){
		this.originEvent = event?event:pEvent;
		this.identifier = pTouch.identifier;
		this.target = pTouch.target?pTouch.target:pTouch.srcElement;
		this.screenX = pTouch.screenX;
		this.screenY = pTouch.screenY;
		this.clientX = pTouch.clientX;
		this.clientY = pTouch.clientY;
		this.pageX = pTouch.pageX;
		this.pageY = pTouch.pageY;
        var eleposition = HY.getElementPositionInPage(pNode);
        this.offsetX = (this.pageX - eleposition.x)*pApp.getScaleX();
        this.offsetY = (this.pageY - eleposition.y)*pApp.getScaleY();
        /*
        if(pNode != undefined && this.target != pNode){
            var eleposition = HY.getElementPositionInPage(pNode);
            this.offsetX = (pTouch.pageX-eleposition.x)*pApp.getScaleX();
            this.offsetY = (pTouch.pageY-eleposition.y)*pApp.getScaleY();
        }else{
            this.offsetX = (this.originEvent.offsetX?this.originEvent.offsetX:this.originEvent.layerX)*pApp.getScaleX();
            this.offsetY = (this.originEvent.offsetY?this.originEvent.offsetY:this.originEvent.layerY)*pApp.getScaleY();
        }
        */
		this.target = this.originEvent.target?this.originEvent.target:this.originEvent.srcElement;
	}else{
		this.originEvent = event ? event:pEvent;
		this.identifier = 0;
		this.target = this.originEvent.target ?this.originEvent.target:this.originEvent.srcElement;
		this.screenX = this.originEvent.screenX;
		this.screenY = this.originEvent.screenY;
		this.clientX = this.originEvent.clientX;
		this.clientY = this.originEvent.clientY;
		this.pageX = this.originEvent.pageX ? this.originEvent.pageX : (document.body.scrollLeft + this.originEvent.clientX);
		this.pageY = this.originEvent.pageY ? this.originEvent.pageY : (document.body.scrollTop + this.originEvent.clientY);
		if(pNode != undefined && this.target != pNode){
			var eleposition = HY.getElementPositionInPage(pNode);
			this.offsetX = (this.pageX - eleposition.x)*pApp.getScaleX();
			this.offsetY = (this.pageY - eleposition.y)*pApp.getScaleY();
		}else{
			this.offsetX = (this.originEvent.offsetX?this.originEvent.offsetX:this.originEvent.layerX)*pApp.getScaleX();
			this.offsetY = (this.originEvent.offsetY?this.originEvent.offsetY:this.originEvent.layerY)*pApp.getScaleY();
		}
		/*
		this.canvasOffset = new HY.Vect2D({});
		if(pNode != undefined && this.target != pNode){
			var nodeposition = this.getElementPositionInPage(pNode);
			this.canvasOffset.x = (this.pageX - HY.getElementPositionInPage(pNode).x) / pApp.getScaleX();
			this.canvasOffset.y = (this.pageY - HY.getElementPositionInPage(pNode).y) / pApp.getScaleY();
		}else{
			this.canvasOffset.x = (this.originEvent.offsetX ? this.originEvent.offsetX : this.originEvent.layerX) / pApp.getScaleX();
			this.canvasOffset.y = (this.originEvent.offsetY ? this.originEvent.offsetY : this.originEvent.layerY) / pApp.getScaleY();
		}
		*/
		this.keyCode = this.originEvent.keyCode;
		this.button = this.originEvent.button;
		this.altKey = this.originEvent.altKey;
		this.ctrlKey = this.originEvent.ctrlKey;
		this.metaKey = this.originEvent.metaKey ? this.originEvent.metaKey : false;
		this.accumulateOrigin = new HY.Vect2D({});
		this.accumulateRAngle = 0;
	}
}
HY.Core.Event.eArg.prototype.stopDispatch = function(){
    try{
        this.originEvent.stopPropagation();
    }catch (err){
        this.originEvent.cancelBubble = true;
    }
}
HY.Core.Event.eArg.prototype.preventDefault = function(){
    try{
        this.originEvent.preventDefault();
    }catch (err) {
        this.originEvent.returnValue = false;
    }
}

HY.Core.Event.KEYCODE = {};
HY.Core.Event.KEYCODE.BACKSPACE = 8;
HY.Core.Event.KEYCODE.TAB = 9;
HY.Core.Event.KEYCODE.CLEAR = 12;
HY.Core.Event.KEYCODE.ENTER = 13;
HY.Core.Event.KEYCODE.SHIFT_LEFT = 16;
HY.Core.Event.KEYCODE.CTRL_LEFT = 17;
HY.Core.Event.KEYCODE.ALT_LEFT = 18;
HY.Core.Event.KEYCODE.PAUSE = 19;
HY.Core.Event.KEYCODE.CAPS_LOCK = 20;
HY.Core.Event.KEYCODE.ESCAPE = 27;
HY.Core.Event.KEYCODE.SPACE = 32;
HY.Core.Event.KEYCODE.PRIOR = 33;
HY.Core.Event.KEYCODE.NEXT = 34;
HY.Core.Event.KEYCODE.END = 35;
HY.Core.Event.KEYCODE.HOME = 36;
HY.Core.Event.KEYCODE.LEFT = 37;
HY.Core.Event.KEYCODE.UP = 38;
HY.Core.Event.KEYCODE.RIGHT = 39;
HY.Core.Event.KEYCODE.DOWN = 40;
HY.Core.Event.KEYCODE.SELECT = 41;
HY.Core.Event.KEYCODE.PRINT = 42;
HY.Core.Event.KEYCODE.EXECUTE = 43;
HY.Core.Event.KEYCODE.INSERT = 44;
HY.Core.Event.KEYCODE.DELETE = 45;
HY.Core.Event.KEYCODE.HELP = 47;
HY.Core.Event.KEYCODE.NUMBER0 = 48;
HY.Core.Event.KEYCODE.NUMBER1 = 49;
HY.Core.Event.KEYCODE.NUMBER2 = 50;
HY.Core.Event.KEYCODE.NUMBER3 = 51;
HY.Core.Event.KEYCODE.NUMBER4 = 52;
HY.Core.Event.KEYCODE.NUMBER5 = 53;
HY.Core.Event.KEYCODE.NUMBER6 = 54;
HY.Core.Event.KEYCODE.NUMBER7 = 55;
HY.Core.Event.KEYCODE.NUMBER8 = 56;
HY.Core.Event.KEYCODE.NUMBER9 = 57;
HY.Core.Event.KEYCODE.A = 65;
HY.Core.Event.KEYCODE.B = 66;
HY.Core.Event.KEYCODE.C = 67;
HY.Core.Event.KEYCODE.D = 68;
HY.Core.Event.KEYCODE.E = 69;
HY.Core.Event.KEYCODE.F = 70;
HY.Core.Event.KEYCODE.G = 71;
HY.Core.Event.KEYCODE.H = 72;
HY.Core.Event.KEYCODE.I = 73;
HY.Core.Event.KEYCODE.J = 74;
HY.Core.Event.KEYCODE.K = 75;
HY.Core.Event.KEYCODE.L = 76;
HY.Core.Event.KEYCODE.M = 77;
HY.Core.Event.KEYCODE.N = 78;
HY.Core.Event.KEYCODE.O = 79;
HY.Core.Event.KEYCODE.P = 80;
HY.Core.Event.KEYCODE.Q = 81;
HY.Core.Event.KEYCODE.R = 82;
HY.Core.Event.KEYCODE.S = 83;
HY.Core.Event.KEYCODE.T = 84;
HY.Core.Event.KEYCODE.U = 85;
HY.Core.Event.KEYCODE.V = 86;
HY.Core.Event.KEYCODE.W = 87;
HY.Core.Event.KEYCODE.X = 88;
HY.Core.Event.KEYCODE.Y = 89;
HY.Core.Event.KEYCODE.Z = 90;
HY.Core.Event.KEYCODE.KP_NUMBER0 = 96;
HY.Core.Event.KEYCODE.KP_NUMBER1 = 97;
HY.Core.Event.KEYCODE.KP_NUMBER2 = 98;
HY.Core.Event.KEYCODE.KP_NUMBER3 = 99;
HY.Core.Event.KEYCODE.KP_NUMBER4 = 100;
HY.Core.Event.KEYCODE.KP_NUMBER5 = 101;
HY.Core.Event.KEYCODE.KP_NUMBER6 = 102;
HY.Core.Event.KEYCODE.KP_NUMBER7 = 103;
HY.Core.Event.KEYCODE.KP_NUMBER8 = 104;
HY.Core.Event.KEYCODE.KP_NUMBER9 = 105;
HY.Core.Event.KEYCODE.KP_MULTIPLY = 106;
HY.Core.Event.KEYCODE.KP_ADD = 107;
HY.Core.Event.KEYCODE.KP_SEPARATOR = 108;
HY.Core.Event.KEYCODE.KP_SUBSTRACT = 109;
HY.Core.Event.KEYCODE.KP_DECIMAL = 110;
HY.Core.Event.KEYCODE.KP_DEVIDE = 111;
HY.Core.Event.KEYCODE.F1 = 112;
HY.Core.Event.KEYCODE.F2 = 113;
HY.Core.Event.KEYCODE.F3 = 114;
HY.Core.Event.KEYCODE.F4 = 115;
HY.Core.Event.KEYCODE.F5 = 116;
HY.Core.Event.KEYCODE.F6 = 117;
HY.Core.Event.KEYCODE.F7 = 118;
HY.Core.Event.KEYCODE.F8 = 119;
HY.Core.Event.KEYCODE.F9 = 120;
HY.Core.Event.KEYCODE.F10 = 121;
HY.Core.Event.KEYCODE.F11 = 122;
HY.Core.Event.KEYCODE.F12 = 123;
HY.Core.Event.KEYCODE.F13 = 124;
HY.Core.Event.KEYCODE.F14 = 125;
HY.Core.Event.KEYCODE.F15 = 126;
HY.Core.Event.KEYCODE.F16 = 127;
HY.Core.Event.KEYCODE.F17 = 128;
HY.Core.Event.KEYCODE.F18 = 129;
HY.Core.Event.KEYCODE.F19 = 130;
HY.Core.Event.KEYCODE.F20 = 131;
HY.Core.Event.KEYCODE.F21 = 132;
HY.Core.Event.KEYCODE.F22 = 133;
HY.Core.Event.KEYCODE.F23 = 134;
HY.Core.Event.KEYCODE.F24 = 135;
HY.Core.Event.KEYCODE.NUM_LOCK = 136;
HY.Core.Event.KEYCODE.SCROLL_LOCK = 137;