/* Trading */

//Silver
IDRegistry.genItemID("silver");
Item.createItem("silver", "Silver", {name: "silver", meta: 0}, {});

/*Oil distillation products */

//Waste
IDRegistry.genItemID("waste");
Item.createItem("waste", "Waste", {name: "waste", meta: 0}, {});

//Quartz Dust
IDRegistry.genItemID("dustQuartz");
Item.createItem("dustQuartz", "Quartz Dust", {name: "dust_quartz", meta: 0}, {});

//Bitumen
IDRegistry.genItemID("bitumen");
Item.createItem("bitumen", "Bitumen", {name: "bitumen", meta: 0}, {});

//Propylene
IDRegistry.genItemID("propylene");
Item.createItem("propylene", "Propylene", {name: "propylene", meta: 0}, {});

//Oil Resin
IDRegistry.genItemID("oilResin");
Item.createItem("oilResin", "Oil Resin", {name: "oil_resin", meta: 0}, {});

//Fuel Oil
IDRegistry.genItemID("oilFuel");
Item.createItem("oilFuel", "Fuel Oil", {name: "oil_fuel", meta: 0}, {});
Recipes.addFurnaceFuel(ItemID.oilFuel, 0, 1000);

//Petrol
IDRegistry.genItemID("petrol");
Item.createItem("petrol", "Petrol", {name: "petrol", meta: 0}, {});
Recipes.addFurnaceFuel(ItemID.petrol, 0, 3000);

//Kerosene
IDRegistry.genItemID("kerosene");
Item.createItem("kerosene", "Kerosene", {name: "kerosene", meta: 0}, {});
Recipes.addFurnaceFuel(ItemID.kerosene, 0, 3000);



/* Coal coking products*/

//Coal Tar
IDRegistry.genItemID("tarCoal");
Item.createItem("tarCoal", "Coal Tar", {name: "tar_coal", meta: 0}, {});

//Coke
IDRegistry.genItemID("coke");
Item.createItem("coke", "Coke", {name: "coke", meta: 0}, {});
Recipes.addFurnaceFuel(ItemID.coke, 0, 2000);



/* Textolite production */

//Glass Thread
IDRegistry.genItemID("threadGlass");
Item.createItem("threadGlass", "Glass Thread", {name: "thread_glass", meta: 0}, {});

//Fiberglass
IDRegistry.genItemID("fiberglass");
Item.createItem("fiberglass", "Fiberglass", {name: "fiberglass", meta: 0}, {});

RecipiesManager.addShaped({id: ItemID.fiberglass, count: 1, data: 0}, [
     "aaa",
     "aaa",
     "aaa"
], ['a', ItemID.threadGlass, 0]);

//Textolite
IDRegistry.genItemID("textolite");
Item.createItem("textolite", "Textolite", {name: "textolite", meta: 0}, {});

RecipiesManager.addShaped({id: ItemID.textolite, count: 2, data: 0}, [
     "aaa",
     "bbb",
     "aaa"
], ['a', ItemID.fiberglass, 0, 'b', ItemID.tarCoal, 0]);

RecipiesManager.addShaped({id: ItemID.textolite, count: 2, data: 0}, [
     "aaa",
     "bbb",
     "aaa"
], ['a', ItemID.fiberglass, 0, 'b', ItemID.oilResin, 0]);



/* Plastics */

//Granules of Polypropylene
IDRegistry.genItemID("granulesPolypropylene");
Item.createItem("granulesPolypropylene", "Granules of Polypropylene", {name: "granules_polypropylene", meta: 0}, {});

/* Press Forms */

//Plate Press Form
IDRegistry.genItemID("pressFormPlate");
Item.createItem("pressFormPlate", "Plate Press Form", {name: "press_form", meta: 0}, {});

//Polypropylene Plate
IDRegistry.genItemID("platePolypropylene");
Item.createItem("platePolypropylene", "Polypropylene Plate", {name: "plate_polypropylene", meta: 0}, {});

//Polypropylene Casing
IDRegistry.genItemID("casingPolypropylene");
Item.createItem("casingPolypropylene", "Polypropylene Casing", {name: "casing_polypropylene", meta: 0}, {});

RecipiesManager.addShaped({id: ItemID.casingPolypropylene, count: 3, data: 0}, [
     "aa",
     "aa",
     "aa"
], ['a', ItemID.platePolypropylene, 0]);



/* Metals */

//Copper Cable
IDRegistry.genItemID("cableCopper0");
Item.createItem("cableCopper0", "Copper Cable", {name: "cable_copper", meta: 0});



/* Light-Emitting Diodes*/

