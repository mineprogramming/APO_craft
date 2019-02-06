// Battery Casing
IDRegistry.genItemID("batteryCasing");
Item.createItem("batteryCasing", "Battery Casing", {name: "battery_corp"});


// Battery Cap
IDRegistry.genItemID("batteryCap");
Item.createItem("batteryCap", "Battery cCap", {name: "cap_aluminium"});


// Battery
IDRegistry.genItemID("storageBattery");
Item.createItem("storageBattery", "Battery", {name: "battery_generic"});
ChargeItemRegistry.registerItem(ItemID.storageBattery, "Eu", 10000, 0, true);
RecipiesManager.addShaped({id: ItemID.storageBattery, count: 1, data: 0}, [
    "a",
    "c",
    "b"
], ['a', ItemID.batteryCap, 0, 'c', ItemID.nuggetLead, 0, 'b', ItemID.batteryCasing, 0]);


// Advanced Battery
IDRegistry.genItemID("storageBatteryAdv");
Item.createItem("storageBatteryAdv", "Advanced Battery", {name: "battery_advanced"});
ChargeItemRegistry.registerItem(ItemID.storageBatteryAdv, "Eu", 100000, 0, true);

RecipiesManager.addShaped({id: ItemID.storageBatteryAdv, count: 1, data: 0}, [
    "acb" 
], ['a', ItemID.plateAlloy, 0, 'c', ItemID.storageBattery, 0, 'b', ItemID.dustSulfur, 0]);


// Button Set
IDRegistry.genItemID("buttonSet");
Item.createItem("buttonSet", "Button Set", {name: "button_set", meta: 0}, {});

RecipiesManager.addShaped({id: ItemID.buttonSet, count: 1, data: 0}, [
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


// Capacitor
IDRegistry.genItemID("capacitor");
Item.createItem("capacitor", "Capacitor", {name: "capacitor", data: 0});


// Transistor
IDRegistry.genItemID("transistor");
Item.createItem("transistor", "Transistor", {name: "transistor", data: 0});


// Diode
IDRegistry.genItemID("diode");
Item.createItem("diode", "Diode", {name: "diode", data: 0});


// SMD Details
IDRegistry.genItemID("smd");
Item.createItem("smd", "SMD Details", {name: "smd", data: 0});


// Transformator
IDRegistry.genItemID("transformator");
Item.createItem("transformator", "Transformator", {name: "transformator", data: 0});
RecipiesManager.addShaped({id: ItemID.transformator, count: 1, data: 0}, [
     "aa",
     "aa"
], ['a', ItemID.coilCopper, 0]);





