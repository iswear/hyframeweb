var gameEditor = {};

/*外部接口*/


/*地图编辑相关*/
gameEditor._mode = 0;
gameEditor.menu = new HY.GUI.Menu({
	x:0,
	y:0,
	width:400,
	height:25,
	backgroundColor:'#ffffff',
	items:[
		{
			title:'项目',
			dropItems:[{title:'新建项目'},{title:'保存到服务器'},{title:'保存到本地'}]
		},
		{
			title:'插入',
			dropItems:[{title:'动画组件'},{title:'任务剧情'}]
		},
		{
			title:'模式',
			dropItems:[{title:'编辑'},{title:'行走'},{title:'射击'}]
		},
		{
			title:'帮助',
			dropItems:[{title:'帮助说明'},{title:'关于'}]
		}
	]
});
gameEditor.menu.addEventListener("menuitem",function(pMenuItem,pDropItem){
	var menuindex = pMenuItem.getUserValue("index");
	var dropindex = pDropItem.getUserValue("index");
	switch (menuindex){
		case 0:
		{
			break;
		}
		case 1:
		{
			if(dropindex == 0){
				var x = (mainWindow.getWidth()-mainWindow2.getWidth())/2;
				var y = (mainWindow.getHeight()-mainWindow2.getHeight())/2;
				if(x < 0){ x = 0; }
				if(y < 0){ y = 0; }
				mainWindow2.setX(x);
				mainWindow2.setY(y);
				mainWindow2.setVisible(true);
			}
			break;
		}
		case 2:
		{
			gameEditor._mode = dropindex;
			break;
		}
		case 3:
		{
			break;
		}
		default :
			break;

	}
},gameEditor);
gameEditor.projectTreeView = new HY.GUI.TreeView({
	rootNode:{
		title:'所有项目',
		leaf:false,
		contextMenu:[{title:'新项目'},{title:'呵呵'}],
		childNodes:[
			{
				title:'项目1',
				leaf:false,
				childNodes:[
					{
						title:'地图',
						leaf:false,
						childNodes:[]
					}
				]
			},
			{
				title:'项目2',
				leaf:false,
				childNodes:[
					{
						title:'地图',
						leaf:false,
						childNodes:[]
					}
				]
			},
			{
				title:'项目3',
				leaf:false,
				childNodes:[
					{
						title:'地图',
						leaf:false,
						childNodes:[]
					}
				]
			}
		]
	}
});
gameEditor.terrainView = new HY.Tools.Terrain({
	x:0,y:0,width:600,height:500,backgroundColor:'#CCCCCC'
});
gameEditor.terrainView.addEventListener("mousedown",function(pEvent){
	var terrain = this.terrainView;
	if(gameEditor._mode == 0){
		var app = terrain.getApplication();
		if(app){
			var dragData = app.getDragClipBoard(pEvent.identifier);
			if(dragData && dragData.drawType != undefined){
				var localOffset = terrain.transFromCanvasPoint(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
				switch (dragData.drawType){
					case 1:
					{
						if(dragData.bush){
							terrain.setBackgroundBush(dragData.bush);
						}
						break;
					}
					case 2:
					{
						terrain._preDrawPoint = localOffset;
						break;
					}
					case 3:
					{
						var coordinate = terrain.transFromXYToRowCol(localOffset);
						terrain.addBlock(dragData.texture,coordinate.row,coordinate.col);
						break;
					}
					case 4:
					{
						var newobject = HY.Game.Factory.createAssemble(dragData.objectJson);
						newobject.setX(localOffset.x);
						newobject.setY(localOffset.y);
						terrain.addChildObject(newobject);
						break;
					}
					case 5:
					{
						var newobject = HY.Game.Factory.createSprite(dragData.objectJson);
						terrain.selectedSprite = newobject;
						newobject.setX(localOffset.x);
						newobject.setY(localOffset.y);
						terrain.addChildObject(newobject);
						break;
					}
					default :
					{
						break;
					}
				}
			}
		}
	}else if(gameEditor._mode == 1){
		var localOffset = terrain.transFromCanvasPoint(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
		if(terrain.selectedSprite){
			terrain.selectedSprite.walkTo(localOffset);
		}
	}else if(gameEditor._mode == 2){
		var localOffset = terrain.transFromCanvasPoint(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
		if(terrain.selectedSprite){
			terrain.selectedSprite.shotTo(localOffset);
		}
	}
},gameEditor);
gameEditor.terrainView.addEventListener("mousemove",function(pEvent){
	var app = this.getApplication();
	if(app){
		var dragData = app.getDragClipBoard();
		if(dragData && dragData.drawType){
			var localOffset = this.transFromCanvasPoint(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
			switch (dragData.drawType){
//						case 1:
//						{
//							break;
//						}
				case 2:
				{
					if(app.isMouseDown()){
						if(!this._preDrawPoint){
							this._preDrawPoint = localOffset;
						}else if(Math.abs(localOffset.x-this._preDrawPoint.x)+Math.abs(localOffset.y-this._preDrawPoint.y)>25){
							this.addPath(dragData.bush,true,10,this._preDrawPoint.x,this._preDrawPoint.y,localOffset.x,localOffset.y);
							this._preDrawPoint = localOffset;
						}
					}
					break;
				}
				case 3:
				{
					if(app.isMouseDown()){
						var coordinate = this.transFromXYToRowCol(localOffset);
						this.addBlock(dragData.texture,coordinate.row,coordinate.col);
					}
					break;
				}
				case 4:
				{
					break;
				}
				default :
				{
					break;
				}
			}
		}
	}
},null);
gameEditor.terrainView.addEventListener("mouseup",function(pEvent){
	var app = this.getApplication();
	if(app){
		var dragData = app.getDragClipBoard();
		if(dragData && dragData.drawType){
			var localOffset = this.transFromCanvasPoint(new HY.Vect2D({x:pEvent.offsetX,y:pEvent.offsetY}));
			switch (dragData.drawType){
				case 1:
				{
					break;
				}
				case 2:
				{
					break;
				}
				case 3:
				{
					break;
				}
				case 4:
				{
					break;
				}
				default :
				{
					break;
				}
			}
		}
	}
},null);
gameEditor.resourceTreeView = new HY.GUI.TreeView({
	rootNode:{
		title:"地图素材",
		leaf:false,
		childNodes:[
			{
				title:'地表背景',
				leaf:false,
				childNodes:[
					{
						title:'土地',
						leaf:true,
						dragClipBoardData:{
							drawType:1,
							bush:'image/ground/sand.png'
						}
					},
					{
						title:'草地',
						leaf:true,
						dragClipBoardData:{
							drawType:1,
							bush:'image/ground/grass.png'
						}
					}
				]
			},
			{
				title:'地表画笔',
				leaf:false,
				childNodes:[
					{
						title:'土地',
						leaf:true,
						dragClipBoardData:{
							drawType:2,
							bush:'image/ground/sand.png'
						}
					},
					{
						title:'草地',
						leaf:true,
						dragClipBoardData:{
							drawType:2,
							bush:'image/ground/grass.png'
						}
					}
				]
			},
			{
				title:'地表砖块',
				leaf:false,
				childNodes:[
					{
						title:'砖块1',
						leaf:true,
						dragClipBoardData:{
							drawType:3,
							texture:{
								src:'image/block/block_4.png',
								srcX:0,
								srcY:0,
								srcWidth:0,
								srcHeight:0
							}
						}
					}
				]
			},
			{
				title:'地表装饰',
				leaf:false,
				childNodes:[]
			},
			{
				title:'地面单位',
				leaf:false,
				childNodes:[
					{
						title:'房子1',
						leaf:true,
						dragClipBoardData:{
							drawType:4,
							objectJson:{
								width:160,
								height:110,
								texture:{
									src:'image/object/house1.png',
									srcX:0,
									srcY:0,
									srcWidth:0,
									srcHeight:0
								}
							}
						}
					},
					{
						title:'房子2',
						leaf:true,
						dragClipBoardData:{
							drawType:4,
							objectJson:{
								width:128,
								height:128,
								texture:{
									src:'image/object/house2.png',
									srcX:0,
									srcY:0,
									srcWidth:0,
									srcHeight:0
								}
							}
						}
					}
				]
			},
			{
				title:'地面精灵',
				leaf:false,
				childNodes:[
					{
						title:'精灵1',
						leaf:true,
						dragClipBoardData:{
							drawType:5,
							objectJson:{
								title:'精灵',
								x:0,
								y:0,
								width:70,
								height:124,
								anchorX:0.5,
								anchorY:0.5,
								rotateAngleZ:0.0,
								alpha:1,
								texture:null,
								actionNames:[
									{name:'walk_e'},
									{name:'walk_ne'},
									{name:'walk_n'},
									{name:'walk_nw'},
									{name:'walk_w'},
									{name:'walk_sw'},
									{name:'walk_s'},
									{name:'walk_se'}
								],
								actionFrames:null,
								childNodes:[
									{
										title:'封皮1',
										x:0,
										y:0,
										width:70,
										height:124,
										anchorX:0.5,
										anchorY:0.5,
										rotateAngleZ:0.0,
										alpha:1,
										texture:{
											src:HY.Core.Config.Paths.Image+"role/role1.png",
											srcX:0,
											srcY:0,
											srcWidth:70,
											srcHeight:124
										},
										actionFrames:{
											"walk_e":[
												{
													time:0.1,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:0,
															srcY:248,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.2,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:70,
															srcY:248,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.3,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:140,
															srcY:248,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.4,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:210,
															srcY:248,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
											],
											"walk_ne":[
												{
													time:0.1,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:0,
															srcY:868,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.2,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:70,
															srcY:868,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.3,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:140,
															srcY:868,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.4,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:210,
															srcY:868,
															srcWidth:70,
															srcHeight:124
														}
													}
												}
											],
											"walk_n":[
												{
													time:0.1,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:0,
															srcY:372,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.2,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:70,
															srcY:372,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.3,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:140,
															srcY:372,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.4,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:210,
															srcY:372,
															srcWidth:70,
															srcHeight:124
														}
													}
												}
											],
											"walk_nw":[
												{
													time:0.1,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:0,
															srcY:744,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.2,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:70,
															srcY:744,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.3,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:140,
															srcY:744,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.4,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:210,
															srcY:744,
															srcWidth:70,
															srcHeight:124
														}
													}
												}
											],
											"walk_w":[
												{
													time:0.1,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:0,
															srcY:124,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.2,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:70,
															srcY:124,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.3,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:140,
															srcY:124,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.4,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:210,
															srcY:124,
															srcWidth:70,
															srcHeight:124
														}
													}
												}
											],
											"walk_sw":[
												{
													time:0.1,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:0,
															srcY:496,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.2,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:70,
															srcY:496,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.3,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:140,
															srcY:496,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.4,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:210,
															srcY:496,
															srcWidth:70,
															srcHeight:124
														}
													}
												}
											],
											"walk_s":[
												{
													time:0.1,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:0,
															srcY:0,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.2,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:70,
															srcY:0,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.3,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:140,
															srcY:0,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.4,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:210,
															srcY:0,
															srcWidth:70,
															srcHeight:124
														}
													}
												}
											],
											"walk_se":[
												{
													time:0.1,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:0,
															srcY:620,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.2,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:70,
															srcY:620,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.3,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:140,
															srcY:620,
															srcWidth:70,
															srcHeight:124
														}
													}
												},
												{
													time:0.4,
													tween:false,
													spriteParam:{
														x:0,
														y:0,
														width:70,
														height:124,
														anchorX:0.5,
														anchorY:0.5,
														rotateAngleZ:0.0,
														alpha:1,
														texture:{
															src:HY.Core.Config.Paths.Image+"role/role1.png",
															srcX:210,
															srcY:620,
															srcWidth:70,
															srcHeight:124
														}
													}
												}
											]
										}
									}
								]
							}
						}
					}
				]
			},
			{
				title:"天空单位",
				leaf:false,
				childNodes:[]
			}
		]
	}
});
gameEditor.resourceTreeView.addEventListener("nodeselected",function(pNode,pEvent){
	var app = this.getApplication();
	var nodedata = pNode.getNodeData();
	if(nodedata.dragClipBoardData){
		app.setDragClipBoard(nodedata.dragClipBoardData,pEvent.identifier);
	}else{
		app.setDragClipBoard(null,pEvent.identifier);
	}
},null);

