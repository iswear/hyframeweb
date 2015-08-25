HY.Game.Factory = {};
HY.Game.Factory.createUnit = function(config){
	if(!config){
		config = {
			name:'新零件'
		};
	}
	var unit = new HY.Game.Unit(config);
	var childnodes = config.childNodes;
	if(childnodes){
		var len = childnodes.length;
		for(var i=0; i<len ; ++i){
			unit.addChildUnit(HY.Game.Factory.createUnit(childnodes[i]));
		}
	}
	return unit;
}
HY.Game.Factory.createAssemble = function(config){
	if(!config){
		config = {
			name:'新装配体'
		};
	}
	var curassemble = new HY.Game.Assemble(config);
	var childnodes = config.childNodes;
	if(childnodes){
		var len = childnodes.length;
		for(var i=0; i<len ; ++i){
			curassemble.addChildUnit(HY.Game.Factory.createUnit(childnodes[i]));
		}
	}
	return curassemble;
}
HY.Game.Factory.createSprite = function(config){
	if(!config){
		config = {
			name:'新精灵'
		};
	}
	var cursprite = new HY.Game.Sprite(config);
	var childnodes = config.childNodes;
	if(childnodes){
		var len = childnodes.length;
		for(var i=0;i<len;++i){
			cursprite.addChildUnit(HY.Game.Factory.createUnit(childnodes[i]));
		}
	}
	return cursprite;
}
HY.Game.Factory.createDefaultKeyFrame = function(){
	var outframe = {};
	outframe.time = 0;
	outframe.tween = false;
	outframe.spriteParam = {};
	outframe.spriteParam.x = 0;
	outframe.spriteParam.y = 0;
	outframe.spriteParam.width = 50;
	outframe.spriteParam.height = 50;
	outframe.spriteParam.anchorX = 0.5;
	outframe.spriteParam.anchorY = 0.5;
	outframe.spriteParam.rotateAngleZ = 0;
	outframe.spriteParam.alpha = 1;
	outframe.texture = null;
	return outframe;
}
HY.Game.Factory.formatKeyFrame = function(pFrame){
	if(pFrame.time == undefined){ pFrame.time = 0; }
	if(pFrame.tween == undefined){ pFrame.tween = false; }
	if(pFrame.spriteParam == undefined){
		pFrame.spriteParam = {};
	}
	if(pFrame.spriteParam.texture == undefined){
		pFrame.spriteParam.texture = null;
	}
	if(pFrame.spriteParam.x == undefined){ pFrame.spriteParam.x = 0; }
	if(pFrame.spriteParam.y == undefined){ pFrame.spriteParam.y = 0; }
	if(pFrame.spriteParam.width == undefined){ pFrame.spriteParam.width = 50; }
	if(pFrame.spriteParam.height == undefined){ pFrame.spriteParam.height = 50; }
	if(pFrame.spriteParam.anchorX == undefined){ pFrame.spriteParam.anchorX = 0.5; }
	if(pFrame.spriteParam.anchorY == undefined){ pFrame.spriteParam.anchorY = 0.5; }
	if(pFrame.spriteParam.rotateAngleZ == undefined){ pFrame.spriteParam.rotateAngleZ = 0; }
	if(pFrame.spriteParam.alpha == undefined){ pFrame.spriteParam.alpha = 1; }
	if(pFrame.spriteParam.texture != null){
		if(pFrame.spriteParam.texture.src == undefined){ pFrame.spriteParam.texture.src = null; }
		if(pFrame.spriteParam.texture.srcX == undefined){ pFrame.spriteParam.texture.srcX = 0; }
		if(pFrame.spriteParam.texture.srcY == undefined){ pFrame.spriteParam.texture.srcY = 0; }
		if(pFrame.spriteParam.texture.srcWidth == undefined){ pFrame.spriteParam.texture.srcWidth = 0; }
		if(pFrame.spriteParam.texture.srcHeight == undefined){ pFrame.spriteParam.texture.srcHeight = 0; }
	}
	return pFrame;
}
HY.Game.Factory.cloneKeyFrame = function(pFrame){
	var inFrame = HY.Game.Factory.formatKeyFrame(pFrame);
	var outFrame = {};
	outFrame.time = inFrame.time;
	outFrame.tween = inFrame.tween;
	outFrame.spriteParam = {};
	outFrame.spriteParam.x = inFrame.spriteParam.x;
	outFrame.spriteParam.y = inFrame.spriteParam.y;
	outFrame.spriteParam.width = inFrame.spriteParam.width;
	outFrame.spriteParam.height = inFrame.spriteParam.height;
	outFrame.spriteParam.anchorX = inFrame.spriteParam.anchorX;
	outFrame.spriteParam.anchorY = inFrame.spriteParam.anchorY;
	outFrame.spriteParam.rotateAngleZ = inFrame.spriteParam.rotateAngleZ;
	outFrame.spriteParam.alpha = inFrame.spriteParam.alpha;
	outFrame.spriteParam.texture = inFrame.spriteParam.texture;
	if(outFrame.spriteParam.texture != null){
		outFrame.spriteParam.texture.src = inFrame.spriteParam.texture.src;
		outFrame.spriteParam.texture.srcX = inFrame.spriteParam.texture.srcX;
		outFrame.spriteParam.texture.srcY = inFrame.spriteParam.texture.srcY;
		outFrame.spriteParam.texture.srcWidth = inFrame.spriteParam.texture.srcWidth;
		outFrame.spriteParam.texture.srcHeight = inFrame.spriteParam.texture.srcHeight;
	}
	return outFrame;
}
HY.Game.Factory.createEmptyAssembleJson = function(){
	var emptyAssemble = {
		name:'新装配体',
		x:200,
		y:150,
		width:400,
		height:300,
		anchorX:0.5,
		anchorY:0.5,
		rotateAngleZ:0.0,
		alpha:1
	};
	return emptyAssemble;
}
HY.Game.Factory.createEmptyTerrainJson = function(){
	var emptyTerrain = {
		terrain:{
			blockRowWidth:100,
			blockRowHeight:70,
			natureLayer:{
				backgroundBush:'image/ground/sand.png',
				paths:[
//					{
//						pathBush:'image/ground/grass.png',
//						pathWidth:10,
//						pathSmooth:true,
//						pathLines:[
//							{
//								srcX:0,
//								srcY:0,
//								desX:100,
//								desY:100
//							}
//						]
//					}
				]
			},
			blocksLayer:{
				blocks:[
//					{
//						texture:{
//							src:'image/block/block_4.png',
//							srcX:0,
//							srcY:0,
//							srcWidth:0,
//							srcHeight:0
//						},
//						coordinates:[
//							{
//								row:1,
//								col:1
//							}
//						]
//					}
				]
			},
			objectsLayer:{
				objects:[

				]
			}
		}
	};
	return emptyTerrain;
}

/*
var terrain_testJson2 = {
	width:800,
	height:600,
	blockRowWidth:100,
	blockRowHeight:100,
	natureLayer:{
		backgroundBush:"image/ground/sand.png",
		paths:[
			{
				bush:"",
				width:20,
				smooth:false,
				lines:[
					{
						srcX:0,
						srcY:0,
						desX:100,
						desY:100
					}
				]
			}
		]
	},
	blockLayer:{
		blocks:[
			{
				texture:{
					src:'',
					srcX:0,
					srcY:0,
					srcWidth:100,
					srcHeight:50
				},
				coordinates:[
					{
						row:1,
						col:1
					},
					{
						row:1,
						col:2
					}
				]
			}
		]
	},
	objectLayer:{
		objects:[
			{

			}
		]
	}
}
*/