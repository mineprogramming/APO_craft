const PLANES_HEIGHT = 150;


var plane = MobRegistry.registerEntity("plane");
var planeTexture = new Texture("mob/plane.png").setResolution(256, 128);

var planeModel = new EntityModel();
planeModel.setTexture(planeTexture);
planeModel.createAnimation(128, function(frame) {
    var render = new Render(); 
    // Фюзеляж
    var partFuselage = [
        // Крыло
        {
            type: "box",
            coords: { x: 0, y: 0, z: 0 },
            size: { x: 150, y: 2, z: 18 },
            uv: { x: 0, y: 0 }
        },
        {
            type: "box",
            coords: { x: -40, y: 0, z: 2 },
            size: { x: 10, y: 10, z: 14 },
            uv: { x: 0, y: 0 }
        },
        {
            type: "box",
            coords: { x: 40, y: 0, z: 2 },
            size: { x: 10, y: 10, z: 14 },
            uv: { x: 0, y: 0 }
        },
        // Фюзеляж
        {
            type: "box",
            coords: { x: 0, y: 0, z: -40 },
            size: { x: 10, y: 10, z: 120 },
            uv: { x: 0, y: 0 }
        },
        {
            type: "box",
            coords: { x: 0, y: 0, z: -10 },
            size: { x: 18, y: 18, z: 50 },
            uv: { x: 0, y: 0 }
        },
        {
            type: "box",
            coords: { x: 0, y: -9, z: -10 },
            size: { x: 14, y: 5, z: 40 },
            uv: { x: 0, y: 0 }
        },
        // Хвост
        {
            type: "box",
            coords: { x: 0, y: 0, z: -100 },
            size: { x: 60, y: 2, z: 18 },
            uv: { x: 0, y: 0 }
        },
        {
            type: "box",
            coords: { x: 0, y: -15, z: -100 },
            size: { x: 2, y: 30, z: 18 },
            uv: { x: 0, y: 0 }
        }
    ]; 
    
    render.setPart("body", partFuselage, {});
    render.setPart("head", [], {});
    render.getPart("head").addPart("airscrew_left").setOffset(-40, 0, 0);
    render.getPart("head").addPart("airscrew_right").setOffset(40, 0, 0);
    for(var i = 0; i < 2; i++){
        render.setPart(i == 0? "airscrew_left": "airscrew_right", partAirscrew, {
            rotation: {
                x: 0,
                y: 0, 
                z: frame * 360 / 128
            },
        });
    }
    
    
    return render;
}, 0.5);


plane.customizeVisual({
    getModels: function() {
        return {
            "main": planeModel
        };
    }
});

plane.customizeEvents({
    tick: function(){
        let velocity = Entity.getVelocity(this.entity)
        Entity.setVelocity(this.entity, velocity.x, 0, velocity.z);
        
        let position = Entity.getPosition(this.entity)
        Entity.setPosition(this.entity, position.x, PLANES_HEIGHT, position.z);
    },
    
    loaded: function(){
        
    }
});

var planes = [];


function spawnPlanes(){
    //let playerCoords = Player.getPosition();
    //planes.push(Entity.spawnCustom("plane", playerCoords.x, PLANES_HEIGHT, playerCoords.z));
}


function destroyPlanes(){
    //for(var i = 0; i < planes.length; i++){
    //    for(var i in planes[0]){
    //        Game.message(i);
    //    }
    //    //Entity.remove(planes[i]);
    //}
    //planes = [];
}




var render = new Render({skin: "mob/plane.png"}); 
// Фюзеляж
var partFuselage = [
    // Крыло
    {
        type: "box",
        coords: { x: 0, y: 0, z: 0 },
        size: { x: 150, y: 2, z: 18 },
        uv: { x: 0, y: 0 }
    },
    {
        type: "box",
        coords: { x: -40, y: 0, z: 2 },
        size: { x: 10, y: 10, z: 14 },
        uv: { x: 0, y: 0 }
    },
    {
        type: "box",
        coords: { x: 40, y: 0, z: 2 },
        size: { x: 10, y: 10, z: 14 },
        uv: { x: 0, y: 0 }
    },
    // Фюзеляж
    {
        type: "box",
        coords: { x: 0, y: 0, z: -40 },
        size: { x: 10, y: 10, z: 120 },
        uv: { x: 0, y: 0 }
    },
    {
        type: "box",
        coords: { x: 0, y: 0, z: -10 },
        size: { x: 18, y: 18, z: 50 },
        uv: { x: 0, y: 0 }
    },
    {
        type: "box",
        coords: { x: 0, y: -9, z: -10 },
        size: { x: 14, y: 5, z: 40 },
        uv: { x: 0, y: 0 }
    },
    // Хвост
    {
        type: "box",
        coords: { x: 0, y: 0, z: -100 },
        size: { x: 60, y: 2, z: 18 },
        uv: { x: 0, y: 0 }
    },
    {
        type: "box",
        coords: { x: 0, y: -15, z: -100 },
        size: { x: 2, y: 30, z: 18 },
        uv: { x: 0, y: 0 }
    }
];

//Винт
var partAirscrew = [
    {
        type: "box",
        coords: { x: 0, y: 0,  z: 10 },
        size: { x: 3, y: 40,  z: 1 },
        uv: { x: 216, y: 10 } 
    },
    {
        type: "box",
        coords: { x: 0, y: 0,  z: 10 },
        size: { x: 40, y: 3,  z: 1 },
        uv: { x: 0, y: 0 } 
    }
]

var partPlane = render.getPart("body").addPart("plane");
partPlane.setRotation(0, 45, 0);
render.setPart("plane", partFuselage, {});
partPlane.addPart("airscrew_left").setOffset(-40, 0, 0);
partPlane.addPart("airscrew_right").setOffset(40, 0, 0);


Callback.addCallback("ItemUse", function(coords, item, block){
    let x = coords.relative.x;
    let y = coords.relative.y;
    let z = coords.relative.z;
    if(item.id == 280){
        var animationPlane = new Animation.Base(x, PLANES_HEIGHT, z);
        DevAPI.iterate(animationPlane);
        animationPlane.ticks = 0;
        animationPlane.describe({render: render.getId()})
        animationPlane.loadCustom(function(){
            this.ticks++;
            for(var i = 0; i < 2; i++){
                render.setPart(i == 0? "airscrew_left": "airscrew_right", partAirscrew, {
                    rotation: {
                        x: 0,
                        y: 0, 
                        z: (this.ticks % 500) * 360 / 64
                    },
                });
            }
            this.setPos(this.coords.x + 0.5, this.coords.y, this.coords.z - 0.5);
            this.refresh();
        });
    }
});


