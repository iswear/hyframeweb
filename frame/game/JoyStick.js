HY.Game.JoyStick = function(config){
    this.extend(HY.Game.Node);
    this.initWithConfig(config);
}
HY.Game.JoyStick.prototype = new HY.Game.Node();
HY.Game.JoyStick.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        this._stick = new HY.Game.Node({
            x:0,
            y:0,
            dragAble:true,
            mouseTrigger:true,
            dragZone:{x:-1000000,y:-1000000,width:2000000,height:2000000},
            backgroundImage:'image/player/rocker.png',
            dragLimitZone:{
                type:2,
                x:0,
                y:0,
                radius:55
            }
        });
        this._stick.addEventListener("drag",function(pThis,pEvent){
            var parent = this.getParent();
            parent.onStickMoved();
        },null);
        this._stick.addEventListener("mouseup",function(pThis,pEvent){
            pThis.setX(0);
            pThis.setY(0);
            var parent = this.getParent();
            parent.onStickMoved();
        },null);
        this.addChildNodeAtLayer(this._stick,0);
    }
}
HY.Game.JoyStick.prototype.setWidth = function(pWidth){
}
HY.Game.JoyStick.prototype.setHeight = function(pHeight){

}
HY.Game.JoyStick.prototype.getStick = function(){
    return this._stick;
}
HY.Game.JoyStick.prototype.onStickMoved = function(){
    this.launchEvent("stickmoved");
}
