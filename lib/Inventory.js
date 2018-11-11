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
    
    
}


EXPORT("PlayerInventory", PlayerInventory);
