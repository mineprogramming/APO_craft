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


//LEDs
IDRegistry.genItemID("ledRed");
IDRegistry.genItemID("ledYellow");
IDRegistry.genItemID("ledGreen");
Item.createItem("ledRed", "Red Light-Emitting Diode", {name: "led", meta: 0}, {});
Item.createItem("ledYellow", "Yellow Light-Emitting Diode", {name: "led", meta: 1}, {});
Item.createItem("ledGreen", "Green Light-Emitting Diode", {name: "led", meta: 2}, {});


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


//Coal Tar
IDRegistry.genItemID("tarCoal");
Item.createItem("tarCoal", "Coal Tar", {name: "tar_coal", meta: 0}, {});
Recipes.addFurnace(263, ItemID.tarCoal, 0);


//Textolite
IDRegistry.genItemID("textolite");
Item.createItem("textolite", "Textolite", {name: "textolite", meta: 0}, {});

RecipiesManager.addShaped({id: ItemID.textolite, count: 2, data: 0}, [
     "aaa",
     "bbb",
     "aaa"
], ['a', ItemID.fiberglass, 0, 'b', ItemID.tarCoal, 0]);


//Granules of Polypropylene
IDRegistry.genItemID("granulesPolypropylene");
Item.createItem("granulesPolypropylene", "Granules of Polypropylene", {name: "granules_polypropylene", meta: 0}, {});


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


//Chips
IDRegistry.genItemID("chipArduino");
IDRegistry.genItemID("chipRaspberry");
Item.createItem("chipArduino", "Arduino Central Chip", {name: "chip", meta: 0}, {});
Item.createItem("chipRaspberry", "Raspberry PI Central Chip", {name: "chip", meta: 1}, {});


//Connectors


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
Item.createItem("sensorNitrates", "Viruses Sensor", {name: "sensor_nitrates", meta: 0}, {});








Callback.addCallback("PostLoaded", function(){
    RecipiesManager.onRegisterRecipiesNeeded();
});
