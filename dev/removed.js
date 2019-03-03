// Schrabidium Ore
IDRegistry.genBlockID("oreSchrabidium");
Block.createBlock("oreSchrabidium", [{name: "Schrabidiumm Ore", texture: [["ore_schrabidium", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.oreSchrabidium, 2);
ToolAPI.registerBlockMaterial(BlockID.oreSchrabidium, "stone", 3, true);


// Tungsten Ore 
IDRegistry.genBlockID("oreTungsten"); 
Block.createBlock("oreTungsten", [{name: "Tungsten Ore", texture: [["ore_tungsten", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.oreTungsten, 2);
ToolAPI.registerBlockMaterial(BlockID.oreTungsten, "stone", 3, true);


// Beryllium Ore
IDRegistry.genBlockID("oreBeryllium"); 
Block.createBlock("oreBeryllium", [{name: "Beryllium Ore", texture: [["ore_beryllium", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.oreBeryllium, 2);
ToolAPI.registerBlockMaterial(BlockID.oreBeryllium, "stone", 3, true);


// Schrabidiumm Block
IDRegistry.genBlockID("blockSchrabidium"); 
Block.createBlock("blockSchrabidium", [{name: "Schrabidiumm Block", texture: [["block_schrabidium", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.blockSchrabidium, 3);
ToolAPI.registerBlockMaterial(BlockID.blockSchrabidium, "stone", 3, true);

RecipesManager.addShaped({id: BlockID.blockSchrabidium, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.ingotSchrabidium, 0]);


// Tungsten Block
IDRegistry.genBlockID("blockTungsten"); 
Block.createBlock("blockTungsten", [{name: "Tungsten Block", texture: [["block_tungsten", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.blockTungsten, 3);
ToolAPI.registerBlockMaterial(BlockID.blockTungsten, "stone", 3, true);

RecipesManager.addShaped({id: BlockID.blockTungsten, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.ingotTungsten, 0]);

// Uranium Ore
IDRegistry.genBlockID("oreUranium"); 
Block.createBlock("oreUranium", [{name: "Uranium Ore", texture: [["ore_uranium", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.oreUranium, 2);
ToolAPI.registerBlockMaterial(BlockID.oreUranium, "stone", 3, true);




// Beryllium Ingot
IDRegistry.genItemID("ingotBeryllium");
Item.createItem("ingotBeryllium", "Beryllium Ingot", {name: "ingot_beryllium"});
Recipes.addFurnace(BlockID.oreBeryllium, ItemID.ingotBeryllium, 0);

// Tungsten Ingot
IDRegistry.genItemID("ingotTungsten");
Item.createItem("ingotTungsten", "Tungsten Ingot", {name: "ingot_tungsten"});
Recipes.addFurnace(BlockID.oreTungsten, ItemID.ingotTungsten, 0);

// Euphemium Ingot
IDRegistry.genItemID("ingotEuphemium");
Item.createItem("ingotEuphemium", "Euphemium Ingot", {name: "ingot_euphemium"});

// Neptunium Ingot
IDRegistry.genItemID("ingotNeptunium");
Item.createItem("ingotNeptunium", "Neptunium Ingot", {name: "ingot_neptunium"});

// Plutonium Ingot
IDRegistry.genItemID("ingotPlutonium");
Item.createItem("ingotPlutonium", "Plutonium Ingot", {name: "ingot_plutonium"});

// Uranium Ingot
IDRegistry.genItemID("ingotUranium");
Item.createItem("ingotUranium", "Uranium Ingot", {name: "ingot_uranium"});

// Mox Fuel Ingot
IDRegistry.genItemID("ingotMox");
Item.createItem("ingotMox", "Mox Fuel Ingot", {name: "ingot_mox_fuel"});

// Schrabidium Fuel Ingot
IDRegistry.genItemID("ingotSchrabidiumFuel");
Item.createItem("ingotSchrabidiumFuel", "Schrabidium Fuel Ingot", {name: "ingot_schrabidium_fuel"});

// Schrabidium Ingot
IDRegistry.genItemID("ingotSchrabidium");
Item.createItem("ingotSchrabidium", "Schrabidium Ingot", {name: "ingot_schrabidium"});
Recipes.addFurnace(BlockID.oreSchrabidium, ItemID.ingotSchrabidium, 0);


// Schrabidium Plate
IDRegistry.genItemID("plateSchrabidium");
Item.createItem("plateSchrabidium", "Schrabidium Plate", {name: "plate_schrabidium"});


// Euphernium Nugget
IDRegistry.genItemID("nuggetEuphernium");
Item.createItem("nuggetEuphernium", "Euphernium Nugget", {name: "nugget_euphemium"});

// Neptunium Nugget
IDRegistry.genItemID("nuggetNeptunium");
Item.createItem("nuggetNeptunium", "Neptunium Nugget", {name: "nugget_neptunium"});

// Plutonium Nugget
IDRegistry.genItemID("nuggetPlutonium");
Item.createItem("nuggetPlutonium", "Plutonium Nugget", {name: "nugget_plutonium"});

// Uranium Nugget
IDRegistry.genItemID("nuggetUranium");
Item.createItem("nuggetUranium", "Uranium Nugget", {name: "nugget_uranium"});

// Mox Nugget
IDRegistry.genItemID("nuggetMox");
Item.createItem("nuggetMox", "Mox Nugget", {name: "nugget_mox_fuel"});

// Schrabidium Nugget
IDRegistry.genItemID("nuggetSchrabidium");
Item.createItem("nuggetSchrabidium", "Schrabidium Nugget", {name: "nugget_schrabidium"});

// Schrabidium Fuel Nugget
IDRegistry.genItemID("nuggetSchrabidiumFuel");
Item.createItem("nuggetSchrabidiumFuel", "Schrabidium Fuel Nugget", {name: "nugget_schrabidium_fuel"});


// Neptunium Dust
IDRegistry.genItemID("dustNeptunium");
Item.createItem("dustNeptunium", "Neptunium Dust", {name: "powder_neptunium"});





//Beryllium block
IDRegistry.genBlockID("blockBeryllium"); 
Block.createBlock("blockBeryllium", [{name: "Beryllium block", texture: [["block_beryllium", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.blockBeryllium, 3);
ToolAPI.registerBlockMaterial(BlockID.blockBeryllium, "stone", 3, true);

RecipesManager.addShaped({id: BlockID.blockBeryllium, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.ingotBeryllium, 0]);





IDRegistry.genItemID("schrabidiumHelmet");
Item.createArmorItem("schrabidiumHelmet", "Schrabidium Helmet", {name: "schrabidium_helmet"}, {type: "helmet", armor: 4, durability: 1124, texture: "armor/schrabidium_1.png"});

IDRegistry.genItemID("schrabidiumChestplate");
Item.createArmorItem("schrabidiumChestplate", "Schrabidium Chestplate", {name: "schrabidium_plate"}, {type: "chestplate", armor: 6, durability: 1286, texture: "armor/schrabidium_1.png"});

IDRegistry.genItemID("schrabidiumLeggings");
Item.createArmorItem("schrabidiumLeggings", "Schrabidium Leggings", {name: "schrabidium_legs"}, {type: "leggings", armor: 5, durability: 1134, texture: "armor/schrabidium_2.png"});

IDRegistry.genItemID("schrabidiumBoots");
Item.createArmorItem("schrabidiumBoots", "Schrabidium Boots", {name: "schrabidium_boots"}, {type: "boots", armor: 4, durability: 1116, texture: "armor/schrabidium_1.png"});

RecipesManager.addShaped({id: ItemID.schrabidiumHelmet, count: 1, data: 0}, [
    "xxx",
    "x x"
], ['x', ItemID.ingotSchrabidium, 0]);

RecipesManager.addShaped({id: ItemID.schrabidiumChestplate, count: 1, data: 0}, [
    "x x",
    "xxx",
    "xxx"
], ['x', ItemID.ingotSchrabidium, 0]);

RecipesManager.addShaped({id: ItemID.schrabidiumLeggings, count: 1, data: 0}, [
    "xxx",
    "x x",
    "x x"
], ['x', ItemID.ingotSchrabidium, 0]);

RecipesManager.addShaped({id: ItemID.schrabidiumBoots, count: 1, data: 0}, [
    "x x",
    "x x"
], ['x', ItemID.ingotSchrabidium, 0]);


IDRegistry.genItemID("euphemiumHelmet");
Item.createArmorItem("euphemiumHelmet", "Euphemium Helmet", {name: "euphemium_helmet"}, {type: "helmet", armor: 3, durability: 1354, texture: "armor/euphemium_1.png"});

IDRegistry.genItemID("euphemiumChestplate");
Item.createArmorItem("euphemiumChestplate", "Euphemium Chestplate", {name: "euphemium_plate"}, {type: "chestplate", armor: 6, durability: 1456, texture: "armor/euphemium_1.png"});

IDRegistry.genItemID("euphemiumLeggings");
Item.createArmorItem("euphemiumLeggings", "Euphemium Leggings", {name: "euphemium_legs"}, {type: "leggings", armor: 5, durability: 1389, texture: "armor/euphemium_2.png"});

IDRegistry.genItemID("euphemiumBoots");
Item.createArmorItem("euphemiumBoots", "Euphemium Boots", {name: "euphemium_boots"}, {type: "boots", armor: 4, durability: 1323, texture: "armor/euphemium_1.png"});

RecipesManager.addShaped({id: ItemID.euphemiumHelmet, count: 1, data: 0}, [
    "xxx",
    "x x"
], ['x', ItemID.ingotEuphemium, 0]);

RecipesManager.addShaped({id: ItemID.euphemiumChestplate, count: 1, data: 0}, [
    "x x",
    "xxx",
    "xxx"
], ['x', ItemID.ingotEuphemium, 0]);

RecipesManager.addShaped({id: ItemID.euphemiumLeggings, count: 1, data: 0}, [
    "xxx",
    "x x",
    "x x"
], ['x', ItemID.ingotEuphemium, 0]);

RecipesManager.addShaped({id: ItemID.euphemiumBoots, count: 1, data: 0}, [
    "x x",
    "x x"
], ['x', ItemID.ingotEuphemium, 0]);




// GENERATIOn 

    
    // Beryllium Ore
    for(var i = 0; i < 22; i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 40);
        GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreBeryllium, 0, 4);          
    }
    
    
    
    // Tungsten Ore 
    for(var i = 0; i < 21; i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 35);
        GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreTungsten, 0, 3);          
    }


    // Schrabidium Ore
    for(var i = 0; i < 23; i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 32);
        GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreSchrabidium, 0, 4);          
    }
    
    // Uranium Ore
    for(var i = 0; i < 18; i++){
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 0, 44);
        GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreUranium, 0, 3);          
    }
    

// Uranium Block
IDRegistry.genBlockID("blockUranium"); 
Block.createBlock("blockUranium", [{name: "Uranium Block", texture: [["block_uranium", 0]], inCreative: true}], "opaque");
Block.setDestroyTime(BlockID.blockUranium, 3);
ToolAPI.registerBlockMaterial(BlockID.blockUranium, "stone", 3, true);

RecipesManager.addShaped({id: BlockID.blockUranium, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.ingotUranium, 0]);