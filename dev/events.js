IDRegistry.genItemID("Place");
Item.createItem("Place", "Structure Placer", {name: "place", meta: 0},{isTech:false,stack: 1});

let currentBuilding = 0;

Callback.addCallback("ItemUse", function (coords, item, block) {
    var x = coords.relative.x;
    var y = coords.relative.y;
    var z = coords.relative.z;
    
    if(item.id == ItemID.Place){
        buildings[currentBuilding].build(x, y, z);
    }
});


Callback.addCallback("NativeCommand", function(str){
    str = str.substring(1);
    let cmd = str.split(" ");
    if(cmd[0] == "building"){
        currentBuilding = parseInt(cmd[1]);
        Game.prevent();
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