gameEditor.projectTreeScrollView = new HY.GUI.ScrollView({
	contentView:gameEditor.projectTreeView
});
gameEditor.projectTreePanel = new HY.GUI.Panel({
	title:'项目列表',
	viewPort:gameEditor.projectTreeScrollView
});
gameEditor.terrainPanel = new HY.GUI.Panel({
	title:'地图编辑器'
});
gameEditor.terrainPanel.getViewPort().addChildNodeAtLayer(gameEditor.terrainView,0);
gameEditor.resourceTreeScrollView = new HY.GUI.ScrollView({
	contentView:gameEditor.resourceTreeView
});
gameEditor.resourceTreePanel = new HY.GUI.Panel({
	title:'资源列表',
	viewPort:gameEditor.resourceTreeScrollView
});
var SplitView1 = new HY.GUI.SplitView({
	width:600,
	splitViews:[gameEditor.projectTreePanel,gameEditor.terrainPanel,gameEditor.resourceTreePanel],
	splitParam:[150,300,150],
	autoAdjustViewIndex:1,
	splitByPixel:true
});
var mainSplitView1 = new HY.GUI.SplitView({
	width:600,
	splitDirection:1,
	adjustAble:false,
	splitViews:[gameEditor.menu,SplitView1],
	splitParam:[25,25],
	splitByPixel:true
});

