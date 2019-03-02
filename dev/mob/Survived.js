var mobSurvived = MobRegistry.registerEntity("survived");

var survived_model = new EntityModel();
survived_model.setRender(new Render(3));
var survived_texture = new Texture("mob/survived.png");
survived_model.setTexture(survived_texture);

mobSurvived.customizeVisual({ 
    getModels: function() {
        return {
            "main": survived_model
        };
    }
});

mobSurvived.customizeDescription({
    getHitbox: function(){
        return {w: 0.9, h: 1.8}
    }
});

mobSurvived.customizeAI({ 
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

TradeLib.registerTrader("survived", [
    {price: {id: ItemID.silver, count: 1, data: 0}, good: {id: ItemID.helmetCan, count: 1, data: 0}},
    {price: {id: ItemID.silver, count: 2, data: 0}, good: {id: ItemID.chestplateCan, count: 1, data: 0}},
    {price: {id: ItemID.silver, count: 1, data: 0}, good: {id: ItemID.leggingsCan, count: 1, data: 0}},
    {price: {id: ItemID.silver, count: 1, data: 0}, good: {id: ItemID.bootsCan, count: 1, data: 0}},
    {price: {id: ItemID.silver, count: 1, data: 0}, good: {id: ItemID.can, count: 5, data: 0}},
]);


var armorSurvived = new ArmorSet();
armorSurvived.setSlot(0, [
    ItemID.helmetCan
]);

armorSurvived.setSlot(1, [
    ItemID.chestplateCan
]);

armorSurvived.setSlot(2, [
    ItemID.leggingsCan
]);

armorSurvived.setSlot(3, [
    ItemID.bootsCan
]);


var Survived = {
    spawn: function(x, y, z){
        let entity = Entity.spawnCustom("survived", x, y, z);
        armorSurvived.equip(entity.entity, 0.3);
    }
}
