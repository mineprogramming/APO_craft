/*
NIDE BUILD INFO:
  dir: dev
  target: main.js
  files: 40
*/



// file: header.js

/*
 APO craft
 by IchZerowan
 
 █▀▀█ ░ █▀▀█ ░ █▀▀█ ░   █▀▀ █▀▀█ █▀▀█ █▀▀ ▀▀█▀▀
 █▄▄█ ▄ █░░█ ▄ █░░█ ▄   █░░ █▄▄▀ █▄▄█ █▀▀ ░░█░░
 ▀░░▀ █ █▀▀▀ █ ▀▀▀▀ █   ▀▀▀ ▀░▀▀ ▀░░▀ ▀░░ ░░▀░░
 
 You are not welcome here!
*/

IMPORT("dimensions");
IMPORT("ScalesRPG");
IMPORT("NativeAPI");
IMPORT("SettingsManager");
IMPORT("EntityState");
IMPORT("ThirstLib");
IMPORT("DevAPI");
IMPORT("energylib");
IMPORT("TradeLib");

const DIRECTION_X = 0;
const DIRECTION_Z = 1;
const DIRECTION_BOTH = 2;

var GUI_BAR_STANDART_SCALE = 3.2;

var EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);


function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function srand(seed){
    seed = Math.sin(seed) * 10000;
    return seed - Math.floor(seed);
}

function getSideCoords(coords){
    return [
        {x: coords.x, y: coords.y + 1, z: coords.z},
        {x: coords.x, y: coords.y - 1, z: coords.z},
        {x: coords.x + 1, y: coords.y, z: coords.z},
        {x: coords.x - 1, y: coords.y, z: coords.z},
        {x: coords.x, y: coords.y, z: coords.z + 1},
        {x: coords.x, y: coords.y, z: coords.z - 1},
    ];
}




// file: imports.js

var BitmapFactory = android.graphics.BitmapFactory;
var Color = android.graphics.Color;




// file: RenderTools.js

RenderTools = {};

RenderTools.setupConnectorRender = function(id) {
    const width = 0.5;
    var render = new ICRender.Model();
    BlockRenderer.setStaticICRender(id, 0, render);
   
    var boxes = [
        {side: [1, 0, 0], box: [0.5 + width / 2, 0.5 - width / 2, 0.5 - width / 2, 1, 0.5 + width / 2, 0.5 + width / 2]},
        {side: [-1, 0, 0], box: [0, 0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2]},
        {side: [0, 1, 0], box: [0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2, 1, 0.5 + width / 2]},
        {side: [0, -1, 0], box: [0.5 - width / 2, 0, 0.5 - width / 2, 0.5 + width / 2, 0.5 - width / 2, 0.5 + width / 2]},
        {side: [0, 0, 1], box: [0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, 1]},
        {side: [0, 0, -1], box: [0.5 - width / 2, 0.5 - width / 2, 0, 0.5 + width / 2, 0.5 + width / 2, 0.5 - width / 2]},
    ]
   
    var group = ICRender.getGroup("ic-transformator");
   
    for (var i in boxes) {
        var box = boxes[i];
       
        var model = BlockRenderer.createModel();
        model.addBox(box.box[0], box.box[1], box.box[2], box.box[3], box.box[4], box.box[5], id, 0);
       
        render.addEntry(model).asCondition(box.side[0], box.side[1], box.side[2], group, 0);
    }
   
    var model = BlockRenderer.createModel();
    model.addBox(0.5 - width / 2, 0.5 - width / 2, 0.5 - width / 2, 0.5 + width / 2, 0.5 + width / 2, 0.5 + width / 2, id, 0);
    render.addEntry(model);
    
    width = Math.max(width, 0.5);
    Block.setBlockShape(id, {x: 0.5 - width/2, y: 0.5 - width/2, z: 0.5 - width/2}, {x: 0.5 + width/2, y: 0.5 + width/2, z: 0.5 + width/2});
}



// file: items/RecipiesManager.js

var RecipiesManager = {
    recipiesLoaded: false,
    recipies: []
}

RecipiesManager.addShaped = function(result, recipie, data){
    RecipiesManager.recipies.push({"result": result, "recipie": recipie, "data": data});
};

RecipiesManager.onRegisterRecipiesNeeded = function(){
    if(!RecipiesManager.recipiesLoaded){
        for(var i in RecipiesManager.recipies){
            let recipie = RecipiesManager.recipies[i];
            Recipes.addShaped(recipie.result, recipie.recipie, recipie.data);
        }
    }
}



// file: core/IC2Integration.js

var ICore = false;
ModAPI.addAPICallback("ICore", function(api){ 
    ICore = api;

});



// file: core/MachineEssentials.js

var MachineEssentials = {
    registerStandart: function(id, prototype, params){
        
        //Prototype's standart params and functions
        let defaultValues = {};
        defaultValues.energy_storage = params.energy_storage? params.energy_storage: 2000;
        defaultValues.energy_consumption = params.energy_consumption? params.energy_consumption: 2;
        defaultValues.work_time = params.work_time? params.work_time: 300;
        defaultValues.energy = 0;
        defaultValues.progress = 0;
        prototype.defaultValues = defaultValues;
        
        prototype.getEnergyStorage = function(){
            return this.data.energy_storage;
        }
        
        prototype.energyTick = function(type, src){
            var energyNeed = this.getEnergyStorage() - this.data.energy;
            this.data.energy += src.get(energyNeed);
        }
        
        prototype.checkResult = function(result, resultSlots){
            if(!result) return false;
            for(var i in resultSlots){
                var id, count;
                if(Array.isArray(result)){
                    id = result[i * 2];
                    count = result[i * 2 + 1];
                } else {
                    id = result.id;
                    count = result.count;
                }
                
                var resultSlot = resultSlots[i];
                if((resultSlot.id != id || resultSlot.count + count > 64) && resultSlot.id != 0){
                    return false;
                }
            }
            return true;
        }
        
        prototype.tick = function(){
            var sourceSlot = this.container.getSlot(params.source_slot);
            var resultSlots = [];
            for(var i in params.result_slots){
                resultSlots[i] = this.container.getSlot(params.result_slots[i]);
            }
            var result = MachineRecipeRegistry.getRecipeResult(params.machine_name, sourceSlot.id, sourceSlot.data);
            if(params.customResult) result = params.customResult(result, this.container);
            if(result && this.checkResult(result, resultSlots)){
                if(this.data.energy >= this.data.energy_consumption){
                    this.data.energy -= this.data.energy_consumption;
                    this.data.progress += 1/this.data.work_time;
                }
                if(this.data.progress >= 1){
                    sourceSlot.count--;
                    this.result(resultSlots, result);
                    this.container.validateAll();
                    this.data.progress = 0;
                }
            }
            else {
                this.data.progress = 0;
            }
        
            var energyStorage = this.getEnergyStorage();
            this.data.energy = Math.min(this.data.energy, energyStorage);
            //this.data.energy += ChargeItemRegistry.getEnergyFrom(this.container.getSlot("slotEnergy"), Math.min(32, energyStorage - this.data.energy), 0);
            
            this.container.setScale(params.progress_scale, this.data.progress);
            this.container.setScale(params.energy_scale, this.data.energy / energyStorage);
        }
        
        TileEntity.registerPrototype(id, prototype);
        ICRender.getGroup("ic-wire").add(id, -1);
        EnergyTileRegistry.addEnergyTypeForId(id, EU);
    }
};



// file: core/MachineRecipeRegistry.js

var MachineRecipeRegistry = null;

Callback.addCallback("PreLoaded", function(){
    if(ICore){
        MachineRecipeRegistry = ICore.Recipe;
    } else {
        // Code from Industrial Craft 2. Just a good piece of code, why not to copy it out?
        MachineRecipeRegistry = {
            recipeData: {},
            
            registerRecipesFor: function(name, data, validateKeys){
                if(validateKeys){
                    var newData = {};
                    for(var key in data){
                        var newKey = key;
                        if(key.split(":").length < 2){
                            newKey = eval(key);
                        }
                        newData[newKey] = data[key];
                    }
                    data = newData;
                }
                this.recipeData[name] = data;
            },
            
            addRecipeFor: function(name, source, result){
                this.requireRecipesFor(name, true)[source] = result;
            },
            
            requireRecipesFor: function(name, createIfNotFound){
                if(!this.recipeData[name] && createIfNotFound){
                    this.recipeData[name] = {};
                }
                return this.recipeData[name];
            },
            
            getRecipeResult: function(name, key1, key2){
                var data = this.requireRecipesFor(name);
                if(data){
                    return data[key1] || data[key1+":"+key2];
                }
            }
        }
    }
});



// file: events.js

IDRegistry.genItemID("Place");
Item.createItem("Place", "Structure Placer", {name: "place", meta: 0},{isTech:false,stack: 1});

Callback.addCallback("ItemUse", function (coords, item, block) {
    var x = coords.relative.x;
    var y = coords.relative.y;
    var z = coords.relative.z;
    
    if(item.id == ItemID.Place){
        buildings[14].debug = true;
        buildings[14].build(x, y, z);
    }
});

var buildings = [];
Callback.addCallback("PostLoaded", function(){
    for(var i = 0; i < 46; i++){
       buildings.push(new Building(i + ".json"));
    }
});

Callback.addCallback("LevelLoaded", function(){
    Game.message("Raspberry Pi is a trademark of the Raspberry Pi Foundation");
});



// file: items/firstAidKit.js

IDRegistry.genItemID("firstAidKit");
Item.createItem("firstAidKit", "First Aid Kit", {name: "first_aid_kit", meta: 0}, {});




// file: items/components.js

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




// file: items/detectors.js

IDRegistry.genItemID("chemicalLD");
Item.createItem("chemicalLD", "Chemical Contamination Level Detector", {name: "chemical_ld", meta: 0}, {});

RecipiesManager.addShaped({id: ItemID.chemicalLD, count: 1, data: 0}, [
     " d ",
     "ea ",
     " cb"
], ['a', ItemID.casingPolypropylene, 0,
    'b', ItemID.sensorNitrates, 0,
    'c', ItemID.attiny45, 0,
    'd', ItemID.displayLed, 0,
    'e', ItemID.buttonSet, 0]);



IDRegistry.genItemID("radiationLD");
Item.createItem("radiationLD", "Radiation Level Detector", {name: "radiation_ld", meta: 0}, {});

RecipiesManager.addShaped({id: ItemID.radiationLD, count: 1, data: 0}, [
     "bdf",
     "eag",
     " ch"
], ['a', ItemID.casingPolypropylene, 0,
    'b', ItemID.sensorRadiation, 0,
    'c', ItemID.attiny45, 0,
    'd', ItemID.displayLed, 0,
    'e', ItemID.buttonSet, 0,
    'f', ItemID.ledRed, 0,
    'g', ItemID.ledYellow, 0, 
    'h', ItemID.ledGreen, 0]);


