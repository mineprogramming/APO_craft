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


// Titanuim Block
IDRegistry.genBlockID("blockTitanium"); 
Block.createBlock("blockTitanium", [{name: "Titanuim Block", texture: [["block_titanium", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.blockTitanium, 3);
ToolAPI.registerBlockMaterial(BlockID.blockTitanium, "stone", 3, true);

RecipesManager.addShaped({id: BlockID.blockTitanium, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.ingotTitanium, 0]);


// Lead Block
IDRegistry.genBlockID("blockLead"); 
Block.createBlock("blockLead", [{name: "Lead Block", texture: [["block_lead", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.blockLead, 3);
ToolAPI.registerBlockMaterial(BlockID.blockLead, "stone", 2, true);

RecipesManager.addShaped({id: BlockID.blockLead, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.ingotLead, 0]);


// Aluminium Block
IDRegistry.genBlockID("blockAluminium"); 
Block.createBlock("blockAluminium", [
    {name: "Aluminium Block", texture: [["block_aluminium", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.blockAluminium, 3);
ToolAPI.registerBlockMaterial(BlockID.blockAluminium, "stone", 2, true);

RecipesManager.addShaped({id: BlockID.blockAluminium, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.ingotAluminium, 0]);


// Sulfur Block
IDRegistry.genBlockID("blockSulfur"); 
Block.createBlock("blockSulfur", [{name: "Sulfur Block", texture: [["block_sulfur", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.blockSulfur, 3);
ToolAPI.registerBlockMaterial(BlockID.blockSulfur, "stone", 2, true);

RecipesManager.addShaped({id: BlockID.blockSulfur, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.dustSulfur, 0]);


// Fluorite Block
IDRegistry.genBlockID("blockFluorite"); 
Block.createBlock("blockFluorite", [
    {name: "Fluorite Block", texture: [["block_fluorite", 0]], inCreative: true}], BLOCK_LIGHT_O);
Block.setDestroyTime(BlockID.blockFluorite, 3);
ToolAPI.registerBlockMaterial(BlockID.blockFluorite, "stone", 2, true);

RecipesManager.addShaped({id: BlockID.blockFluorite, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.dustFluorite, 0]);


// Copper Block
IDRegistry.genBlockID("blockCopper"); 
Block.createBlock("blockCopper", [
    {name: "Copper Block", texture: [["block_copper", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.blockCopper,3);
ToolAPI.registerBlockMaterial(BlockID.blockCopper, "stone", 3, true);

RecipesManager.addShaped({id: BlockID.blockCopper, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.ingotCopper, 0]);


// Tin Block
IDRegistry.genBlockID("blockTin"); 
Block.createBlock("blockTin", [{name: "Tin Block", texture: [["block_tin", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.blockTin, 3);
ToolAPI.registerBlockMaterial(BlockID.blockTin, "stone", 3, true);

RecipesManager.addShaped({id: BlockID.blockTin, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.ingotTin, 0]);


// Concerete bricks
IDRegistry.genBlockID("bricksConcrete");
Block.createBlock("bricksConcrete", [{name: "Concerete Bricks", texture:[["brick_concrete", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.bricksConcrete, 4);
ToolAPI.registerBlockMaterial(BlockID.bricksConcrete, "stone", 3, true);


// Light Bricks
IDRegistry.genBlockID("bricksLight");
Block.createBlock("bricksLight", [{name: "Light Bricks", texture:[["brick_light", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.bricksLight, 6);
ToolAPI.registerBlockMaterial(BlockID.bricksLight, "stone", 5, true);


// Radioactive Musroom
IDRegistry.genBlockID("mushroomRadioactiveSmall");
Block.createBlock("mushroomRadioactiveSmall", [{name: "Radioactive Musroom", texture: [["empty", 0], ["empty", 0], ["GLmush", 0]], inCreative: false}], BLOCK_LIGHT);
ToolAPI.registerBlockMaterial(BlockID.mushroomRadioactiveSmall, "plant");

IDRegistry.genItemID("mushroomRadioactive");
Item.createItem("mushroomRadioactive", "Radioactive Mushroom", {name: "GLmush"});
//Block.registerDropFunction("mushroomRadioactiveSmall", function(){
//    return [{id: ItemID.mushroomRadioactive}];
//});

Item.registerUseFunction("mushroomRadioactive", function(coords, item, block){
    var place = coords.relative;
    if(GenerationUtils.isTransparentBlock(World.getBlockID(place.x, place.y, place.z))){
        World.setBlock(place.x, place.y, place.z, BlockID.mushroomRadioactiveSmall);
        Player.decreaseCarriedItem(1);
    }
});
Renderer.setSaplingRender(BlockID.mushroomRadioactiveSmall, 0);

IDRegistry.genBlockID("stemMushroomRadioactive");
Block.createBlockWithRotation("stemMushroomRadioactive", [{name: "Radioactive Moshroom Stem", texture: [
    ["GLmush_block_inside", 0],["GLmush_block_inside", 0],["GLmush_block_stem", 0],["GLmush_block_stem", 0], ["GLmush_block_stem", 0],["GLmush_block_stem", 0]
], inCreative: true}], BLOCK_LOW_LIGHT);

ToolAPI.registerBlockMaterial(BlockID.stemMushroomRadioactive, "plant");

IDRegistry.genBlockID("capMushroomRadioactive");
Block.createBlock("capMushroomRadioactive", [{name: "Radioactive Mushroom Cap", texture:[["GLmush_block_skin", 0]],inCreative: true}], BLOCK_LOW_LIGHT);