// Assembly Table
IDRegistry.genBlockID("tableAssembly");
Block.createBlockWithRotation("tableAssembly", [
    {name: "Assembly Table", texture: [["soldering_bottom", 0], ["assembley_top", 0], ["assembley_side", 0], ["assembley_side", 0], ["assembley_side", 0], ["assembley_side", 0]], inCreative: true}
], "opaque");
RecipesManager.addShaped({id: BlockID.tableAssembly, count: 1, data: 0}, [
    "abc",
    "b0b",
    "dbd"
], ['0', BlockID.machineBlockBasic, 0, 'a', ItemID.raspberryPi3, 0, 'c', 331, 0, 'b', 58, 0, 'd', ItemID.plateAluminum, 0]);


var guiMetalPress = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Assembly Table"}},
        inventory: {standart: true},
        background: {standart: true}
    },
    
    drawing: [
        {type: "bitmap", x: 590, y: 146, bitmap: "extruder_bar_background", scale: GUI_BAR_STANDART_SCALE},
        {type: "bitmap", x: 450, y: 230, bitmap: "energy_small_background", scale: GUI_BAR_STANDART_SCALE}
    ],
    
    elements: {
        "progressScale": {type: "scale", x: 590, y: 146, direction: 0, value: 0.5, bitmap: "extruder_bar_scale", scale: GUI_BAR_STANDART_SCALE},
        "energyScale": {type: "scale", x: 450, y: 230, direction: 1, value: 0.5, bitmap: "energy_small_scale", scale: GUI_BAR_STANDART_SCALE},
        "slotSource0": {type: "slot", x: 400, y: 75},
        "slotSource1": {type: "slot", x: 475, y: 75},
        "slotSource2": {type: "slot", x: 400, y: 150},
        "slotSource3": {type: "slot", x: 475, y: 150},
        "slotEnergy": {type: "slot", x: 441, y: 292},
        "slotResult": {type: "slot", x: 675, y: 142},
        "slotUpgrade1": {type: "slot", x: 820, y: 48},
        "slotUpgrade2": {type: "slot", x: 820, y: 112},
        "slotUpgrade3": {type: "slot", x: 820, y: 176},
        "slotUpgrade4": {type: "slot", x: 820, y: 240},
    }
});

MachineEssentials.registerStandard(BlockID.tableAssembly, {
    machine_name: "tableAssembly",
    source_slots: ["slotSource0", "slotSource1", "slotSource2", "slotSource3"],
    result_slots: ["slotResult"],
    progress_scale: "progressScale",
    energy_scale: "energyScale",
    guiScreen: guiMetalPress,
    
    resultFunc: function(resultSlots, result){
        resultSlots[0].id = result.id;
        resultSlots[0].data = result.data;
        resultSlots[0].count += result.count;
    },
});



Callback.addCallback("PreLoaded", function(){
    // Recipes
    MachineRecipeRegistry.registerRecipesFor("tableAssembly", [
        {
            "source": [{id: ItemID.controllerHdd, data: 0}, {id: ItemID.headMagnetic, data: 0}, {id: ItemID.diskMagnetic, data: 0}, {id: ItemID.diskMagnetic, data: 0}],
            "result": {id: ItemID.hdd, count: 1, data: 0}
        },
        {
            "source": [{id: ItemID.chipGeneratorSpaceTime, data: 0}, {id: 356, data: 0}, {id: 76, data: 0}, {id: ItemID.coilCopper, data: 0}],
            "result": {id: ItemID.generatorSpaceTime, count: 1, data: 0}
        },
        {
            "source": [{id: ItemID.coilCopper, data: 0}, {id: ItemID.bladePolypropylene, data: 0}, {id: ItemID.bladePolypropylene, data: 0}],
            "result": {id: ItemID.systemCooling, count: 1, data: 0}
        },
    ]);
});