IDRegistry.genItemID("biologicalLD");
Item.createItem("biologicalLD", "Biological Contamination Level Detector", {name: "biological_ld", meta: 0}, {});

RecipiesManager.addShaped({id: ItemID.biologicalLD, count: 1, data: 0}, [
     " db",
     "eah",
     " c "
], ['a', ItemID.casingPolypropylene, 0,
    'b', ItemID.sensorViruses, 0,
    'c', ItemID.attiny45, 0,
    'd', ItemID.displayLed, 0,
    'e', ItemID.buttonSet, 0,
    'h', ItemID.ledGreen, 0]);


IDRegistry.genItemID("multiPurposeLD");
Item.createItem("multiPurposeLD", "Multi-Purpose Level Detector", {name: "multi_purpose_ld", meta: 0}, {});

RecipiesManager.addShaped({id: ItemID.multiPurposeLD, count: 1, data: 0}, [
     "geh",
     "fai",
     "bcd"
], ['a', ItemID.casingPolypropylene, 0,
    'b', ItemID.chemicalLD, 0,
    'c', ItemID.radiationLD, 0,
    'd', ItemID.biologicalLD, 0,
    'e', ItemID.displayLed, 0,
    'f', ItemID.arduinoUno, 0,
    'g', ItemID.ledRed, 0,
    'h', ItemID.ledYellow, 0, 
    'i', ItemID.ledGreen, 0]);


var LD_tick = 5;
Callback.addCallback("tick", function(){
    LD_tick--;
    if(LD_tick <= 0){
        LD_tick = 5;
        //Как же я балдею от того, что количество символов в названиях шкал отличается на 1 и они выстраиваются в красивые линеечки...
        let chemical = false;
        let radiation = false;
        let biological = false;
        for(var i = 0; i < 9; i++){
            var slot = Player.getInventorySlot(i);
            switch(slot.id){
                case ItemID.chemicalLD: chemical = true; break;
                case ItemID.radiationLD: radiation = true; break;
                case ItemID.biologicalLD: biological = true; break;
                case ItemID.multiPurposeLD:
                    chemical = true;
                    radiation = true;
                    biological = true;
                    break;
            }
        }
        if(chemical) chemicalScale.show(); else chemicalScale.hide();
        if(radiation) radiationScale.show(); else radiationScale.hide();
        if(biological) biologicalScale.show(); else biologicalScale.hide();
    }
});




// file: items/eggs.js

// Military
IDRegistry.genItemID("eggMilitary");
Item.createItem("eggMilitary", "Military Egg", {name: "egg_military", meta: 0}, {isTech:false, stack: 64});

Item.registerUseFunctionForID(ItemID.eggMilitary, function(coords, item, block) {
    coords = coords.relative;
    let entity = Entity.spawnCustom("military", coords.x + .5, coords.y + .5, coords.z + .5);
    armorMilitary.equip(entity.entity);
});



// file: items/armor.js

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






// file: blocks/roads.js

const ROAD_CLEANING = 0;
const MAX_SIGNS_COUNT = 3;
const SIGNS_FREQUENCY = 0.2;

var data = [];
for(var i = 0; i < 11; i++){
    data.push({
        name: "Asphalt", 
        texture: [["asphalt", 0], ["asphalt", i], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0]], 
        inCreative: true
    });
}
IDRegistry.genBlockID("asphalt");
Block.createBlock("asphalt", data, "opaque");

RecipiesManager.addShaped({id: BlockID.asphalt, count: 3, data: 0}, [
     "bbb",
     "aaa",
     "aaa"
], ['a', 13, 0, 'b', ItemID.bitumen, 0]);




// file: blocks/signs.js

const SIGNS_COUNT = 9;

//BLOCK REGISTRATION
var data = [];
for(var i = 0; i < SIGNS_COUNT * 2; i++){
    data.push({name: "tile.roadsign", texture: [["sign", 0]], inCreative: false});
}
IDRegistry.genBlockID("sign");
Block.createBlock("sign", data);
Block.registerDropFunction("sign", function(){
     return [[ItemID.sign, 1, 0]]; 
});


//ITEM FOR USING SIGNS
IDRegistry.genItemID("sign");
Item.createItem("sign", "Road Sign", {name: "road_sign", meta: 0}, {});
Item.registerUseFunction("sign", function (coords, item, block) {
    var x = coords.relative.x;
    var y = coords.relative.y;
    var z = coords.relative.z;
    World.setBlock(x, y + 2, z, BlockID.sign, Math.floor(Math.random() * SIGNS_COUNT * 2));
});

