/* Metals (Thanks to DansTS) */

// Magnesium 
IDRegistry.genItemID("magnesium");
Item.createItem("magnesium", "Magnesium", {name: "magnesium"});

/* INGOTS */

// Titanium Ingot
IDRegistry.genItemID("ingotTitanium");
Item.createItem("ingotTitanium", "Titanium Ingot", {name: "ingot_titanium"});
Recipes.addFurnace(BlockID.oreTitanium, ItemID.ingotTitanium, 0);

// Steel Ingot
IDRegistry.genItemID("ingotSteel");
Item.createItem("ingotSteel", "Steel Ingot", {name: "ingot_steel"});
// If IC2 is not installed, enable steel production in furnace
Callback.addCallback("PostLoaded", function(){
    if(!ICore){ 
        Recipes.addFurnace(265, ItemID.ingotSteel, 0);
    }
});


// Lead Ingot
IDRegistry.genItemID("ingotLead");
Item.createItem("ingotLead", "Lead Ingot", {name: "ingot_lead"});
Recipes.addFurnace(BlockID.oreLead, ItemID.ingotLead, 0);

// Aluminum Ingot
IDRegistry.genItemID("ingotAluminum");
Item.createItem("ingotAluminum", "Aluminum Ingot", {name: "ingot_aluminum"});
Recipes.addFurnace(BlockID.oreAluminum, ItemID.ingotAluminum, 0);

// Copper Ingot
IDRegistry.genItemID("ingotCopper");
Item.createItem("ingotCopper", "Copper Ingot", {name: "ingot_copper"});
Recipes.addFurnace(BlockID.oreCopper, ItemID.ingotCopper, 0);

// Red Copper Ingot
IDRegistry.genItemID("ingotCopperRed");
Item.createItem("ingotCopperRed", "Red Copper Ingot", {name: "ingot_red_copper"});
Recipes.addFurnace(ItemID.ingotCopper, ItemID.ingotCopperRed, 0);

// Tin Ingot
IDRegistry.genItemID("ingotTin");
Item.createItem("ingotTin", "Tin Ingot", {name: "ingot_tin"});
Recipes.addFurnace(BlockID.oreTin, ItemID.ingotTin, 0);

// Solder Ingot
IDRegistry.genItemID("ingotSolder");
Item.createItem("ingotSolder", "Solder Ingot", {name: "ingot_solder"});
RecipesManager.addShapeless({id: ItemID.ingotSolder, count: 2, data: 0}, [{id: ItemID.ingotTin, data: 0}, {id: ItemID.ingotLead, data: 0}]);


/* PLATES */

// Titanium Plate
IDRegistry.genItemID("plateTitanium");
Item.createItem("plateTitanium", "Titanium Plate", {name: "plate_titanium"});
RecipesManager.addRecipeWithCraftingTool({id: ItemID.plateTitanium, count: 1, data: 0}, [{id: ItemID.ingotTitanium, data: 0}], ItemID.craftingHammer);

// Iron Plate
IDRegistry.genItemID("plateIron");
Item.createItem("plateIron", "Iron Plate", {name: "plate_iron"});
RecipesManager.addRecipeWithCraftingTool({id: ItemID.plateIron, count: 1, data: 0}, [{id: 265, data: 0}], ItemID.craftingHammer);

// Aluminum Plate
IDRegistry.genItemID("plateAluminum");
Item.createItem("plateAluminum", "Aluminum Plate", {name: "plate_aluminum"});
RecipesManager.addRecipeWithCraftingTool({id: ItemID.plateAluminum, count: 1, data: 0}, [{id: ItemID.ingotAluminum, data: 0}], ItemID.craftingHammer);

// Steel Plate
IDRegistry.genItemID("plateSteel");
Item.createItem("plateSteel", "Steel Plate", {name: "plate_steel"});
RecipesManager.addRecipeWithCraftingTool({id: ItemID.plateSteel, count: 1, data: 0}, [{id: ItemID.ingotSteel, data: 0}], ItemID.craftingHammer);

// Lead Plate
IDRegistry.genItemID("plateLead");
Item.createItem("plateLead", "Lead Plate", {name: "plate_lead"});
RecipesManager.addRecipeWithCraftingTool({id: ItemID.plateLead, count: 1, data: 0}, [{id: ItemID.ingotLead, data: 0}], ItemID.craftingHammer);

