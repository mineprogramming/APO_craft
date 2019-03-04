var Roads = {};

Roads.generateSimpleRoad = function(x, y, z, directionZ) {
    if (directionZ) {
        Roads.generateSigns(x, y, z, DIRECTION_Z);
        x += 5;
        for (var i = 0; i < 16; i++) {
            World.setBlock(x, y, z + i, BlockID.asphalt, 3);
            World.setBlock(x + 1, y, z + i, BlockID.asphalt, 0);
            World.setBlock(x + 2, y, z + i, BlockID.asphalt, 1);
            World.setBlock(x + 3, y, z + i, BlockID.asphalt, 0);
            World.setBlock(x + 4, y, z + i, BlockID.asphalt, 4);
            for(var j = 1; j < ROAD_CLEANING + 1; j++){
                World.setBlock(x + 0, y + j, z + i, 0);
                World.setBlock(x + 1, y + j, z + i, 0);
                World.setBlock(x + 2, y + j, z + i, 0);
                World.setBlock(x + 3, y + j, z + i, 0);
                World.setBlock(x + 4, y + j, z + i, 0);
            }
        }
        if (Math.random() < 0.25) {
            World.setBlock(x + 0, y, z, BlockID.asphalt, 9);
            World.setBlock(x + 1, y, z, BlockID.asphalt, 9);
            World.setBlock(x + 3, y, z, BlockID.asphalt, 10);
            World.setBlock(x + 4, y, z, BlockID.asphalt, 10);
        }
        if (Math.random() < 0.25) {
            World.setBlock(x + 0, y, z + 15, BlockID.asphalt, 9);
            World.setBlock(x + 1, y, z + 15, BlockID.asphalt, 9);
            World.setBlock(x + 3, y, z + 15, BlockID.asphalt, 10);
            World.setBlock(x + 4, y, z + 15, BlockID.asphalt, 10);
        }
    } else {
        Roads.generateSigns(x, y, z, DIRECTION_X);
        z += 5;
        for (var i = 0; i < 16; i++) {
            World.setBlock(x + i, y, z + 0, BlockID.asphalt, 5);
            World.setBlock(x + i, y, z + 1, BlockID.asphalt, 0);
            World.setBlock(x + i, y, z + 2, BlockID.asphalt, 2);
            World.setBlock(x + i, y, z + 3, BlockID.asphalt, 0);
            World.setBlock(x + i, y, z + 4, BlockID.asphalt, 6);
            for(var j = 1; j < ROAD_CLEANING + 1; j++){
                World.setBlock(x + i, y + j, z + 0, 0);
                World.setBlock(x + i, y + j, z + 1, 0);
                World.setBlock(x + i, y + j, z + 2, 0);
                World.setBlock(x + i, y + j, z + 3, 0);
                World.setBlock(x + i, y + j, z + 4, 0);
            }
            
        }
        if (Math.random() < 0.25) {
            World.setBlock(x, y, z + 0, BlockID.asphalt, 8);
            World.setBlock(x, y, z + 1, BlockID.asphalt, 8);
            World.setBlock(x, y, z + 3, BlockID.asphalt, 7);
            World.setBlock(x, y, z + 4, BlockID.asphalt, 7);
        }
        if (Math.random() < 0.25) {
            World.setBlock(x + 15, y, z + 0, BlockID.asphalt, 8);
            World.setBlock(x + 15, y, z + 1, BlockID.asphalt, 8);
            World.setBlock(x + 15, y, z + 3, BlockID.asphalt, 7);
            World.setBlock(x + 15, y, z + 4, BlockID.asphalt, 7);
        }
    }
    BlockRenderer.forceRenderRebuild(x, y, z, 0);
};

Roads.generateSimpleCrossroad = function(x, y, z){
    Roads.generateSigns(x, y, z, DIRECTION_BOTH);
    for(var i = 5; i < 10; i++){
        for(var j = 5; j < 10; j++)
        { 
            World.setBlock(x + i, y, z + j, BlockID.asphalt, 0);
        }
    }
};

Roads.generateSigns = function(x, y, z, direction){
    for(var i = 0; i < MAX_SIGNS_COUNT; i++){
        if(Math.random() < SIGNS_FREQUENCY){
            var sx, sz;
            if(Math.random() < 0.25){
                sx = randomInt(x + 3, x + 5);
                sz = randomInt(z + 3, z + 5);
            } else if (Math.random() < 0.5){
                sx = randomInt(x + 11, x + 13);
                sz = randomInt(z + 11, z + 13);
            } else if(Math.random() < 0.75){
                sx = randomInt(x + 3, x + 5);
                sz = randomInt(z + 11, z + 13);
            } else { 
                sx = randomInt(x + 11, x + 13);
                sz = randomInt(z + 3, z + 5);
            }
            switch(direction){
            case DIRECTION_X:
                World.setBlock(sx, y + 3, sz, BlockID.sign, randomInt(SIGNS_COUNT, SIGNS_COUNT * 2));
                break;
            case DIRECTION_Z: 
                World.setBlock(sx, y + 3, sz, BlockID.sign, randomInt(0, SIGNS_COUNT));
                break;
            case DIRECTION_BOTH:
                World.setBlock(sx, y + 3, sz, BlockID.sign, randomInt(0, SIGNS_COUNT * 2));
            }
            
        }
    }
}