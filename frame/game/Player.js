HY.Game.Player = function(config){
    this.extend(HY.GUI.View);
    this.initWithConfig(config);
}
HY.Game.Player.prototype = new HY.GUI.View();
HY.Game.Player.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
    }
}