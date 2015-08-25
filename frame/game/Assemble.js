HY.Game.Assemble = function(config){
    this.extend(HY.Game.Unit);
    this.initWithConfig(config);
}
HY.Game.Assemble.prototype = new HY.Game.Unit();
HY.Game.Assemble.prototype.defaultName = "新装配件";
HY.Game.Assemble.prototype.defaultWidth = 100;
HY.Game.Assemble.prototype.defaultHeight = 100;
HY.Game.Assemble.prototype.defaultDragAble = false;
HY.Game.Assemble.prototype.defaultResizeAble = false;
HY.Game.Assemble.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.actionNames != undefined){ this._actionNames = config.actionNames; } else { this._actionNames = []; }
		if(config.eventTriggers != undefined){ this._eventTriggers = config.eventTriggers;  } else { this._eventTriggers = []; }
    }
}
HY.Game.Assemble.prototype.getActionNames = function(){
    return this._actionNames;
}
HY.Game.Assemble.prototype.setActionNames = function(pActionnames){
    this._actionNames = pActionnames;
}
HY.Game.Assemble.prototype.addActionName = function(pName){
    var len = this._actionNames.length;
    var i = 0;
    for(; i<len ; ++i){
        var curname = this._actionNames[i];
        if(curname.name == pName){
            break;
        }
    }
    if(i >= len){
        this._actionNames.push({name:pName});
        return true;
    }else{
        return false;
    }
}
HY.Game.Assemble.prototype.removeActionNameByName = function(pName){
    var i = this._actionNames.length-1;
    for(; i>=0 ; --i){
        if(this._actionNames[i] == pName){
            this._actionNames.splice(i,1);
        }
    }
}
HY.Game.Assemble.prototype.removeActionNameByIndex = function(pIndex){
    var len = this._actionNames.length;
    if(pIndex < len){
        this._actionNames.splice(pIndex,1);
    }
}