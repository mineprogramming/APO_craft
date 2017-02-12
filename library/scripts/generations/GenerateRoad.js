var ID_ASPHALT = 253;

Block.defineBlock (ID_ASPHALT, "Асфальт", 
    [["asphalt", 0], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0],
    ["asphalt", 0], ["asphalt", 1], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0],
    ["asphalt", 0], ["asphalt", 2], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0],
    ["asphalt", 0], ["asphalt", 3], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0],
    ["asphalt", 0], ["asphalt", 4], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0],
    ["asphalt", 0], ["asphalt", 5], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0],
    ["asphalt", 0], ["asphalt", 6], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0],
    ["asphalt", 0], ["asphalt", 7], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0],
    ["asphalt", 0], ["asphalt", 8], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0],
    ["asphalt", 0], ["asphalt", 9], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0],
    ["asphalt", 0], ["asphalt", 10], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0]], 
    1, true, 0);

var Roads = {};

Roads.generateSimpleRoad = function(x, y, z, directionZ){
    if(directionZ){
        for(var i = 0; i < 16; i++){
            setTile(x, y, z + i, ID_ASPHALT, 3);
            setTile(x + 1, y, z + i, ID_ASPHALT, 0);
            setTile(x + 2, y, z + i, ID_ASPHALT, 1);
            setTile(x + 3, y, z + i, ID_ASPHALT, 0);
            setTile(x + 4, y, z + i, ID_ASPHALT, 4);
        }
        if(Math.random() < 0.25){
            setTile(x + 0, y, z, ID_ASPHALT, 9);
            setTile(x + 1, y, z, ID_ASPHALT, 9);
            setTile(x + 3, y, z, ID_ASPHALT, 10);
            setTile(x + 4, y, z, ID_ASPHALT, 10);
        }
        if(Math.random() < 0.25){
            setTile(x + 0, y, z + 15, ID_ASPHALT, 9);
            setTile(x + 1, y, z + 15, ID_ASPHALT, 9);
            setTile(x + 3, y, z + 15, ID_ASPHALT, 10);
            setTile(x + 4, y, z + 15, ID_ASPHALT, 10);
        }
    }
    else{
        for(var i = 0; i < 16; i++){
            setTile(x + i, y, z + 0, ID_ASPHALT, 5);
            setTile(x + i, y, z + 1, ID_ASPHALT, 0);
            setTile(x + i, y, z + 2, ID_ASPHALT, 2);
            setTile(x + i, y, z + 3, ID_ASPHALT, 0);
            setTile(x + i, y, z + 4, ID_ASPHALT, 6);
        }
        if(Math.random() < 0.25){
            setTile(x, y, z + 0, ID_ASPHALT, 8);
            setTile(x, y, z + 1, ID_ASPHALT, 8);
            setTile(x, y, z + 3, ID_ASPHALT, 7);
            setTile(x, y, z + 4, ID_ASPHALT, 7);
        }
        if(Math.random() < 0.25){
            setTile(x + 15, y, z + 0, ID_ASPHALT, 8);
            setTile(x + 15, y, z + 1, ID_ASPHALT, 8);
            setTile(x + 15, y, z + 3, ID_ASPHALT, 7);
            setTile(x + 15, y, z + 4, ID_ASPHALT, 7);
        }
    }
}

Roads.generateSimpleCrossroad = function(x, y, z, roadLeft, roadRight, roadForward, roadBack){
    for(var i = 0; i < 5; i++)
        for(var j = 0; j < 5; j++)
            setTile(x + i, y, z + j, ID_ASPHALT, 0);
    
    if(!roadLeft) {
        for(var i = 0; i < 5; i++)
            setTile(x + i, y, z, ID_ASPHALT, 5);
    }
    
    if(!roadRight) {
        for(var i = 0; i < 5; i++)
            setTile(x + i, y, z + 4, ID_ASPHALT, 6);
    }
    
    if(!roadForward) {
        for(var i = 0; i < 5; i++)
            setTile(x + 4, y, z + i, ID_ASPHALT, 4);
    }
    
    if(!roadBack){
        for(var i = 0; i < 5; i++)
            setTile(x, y, z + i, ID_ASPHALT, 3);
    }
    
    if(!roadForward && !roadBack){
        for(var i = 0; i < 5; i++)
            setTile(x + 2, y, z + i, ID_ASPHALT, 1);
    }
    
    if(!roadLeft && !roadRight){
        for(var i = 0; i < 5; i++)
            setTile(x + i, y, z + 2, ID_ASPHALT, 2);
    }
}

function useItem(x,y,z,itemid,blockid,side,itemDamage,blockDamage) {
    if(itemid == 280)
        Roads.generateSimpleRoad(x, y, z, false);
}


