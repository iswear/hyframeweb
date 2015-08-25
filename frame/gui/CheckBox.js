HY.GUI.CheckBox = function(config) {
    this.extend(HY.GUI.View);
    this.initWithConfig(config);
}
HY.GUI.CheckBox.prototype = new HY.GUI.View();
HY.GUI.CheckBox.prototype.defaultChecked = false;
HY.GUI.CheckBox.prototype.defaultWidth = 15.0;
HY.GUI.CheckBox.prototype.defaultHeight = 15.0;
HY.GUI.CheckBox.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.checked){ this._checked = config.checked; } else { this._checked = this.defaultChecked; }
        if(config.checkedChangedEvent){ this.addEventListener("checkedchanged",config.checkedChangedEvent.selector,config.checkedChangedEvent.target); }
    }
}
HY.GUI.CheckBox.prototype.setWidth = function (pWidth) { }
HY.GUI.CheckBox.prototype.setHeight = function (pHeight) { }
HY.GUI.CheckBox.prototype.setChecked = function(pCheck){
    if(this._checked != pCheck){
        this._checked = pCheck;
        this.onCheckedChanged(pCheck);
    }
}
HY.GUI.CheckBox.prototype.getChecked = function(){
    return this._checked;
}
HY.GUI.CheckBox.prototype.onPaint = function(pDc){
    this.superCall("onPaint",[pDc]);
    var lineWidth = 2.0/15.0*this.getWidth();
    var lefttop = new HY.Vect2D({});
    lefttop.x = -this.getAnchorPointX()*this.getWidth();
    lefttop.y = -this.getAnchorPointY()*this.getHeight();
    pDc.lineWidth = lineWidth;
    pDc.strokeStyle = "#408AEC";
    pDc.strokeRect(lefttop.x,lefttop.y,this.getWidth(),this.getHeight());
    if(this._checked){
        pDc.beginPath();
        pDc.moveTo(lefttop.x+lineWidth,lefttop.y+this.getHeight()/2);
        pDc.lineTo(lefttop.x+this.getWidth()/3,lefttop.y+this.getHeight()-lineWidth);
        pDc.lineTo(lefttop.x+this.getWidth()-lineWidth,lineWidth);
        pDc.strokeStyle = "#408AEC";
        pDc.stroke();
    }
}
HY.GUI.CheckBox.prototype.onMouseUp = function(pEvent) {
    this.superCall("onMouseUp", [pEvent]);
    this._checked = !this._checked;
    this.onCheckedChanged(this._checked);
}
HY.GUI.CheckBox.prototype.onCheckedChanged = function(checked){
    this.launchEvent("checkedchanged",[this,checked]);
}