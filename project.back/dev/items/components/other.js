/* Trading */

// Silver
IDRegistry.genItemID("silver");
Item.createItem("silver", "Silver", {name: "silver", meta: 0}, {});


/*Oil distillation products */

// Waste
IDRegistry.genItemID("waste");
Item.createItem("waste", "Waste", {name: "waste", meta: 0}, {});

// Quartz Dust
IDRegistry.genItemID("dustQuartz");
Item.createItem("dustQuartz", "Quartz Dust", {name: "dust_quartz", meta: 0}, {});

// Bitumen
IDRegistry.genItemID("bitumen");
Item.createItem("bitumen", "Bitumen", {name: "bitumen", meta: 0}, {});

// Propylene
IDRegistry.genItemID("propylene");
Item.createItem("propylene", "Propylene", {name: "propylene", meta: 0}, {});

// Oil Resin
IDRegistry.genItemID("oilResin");
Item.createItem("oilResin", "Oil Resin", {name: "oil_resin", meta: 0}, {});

// Fuel Oil
IDRegistry.genItemID("oilFuel");
Item.createItem("oilFuel", "Fuel Oil", {name: "oil_fuel", meta: 0}, {});
Recipes.addFurnaceFuel(ItemID.oilFuel, 0, 1000);

// Petrol
IDRegistry.genItemID("petrol");
Item.createItem("petrol", "Petrol", {name: "petrol", meta: 0}, {});
Recipes.addFurnaceFuel(ItemID.petrol, 0, 3000);

// Kerosene
IDRegistry.genItemID("kerosene");
Item.createItem("kerosene", "Kerosene", {name: "kerosene", meta: 0}, {});
Recipes.addFurnaceFuel(ItemID.kerosene, 0, 3000);


/* Coal coking products*/

// Coal Tar
IDRegistry.genItemID("tarCoal");
Item.createItem("tarCoal", "Coal Tar", {name: "tar_coal", meta: 0}, {});

// Coke
IDRegistry.genItemID("coke");
Item.createItem("coke", "Coke", {name: "coke", meta: 0}, {});
Recipes.addFurnaceFuel(ItemID.coke, 0, 2000);


/* Textolite production */

// Glass Thread
IDRegistry.genItemID("threadGlass");
Item.createItem("threadGlass", "Glass Thread", {name: "thread_glass", meta: 0}, {});

// Fiberglass
IDRegistry.genItemID("fiberglass");
Item.createItem("fiberglass", "Fiberglass", {name: "fiberglass", meta: 0}, {});

RecipesManager.addShaped({id: ItemID.fiberglass, count: 1, data: 0}, [
     "aaa",
     "aaa",
     "aaa"
], ['a', ItemID.threadGlass, 0]);

// Textolite
IDRegistry.genItemID("textolite");
Item.createItem("textolite", "Textolite", {name: "textolite", meta: 0}, {});

RecipesManager.addShaped({id: ItemID.textolite, count: 2, data: 0}, [
     "aaa",
     "bbb",
     "aaa"
], ['a', ItemID.fiberglass, 0, 'b', ItemID.tarCoal, 0]);

RecipesManager.addShaped({id: ItemID.textolite, count: 2, data: 0}, [
     "aaa",
     "bbb",
     "aaa"
], ['a', ItemID.fiberglass, 0, 'b', ItemID.oilResin, 0]);

// Foil Textolite
IDRegistry.genItemID("textoliteFoil");
Item.createItem("textoliteFoil", "Foil Textolite", {name: "textolite_foil", meta: 0}, {});
RecipesManager.addShaped({id: ItemID.textoliteFoil, count: 3, data: 0}, [
     "aaa",
     "bbb",
     "aaa"
], ['a', ItemID.plateCopper, 0, 'b', ItemID.textolite, 0]);


/* Plastics */

// Granules of Polypropylene
IDRegistry.genItemID("granulesPolypropylene");
Item.createItem("granulesPolypropylene", "Granules of Polypropylene", {name: "granules_polypropylene", meta: 0}, {});

// Polypropylene Plate
IDRegistry.genItemID("platePolypropylene");
Item.createItem("platePolypropylene", "Polypropylene Plate", {name: "plate_polypropylene", meta: 0}, {});

// Polypropylene Blade
IDRegistry.genItemID("bladePolypropylene");
Item.createItem("bladePolypropylene", "Polypropylene Blade", {name: "blade_polypropylene", meta: 0}, {});

// Polypropylene Casing
IDRegistry.genItemID("casingPolypropylene");
Item.createItem("casingPolypropylene", "Polypropylene Casing", {name: "casing_polypropylene", meta: 0}, {});
RecipesManager.addShaped({id: ItemID.casingPolypropylene, count: 3, data: 0}, [
     "aa",
     "aa",
     "aa"
], ['a', ItemID.platePolypropylene, 0]);


/* Other materials */

// Assembly Line
IDRegistry.genItemID("lineAssembly");
Item.createItem("lineAssembly", "Assembly Line", {name: "line_assembly", meta: 0}, {});
RecipesManager.addShaped({id: ItemID.lineAssembly, count: 1, data: 0}, [
     "aaa",
     "b b"
], ['a', ItemID.plateIron, 0, 'b', ItemID.roller, 0]);

// Chopper
IDRegistry.genItemID("chopper");
Item.createItem("chopper", "Chopper", {name: "chopper", meta: 0}, {});
RecipesManager.addShaped({id: ItemID.chopper, count: 0, data: 0}, [
     " a ",
     "a a",
     " a ",
], ['a', 265, 0]);


// Scrap from Waste
Callback.addCallback("ICore", function(api){
    RecipesManager.addShaped({id: ItemID.scrap, count: 1, data: 0}, [
        "aaa",
        "aaa",
        "aaa"
    ], ['a', ItemID.waste, 0]);
});


/* Chips production */

// Silicon
IDRegistry.genItemID("silicon");
Item.createItem("silicon", "Silicon", {name: "silicon", meta: 0}, {});
RecipesManager.addShapeless({id: ItemID.silicon, count: 1, data: 0}, [{id: ItemID.magnesium, data: 0}, {id: 406, data: 0}]);


// Silicon Crystal
IDRegistry.genItemID("crystalSilicon");
Item.createItem("crystalSilicon", "Silicon Crystal", {name: "crystal_silicon", meta: 0}, {});


