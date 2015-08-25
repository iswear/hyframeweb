/********************************action manager***************************************/
HY.Core.Action = {};
HY.Core.Action.Status = {};
HY.Core.Action.Status.FINISH = 1;
HY.Core.Action.Status.UNFINISH = 0;

HY.Core.Action.DELMode = {};
HY.Core.Action.DELMode.DELNONE = 0;
HY.Core.Action.DELMode.DELTHIS = 1;
HY.Core.Action.DELMode.DELALL = 2;
HY.Core.Action.DELMode.DELSAMETYPE = 3;
HY.Core.Action.DELMode.DELDIFFTYPE = 4;

HY.Core.Action.Manager = function(config){
    this.extend(HY.Object);
    this.initWithConfig(config);
}
HY.Core.Action.Manager.prototype = new HY.Object();
HY.Core.Action.Manager.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        this.actionLinkList = [];
    }
}
HY.Core.Action.Manager.prototype.addActionLink = function(pSprite,pAction,pDelMode,pDelChild){
    if(pDelMode != undefined){
		switch (pDelMode){
			case HY.Core.Action.DELMode.DELNONE:
			{
				break;
			}
			case HY.Core.Action.DELMode.DELALL:
			{
				this.removeAllActionInSprite(pSprite,pDelChild);
				break;
			}
			case HY.Core.Action.DELMode.DELTHIS:
			{
				this.removeActionInSprite(pSprite,pAction,pDelChild);
				break;
			}
			case HY.Core.Action.DELMode.DELDIFFTYPE:
			{
				this.removeActionInSpriteWithoutType(pSprite,pAction.getType(),pDelChild);
				break;
			}
			case HY.Core.Action.DELMode.DELSAMETYPE:
			{
				this.removeActionInSpriteWithType(pSprite,pAction.getType(),pDelChild);
				break;
			}
			default :
			{
				this.removeAllActionInSprite(pSprite,pDelChild);
				break;
			}
		}
    }else{
		this.removeAllActionInSprite(pSprite);
	}
    var newActionLink = new HY.Core.Action.Link({sprite:pSprite,action:pAction});
    this.actionLinkList.push(newActionLink);
}
HY.Core.Action.Manager.prototype.resetAllActions = function(){
    var i = this.actionLinkList.length-1;
    for(;i>=0;--i){
        var curlink = this.actionLinkList[i];
        curlink.reset();
    }
}
HY.Core.Action.Manager.prototype.resetActionInSprite = function(pSprite,pAction,pRetChild){
	var i,j;
	i = this.actionLinkList.length-1;
    for(;i>=0;--i){
        var curLink = this.actionLinkList[i];
        if(curLink.getSprite() == pSprite && curLink.getAction() == pAction){
            curLink.reset();
        }
    }
	if(pRetChild){
		var layers = pSprite.getLayers();
		i = layers.length-1;
		for(;i>=0;--i){
			var layer = layers[i];
			if(layer){
				j = layer.length-1;
				for(;j>=0;--j){
					this.resetActionInSprite(layer[j],pAction,pRetChild);
				}
			}
		}
	}
}
HY.Core.Action.Manager.prototype.resetAllActionInSprite = function(pSprite,pRetChild){
	var i,j;
	i=this.actionLinkList.length-1;
	for(;i>=0;--i){
		var curLink = this.actionLinkList[i];
		if(curLink.getSprite() == pSprite){
			curLink.reset();
		}
	}
	if(pRetChild){
		var layers = pSprite.getLayers();
		i = layers.length-1;
		for(;i>=0;--i){
			var layer = layers[i];
			if(layer){
				j = layer.length-1;
				for(;j>=0;--j){
					this.resetAllActionInSprite(layer[j],pRetChild);
				}
			}
		}
	}
}
HY.Core.Action.Manager.prototype.removeAllAction = function(){
	var i = this.actionLinkList.length-1;
	for(;i>=0;--i){
		var curactionlink = this.actionLinkList[i];
		curactionlink.setDeleteFlag(true);
	}
}
HY.Core.Action.Manager.prototype.removeActionInSprite = function(pSprite,pAction,pDelChild){
    var i = this.actionLinkList.length-1,j;
    for(;i>=0;--i){
        var curActionLink = this.actionLinkList[i];
        if(curActionLink._sprite == pSprite && curActionLink._action == pAction){
			curActionLink.setDeleteFlag(true);
        }
    }
	if(pDelChild){
		var layers = pSprite.getLayers();
		i = layers.length-1;
		for(;i>=0;--i){
			var layer = layers[i];
			if(layer){
				j = layer.length-1;
				for(;j>=0;--j){
					this.removeActionInSprite(layer[j],pAction,pDelChild);
				}
			}
		}
	}
}
HY.Core.Action.Manager.prototype.removeActionInSpriteWithType = function(pSprite,pType,pDelChild){
	var i = this.actionLinkList.length-1,j;
	for(;i>=0;--i){
		var curActionLink = this.actionLinkList[i];
		if(curActionLink._sprite == pSprite && curActionLink._action.getType() == pType){
			curActionLink.setDeleteFlag(true);
		}
	}
	if(pDelChild){
		var layers = pSprite.getLayers();
		i = layers.length-1;
		for(;i>=0;--i){
			var layer = layers[i];
			if(layer){
				j = layer.length-1;
				for(;j>=0;--j){
					this.removeActionInSpriteWithType(layer[j],pType,pDelChild);
				}
			}
		}
	}
}
HY.Core.Action.Manager.prototype.removeActionInSpriteWithoutType = function(pSprite,pType,pDelChild){
	var i=this.actionLinkList.length-1,j;
	for(;i>0;--i){
		var curActionLink = this.actionLinkList[i-1];
		if(curActionLink._sprite == pSprite && curActionLink._action.getType() != pType){
			curActionLink.setDeleteFlag(true);
		}
	}
	if(pDelChild){
		var layers = pSprite.getLayers();
		i = layers.length-1;
		for(;i>=0;--i){
			var layer = layers[i];
			j = layer.length-1;
			for(;j>=0;--j){
				this.removeActionInSpriteWithoutType(layer[j],pType,pDelChild);
			}
		}
	}
}
HY.Core.Action.Manager.prototype.removeAllActionInSprite = function(pSprite,pDelChild){
    var i = this.actionLinkList.length-1,j;
    for(;i>=0;--i){
        var curActionLink = this.actionLinkList[i];
        if(curActionLink._sprite == pSprite){
			curActionLink.setDeleteFlag(true);
        }
    }
	if(pDelChild){
		var layers = pSprite.getLayers();
		i = layers.length-1;
		for(;i>=0;--i){
			var layer = layers[i];
			j = layer.length-1;
			for(;j>=0;--j){
				this.removeAllActionInSprite(layer[j],pDelChild);
			}
		}
	}
}
HY.Core.Action.Manager.prototype.runActions = function(pDeltatime){
    var i=this.actionLinkList.length-1;
    for(;i>=0;--i){
        var curActionLink = this.actionLinkList[i];
		if(!curActionLink.getDeleteFlag()){
			var a = curActionLink.execute(pDeltatime);
			if(a == HY.Core.Action.Status.FINISH){
				this.actionLinkList.splice(i,1);
				curActionLink.getAction().onEndAction();
			}
		}else{
			this.actionLinkList.splice(i,1);
		}
    }
}

