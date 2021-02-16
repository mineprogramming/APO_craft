// Plastic Press
IDRegistry.genBlockID("pressPlastic");
Block.createBlockWithRotation("pressPlastic", [
    {name: "Plastic Press", texture: [["std_bottom", 0], ["std_top", 0], ["std_side", 0], ["plastic_press_front", 0], ["std_side", 0], ["std_side", 0]], inCreative: true}
]);
RecipesManager.addShaped({id: BlockID.pressPlastic, count: 1, data: 0}, [
    "acb",
    "a0a",
    "ddd"
], ['0', BlockID.machineBlockBasic, 0, 'a', ItemID.arduinoUno, 0, 'c', ItemID.rodIron, 0, 'b', ItemID.engine, 0, 'd', ItemID.ingotSteel, 0]);


(function(){
    var render = new ICRender.Model();
    BlockRenderer.setStaticICRender(BlockID.pressPlastic, -1, render);
    var model = BlockRenderer.createModel();

    model.addBox(0/16, 9/16, 0/16, 16/16, 11/16, 16/16, "std_top", 0);
    model.addBox(1/16, 0/16, 1/16, 5/16, 9/16, 5/16, "std_top", 0);
    model.addBox(11/16, 0/16, 1/16, 15/16, 9/16, 5/16, "std_top", 0);
    model.addBox(11/16, 0/16, 11/16, 15/16, 9/16, 15/16, "std_top", 0);
    model.addBox(1/16, 0/16, 11/16, 5/16, 9/16, 15/16, "std_top", 0);
    model.addBox(7/16, 11/16, 12/16, 9/16, 19/16, 14/16, "std_top", 0);
    model.addBox(7/16, 11/16, 2/16, 9/16, 19/16, 4/16, "std_top", 0);
    model.addBox(7/16, 19/16, 2/16, 9/16, 21/16, 14/16, "std_top", 0);
    model.addBox(7.5/16, 15/16, 7.5/16, 8.5/16, 19/16, 8.5/16, "std_top", 0);
    model.addBox(6.5/16, 14/16, 6.5/16, 9.5/16, 15/16, 9.5/16, "std_top", 0);

    render.addEntry(model);
})();

var guiPlasticPress = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Plastic Press"}},
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

MachineEssentials.registerStandard(BlockID.pressPlastic, {
    machine_name: "pressPlastic",
    source_slots: ["slotSource"],
    result_slots: ["slotResult"],
    progress_scale: "progressScale",
    energy_scale: "energyScale",
    guiScreen: guiPlasticPress,
    
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
    MachineRecipeRegistry.registerRecipesFor("pressPlastic", [
        {
            "source": {"id": ItemID.granulesPolypropylene, "data": 0},
            "result": {
                "ItemID.pressFormPlate": {id: ItemID.platePolypropylene, count: 1, data: 0},
                "ItemID.pressFormBlade": {id: ItemID.bladePolypropylene, count: 1, data: 0}
            }
        }
    ]);
});