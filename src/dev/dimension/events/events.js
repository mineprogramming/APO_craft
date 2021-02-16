const EVENT_FREQUENCY_EXPLOSION_FIRE = 0.1;
const EVENT_FREQUENCY_SPAWN_HUSK = 0.1;

var CUSTOM_MOBS = [Dementor, Military, Survived, Mutant];

if(__config__.getBool("mobs")){
    RandomEvents.registerEvent("mod", 0.0005, function() {
        if(Entity.getAll().length < ENTITIES_MAX_COUNT){
            var coords = RandomEvents.randomCoordsNearPlayer();
            coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
            
            var i = randomInt(0, CUSTOM_MOBS.length - 1);
            CUSTOM_MOBS[i].spawn(coords.x + 0.5, coords.y + 0.5, coords.z + 0.5);
        }
    });
    
    RandomEvents.registerEvent("planes", 0.0001, function(){
        spawnPlanes(7);
    });
}


if(__config__.getBool("weather")){
    RandomEvents.registerEvent("weather", 0.005, function(){
        World.setWeather({
            rain: Math.random() * 10,
            thunder: Math.random() * 10
        });
        if(Math.random() < 0.5){
            World.setWeather({
                rain: 0,
                thunder: 0
            });
        }
    });
}


if(__config__.getBool("visual_effects")){
    RandomEvents.registerTimedEvent({
        name: "sky_color",
        frequency: 0.01,
        time: 5,
        
        enable: function(){
            apoCity.setSkyColor(Math.random(), Math.random(), Math.random());
            apoCity.setFogColor(Math.random(), Math.random(), Math.random());
        },
        
        disable: function(){
            apoCity.setSkyColor(SKY_COLOR[0], SKY_COLOR[1], SKY_COLOR[2]);
            apoCity.setFogColor(FOG_COLOR[0], FOG_COLOR[1], FOG_COLOR[2]);
        }
    });
}