/*********************************action link*************************************/
HY.Core.Action.Link = function(config){
    this.extend(HY.Object);
    this.initWithConfig(config);
}
HY.Core.Action.Link.prototype = new HY.Object();
HY.Core.Action.Link.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
		this._deleteFlag = false;
        if(config.action && config.sprite){
            this._action = config.action;
            this._sprite = config.sprite;
			this._params = {};
			this._action.runParamBeforeDelay(this._sprite,this._params);
            //this._params = this._action.createRunParam(this._sprite);
        }else{
            this._action = null;
            this._sprite = null;
            this._params = null;
        }
	}
}
HY.Core.Action.Link.prototype.getAction = function(){
    return this._action;
}
HY.Core.Action.Link.prototype.getSprite = function(){
    return this._sprite;
}
HY.Core.Action.Link.prototype.getParams = function(){
    return this._params;
}
HY.Core.Action.Link.prototype.getDeleteFlag = function(){
	return this._deleteFlag;
}
HY.Core.Action.Link.prototype.setDeleteFlag = function(deleteflag){
	this._deleteFlag = deleteflag;
}
HY.Core.Action.Link.prototype.reset = function(){
    this._action.resetRunParam(this._sprite,this._params);
}
HY.Core.Action.Link.prototype.execute = function(pDeltatime){
    if(this._action != null && this._sprite != null && this._params != null){
        var b = this._action.execute(this._sprite,this._params,pDeltatime);
        return b;
    }else{
        return HY.Core.Action.Status.FINISH;
    }
}

/********************************base action*************************************/
/*配置项
 var config = {
 	delay:10
 }
*/
HY.Core.Action.Base = function(config){
    this.extend(HY.Object);
    this.initWithConfig(config);
}
HY.Core.Action.Base.prototype = new HY.Object();
HY.Core.Action.Base.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.delay != undefined){ this._delay = config.delay; } else { this._delay = 0; }
		if(config.type != undefined){ this._type = config.type; } else { this._type = 0; }
		if(config.endTarget != undefined){ this._endTarget = config.endTarget; } else { this._endTarget = null; }
		if(config.endSelector != undefined){ this._endSelector = config.endSelector; } else { this._endSelector = null; }
		if(config.endParam != undefined){ this._endParam = config.endParam; } else { this._endParam = null; }
    }
}
HY.Core.Action.Base.prototype.getType = function(){
	return this._type;
}
HY.Core.Action.Base.prototype.setType = function(pType){
	this._type = pType;
}
HY.Core.Action.Base.prototype.getDelay = function(){
    return this._delay;
}
HY.Core.Action.Base.prototype.setDelay = function(pDelay){
    if(pDelay < 0){
        this._delay = 0;
    }else{
        this._delay = pDelay;
    }
}
HY.Core.Action.Base.prototype.getEndTarget = function(){
	return this._endTarget;
}
HY.Core.Action.Base.prototype.setEndTarget = function(pTarget){
	this._endTarget = pTarget;
}
HY.Core.Action.Base.prototype.getEndSelector = function(){
	return this._endSelector;
}
HY.Core.Action.Base.prototype.setEndSelector = function(pSelector){
	this._endSelector = pSelector;
}
HY.Core.Action.Base.prototype.getEndParam = function(){
	return this._endParam;
}
HY.Core.Action.Base.prototype.setEndParam = function(pParam){
	this._endParam = pParam;
}
HY.Core.Action.Base.prototype.runParamBeforeDelay = function(pSprite,oRunParam){
	oRunParam.__delayFinish = false;
	oRunParam.__accumlateTime = 0;
}
HY.Core.Action.Base.prototype.runParamAfterDelay = function(pSprite,oRunParam){}
HY.Core.Action.Base.prototype.resetRunParam = function(pSprite,pParam){
    pParam.__delayFinish = false;
    pParam.__accumlateTime = 0;
}
HY.Core.Action.Base.prototype.execute = function(pSprite,pRunParam,pDeltatime){
	pRunParam.__accumlateTime += pDeltatime;
	if(!pRunParam.__delayFinish){
		if(pRunParam.__accumlateTime >= this._delay){
			pRunParam.__delayFinish = true;
			pRunParam.__accumlateTime = 0;
			this.runParamAfterDelay(pSprite,pRunParam);
		}
	}
}
HY.Core.Action.Base.prototype.onEndAction = function(){
	if(this._endSelector){
		if(this._endTarget != null){
			this._endSelector.call(this._endTarget,this._endParam);
		}else{
			this._endSelector.call(this,this._endParam);
		}
	}
}

