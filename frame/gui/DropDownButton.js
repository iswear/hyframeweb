HY.GUI.DropDownButton = function(config){
	this.extend(HY.GUI.Button);
	this.initWithConfig(config);
}
HY.GUI.DropDownButton.prototype = new HY.GUI.Button();
HY.GUI.DropDownButton.prototype.initWithConfig = function (config) {
	if(config){
		this.superCall("initWithConfig",[config]);
		if(config.dropItems){ this._dropItems = config.dropItems; } else { this._dropItems = null; }
		if(config.dropItemEvent){ this.addEventListener("dropitem",config.dropItemEvent.selector,config.dropItemEvent.target); }
	}
}
HY.GUI.DropDownButton.prototype.getDropItems = function(){
	return this._dropItems;
}
HY.GUI.DropDownButton.prototype.setDropItems = function(pItems){
	this._dropItems = pItems;
}
HY.GUI.DropDownButton.prototype.onMouseUp = function(pEvent){
	this.superCall("onMouseUp",[pEvent]);
	if(this._dropItems != null && this._dropItems.length > 0){
		var app = this.getApplication();
		if(app){
			app.showContextMenu(pEvent,this,this._dropItems,true);
		}
	}
}
HY.GUI.DropDownButton.prototype.onDropItem = function(pItem){
	this.launchEvent("dropitem",[this,pItem]);
}