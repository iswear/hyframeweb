HY.GUI.ListItemView = function(config){
	this.extend(HY.GUI.View);
	this.initWithConfig(config);
}
HY.GUI.ListItemView.prototype = new HY.GUI.View();
HY.GUI.ListItemView.prototype.defaultNormalColor = null;//"#FF0000";
HY.GUI.ListItemView.prototype.defaultSelectedColor = "#00FF00";
HY.GUI.ListItemView.prototype.defaultMouseOverColor = "#0000FF";
HY.GUI.ListItemView.prototype.defaultEditAble = false;
HY.GUI.ListItemView.prototype.defaultPadding = 3;
HY.GUI.ListItemView.prototype.defaultHeight = 30;
HY.GUI.ListItemView.prototype.initWithConfig = function(config) {
	if(config){
		this.superCall("initWithConfig",[config]);

		if(config.padding){ this._padding = config.padding; } else { this._padding = this.defaultPadding; }
		if(config.editAble){ this._editAble = config.editAble; } else { this._editAble = this.defaultEditAble; }
		if(config.normalColor){ this._normalColor = config.normalColor; } else { this._normalColor = this.defaultNormalColor; }
		if(config.selectedColor){ this._selectedColor = config.selectedColor; } else { this._selectedColor = this.defaultSelectedColor; }
		if(config.mouseOverColor){ this._mouseOverColor = config.mouseOverColor; } else { this._mouseOverColor = this.defaultMouseOverColor; }
		if(config.nameChangedEvent){ this.addEventListener("namechanged",config.nameChangedEvent.selector,config.nameChangedEvent.target); }

		this._itemIcon = new HY.GUI.ImageClip({
			mouseTrigger:false
		});
		this._itemLabel = new HY.GUI.TextBox({
			mouseTrigger:false
		});
		this._itemLabel.addEventListener("endedit",function(pThis){
			var itemview = this.getParent();
			var itemdata = itemview.getItemData();
			if(itemdata) {
				var oldname = itemdata.name;
				var newname = this.getText();
				itemdata.name = newname;
				itemview.onNameChanged(newname);
			}
			this.setEditAble(false);
		},null);
		this._itemLabel.addEventListener("startedit",function(pThis){
			var itemview = this.getParent();
			if(itemview._prepareEditTime < 0){
				this.setEditAble(false);
			}else{
				var now = (new Date()).getTime();
				if(now >= itemview._prepareEditTime+300){
					this.setEditAble(true);
				}else{
					this.setEditAble(false);
				}
			}
		},null);
		this._itemLabel.addEventListener("mousedown",function(pThis,pEvent){
			var itemview = this.getParent();
			itemview._prepareEditTime = (new Date()).getTime();
		},null);
		this._itemLabel.addEventListener("mousemove",function(pThis,pEvent){
			var itemview = this.getParent();
			itemview._prepareEditTime = -1;
		},null);
		this._itemLabel.addEventListener("contextmenu",function(pThis,pItem){
			var itemview = this.getParent();
			itemview.onContextMenu(pItem);
		},null);

		this.addChildNodeAtLayer(this._itemIcon,0);
		this.addChildNodeAtLayer(this._itemLabel,0);
		this.setBackgroundColor(this._normalColor);
		this.setItemData(null);
		this._prepareEditTime = 0;
	}
}
HY.GUI.ListItemView.prototype.initItemData = function(pListData){
	if(pListData){
		//if(pListData.index == undefined){ pListData.index = 0; }
		if(pListData.name == undefined){ pListData.name = "new item"; }
		if(pListData.icon == undefined){ pListData.icon = null; }
		if(pListData.selected == undefined){ pListData.selected = false; }
		if(pListData.contextMenu != undefined){ this.setContextMenu(pListData.contextMenu); }

		if(!pListData.userProperty){ pListData.userProperty = {}; }
		if(pListData.userProperty.index == undefined){ pListData.userProperty.index = 0; }
		if(pListData.userProperty.view == undefined){ pListData.userProperty.view = this; }
		this._itemIcon.setTexture(pListData.icon);
		this._itemLabel.setText(pListData.name);
		this.setItemData(pListData);
		this.needLayoutUI();
	}
}
HY.GUI.ListItemView.prototype.layoutUI = function(){
	this.superCall("layoutUI");
	this._itemIcon.setX(0);
	this._itemIcon.setY(0);
	this._itemIcon.setWidth(this.getHeight());
	this._itemIcon.setHeight(this.getHeight());
	this._itemLabel.setX(this.getHeight());
	this._itemLabel.setY(0);
	this._itemLabel.getFont().fontSize = this.getHeight()/2;
	this._itemLabel.setWidth(this.getWidth()-this.getHeight());
	this._itemLabel.setHeight(this.getHeight());
}
HY.GUI.ListItemView.prototype.setWidth = function(pWidth){
	this.superCall("setWidth",[pWidth]);
	this.needLayoutUI();
}
HY.GUI.ListItemView.prototype.setHeight = function(pHeight){
	this.superCall("setHeight",[pHeight]);
	this.needLayoutUI();
}
HY.GUI.ListItemView.prototype.setContextMenu = function(pContextMenu){
	this.superCall("setContextMenu",[pContextMenu]);
	this._itemLabel.setContextMenu(pContextMenu);
}
//HY.GUI.ListItemView.prototype.clearUp = function(){
//	var itemdata = this.getItemData();
//	if(itemdata){
//		itemdata.userProperty = null;
//	}
//	this.superCall("clearUp");
//}
HY.GUI.ListItemView.prototype.getItemData = function(){
	return this.getUserProperty("data");
}
HY.GUI.ListItemView.prototype.setItemData = function(pData){
	this.setUserProperty("data",pData);
}
HY.GUI.ListItemView.prototype.setNormalColor = function(pColor){
	this._normalColor = pColor;
}
HY.GUI.ListItemView.prototype.setSelectedColor = function(pColor){
	this._selectedColor = pColor;
}
HY.GUI.ListItemView.prototype.setMouseOverColor = function(pColor){
	this._mouseOverColor = pColor;
}
HY.GUI.ListItemView.prototype.getEditAble = function(){
	return this._editAble;
}
HY.GUI.ListItemView.prototype.setEditAble = function(pValue){
	this._editAble = pValue;
}
HY.GUI.ListItemView.prototype.getPadding = function(){
	return this._padding;
}
HY.GUI.ListItemView.prototype.setPadding = function(pValue){
	this._padding = pValue;
	this.needLayoutUI();
}
HY.GUI.ListItemView.prototype.getItemIcon = function(){
	return this._itemIcon.getTexture();
}
HY.GUI.ListItemView.prototype.setItemIcon = function(pTexture){
	this._itemIcon.setTexture(pTexture);
}
HY.GUI.ListItemView.prototype.getItemName = function(){
	return this._itemLabel.getText();
}
HY.GUI.ListItemView.prototype.setItemName = function(pName){
	var listdata = this.getItemData();
	if(listdata){
		listdata.name = pName;
		this._itemLabel.setText(pname);
	}
}
HY.GUI.ListItemView.prototype.getItemSelected = function(){
	var itemdata = this.getItemData();
	if(itemdata){
		return itemdata.selected;
	}else{
		return false;
	}
}
HY.GUI.ListItemView.prototype.setItemSelected = function(pSelected){
	var itemdata = this.getItemData();
	if(itemdata){
		itemdata.selected = pSelected;
	}
	if(this._editAble){
		this._itemLabel.setMouseTrigger(pSelected);
	}
	this.refreshApperance();
}
HY.GUI.ListItemView.prototype.getMinLayoutWidth = function(){
	return this.getHeight()+this._itemLabel.getMinLayoutWidth();
}
HY.GUI.ListItemView.prototype.refreshApperance = function(){
	if(this.getItemSelected()){
		this.setBackgroundColor(this._selectedColor);
	}else if(this.mouseOverThis()){
		this.setBackgroundColor(this._mouseOverColor);
	}else{
		this.setBackgroundColor(this._normalColor);
	}
}
HY.GUI.ListItemView.prototype.onNameChanged = function(pNewname){
	this.launchEvent("namechanged",[this,pNewname]);
}


