// Battery Casing
IDRegistry.genItemID("batteryCasing");
Item.createItem("batteryCasing", "Battery Casing", {name: "battery_corp"});


// Battery Cap
IDRegistry.genItemID("batteryCap");
Item.createItem("batteryCap", "Battery Cap", {name: "cap_aluminum"});


// Battery
IDRegistry.genItemID("storageBattery");
Item.createItem("storageBattery", "Battery", {name: "battery_generic"});
ChargeItemRegistry.registerItem(ItemID.storageBattery, "Eu", 10000, 0, true);
RecipesManager.addShaped({id: ItemID.storageBattery, count: 1, data: 0}, [
    "a",
    "c",
    "b"
], ['a', ItemID.batteryCap, 0, 'c', ItemID.nuggetLead, 0, 'b', ItemID.batteryCasing, 0]);


// Advanced Battery
IDRegistry.genItemID("storageBatteryAdv");
Item.createItem("storageBatteryAdv", "Advanced Battery", {name: "battery_advanced"});
ChargeItemRegistry.registerItem(ItemID.storageBatteryAdv, "Eu", 100000, 0, true);

RecipesManager.addShaped({id: ItemID.storageBatteryAdv, count: 1, data: 0}, [
    "acb" 
], ['a', ItemID.plateAlloy, 0, 'c', ItemID.storageBattery, 0, 'b', ItemID.dustSulfur, 0]);


// Button Set
IDRegistry.genItemID("buttonSet");
Item.createItem("buttonSet", "Button Set", {name: "button_set", meta: 0}, {});

RecipesManager.addShaped({id: ItemID.buttonSet, count: 1, data: 0}, [
     " a ",
     "aba",
     " a "
], ['a', 143, 0, 'b', 77, 0]);


// LEDs
IDRegistry.genItemID("ledRed");
IDRegistry.genItemID("ledYellow");
IDRegistry.genItemID("ledGreen");
Item.createItem("ledRed", "Red Light-Emitting Diode", {name: "led", meta: 0}, {});
Item.createItem("ledYellow", "Yellow Light-Emitting Diode", {name: "led", meta: 1}, {});
Item.createItem("ledGreen", "Green Light-Emitting Diode", {name: "led", meta: 2}, {});

RecipesManager.addShaped({id: ItemID.ledRed, count: 16, data: 0}, [
     " a ",
     "cbc",
     "ede"
], ['a', 20, 0, 'b', 351, 1, 'c', ItemID.platePolypropylene, 0, 'd', ItemID.galliumArsenide, 0, 'e', ItemID.cableCopper0, 0]);

RecipesManager.addShaped({id: ItemID.ledYellow, count: 16, data: 0}, [
     " a ",
     "cbc",
     "ede"
], ['a', 20, 0, 'b', 351, 11, 'c', ItemID.platePolypropylene, 0, 'd', ItemID.galliumArsenide, 0, 'e', ItemID.cableCopper0, 0]);

RecipesManager.addShaped({id: ItemID.ledGreen, count: 16, data: 0}, [
     " a ",
     "cbc",
     "ede"
], ['a', 20, 0, 'b', 351, 2, 'c', ItemID.platePolypropylene, 0, 'd', ItemID.galliumArsenide, 0, 'e', ItemID.cableCopper0, 0]);


// Capacitor
IDRegistry.genItemID("capacitor");
Item.createItem("capacitor", "Capacitor", {name: "capacitor", data: 0});
RecipesManager.addShaped({id: ItemID.capacitor, count: 3, data: 0}, [
     "aaa",
     "bbb",
     "aaa"
], ['a', ItemID.plateCopper, 0, 'b', 336, 0]);


// Transistor
IDRegistry.genItemID("transistor");
Item.createItem("transistor", "Transistor", {name: "transistor", data: 0});
RecipesManager.addShaped({id: ItemID.transistor, count: 1, data: 0}, [
     "aaa",
     " a "
], ['a', ItemID.galliumArsenide, 0]);


// Diode
IDRegistry.genItemID("diode");
Item.createItem("diode", "Diode", {name: "diode", data: 0});
RecipesManager.addShapeless({id: ItemID.diode, count: 1, data: 0}, [{id: ItemID.galliumArsenide, data: 0}, {id: ItemID.galliumArsenide, data: 0}]);


// Resistor
IDRegistry.genItemID("resistor");
Item.createItem("resistor", "Resistor", {name: "resistor", data: 0});
RecipesManager.addShaped({id: ItemID.capacitor, count: 3, data: 0}, [
     "aaa",
     "bbb",
     "aaa"
], ['a', 336, 0, 'b', ItemID.cableLead0, 0]);


