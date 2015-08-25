/**
 * Created by Administrator on 2014/12/7.
 */
HY.GUI.Panel = function(config){
    this.extend(HY.GUI.View);
    this.initWithConfig(config);
}
HY.GUI.Panel.prototype = new HY.GUI.View();
HY.GUI.Panel.prototype.defaultDragAble = false;
HY.GUI.Panel.prototype.defaultResizeAble = false;
HY.GUI.Panel.prototype.defaultBackgroundColor = "#222222";
HY.GUI.Panel.prototype.defaultTitle = "title";
HY.GUI.Panel.prototype.defaultIcon = {
	src:(HY.Core.Config.Paths.Image+HY.Core.Config.HySysFiles.Icon),
	srcX:0,
	srcY:0,
	srcHeight:20,
	srcWidth:20
};
HY.GUI.Panel.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
		this._titleLabel =  new HY.GUI.Label({
			x:23,
			y:3,
			width:this.getWidth()-40,
			height:14,
			fontSize:9,
			textColor:'#FFFFFF',
			textAlign:HY.GUI.TEXTALIGNLEFT,
			mouseTrigger:false
		});
		this._titleIcon = new HY.GUI.ImageClip({
			x:3,
			y:3,
			width:14,
			height:14,
			mouseTrigger:false
		});
		if(config.viewPort){ this._viewPort = config.viewPort; } else { this._viewPort = new HY.GUI.View({backgroundColor:'#FFFFFF'}); }
		if(config.title != undefined){ this._titleLabel.setText(config.title); } else { this._titleLabel.setTitle(this.defaultTitle); }
		if(config.icon != undefined){ this._titleIcon.setTexture(config.icon); } else { this._titleIcon.setTexture(this.defaultIcon); }
		this.addChildNodeAtLayer(this._titleLabel,0);
		this.addChildNodeAtLayer(this._titleIcon,0);
		this.setViewPort(this._viewPort);
    }
}
HY.GUI.Panel.prototype.setWidth = function(pWidth){
    this.superCall("setWidth",[pWidth]);
	this.needLayoutUI();
}
HY.GUI.Panel.prototype.setHeight = function(pHeight){
    this.superCall("setHeight",[pHeight]);
	this.needLayoutUI();
}
HY.GUI.Panel.prototype.layoutUI = function () {
	this.superCall("layoutUI");
	this._titleIcon.setX(3);
	this._titleIcon.setY(3);
	this._titleIcon.setWidth(14);
	this._titleIcon.setHeight(14);
	this._titleLabel.setX(23);
	this._titleLabel.setY(3);
	this._titleLabel.setWidth(this.getWidth()-40);
	this._titleLabel.setHeight(14);
	this._viewPort.setX(1);
	this._viewPort.setY(20);
	this._viewPort.setWidth(this.getWidth()-2);
	this._viewPort.setHeight(this.getHeight()-21);
}
HY.GUI.Panel.prototype.getViewPort = function(){
	return this._viewPort;
}
HY.GUI.Panel.prototype.setViewPort = function(pView){
	if(this._viewPort){
		this.removeChildNode(this._viewPort);
	}
	this._viewPort = pView;
	this.addChildNodeAtLayer(this._viewPort,0);
	this.needLayoutUI();
}
HY.GUI.Panel.prototype.getTitle = function(){
	return this._titleLabel.getText();
}
HY.GUI.Panel.prototype.setTitle = function(pTitle) {
    this._titleLabel.setText(pTitle);
}
HY.GUI.Panel.prototype.getIcon = function(){
	return this._titleIcon.getTexture();
}
HY.GUI.Panel.prototype.setIcon = function(pTexture){
	this._titleIcon.setTexture(pTexture);
}