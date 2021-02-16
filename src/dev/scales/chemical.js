var CHEMICAL_RESISTANT_ARMOR = [ItemID.helmetOpsCore, ItemID.hazmatMask, ItemID.hazmatHelmetApo, ItemID.helmetExo];

var chemicalScale = new ScalesRPG.Scale({
    bitmaps:{
        full: BitmapFactory.decodeFile(__dir__ + "gui/scale_chemical_0.png"), 
        half: BitmapFactory.decodeFile(__dir__ + "gui/scale_chemical_1.png"), 
        empty: BitmapFactory.decodeFile(__dir__ + "gui/scale_chemical_2.png")
    },
    value: 0,
    defaultValue: 0
});

Saver.addSavesScope("ChemicalScaleValue", 
    function read(scope){
        chemicalScale.setValue((scope && scope.value)? parseInt(scope.value) : 20);
    },
    
    function save(){
        let value = parseInt(chemicalScale.getValue())
        return {"value": value};
    }
);

Callback.addCallback("FoodEaten", function(food, satRatio) {
    var id = Player.getCarriedItem().id;
    if(id == 260 || id == 391){
        chemicalScale.decrease();
    } else if(id == 322){
        chemicalScale.reset();
    }
});