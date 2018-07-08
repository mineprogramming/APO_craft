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


//ATtiny 45
IDRegistry.genItemID("attiny45");
Item.createItem("attiny45", "ATtiny 45", {name: "attiny45", meta: 0}, {});


//Arduino Uno
IDRegistry.genItemID("arduinoUno");
Item.createItem("arduinoUno", "Arduino Uno", {name: "arduino_uno", meta: 0}, {});


//Arduino Mega
IDRegistry.genItemID("arduinoMega");
Item.createItem("arduinoMega", "Arduino Mega", {name: "arduino_mega", meta: 0}, {});


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
