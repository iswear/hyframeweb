HY.GUI.SplitView = function(config){
	this.extend(HY.GUI.View);
	this.initWithConfig(config);
}
HY.GUI.SplitView.prototype = new HY.GUI.View();
HY.GUI.SplitView.prototype.defaultSplitDirection = 0;			//水平划分
HY.GUI.SplitView.prototype.defaultSplitSpace = 4;
HY.GUI.SplitView.prototype.defaultAdjustAble = true;
HY.GUI.SplitView.prototype.initWithConfig = function(config){
	if(config){
		this.superCall("initWithConfig",[config]);
		if(config.splitDirection != undefined){ this._splitDirection = config.splitDirection; } else { this._splitDirection = this.defaultSplitDirection; }
		if(config.splitSpace != undefined){ this._splitSpace = config.splitSpace; } else { this._splitSpace = this.defaultSplitSpace; }
		if(config.splitViews != undefined){ this._splitViews = config.splitViews; } else { this._splitViews = []; }
		if(config.adjustAble != undefined){ this._adjustAble = config.adjustAble; } else { this._adjustAble = this.defaultAdjustAble; }
		if(config.autoAdjustViewIndex != undefined){ this._autoAdjustViewIndex = config.autoAdjustViewIndex; } else { this._autoAdjustViewIndex = -1; }

		this._splitSpaceViews = [];
		this.setSplitViews(this._splitViews,config.splitParam,config.splitByPixel);
	}
}
HY.GUI.SplitView.prototype.getAutoAdjustViewIndex = function(){
	return this._autoAdjustViewIndex;
}
HY.GUI.SplitView.prototype.setAutoAdjustViewIndex = function(pIndex){
	this._autoAdjustViewIndex = pIndex;
}
HY.GUI.SplitView.prototype.getSplitViews = function(){
	return this._splitViews;
}
HY.GUI.SplitView.prototype.setSplitViews = function(pSplitViews,pSplitParam,pByPixel){
	if(pSplitViews.length > 1){
		this.removeChildNodeAtLayerFrom(0,0);
		var i;
		this._splitViews = pSplitViews;
		i = this._splitViews.length;
		for(;i>0;--i){
			this.addChildNodeAtLayer(this._splitViews[i-1],0);
		}
		this._splitSpaceViews = [];
		i = this._splitViews.length-1;
		for(;i>0;--i){
			var spaceview = new HY.GUI.View({
				mouseTrigger:true,
				dragAble:this._adjustAble,
				backgroundColor:'#AAAAAA',
				dragZone:{x:0,y:0,width:1000000,height:1000000}
			});
			this._splitSpaceViews.push(spaceview);
			this.addChildNodeAtLayer(spaceview,0);
			spaceview.addEventListener("drag",function(pThis){
				this.layoutSplitViews(null);
			},this);
			spaceview.addEventListener("mouseover", function (pThis,pEvent) {
				if(this._splitDirection == 0){
					var app = this.getApplication();
					if(app && app.getRenderCanvas()){
						app.getRenderCanvas().style.cursor = "ew-resize";
					}
				}else{
					var app = this.getApplication();
					if(app && app.getRenderCanvas()){
						app.getRenderCanvas().style.cursor = "ns-resize";
					}
				}
			},this);
			spaceview.addEventListener("mouseout",function(pThis,pEvent){
				var app = this.getApplication();
				if(app && app.getRenderCanvas()){
					app.getRenderCanvas().style.cursor = "default";
				}
			},this);
		}
		this.layoutSplitViews(pSplitParam,pByPixel);
	}else{
		window.console.log("splitview's count less than two,It was wrong");
	}
}
HY.GUI.SplitView.prototype.layoutSplitViews = function(pSplitParam,pByPixel){
	if(pSplitParam){
		if(this._splitDirection == 0){
			var factwidth = this.getWidth()-this._splitSpace*this._splitSpaceViews.length;
			var len = this._splitViews.length;
			for(var i=0;i<len;++i){
				var splitviewwidth
				if(pByPixel){
					splitviewwidth = pSplitParam[i];
				}else{
					splitviewwidth = factwidth*pSplitParam[i];
				}
				this._splitViews[i].setY(0);
				this._splitViews[i].setHeight(this.getHeight());
				if(i<len-1){
					this._splitViews[i].setWidth(splitviewwidth);

					this._splitSpaceViews[i].setLimitMinY(0);
					this._splitSpaceViews[i].setLimitMaxY(0);
					this._splitSpaceViews[i].setY(0);
					this._splitSpaceViews[i].setWidth(this._splitSpace);
					this._splitSpaceViews[i].setHeight(this.getHeight());
					if(i==0){
						this._splitViews[i].setX(0);
					}else{
						this._splitViews[i].setX(this._splitSpaceViews[i-1].getX()+this._splitSpaceViews[i-1].getWidth());
						this._splitSpaceViews[i-1].setLimitMaxX(this._splitViews[i].getX()+this._splitViews[i].getWidth()-this._splitSpace);
					}
					this._splitSpaceViews[i].setX(this._splitViews[i].getX()+this._splitViews[i].getWidth());
					this._splitSpaceViews[i].setLimitMinX(this._splitViews[i].getX());
				}else{
					this._splitViews[i].setX(this._splitSpaceViews[i-1].getX()+this._splitSpaceViews[i-1].getWidth());
					this._splitViews[i].setWidth(this.getWidth()-this._splitViews[i].getX());
					this._splitSpaceViews[i-1].setLimitMaxX(this._splitViews[i].getX()+this._splitViews[i].getWidth()-this._splitSpace);
				}
			}
		}else{
			var factheight = this.getHeight()-this._splitSpace*this._splitSpaceViews.length;
			var len = this._splitViews.length;
			for(var i=0;i<len;++i){
				var splitviewheight;
				if(pByPixel){
					splitviewheight = pSplitParam[i];
				}else{
					splitviewheight = factheight*pSplitParam[i];
				}
				this._splitViews[i].setX(0);
				this._splitViews[i].setWidth(this.getWidth());
				if(i<len-1){
					this._splitViews[i].setHeight(splitviewheight);

					this._splitSpaceViews[i].setLimitMinX(0);
					this._splitSpaceViews[i].setLimitMaxX(0);
					this._splitSpaceViews[i].setX(0);
					this._splitSpaceViews[i].setHeight(this._splitSpace);
					this._splitSpaceViews[i].setWidth(this.getWidth());
					if(i==0){
						this._splitViews[i].setY(0);
					}else{
						this._splitViews[i].setY(this._splitSpaceViews[i-1].getY()+this._splitSpaceViews[i-1].getHeight());
						this._splitSpaceViews[i-1].setLimitMaxY(this._splitViews[i].getY()+this._splitViews[i].getHeight()-this._splitSpace);
					}
					this._splitSpaceViews[i].setY(this._splitViews[i].getY()+this._splitViews[i].getHeight());
					this._splitSpaceViews[i].setLimitMinY(this._splitViews[i].getY());
				}else{
					this._splitViews[i].setY(this._splitSpaceViews[i-1].getY()+this._splitSpaceViews[i-1].getHeight());
					this._splitViews[i].setHeight(this.getHeight()-this._splitViews[i].getY());
					this._splitSpaceViews[i-1].setLimitMaxY(this._splitViews[i].getY()+this._splitViews[i].getHeight()-this._splitSpace);
				}
			}
		}
	}else{
		if(this._splitDirection == 0){		//水平划分
			var len = this._splitViews.length;
			for(var i=0;i<len;++i){
				if(i==0){
					this._splitViews[i].setX(0);
					this._splitViews[i].setWidth(this._splitSpaceViews[i].getX());
					this._splitSpaceViews[i].setLimitMinX(this._splitViews[i].getX());
				}else if(i==len-1){
					this._splitViews[i].setX(this._splitSpaceViews[i-1].getX()+this._splitSpaceViews[i-1].getWidth());
					this._splitViews[i].setWidth(this.getWidth()-this._splitViews[i].getX());
					this._splitSpaceViews[i-1].setLimitMaxX(this._splitViews[i].getX()+this._splitViews[i].getWidth()-this._splitSpaceViews[i-1].getWidth());
				}else{
					this._splitViews[i].setX(this._splitSpaceViews[i-1].getX()+this._splitSpaceViews[i-1].getWidth());
					this._splitViews[i].setWidth(this._splitSpaceViews[i].getX()-this._splitViews[i].getX());
					this._splitSpaceViews[i].setLimitMinX(this._splitViews[i].getX());
					this._splitSpaceViews[i-1].setLimitMaxX(this._splitViews[i].getX()+this._splitViews[i].getWidth()-this._splitSpaceViews[i-1].getWidth());
				}
			}
		}else{									//竖直划分
			var len = this._splitViews.length;
			for(var i=0;i<len;++i){
				if(i==0){
					this._splitViews[i].setY(0);
					this._splitViews[i].setHeight(this._splitSpaceViews[i].getY());
					this._splitSpaceViews[i].setLimitMinY(this._splitViews[i].getY());
				}else if(i==len-1){
					this._splitViews[i].setY(this._splitSpaceViews[i-1].getY()+this._splitSpaceViews[i-1].getHeight());
					this._splitViews[i].setHeight(this.getHeight()-this._splitViews[i].getY());
					this._splitSpaceViews[i-1].setLimitMaxY(this._splitViews[i].getY()+this._splitViews[i].getHeight()-this._splitSpaceViews[i-1].getHeight());
				}else{
					this._splitViews[i].setY(this._splitSpaceViews[i-1].getY()+this._splitSpaceViews[i-1].getHeight());
					this._splitViews[i].setHeight(this._splitSpaceViews[i].getY()-this._splitViews[i].getY());
					this._splitSpaceViews[i].setLimitMinY(this._splitViews[i].getY());
					this._splitSpaceViews[i-1].setLimitMaxY(this._splitViews[i].getY()+this._splitViews[i].getHeight()-this._splitSpaceViews[i-1].getHeight());
				}
			}
		}
	}
}
HY.GUI.SplitView.prototype.setWidth = function(pWidth){
	this.superCall("setWidth",[pWidth]);
	if(this._splitDirection == 0){
		var len = this._splitViews.length;
		if(this._autoAdjustViewIndex < 0 || this._autoAdjustViewIndex > len-1 ){
			this._splitSpaceViews[len-2].setLimitMaxX(this.getWidth()-this._splitSpaceViews[len-2].getWidth());
			this._splitViews[len-1].setWidth(this.getWidth()-this._splitViews[len-1].getX());
		}else{
			var i = len;
			for(;i>this._autoAdjustViewIndex+1;--i){
				this._splitSpaceViews[i-2].setLimitMinX(-1000000);
				this._splitSpaceViews[i-2].setLimitMaxX(1000000);
				if(i == len){
					this._splitSpaceViews[i-2].setX(this.getWidth()-this._splitViews[i-1].getWidth()-this._splitSpaceViews[i-2].getWidth(),true);
				}else{
					this._splitSpaceViews[i-2].setX(this._splitSpaceViews[i-1].getX()-this._splitViews[i-1].getWidth()-this._splitSpaceViews[i-2].getWidth(),true);
				}
			}
		}
		this.layoutSplitViews(null,null,false);
	}else{
		var len = this._splitViews.length;
		for(var i=0;i<len;++i){
			this._splitViews[i].setWidth(pWidth);
			if(i<len-1){
				this._splitSpaceViews[i].setWidth(pWidth);
			}
		}
	}
}
HY.GUI.SplitView.prototype.setHeight = function(pHeight){
	this.superCall("setHeight",[pHeight]);
	if(this._splitDirection == 0){
		var len = this._splitViews.length;
		for(var i=0;i<len;++i){
			this._splitViews[i].setHeight(pHeight);
			if(i<len-1){
				this._splitSpaceViews[i].setHeight(pHeight);
			}
		}
	}else{
		var len = this._splitViews.length;
		if(this._autoAdjustViewIndex < 0 || this._autoAdjustViewIndex > len-1 ){
			this._splitSpaceViews[len-2].setLimitMaxY(this.getHeight()-this._splitSpaceViews[len-2].getHeight());
			this._splitViews[len-1].setHeight(this.getHeight()-this._splitViews[len-1].getY());
		}else{
			var i = len;
			for(;i>this._autoAdjustViewIndex+1;--i){
				this._splitSpaceViews[i-2].setLimitMinY(-1000000);
				this._splitSpaceViews[i-2].setLimitMaxY(1000000);
				if(i == len){
					this._splitSpaceViews[i-2].setY(this.getHeight()-this._splitViews[i-1].getHeight()-this._splitSpaceViews[i-2].getHeight(),true);
				}else{
					this._splitSpaceViews[i-2].setY(this._splitSpaceViews[i-1].getY()-this._splitViews[i-1].getHeight()-this._splitSpaceViews[i-2].getHeight(),true);
				}
			}
		}
		this.layoutSplitViews(null,null,false);
	}
}
