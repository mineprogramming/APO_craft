// Helmets
IDRegistry.genItemID("helmetMilitary");
Item.createArmorItem("helmetMilitary", "Military Helmet", {name: "helmet_military"}, {type: "helmet", armor: 5, durability: 149, texture: "armor/helmet_military.png"});

IDRegistry.genItemID("helmetAltyn");
Item.createArmorItem("helmetAltyn", "Altyn Helmet", {name: "helmet_altyn"}, {type: "helmet", armor: 7, durability: 149, texture: "armor/helmet_altyn.png"});

IDRegistry.genItemID("helmetOpsCore");
Item.createArmorItem("helmetOpsCore", "OPS CORE Helmet", {name: "helmet_ops_core"}, {type: "helmet", armor: 7, durability: 149, texture: "armor/helmet_ops_core.png"});

IDRegistry.genItemID("helmetShch1");
Item.createArmorItem("helmetShch1", "Shch 1", {name: "helmet_shch_1"}, {type: "helmet", armor: 7, durability: 149, texture: "armor/helmet_shch_1.png"});


// Body Armor
IDRegistry.genItemID("chestplateBKZ6");
Item.createArmorItem("chestplateBKZ6", "BKZ-6 Body Armor", {name: "chestplate_bkz_6"}, {type: "chestplate", armor: 15, durability: 149, texture: "armor/chestplate_bkz_6.png"});

IDRegistry.genItemID("chestplateIOTVgen3");
Item.createArmorItem("chestplateIOTVgen3", "IOTV gen3 Body Armor", {name: "chestplate_iotv_gen3"}, {type: "chestplate", armor: 15, durability: 149, texture: "armor/chestplate_iotv_gen3.png"});

IDRegistry.genItemID("chestplate6B43");
Item.createArmorItem("chestplate6B43", "6B43 Body Armor", {name: "chestplate_6b34"}, {type: "chestplate", armor: 15, durability: 149, texture: "armor/chestplate_6b34.png"});

IDRegistry.genItemID("chestplateSplinterVest");
Item.createArmorItem("chestplateSplinterVest", "Splinter vest", {name: "chestplate_splinter_vest"}, {type: "chestplate", armor: 15, durability: 149, texture: "armor/chestplate_splinter_vest.png"});


// Leggings
IDRegistry.genItemID("leggingsPantsArmy");
Item.createArmorItem("leggingsPantsArmy", "Army Pants", {name: "pants_army"}, {type: "leggings", armor: 15, durability: 149, texture: "armor/pants_army.png"});


// Boots
IDRegistry.genItemID("bootsArmy");
Item.createArmorItem("bootsArmy", "Army Boots", {name: "boots_army"}, {type: "boots", armor: 15, durability: 149, texture: "armor/boots_army.png"});


// Exoskeleton
IDRegistry.genItemID("helmetExo");
IDRegistry.genItemID("chestplateExo");
IDRegistry.genItemID("leggingsExo");
IDRegistry.genItemID("bootsExo");

Item.createArmorItem("helmetExo", "Exo Helmet", {name: "helmet_exo"}, {type: "helmet", armor: 100, durability: 1000, texture: "armor/exo_1.png"});
Item.createArmorItem("chestplateExo", "Exo Chestplate", {name: "chestplate_exo"}, {type: "chestplate", armor: 100, durability: 1000, texture: "armor/exo_1.png"});
Item.createArmorItem("leggingsExo", "Exo Leggings", {name: "leggings_exo"}, {type: "leggings", armor: 100, durability: 1000, texture: "armor/exo_2.png"});
Item.createArmorItem("bootsExo", "Exo Boots", {name: "boots_exo"}, {type: "boots", armor: 100, durability: 1000, texture: "armor/exo_1.png"});

var armorExo = [ItemID.helmetExo, ItemID.chestplateExo, ItemID.leggingsExo, ItemID.bootsExo];


