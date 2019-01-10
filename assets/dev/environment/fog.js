var fogParticle = Particles.registerParticleType({
    texture: "fog",
    size: [10, 20],
    lifetime: [20, 20],
    render: 2
});

var fog = false;

function addFog(coords, radius, count){
    for(var i = 0; i < count; i++){
        let x = coords.x - radius + Math.random() * radius * 2;
        let y = coords.y - radius + Math.random() * radius * 2;
        let z = coords.z - radius + Math.random() * radius * 2;
        Particles.addParticle(fogParticle, x, y, z, 0, 0.01, 0);
    }
}


Callback.addCallback("tick", function(){
    if(fog){
        let coords = Entity.getPosition(Player.get());
        addFog(coords, 3, 7);
    }
});