//Gallium Andesite
IDRegistry.genItemID("galliumArsenite");
Item.createItem("galliumArsenite", "Gallium Andesite", {name: "gallium_arsenite", meta: 0}, {});

//LEDs
IDRegistry.genItemID("ledRed");
IDRegistry.genItemID("ledYellow");
IDRegistry.genItemID("ledGreen");
Item.createItem("ledRed", "Red Light-Emitting Diode", {name: "led", meta: 0}, {});
Item.createItem("ledYellow", "Yellow Light-Emitting Diode", {name: "led", meta: 1}, {});
Item.createItem("ledGreen", "Green Light-Emitting Diode", {name: "led", meta: 2}, {});

RecipiesManager.addShaped({id: ItemID.ledRed, count: 16, data: 0}, [
     " a ",
     "cbc",
     "ede"
], ['a', 20, 0, 'b', 351, 1, 'c', ItemID.platePolypropylene, 0, 'd', ItemID.galliumArsenite, 0, 'e', ItemID.cableCopper0, 0]);

RecipiesManager.addShaped({id: ItemID.ledYellow, count: 16, data: 0}, [
     " a ",
     "cbc",
     "ede"
], ['a', 20, 0, 'b', 351, 11, 'c', ItemID.platePolypropylene, 0, 'd', ItemID.galliumArsenite, 0, 'e', ItemID.cableCopper0, 0]);

RecipiesManager.addShaped({id: ItemID.ledGreen, count: 16, data: 0}, [
     " a ",
     "cbc",
     "ede"
], ['a', 20, 0, 'b', 351, 2, 'c', ItemID.platePolypropylene, 0, 'd', ItemID.galliumArsenite, 0, 'e', ItemID.cableCopper0, 0]);



/* Other materials */

// Can
IDRegistry.genItemID("can");
Item.createItem("can", "Can", {name: "can", meta: 0}, {});

//Battery parts
IDRegistry.genItemID("batteryC");
Item.createItem("batteryC", "Battery casing", {name: "battery_corp"});

IDRegistry.genItemID("batteryCap");
Item.createItem("batteryCap", "Battery cap", {name: "cap_aluminium"});

//Battery
IDRegistry.genItemID("storageBattery");
Item.createItem("storageBattery", "Battery", {name: "battery_generic"});
ChargeItemRegistry.registerItem(ItemID.storageBattery, "Eu", 10000, 0, true);
Recipes.addShaped({id: ItemID.storageBattery, count: 1, data: 0}, [
    "a",
    "c",
    "b"
], ['a', ItemID.batteryCap, 0, 'c', ItemID.nuggetLead, 0, 'b', ItemID.batteryC, 0]);

IDRegistry.genItemID("storageBatteryAdv");
Item.createItem("storageBatteryAdv", "Battary Advanced", {name: "battery_advanced"});
ChargeItemRegistry.registerItem(ItemID.storageBatteryAdv, "Eu", 100000, 0, true);

Recipes.addShaped({id: ItemID.storageBatteryAdv, count: 1, data: 0}, [
    "acb" 
], ['a', ItemID.plateAlloy, 0, 'c', ItemID.storageBattery, 0, 'b', ItemID.dustSulfur, 0]);

//Connectors



//Chips
IDRegistry.genItemID("chipArduino");
IDRegistry.genItemID("chipRaspberry");
Item.createItem("chipArduino", "Arduino Central Chip", {name: "chip", meta: 0}, {});
Item.createItem("chipRaspberry", "Raspberry PI Central Chip", {name: "chip", meta: 1}, {});



//LED Display
IDRegistry.genItemID("displayLed");
Item.createItem("displayLed", "LED Display", {name: "display_led", meta: 0}, {});


//Button Set
IDRegistry.genItemID("buttonSet");
Item.createItem("buttonSet", "Button Set", {name: "button_set", meta: 0}, {});

RecipiesManager.addShaped({id: ItemID.buttonSet, count: 1, data: 0}, [
     " a ",
     "aba",
     " a "
], ['a', 143, 0, 'b', 77, 0]);

//ATtiny 45
IDRegistry.genItemID("attiny45");
Item.createItem("attiny45", "ATtiny 45", {name: "attiny45", meta: 0}, {});


//Arduino Uno
IDRegistry.genItemID("arduinoUno");
Item.createItem("arduinoUno", "Arduino Uno", {name: "arduino_uno", meta: 0}, {});


//Raspberry PI 3
IDRegistry.genItemID("raspberryPi3");
Item.createItem("raspberryPi3", "Raspberry PI 3", {name: "raspberry_pi", meta: 3}, {});


//Radiation Sensor
IDRegistry.genItemID("sensorRadiation");
Item.createItem("sensorRadiation", "Radiation Sensor", {name: "sensor_radiation", meta: 0}, {});


