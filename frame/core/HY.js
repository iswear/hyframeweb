var HY = {};

HY.isMobilePlatformInitFlag = false;
HY.isMobilePlatformFlag = false;
HY.isMobilePlatform = function(){
	if(!HY.isMobilePlatformInitFlag){
		HY.isMobilePlatformFlag = (navigator.userAgent.toLowerCase().indexOf("mobile") != -1);
		HY.isMobilePlatformInitFlag = true;
	}
	return HY.isMobilePlatformFlag;
}

HY.parsePxstrToInt = function(value){
	try{
		if(value.length > 2 && value.toLowerCase().indexOf("px") != -1){
			return parseInt(value.substr(0,value.length-2));
		}else{
            return 0;
		}
	}catch(err){
		return 0;
	}
}
HY.getElementPositionInPage = function(pNode){
    var position = new HY.Vect2D({});
	if(pNode.offsetLeft){
		alert("offsetleft:"+pNode.offsetLeft);
		position.x = pNode.offsetLeft;
	}else{
		position.x = HY.parsePxstrToInt(pNode.style.left);
	}
	if(pNode.offsetTop){
		alert("offsetTop:"+pNode.offsetTop);
		position.y = pNode.offsetTop;
	}else{
		position.y = HY.parsePxstrToInt(pNode.style.top);
	}
	return position;
}
HY.getDocumentSize = function(){
    var size = new HY.Size2D({});
    if(window.innerHeight){
        size.width = window.innerWidth;
        size.height = window.innerHeight;
    }else if(window.document.documentElement.clientHeight){
        size.width = window.document.documentElement.clientWidth;
        size.height = window.document.documentElement.clientHeight;
    }else if(window.document.body.clientHeight){
        size.width = window.document.body.clientWidth;
        size.height = window.document.body.clientHeight;
    }
    return size;
}

HY.setTimeout = function(pThis,pFun,pTime){
    window.setTimeout(function(){
        pFun.call(pThis);
    },pTime);
}
HY.setInterval = function(pThis,pFun,pTime){
	window.setInterval(function(){
		pFun.call(pThis);
	},pTime);
}

HY.Object = function(config){
}
HY.Object.prototype.extend = function(pClass){
    this._super = HY.Object.prototype.extend.caller.prototype;
}
HY.Object.prototype.superCall = function(funName,args){
	var runflag = false;
	var retValue;
	if(this.__assistSuper == null){
		this.__assistSuper = {};
	}
	if(this.__assistPreSuper == null){
		this.__assistPreSuper = {};
	}
	while(!runflag){
		if(this.__assistSuper[funName] == undefined || this.__assistSuper[funName] == null){
			if(this._super && this._super._super){
				this.__assistPreSuper[funName] = this;
				this.__assistSuper[funName] = this._super;
			}
		}else{
			if(this.__assistPreSuper[funName]._super != undefined || this.__assistPreSuper[funName]._super != null){
				this.__assistPreSuper[funName] = this.__assistPreSuper[funName]._super;
			}else{
				this.__assistPreSuper[funName] = null;
			}
			if(this.__assistSuper[funName]._super != undefined || this.__assistSuper[funName]._super != null){
				this.__assistSuper[funName] = this.__assistSuper[funName]._super;
			}else{
				this.__assistSuper[funName] = null;
			}
		}
		var tempSuper = this.__assistSuper[funName];
		var preSuper = this.__assistPreSuper[funName];
		if(tempSuper && tempSuper[funName]){
			if(!(preSuper && preSuper[funName] && preSuper[funName] == tempSuper[funName])){
				retValue = tempSuper[funName].apply(this,args);
				runflag = true;
			}
		}else{
			runflag = true;
		}
	}
	this.__assistSuper[funName] = null;
	return retValue;
}

HY.Vect2D = function(config){
    this.extend(HY.Object);
    this.initWithConfig(config);
}
HY.Vect2D.prototype = new HY.Object();
HY.Vect2D.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.x){ this.x = config.x; } else { this.x = 0; }
        if(config.y){ this.y = config.y; } else { this.y = 0; }
    }
}
HY.Vect2D.prototype.getAngle = function(){
    if(this.x == 0 && this.y == 0){
        return 0;
    }else {
        var angle = Math.atan2(this.y,this.x);
        return angle;
    }
}
HY.Vect2D.prototype.normalize = function(){
    var mold = this.mold();
    this.x = this.x/mold;
    this.y = this.y/mold;
}
HY.Vect2D.prototype.mold = function(){
    return Math.sqrt(this.moldSquare());
}
HY.Vect2D.prototype.moldSquare = function(){
    return this.x*this.x+this.y*this.y;
}

