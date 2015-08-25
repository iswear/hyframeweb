HY.Tools.Unit = function(config){
    this.extend(HY.Game.Unit);
    this.initWithConfig(config);
}
HY.Tools.Unit.prototype = new HY.Game.Unit();
HY.Tools.Unit.prototype.defaultDragAble = true;
HY.Tools.Unit.prototype.defaultRotateAble = true;
HY.Tools.Unit.prototype.defaultResizeAble = true;
HY.Tools.Unit.prototype.defaultDragZone = new HY.Rect2D({x:-1000000.0,y:-1000000.0,width:2000000.0,height:2000000.0});
HY.Tools.Unit.prototype.defaultEditMode = HY.Game.NODE.EDITMODE.NONE;
HY.Tools.Unit.prototype.defaultBackgroundColor = "#000000";
HY.Tools.Unit.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
		if(config.anchorPointMoveEvents){ this._anchorPointMoveEvents=config.anchorPointMoveEvents; } else { this._anchorPointMoveEvents=[]; }

        this._anchorPointNode = new HY.Game.Node({
            x:0,
            y:0,
            width:20,
            height:20,
            anchorPointX:0.5,
            anchorPointY:0.5,
            dragZone:new HY.Rect2D({x:-5,y:-5,width:10,height:10}),
            dragAble:true,
            resizeAble:false
        });
        this.addChildNode(this._anchorPointNode);

        this._anchorPointNode.addEventListener("paint",function(pThis,pDc){
            pDc.beginPath();
            pDc.fillStyle = "#FF0000";
            pDc.arc(0,0,5,0,Math.PI*2,false);
            pDc.fill();
        });
        this._anchorPointNode.addEventListener("enddrag",function(pThis,pEvent){
            var curVectPos = this._anchorPointNode.getPosition();
            this.setAnchorPointX(curVectPos.x/this.getWidth()+this.getAnchorPointX());
            this.setAnchorPointY(curVectPos.y/this.getHeight()+this.getAnchorPointY());
            var parentPos = this.transToParentVect2d(curVectPos);
            this.setX(this.getX()+parentPos.x);
            this.setY(this.getY()+parentPos.y);
            this._anchorPointNode.setX(0);
            this._anchorPointNode.setY(0);
        },this);
        if(config.editMode != undefined){ this.setEditMode(config.editMode); } else { this.setEditMode(this.defaultEditMode); }
    }
}
HY.Tools.Unit.prototype.addEventListener = function(pType,pSelector,pTarget){
	this.superCall("addEventListener",[pType,pSelector,pTarget]);
	var eTarget;
	if(pTarget == undefined || pTarget == null){
		eTarget = this;
	}else{
		eTarget = pTarget;
	}
	if(pType == "anchorpointmove"){
		this._anchorPointMoveEvents.push({target:eTarget,selector:pSelector});
	}
}
HY.Tools.Unit.prototype.removeAllEventListener = function(pType){
	this.superCall("removeEventListener",pType);
	if(pType == "itemselected"){
		this._anchorPointMoveEvents.splice(0,this._anchorPointMoveEvents.length);
	}
}
HY.Tools.Unit.prototype.getEditMode = function(){
    return this._editMode;
}
HY.Tools.Unit.prototype.setEditMode = function(editMode){
    switch (editMode){
        case HY.Game.NODE.EDITMODE.NONE:
        {
            this._editMode = editMode;
            this._anchorPointNode.setVisible(false);
            this._anchorPointNode.setMouseTrigger(false);
            this.setDragAble(false);
            this.setRotateAble(false);
            this.setResizeAble(false);
            break;
        }
        case HY.Game.NODE.EDITMODE.ANCHOR:
        {
            this._editMode = editMode;
            this._anchorPointNode.setVisible(true);
            this._anchorPointNode.setMouseTrigger(true);
            this.setDragAble(false);
            this.setRotateAble(false);
            this.setResizeAble(false);
            break;
        }
        case HY.Game.NODE.EDITMODE.ANGLE:
        {
            this._editMode = editMode;
            this._anchorPointNode.setVisible(true);
            this._anchorPointNode.setMouseTrigger(false);
            this.setDragAble(false);
            this.setRotateAble(true);
            this.setResizeAble(false);
            break;
        }
        case HY.Game.NODE.EDITMODE.POSITION:
        {
            this._editMode = editMode;
            this._anchorPointNode.setVisible(true);
            this._anchorPointNode.setMouseTrigger(false);
            this.setDragAble(true);
            this.setRotateAble(false);
            this.setResizeAble(false);
            break;
        }
        case HY.Game.NODE.EDITMODE.RESIZE:
        {
            this._editMode = editMode;
            this._anchorPointNode.setVisible(true);
            this._anchorPointNode.setMouseTrigger(false);
            this.setDragAble(false);
            this.setRotateAble(false);
            this.setResizeAble(true);
        }
        default :
            break;
    }
}
HY.Tools.Unit.prototype.setSelected = function(pSelected){
    this._anchorPointNode.setVisible(pSelected);
}
HY.Tools.Unit.prototype.getSelected = function(){
    return this._anchorPointNode.getVisible();
}
HY.Tools.Unit.prototype.onPaint = function(pDc){
    this.superCall("onPaint",[pDc]);
    if(this.getSelected()){
		var startX = 0,startY = 0;
		if(this._anchorPointNode != null){
			startX = this._anchorPointNode.getX();
			startY = this._anchorPointNode.getY();
		}
		pDc.strokeStyle = "#0000FF";
		pDc.fillStyle = "#0000FF";
		pDc.beginPath();
		pDc.moveTo(startX+5,startY);
		pDc.lineTo(this.getWidth()+20+startX,startY);
		pDc.stroke();
		pDc.beginPath();
		pDc.moveTo(this.getWidth()+20+startX,startY);
		pDc.lineTo(this.getWidth()+10+startX,3+startY);
		pDc.lineTo(this.getWidth()+10+startX,startY-3);
		pDc.closePath();
		pDc.fill();
		pDc.strokeStyle = "#00FF00";
		pDc.fillStyle = "#00FF00";
		pDc.beginPath();
		pDc.moveTo(startX,5+startY);
		pDc.lineTo(startX,this.getHeight()+20+startY);
		pDc.stroke();
		pDc.moveTo(startX,this.getHeight()+20+startY);
		pDc.lineTo(3+startX,this.getHeight()+10+startY);
		pDc.lineTo(-3+startX,this.getHeight()+10+startY);
		pDc.closePath();
		pDc.fill();
        switch (this._editMode){
            case HY.Game.NODE.EDITMODE.ANGLE:
            case HY.Game.NODE.EDITMODE.ANCHOR:
            case HY.Game.NODE.EDITMODE.POSITION:
            case HY.Game.NODE.EDITMODE.RESIZE:{
                break;
            }
            default:
                break;
        }
    }
}
HY.Tools.Unit.prototype.onAnchorPointMove = function(){
	var len = this._anchorPointMoveEvents.length;
	for(var i=0;i<len;++i){
		var eListener = this._anchorPointMoveEvents[i];
		eListener.selector.call(eListener.target);
	}
}