HY.GUI.ListView = function(config){
	this.extend(HY.GUI.View);
	this.initWithConfig(config);
}
HY.GUI.ListView.prototype = new HY.GUI.View();
HY.GUI.ListView.prototype.defaultNormalItemColor = null;//"#FF0000";
HY.GUI.ListView.prototype.defaultSelectedItemColor = "#00FF00";
HY.GUI.ListView.prototype.defaultMouseOverItemColor = "#0000FF";
HY.GUI.ListView.prototype.defaultRowHeight = 20;
HY.GUI.ListView.prototype.initWithConfig = function(config){
	if(config){
		this.superCall("initWithConfig",[config]);
		if(config.normalItemColor){ this._normalItemColor = config.normalItemColor; } else { this._normalItemColor = this.defaultNormalItemColor; }
		if(config.selectedItemColor){ this._selectedItemColor = config.selectedItemColor; } else { this._selectedItemColor = this.defaultSelectedItemColor; }
		if(config.mouseOverItemColor){ this._mouseOverItemColor = config.mouseOverItemColor; } else { this._mouseOverItemColor = this.defaultMouseOverItemColor;  }

		if(config.items){ this._items = config.items; } else { this._items = []; }
		if(config.rowHeight){ this._rowHeight = config.rowHeight; } else { this._rowHeight = this.defaultRowHeight; }

		if(config.itemSelectedEvent) { this.addEventListener("itemselected",config.itemSelectedEvent.selector,config.itemSelectedEvent.target); }
		if(config.itemContextMenuEvent){ this.addEventListener("itemcontextmenu",config.itemContextMenuEvent.selector,config.itemContextMenuEvent.target); }
		if(config.itemNameChangedEvent){ this.addEventListener("itemnamechanged",config.itemNameChangedEvent.selector,config.itemNameChangedEvent.target); }

		this._selectedItem = null;
		this._mallocListItemView();
	}
}
HY.GUI.ListView.prototype.setWidth = function(pWidth){
	this.superCall("setWidth",[pWidth]);
	var layer = this.getLayerAtIndex(0);
	if(layer){
		for(var i = layer.length-1;i>=0;--i){
			layer[i].setWidth(this.getWidth());
		}
	}
}
HY.GUI.ListView.prototype.setMouseOverItemColor = function(pColor){
	this._mouseOverItemColor  = pColor;
	var layer = this.getLayerAtIndex(0);
	if(layer){
		for(var i= layer.length-1;i>=0;--i){
			if(layer[i].setMouseOverColor){
				layer[i].setMouseOverColor(pColor);
			}
		}
	}
}
HY.GUI.ListView.prototype.setSelectedItemColor = function(pColor){
	this._selectedItemColor = pColor;
	var layer = this.getLayerAtIndex(0);
	if(layer){
		for(var i = layer.length-1;i>=0;--i){
			if(layer[i].setSelectedColor){
				layer[i].setSelectedColor(pColor);
			}
		}
	}
}
HY.GUI.ListView.prototype.setNormalItemColor = function(pColor){
	this._normalItemColor = pColor;
	var layer = this.getLayerAtIndex(0);
	if(layer){
		for(var i = layer.length-1;i>=0;--i){
			if(layer[i].setNormalColor){
				layer[i].setNormalColor(pColor);
			}
		}
	}
}
HY.GUI.ListView.prototype.setItems = function(pItems){
//	var i = this._items.length;
//	for(;i>0;--i){
//		this.clearUpItem(this._items[i-1]);
//	}
	this._items = pItems;
	this._mallocListItemView();
}
HY.GUI.ListView.prototype.addItem = function(pItem){
	this._items.push(pItem);
	this._mallocListItemView();
}
HY.GUI.ListView.prototype.addItemAt = function(pItem,pIndex){
	this._items.splice(pIndex,0,pItem);
	this._mallocListItemView();
}
HY.GUI.ListView.prototype.removeItem = function(pItem){
	for(var i = this._items.length-1;i>=0;--i){
		if(this._items[i] = pItem){
//			this.clearUpItem(this._items[len-1]);
			this._items.splice(i,1);
		}
	}
	this._mallocListItemView();
}
HY.GUI.ListView.prototype.removeItemAtIndex = function(pIndex){
	if(pIndex < this._items.length){
//		this.clearUpItem(this._items[pIndex]);
		this._items.splice(pIndex,1);
		this._mallocListItemView();
	}
}
//HY.GUI.ListView.prototype.clearUpItem = function(pItem){
//	if(pItem){
//		pItem.userProperty = null;
//	}
//}
HY.GUI.ListView.prototype.getSelectedItem = function(){
	return this._selectedItem;
}
HY.GUI.ListView.prototype.setSelectedItem = function(pItem){
	if(this._selectedItem){
		if(this._selectedItem.userProperty.view){
			this._selectedItem.userProperty.view.setItemSelected(false);
		}else{
			this._selectedItem.selected = false;
		}
	}
	if(pItem){
		this._selectedItem = pItem;
		if(this._selectedItem.userProperty.view){
			this._selectedItem.userProperty.view.setItemSelected(true);
		}else{
			this._selectedItem.selected = true;
		}
	}else{
		this._selectedItem = null;
	}
}
HY.GUI.ListView.prototype.getRowHeight = function(){
	return this._rowHeight;
}
HY.GUI.ListView.prototype.setRowHeight = function(pHeight){
	this._rowHeight = pHeight;
	this._mallocListItemView();
}
HY.GUI.ListView.prototype.onItemSelected = function(pItem){
	this.launchEvent("itemselected",[this,pItem]);
}
HY.GUI.ListView.prototype.onItemContextMenu = function(pItem,pMenuItem){
	this.launchEvent("itemcontextmenu",[this,pItem,pMenuItem]);
}
HY.GUI.ListView.prototype.onItemNameChanged = function(pItem,pNewName){
	this.launchEvent("itemnamechanged",[this,pItem,pNewName]);
}
HY.GUI.ListView.prototype.getMinLayoutWidth = function(){
	var layer0 = this.getLayerAtIndex(0);
	if(layer0){
		var maxwidth = 0;
		for(var i = layer0.length-1;i>=0;--i){
			maxwidth = (maxwidth > layer0[i].getMinLayoutWidth())?maxwidth:(layer0[i].getMinLayoutWidth());
		}
		return maxwidth;
	}else{
		return 0;
	}
}
HY.GUI.ListView.prototype.getMinLayoutHeight = function(){
	var layer0 = this.getLayerAtIndex(0);
	if(layer0){
		var count = layer0.length;
		return count*this.getRowHeight();
	}else{
		return 0;
	}
}
HY.GUI.ListView.prototype._mallocListItemView = function(){
	var accy = 0,i= 0,len;
	var layer = this.getLayerAtIndex(0);
	var mallocItemView = null;
	if(layer){
        len = layer.length;
		for(i=0; i < len; ++i){
			layer[i].setVisible(false);
		}
	}
	this._minLayerWidth = 0;
    var itemlen = this._items.length;
	for(i = 0; i < itemlen; ++i){
		if(layer && i<len){
			mallocItemView = layer[i];
			mallocItemView.setX(0);
			mallocItemView.setY(accy);
			mallocItemView.setWidth(this.getWidth());
			mallocItemView.setHeight(this.getRowHeight());
			mallocItemView.setNormalColor(this._normalItemColor);
			mallocItemView.setSelectedColor(this._selectedItemColor);
			mallocItemView.setMouseOverColor(this._mouseOverItemColor);
			mallocItemView.setVisible(true);
		}else{
			mallocItemView = new HY.GUI.ListItemView({
				x:0,
				y:accy,
				width:this.getWidth(),
				height:this.getRowHeight(),
				normalColor:this._normalItemColor,
				selectedColor:this._selectedItemColor,
				mouseOverColor:this._mouseOverItemColor
			});
			mallocItemView.addEventListener("mouseover",function(pThis,pEvent){ this.refreshApperance(); },null);
			mallocItemView.addEventListener("mouseout",function(pThis,pEvent){ this.refreshApperance(); },null);
			mallocItemView.addEventListener("contextmenu",function(pThis,pItem){
				var listview = this.getParent();
				if(listview){
					listview.onItemContextMenu(this.getItemData(),pItem);
				}
			},null);
			mallocItemView.addEventListener("mousedown",function(pThis,pEvent){
				var listview = this.getParent();
				if(listview){
					if(listview.getSelectedItem() != this.getItemData()){
						listview.setSelectedItem(this.getItemData());
						listview.onItemSelected(this.getItemData());
					}
				}
			},null);
			mallocItemView.addEventListener("namechanged",function(pThis,pNewName){
				var listview = this.getParent();
				if(listview){
					listview.onItemNameChanged(this.getItemData(),pNewName);
				}
			},null);
			this.addChildNodeAtLayer(mallocItemView,0);
		}
		if(!this._items[i].userProperty){
			this._items[i].userProperty = {};
		}
		this._items[i].userProperty.index = i;
		this._items[i].userProperty.view = mallocItemView;
		mallocItemView.initItemData(this._items[i]);
		if(this._items[i] == this.getSelectedItem()){
			mallocItemView.setItemSelected(true);
		}else{
			mallocItemView.setItemSelected(false);
		}
		accy+=this.getRowHeight();
	}
	this.removeChildNodeAtLayerFrom(0,this._items.length);
	this.setWidth(this.getMinLayoutWidth());
	this.setHeight(this.getMinLayoutHeight());
}