var BLOCK_LIGHT = Block.createSpecialType({
    lightlevel: 7,
    opaque: false
});

var BLOCK_LIGHT_O = Block.createSpecialType({
    lightlevel: 7,
    opaque: true
});

function randomInt(min, max){ 
return Math.floor(Math.random() * (max - min + 1)) + min; 
}

IDRegistry.genBlockID("titaniumOree"); 
Block.createBlock("titaniumOree", [
    {name: "Titanium ore", texture: [["ore_titanium", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.titaniumOree,2);
ToolAPI.registerBlockMaterial(BlockID.titaniumOree, "stone", 3, true);

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
for(var i = 0; i <  19; i++){
   var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 30);
     GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.titanuimOree, 0, randomInt(1, 3));          
          } 
});

IDRegistry.genBlockID("titaniumBlock"); 
Block.createBlock("titaniumBlock", [
    {name: "Titanuim block", texture: [["block_titanium", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.titaniumBlock,3);
ToolAPI.registerBlockMaterial(BlockID.titaniumBlock, "stone", 3, true);

Callback.addCallback("PostLoaded", function () {
Recipes.addShaped({id: BlockID.titaniumBlock, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.ingotTitanium, 0]);
});

IDRegistry.genBlockID("uraniumOree"); 
Block.createBlock("uraniumOree", [
    {name: "Uranium ore", texture: [["ore_uranium", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.uraniumOree,2);
ToolAPI.registerBlockMaterial(BlockID.uraniumOree, "stone", 3, true);

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
for(var i = 0; i < 18; i++){
   var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 44);
     GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.uraniumOree, 0, randomInt(1, 2));          
          } 
});

IDRegistry.genBlockID("uraniumBlock"); 
Block.createBlock("uraniumBlock", [
    {name: "Uranium block", texture: [["block_uranium", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.uraniumBlock,3);
ToolAPI.registerBlockMaterial(BlockID.uraniumBlock, "stone", 3, true);

Callback.addCallback("PostLoaded", function () {
Recipes.addShaped({id: BlockID.uraniumBlock, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.ingotUran, 0]);
});

IDRegistry.genBlockID("uraniumOren"); 
Block.createBlock("uraniumOren", [
    {name: "Uranium nether ore", texture: [["ore_uranium", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.uraniumOren,2);
ToolAPI.registerBlockMaterial(BlockID.uraniumOren, "stone", 3, true);

Callback.addCallback("GenerateNetherChunk", function(chunkX, chunkZ){
for(var i = 0; i < 20; i++){
   var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 125);
     GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.uraniumOren, 0, randomInt(1, 2));          
          } 
});

IDRegistry.genBlockID("plutoniumOren"); 
Block.createBlock("plutoniumOren", [
    {name: "Plutonium nether ore", texture: [["ore_nether_plutonium", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.plutoniumOren,2);
ToolAPI.registerBlockMaterial(BlockID.plutoniumOren, "stone", 3, true);

Callback.addCallback("GenerateNetherChunk", function(chunkX, chunkZ){
for(var i = 0; i < 17; i++){
   var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 100);
     GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.plutoniumOren, 0, randomInt(1, 3));          
          } 
});


IDRegistry.genBlockID("schrabidiumOree"); 
Block.createBlock("schrabidiumOree", [
    {name: "Schrabidiumm ore", texture: [["ore_schrabidium", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.schrabidiumOree,2);
ToolAPI.registerBlockMaterial(BlockID.schrabidiumOree, "stone", 3, true);

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
for(var i = 0; i < 23; i++){
   var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 32);
     GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.schrabidiumOree, 0, randomInt(2, 4));          
          } 
});

IDRegistry.genBlockID("schrabidiumBlock"); 
Block.createBlock("schrabidiumBlock", [
    {name: "Schrabidiumm block", texture: [["block_schrabidium", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.schrabidiumBlock,3);
ToolAPI.registerBlockMaterial(BlockID.schrabidiumBlock, "stone", 3, true);

Callback.addCallback("PostLoaded", function () {
Recipes.addShaped({id: BlockID.schrabidiumBlock, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.ingotScrar, 0]);
});

IDRegistry.genBlockID("schrabidiumOren"); 
Block.createBlock("schrabidiumOren", [
    {name: "Schrabidium nether ore", texture: [["ore_nether_schrabidium", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.schrabidiumOren,2);
ToolAPI.registerBlockMaterial(BlockID.schrabidiumOren, "stone", 3, true);

Callback.addCallback("GenerateNetherChunk", function(chunkX, chunkZ){
for(var i = 0; i < 23; i++){
   var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 108);
     GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.schrabidiumOren, 0, randomInt(2, 4));          
          } 
});

IDRegistry.genBlockID("tungstenOree"); 
Block.createBlock("tungstenOree", [
    {name: "Tungsten ore", texture: [["ore_tungsten", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.tungstenOree,2);
ToolAPI.registerBlockMaterial(BlockID.tungstenOree, "stone", 3, true);

IDRegistry.genBlockID("tungstenBlock"); 
Block.createBlock("tungstenBlock", [
    {name: "Tungsten block", texture: [["block_tungsten", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.tungstenBlock,3);
ToolAPI.registerBlockMaterial(BlockID.tungstenBlock, "stone", 3, true);

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
for(var i = 0; i < 21; i++){
   var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 35);
     GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.tungstenOree, 0, randomInt(1, 3));          
          } 
});

Callback.addCallback("PostLoaded", function () {
Recipes.addShaped({id: BlockID.tungstenBlock, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.ingotTung, 0]);
});

IDRegistry.genBlockID("tungstenOren"); 
Block.createBlock("tungstenOren", [
    {name: "Tungsten nether ore", texture: [["ore_nether_tungsten", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.tungstenOren,2);
ToolAPI.registerBlockMaterial(BlockID.tungstenOren, "stone", 3, true);

Callback.addCallback("GenerateNetherChunk", function(chunkX, chunkZ){
for(var i = 0; i < 22; i++){
   var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 116);
     GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.tungstenOren, 0, randomInt(1, 3));          
          } 
});


IDRegistry.genBlockID("leadOree"); 
Block.createBlock("leadOree", [
    {name: "Lead ore", texture: [["ore_lead", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.leadOree,2);
ToolAPI.registerBlockMaterial(BlockID.leadOree, "stone", 2, true);

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
for(var i = 0; i < 21; i++){
   var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 41);
     GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.leadOree, 0, randomInt(1, 3));          
          } 
});

IDRegistry.genBlockID("leadBlock"); 
Block.createBlock("leadBlock", [
    {name: "Lead block", texture: [["block_lead", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.leadBlock,3);
ToolAPI.registerBlockMaterial(BlockID.leadBlock, "stone", 2, true);

Callback.addCallback("PostLoaded", function () {
Recipes.addShaped({id: BlockID.leadBlock, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.ingotLead, 0]);
});


IDRegistry.genBlockID("beriOree"); 
Block.createBlock("beriOree", [
    {name: "Beryllium ore", texture: [["ore_beryllium", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.beriOree,2);
ToolAPI.registerBlockMaterial(BlockID.beriOree, "stone", 3, true);

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
for(var i = 0; i < 22; i++){
   var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 40);
     GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.beriOree, 0, randomInt(2, 4));          
          } 
});

IDRegistry.genBlockID("beriBlock"); 
Block.createBlock("beriBlock", [
    {name: "Beryllium block", texture: [["block_beryllium", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.beriBlock,3);
ToolAPI.registerBlockMaterial(BlockID.beriBlock, "stone", 3, true);

Callback.addCallback("PostLoaded", function () {
Recipes.addShaped({id: BlockID.beriBlock, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.ingotBer, 0]);
});

IDRegistry.genBlockID("allumOree"); 
Block.createBlock("allumOree", [
    {name: "Alluminium ore", texture: [["ore_aluminium", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.beriOree,2);
ToolAPI.registerBlockMaterial(BlockID.beriOree, "stone", 2, true);

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
for(var i = 0; i < 23; i++){
   var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 44);
     GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.allumOree, 0, randomInt(2, 5));          
          } 
});

IDRegistry.genBlockID("allumBlock"); 
Block.createBlock("allumBlock", [
    {name: "Alluminium block", texture: [["block_aluminium", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.allumBlock,3);
ToolAPI.registerBlockMaterial(BlockID.allumBlock, "stone", 2, true);

Callback.addCallback("PostLoaded", function () {
Recipes.addShaped({id: BlockID.allumBlock, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.ingotAlluminium, 0]);
});

IDRegistry.genBlockID("sulphOree"); 
Block.createBlock("sulphOree", [
    {name: "Sulfur ore", texture: [["ore_sulfur", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.sulphOree,2);
ToolAPI.registerBlockMaterial(BlockID.sulphOree, "stone", 2, true);

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
for(var i = 0; i < 22; i++){
   var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 39);
     GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.sulphOree, 0, randomInt(2, 5));          
          } 
});

Block.registerDropFunction("sulphOree", function(coords, blockID, blockData, level, enchant){
    if(level > 2){
        if(enchant.silk){
            return [[blockID, 1, 0]];
        }
        var drop = [[ItemID.dustSulfur, randomInt(1,3), 0]];
        if(Math.random() < enchant.fortune/3 - 1/3){drop.push(drop[0]);}
        ToolAPI.dropOreExp(coords, 3, 7, enchant.experience);
        return drop;
    }
    return [];
}, 2);

IDRegistry.genBlockID("sulphBlock"); 
Block.createBlock("sulphBlock", [
    {name: "Sulfur block", texture: [["block_sulfur", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.sulphBlock,3);
ToolAPI.registerBlockMaterial(BlockID.sulphBlock, "stone", 2, true);

Callback.addCallback("PostLoaded", function () {
Recipes.addShaped({id: BlockID.sulphBlock, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.dustSulfur, 0]);
});

IDRegistry.genBlockID("sulphOren"); 
Block.createBlock("sulphOren", [
    {name: "Sulfur nether ore", texture: [["ore_nether_sulfur", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.sulphOree,2);
ToolAPI.registerBlockMaterial(BlockID.sulphOree, "stone", 2, true);

Callback.addCallback("GenerateNetherChunk", function(chunkX, chunkZ){
for(var i = 0; i < 24; i++){
   var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 100);
     GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.sulphOren, 0, randomInt(2, 6));          
          } 
});

Block.registerDropFunction("sulphOren", function(coords, blockID, blockData, level, enchant){
    if(level > 2){
        if(enchant.silk){
            return [[blockID, 1, 0]];
        }
        var drop = [[ItemID.dustSulfur, randomInt(1,3), 0]];
        if(Math.random() < enchant.fortune/3 - 1/3){drop.push(drop[0]);}
        ToolAPI.dropOreExp(coords, 3, 7, enchant.experience);
        return drop;
    }
    return [];
}, 2);


IDRegistry.genBlockID("fluorOree"); 
Block.createBlock("fluorOree", [
    {name: "Fluorite ore", texture: [["ore_fluorite", 0]],inCreative: true}], BLOCK_LIGHT_O);
Block.setDestroyTime(BlockID.fluorOree,2);
ToolAPI.registerBlockMaterial(BlockID.fluorOree, "stone", 2, true);

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
for(var i = 0; i < 20; i++){
   var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 60);
     GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.fluorOree, 0, randomInt(2, 5));          
          } 
});

Block.registerDropFunction("fluorOree", function(coords, blockID, blockData, level, enchant){
    if(level > 2){
        if(enchant.silk){
            return [[blockID, 1, 0]];
        }
        var drop = [[ItemID.dustFluorite, randomInt(1,3), 0]];
        if(Math.random() < enchant.fortune/3 - 1/3){drop.push(drop[0]);}
        ToolAPI.dropOreExp(coords, 3, 7, enchant.experience);
        return drop;
    }
    return [];
}, 2);

IDRegistry.genBlockID("fluorBlock"); 
Block.createBlock("fluorBlock", [
    {name: "Fluorite block", texture: [["block_fluorite", 0]],inCreative: true}], BLOCK_LIGHT_O);
Block.setDestroyTime(BlockID.fluorBlock,3);
ToolAPI.registerBlockMaterial(BlockID.fluorBlock, "stone", 2, true);

Callback.addCallback("PostLoaded", function () {
Recipes.addShaped({id: BlockID.fluorBlock, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.dustFluorite, 0]);
});


IDRegistry.genBlockID("copperOree"); 
Block.createBlock("copperOree", [
    {name: "Copper ore", texture: [["ore_copper", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.copperOree,2);
ToolAPI.registerBlockMaterial(BlockID.copperOree, "stone", 2, true);

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
for(var i = 0; i < 28; i++){
   var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 54);
     GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.copperOree, 0, randomInt(2, 5));          
          } 
});

IDRegistry.genBlockID("copperBlock"); 
Block.createBlock("copperBlock", [
    {name: "Copper block", texture: [["block_copper", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.copperBlock,3);
ToolAPI.registerBlockMaterial(BlockID.copperBlock, "stone", 3, true);

Callback.addCallback("PostLoaded", function () {
Recipes.addShaped({id: BlockID.copperBlock, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.ingotCopper, 0]);
});


IDRegistry.genBlockID("tinOree"); 
Block.createBlock("tinOree", [
    {name: "Tin ore", texture: [["ore_tin", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.tinOree,2);
ToolAPI.registerBlockMaterial(BlockID.tinOree, "stone", 2, true);

Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
for(var i = 0; i < 29; i++){
   var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 55); GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.tinOree, 0, randomInt(2, 5));          
          } 
});

IDRegistry.genBlockID("tinBlock"); 
Block.createBlock("tinBlock", [
    {name: "Tin block", texture: [["block_tin", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.tinBlock,3);
ToolAPI.registerBlockMaterial(BlockID.tinBlock, "stone", 3, true);

Callback.addCallback("PostLoaded", function () {
Recipes.addShaped({id: BlockID.tinBlock, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.ingotTin, 0]);
});