// Shale Ore
IDRegistry.genBlockID("oreShaleOil");
Block.createBlock("oreShaleOil", [{name: "Shale Ore", texture: [["ore_shale_oil", 1], ["ore_shale_oil", 1], ["ore_shale_oil", 0], ["ore_shale_oil", 2], ["ore_shale_oil", 0], ["ore_shale_oil", 2]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.oreShaleOil, 2);
ToolAPI.registerBlockMaterial(BlockID.oreShaleOil, "stone", 3, true);


// Gallium Arsenide Ore
IDRegistry.genBlockID("oreGalliumArsenide");
Block.createBlock("oreGalliumArsenide", [{name: "Gallium Arsenide Ore", texture: [["ore_gallium_arsenide", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.oreGalliumArsenide, 2);
ToolAPI.registerBlockMaterial(BlockID.oreGalliumArsenide, "stone", 3, true);
Block.registerDropFunction("oreGalliumArsenide", function(coords, id, data, level, enchant){
     if(level > 2){
        if(enchant.silk){
            return [[id, 1, 0]];
        }
        var drop = [[ItemID.galliumArsenide, 1, 0]];
        if(Math.random() < enchant.fortune / 3 - 1 / 3){drop.push(drop[0]);}
        ToolAPI.dropOreExp(coords, 3, 7, enchant.experience);
        return drop;
    }
    return [];
});


// Magnesium Ore
IDRegistry.genBlockID("oreMagnesium");
Block.createBlock("oreMagnesium", [{name: "Magnesium Ore", texture: [["ore_magnesium", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.oreMagnesium, 2);
ToolAPI.registerBlockMaterial(BlockID.oreMagnesium, "stone", 3, true);
Block.registerDropFunction("oreMagnesium", function(coords, id, data, level, enchant){
     if(level > 2){
        if(enchant.silk){
            return [[id, 1, 0]];
        }
        var drop = [[ItemID.magnesium, 1, 0]];
        if(Math.random() < enchant.fortune / 3 - 1 / 3){drop.push(drop[0]);}
        ToolAPI.dropOreExp(coords, 3, 7, enchant.experience);
        return drop;
    }
    return [];
});


// Titanium Ore
IDRegistry.genBlockID("oreTitanium"); 
Block.createBlock("oreTitanium", [{name: "Titanium Ore", texture: [["ore_titanium", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.oreTitanium, 2);
ToolAPI.registerBlockMaterial(BlockID.oreTitanium, "stone", 3, true);


// Lead Ore
IDRegistry.genBlockID("oreLead"); 
Block.createBlock("oreLead", [{name: "Lead Ore", texture: [["ore_lead", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.oreLead, 2);
ToolAPI.registerBlockMaterial(BlockID.oreLead, "stone", 2, true);


// Aluminum Ore
IDRegistry.genBlockID("oreAluminum"); 
Block.createBlock("oreAluminum", [{name: "Aluminum Ore", texture: [["ore_aluminum", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.oreAluminum, 2);
ToolAPI.registerBlockMaterial(BlockID.oreAluminum, "stone", 2, true);


// Sulfur Ore
IDRegistry.genBlockID("oreSulfur"); 
Block.createBlock("oreSulfur", [{name: "Sulfur Ore", texture: [["ore_sulfur", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.oreSulfur,2);
ToolAPI.registerBlockMaterial(BlockID.oreSulfur, "stone", 2, true);
Block.registerDropFunction("oreSulfur", function(coords, blockID, blockData, level, enchant){
    if(level > 2){
        if(enchant.silk){
            return [[blockID, 1, 0]];
        }
        var drop = [[ItemID.dustSulfur, randomInt(1,3), 0]];
        if(Math.random() < enchant.fortune / 3 - 1 / 3){drop.push(drop[0]);}
        ToolAPI.dropOreExp(coords, 3, 7, enchant.experience);
        return drop;
    }
    return [];
}, 2);


// Fluorite Ore
IDRegistry.genBlockID("oreFluorite"); 
Block.createBlock("oreFluorite", [
    {name: "Fluorite Ore", texture: [["ore_fluorite", 0]],inCreative: true}], BLOCK_LIGHT_O);
Block.setDestroyTime(BlockID.oreFluorite,2);
ToolAPI.registerBlockMaterial(BlockID.oreFluorite, "stone", 2, true);
Block.registerDropFunction("oreFluorite", function(coords, blockID, blockData, level, enchant){
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


// Copper Ore
IDRegistry.genBlockID("oreCopper"); 
Block.createBlock("oreCopper", [
    {name: "Copper Ore", texture: [["ore_copper", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.oreCopper,2);
ToolAPI.registerBlockMaterial(BlockID.oreCopper, "stone", 2, true);


// Tin Ore
IDRegistry.genBlockID("oreTin"); 
Block.createBlock("oreTin", [
    {name: "Tin ore", texture: [["ore_tin", 0]],inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.oreTin,2);
ToolAPI.registerBlockMaterial(BlockID.oreTin, "stone", 2, true);


// Ruby Ore
IDRegistry.genBlockID("oreRuby"); 
Block.createBlock("oreRuby", [
    {name: "Ruby Ore", texture: [["ore_ruby", 0]],inCreative: true}], BLOCK_LIGHT_O);
Block.setDestroyTime(BlockID.oreRuby,2);
ToolAPI.registerBlockMaterial(BlockID.oreRuby, "stone", 2, true);
Block.registerDropFunction("oreRuby", function(coords, blockID, blockData, level, enchant){
    if(level > 2){
        if(enchant.silk){
            return [[blockID, 1, 0]];
        }
        var drop = [[ItemID.ruby, 1, 0]];
        ToolAPI.dropOreExp(coords, 3, 7, enchant.experience);
        return drop;
    }
    return [];
}, 2);