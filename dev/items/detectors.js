IDRegistry.genItemID("ChemicalLD");
Item.createItem("ChemicalLD", "Radiation Level Detector", {name: "ChemicalLD", meta: 0}, {});

IDRegistry.genItemID("RadiationLD");
Item.createItem("RadiationLD", "Biological Contamination Level Detector", {name: "RadiationLD", meta: 0}, {});

IDRegistry.genItemID("BiologicalLD");
Item.createItem("BiologicalLD", "Chemical Contamination Level Detector", {name: "BiologicalLD", meta: 0}, {});

var LD_tick = 5;
Callback.addCallback("tick", function(){
    LD_tick--;
    if(LD_tick <= 0){
        LD_tick = 5;
        //Как же я балдею от того, что количество символов в названиях шкал отличается на 1 и они выстраиваются в красивые линеечки...
        let chemical = false;
        let radiation = false;
        let biological = false;
        for(var i = 0; i < 9; i++){
            var slot = Player.getInventorySlot(i);
            switch(slot.id){
                case ItemID.ChemicalLD: chemical = true; break;
                case ItemID.RadiationLD: radiation = true; break;
                case ItemID.BiologicalLD: biological = true; break;
            }
        }
        if(chemical) chemicalScale.show(); else chemicalScale.hide();
        if(radiation) radiationScale.show(); else radiationScale.hide();
        if(biological) biologicalScale.show(); else biologicalScale.hide();
    }
});