/*******************************delay******************************************/
/*配置项
 var config = {
	 delay:10,										//继承项
	 selector:null,									//函数
	 target:null,									//this
	 param:null,									//参数
	 repeat:1										//重复次数
 }
*/
HY.Core.Action.Schedule = function(config){
    this.extend(HY.Core.Action.Base);
    this.initWithConfig(config);
}
HY.Core.Action.Schedule.prototype = new HY.Core.Action.Base();
HY.Core.Action.Schedule.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.selector != undefined ){ this._selector = config.selector; } else { this._selector = null; }
        if(config.target != undefined){ this._target = config.target; }else { this._target = null; }
        if(config.param != undefined){ this._param = config.param; } else { this._param = null; }
        if(config.repeat != undefined){ this._repeat = config.repeat; } else { this._repeat = 1; }
    }
}
HY.Core.Action.Schedule.prototype.getSelector = function(){
    return this._selector;
}
HY.Core.Action.Schedule.prototype.setSelector = function(pSelector){
    this._selector = pSelector;
}
HY.Core.Action.Schedule.prototype.getTarget = function(){
    return this._target;
}
HY.Core.Action.Schedule.prototype.setTarget = function(pTarget){
    this._target = pTarget;
}
HY.Core.Action.Schedule.prototype.getParam = function(){
    return this._param;
}
HY.Core.Action.Schedule.prototype.setParam = function(pParam){
    this._param = pParam;
}
HY.Core.Action.Schedule.prototype.getRepeat = function(){
    return this._repeat;
}
HY.Core.Action.Schedule.prototype.setRepeat = function(pRepeat){
    this._repeat = pRepeat;
}
HY.Core.Action.Schedule.prototype.runParamAfterDelay = function(pSprite,oRunParam){
	this.superCall("runParamAfterDelay",[pSprite,oRunParam]);
	oRunParam.__accumlateTimes = 0;
}
HY.Core.Action.Schedule.prototype.resetRunParam = function(pSprite,pParam){
    this.superCall("resetRunParam",[pSprite,pParam]);
    pParam.__accumlateTimes = 0;
}
HY.Core.Action.Schedule.prototype.execute =  function(pSprite,pRunParam,pDeltatime){
    this.superCall("execute",[pSprite,pRunParam,pDeltatime]);
    if(pRunParam.__delayFinish){
		if(this._repeat > 0) {
			pRunParam.__accumlateTimes += 1;
		}
		if(this._selector != null){
			if(this._target != null){
				this._selector.call(this._target,this._param);
			}else{
				this._selector.call(pSprite,this._param);
			}
		}
        if(this._repeat > 0 && pRunParam.__accumlateTimes >= this._repeat){
            return HY.Core.Action.Status.FINISH;
        }else{
            pRunParam.__accumlateTime = 0;
            pRunParam.__delayFinish = false;
            return HY.Core.Action.Status.UNFINISH;
        }
    }else{
        return HY.Core.Action.Status.UNFINISH;
    }
}

/*******************************************moveBY*****************************/
HY.Core.Action.MoveBy = function(config){
    this.extend(HY.Core.Action.Base);
    this.initWithConfig(config);
}
HY.Core.Action.MoveBy.prototype = new HY.Core.Action.Base();
HY.Core.Action.MoveBy.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.repeat != undefined){ this._repeat = config.repeat; } else { this._repeat = 1; }
        if(config.duration != undefined){ this._duration = config.duration; } else { this._duration = 0; }
        if(config.speedX != undefined){ this._speedX = config.speedX; }else{ this._speedX = 0; }
        if(config.speedY != undefined){ this._speedY = config.speedY;}else{ this._speedY = 0; }
    }
}
HY.Core.Action.MoveBy.prototype.getSpeedX = function(){
    return this._speedX;
}
HY.Core.Action.MoveBy.prototype.setSpeedX = function(pSpeed){
    this._speedX = pSpeed;
}
HY.Core.Action.MoveBy.prototype.getSpeedY = function(){
    return this._speedY;
}
HY.Core.Action.MoveBy.prototype.setSpeedY = function(pSpeed){
    this._speedY = pSpeed;
}
HY.Core.Action.MoveBy.prototype.getDuration = function(){
    return this._duration;
}
HY.Core.Action.MoveBy.prototype.setDuration = function(pDuration){
    this._duration = pDuration;
}
HY.Core.Action.MoveBy.prototype.getRepeat = function(){
    return this._repeat;
}
HY.Core.Action.MoveBy.prototype.setRepeat = function(pRepeat){
    this._repeat = pRepeat;
}
HY.Core.Action.MoveBy.prototype.runParamAfterDelay = function(pSprite,oRunParam){
	this.superCall("runParamAfterDelay",[pSprite,oRunParam]);
	oRunParam.__accumlateTimes = 0;
}
HY.Core.Action.MoveBy.prototype.resetRunParam = function(pSprite,pParam){
    this.superCall("resetRunParam",[pSprite,pParam]);
    pParam.__accumlateTimes = 0;
}
HY.Core.Action.MoveBy.prototype.execute = function(pSprite,pRunParam,pDeltatime){
    this.superCall("execute",[pSprite,pRunParam,pDeltatime]);
    if(pRunParam.__delayFinish){
        if(this._duration > 0){
            if(this._repeat > 0 && pRunParam.__accumlateTimes >= this._repeat){
                return HY.Core.Action.Status.FINISH;
            }else{
                if(pRunParam.__accumlateTime > this._duration){
                    if(this._repeat > 0 ){
                        pRunParam.__accumlateTimes +=1;
                    }
                    pRunParam.__accumlateTime = 0;
                    pRunParam.__delayFinish = false;
                }
                pSprite.setX(pSprite.getX() + this._speedX*pDeltatime);
                pSprite.setY(pSprite.getY() + this._speedY*pDeltatime);
                return HY.Core.Action.Status.UNFINISH;
            }
        }else{
            pSprite.setX(pSprite.getX() + this._speedX*pDeltatime);
            pSprite.setY(pSprite.getY() + this._speedY*pDeltatime);
            return HY.Core.Action.Status.UNFINISH;
        }
    }else{
        return HY.Core.Action.Status.UNFINISH;
    }
}

