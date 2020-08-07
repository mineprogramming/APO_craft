function getDementorRender(){
    var render = new Render();
    var partHead = [
        {
            type: "box",
            size: { x: 10, y: 10, z: 10 },
            uv: { x: 0, y: 0 },
            coords: { x: 0, y: -21, z: 0 }
        },
        {
            type: "box",
            size: { x: 6, y: 1, z: 7 },
            uv: { x: 40, y: 0 },
            coords: { x: 0, y: -26, z: -2.5 }
        },
        {
            type: "box",
            size: { x: 1, y: 7, z: 11 },
            uv: { x: 40, y: 0 },
            coords: { x: -5.5, y: -17.5, z: -0.5 }
        },
        {
            type: "box",
            size: { x: 1, y: 7, z: 11 },
            uv: { x: 40, y: 0 },
            coords: { x: 5.5, y: -17.5, z: -0.5 }
        },
        {
            type: "box",
            size: { x: 10, y: 7, z: 1 },
            uv: { x: 40, y: 0 },
            coords: { x: 0, y: -17.5, z: 5.5 }
        },
        {
            type: "box",
            size: { x: 1, y: 5, z: 1 },
            uv: { x: 40, y: 0 },
            coords: { x: 4.5, y: -23.5, z: -5.5 }
        },
        {
            type: "box",
            size: { x: 1, y: 5, z: 1 },
            uv: { x: 40, y: 0 },
            coords: { x: -4.5, y: -23.5, z: -5.5 }
        },
        {
            type: "box",
            size: { x: 1, y: 1, z: 1 },
            uv: { x: 40, y: 0 },
            coords: { x: -3.5, y: -25.5, z: -5.5 }
        },
        {
            type: "box",
            size: { x: 1, y: 1, z: 1 },
            uv: { x: 40, y: 0 },
            coords: { x: 3.5, y: -25.5, z: -5.5 }
        },
        
    ];
    
    var partBody = [
        {
            type: "box",
            size: { x: 16, y: 20, z: 4 },
            uv: { x: 40, y: 0 },
            coords: { x: 0, y: -6, z: 4 }
        },
        {
            type: "box",
            size: { x: 16, y: 15, z: 3 },
            uv: { x: 40, y: 0 },
            coords: { x: 0, y: -8.5, z: -0.5 }
        },
        {
            type: "box",
            size: { x: 16, y: 9, z: 3 },
            uv: { x: 40, y: 0 },
            coords: { x: 0, y: -11.5, z: -3.5 }
        },
        {
            type: "box",
            size: { x: 1, y: 17, z: 10 },
            uv: { x: 40, y: 0 },
            coords: { x: 8.5, y: -5.5, z: 0 }
        },
        {
            type: "box",
            size: { x: 1, y: 17, z: 10 },
            uv: { x: 40, y: 0 },
            coords: { x: -8.5, y: -5.5, z: 0 }
        },
        {
            type: "box",
            size: { x: 1, y: 3, z: 7 },
            uv: { x: 40, y: 0 },
            coords: { x: 8.5, y: 4.5, z: 1.5 }
        },
        {
            type: "box",
            size: { x: 1, y: 3, z: 7 },
            uv: { x: 40, y: 0 },
            coords: { x: -8.5, y: 4.5, z: 1.5 }
        },
        {
            type: "box",
            size: { x: 10, y: 20, z: 1 },
            uv: { x: 40, y: 0 },
            coords: { x: 0, y: -4, z: 6.5 }
        },
        {
            type: "box",
            size: { x: 1, y: 10, z: 1 },
            uv: { x: 40, y: 0 },
            coords: { x: 1, y: 11, z: 6.5 }
        },
        {
            type: "box",
            size: { x: 1, y: 7, z: 1 },
            uv: { x: 40, y: 0 },
            coords: { x: 2, y: 9.5, z: 6.5 }
        },
        {
            type: "box",
            size: { x: 1, y: 2, z: 1 },
            uv: { x: 40, y: 0 },
            coords: { x: 0, y: 7, z: 6.5 }
        },
        {
            type: "box",
            size: { x: 1, y: 3, z: 1 },
            uv: { x: 40, y: 0 },
            coords: { x: -2, y: 7.5, z: 6.5 }
        },
        {
            type: "box",
            size: { x: 1, y: 7, z: 1 },
            uv: { x: 40, y: 0 },
            coords: { x: -3, y: 9.5, z: 6.5 }
        },
        {
            type: "box",
            size: { x: 1, y: 1, z: 1 },
            uv: { x: 40, y: 0 },
            coords: { x: -4, y: 6.5, z: 6.5 }
        },
        {
            type: "box",
            size: { x: 3, y: 2, z: 1 },
            uv: { x: 40, y: 0 },
            coords: { x: 6.5, y: 5, z: 5.5 }
        },
        {
            type: "box",
            size: { x: 3, y: 2, z: 1 },
            uv: { x: 40, y: 0 },
            coords: { x: -6.5, y: 5, z: 5.5 }
        },
        {
            type: "box",
            size: { x: 1, y: 1, z: 1 },
            uv: { x: 40, y: 0 },
            coords: { x: 4, y: 6.5, z: 6.5 }
        },
        {
            type: "box",
            size: { x: 1, y: 4, z: 1 },
            uv: { x: 40, y: 0 },
            coords: { x: 6.5, y: 8, z: 5.5 }
        },
        {
            type: "box",
            size: { x: 1, y: 10, z: 1 },
            uv: { x: 40, y: 0 },
            coords: { x: 7.5, y: 11, z: 5.5 }
        },
        {
            type: "box",
            size: { x: 1, y: 9, z: 1 },
            uv: { x: 40, y: 0 },
            coords: { x: 8.5, y: 10.5, z: 4.5 }
        },
        {
            type: "box",
            size: { x: 1, y: 3, z: 1 },
            uv: { x: 40, y: 0 },
            coords: { x: -7.5, y: 7.5, z: 5.5 }
        },
        {
            type: "box",
            size: { x: 1, y: 9, z: 1 },
            uv: { x: 40, y: 0 },
            coords: { x: -8.5, y: 10.5, z: 4.5 }
        },
    ];
    
    render.setPart("body", partBody, {});
    render.setPart("head", partHead, {});
    return render;
}


