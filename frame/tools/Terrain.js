HY.Tools.Terrain = function(config){
	this.extend(HY.Game.Terrain);
	this.initWithConfig(config);
}
HY.Tools.Terrain.prototype = new HY.Game.Terrain();
HY.Tools.Terrain.prototype.defaultTerrainGrid = true;
HY.Tools.Terrain.prototype.defaultClipBound = true;
HY.Tools.Terrain.prototype.defaultWidth = 600;
HY.Tools.Terrain.prototype.defaultHeight = 500;
HY.Tools.Terrain.prototype.defaultMouseTrigger = true;
HY.Tools.Terrain.prototype.defaultResizeAble = true;
HY.Tools.Terrain.prototype.initWithConfig = function(config){
	if(config){
		this.superCall("initWithConfig",[config]);
	}
}
HY.Tools.Terrain.prototype.setBackgroundBush = function(pBush){
	if(!this._natureLayer){
		this._natureLayer = {};
	}
	this._natureLayer.backgroundBush = pBush;
    this.reRender();
}
HY.Tools.Terrain.prototype.addBlock = function(texture,row,col){
	if(!this._blockLayer){
		this._blockLayer = [];
	}
	if(!this._blockLayer.blocks){
		this._blockLayer.blocks = [];
	}
	var len = this._blockLayer.blocks.length;
	for(var i=0; i<len ; ++i){
		var curblock = this._blockLayer.blocks[i];
		if(curblock.src == texture.src
			&& curblock.srcX == texture.srcX
			&& curblock.srcY == texture.srcY
			&& curblock.srcWidth == texture.srcWidth
			&& curblock.srcHeight == texture.srcHeight){
			if(!curblock.coordinates){
				curblock.coordinates = [];
			}
			curblock.coordinates.push({row:row,col:col});
			return;
		}
	}
	var newblock = {texture:texture,coordinates:[]};
	newblock.coordinates.push({row:row,col:col});
	this._blockLayer.blocks.push(newblock);
    this.reRender();
}
HY.Tools.Terrain.prototype.addPath = function(pBush,pSmooth,pWidth,pSrcX,pSrcY,pDesX,pDesY){
	if(!this._natureLayer){
		this._natureLayer = {};
	}
	if(!this._natureLayer.paths){
		this._natureLayer.paths = [];
	}
	var len = this._natureLayer.paths.length;
	for(var i=0 ; i<len ; ++i){
		var curpath = this._natureLayer.paths[i];
		if(curpath.pathBush == pBush &&
			curpath.pathSmooth == pSmooth &&
			curpath.pathWidth == pWidth){
			if(!curpath.pathLines){
				curpath.pathLines = [];
			}
			curpath.pathLines.push({
				srcX:pSrcX,
				srcY:pSrcY,
				desX:pDesX,
				desY:pDesY
			});
            this.reRender();
			return;
		}
	}
	var newpath = {};
	newpath.pathBush = pBush;
	newpath.pathSmooth = pSmooth;
	newpath.pathWidth = pWidth;
	newpath.pathLines = [];
	newpath.pathLines.push({
		srcX:pSrcX,
		srcY:pSrcY,
		desX:pDesX,
		desY:pDesY
	});
	this._natureLayer.paths.push(newpath);
    this.reRender();
}