/**********************************************moveto**************************/
/*配置项
 var config = {
	 delay:1,													//继承自 HY.Core.Action.Base
	 targetX:100,
	 targetY:100,
	 duration:1
 }
*/
HY.Core.Action.MoveTo = function(config){
    this.extend(HY.Core.Action.Base);
    this.initWithConfig(config);
}
HY.Core.Action.MoveTo.prototype = new HY.Core.Action.Base();
HY.Core.Action.MoveTo.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.targetX != undefined){ this._targetX = config.targetX; }
        if(config.targetY != undefined){ this._targetY = config.targetY;}
        if(config.duration != undefined){ this._duration = config.duration; }
    }
}
HY.Core.Action.MoveTo.prototype.getTargetX = function(){
    return this._targetX;
}
HY.Core.Action.MoveTo.prototype.setTargetX = function(px){
    this._targetX = px;
}
HY.Core.Action.MoveTo.prototype.getTargetY = function(){
    return this._targetY;
}
HY.Core.Action.MoveTo.prototype.setTargetY = function(py){
    this._targetY = py;
}
HY.Core.Action.MoveTo.prototype.getDuration = function(){
    return this._duration;
}
HY.Core.Action.MoveTo.prototype.setDuration = function(pduration){
    this._duration = pduration;
}
HY.Core.Action.MoveTo.prototype.runParamAfterDelay = function(pSprite,oRunParam){
	this.superCall("runParamAfterDelay",[pSprite,oRunParam]);
	oRunParam.__speedX = (this._targetX - pSprite.getX())/this._duration;
	oRunParam.__speedY = (this._targetY - pSprite.getY())/this._duration;
}
HY.Core.Action.MoveTo.prototype.resetRunParam = function(pSprite,pParam){
    this.superCall("resetRunParam",[pSprite,pParam]);
    pParam.__speedX = (this._targetX - pSprite.getX())/this._duration;
    pParam.__speedY = (this._targetY - pSprite.getY())/this._duration;
}
HY.Core.Action.MoveTo.prototype.execute = function(pSprite,pRunParam,pDeltatime){
    this.superCall("execute",[pSprite,pRunParam,pDeltatime]);
    if(pRunParam.__delayFinish){
        var targetDeltaX = this._targetX - pSprite.getX();
        var targetDeltaY = this._targetY - pSprite.getY();
        var deltaX = pRunParam.__speedX * pDeltatime;
        var deltaY = pRunParam.__speedY * pDeltatime;
        if(Math.abs(targetDeltaX) <= Math.abs(deltaX) && Math.abs(targetDeltaY) <= Math.abs(deltaY)){
            pSprite.setX(this._targetX);
            pSprite.setY(this._targetY);
            return HY.Core.Action.Status.FINISH;
        }else{
            pSprite.setX(pSprite.getX()+deltaX);
            pSprite.setY(pSprite.getY()+deltaY);
            return HY.Core.Action.Status.UNFINISH;
        }
    }else{
        return HY.Core.Action.Status.UNFINISH;
    }
}

/*********************************rotateby********************/
HY.Core.Action.RotateBy = function(config){
    this.extend(HY.Core.Action.Base);
    this.initWithConfig(config);
}
HY.Core.Action.RotateBy.prototype = new HY.Core.Action.Base();
HY.Core.Action.RotateBy.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.duration){ this._duration = config.duration; } else { this._duration = 0; }
        if(config.repeat){ this._repeat = config.repeat; } else { this._repeat = 1; }
        if(config.angleSpeed){ this._angleSpeed = config.angleSpeed; } else { this._angleSpeed = 0; }
    }
}
HY.Core.Action.RotateBy.prototype.getDuration = function(){
    return this._duration;
}
HY.Core.Action.RotateBy.prototype.setDuration = function(pDuration){
    this._duration = pDuration;
}
HY.Core.Action.RotateBy.prototype.getRepeat = function(){
    return this._repeat;
}
HY.Core.Action.RotateBy.prototype.setRepeat = function(pRepeat){
    this._repeat = pRepeat;
}
HY.Core.Action.RotateBy.prototype.getAngleSpeed = function(){
    return this._angleSpeed;
}
HY.Core.Action.RotateBy.prototype.setAngleSpeed = function(pAngleSpeed){
    this._angleSpeed = pAngleSpeed;
}
HY.Core.Action.RotateBy.prototype.runParamAfterDelay = function(pSprite,oRunParam){
	this.superCall("runParamAfterDelay",[pSprite,oRunParam]);
	oRunParam.__accumlateTimes = 0;
}
HY.Core.Action.RotateBy.prototype.resetRunParam = function(pSprite,pParam){
    this.superCall("resetRunParam",[pSprite,pParam]);
    pParam.__accumlateTimes = 0;
}
HY.Core.Action.RotateBy.prototype.execute = function(pSprite,pRunParam,pDeltatime){
    this.superCall("execute",[pSprite,pRunParam,pDeltatime]);
    if(pRunParam.__delayFinish){
        if(this._duration > 0){
            if(this._repeat > 0 && pRunParam.__accumlateTimes >= this._repeat){
                return HY.Core.Action.Status.FINISH;
            }else{
                if(pRunParam.__accumlateTime > this._duration){
                    if(this._repeat > 0){
                        pRunParam.__accumlateTimes += 1;
                    }
                    pRunParam.__accumlateTime = 0;
                    pRunParam.__delayFinish = false;
                }
                pSprite.rotateZ(this._angleSpeed*pDeltatime);
                return HY.Core.Action.Status.UNFINISH;
            }
        }else{
            pSprite.rotateZ(this._angleSpeed * pDeltatime);
            return HY.Core.Action.Status.UNFINISH;
        }
    }else{
        return HY.Core.Action.Status.UNFINISH;
    }
}

