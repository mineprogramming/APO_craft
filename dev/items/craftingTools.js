IDRegistry.genItemID("craftingHammer");
Item.createItem("craftingHammer", "Forge Hammer", {name: "crafting_hammer"}, {stack: 1});
Item.setMaxDamage(ItemID.craftingHammer, CRAFTING_TOOL_MAX_DAMAGE);


IDRegistry.genItemID("craftingCutter");
Item.createItem("craftingCutter", "Cutter", {name: "crafting_cutter"}, {stack: 1});
Item.setMaxDamage(ItemID.craftingCutter, CRAFTING_TOOL_MAX_DAMAGE);

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