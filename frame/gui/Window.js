HY.GUI.Window = function(config){
    this.extend(HY.GUI.View);
    this.initWithConfig(config);
}
HY.GUI.Window.prototype = new HY.GUI.View();
HY.GUI.Window.prototype.defaultBackgroundColor = "#000000";
HY.GUI.Window.prototype.defaultTitle = "title";
HY.GUI.Window.prototype.defaultAutoFloat = false;
HY.GUI.Window.prototype.defaultDragZone = {x:0,y:0,width:99999.0,height:30};
HY.GUI.Window.prototype.defaultDragAble = true;
HY.GUI.Window.prototype.defaultResizeAble = true;
HY.GUI.Window.prototype.defaultCloseAble = true;
HY.GUI.Window.prototype.defaultIcon = {
	src:(HY.Core.Config.Paths.Image+HY.Core.Config.HySysFiles.Icon),
	srcX:0,
	srcY:0,
	srcHeight:20,
	srcWidth:20
};
HY.GUI.Window.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
		this._titleIcon = new HY.GUI.ImageClip({
			x:5,
			y:5,
			width:20,
			height:20,
			mouseTrigger:false
		});
		this._titleLabel = new HY.GUI.Label({
			x:30,
			y:5,
			width:this.getWidth()-60,
			height:20,
			fontSize:13,
			textColor:'#FFFFFF',
			textAlign:HY.GUI.TEXTALIGNLEFT,
			mouseTrigger:false
		});
		this._closeBtn = new HY.GUI.View({
			x:this.getWidth()-25,
			y:5,
			width:20,
			height:20,
			mouseTrigger:true,
			backgroundColor:"#FF0000"
		});
		this._closeBtn.addEventListener("paint",function(pThis,pDc){
			pDc.lineWidth = 2;
			pDc.strokeStyle = "#FFFFFF";
			pDc.beginPath();
			pDc.moveTo(this.getWidth()/4,this.getWidth()/4);
			pDc.lineTo(this.getWidth()*3/4,this.getWidth()*3/4);
			pDc.moveTo(this.getWidth()*3/4,this.getWidth()/4);
			pDc.lineTo(this.getWidth()/4,this.getWidth()*3/4);
			pDc.stroke();
		},null);
		this._closeBtn.addEventListener("mouseup",function(pThis,pEvent){
			var window = this.getParent();
			if(window._closeAble){
				window.setVisible(false);
			}
		},null);
		if(config.title) { this._titleLabel.setText(config.title); } else { this._titleLabel.setText(this.defaultTitle); }
		if(config.icon) { this._titleIcon.setTexture(config.icon); } else { this._titleIcon.setTexture(this.defaultIcon); }
		if(config.viewPort) { this._viewPort = config.viewPort; } else { this._viewPort = new HY.GUI.View({backgroundColor:'#FFFFFF'}); }
		if(config.closeAble) { this._closeAble = config.closeAble; } else { this._closeAble = this.defaultCloseAble; }

		this.addChildNodeAtLayer(this._titleIcon,0);
		this.addChildNodeAtLayer(this._titleLabel,0);
		this.addChildNodeAtLayer(this._closeBtn,0);
		this.setViewPort(this._viewPort);
    }
}
HY.GUI.Window.prototype.layoutUI = function(){
	this.superCall("layoutUI");
	this._titleIcon.setX(5);
	this._titleIcon.setY(5);
	this._titleIcon.setWidth(20);
	this._titleIcon.setHeight(20);
	this._titleLabel.setX(30);
	this._titleLabel.setY(5);
	this._titleLabel.setWidth(this.getWidth()-60);
	this._titleLabel.setHeight(20);
	this._closeBtn.setX(this.getWidth()-25);
	this._closeBtn.setY(5);
	this._closeBtn.setWidth(20);
	this._closeBtn.setHeight(20);
	this._viewPort.setX(5);
	this._viewPort.setY(30);
	this._viewPort.setWidth(this.getWidth()-10);
	this._viewPort.setHeight(this.getHeight()-35);
}
HY.GUI.Window.prototype.showCloseBtn = function(){
    this._closeBtn.setVisible(true);
}
HY.GUI.Window.prototype.hideCloseBtn = function(){
    this._closeBtn.setVisible(false);
}
HY.GUI.Window.prototype.setViewPort = function(pView){
	if(this._viewPort){
		this.removeChildNode(pView);
	}
	this._viewPort = pView;
	this.addChildNodeAtLayer(this._viewPort,0);
	this.needLayoutUI();
}
HY.GUI.Window.prototype.getViewPort = function(){
	return this._viewPort;
}
HY.GUI.Window.prototype.getTitle = function(){
	return this._titleLabel.getText();
}
HY.GUI.Window.prototype.setTitle = function(pTitle){
    this._titleLabel.setText(pTitle);
}
HY.GUI.Window.prototype.getIcon = function(){
	return this._titleIcon.getTexture();
}
HY.GUI.Window.prototype.setIcon = function(pTexture){
    this._titleIcon.setTexture(pTexture);
}
HY.GUI.Window.prototype.setWidth = function(pWidth){
    this.superCall("setWidth",[pWidth]);
	this.needLayoutUI();
}
HY.GUI.Window.prototype.setHeight = function(pHeight){
    this.superCall("setHeight",[pHeight]);
	this.needLayoutUI();
}