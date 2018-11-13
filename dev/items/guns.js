//Glock 18
IDRegistry.genItemID("glock18");
Item.createItem("glock18", "Glock 18", {name: "glock_18", meta: 0}, {
    stack: 1
});

//Bullet 9*19
IDRegistry.genItemID("bullet_9_19");
Item.createItem("bullet_9_19", "Bullet 9*19", {name: "bullet_9_19", meta: 0}, {});


//RSH-12
IDRegistry.genItemID("rsh_12");
Item.createItem("rsh_12", "RSH-12", {name: "rsh_12", meta: 0}, {
    stack: 1
});

//Bullet 12.7*55
IDRegistry.genItemID("bullet_12c7_55");
Item.createItem("bullet_12c7_55", "Bullet 12.7х55", {name: "bullet_12_7_55", meta: 0}, {});


//SIG SG 556
IDRegistry.genItemID("sg_556");
Item.createItem("sg_556", "RSH-12", {name: "sg_556", meta: 0}, {
    stack: 1
});

//Bullet 5.56х45
IDRegistry.genItemID("bullet_5c56_45");
Item.createItem("bullet_5c56_45", "Bullet 5.56х45", {name: "bullet_5c56_45", meta: 0}, {});


GunRegistry.registerGun({
    gun: ItemID.glock18,
    bullet: ItemID.bullet_9_19,
    skin: "mob/bullet.png",
    speed: 8,
    damage: 15,
    aim: BitmapFactory.decodeFile(__dir__ + "gui/aim.png")
});

GunRegistry.registerGun({
    gun: ItemID.rsh_12,
    bullet: ItemID.bullet_12c7_55,
    skin: "mob/bullet.png",
    speed: 16,
    damage: 40,
    aim: BitmapFactory.decodeFile(__dir__ + "gui/aim.png"),
    fov: 50
});

GunRegistry.registerGun({
    gun: ItemID.sg_556,
    bullet: ItemID.bullet_5c56_45,
    skin: "mob/bullet.png",
    speed: 16,
    damage: 20,
    aim: BitmapFactory.decodeFile(__dir__ + "gui/aim_round.png"),
    fov: 20,
    automatic: 5
});


