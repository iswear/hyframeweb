HY.Core.AudioPlayer = function(config){
    this.extend(HY.Object);
    this.initWithConfig(config);
}
HY.Core.AudioPlayer.prototype = new HY.Object();
HY.Core.AudioPlayer.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
    }
}