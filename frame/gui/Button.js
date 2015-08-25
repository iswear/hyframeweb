/**
 * Created by songtao on 14-10-23.
 */
HY.GUI.Button = function(config){
    this.extend(HY.GUI.View);
    this.initWithConfig(config);
}
HY.GUI.Button.prototype = new HY.GUI.View();
HY.GUI.Button.prototype.defaultWidth = 60;
HY.GUI.Button.prototype.defaultHeight = 30;
HY.GUI.Button.prototype.defaultTitle = "Button";
HY.GUI.Button.prototype.defaultNormalColor = null;
HY.GUI.Button.prototype.defaultFocusColor = "#0000FF";
HY.GUI.Button.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        this._titleLabel = new HY.GUI.Label({
            x:0,
            y:0,
            width:this.getWidth(),
            height:this.getHeight()
        });
        this.addChildNodeAtLayer(this._titleLabel,0);
		if(config.normalColor){ this._normalColor = config.normalColor; } else { this._normalColor = this.defaultNormalColor; }
        if(config.focusColor){ this._focusColor = config.focusColor; } else { this._focusColor = this.defaultFocusColor; }
		if(config.title){ this.getTitleLabel().setText(config.title); } else { this.getTitleLabel().setText(this.defaultTitle); }

		this.setBackgroundColor(this._normalColor);
    }
}
HY.GUI.Button.prototype.setNormalColor = function(pColor){
	this._normalColor = pColor;
}
HY.GUI.Button.prototype.setMouseOverColor = function(pColor){
	this._mouseOverColor = pColor;
}
HY.GUI.Button.prototype.setFocusColor = function(pColor){
	this._focusColor = pColor;
}
HY.GUI.Button.prototype.getTitleLabel = function(){
    return this._titleLabel;
}
HY.GUI.Button.prototype.getMinLayoutWidth = function(){
	return this._titleLabel.getMinLayoutWidth();
}
HY.GUI.Button.prototype.getMinLayoutHeight = function(){
	return this._titleLabel.getMinLayoutHeight();
}
HY.GUI.Button.prototype.setWidth = function(pWidth){
    this.superCall("setWidth",[pWidth]);
    this._titleLabel.setWidth(this.getWidth());
}
HY.GUI.Button.prototype.setHeight = function(pHeight){
    this.superCall("setHeight",[pHeight]);
    this._titleLabel.setHeight(this.getHeight());
}
HY.GUI.Button.prototype.onFocus = function(){
	this.superCall("onFocus");
	this.setBackgroundColor(this._focusColor);
}
HY.GUI.Button.prototype.onBlur = function(){
	this.superCall("onBlur");
	this.setBackgroundColor(this._normalColor);
}