// SMD Details
IDRegistry.genItemID("smd");
Item.createItem("smd", "SMD Details", {name: "smd", data: 0});
/**
 * Inner Core creates unique numeric IDs in the order of registration,
 * so we can use loops if some items were registered in the proper order
 */
for(var i = ItemID.ledRed; i <= ItemID.ledGreen; i++){
    RecipesManager.addShapeless({id: ItemID.smd, count: 1, data: 0}, [{id: ItemID.resistor, data: 0}, {id: ItemID.resistor, data: 0},
        {id: ItemID.resistor, data: 0}, {id: ItemID.transistor, data: 0}, {id: ItemID.transistor, data: 0}, {id: ItemID.diode, data: 0}, 
        {id: i, data: 0}, {id: ItemID.capacitor, data: 0}, {id: ItemID.capacitor, data: 0}]);
}


// Transformer
IDRegistry.genItemID("transformer");
Item.createItem("transformer", "Transformer", {name: "transformer", data: 0});
RecipesManager.addShaped({id: ItemID.transformer, count: 1, data: 0}, [
     "aa",
     "aa"
], ['a', ItemID.coilCopper, 0]);


// Laser
IDRegistry.genItemID("laser");
Item.createItem("laser", "Laser", {name: "laser", data: 0});
RecipesManager.addShaped({id: ItemID.laser, count: 1, data: 0}, [
     " a ",
     "aba",
     " a "
], ['a', ItemID.ruby, 0, 'b', 331, 0]);


// Engine
IDRegistry.genItemID("engine");
Item.createItem("engine", "Engine", {name: "engine", data: 0});
RecipesManager.addShaped({id: ItemID.engine, count: 1, data: 0}, [
     "aba"
], ['a', ItemID.coke, 0, 'b', ItemID.coilCopper, 0]);


/* Printed Circuit Boards */

// Arduino Mega PCB Drawing
IDRegistry.genItemID("pcbArduinoMega");
Item.createItem("pcbArduinoMega", "Arduino Mega PCB", {name: "pcb_arduino_mega"});

// Arduino Uno PCB Drawing
IDRegistry.genItemID("pcbArduinoUno");
Item.createItem("pcbArduinoUno", "Arduino Uno PCB", {name: "pcb_arduino_uno"});

// Raspberry PI 3 PCB Drawing
IDRegistry.genItemID("pcbRaspberry3");
Item.createItem("pcbRaspberry3", "Raspberry PI 3 PCB", {name: "pcb_raspberry"});

// Motherboard PCB
IDRegistry.genItemID("pcbMotherboard");
Item.createItem("pcbMotherboard", "Motherboard PCB", {name: "pcb_motherboard", data: 0});

// Power Supply PCB
IDRegistry.genItemID("pcbPowerSupply");
Item.createItem("pcbPowerSupply", "Power Supply PCB", {name: "pcb_power_supply", data: 0});

// RAM PCB
IDRegistry.genItemID("pcbRam");
Item.createItem("pcbRam", "RAM PCB", {name: "pcb_ram", data: 0});

// Video Card PCB
IDRegistry.genItemID("pcbCardVideo");
Item.createItem("pcbCardVideo", "Video Card PCB", {name: "pcb_card_video"});

// HDD Controller PCB
IDRegistry.genItemID("pcbControllerHdd");
Item.createItem("pcbControllerHdd", "HDD Controller PCB", {name: "pcb_controller_hdd"});


/* Chips */

// ATmega2560
IDRegistry.genItemID("ATmega2560");
Item.createItem("ATmega2560", "ATmega2560 Chip", {name: "chip", meta: 0}, {});

// ATmega328
IDRegistry.genItemID("ATmega328");
Item.createItem("ATmega328", "ATmega328 Chip", {name: "chip", meta: 0}, {});

// Raspberry PI Central Chip
IDRegistry.genItemID("chipRaspberry");
Item.createItem("chipRaspberry", "Raspberry PI Central Chip", {name: "chip", meta: 1}, {});

// Chipset
IDRegistry.genItemID("chipset");
Item.createItem("chipset", "Chipset", {name: "chipset", meta: 0}, {});

// CPU
IDRegistry.genItemID("cpu");
Item.createItem("cpu", "CPU", {name: "cpu", meta: 0}, {});

// RAM Chip
IDRegistry.genItemID("chipRam");
Item.createItem("chipRam", "RAM Chip", {name: "chip_ram"});

// Video Chip Drawing
IDRegistry.genItemID("chipVideo");
Item.createItem("chipVideo", "Video Chip", {name: "chip_video"});

// Space-Time Frequency Generator Chip
IDRegistry.genItemID("chipGeneratorSpaceTime");
Item.createItem("chipGeneratorSpaceTime", "Space-Time Frequency Generator Chip", {name: "chip_generator_space_time"});