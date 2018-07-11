IDRegistry.genItemID("Place");
Item.createItem("Place", "Structure Placer", {name: "place", meta: 0},{isTech:false,stack: 1});

Callback.addCallback("ItemUse", function (coords, item, block) {
    var x = coords.relative.x;
    var y = coords.relative.y;
    var z = coords.relative.z;
    
    if(item.id == ItemID.Place){
        buildings[14].debug = true;
        buildings[14].build(x, y, z);
    }
});

var buildings = [];
Callback.addCallback("PostLoaded", function(){
    for(var i = 0; i < 46; i++){
       buildings.push(new Building(i + ".json"));
    }
});

Callback.addCallback("LevelLoaded", function(){
    Game.message("Raspberry Pi is a trademark of the Raspberry Pi Foundation");
});