/*动画编辑器*/
gameEditor.aniAssemble = null;
gameEditor.aniStructTreeView = new HY.GUI.TreeView({});
gameEditor.aniStructTreeView.addEventListener("nodeselected",function(pNode){},gameEditor);
gameEditor.aniStructTreeView.addEventListener("nodemove",function(pNode){},gameEditor);
gameEditor.aniStructTreeView.addEventListener("nodecontextmenu",function(){},gameEditor);
gameEditor.aniStructTreeView.addEventListener("nodetitlechanged",function(){},gameEditor);
gameEditor.aniResTreeView = new HY.GUI.TreeView({
});
gameEditor.aniResTreeView.addEventListener("nodemousedown",function(pEvent,pNode){},this);
gameEditor.aniResTreeView.addEventListener("nodemouseup",function(pEvent,pNode){},this);
gameEditor.aniActionListView = new HY.GUI.ListView({
	items:[
		{
			title:'walk_e'
		},
		{
			title:'walk_s'
		}
	]
});
gameEditor.aniActionListView.addEventListener("contextmenu",function(pItem){},gameEditor);
gameEditor.aniActionListView.addEventListener("itemselected",function(pItem){},gameEditor);
gameEditor.aniActionListView.addEventListener("itemcontextmenu",function(pItem){},gameEditor);
gameEditor.aniTimeLineListView = new HY.GUI.TimeLineListView({});
gameEditor.aniActionListView.addEventListener("itemselected",function(){},gameEditor);
gameEditor.aniActionListView.addEventListener("itemcontextmenu",function(){},gameEditor);
gameEditor.aniActionListView.addEventListener("curframechanged",function(){},gameEditor);
//structTreeView.addEventListener('nodeselected',function(pNode){
//	if(pNode.referUnit){
//		this.setSelectedUnit(pNode.referUnit);
//	}
//},this);
//structTreeView.addEventListener('nodemove',function(pNode,pFromNode,pFromIndex,pToNode,pToIndex){
//	if(pNode.referUnit && pFromNode.referUnit && pFromNode.referUnit){
//		if(pFromIndex > pToIndex){
//			pFromNode.referUnit.removeChildUnit(pNode.referUnit);
//			pToNode.referUnit.addChildUnitAt(pNode.referUnit,pToIndex);
//		}else{
//			pToNode.referUnit.addChildUnitAt(pNode.referUnit,pToIndex);
//			pFromNode.referUnit.removeChildUnit(pNode.referUnit);
//		}
//		this.refreshTimeList();
//	}
//},this);
//structTreeView.addEventListener('nodecontextmenu',function(pNode,pItem){
//	switch (pItem.index){
//		/*插入新零件*/
//		case 0:
//		{
//			if(pNode.referUnit){
//				/*结构树中插入新节点*/
//				var newnode = {
//					name:'新零件',
//					leaf:false,
//					expanded:false,
//					normalIcon:{
//						src:HY.Core.Config.Paths.Image+HY.Core.Config.HySysFiles.Icon,
//						srcX:80,
//						srcY:0,
//						srcWidth:20,
//						srcHeight:20
//					},
//					expandIcon:{
//						src:HY.Core.Config.Paths.Image+HY.Core.Config.HySysFiles.Icon,
//						srcX:80,
//						srcY:0,
//						srcWidth:20,
//						srcHeight:20
//					},
//					contextMenu:[
//						{name:'新零件'},
//						{name:'删除'},
//						{name:'帮助'}
//					],
//					childNodes:[]
//				};
//				pNode.childNodes.push(newnode);
//				this.getStructTreeView().refresh();
//				/*装配件中插入新零件*/
//				var newunit = this.createEditUnit({
//					name:'新零件'
//				});
//				pNode.referUnit.addChildUnit(newunit);
//				newunit.__referStructNode =  newnode;
//				newnode.referUnit = newunit;
//				/*更新timelistview*/
//				this.refreshTimeList();
//			}
//			break;
//		}
//		case 1:
//		{
//			if(pNode == this.getStructTreeView().getRootNode()){
//				/*跳转到帮助页面*/
//			}else{
//				if(pNode.path && pNode.referUnit){
//					this.getStructTreeView().removeNodeByPath(pNode.path);
//					pNode.referUnit.removeFromParent();
//					this.setSelectedUnit(this._editAssemble);
//					this.getStructTreeView().refresh();
//					this.refreshTimeList();
//				}
//			}
//			break;
//		}
//		case 2:
//		{
//			if(pNode != this.getStructTreeView().getRootNode()){
//				/*跳转到帮助页面*/
//			}
//			break;
//		}
//		default :
//		{
//			break;
//		}
//	}
//},this);
//structTreeView.addEventListener('nodenamechanged',function(pNode){
//	if(pNode && pNode.name && pNode.referUnit){
//		var unit = pNode.referUnit;
//		unit.setName(pNode.name);
//		var timeline = unit.__referTimeLine;
//		if(unit.__referTimeLine && unit.__referTimeLine.referControl){
//			unit.__referTimeLine.referControl.setName(pNode.name);
//		}
//	}
//},this);
//actionListView.addEventListener('contextmenu',function(pMenuItem){
//	switch (pMenuItem.index){
//		case 0:
//		{
//			var newactionname = "action";
//			this._editAssemble.addActionName(newactionname);
//			this.refreshActionList();
//			break;
//		}
//		case 1:
//		{
//			/*跳转到帮助页面*/
//			break;
//		}
//		default :
//		{
//			break;
//		}
//	}
//},this);
//actionListView.addEventListener('itemselected',function(pItem){
//	this._curActionName = pItem.name;
//	this.refreshTimeList();
//},this);
//actionListView.addEventListener('itemcontextmenu',function(pItem,pMenuItem){
//	switch (pMenuItem.index){
//		case 0:{
//			var newactionname = "action";
//			this._editAssemble.addActionName(newactionname);
//			this.refreshActionList();
//			break;
//		}
//		case 1:{
//			var actionname = pItem.name;
//			this._editAssemble.compileActionByName(actionname);
//			this._editAssemble.runActionLoopByName(actionname);
//			break;
//		}
//		case 2:{
//			var actionname = pItem.name;
//			this._editAssemble.stopAllAction(true);
//			break;
//		}
//		case 3:{
//			/*跳转到帮助页面*/
//			break;
//		}
//		default :
//		{
//			break;
//		}
//	}
//},this);
//timelinelistview.addEventListener("itemselected",function(pItem){
//	if(pItem.referUnit){
//		this.setSelectedUnit(pItem.referUnit);
//	}
//},this);
//timelinelistview.addEventListener("itemcontextmenu",function(pItem,pItemMenu){
//	switch (pItemMenu.index){
//		case 0:
//		{
//			if(pItem && pItem.referControl && pItem.referUnit){
//				var frametime = pItem.referControl.getSelectedTime();
//				pItem.referUnit.addKeyFrame(this._curActionName,frametime);
//				this.refreshTimeList();
//			}
//			break;
//		}
//		case 1:
//		{
//			if(pItem && pItem.referControl && pItem.referUnit){
//				var frametime = pItem.referControl.getSelectedTime();
//				pItem.referUnit.removeKeyFrame(this._curActionName,frametime);
//				this.refreshTimeList();
//			}
//			break;
//		}
//		case 2:
//		{
//			if(pItem && pItem.referControl && pItem.referUnit){
//				var frametime = pItem.referControl.getSelectedTime();
//				pItem.referUnit.addTweenAtFrame(this._curActionName,frametime);
//				this.refreshTimeList();
//			}
//			break;
//		}
//		case 3:
//		{
//			if(pItem && pItem.referControl && pItem.referUnit){
//				var frametime = pItem.referControl.getSelectedTime();
//				pItem.referUnit.removeTweenAtFrame(this._curActionName,frametime);
//				this.refreshTimeList();
//			}
//			break;
//		}
//		default :
//		{
//			break;
//		}
//	}
//},this);
//timelinelistview.addEventListener("curframechanged",function(pFrame){
//	if(this._editAssemble){
//		this._editAssemble.adjustToFrame(this._curActionName,pFrame,true);
//	}
//},this);
//restreeview.addEventListener("nodemousedown",function(pEvent,pNode){
//	if(pNode.extraData){
//		var app = this.getApplication();
//		if(app){
//			app.setDragClipIcon(pNode.extraData);
//			app.setDragClipBoard(pNode.extraData);
//		}
//	}
//},this);
//restreeview.addEventListener("nodemouseup",function(pEvent,pNode){
//	var app = this.getApplication();
//	if(app){
//		var overelement = app.getMouseoverElement();
//		var spriteeditview = this.getSpriteEditView();
//		var timeline = this.getTimeListView().getSelectedItem().referControl;
//		var cutunit = this._selectedUnit;
//		var selectedframe = timeline.getSelectedFrame();
//		var selectedtime = timeline.getSelectedTime();
//
//		while(overelement.getParent()){
//			if(overelement == spriteeditview){
//				if(timeline.isKeyFrame(selectedframe)){
//					var keyframe = cutunit.getKeyFrame(this._curActionName,selectedtime);
//					keyframe.spriteParam.texture = app.getDragClipBoard();
//					keyframe.spriteParam.texture = app.getDragClipBoard();
//				}
//				cutunit.setTexture(app.getDragClipBoard());
//				break;
//			}else{
//				overelement = overelement.getParent();
//			}
//		}
//	}
//},this);

