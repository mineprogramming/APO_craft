const PLANES_HEIGHT = 150;
const BOMB_SCALE = 0.02;

function spawnPlanes(count){
    count = Math.floor(count / 2);
    let coords = Player.getPosition();
    coords.x -= 128;
    coords.z += 128;
    
    Plane.spawn(coords.x, coords.z);
    for(var i = 0; i < count; i++){
        coords.x -= 8;
        coords.z += 8;
        Plane.spawn(coords.x - 20 * (i + 1), coords.z);
        Plane.spawn(coords.x, coords.z + 20 * (i + 1));
    }
}


var Plane = {}

Plane.spawn = function(x, z){
    var animationPlane = new Animation.Base(x, PLANES_HEIGHT, z);
    animationPlane.ticks = 0;
    animationPlane.describe({render: Plane.render.getId()});
    animationPlane.loadCustom(function(){
        this.ticks++;
        for(var i = 0; i < 2; i++){
            Plane.render.setPart(i == 0? "airscrew_left": "airscrew_right", Plane.airscrew, {
                rotation: {
                    x: 0,
                    y: 0, 
                    z: (this.ticks % 500) * 360 / 64
                },
            });
        }
        this.setPos(this.coords.x + 0.5, this.coords.y, this.coords.z - 0.5);
        this.refresh();
        if(srand(this.ticks) < 0.002){
            if(Math.random() > 0.5){
                Entity.spawnCustom("bomb", this.coords.x, this.coords.y - 0.5, this.coords.z); 
            } else {
                World.drop(this.coords.x, this.coords.y - 0.5, this.coords.z, ItemID.firstAidKit, 1, 0);
            }
        }
        if(this.ticks >= 512){
            this.destroy();
        }
    });
}


// Creating render
Plane.render = new Render({skin: "mob/plane.png"});
Plane.airscrew = [
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
];

(function() {
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

    var partPlane = Plane.render.getPart("body").addPart("plane");
    partPlane.setRotation(0, 45, 0);
    Plane.render.setPart("plane", partFuselage, {});
    partPlane.addPart("airscrew_left").setOffset(-40, 0, 0);
    partPlane.addPart("airscrew_right").setOffset(40, 0, 0);
}) ();


// Bomb
Plane.bombModel = new EntityModel();
(function() {
    var mesh = new RenderMesh(__dir__ + "models/bomb.obj", "obj", null);
    var texture = new Texture("mob/plane.png").setResolution(256, 128);
    mesh.scale(BOMB_SCALE, BOMB_SCALE, BOMB_SCALE);
    var render = new Render();
    render.getPart("body").setMesh(mesh);
    Plane.bombModel.setRender(render);
    Plane.bombModel.setTexture(texture);
}) ();



Plane.bomb = MobRegistry.registerEntity("bomb");
Plane.bomb.customizeEvents({
    death: function(attacker){
        let coords = Entity.getPosition(this.entity);
        Entity.remove(this.entity);
        // World.explode(coords.x, coords.y, coords.z, 5, true);
    }
});
Plane.bomb.customizeDescription({
    getHealth: function() {
        return 1;
    },
});
Plane.bomb.customizeVisual({
    getModels: function() {
        return {
            "main": Plane.bombModel
        };
    }
});