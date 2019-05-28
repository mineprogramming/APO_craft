var fogParticle = Particles.registerParticleType({
    texture: "fog",
    size: [10, 20],
    lifetime: [20, 20],
    render: 2
});

var fog = false;



var FOG_DENCITY = __config__.getNumber('fog_density');

var Fog = {
    ticks: 0,
    
    tick: function(){
        this.ticks++;
        if(this.ticks % 200 == 0){
            var helmet = Player.getArmorSlot(Native.ArmorType.helmet).id;
            if(CHEMICAL_RESISTANT_ARMOR.indexOf(helmet) == -1){
                chemicalScale.increase();
                if(chemicalScale.getValue() == 20){
                    Entity.damageEntity(Player.get(), 5, "chemistry");
                }
            }
        }
    },
    
    disable: function(){
        this.ticks = 0;
    },
    
    add: function(coords, radius, count){
        for(var i = 0; i < count; i++){
            let x = coords.x - radius + Math.random() * radius * 2;
            let y = coords.y - radius + Math.random() * radius * 2;
            let z = coords.z - radius + Math.random() * radius * 2;
            Particles.addParticle(fogParticle, x, y, z, 0, 0.01, 0);
        }
    }
}


if(__config__.getBool("weather")){
    RandomEvents.registerTimedEvent({
        name: "toxic_fog",
        frequency: 0.0001,
        time: 1000,
        
        enable: function(){
            
        },
        
        tick: function(){
            Fog.tick();
            let coords = Entity.getPosition(Player.get());
            Fog.add(coords, 3, 7);
        },
        
        disable: function(){
            Fog.disable();
        }
    });
}