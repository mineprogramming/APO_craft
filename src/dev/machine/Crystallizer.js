// Crystallizer
IDRegistry.genBlockID("crystalizer");
Block.createBlockWithRotation("crystalizer", [
    {name: "Crystallizer", texture: [["burner_top", 0], ["burner_top", 0], ["soldering_bottom", 0], ["crystallizer_front", 0], ["soldering_bottom", 0], ["soldering_bottom", 0]], inCreative: true}
], "opaque");
RecipesManager.addShaped({id: BlockID.crystalizer, count: 1, data: 0}, [
    "ac",
    "b0b"
], ['0', BlockID.machineBlockBasic, 0, 'a', ItemID.raspberryPi3, 0, 'c', 390, 0, 'b', ItemID.plateAluminum, 0]);

var guiCrystallizer = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Crystallizer"}},
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

MachineEssentials.registerStandard(BlockID.crystalizer, {
    machine_name: "crystalizer",
    source_slots: ["slotSource"],
    result_slots: ["slotResult"],
    progress_scale: "progressScale",
    energy_scale: "energyScale",
    guiScreen: guiCrystallizer,
    
    resultFunc: function(resultSlots, result){
        resultSlots[0].id = result.id;
        resultSlots[0].data = result.data;
        resultSlots[0].count += result.count;
    }
});



Callback.addCallback("PreLoaded", function(){
    // Recipes
    MachineRecipeRegistry.registerRecipesFor("crystalizer", [
        {
            "source": {id: ItemID.silicon, data: 0},
            "result": {id: ItemID.crystalSilicon, count: 1, data: 0}
        }
    ]);
});