const EVENT_FREQUENCY_EXPLOSION_FIRE = 0.1;
const EVENT_FREQUENCY_SPAWN_HUSK = 0.1;


//RandomEvents.registerEvent("explosion", 0.005, function(){
//    let coords = RandomEvents.randomCoordsNearPlayer();
//    World.explode(coords.x, coords.y, coords.z, Math.random() * 5, Math.random() < EVENT_FREQUENCY_EXPLOSION_FIRE);
//});
//
//
//RandomEvents.registerEvent("zombies", 0.0005, function(){
//    let count = Math.random() * 5;
//    for(var i = 0; i < count; i++){
//        var coords = RandomEvents.randomCoordsNearPlayer();
//        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
//        var type = Math.random() < EVENT_FREQUENCY_SPAWN_HUSK? 47: 32;
//        Entity.spawn(coords.x, coords.y + 1, coords.z, type);
//    }
//});


RandomEvents.registerEvent("weather", 0.005, function(){
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
});


RandomEvents.registerTimedEvent({
    name: "sky_color",
    frequency: 0.01,
    time: 5,
    
    enable: function(){
        APOCity.getWrappedObject().setSkyColor(Math.random(), Math.random(), Math.random());
        APOCity.getWrappedObject().setFogColor(Math.random(), Math.random(), Math.random());
    },
    
    disable: function(){
        APOCity.getWrappedObject().setSkyColor(SKY_COLOR[0], SKY_COLOR[1], SKY_COLOR[2]);
        APOCity.getWrappedObject().setFogColor(FOG_COLOR[0], FOG_COLOR[1], FOG_COLOR[2]);
    }
});


RandomEvents.registerTimedEvent({
    name: "toxic_fog",
    frequency: 0.0001,
    time: 1000,
    
    enable: function(){
        fog = true;
    },
    
    disable: function(){
        fog = false;
    }
});