// Laser Burner
IDRegistry.genBlockID("burnerLaser");
Block.createBlockWithRotation("burnerLaser", [
    {name: "Laser Burner", texture: [["burner_top", 0], ["burner_top", 0], ["soldering_bottom", 0], ["burner_side", 0], ["soldering_bottom", 0], ["soldering_bottom", 0]], inCreative: true}
], "opaque");
RecipesManager.addShaped({id: BlockID.burnerLaser, count: 1, data: 0}, [
    "ab",
    " 0"
], ['0', BlockID.machineBlockBasic, 0, 'a', ItemID.raspberryPi3, 0, 'b', ItemID.laser, 0]);


var guiMetalPress = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Laser Burner"}},
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

MachineEssentials.registerStandard(BlockID.burnerLaser, {
    machine_name: "burnerLaser",
    source_slots: ["slotSource"],
    result_slots: ["slotResult"],
    progress_scale: "progressScale",
    energy_scale: "energyScale",
    guiScreen: guiMetalPress,
    
    customResult:  function(result, container){
        var slotPressForm = container.getSlot("slotPressForm");
        for(var i in result){
            if(eval(i) == slotPressForm.id){
                return result[i];
            }
        }
        return false;
    },
    
    resultFunc: function(resultSlots, result){
        resultSlots[0].id = result.id;
        resultSlots[0].data = result.data;
        resultSlots[0].count += result.count;
    },
});

Callback.addCallback("PreLoaded", function(){
    // Recipes
    MachineRecipeRegistry.registerRecipesFor("burnerLaser", [
        {
            "source": {"id": ItemID.textoliteFoil, "data": 0},
            "result": {
                "ItemID.drawingPcbArduinoMega": {id: ItemID.pcbArduinoMega, count: 1, data: 0},
                "ItemID.drawingPcbArduinoUno": {id: ItemID.pcbArduinoUno, count: 1, data: 0},
                "ItemID.drawingPcbRaspberry3": {id: ItemID.pcbRaspberry3, count: 1, data: 0},
                "ItemID.drawingPcbMotherboard": {id: ItemID.pcbMotherboard, count: 1, data: 0},
                "ItemID.drawingPcbPowerSupply": {id: ItemID.pcbPowerSupply, count: 1, data: 0},
                "ItemID.drawingPcbControllerHdd": {id: ItemID.pcbControllerHdd, count: 1, data: 0},
                "ItemID.drawingPcbRam": {id: ItemID.pcbRam, count: 1, data: 0},
                "ItemID.drawingPcbCardVideo": {id: ItemID.pcbCardVideo, count: 1, data: 0}
            }
        },
        {
            "source": {"id": ItemID.crystalSilicon, "data": 0},
            "result": {
                "ItemID.drawingATmega2560": {id: ItemID.ATmega2560, count: 1, data: 0},
                "ItemID.drawingATmega328": {id: ItemID.ATmega328, count: 1, data: 0},
                "ItemID.drawingChipRaspberry": {id: ItemID.chipRaspberry, count: 1, data: 0},
                "ItemID.drawingChipset": {id: ItemID.chipset, count: 1, data: 0},
                "ItemID.drawingCpu": {id: ItemID.cpu, count: 1, data: 0},
                "ItemID.drawingChipRam": {id: ItemID.chipRam, count: 1, data: 0},
                "ItemID.drawingChipVideo": {id: ItemID.chipVideo, count: 1, data: 0},
                "ItemID.drawingChipGeneratorSpaceTime": {id: ItemID.chipGeneratorSpaceTime, count: 1, data: 0}
            }
        }
    ]);
});