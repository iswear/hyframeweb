HY.GUI.TimeLineRule = function(config){
    this.extend(HY.GUI.View);
    this.initWithConfig(config);
}
HY.GUI.TimeLineRule.prototype = new HY.GUI.View();
HY.GUI.TimeLineRule.prototype.defaultHeight = 20;
HY.GUI.TimeLineRule.prototype.defaultBackgroundColor = "#FFFFFF";
HY.GUI.TimeLineRule.prototype.defaultClipBound = false;
HY.GUI.TimeLineRule.prototype.onPaint = function(pDc){
    this.superCall("onPaint",[pDc]);
    var accx = 0;
    pDc.strokeStyle = "#000000";
    pDc.font = "10px Arial";
    pDc.beginPath();
    pDc.moveTo(0,this.getHeight());
    pDc.lineTo(this.getWidth(),this.getHeight());
    for(var i=0;accx<=this.getWidth();++i){
        if(i%10==0){
            pDc.moveTo(accx+0.5,this.getHeight()-10);
            pDc.lineTo(accx+0.5,this.getHeight()-2);
            pDc.strokeText(i/10,accx,this.getHeight()*1/2);
        }else if(i%5 == 0){
            pDc.moveTo(accx+0.5,this.getHeight()-8);
            pDc.lineTo(accx+0.5,this.getHeight()-2);
        }else{
            pDc.moveTo(accx+0.5,this.getHeight()-6);
            pDc.lineTo(accx+0.5,this.getHeight()-2);
        }
        accx += 7;
    }
    pDc.stroke();
}
HY.GUI.TimeLineRule.prototype.setDuration = function(pDuration){
    this.setWidth(Math.round(7*(1+10*pDuration)));
}

