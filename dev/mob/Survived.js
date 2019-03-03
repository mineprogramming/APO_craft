// Create Armor Set
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


// Register mob
var Survived = new Mob({
    id: "survived",
    name: "Survived",
    texture: "mob/survived.png",
    
    armor: armorSurvived,
    equipChance: 0.3,
    
    aiTypes: { 
        wander: { 
            type: EntityAI.Wander,
            priority: 4,
            speed: 0.09,
            angular_speed: 0.1,
            delay_weigth: 0.2
        },
    }
});


// Trading
TradeLib.registerTrader(Survived.id, [
    {price: {id: ItemID.silver, count: 1, data: 0}, good: {id: ItemID.helmetCan, count: 1, data: 0}},
    {price: {id: ItemID.silver, count: 2, data: 0}, good: {id: ItemID.chestplateCan, count: 1, data: 0}},
    {price: {id: ItemID.silver, count: 1, data: 0}, good: {id: ItemID.leggingsCan, count: 1, data: 0}},
    {price: {id: ItemID.silver, count: 1, data: 0}, good: {id: ItemID.bootsCan, count: 1, data: 0}},
    {price: {id: ItemID.silver, count: 1, data: 0}, good: {id: ItemID.can, count: 5, data: 0}},
]);