/***************************************Rotateto********************/
/*配置项
 var config = {
	 delay:,												//继承自 HY.Core.Action.Base
	 targetAngle:,
	 duration
 }
*/
HY.Core.Action.RotateTo = function(config){
    this.extend(HY.Core.Action.Base);
    this.initWithConfig(config);
}
HY.Core.Action.RotateTo.prototype = new HY.Core.Action.Base();
HY.Core.Action.RotateTo.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.targetAngle){this._targetAngle = config.targetAngle; }
        if(config.duration){ this._duration = config.duration; }
    }
}
HY.Core.Action.RotateTo.prototype.getTargetAngle = function(){
    return this._targetAngle;
}
HY.Core.Action.RotateTo.prototype.setTargetAngle = function(pAngle){
    this._targetAngle = pAngle;
}
HY.Core.Action.RotateTo.prototype.getDuration = function(){
    return this._duration;
}
HY.Core.Action.RotateTo.prototype.setDuration = function(pDuration){
    this._duration = pDuration;
}
HY.Core.Action.RotateTo.prototype.runParamAfterDelay = function(pSprite,oRunParam){
	this.superCall("runParamAfterDelay",[pSprite,oRunParam]);
	oRunParam.__angleSpeed = this._targetAngle/this._duration;
}
HY.Core.Action.RotateTo.prototype.resetRunParam = function(pSprite,pParam){
    this.superCall("resetRunParam",[pSprite,pParam]);
    pParam.__angleSpeed = this._targetAngle/this._duration;
}
HY.Core.Action.RotateTo.prototype.execute = function(pSprite,pRunParam,pDeltatime){
    this.superCall("execute",[pSprite,pRunParam,pDeltatime]);
    if(pRunParam.__delayFinish){
        var targetDeltaA = this._targetAngle - pSprite.getRotateZ();
        var deltaA = pRunParam.__angleSpeed * pDeltatime;
        if(Math.abs(deltaA) >= Math.abs(targetDeltaA)){
            pSprite.setRotateZ(this._targetAngle);
            return HY.Core.Action.Status.FINISH;
        }else{
            pSprite.rotateZ(deltaA);
            return HY.Core.Action.Status.UNFINISH;
        }
    }else{
        return HY.Core.Action.Status.UNFINISH;
    }
}

/***************************************fadeby********************/
HY.Core.Action.FadeBy = function(config){
    this.extend(HY.Core.Action.Base);
    this.initWithConfig(config);
}
HY.Core.Action.FadeBy.prototype = new HY.Core.Action.Base();
HY.Core.Action.FadeBy.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.duration != undefined){ this._duration = config.duration; } else { this._duration = 0; }
        if(config.fadeSpeed != undefined){ this._fadeSpeed = config.fadeSpeed; } else { this._fadeSpeed = 0; }
        if(config.repeat != undefined){ this._repeat = config.repeat; } else { this._repeat = 1; }
    }
}
HY.Core.Action.FadeBy.prototype.getDuration = function(){
    return this._duration;
}
HY.Core.Action.FadeBy.prototype.setDuration = function(pDuration){
    this._duration = pDuration;
}
HY.Core.Action.FadeBy.prototype.getFadeSpeed = function(){
    return this._fadeSpeed;
}
HY.Core.Action.FadeBy.prototype.setFadeSpeed = function(pFadeSpeed){
    this._fadeSpeed = pFadeSpeed;
}
HY.Core.Action.FadeBy.prototype.getRepeat = function(){
    return this._repeat;
}
HY.Core.Action.FadeBy.prototype.setRepeat = function(pRepeat){
    this._repeat = pRepeat;
}
HY.Core.Action.FadeBy.prototype.runParamAfterDelay = function(pSprite,oRunParam){
	this.superCall("runParamAfterDelay",[pSprite,oRunParam]);
	oRunParam.__accumlateTimes = 0;
}
HY.Core.Action.FadeBy.prototype.resetRunParam = function(pSprite,pParam){
    this.superCall("resetRunParam",[pSprite,pParam]);
    pParam.__accumlateTimes = 0;
}
HY.Core.Action.FadeBy.prototype.execute = function(pSprite,pRunParam,pDeltatime){
    this.superCall("execute",[pSprite,pRunParam,pDeltatime]);
    if(pRunParam.__delayFinish){
        var deltaA = this._fadeSpeed * pDeltatime;
        var targetAlpha = pSprite.getAlpha() + deltaA;
        if(targetAlpha < 0){
            pSprite.setAlpha(0);
            return HY.Core.Action.Status.FINISH;
        }else if(targetAlpha > 1){
            pSprite.setAlpha(1);
            return HY.Core.Action.Status.FINISH;
        }else {
            if(this._duration > 0){
                if(this._repeat > 0 && pRunParam.__accumlateTimes >= this._repeat){
                    return HY.Core.Action.Status.FINISH;
                }else {
                    if (pRunParam.__accumlateTime > this._duration) {
                        if(this._repeat > 0){
                            pRunParam.__accumlateTimes += 1;
                        }
                        pSprite.setAlpha(targetAlpha);
                        return HY.Core.Action.Status.UNFINISH;
                    } else {
                        pSprite.setAlpha(targetAlpha);
                        return HY.Core.Action.Status.UNFINISH;
                    }
                }
            }else{
                pSprite = targetAlpha;
                return HY.Core.Action.Status.UNFINISH;
            }
        }
    }else{
        return HY.Core.Action.Status.UNFINISH;
    }
}

