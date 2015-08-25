/**
 * Created by Administrator on 2014/12/11.
 */
HY.GUI.Frame = function(config){
    this.extend(HY.GUI.View);
    this.initWithConfig(config);
}
HY.GUI.Frame.prototype = new HY.GUI.View();
HY.GUI.Frame.prototype.defaultBackgroundColor = "#0000FF";
HY.GUI.Frame.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
		if(config.viewPort){ this._viewPort=config.viewPort; } else { this._viewPort =new HY.GUI.View({backgroundColor:'#FFFFFF'}); }
		this.setViewPort(this._viewPort);
    }
}
HY.GUI.Frame.prototype.layoutUI = function(){
	this.superCall("layoutUI");
	this._viewPort.setX(5);
	this._viewPort.setY(5);
	this._viewPort.setWidth(this.getWidth()-10);
	this._viewPort.setHeight(this.getHeight()-10);
}
HY.GUI.Frame.prototype.setWidth = function(pWidth){
    this.superCall("setWidth",[pWidth]);
	this.needLayoutUI();
}
HY.GUI.Frame.prototype.setHeight = function(pHeight) {
	this.superCall("setHeight", [pHeight]);
	this.needLayoutUI();
}
HY.GUI.Frame.prototype.setViewPort = function(pView){
	if(this._viewPort){
		this.removeChildNode(this._viewPort);
	}
	this._viewPort = pView;
	this.addChildNodeAtLayer(this._viewPort,0);
	this.needLayoutUI();
}
HY.GUI.Frame.prototype.getViewPort = function(){
    return this._viewPort;
}
