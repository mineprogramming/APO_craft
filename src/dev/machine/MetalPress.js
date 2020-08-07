// Metal Press
IDRegistry.genBlockID("pressMetal");
Block.createBlockWithRotation("pressMetal", [
    {name: "Metal Press", texture: [["std_bottom", 0], ["std_top", 0], ["std_side", 0], ["plastic_press_front", 0], ["std_side", 0], ["std_side", 0]], inCreative: true}
]);
RecipesManager.addShaped({id: BlockID.pressMetal, count: 1, data: 0}, [
    "bcb",
    "a0e",
    " d "
], ['0', BlockID.machineBlockBasic, 0, 'a', ItemID.arduinoMega, 0, 'c', ItemID.rodTitanium, 0, 'e', ItemID.plateCopper, 0, 'b', ItemID.engine, 0, 'd', 145, 0]);


(function(){
    var render = new ICRender.Model();
    BlockRenderer.setStaticICRender(BlockID.pressMetal, -1, render);
    var model = BlockRenderer.createModel();

    model.addBox(0/16, 9/16, 0/16, 16/16, 11/16, 16/16, "block_titanium", 0);
    model.addBox(1/16, 0/16, 1/16, 5/16, 9/16, 5/16, "block_titanium", 0);
    model.addBox(11/16, 0/16, 1/16, 15/16, 9/16, 5/16, "block_titanium", 0);
    model.addBox(11/16, 0/16, 11/16, 15/16, 9/16, 15/16, "block_titanium", 0);
    model.addBox(1/16, 0/16, 11/16, 5/16, 9/16, 15/16, "block_titanium", 0);
    model.addBox(6.5/16, 11/16, 12/16, 9.5/16, 20/16, 15/16, "block_titanium", 0);
    model.addBox(6.5/16, 11/16, 1/16, 9.5/16, 20/16, 4/16, "block_titanium", 0);
    model.addBox(6.5/16, 20/16, 1/16, 9.5/16, 22/16, 15/16, "block_titanium", 0);
    model.addBox(7.5/16, 16/16, 7.5/16, 8.5/16, 20/16, 8.5/16, "block_titanium", 0);
    model.addBox(6.5/16, 14/16, 6.5/16, 9.5/16, 16/16, 9.5/16, "block_titanium", 0);

    render.addEntry(model);
})();

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

MachineEssentials.registerStandard(BlockID.pressMetal, {
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
            "source": {"id": BlockID.blockAluminum, "data": 0},
            "result": {
                "ItemID.pressFormRadiator": {id: BlockID.radiatorAluminum, count: 1, data: 0}
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
        },
        {
            "source": {"id": 265, "data": 0},
            "result": {
                "ItemID.pressFormRod": {id: ItemID.rodIron, count: 1, data: 0}
            }
        },
        {
            "source": {"id": ItemID.ingotCopper, "data": 0},
            "result": {
                "ItemID.pressFormRod": {id: ItemID.rodCopper, count: 1, data: 0}
            }
        },
        {
            "source": {"id": ItemID.ingotTitanium, "data": 0},
            "result": {
                "ItemID.pressFormRod": {id: ItemID.rodTitanium, count: 1, data: 0}
            }
        },
        {
            "source": {"id": ItemID.ingotSteel, "data": 0},
            "result": {
                "ItemID.pressFormRoller": {id: ItemID.roller, count: 1, data: 0},
                "ItemID.pressFormRod": {id: ItemID.rodSteel, count: 1, data: 0}
            }
        },
    ]);
});


