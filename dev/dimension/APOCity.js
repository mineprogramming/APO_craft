var Random = java.util.Random;
var rnd = new Random();

const GENERATION_HEIGHT = 78;
const ROADS_FREQUENCY = 0.15;
const BUILDING_FREQUENCY = 0.7;
const BUILDINGS_COUNT = 46;

function srand(seed){
    seed = Math.sin(seed) * 10000;
    return seed - Math.floor(seed);
}

function generate(x, z){
    //GENERATE ROADS
    var srandX = srand(x);
    var srandZ = srand(z);
    if(srandX < ROADS_FREQUENCY && srandZ < ROADS_FREQUENCY){
        Roads.generateSimpleCrossroad(x, GENERATION_HEIGHT, z, true, true, true, true);
    } else if(srandX < ROADS_FREQUENCY){
        Roads.generateSimpleRoad(x, GENERATION_HEIGHT, z, true);
    } else if(srandZ < ROADS_FREQUENCY){
        Roads.generateSimpleRoad(x, GENERATION_HEIGHT, z, false);
    } 
    
    //GENERATE BUILDINGS
    else if(Math.random() < BUILDING_FREQUENCY){
        var i = Math.floor(Math.random() * BUILDINGS_COUNT);
        buildings[i].build(x, GENERATION_HEIGHT, z);
    }
}




