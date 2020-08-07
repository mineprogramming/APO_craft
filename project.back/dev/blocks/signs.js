const SIGNS_CIRCLE = 5;
const SIGNS_SQUARE = 2;
const SIGNS_TRIANGLE = 2;

//CALCULATE SIGNS
const SIGNS_COUNT = SIGNS_CIRCLE + SIGNS_SQUARE + SIGNS_TRIANGLE;

//BLOCK REGISTRATION
var data = [];
for(var i = 0; i < SIGNS_COUNT * 2; i++){
    data.push({
		name: "tile.roadsign", texture: [["sign", 0]], inCreative: false
	});
}

IDRegistry.genBlockID("sign");
Block.createBlock("sign", data);
Block.registerDropFunction("sign", function(){
     return [[ItemID.sign, 1, 0]]; 
});


//ITEM FOR USING SIGNS
IDRegistry.genItemID("sign");
Item.createItem("sign", "Road Sign", {
	name: "road_sign", meta: 0
}, {});
Item.registerUseFunction("sign", function (coords, item, block) {
    var x = coords.relative.x;
    var y = coords.relative.y;
    var z = coords.relative.z;
    World.setBlock(x, y + 2, z, BlockID.sign, Math.floor(Math.random() * SIGNS_COUNT * 2));
});

//MODELS (DIFFERENT DIRECTIONS)
for(var i = 0; i < SIGNS_CIRCLE; i++){
    var render = new ICRender.Model();
	BlockRenderer.setStaticICRender(BlockID.sign, i, render);
	var model = BlockRenderer.createModel();
	
	model.addBox(7/16, -32/16, 7/16, 9/16, -16/16, 9/16, "stone_slab", 0);
	model.addBox(7/16, -16/16, 7/16, 9/16, 0/16, 9/16, "stone_slab", 0);
	model.addBox(6/16, 0/16, 7/16, 10/16, 14/16, 9/16, [["stone_slab",0],["stone_slab",0],["sign",i],["sign",i],["stone_slab",0],["stone_slab",0]]);
	model.addBox(10/16, 1/16, 7/16, 12/16, 13/16, 9/16, [["stone_slab",0],["stone_slab",0],["sign",i],["sign",i],["stone_slab",0],["stone_slab",0]]);
	model.addBox(12/16, 2/16, 7/16, 13/16, 12/16, 9/16, [["stone_slab",0],["stone_slab",0],["sign",i],["sign",i],["stone_slab",0],["stone_slab",0]]);
	model.addBox(13/16, 3/16, 7/16, 14/16, 11/16, 9/16, [["stone_slab",0],["stone_slab",0],["sign",i],["sign",i],["stone_slab",0],["stone_slab",0]]);
	model.addBox(14/16, 5/16, 7/16, 15/16, 9/16, 9/16, [["stone_slab",0],["stone_slab",0],["sign",i],["sign",i],["stone_slab",0],["stone_slab",0]]);
	model.addBox(4/16, 1/16, 7/16, 6/16, 13/16, 9/16, [["stone_slab",0],["stone_slab",0],["sign",i],["sign",i],["stone_slab",0],["stone_slab",0]]);
	model.addBox(3/16, 2/16, 7/16, 4/16, 12/16, 9/16, [["stone_slab",0],["stone_slab",0],["sign",i],["sign",i],["stone_slab",0],["stone_slab",0]]);
	model.addBox(2/16, 3/16, 7/16, 3/16, 11/16, 9/16, [["stone_slab",0],["stone_slab",0],["sign",i],["sign",i],["stone_slab",0],["stone_slab",0]]);
	model.addBox(1/16, 5/16, 7/16, 2/16, 9/16, 9/16, [["stone_slab",0],["stone_slab",0],["sign",i],["sign",i],["stone_slab",0],["stone_slab",0]]);
	
	render.addEntry(model);
}

for(var i = SIGNS_CIRCLE; i < SIGNS_CIRCLE + SIGNS_SQUARE; i++){
    var render = new ICRender.Model();
	BlockRenderer.setStaticICRender(BlockID.sign, i, render);
	var model = BlockRenderer.createModel();
	
	model.addBox(7/16, -32/16, 7/16, 9/16, -16/16, 9/16, "stone_slab", 0);
	model.addBox(7/16, -16/16, 7/16, 9/16, 0/16, 9/16, "stone_slab", 0);
	model.addBox(2/16, 0/16, 7/16, 14/16, 14/16, 9/16, [["stone_slab",0],["stone_slab",0],["sign",i],["sign",i],["stone_slab",0],["stone_slab",0]]);
	model.addBox(1/16, 1/16, 7/16, 2/16, 13/16, 9/16, [["stone_slab",0],["stone_slab",0],["sign",i],["sign",i],["stone_slab",0],["stone_slab",0]]);
	model.addBox(14/16, 1/16, 7/16, 15/16, 13/16, 9/16, [["stone_slab",0],["stone_slab",0],["sign",i],["sign",i],["stone_slab",0],["stone_slab",0]]);
	
	render.addEntry(model);
}

