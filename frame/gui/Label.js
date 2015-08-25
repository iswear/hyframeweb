/**
 * Created by songtao on 14-10-23.
 */
HY.GUI.Label = function(config){
    this.extend(HY.GUI.View);
    this.initWithConfig(config);
}
HY.GUI.Label.prototype = new HY.GUI.View();
HY.GUI.Label.prototype.defaultText = "Label";
HY.GUI.Label.prototype.defaultTextColor = "#000000";
HY.GUI.Label.prototype.defaultTextAlign = HY.GUI.TEXTALIGNCENTER;
HY.GUI.Label.prototype.defaultVerticalAlign = HY.GUI.TEXTVERTICALALIGNMIDDLE;
HY.GUI.Label.prototype.defaultMouseTrigger = false;
HY.GUI.Label.prototype.defaultAutoAdjustSizeToFit = false;
HY.GUI.Label.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        this._font = new HY.Font(config);
        if(config.text != undefined){ this._text = config.text; } else { this._text = this.defaultText; }
        if(config.textColor != undefined){ this._textColor = config.textColor; } else { this._textColor = this.defaultTextColor; }
        if(config.textAlign != undefined){ this._textAlign = config.textAlign; } else { this._textAlign = this.defaultTextAlign; }
        if(config.verticalAlign != undefined){ this._verticalAlign = config.verticalAlign; } else { this._verticalAlign = this.defaultVerticalAlign; }
        if(config.autoAdjustSizeToFit != undefined){ this._autoAdjustSizeToFit = config.autoAdjustSizeToFit} else { this._autoAdjustSizeToFit = this.defaultAutoAdjustSizeToFit; }


		this._minLayoutWidth = HY.Text.getTextLength(this._text,this._font);
		this._minLayoutHeight = this._font.fontSize*3/2;
        this._textLength = 100;
    }
}
HY.GUI.Label.prototype.getMinLayoutWidth = function(){
	return this._minLayoutWidth+5;
}
HY.GUI.Label.prototype.getMinLayoutHeight = function(){
	return this._minLayoutHeight;
}
HY.GUI.Label.prototype.setWidth = function(pWidth){
	if(!this._autoAdjustSizeToFit){
		this.superCall("setWidth",[pWidth]);
	}
}
HY.GUI.Label.prototype.setHeight = function(pHeight){
	if(!this._autoAdjustSizeToFit){
		this.superCall("setHeight",[pHeight]);
	}
}
HY.GUI.Label.prototype.getFont = function(){
    return this._font;
}
HY.GUI.Label.prototype.setFont = function(pFont){
    this._font = pFont;
	this._minLayoutWidth = HY.Text.getTextLength(this._text,this._font);
	this._minLayoutHeight = this._font.fontSize*3/2;
	if(this._autoAdjustSizeToFit){
		this.setWidth(this._minLayoutWidth);
		this.setHeight(this._minLayoutHeight);
	}
}
HY.GUI.Label.prototype.getText = function(){
    return this._text;
}
HY.GUI.Label.prototype.setText = function(pText){
    this._text = pText;
	this._minLayoutWidth = HY.Text.getTextLength(this._text,this._font);
	if(this._autoAdjustSizeToFit){
		this.setWidth(this._minLayoutWidth);
		this.setHeight(this._minLayoutHeight);
	}
    this.reRender();
}
HY.GUI.Label.prototype.getTextColor = function(){
    return this._textColor;
}
HY.GUI.Label.prototype.setTextColor = function(pColor){
    this._textColor = pColor;
}
HY.GUI.Label.prototype.getTextAlign = function(){
    return this._textAlign;
}
HY.GUI.Label.prototype.setTextAlign = function(pAlign){
    this._textAlign = pAlign;
}
HY.GUI.Label.prototype.getVerticalAlign = function(){
    return this._verticalAlign;
}
HY.GUI.Label.prototype.setVerticalAlign = function(pAlign){
    this._verticalAlign = pAlign;
}
HY.GUI.Label.prototype.getAutoAdjustSizeToFit = function(){
    return this._autoAdjustSizeToFit;
}
HY.GUI.Label.prototype.setAutoAdjustSizeToFit = function(param){
    this._autoAdjustSizeToFit = param;
	if(param){
		this.setWidth(this._minLayoutWidth);
		this.setHeight(this._minLayoutHeight);
	}
}
HY.GUI.Label.prototype.onPaint = function(pDc){
    this.superCall("onPaint",[pDc]);
    pDc.font = this._font.generateString();
    this._textLength = pDc.measureText(this._text).width;
    var textx = 0;
    var texty = 0;
    var startX = -1 * this.getWidth() * this.getAnchorPointX()+this.getBorderWidth()/2;
    var startY = -1 * this.getHeight() * this.getAnchorPointY();

    switch (this._verticalAlign){
        case HY.GUI.TEXTVERTICALALIGNTOP:{
            texty = startY+this._font.fontSize-this._font.fontSize/5.0;
            break;
        }
        case HY.GUI.TEXTVERTICALALIGNMIDDLE:{
            texty = startY+this.getHeight()/2+2.0*this._font.fontSize/5.0;
            break;
        }
        case HY.GUI.TEXTVERTICALALIGNBOTTOM:{
            texty = startY+this.getHeight()-this._font.fontSize/5.0;
            break;
        }
        default:{
            texty = startY+this._font.fontSize-this._font.fontSize/5.0;
            break;
        }
    }
    switch (this._textAlign){
        case HY.GUI.TEXTALIGNCENTER:{
            textx = startX + (this.getWidth()-this._textLength)/2;
            break;
        }
        case HY.GUI.TEXTALIGNLEFT:{
            textx = startX;
            break;
        }
        case HY.GUI.TEXTALIGNCRIGHT:{
            textx = startX + this.getWidth() - this._textLength;
            break;
        }
        default :{
            textx = startX + (this.getWidth()-this._textLength)/2;
            break;
        }
    }

    pDc.font = this._font.generateString();
    pDc.fillStyle = this._textColor;
    pDc.fillText(this._text,textx,texty);
}