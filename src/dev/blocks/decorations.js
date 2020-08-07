// Titanium Block
IDRegistry.genBlockID("blockTitanium");
Block.createBlock("blockTitanium", [{name: "Titanium Block", texture: [["block_titanium", 0]], inCreative: true}], "opaque");
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


// Aluminum Block
IDRegistry.genBlockID("blockAluminum");
Block.createBlock("blockAluminum", [
    {name: "Aluminum Block", texture: [["block_aluminum", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.blockAluminum, 3);
ToolAPI.registerBlockMaterial(BlockID.blockAluminum, "stone", 2, true);

RecipesManager.addShaped({id: BlockID.blockAluminum, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.ingotAluminum, 0]);


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


// Concrete bricks
IDRegistry.genBlockID("bricksConcrete");
Block.createBlock("bricksConcrete", [{name: "Concrete Bricks", texture:[["brick_concrete", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.bricksConcrete, 4);
ToolAPI.registerBlockMaterial(BlockID.bricksConcrete, "stone", 3, true);


// Light Bricks
IDRegistry.genBlockID("bricksLight");
Block.createBlock("bricksLight", [{name: "Light Bricks", texture:[["brick_light", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.bricksLight, 6);
ToolAPI.registerBlockMaterial(BlockID.bricksLight, "stone", 5, true);

// Machine Casing
IDRegistry.genBlockID("machineBlockBasic");
Block.createBlock("machineBlockBasic", [{name: "Machine Casing", texture: [["machine_top", 0]], inCreative: true}], "opaque");
RecipesManager.addShaped({id: BlockID.blockTin, count: 1, data: 0}, [
    "aaa",
    "a a",
    "aaa"
], ['a', ItemID.plateIron, 0]);