for(var i = SIGNS_CIRCLE + SIGNS_SQUARE; i < SIGNS_COUNT; i++){
    var render = new ICRender.Model();
	BlockRenderer.setStaticICRender(BlockID.sign, i, render);
	var model = BlockRenderer.createModel();
	
	model.addBox(7/16, -32/16, 7/16, 9/16, -16/16, 9/16, "stone_slab", 0);
	model.addBox(7/16, -16/16, 7/16, 9/16, 0/16, 9/16, "stone_slab", 0);
	model.addBox(1/16, 0/16, 7/16, 15/16, 3/16, 9/16, [["stone_slab",0],["stone_slab",0],["sign",i],["sign",i],["stone_slab",0],["stone_slab",0]]);
	model.addBox(2/16, 3/16, 7/16, 14/16, 5/16, 9/16, [["stone_slab",0],["stone_slab",0],["sign",i],["sign",i],["stone_slab",0],["stone_slab",0]]);
	model.addBox(3/16, 5/16, 7/16, 13/16, 7/16, 9/16, [["stone_slab",0],["stone_slab",0],["sign",i],["sign",i],["stone_slab",0],["stone_slab",0]]);
	model.addBox(4/16, 7/16, 7/16, 12/16, 9/16, 9/16, [["stone_slab",0],["stone_slab",0],["sign",i],["sign",i],["stone_slab",0],["stone_slab",0]]);
	model.addBox(5/16, 9/16, 7/16, 11/16, 11/16, 9/16, [["stone_slab",0],["stone_slab",0],["sign",i],["sign",i],["stone_slab",0],["stone_slab",0]]);
	model.addBox(6/16, 11/16, 7/16, 10/16, 13/16, 9/16, [["stone_slab",0],["stone_slab",0],["sign",i],["sign",i],["stone_slab",0],["stone_slab",0]]);
	model.addBox(7/16, 13/16, 7/16, 9/16, 14/16, 9/16, [["stone_slab",0],["stone_slab",0],["sign",i],["sign",i],["stone_slab",0],["stone_slab",0]]);
	
	render.addEntry(model);
}

for(var i = SIGNS_COUNT; i < SIGNS_COUNT + SIGNS_CIRCLE; i++){
    var render = new ICRender.Model();
	BlockRenderer.setStaticICRender(BlockID.sign, i, render);
	var model = BlockRenderer.createModel();
	
	model.addBox(7/16, -32/16, 7/16, 9/16, -16/16, 9/16, "stone_slab", 0);
	model.addBox(7/16, -16/16, 7/16, 9/16, 0/16, 9/16, "stone_slab", 0);
	model.addBox(7/16, 0/16, 6/16, 9/16, 14/16, 10/16, [["stone_slab",0],["stone_slab",0],["stone_slab",0],["stone_slab",0],["sign",i - SIGNS_COUNT],["sign",i - SIGNS_COUNT]]);
	model.addBox(7/16, 1/16, 10/16, 9/16, 13/16, 12/16, [["stone_slab",0],["stone_slab",0],["stone_slab",0],["stone_slab",0],["sign",i - SIGNS_COUNT],["sign",i - SIGNS_COUNT]]);
	model.addBox(7/16, 2/16, 12/16, 9/16, 12/16, 13/16, [["stone_slab",0],["stone_slab",0],["stone_slab",0],["stone_slab",0],["sign",i - SIGNS_COUNT],["sign",i - SIGNS_COUNT]]);
	model.addBox(7/16, 3/16, 13/16, 9/16, 11/16, 14/16, [["stone_slab",0],["stone_slab",0],["stone_slab",0],["stone_slab",0],["sign",i - SIGNS_COUNT],["sign",i - SIGNS_COUNT]]);
	model.addBox(7/16, 5/16, 14/16, 9/16, 9/16, 15/16, [["stone_slab",0],["stone_slab",0],["stone_slab",0],["stone_slab",0],["sign",i - SIGNS_COUNT],["sign",i - SIGNS_COUNT]]);
	model.addBox(7/16, 1/16, 4/16, 9/16, 13/16, 6/16, [["stone_slab",0],["stone_slab",0],["stone_slab",0],["stone_slab",0],["sign",i - SIGNS_COUNT],["sign",i - SIGNS_COUNT]]);
	model.addBox(7/16, 2/16, 3/16, 9/16, 12/16, 4/16, [["stone_slab",0],["stone_slab",0],["stone_slab",0],["stone_slab",0],["sign",i - SIGNS_COUNT],["sign",i - SIGNS_COUNT]]);
	model.addBox(7/16, 3/16, 2/16, 9/16, 11/16, 3/16, [["stone_slab",0],["stone_slab",0],["stone_slab",0],["stone_slab",0],["sign",i - SIGNS_COUNT],["sign",i - SIGNS_COUNT]]);
	model.addBox(7/16, 5/16, 1/16, 9/16, 9/16, 2/16, [["stone_slab",0],["stone_slab",0],["stone_slab",0],["stone_slab",0],["sign",i - SIGNS_COUNT],["sign",i - SIGNS_COUNT]]);
	
	render.addEntry(model);
}

