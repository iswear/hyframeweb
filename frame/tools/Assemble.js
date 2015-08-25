HY.Tools.Assemble = function(config){
    this.extend(HY.Tools.Unit);
    this.initWithConfig(config);
}
HY.Tools.Assemble.prototype = new HY.Tools.Unit();
HY.Tools.Assemble.prototype.defaultX = 200;
HY.Tools.Assemble.prototype.defaultY = 150;
HY.Tools.Assemble.prototype.defaultWidth = 400;
HY.Tools.Assemble.prototype.defaultHeight = 300;
HY.Tools.Assemble.prototype.defaultBackgroundColor = "#CCCCCC";
HY.Tools.Assemble.prototype.defaultDragAble = true;
HY.Tools.Assemble.prototype.defaultResizeAble = true;
HY.Tools.Assemble.prototype.defaultMouseTrigger = true;
HY.Tools.Assemble.prototype.defaultDragZone = new HY.Rect2D({
    x:-1000000.0,
    y:-1000000.0,
    width:2000000.0,
    height:2000000.0
});
HY.Tools.Assemble.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
		if(config.actionNames != undefined){ this._actionNames = config.actionNames; } else { this._actionNames = []; }
    }
}
HY.Tools.Assemble.prototype.getActionNames = function(){
	return this._actionNames;
}
HY.Tools.Assemble.prototype.setActionNames = function(pActionnames){
	this._actionNames = pActionnames;
}
HY.Tools.Assemble.prototype.addActionName = function(pName){
	var index = 0;
	var newactionname = pName;
	while(!this._addActionName(newactionname)){
		index++;
		newactionname = pName+index;
	}
	return newactionname;
}
HY.Tools.Assemble.prototype._addActionName = function(pName){
	var len = this._actionNames.length;
	for(var i=0; i<len ; ++i){
		var curname = this._actionNames[i];
		if(curname.name == pName){
			return false;
		}
	}
	this._actionNames.push({name:pName});
	return true;
}
HY.Tools.Assemble.prototype.addActionNameAtIndex = function(pName,pIndex){
	var index = 0;
	var newactionname = pName;
	while(!this._addActionName(newactionname)){
		index++;
		newactionname = pName+index;
	}
	return newactionname;
}
HY.Tools.Assemble.prototype._addActionNameAtIndex = function(pName,pIndex){
	var len = this._actionNames.length;
	for(var i=0; i<len ; ++i){
		var curname = this._actionNames[i];
		if(curname.name == pName){
			return false;
		}
	}
	this._actionNames.splice(pIndex,0,{name:pName});
	return true;
}
HY.Tools.Assemble.prototype.existActionName = function(pName){
	var len = this._actionNames.length;
	for(var i=0; i<len ; ++i){
		var curname = this._actionNames[i];
		if(curname.name == pName){
			return true;
		}
	}
	return false;
}
HY.Tools.Assemble.prototype.removeActionNameByName = function(pName){
	for(var i = this._actionNames.length-1; i>=0 ; --i){
		if(this._actionNames[i] == pName){
			this._actionNames.splice(i,1);
			this.removeActionsByName(pName,true);
			this.removeActionFramesByName(pName,true);
		}
	}
}
HY.Tools.Assemble.prototype.removeActionNameByIndex = function(pIndex){
	var len = this._actionNames.length;
	if(pIndex < len){
		var actionname = this._actionNames[pIndex];
		this._actionNames.splice(pIndex,1);
		this.removeActionsByName(actionname,true);
		this.removeActionFramesByName(actionname,true);
	}
}