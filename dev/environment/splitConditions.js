Callback.addCallback("DestroyBlock", function(coords, block){
    if(block.id == 56){
        Split.tryStart(0.05, coords.x, coords.y, coords.z);
    } else if(block.id == 115){
        Split.tryStart(0.05, coords.x, coords.y, coords.z);
    }
});


Callback.addCallback("PlayerAttack", function(player, entity){
    if(Player.getCarriedItem().id == 276){
        let coords = Entity.getPosition(Player.get());
        Split.tryStart(0.05, coords.x, coords.y, coords.z);
    }
});


Callback.addCallback("GenerateChunk", function(x, z){
    let coords = Entity.getPosition(Player.get());
    Split.tryStart(0.0001, coords.x, coords.y, coords.z);
});


Callback.addCallback("ItemUse", function(coords, item, block){
    let x = coords.relative.x;
    let y = coords.relative.y;
    let z = coords.relative.z;
    if(item.id == 116){
        Split.tryStart(0.1, coords.x, coords.y, coords.z);
    } else if(block.id == 61){
        Split.tryStart(0.001, coords.x, coords.y, coords.z);
    }
});