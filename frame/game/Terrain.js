HY.Game.Terrain = function(config){
	this.extend(HY.Game.Node);
	this.initWithConfig(config);
}
HY.Game.Terrain.prototype = new HY.Game.Node();
HY.Game.Terrain.prototype.defaultAnchorPointX = 0;
HY.Game.Terrain.prototype.defaultAnchorPointY = 0;
HY.Game.Terrain.prototype.defaultBlockWidth = 60;
HY.Game.Terrain.prototype.defaultBlockHeight = 40;
HY.Game.Terrain.prototype.defaultBlockColNum = 10;
HY.Game.Terrain.prototype.defaultBlockRowNum = 10;
HY.Game.Terrain.prototype.defaultTerrainGrid = false;
HY.Game.Terrain.prototype.initWithConfig = function(config){
	if(config){
		this.superCall("initWithConfig",[config]);
		this._blockWidth = this.defaultBlockWidth;
		this._blockHeight = this.defaultBlockHeight;
		this._natureLayer = [];
		this._blockLayer = [];
        this._leader = null;
        this._leaderMove = true;
        this._leaderTeam = [];
        this._recalculateObjects = [];

        this._collideCouplePreNum = 0;
        this._collideDetector = new HY.Game.CollideDetector({});
	}
}
HY.Game.Terrain.prototype.getBlockWidth = function(){
	return this._blockWidth;
}
HY.Game.Terrain.prototype.setBlockWidth = function(pWidth){
	this._blockWidth=pWidth;
	this.reRender();
}
HY.Game.Terrain.prototype.getBlockHeight = function(){
	return this._blockHeight;
}
HY.Game.Terrain.prototype.setBlockHeight = function(pHeight){
	this._blockHeight = pHeight;
	this.reRender();
}
HY.Game.Terrain.prototype.transFromXYToRowCol = function(pPoint){
	var col = Math.floor(pPoint.y/this._blockHeight+pPoint.x/this._blockWidth);
	var row = Math.floor(pPoint.y/this._blockHeight-pPoint.x/this._blockWidth);
	return {row:row,col:col};
}
/*第一层地表以及路径绘制*/
/*第二层*/
HY.Game.Terrain.prototype.getChildOrnaments = function(){
	var layers = this.getLayers();
	if(layers.length > 0){
		return layers[0];
	}else{
		return null;
	}
}
HY.Game.Terrain.prototype.addChildOrnament = function(pOrnament){
	this.addChildNodeAtLayer(pOrnament,0);
}
HY.Game.Terrain.prototype.addChildOrnamentAtIndex = function(pOrnament,pIndex){
	this.addChildNodeAtLayersIndex(pOrnament,0,pIndex);
}
HY.Game.Terrain.prototype.removeChildOrnament = function(pOrnament){
	this.removeChildNodeAtLayer(pOrnament,0);
}
HY.Game.Terrain.prototype.removeChildOrnamentAt = function(pIndex){
	this.removeChildNodeAtLayersIndex(0,pIndex);
}
HY.Game.Terrain.prototype.removeAllChildOrnaments = function(){
	var layers = this.getLayers();
	if(layers.length > 0){
		var layer = layers[0];
		if(layer){
			var j = layer.length-1;
			for(;j>=0;--j){
				this.removeChildNodeAtLayersIndex(0,j);
			}
		}
	}
}
/*第三层*/
HY.Game.Terrain.prototype.getChildObjects = function(){
	var layers = this.getLayers();
	if(layers.length > 1){
		return this._childNodeLayers[1];
	}else {
		return null;
	}
}
HY.Game.Terrain.prototype.addChildObject = function(pObject){
	this.addChildNodeAtLayer(pObject,1);
    pObject.addEventListener("positionchanged",function(pThis){
        this._recalculateObjects.push(pThis);
        this.reRender();
    },this);
    pObject.addEventListener("enterframe",function(pThis,pDeltatime){
        if(pThis.getCollidedAble()){
            var localPolygon = pThis.getLocalCollidedPolygon();
            if(localPolygon && localPolygon.length > 0){
                var detectorPolygon = [];
                var len = localPolygon.length;
                for(var i=0;i<len;++i){
                    var detectorpoint = pThis.transToExtParentPoint(this,localPolygon[i]);
                    detectorPolygon.push(detectorpoint);
                }
                pThis.setDetectorCollidedPolygon(detectorPolygon);
                var detectorRange = this._collideDetector.getRangeOfByPolygon(detectorPolygon);
                pThis.setCollidedRange(detectorRange);
                var detectingObjects = this._collideDetector.getDetectingObjects();
                var collidedCouples = this._collideDetector.getCollidedCouples();
                for(var i=detectingObjects.length-1;i>=0;--i){
                    var detectingObject = detectingObjects[i];
                    var detectingObjectRange = detectingObject.getCollidedRange();
                    if(!(detectorRange.minX > detectingObjectRange.maxX || detectorRange.maxX < detectingObjectRange.minX || detectorRange.minY > detectingObjectRange.maxY || detectorRange.maxY < detectingObjectRange.minY)){
                        var collided = this._collideDetector.checkCollide(detectorPolygon,detectingObject.getDetectorCollidedPolygon());
                        if(collided){
                            var index = this._collideDetector.collidedCoupleIndexAtRange(pThis,detectingObject,0,this._collideCouplePreNum);
                            if(index == -1){
                                this._collideDetector.addCollidedCouple(pThis,detectingObject);
                                pThis.onEnterCollided(detectingObject);
                                detectingObject.onEnterCollided(pThis);
                            }else{
                                var collidedCouple = this._collideDetector.getCollidedCouples()[index];
                                collidedCouple[2] = 1;
                            }
                        }
                    }
                }
                this._collideDetector.addDetectingObject(pThis);
            }
        }
        //if(this._leaderMove){
        //    if(pThis != this.getLeader()){
        //        var deltax = this.getLeader().getX()-pThis.getX();
        //        var deltay = this.getLeader().getY()-pThis.getY();
        //        if(deltax*deltax+deltay*deltay < 10000){
        //            if(!pThis.getUserProperty("leadnear")){
        //                alert("客官里面请！");
        //                pThis.setUserProperty("leadnear",true);
        //            }
        //        }else{
        //            if(pThis.getUserProperty("leadnear")){
        //                alert("哎，客官慢走呀!");
        //                pThis.setUserProperty("leadnear",false);
        //            }
        //        }
        //    }
        //}
    },this);
    this._recalculateObjects.push(pObject);
}
HY.Game.Terrain.prototype.addChildObjectAtIndex = function(pObject,pIndex){
	this.addChildNodeAtLayersIndex(pObject,1,pIndex);
    pObject.addEventListener("positionchanged",function(pThis){
        this._recalculateObjects.push(pThis);
        this.reRender();
    },this);
    pObject.addEventListener("enterframe",function(pThis,pDeltaTime){
        if(pThis.getCollidedAble()){
            var localPolygon = pThis.getLocalCollidedPolygon();
            if(localPolygon && localPolygon.length > 0){
                var detectorPolygon = [];
                var len = localPolygon.length;
                for(var i=0;i<len;++i){
                    var detectorpoint = pThis.transToExtParentPoint(this,localPolygon[i]);
                    detectorPolygon.push(detectorpoint);
                }
                pThis.setDetectorCollidedPolygon(detectorPolygon);
                var detectorPolygon = pThis.getDetectorCollidedPolygon();
                var detectorRange = this._collideDetector.getRangeOfByPolygon(detectorPolygon);
                pThis.setCollidedRange(detectorRange);
                var detectingObjects = this._collideDetector.getDetectingObjects();
                var collidedCouples = this._collideDetector.getCollidedCouples();
                for(var i=detectingObjects.length-1;i>=0;--i){
                    var detectingObject = detectingObjects[i];
                    var detectingObjectRange = detectingObject.getCollidedRange();
                    if(!(detectorRange.minX > detectingObjectRange.maxX || detectorRange.maxX < detectingObjectRange.minX || detectorRange.minY > detectingObjectRange.maxY || detectorRange.maxY < detectingObjectRange.minY)){
                        var collided = this._collideDetector.checkCollide(detectorPolygon,detectingObject.getDetectorCollidedPolygon());
                        if(collided){
                            var index = this._collideDetector.collidedCoupleIndexAtRange(pThis,detectingObject,0,this._collideCouplePreNum);
                            if(index == -1){
                                this._collideDetector.addCollidedCouple(pThis,detectingObject);
                                pThis.onEnterCollided(detectingObject);
                                detectingObject.onEnterCollided(pThis);
                            }else{
                                var collidedCouple = this._collideDetector.getCollidedCouples()[index];
                                collidedCouple[2] = 1;
                            }
                        }
                    }
                }
                this._collideDetector.addDetectingObject(pThis);
            }
        }
        //if(this._leaderMove){
        //    if(pThis != this.getLeader()){
        //        var deltax = this.getLeader().getX()-pThis.getX();
        //        var deltay = this.getLeader().getY()-pThis.getY();
        //        if(deltax*deltax+deltay*deltay < 40000){
        //            if(!pThis.getUserProperty("leadnear")){
        //                alert("客官里面请！");
        //                pThis.setUserProperty("leadnear",true);
        //            }
        //        }else{
        //            if(pThis.getUserProperty("leadnear")){
        //                alert("哎，客官慢走呀!");
        //                pThis.setUserProperty("leadnear",false);
        //            }
        //        }
        //    }
        //}
    },this);
    this._recalculateObjects.push(pObject);
}
HY.Game.Terrain.prototype.removeChildObject = function(pObject){
	this.removeChildNodeAtLayer(pObject,1);
}
HY.Game.Terrain.prototype.removeChildObjectAt = function(pIndex){
	this.removeChildNodeAtLayersIndex(1,pIndex);
}
HY.Game.Terrain.prototype.removeAllChildObjects = function(){
	var layers = this.getLayers();
	if(layers.length > 1){
		var layer = layers[1];
		if(layer){
			var j = layer.length-1;
			for(;j>=0;--j){
				this.removeChildNodeAtLayersIndex(1,j);
			}
		}
	}
}
HY.Game.Terrain.prototype._childObjectsSort = function(pObjects,pStartIndex,pEndIndex){
    if(pStartIndex < pEndIndex){
        var middleIndex = Math.floor((pStartIndex+pEndIndex)/2);
        var keyObject = pObjects[middleIndex];
        var startIndex = pStartIndex;
        var endIndex = pEndIndex;
        while(startIndex < endIndex){
            while(startIndex < endIndex && (pObjects[startIndex].getUserProperty("row") < keyObject.getUserProperty("row") || pObjects[startIndex].getUserProperty("col") < keyObject.getUserProperty("col"))){
                ++startIndex;
            }
            pObjects[middleIndex] = pObjects[startIndex];
            middleIndex = startIndex;
            while(startIndex < endIndex && (pObjects[endIndex].getUserProperty("row") >= keyObject.getUserProperty("row") || pObjects[endIndex].getUserProperty("col") >= keyObject.getUserProperty("col"))){
                --endIndex;
            }
            pObjects[middleIndex] = pObjects[endIndex];
            middleIndex = endIndex;
        }
        pObjects[middleIndex] = keyObject;
        this._childObjectsSort(pObjects,pStartIndex,middleIndex-1);
        this._childObjectsSort(pObjects,middleIndex+1,pEndIndex);
    }
}
HY.Game.Terrain.prototype.childObjectsSort = function(){
    var objects = this.getLayerAtIndex(1);
    this._childObjectsSort(objects,0,objects.length-1);
}
/*主角队伍设计*/
HY.Game.Terrain.prototype.setLeader = function(pLeader){
    if(this._leader != pLeader){
        this._leader = pLeader;
        this._leader.addEventListener("positionchanged",function(pThis,pDeltatime){
            this._leaderMove = true;
        },this);
    }
}
HY.Game.Terrain.prototype.getLeader = function(){
    return this._leader;
}
HY.Game.Terrain.prototype.addMemToLeaderTeam = function(){

}
HY.Game.Terrain.prototype.removeMemToLeaderTeam = function(){

}
HY.Game.Terrain.prototype.getJsonData = function(){

}
HY.Game.Terrain.prototype.loadJsonData = function(pJson){
	if(pJson.terrain){
		if(pJson.terrain.blockWidth){ this._blockWidth = pJson.terrain.blockWidth; } else { this._blockWidth = this.defaultBlockWidth; }
		if(pJson.terrain.blockHeight){ this._blockHeight = pJson.terrain.blockHeight; } else { this._blockHeight = this.defaultBlockHeight; }
		if(pJson.terrain.natureLayer != undefined){ this._natureLayer = pJson.terrain.natureLayer; } else { this._natureLayer = []; }
		if(pJson.terrain.blockLayer != undefined){ this._blockLayer = pJson.terrain.blockLayer; } else { this._blockLayer = []; }
		if(pJson.terrain.ornamentLayer != undefined){
			if(pJson.terrain.ornamentLayer.ornaments){
				var len = pJson.terrain.ornamentLayer.ornaments.length;
				for(var i=0;i<len;++i){
					var ornament = HY.Game.Factory.createAssemble(pJson.terrain.ornamentLayer.ornaments[i]);
					this.addChildOrnament(ornament);
				}
			}
		}
		if(pJson.terrain.objectLayer != undefined){
			if(pJson.terrain.objectLayer.objects){
				var len = pJson.terrain.objectLayer.objects.length;
				for(var i = 0; i<len ; ++i){
					var object = HY.Game.Factory.createAssemble(pJson.terrain.objectLayer.objects[i]);
					this.addChildObject(object);
				}
			}
		}
	}
}
HY.Game.Terrain.prototype.onEnterFrame = function(pDeltaTime){
    this.superCall("onEnterFrame",[pDeltaTime]);
    if(this._leaderMove){
        this._leaderMove = false;
    }
    var i = this._recalculateObjects.length-1;
    if(i >= 0){
        for(;i>=0;--i){
            var objectx = this._recalculateObjects[i].getX();
            var objecty = this._recalculateObjects[i].getY();
            var row = objecty/this._blockHeight-objectx/this._blockWidth;
            var col = objecty/this._blockHeight+objectx/this._blockWidth;
            this._recalculateObjects[i].setUserProperty("row",row);
            this._recalculateObjects[i].setUserProperty("col",col);
        }
        this._recalculateObjects.splice(0,this._recalculateObjects.length-1);
        this.childObjectsSort();
    }
}
HY.Game.Terrain.prototype.onEndFrame = function(pDeltaTime){
    this.superCall("onEndFrame",[pDeltaTime]);
    var collidedCouples = this._collideDetector.getCollidedCouples();
    for(var i=this._collideCouplePreNum-1;i>=0;--i){
        var collidedCouple = collidedCouples[i];
        if(collidedCouple[2] == 0){
            collidedCouple[0].onOutCollided(collidedCouple[1]);
            collidedCouple[1].onOutCollided(collidedCouple[0]);
            collidedCouples.splice(i,1);
        }else{
            collidedCouple[2] = 0;
        }
    }
    this._collideCouplePreNum = collidedCouples.length;
    this._collideDetector.removeAllDetectingObjects();
}
HY.Game.Terrain.prototype.onPaint = function(pDc){
	this.superCall("onPaint",[pDc]);
	//绘制自然地形
	var app = this.getApplication();
	var resourceManage = app.getResourceManager();
	if(this._natureLayer){
		if(this._natureLayer.backgroundBush && this._natureLayer.backgroundBush.length>0){
			var image = resourceManage.getResDataByURL(this._natureLayer.backgroundBush);
			var pattern = pDc.createPattern(image,"repeat");
			pDc.fillStyle = pattern;
			pDc.fillRect((-this.getAnchorPointX()*this.getWidth()),(-this.getAnchorPointY()*this.getHeight()),this.getWidth(),this.getHeight());
		}
		if(this._natureLayer.paths){
			var len = this._natureLayer.paths.length;
			for(var i=0; i<len ; ++i){
				var curpath = this._natureLayer.paths[i];
				if(curpath.pathBush && curpath.pathBush.length > 0){
					var linelen = curpath.pathLines.length;
					if(linelen > 0){
						pDc.beginPath();
						for(var j=0; j<linelen ; ++j){
							var curline = curpath.pathLines[j];
							pDc.moveTo(curline.srcX,curline.srcY);
							pDc.lineTo(curline.desX,curline.desY);
						}
						var image = resourceManage.getResDataByURL(curpath.pathBush);
						var pattern = pDc.createPattern(image,"repeat");
						pDc.strokeStyle = pattern;
						if(curpath.pathSmooth){
							pDc.lineCap = "round";
							var tempalpha = pDc.globalAlpha;
							for(var k = 0;k<5;k++){
								pDc.lineWidth = curpath.pathWidth+100-9.375*k;
								pDc.globalAlpha = 1/(5-k+1);
								pDc.stroke();
							}
							pDc.globalAlpha = tempalpha;
						}else{
							pDc.lineWidth = curpath.pathWidth;
							pDc.stroke();
						}
					}
				}
			}
		}
	}
	//绘制区块地图
	if(this._blockLayer && this._blockLayer.blocks){
		var i = this._blockLayer.blocks.length;
		for(;i>0;--i){
			var curblock = this._blockLayer.blocks[i-1];
			if(curblock.texture && curblock.coordinates && curblock.texture.src && curblock.coordinates.length > 0){
				var image = resourceManage.getResDataByURL(curblock.texture.src);
				if(image){
					var btSrcX = curblock.texture.srcX?curblock.texture.srcX:0;
					var btSrcY = curblock.texture.srcY?curblock.texture.srcY:0;
					var btSrcWidth = (curblock.texture.srcWidth && curblock.texture.srcWidth > 0)?curblock.texture.srcWidth:image.width;
					var btSrcHeight = (curblock.texture.srcHeight && curblock.texture.srcHeight > 0)?curblock.texture.srcHeight:image.height;
					var coor = curblock.coordinates;
					var j = coor.length;
					for(;j>0;--j){
						var curcoor = coor[j-1];
						var desX = (curcoor.col-curcoor.row-1)*this._blockWidth/2;
						var desY = (curcoor.col+curcoor.row)*this._blockHeight/2;
						pDc.drawImage(image,btSrcX,btSrcY,btSrcWidth,btSrcHeight,desX,desY,this._blockWidth,this._blockHeight);
					}
				}
			}
		}
	}
}