/***************************************fadeto*********************************/
/*配置项
 var config = {
	 delay:1,
	 targetAlpha:1,
	 duration:1
 }
*/
HY.Core.Action.FadeTo = function(config){
    this.extend(HY.Core.Action.Base);
    this.initWithConfig(config);
}
HY.Core.Action.FadeTo.prototype = new HY.Core.Action.Base();
HY.Core.Action.FadeTo.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.targetAlpha){ this._targetAlpha = config.targetAlpha; }
        if(config.duration){ this._duration = config.duration; }
    }
}
HY.Core.Action.FadeTo.prototype.getTargetAlpha = function(){
    return this._targetAlpha;
}
HY.Core.Action.FadeTo.prototype.setTargetAngle = function(pAngle){
    this._targetAlpha = pAngle;
}
HY.Core.Action.FadeTo.prototype.getDuration = function(){
    return this._targetAlpha;
}
HY.Core.Action.FadeTo.prototype.setDuration = function(pDuration){
    this._duration = pDuration;
}
HY.Core.Action.FadeTo.prototype.createRunParam = function(pSprite,oRunParam){
	this.superCall("createRunParam",[pSprite,oRunParam]);
	oRunParam.__fadeSpeed = (this._targetAlpha - pSprite.getAlpha())/this._duration;
//    var param = this.superCall("createRunParam",[pSprite]);
//    param.__fadeSpeed = (this._targetAlpha - pSprite.getAlpha())/this._duration;
//    return param;
}
HY.Core.Action.FadeTo.prototype.runParamAfterDelay = function(pSprite,oRunParam){
	this.superCall("runParamAfterDelay",[pSprite,oRunParam]);
	oRunParam.__fadeSpeed = (this._targetAlpha - pSprite.getAlpha())/this._duration;
}
HY.Core.Action.FadeTo.prototype.resetRunParam = function(pSprite,pParam){
    this.superCall("resetRunParam",[pSprite,pParam]);
    param.__fadeSpeed = (this._targetAlpha - pSprite.getAlpha())/this._duration;
}
HY.Core.Action.FadeTo.prototype.execute = function(pSprite,pRunParam,pDeltatime){
    this.superCall("execute",[pSprite,pRunParam,pDeltatime]);
    if(pRunParam.__delayFinish){
        var targetDeltaA = (this._targetAlpha - pSprite.getAlpha());
        var deltaA = pRunParam.__fadeSpeed * pDeltatime;
        if(Math.abs(deltaA) > Math.abs(targetDeltaA)){
            pSprite.setAlpha(this._targetAlpha);
            return HY.Core.Action.Status.FINISH;
        }else{
            pSprite.setAlpha(deltaA);
            return HY.Core.Action.Status.UNFINISH;
        }
    }else{
        return HY.Core.Action.Status.UNFINISH;
    }
}

/**************************************scaleby*******************************/
HY.Core.Action.ScaleBy = function(config){
    this.extend(HY.Core.Action.Base);
    this.initWithConfig(config);
}
HY.Core.Action.ScaleBy.prototype = new HY.Core.Action.Base();
HY.Core.Action.ScaleBy.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.repeat != undefined){ this._repeat = config.repeat; } else { this._repeat = 1; }
        if(config.duration != undefined){ this._duration = config.duration; } else { this._duration = 0; }
        if(config.scaleSpeedW != undefined){ this._scaleSpeedW = config.scaleSpeedW; } else { this._scaleSpeedW = 0; }
        if(config.scaleSpeedH != undefined){ this._scaleSpeedH = config.scaleSpeedH; } else { this._scaleSpeedH = 0; }
    }
}
HY.Core.Action.ScaleBy.prototype.getRepeat = function(){
    return this._repeat;
}
HY.Core.Action.ScaleBy.prototype.setRepeat = function(pRepeat){
    this._repeat = pRepeat;
}
HY.Core.Action.ScaleBy.prototype.getDuration = function(){
    return this._duration;
}
HY.Core.Action.ScaleBy.prototype.setDuration = function(pDuration){
    this._duration = pDuration;
}
HY.Core.Action.ScaleBy.prototype.getScaleSpeedW = function(){
    return this._scaleSpeedW;
}
HY.Core.Action.ScaleBy.prototype.setScaleSpeedW = function(pSpeed){
    this._scaleSpeedW = pSpeed;
}
HY.Core.Action.ScaleBy.prototype.getScaleSpeedH = function(){
    return this._scaleSpeedH;
}
HY.Core.Action.ScaleBy.prototype.setScaleSpeedH = function(pSpeed){
    this._scaleSpeedH = pSpeed;
}
HY.Core.Action.ScaleBy.prototype.createRunParam = function(pSprite,oRunParam){
	this.superCall("createRunParam",[pSprite,oRunParam]);
	oRunParam.__accumlateTimes = 0;
//    var param = this.superCall("createRunParam",[pSprite]);
//    param.__accumlateTimes = 0;
//    return param;
}
HY.Core.Action.ScaleBy.prototype.runParamAfterDelay = function(pSprite,oRunParam){
	this.superCall("runParamAfterDelay",[pSprite,oRunParam]);
	oRunParam.__accumlateTimes = 0;
}
HY.Core.Action.ScaleBy.prototype.resetRunParam = function(pSprite,pParam){
    this.superCall("resetRunParam",[pSprite,pParam]);
    pParam.__accumlateTimes = 0;
}
HY.Core.Action.ScaleBy.prototype.execute = function(pSprite,pRunParam,pDeltatime){
    this.superCall("execute",[pSprite,pRunParam,pDeltatime]);
    if(pRunParam.__delayFinish){
        if(this._duration > 0){
            if(this._repeat > 0 && pRunParam.__accumlateTimes >= this._repeat){
                return HY.Core.Action.Status.FINISH;
            }else{
                if(pRunParam.__accumlateTime > this._duration){
                    if(this._repeat > 0 ){
                        pRunParam.__accumlateTimes +=1;
                    }
                    pRunParam.__accumlateTime = 0;
                    pRunParam.__delayFinish = false;
                }
                pSprite.setWidth(pSprite.getWidth() + this._scaleSpeedW*pDeltatime);
                pSprite.setHeight(pSprite.getHeight() + this._scaleSpeedH*pDeltatime);
                return HY.Core.Action.Status.UNFINISH;
            }
        }else{
            pSprite.setWidth(pSprite.getWidth() + this._scaleSpeedW*pDeltatime);
            pSprite.setHeight(pSprite.getHeight() + this._scaleSpeedH*pDeltatime);
            return HY.Core.Action.Status.UNFINISH;
        }
    }else{
        return HY.Core.Action.Status.UNFINISH;
    }
}

