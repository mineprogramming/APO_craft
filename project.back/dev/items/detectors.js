// Chemical Contamination Level Detector
IDRegistry.genItemID("chemicalLD");
Item.createItem("chemicalLD", "Chemical Contamination Level Detector", {name: "chemical_ld", meta: 0}, {});

RecipesManager.addShaped({id: ItemID.chemicalLD, count: 1, data: 0}, [
     " d ",
     "ea ",
     " cb"
], ['a', ItemID.casingPolypropylene, 0,
    'b', ItemID.sensorNitrates, 0,
    'c', ItemID.attiny45, 0,
    'd', ItemID.displayLed, 0,
    'e', ItemID.buttonSet, 0]);


// Radiation Level Detector
IDRegistry.genItemID("radiationLD");
Item.createItem("radiationLD", "Radiation Level Detector", {name: "radiation_ld", meta: 0}, {});

RecipesManager.addShaped({id: ItemID.radiationLD, count: 1, data: 0}, [
     "bdf",
     "eag",
     " ch"
], ['a', ItemID.casingPolypropylene, 0,
    'b', ItemID.sensorRadiation, 0,
    'c', ItemID.attiny45, 0,
    'd', ItemID.displayLed, 0,
    'e', ItemID.buttonSet, 0,
    'f', ItemID.ledRed, 0,
    'g', ItemID.ledYellow, 0, 
    'h', ItemID.ledGreen, 0]);


// Biological Contamination Level Detector
IDRegistry.genItemID("biologicalLD");
Item.createItem("biologicalLD", "Biological Contamination Level Detector", {name: "biological_ld", meta: 0}, {});

RecipesManager.addShaped({id: ItemID.biologicalLD, count: 1, data: 0}, [
     " db",
     "eah",
     " c "
], ['a', ItemID.casingPolypropylene, 0,
    'b', ItemID.sensorViruses, 0,
    'c', ItemID.attiny45, 0,
    'd', ItemID.displayLed, 0,
    'e', ItemID.buttonSet, 0,
    'h', ItemID.ledGreen, 0]);


// Multi-Purpose Level Detector 
IDRegistry.genItemID("multiPurposeLD");
Item.createItem("multiPurposeLD", "Multi-Purpose Level Detector", {name: "multi_purpose_ld", meta: 0}, {});

RecipesManager.addShaped({id: ItemID.multiPurposeLD, count: 1, data: 0}, [
     "geh",
     "fai",
     "bcd"
], ['a', ItemID.casingPolypropylene, 0,
    'b', ItemID.chemicalLD, 0,
    'c', ItemID.radiationLD, 0,
    'd', ItemID.biologicalLD, 0,
    'e', ItemID.displayLed, 0,
    'f', ItemID.arduinoUno, 0,
    'g', ItemID.ledRed, 0,
    'h', ItemID.ledYellow, 0, 
    'i', ItemID.ledGreen, 0]);


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
                case ItemID.chemicalLD: chemical = true; break;
                case ItemID.radiationLD: radiation = true; break;
                case ItemID.biologicalLD: biological = true; break;
                case ItemID.multiPurposeLD:
                    chemical = true;
                    radiation = true;
                    biological = true;
                    break;
            }
        }
        if(chemical) chemicalScale.show(); else chemicalScale.hide();
        if(radiation) radiationScale.show(); else radiationScale.hide();
        if(biological) biologicalScale.show(); else biologicalScale.hide();
    }
});