gameEditor.aniStructTreeScrollView = new HY.GUI.ScrollView({
	contentView:gameEditor.aniStructTreeView
});
gameEditor.aniStructTreePanel = new HY.GUI.Panel({
	title:'结构',
	viewPort:gameEditor.aniStructTreeScrollView
});
gameEditor.aniAssemblePanel = new HY.GUI.Panel({
	title:'编辑'
});
gameEditor.aniResTreeScrollView = new HY.GUI.ScrollView({
	contentView:gameEditor.aniResTreeView
});
gameEditor.aniResTreePanel = new HY.GUI.Panel({
	title:'资源',
	viewPort:gameEditor.aniResTreeScrollView
});
gameEditor.aniActionListScrollView = new HY.GUI.ScrollView({
	contentView:gameEditor.aniActionListView
});
gameEditor.aniActionListPanel = new HY.GUI.Panel({
	title:'动作列表',
	viewPort:gameEditor.aniActionListScrollView
});
gameEditor.aniTimeLineListScrollView = new HY.GUI.ScrollView({
	contentView:gameEditor.aniTimeLineListView
});
gameEditor.aniTimeLineListPanel = new HY.GUI.Panel({
	title:'时间轴',
	viewPort:gameEditor.aniTimeLineListScrollView
});

var SplitView2_1 = new HY.GUI.SplitView({
	width:700,
	splitViews:[gameEditor.aniStructTreePanel,gameEditor.aniAssemblePanel,gameEditor.aniResTreePanel],
	splitParam:[150,400,150],
	autoAdjustViewIndex:1,
	splitByPixel:true
});
var SplitView2_2 = new HY.GUI.SplitView({
	width:700,
	splitViews:[gameEditor.aniActionListPanel,gameEditor.aniTimeLineListPanel],
	splitParam:[150,550],
	splitByPixel:true
});
var mainSplitView2 = new HY.GUI.SplitView({
	width:700,
	splitDirection:1,
	splitViews:[ SplitView2_1,SplitView2_2],
	splitParam:[350,150],
	splitByPixel:true
});

/*运行*/
var mainWindow = new HY.GUI.Window({
	width:610,
	height:100,
	dragAble:false,
	title:'地图编辑器',
	viewPort:mainSplitView1
});
var mainWindow2 = new HY.GUI.Window({
	x:50,
	y:50,
	width:700,
	height:500,
	visible:false,
	title:'动画编辑器',
	viewPort:mainSplitView2
});
mainWindow.addChildNodeAtLayer(mainWindow2,0);
mainWindow.addEventListener("canvassizechange",function(){
	var app = this.getApplication();
	if(app){
		this.setWidth(app.getAppWidth());
		this.setHeight(app.getAppHeight());
	}
},mainWindow);
mainWindow.addEventListener("finishlaunch",function(){
	var app = this.getApplication();
	if(app){
		this.setWidth(app.getAppWidth());
		this.setHeight(app.getAppHeight());
	}
},mainWindow);
var app = new HY.Core.Application({
	fullScreen:true,
	autoScale:false
});
app.run(mainWindow);