HY.Size2D = function(config){
    this.extend(HY.Object);
    this.initWithConfig(config);
}
HY.Size2D.prototype = new HY.Object();
HY.Size2D.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.width){ this.width = config.width; } else { this.width = 0; }
        if(config.height){ this.height = config.height; } else { this.height = 0; }
    }
}

HY.Rect2D = function(config){
    this.extend(HY.Object);
    this.initWithConfig(config);
}
HY.Rect2D.prototype = new HY.Object();
HY.Rect2D.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.x){ this.x = config.x; } else { this.x = 0; }
        if(config.y){ this.y = config.y; } else { this.y = 0; }
        if(config.width){ this.width = config.width; } else { this.width = 0; }
        if(config.height){ this.height = config.height; } else { this.height = 0; }
    }
}

HY.Circle = function(config){
    this.extend(HY.Object);
    this.initWithConfig(config);
}
HY.Circle.prototype = new HY.Object();
HY.Circle.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.x){ this.x = config.x; } else { this.x = 0; }
        if(config.y){ this.y = config.y; } else { this.y = 0; }
        if(config.radius){ this.radius = config.radius; } else { this.radius = 0; }
    }
}

HY.Edge = function(config){
    this.extend(HY.Object);
    this.initWithConfig(config);
}
HY.Edge.prototype = new HY.Object();
HY.Edge.prototype.initWithConfig = function(config){
    if(config){
        if(config.point1 != undefined){ this.point1 = new HY.Vect2D(config.point1); } else { this.point1 = new HY.Vect2D({}); }
        if(config.point2 != undefined){ this.point2 = new HY.Vect2D(config.point2); } else { this.point2 = new HY.Vect2D({}); }
    }
}

HY.Line = function(config){
    this.extend(HY.Object);
    this.initWithConfig(config);
}
HY.Line.prototype = new HY.Object();
HY.Line.prototype.initWithConfig = function(config){
    if(config){
        if(config.point1 != undefined){ this.point1 = new HY.Vect2D(config.point1); } else { this.point1 = new HY.Vect2D({}); }
        if(config.point2 != undefined){ this.point2 = new HY.Vect2D(config.point2); } else { this.point2 = new HY.Vect2D({});}
    }
}

HY.Polygon = function(config){
    this.extend(config);
    this.initWithConfig(config);
}
HY.Polygon.prototype = new HY.Object();
HY.Polygon.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        this._points = [];
        if(config.points){
            var len = config.points;
            for(var i=0;i<len;++i){
                this._points.push(new HY.Vect2D(config.points[i]));
            }
        }
    }
}
HY.Polygon.prototype.getPoints = function(){
    return this._points;
}


HY.Font = function(config){
    this.extend(HY.Object);
    this.initWithConfig(config);
}
HY.Font.prototype = new HY.Object();
HY.Font.prototype.defaultFontSize = 13.0;
HY.Font.prototype.defaultFontName = "Helvetica";
HY.Font.prototype.defaultFontItalic = false;
HY.Font.prototype.defaultFontBold = false;
HY.Font.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.fontSize){ this.fontSize = config.fontSize; }else{ this.fontSize = this.defaultFontSize; }
        if(config.fontName){ this.fontName = config.fontName; }else{ this.fontName = this.defaultFontName; }
        if(config.fontItalic){ this.fontItalic = config.fontItalic; }else{ this.fontItalic = this.defaultFontItalic; }
        if(config.fontBold){ this.fontBold = config.fontBold; }else{ this.fontBold = this.defaultFontBold; }
    }
}
HY.Font.prototype.generateString = function(){
    var retStr = "";
    retStr += this.fontSize + "px " + this.fontName;
    if(this.fontItalic){ retStr += " italic"; }
    if(this.fontBold){ retStr += " bold"; }
    return retStr;
}

HY.Text = {};
HY.Text.getTextLength = function(text,font){
    if(!HY.Text.assistCanvas){
        HY.Text.assistCanvas = document.createElement("canvas");
    }
    var ctx = HY.Text.assistCanvas.getContext("2d");
    ctx.font = font;
    return ctx.measureText(text).width;
}