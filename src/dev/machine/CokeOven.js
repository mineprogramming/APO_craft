// Coke Oven
IDRegistry.genBlockID("cokeOven");
Block.createBlockWithRotation("cokeOven", [
    {name: "Coke Oven", texture: [["std_bottom", 0], ["std_top", 0], ["std_side", 0], ["coke_oven_front", 0], ["std_side", 0], ["std_side", 0]], inCreative: true}
], "opaque");
RecipesManager.addShaped({id: BlockID.cokeOven, count: 1, data: 0}, [
    "a  ",
    "b0b",
    " b "
], ['0', BlockID.machineBlockBasic, 0, 'a', ItemID.arduinoUno, 0, 'b', 112, 0]);


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

MachineEssentials.registerStandard(BlockID.cokeOven, {
    machine_name: "cokeOven",
    source_slots: ["slotSource"],
    result_slots: ["slotResult0", "slotResult1", "slotResult2"],
    progress_scale: "progressScale",
    energy_scale: "energyScale",
    guiScreen: guiCokeOven,
    
    resultFunc: function(resultSlots, result){
        for(var i in resultSlots){
            resultSlots[i].id = result[i * 2];
            resultSlots[i].data = 0;
            resultSlots[i].count += result[i * 2 + 1];
        }
    },
});



Callback.addCallback("PreLoaded", function(){
    // Recipes
    MachineRecipeRegistry.registerRecipesFor("cokeOven", [
        {
            "source": {"id": 263, "data": 0},
            "result": [ItemID.propylene, 1, ItemID.coke, 1, ItemID.tarCoal, 1]
        }
    ]);
});