var player = new HY.Game.Player({
    x:0,
    y:0,
    width:720,
    height:405,
    backgroundColor:'green'
});

var leader = new HY.Game.Node({
    x:60,
    y:50,
    width:80,
    height:80,
    mouseTrigger:false,
    backgroundImage:'image/player/rockerbase.png'
});
var role1 = new HY.Game.Node({
    x:50,
    y:130,
    width:60,
    height:60,
    mouseTrigger:false,
    backgroundImage:'image/player/rockerbase.png'
});
var role2 = new HY.Game.Node({
    x:50,
    y:200,
    width:60,
    height:60,
    mouseTrigger:false,
    backgroundImage:'image/player/rockerbase.png'
});

var rocker = new HY.Game.Node({
    x:0,
    y:0,
    width:60,
    height:60,
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
var rockerBase = new HY.Game.Node({
    x:120,
    y:305,
    width:110,
    height:110,
    mouseTrigger:false,
    backgroundImage:'image/player/rockerbase.png'
});
rocker.addEventListener("mouseup",function(pThis,pEvent){
    pThis.setX(0);
    pThis.setY(0);
},null);
rockerBase.addChildNodeAtLayer(rocker,0);

player.addChildNodeAtLayer(leader,0);
player.addChildNodeAtLayer(role1,0);
player.addChildNodeAtLayer(role2,0);
player.addChildNodeAtLayer(rockerBase,0);


var app = new HY.Core.Application({
    appWidth:720,
    appHeight:405,
    fullScreen:true,
    autoScale:true
});
app.run(player);