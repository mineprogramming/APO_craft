// Extruder
IDRegistry.genBlockID("extruder");
Block.createBlockWithRotation("extruder", [
    {name: "Extruder", texture: [["std_bottom", 0], ["extruder_top", 0], ["std_side", 0], ["extruder_front", 0], ["extruder_side", 0], ["extruder_side", 1]], inCreative: true}
], "opaque");
RecipesManager.addShaped({id: BlockID.extruder, count: 1, data: 0}, [
    "ac",
    "b0b",
    " c "
], ['0', BlockID.machineBlockBasic, 0, 'a', ItemID.arduinoMega, 0, 'c', ItemID.roller, 0, 'b', ItemID.lineAssembly, 0]);


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

MachineEssentials.registerStandard(BlockID.extruder, {
    machine_name: "extruder",
    source_slots: ["slotSource"],
    result_slots: ["slotResult"],
    progress_scale: "progressScale",
    energy_scale: "energyScale",
    guiScreen: guiExtruder,
    
    resultFunc: function(resultSlots, result){
        resultSlots[0].id = result.id;
        resultSlots[0].data = result.data;
        resultSlots[0].count += result.count;
    }
});



Callback.addCallback("PreLoaded", function(){
    // Recipes
    MachineRecipeRegistry.registerRecipesFor("extruder", [
        {
            "source": {id: 20, data: 0},
            "result": {id: ItemID.threadGlass, count: 4, data: 0}
        }
    ]);
});