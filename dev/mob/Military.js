var mobMilitary = MobRegistry.registerEntity("military");

var military_model = new EntityModel();
military_model.setRender(new Render(3));
var military_texture = new Texture("mob/military.png");
military_model.setTexture(military_texture);

mobMilitary.customizeVisual({ 
    getModels: function() {
        return {
            "main": military_model
        };
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
    {price: {id: 264, count: 2, data: 0}, good: {id: ItemID.helmetMilitary, count: 1, data: 0}}
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
