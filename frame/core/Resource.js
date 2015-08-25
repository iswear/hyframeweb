/*
HY.Core.RESOURCETYPE = {};
HY.Core.RESOURCETYPE.UNKNOW = 0;
HY.Core.RESOURCETYPE.MUSIC = 1;
HY.Core.RESOURCETYPE.IMAGE = 2;

HY.Core.RESOURCEDESMODE = {};
HY.Core.RESOURCEDESMODE.AUTO = 0;
HY.Core.RESOURCEDESMODE.NEVER = 1;

HY.Core.RESOURCEIMAGES = ["png","jpg","bmp","gif"];
HY.Core.RESOURCEAUDIOS = ["mp3","mp3","m4a","acc","ogg","wav"];
HY.Core.RESOURCEVEDIOS = ["mp4","ogg"];
*/
HY.Core.Resource = {};
HY.Core.Resource.Type = {};
HY.Core.Resource.Type.UNKNOW = 0;
HY.Core.Resource.Type.IMAGE = 1;
HY.Core.Resource.Type.MUSIC = 2;
HY.Core.Resource.Type.VEDIO = 3;

HY.Core.Resource.DesMode = {};
HY.Core.Resource.DesMode.AUTO = 1;
HY.Core.Resource.DesMode.NEVER = 2;

HY.Core.Resource.FileExt = {};
HY.Core.Resource.FileExt.IMAGE = ["png","jpg","bmp","gif"];
HY.Core.Resource.FileExt.AUDIO = ["mp3","mp3","m4a","acc","ogg","wav"];
HY.Core.Resource.FileExt.VEDIO = ["mp4","ogg"];
HY.Core.Resource.Item = function(config){
    this.extend(HY.Object);
    this.initWithConfig(config);
}
HY.Core.Resource.Item.prototype = new HY.Object();
HY.Core.Resource.Item.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.resURL != undefined){ this.resURL = config.resURL; } else { this.resURL = null; }
        if(config.resType != undefined){ this.resType = config.resType; } else { this.resType = HY.Core.Resource.Type.UNKNOW; }
        if(config.desMode != undefined){ this.desMode = config.desMode; } else { this.desMode = HY.Core.Resource.DesMode.AUTO; }
        this._retainCount = 0;
    }
}
HY.Core.Resource.Item.prototype.retain = function(){
    this._retainCount++;
}
HY.Core.Resource.Item.prototype.release = function(){
    this._retainCount--;
}
HY.Core.Resource.Item.prototype.resetRetain = function(){
    this._retainCount = 0;
}

HY.Core.Resource.Manager = function(config){
    this.extend(HY.Object);
    this.initWithConfig(config);
}
HY.Core.Resource.Manager.prototype = new HY.Object();
HY.Core.Resource.Manager.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",config);
        this.items = [];
        this._itemDatas = {};
    }
}
HY.Core.Resource.Manager.prototype.getResExt = function(pUrl){
    var fileArr = pUrl.split(".");
    if(fileArr.length > 1){
        return fileArr[fileArr.length-1];
    }else{
        return null;
    }
}
HY.Core.Resource.Manager.prototype.getResDataByURL = function(pUrl){
    if(this._itemDatas[pUrl]){
        return this._itemDatas[pUrl];
    }else{
        var fileExt = this.getResExt(pUrl).toLowerCase();
        if(HY.Core.Resource.FileExt.IMAGE.indexOf(fileExt) != -1){
            return this.addImageAsync(pUrl);
        }else if(HY.Core.Resource.FileExt.AUDIO.indexOf(fileExt) != -1){

        }else if(HY.Core.Resource.FileExt.VEDIO.indexOf(fileExt) != -1){

        }
    }
}
HY.Core.Resource.Manager.prototype.removeResByURL = function(pUrl){
    var i = this.resourceItems.length;
    for(;i>0;--i){
        if(this.resourceItems[i-1].resURL == pUrl){
            this.resourceItems.splice(i-1,1);
        }
    }
    if(this._itemDatas[pUrl]){
        delete  this._itemDatas[pUrl];
    }
}
HY.Core.Resource.Manager.prototype.removeResAtIndex = function(pIndex){
    if(pIndex < this.items.length){
        var item = this.items[i];
        if(this._itemDatas[item.resURL]){
            delete  this._itemDatas[item.resURL];
        }
        this.items.splice(pIndex,1);
    }
}
HY.Core.Resource.Manager.prototype.removeAllRes = function(){
    var i = this.items.length;
    for(;i>0;--i){
        if(this._itemDatas[this.resourceItems[i-1].resURL]){
            delete this._itemDatas[this.resourceItems[i-1].resURL];
        }
        this.items.splice(i-1,1);
    }
}
HY.Core.Resource.Manager.prototype.addImageAsync = function(pUrl,pTarget,pSelector,pDesMode){
    var i = this._itemDatas.length;
    for(;i>0;--i){
        if(this._itemDatas[i-1].resURL == pUrl){
            if(pDesMode != undefined){
                this._itemDatas[i-1].desMode = pDesMode;
            }
            return;
        }
    }
    if(i==0){
        var newItem = new HY.Core.Resource.Item({resURL:pUrl,resType:HY.Core.Resource.Type.IMAGE,desMode:pDesMode});
        this.items.push(newItem);
    }

    if(this._itemDatas[pUrl]){
        if(pSelector && pTarget){
            pSelector.call(pTarget);
        }
        return this._itemDatas[pUrl];
    }else{
        var image = new Image();
        var $this = this;
        function loadSuccess() {
            $this._itemDatas[pUrl] = image;
            if(pSelector && pTarget){
                pSelector.call(pTarget,null);
            }
            image.removeEventListener("load",loadSuccess);
            image.removeEventListener("error",loadFailed);
        }
        function loadFailed(){
            if(pSelector && pTarget){
                pSelector.call(pTarget,null);
            }
            image.removeEventListener("load",loadSuccess);
            image.removeEventListener("error",loadFailed);
        }
        image.src = pUrl;
        image.addEventListener("load",loadSuccess);
        image.addEventListener("error",loadFailed);
        this._itemDatas[pUrl] = image;
        return image;
    }
}
HY.Core.Resource.Manager.prototype._autoRelease = function(){
    var i = this.items.length
    for(;i>0;--i){
        var item = this.items[i-1];
        if(item._retainCount == 0){
            if(this._itemDatas[item.resURL]){
                delete  this._itemDatas[item.resURL];
            }
            this.items.splice(i-1,1);
        }
    }
}