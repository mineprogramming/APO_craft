// Military
IDRegistry.genItemID("eggMilitary");
Item.createItem("eggMilitary", "Military Egg", {name: "egg_military", meta: 0}, {isTech:false, stack: 64});

Item.registerUseFunctionForID(ItemID.eggMilitary, function(coords, item, block) {
    coords = coords.relative;
    let entity = Entity.spawnCustom("military", coords.x + .5, coords.y + .5, coords.z + .5);
    armorMilitary.equip(entity.entity);
});


// Dementor
IDRegistry.genItemID("eggDementor");
Item.createItem("eggDementor", "Dementor Egg", {name: "egg_dementor", meta: 0}, {isTech:false, stack: 64});

Item.registerUseFunctionForID(ItemID.eggDementor, function(coords, item, block) {
    coords = coords.relative;
    let entity = Entity.spawnCustom("dementor", coords.x + .5, coords.y + .5, coords.z + .5);
});

