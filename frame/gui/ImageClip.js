/**
 * Created by Administrator on 2014/11/3.//ImageClip//ImageClip
 */
HY.GUI.ImageClip = function(config){
    this.extend(HY.GUI.View);
    this.initWithConfig(config);
}
HY.GUI.ImageClip.prototype = new HY.GUI.View();
HY.GUI.ImageClip.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
        if(config.reverse){ this._reverse = config.reverse; } else { this._reverse = HY.GUI.REVERSENONE; }               //0表示没有景象  1
        if(config.texture != undefined){ this._texture = config.texture; } else { this._texture = null; }
    }
}
HY.GUI.ImageClip.prototype.getTexture = function(){
    return this._texture;
}
HY.GUI.ImageClip.prototype.setTexture = function(pTexture){
    this._texture = pTexture;
}
HY.GUI.ImageClip.prototype.onPaint = function(pDc){
    if(this._texture != null){
        var app = this.getApplication();
        var image = app.getResourceManager().getResDataByURL(this._texture.src);
        if(image != null){
            try{
                if(this._texture.srcWidth <= 0){ this._texture.srcWidth = image.width;}
                if(this._texture.srcHeight <= 0){ this._texture.srcHeight = image.height; }
                switch (this._reverse){
                    case HY.GUI.REVERSEXAXIS:
                        pDc.drawImage(image,this._texture.srcX,this._texture.srcY,this._texture.srcWidth,this._texture.srcHeight,this.getWidth(),0,-this.getWidth(),this.getHeight());
                        break;
                    case HY.GUI.REVERSEYAXIS:
                        pDc.drawImage(image,this._texture.srcX,this._texture.srcY,this._texture.srcWidth,this._texture.srcHeight,0,this.getHeight(),this.getWidth(),-this.getHeight());
                        break;
                    case HY.GUI.REVERSEBOTH:
                        pDc.drawImage(image,this._texture.srcX,this._texture.srcY,this._texture.srcWidth,this._texture.srcHeight,this.getWidth(),this.getHeight(),-this.getWidth(),-this.getHeight());
                        break;
                    default:
                        pDc.drawImage(image,this._texture.srcX,this._texture.srcY,this._texture.srcWidth,this._texture.srcHeight,0,0,this.getWidth(),this.getHeight());
                        break;
                }
            }catch (err){}
        }
    }
    this.superCall("onPaint",pDc);
}