//Viruses Sensor
IDRegistry.genItemID("sensorViruses");
Item.createItem("sensorViruses", "Viruses Sensor", {name: "sensor_viruses", meta: 0}, {});


//Nitrates Sensor
IDRegistry.genItemID("sensorNitrates");
Item.createItem("sensorNitrates", "Nitrates Sensor", {name: "sensor_nitrates", meta: 0}, {});





Callback.addCallback("ICore", function(api){
    //Scrap from Waste
    RecipiesManager.addShaped({id: ItemID.scrap, count: 1, data: 0}, [
        "aaa",
        "aaa",
        "aaa"
    ], ['a', ItemID.waste, 0]);
});


Callback.addCallback("PostLoaded", function(){
    RecipiesManager.onRegisterRecipiesNeeded();
});


//ingots from new metals(DansTS)
IDRegistry.genItemID("ingotTung");
Item.createItem("ingotTung", "Tungsten Ingot", {name: "ingot_tungsten"});

Recipes.addFurnace(BlockID.tungstenOree, ItemID.ingotTung, 0);
Recipes.addFurnace(BlockID.tungstenOren, ItemID.ingotTung, 0);

IDRegistry.genItemID("ingotTitan");
Item.createItem("ingotTitan", "Titanium Ingot", {name: "ingot_titanium"});

Recipes.addFurnace(BlockID.titaniumOree, ItemID.ingotTitan, 0);

IDRegistry.genItemID("ingotEup");
Item.createItem("ingotEup", "Euphemium Ingot", {name: "ingot_euphemium"});

IDRegistry.genItemID("ingotNeptun");
Item.createItem("ingotNeptun", "Neptunium Ingot", {name: "ingot_neptunium"});

//machine

IDRegistry.genItemID("ingotPluton");
Item.createItem("ingotPluton", "Plutonium Ingot", {name: "ingot_plutonium"});

//machine

IDRegistry.genItemID("ingotUran");
Item.createItem("ingotUran", "Uranium Ingot", {name: "ingot_uranium"});

//machine

IDRegistry.genItemID("ingotMox");
Item.createItem("ingotMox", "Mox Fuel Ingot", {name: "ingot_mox_fuel"});

//machine

IDRegistry.genItemID("ingotScrarf");
Item.createItem("ingotScrarf", "Schrabidium Fuel Ingot", {name: "ingot_schrabidium_fuel"});

//machine

IDRegistry.genItemID("ingotScrar");
Item.createItem("ingotScrar", "Schrabidium Ingot", {name: "ingot_schrabidium"});

Recipes.addFurnace(BlockID.schrabidiumOree, ItemID.ingotScrar, 0);
Recipes.addFurnace(BlockID.schrabidiumOren, ItemID.ingotScrar, 0);
 
IDRegistry.genItemID("ingotAlloy");
Item.createItem("ingotAlloy", "Alloy Ingot", {name: "ingot_advanced_alloy"});

//machine

IDRegistry.genItemID("ingotSteel");
Item.createItem("ingotSteel", "Steel Ingot", {name: "ingot_steel"});

//machine

IDRegistry.genItemID("ingotBer");
Item.createItem("ingotBer", "Beryllium Ingot", {name: "ingot_beryllium"});

Recipes.addFurnace(BlockID.beriOree, ItemID.ingotBer, 0);

IDRegistry.genItemID("ingotLead");
Item.createItem("ingotLead", "Lead Ingot", {name: "ingot_lead"});

Recipes.addFurnace(BlockID.leadOree, ItemID.ingotLead, 0);

IDRegistry.genItemID("ingotAlluminium");
Item.createItem("ingotAlluminium", "Alluminium Ingot", {name: "ingot_aluminium"});

Recipes.addFurnace(BlockID.allumOree, ItemID.ingotAlluminium, 0);

IDRegistry.genItemID("ingotCopper");
Item.createItem("ingotCopper", "Copper Ingot", {name: "ingot_copper"});

Recipes.addFurnace(BlockID.copperOree, ItemID.ingotCopper, 0);

IDRegistry.genItemID("ingotCopperr");
Item.createItem("ingotCopperr", "Copper Red Ingot", {name: "ingot_red_copper"});

Recipes.addFurnace(ItemID.ingotCopper, ItemID.ingotCopperr, 0);

IDRegistry.genItemID("ingotTin");
Item.createItem("ingotTin", "Tin Ingot", {name: "ingot_tin"});

Recipes.addFurnace(BlockID.tinOree, ItemID.ingotTin, 0);