// Can armor
IDRegistry.genItemID("helmetCan");
IDRegistry.genItemID("chestplateCan");
IDRegistry.genItemID("leggingsCan");
IDRegistry.genItemID("bootsCan");

Item.createArmorItem("helmetCan", "Can Helmet", {name: "helmet_can"}, {type: "helmet", armor: 2, durability: 160, texture: "armor/can_1.png"});
Item.createArmorItem("chestplateCan", "Can Chestplate", {name: "chestplate_can"}, {type: "chestplate", armor: 5, durability: 235, texture: "armor/can_1.png"});
Item.createArmorItem("leggingsCan", "Can Leggings", {name: "leggings_can"}, {type: "leggings", armor: 4, durability: 220, texture: "armor/can_2.png"});
Item.createArmorItem("bootsCan", "Can Boots", {name: "boots_can"}, {type: "boots", armor: 2, durability: 190, texture: "armor/can_1.png"});

RecipiesManager.addShaped({id: ItemID.helmetCan, count: 1, data: 0}, [
     "aaa",
     "a a",
     "   "
], ['a', ItemID.can, 0]);

RecipiesManager.addShaped({id: ItemID.chestplateCan, count: 1, data: 0}, [
     "a a",
     "aaa",
     "aaa"
], ['a', ItemID.can, 0]);

RecipiesManager.addShaped({id: ItemID.leggingsCan, count: 1, data: 0}, [
     "a a",
     "a a",
     "a a"
], ['a', ItemID.can, 0]);

RecipiesManager.addShaped({id: ItemID.bootsCan, count: 1, data: 0}, [
     "   ",
     "a a",
     "a a"
], ['a', ItemID.can, 0]);


// Cardboard Box
IDRegistry.genItemID("chestplateCardboard");
Item.createArmorItem("chestplateCardboard", "Cardboard Box", {name: "chestplate_cardboard"}, {type: "chestplate", armor: 1, durability: 15, texture: "armor/chestplate_cardboard.png"});

//DansTS code...

IDRegistry.genItemID("hazmatMask");
Item.createArmorItem("hazmatMask", "Hazmat Mask", {name: "gas_mask"}, {type: "helmet", armor: 1, durability: 92, texture: "armor/MaskOfInfamy_1.png"});

IDRegistry.genItemID("clothHazmat");
Item.createItem("clothHazmat", "Hazmat Cloth", {name: "hazmat_cloth"});

IDRegistry.genItemID("hazmatHelmet");
Item.createArmorItem("hazmatHelmet", "Hazmat Helmet", {name: "hazmat_helmet"}, {type: "helmet", armor: 3, durability: 149, texture: "armor/hazmat_1.png"});

IDRegistry.genItemID("hazmatChestplate");
Item.createArmorItem("hazmatChestplate", "Hazmat Chestplate", {name: "hazmat_plate"}, {type: "chestplate", armor: 4, durability: 216, texture: "armor/hazmat_1.png"});

IDRegistry.genItemID("hazmatLeggings");
Item.createArmorItem("hazmatLeggings", "Hazmat Leggings", {name: "hazmat_legs"}, {type: "leggings", armor: 2, durability: 203, texture: "armor/hazmat_2.png"});

IDRegistry.genItemID("hazmatBoots");
Item.createArmorItem("hazmatBoots", "Hazmat Boots", {name: "hazmat_boots"}, {type: "boots", armor: 2, durability: 176, texture: "armor/hazmat_1.png"});

Recipes.addShaped({id: ItemID.hazmatHelmet, count: 1, data: 0}, [
    "xxx",
    "xbx"
], ['x', ItemID.clothHazmat, 0, 'b', ItemID.hazmatMask, 0]);

Recipes.addShaped({id: ItemID.hazmatChestplate, count: 1, data: 0}, [
    "x x",
    "xxx",
    "xxx"
], ['x', ItemID.clothHazmat, 0]);

Recipes.addShaped({id: ItemID.hazmatLeggings, count: 1, data: 0}, [
    "xxx",
    "x x",
    "x x"
], ['x', ItemID.clothHazmat, 0]);

