Callback.addCallback("ItemUse", function (coords, item, block) {
    var x = coords.relative.x
    var y = coords.relative.y
    var z = coords.relative.z
    
    if(item.id == 280){
        var building = new Building("1.json");
        building.build(x, y, z);
    }
});

