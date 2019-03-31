// Military Egg
IDRegistry.genItemID("eggMilitary");
Item.createItem("eggMilitary", "Military Egg", {name: "egg_military", meta: 0}, {stack: 64});

Item.registerUseFunctionForID(ItemID.eggMilitary, function(coords, item, block) {
    coords = coords.relative;
    Military.spawn(coords.x + .5, coords.y + .5, coords.z + .5);
});


// Survived Egg
IDRegistry.genItemID("eggSurvived");
Item.createItem("eggSurvived", "Survived Egg", {name: "egg_survived", meta: 0}, {stack: 64});

Item.registerUseFunctionForID(ItemID.eggSurvived, function(coords, item, block) {
    coords = coords.relative;
    Survived.spawn(coords.x + .5, coords.y + .5, coords.z + .5);
});


// Mutant Egg
IDRegistry.genItemID("eggMutant");
Item.createItem("eggMutant", "Mutant Egg", {name: "egg_mutant", meta: 0}, {stack: 64});

Item.registerUseFunctionForID(ItemID.eggMutant, function(coords, item, block) {
    coords = coords.relative;
    Mutant.spawn(coords.x + .5, coords.y + .5, coords.z + .5);
});


// Dementor Egg
IDRegistry.genItemID("eggDementor");
Item.createItem("eggDementor", "Dementor Egg", {name: "egg_dementor", meta: 0}, {stack: 64});

Item.registerUseFunctionForID(ItemID.eggDementor, function(coords, item, block) {
    coords = coords.relative;
    Dementor.spawn(coords.x + .5, coords.y + .5, coords.z + .5);
});