Recipes.addShaped({id: ItemID.hazmatBoots, count: 1, data: 0}, [
    "x x",
    "x x"
], ['x', ItemID.clothHazmat, 0]);


IDRegistry.genItemID("schrabidiumHelmet");
Item.createArmorItem("schrabidiumHelmet", "Schrabidium Helmet", {name: "schrabidium_helmet"}, {type: "helmet", armor: 4, durability: 1124, texture: "armor/schrabidium_1.png"});

IDRegistry.genItemID("schrabidiumChestplate");
Item.createArmorItem("schrabidiumChestplate", "Schrabidium Chestplate", {name: "schrabidium_plate"}, {type: "chestplate", armor: 6, durability: 1286, texture: "armor/schrabidium_1.png"});

IDRegistry.genItemID("schrabidiumLeggings");
Item.createArmorItem("schrabidiumLeggings", "Schrabidium Leggings", {name: "schrabidium_legs"}, {type: "leggings", armor: 5, durability: 1134, texture: "armor/schrabidium_2.png"});

IDRegistry.genItemID("schrabidiumBoots");
Item.createArmorItem("schrabidiumBoots", "Schrabidium Boots", {name: "schrabidium_boots"}, {type: "boots", armor: 4, durability: 1116, texture: "armor/schrabidium_1.png"});

Recipes.addShaped({id: ItemID.schrabidiumHelmet, count: 1, data: 0}, [
    "xxx",
    "x x"
], ['x', ItemID.ingotScrar, 0]);

Recipes.addShaped({id: ItemID.schrabidiumChestplate, count: 1, data: 0}, [
    "x x",
    "xxx",
    "xxx"
], ['x', ItemID.ingotScrar, 0]);

Recipes.addShaped({id: ItemID.schrabidiumLeggings, count: 1, data: 0}, [
    "xxx",
    "x x",
    "x x"
], ['x', ItemID.ingotScrar, 0]);

Recipes.addShaped({id: ItemID.schrabidiumBoots, count: 1, data: 0}, [
    "x x",
    "x x"
], ['x', ItemID.ingotScrar, 0]);


IDRegistry.genItemID("euphemiumHelmet");
Item.createArmorItem("euphemiumHelmet", "Euphemium Helmet", {name: "euphemium_helmet"}, {type: "helmet", armor: 3, durability: 1354, texture: "armor/euphemium_1.png"});

IDRegistry.genItemID("euphemiumChestplate");
Item.createArmorItem("euphemiumChestplate", "Euphemium Chestplate", {name: "euphemium_plate"}, {type: "chestplate", armor: 6, durability: 1456, texture: "armor/euphemium_1.png"});

IDRegistry.genItemID("euphemiumLeggings");
Item.createArmorItem("euphemiumLeggings", "Euphemium Leggings", {name: "euphemium_legs"}, {type: "leggings", armor: 5, durability: 1389, texture: "armor/euphemium_2.png"});

IDRegistry.genItemID("euphemiumBoots");
Item.createArmorItem("euphemiumBoots", "Euphemium Boots", {name: "euphemium_boots"}, {type: "boots", armor: 4, durability: 1323, texture: "armor/euphemium_1.png"});

Recipes.addShaped({id: ItemID.euphemiumHelmet, count: 1, data: 0}, [
    "xxx",
    "x x"
], ['x', ItemID.ingotEup, 0]);

Recipes.addShaped({id: ItemID.euphemiumChestplate, count: 1, data: 0}, [
    "x x",
    "xxx",
    "xxx"
], ['x', ItemID.ingotEup, 0]);

Recipes.addShaped({id: ItemID.euphemiumLeggings, count: 1, data: 0}, [
    "xxx",
    "x x",
    "x x"
], ['x', ItemID.ingotEup, 0]);

Recipes.addShaped({id: ItemID.euphemiumBoots, count: 1, data: 0}, [
    "x x",
    "x x"
], ['x', ItemID.ingotEup, 0]);

