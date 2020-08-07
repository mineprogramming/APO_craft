var Random = java.util.Random;
var rnd = new Random();

// GENERATION
const GENERATION_HEIGHT = 78;
const ROADS_FREQUENCY = 0.15;
const UNDERGROUND_FREQUENCY = 0.05;
const UNDERGROUND_MAX_HEIGHT = 65;
const UNDERGROUND_X_HEIGHT = 55; //Default: 50
const BUILDING_FREQUENCY = 0.7;
const EXPLOSION_FREQUENCY = 0.1;
const GRAVEL_FREQUENCY = 0.3;


var APOGen = {
    lateGenEnabled: false
}


APOGen.generate = function(x, z){
    //Generate underground
    var generated = false;
    
    if(srand(x) > 1 - UNDERGROUND_FREQUENCY && srand(z) > 1 - UNDERGROUND_FREQUENCY){
        Underground.generateStation(x, UNDERGROUND_X_HEIGHT, z, DIRECTION_X);
        Underground.generateStation(x, UNDERGROUND_X_HEIGHT - 10, z, DIRECTION_Z);
    }
    
    else if(srand(z) > 1 - UNDERGROUND_FREQUENCY){
        Underground.generateTunnel(x, UNDERGROUND_X_HEIGHT, z, DIRECTION_X);
        if(srand(x - 16) > 1 - UNDERGROUND_FREQUENCY){
            Underground.exit(x, UNDERGROUND_X_HEIGHT + 2, z, DIRECTION_X);
        } else if(srand(x - 32) > 1 - UNDERGROUND_FREQUENCY){
            Underground.exit(x, UNDERGROUND_X_HEIGHT + 18, z, DIRECTION_X);
            generated = true;
        }
    }
    
    else if(srand(x) > 1 - UNDERGROUND_FREQUENCY){
        Underground.generateTunnel(x, UNDERGROUND_X_HEIGHT - 10, z, DIRECTION_Z);
        if(srand(z - 16) > 1 - UNDERGROUND_FREQUENCY){
            Underground.exit(x, UNDERGROUND_X_HEIGHT - 8, z, DIRECTION_Z);
        } else if(srand(z - 32) > 1 - UNDERGROUND_FREQUENCY){
            Underground.exit(x, UNDERGROUND_X_HEIGHT + 8, z, DIRECTION_Z);
             generated = true;
        }
    }
    if(!generated){
        if(APOGen.lateGenEnabled){
            APOGen.markChunk(x, z);
        } else {
            APOGen.lateGen(x, z);
        }
    }
}


APOGen.lateGen = function(x, z){
    NativeAPI.setTileUpdateAllowed(false);
    var srandX = srand(x);
    var srandZ = srand(z);
    
    // GENERATE ROADS
    if(srandX < ROADS_FREQUENCY && srandZ < ROADS_FREQUENCY){
        Roads.generateSimpleRoad(x, GENERATION_HEIGHT, z, true);
        Roads.generateSimpleRoad(x, GENERATION_HEIGHT, z, false);
        Roads.generateSimpleCrossroad(x, GENERATION_HEIGHT, z);
    } 
    else if(srandX < ROADS_FREQUENCY){
        Roads.generateSimpleRoad(x, GENERATION_HEIGHT, z, true);
    }
    else if(srandZ < ROADS_FREQUENCY){
        Roads.generateSimpleRoad(x, GENERATION_HEIGHT, z, false);
    }
    
    // GENERATE BUILDINGS
    else if(Math.random() < BUILDING_FREQUENCY){
        var i = Math.floor(Math.random() * BUILDINGS_COUNT);
        BuildingsSystem.build(buildings[i], x, GENERATION_HEIGHT + 1, z);
    }
    
    // GRAVEL DUMPS
    if(Math.random() < GRAVEL_FREQUENCY){
        var coords = GenerationUtils.findSurface(x + Math.random() * 16, GENERATION_HEIGHT, z + Math.random() * 16);
        coords.y++;
        
    } 
    
    // Caused issue in survival
    // CRATERS AND EXPLOSIONS
    //if(Math.random() < EXPLOSION_FREQUENCY){
    //    var coords = GenerationUtils.findSurface(x + Math.random() * 16, GENERATION_HEIGHT, z + Math.random() * 16);
    //    World.explode(coords.x, coords.y, coords.z, Math.random() * 16, false);
    //}
    
    NativeAPI.setTileUpdateAllowed(true);
}


APOGen.markChunk = function(x, z){
    World.setBlock(x, 0, z, 49, 0);
    World.setBlock(x, 1, z, 7, 0);
}

APOGen.unmarkChunk = function(x, z){
    World.setBlock(x, 0, z, 0, 0);
}


APOGen.isChunkMarked = function(x, z){
    return World.getBlockID(x, 0, z) == 49;
}


var lategenTick = 5;
Callback.addCallback("tick", function(){
    if(Player.getDimension() != apoCity.id) return;
    lategenTick --;
    if(lategenTick <= 0){
        lategenTick = 5;
        let position = Player.getPosition();
        APOGen.lateGenEnabled = position.y < UNDERGROUND_MAX_HEIGHT;
        if(!APOGen.lateGenEnabled){
            let chunkX = Math.floor(position.x / 16) * 16;
            let chunkZ = Math.floor(position.z / 16) * 16;
            for(var dx = 0; dx < 5; dx++){
                for(var dz = 0; dz < 5; dz++){
                    let cx = chunkX - 32 + dx * 16;
                    let cz = chunkZ - 32 + dz * 16;
                    if(APOGen.isChunkMarked(cx, cz)){
                        APOGen.unmarkChunk(cx, cz);
                        APOGen.lateGen(cx, cz);
                        return;
                    }
                }
            }
        }
    }
});