for(var i = SIGNS_COUNT + SIGNS_CIRCLE; i < SIGNS_COUNT + SIGNS_CIRCLE + SIGNS_SQUARE; i++){
    var render = new ICRender.Model();
	BlockRenderer.setStaticICRender(BlockID.sign, i, render);
	var model = BlockRenderer.createModel();
	
	model.addBox(7/16, -32/16, 7/16, 9/16, -16/16, 9/16, "stone_slab", 0);
	model.addBox(7/16, -16/16, 7/16, 9/16, 0/16, 9/16, "stone_slab", 0);
	model.addBox(7/16, 0/16, 2/16, 9/16, 14/16, 14/16, [["stone_slab",0],["stone_slab",0],["stone_slab",0],["stone_slab",0],["sign",i - SIGNS_COUNT],["sign",i - SIGNS_COUNT]]);
	model.addBox(7/16, 1/16, 1/16, 9/16, 13/16, 2/16, [["stone_slab",0],["stone_slab",0],["stone_slab",0],["stone_slab",0],["sign",i - SIGNS_COUNT],["sign",i - SIGNS_COUNT]]);
	model.addBox(7/16, 1/16, 14/16, 9/16, 13/16, 15/16, [["stone_slab",0],["stone_slab",0],["stone_slab",0],["stone_slab",0],["sign",i - SIGNS_COUNT],["sign",i - SIGNS_COUNT]]);
	
	render.addEntry(model);
}

for(var i = SIGNS_COUNT + SIGNS_CIRCLE + SIGNS_SQUARE; i < SIGNS_COUNT * 2; i++){
    var render = new ICRender.Model();
	BlockRenderer.setStaticICRender(BlockID.sign, i, render);
	var model = BlockRenderer.createModel();
	
	model.addBox(7/16, -32/16, 7/16, 9/16, -16/16, 9/16, "stone_slab", 0);
	model.addBox(7/16, -16/16, 7/16, 9/16, 0/16, 9/16, "stone_slab", 0);
	model.addBox(7/16, 0/16, 1/16, 9/16, 3/16, 15/16, [["stone_slab",0],["stone_slab",0],["stone_slab",0],["stone_slab",0],["sign",i - SIGNS_COUNT],["sign",i - SIGNS_COUNT]]);
	model.addBox(7/16, 3/16, 2/16, 9/16, 5/16, 14/16, [["stone_slab",0],["stone_slab",0],["stone_slab",0],["stone_slab",0],["sign",i - SIGNS_COUNT],["sign",i - SIGNS_COUNT]]);
	model.addBox(7/16, 5/16, 3/16, 9/16, 7/16, 13/16, [["stone_slab",0],["stone_slab",0],["stone_slab",0],["stone_slab",0],["sign",i - SIGNS_COUNT],["sign",i - SIGNS_COUNT]]);
	model.addBox(7/16, 7/16, 4/16, 9/16, 9/16, 12/16, [["stone_slab",0],["stone_slab",0],["stone_slab",0],["stone_slab",0],["sign",i - SIGNS_COUNT],["sign",i - SIGNS_COUNT]]);
	model.addBox(7/16, 9/16, 5/16, 9/16, 11/16, 11/16, [["stone_slab",0],["stone_slab",0],["stone_slab",0],["stone_slab",0],["sign",i - SIGNS_COUNT],["sign",i - SIGNS_COUNT]]);
	model.addBox(7/16, 11/16, 6/16, 9/16, 13/16, 10/16, [["stone_slab",0],["stone_slab",0],["stone_slab",0],["stone_slab",0],["sign",i - SIGNS_COUNT],["sign",i - SIGNS_COUNT]]);
	model.addBox(7/16, 13/16, 7/16, 9/16, 14/16, 9/16, [["stone_slab",0],["stone_slab",0],["stone_slab",0],["stone_slab",0],["sign",i - SIGNS_COUNT],["sign",i - SIGNS_COUNT]]);
	
	render.addEntry(model);
}

//COLLISION SHAPE
for(var i = 0; i < SIGNS_COUNT; i++) {
	var collision = new ICRender.CollisionShape();
	BlockRenderer.setCustomCollisionShape(BlockID.sign, i, collision);
    var entry = collision.addEntry();
	
    entry.addBox(0, 0, 0.45, 1, 1, 0.55);
    entry.addBox(0.45, -2, 0.45, 0.55, -1, 0.55);
    entry.addBox(0.45, -1, 0.45, 0.55, 0, 0.55);
}

for(var i = SIGNS_COUNT; i < SIGNS_COUNT * 2; i++) {
	var collision = new ICRender.CollisionShape();
	BlockRenderer.setCustomCollisionShape(BlockID.sign, i, collision);
    var entry = collision.addEntry();
	
    entry.addBox(0.45, 0, 0, 0.55, 1, 1);
    entry.addBox(0.45, -2, 0.45, 0.55, -1, 0.55);
    entry.addBox(0.45, -1, 0.45, 0.55, 0, 0.55);
}