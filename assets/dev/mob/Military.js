var mobMilitary = MobRegistry.registerEntity("military");

mobMilitary.customizeEvents({
    tick: function(){
        Entity.setRender(this.entity, 3);
        Entity.setSkin(this.entity, "mob/military.png");
        Entity.setNameTag(this.entity,"Military");
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

TradeLib.registerTrader("military", [
    {price: {id: ItemID.silver, count: 5, data: 0}, good: {id: ItemID.helmetMilitary, count: 1, data: 0}},
    {price: {id: 264, count: 1, data: 0}, good: {id: ItemID.helmetMilitary, count: 1, data: 0}}
]);

var armorMilitary = new ArmorSet();
armorMilitary.setSlot(0, [
    ItemID.helmetMilitary, 
    ItemID.helmetAltyn, 
    ItemID.helmetOpsCore, 
    ItemID.helmetShch1
]);

armorMilitary.setSlot(1, [
    ItemID.chestplateBKZ6,
    ItemID.chestplateIOTVgen3,
    ItemID.chestplate6B43,
    ItemID.chestplateSplinterVest
]);

armorMilitary.setSlot(2, [
    ItemID.leggingsPantsArmy
]);

armorMilitary.setSlot(3, [
    ItemID.bootsArmy
]);
