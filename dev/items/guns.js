// Glock 18
IDRegistry.genItemID("glock18");
Item.createItem("glock18", "Glock 18", {name: "glock_18", meta: 0}, {stack: 1});

// Bullet 9*19
IDRegistry.genItemID("bullet_9_19");
Item.createItem("bullet_9_19", "Bullet 9x19", {name: "bullet_9_19", meta: 0}, {});

// Desert eagle
IDRegistry.genItemID("deserteagle");
Item.createItem("deserteagle", "Desert eagle", {name: "deserteagle", meta: 0}, {stack: 1});

// RSH-12
IDRegistry.genItemID("rsh_12");
Item.createItem("rsh_12", "RSH-12", {name: "rsh_12", meta: 0}, {stack: 1});

// Bullet 12.7*55
IDRegistry.genItemID("bullet_12c7_55");
Item.createItem("bullet_12c7_55", "Bullet 12.7х55", {name: "bullet_12_7_55", meta: 0}, {});

// AK-47 
IDRegistry.genItemID("ak47");
Item.createItem("ak47", "AK-47", {name: "ak47", meta: 0}, {stack: 1});

// Assault ammo
IDRegistry.genItemID("ammo_assault");
Item.createItem("ammo_assault", "Assault ammo(5x45)", {name: "ammoassault", meta: 0}, {});

// AAS
IDRegistry.genItemID("aa12");
Item.createItem("aa12", "AAs", {name: "aa12", meta: 0}, {stack: 1});

// Shotgun 
IDRegistry.genItemID("ammo_shotgun");
Item.createItem("ammo_shotgun", "Shotgun ammo", {name: "ammoshotgun", meta: 0}, {});

// SIG SG 556
IDRegistry.genItemID("sg_556");
Item.createItem("sg_556", "SIG SG 556", {name: "sg_556", meta: 0}, {stack: 1});

// Bullet 5.56х45
IDRegistry.genItemID("bullet_5c56_45");
Item.createItem("bullet_5c56_45", "Bullet 5.56х45", {name: "bullet_5c56_45", meta: 0}, {});

// Barrett
IDRegistry.genItemID("barrett");
Item.createItem("barrett", "Barrett", {name: "barrett", meta: 0}, {stack: 1});

// Sniper ammo
IDRegistry.genItemID("ammo_sniper");
Item.createItem("ammo_sniper", "Sniper ammo(19x9)", {name: "ammosniper", meta: 0}, {});

GunRegistry.registerGun({
    gun: ItemID.glock18,
    bullet: ItemID.bullet_9_19,
    skin: "mob/bullet.png",
    speed: 8,
    damage: 15,
    aim: BitmapFactory.decodeFile(__dir__ + "gui/aim.png")
});

GunRegistry.registerGun({
    gun: ItemID.deserteagle,
    bullet: ItemID.bullet_9_19,
    skin: "mob/bullet.png",
    speed: 9,
    damage: 20,
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
    gun: ItemID.barrett,
    bullet: ItemID.ammo_sniper,
    skin: "mob/bullet.png",
    speed: 21,
    damage: 42,
    aim: BitmapFactory.decodeFile(__dir__ + "gui/aim_round.png"),
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

GunRegistry.registerGun({
    gun: ItemID.aa12,
    bullet: ItemID.ammo_shotgun,
    skin: "mob/bullet.png",
    speed: 18,
    damage: 24,
    aim: BitmapFactory.decodeFile(__dir__ + "gui/aim.png"),
    fov: 20,
    automatic: 6
});

GunRegistry.registerGun({
    gun: ItemID.ak47,
    bullet: ItemID.ammo_assault,
    skin: "mob/bullet.png",
    speed: 18,
    damage: 30,
    aim: BitmapFactory.decodeFile(__dir__ + "gui/aim.png"),
    fov: 20,
    automatic: 3
});