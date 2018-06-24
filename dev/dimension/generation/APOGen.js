var Random = java.util.Random;
var rnd = new Random();

//GENERATION
const GENERATION_HEIGHT = 78;
const ROADS_FREQUENCY = 0.2;
const BUILDING_FREQUENCY = 0.7;
const BUILDINGS_COUNT = 46;
const EXPLOSION_FREQENCY = 0.1;
const GRAVEL_FREQUENCY = 0.3;

function srand(seed){
    seed = Math.sin(seed) * 10000;
    return seed - Math.floor(seed);
}

function generate(x, z){
    //GENERATE ROADS
    var srandX = srand(x);
    var srandZ = srand(z);
    
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
    
    //GENERATE BUILDINGS
    else if(Math.random() < BUILDING_FREQUENCY){
        var i = Math.floor(Math.random() * BUILDINGS_COUNT);
        buildings[i].build(x, GENERATION_HEIGHT, z);
    }
    
    //GRAVEL DUMPS
    if(Math.random() < GRAVEL_FREQUENCY){
        var coords = GenerationUtils.findSurface(x + Math.random() * 16, GENERATION_HEIGHT, z + Math.random() * 16);
        coords.y++;
        
    } 
    
    //CRATERS AND EXPLOSIONS
    if(Math.random() < EXPLOSION_FREQENCY){
        var coords = GenerationUtils.findSurface(x + Math.random() * 16, GENERATION_HEIGHT, z + Math.random() * 16);
        World.explode(coords.x, coords.y, coords.z, Math.random() * 16, false);
    } 
}