/************************************scaleto********************************/
/*配置项
 var config = {													//
	 delay:1,
 AnchorMoveTo:100,
	 targetHeight:100,
	 duration:1
 }
*/
HY.Core.Action.ScaleTo = function(config){
    this.extend(HY.Core.Action.Base);
    this.initWithConfig(config);
}
HY.Core.Action.ScaleTo.prototype = new HY.Core.Action.Base();
HY.Core.Action.ScaleTo.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.targetWidth != undefined){ this._targetWidth = config.targetWidth; }
        if(config.targetHeight != undefined){ this._targetHeight = config.targetHeight;}
        if(config.duration != undefined){ this._duration = config.duration; }
    }
}
HY.Core.Action.ScaleTo.prototype.getTargetWidth = function(){
    return this._targetWidth;
}
HY.Core.Action.ScaleTo.prototype.setTargetWidth = function(pWidth){
    this._targetWidth = pWidth;
}
HY.Core.Action.ScaleTo.prototype.getTargetHeight = function(){
    return this._targetHeight;
}
HY.Core.Action.ScaleTo.prototype.setTargetHeight = function(pHeight){
    this._targetHeight = pHeight;
}
HY.Core.Action.ScaleTo.prototype.getDuration = function(){
    return this._duration;
}
HY.Core.Action.ScaleTo.prototype.setDuration = function(pDuration){
    this._duration = pDuration;
}
HY.Core.Action.ScaleTo.prototype.runParamAfterDelay = function(pSprite,oRunParam){
	this.superCall("runParamAfterDelay",[pSprite,oRunParam]);
	oRunParam.__scaleSpeedW = (this._targetWidth - pSprite.getWidth())/this._duration;
	oRunParam.__scaleSpeedH = (this._targetHeight - pSprite.getHeight())/this._duration;
}
HY.Core.Action.ScaleTo.prototype.resetRunParam = function(pSprite,pParam){
    this.superCall("resetRunParam",[pSprite,pParam]);
    pParam.__scaleSpeedW = (this._targetWidth - pSprite.getWidth())/this._duration;
    pParam.__scaleSpeedH = (this._targetHeight - pSprite.getHeight())/this._duration;
}
HY.Core.Action.ScaleTo.prototype.execute = function(pSprite,pRunParam,pDeltatime){
    this.superCall("execute",[pSprite,pRunParam,pDeltatime]);
    if(pRunParam.__delayFinish){
        var targetDeltaW = this._targetWidth - pSprite.getWidth();
        var targetDeltaH = this._targetHeight - pSprite.getHeight();
        var deltaW = pRunParam.__scaleSpeedW * pDeltatime;
        var deltaH = pRunParam.__scaleSpeedH * pDeltatime;
        if(Math.abs(targetDeltaW) <= Math.abs(deltaW) && Math.abs(targetDeltaH) <= Math.abs(deltaH)){
            pSprite.setWidth(this._targetWidth);
            pSprite.setHeight(this._targetHeight);
            return HY.Core.Action.Status.FINISH;
        }else{
            pSprite.setWidth(pSprite.getWidth()+deltaW);
            pSprite.setHeight(pSprite.getHeight()+deltaH);
            return HY.Core.Action.Status.UNFINISH;
        }
    }else{
        return HY.Core.Action.Status.UNFINISH;
    }
}

