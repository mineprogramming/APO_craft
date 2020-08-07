// Forge Hammer
IDRegistry.genItemID("craftingHammer");
Item.createItem("craftingHammer", "Forge Hammer", {name: "crafting_hammer"}, {stack: 1});
Item.setMaxDamage(ItemID.craftingHammer, CRAFTING_TOOL_MAX_DAMAGE);

// Cutter
IDRegistry.genItemID("craftingCutter");
Item.createItem("craftingCutter", "Cutter", {name: "crafting_cutter"}, {stack: 1});
Item.setMaxDamage(ItemID.craftingCutter, CRAFTING_TOOL_MAX_DAMAGE);

// Recipes are permanently moved to items/components/metals.js to satisfy dependencies