var Underground = {
    railOnData: new ItemExtraData()
};

Underground.railOnData.putBoolean("powered", true);

var setRandomWall = function(x, y, z){
    if(Math.random() < 0.2)
        World.setBlock(x, y, z, 98, 1);
    else if(Math.random() > 0.8)
        World.setBlock(x, y, z, 98, 2);
    else
        World.setBlock(x, y, z, 98, 0);
}

Underground.generateTunnel = function(x, y, z, direction){
    var generateSingleTunnel = function(x, y, z){
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
        else { //DIRECTION_Z
            for(var dz = 0; dz < 16; dz++){
                //bottom and top
                for(var dx = 1; dx < 4; dx++){
                    setRandomWall(x + dx, y, z + dz);
                    World.setBlock(x + dx, y + 1, z + dz, 13, 0);
                    setRandomWall(x + dx, y + 6, z + dz);
                    for(var dy = 2; dy < 6; dy++){
                        World.setBlock(x + dx, y + dy, z + dz, 0, 0);
                    }
                }
                //walls
                for(var dy = 1; dy < 6; dy++){
                    setRandomWall(x, y + dy, z + dz);
                    setRandomWall(x + 4, y + dy, z + dz);
                }
                //rails and arc
                World.setBlock(x + 1, y + 5, z + dz, 109, 5);
                World.setBlock(x + 3, y + 5, z + dz, 109, 4);
                World.setBlock(x + 2, y + 2, z + dz, 66, 0);
            }
            World.setBlock(x + 2, y + 2, z, 27, 8);
        }
    }
    
    generateSingleTunnel(x, y, z);
    if(direction == DIRECTION_X)
        generateSingleTunnel(x, y, z + 10);
    else generateSingleTunnel(x + 10, y, z);
}


Underground.generateStation = function(x, y, z, direction){
    Underground.generateTunnel(x, y, z, direction)
    if(direction == DIRECTION_X){
        for(var dx = 0; dx < 16; dx++){
            for(var dz = 5; dz < 10; dz++){
                setRandomWall(x + dx, y + 2, z + dz);
                setRandomWall(x + dx, y + 7, z + dz);
            }
            for(var dz = 3; dz < 12; dz++){
                for(var dy = 3; dy < 6; dy++){
                    World.setBlock(x + dx, y + dy, z + dz, 0, 0);
                }
            }
            
            World.setBlock(x + dx, y + 6, z + 6, 0, 0);
            World.setBlock(x + dx, y + 6, z + 7, 0, 0);
            World.setBlock(x + dx, y + 6, z + 8, 0, 0);
            
            World.setBlock(x + dx, y + 6, z + 5, 109, 7);
            World.setBlock(x + dx, y + 6, z + 9, 109, 6);
            
            setRandomWall(x + dx, y + 6, z + 4);
            setRandomWall(x + dx, y + 6, z + 10);
        }
        for(var dz = 5; dz < 10; dz++){
            for(var dy = 3; dy < 7; dy++){
                setRandomWall(x, y + dy, z + dz);
            }
        }
    } else { //DIRECTION_Z
        for(var dz = 0; dz < 16; dz++){
            for(var dx = 5; dx < 10; dx++){
                setRandomWall(x + dx, y + 2, z + dz);
                setRandomWall(x + dx, y + 7, z + dz);
            }
            for(var dx = 3; dx < 12; dx++){
                for(var dy = 3; dy < 6; dy++){
                    World.setBlock(x + dx, y + dy, z + dz, 0, 0);
                }
            }
            
            World.setBlock(x + 6, y + 6, z + dz, 0, 0);
            World.setBlock(x + 7, y + 6, z + dz, 0, 0);
            World.setBlock(x + 8, y + 6, z + dz, 0, 0);
            
            World.setBlock(x + 5, y + 6, z + dz, 109, 5);
            World.setBlock(x + 9, y + 6, z + dz, 109, 4);
            
            setRandomWall(x + 4, y + 6, z + dz);
            setRandomWall(x + 10, y + 6, z + dz);
        }
        for(var dx = 5; dx < 10; dx++){
            for(var dy = 3; dy < 7; dy++){
                setRandomWall(x + dx, y + dy, z);
            }
        }
    }
}


Underground.exit = function(x, y, z, direction){
    if(direction == DIRECTION_X){
        for(var dx = 0; dx < 16; dx++){
            if(GENERATION_HEIGHT < y + dx) return;
            
            for(var dz = 5; dz < 10; dz++){
                setRandomWall(x + dx, y + dx, z + dz);
                setRandomWall(x + dx, y + dx + 6, z + dz);
            }
            for(var dy = 1; dy < 6; dy++){
                setRandomWall(x + dx, y + dx + dy, z + 4);
                for(var dz = 5; dz < 10; dz++){
                    World.setBlock(x + dx, y + dx + dy, z + dz, 0, 0);
                }
                setRandomWall(x + dx, y + dx + dy, z + 10);
            }
            World.setBlock(x + dx, y + dx + 5, z + 5, 109, 7);
            World.setBlock(x + dx, y + dx + 5, z + 9, 109, 6);
            
            setRandomWall(x + dx, y + dx + 1, z + 7);
            World.setBlock(x + dx, y + dx + 2, z + 7, 109, 0);
        }
    }
    else { //DIRECTION_Z
        for(var dz = 0; dz < 16; dz++){
            for(var dx = 5; dx < 10; dx++){
                setRandomWall(x + dx, y + dz, z + dz);
                setRandomWall(x + dx, y + dz + 6, z + dz);
            }
            for(var dy = 1; dy < 6; dy++){
                setRandomWall(x + 4, y + dz + dy, z + dz);
                for(var dx = 5; dx < 10; dx++){
                    World.setBlock(x + dx, y + dz + dy, z + dz, 0, 0);
                }
                setRandomWall(x + 10, y + dz + dy, z + dz);
            }
            World.setBlock(x + 5, y + dz + 5, z + dz, 109, 5);
            World.setBlock(x + 9, y + dz + 5, z + dz, 109, 4);
            
            setRandomWall(x + 7, y + dz + 1, z + dz);
            World.setBlock(x + 7, y + dz + 2, z + dz, 109, 2);
        }
    }
}