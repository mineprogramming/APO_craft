// Create Armor Set
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


// Register mob
var Military = new Mob({
    id: "military",
    name: "Military",
    texture: "mob/military.png",
    armor: armorMilitary,
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
TradeLib.registerTrader(Military.id, [
    {price: {id: ItemID.silver, count: 5, data: 0}, good: {id: ItemID.helmetMilitary, count: 1, data: 0}},
    {price: {id: 264, count: 2, data: 0}, good: {id: ItemID.helmetMilitary, count: 1, data: 0}}
]);