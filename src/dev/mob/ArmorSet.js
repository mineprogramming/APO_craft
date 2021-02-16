/*
 * Special class used for managing Armor
 */

var ArmorSet = function(){
    this.slots = [];
    
    this.setSlot = function(slot, items){
        this.slots[slot] = items;
    }
    
    this.equip = function(entity, chance){
        for(var slot in this.slots){
            if(Math.random() < chance){
                var id = this.slots[slot][randomInt(0, this.slots[slot].length - 1)];
                Entity.setArmorSlot(entity, slot, id, 1, 0);
            }
        }
    }
}