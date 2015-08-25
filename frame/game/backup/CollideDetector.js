HY.Game.CollideDetector = function(config){
    this.extend(HY.Object);
    this.initWithConfig(config);
}
HY.Game.CollideDetector.prototype = new HY.Object();
HY.Game.CollideDetector.prototype.defaultMeshSize = 100;
HY.Game.CollideDetector.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.meshSize){ this._meshSize = config.meshSize; } else { this._meshSize = this.defaultMeshSize; }
        this._detectingObjects = [];
        this._collidedCouples = [];
    }
}

HY.Game.CollideDetector.prototype.getRangeOfRowColByPolygon = function(pPolygon){
    var minx,maxx,miny,maxy,point;
    var points = pPolygon.getPoints();
    var len = points.length;
    var point = points[0];
    var minx = point.x;
    var maxx = minx;
    var miny = point.y;
    var maxy = miny;
    for(var i=1;i<len;++i){
        var point = points[i];
        if(point.x < minx){ minx = point.x; }
        if(point.x > maxx){ maxx = point.x; }
        if(point.y < miny){ miny = point.y; }
        if(point.y > maxy){ maxy = point.y; }
    }
    return {minX:minx,maxX:maxx,minY:miny,maxY:maxy};
    /*
    var minrow = Math.floor(minx/this._meshSize);
    var maxrow = Math.floor(maxx/this._meshSize);
    var mincol = Math.floor(miny/this._meshSize);
    var maxcol = Math.floor(maxy/this._meshSize);
    return {minrow:minrow,maxrow:maxrow,mincol:mincol,maxcol:maxcol};
    */
}

//HY.Game.CollideDetector.prototype.getDetectingObjectsAtRowCol = function(pRow,pCol){
//    if(this._detectingObjects[pRow] && this._detectingObjects[pRow][pCol]){
//        return this._detectingObjects[pRow][pCol];
//    }else{
//        return null;
//    }
//}
//HY.Game.CollideDetector.prototype.addDetectingObjectByPolygon = function(pObject,pPolygon){
//    var minx,maxx,miny,maxy,point;
//    var points = pPolygon.getPoints();
//    var len = points.length;
//    var point = points[0];
//    var minx = point.x;
//    var maxx = minx;
//    var miny = point.y;
//    var maxy = miny;
//    for(var i=1;i<len;++i){
//        var point = points[i];
//        if(point.x < minx){ minx = point.x; }
//        if(point.x > maxx){ maxx = point.x; }
//        if(point.y < miny){ miny = point.y; }
//        if(point.y > maxy){ maxy = point.y; }
//    }
//    var minrow = Math.floor(minx/this._meshSize);
//    var maxrow = Math.ceil(maxx/this._meshSize);
//    var mincol = Math.floor(miny/this._meshSize);
//    var maxcol = Math.ceil(maxy/this._meshSize);
//    for(var i=minrow;i<=maxrow;++i){
//        for(var j=mincol;j<=maxcol;++j){
//            this.addDetectingObjectToRowCol(pObject,i,j);
//        }
//    }
//}
//HY.Game.CollideDetector.prototype.addDetectingObjectToRowCol = function(pObject,pRow,pCol){
//    if(!this._detectingObjects[pRow]){
//        this._detectingObjects[pRow] = [];
//    }
//    if(!this._detectingObjects[pRow][pCol]){
//        this._detectingObjects[pRow][pCol] = [];
//    }
//    this._detectingObjects[pRow][pCol].push(pObject);
//}
HY.Game.CollideDetector.prototype.removeDetectingObject = function(pObject){
    for(var i=this._detectingObjects.length-1;i>=0;--i){
        var detectingRow = this._detectingObjects[i];
        if(detectingRow){
            for(var j=detectingRow.length-1;j>=0;--j){
                var detectingCol = detectingRow[j];
                if(detectingCol){
                    for(var k=detectingCol.length-1;k>=0;--k){
                        if(detectingCol[k] == pObject){
                            detectingCol.splice(k,1);
                        }
                    }
                }
            }
        }
    }
}
HY.Game.CollideDetector.prototype.clearAllDetectingObjects = function(){
    for(var i=this._detectingObjects.length-1;i>=0;--i){
        var detectingRow = this._detectingObjects[i];
        if(detectingRow){
            for(var j=detectingRow.length-1;j>=0;--j){
                var detectingCol = detectingRow[j];
                if(detectingCol){
                    detectingCol.splice(0,detectingCol.length);
                }
            }
        }
    }
}

