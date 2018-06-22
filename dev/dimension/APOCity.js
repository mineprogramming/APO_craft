var Random = java.util.Random;
var rnd = new Random();

//GENERATION
const GENERATION_HEIGHT = 78;
const ROADS_FREQUENCY = 0.2;
const BUILDING_FREQUENCY = 0.7;
const BUILDINGS_COUNT = 46;
const EXPLOSION_FREQENCY = 0.1;

//TICK
const EVENT_FREQUENCY_EXPLOSION = 0.005;
const EVENT_FREQUENCY_EXPLOSION_FIRE = 0.1;
const EVENT_FREQUENCY_WEATHER_CHANGE = 0.05;

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
    
    //CRATERS AND EXPLOSIONS
    if(Math.random() < EXPLOSION_FREQENCY){
        var coords = GenerationUtils.findSurface(x + Math.random() * 16, GENERATION_HEIGHT, z + Math.random() * 16);
        World.explode(coords.x, coords.y, coords.z, Math.random() * 16, false);
    } 
}

function cityTick(){
    if(Math.random() < EVENT_FREQUENCY_EXPLOSION){
        let coords = Player.getPosition;
        let x, y, z;
        
        if(Math.random() > 0.5) x = coords.x + Math.random() * 16 + 4;
        else x = coords.x - Math.random() * 16 - 4;
        
        if(Math.random() > 0.5) y = coords.y + Math.random() * 16 + 4;
        else y = coords.y - Math.random() * 16 - 4;
        
        if(Math.random() > 0.5) z = coords.z + Math.random() * 16 + 4;
        else z = coords.z - Math.random() * 16 - 4;
        
        World.explode(x, y, z, 3, Math.random < EVENT_FREQUENCY_EXPLOSION_FIRE);
    }
    if(Math.random() < EVENT_FREQUENCY_WEATHER_CHANGE){
        World.setWeather({
            rain: Math.random() * 10,
            thunder: Math.random() * 10
        });
        if(Math.random() < 0.2){
            World.setWeather({
                rain: 0,
                thunder: 0
            });
        }
    }
}




