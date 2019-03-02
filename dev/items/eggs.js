// Military
IDRegistry.genItemID("eggMilitary");
Item.createItem("eggMilitary", "Military Egg", {name: "egg_military", meta: 0}, {isTech:false, stack: 64});

Item.registerUseFunctionForID(ItemID.eggMilitary, function(coords, item, block) {
    coords = coords.relative;
    Military.spawn(coords.x + .5, coords.y + .5, coords.z + .5);
});


// Survived
IDRegistry.genItemID("eggSurvived");
Item.createItem("eggSurvived", "Survived Egg", {name: "egg_survived", meta: 0}, {isTech:false, stack: 64});

Item.registerUseFunctionForID(ItemID.eggSurvived, function(coords, item, block) {
    coords = coords.relative;
    Survived.spawn(coords.x + .5, coords.y + .5, coords.z + .5);
});


// Dementor
IDRegistry.genItemID("eggDementor");
Item.createItem("eggDementor", "Dementor Egg", {name: "egg_dementor", meta: 0}, {isTech:false, stack: 64});

Item.registerUseFunctionForID(ItemID.eggDementor, function(coords, item, block) {
    coords = coords.relative;
    Dementor.spawn(coords.x + .5, coords.y + .5, coords.z + .5);
});


