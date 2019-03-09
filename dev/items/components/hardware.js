// Motherboard
IDRegistry.genItemID("motherboard");
Item.createItem("motherboard", "Motherboard", {name: "motherboard", meta: 0}, {});


// Cooling System
IDRegistry.genItemID("systemCooling");
Item.createItem("systemCooling", "Cooling System", {name: "cooling_system", meta: 0}, {});


// RAM
IDRegistry.genItemID("ram");
Item.createItem("ram", "RAM", {name: "ram", meta: 0}, {});


// HDD
IDRegistry.genItemID("hdd");
Item.createItem("hdd", "Hard Disk Drive", {name: "hdd", meta: 0}, {});


// HDD Controller
IDRegistry.genItemID("controllerHdd");
Item.createItem("controllerHdd", "HDD Controller", {name: "controller_hdd", meta: 0}, {});


// Magnetic Head
IDRegistry.genItemID("headMagnetic");
Item.createItem("headMagnetic", "Magnetic Head", {name: "head_magnetic", meta: 0}, {});
RecipesManager.addShaped({id: ItemID.headMagnetic, count: 1, data: 0}, [
    "   ",
    "aaa",
    "ccb"
], ['a', ItemID.rodTitanium, 0, 'b', ItemID.coilCopper, 0, 'c', ItemID.cableCopper0, 0]);


// Magnetic Disk
IDRegistry.genItemID("diskMagnetic");
Item.createItem("diskMagnetic", "Magnetic Disk", {name: "disk_magnetic", meta: 0}, {});
RecipesManager.addShaped({id: ItemID.diskMagnetic, count: 1, data: 0}, [
    "aaa",
    "bbb",
    "aaa"
], ['a', ItemID.dustIron, 0, 'b', 102, 0]);


// Socket
IDRegistry.genItemID("socket");
Item.createItem("socket", "Socket", {name: "socket", meta: 0}, {});
RecipesManager.addShaped({id: ItemID.socket, count: 1, data: 0}, [
    "bbb",
    "aaa",
    "bbb"
], ['b', ItemID.platePolypropylene, 0, 'a', ItemID.cableCopper0, 0]);


// Space-Time Frequency Generator
IDRegistry.genItemID("generatorSpaceTime");
Item.createItem("generatorSpaceTime", "Space-Time Frequency Generator", {name: "space_time_generator", meta: 0}, {});


// Video Card
IDRegistry.genItemID("cardVideo");
Item.createItem("cardVideo", "Video Card", {name: "card_video", meta: 0}, {});


// Power Supply
IDRegistry.genItemID("powerSupply");
Item.createItem("powerSupply", "Power Supply", {name: "power_supply", meta: 0}, {});


// ATtiny 45
IDRegistry.genItemID("attiny45");
Item.createItem("attiny45", "ATtiny 45", {name: "attiny45", meta: 0}, {});


// Arduino Uno
IDRegistry.genItemID("arduinoUno");
Item.createItem("arduinoUno", "Arduino Uno", {name: "arduino_uno", meta: 0}, {});


// Arduino Mega
IDRegistry.genItemID("arduinoMega");
Item.createItem("arduinoMega", "Arduino Mega", {name: "arduino_mega", meta: 0}, {});


// Raspberry PI 3
IDRegistry.genItemID("raspberryPi3");
Item.createItem("raspberryPi3", "Raspberry PI 3", {name: "raspberry", meta: 0}, {});


// Radiation Sensor
IDRegistry.genItemID("sensorRadiation");
Item.createItem("sensorRadiation", "Radiation Sensor", {name: "sensor_radiation", meta: 0}, {});


// Viruses Sensor
IDRegistry.genItemID("sensorViruses");
Item.createItem("sensorViruses", "Viruses Sensor", {name: "sensor_viruses", meta: 0}, {});


// Nitrates Sensor
IDRegistry.genItemID("sensorNitrates");
Item.createItem("sensorNitrates", "Nitrates Sensor", {name: "sensor_nitrates", meta: 0}, {});


//LED Display
IDRegistry.genItemID("displayLed");
Item.createItem("displayLed", "LED Display", {name: "display_led", meta: 0}, {});