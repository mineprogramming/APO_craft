//Shale Ore
IDRegistry.genBlockID("oreShaleOil");
Block.createBlock("oreShaleOil", [{name: "Shale Ore", texture: [["ore_shale_oil", 1], ["ore_shale_oil", 1], ["ore_shale_oil", 0], ["ore_shale_oil", 2], ["ore_shale_oil", 0], ["ore_shale_oil", 2]], inCreative: true}], "opaque");


//Gallium Arsenide Ore
IDRegistry.genBlockID("oreGalliumArsenide");
Block.createBlock("oreGalliumArsenide", [{name: "Gallium Arsenide Ore", texture: [["ore_gallium_arsenide", 0], ["ore_gallium_arsenide", 0], ["ore_gallium_arsenide", 0], ["ore_gallium_arsenide", 0], ["ore_gallium_arsenide", 0], ["ore_gallium_arsenide", 0]], inCreative: true}], "opaque");

Block.registerDropFunction("oreGalliumArsenide", function(coords, id, data, diggingLevel, toolLevel){
     return [[ItemID.galliumArsenite, 1, 0]];
});

//DansTS decorations and ambience code 
var Renderer={
        setSaplingRender:function(id,x){
        var shape = new ICRender.CollisionShape();     
        BlockRenderer.setCustomCollisionShape(Block.getNumericId(id), -1, shape);    
        BlockRenderer.addRenderCallback(id, function(api, coords,block) {
            if(x!=0){
                for(var i = 0;i < 1/x;i+=x){
                api.renderBoxId(coords.x, coords.y, coords.z,0+i, 0.01, 0+i, x+i, 0.99, x+i,id, block.data);
                api.renderBoxId(coords.x, coords.y, coords.z,(1-x)-i, 0.01, 0+i,1-i, 0.99, x+i,id, block.data);
                }
            }
            else{
                api.renderBoxId(coords.x, coords.y, coords.z, 0.4999, 0.01, 0, 0.5, 0.99, 1,id, block.data);
                api.renderBoxId(coords.x, coords.y, coords.z, 0, 0.01, 0.4999, 1, 0.99, 0.5, id, block.data);
            }
        })
        BlockRenderer.enableCustomRender(id);
    }
};

var BLOCK_LOW_LIGHT = Block.createSpecialType({
    lightlevel: 9,
    opaque: true});

var BLOCK_LOWEST_LIGHT = Block.createSpecialType({
    lightlevel: 4,
    opaque: true});

IDRegistry.genBlockID("concreteBr");
Block.createBlock("concreteBr", [{name: "Concerete bricks", texture:[["brick_concrete", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.concreteBr,4);
ToolAPI.registerBlockMaterial(BlockID.concreteBr, "stone", 3, true);

IDRegistry.genBlockID("lightBr");
Block.createBlock("lightBr", [{name: "Light brick", texture:[["brick_light", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.lightBr,6);
ToolAPI.registerBlockMaterial(BlockID.lightBr, "stone", 5, true);


IDRegistry.genBlockID("radMush");
Block.createBlock("radMush", [
    {name: "Radioactive Musroom", texture: [["empty", 0], ["empty", 0], ["GLmush", 0]], inCreative: false}
], BLOCK_LIGHT);
ToolAPI.registerBlockMaterial(BlockID.radMush, "plant");

IDRegistry.genItemID("radMush");
Item.createItem("radMush", "Radioactive Mushroom", {name: "GLmush"});

Item.registerUseFunction("radMush", function(coords, item, block){
    var place = coords.relative;
    if(GenerationUtils.isTransparentBlock(World.getBlockID(place.x, place.y, place.z))){
        World.setBlock(place.x, place.y, place.z, BlockID.radMush);
        Player.setCarriedItem(item.id, item.count - 1, item.data);
    }
});
Renderer.setSaplingRender(BlockID.radMush,0);

IDRegistry.genBlockID("mushRadS");
Block.createBlockWithRotation("mushRadS", [
{name: "Radioactive Moshroom Stem", texture: [["GLmush_block_inside", 0],["GLmush_block_inside", 0],["GLmush_block_stem", 0],["GLmush_block_stem", 0], ["GLmush_block_stem", 0],["GLmush_block_stem", 0]], inCreative: true}
], BLOCK_LOW_LIGHT);

ToolAPI.registerBlockMaterial(BlockID.mushRadS, "plant");

IDRegistry.genBlockID("mushRadC");
Block.createBlock("mushRadC", [{name: "Radioactive Mushroom Cap", texture:[["GLmush_block_skin", 0]],inCreative: true}], BLOCK_LOW_LIGHT); 