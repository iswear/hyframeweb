/**
 * Created by Administrator on 2014/10/23.
 */
HY.GUI.TextBox = function(config){
    this.extend(HY.GUI.Label);
    this.initWithConfig(config);
}
HY.GUI.TextBox.prototype = new HY.GUI.Label();
HY.GUI.TextBox.prototype.defaultText = "";
HY.GUI.TextBox.prototype.defaultTextAlign = HY.GUI.TEXTALIGNLEFT;
HY.GUI.TextBox.prototype.backgroundColor = "#FFFFFF";
HY.GUI.TextBox.prototype.defaultBorderWidth = 0.0;
HY.GUI.TextBox.prototype.defaultBorderColor = "#408AEC";
HY.GUI.TextBox.prototype.defaultMouseTrigger = true;
HY.GUI.TextBox.prototype.initWithConfig = function(config){
    if(config){
        this.superCall("initWithConfig",[config]);
		if(config.editAble){ this._editAble = config.editAble; } else { this._editAble = true; }
		if(config.startEditEvent){ this.addEventListener("startedit",config.startEditEvent.selector,config.startEditEvent.target); }
		if(config.endEditEvent){ this.addEventListener("endedit",config.endEditEvent.selector,config.endEditEvent.target); }
        this._editing = false;
        this._tempBorderWidth = 0;
    }
}
HY.GUI.TextBox.prototype.getEditAble = function(){
	return this._editAble;
}
HY.GUI.TextBox.prototype.setEditAble = function(pEditAble){
	this._editAble = pEditAble;
}
HY.GUI.TextBox.prototype.isEditing = function(){
    return this._editing;
}
HY.GUI.TextBox.prototype.setText = function(pText){
    if(this._editing){
		var app = this.getApplication();
		if(app && app.__inputCursor){
			app.__inputCursor.value = pText;
		}else{
			this.superCall("setText",[pText]);
		}
    }else{
		this.superCall("setText",[pText]);
    }
}
HY.GUI.TextBox.prototype.getText = function(){
    if(this._editing){
		var app = this.getApplication();
		if (app && app.__inputCursor) {
			return app.__inputCursor.value;
		} else {
			return this.superCall("getText");
		}
    }else {
		return this.superCall("getText");
    }
}
HY.GUI.TextBox.prototype.onBlur = function(){
    this._editing = false;
    var app = this.getApplication();
    if(app && app.__inputCursor && app.__inputCursor.style.display == "inline"){
        this.setText(app.__inputCursor.value);
        app.__inputCursor.value = "";
        app.__inputCursor.blur();
        app.__inputCursor.style.display = "none";
    }
    this.setBorderWidth(this._tempBorderWidth);
    this.superCall("onBlur",null);
    this.onEndEdit();
}
HY.GUI.TextBox.prototype.onMouseUp = function(pEvent){
    this.superCall("onMouseUp",[pEvent]);
	this.onStartEdit();
	if(this._editAble){
		var pageOffset = new HY.Vect2D({x:pEvent.pageX,y:pEvent.pageY});
		var thisOffset = this.transFromCanvasPoint(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
		pageOffset.x -= thisOffset.x;
		pageOffset.y -= thisOffset.y;
		var app = this.getApplication();
		if(app){
			if(app.__inputCursor == null){
				app.__inputCursor = document.createElement("input");
				app.__inputCursor.type = "text";
				app.__inputCursor.style.position = "absolute";
				app.__inputCursor.style.borderStyle = "solid";
				app.__inputCursor.style.backgroundColor = "transparent";
				app.__inputCursor.style.fontFamily = this.getFont().fontName;
				app.__inputCursor.style.fontSize = this.getFont().fontSize + "px";
				app.__inputCursor.style.display = "none";
				HY.Core.Event.addListener(app.__inputCursor,app.__inputCursor,"mousedown",function(e){
					var pEvent = new HY.Core.Event.eArg(e,app);
					pEvent.stopDispatch();
				});
				HY.Core.Event.addListener(app.__inputCursor,app.__inputCursor,"mouseup",function(e){
					var pEvent = new HY.Core.Event.eArg(e,app);
					pEvent.stopDispatch();
				});
				HY.Core.Event.addListener(app.__inputCursor,app.__inputCursor,"keypress",function(e){
					var pEvent = new HY.Core.Event.eArg(e,app);
					if(pEvent.keyCode == HY.Core.Event.KEYCODE.ENTER){
						if(this.hyelement){
							try{
								this.hyelement.onBlur();
							}catch (err){
								window.console.log(err);
							}
						}
					}
				});
				document.body.appendChild(app.__inputCursor);
			}
			app.__inputCursor.style.left = pageOffset.x + "px";
			app.__inputCursor.style.top =  (pageOffset.y-this.getBorderWidth()) + "px";
			app.__inputCursor.style.width = (this.getWidth()-this.getBorderWidth()) + "px";
			app.__inputCursor.style.height = (this.getHeight()-2*this.getBorderWidth()) + "px";
			app.__inputCursor.style.lineHeight = (this.getHeight()-this.getBorderWidth()) +"px";
            app.__inputCursor.style.borderWidth = this.getBorderWidth()+"px";
            app.__inputCursor.style.borderColor = this.getBorderColor();
			app.__inputCursor.style.display = "inline";
			app.__inputCursor.style.backgroundColor = this.getBackgroundColor();
			app.__inputCursor.style.fontFamily = this.getFont().fontName;
			app.__inputCursor.style.fontSize = this.getFont().fontSize + "px";
			app.__inputCursor.style.color = "#000000";//this.getTextColor();
			app.__inputCursor.value = this.getText();
			app.__inputCursor.hyelement = this;
			app.__inputCursor.setSelectionRange(0,this.getText().length);
			app.__inputCursor.focus();
            this._tempBorderWidth = this.getBorderWidth();
            this.setBorderWidth(0);
			this.setText("");
			this._editing = true;
		}
	}
}
HY.GUI.TextBox.prototype.onStartEdit = function(){
	this.launchEvent("startedit",[this]);
}
HY.GUI.TextBox.prototype.onEndEdit = function(){
	this.launchEvent("endedit",[this]);
}