//MODELS (DIFFERENT DIRECTIONS)
for(var i = 0; i < SIGNS_COUNT; i++){
    var model = new BlockRenderer.Model();
    model.addBox(0.45, -2, 0.45, 0.55, -1, 0.55, [["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0]]);
    model.addBox(0.45, -1, 0.45, 0.55, 0, 0.55, [["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0]]);
    model.addBox(0, 0, 0.45, 1, 1, 0.55, [["stone_slab", 0], ["stone_slab", 0], ["sign", i], ["sign", i], ["stone_slab", 0], ["stone_slab", 0]]);

    var icRender = new ICRender.Model(); 
    icRender.addEntry(model);

    BlockRenderer.setStaticICRender(BlockID.sign, i, icRender);
    
    var collisionShape = new ICRender.CollisionShape();
    var entry = collisionShape.addEntry();
    entry.addBox(0, 0, 0.45, 1, 1, 0.55);
    entry.addBox(0.45, -2, 0.45, 0.55, -1, 0.55);
    entry.addBox(0.45, -1, 0.45, 0.55, 0, 0.55);
    BlockRenderer.setCustomCollisionShape(BlockID.sign, i, collisionShape);
}

for(var i = SIGNS_COUNT; i < SIGNS_COUNT * 2; i++){
    var model = new BlockRenderer.Model();
    model.addBox(0.45, -2, 0.45, 0.55, -1, 0.55, [["stone_slab_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0]]);
    model.addBox(0.45, -1, 0.45, 0.55, 0, 0.55, [["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0]]);
    model.addBox(0.45, 0, 0, 0.55, 1, 1, [["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["stone_slab", 0], ["sign", i - SIGNS_COUNT], ["sign", i - SIGNS_COUNT]]);

    var icRender = new ICRender.Model(); 
    icRender.addEntry(model);

    BlockRenderer.setStaticICRender(BlockID.sign, i, icRender);
    
    var collisionShape = new ICRender.CollisionShape();
    var entry = collisionShape.addEntry();
    entry.addBox(0.45, 0, 0, 0.55, 1, 1);
    entry.addBox(0.45, -2, 0.45, 0.55, -1, 0.55);
    entry.addBox(0.45, -1, 0.45, 0.55, 0, 0.55);
    BlockRenderer.setCustomCollisionShape(BlockID.sign, i, collisionShape);
}










// file: blocks/bench.js

IDRegistry.genBlockID("bench");
Block.createBlock("bench", [{name: "Bench", inCreative: false}], "opaque");
Block.registerDropFunction("bench", function(){
     return [[ItemID.bench, 1, 0]]; 
});

 
IDRegistry.genItemID("bench");
Item.createItem("bench", "Bench", {name: "bench", meta: 0}, {});
Item.registerUseFunction("sign", function (coords, item, block) {
    var x = coords.relative.x;
    var y = coords.relative.y;
    var z = coords.relative.z;
    World.setBlock(x, y, z, BlockID.bench, 0);
});


function createBenchRender(id, idMaterial, dataMaterial){
    var render = new ICRender.Model();
    BlockRenderer.setStaticICRender (id, 0, render);
    var model = BlockRenderer.createModel();
    model.addBox (1, 8/16, 8/16, 2, 1, 1, idMaterial, dataMaterial);
    model.addBox (1, 0, 0, 2, 8/16, 1, idMaterial, dataMaterial);
    model.addBox (0, 8/16, 8/16, 1, 1, 1, idMaterial, dataMaterial);
    model.addBox (0, 0, 0, 1, 8/16, 1, idMaterial, dataMaterial);
    model.addBox (-1/16, 4/16, 1/16, 0, 12/16, 15/16, idMaterial, dataMaterial);
    model.addBox (2, 4/16, 1/16, 33/16, 12/16, 15/16, idMaterial, dataMaterial);
    render.addEntry(model);
}

createBenchRender(BlockID.bench, 1, 2);



// file: blocks/ores.js

//Shale Ore
IDRegistry.genBlockID("oreShaleOil");
Block.createBlock("oreShaleOil", [{name: "Shale Ore", texture: [["ore_shale_oil", 1], ["ore_shale_oil", 1], ["ore_shale_oil", 0], ["ore_shale_oil", 2], ["ore_shale_oil", 0], ["ore_shale_oil", 2]], inCreative: true}], "opaque");


//Gallium Arsenide Ore
IDRegistry.genBlockID("oreGalliumArsenide");
Block.createBlock("oreGalliumArsenide", [{name: "Gallium Arsenide Ore", texture: [["ore_gallium_arsenide", 0], ["ore_gallium_arsenide", 0], ["ore_gallium_arsenide", 0], ["ore_gallium_arsenide", 0], ["ore_gallium_arsenide", 0], ["ore_gallium_arsenide", 0]], inCreative: true}], "opaque");

Block.registerDropFunction("oreGalliumArsenide", function(coords, id, data, diggingLevel, toolLevel){
     return [[ItemID.galliumArsenite, 1, 0]];
});




// file: environment/fog.js

var fogParticle = Particles.registerParticleType({
    texture: "fog",
    size: [10, 20],
    lifetime: [20, 20],
    render: 2
});

var fog = false;

function addFog(coords, radius, count){
    for(var i = 0; i < count; i++){
        let x = coords.x - radius + Math.random() * radius * 2;
        let y = coords.y - radius + Math.random() * radius * 2;
        let z = coords.z - radius + Math.random() * radius * 2;
        Particles.addParticle(fogParticle, x, y, z, 0, 0.01, 0);
    }
}


Callback.addCallback("tick", function(){
    if(fog){
        let coords = Entity.getPosition(Player.get());
        addFog(coords, 3, 7);
    }
});



// file: environment/split.js

var Split = {
    done: 0,
    summoning: false,
    summon_ticks: 0,
    
    build: function(){
        let x = Split.x;
        let y = Split.y;
        let z = Split.z;
        Split.done = 0;
        Split.buildRecursive(x, y, z);
    },
    
    buildRecursive: function(x, y, z){
        Split.done++;
        World.setBlock(x, y, z, BlockID.aetherPortal, 0);
        for(var i = 0; i < 4; i++){
            var dx = (i - 2) % 2;
            var dz = (i - 1) % 2;
            
            var block = World.getBlockID(x + dx, y, z + dz);
            if(block != BlockID.aetherPortal){
                if(Split.done < 4 || Math.random() < 0.3){
                    Split.buildRecursive(x + dx, y, z + dz);
                } else {
                    World.setBlock(x + dx, y, z + dz, 1, 0);
                }
            }
        }
    },
    
    summon: function(x, y, z){
        Split.summon_ticks = 0;
        Split.summoning = true;
        Split.x = x; 
        Split.y = y;
        Split.z = z;
        Entity.addEffect(Player.get(), 11, 30, 5);
        
    }
}


Callback.addCallback("tick", function(){
    if(Split.summoning){
        let x = Split.x + Math.random() * 4 - 2;
        let y = Split.y + Math.random() * 4 - 2;
        let z = Split.z + Math.random() * 4 - 2;
        
        Entity.spawn(x, y, z, Native.EntityType.LIGHTNING_BOLT);
        
        Split.summon_ticks++;
        if(Split.summon_ticks > 20){
            Split.summoning = false;
        } else if(Split.summon_ticks > 15){
            Split.build();
        }
    }
});




// file: environment/plane.js

const PLANES_HEIGHT = 150;
const BOMB_SCALE = 0.02;

function spawnPlanes(count){
    count = Math.floor(count / 2);
    let coords = Player.getPosition();
    coords.x -= 128;
    coords.z += 128;
    
    Plane.spawn(coords.x, coords.z);
    for(var i = 0; i < count; i++){
        coords.x -= 8;
        coords.z += 8;
        Plane.spawn(coords.x - 20 * (i + 1), coords.z);
        Plane.spawn(coords.x, coords.z + 20 * (i + 1));
    }
}


var Plane = {}

Plane.spawn = function(x, z){
    var animationPlane = new Animation.Base(x, PLANES_HEIGHT, z);
    animationPlane.ticks = 0;
    animationPlane.describe({render: Plane.render.getId()});
    animationPlane.loadCustom(function(){
        this.ticks++;
        for(var i = 0; i < 2; i++){
            Plane.render.setPart(i == 0? "airscrew_left": "airscrew_right", Plane.airscrew, {
                rotation: {
                    x: 0,
                    y: 0, 
                    z: (this.ticks % 500) * 360 / 64
                },
            });
        }
        this.setPos(this.coords.x + 0.5, this.coords.y, this.coords.z - 0.5);
        this.refresh();
        if(srand(this.ticks) < 0.002){
            if(Math.random() > 0.5){
                Entity.spawnCustom("bomb", this.coords.x, this.coords.y - 0.5, this.coords.z); 
            } else {
                World.drop(this.coords.x, this.coords.y - 0.5, this.coords.z, ItemID.firstAidKit, 1, 0);
            }
        }
        if(this.ticks >= 512){
            this.destroy();
        }
    });
}


// Creating render
Plane.render = new Render({skin: "mob/plane.png"});
Plane.airscrew = [
    {
        type: "box",
        coords: { x: 0, y: 0,  z: 10 },
        size: { x: 3, y: 40,  z: 1 },
        uv: { x: 216, y: 10 } 
    },
    {
        type: "box",
        coords: { x: 0, y: 0,  z: 10 },
        size: { x: 40, y: 3,  z: 1 },
        uv: { x: 0, y: 0 } 
    }
];

(function() {
    // Фюзеляж
    var partFuselage = [
        // Крыло
        {
            type: "box",
            coords: { x: 0, y: 0, z: 0 },
            size: { x: 150, y: 2, z: 18 },
            uv: { x: 0, y: 0 }
        },
        {
            type: "box",
            coords: { x: -40, y: 0, z: 2 },
            size: { x: 10, y: 10, z: 14 },
            uv: { x: 0, y: 0 }
        },
        {
            type: "box",
            coords: { x: 40, y: 0, z: 2 },
            size: { x: 10, y: 10, z: 14 },
            uv: { x: 0, y: 0 }
        },
        // Фюзеляж
        {
            type: "box",
            coords: { x: 0, y: 0, z: -40 },
            size: { x: 10, y: 10, z: 120 },
            uv: { x: 0, y: 0 }
        },
        {
            type: "box",
            coords: { x: 0, y: 0, z: -10 },
            size: { x: 18, y: 18, z: 50 },
            uv: { x: 0, y: 0 }
        },
        {
            type: "box",
            coords: { x: 0, y: -9, z: -10 },
            size: { x: 14, y: 5, z: 40 },
            uv: { x: 0, y: 0 }
        },
        // Хвост
        {
            type: "box",
            coords: { x: 0, y: 0, z: -100 },
            size: { x: 60, y: 2, z: 18 },
            uv: { x: 0, y: 0 }
        },
        {
            type: "box",
            coords: { x: 0, y: -15, z: -100 },
            size: { x: 2, y: 30, z: 18 },
            uv: { x: 0, y: 0 }
        }
    ];

    var partPlane = Plane.render.getPart("body").addPart("plane");
    partPlane.setRotation(0, 45, 0);
    Plane.render.setPart("plane", partFuselage, {});
    partPlane.addPart("airscrew_left").setOffset(-40, 0, 0);
    partPlane.addPart("airscrew_right").setOffset(40, 0, 0);
}) ();


// Bomb
Plane.bombModel = new EntityModel();
(function() {
    var mesh = new RenderMesh(__dir__ + "models/bomb.obj", "obj", null);
    var texture = new Texture("mob/plane.png").setResolution(256, 128);
    mesh.scale(BOMB_SCALE, BOMB_SCALE, BOMB_SCALE);
    var render = new Render();
    render.getPart("body").setMesh(mesh);
    Plane.bombModel.setRender(render);
    Plane.bombModel.setTexture(texture);
}) ();



Plane.bomb = MobRegistry.registerEntity("bomb");
Plane.bomb.customizeEvents({
    death: function(attacker){
        let coords = Entity.getPosition(this.entity);
        Entity.remove(this.entity);
        World.explode(coords.x, coords.y, coords.z, 5, true);
    }
});
Plane.bomb.customizeDescription({
    getHealth: function() {
        return 1;
    },
});
Plane.bomb.customizeVisual({
    getModels: function() {
        return {
            "main": Plane.bombModel
        };
    }
});






// file: environment/exoskeleton.js

var Exoskeleton = {
    coords: []
};

Exoskeleton.render = new Render({skin: "mob/exoskeleton.tga"});
(function() {
    var mesh = new RenderMesh(__dir__ + "models/exoskeleton.obj", "obj", null);
    Exoskeleton.part = Exoskeleton.render.getPart("body").addPart("exoskeleton");
    Exoskeleton.part.setOffset(0, 20, 0);
    Exoskeleton.part.setMesh(mesh);
})();

Exoskeleton.add = function(x, y, z){
    var animation = new Animation.Base(x, y, z);
    animation.ticks = 0;
    animation.describe({render: Exoskeleton.render.getId()});
    animation.loadCustom(function(){
        this.ticks++;
        Exoskeleton.part.setRotation(0, this.ticks / 4, 0);
        this.refresh();
    });
    return animation;
}

Exoskeleton.setup = function(x, y, z){
    let animation = Exoskeleton.add(x, y, z);
    Exoskeleton.coords.push({animation: animation, coords: {"x": x, "y": y, "z": z}});
}

Saver.addSavesScope("exoskeleton", 
    function read(scope){
        if(!scope.coords) return;
        Exoskeleton.coords = [];
        for(var i in scope.coords){
            let coords = scope.coords[i];
            let animation = Exoskeleton.add(coords.x, coords.y, coords.z);
            Exoskeleton.coords.push({animation: animation, coords: coords});
        }
    },

    function save(){
        let coords = [];
        for(var i in Exoskeleton.coords){
            coords.push(Exoskeleton.coords[i].coords);
        }
        return {coords: coords};
    }
);

Callback.addCallback("ItemUse", function(coords, item, block){
    let x = coords.relative.x;
    let y = coords.relative.y;
    let z = coords.relative.z;
    if(item.id == 280){
        Exoskeleton.setup(x, y + 1, z);
    }
});


var exoMessageDisplayed = false;
Callback.addCallback("tick", function(){
    if (World.getThreadTime() % 5 === 0) {
        let player = Entity.getPosition(Player.get());
        var near = false;
        Exoskeleton.coords.filter(function(obj){
            let exoskeleton = obj.coords;
            if(player.x < exoskeleton.x + 1 && player.x > exoskeleton.x - 1
                    && player.y < exoskeleton.y + 1 && player.y > exoskeleton.y - 1
                    && player.z < exoskeleton.z + 1 && player.z > exoskeleton.z - 1){
                near = true;
                // Check armor slots
                var empty = true;
                for(var i = 0; i < 4; i++){
                    var slot = Player.getArmorSlot(i);
                    if(slot.id != 0){
                        empty = false;
                    }
                }
                if(empty){
                    // Put armor on
                    obj.animation.destroy();
                    for(var i in Player){
                        Game.message(i);
                    }
                    return false;
                } else {
                    // Display warning
                    if(!exoMessageDisplayed){
                        exoMessageDisplayed = true;
                        Game.message("Take off all the armor to proceed");
                    }
                }
                
            }
            return true;
        });
        
        if(!near){
            exoMessageDisplayed = false;
        }
    }
});






// file: dimension/generation/Dimension.js

const SKY_COLOR = [0.2, 0.13, 0.2];
const FOG_COLOR = [0.2, 0.16, 0.2];

var APOCity = new Dimension({
    name: "APOCity",
    
    generation: {
        layers: [
            {
                range: [2, 80],
                noise: {
                    octaves: {
                        count: 4,
                        weight: 0.5,
                        scale: [1, 0.6, 1]
                    }
                },
                
                gradient: [[-1, 1], [0.2, 0.5], [0.4, 0.3], [0.6, 0.7], [1, 0.25]],
               
                terrain: {
                    cover: {
                        height: 4,
                        top: {id: 1, data: 5},
                        block: 3
                    }
                }
            },
            {
                range: [1,2],
                noise:{
                    octaves:{
                        count:8,
                        weight: 0.4,
                        scale: [.01,.02,.04,.08]
                    }
                },
                gradient:[
                    [0,1],
                    [1,-1],
                    [0.05,.4],
                    [.2,-.8]
                ],
                terrain:{
                    base: 7
                }
            },
        ],
        
        decoration: {
            biome: 2,
            features: false
        }
    },
    
    environment: {
        sky: SKY_COLOR,
        fog: FOG_COLOR
    },
    
    callbacks: {
        tick: function() {
            RandomEvents.tick();
        },
        
        generateChunk: function(chunkX, chunkZ) {
            APOGen.generate(chunkX * 16, chunkZ * 16);
        }
    }
});

//APOCity.debugTerrainSlice(128, 1, true);


var APOCityTransferSequence = new TransferSequence(APOCity);
APOCityTransferSequence.setPortalTimeout(40);

APOCityTransferSequence.setPortalOverlay(new PortalOverlayWindow({
    frames: 32, 
    rate: 20, 
    fade: 1, 
    texture: "aether_portal_overlay_animation"
}));

APOCityTransferSequence.setLoadingScreenParams({
    texture: "default_dimension_loading_screen"
});

PortalRegistry.newPortalBlock("aetherPortal", ["aether_portal", 0], APOCityTransferSequence.getPortal(), {type: "h-plane", frameId: 4}, true);
APOCityTransferSequence.setPortalTiles(BlockID.aetherPortal);





// file: dimension/generation/Building.js

var BufferedReader = java.io.BufferedReader;
var FileReader = java.io.FileReader;
var StringBuilder = java.lang.StringBuilder;


function Building(filename){
    var path = __dir__ + "buildings/" + filename;
    
    var blocks;
    var loot;
    
    var json = JSON.parse(readFile(path));
    if(Array.isArray(json)){
        blocks = json;
    } else {
        blocks = json.blocks;
        loot = json.loot;
    }
    
    this.debug = false;
    
    this.build = function(x1, y1, z1){
        //Choose random block for generation
        var randoms = [];
        for(var key in json.randomizer){
            var randomizer = json.randomizer[key];
            var arr = randomizer.variations;
            randoms.push({
                "block": randomizer.block, 
                "variation": arr[Math.round(Math.random()*(arr.length-1))]
            });
        }
        
        //Signs with numbers
        if(this.debug){
            //World.setBlock(x - 1, y + 1, z - 1, 68, 0);
            //Game.message(JSON.stringify(World.getContainer(x - 1, y + 1, z - 1)))
        }
                    
        //generation itself
        for(var y = 0; y < blocks.length; y++){
            for(var x = 0; x < blocks[0].length; x++){
                for(var z = 0; z < blocks[0][0].length; z++){
                    var block = blocks[y][x][z];
                    if(block == 0 || block.id == 0)
                        continue;
                    block.meta = block.meta || 0;
                    for(var key in randoms){
                        var random = randoms[key];
                        if(random.block.id == block.id && random.block.meta == block.meta){
                            block = random.variation;
                        }
                    }
                    World.setBlock(x + x1, y + y1, z + z1, block.id, block.meta);
                    if(block.id == 54 && loot){
                        var container = World.getContainer(x + x1, y + y1, z + z1);
                        for(var key in loot){
                            let item = loot[key];
                            if(Math.random() < item.rarity){
                                var count = Math.floor(Math.random() * (item.count.max - item.count.min + 1) + item.count.min);
                                container.setSlot(Math.floor(Math.random() * 27), item.id, count, item.meta);
                            }
                        }
                    }
                }
            }
        }
    }
}










function readFile(path){
    var reader = new BufferedReader(new FileReader(path));
    var builder = new StringBuilder();
    
    try{
        var line = reader.readLine();
        while (line != null) {
            builder.append(line);
            line = reader.readLine();
        }
        return builder.toString();
    } catch(e){
        Game.message(e);
    }
}



// file: dimension/generation/APOGen.js

var Random = java.util.Random;
var rnd = new Random();

//GENERATION
const GENERATION_HEIGHT = 78;
const ROADS_FREQUENCY = 0.15;
const UNDERGROUNG_FREQUENCY = 0.05;
const UNDERGROUND_MAX_HEIGHT = 65;
const UNDERGROUND_X_HEIGHT = 55; //Default: 50
const BUILDING_FREQUENCY = 0.7;
const BUILDINGS_COUNT = 46;
const EXPLOSION_FREQENCY = 0.1;
const GRAVEL_FREQUENCY = 0.3;


var APOGen = {
    lateGenEnabled: false
}


APOGen.generate = function(x, z){
    //Generate underground
    var generated = false;
    
    if(srand(x) > 1 - UNDERGROUNG_FREQUENCY && srand(z) > 1 - UNDERGROUNG_FREQUENCY){
        Underground.generateStation(x, UNDERGROUND_X_HEIGHT, z, DIRECTION_X);
        Underground.generateStation(x, UNDERGROUND_X_HEIGHT - 10, z, DIRECTION_Z);
    }
    
    else if(srand(z) > 1 - UNDERGROUNG_FREQUENCY){
        Underground.generateTunnel(x, UNDERGROUND_X_HEIGHT, z, DIRECTION_X);
        if(srand(x - 16) > 1 - UNDERGROUNG_FREQUENCY){
            Underground.exit(x, UNDERGROUND_X_HEIGHT + 2, z, DIRECTION_X);
        } else if(srand(x - 32) > 1 - UNDERGROUNG_FREQUENCY){
            Underground.exit(x, UNDERGROUND_X_HEIGHT + 18, z, DIRECTION_X);
            generated = true;
        }
    }
    
    else if(srand(x) > 1 - UNDERGROUNG_FREQUENCY){
        Underground.generateTunnel(x, UNDERGROUND_X_HEIGHT - 10, z, DIRECTION_Z);
        if(srand(z - 16) > 1 - UNDERGROUNG_FREQUENCY){
            Underground.exit(x, UNDERGROUND_X_HEIGHT - 8, z, DIRECTION_Z);
        } else if(srand(z - 32) > 1 - UNDERGROUNG_FREQUENCY){
            Underground.exit(x, UNDERGROUND_X_HEIGHT + 8, z, DIRECTION_Z);
             generated = true;
        }
    }
    if(!generated){
        if(APOGen.lateGenEnabled){
            APOGen.markChunk(x, z);
        } else {
            APOGen.lateGen(x, z);
        }
    }
}


APOGen.lateGen = function(x, z){
    NativeAPI.setTileUpdateAllowed(false);
    var srandX = srand(x);
    var srandZ = srand(z);
    
    //GENERATE ROADS
    if(srandX < ROADS_FREQUENCY && srandZ < ROADS_FREQUENCY){
        Roads.generateSimpleRoad(x, GENERATION_HEIGHT, z, true);
        Roads.generateSimpleRoad(x, GENERATION_HEIGHT, z, false);
        Roads.generateSimpleCrossroad(x, GENERATION_HEIGHT, z);
    } 
    else if(srandX < ROADS_FREQUENCY){
        Roads.generateSimpleRoad(x, GENERATION_HEIGHT, z, true);
    }
    else if(srandZ < ROADS_FREQUENCY){
        Roads.generateSimpleRoad(x, GENERATION_HEIGHT, z, false);
    }
    
    //GENERATE BUILDINGS
    else if(Math.random() < BUILDING_FREQUENCY){
        var i = Math.floor(Math.random() * BUILDINGS_COUNT);
        buildings[i].build(x, GENERATION_HEIGHT, z);
    }
    
    //GRAVEL DUMPS
    if(Math.random() < GRAVEL_FREQUENCY){
        var coords = GenerationUtils.findSurface(x + Math.random() * 16, GENERATION_HEIGHT, z + Math.random() * 16);
        coords.y++;
        
    } 
    
    //CRATERS AND EXPLOSIONS
    if(Math.random() < EXPLOSION_FREQENCY){
        var coords = GenerationUtils.findSurface(x + Math.random() * 16, GENERATION_HEIGHT, z + Math.random() * 16);
        World.explode(coords.x, coords.y, coords.z, Math.random() * 16, false);
    } 
    
    NativeAPI.setTileUpdateAllowed(true);
}


APOGen.markChunk = function(x, z){
    World.setBlock(x, 0, z, 49, 0);
    World.setBlock(x, 1, z, 7, 0);
}

APOGen.unmarkChunk = function(x, z){
    World.setBlock(x, 0, z, 0, 0);
}


APOGen.isChankMarked = function(x, z){
    return World.getBlockID(x, 0, z) == 49;
}


var lategenTick = 5;
Callback.addCallback("tick", function(){
    if(!APOCity.isInDimension()) return;
    lategenTick --;
    if(lategenTick <= 0){
        lategenTick = 5;
        let position = Player.getPosition();
        APOGen.lateGenEnabled = position.y < UNDERGROUND_MAX_HEIGHT;
        if(!APOGen.lateGenEnabled){
            let chunkX = Math.floor(position.x / 16) * 16;
            let chunkZ = Math.floor(position.z / 16) * 16;
            for(var dx = 0; dx < 5; dx++){
                for(var dz = 0; dz < 5; dz++){
                    let cx = chunkX - 32 + dx * 16;
                    let cz = chunkZ - 32 + dz * 16;
                    if(APOGen.isChankMarked(cx, cz)){
                        APOGen.unmarkChunk(cx, cz);
                        APOGen.lateGen(cx, cz);
                        return;
                    }
                }
            }
        }
    }
});






// file: dimension/generation/Roads.js

var Roads = {};

Roads.generateSimpleRoad = function(x, y, z, directionZ) {
    if (directionZ) {
        Roads.generateSigns(x, y, z, DIRECTION_Z);
        x += 5;
        for (var i = 0; i < 16; i++) {
            World.setBlock(x, y, z + i, BlockID.asphalt, 3);
            World.setBlock(x + 1, y, z + i, BlockID.asphalt, 0);
            World.setBlock(x + 2, y, z + i, BlockID.asphalt, 1);
            World.setBlock(x + 3, y, z + i, BlockID.asphalt, 0);
            World.setBlock(x + 4, y, z + i, BlockID.asphalt, 4);
            for(var j = 1; j < ROAD_CLEANING + 1; j++){
                World.setBlock(x + 0, y + j, z + i, 0);
                World.setBlock(x + 1, y + j, z + i, 0);
                World.setBlock(x + 2, y + j, z + i, 0);
                World.setBlock(x + 3, y + j, z + i, 0);
                World.setBlock(x + 4, y + j, z + i, 0);
            }
        }
        if (Math.random() < 0.25) {
            World.setBlock(x + 0, y, z, BlockID.asphalt, 9);
            World.setBlock(x + 1, y, z, BlockID.asphalt, 9);
            World.setBlock(x + 3, y, z, BlockID.asphalt, 10);
            World.setBlock(x + 4, y, z, BlockID.asphalt, 10);
        }
        if (Math.random() < 0.25) {
            World.setBlock(x + 0, y, z + 15, BlockID.asphalt, 9);
            World.setBlock(x + 1, y, z + 15, BlockID.asphalt, 9);
            World.setBlock(x + 3, y, z + 15, BlockID.asphalt, 10);
            World.setBlock(x + 4, y, z + 15, BlockID.asphalt, 10);
        }
    } else {
        Roads.generateSigns(x, y, z, DIRECTION_X);
        z += 5;
        for (var i = 0; i < 16; i++) {
            World.setBlock(x + i, y, z + 0, BlockID.asphalt, 5);
            World.setBlock(x + i, y, z + 1, BlockID.asphalt, 0);
            World.setBlock(x + i, y, z + 2, BlockID.asphalt, 2);
            World.setBlock(x + i, y, z + 3, BlockID.asphalt, 0);
            World.setBlock(x + i, y, z + 4, BlockID.asphalt, 6);
            for(var j = 1; j < ROAD_CLEANING + 1; j++){
                World.setBlock(x + i, y + j, z + 0, 0);
                World.setBlock(x + i, y + j, z + 1, 0);
                World.setBlock(x + i, y + j, z + 2, 0);
                World.setBlock(x + i, y + j, z + 3, 0);
                World.setBlock(x + i, y + j, z + 4, 0);
            }
            
        }
        if (Math.random() < 0.25) {
            World.setBlock(x, y, z + 0, BlockID.asphalt, 8);
            World.setBlock(x, y, z + 1, BlockID.asphalt, 8);
            World.setBlock(x, y, z + 3, BlockID.asphalt, 7);
            World.setBlock(x, y, z + 4, BlockID.asphalt, 7);
        }
        if (Math.random() < 0.25) {
            World.setBlock(x + 15, y, z + 0, BlockID.asphalt, 8);
            World.setBlock(x + 15, y, z + 1, BlockID.asphalt, 8);
            World.setBlock(x + 15, y, z + 3, BlockID.asphalt, 7);
            World.setBlock(x + 15, y, z + 4, BlockID.asphalt, 7);
        }
    }
    BlockRenderer.forceRenderRebuild(x, y, z, 0);
};

Roads.generateSimpleCrossroad = function(x, y, z){
    Roads.generateSigns(x, y, z, DIRECTION_BOTH);
    for(var i = 5; i < 10; i++){
        for(var j = 5; j < 10; j++)
        { 
            World.setBlock(x + i, y, z + j, BlockID.asphalt, 0);
        }
    }
};

Roads.generateSigns = function(x, y, z, direction){
    for(var i = 0; i < MAX_SIGNS_COUNT; i++){
        if(Math.random() < SIGNS_FREQUENCY){
            var sx, sz;
            if(Math.random() < 0.25){
                sx = randomInt(x + 3, x + 5);
                sz = randomInt(z + 3, z + 5);
            } else if (Math.random() < 0.5){
                sx = randomInt(x + 11, x + 13);
                sz = randomInt(z + 11, z + 13);
            } else if(Math.random() < 0.75){
                sx = randomInt(x + 3, x + 5);
                sz = randomInt(z + 11, z + 13);
            } else { 
                sx = randomInt(x + 11, x + 13);
                sz = randomInt(z + 3, z + 5);
            }
            switch(direction){
            case DIRECTION_X:
                World.setBlock(sx, y + 3, sz, BlockID.sign, randomInt(SIGNS_COUNT, SIGNS_COUNT * 2));
                break;
            case DIRECTION_Z: 
                World.setBlock(sx, y + 3, sz, BlockID.sign, randomInt(0, SIGNS_COUNT));
                break;
            case DIRECTION_BOTH:
                World.setBlock(sx, y + 3, sz, BlockID.sign, randomInt(0, SIGNS_COUNT * 2));
            }
            
        }
    }
}



// file: dimension/generation/Underground.js



var Underground = {
    railOnData: new ItemExtraData()
};

Underground.railOnData.putBoolean("powered", true);

var setRandomWall = function(x, y, z){
        if(Math.random() < 0.2)
            World.setBlock(x, y, z, 98, 1);
        else if(Math.random() > 0.8)
            World.setBlock(x, y, z, 98, 2);
        else
            World.setBlock(x, y, z, 98, 0);
    }

Underground.generateTunnel = function(x, y, z, direction){
    var generateSingleTunnel = function(x, y, z, dirtection){
        if(direction == DIRECTION_X){
            for(var dx = 0; dx < 16; dx++){
                //bottom and top
                for(var dz = 1; dz < 4; dz++){
                    setRandomWall(x + dx, y, z + dz);
                    World.setBlock(x + dx, y + 1, z + dz, 13, 0);
                    setRandomWall(x + dx, y + 6, z + dz);
                    for(var dy = 2; dy < 6; dy++){
                        World.setBlock(x + dx, y + dy, z + dz, 0, 0);
                    }
                }
                //walls
                for(var dy = 1; dy < 6; dy++){
                    setRandomWall(x + dx, y + dy, z);
                    setRandomWall(x + dx, y + dy, z + 4);
                }
                //rails and arc
                World.setBlock(x + dx, y + 5, z + 1, 109, 7);
                World.setBlock(x + dx, y + 5, z + 3, 109, 6);
                World.setBlock(x + dx, y + 2, z + 2, 66, 1);
            }
            World.setBlock(x, y + 2, z + 2, 27, 9);
        } 
        else { //DIRECTION_Z
            for(var dz = 0; dz < 16; dz++){
                //bottom and top
                for(var dx = 1; dx < 4; dx++){
                    setRandomWall(x + dx, y, z + dz);
                    World.setBlock(x + dx, y + 1, z + dz, 13, 0);
                    setRandomWall(x + dx, y + 6, z + dz);
                    for(var dy = 2; dy < 6; dy++){
                        World.setBlock(x + dx, y + dy, z + dz, 0, 0);
                    }
                }
                //walls
                for(var dy = 1; dy < 6; dy++){
                    setRandomWall(x, y + dy, z + dz);
                    setRandomWall(x + 4, y + dy, z + dz);
                }
                //rails and arc
                World.setBlock(x + 1, y + 5, z + dz, 109, 5);
                World.setBlock(x + 3, y + 5, z + dz, 109, 4);
                World.setBlock(x + 2, y + 2, z + dz, 66, 0);
            }
            World.setBlock(x + 2, y + 2, z, 27, 8);
        }
    }
    
    generateSingleTunnel(x, y, z, direction);
    if(direction == DIRECTION_X)
        generateSingleTunnel(x, y, z + 10, direction);
    else generateSingleTunnel(x + 10, y, z, direction);
}


Underground.generateStation = function(x, y, z, direction){
    Underground.generateTunnel(x, y, z, direction)
    if(direction == DIRECTION_X){
        for(var dx = 0; dx < 16; dx++){
            for(var dz = 5; dz < 10; dz++){
                setRandomWall(x + dx, y + 2, z + dz);
                setRandomWall(x + dx, y + 7, z + dz);
            }
            for(var dz = 3; dz < 12; dz++){
                for(var dy = 3; dy < 6; dy++){
                    World.setBlock(x + dx, y + dy, z + dz, 0, 0);
                }
            }
            
            World.setBlock(x + dx, y + 6, z + 6, 0, 0);
            World.setBlock(x + dx, y + 6, z + 7, 0, 0);
            World.setBlock(x + dx, y + 6, z + 8, 0, 0);
            
            World.setBlock(x + dx, y + 6, z + 5, 109, 7);
            World.setBlock(x + dx, y + 6, z + 9, 109, 6);
            
            setRandomWall(x + dx, y + 6, z + 4);
            setRandomWall(x + dx, y + 6, z + 10);
        }
        for(var dz = 5; dz < 10; dz++){
            for(var dy = 3; dy < 7; dy++){
                setRandomWall(x, y + dy, z + dz);
            }
        }
    } else { //DIRECTION_Z
        for(var dz = 0; dz < 16; dz++){
            for(var dx = 5; dx < 10; dx++){
                setRandomWall(x + dx, y + 2, z + dz);
                setRandomWall(x + dx, y + 7, z + dz);
            }
            for(var dx = 3; dx < 12; dx++){
                for(var dy = 3; dy < 6; dy++){
                    World.setBlock(x + dx, y + dy, z + dz, 0, 0);
                }
            }
            
            World.setBlock(x + 6, y + 6, z + dz, 0, 0);
            World.setBlock(x + 7, y + 6, z + dz, 0, 0);
            World.setBlock(x + 8, y + 6, z + dz, 0, 0);
            
            World.setBlock(x + 5, y + 6, z + dz, 109, 5);
            World.setBlock(x + 9, y + 6, z + dz, 109, 4);
            
            setRandomWall(x + 4, y + 6, z + dz);
            setRandomWall(x + 10, y + 6, z + dz);
        }
        for(var dx = 5; dx < 10; dx++){
            for(var dy = 3; dy < 7; dy++){
                setRandomWall(x + dx, y + dy, z);
            }
        }
    }
}


Underground.exit = function(x, y, z, direction){
    if(direction == DIRECTION_X){
        for(var dx = 0; dx < 16; dx++){
            if(GENERATION_HEIGHT < y + dx) return;
            
            for(var dz = 5; dz < 10; dz++){
                setRandomWall(x + dx, y + dx, z + dz);
                setRandomWall(x + dx, y + dx + 6, z + dz);
            }
            for(var dy = 1; dy < 6; dy++){
                setRandomWall(x + dx, y + dx + dy, z + 4);
                for(var dz = 5; dz < 10; dz++){
                    World.setBlock(x + dx, y + dx + dy, z + dz, 0, 0);
                }
                setRandomWall(x + dx, y + dx + dy, z + 10);
            }
            World.setBlock(x + dx, y + dx + 5, z + 5, 109, 7);
            World.setBlock(x + dx, y + dx + 5, z + 9, 109, 6);
            
            setRandomWall(x + dx, y + dx + 1, z + 7);
            World.setBlock(x + dx, y + dx + 2, z + 7, 109, 0);
        }
    }
    else { //DIRECTION_Z
        for(var dz = 0; dz < 16; dz++){
            for(var dx = 5; dx < 10; dx++){
                setRandomWall(x + dx, y + dz, z + dz);
                setRandomWall(x + dx, y + dz + 6, z + dz);
            }
            for(var dy = 1; dy < 6; dy++){
                setRandomWall(x + 4, y + dz + dy, z + dz);
                for(var dx = 5; dx < 10; dx++){
                    World.setBlock(x + dx, y + dz + dy, z + dz, 0, 0);
                }
                setRandomWall(x + 10, y + dz + dy, z + dz);
            }
            World.setBlock(x + 5, y + dz + 5, z + dz, 109, 5);
            World.setBlock(x + 9, y + dz + 5, z + dz, 109, 4);
            
            setRandomWall(x + 7, y + dz + 1, z + dz);
            World.setBlock(x + 7, y + dz + 2, z + dz, 109, 2);
        }
    }
}








// file: dimension/events/RandomEvents.js

var RandomEvents = {
    events: [],
    
    registerEvent: function(eventName, eventFrequency, eventCallback){
        this.events.push({name: eventName, frequency: eventFrequency, callback: eventCallback});
    },
    
    registerTimedEvent: function(data){
        data.enabled = false;
        this.events.push(data);
    },
    
    randomCoordsNearPlayer: function(){
        let coords = Player.getPosition();
        var x, y, z;
        
        if(Math.random() > 0.5) x = coords.x + Math.random() * 16 + 6;
        else x = coords.x - Math.random() * 16 - 6;
        
        if(Math.random() > 0.5) y = coords.y + Math.random() * 16 + 6;
        else y = coords.y - Math.random() * 16 - 6;
        
        if(Math.random() > 0.5) z = coords.z + Math.random() * 16 + 6;
        else z = coords.z - Math.random() * 16 - 6;
        
        return {"x": x, "y": y, "z": z};
    },
    
    tick: function(){
        for(var key in this.events){
            let event = this.events[key];
            
            //Timed event timers
            if(event.enabled){
                event.timeLeft -= 1;
                if(event.timeLeft <= 0){
                    event.disable();
                    event.enabled = false;
                }
            }
            
            //Start events
            if(Math.random() < event.frequency){
                //Handle timed event
                if(event.time){
                    if(!event.enabled){
                        event.enable();
                        event.enabled = true;
                        event.timeLeft = event.time;
                    }
                //Handle other events
                } else{
                    event.callback(event.name);
                }
            }
        }
    }
}




// file: dimension/events/events.js

const EVENT_FREQUENCY_EXPLOSION_FIRE = 0.1;
const EVENT_FREQUENCY_SPAWN_HUSK = 0.1;


//RandomEvents.registerEvent("zombies", 0.0005, function(){
//    let count = Math.random() * 5;
//    for(var i = 0; i < count; i++){
//        var coords = RandomEvents.randomCoordsNearPlayer();
//        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
//        var type = Math.random() < EVENT_FREQUENCY_SPAWN_HUSK? 47: 32;
//        Entity.spawn(coords.x, coords.y + 1, coords.z, type);
//    }
//});


RandomEvents.registerEvent("weather", 0.005, function(){
    World.setWeather({
        rain: Math.random() * 10,
        thunder: Math.random() * 10
    });
    if(Math.random() < 0.2){
        World.setWeather({
            rain: 0,
            thunder: 0
        });
    }
});


RandomEvents.registerTimedEvent({
    name: "sky_color",
    frequency: 0.01,
    time: 5,
    
    enable: function(){
        APOCity.getWrappedObject().setSkyColor(Math.random(), Math.random(), Math.random());
        APOCity.getWrappedObject().setFogColor(Math.random(), Math.random(), Math.random());
    },
    
    disable: function(){
        APOCity.getWrappedObject().setSkyColor(SKY_COLOR[0], SKY_COLOR[1], SKY_COLOR[2]);
        APOCity.getWrappedObject().setFogColor(FOG_COLOR[0], FOG_COLOR[1], FOG_COLOR[2]);
    }
});


RandomEvents.registerTimedEvent({
    name: "toxic_fog",
    frequency: 0.0001,
    time: 1000,
    
    enable: function(){
        fog = true;
    },
    
    disable: function(){
        fog = false;
    }
});


RandomEvents.registerEvent("planes", 0.0001, function(){
    spawnPlanes(7);
});





// file: scales/chemical.js

var chemicalScale = new ScalesRPG.Scale({
    bitmaps:{
        full: BitmapFactory.decodeFile(__dir__ + "gui/scale_chemical_0.png"), 
        half: BitmapFactory.decodeFile(__dir__ + "gui/scale_chemical_1.png"), 
        empty: BitmapFactory.decodeFile(__dir__ + "gui/scale_chemical_2.png")
    },
    value: 7,
    defaultValue: 0
});



// file: scales/radiation.js

var radiationScale = new ScalesRPG.Scale({
    bitmaps:{
        full: BitmapFactory.decodeFile(__dir__ + "gui/scale_radiation_0.png"), 
        half: BitmapFactory.decodeFile(__dir__ + "gui/scale_radiation_1.png"), 
        empty: BitmapFactory.decodeFile(__dir__ + "gui/scale_radiation_2.png")
    },
    value: 4,
    defaultValue: 0
});



// file: scales/biological.js

var biologicalScale = new ScalesRPG.Scale({
    bitmaps: {
        full: BitmapFactory.decodeFile(__dir__ + "gui/scale_biological_0.png"), 
        half: BitmapFactory.decodeFile(__dir__ + "gui/scale_biological_1.png"), 
        empty: BitmapFactory.decodeFile(__dir__ + "gui/scale_biological_2.png")
    },
    value: 3,
    defaultValue: 0
});



// file: machine/CokeOven.js

IDRegistry.genBlockID("cokeOven");
Block.createBlockWithRotation("cokeOven", [
    {name: "Coke Oven", texture: [["std_bottom", 0], ["std_top", 0], ["std_side", 0], ["coke_oven_front", 0], ["std_side", 0], ["std_side", 0]], inCreative: true}
], "opaque");

var guiCokeOven = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Coke Oven"}},
        inventory: {standart: true},
        background: {standart: true}
    },
    
    drawing: [
        {type: "bitmap", x: 530, y: 146, bitmap: "coke_oven_bar_background", scale: GUI_BAR_STANDART_SCALE},
        {type: "bitmap", x: 450, y: 150, bitmap: "energy_small_background", scale: GUI_BAR_STANDART_SCALE}
    ],
    
    elements: {
        "progressScale": {type: "scale", x: 530, y: 146, direction: 0, value: 0.5, bitmap: "coke_oven_bar_scale", scale: GUI_BAR_STANDART_SCALE},
        "energyScale": {type: "scale", x: 450, y: 150, direction: 1, value: 0.5, bitmap: "energy_small_scale", scale: GUI_BAR_STANDART_SCALE},
        "slotSource": {type: "slot", x: 441, y: 75},
        "slotEnergy": {type: "slot", x: 441, y: 212},
        "slotResult0": {type: "slot", x: 625, y: 60},
        "slotResult1": {type: "slot", x: 625, y: 142},
        "slotResult2": {type: "slot", x: 625, y: 224},
        "slotUpgrade1": {type: "slot", x: 820, y: 48},
        "slotUpgrade2": {type: "slot", x: 820, y: 112},
        "slotUpgrade3": {type: "slot", x: 820, y: 176},
        "slotUpgrade4": {type: "slot", x: 820, y: 240},
    }
});

MachineEssentials.registerStandart(BlockID.cokeOven, {
    getTransportSlots: function(){
        return {input: ["slotSource"], output: ["slotResult0", "slotResult1", "slotResult2"]};
    },
    
    result: function(resultSlots, result){
        for(var i in resultSlots){
            resultSlots[i].id = result[i * 2];
            resultSlots[i].data = 0;
            resultSlots[i].count += result[i * 2 + 1];
        }
    },

    getGuiScreen: function(){
      return guiCokeOven;
    }
    
}, {
    machine_name: "cokeOven",
    source_slot: "slotSource",
    result_slots: ["slotResult0", "slotResult1", "slotResult2"],
    progress_scale: "progressScale",
    energy_scale: "energyScale"
});



Callback.addCallback("PreLoaded", function(){
    // Recipies
    MachineRecipeRegistry.registerRecipesFor("cokeOven", {
        263: [ItemID.propylene, 1, ItemID.coke, 1, ItemID.tarCoal, 1]
    });
});





// file: machine/Extruder.js

IDRegistry.genBlockID("extruder");
Block.createBlockWithRotation("extruder", [
    {name: "Extruder", texture: [["std_bottom", 0], ["extruder_top", 0], ["std_side", 0], ["extruder_front", 0], ["extruder_side", 0], ["extruder_side", 1]], inCreative: true}
], "opaque");

var guiExtruder = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Extruder"}},
        inventory: {standart: true},
        background: {standart: true}
    },
    
    drawing: [
        {type: "bitmap", x: 530, y: 146, bitmap: "extruder_bar_background", scale: GUI_BAR_STANDART_SCALE},
        {type: "bitmap", x: 450, y: 150, bitmap: "energy_small_background", scale: GUI_BAR_STANDART_SCALE}
    ],
    
    elements: {
        "progressScale": {type: "scale", x: 530, y: 146, direction: 0, value: 0.5, bitmap: "extruder_bar_scale", scale: GUI_BAR_STANDART_SCALE},
        "energyScale": {type: "scale", x: 450, y: 150, direction: 1, value: 0.5, bitmap: "energy_small_scale", scale: GUI_BAR_STANDART_SCALE},
        "slotSource": {type: "slot", x: 441, y: 75},
        "slotEnergy": {type: "slot", x: 441, y: 212},
        "slotResult": {type: "slot", x: 625, y: 142},
        "slotUpgrade1": {type: "slot", x: 820, y: 48},
        "slotUpgrade2": {type: "slot", x: 820, y: 112},
        "slotUpgrade3": {type: "slot", x: 820, y: 176},
        "slotUpgrade4": {type: "slot", x: 820, y: 240},
    }
});

MachineEssentials.registerStandart(BlockID.extruder, {
    getTransportSlots: function(){
        return {input: ["slotSource"], output: ["slotResult"]};
    },
    
    result: function(resultSlots, result){
        resultSlots[0].id = result.id;
        resultSlots[0].data = result.data;
        resultSlots[0].count += result.count;
    },

    getGuiScreen: function(){
      return guiExtruder;
    }
    
}, {
    machine_name: "extruder",
    source_slot: "slotSource",
    result_slots: ["slotResult"],
    progress_scale: "progressScale",
    energy_scale: "energyScale"
});



Callback.addCallback("PreLoaded", function(){
    // Recipies
    MachineRecipeRegistry.registerRecipesFor("extruder", {
        20: {id: ItemID.threadGlass, count: 4, data: 0}
    });
});





// file: machine/PlasticPress.js

IDRegistry.genBlockID("pressPlastic");
Block.createBlockWithRotation("pressPlastic", [
    {name: "Plastic Press", texture: [["std_bottom", 0], ["std_top", 0], ["std_side", 0], ["plastic_press_front", 0], ["std_side", 0], ["std_side", 0]], inCreative: true}
], "opaque");

var guiPlasticPress = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Plastic Press"}},
        inventory: {standart: true},
        background: {standart: true}
    },
    
    drawing: [
        {type: "bitmap", x: 530, y: 146, bitmap: "extruder_bar_background", scale: GUI_BAR_STANDART_SCALE},
        {type: "bitmap", x: 450, y: 150, bitmap: "energy_small_background", scale: GUI_BAR_STANDART_SCALE}
    ],
    
    elements: {
        "progressScale": {type: "scale", x: 530, y: 146, direction: 0, value: 0.5, bitmap: "extruder_bar_scale", scale: GUI_BAR_STANDART_SCALE},
        "energyScale": {type: "scale", x: 450, y: 150, direction: 1, value: 0.5, bitmap: "energy_small_scale", scale: GUI_BAR_STANDART_SCALE},
        "slotSource": {type: "slot", x: 441, y: 75},
        "slotPressForm": {type: "slot", x: 530, y: 75},
        "slotEnergy": {type: "slot", x: 441, y: 212},
        "slotResult": {type: "slot", x: 625, y: 142},
        "slotUpgrade1": {type: "slot", x: 820, y: 48},
        "slotUpgrade2": {type: "slot", x: 820, y: 112},
        "slotUpgrade3": {type: "slot", x: 820, y: 176},
        "slotUpgrade4": {type: "slot", x: 820, y: 240},
    }
});

MachineEssentials.registerStandart(BlockID.pressPlastic, {
    getTransportSlots: function(){
        return {input: ["slotSource"], output: ["slotResult"]};
    },
    
    result: function(resultSlots, result){
        resultSlots[0].id = result.id;
        resultSlots[0].data = result.data;
        resultSlots[0].count += result.count;
    },

    getGuiScreen: function(){
      return guiPlasticPress;
    }
    
}, {
    machine_name: "pressPlastic",
    source_slot: "slotSource",
    result_slots: ["slotResult"],
    progress_scale: "progressScale",
    energy_scale: "energyScale",
    
    customResult:  function(result, container){
        var slotPressForm = container.getSlot("slotPressForm");
        for(var i in result){
            if(eval(i) == slotPressForm.id){
                return result[i];
            }
        }
        return false;
    }
});



Callback.addCallback("PreLoaded", function(){
    // Recipies
    MachineRecipeRegistry.registerRecipesFor("pressPlastic", {
        "ItemID.granulesPolypropylene": {
            "ItemID.pressFormPlate": {id: ItemID.platePolypropylene, count: 1, data: 0}
        }
    }, true);
});





// file: machine/Rectifier.js

IDRegistry.genBlockID("rectifier");
Block.createBlockWithRotation("rectifier", [
    {name: "Rectifier", texture: [["std_bottom", 0], ["rectifier_top", 0], ["std_side", 0], ["rectifier_front", 0], ["std_side", 0], ["std_side", 0]], inCreative: true}
], "opaque");

var layoutRectifier = {
    standart: {
        header: {text: {text: "Rectifier"}},
        inventory: {standart: true},
        background: {standart: true}
    },
    
    drawing: [
        {type: "bitmap", x: 530, y: 216, bitmap: "rectifier_bar_background", scale: GUI_BAR_STANDART_SCALE},
        {type: "bitmap", x: 490, y: 220, bitmap: "energy_small_background", scale: GUI_BAR_STANDART_SCALE}
    ],
    
    elements: {
        "progressScale": {type: "scale", x: 530, y: 216, direction: 0, value: 0.5, bitmap: "rectifier_bar_scale", scale: GUI_BAR_STANDART_SCALE},
        "energyScale": {type: "scale", x: 490, y: 220, direction: 1, value: 0.5, bitmap: "energy_small_scale", scale: GUI_BAR_STANDART_SCALE},
        "slotSource": {type: "slot", x: 510, y: 155},
        "slotEnergy": {type: "slot", x: 510, y: 278},
        "slotUpgrade1": {type: "slot", x: 820, y: 48},
        "slotUpgrade2": {type: "slot", x: 820, y: 112},
        "slotUpgrade3": {type: "slot", x: 820, y: 176},
        "slotUpgrade4": {type: "slot", x: 820, y: 240},
    }
}
var resultSlotsRectifier = [];
for(var i = 0; i < 8; i++){
    let angle = i * 45 * Math.PI / 180;
    dx = 150 * Math.cos(angle);
    dy = 150 * Math.sin(angle);
    layoutRectifier.elements["slotResult" + i] = {type: "slot", x: 510 + dx, y: 215 + dy};
    resultSlotsRectifier.push("slotResult" + i);
}


var guiRectifier = new UI.StandartWindow(layoutRectifier);



MachineEssentials.registerStandart(BlockID.rectifier, {
    getTransportSlots: function(){
        return {input: ["slotSource"], output: resultSlotsRectifier};
    },
    
    result: function(resultSlots, result){
        for(var i in resultSlots){
            resultSlots[i].id = result[i * 2];
            resultSlots[i].data = 0;
            resultSlots[i].count += result[i * 2 + 1];
        }
    },

    getGuiScreen: function(){
        return guiRectifier;
    }
    
}, {
    machine_name: "rectifier",
    source_slot: "slotSource",
    result_slots: resultSlotsRectifier,
    progress_scale: "progressScale",
    energy_scale: "energyScale"
});



Callback.addCallback("PostLoaded", function(){
    // Recipies
    MachineRecipeRegistry.registerRecipesFor("rectifier", {
        "BlockID.oreShaleOil": [ItemID.waste, 1, ItemID.dustQuartz, 1, ItemID.bitumen, 1, ItemID.propylene, 1, ItemID.oilResin, 1, ItemID.oilFuel, 1, ItemID.petrol, 1, ItemID.kerosene, 1],
        "BlockID.asphalt": [ItemID.bitumen, 1, 13, 2]
    }, true);
});





// file: machine/Polymerizer.js

IDRegistry.genBlockID("polymerizer");
Block.createBlockWithRotation("polymerizer", [
    {name: "Polymerizer", texture: [["std_bottom", 0], ["std_top", 0], ["std_side", 0], ["polymerizer_front", 0], ["std_side", 0], ["std_side", 0]], inCreative: true}
], "opaque");

var guiPolymerizer = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Polymerizer"}},
        inventory: {standart: true},
        background: {standart: true}
    },
    
    drawing: [
        {type: "bitmap", x: 530, y: 146, bitmap: "polymerizer_bar_background", scale: GUI_BAR_STANDART_SCALE},
        {type: "bitmap", x: 450, y: 150, bitmap: "energy_small_background", scale: GUI_BAR_STANDART_SCALE}
    ],
    
    elements: {
        "progressScale": {type: "scale", x: 530, y: 146, direction: 0, value: 0.5, bitmap: "polymerizer_bar_scale", scale: GUI_BAR_STANDART_SCALE},
        "energyScale": {type: "scale", x: 450, y: 150, direction: 1, value: 0.5, bitmap: "energy_small_scale", scale: GUI_BAR_STANDART_SCALE},
        "slotSource": {type: "slot", x: 441, y: 75},
        "slotEnergy": {type: "slot", x: 441, y: 212},
        "slotResult": {type: "slot", x: 625, y: 142},
        "slotUpgrade1": {type: "slot", x: 820, y: 48},
        "slotUpgrade2": {type: "slot", x: 820, y: 112},
        "slotUpgrade3": {type: "slot", x: 820, y: 176},
        "slotUpgrade4": {type: "slot", x: 820, y: 240},
    }
});

MachineEssentials.registerStandart(BlockID.polymerizer, {
    getTransportSlots: function(){
        return {input: ["slotSource"], output: ["slotResult"]};
    },
    
    result: function(resultSlots, result){
        resultSlots[0].id = result.id;
        resultSlots[0].data = result.data;
        resultSlots[0].count += result.count;
    },

    getGuiScreen: function(){
      return guiPolymerizer;
    }
    
}, {
    machine_name: "polymerizer",
    source_slot: "slotSource",
    result_slots: ["slotResult"],
    progress_scale: "progressScale",
    energy_scale: "energyScale"
});



Callback.addCallback("PreLoaded", function(){
    // Recipies
    MachineRecipeRegistry.registerRecipesFor("polymerizer", {
        "ItemID.propylene": {id: ItemID.granulesPolypropylene, count: 1, data: 0}
    }, true);
});





// file: machine/Wire.js

/* Этот код получается слишком кривым. Возможно, в светлом будущем он станет лучше. */


// High-Voltage Transformator
IDRegistry.genBlockID("hvTransformator");
Block.createBlock("hvTransformator", [
    {name: "High-Voltage Transformator", texture: [["std_bottom", 0], ["std_top", 0], ["hv_transformator", 0], ["hv_transformator", 0], ["hv_transformator", 0], ["hv_transformator", 0]], inCreative: true}
]);
ICRender.getGroup("ic-transformator").add(BlockID.hvTransformator, -1);

TileEntity.registerPrototype(BlockID.hvTransformator, {
    defaultValues: {
        transmitter: false,
        energy: 0,
        consumers: [],
        nodes: []
    }, 
    
    click: function(id, count, data){
        if(id == BlockID.hvConnector) return true;
        this.data.transmitter = !this.data.transmitter;
        if(this.data.transmitter){
            Game.message("Transmitter");
            this.updateConsumers();
        } else {
            Game.message("Reciever");
        }
        return true;
    },
    
    created: function(){
        let coords = {x: this.x, y: this.y, z: this.z};
        let sideCoords = getSideCoords(coords);
        let transmitters = [];
        for(var i in sideCoords){
            if(World.getBlockID(sideCoords[i].x, sideCoords[i].y, sideCoords[i].z) == BlockID.hvConnector){
                WireSystem.getTransmitters(sideCoords[i], transmitters);
            }
        }
        for(var i in transmitters){
            let coords = transmitters[i];
            let transmitter = World.getTileEntity(coords.x, coords.y, coords.z);
            transmitter.updateConsumers();
        }
    },
    
    energyTick: function(type, src){
        if(this.data.transmitter){
            let amount = src.amount();
            for(var i in this.data.consumers) { 
                let coords = this.data.consumers[i];
                let consumer = World.getTileEntity(coords.x, coords.y, coords.z);
                if(consumer) {
                    let energy = Math.min(1000 - consumer.data.energy, Math.min(1000, amount));
                    consumer.data.energy += src.get(energy);
                    amount = src.amount();
                }
                else {
                    this.updateConsumers();
                    break;
                }
            }
        } else {
            this.data.energy = src.add(this.data.energy);
        }
    },
    
    updateConsumers: function(){
        let coords = {x: this.x, y: this.y, z: this.z};
        let sideCoords = getSideCoords(coords);
        this.data.consumers = [];
        for(var i in sideCoords){
            if(World.getBlockID(sideCoords[i].x, sideCoords[i].y, sideCoords[i].z) == BlockID.hvConnector){
                WireSystem.getConsumers(sideCoords[i], this.data.consumers);
            }
        }
    },
    
    isGenerator: function() {return !this.data.transmitter;}
});

EnergyTileRegistry.addEnergyTypeForId(BlockID.hvTransformator, EU);

Callback.addCallback("ItemUse", function(coords, item, block){
    let x = coords.relative.x;
    let y = coords.relative.y;
    let z = coords.relative.z;
    if(block.id == BlockID.hvTransformator && item.id == BlockID.hvConnector){
        World.setBlock(x, y, z, BlockID.hvConnector, 0);
    }
});




// High-Voltage Connector
IDRegistry.genBlockID("hvConnector");
Block.createBlock("hvConnector", [
    {name: "High-Voltage Connector", texture: [["hv_connector", 0]], inCreative: true}
]);
RenderTools.setupConnectorRender(BlockID.hvConnector);

Callback.addCallback("DestroyBlock", function(coords, block, player){
    if(block.id == BlockID.hvConnector){
        // Get transmitters 
        let transmitters = [];
        WireSystem.getTransmitters(coords, transmitters);
        
        // Remove animations
        WireSystem.wires = WireSystem.wires.filter(function(wire){
            let wc1 = wire.coords[0];
            let wc2 = wire.coords[1];
            if((wc1.x == coords.x && wc1.y == coords.y && wc1.z == coords.z)
                    || (wc2.x == coords.x && wc2.y == coords.y && wc2.z == coords.z)){
                // Remove wire from array and remove animation of the returned item;
                wire.animation.destroy();
                World.drop(coords.x, coords.y, coords.z, ItemID.wireCoil, 1, 0);
                return false;
            }
            return true;
        });
        
        for(var i in transmitters){
            let coords = transmitters[i];
            let transmitter = World.getTileEntity(coords.x, coords.y, coords.z);
            transmitter.updateConsumers();
        }
    }
});



IDRegistry.genItemID("wireCoil");
Item.createItem("wireCoil", "Wire coil", {name: "wire_coil", meta: 0}, {});

var WireSystem = {
    connector1: undefined,
    
    wires: [],
    
    setupWire: function(pos1, pos2){
        let distance = Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2) + Math.pow(pos1.z - pos2.z, 2));
        if(distance == 0 || distance > 32) {
            return false;
        }
        for(var i in WireSystem.wires){
            if(WireSystem.equal(WireSystem.wires[i].coords, [pos1, pos2])){
                return false;
            }
        }
        let animation = WireSystem.addWire(pos1, pos2, distance);
        WireSystem.wires.push({animation: animation, coords: [pos1, pos2]});
        return true;
    },
    
    equal: function(coords1, coords2){
        let a1 = coords1[0];
        let a2 = coords1[1];
        let b1 = coords2[0];
        let b2 = coords2[1];
        return (a1.x == b1.x && a1.y == b1.y && a1.z == b1.z
                    && a2.x == b2.x && a2.y == b2.y && a2.z == b2.z)
                || (a1.x == b2.x && a1.y == b2.y && a1.z == b2.z
                    && a2.x == b1.x && a2.y == b1.y && a2.z == b1.z);
            
    },
    
    addWire: function(pos1, pos2, distance){
        pos1 = {x: pos1.x + 0.5, y: pos1.y - 1, z: pos1.z + 0.5};
        pos2 = {x: pos2.x + 0.5, y: pos2.y - 1, z: pos2.z + 0.5};
        var animationWire = new Animation.Base((pos1.x + pos2.x) / 2, (pos1.y + pos2.y) / 2, (pos1.z + pos2.z) / 2);
        var render = new Render({skin: "mob/wire.png"});
        var partWire = render.getPart("body").addPart("wire");
        
        var angleX = (pos2.y == pos1.y)? 0: Math.atan((pos1.z - pos2.z) / (pos2.y - pos1.y));
        var angleY = (pos2.x == pos1.x)? Math.PI / 2: Math.atan((pos1.z - pos2.z) / (pos1.x - pos2.x));
        var angleZ = (pos1.x == pos2.x)? 0: Math.atan((pos2.y - pos1.y) / (pos1.x - pos2.x));
        
        if(!distance) {
            distance = Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2) + Math.pow(pos1.z - pos2.z, 2));
        }
        partWire.setRotation(angleX, angleY, angleZ);
        render.setPart("wire", [
            {
                type: "box",
                coords: { x: 0, y: 0, z: 0 },
                size: { x: distance * 16, y: 1, z: 1 }
            },
        ], {});
        
        animationWire.describe({render: render.getId()});
        animationWire.load();
        
        return animationWire;
    },
    
    getTransmitters: function(coords, transmitters){
        let checked = [];
        //y = -1 grants that this point won't be used in the game
        let pointEmpty = {x: 0, y: -1, z: 0};
        WireSystem.getNodesRecursive(coords, pointEmpty, transmitters, checked, true);
    },
    
    getConsumers: function(coords, consumers){
        let checked = [];
        //y = -1 grants that this point won't be used in the game
        let pointEmpty = {x: 0, y: -1, z: 0};
        WireSystem.getNodesRecursive(coords, pointEmpty, consumers, checked, false);
    },
    
    getNodesRecursive: function(coords, prev, consumers, checked, transmitter){
        for(var i in checked){
            if(checked[i].x == coords.x && checked[i].y == coords.y && checked[i].z == coords.z){
                return;
            }
        }
        checked.push(coords);
        
        let sideCoords = getSideCoords(coords);
        for(var i in sideCoords){
            let x = sideCoords[i].x;
            let y = sideCoords[i].y;
            let z = sideCoords[i].z;
            let tileEntity = World.getTileEntity(x, y, z);
            let block = World.getBlockID(x, y, z);
            if(tileEntity != null && block == BlockID.hvTransformator && transmitter == tileEntity.data.transmitter){ 
                consumers.push({x: x, y: y, z: z});
            }
        }
            
        for(var i in WireSystem.wires){
            if(WireSystem.equal(WireSystem.wires[i].coords, [coords, prev])){
                continue;
            }
            let wc1 = WireSystem.wires[i].coords[0];
            let wc2 = WireSystem.wires[i].coords[1];
            Logger.Log(JSON.stringify(wc1));
            Logger.Log(JSON.stringify(wc2));
            Logger.Log(JSON.stringify(coords));
            if(wc1.x == coords.x && wc1.y == coords.y && wc1.z == coords.z){
                WireSystem.getNodesRecursive(wc2, wc1, consumers, checked, transmitter);
            } else if(wc2.x == coords.x && wc2.y == coords.y && wc2.z == coords.z){
                WireSystem.getNodesRecursive(wc1, wc2, consumers, checked, transmitter);
            }
        }
        return consumers;
    }
}

