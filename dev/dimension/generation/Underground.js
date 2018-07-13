

var Underground = {
    railOnData: new ItemExtraData()
};

Underground.railOnData.putBoolean("powered", true);

Underground.generateTunnel = function(x, y, z, direction){
    var setRandomWall = function(x, y, z){
        if(Math.random() < 0.2)
            World.setBlock(x, y, z, 98, 1);
        else if(Math.random() > 0.8)
            World.setBlock(x, y, z, 98, 2);
        else
            World.setBlock(x, y, z, 98, 0);
    }
    var generateSingleTunnel = function(x, y, z, dirtection){
        if(direction == DIRECTION_X){
            for(var dx = 0; dx < 16; dx++){
                //bottom and top
                for(var dz = 1; dz < 4; dz++){
                    setRandomWall(x + dx, y, z + dz);
                    World.setBlock(x + dx, y + 1, z + dz, 13, 0);
                    setRandomWall(x + dx, y + 6, z + dz);
                    for(var dy = 2; dy < 6; dy++){
                        World.setBlock(x + dx, y + dy, z + dz, 0, 0);
                    }
                }
                //walls
                for(var dy = 1; dy < 6; dy++){
                    setRandomWall(x + dx, y + dy, z);
                    setRandomWall(x + dx, y + dy, z + 4);
                }
                //rails and arc
                World.setBlock(x + dx, y + 5, z + 1, 109, 7);
                World.setBlock(x + dx, y + 5, z + 3, 109, 6);
                World.setBlock(x + dx, y + 2, z + 2, 66, 1);
            }
            World.setBlock(x, y + 2, z + 2, 27, 9);
        }
    }
    
    generateSingleTunnel(x, y, z, direction);
    generateSingleTunnel(x, y, z + 10, direction);
}
    
