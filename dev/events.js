IDRegistry.genItemID("Place");
Item.createItem("Place", "Structure Placer", {name: "place", meta: 0},{isTech:false,stack: 1});

Callback.addCallback("ItemUse", function (coords, item, block) {
    var x = coords.relative.x;
    var y = coords.relative.y;
    var z = coords.relative.z;
    //var methods = container.class.getDeclaredMethods();
    //for(var i = 0; i < methods.length; i++){
    //    Game.message(methods[i]);
    //}
    if(item.id == ItemID.Place){
        //var i = Math.floor(Math.random() * 46);
        buildings[14].debug = true;
        buildings[14].build(x, y, z);
        //World.setBlock(x, y, z, 54, 0);
        //var container = World.getContainer(x, y, z);
        //Game.message(container.getSlot(0));
    }
});

var buildings = [];
Callback.addCallback("PostLoaded", function(){
    for(var i = 0; i < 46; i++){
       buildings.push(new Building(i + ".json"));
    }
});