Saver.addSavesScope("wires", 
    function read(scope){
        WireSystem.wires = [];
        for(var i in scope.wires){
            let pos1 = scope.wires[i][0];
            let pos2 = scope.wires[i][1];
            let animation = WireSystem.addWire(pos1, pos2);
            WireSystem.wires.push({animation: animation, coords : [pos1, pos2]});
        }
    },

    function save(){
        var scope = [];
        for(var i in WireSystem.wires){
            scope.push(WireSystem.wires[i].coords);
        }
        return {wires: scope};
    }
);

Item.registerUseFunction("wireCoil", function (coords, item, block) {
    if(block.id != BlockID.hvConnector)
        return;
    if(!WireSystem.connector1){
        WireSystem.connector1 = {x: coords.x, y: coords.y, z: coords.z};
    } else {
        let connector2 = {x: coords.x, y: coords.y, z: coords.z};
        if(WireSystem.setupWire(WireSystem.connector1, connector2)){
            Game.message("Addding wire");
            let transmitters = [];
            WireSystem.getTransmitters(connector2, transmitters);
            for(var i in transmitters){
                let coords = transmitters[i];
                let transmitter = World.getTileEntity(coords.x, coords.y, coords.z);
                transmitter.updateConsumers();
            }
            Player.decreaseCarriedItem();
            WireSystem.connector1 = null;
        }
    }
});



