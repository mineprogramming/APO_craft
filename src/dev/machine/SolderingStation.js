// Soldering Station
IDRegistry.genBlockID("solderingStation");
Block.createBlockWithRotation("solderingStation", [
    {name: "Soldering Station", texture: [["soldering_bottom", 0], ["soldering_top", 0], ["soldering_side", 0], ["soldering_front", 0], ["soldering_side", 0], ["soldering_side", 0]], inCreative: true}
], "opaque");
RecipesManager.addShaped({id: BlockID.solderingStation, count: 1, data: 0}, [
    "cb-",
    "c  ",
    "a0 "
], ['0', BlockID.machineBlockBasic, 0, 'a', ItemID.raspberryPi3, 0, 'b', ItemID.casingPolypropylene, 0, 'c', ItemID.cableCopper0, 0, '-', ItemID.rodCopper, 0]);


var guiMetalPress = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Soldering Station"}},
        inventory: {standart: true},
        background: {standart: true}
    },
    
    drawing: [
        {type: "bitmap", x: 650, y: 146, bitmap: "extruder_bar_background", scale: GUI_BAR_STANDART_SCALE},
        {type: "bitmap", x: 510, y: 230, bitmap: "energy_small_background", scale: GUI_BAR_STANDART_SCALE},
        {type: "bitmap", x: 338, y: 75, bitmap: "liquid_bar", scale: GUI_BAR_STANDART_SCALE}
    ],
    
    elements: {
        "progressScale": {type: "scale", x: 650, y: 146, direction: 0, value: 0.5, bitmap: "extruder_bar_scale", scale: GUI_BAR_STANDART_SCALE},
        "energyScale": {type: "scale", x: 510, y: 230, direction: 1, value: 0.5, bitmap: "energy_small_scale", scale: GUI_BAR_STANDART_SCALE},
        "liquidScale": {type: "scale", x: 350, y: 87, direction: 1, value: 0, bitmap: "gui_solder_scale", overlay: "gui_liquid_storage_overlay", scale: GUI_BAR_STANDART_SCALE},
        "slotSolder": {type: "slot", x: 340, y: 265},
        "slotSource0": {type: "slot", x: 501, y: 150},
        "slotSource1": {type: "slot", x: 422, y: 95},
        "slotSource2": {type: "slot", x: 501, y: 75},
        "slotSource3": {type: "slot", x: 580, y: 95},
        "slotEnergy": {type: "slot", x: 501, y: 292},
        "slotResult": {type: "slot", x: 735, y: 142},
        "slotUpgrade1": {type: "slot", x: 830, y: 48},
        "slotUpgrade2": {type: "slot", x: 830, y: 112},
        "slotUpgrade3": {type: "slot", x: 830, y: 176},
        "slotUpgrade4": {type: "slot", x: 830, y: 240},
    }
});

MachineEssentials.registerStandard(BlockID.solderingStation, {
    machine_name: "solderingStation",
    source_slots: ["slotSource0", "slotSource1", "slotSource2", "slotSource3"],
    result_slots: ["slotResult"],
    progress_scale: "progressScale",
    energy_scale: "energyScale",
    guiScreen: guiMetalPress,
    liquidLimit: 1,
    
    resultFunc: function(resultSlots, result){
        resultSlots[0].id = result.id;
        resultSlots[0].data = result.data;
        resultSlots[0].count += result.count;
    },
    
    condition: function(context){
        let amount = context.liquidStorage.getAmount("liquidSolder");
        if(amount <= 0.001){
            let slotSolder = context.container.getSlot("slotSolder");
            if(slotSolder.id == ItemID.ingotSolder){
                slotSolder.count--;
                amount = 1;
                context.liquidStorage.setAmount("liquidSolder", amount);
                context.container.validateAll();
            }
        }
        context.container.setScale("liquidScale", context.liquidStorage.getRelativeAmount("liquidSolder"));
        return amount >= 0.001;
    },
    
    progress: function(context){
        context.liquidStorage.getLiquid("liquidSolder", 0.001);
    }
});



Callback.addCallback("PreLoaded", function(){
    // Recipes
    MachineRecipeRegistry.registerRecipesFor("solderingStation", [
        {
            "source": [{id: ItemID.pcbArduinoMega, data: 0}, {id: ItemID.ATmega2560, data: 0}, {id: ItemID.smd, data: 0}],
            "result": {id: ItemID.arduinoMega, count: 1, data: 0}
        },
        {
            "source": [{id: ItemID.pcbArduinoUno, data: 0}, {id: ItemID.ATmega328, data: 0}, {id: ItemID.smd, data: 0}],
            "result": {id: ItemID.arduinoUno, count: 1, data: 0}
        },
        {
            "source": [{id: ItemID.pcbRaspberry3, data: 0}, {id: ItemID.chipRaspberry, data: 0}, {id: ItemID.smd, data: 0}, {id: ItemID.smd, data: 0}],
            "result": {id: ItemID.raspberryPi3, count: 1, data: 0}
        },
        {
            "source": [{id: ItemID.pcbMotherboard, data: 0}, {id: ItemID.chipset, data: 0}, {id: ItemID.socket, data: 0}, {id: ItemID.smd, data: 0}],
            "result": {id: ItemID.motherboard, count: 1, data: 0}
        },
        {
            "source": [{id: ItemID.pcbPowerSupply, data: 0}, {id: ItemID.transformer, data: 0}, {id: ItemID.smd, data: 0}],
            "result": {id: ItemID.powerSupply, count: 1, data: 0}
        },
        {
            "source": [{id: ItemID.pcbControllerHdd, data: 0}, {id: ItemID.smd, data: 0}, {id: ItemID.smd, data: 0}],
            "result": {id: ItemID.controllerHdd, count: 1, data: 0}
        },
        {
            "source": [{id: ItemID.pcbRam, data: 0}, {id: ItemID.chipRam, data: 0}, {id: ItemID.smd, data: 0}, {id: ItemID.chipRam, data: 0}],
            "result": {id: ItemID.ram, count: 1, data: 0}
        },
        {
            "source": [{id: ItemID.pcbCardVideo, data: 0}, {id: ItemID.chipVideo, data: 0}, {id: ItemID.smd, data: 0}, {id: ItemID.chipVideo, data: 0}],
            "result": {id: ItemID.cardVideo, count: 1, data: 0}
        }
    ]);
});