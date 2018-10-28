// Military
IDRegistry.genItemID("eggMilitary");
Item.createItem("eggMilitary", "Military Egg", {name: "egg_military", meta: 0}, {isTech:false, stack: 64});

Item.registerUseFunctionForID(ItemID.eggMilitary, function(coords, item, block) {
    coords = coords.relative;
    Entity.spawnCustom("military", coords.x + .5, coords.y + .5, coords.z + .5);
});