// file: mob/ArmorSet.js

/*
 * Special class used for managing Armor
 */

var ArmorSet = function(){
    this.slots = [];
    
    this.setSlot = function(slot, items){
        this.slots[slot] = items;
    }
    
    this.equip = function(entity){
        for(var slot in this.slots){
            var id = this.slots[slot][randomInt(0, this.slots[slot].length - 1)];
            Entity.setArmorSlot(entity, slot, id, 1, 0);
        }
    }
}



// file: mob/Military.js

var mobMilitary = MobRegistry.registerEntity("military");

mobMilitary.customizeEvents({
    tick: function(){
        Entity.setRender(this.entity, 3);
        Entity.setSkin(this.entity, "mob/military.png");
        Entity.setNameTag(this.entity,"Military");
        //Entity.setCarriedItem(this.entity, 267, 1, 0);
    },
    death: function(){
        //addExpAtEntity(this.entity, 4);
    },
    getDrop: function(){
        var coords = Entity.getPosition(entity);
        World.drop(coords.x, coords.y, coords.z, 267, 1);
    },
    attackedBy: function(attacker, amount){
        //World.playSoundAtEntity(this.entity, "mob.creeper.say1", 1, 1);
    }
});

mobMilitary.customizeDescription({
    getHitbox: function(){
        return {w: 0.9, h: 1.8}
    }
});

