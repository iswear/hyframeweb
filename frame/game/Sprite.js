/**
 * Created by Administrator on 2015/6/9.
 */
/*
 getActionNames:[
 	"walk_n",
 	"walk_ne",
 	"walk_e",
 	"walk_se",
 	"walk_s",
 	"walk_sw",
 	"walk_w",
 	"walk_nw"
 ]
*/
HY.Game.Sprite = function(config){
	this.extend(HY.Game.Assemble);
	this.initWithConfig(config);
}
HY.Game.Sprite.prototype = new HY.Game.Assemble();
HY.Game.Sprite.prototype.initWithConfig = function(config){
	if(config){
		this.superCall("initWithConfig",[config]);
		this.addActionName("walk_n");
		this.addActionName("walk_ne");
		this.addActionName("walk_e");
		this.addActionName("walk_se");
		this.addActionName("walk_s");
		this.addActionName("walk_sw");
		this.addActionName("walk_w");
		this.addActionName("walk_nw");
	}
}
HY.Game.Sprite.prototype.walkTo = function(pPosition){
	if(pPosition.x != this.getX() || pPosition.y != this.getY()){
		this.stopActionWithType(1,true);
		var angle = Math.atan2(pPosition.y-this.getY(),pPosition.x-this.getX());
		var distance = Math.sqrt(Math.pow(pPosition.x-this.getX(),2)+Math.pow(pPosition.y-this.getY(),2))
		var moveAction = new HY.Core.Action.MoveTo({
			delay:0,
            type:1,
			targetX:pPosition.x,
			targetY:pPosition.y,
			duration:distance/100,
			endTarget:this,
			endSelector:function(param){
                this.stopActionWithType(1,true);
            },
			endParam:null
		});
		if(angle > -Math.PI*1/8 && angle <= Math.PI*1/8){
			this.runActionLoopByName("walk_e",0.4,1);
		}else if(angle > Math.PI*1/8 && angle <= Math.PI*3/8){
			this.runActionLoopByName("walk_se",0.4,1);
		}else if(angle > Math.PI*3/8 && angle <= Math.PI*5/8){
			this.runActionLoopByName("walk_s",0.4,1);
		}else if(angle > Math.PI*5/8 && angle <= Math.PI*7/8){
			this.runActionLoopByName("walk_sw",0.4,1);
		}else if(angle > Math.PI*7/8 || angle <= -Math.PI*7/8){
			this.runActionLoopByName("walk_w",0.4,1);
		}else if(angle > -Math.PI*7/8 && angle <= -Math.PI*5/8){
			this.runActionLoopByName("walk_nw",0.4,1);
		}else if(angle > -Math.PI*5/8 && angle <= -Math.PI*3/8){
			this.runActionLoopByName("walk_n",0.4,1);
		}else if(angle > -Math.PI*3/8 && angle <= -Math.PI/8){
			this.runActionLoopByName("walk_ne",0.4,1);
		}
		this.runAction(moveAction,HY.Core.Action.DELMode.DELNONE,true);
	}else{
		this.stopActionWithType(1,true);
	}
}
HY.Game.Sprite.prototype.shotTo = function(pPosition){
	var bullet = new HY.Game.Assemble({
		x:this.getX(),
		y:this.getY(),
		width:50,
		height:10,
        mouseTrigger:false,
        localCollidedPolygon:[{x:-25,y:5},{x:25,y:5},{x:25,y:-5},{x:-25,y:-5}],
		texture:{srcX:0,srcY:0,srcWidth:200,srcHeight:40,src:HY.Core.Config.Paths.Image+"bullet/arrow1.png"}
	});
	//alert("12相等:"+(bullet == bullet2));

	var movetarget = new HY.Vect2D({x:pPosition.x-bullet.getX(),y:pPosition.y-bullet.getY()});
	var distance = Math.sqrt((movetarget.x*movetarget.x)+(movetarget.y*movetarget.y));
	var angle = Math.atan2(movetarget.y,movetarget.x);
	bullet.setRotateZ(angle);

	var terrain = this.getParent();
	terrain.addChildObject(bullet);

	var moveAction = new HY.Core.Action.MoveTo({
		delay:0,
		type:2,
		targetX:pPosition.x,
		targetY:pPosition.y,
		duration:distance/60,
		endTarget:bullet,
		endSelector:function(param){
			this.setWidth(100);
			this.setHeight(100);
			this.setTexture({srcX:0,srcY:0,srcWidth:100,srcHeight:96,src:HY.Core.Config.Paths.Image+"bullet/boom1.png"});
			this.setBackgroundColor(null);
			var scheduleaction = new HY.Core.Action.Schedule({
				delay:0.2,
				type:2,
				repeat:1,
				target:this,
				selector:function(param){
					this.removeFromParent();
				},
				param:null
			});
			this.runAction(scheduleaction,HY.Core.Action.DELMode.DELNONE,true);
		},
		endParam:null
	});
	bullet.runAction(moveAction,HY.Core.Action.DELMode.DELNONE,true);
}