for(var i = 0; i < 11; i++){
    IDRegistry.genBlockID("asphalt_" + i);
    Block.createBlock("asphalt_" + i, [{
        name: "Asphalt", 
        texture: [["asphalt", 0], ["asphalt", i], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0], ["asphalt", 0]], 
        inCreative: true
    }]);
}

var Roads = {};

Roads.generateSimpleRoad = function(x, y, z, directionZ) {
    if (directionZ) {
        x += 5;
        for (var i = 0; i < 16; i++) {
            World.setBlock(x, y, z + i, BlockID.asphalt_3);
            World.setBlock(x + 1, y, z + i, BlockID.asphalt_0);
            World.setBlock(x + 2, y, z + i, BlockID.asphalt_1);
            World.setBlock(x + 3, y, z + i, BlockID.asphalt_0);
            World.setBlock(x + 4, y, z + i, BlockID.asphalt_4);
            for(var j = 1; j < 3; j++){
                World.setBlock(x + 0, y + j, z + i, 0);
                World.setBlock(x + 1, y + j, z + i, 0);
                World.setBlock(x + 2, y + j, z + i, 0);
                World.setBlock(x + 3, y + j, z + i, 0);
                World.setBlock(x + 4, y + j, z + i, 0);
            }
        }
        if (Math.random() < 0.25) {
            World.setBlock(x + 0, y, z, BlockID.asphalt_9);
            World.setBlock(x + 1, y, z, BlockID.asphalt_9);
            World.setBlock(x + 3, y, z, BlockID.asphalt_10);
            World.setBlock(x + 4, y, z, BlockID.asphalt_10);
        }
        if (Math.random() < 0.25) {
            World.setBlock(x + 0, y, z + 15, BlockID.asphalt_9);
            World.setBlock(x + 1, y, z + 15, BlockID.asphalt_9);
            World.setBlock(x + 3, y, z + 15, BlockID.asphalt_10);
            World.setBlock(x + 4, y, z + 15, BlockID.asphalt_10);
        }
    } else {
        z += 5;
        for (var i = 0; i < 16; i++) {

            World.setBlock(x + i, y, z + 0, BlockID.asphalt_5);
            World.setBlock(x + i, y, z + 1, BlockID.asphalt_0);
            World.setBlock(x + i, y, z + 2, BlockID.asphalt_2);
            World.setBlock(x + i, y, z + 3, BlockID.asphalt_0);
            World.setBlock(x + i, y, z + 4, BlockID.asphalt_6);
            for(var j = 1; j < 3; j++){
                World.setBlock(x + i, y + j, z + 0, 0);
                World.setBlock(x + i, y + j, z + 1, 0);
                World.setBlock(x + i, y + j, z + 2, 0);
                World.setBlock(x + i, y + j, z + 3, 0);
                World.setBlock(x + i, y + j, z + 4, 0);
            }
            
        }
        if (Math.random() < 0.25) {
            World.setBlock(x, y, z + 0, BlockID.asphalt_8);
            World.setBlock(x, y, z + 1, BlockID.asphalt_8);
            World.setBlock(x, y, z + 3, BlockID.asphalt_7);
            World.setBlock(x, y, z + 4, BlockID.asphalt_7);
        }
        if (Math.random() < 0.25) {
            World.setBlock(x + 15, y, z + 0, BlockID.asphalt_8);
            World.setBlock(x + 15, y, z + 1, BlockID.asphalt_8);
            World.setBlock(x + 15, y, z + 3, BlockID.asphalt_7);
            World.setBlock(x + 15, y, z + 4, BlockID.asphalt_7);
        }
    }
};

Roads.generateSimpleCrossroad = function(x, y, z){
    Roads.generateSimpleRoad(x, y, z, true);
    Roads.generateSimpleRoad(x, y, z, false);
    for(var i = 5; i < 10; i++){
        for(var j = 5; j < 10; j++)
        { 
            World.setBlock(x + i, y, z + j, BlockID.asphalt_0);
        }
    }
};