// Gold Plate
IDRegistry.genItemID("plateGold");
Item.createItem("plateGold", "Gold Plate", {name: "plate_gold"});
RecipesManager.addRecipeWithCraftingTool({id: ItemID.plateGold, count: 1, data: 0}, [{id: 266, data: 0}], ItemID.craftingHammer);

// Alloy Plate
IDRegistry.genItemID("plateAlloy");
Item.createItem("plateAlloy", "Alloy Plate", {name: "plate_advanced_alloy"});

// Copper Plate
IDRegistry.genItemID("plateCopper");
Item.createItem("plateCopper", "Copper Plate", {name: "plate_copper"});
RecipesManager.addRecipeWithCraftingTool({id: ItemID.plateCopper, count: 1, data: 0}, [{id: ItemID.ingotCopper, data: 0}], ItemID.craftingHammer);

// Tin Plate
IDRegistry.genItemID("plateTin");
Item.createItem("plateTin", "Tin Plate", {name: "plate_tin"});
RecipesManager.addRecipeWithCraftingTool({id: ItemID.plateTin, count: 1, data: 0}, [{id: ItemID.ingotTin, data: 0}], ItemID.craftingHammer);


/* NUGGETS */

// Lead Nugget
IDRegistry.genItemID("nuggetLead");
Item.createItem("nuggetLead", "Lead Nugget", {name: "nugget_lead"});
RecipesManager.addShapeless({id: ItemID.nuggetLead, count: 9, data: 0}, [{id: ItemID.ingotLead, data: 0}]);
RecipesManager.addShaped({id: ItemID.ingotLead, count: 1, data: 0}, [
    "aaa",
    "aaa",
    "aaa"
], ['a', ItemID.nuggetLead, 0]);


/* DUSTS */

// Lead Dust
IDRegistry.genItemID("dustLead");
Item.createItem("dustLead", "Lead Dust", {name: "dust_lead"});

// Iron Dust
IDRegistry.genItemID("dustIron");
Item.createItem("dustIron", "Iron Dust", {name: "dust_iron"});


/* CABLES */

// Copper Cable
IDRegistry.genItemID("cableCopper0");
Item.createItem("cableCopper0", "Copper Cable", {name: "cable_copper", meta: 0});
RecipesManager.addRecipeWithCraftingTool({id: ItemID.cableCopper0, count: 3, data: 0}, [{id: ItemID.plateCopper, data: 0}], ItemID.craftingCutter);

// Lead Cable
IDRegistry.genItemID("cableLead0");
Item.createItem("cableLead0", "Lead Cable", {name: "cable_lead", meta: 0});
RecipesManager.addRecipeWithCraftingTool({id: ItemID.cableLead0, count: 3, data: 0}, [{id: ItemID.plateLead, data: 0}], ItemID.craftingCutter);


/* RODS */

// Iron Rod
IDRegistry.genItemID("rodIron");
Item.createItem("rodIron", "Iron Rod", {name: "rod_iron", meta: 0});

// Steel Rod
IDRegistry.genItemID("rodSteel");
Item.createItem("rodSteel", "Steel Rod", {name: "rod_steel", meta: 0});

// Titanium Rod
IDRegistry.genItemID("rodTitanium");
Item.createItem("rodTitanium", "Titanium Rod", {name: "rod_titanium", meta: 0});

// Copper Rod
IDRegistry.genItemID("rodCopper");
Item.createItem("rodCopper", "Copper Rod", {name: "rod_copper", meta: 0});


/* COILS */

// Copper Coil
IDRegistry.genItemID("coilCopper");
Item.createItem("coilCopper", "Copper Coil", {name: "coil_copper", meta: 0});
RecipesManager.addShaped({id: ItemID.coilCopper, count: 1, data: 0}, [
    "aaa",
    "aba",
    "aaa"
], ['a', ItemID.cableCopper0, 0, 'b', ItemID.rodIron, 0]);


/* ROLLER */

// Roller
IDRegistry.genItemID("roller");
Item.createItem("roller", "Roller", {name: "roller", meta: 0});


/* Liquids */

// Liquid solder
LiquidRegistry.registerLiquid("liquidSolder", "Liquid Solder", ["liquid_solder"]);


/* Crafting tools recipes - depend on metals */
RecipesManager.addShaped({id: ItemID.craftingHammer, count: 1, data: 0}, [
    "xx ",
    "x##",
    "xx "
], ['x', 265, 0, '#', 280, 0]);

RecipesManager.addShaped({id: ItemID.craftingCutter, count: 1, data: 0}, [
    "x x",
    " x ",
    "a a"
], ['a', 265, 0, 'x', ItemID.plateIron, 0]);


