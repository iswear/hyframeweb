/**
 * Created by Administrator on 2014/10/26.
 */

HY.GUI.ScrollBar = function(config){
	this.extend(HY.GUI.View);
	this.initWithConfig(config);
}
HY.GUI.ScrollBar.prototype = new HY.GUI.View();
HY.GUI.ScrollBar.prototype.defaultScrollBarWidth = 10;
HY.GUI.ScrollBar.prototype.defaultScrollBarLength = 100;
HY.GUI.ScrollBar.prototype.defaultScrollBarDirection = 0;			//0表示水平方向滚动条
HY.GUI.ScrollBar.prototype.defaultBorderColor = null;
HY.GUI.ScrollBar.prototype.defaultBorderWidth = 0;
HY.GUI.ScrollBar.prototype.defaultBackgroundColor = "#bbb";
HY.GUI.ScrollBar.prototype.initWithConfig = function(config){
	if(config){
		this.superCall("initWithConfig",[config]);
		this._scrollBar = new HY.GUI.View({
			x:0,
			y:0,
			width:0,
			height:0,
			dragAble:true,
			mouseTrigger:true,
			dragZone:{x:0,y:0,width:1000000,height:1000000},
			backgroundColor:'#777'
		});
		this._scrollBar.addEventListener("drag",function(pThis,pEvent){
			this.onScroll(pEvent);
		},this);
		this.addChildNodeAtLayer(this._scrollBar,0);
		if(config.insetLT){ this._insetLT = config.insetLT; } else { this._insetLT = 0; }
		if(config.insetRB){ this._insetRB = config.insetRB; } else { this._insetRB = 0; }
		if(config.scrollEvent){ this.addEventListener("scroll",config.scrollEvent.selector,config.scrollEvent.target); }

		if(config.scrollBarDirection){ this._scrollBarDirection = config.scrollBarDirection; } else { this._scrollBarDirection = this.defaultScrollBarDirection; }
		if(config.scrollBarWidth){ this.setScrollBarWidth(config.scrollBarWidth); } else { this.setScrollBarWidth(this.defaultScrollBarWidth); }
		if(config.scrollBarLength){ this.setScrollBarLength(config.scrollBarLength); } else { this.setScrollBarLength(this.defaultScrollBarLength); }
		this.setScrollParam(0,1,1);
	}
}
HY.GUI.ScrollBar.prototype.setWidth = function(){}
HY.GUI.ScrollBar.prototype.setHeight = function(){}
HY.GUI.ScrollBar.prototype.getInsetLT = function(){
	return this._insetLT;
}
HY.GUI.ScrollBar.prototype.setInsetLT = function(pLength){
	this._insetLT = pLength;
}
HY.GUI.ScrollBar.prototype.getInsetRB = function(){
	return this._insetRB;
}
HY.GUI.ScrollBar.prototype.setInsetRB = function(pLength){
	this._insetRB = pLength;
}
HY.GUI.ScrollBar.prototype.getScrollBarWidth = function(){
	if(this._scrollBarDirection == 0){
		return this.getHeight();
	}else{
		return this.getWidth();
	}
}
HY.GUI.ScrollBar.prototype.setScrollBarWidth = function(pWidth){
	if(this._scrollBarDirection == 0){
		this.superCall("setHeight",[pWidth]);
		this._scrollBar.setHeight(pWidth);
	}else{
		this.superCall("setWidth",[pWidth]);
		this._scrollBar.setWidth(pWidth);
	}
}
HY.GUI.ScrollBar.prototype.getScrollBarLength = function(){
	if(this._scrollBarDirection == 0){
		return this.getWidth();
	}else{
		return this.getHeight();
	}
}
HY.GUI.ScrollBar.prototype.setScrollBarLength = function(pLength){
	if(this._scrollBarDirection == 0){
		this.superCall("setWidth",[pLength]);
	}else{
		this.superCall("setHeight",[pLength]);
	}
}
HY.GUI.ScrollBar.prototype.getScrollParam = function(){
	if(this._scrollBarDirection == 0){
		return {offsetLen:this._scrollBar.getX()-this._insetLT,showLen:this._scrollBar.getWidth(),fullLen:this.getWidth()-this._insetLT-this._insetRB};
	}else{
		return {offsetLen:this._scrollBar.getY()-this._insetLT,showLen:this._scrollBar.getHeight(),fullLen:this.getHeight()-this._insetLT-this._insetRB};
	}
}
HY.GUI.ScrollBar.prototype.setScrollParam = function(pOffsetLen,pShowLen,pFullLen){
	if(pOffsetLen < 0){ pOffsetLen = 0; }
	if(pShowLen < 0){ pShowLen = 1; }
	if(pFullLen < 0){ pFullLen = 1; }
	if(this._scrollBarDirection == 0){
		this._scrollBar.setX((this.getWidth()-this._insetLT-this._insetRB)*pOffsetLen/pFullLen);
		this._scrollBar.setWidth((this.getWidth()-this._insetLT-this._insetRB)*pShowLen/pFullLen);
		this._scrollBar.setLimitMinX(this._insetLT);
		this._scrollBar.setLimitMaxX(this.getWidth()-this._scrollBar.getWidth()-this._insetRB);
		this._scrollBar.setLimitMinY(0);
		this._scrollBar.setLimitMaxY(0);
	}else{
		this._scrollBar.setY((this.getHeight()-this._insetLT-this._insetRB)*pOffsetLen/pFullLen);
		this._scrollBar.setHeight((this.getHeight()-this._insetLT-this._insetRB)*pShowLen/pFullLen);
		this._scrollBar.setLimitMinX(0);
		this._scrollBar.setLimitMaxX(0);
		this._scrollBar.setLimitMinY(this._insetLT);
		this._scrollBar.setLimitMaxY(this.getHeight()-this._scrollBar.getHeight()-this._insetRB);
	}
}
HY.GUI.ScrollBar.prototype.onScroll = function(pEvent){
	this.launchEvent("scroll",[this,pEvent]);
}
