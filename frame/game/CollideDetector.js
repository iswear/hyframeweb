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

HY.Game.CollideDetector.prototype.getRangeOfByPolygon = function(pPolygon){
    var minx,maxx,miny,maxy,point;
    var points = pPolygon;
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
}
HY.Game.CollideDetector.prototype.addDetectingObject = function(pObject){
    this._detectingObjects.push(pObject);
}
HY.Game.CollideDetector.prototype.getDetectingObjects = function(){
    return this._detectingObjects;
}
HY.Game.CollideDetector.prototype.removeDetectingObject = function(pObject){
    for(var i=this._detectingObjects.length-1;i>=0;--i){
        if(this._detectingObjects[i] == pObject){
            this._detectingObjects.splice(i,1);
            return;
        }
    }
}
HY.Game.CollideDetector.prototype.removeAllDetectingObjects = function(){
    this._detectingObjects.splice(0,this._detectingObjects.length);
}

HY.Game.CollideDetector.prototype.addCollidedCouple = function(pObject1,pObject2){
    var couple = [pObject1,pObject2,1];
    this._collidedCouples.push(couple);
}
HY.Game.CollideDetector.prototype.getCollidedCouples = function(){
    return this._collidedCouples;
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
HY.Game.CollideDetector.prototype.removeAllCollidedCouple = function(){
    this._collidedCouples.splice(0,this._collidedCouples.length);
}
HY.Game.CollideDetector.prototype.collidedCoupleExistAtRange = function(pObject1,pObject2,pStartIndex,pLength){
    var i = this._collidedCouples.length;
    if(i > pLength){ i = pLength; }
    for(--i;i>=pStartIndex;--i){
        var collidedCouple = this._collidedCouples[i];
        if((pObject1 == collidedCouple[0] && pObject2 == collidedCouple[1]) || (pObject1 == collidedCouple[1] && pObject2 == collidedCouple[0])){
            return true;
        }
    }
    return false;
}
HY.Game.CollideDetector.prototype.collidedCoupleIndexAtRange = function(pObject1,pObject2,pStartIndex,pLength){
    var i = this._collidedCouples.length;
    if(i > pLength){ i = pLength; }
    for(--i;i>=pStartIndex;--i){
        var collidedCouple = this._collidedCouples[i];
        if((pObject1 == collidedCouple[0] && pObject2 == collidedCouple[1]) || (pObject1 == collidedCouple[1] && pObject2 == collidedCouple[0])){
            return i;
        }
    }
    return -1;
}
HY.Game.CollideDetector.prototype.checkCollide = function(pPolygon1,pPolygon2){
    if(pPolygon1 && pPolygon2){
        var points1 = pPolygon1;
        var points2 = pPolygon2;
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