IDRegistry.genBlockID("bench");
Block.createBlock("bench", [{name: "Bench", inCreative: false}], "opaque");
Block.registerDropFunction("bench", function(){
     return [[ItemID.bench, 1, 0]]; 
});

 
IDRegistry.genItemID("bench");
Item.createItem("bench", "Bench", {name: "bench", meta: 0}, {});
Item.registerUseFunction("sign", function (coords, item, block) {
    var x = coords.relative.x;
    var y = coords.relative.y;
    var z = coords.relative.z;
    World.setBlock(x, y, z, BlockID.bench, 0);
});


function createBenchRender(id, idMaterial, dataMaterial){
    var render = new ICRender.Model();
    BlockRenderer.setStaticICRender (id, 0, render);
    var model = BlockRenderer.createModel();
    model.addBox (1, 8/16, 8/16, 2, 1, 1, idMaterial, dataMaterial);
    model.addBox (1, 0, 0, 2, 8/16, 1, idMaterial, dataMaterial);
    model.addBox (0, 8/16, 8/16, 1, 1, 1, idMaterial, dataMaterial);
    model.addBox (0, 0, 0, 1, 8/16, 1, idMaterial, dataMaterial);
    model.addBox (-1/16, 4/16, 1/16, 0, 12/16, 15/16, idMaterial, dataMaterial);
    model.addBox (2, 4/16, 1/16, 33/16, 12/16, 15/16, idMaterial, dataMaterial);
    render.addEntry(model);
}

createBenchRender(BlockID.bench, 1, 2);