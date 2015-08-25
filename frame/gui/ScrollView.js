HY.GUI.ScrollView = function(config){
	this.extend(HY.GUI.View);
	this.initWithConfig(config);
}
HY.GUI.ScrollView.prototype = new HY.GUI.View();
HY.GUI.ScrollView.prototype.defaultBackgroundColor = "#FFFFFF";
HY.GUI.ScrollView.prototype.initWithConfig = function(config){
	if(config){
		this.superCall("initWithConfig",[config]);
		if(config.contentView != undefined){ this._contentView = config.contentView; } else { this._contentView = new HY.GUI.View({}); }
		this._hScrollBar = new HY.GUI.ScrollBar({
			scrollBarDirection:0,
			scrollBarWidth:10,
			scrollBarLength:this.getWidth(),
			x:0,
			y:this.getHeight()-10
		});
		this._vScrollBar = new HY.GUI.ScrollBar({
			scrollBarDirection:1,
			scrollBarWidth:10,
			scrollBarLength:this.getHeight(),
			x:this.getWidth()-10,
			y:0
		});

		this._hScrollBar.addEventListener("scroll",function(pThis,pEvent){
			this.updateFromHScrollBar();
		},this);
		this._vScrollBar.addEventListener("scroll",function(pThis,pEvent){
			this.updateFromVScrollBar();
		},this);

		this.setContentView(this._contentView);
		this.addChildNodeAtLayer(this._vScrollBar,1);
		this.addChildNodeAtLayer(this._hScrollBar,1);
	}
}
HY.GUI.ScrollView.prototype.setContentView = function(pView){
	if(this._contentView){
		this.removeChildNode(this._contentView);
	}
	this._contentView = pView;
	this._contentView.setX(0);
	this._contentView.setY(0);
	this._contentView.addEventListener("sizechanged",function(pThis){
		var scrollView = this.getParent();
		scrollView.needLayoutUI();
	},null);
	this.addChildNodeAtLayer(pView,0);
}
HY.GUI.ScrollView.prototype.getContentView = function(){
	return this._contentView;
}
HY.GUI.ScrollView.prototype.setWidth = function(pWidth){
	this.superCall("setWidth",[pWidth]);
	this.needLayoutUI();
}
HY.GUI.ScrollView.prototype.setHeight = function(pHeight){
	this.superCall("setHeight",[pHeight]);
	this.needLayoutUI();
}
HY.GUI.ScrollView.prototype.setContentOffsetX = function(pX){
	this._contentView.setX(-pX);
	this.needLayoutUI();
}
HY.GUI.ScrollView.prototype.setContentOffsetY = function(pY){
	this._contentView.setY(-pY);
	this.needLayoutUI();
}
HY.GUI.ScrollView.prototype.setContentWidth = function(pWidth){
	this._contentView.setWidth(pWidth);
	this.needLayoutUI();
}
HY.GUI.ScrollView.prototype.setContentHeight = function(pHeight){
	this._contentView.setHeight(pHeight);
	this.needLayoutUI();
}
HY.GUI.ScrollView.prototype.setHScrollParam = function(pOffsetLen,pShowLen,pFullLen){
	if(this._vScrollBar.getVisible()){
		this._contentView.setX(-(this.getWidth()-this._vScrollBar.getScrollBarWidth())*pOffsetLen/pShowLen);
		this._contentView.setWidth((this.getWidth()-this._vScrollBar.getScrollBarWidth())*pFullLen/pShowLen);
	}else{
		this._contentView.setX(-this.getWidth()*pOffsetLen/pShowLen);
		this._contentView.setWidth(this.getWidth()*pFullLen/pShowLen);
	}
}
HY.GUI.ScrollView.prototype.getHScrollParam = function(){
	var offsetlen,showlen,fulllen;
	offsetlen = -this._contentView.getX();
	fulllen = this._contentView.getWidth();
	if(this._vScrollBar.getVisible()){
		showlen = this.getWidth()-this._vScrollBar.getScrollBarWidth();
	}else{
		showlen = this.getWidth();
	}
	offsetlen = (offsetlen+showlen>fulllen)?(fulllen-showlen):offsetlen;
	this._contentView.setX(-offsetlen);
	return {offsetLen:offsetlen,showLen:showlen,fullLen:fulllen};
}
HY.GUI.ScrollView.prototype.setVScrollParam = function(pOffsetLen,pShowLen,pFullLen){
	if(this._hScrollBar.getVisible()){
		this._contentView.setY(-(this.getHeight()-this._hScrollBar.getScrollBarWidth())*pOffsetLen/pShowLen);
		this._contentView.setHeight((this.getHeight()-this._hScrollBar.getScrollBarWidth())*pFullLen/pShowLen);
	}else{
		this._contentView.setY(-this.getHeight()*pOffsetLen/pShowLen);
		this._contentView.setHeight(this.getHeight()*pFullLen/pShowLen);
	}
}
HY.GUI.ScrollView.prototype.getVScrollParam = function(){
	var offsetlen,showlen,fulllen;
	offsetlen = -this._contentView.getY();
	fulllen = this._contentView.getHeight();
	if(this._hScrollBar.getVisible()){
		showlen = this.getHeight()-this._hScrollBar.getScrollBarWidth();
	}else{
		showlen = this.getHeight();
	}
	offsetlen = (offsetlen+showlen>fulllen)?(fulllen-showlen):(offsetlen);
	this._contentView.setY(-offsetlen);
	return {offsetLen:offsetlen,showLen:showlen,fullLen:fulllen};
}
HY.GUI.ScrollView.prototype.updateToHScrollBar = function(){
	var scrollparam = this.getHScrollParam();
	this._hScrollBar.setScrollParam(scrollparam.offsetLen,scrollparam.showLen,scrollparam.fullLen);
}
HY.GUI.ScrollView.prototype.updateToVScrollBar = function(){
	var scrollparam = this.getVScrollParam();
	this._vScrollBar.setScrollParam(scrollparam.offsetLen,scrollparam.showLen,scrollparam.fullLen);
}
HY.GUI.ScrollView.prototype.updateToScrollBar = function(){
	this.checkScrollBarStatus();
	this.updateToHScrollBar();
	this.updateToVScrollBar();
}
HY.GUI.ScrollView.prototype.updateFromHScrollBar = function(){
	var scrollparam = this._hScrollBar.getScrollParam();
	this.setHScrollParam(scrollparam.offsetLen,scrollparam.showLen,scrollparam.fullLen);
}
HY.GUI.ScrollView.prototype.updateFromVScrollBar = function(){
	var scrollparam = this._vScrollBar.getScrollParam();
	this.setVScrollParam(scrollparam.offsetLen,scrollparam.showLen,scrollparam.fullLen);
}
HY.GUI.ScrollView.prototype.updateFromScrollBar = function(){
	this.updateFromHScrollBar();
	this.updateFromVScrollBar();
}
HY.GUI.ScrollView.prototype.checkScrollBarStatus = function(){
	this._hScrollBar.setY(this.getHeight()-this._vScrollBar.getScrollBarWidth());
	this._hScrollBar.setScrollBarLength(this.getWidth());
	this._vScrollBar.setX(this.getWidth()-this._hScrollBar.getScrollBarWidth());
	this._vScrollBar.setScrollBarLength(this.getHeight());
	if(this._contentView.getMinLayoutWidth() < this.getWidth() - this._vScrollBar.getScrollBarWidth()){
		this._hScrollBar.setVisible(false);
		if(this._contentView.getMinLayoutHeight() > this.getHeight()){
			this._vScrollBar.setVisible(true);
			this._contentView.setWidth(this.getWidth()-this._vScrollBar.getScrollBarWidth());
			this._contentView.setHeight(this._contentView.getMinLayoutHeight());
		}else{
			this._vScrollBar.setVisible(false);
			this._contentView.setWidth(this.getWidth());
			this._contentView.setHeight(this.getHeight());
		}
	}else if(this._contentView.getMinLayoutWidth() < this.getWidth()){
		if(this._contentView.getMinLayoutHeight() >= this.getHeight()){
			this._hScrollBar.setVisible(true);
			this._vScrollBar.setVisible(true);
			this._contentView.setWidth(this._contentView.getMinLayoutWidth());
			this._contentView.setHeight(this._contentView.getMinLayoutHeight());
		}else{
			this._hScrollBar.setVisible(false);
			this._vScrollBar.setVisible(false);
			this._contentView.setWidth(this.getWidth());
			this._contentView.setHeight(this.getHeight());
		}
	}else{
		this._hScrollBar.setVisible(true);
		if(this._contentView.getMinLayoutHeight() > this.getHeight() - this._hScrollBar.getScrollBarWidth()){
			this._vScrollBar.setVisible(true);
			this._contentView.setWidth(this._contentView.getMinLayoutWidth());
			this._contentView.setHeight(this._contentView.getMinLayoutHeight());
		}else{
			this._vScrollBar.setVisible(false);
			this._contentView.setWidth(this._contentView.getMinLayoutWidth());
			this._contentView.setHeight(this.getHeight()-this._hScrollBar.getScrollBarWidth());
		}
	}
	if(this._vScrollBar.getVisible()){
		this._hScrollBar.setInsetRB(this._vScrollBar.getScrollBarWidth());
	}else{
		this._hScrollBar.setInsetRB(0);
	}
	if(this._hScrollBar.getVisible()){
		this._vScrollBar.setInsetRB(this._hScrollBar.getScrollBarWidth());
	}else{
		this._vScrollBar.setInsetRB(0);
	}
}
HY.GUI.ScrollView.prototype.layoutUI = function(){
	this.checkScrollBarStatus();
	this.updateToHScrollBar();
	this.updateToVScrollBar();
}