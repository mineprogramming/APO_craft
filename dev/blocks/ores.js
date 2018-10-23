//Shale Ore
IDRegistry.genBlockID("oreShaleOil");
Block.createBlock("oreShaleOil", [{name: "Shale Ore", texture: [["ore_shale_oil", 1], ["ore_shale_oil", 1], ["ore_shale_oil", 0], ["ore_shale_oil", 2], ["ore_shale_oil", 0], ["ore_shale_oil", 2]], inCreative: true}], "opaque");


//Gallium Arsenide Ore
IDRegistry.genBlockID("oreGalliumArsenide");
Block.createBlock("oreGalliumArsenide", [{name: "Gallium Arsenide Ore", texture: [["ore_gallium_arsenide", 0], ["ore_gallium_arsenide", 0], ["ore_gallium_arsenide", 0], ["ore_gallium_arsenide", 0], ["ore_gallium_arsenide", 0], ["ore_gallium_arsenide", 0]], inCreative: true}], "opaque");

Block.registerDropFunction("oreGalliumArsenide", function(coords, id, data, diggingLevel, toolLevel){
     return [[ItemID.galliumArsenite, 1, 0]];
});
