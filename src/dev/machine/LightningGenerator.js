// Lightning Energy Generator
IDRegistry.genBlockID("generatorLightning");
Block.createBlockWithRotation("generatorLightning", [
    {name: "Lightning Energy Generator", texture: [["soldering_bottom", 0], ["lightning_top", 0], ["lightning_side", 0], ["lightning_side", 0], ["lightning_side", 0], ["lightning_side", 0]], inCreative: true}
], BLOCK_HARD);
RecipesManager.addShaped({id: BlockID.generatorLightning, count: 1, data: 0}, [
    "af ",
    "b0b",
    "ddd"
], ['0', BlockID.machineBlockBasic, 0, 'a', ItemID.arduinoMega, 0, 'f', ItemID.rodSteel, 0, 'b', ItemID.storageBattery, 0, 'd', ItemID.transformer, 0]);


var guiLightningGenerator = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Lightning Energy Generator"}},
        inventory: {standart: true},
        background: {standart: true}
    },
    
    drawing: [
        {type: "bitmap", x: 530, y: 144, bitmap: "energy_bar_background", scale: GUI_BAR_STANDART_SCALE},
    ],
    
    elements: {
        "energyScale": {type: "scale", x: 530 + GUI_BAR_STANDART_SCALE * 4, y: 144, direction: 0, value: 0.5, bitmap: "energy_bar_scale", scale: GUI_BAR_STANDART_SCALE},
        "slotEnergy": {type: "slot", x: 441, y: 75},
        "textInfo1": {type: "text", x: 642, y: 142, width: 300, height: 30, text: "0/"},
        "textInfo2": {type: "text", x: 642, y: 172, width: 300, height: 30, text: "10000"}
    }
});

MachineEssentials.registerGenerator(BlockID.generatorLightning, {
    energyStorage: 8000,
    production: 8000,
    returnMax: 64,
    guiScreen: guiLightningGenerator,
    energyScale: "energyScale",
    textInfo: ["textInfo1", "textInfo2"],
    
    condition: function(){
        return World.getThreadTime() % 100 == 0 && World.getWeather().thunder > 0;
    },
    
    progress: function(scope){
        Entity.spawn(scope.x + Math.random() - 0.5, scope.y + 1, scope.z + Math.random() - 0.5, Native.EntityType.LIGHTNING_BOLT);
    }
});