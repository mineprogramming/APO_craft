IDRegistry.genBlockID("pressMetal");
Block.createBlockWithRotation("pressMetal", [
    {name: "Metal Press", texture: [["std_bottom", 0], ["std_top", 0], ["std_side", 0], ["plastic_press_front", 0], ["std_side", 0], ["std_side", 0]], inCreative: true}
], "opaque");

var guiMetalPress = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Metal Press"}},
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

MachineEssentials.registerStandart(BlockID.pressMetal, {
    machine_name: "pressMetal",
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
    MachineRecipeRegistry.registerRecipesFor("pressMetal", [
        {
            "source": {"id": 42, "data": 0},
            "result": {
                "ItemID.pressFormRadiator": {id: BlockID.radiatorIron, count: 1, data: 0}
            }
        },
        {
            "source": {"id": 41, "data": 0},
            "result": {
                "ItemID.pressFormRadiator": {id: BlockID.radiatorGold, count: 1, data: 0}
            }
        },
        {
            "source": {"id": BlockID.blockTitanium, "data": 0},
            "result": {
                "ItemID.pressFormRadiator": {id: BlockID.radiatorTitanium, count: 1, data: 0}
            }
        },
        {
            "source": {"id": BlockID.blockLead, "data": 0},
            "result": {
                "ItemID.pressFormRadiator": {id: BlockID.radiatorLead, count: 1, data: 0}
            }
        },
        {
            "source": {"id": BlockID.blockAluminium, "data": 0},
            "result": {
                "ItemID.pressFormRadiator": {id: BlockID.radiatorAluminium, count: 1, data: 0}
            }
        },
        {
            "source": {"id": BlockID.blockCopper, "data": 0},
            "result": {
                "ItemID.pressFormRadiator": {id: BlockID.radiatorCopper, count: 1, data: 0}
            }
        },
        {
            "source": {"id": BlockID.blockTin, "data": 0},
            "result": {
                "ItemID.pressFormRadiator": {id: BlockID.radiatorTin, count: 1, data: 0}
            }
        }
    ]);
});