HY.GUI.TimeLineView = function(config){
    this.extend(HY.GUI.View);
    this.initWithConfig(config);
}
HY.GUI.TimeLineView.prototype = new HY.GUI.View();
HY.GUI.TimeLineView.prototype.defaultHeight = 17;
HY.GUI.TimeLineView.prototype.defaultClipBound = false;
HY.GUI.TimeLineView.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
		if(config.normalColor){ this._normalColor = config.normalColor; } else { this._normalColor = null; }
		if(config.selectedColor){ this._selectedColor = config.selectedColor; } else { this._selectedColor = null; }
		if(config.selectedFrame){ this._selectedFrame = config.selectedFrame; } else { this._selectedFrame = -1; }
		if(config.selectedFrameChangedEvent){ this.addEventListener("selectedframechanged",config.selectedFrameChangedEvent.selector,config.selectedFrameChangedEvent.target); }

		this.setTimelineData(null);
    }
}
HY.GUI.TimeLineView.prototype.initTimeLineData = function(pData){
    if(pData){
        if(pData.name == undefined){ pData.name = "未命名"; }
		if(pData.selected == undefined){ pData.selected = false; }
		if(pData.keyFrames == undefined){ pData.keyFrames = []; }
		if(pData.contextMenu != undefined){ this.setContextMenu(pData.contextMenu); }
		if(!pData.userProperty){ pData.userProperty = {}; }
		if(pData.userProperty.index == undefined){ pData.userProperty.index = 0; }
		if(pData.userProperty.view == undefined){ pData.userProperty.view = this; }
		this.setTimelineData(pData);
		this.refreshApperance();
    }
}
HY.GUI.TimeLineView.prototype.getTimeLineData = function(){
	return this.getUserProperty("data");
}
HY.GUI.TimeLineView.prototype.setTimelineData = function(pData){
	this.setUserProperty("data",pData);
}
HY.GUI.TimeLineView.prototype.setNormalColor = function(pColor){
	this._normalColor = pColor;
}
HY.GUI.TimeLineView.prototype.setSelectedColor = function(pColor){
	this._selectedColor = pColor;
}
HY.GUI.TimeLineView.prototype.refreshApperance = function(){
	if(this.getItemSelected()){
		this.setBackgroundColor(this._selectedColor);
	}else{
		this.setBackgroundColor(this._normalColor);
	}
}
HY.GUI.TimeLineView.prototype.getName = function(){
	var itemdata = this.getTimeLineData();
	if(itemdata){
		return itemdata.name;
	}else{
		return null;
	}
}
HY.GUI.TimeLineView.prototype.setName = function(pName){
	var itemdata = this.getTimeLineData();
	if(itemdata){
		itemdata.name = pName;
	}
}
HY.GUI.TimeLineView.prototype.getItemSelected = function(){
	var itemdata = this.getTimeLineData();
	if(itemdata){
		return itemdata.selected;
	}else{
		return false;
	}
}
HY.GUI.TimeLineView.prototype.setItemSelected = function(pSelected){
	var itemdata = this.getTimeLineData();
	if(itemdata){
		itemdata.selected = pSelected;
	}
	this.refreshApperance();
}
HY.GUI.TimeLineView.prototype.getSelectedTime = function(){
	return this.getSelectedFrame()/10;
}
HY.GUI.TimeLineView.prototype.setSelectedTime = function(pTime){
	this.setSelectedFrame(pTime * 10);
}
HY.GUI.TimeLineView.prototype.getSelectedFrame = function(){
	return this._selectedFrame;
}
HY.GUI.TimeLineView.prototype.setSelectedFrame = function(pFrame){
	if(pFrame != this._selectedFrame){
		this._selectedFrame = pFrame;
		this.onSelectedFrameChange();
		this.reRender();
	}
}
HY.GUI.TimeLineView.prototype.setDuration = function(pDuration){
    this.setWidth(Math.round(7*(1+10*pDuration)));
}
HY.GUI.TimeLineView.prototype.isKeyFrame = function(pKeyFrame){
	var itemdata = this.getTimeLineData();
	if(itemdata && itemdata.keyFrames){
		var keyframes = itemdata.keyFrames;
		var keyframecount = keyframes.length;
		var i = 0;
		var time = pKeyFrame/10;
		for(; i<keyframecount ; ++i){
			if(keyframes[i].time == time){
				return true;
			}
		}
		return false;
	}else{
		return false;
	}
}
HY.GUI.TimeLineView.prototype.onSelectedFrameChange = function(){
	this.launchEvent("selectedframechanged",[this]);
}
HY.GUI.TimeLineView.prototype.onMouseDown = function(pEvent){
	var thisPos = this.transFromCanvasPoint(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
	var newframe = Math.floor(thisPos.x/7);
	this.setSelectedFrame(newframe);
    this.superCall("onMouseDown",[pEvent]);
}
HY.GUI.TimeLineView.prototype.onPaint = function(pDc){
	this.superCall("onPaint",[pDc]);
	var accx = 0;
	var curkeyindex = 0;
	var keyframes = null;
	var keyframescount = 0;
	var itemdata = this.getTimeLineData();
	if(itemdata && itemdata.keyFrames){
		keyframes = itemdata.keyFrames;
		keyframescount = keyframes.length;
	}
	pDc.strokeStyle = "#666666";
	pDc.beginPath();
	pDc.moveTo(0,this.getHeight());
	pDc.lineTo(this.getWidth(),this.getHeight());
	for(var i = 0;accx <= this.getWidth();++i){
		if(curkeyindex < keyframescount){
			if(keyframes[curkeyindex].time != undefined){
				var curframe = keyframes[curkeyindex].time * 10;
				if(i == curframe){
					pDc.fillStyle = "#000000";
					pDc.fillRect(accx,0,7,this.getHeight());
					curkeyindex++;
				}
			}
		}
		if(i == this._selectedFrame){
			pDc.globalAlpha = 0.7;
			pDc.fillStyle = "#FF0000";
			pDc.fillRect(accx,0,7,this.getHeight());
		}
		pDc.moveTo(accx+0.5,0);
		pDc.lineTo(accx+0.5,this.getHeight());
		accx+=7;
	}
	pDc.stroke();
	pDc.beginPath();
	for(var i=0;i<keyframescount;++i){
		if(keyframes[i].tween){
			if(i+1<keyframescount){
				var curframetime = keyframes[i].time;
				var nextframetime = keyframes[i+1].time;
				var startx = (curframetime*10+1) * 7 + 3;
				var endx = nextframetime * 70 - 3;
				var middley = this.getHeight()/2;
				if(startx < endx){
					pDc.moveTo(startx,middley-3);
					pDc.lineTo(startx+3,middley);
					pDc.lineTo(startx,middley+3);
					pDc.moveTo(startx+3,middley);
					pDc.lineTo(endx,middley);
					pDc.lineTo(endx-3,middley-3);
					pDc.moveTo(endx,middley);
					pDc.lineTo(endx-3,middley+3);
					pDc.globalAlpha = 1;
					pDc.strokeStyle = "#111111";
					pDc.lineWidth = 2.0;
				}
			}
		}
	}
	pDc.stroke();
}

HY.GUI.TimeLineListView = function(config){
    this.extend(HY.GUI.View);
    this.initWithConfig(config);
}
HY.GUI.TimeLineListView.prototype = new HY.GUI.View();
HY.GUI.TimeLineListView.prototype.defaultNormalItemColor = null;
HY.GUI.TimeLineListView.prototype.defaultSelectedItemColor = "#00FF00";
HY.GUI.TimeLineListView.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        this._timeLineRule = new HY.GUI.TimeLineRule({
            x:0,
            y:0,
            width:this.getWidth()
        });
        if(config.items){ this._items = config.items; } else { this._items=[]; }
		if(config.curFrame){ this._curFrame=config.curFrame; } else { this._curFrame = -1; }
		if(config.normalItemColor){ this._normalItemColor = config.normalItemColor; } else { this._normalItemColor = this.defaultNormalItemColor; }
		if(config.selectedItemColor){ this._selectedItemColor = config.selectedItemColor; } else { this._selectedItemColor = this.defaultSelectedItemColor; }

		if(config.itemSelectedEvent) { this.addEventListener("itemselected",config.itemSelectedEvent.selector,config.itemSelectedEvent.target); }
		if(config.itemContextMenuEvent) { this.addEventListener("itemcontextmenu",config.itemContextMenuEvent.selector,config.itemContextMenuEvent.target); }
		if(config.curFrameChangedEvent) { this.addEventListener("curframechanged",config.curFrameChangedEvent.selector,config.curFrameChangedEvent.target); }

		this.addChildNodeAtLayer(this._timeLineRule,1);

		this._selectedItem = null;
        this._mallocTimeLineView();
    }
}
HY.GUI.TimeLineListView.prototype.setWidth = function(pWidth){
	this.superCall("setWidth",[pWidth]);
	if(this._timeLineRule.getWidth() < pWidth){
		this._timeLineRule.setWidth(pWidth);
	}
	var layer = this.getLayerAtIndex(0);
	if(layer){
		var i = layer.length;
		for(;i>0;--i){
			if(layer[i-1].getWidth() < pWidth){
				layer[i-1].setWidth(pWidth);
			}
		}
	}
}
HY.GUI.TimeLineListView.prototype.setItems = function(pItems){
    this._items = pItems;
    this._mallocTimeLineView();
}
HY.GUI.TimeLineListView.prototype.getItems = function(){
	return this._items;
}
HY.GUI.TimeLineListView.prototype.addItem = function(pItem){
    this._items.push(pItem);
    this._mallocTimeLineView();
}
HY.GUI.TimeLineListView.prototype.addItemAt = function(pItem,pIndex){
    this._items.splice(pIndex,0,pItem);
    this._mallocTimeLineView();
}
HY.GUI.TimeLineListView.prototype.removeItem = function(pItem){
	var layer = this.getLayerAtIndex(0);
	if(layer){
		var i = layer.length;
		for(;i>0;--i){
			if(layer[i-1] == pItem){
				this.splice(i-1,1);
			}
		}
	}
    this._mallocTimeLineView();
}
HY.GUI.TimeLineListView.prototype.removeItemAt = function(pIndex){
    this.splice(pIndex,1);
    this._mallocTimeLineView();
}
HY.GUI.TimeLineListView.prototype.getSelectedItem = function(){
	return this._selectedItem;
}
HY.GUI.TimeLineListView.prototype.setSelectedItem = function(pItem){
	if(this._selectedItem && this._selectedItem != pItem){
		if(this._selectedItem.userProperty && this._selectedItem.userProperty.view){
			this._selectedItem.userProperty.view.setItemSelected(false);
			this._selectedItem.userProperty.view.setSelectedFrame(-1);
		}else{
			this._selectedItem.selected = false;
		}
	}
	if(pItem){
		this._selectedItem = pItem;
		if(this._selectedItem.userProperty && this._selectedItem.userProperty.view){
			this._selectedItem.userProperty.view.setItemSelected(true);
			this._selectedItem.userProperty.view.setSelectedFrame(this._curFrame);
		}else{
			this._selectedItem.selected = true;
		}
	}else{
		this._selectedItem = null;
	}
}
HY.GUI.TimeLineListView.prototype.getCurFrame = function(){
	return this._curFrame;
}
HY.GUI.TimeLineListView.prototype.setCurFrame = function(pFrame){
	if(this._curFrame != pFrame){
		this._curFrame = pFrame;
		this.onCurFrameChanged();
	}
	this._curFrame = pFrame;
}
HY.GUI.TimeLineListView.prototype.getNormalItemColor= function(){
	return this._normalItemColor;
}
HY.GUI.TimeLineListView.prototype.setNormalItemColor = function(pColor){
	this._normalItemColor = pColor;
}
HY.GUI.TimeLineListView.prototype.getSelectedItemColor = function(){
	return this._selectedItemColor;
}
HY.GUI.TimeLineListView.prototype.setSelectedItemColor = function(pColor){
	this._selectedItemColor = pColor;
}
HY.GUI.TimeLineListView.prototype.setDuration = function(pDuration){
	var layer = this.getLayerAtIndex(0);
	if(layer){
		var i = layer.length;
		for(;i>0;--i){
			layer[i-1].setDuration(pDuration);
		}
	}
}
HY.GUI.TimeLineListView.prototype.getMinLayoutWidth = function(){
	return this._timeLineRule.getWidth();
}
HY.GUI.TimeLineListView.prototype.getMinLayoutHeight = function(){
	return this._timeLineRule.getHeight() + (this._items)?((this._items.length+1)*17+10):27;
}
HY.GUI.TimeLineListView.prototype.onEnterFrame = function(pDeltatime){
    this.superCall("onEnterFrame",[pDeltatime]);
    this._timeLineRule.setY(-this.getY());
}
HY.GUI.TimeLineListView.prototype.onItemSelected = function(pItem){
	this.launchEvent("itemselected",[this,pItem]);
}
HY.GUI.TimeLineListView.prototype.onItemContextMenu = function(pItem,pMenuItem){
	this.launchEvent("itemcontextmenu",[this,pItem,pMenuItem]);
}
HY.GUI.TimeLineListView.prototype.onCurFrameChanged = function(){
	this.launchEvent("curframechanged",[this]);
}
HY.GUI.TimeLineListView.prototype._mallocTimeLineView = function(){
	var index=0,accy=20;
	var layer = this.getLayerAtIndex(0);
	var childNodesCount=0;
	if(layer){
		childNodesCount = layer.length;
	}
	var mallocedTimeLine = null;
	for( index = 0;index<this._items.length;++index){
		if(index < childNodesCount){
			mallocedTimeLine = layer[index];
			mallocedTimeLine.setX(0);
			mallocedTimeLine.setY(accy);
			mallocedTimeLine.setWidth(this._timeLineRule.getWidth());
			mallocedTimeLine.setVisible(true);
			mallocedTimeLine.setNormalColor(this.getNormalItemColor());
			mallocedTimeLine.setSelectedColor(this.getSelectedItemColor());
		}else{
			mallocedTimeLine = new HY.GUI.TimeLineView({
				x:0,
				y:accy,
				width:this._timeLineRule.getWidth(),
				normalColor:this.getNormalItemColor(),
				selectedColor:this.getSelectedItemColor()
			});
			mallocedTimeLine.addEventListener("mousedown",function(pThis,pEvent){
				var timelinelist = this.getParent();
				if(timelinelist){
					var itemdata = this.getTimeLineData();
					timelinelist.setCurFrame(this.getSelectedFrame());
					timelinelist.setSelectedItem(itemdata);
					timelinelist.onItemSelected(itemdata);
				}
			},null);
			mallocedTimeLine.addEventListener("contextmenu",function(pThis,pItem){
				var timelinelist = this.getParent();
				if(timelinelist){
					timelinelist.onItemContextMenu(this.getTimeLineData(),pItem);
				}
			},null);
			this.addChildNodeAtLayer(mallocedTimeLine,0);
		}
		mallocedTimeLine.initTimeLineData(this._items[index]);
		if(!this._items[index].userProperty){
			this._items[index].userProperty = {};
		}
		this._items[index].userProperty.index = index;
		this._items[index].userProperty.view = mallocedTimeLine;
		if(this._items[index] == this.getSelectedItem()){
			this.setSelectedItem(this._items[index]);
		}
		accy += mallocedTimeLine.getHeight();
	}
	if(layer){
		for(;index<childNodesCount;++index){
			layer[index].setVisible(false);
		}
	}
	this.setWidth(this.getMinLayoutWidth());
	this.setHeight(this.getMinLayoutHeight());
}