var EntityAISwim = new EntityAIClass({getDefaultPriority: function () {
    return -1;
}, getDefaultName: function () {
    return "swim";
}, params: {velocity: 0.2}, inWater: false, execute: function () {
    if (World.getThreadTime() % 5 == 0) {
        var position = Entity.getPosition(this.entity);
        var tile = World.getBlockID(position.x, position.y + 0.4, position.z);
        this.inWater = (tile > 7 && tile < 12);
    }
    if (this.inWater) {
        var velocity = Entity.getVelocity(this.entity);
        Entity.setVelocity(this.entity, velocity.x, this.params.velocity, velocity.z);
    }
}});


var EntityAIDementorAttack = new EntityAIClass({params: {
    attack_damage_close: 6, 
    attack_range_close: 2.5, 
    attack_damage_far: 1,
    attack_range_far: 4,
    attack_rate: 12
}, data: {timer: 0, target: null}, execute: function () {
    if (this.data.target) {
        var distance = Entity.getDistanceToEntity(this.entity, this.data.target);
        if (distance < this.params.attack_range_close) {
            if (this.data.timer-- < 0) {
                this.data.timer = this.params.attack_rate;
                Entity.damageEntity(this.data.target, this.params.attack_damage_close);
            }
        } else if (distance < this.params.attack_range_far) {
            if (this.data.timer-- < 0) {
                this.data.timer = this.params.attack_rate;
                Entity.damageEntity(this.data.target, this.params.attack_damage_far);
            }
        } else {
            this.data.timer = 0;
        }
    }
}});


var Dementor = new Mob({
    id: "dementor",
    name: "Dementor",
    render: getDementorRender(),
    texture: "mob/dementor.png",
    hitbox: {w: 1.2, h: 2.8},
    aiTypes: {
        wander: { 
            type: EntityAI.Wander,
            priority: 4,
            speed: 0.09,
            angular_speed: 0.1,
            delay_weigth: 0.2
        },
        
        follow: { 
            type: EntityAI.Follow,
            priority: 0,
            speed: 0.2,
            rotateHead: true
        },
        
        attack: { 
            type: EntityAIDementorAttack,
            priority: 0
        }, 
        
        enemy_watcher: {
            type: AdvancedAI.EnemyWatcher,
            attackAI: "attack",
            followAI: "follow",
            find_delay: 20,
            priority_on_attack: 5,
            priority_on_idle: 0,
            feelingModifier: 18
        },
        
        swim: { 
            type: EntityAISwim,
        },
    },
    loot: GLOBAL_LOOT
});