//mobMilitary.customizeAI({ 
//    getAITypes: function(){ 
//        return { 
//            wander: { 
//                type: EntityAI.Wander,
//                priority: 4,
//                speed: 0.09,
//                angular_speed: 0.1,
//                delay_weigth: 0.2
//            },
//        } 
//    } 
//});
//
TradeLib.registerTrader("military", [
    {price: {id: ItemID.silver, count: 5, data: 0}, good: {id: ItemID.helmetMilitary, count: 1, data: 0}},
    {price: {id: 264, count: 1, data: 0}, good: {id: ItemID.helmetMilitary, count: 1, data: 0}}
]);

var armorMilitary = new ArmorSet();
armorMilitary.setSlot(0, [
    ItemID.helmetMilitary, 
    ItemID.helmetAltyn, 
    ItemID.helmetOpsCore, 
    ItemID.helmetShch1
]);

armorMilitary.setSlot(1, [
    ItemID.chestplateBKZ6,
    ItemID.chestplateIOTVgen3,
    ItemID.chestplate6B43,
    ItemID.chestplateSplinterVest
]);

armorMilitary.setSlot(2, [
    ItemID.leggingsPantsArmy
]);

armorMilitary.setSlot(3, [
    ItemID.bootsArmy
]);




// file: mob/UI.js