/*******************************************anchorMoveBY*****************************/
HY.Core.Action.AnchorMoveBy = function(config){
    this.extend(HY.Core.Action.Base);
    this.initWithConfig(config);
}
HY.Core.Action.AnchorMoveBy.prototype = new HY.Core.Action.Base();
HY.Core.Action.AnchorMoveBy.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.repeat != undefined){ this._repeat = config.repeat; } else { this._repeat = 1; }
        if(config.duration != undefined){ this._duration = config.duration; } else { this._duration = 0; }
        if(config.speedX != undefined){ this._speedX = config.speedX; }else{ this._speedX = 0; }
        if(config.speedY != undefined){ this._speedY = config.speedY;}else{ this._speedY = 0; }
    }
}
HY.Core.Action.AnchorMoveBy.prototype.getSpeedX = function(){
    return this._speedX;
}
HY.Core.Action.AnchorMoveBy.prototype.setSpeedX = function(pSpeed){
    this._speedX = pSpeed;
}
HY.Core.Action.AnchorMoveBy.prototype.getSpeedY = function(){
    return this._speedY;
}
HY.Core.Action.AnchorMoveBy.prototype.setSpeedY = function(pSpeed){
    this._speedY = pSpeed;
}
HY.Core.Action.AnchorMoveBy.prototype.getDuration = function(){
    return this._duration;
}
HY.Core.Action.AnchorMoveBy.prototype.setDuration = function(pDuration){
    this._duration = pDuration;
}
HY.Core.Action.AnchorMoveBy.prototype.getRepeat = function(){
    return this._repeat;
}
HY.Core.Action.AnchorMoveBy.prototype.setRepeat = function(pRepeat){
    this._repeat = pRepeat;
}
HY.Core.Action.AnchorMoveBy.prototype.runParamAfterDelay = function(pSprite,oRunParam){
	this.superCall("runParamAfterDelay",[pSprite,oRunParam]);
	oRunParam.__accumlateTimes = 0;
}
HY.Core.Action.AnchorMoveBy.prototype.resetRunParam = function(pSprite,pParam){
    this.superCall("resetRunParam",[pSprite,pParam]);
    pParam.__accumlateTimes = 0;
}
HY.Core.Action.AnchorMoveBy.prototype.execute = function(pSprite,pRunParam,pDeltatime){
    this.superCall("execute",[pSprite,pRunParam,pDeltatime]);
    if(pRunParam.__delayFinish){
        if(this._duration > 0){
            if(this._repeat > 0 && pRunParam.__accumlateTimes >= this._repeat){
                return HY.Core.Action.Status.FINISH;
            }else{
                if(pRunParam.__accumlateTime > this._duration){
                    if(this._repeat > 0 ){
                        pRunParam.__accumlateTimes +=1;
                    }
                    pRunParam.__accumlateTime = 0;
                    pRunParam.__delayFinish = false;
                }
                pSprite.setAnchorPointX(pSprite.getAnchorPointX() + this._speedX*pDeltatime);
                pSprite.setAnchorPointY(pSprite.getAnchorPointY() + this._speedY*pDeltatime);
                return HY.Core.Action.Status.UNFINISH;
            }
        }else{
            pSprite.setAnchorPointX(pSprite.getAnchorPointX() + this._speedX*pDeltatime);
            pSprite.setAnchorPointY(pSprite.getAnchorPointY() + this._speedY*pDeltatime);
            return HY.Core.Action.Status.UNFINISH;
        }
    }else{
        return HY.Core.Action.Status.UNFINISH;
    }
}

/**********************************************anchorMoveTo**************************/
/*配置项
 var config = {
	 delay:1,													//继承自HY.Core.Action.Base
	 targetX:100,
	 targetY:100,
	 duration:1
 }
*/
HY.Core.Action.AnchorMoveTo = function(config){
    this.extend(HY.Core.Action.Base);
    this.initWithConfig(config);
}
HY.Core.Action.AnchorMoveTo.prototype = new HY.Core.Action.Base();
HY.Core.Action.AnchorMoveTo.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.targetX != undefined){ this._targetX = config.targetX; }
        if(config.targetY != undefined){ this._targetY = config.targetY;}
        if(config.duration != undefined){ this._duration = config.duration; }
    }
}
HY.Core.Action.AnchorMoveTo.prototype.getTargetX = function(){
    return this._targetX;
}
HY.Core.Action.AnchorMoveTo.prototype.setTargetX = function(px){
    this._targetX = px;
}
HY.Core.Action.AnchorMoveTo.prototype.getTargetY = function(){
    return this._targetY;
}
HY.Core.Action.AnchorMoveTo.prototype.setTargetY = function(py){
    this._targetY = py;
}
HY.Core.Action.AnchorMoveTo.prototype.getDuration = function(){
    return this._duration;
}
HY.Core.Action.AnchorMoveTo.prototype.setDuration = function(pduration){
    this._duration = pduration;
}
HY.Core.Action.AnchorMoveTo.prototype.runParamAfterDelay = function(pSprite,oRunParam){
	this.superCall("runParamAfterDelay",[pSprite,oRunParam]);
	oRunParam.__speedX = (this._targetX - pSprite.getAnchorPointX())/this._duration;
	oRunParam.__speedY = (this._targetY - pSprite.getAnchorPointY())/this._duration;
}
HY.Core.Action.AnchorMoveTo.prototype.resetRunParam = function(pSprite,pParam){
    this.superCall("resetRunParam",[pSprite,pParam]);
    pParam.__speedX = (this._targetX - pSprite.getAnchorPointX())/this._duration;
    pParam.__speedY = (this._targetY - pSprite.getAnchorPointY())/this._duration;
}
HY.Core.Action.AnchorMoveTo.prototype.execute = function(pSprite,pRunParam,pDeltatime){
    this.superCall("execute",[pSprite,pRunParam,pDeltatime]);
    if(pRunParam.__delayFinish){
        var targetDeltaX = this._targetX - pSprite.getAnchorPointX();
        var targetDeltaY = this._targetY - pSprite.getAnchorPointY();
        var deltaX = pRunParam.__speedX * pDeltatime;
        var deltaY = pRunParam.__speedY * pDeltatime;
        if(Math.abs(targetDeltaX) <= Math.abs(deltaX) && Math.abs(targetDeltaY) <= Math.abs(deltaY)){
            pSprite.setAnchorPointX(this._targetX);
            pSprite.setAnchorPointY(this._targetY);
            return HY.Core.Action.Status.FINISH;
        }else{
            pSprite.setAnchorPointX(pSprite.getAnchorPointX()+deltaX);
            pSprite.setAnchorPointY(pSprite.getAnchorPointY()+deltaY);
            return HY.Core.Action.Status.UNFINISH;
        }
    }else{
        return HY.Core.Action.Status.UNFINISH;
    }
}