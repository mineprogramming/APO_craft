var mobMilitary = MobRegistry.registerEntity("military");

mobMilitary.customizeEvents({
    tick: function(){
        Entity.setRender(this.entity, 3);
        Entity.setSkin(this.entity, "mob/military.png");
        Entity.setNameTag(this.entity,"Military");
        Entity.setArmorSlot(this.entity, 0, ItemID.helmetMilitary, 1, 0);
        //Entity.setCarriedItem(this.entity, 267, 1, 0);
    },
    death: function(){
        //addExpAtEntity(this.entity, 4);
    },
    getDrop: function(){
        var coords = Entity.getPosition(entity);
        World.drop(coords.x, coords.y, coords.z, 267, 1);
    },
    attackedBy: function(attacker, amount){
        //World.playSoundAtEntity(this.entity, "mob.creeper.say1", 1, 1);
    }
});

mobMilitary.customizeDescription({
    getHitbox: function(){
        return {w: 0.9, h: 1.8}
    }
});

mobMilitary.customizeAI({ 
    getAITypes: function(){ 
        return { 
            wander: { 
                type: EntityAI.Wander,
                priority: 4,
                speed: 0.09,
                angular_speed: 0.1,
                delay_weigth: 0.2
            },
        } 
    } 
});
