LIBRARY({
    name: "Inventory",
    version: 1,
    shared: false,
    api: "CoreEngine"
});


var PlayerInventory = {
    
    getSlot: function(slot){
        return Player.getInventorySlot(slot);
    },
    
    getArmorSlot: function(slot){
        return Player.getArmorSlot(slot);
    },
    
    retrieveItem: function(id, data){
        if(!data)
            data = -1;
        for(var i = 0; i < 36; i++){
            let slot = Player.getInventorySlot(i);
            if(id == slot.id && (data == -1 || data == slot.data)){
                slot.count--;
                if(slot.count > 0){
                    Player.setInventorySlot(i, slot.id, slot.count, slot.data);
                }
                else {
                    Player.setInventorySlot(i, 0, 0, 0);
                }
                return true;
            }
        }
        return false;
    }
}


EXPORT("PlayerInventory", PlayerInventory);
