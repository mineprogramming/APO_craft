// Fuel Generator
IDRegistry.genBlockID("generatorFuel");
Block.createBlockWithRotation("generatorFuel", [
    {name: "Fuel Generator", texture: [["soldering_bottom", 0], ["soldering_bottom", 0], ["soldering_bottom", 0], ["fuel_front", 0], ["soldering_bottom", 0], ["soldering_bottom", 0]], inCreative: true}
], "opaque");
RecipesManager.addShaped({id: BlockID.generatorFuel, count: 1, data: 0}, [
    "ac ",
    "b0b",
    " d "
], ['0', BlockID.machineBlockBasic, 0, 'a', ItemID.arduinoUno, 0, 'c', 61, 0, 'b', ItemID.storageBattery, 0, 'd', ItemID.transformer, 0]);


var guiFuelGenerator = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Fuel Generator"}},
        inventory: {standart: true},
        background: {standart: true}
    },
    
    drawing: [
        {type: "bitmap", x: 530, y: 144, bitmap: "energy_bar_background", scale: GUI_BAR_STANDART_SCALE},
        {type: "bitmap", x: 450, y: 150, bitmap: "fire_background", scale: GUI_BAR_STANDART_SCALE},
    ],
    
    elements: {
        "energyScale": {type: "scale", x: 530 + GUI_BAR_STANDART_SCALE * 4, y: 144, direction: 0, value: 0.5, bitmap: "energy_bar_scale", scale: GUI_BAR_STANDART_SCALE},
        "burningScale": {type: "scale", x: 450, y: 150, direction: 1, value: 0.5, bitmap: "fire_scale", scale: GUI_BAR_STANDART_SCALE},
        "slotEnergy": {type: "slot", x: 441, y: 75, isValid: function(id){return ChargeItemRegistry.isValidItem(id, "Eu", 0);}},
        "slotFuel": {type: "slot", x: 441, y: 212},
        "textInfo1": {type: "text", x: 642, y: 142, width: 300, height: 30, text: "0/"},
        "textInfo2": {type: "text", x: 642, y: 172, width: 300, height: 30, text: "10000"}
    }
});



MachineEssentials.registerGenerator(BlockID.generatorFuel, {
    defaultValues: {
        burn: 0,
        burnMax: 0,
        isActive: false
    },
    energyStorage: 8000,
    production: 10,
    returnMax: 32,
    guiScreen: guiFuelGenerator,
    energyScale: "energyScale",
    textInfo: ["textInfo1", "textInfo2"],
    
    condition: function(scope){
        if(scope.data.burn <= 0 && scope.data.energy < scope.getEnergyStorage()){
            scope.data.burn = scope.data.burnMax = MachineEssentials.getFuel(scope, "slotFuel") / 4;
        }
        
        return scope.data.burn > 0;
    },
    
    progress: function(scope){
        scope.data.burn--;
    },
    
    update: function(scope){
        scope.container.setScale("burningScale", scope.data.burn / scope.data.burnMax || 0);
    }
});