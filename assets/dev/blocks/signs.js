const SIGNS_COUNT = 9;

//BLOCK REGISTRATION
var data = [];
for(var i = 0; i < SIGNS_COUNT * 2; i++){
    data.push({name: "tile.roadsign", texture: [["sign", 0]], inCreative: false});
}
IDRegistry.genBlockID("sign");
Block.createBlock("sign", data);
Block.registerDropFunction("sign", function(){
     return [[ItemID.sign, 1, 0]]; 
});


//ITEM FOR USING SIGNS
IDRegistry.genItemID("sign");
Item.createItem("sign", "Road Sign", {name: "road_sign", meta: 0}, {});
Item.registerUseFunction("sign", function (coords, item, block) {
    var x = coords.relative.x;
    var y = coords.relative.y;
    var z = coords.relative.z;
    World.setBlock(x, y + 2, z, BlockID.sign, Math.floor(Math.random() * SIGNS_COUNT * 2));
});

//MODELS (DIFFERENT DIRECTIONS)
for(var i = 0; i < SIGNS_COUNT; i++){
    var model = new BlockRenderer.Model();
    model.addBox(0.45, -2, 0.45, 0.55, -1, 0.55, [["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0]]);
    model.addBox(0.45, -1, 0.45, 0.55, 0, 0.55, [["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0]]);
    model.addBox(0, 0, 0.45, 1, 1, 0.55, [["stone_slab", 0], ["stone_slab", 0], ["sign", i], ["sign", i], ["stone_slab", 0], ["stone_slab", 0]]);

    var icRender = new ICRender.Model(); 
    icRender.addEntry(model);

    BlockRenderer.setStaticICRender(BlockID.sign, i, icRender);
    
    var collisionShape = new ICRender.CollisionShape();
    var entry = collisionShape.addEntry();
    entry.addBox(0, 0, 0.45, 1, 1, 0.55);
    entry.addBox(0.45, -2, 0.45, 0.55, -1, 0.55);
    entry.addBox(0.45, -1, 0.45, 0.55, 0, 0.55);
    BlockRenderer.setCustomCollisionShape(BlockID.sign, i, collisionShape);
}

for(var i = SIGNS_COUNT; i < SIGNS_COUNT * 2; i++){
    var model = new BlockRenderer.Model();
    model.addBox(0.45, -2, 0.45, 0.55, -1, 0.55, [["stone_slab_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0]]);
    model.addBox(0.45, -1, 0.45, 0.55, 0, 0.55, [["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0]]);
    model.addBox(0.45, 0, 0, 0.55, 1, 1, [["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["sign", i - SIGNS_COUNT], ["sign", i - SIGNS_COUNT]]);

    var icRender = new ICRender.Model(); 
    icRender.addEntry(model);

    BlockRenderer.setStaticICRender(BlockID.sign, i, icRender);
    
    var collisionShape = new ICRender.CollisionShape();
    var entry = collisionShape.addEntry();
    entry.addBox(0.45, 0, 0, 0.55, 1, 1);
    entry.addBox(0.45, -2, 0.45, 0.55, -1, 0.55);
    entry.addBox(0.45, -1, 0.45, 0.55, 0, 0.55);
    BlockRenderer.setCustomCollisionShape(BlockID.sign, i, collisionShape);
}