HY.Game.CollideDetector.prototype.addCollidedCouple = function(pObject1,pObject2){
    var couple = [pObject1,pObject2];
    this._collidedCouples.push(couple);
}
HY.Game.CollideDetector.prototype.removeCollidedCouple = function(pObject1,pObject2){
    for(var i=this._collidedCouples.length-1; i>=0 ;--i){
        var collidedCouple = this._collidedCouples[i];
        if((pObject1 == collidedCouple[0] && pObject2 == collidedCouple[1]) || (pObject1 == collidedCouple[1] && pObject2 == collidedCouple[0])){
            this._collidedCouples.splice(i,1);
        }
    }
}
HY.Game.CollideDetector.prototype.removeCollidedCoupleWithObject = function(pObject){
    for(var i=this._collidedCouples.length-1;i>=0;--i){
        var collidedCouple = this._collidedCouples[i];
        if(pObject == collidedCouple[0] || pObject == collidedCouple[1]){
            this._collidedCouples.splice(i,1);
        }
    }
}
HY.Game.CollideDetector.prototype.clearAllCollidedCouple = function(){
    this._collidedCouples.splice(0,this._collidedCouples.length);
}
HY.Game.CollideDetector.prototype.collidedCoupleExistAtRange = function(pObject1,pObject2,pStartIndex,pEndIndex){
    var i = this._collidedCouples.length-1;
    if(i > pEndIndex){ i = pEndIndex; }
    for(;i>=pStartIndex;--i){
        var collidedCouple = this._collidedCouples[i];
        if((pObject1 == collidedCouple[0] && pObject2 == collidedCouple[1]) || (pObject1 == collidedCouple[1] && pObject2 == collidedCouple[0])){
            return true;
        }
    }
    return false;
}
HY.Game.CollideDetector.prototype.checkCollide = function(pPolygon1,pPolygon2){
    if(pPolygon1 && pPolygon2){
        var points1 = pPolygon1.getPoints();
        var points2 = pPolygon2.getPoints();
        var len1 = points1.length;
        var len2 = points2.length;
        if(len1<=1 || len2<=1){
            return false;
        }else{
            var i,j;
            for(i=0;i<len1;++i){
                var linepoint1,linepoint2;
                linepoint1 = points1[i];
                if(i==len1-1){
                    linepoint2 = points1[0];
                }else{
                    linepoint2 = points1[i+1];
                }
                for(j=0;j<len2;++j){
                    if(this.pointProjectionInLineSegment(linepoint1,linepoint2,points2[j])){
                        break;
                    }
                }
                if(j==len2){
                    return true;
                }
            }
            for(var i=0;i<len2;++i){
                var linepoint1,linepoint2;
                linepoint1 = points2[i];
                if(i==len2-1){
                    linepoint2 = points2[0];
                }else{
                    linepoint2 = points2[i+1];
                }
                for(j=0;j<len1;++j){
                    if(this.pointProjectionInLineSegment(linepoint1,linepoint2,points1[j])){
                        break;
                    }
                }
                if(j==len1){
                    return true;
                }
            }
            return false;
        }
    }else{
        return false;
    }
}
HY.Game.CollideDetector.prototype.pointProjectionInLineSegment = function(pLinePoint1,pLinePoint2,pPoint){
    var vect1 = {};
    var vect2 = {};
    vect1.x = pLinePoint1.x - pLinePoint2.x;
    vect1.y = pLinePoint1.y - pLinePoint2.y;
    vect2.x = pLinePoint1.x - pPoint.x;
    vect2.y = pLinePoint1.y - pPoint.y;
    if(vect1.x * vect2.x + vect1.y * vect2.y <= 0){
        vect2.x = pPoint.x - pLinePoint2.x;
        vect2.y = pPoint.y - pLinePoint2.y;
        if(vect1.x * vect2.x + vect1.y * vect2.y <= 0){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}