//Plates from new metals(DansTS)
IDRegistry.genItemID("plateTitanium");
Item.createItem("plateTitanium", "Titanium Plate", {name: "plate_titanium"});

IDRegistry.genItemID("plateSchrabidium");
Item.createItem("plateSchrabidium", "Schrabidium Plate", {name: "plate_schrabidium"});

IDRegistry.genItemID("plateIron");
Item.createItem("plateIron", "Iron Plate", {name: "plate_iron"});

IDRegistry.genItemID("plateAlum");
Item.createItem("plateAlum", "Aluminium Plate", {name: "plate_aluminium"});

IDRegistry.genItemID("plateSteel");
Item.createItem("plateSteel", "Steel Plate", {name: "plate_steel"});

IDRegistry.genItemID("plateLead");
Item.createItem("plateLead", "Lead Plate", {name: "plate_lead"});

IDRegistry.genItemID("plateGold");
Item.createItem("plateGold", "Gold Plate", {name: "plate_gold"});

IDRegistry.genItemID("plateAlloy");
Item.createItem("plateAlloy", "Gold Plate", {name: "plate_advanced_alloy"});

IDRegistry.genItemID("plateCopper");
Item.createItem("plateCopper", "Copper Plate", {name: "plate_copper"});

IDRegistry.genItemID("plateTin");
Item.createItem("plateTin", "Tin Plate", {name: "plate_tin"});


Callback.addCallback("PreLoaded", function(){
    addRecipeWithCraftingTool({id: ItemID.plateCopper, count: 1, data: 0}, [{id: ItemID.ingotCopper, data: 0}], ItemID.craftingHammer);
    addRecipeWithCraftingTool({id: ItemID.plateTin, count: 1, data: 0}, [{id: ItemID.ingotTin, data: 0}], ItemID.craftingHammer);
    addRecipeWithCraftingTool({id: ItemID.plateSchrabidium, count: 1, data: 0}, [{id: ItemID.ingotScrar, data: 0}], ItemID.craftingHammer);
    addRecipeWithCraftingTool({id: ItemID.plateIron, count: 1, data: 0}, [{id: 265, data: 0}], ItemID.craftingHammer);
    addRecipeWithCraftingTool({id: ItemID.plateTitanium, count: 1, data: 0}, [{id: ItemID.ingotTitan, data: 0}], ItemID.craftingHammer);
    addRecipeWithCraftingTool({id: ItemID.plateGold, count: 1, data: 0}, [{id: 266, data: 0}], ItemID.craftingHammer);
    addRecipeWithCraftingTool({id: ItemID.plateLead, count: 1, data: 0}, [{id: ItemID.ingotLead, data: 0}], ItemID.craftingHammer);
});


//nuggets from new metals(DansTS)
IDRegistry.genItemID("nuggetEup");
Item.createItem("nuggetEup", "Euphernium Nugget", {name: "nugget_euphemium"});

IDRegistry.genItemID("nuggetNeptun");
Item.createItem("nuggetNeptun", "Neptunium Nugget", {name: "nugget_neptunium"});

IDRegistry.genItemID("nuggetPluton");
Item.createItem("nuggetPluton", "Plutonium Nugget", {name: "nugget_plutonium"});

IDRegistry.genItemID("nuggetUran");
Item.createItem("nuggetUran", "Uranium Nugget", {name: "nugget_uranium"});

IDRegistry.genItemID("nuggetMox");
Item.createItem("nuggetMox", "Mox Nugget", {name: "nugget_mox_fuel"});

IDRegistry.genItemID("nuggetScrar");
Item.createItem("nuggetScrar", "Schrabidium Nugget", {name: "nugget_schrabidium"});

IDRegistry.genItemID("nuggetScrarf");
Item.createItem("nuggetScrarf", "Schrabidium Nugget Fuel", {name: "nugget_schrabidium_fuel"});

IDRegistry.genItemID("nuggetLead");
Item.createItem("nuggetLead", "Lead Nugget", {name: "nugget_lead"});

//Dust(DansTS)
IDRegistry.genItemID("dustFluorite");
Item.createItem("dustFluorite", "Fluorite Dust", {name: "fluorite"});

IDRegistry.genItemID("dustSulfur");
Item.createItem("dustSulfur", "Sulfur Dust", {name: "sulfur"});

IDRegistry.genItemID("dustNeptunium");
Item.createItem("dustNeptunium", "Neptunium Dust", {name: "powder_neptunium"});

IDRegistry.genItemID("dustLead");
Item.createItem("dustLead", "Lead Dust", {name: "powder_lead"});

IDRegistry.genItemID("dustFire");
Item.createItem("dustFire", "Blaze Dust", {name: "powder_fire"});