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
