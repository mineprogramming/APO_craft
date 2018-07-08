IDRegistry.genItemID("chemicalLD");
Item.createItem("chemicalLD", "Chemical Contamination Level Detector", {name: "chemical_ld", meta: 0}, {});

RecipiesManager.addShaped({id: ItemID.chemicalLD, count: 1, data: 0}, [
     " d ",
     "ea ",
     " cb"
], ['a', ItemID.casingPolypropylene, 0,
    'b', ItemID.sensorNitrates, 0,
    'c', ItemID.attiny45, 0,
    'd', ItemID.displayLed, 0,
    'e', ItemID.buttonSet, 0]);



IDRegistry.genItemID("radiationLD");
Item.createItem("radiationLD", "Radiation Level Detector", {name: "radiation_ld", meta: 0}, {});

RecipiesManager.addShaped({id: ItemID.radiationLD, count: 1, data: 0}, [
     "bd ",
     "ea ",
     " c "
], ['a', ItemID.casingPolypropylene, 0,
    'b', ItemID.sensorRadiation, 0,
    'c', ItemID.attiny45, 0,
    'd', ItemID.displayLed, 0,
    'e', ItemID.buttonSet, 0]);


IDRegistry.genItemID("biologicalLD");
Item.createItem("biologicalLD", "Biological Contamination Level Detector", {name: "biological_ld", meta: 0}, {});

RecipiesManager.addShaped({id: ItemID.biologicalLD, count: 1, data: 0}, [
     " db",
     "ea ",
     " c "
], ['a', ItemID.casingPolypropylene, 0,
    'b', ItemID.sensorViruses, 0,
    'c', ItemID.attiny45, 0,
    'd', ItemID.displayLed, 0,
    'e', ItemID.buttonSet, 0]);


IDRegistry.genItemID("multiPurposeLD");
Item.createItem("multiPurposeLD", "Multi-Purpose Level Detector", {name: "multi_purpose_ld", meta: 0}, {});

RecipiesManager.addShaped({id: ItemID.multiPurposeLD, count: 1, data: 0}, [
     " e ",
     "fa ",
     "bcd"
], ['a', ItemID.casingPolypropylene, 0,
    'b', ItemID.chemicalLD, 0,
    'c', ItemID.radiationLD, 0,
    'd', ItemID.biologicalLD, 0,
    'e', ItemID.displayLed, 0,
    'f', ItemID.arduinoUno, 0]);


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
                case ItemID.MultiPurposeLD:
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
