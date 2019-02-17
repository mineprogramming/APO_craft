var Split = {
    summoning: false,
    summon_ticks: 0,
    
    build: function(){
        let x = Math.round(Split.x);
        let y = Math.round(Split.y);
        let z = Math.round(Split.z);
        Split.buildRecursive(x, y, z);
        Split.buildRecursive(x - 1, y, z);
        Split.buildRecursive(x, y, z - 1);
        Split.buildRecursive(x - 1, y, z - 1);
    },
    
    buildRecursive: function(x, y, z){
        World.setBlock(x, y, z, BlockID.aetherPortal, 0);
        for(var i = 0; i < 4; i++){
            var dx = (i - 2) % 2;
            var dz = (i - 1) % 2;
            
            var block = World.getBlockID(x + dx, y, z + dz);
            if(block != BlockID.aetherPortal){
                if(Math.random() < 0.3){
                    Split.buildRecursive(x + dx, y, z + dz);
                } else {
                    World.setBlock(x + dx, y, z + dz, 1, 0);
                }
            }
        }
    },
    
    summon: function(x, y, z){
        Split.summon_ticks = 0;
        Split.summoning = true;
        Split.x = x; 
        Split.y = y;
        Split.z = z;
        World.setBlock(x, y, z, 0);
        World.setBlock(x, y + 1, z, 0);
        World.setBlock(x, y, 2, 0);
        Entity.addEffect(Player.get(), 11, 30, 5);
    },
    
    tryStart: function(chance, x, y, z){
        if(!inCity && Math.random() < chance){
            Split.summon(x, y, z);
        }
    }
}



Callback.addCallback("tick", function(){
    if(Split.summoning){
        Entity.setPosition(Player.get(), Split.x, Split.y + 2, Split.z);
        let x = Split.x + Math.random() * 4 - 2;
        let y = Split.y + Math.random() * 4 - 2;
        let z = Split.z + Math.random() * 4 - 2;
        
        Entity.spawn(x, y, z, Native.EntityType.LIGHTNING_BOLT);
        
        Split.summon_ticks++;
        if(Split.summon_ticks > 20){
            Split.summoning = false;
            Split.build();
        }
    }
});

Callback.addCallback("ItemUse", function(coords, item, block){
    let x = coords.relative.x;
    let y = coords.relative.y;
    let z = coords.relative.z;
    if(item.id == 280){
        Split.summon(x, y, z);
    }
});


